/* ==========================================================================
   app.js — Incredible India Explorer
   Thin module loader. Loads js/* modules and dispatches app routing.
   Preserves app:route-changed SPA lifecycle (router.js integration).
   ========================================================================== */
(function() {
  'use strict';

  // ------------------------------------------------------------------------
  //  MODULE LOADER — dynamically loads js/* module scripts sequentially
  // ------------------------------------------------------------------------
  var MODULES = [
    'js/nav.js',
    'js/theme.js',
    'js/home.js',
    'js/map.js',
    'js/soundscape.js',
    'js/quiz.js',
    'js/cuisine.js',
    'js/festivals.js',
    'js/culture.js',
    'js/literature.js',
    'js/dance.js',
    'js/music.js',
    'js/sports.js',
    'js/science.js',
    'js/personalities.js',
    'js/spiritual.js',
    'js/startup.js',
    'js/bharat-guide.js'
  ];

  var modulesReady = false;

  function loadModules(callback) {
    var i = 0;
    (function next() {
      if (i >= MODULES.length) {
        modulesReady = true;
        if (typeof callback === 'function') callback();
        return;
      }
      var s = document.createElement('script');
      s.src = MODULES[i++];
      s.onload = next;
      s.onerror = next;    // skip failed modules, continue chain
      document.body.appendChild(s);
    })();
  }

  // ------------------------------------------------------------------------
  //  ROUTER — delegates to IIE.* module inits based on current page
  // ------------------------------------------------------------------------
  function route() {
    if (!modulesReady) return;

    window.IIE = window.IIE || {};
    var p = window.location.pathname;

    // ---- Common init (every page) ----
    if (window.IIE.Nav)   window.IIE.Nav.init();
    if (window.IIE.Theme) window.IIE.Theme.init();
    if (window.IIE.Home)  window.IIE.Home.initRotatingText();

    // Road trip card flip (travel.html — small, kept inline)
    initRoadTripFlipCards();

    // ---- Feature-page routing ----
    if (p.indexOf('cuisine.html') !== -1) {
      if (window.IIE.CuisinePage) window.IIE.CuisinePage.init();

    } else if (p.indexOf('festivals.html') !== -1) {
      if (window.IIE.FestivalsPage) window.IIE.FestivalsPage.init();

    } else if (p.indexOf('culture.html') !== -1) {
      if (window.IIE.CulturePage) window.IIE.CulturePage.init();

    } else if (p.indexOf('literature.html') !== -1) {
      if (window.IIE.LiteraturePage) window.IIE.LiteraturePage.init();

    } else if (p.indexOf('dance.html') !== -1) {
      if (window.IIE.DancePage) window.IIE.DancePage.init();

    } else if (p.indexOf('music.html') !== -1) {
      if (window.IIE.MusicPage) window.IIE.MusicPage.init();

    } else if (p.indexOf('sports.html') !== -1) {
      if (window.IIE.SportsPage) window.IIE.SportsPage.init();

    } else if (p.indexOf('science.html') !== -1) {
      if (window.IIE.SciencePage) window.IIE.SciencePage.init();

    } else if (p.indexOf('personalities.html') !== -1) {
      if (window.IIE.Nav)              window.IIE.Nav.initScrollEffects();
      if (window.IIE.PersonalitiesPage) window.IIE.PersonalitiesPage.init();

    } else if (p.indexOf('spiritual.html') !== -1) {
      if (window.IIE.Nav)              window.IIE.Nav.initScrollEffects();
      if (window.IIE.SpiritualCarousel) window.IIE.SpiritualCarousel.init();

    } else if (p.indexOf('startup.html') !== -1) {
      if (window.IIE.StartupPage) window.IIE.StartupPage.init();

    } else if (p.indexOf('heritage.html') !== -1 ||
               p.indexOf('monuments.html') !== -1 ||
               p.indexOf('hidden-gems.html') !== -1 ||
               p.indexOf('railways.html') !== -1 ||
               p.indexOf('adventure.html') !== -1) {
      console.log('Page loaded successfully');

    } else {
        toast.className = 'pwa-toast';
    }
    
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

const OFFLINE_QUEUE_KEY = 'offline-sync-queue';

function addToOfflineQueue(data) {
    const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
    queue.push({
        ...data,
        timestamp: Date.now()
    });
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
}

function getOfflineQueue() {
    return JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
}

function clearOfflineQueue() {
    localStorage.removeItem(OFFLINE_QUEUE_KEY);
}
// Register Service Worker for PWA
(function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;

    function detectPrefix() {
        const script = document.querySelector('script[src*="app.js"]');
        if (script) {
            const src = script.getAttribute('src');
            const match = src.match(/^(\.\.\/)+/);
            if (match) return match[0];
        }
        const subdirPatterns = ['/states/', '/forts/', '/freedom-timeline/', '/handloom/',
            '/kingdoms/', '/postal-stamps/', '/traditional-games/', '/toys/',
            '/geological-wonders/', '/innovation-timeline/'];
        const isSubdir = subdirPatterns.some(p => window.location.pathname.includes(p));
        return isSubdir ? '../' : './';
    }

    let deferredPrompt = null;

    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;
        showPWAToast('Install Incredible India Explorer for a better offline experience.', 'success');
        const installBtn = document.getElementById('install-pwa-btn');
        if (!installBtn) return;
        installBtn.style.display = 'inline-flex';
        installBtn.onclick = async () => {
            installBtn.style.display = 'none';
            deferredPrompt.prompt();
            const choice = await deferredPrompt.userChoice;
            if (choice.outcome === 'accepted') {
                console.log('PWA installed successfully.');
            }
            deferredPrompt = null;
        };
    });

    window.addEventListener('load', () => {
        const prefix = detectPrefix();

        navigator.serviceWorker.register(prefix + 'sw.js')
            .then(async (registration) => {
                console.log('ServiceWorker registration successful with scope:', registration.scope);

                if ('SyncManager' in window) {
                    try {
                        await registration.sync.register('sync-chatbot-pending');
                        console.log('Background Sync registered for chatbot-pending.');
                    } catch (err) {
                        console.error('Background Sync registration failed:', err);
                    }
                }

                registration.addEventListener('updatefound', () => {
                    const installingWorker = registration.installing;
                    if (installingWorker) {
                        installingWorker.addEventListener('statechange', () => {
                            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                showPWAToast('A newer version is available. Close and reopen to update.', 'info');
                            }
                        });
                    }
                });
            })
            .catch(err => {
                console.error('ServiceWorker registration failed:', err);
            });

        window.addEventListener('online', async () => {
            showPWAToast('Your internet connection has been restored. Welcome back online!', 'success');
            const queue = getOfflineQueue();
            if (queue.length > 0) {
                console.log('Syncing ' + queue.length + ' offline item(s)...');
                clearOfflineQueue();
                showPWAToast('Offline changes synchronized successfully.', 'success');
            }
        });

        window.addEventListener('offline', () => {
            showPWAToast('Connection lost. You are now browsing in offline mode.', 'warning');
        });

        navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'BACKGROUND_SYNC_COMPLETE') {
                showPWAToast(event.data.message, 'success');
            }
        });
    });
})();

})();
