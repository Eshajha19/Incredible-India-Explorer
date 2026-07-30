/**
 * India's Coastlines Explorer
 */
(function () {
    'use strict';

    /* ================================================================
       1. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
       ================================================================ */
    
    function initScrollAnimations() {
        const revealElements = document.querySelectorAll('.reveal');

        // Check if IntersectionObserver is supported (fallback for older browsers)
        if (!('IntersectionObserver' in window)) {
            revealElements.forEach(el => el.classList.add('visible'));
            return;
        }

        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px 0px -50px 0px', // trigger slightly before it enters fully
            threshold: 0.1 // 10% of the element must be visible
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the 'visible' class to trigger the CSS animation
                    entry.target.classList.add('visible');
                    
                    // Unobserve the element once it has animated in to optimize performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            scrollObserver.observe(el);
        });
    }

    /* ================================================================
       2. THEME TOGGLE LOGIC
       ================================================================ */
    
    const themeToggleBtn = document.getElementById('theme-toggle');

    function setupThemeToggle() {
        if (!themeToggleBtn) return;

        // Check localStorage for saved theme, default to light-theme
        const savedTheme = localStorage.getItem('theme') || 'light-theme';
        document.body.className = savedTheme;
        updateToggleText(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
            const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
            
            document.body.className = newTheme;
            localStorage.setItem('theme', newTheme);
            updateToggleText(newTheme);
        });
    }

    function updateToggleText(theme) {
        if (theme === 'dark-theme') {
            themeToggleBtn.innerHTML = '☀️ Light Mode';
        } else {
            themeToggleBtn.innerHTML = '🌙 Dark Mode';
        }
    }

    /* ================================================================
       3. INIT
       ================================================================ */
    
    document.addEventListener('DOMContentLoaded', () => {
        setupThemeToggle();
        // Slight delay to ensure layout is ready before observing
        setTimeout(() => {
            initScrollAnimations();
        }, 100);
    });

})();
