/**
 * Prahlada Narasimha Story Page Main Script
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

    if (typeof renderNarasimhaTimeline === 'function') renderNarasimhaTimeline();
    if (typeof renderSymbolism === 'function') renderSymbolism();
    if (typeof renderFestivalConnections === 'function') renderFestivalConnections();

    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('prahlada-narasimha/index.html', [{
            id: 'prahlada-narasimha-story',
            title: 'Prahlada and Narasimha — Faith Against Tyranny',
            description: 'The divine intervention of Narasimha to protect his devotee Prahlada.',
            link: 'frontend/prahlada-narasimha/index.html'
        }]);
    }
});
