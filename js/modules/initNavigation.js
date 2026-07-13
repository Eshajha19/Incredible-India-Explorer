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

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="literature.html"]')) {
        const literatureLink = document.createElement('a');
        literatureLink.href = 'literature.html';
        literatureLink.className = 'dropdown-item';
        literatureLink.textContent = 'Literature';
        if (currentPath.includes('literature.html')) {
            literatureLink.classList.add('active');
        }
        exploreDropdown.appendChild(literatureLink);
    }

    // Mobile Hamburger Toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close mobile menu on nav link click (excluding dropdown toggles)
    navLinks.forEach(link => {
        if (link.classList.contains('dropdown-toggle')) return;
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // Dropdown toggles toggle interaction logic
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const parentDropdown = toggle.closest('.nav-dropdown');
            if (!parentDropdown) return;

            const isOpen = parentDropdown.classList.contains('open');

            // Close other dropdowns
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                if (dropdown !== parentDropdown) {
                    dropdown.classList.remove('open');
                    const otherToggle = dropdown.querySelector('.dropdown-toggle');
                    if (otherToggle) {
                        otherToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            // Toggle current dropdown state
            if (isOpen) {
                parentDropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                parentDropdown.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Close open dropdowns when clicking outside
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

    // Scroll to Top action
    if (btnScrollTop) {
        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
