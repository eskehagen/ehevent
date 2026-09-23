/**
 * Ét sted for virksomhedens identitet (NAP: navn, adresse/område, telefon).
 *
 * Alt herinde bruges BÅDE i synlig tekst, i footeren og i JSON-LD, så en
 * entitet aldrig kan komme til at hedde eller ringe til to forskellige ting.
 * Google og AI-søgemaskiner matcher profiler på præcis disse strenge.
 *
 * Alle værdier stammer fra kode der allerede lå i repoet — intet er opfundet.
 */

export const SITE_URL = 'https://eskehagenevents.dk';

export const BUSINESS = {
  /**
   * Officielt navn: det står i CVR, på Google-profilen, Instagram og Krak.
   * Bruges i de strukturerede data, header og footer.
   */
  name: 'EH Events',
  /**
   * Navnet domænet og forsiden bærer. Står stadig synligt på forsiden og i
   * brødteksten, og kobles i JSON-LD til hovednavnet som alternateName.
   */
  alternateName: 'Eske Hagen Events',
  /** Personen bag. Bruges som Person-entitet i JSON-LD (E-E-A-T). */
  founder: 'Eske Hagen Sinding',
  jobTitle: 'DJ og eventspecialist',
  cvr: '46389344',

  /** Vises som "+45 50 93 59 52" — href skal altid være E.164 uden mellemrum. */
  phoneHref: '+4550935952',
  phoneDisplay: '+45 50 93 59 52',
  email: 'eheventsdk@gmail.com',

  /** Hvor virksomheden har base. */
  city: 'Aarhus',
  region: 'Region Midtjylland',
  country: 'DK',
  latitude: 56.1629,
  longitude: 10.2039,

  /**
   * Dækningsområdet, sådan som det skal stå i tekst. Bevidst uden lister
   * over enkelte byer og uden en kilometergrænse.
   */
  coverage: 'Øst- og Midtjylland',

  yearsExperience: 22,
  /** Bekræftet af Eske. */
  djSince: 2004,
  /** Bekræftet af Eske: 1½ år hos Martin Professional i 2014–2015. */
  martinProfessional: '1½ år hos lysproducenten Martin Professional (2014–2015)',

  instagram: 'https://www.instagram.com/ehevents.dk/',
  instagramHandle: '@ehevents.dk',
  /**
   * Google-virksomhedsprofilen for EH Events. Profil-linket bruges i
   * JSON-LD (sameAs), så Google og AI-søgning kan koble hjemmesiden til
   * profilen. Anmeldelseslinket åbner direkte formularen til en anmeldelse.
   */
  google: 'https://g.page/r/CTseoZuHvrwPEBM',
  googleReview: 'https://g.page/r/CTseoZuHvrwPEBM/review',
} as const;

/** Faste @id'er, så alle sider peger på præcis samme entitet i JSON-LD. */
export const ID = {
  business: `${SITE_URL}/#business`,
  person: `${SITE_URL}/#eske`,
  website: `${SITE_URL}/#website`,
} as const;

/** Måned + år på dansk, fx "september 2026". Bruges til "Senest opdateret". */
export const formatDanishMonthYear = (iso: string): string => {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat('da-DK', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
};
