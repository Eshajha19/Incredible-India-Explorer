/* ==========================================================================
   1. NAVIGATION & SCROLL EVENTS
   ========================================================================== */   

export function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const btnScrollTop = document.getElementById('btn-scroll-top');
    const exploreDropdown = navMenu?.querySelector('.nav-dropdown .dropdown-menu');
    const currentPath = window.location.pathname;

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (btnScrollTop) btnScrollTop.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            if (btnScrollTop) btnScrollTop.classList.remove('visible');
        }
    });

    // Keep the sports, science, music, and dance pages available across the shared navigation pattern.
    if (exploreDropdown && !exploreDropdown.querySelector('a[href="dance.html"]')) {
        const danceLink = document.createElement('a');
        danceLink.href = 'dance.html';
        danceLink.className = 'dropdown-item';
        danceLink.textContent = 'Dance';
        if (currentPath.includes('dance.html')) {
            danceLink.classList.add('active');
        }
        exploreDropdown.appendChild(danceLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="sports.html"]')) {
        const sportsLink = document.createElement('a');
        sportsLink.href = 'sports.html';
        sportsLink.className = 'dropdown-item';
        sportsLink.textContent = 'Sports';
        if (currentPath.includes('sports.html')) {
            sportsLink.classList.add('active');
        }
        exploreDropdown.appendChild(sportsLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="science.html"]')) {
        const scienceLink = document.createElement('a');
        scienceLink.href = 'science.html';
        scienceLink.className = 'dropdown-item';
        scienceLink.textContent = 'Science';
        if (currentPath.includes('science.html')) {
            scienceLink.classList.add('active');
        }
        exploreDropdown.appendChild(scienceLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="music.html"]')) {
        const musicLink = document.createElement('a');
        musicLink.href = 'music.html';
        musicLink.className = 'dropdown-item';
        musicLink.textContent = 'Music';
        if (currentPath.includes('music.html')) {
            musicLink.classList.add('active');
        }
        exploreDropdown.appendChild(musicLink);
    }

    // Mobile Hamburger Toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close mobile menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // Scroll to Top action
    if (btnScrollTop) {
        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

export function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    const setThemeIcon = (isLightTheme) => {
        if (isLightTheme) {
            themeBtn.innerHTML = `
                <svg class="theme-toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M12 3v2M12 19v2M5 5l1.5 1.5M17.5 17.5L19 19M3 12h2M19 12h2M5 19l1.5-1.5M17.5 6.5L19 5" />
                    <circle cx="12" cy="12" r="4.5" />
                </svg>
            `;
            themeBtn.setAttribute('title', 'Toggle Dark Mode');
            themeBtn.setAttribute('aria-label', 'Toggle Dark Mode');
        } else {
            themeBtn.innerHTML = `
                <svg class="theme-toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M21 12.8A8.8 8.8 0 0 1 11.2 3 8.8 8.8 0 1 0 21 12.8Z" fill="currentColor" />
                </svg>
            `;
            themeBtn.setAttribute('title', 'Toggle Light Mode');
            themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
        }
    };

    // Check localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        setThemeIcon(true);
    } else {
        setThemeIcon(false);
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLightTheme = document.body.classList.contains('light-theme');
        setThemeIcon(isLightTheme);
        const theme = isLightTheme ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
}

export function initRotatingText() {
    const rotators = document.querySelectorAll('.rotating-text-wrapper');
    rotators.forEach(wrapper => {
        const wordsStr = wrapper.getAttribute('data-words');
        if (!wordsStr) return;

        const words = wordsStr.split(',').map(w => w.trim());
        if (words.length === 0) return;

        let currentIndex = 0;
        wrapper.innerHTML = `<span class="rotating-text">${words[0]}</span>`;

        setInterval(() => {
            const currentSpan = wrapper.querySelector('.rotating-text');
            currentSpan.style.animation = 'slideOutFade 0.5s ease-in forwards';

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % words.length;
                wrapper.innerHTML = `<span class="rotating-text">${words[currentIndex]}</span>`;
            }, 500);
        }, 3500); // Rotate every 3.5 seconds
    });
}

export function initScrollEffects() {
    const fadeSections = document.querySelectorAll('.fade-in-section, .story-step');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.scroll-section');

    // Section entry animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Unobserve after showing
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeSections.forEach(section => {
        fadeObserver.observe(section);
    });

    // Active link highlighting on scroll
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}



// Attach to window for global inline HTML handlers
window.initNavigation = initNavigation;
window.initThemeToggle = initThemeToggle;
window.initRotatingText = initRotatingText;
window.initScrollEffects = initScrollEffects;
