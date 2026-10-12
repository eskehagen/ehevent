/**
 * Googles tags — Google Analytics og Google Ads — indlæses KUN efter samtykke.
 *
 * Googles egne kodestykker må ikke bare klistres ind i index.html. De sætter
 * cookies (fx _ga og _gcl_au) ved første sidevisning, og efter
 * cookiebekendtgørelsen og GDPR kræver det et forudgående, aktivt ja.
 * Derfor hentes gtag.js først, når den besøgende har sagt ja i
 * cookiebanneret (src/components/CookieConsent.tsx). Siger man nej — eller
 * tager man ikke stilling — sendes der intet til Google overhovedet.
 * Google kalder det "Consent Mode, basic".
 *
 * Statistik og markedsføring er to formål og har derfor hvert sit valg:
 * et samtykke skal være specifikt, så et ja til det ene må ikke tælle som
 * et ja til det andet.
 *
 * Er et ID tomt, er den del slået fra: intet valg i banneret for den, intet
 * script, og privatlivspolitikken nævner den ikke.
 */

/**
 * Google Analytics (statistik). Ejendommen "www.eskehagenevents.dk", som
 * Smart-kampagnerne i Google Ads henter besøgsdata fra.
 */
export const GOOGLE_ANALYTICS_ID: string = 'G-ZN7CHBJSZS';

/**
 * Google Ads (markedsføring). AW-delen af `send_to` i konverteringens
 * kodestykke nedenfor.
 */
export const GOOGLE_ADS_ID: string = 'AW-18388326877';

/**
 * Konverteringen der tælles, når kontaktformularen er sendt.
 *
 * Konverteringshandlingen "Indsend kundeformular" i Google Ads. Værdierne er
 * kopieret fra Googles hændelseskodestykke for den. Tom send_to = ingen
 * konvertering sendes.
 */
export const LEAD_CONVERSION: Conversion = {
  send_to: 'AW-18388326877/6zr4CN-ZyoodEN2znsBE',
  value: 1.0,
  currency: 'DKK',
};

/**
 * Konverteringerne der tælles, når nogen klikker på et telefonnummer
 * (tel:-link) eller en mailadresse (mailto:-link) — uanset hvor på sitet.
 *
 * Konverteringshandlingerne "Klik på telefonnummer" og "Klik på e-mail" i
 * Google Ads (målet "Kontakt"). Værdierne er kopieret fra hver sit
 * hændelseskodestykke. Tom send_to = ingen konvertering sendes.
 */
export const PHONE_CONVERSION: Conversion = {
  send_to: 'AW-18388326877/cgQkCMOdmJodEN2znsBE',
  value: 1.0,
  currency: 'DKK',
};
export const EMAIL_CONVERSION: Conversion = {
  send_to: 'AW-18388326877/x4vXCMadmJodEN2znsBE',
  value: 1.0,
  currency: 'DKK',
};

interface Conversion {
  send_to: string;
  value?: number;
  currency?: string;
}

export const analyticsEnabled = GOOGLE_ANALYTICS_ID !== '';
export const adsEnabled = GOOGLE_ADS_ID !== '';
export const googleTagEnabled = analyticsEnabled || adsEnabled;

/* ─── Samtykke ─────────────────────────────────────────────────── */

export interface Consent {
  /** Google Analytics. */
  statistics: boolean;
  /** Google Ads. */
  marketing: boolean;
}

const STORAGE_KEY = 'eh-cookie-consent';

/**
 * Hvor længe et valg huskes, før vi spørger igen. Datatilsynet anbefaler,
 * at et samtykke ikke bruges i al evighed — 12 måneder er normal praksis og
 * er det, privatlivspolitikken lover.
 */
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

/**
 * Valget holdes også i hukommelsen. Kan localStorage ikke bruges (privat
 * browsing e.l.), gælder et valg så resten af besøget, i stedet for at
 * banneret dukker op igen ved hver navigation.
 */
let sessionConsent: Consent | null = null;

/**
 * Det gemte valg, eller null hvis den besøgende ikke har valgt.
 *
 * Valg fra før statistik fik sit eget valg (gemt som `{ choice }`) læses
 * bevidst som "intet valg": de svarede kun på markedsføring, så de skal
 * spørges igen frem for at få et svar på statistik lagt i munden.
 */
export function readConsent(): Consent | null {
  if (sessionConsent) return sessionConsent;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Partial<Consent> & { at?: unknown };
    const fresh = typeof stored.at === 'number' && Date.now() - stored.at < MAX_AGE_MS;
    if (fresh && typeof stored.statistics === 'boolean' && typeof stored.marketing === 'boolean') {
      return { statistics: stored.statistics, marketing: stored.marketing };
    }
  } catch {
    /* ulæselig eller utilgængelig — behandl som "intet valg" */
  }
  return null;
}

export function saveConsent(consent: Consent) {
  const previous = readConsent();
  sessionConsent = consent;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...consent, at: Date.now() }));
  } catch {
    /* valget gælder stadig resten af besøget via sessionConsent */
  }

  const withdrawn = {
    statistics: !!previous?.statistics && !consent.statistics,
    marketing: !!previous?.marketing && !consent.marketing,
  };
  if (withdrawn.statistics || withdrawn.marketing) {
    revoke(withdrawn);
  } else {
    applyConsent(consent);
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
const configured = { statistics: false, marketing: false };
/** Stien der sidst er meldt til Google Ads, så samme visning ikke tælles to gange. */
let lastPath: string | null = null;

const CONSENT_KEYS = {
  statistics: ['analytics_storage'],
  marketing: ['ad_storage', 'ad_user_data', 'ad_personalization'],
} as const;

const consentState = (category: keyof Consent, value: 'granted' | 'denied') =>
  Object.fromEntries(CONSENT_KEYS[category].map((key) => [key, value]));

function gtag(...args: unknown[]) {
  window.gtag?.(...args);
}

/** Opretter gtag og henter gtag.js. Gør intet ved gentagne kald. */
function loadScript(firstId: string) {
  if (loaded) return;
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  // gtag.js kræver det rå arguments-objekt — et almindeligt array virker ikke.
  window.gtag = function () {
    window.dataLayer!.push(arguments);
  };

  // Standard er nej til alt. Kun de formål den besøgende har sagt ja til,
  // opdateres til granted i applyConsent — resten forbliver nej.
  gtag('consent', 'default', {
    ...consentState('statistics', 'denied'),
    ...consentState('marketing', 'denied'),
  });
  gtag('js', new Date());

  // Ét script dækker begge tags: gtag.js henter selv det ekstra, en
  // config-kommando med et andet ID kræver.
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(firstId)}`;
  document.head.appendChild(script);
}

/** Indlæser de tags, den besøgende har sagt ja til, og som ikke kører endnu. */
function applyConsent(consent: Consent) {
  if (typeof window === 'undefined') return;

  const wanted = [
    { category: 'statistics', id: GOOGLE_ANALYTICS_ID, granted: consent.statistics && analyticsEnabled },
    { category: 'marketing', id: GOOGLE_ADS_ID, granted: consent.marketing && adsEnabled },
  ] as const;

  for (const { category, id, granted } of wanted) {
    if (!granted || configured[category]) continue;
    loadScript(id);
    gtag('consent', 'update', consentState(category, 'granted'));
    // config sender selv en sidevisning for den side, man står på.
    gtag('config', id);
    configured[category] = true;
    if (category === 'marketing') lastPath = window.location.pathname;
  }
}

/**
 * Trækker samtykke tilbage: de cookies Googles tags har sat på vores domæne
 * for det pågældende formål, slettes, og siden genindlæses.
 *
 * Genindlæsningen er nødvendig. Et indlæst gtag.js kan ikke fjernes igen, og
 * med samtykket sat til nej ville det stadig sende cookiefri målinger ved
 * hvert sideskift — altså data til Google uden samtykke. Efter genindlæsning
 * hentes kun de tags, der stadig er sagt ja til.
 */
function revoke(withdrawn: Consent) {
  const pattern =
    withdrawn.statistics && withdrawn.marketing
      ? /^(_ga|_gcl_)/
      : withdrawn.statistics
        ? /^_ga/
        : /^_gcl_/;

  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`];
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!pattern.test(name)) continue;
    for (const domain of domains) {
      document.cookie =
        `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` +
        (domain ? `; domain=${domain}` : '');
    }
  }

  if (loaded) window.location.reload();
}

/** Kaldes ved mount: indlæser de tags, den besøgende tidligere har sagt ja til. */
export function initGoogleTag() {
  const consent = readConsent();
  if (consent) applyConsent(consent);
  listenForContactClicks();
}

/**
 * Sidevisning i Google Ads ved klient-navigation.
 *
 * Sitet er en SPA: efter første sidevisning hentes der ingen ny HTML, så
 * Google Ads-tagget opdager ikke selv, at man har skiftet side. Kaldes efter
 * useSEO har sat den nye sides title.
 *
 * Google Analytics får IKKE denne hændelse. Dets udvidede måling tæller selv
 * sideskift i en SPA (via browserhistorikken, slået til som standard), så en
 * ekstra page_view her ville tælle hver side to gange.
 */
export function trackPageView() {
  if (!configured.marketing) return;
  const path = window.location.pathname;
  if (path === lastPath) return;
  lastPath = path;
  gtag('event', 'page_view', {
    send_to: GOOGLE_ADS_ID,
    page_location: window.location.href,
    page_title: document.title,
  });
}

function trackConversion(conversion: Conversion) {
  if (!configured.marketing || !conversion.send_to) return;
  gtag('event', 'conversion', conversion);
}

/** Melder en sendt kontaktformular som konvertering i Google Ads. */
export function trackLead() {
  trackConversion(LEAD_CONVERSION);
}

let listeningForContactClicks = false;

/**
 * Melder klik på telefonnumre og mailadresser som konverteringer.
 *
 * Ét lyttende klik på hele dokumentet frem for kode på hvert link: numre og
 * adresser står i footeren og på flere sider, og et link der tilføjes
 * senere, tælles så med af sig selv. Lytteren er sat i capture-fasen, så
 * den også fanger klik, som en komponent stopper undervejs.
 *
 * Et tel:- eller mailto:-link forlader ikke siden — det åbner telefonen
 * eller mailprogrammet — så hændelsen når at blive sendt.
 */
function listenForContactClicks() {
  if (listeningForContactClicks || typeof document === 'undefined') return;
  listeningForContactClicks = true;

  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="tel:"], a[href^="mailto:"]');
      if (!link) return;
      const isPhone = link.getAttribute('href')!.startsWith('tel:');
      trackConversion(isPhone ? PHONE_CONVERSION : EMAIL_CONVERSION);
    },
    { capture: true },
  );
}

/* ─── Cookie-indstillinger ──────────────────────────────────────── */

export const OPEN_CONSENT_EVENT = 'eh-open-cookie-settings';

/** Genåbner banneret, så et valg kan ændres (linket i footeren). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
