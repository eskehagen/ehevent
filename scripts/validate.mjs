/**
 * Validering af det byggede site (dist/).
 *
 * Kontrollerer det en crawler faktisk modtager — ikke hvad React ville have
 * vist efter JavaScript. Kør efter `npm run build`:
 *     node scripts/validate.mjs
 *
 * Fejler med exit-kode 1, hvis noget er galt, så den kan bruges i CI.
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

let failures = 0;
let warnings = 0;
const fail = (m) => { console.log(`  ✗ ${m}`); failures++; };
const warn = (m) => { console.log(`  ! ${m}`); warnings++; };
const ok = (m) => console.log(`  ✓ ${m}`);

const htmlFiles = [];
(function walk(dir, rel = '') {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, `${rel}/${e}`);
    else if (e.endsWith('.html')) htmlFiles.push({ file: p, url: `${rel}/${e}` });
  }
})(DIST);

/*
 * /visitkort er ikke en side på sitet, men et selvstændigt digitalt
 * visitkort med sin egen HTML. Det findes ved at scanne en QR-kode eller
 * holde en telefon mod et NFC-tag — ikke ved at søge — og er markeret
 * noindex. Kravene herunder handler om hvad en søgemaskine får ud af en
 * side, så de giver ingen mening for den. Kilden ligger i Visitkort-repoet.
 */
const pages = htmlFiles.filter(
  (f) => !f.url.includes('google') && !f.url.startsWith('/visitkort/'),
);

const strip = (html) => {
  const body = html.match(/<body>([\s\S]*)<\/body>/)?.[1] ?? '';
  return body
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/* ─── 1. Indhold i rå HTML ─────────────────────────────────────── */
console.log('\n1. Indhold i rå HTML (uden JavaScript)\n');
for (const { file, url } of pages) {
  const html = readFileSync(file, 'utf-8');
  const text = strip(html);
  const words = text.split(' ').filter(Boolean).length;
  const h1 = html.match(/<h1[\s\S]*?<\/h1>/g) ?? [];

  if (words < 100) fail(`${url}: kun ${words} ord i body`);
  if (h1.length !== 1) fail(`${url}: ${h1.length} <h1> (skal være præcis 1)`);
  if (!/tel:\+45/.test(html)) fail(`${url}: intet tel:-link`);
  if (!/mailto:/.test(html)) fail(`${url}: intet mailto:-link`);
  if (/opacity:\s*0[^.\d]/.test(html)) fail(`${url}: indhold med opacity:0 i kilden`);
  if (words >= 100 && h1.length === 1) ok(`${url.padEnd(34)} ${String(words).padStart(5)} ord, 1 h1`);
}

/* ─── 2. JSON-LD ───────────────────────────────────────────────── */
console.log('\n2. JSON-LD\n');
for (const { file, url } of pages) {
  const html = readFileSync(file, 'utf-8');
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) { fail(`${url}: ingen JSON-LD`); continue; }
  for (const [, raw] of blocks) {
    try {
      const data = JSON.parse(raw);
      const types = (data['@graph'] ?? []).map((n) => [].concat(n['@type']).join('+'));
      // FAQ-markup skal matche synlig tekst ordret, ellers afviser Google den.
      const faq = (data['@graph'] ?? []).find((n) => n['@type'] === 'FAQPage');
      if (faq) {
        const text = strip(html);
        for (const q of faq.mainEntity) {
          const needle = q.acceptedAnswer.text.slice(0, 60).replace(/\s+/g, ' ');
          if (!text.includes(needle)) fail(`${url}: FAQ-svar findes ikke synligt: "${needle}…"`);
        }
      }
      ok(`${url.padEnd(34)} ${types.length} noder: ${types.join(', ').slice(0, 66)}`);
    } catch (e) {
      fail(`${url}: ugyldig JSON-LD — ${e.message}`);
    }
  }
}

/* ─── 3. Titler og beskrivelser ────────────────────────────────── */
console.log('\n3. Titler og beskrivelser\n');
const seen = new Map();
console.log(`  ${'side'.padEnd(30)} ${'titel'.padStart(5)} ${'desc'.padStart(6)}`);
for (const { file, url } of pages) {
  const html = readFileSync(file, 'utf-8');
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '';
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';

  if (!title) fail(`${url}: ingen title`);
  if (!desc) fail(`${url}: ingen description`);
  if (!canonical) fail(`${url}: ingen canonical`);
  if (title.length > 60) warn(`${url}: title ${title.length} tegn (> 60)`);
  if (desc.length > 155 || desc.length < 140) {
    if (!html.includes('noindex')) warn(`${url}: description ${desc.length} tegn (mål 140-155)`);
  }
  if (seen.has(title)) fail(`${url}: title er dublet af ${seen.get(title)}`);
  seen.set(title, url);

  console.log(`  ${url.padEnd(30)} ${String(title.length).padStart(5)} ${String(desc.length).padStart(6)}`);
}

/* ─── 4. Interne links ─────────────────────────────────────────── */
console.log('\n4. Interne links\n');
const broken = new Set();
let checked = 0;
for (const { file, url } of pages) {
  const html = readFileSync(file, 'utf-8');
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    if (href.startsWith('/assets/') || href.startsWith('/images/')) {
      if (!existsSync(join(DIST, href))) broken.add(`${href} (fra ${url})`);
      checked++;
      continue;
    }
    const candidates = [
      join(DIST, href, 'index.html'),
      join(DIST, href),
      join(DIST, `${href}.html`),
    ];
    checked++;
    if (!candidates.some(existsSync)) broken.add(`${href} (fra ${url})`);
  }
}
if (broken.size) [...broken].forEach((b) => fail(`dødt link: ${b}`));
else ok(`${checked} interne links — alle findes i dist/`);

/* ─── 5. Filer i roden ─────────────────────────────────────────── */
console.log('\n5. Filer i roden\n');
for (const f of ['robots.txt', 'sitemap.xml', '404.html', 'llms.txt', 'favicon-32.png', 'apple-touch-icon.png']) {
  existsSync(join(DIST, f)) ? ok(f) : fail(`${f} mangler`);
}

const robots = readFileSync(join(DIST, 'robots.txt'), 'utf-8');
for (const bot of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Bingbot']) {
  robots.includes(bot) ? ok(`robots.txt tillader ${bot}`) : fail(`robots.txt mangler ${bot}`);
}

/* ─── 6. Sitemap dækker alle sider ─────────────────────────────── */
console.log('\n6. Sitemap\n');
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf-8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const indexable = pages.filter((p) => !readFileSync(p.file, 'utf-8').includes('noindex'));
for (const { url } of indexable) {
  const route = url.replace('/index.html', '') || '/';
  const expected = route === '/' ? 'https://eskehagenevents.dk/' : `https://eskehagenevents.dk${route}`;
  locs.includes(expected) ? ok(`i sitemap: ${expected}`) : fail(`mangler i sitemap: ${expected}`);
}
if (!/<lastmod>/.test(sitemap)) fail('sitemap.xml mangler <lastmod>');
else ok('sitemap.xml har <lastmod>');

/* ─── Opsummering ──────────────────────────────────────────────── */
console.log(`\n${'─'.repeat(60)}`);
console.log(`${pages.length} sider kontrolleret — ${failures} fejl, ${warnings} advarsler\n`);
process.exit(failures > 0 ? 1 : 0);
