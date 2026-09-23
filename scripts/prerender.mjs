/**
 * Prerendering: gør SPA'en til færdig HTML pr. rute.
 *
 * Baggrund: siden var en ren klient-renderet React-app. Den HTML serveren
 * sendte, havde bogstaveligt talt <div id="root"></div> som hele body'en.
 * Google renderer JavaScript langsomt og ikke garanteret, og AI-crawlere
 * (GPTBot, ClaudeBot, PerplexityBot) gør det typisk slet ikke. Derfor kunne
 * hverken søgemaskiner eller AI-søgning læse ét ord af indholdet.
 *
 * Scriptet køres efter `vite build` og gør tre ting pr. rute:
 *   1. Renderer React-træet til en HTML-streng i Node (via dist-ssr/).
 *   2. Skriver rutens title, description, canonical, Open Graph og JSON-LD
 *      ind i <head> — hentet fra src/seo/pages.ts.
 *   3. Gemmer resultatet som dist/<rute>/index.html.
 *
 * Derudover genereres sitemap.xml, så den aldrig kan komme bagud for
 * ruterne, og en 404.html som Vercel serverer på ukendte adresser.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = join(ROOT, 'dist');

const { render } = await import(join(ROOT, 'dist-ssr', 'entry-server.js'));
const { PAGES, buildJsonLd, canonicalFor, CONTENT_UPDATED } = await import(
  join(ROOT, 'dist-ssr', 'seo.js')
);
const { SITE_URL } = await import(join(ROOT, 'dist-ssr', 'seo.js'));

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

if (!template.includes('<!--__EH_APP__-->') || !template.includes('<!--__EH_HEAD__-->')) {
  throw new Error(
    'index.html mangler pladsholderne __EH_APP__ / __EH_HEAD__ — prerendering ville stille og roligt producere tomme sider.',
  );
}

/** Minimal HTML-escaping til attributværdier. */
const attr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * JSON-LD må ikke kunne bryde ud af <script>-tagget. "</script>" inde i en
 * streng ville lukke blokken midt i dokumentet.
 */
const safeJson = (obj) =>
  JSON.stringify(obj).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');

const OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

/**
 * Preload af de fonte der faktisk bruges over folden.
 *
 * Fontfilerne får hash i navnet under build, så de kan ikke hardcodes i
 * index.html — de slås op her i dist/assets efter build'et. Uden preload
 * opdages de først når CSS'en er hentet og parset, og overskrifterne når
 * at blive malet med reservefonten først.
 */
function fontPreloads() {
  const assets = join(DIST, 'assets');
  if (!existsSync(assets)) return [];
  const files = readdirSync(assets);
  // Brødtekst (Outfit 300) og overskrifter (Cormorant Garamond 400).
  const wanted = [/^outfit-latin-300-normal-.*\.woff2$/, /^cormorant-garamond-latin-400-normal-.*\.woff2$/];
  return wanted
    .map((re) => files.find((f) => re.test(f)))
    .filter(Boolean)
    .map(
      (f) =>
        `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`,
    );
}

/** Erstatter de pladsholder-metatags der allerede står i index.html. */
function applyHead(html, page) {
  const canonical = canonicalFor(page.path);
  const title = attr(page.title);
  const desc = attr(page.description);

  let out = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${desc}" />`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${canonical}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${canonical}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${desc}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"[\s\S]*?\/>/,
      `<meta name="twitter:description" content="${desc}" />`,
    );

  const extra = [...fontPreloads()];
  if (page.noindex) extra.push('<meta name="robots" content="noindex, follow" />');
  extra.push(`<meta property="og:image" content="${OG_IMAGE}" />`);
  extra.push(
    `<script type="application/ld+json">${safeJson(buildJsonLd(page))}</script>`,
  );

  return out.replace('<!--__EH_HEAD__-->', extra.join('\n    '));
}

/* ─── Render hver rute ─────────────────────────────────────────── */

const written = [];

for (const page of PAGES) {
  const appHtml = render(page.path === '/404' ? '/__findes-ikke__' : page.path);

  if (!appHtml || appHtml.length < 500) {
    throw new Error(`Ruten ${page.path} renderede ${appHtml?.length ?? 0} tegn — det er tomt.`);
  }

  const html = applyHead(template, page).replace('<!--__EH_APP__-->', appHtml);

  const outPath =
    page.path === '/'
      ? join(DIST, 'index.html')
      : page.path === '/404'
        ? join(DIST, '404.html')
        : join(DIST, page.path.slice(1), 'index.html');

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, 'utf-8');
  written.push([page.path, outPath.replace(DIST + '/', ''), appHtml.length]);
}

/* ─── sitemap.xml ──────────────────────────────────────────────
   Genereres ud fra PAGES, så den ikke kan komme bagud for ruterne —
   den gamle håndskrevne udgave manglede /anmeldelser.              */

const sitemapPages = PAGES.filter((p) => !p.noindex);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPages
  .map(
    (p) => `  <url>
    <loc>${canonicalFor(p.path)}</loc>
    <lastmod>${CONTENT_UPDATED}</lastmod>
    <changefreq>${p.changefreq ?? 'monthly'}</changefreq>
    <priority>${(p.sitemapPriority ?? 0.5).toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap, 'utf-8');

/* ─── Rapport ──────────────────────────────────────────────────── */

console.log('\nPrerendering færdig:\n');
for (const [route, file, len] of written) {
  console.log(`  ${route.padEnd(22)} → ${file.padEnd(34)} ${String(len).padStart(7)} tegn`);
}
console.log(`\n  sitemap.xml            → ${sitemapPages.length} URL'er\n`);

if (!existsSync(join(DIST, 'robots.txt'))) {
  console.warn('  ADVARSEL: dist/robots.txt mangler.\n');
}
