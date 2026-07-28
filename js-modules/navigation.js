function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const btnScrollTop = document.getElementById('btn-scroll-top');
    const exploreDropdown = navMenu?.querySelector('.nav-dropdown .dropdown-menu');
    const currentPath = window.location.pathname;

    if (navbar && navbar.dataset.listenerBound) return;
    if (navbar) navbar.dataset.listenerBound = "true";

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

    var C = window.AppConfig;

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="' + C.NAV_PATHS.DANCE + '"]')) {
        const danceLink = document.createElement('a');
        danceLink.href = C.NAV_PATHS.DANCE;
        danceLink.className = 'dropdown-item';
        danceLink.textContent = 'Dance';
        if (currentPath.includes(C.NAV_PATHS.DANCE)) {
            danceLink.classList.add(C.CLASS_ACTIVE);
        }
        exploreDropdown.appendChild(danceLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="' + C.NAV_PATHS.SPORTS + '"]')) {
        const sportsLink = document.createElement('a');
        sportsLink.href = C.NAV_PATHS.SPORTS;
        sportsLink.className = 'dropdown-item';
        sportsLink.textContent = 'Sports';
        if (currentPath.includes(C.NAV_PATHS.SPORTS)) {
            sportsLink.classList.add(C.CLASS_ACTIVE);
        }
        exploreDropdown.appendChild(sportsLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="' + C.NAV_PATHS.SCIENCE + '"]')) {
        const scienceLink = document.createElement('a');
        scienceLink.href = C.NAV_PATHS.SCIENCE;
        scienceLink.className = 'dropdown-item';
        scienceLink.textContent = 'Science';
        if (currentPath.includes(C.NAV_PATHS.SCIENCE)) {
            scienceLink.classList.add(C.CLASS_ACTIVE);
        }
        exploreDropdown.appendChild(scienceLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="' + C.NAV_PATHS.MUSIC + '"]')) {
        const musicLink = document.createElement('a');
        musicLink.href = C.NAV_PATHS.MUSIC;
        musicLink.className = 'dropdown-item';
        musicLink.textContent = 'Music';
        if (currentPath.includes(C.NAV_PATHS.MUSIC)) {
            musicLink.classList.add(C.CLASS_ACTIVE);
        }
        exploreDropdown.appendChild(musicLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="' + C.NAV_PATHS.LITERATURE + '"]')) {
        const literatureLink = document.createElement('a');
        literatureLink.href = C.NAV_PATHS.LITERATURE;
        literatureLink.className = 'dropdown-item';
        literatureLink.textContent = 'Literature';
        if (currentPath.includes(C.NAV_PATHS.LITERATURE)) {
            literatureLink.classList.add(C.CLASS_ACTIVE);
        }
        exploreDropdown.appendChild(literatureLink);
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            if (navMenu) navMenu.classList.toggle('open');
        });
    }

    navLinks.forEach(link => {
        if (link.classList.contains('dropdown-toggle')) return;
        link.addEventListener('click', () => {
            if (menuToggle) menuToggle.classList.remove('open');
            if (navMenu) navMenu.classList.remove('open');
        });
    });

    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const parentDropdown = toggle.closest('.nav-dropdown');
            if (!parentDropdown) return;

            const isOpen = parentDropdown.classList.contains('open');

            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                if (dropdown !== parentDropdown) {
                    dropdown.classList.remove('open');
                    const otherToggle = dropdown.querySelector('.dropdown-toggle');
                    if (otherToggle) {
                        otherToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            if (isOpen) {
                parentDropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                parentDropdown.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('open');
                const toggle = dropdown.querySelector('.dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    if (btnScrollTop) {
        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

if (typeof window !== 'undefined') {
    window.initNavigation = initNavigation;
}
