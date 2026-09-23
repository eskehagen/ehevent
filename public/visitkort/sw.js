/*
 * sw.js — gør visitkortet tilgængeligt offline.
 *
 * Strategi: network-first for HTML (så rettelser slår igennem med det samme),
 * cache-first for statiske filer. Kortet skal kunne vises selv i en kælder
 * med dårligt signal — det er tit præcis dér man deler det.
 */

const CACHE = 'visitkort-v1';

const SHELL = [
  '.',
  'index.html',
  'styles.css',
  'theme.css',
  'card-data.js',
  'js/app.js',
  'js/qr.js',
  'js/vcard.js',
  'visitkort.vcf',
  'assets/icon.svg',
  'assets/icon-180.png',
  'manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      // Én manglende fil må ikke vælte hele installationen.
      .then((cache) => Promise.allSettled(SHELL.map((url) => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  const isDocument = request.mode === 'navigate';

  event.respondWith(
    isDocument
      ? fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put('index.html', copy));
            return response;
          })
          .catch(() => caches.match('index.html').then((r) => r || caches.match('.')))
      : caches.match(request).then(
          (cached) =>
            cached ||
            fetch(request).then((response) => {
              if (response.ok) {
                const copy = response.clone();
                caches.open(CACHE).then((cache) => cache.put(request, copy));
              }
              return response;
            })
        )
  );
});
