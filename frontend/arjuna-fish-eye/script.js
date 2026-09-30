/**
 * Arjuna Fish's Eye Story Page Main Script
 * Handles theme toggling, navigation, and module initialization
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            document.body.classList.add('light-theme');
            themeBtn.innerHTML = '';
        } else {
            themeBtn.innerHTML = '☀️';
        }

        themeBtn.addEventListener('click', function () {
            const isLight = document.body.classList.toggle('light-theme');
            themeBtn.innerHTML = isLight ? '🌙' : '☀️';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Mobile menu toggle
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
    if (typeof renderMethodSteps === 'function') {
        renderMethodSteps();
    }

    if (typeof renderParticipants === 'function') {
        renderParticipants();
    }

    if (typeof initInteractiveDemo === 'function') {
        initInteractiveDemo();
    }

    // Register with global search if available
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('arjuna-fish-eye/index.html', [{
            id: 'arjuna-fish-eye-story',
            title: 'Arjuna and the Fish\'s Eye — The Legend of Perfect Focus',
            description: 'The legendary archery challenge that demonstrated perfect concentration and focus.',
            link: 'frontend/arjuna-fish-eye/index.html'
        }]);
    }
});
