/**
 * Yudhishthira Yaksha Story Page Main Script
 */

document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            document.body.classList.add('light-theme');
            themeBtn.innerHTML = '🌙';
        } else {
            themeBtn.innerHTML = '☀️';
        }

        themeBtn.addEventListener('click', function () {
            const isLight = document.body.classList.toggle('light-theme');
            themeBtn.innerHTML = isLight ? '🌙' : '☀️';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Mobile menu
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // Initialize modules
    if (typeof renderStoryTimeline === 'function') renderStoryTimeline();
    if (typeof renderQuestionsAnswers === 'function') renderQuestionsAnswers();
    if (typeof renderWisdomLessons === 'function') renderWisdomLessons();
    if (typeof initCulturalContext === 'function') initCulturalContext();

    // Register with global search
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('yudhishthira-yaksha/index.html', [{
            id: 'yudhishthira-yaksha-story',
            title: 'Yudhishthira and the Yaksha — The Questions of Wisdom',
            description: 'The profound philosophical dialogue between Yudhishthira and the Yaksha.',
            link: 'frontend/yudhishthira-yaksha/index.html'
        }]);
    }
});
