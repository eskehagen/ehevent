/**
 * Google-tag (Google Ads) — indlæses KUN efter samtykke.
 *
 * Google Ads' eget kodestykke må ikke bare klistres ind i index.html. Det
 * sætter cookies til markedsføring (fx _gcl_au) ved første sidevisning, og
 * efter cookiebekendtgørelsen og GDPR kræver det et forudgående, aktivt ja.
 * Derfor hentes gtag.js først, når den besøgende har sagt ja i
 * cookiebanneret (src/components/CookieConsent.tsx). Siger man nej — eller
 * tager man ikke stilling — sendes der intet til Google overhovedet.
 * Google kalder det "Consent Mode, basic".
 *
 * Er GOOGLE_TAG_ID tomt, er hele funktionen slået fra: intet banner, intet
 * script, og privatlivspolitikken nævner ikke Google Ads.
 */

/**
 * Tag-ID'et fra Google Ads.
 *
 * Det er AW-delen af `send_to` i konverteringens kodestykke nedenfor. Et ID
 * der starter med G- hører til Google Analytics og må ikke stå her: det
 * ville sende besøgsstatistik til Google, som hverken banneret eller
 * privatlivspolitikken beder om samtykke til.
 */
export const GOOGLE_TAG_ID: string = 'AW-18388326877';

/**
 * Konverteringen der tælles, når kontaktformularen er sendt.
 *
 * Konverteringshandlingen "Indsend kundeformular" i Google Ads. Værdierne er
 * kopieret fra Googles hændelseskodestykke for den. Tom send_to = ingen
 * konvertering sendes.
 */
export const LEAD_CONVERSION = {
  send_to: 'AW-18388326877/6zr4CN-ZyoodEN2znsBE',
  value: 1.0,
  currency: 'DKK',
};

export const googleTagEnabled = GOOGLE_TAG_ID !== '';

/* ─── Samtykke ─────────────────────────────────────────────────── */

export type ConsentChoice = 'granted' | 'denied';

const STORAGE_KEY = 'eh-cookie-consent';

/**
 * Hvor længe et valg huskes, før vi spørger igen. Datatilsynet anbefaler,
 * at et samtykke ikke bruges i al evighed — 12 måneder er normal praksis og
 * er det, privatlivspolitikken lover.
 */
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

/**
 * Valget holdes også i hukommelsen. Kan localStorage ikke bruges (privat
 * browsing e.l.), gælder et ja eller nej så resten af besøget, i stedet for
 * at banneret dukker op igen ved hver navigation.
 */
let sessionChoice: ConsentChoice | null = null;

export function readConsent(): ConsentChoice | null {
  if (sessionChoice) return sessionChoice;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as { choice?: unknown; at?: unknown };
    const fresh = typeof stored.at === 'number' && Date.now() - stored.at < MAX_AGE_MS;
    if (fresh && (stored.choice === 'granted' || stored.choice === 'denied')) {
      return stored.choice;
    }
  } catch {
    /* ulæselig eller utilgængelig — behandl som "intet valg" */
  }
  return null;
}

export function saveConsent(choice: ConsentChoice) {
  sessionChoice = choice;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, at: Date.now() }));
  } catch {
    /* valget gælder stadig resten af besøget via sessionChoice */
  }

  if (choice === 'granted') {
    loadGoogleTag();
  } else {
    revokeGoogleTag();
  }
}

/* ─── gtag ─────────────────────────────────────────────────────── */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let loaded = false;
/** Stien der sidst er meldt til Google, så samme visning ikke tælles to gange. */
let lastPath: string | null = null;

const AD_CONSENT = ['ad_storage', 'ad_user_data', 'ad_personalization'] as const;
const consentState = (value: ConsentChoice) =>
  Object.fromEntries(AD_CONSENT.map((key) => [key, value]));

function gtag(...args: unknown[]) {
  window.gtag?.(...args);
}

/** Henter gtag.js og melder den aktuelle side. Gør intet ved gentagne kald. */
function loadGoogleTag() {
  if (!googleTagEnabled || loaded || typeof window === 'undefined') return;
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  // gtag.js kræver det rå arguments-objekt — et almindeligt array virker ikke.
  window.gtag = function () {
    window.dataLayer!.push(arguments);
  };

  // Standard er nej. Opdateringen lige efter er den besøgendes aktive ja.
  // Rækkefølgen betyder, at en senere tilbagetrækning (revokeGoogleTag)
  // lander i en tilstand Google allerede kender.
  gtag('consent', 'default', { ...consentState('denied'), analytics_storage: 'denied' });
  gtag('consent', 'update', consentState('granted'));

  gtag('js', new Date());
  // config sender selv en sidevisning for den side, man står på.
  gtag('config', GOOGLE_TAG_ID);
  lastPath = window.location.pathname;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_TAG_ID)}`;
  document.head.appendChild(script);
}

/**
 * Trækker samtykket tilbage: Google får besked om ikke længere at bruge
 * cookies, og de cookies tagget allerede har sat på vores domæne slettes.
 * Scriptet kan ikke "af-indlæses", men uden samtykke skriver det intet nyt.
 */
function revokeGoogleTag() {
  if (!loaded) return;
  gtag('consent', 'update', consentState('denied'));

  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`];
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!/^(_gcl_|_ga)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie =
        `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` +
        (domain ? `; domain=${domain}` : '');
    }
  }
}

/** Kaldes ved mount: har den besøgende tidligere sagt ja, indlæses tagget. */
export function initGoogleTag() {
  if (readConsent() === 'granted') loadGoogleTag();
}

/**
 * Sidevisning ved klient-navigation.
 *
 * Sitet er en SPA: efter første sidevisning hentes der ingen ny HTML, så
 * gtag.js opdager ikke selv, at man har skiftet side. Kaldes efter
 * useSEO har sat den nye sides title.
 */
export function trackPageView() {
  if (!loaded) return;
  const path = window.location.pathname;
  if (path === lastPath) return;
  lastPath = path;
  gtag('event', 'page_view', {
    send_to: GOOGLE_TAG_ID,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Melder en sendt kontaktformular som konvertering i Google Ads. */
export function trackLead() {
  if (!loaded || !LEAD_CONVERSION.send_to) return;
  gtag('event', 'conversion', LEAD_CONVERSION);
}

/* ─── Cookie-indstillinger ──────────────────────────────────────── */

export const OPEN_CONSENT_EVENT = 'eh-open-cookie-settings';

/** Genåbner banneret, så et valg kan ændres (linket i footeren). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
