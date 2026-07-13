import { initBharatGuide } from './modules/initBharatGuide.js';
import { initCuisineExplorer } from './modules/initCuisineExplorer.js';
import { initCuisinePage } from './modules/initCuisinePage.js';
import { initCulturePage } from './modules/initCulturePage.js';
import { initCultureSlider } from './modules/initCultureSlider.js';
import { initDancePage } from './modules/initDancePage.js';
import { initFestivals } from './modules/initFestivals.js';
import { initFestivalsPage } from './modules/initFestivalsPage.js';
import { initInteractiveMap } from './modules/initInteractiveMap.js';
import { initLiteraturePage } from './modules/initLiteraturePage.js';
import { initMusicPage } from './modules/initMusicPage.js';
import { initNavigation } from './modules/initNavigation.js';
import { initPersonalitiesPage } from './modules/initPersonalitiesPage.js';
import { initQuiz } from './modules/initQuiz.js';
import { initRoadTripFlipCards } from './modules/initRoadTripFlipCards.js';
import { initRotatingText } from './modules/initRotatingText.js';
import { initSciencePage } from './modules/initSciencePage.js';
import { initScrollEffects } from './modules/initScrollEffects.js';
import { initSpiritualCarousel } from './modules/initSpiritualCarousel.js';
import { initSportsPage } from './modules/initSportsPage.js';
import { initStartupPage } from './modules/initStartupPage.js';
import { initThemeToggle } from './modules/initThemeToggle.js';

document.addEventListener('app:route-changed', () => {
    initNavigation();
    initThemeToggle();
    initRotatingText();
    initRoadTripFlipCards();

    // Page detection routing
    const pathname = window.location.pathname;

    if (pathname.includes('cuisine.html')) {
        initCuisinePage();
    } else if (pathname.includes('festivals.html')) {
        initFestivalsPage();
    } else if (pathname.includes('culture.html')) {
        initCulturePage();
    } else if (pathname.includes('literature.html')) {
        initLiteraturePage();
    } else if (pathname.includes('dance.html')) {
        initDancePage();
    } else if (pathname.includes('music.html')) {
        initMusicPage();
    } else if (pathname.includes('sports.html')) {
        initSportsPage();
    } else if (pathname.includes('science.html')) {
        initSciencePage();
    } else if (pathname.includes('personalities.html')) {
        initScrollEffects();
        initPersonalitiesPage();
    } else if (pathname.includes('spiritual.html')) {
        initScrollEffects();
        initSpiritualCarousel();
    } else if (pathname.includes('startup.html')) {
        initStartupPage();
    } else if (pathname.includes('heritage.html')) {
        console.log('âœ… Heritage page loaded successfully');
    } else if (pathname.includes('monuments.html')) {
        console.log('âœ… Monuments page loaded successfully');
    } else if (pathname.includes('hidden-gems.html')) {
        console.log('âœ… Hidden Gems page loaded successfully');
    } else if (pathname.includes('railways.html')) {
        console.log('âœ… Railways Explorer page loaded successfully');
    } else if (pathname.includes('adventure.html')) {
        console.log('Adventure page loaded successfully');
    } else {
        // Main landing page (index.html or root)
        initScrollEffects();
        initInteractiveMap();
        initCuisineExplorer();
        initFestivals();
        initCultureSlider();
        initQuiz();
        initBharatGuide();
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./modules/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

