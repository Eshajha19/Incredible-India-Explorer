/* ==========================================================================
   MAIN.JS — Application Router for Incredible India Explorer
   Pure Vanilla JavaScript. Routes page loads to the correct module inits.
   Load LAST — after all modules have exported to window.IIE.
   ========================================================================== */
window.IIE = window.IIE || {};
(function() {
  'use strict';

  /* --------------------------------------------------------------------
     Application entry point — maps current page to module init calls.
     All calls are guarded (&&) so missing modules never throw.
     -------------------------------------------------------------------- */
  function run() {
    var pathname = window.location.pathname;

    /* ---- Common init (every page) ---- */
    if (window.IIE.Nav)   window.IIE.Nav.init();
    if (window.IIE.Theme) window.IIE.Theme.init();
    if (window.IIE.Home)  window.IIE.Home.initRotatingText();

    /* ---- Feature-page routing ---- */
    if (pathname.includes('cuisine.html')) {
      if (window.IIE.CuisinePage) window.IIE.CuisinePage.init();

    } else if (pathname.includes('festivals.html')) {
      if (window.IIE.FestivalsPage) window.IIE.FestivalsPage.init();

    } else if (pathname.includes('culture.html')) {
      if (window.IIE.CulturePage) window.IIE.CulturePage.init();

    } else if (pathname.includes('dance.html')) {
      if (window.IIE.DancePage) window.IIE.DancePage.init();

    } else if (pathname.includes('music.html')) {
      if (window.IIE.MusicPage) window.IIE.MusicPage.init();

    } else if (pathname.includes('sports.html')) {
      if (window.IIE.SportsPage) window.IIE.SportsPage.init();

    } else if (pathname.includes('science.html')) {
      if (window.IIE.SciencePage) window.IIE.SciencePage.init();

    } else if (pathname.includes('personalities.html')) {
      if (window.IIE.Nav)              window.IIE.Nav.initScrollEffects();
      if (window.IIE.PersonalitiesPage) window.IIE.PersonalitiesPage.init();

    } else if (pathname.includes('spiritual.html')) {
      if (window.IIE.Nav)              window.IIE.Nav.initScrollEffects();
      if (window.IIE.SpiritualCarousel) window.IIE.SpiritualCarousel.init();

    } else if (pathname.includes('startup.html')) {
      if (window.IIE.StartupPage) window.IIE.StartupPage.init();

    } else if (pathname.includes('heritage.html')) {
      console.log('Heritage page loaded successfully');

    } else if (pathname.includes('monuments.html')) {
      console.log('Monuments page loaded successfully');

    } else {
      /* ---- Default: index.html or root (interactive homepage) ---- */
      if (window.IIE.Nav)    window.IIE.Nav.setupScrollReveals();
      if (window.IIE.Map)    window.IIE.Map.init();
      if (window.IIE.Home)   window.IIE.Home.initCuisineExplorer();
      if (window.IIE.Home)   window.IIE.Home.initFestivals();
      if (window.IIE.Home)   window.IIE.Home.initCultureSlider();
      if (window.IIE.Quiz)   window.IIE.Quiz.init();
      if (window.IIE.BharatGuide) window.IIE.BharatGuide.init();
    }
  }

  /* ---- Expose run() so the dynamic loader can invoke it directly ---- */
  window.IIE.Main = { run: run };

  /* ---- Service Worker registration (PWA) ---- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').then(function (reg) {
        console.log('ServiceWorker registered — scope:', reg.scope);
      }, function (err) {
        console.log('ServiceWorker registration failed:', err);
      });
    });
  }

  /* ---- Fire on DOMContentLoaded, or immediately if already parsed ---- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
