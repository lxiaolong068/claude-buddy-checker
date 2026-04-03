// Service Worker for Claude Buddy Checker PWA
// Strategy:
//   - Navigation (HTML): network-first, fallback to cached shell
//   - Hashed JS/CSS/fonts: cache-first (content-hash = immutable)
//   - Images & icons: cache-first
//   - External CDN / analytics: skip caching

const CACHE_VERSION = 'v1';
const CACHE_NAME = `buddy-checker-${CACHE_VERSION}`;

// Static shell assets to precache on install
const PRECACHE = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/favicon-32x32.png',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
];

// ── Install ──────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

// ── Activate ─────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// ── Fetch ─────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Skip non-http(s) (e.g. chrome-extension://)
  if (!url.protocol.startsWith('http')) return;

  // Skip analytics / umami endpoints — never cache
  if (url.pathname.includes('/umami') || url.pathname.includes('/__manus__')) {
    return;
  }

  // Google Fonts — cache-first (fonts are immutable once fetched)
  if (
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com'
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // External domains — skip (CDN images, analytics, etc.)
  if (url.hostname !== self.location.hostname) return;

  // SPA navigation — network-first so updates are picked up immediately;
  // fall back to the cached shell (/) when offline
  if (request.mode === 'navigate') {
    event.respondWith(
      networkFirst(request).catch(() =>
        caches.match('/').then(
          (shell) =>
            shell ??
            new Response('Offline — open the app when you have a connection.', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' },
            }),
        ),
      ),
    );
    return;
  }

  // Hashed JS / CSS bundles — cache-first (filename hash = content-addressable)
  if (/\.(js|css)(\?.*)?$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Images & font files — cache-first
  if (/\.(png|jpe?g|webp|gif|svg|ico|woff2?|ttf|eot)(\?.*)?$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Everything else (manifest.json, sitemap.xml, etc.) — network-first
  event.respondWith(networkFirst(request));
});

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Serve from cache; if not cached, fetch and store. */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
}

/** Try network first; on failure, fall back to cache. */
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw new Error(`Network error and no cache for: ${request.url}`);
  }
}
