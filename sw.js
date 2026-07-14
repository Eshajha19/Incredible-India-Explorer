/**
 * sw.js
 * Advanced Progressive Web App (PWA) Service Worker
 * Implements Multi-Strategy Caching, Offline Fallback Routing, Expiration Management, and a Client Message Bus.
 */

// ==========================================================================
// 1. CONFIGURATION & STATE
// ==========================================================================

const CACHE_VERSION = 'v2.1';
const CACHE_NAME_STATIC = `india-explorer-static-${CACHE_VERSION}`;
const CACHE_NAME_PAGES = `india-explorer-pages-${CACHE_VERSION}`;
const CACHE_NAME_IMAGES = `india-explorer-images-${CACHE_VERSION}`;

// Static resources to cache immediately on worker installation
const STATIC_ASSETS_TO_PRECACHE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './data.js',
  './chatbot-data.js',
  './manifest.json',
  './offline.html',
  './assets/hero_banner.png'
];

// Max items allowed in dynamic caches to prevent storage overflow
const CACHE_LIMITS = {
  [CACHE_NAME_PAGES]: 50,
  [CACHE_NAME_IMAGES]: 80
};


// Toggle diagnostic logging in console
const ENABLE_TELEMETRY_LOGS = true;

// Max age controls for runtime caches (in milliseconds)
// These values keep cached content fresh enough to avoid being overly stale offline.
const CACHE_MAX_AGE_MS = {
  [CACHE_NAME_PAGES]: 24 * 60 * 60 * 1000, // 24 hours
  [CACHE_NAME_IMAGES]: 30 * 24 * 60 * 60 * 1000 // 30 days
};


// ==========================================================================
// 2. DIAGNOSTIC LOGGER HELPERS
// ==========================================================================

const logger = {
  info(msg) {
    if (ENABLE_TELEMETRY_LOGS) {
      console.log(`%c[ServiceWorker] INFO: ${msg}`, 'color: #3b82f6; font-weight: 500;');
    }
  },
  debug(msg) {
    if (ENABLE_TELEMETRY_LOGS) {
      console.log(`%c[ServiceWorker] DEBUG: ${msg}`, 'color: #10b981;');
    }
  },
  warn(msg) {
    if (ENABLE_TELEMETRY_LOGS) {
      console.warn(`[ServiceWorker] WARN: ${msg}`);
    }
  },
  error(msg, err) {
    if (ENABLE_TELEMETRY_LOGS) {
      console.error(`[ServiceWorker] ERROR: ${msg}`, err);
    }
  }
};

// ==========================================================================
// 3. CACHE SIZE EXPRIRATION MANAGER
// ==========================================================================

/**
 * Trims the oldest entries from the cache if the limit is exceeded.
 * @param {string} cacheName 
 * @param {number} maxItems 
 */
async function limitCacheSize(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length > maxItems) {
    const overflowCount = keys.length - maxItems;
    logger.debug(`Cache limit reached for '${cacheName}'. Pruning ${overflowCount} old entries.`);

    for (let i = 0; i < overflowCount; i++) {
      await cache.delete(keys[i]);
    }
  }
}

/**
 * Removes expired entries from a given cache based on an injected response header.
 * Because Cache Storage doesn't expose metadata timestamps, we store a custom header.
 * @param {string} cacheName
 * @param {number} maxAgeMs
 */
async function limitCacheAge(cacheName, maxAgeMs) {
  if (!maxAgeMs || maxAgeMs <= 0) return;

  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  const now = Date.now();
  const headerName = 'sw-cache-time';

  await Promise.all(
    keys.map(async (req) => {
      const match = await cache.match(req);
      if (!match) return;

      const cachedAtRaw = match.headers.get(headerName);
      if (!cachedAtRaw) return; // If we don't have a timestamp, keep it.

      const cachedAt = Number(cachedAtRaw);
      if (Number.isNaN(cachedAt)) return;

      if (now - cachedAt > maxAgeMs) {
        await cache.delete(req);
        logger.debug(`Cache expired: '${cacheName}' - deleted ${req.url}`);
      }
    })
  );
}

/**
 * Adds a timestamp header to a clone of the response so cache entries can be expired later.
 * @param {Response} response
 */
function withCacheTimestamp(response) {
  const newHeaders = new Headers(response.headers);
  newHeaders.set('sw-cache-time', String(Date.now()));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}


// ==========================================================================
// 4. WORKER LIFECYCLE EVENTS
// ==========================================================================

/**
 * Install Event: Cache essential static assets during worker installation.
 */
self.addEventListener('install', event => {
  logger.info('Installing and caching static shell resources.');
  
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME_STATIC);
        // Load and cache all static shell assets
        await cache.addAll(STATIC_ASSETS_TO_PRECACHE);
        logger.info('Shell pre-caching completed successfully.');
      } catch (err) {
        logger.error('Failed to pre-cache shell resources during install.', err);
      }
    })()
  );
  
  // Forces the waiting service worker to become active immediately
  self.skipWaiting();
});

/**
 * Activate Event: Clean up stale caches belonging to old service worker versions.
 */
self.addEventListener('activate', event => {
  logger.info('Activating and cleaning up old cache versions.');
  const expectedCaches = [CACHE_NAME_STATIC, CACHE_NAME_PAGES, CACHE_NAME_IMAGES];
  const projectCachePrefix = 'india-explorer-';

  event.waitUntil(
    (async () => {
      try {
        const cacheNames = await caches.keys();

        await Promise.all(
          cacheNames.map(name => {
            // Delete anything not matching the current version.
            // Keep third-party caches intact.
            const isOurCache = name.startsWith(projectCachePrefix);
            if (isOurCache && !expectedCaches.includes(name)) {
              logger.debug(`Deleting old cache repository: ${name}`);
              return caches.delete(name);
            }
          })
        );

        logger.info('Activation and cleanup completed.');
      } catch (err) {
        logger.error('Error during old cache eviction phase.', err);
      }
      
      // Assures that active pages are controlled immediately by this service worker
      await self.clients.claim();
    })()
  );
});


// ==========================================================================
// 5. CACHING STRATEGIES & REQUEST ROUTER
// ==========================================================================

/**
 * Network-First (Cache Fallback) Strategy
 * Used for dynamic documents/pages so users always get fresh content when online,
 * falling back to cache or the custom offline.html page when offline.
 */
async function networkFirstStrategy(request) {
  const url = new URL(request.url);
  logger.debug(`Executing [Network-First] strategy for: ${url.pathname}`);

  const wantsOfflineFallback =
    request.mode === 'navigate' ||
    // Some navigation requests may arrive without `mode === 'navigate'` depending on how they are triggered.
    (request.destination === '' && url.pathname.endsWith('.html')) ||
    url.pathname === '/';

  try {
    const networkResponse = await fetch(request);

    // Cache only successful GET responses to avoid stale/broken error pages.
    if (request.method === 'GET' && networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME_PAGES);
      await cache.put(request, withCacheTimestamp(networkResponse.clone()));

      // Prune in the background (size + age)
      Promise.all([
        limitCacheSize(CACHE_NAME_PAGES, CACHE_LIMITS[CACHE_NAME_PAGES]),
        limitCacheAge(CACHE_NAME_PAGES, CACHE_MAX_AGE_MS[CACHE_NAME_PAGES])
      ]).catch(() => {});
    }

    return networkResponse;
  } catch (err) {
    logger.warn(`Network fetch failed for document ${url.pathname}. Attempting cache recovery.`);

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Offline fallback for navigations/HTML routes when cache is empty.
    if (wantsOfflineFallback) {
      logger.debug(`Serving offline fallback page for: ${url.pathname}`);
      const offlineFallback = await caches.match('./offline.html');
      if (offlineFallback) {
        return offlineFallback;
      }
    }

    throw err;
  }
}


/**
 * Stale-While-Revalidate Strategy
 * Used for static text assets (scripts, stylesheets) to load them instantly from cache
 * while firing an asynchronous network request to update the cache in the background.
 */
async function staleWhileRevalidateStrategy(request) {
  const url = new URL(request.url);
  logger.debug(`Executing [Stale-While-Revalidate] strategy for: ${url.pathname}`);
  
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = (async () => {
    try {
      const networkResponse = await fetch(request);
      if (request.method === 'GET' && networkResponse && networkResponse.status === 200) {
        const cache = await caches.open(CACHE_NAME_STATIC);
        await cache.put(request, withCacheTimestamp(networkResponse.clone()));
      }
      return networkResponse;
    } catch (err) {

      logger.warn(`Background revalidation failed for asset: ${url.pathname}`, err);
      throw err;
    }
  })();
  
  // Return cached resource immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise;
}

/**
 * Cache-First (Network Fallback) Strategy
 * Used for static media files (images, audio, fonts) to minimize bandwidth.
 */
async function cacheFirstStrategy(request) {
  const url = new URL(request.url);
  logger.debug(`Executing [Cache-First] strategy for: ${url.pathname}`);

  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (request.method === 'GET' && networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME_IMAGES);
      await cache.put(request, withCacheTimestamp(networkResponse.clone()));

      // Prune in the background (size + age)
      Promise.all([
        limitCacheSize(CACHE_NAME_IMAGES, CACHE_LIMITS[CACHE_NAME_IMAGES]),
        limitCacheAge(CACHE_NAME_IMAGES, CACHE_MAX_AGE_MS[CACHE_NAME_IMAGES])
      ]).catch(() => {});
    }

    return networkResponse;
  } catch (err) {
    logger.error(`Network fallback failed for image asset: ${url.pathname}`, err);
    throw err;
  }
}


/**
 * Router Dispatcher
 * Listens to fetch events and matches requests to the appropriate caching strategy.
 */
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // 1. Bypass non-GET requests (e.g. POST, PUT, DELETE)
  if (request.method !== 'GET') {
    return;
  }
  
  // 2. Bypass chrome-extension scheme or external analytics trackers
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // 3. Bypass Firebase configurations or dynamic API endpoints
  if (url.pathname.includes('/api/firebase-config') || 
      url.pathname.includes('/firebase-config') || 
      url.pathname.includes('/auth') ||
      url.hostname.includes('firebaseapp.com') ||
      url.hostname.includes('googleapis.com')) {
    return;
  }
  
  // 4. Route Navigation / Document HTML Requests
  if (request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(networkFirstStrategy(request));
    return;
  }
  
  // 5. Route Static Assets (Scripts & Stylesheets)
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      url.pathname.endsWith('.js') || 
      url.pathname.endsWith('.css')) {
    event.respondWith(staleWhileRevalidateStrategy(request));
    return;
  }
  
  // 6. Route Media Shell Assets (Images, Icons, Fonts)
  if (request.destination === 'image' || 
      request.destination === 'font' || 
      url.pathname.endsWith('.png') || 
      url.pathname.endsWith('.jpg') || 
      url.pathname.endsWith('.jpeg') || 
      url.pathname.endsWith('.svg') || 
      url.pathname.endsWith('.woff') || 
      url.pathname.endsWith('.woff2')) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }
  
  // 7. Default Fallback Strategy: Network-First
  event.respondWith(networkFirstStrategy(request));
});

// ==========================================================================
// 6. SERVICE WORKER MESSAGE BUS (CLIENT COMMUNICATIONS)
// ==========================================================================

/**
 * Message listener to process communications from active client browser pages.
 */
self.addEventListener('message', event => {
  const data = event.data;
  if (!data || typeof data !== 'object') return;
  
  logger.info(`Message received from client page: ${data.action}`);
  
  event.waitUntil(
    (async () => {
      try {
        switch (data.action) {
          case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
          case 'CLEAR_CACHES':
            const keys = await caches.keys();
            await Promise.all(keys.map(k => caches.delete(k)));
            logger.info('All caches have been cleared manually by client.');
            if (event.ports && event.ports[0]) {
              event.ports[0].postMessage({ status: 'SUCCESS', message: 'Caches successfully cleared' });
            }
            break;
            
          case 'GET_CACHE_STATS':
            const cacheKeys = await caches.keys();
            const stats = {};
            for (const key of cacheKeys) {
              const cache = await caches.open(key);
              const items = await cache.keys();
              stats[key] = items.length;
            }
            if (event.ports && event.ports[0]) {
              event.ports[0].postMessage({ status: 'SUCCESS', stats });
            }
            break;
            
          case 'PREFETCH_URLS':
            if (Array.isArray(data.urls)) {
              logger.debug(`Prefetching dynamic URL batch: ${data.urls.length} items`);
              const cache = await caches.open(CACHE_NAME_PAGES);
              await Promise.all(
                data.urls.map(async url => {
                  try {
                    const response = await fetch(url);
                    if (response.status === 200) {
                      await cache.put(url, response);
                    }
                  } catch (e) {
                    logger.error(`Failed to prefetch target: ${url}`, e);
                  }
                })
              );
            }
            break;
            
          default:
            logger.warn(`Unrecognized message action received: ${data.action}`);
            break;
        }
      } catch (err) {
        logger.error(`Error processing client message: ${data.action}`, err);
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ status: 'ERROR', error: err.message });
        }
      }
    })()
  );
});

// ==========================================================================
// 7. BACKGROUND SYNC & NOTIFICATION HOOKS
// ==========================================================================

/**
 * Handle background sync events when connectivity is recovered.
 */
self.addEventListener('sync', event => {
  logger.info(`Background sync triggered: ${event.tag}`);
  
  if (event.tag === 'sync-chatbot-pending') {
    event.waitUntil(
      (async () => {
        logger.info('Processing pending offline chatbot interactions.');
        // Perform synchronization tasks here when online
      })()
    );
  }
});

/**
 * Handle incoming Push Notifications.
 */
self.addEventListener('push', event => {
  logger.info('Incoming push notification received.');
  
  let payload = {
    title: 'Incredible India Explorer',
    body: 'Explore the land of diversity, heritage & spice!',
    icon: './assets/icons/icon-192x192.png',
    badge: './assets/icons/badge.png'
  };
  
  if (event.data) {
    try {
      payload = event.data.json();
    } catch (e) {
      payload.body = event.data.text();
    }
  }
  
  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: payload.icon || './assets/icons/icon-192x192.png',
      badge: payload.badge || './assets/icons/badge.png',
      data: payload.data
    })
  );
});

/**
 * Handle user clicks on Push Notifications.
 */
self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  logger.info(`Push notification clicked: ${notification.title}`);
  
  notification.close();
  
  event.waitUntil(
    (async () => {
      const windowClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      
      // If a browser window is already open, focus it
      for (const client of windowClients) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Otherwise, open a new browser window to the root URL
      if (self.clients.openWindow) {
        return self.clients.openWindow('./');
      }
    })()
  );
});
