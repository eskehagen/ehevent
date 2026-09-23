/*
 * app.js — bygger visitkortet ud fra card-data.js.
 *
 * card-data.js genereres af tools/sync-card.mjs ud fra card.json,
 * så websiden og Android-appen altid viser de samme oplysninger.
 */

import { CARD } from '../card-data.js';
import { toSvg } from './qr.js';

const $ = (id) => document.getElementById(id);
const profile = CARD.profile;

/* ---------- identitet ---------- */

const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ');
document.title = fullName ? `${fullName} — Visitkort` : 'Visitkort';
$('name').textContent = fullName;

const role = $('role');
if (profile.title && profile.company) {
  role.innerHTML = '';
  role.append(profile.title, ' hos ');
  const span = document.createElement('span');
  span.className = 'company';
  span.textContent = profile.company;
  role.append(span);
} else if (profile.company) {
  role.innerHTML = '<span class="company"></span>';
  role.firstElementChild.textContent = profile.company;
} else {
  role.textContent = profile.title || '';
}

$('tagline').textContent = profile.tagline || '';

const avatar = $('avatar');
avatar.src = profile.photo || 'assets/profile.svg';
avatar.alt = fullName ? `Portræt af ${fullName}` : 'Portræt';
avatar.addEventListener('error', () => { avatar.src = 'assets/profile.svg'; }, { once: true });

/* ---------- kontaktrækker ---------- */

const ICONS = {
  phone: '<path d="M6.6 3h2.5l1.6 4-2 1.2a12 12 0 0 0 5.1 5.1l1.2-2 4 1.6v2.5a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3z"/>',
  email: '<path d="M3 6.5h18v11H3zM3 7l9 6 9-6"/>',
  web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
  linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5v6M8 7.6v.1M12 16.5v-3.4a2.1 2.1 0 0 1 4.2 0v3.4"/>',
};

/** Viser en pæn, kort udgave af en URL i stedet for hele adressen. */
function prettyUrl(url) {
  try {
    const u = new URL(url);
    return (u.hostname.replace(/^www\./, '') + u.pathname).replace(/\/$/, '');
  } catch {
    return url;
  }
}

const rows = [
  profile.phone && {
    label: 'Telefon',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^\d+]/g, '')}`,
    icon: ICONS.phone,
  },
  profile.email && {
    label: 'E-mail',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: ICONS.email,
  },
  profile.website && {
    label: 'Hjemmeside',
    value: prettyUrl(profile.website),
    href: profile.website,
    icon: ICONS.web,
    external: true,
  },
  profile.linkedin && {
    label: 'LinkedIn',
    value: prettyUrl(profile.linkedin).replace(/^linkedin\.com\/in\//, ''),
    href: profile.linkedin,
    icon: ICONS.linkedin,
    external: true,
  },
].filter(Boolean);

const list = $('contact-list');
for (const row of rows) {
  const a = document.createElement('a');
  a.className = 'row';
  a.href = row.href;
  if (row.external) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }
  a.innerHTML = `
    <span class="row-icon"><svg viewBox="0 0 24 24" aria-hidden="true">${row.icon}</svg></span>
    <span class="row-text">
      <span class="row-label"></span>
      <span class="row-value"></span>
    </span>`;
  a.querySelector('.row-label').textContent = row.label;
  a.querySelector('.row-value').textContent = row.value;
  a.setAttribute('aria-label', `${row.label}: ${row.value}`);
  list.append(a);
}

/* ---------- gem i kontakter ---------- */

/*
 * iOS og Android skal behandles forskelligt:
 *
 *  - Android/desktop: download-attributten giver en almindelig filhentning,
 *    som Kontakter-appen tilbyder at importere.
 *  - iOS: download-attributten lægger .vcf-filen i Filer-appen, så brugeren
 *    skal tage tre ekstra skridt. Uden attributten viser Safari i stedet
 *    kontaktarket direkte med "Opret ny kontakt". Derfor fjernes den her.
 */
const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const saveLink = $('save-contact');
saveLink.href = CARD.vcardFile;
if (isIOS) saveLink.removeAttribute('download');
else saveLink.setAttribute('download', CARD.vcardFile.split('/').pop());

/* ---------- del ---------- */

const shareUrl = (() => {
  const url = new URL(window.location.href);
  // Del altid den rene adresse — ikke sporingsparametrene fra denne visning.
  url.search = '';
  url.hash = '';
  return url.toString();
})();

const shareBtn = $('share-btn');
if (navigator.share) {
  shareBtn.hidden = false;
  shareBtn.addEventListener('click', async () => {
    try {
      await navigator.share({
        title: `${fullName} — visitkort`,
        text: profile.company ? `${fullName}, ${profile.company}` : fullName,
        url: shareUrl,
      });
    } catch (err) {
      if (err?.name !== 'AbortError') console.warn('Deling afbrudt:', err);
    }
  });
}

/* ---------- QR-dialog ---------- */

const dialog = $('qr-dialog');
$('qr-btn').addEventListener('click', () => {
  if (!$('qr-holder').childElementCount) {
    $('qr-holder').innerHTML = toSvg(shareUrl, { ecLevel: 'M', border: 2 });
    $('qr-url').textContent = prettyUrl(shareUrl);
  }
  dialog.showModal();
});
$('qr-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close(); // klik på baggrunden lukker
});

/* ---------- hvilken kanal kom besøgende fra ---------- */

const params = new URLSearchParams(window.location.search);
const source = params.get('src');
const LABELS = { nfc: 'Delt via NFC', qr: 'Scannet fra QR-kode', link: null };
if (LABELS[source]) {
  const badge = $('channel-badge');
  badge.textContent = LABELS[source];
  badge.hidden = false;
}

/* ---------- klar ---------- */

$('card').setAttribute('aria-busy', 'false');

if ('serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      /* offline-understøttelse er en bonus — siden virker uden. */
    });
  });
}
