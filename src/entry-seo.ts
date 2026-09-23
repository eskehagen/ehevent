/**
 * Indgang der udstiller SEO-datalaget for prerender-scriptet.
 *
 * scripts/prerender.mjs kører i Node og kan ikke importere .ts direkte.
 * Denne fil bygges derfor med i SSR-bundlen, så scriptet læser præcis samme
 * PAGES og JSON-LD-byggere som browseren gør — der findes kun én sandhed.
 */
export { PAGES, buildJsonLd, canonicalFor, CONTENT_UPDATED } from './seo/pages';
export { SITE_URL, BUSINESS } from './seo/site';
