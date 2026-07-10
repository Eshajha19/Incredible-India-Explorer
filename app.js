/* INCREDIBLE INDIA EXPLORER - MAIN ENTRY (ES6 MODULE) */

import { initNavigation, initThemeToggle, initRotatingText, initScrollEffects } from './js/modules/01_navigation.js';
import { initInteractiveMap } from './js/modules/02_map.js';
import { initCuisineExplorer } from './js/modules/03_cuisine.js';
import { initFestivals } from './js/modules/04_festivals.js';
import { initCultureSlider } from './js/modules/05_culture.js';
import { initQuiz } from './js/modules/06_quiz.js';
import { initCuisinePage, initFestivalsPage, setupScrollReveals, spawnThemedParticles } from './js/modules/07_subpages.js';
import { initAudioSynth, playSoundscape, stopSoundscape, playDiwaliSoundscape, playHoliSoundscape, synthesizeDholStrike, playEidSoundscape, playPongalSoundscape, synthesizeClap, playNavratriSoundscape, synthesizeDandiyaStrike, playBihuSoundscape, playStateSoundscape, initCulturePage, initSportsPage, initSciencePage, initMusicPage, initDancePage, initStartupPage } from './js/modules/08_soundscape.js';
import { initBharatGuide } from './js/modules/09_bharat_guide.js';
import { initPersonalitiesPage } from './js/modules/10_personalities.js';
import { initSpiritualCarousel } from './js/modules/11_spiritual.js';
import { initRoadTripFlipCards } from './js/modules/12_travel.js';

// Initialize Application

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
