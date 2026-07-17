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
      // ---- Homepage (index.html or root) ----
      if (window.IIE.Nav)        window.IIE.Nav.setupScrollReveals();
      if (window.IIE.Map)        window.IIE.Map.init();
      if (window.IIE.Home)       window.IIE.Home.initCuisineExplorer();
      if (window.IIE.Home)       window.IIE.Home.initFestivals();
      if (window.IIE.Home)       window.IIE.Home.initCultureSlider();
      if (window.IIE.Quiz)       window.IIE.Quiz.init();
      if (window.IIE.BharatGuide) window.IIE.BharatGuide.init();
    }
  }

  // ---- SPA lifecycle: listen for route changes from router.js ----
  document.addEventListener('app:route-changed', route);

  // ---- Start loading modules, then route once ----
  loadModules(function() {
    route();
  });

  // ------------------------------------------------------------------------
  //  BACKWARD COMPATIBILITY — router.js calls window.stopSoundscape()
  // ------------------------------------------------------------------------
  window.stopSoundscape = function() {
    if (window.IIE && window.IIE.Soundscape) {
      window.IIE.Soundscape.stopSoundscape();
    }
  };

  // ------------------------------------------------------------------------
  //  SERVICE WORKER REGISTRATION (PWA)
  // ------------------------------------------------------------------------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js').then(function(reg) {
        console.log('ServiceWorker registered \u2014 scope:', reg.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed:', err);
      });
    });
  }

  // ------------------------------------------------------------------------
  //  INLINE: initRoadTripFlipCards (travel.html)
  //  Too small for a module; kept here for backward compat.
  // ------------------------------------------------------------------------
  function initRoadTripFlipCards() {
    document.querySelectorAll('.roadtrip-flip-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var flipCard = btn.closest('.roadtrip-card-flip');
        if (flipCard) flipCard.classList.toggle('flipped');
      });
    });
    document.querySelectorAll('.roadtrip-card-back').forEach(function(back) {
      back.addEventListener('click', function() {
        var flipCard = back.closest('.roadtrip-card-flip');
        if (flipCard) flipCard.classList.remove('flipped');
      });
    });
  }

})();
