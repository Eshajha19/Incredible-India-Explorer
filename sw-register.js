/**
 * sw-register.js
 * Service Worker registration with automatic update detection.
 * Handles path prefix detection for subdirectory pages.
 */
(function () {
  'use strict';

  var SW_PATH = 'sw.js';
  var UPDATE_EVENT = 'sw:update';

  var registration = null;
  var waitingWorker = null;
  var isUpdating = false;

  /* ------------------------------------------------------------------
     Path prefix detection for pages living in subdirectories
     (e.g., /forts/index.html, /states/rajasthan.html)
     ------------------------------------------------------------------ */

  function detectPrefix() {
    var script = document.querySelector('script[src*="sw-register.js"]');
    if (script) {
      var src = script.getAttribute('src');
      var match = src.match(/^(\.\.\/)+/);
      if (match) return match[0];
    }

    var subdirPatterns = [
      '/states/', '/forts/', '/freedom-timeline/', '/handloom/',
      '/kingdoms/', '/postal-stamps/', '/traditional-games/', '/toys/',
      '/geological-wonders/', '/innovation-timeline/', '/ancient-mathematics-explorer/'
    ];
    return subdirPatterns.some(function (p) { return window.location.pathname.includes(p); })
      ? '../'
      : './';
  }

  /* ------------------------------------------------------------------
     Core registration logic
     ------------------------------------------------------------------ */

  function handleUpdateFound(worker) {
    waitingWorker = worker;
    var event = new CustomEvent(UPDATE_EVENT, { detail: { worker: worker } });
    document.dispatchEvent(event);
  }

  async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      return null;
    }

    try {
      var prefix = detectPrefix();
      registration = await navigator.serviceWorker.register(prefix + SW_PATH);

      // If a worker is already waiting (e.g., from a prior registration cycle)
      if (registration.waiting) {
        handleUpdateFound(registration.waiting);
      }

      // Listen for new updates while the page is open
      registration.addEventListener('updatefound', function () {
        var newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', function () {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            handleUpdateFound(newWorker);
          }
        });
      });

      return registration;
    } catch (err) {
      return null;
    }
  }

  /* ------------------------------------------------------------------
     Controller change – auto-refresh once the new SW takes over
     ------------------------------------------------------------------ */

  var refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  /* ------------------------------------------------------------------
     Public API exposed on window.appSW
     ------------------------------------------------------------------ */

  /**
   * Call this from the update-prompt UI to activate the waiting worker.
   * The controllerchange listener above will reload the page automatically.
   */
  function applyUpdate() {
    if (!waitingWorker) return;
    isUpdating = true;
    waitingWorker.postMessage({ action: 'SKIP_WAITING' });
  }

  /**
   * Returns the current ServiceWorkerRegistration, if registered.
   */
  function getRegistration() {
    return registration;
  }

  /**
   * Whether an update is currently being applied.
   */
  function getIsUpdating() {
    return isUpdating;
  }

  window.appSW = {
    register: registerServiceWorker,
    applyUpdate: applyUpdate,
    getRegistration: getRegistration,
    isUpdating: getIsUpdating
  };

  /* ------------------------------------------------------------------
     Auto-register on window load
     ------------------------------------------------------------------ */

  if (document.readyState === 'complete') {
    registerServiceWorker();
  } else {
    window.addEventListener('load', registerServiceWorker);
  }
})();
