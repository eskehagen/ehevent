import { useEffect } from 'react';
import { buildJsonLd, canonicalFor, getPageSeo } from '../seo/pages';
import { SITE_URL } from '../seo/site';

/**
 * Holder <head> opdateret ved klient-navigation.
 *
 * Bemærk arbejdsdelingen: ved FØRSTE sidevisning er alt det her allerede
 * skrevet korrekt ind i HTML'en af prerenderingen — det er den version
 * crawlere ser. Denne hook findes udelukkende for de efterfølgende
 * navigationer inde i SPA'en, hvor der ikke hentes ny HTML fra serveren.
 *
 * Derfor må den aldrig være eneste kilde til metadata. Sandheden ligger i
 * src/seo/pages.ts, som både denne hook og prerenderingen læser.
 */

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

export function useSEO(path: string) {
  useEffect(() => {
    const page = getPageSeo(path);
    const canonical = canonicalFor(page.path);
    const ogImage = `${SITE_URL}/images/og-image.jpg`;

    document.title = page.title;

    setMeta('meta[name="description"]', 'name', 'description', page.description);
    setLink('canonical', canonical);

    setMeta('meta[property="og:title"]', 'property', 'og:title', page.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', page.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);

    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', page.description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // Kun 404 skal holdes ude af indekset. Attributten fjernes igen ved
    // navigation væk, ellers ville hele sessionen arve noindex.
    const robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (page.noindex) {
      setMeta('meta[name="robots"]', 'name', 'robots', 'noindex, follow');
    } else if (robots) {
      robots.remove();
    }

    // Erstat JSON-LD'en fra prerenderingen med den rute vi nu står på.
    const existing = document.head.querySelector('script[type="application/ld+json"]');
    existing?.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(buildJsonLd(page));
    document.head.appendChild(script);
  }, [path]);
}
