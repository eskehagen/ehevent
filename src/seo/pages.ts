/**
 * Per-rute SEO: title, description, canonical, Open Graph og JSON-LD.
 *
 * Denne fil er sandheden for BÅDE prerenderingen (scripts/prerender.mjs, som
 * skriver værdierne ind i den færdige HTML) og for klienten (useSEO, som
 * holder dem opdateret ved navigation i browseren). Tilføjes en rute i
 * App.tsx, skal den også tilføjes her — ellers får den forsidens metadata.
 */

import { BUSINESS, ID, SITE_URL } from './site';
import type { FaqItem } from '../data/faq';
import { allFaqItems } from '../data/faq';
import { REVIEWS } from '../data/reviews';

/** Sidst redigeret indhold. Opdateres når siderne ændres væsentligt. */
export const CONTENT_UPDATED = '2026-09-21';

export interface ServiceMeta {
  /** schema.org serviceType — det folk faktisk søger på. */
  serviceType: string;
  name: string;
  description: string;
}

export interface PageSeo {
  /** Rute uden efterstillet skråstreg. Forsiden er '/'. */
  path: string;
  title: string;
  description: string;
  /** Label i brødkrummen. Udeladt på forsiden. */
  breadcrumb?: string;
  faqs?: FaqItem[];
  service?: ServiceMeta;
  /** Sider der ikke skal indekseres (404). */
  noindex?: boolean;
  /** Med i sitemap.xml? Juridiske sider og 404 holdes ude af nogle lister. */
  sitemapPriority?: number;
  changefreq?: string;
}

const OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

export const PAGES: PageSeo[] = [
  {
    path: '/',
    title: 'DJ og eventlys i Aarhus | Eske Hagen Events',
    description:
      'DJ fra Aarhus med 22+ års erfaring. Musik, lys og special effekter til bryllup, firmafest og privatfest i hele Øst- og Midtjylland. Få et tilbud.',
    sitemapPriority: 1.0,
    changefreq: 'monthly',
  },
  {
    path: '/dj-til-bryllup',
    title: 'DJ til bryllup i Aarhus | Eske Hagen Events',
    description:
      'Bryllups-DJ fra Aarhus med 22+ års erfaring. Lyd, lys og special effekter til brudevals og fest i hele Øst- og Midtjylland. Planlægningsmøde inkluderet.',
    breadcrumb: 'DJ til bryllup',
    service: {
      serviceType: 'DJ til bryllup',
      name: 'DJ til bryllup',
      description:
        'Bryllups-DJ med lyd, lys og special effekter som én samlet løsning. Personligt planlægningsmøde og brudevals planlagt på forhånd.',
    },
    sitemapPriority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/dj-til-firmafest',
    title: 'DJ til firmafest og julefrokost i Aarhus | Eske Hagen Events',
    description:
      'DJ til firmafest, julefrokost og sommerfest i hele Øst- og Midtjylland. Lyd, lys og effekter som én samlet løsning, med faktura til virksomheden.',
    breadcrumb: 'DJ til firmafest',
    service: {
      serviceType: 'DJ til firmafest',
      name: 'DJ til firmafest og julefrokost',
      description:
        'DJ til firmafest, julefrokost, sommerfest og jubilæum. Lyd og lys tilpasset lokalet og faktura til virksomheden.',
    },
    sitemapPriority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/dj-til-fodselsdag',
    title: 'DJ til fødselsdag og privatfest i Aarhus | Eske Hagen Events',
    description:
      'DJ til runde fødselsdage, jubilæer og privatfester i hele Øst- og Midtjylland. Musik der samler alle aldre, plus lys og konfetti. Få et tilbud i dag.',
    breadcrumb: 'DJ til fødselsdag og privatfest',
    service: {
      serviceType: 'DJ til fødselsdag',
      name: 'DJ til fødselsdag og privatfest',
      description:
        'DJ til runde fødselsdage, jubilæer, studentergilder og havefester. Musik der holder alle aldre samlet på dansegulvet.',
    },
    sitemapPriority: 0.9,
    changefreq: 'monthly',
  },
  {
    // Én samlet side for lyd, lys og special effekter. Den tidligere
    // /special-effekter er flettet ind her, så emnet kun har én URL.
    path: '/loesninger',
    title: 'Lyd, lys og special effekter til fest | Eske Hagen Events',
    description:
      'Lyd, lys og special effekter til bryllup og fest i Øst- og Midtjylland: cold spark, konfetti, CO2, røg, sæbebobler, sne og skum. Med rådgivning.',
    breadcrumb: 'Løsninger',
    service: {
      serviceType: 'Lyd, lys og special effekter til events',
      name: 'Lyd, lys og special effekter',
      description:
        'Professionelt lyd- og lysanlæg tilpasset lokalet samt cold spark, konfetti, CO2, røg, sæbebobler, sne, skum, knæklys og holi powder til bryllupper og fester.',
    },
    sitemapPriority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/om-eske',
    title: 'Om Eske Hagen – DJ og eventspecialist i Aarhus',
    description:
      'Eske Hagen Sinding er DJ og eventspecialist i Aarhus med over 22 års erfaring — fra mobildiskotek over faste spillesteder til events i Øst- og Midtjylland.',
    breadcrumb: 'Om Eske',
    sitemapPriority: 0.8,
    changefreq: 'yearly',
  },
  {
    // Den eneste side med FAQ. Alle spørgsmål ligger i src/data/faq.ts.
    path: '/faq',
    title: 'Ofte stillede spørgsmål om booking af DJ | Eske Hagen Events',
    description:
      'Svar på de mest stillede spørgsmål om booking, betaling, aflysning, musik, lyd og lys samt special effekter som cold spark og konfetti — samlet ét sted.',
    breadcrumb: 'FAQ',
    faqs: allFaqItems(),
    sitemapPriority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/galleri',
    title: 'Galleri: billeder fra events | Eske Hagen Events',
    description:
      'Billeder fra tidligere events: bryllupper, firmafester, koncerter og privatfester med DJ, lysopsætning og special effekter i Øst- og Midtjylland.',
    breadcrumb: 'Galleri',
    sitemapPriority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/anmeldelser',
    title: 'Anmeldelser fra brudepar og kunder | Eske Hagen Events',
    description:
      'Læs anmeldelser fra brudepar og kunder, der har haft Eske Hagen Events som DJ til bryllup, fødselsdag og firmafest i hele Øst- og Midtjylland.',
    breadcrumb: 'Anmeldelser',
    sitemapPriority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/kontakt',
    title: 'Book DJ i Aarhus – kontakt og tilbud | Eske Hagen Events',
    description:
      'Book DJ til bryllup, firmafest eller privatfest i Øst- og Midtjylland. Send dato, sted og ønsker, så vender jeg tilbage med et uforpligtende tilbud.',
    breadcrumb: 'Kontakt',
    sitemapPriority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/handelsbetingelser',
    title: 'Handelsbetingelser | Eske Hagen Events',
    description:
      'Handelsbetingelser for booking af DJ og eventydelser hos Eske Hagen Events: tilbud, betaling, depositum, aflysning og kundens forpligtelser.',
    breadcrumb: 'Handelsbetingelser',
    sitemapPriority: 0.3,
    changefreq: 'yearly',
  },
  {
    path: '/privatlivspolitik',
    title: 'Privatlivspolitik | Eske Hagen Events',
    description:
      'Sådan behandler Eske Hagen Events dine personoplysninger efter GDPR: hvilke data der indsamles, hvor længe de gemmes, og hvilke rettigheder du har.',
    breadcrumb: 'Privatlivspolitik',
    sitemapPriority: 0.3,
    changefreq: 'yearly',
  },
  {
    path: '/404',
    title: 'Siden blev ikke fundet | Eske Hagen Events',
    description: 'Siden findes ikke. Find i stedet DJ til bryllup, firmafest eller privatfest hos Eske Hagen Events i Aarhus.',
    noindex: true,
  },
];

export const getPageSeo = (path: string): PageSeo => {
  // Tåler både '/faq' og '/faq/', så et link med skråstreg ikke taber metadata.
  const clean = path.length > 1 ? path.replace(/\/+$/, '') : path;
  return PAGES.find((p) => p.path === clean) ?? PAGES[0];
};

export const canonicalFor = (path: string): string =>
  path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;

/* ─────────────────────────────────────────────────────────────
   JSON-LD
   ───────────────────────────────────────────────────────────── */

type Json = Record<string, unknown>;

/**
 * Dækningsområdet: hele Øst- og Midtjylland. Bevidst som regioner og ikke
 * som en liste af byer eller en kilometerradius.
 */
const AREA_SERVED = [
  { '@type': 'AdministrativeArea', name: 'Region Midtjylland' },
  { '@type': 'Place', name: 'Østjylland' },
];

/** LocalBusiness + Person + WebSite. Identisk på alle sider, samme @id'er. */
const globalNodes = (): Json[] => [
  {
    '@type': ['LocalBusiness', 'EntertainmentBusiness'],
    '@id': ID.business,
    name: BUSINESS.name,
    alternateName: [BUSINESS.alternateName],
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/images/eh-logo-512.png`,
    image: OG_IMAGE,
    description: `DJ og eventspecialist i Aarhus med over ${BUSINESS.yearsExperience} års erfaring. Musik, lys og special effekter til bryllupper, firmafester og private fester i ${BUSINESS.coverage}.`,
    telephone: BUSINESS.phoneHref,
    email: BUSINESS.email,
    vatID: `DK${BUSINESS.cvr}`,
    taxID: BUSINESS.cvr,
    founder: { '@id': ID.person },
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    areaServed: AREA_SERVED,
    knowsAbout: [
      'DJ',
      'Bryllup',
      'Firmafest',
      'Julefrokost',
      'Fødselsdag',
      'Konfetti',
      'Cold spark',
      'Gnistmaskine',
      'Eventlys',
      'Lysdesign',
    ],
    // priceRange er bevidst udeladt. Den gamle værdi "Kontakt for tilbud" er
    // ikke et prisinterval og blev derfor ignoreret af parsere. Priser oplyses
    // først i et konkret tilbud, så der findes ikke et retvisende interval.
    sameAs: [BUSINESS.instagram, BUSINESS.google],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Ydelser',
      itemListElement: PAGES.filter((p) => p.service).map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@id': `${SITE_URL}${p.path}#service` },
      })),
    },
  },
  {
    '@type': 'Person',
    '@id': ID.person,
    name: BUSINESS.founder,
    jobTitle: BUSINESS.jobTitle,
    worksFor: { '@id': ID.business },
    homeLocation: { '@type': 'Place', name: BUSINESS.city },
    sameAs: [BUSINESS.instagram],
  },
  {
    '@type': 'WebSite',
    '@id': ID.website,
    url: `${SITE_URL}/`,
    name: BUSINESS.name,
    inLanguage: 'da-DK',
    publisher: { '@id': ID.business },
  },
];

/** Kun ægte anmeldelser fra src/data/reviews.ts — aldrig opdigtede tal. */
const reviewNodes = (): Json[] =>
  REVIEWS.map((r) => ({
    '@type': 'Review',
    itemReviewed: { '@id': ID.business },
    author: { '@type': 'Person', name: r.name },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: r.text,
    ...(r.date ? { datePublished: r.date } : {}),
  }));

const aggregateRatingNode = (): Json => {
  const total = REVIEWS.reduce((sum, r) => sum + r.rating, 0);
  return {
    '@type': 'AggregateRating',
    itemReviewed: { '@id': ID.business },
    ratingValue: Number((total / REVIEWS.length).toFixed(1)),
    reviewCount: REVIEWS.length,
    bestRating: 5,
    worstRating: 1,
  };
};

/**
 * Bygger hele @graph'en for én side.
 * Kaldes både under prerendering og ved klient-navigation.
 */
export const buildJsonLd = (page: PageSeo): Json => {
  const url = canonicalFor(page.path);
  const graph: Json[] = [...globalNodes()];

  graph.push({
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.business },
    inLanguage: 'da-DK',
    dateModified: CONTENT_UPDATED,
  });

  if (page.breadcrumb) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Forside', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: page.breadcrumb, item: url },
      ],
    });
  }

  if (page.service) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      serviceType: page.service.serviceType,
      name: page.service.name,
      description: page.service.description,
      provider: { '@id': ID.business },
      areaServed: AREA_SERVED,
      // Ingen offers/priceSpecification: der findes ingen offentlig pris.
    });
  }

  if (page.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: page.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  // Anmeldelser markeres kun op på den side hvor de faktisk står synligt.
  if (page.path === '/anmeldelser') {
    graph.push(...reviewNodes(), aggregateRatingNode());
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};
