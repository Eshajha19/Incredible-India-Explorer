/**
 * Krishna Govardhan Story Page Main Script
 */
document.addEventListener('DOMContentLoaded', function () {
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

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    if (typeof renderGovardhanTimeline === 'function') renderGovardhanTimeline();
    if (typeof renderCharacters === 'function') renderCharacters();
    if (typeof renderFestivalDetails === 'function') renderFestivalDetails();
    if (typeof renderCulturalRepresentations === 'function') renderCulturalRepresentations();

    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('krishna-govardhan/index.html', [{
            id: 'krishna-govardhan-story',
            title: 'Krishna and Govardhan — The Mountain of Protection',
            description: 'The divine story of Krishna lifting the mountain to shelter his devotees.',
            link: 'frontend/krishna-govardhan/index.html'
        }]);
    }
});

