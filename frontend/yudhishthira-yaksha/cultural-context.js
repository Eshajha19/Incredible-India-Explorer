/**
 * Cultural Context Module
 */

function initCulturalContext() {
    console.log("Cultural context module initialized for Yaksha page.");
    const heroSection = document.querySelector('.yaksha-hero');
    if (heroSection) {
        heroSection.setAttribute('data-cultural-theme', 'wisdom-dharma');
    }
}

window.initCulturalContext = initCulturalContext;
