/* ==========================================================================
   INCREDIBLE INDIA EXPLORER - APPLICATION LOGIC
   Pure Vanilla JavaScript for dynamic content, modals, sliders, and games.
   ========================================================================== */

window.setupFocusTrap = function(modalElement) {
    if (!modalElement) return null;
    const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    const focusableElements = Array.from(modalElement.querySelectorAll(focusableSelector));
    const previousActiveElement = document.activeElement;
    
    if (focusableElements.length > 0) {
        setTimeout(() => focusableElements[0].focus(), 50);
    } else {
        modalElement.setAttribute('tabindex', '-1');
        setTimeout(() => modalElement.focus(), 50);
    }
    
    const keydownHandler = function(e) {
        if (e.key === 'Tab') {
            const elements = Array.from(modalElement.querySelectorAll(focusableSelector));
            if (elements.length === 0) return;
            const first = elements[0];
            const last = elements[elements.length - 1];
            
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === first || document.activeElement === modalElement) {
                    last.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        }
    };
    
    modalElement.addEventListener('keydown', keydownHandler);
    
    return {
        deactivate: function() {
            modalElement.removeEventListener('keydown', keydownHandler);
            if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
                setTimeout(() => previousActiveElement.focus(), 50);
            }
        }
    };
};

document.addEventListener('app:route-changed', () => {
    initNavigation();
    initThemeToggle();
    initRotatingText();

    // Page detection routing
    const pathname = window.location.pathname;

    if (pathname.includes('cuisine.html')) {
        window.lazyLoadScript('js-modules/cuisine.js').then(() => initCuisinePage());
    } else if (pathname.includes('festivals.html')) {
        window.lazyLoadScript('js-modules/festivals.js').then(() => initFestivalsPage());
    } else if (pathname.includes('culture.html')) {
        window.lazyLoadScript('js-modules/culture.js').then(() => initCulturePage());
    } else if (pathname.includes('literature.html')) {
        window.lazyLoadScript('js-modules/literature.js').then(() => initLiteraturePage());
    } else if (pathname.includes('dance.html')) {
        window.lazyLoadScript('js-modules/dance.js').then(() => initDancePage());
    } else if (pathname.includes('music.html')) {
        window.lazyLoadScript('js-modules/music.js').then(() => initMusicPage());
    } else if (pathname.includes('sports.html')) {
        window.lazyLoadScript('js-modules/sports.js').then(() => initSportsPage());
    } else if (pathname.includes('science.html')) {
        window.lazyLoadScript('js-modules/science.js').then(() => initSciencePage());
    } else if (pathname.includes('personalities.html')) {
        initScrollEffects();
        window.lazyLoadScript('js-modules/personalities.js').then(() => initPersonalitiesPage());
    } else if (pathname.includes('spiritual.html')) {
        initScrollEffects();
        window.lazyLoadScript('js-modules/spiritual.js').then(() => initSpiritualCarousel());
    } else if (pathname.includes('startup.html')) {
        window.lazyLoadScript('js-modules/startup.js').then(() => initStartupPage());
    } else if (pathname.includes('travel.html')) {
        window.lazyLoadScript('js-modules/roadtrip.js').then(() => initRoadTripFlipCards());
    } else if (pathname.includes('heritage.html')) {
        console.log('✅ Heritage page loaded successfully');
    } else if (pathname.includes('monuments.html')) {
        console.log('✅ Monuments page loaded successfully');
    } else if (pathname.includes('hidden-gems.html')) {
        console.log('✅ Hidden Gems page loaded successfully');
    } else if (pathname.includes('railways.html')) {
        console.log('✅ Railways Explorer page loaded successfully');
    } else if (pathname.includes('adventure.html')) {
        console.log('Adventure page loaded successfully');
    } else {
        // Main landing page (index.html or root)
        initScrollEffects();

        // Viewport-based lazy initialization of heavy landing page sections
        const lazyInit = (elementId, initFunc) => {
            const el = document.getElementById(elementId);
            if (el && 'IntersectionObserver' in window) {
                const obs = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            initFunc();
                            obs.disconnect();
                        }
                    });
                }, { rootMargin: '200px' });
                obs.observe(el);
            } else {
                initFunc();
            }
        };

        lazyInit('map-container', initInteractiveMap);
        lazyInit('cuisine-grid', initCuisineExplorer);
        lazyInit('festival-timeline', initFestivals);
        lazyInit('slider-container', initCultureSlider);
        lazyInit('quiz-card', initQuiz);
        lazyInit('fab-guide', initBharatGuide);
    }
});

/* ==========================================================================
   1. NAVIGATION & SCROLL EVENTS
   ========================================================================== */

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

function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    if (themeBtn.dataset.listenerBound) return;
    themeBtn.dataset.listenerBound = "true";

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

function initRotatingText() {
    const rotators = document.querySelectorAll('.rotating-text-wrapper');
    rotators.forEach(wrapper => {
        // Clear any existing active interval to prevent background task memory leaks
        if (wrapper.dataset.intervalId) {
            clearInterval(parseInt(wrapper.dataset.intervalId, 10));
        }

        const wordsStr = wrapper.getAttribute('data-words');
        if (!wordsStr) return;

        const words = wordsStr.split(',').map(w => w.trim());
        if (words.length === 0) return;

        let currentIndex = 0;
        wrapper.innerHTML = `<span class="rotating-text">${words[0]}</span>`;

        const intervalId = setInterval(() => {
            const currentSpan = wrapper.querySelector('.rotating-text');
            if (currentSpan) {
                currentSpan.style.animation = 'slideOutFade 0.5s ease-in forwards';
            }

            setTimeout(() => {
                const innerSpan = wrapper.querySelector('.rotating-text');
                if (!innerSpan) return; // Guard in case it was detached
                currentIndex = (currentIndex + 1) % words.length;
                wrapper.innerHTML = `<span class="rotating-text">${words[currentIndex]}</span>`;
            }, 500);
        }, 3500); // Rotate every 3.5 seconds

        wrapper.dataset.intervalId = intervalId.toString();
    });
}

function initScrollEffects() {
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

/* ==========================================================================
   2. INTERACTIVE INDIA MAP
   ========================================================================== */

function initInteractiveMap() {
    const mapContainer = document.getElementById('map-container');
    const tooltip = document.getElementById('map-tooltip');
    const infoPanel = document.getElementById('quick-info-panel');
    const randomBtn = document.getElementById('btn-random-state');
    const viewMoreBtn = document.getElementById('btn-sidebar-view-more');

    // Overlay Selectors
    const storyOverlay = document.getElementById('state-story-overlay');
    const overlayBackBtn = document.getElementById('state-story-back-btn');
    const overlayAudioBtn = document.getElementById('state-story-audio-btn');
    const overlayTitle = document.getElementById('state-story-title');
    const overlayCapital = document.getElementById('state-story-capital');
    const overlayMainText = document.getElementById('state-story-main-text');
    const highlightsGrid = document.getElementById('state-story-highlights-grid');
    const svgContainer = document.getElementById('state-svg-container');

    let storyOverlayFocusTrap = null;
    let comparisonOverlayFocusTrap = null;

    // State Regions Map
    const stateRegions = {
        "an": "south", "ap": "south", "ar": "northeast", "as": "northeast", "br": "east",
        "ch": "north", "ct": "central", "dd": "west", "dl": "north", "dn": "west",
        "ga": "west", "gj": "west", "hp": "north", "hr": "north", "jh": "east",
        "jk": "north", "ka": "south", "kl": "south", "ld": "south", "mh": "west",
        "ml": "northeast", "mn": "northeast", "mp": "central", "mz": "northeast",
        "nl": "northeast", "or": "east", "pb": "north", "py": "south", "rj": "west",
        "sk": "northeast", "tg": "south", "tn": "south", "tr": "northeast", "up": "north",
        "ut": "north", "wb": "east"
    };

    // Clear loader
    if (!mapContainer) return;
    mapContainer.innerHTML = '';

    // Create SVG element
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgNamespace, 'svg');
    svgElement.setAttribute('viewBox', mapData.viewBox);
    svgElement.setAttribute('class', 'india-svg-map');

    // Create group for paths
    const gElement = document.createElementNS(svgNamespace, 'g');

    // Render paths
    // Render paths
    mapData.locations.forEach(loc => {
        const pathElement = document.createElementNS(svgNamespace, 'path');
        pathElement.setAttribute('d', loc.path);
        pathElement.setAttribute('id', `state-${loc.id}`);
        pathElement.setAttribute('data-id', loc.id);
        pathElement.setAttribute('data-name', loc.name);

        // Keyboard Accessibility attributes
        pathElement.setAttribute('tabindex', '0');
        pathElement.setAttribute('role', 'button');
        pathElement.setAttribute('aria-label', loc.name);

        const showTooltip = () => {
            const tooltipStateName = document.getElementById('tooltip-state-name');
            const tooltipCapital = document.getElementById('tooltip-capital');
            const tooltipFood = document.getElementById('tooltip-food');
            const tooltipFestival = document.getElementById('tooltip-festival');
            const tooltipDesc = document.getElementById('tooltip-description');

            if (tooltipStateName) tooltipStateName.innerText = loc.name;
            if (tooltipCapital) tooltipCapital.innerText = loc.capital;
            if (tooltipFood) tooltipFood.innerText = loc.food;
            if (tooltipFestival) tooltipFestival.innerText = loc.festival;
            if (tooltipDesc) {
                tooltipDesc.innerText = loc.description.substring(0, 120) + (loc.description.length > 120 ? '…' : '');
            }
            tooltip.style.opacity = '1';
        };

        const hideTooltip = () => {
            tooltip.style.opacity = '0';
        };

        // Hover effect listeners — rich tooltip
        pathElement.addEventListener('mouseenter', showTooltip);

        pathElement.addEventListener('mousemove', (e) => {
            const tooltipW = 300;
            const tooltipH = tooltip.offsetHeight || 220;
            let x = e.clientX + 18;
            let y = e.clientY + 18;
            // Keep tooltip within viewport bounds
            if (x + tooltipW > window.innerWidth) x = e.clientX - tooltipW - 12;
            if (y + tooltipH > window.innerHeight) y = e.clientY - tooltipH - 12;
            if (x < 4) x = 4;
            if (y < 4) y = 4;
            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';
        });

        pathElement.addEventListener('mouseleave', hideTooltip);

        // Keyboard focus and blur listeners
        pathElement.addEventListener('focus', () => {
            showTooltip();
            const rect = pathElement.getBoundingClientRect();
            const tooltipW = 300;
            const tooltipH = tooltip.offsetHeight || 220;
            let x = rect.left + window.scrollX + rect.width / 2;
            let y = rect.top + window.scrollY + rect.height / 2;
            if (x + tooltipW > window.innerWidth) x = rect.left + window.scrollX - tooltipW - 12;
            if (y + tooltipH > window.innerHeight) y = rect.top + window.scrollY - tooltipH - 12;
            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';
        });

        pathElement.addEventListener('blur', hideTooltip);

        // Click interaction listener
        pathElement.addEventListener('click', () => {
            // Remove highlight from other paths
            document.querySelectorAll('.india-svg-map path').forEach(p => {
                p.classList.remove('highlighted-active');
            });

            // Highlight current
            pathElement.classList.add('highlighted-active');

            // Open state modal
            showStateDetails(loc);
        });

        // Keydown listener for space/enter keys
        pathElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                pathElement.click();
            }
        });

        gElement.appendChild(pathElement);
    });

    svgElement.appendChild(gElement);
    mapContainer.appendChild(svgElement);

    // Bind Regional Filter Highlight events
    const filterButtons = document.querySelectorAll('#map-region-filter .map-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedRegion = btn.dataset.region;
            const paths = document.querySelectorAll('.india-svg-map path');

            paths.forEach(path => {
                const stateId = path.dataset.id;
                const region = stateRegions[stateId];

                if (selectedRegion === 'all') {
                    path.classList.remove('dimmed', 'highlighted-region');
                } else if (region === selectedRegion) {
                    path.classList.remove('dimmed');
                    path.classList.add('highlighted-region');
                } else {
                    path.classList.remove('highlighted-region');
                    path.classList.add('dimmed');
                }
            });
        });
    });

    // Populate State Comparison selectors
    const compareA = document.getElementById('compare-state-a');
    const compareB = document.getElementById('compare-state-b');
    const compareBtn = document.getElementById('btn-compare-states');
    const comparisonOverlay = document.getElementById('state-comparison-overlay');
    const comparisonBackBtn = document.getElementById('comparison-back-btn');

    if (compareA && compareB) {
        compareA.innerHTML = '<option value="" disabled selected>Select First State</option>';
        compareB.innerHTML = '<option value="" disabled selected>Select Second State</option>';

        const sortedLocations = [...mapData.locations].sort((a, b) => a.name.localeCompare(b.name));
        sortedLocations.forEach(loc => {
            const optA = document.createElement('option');
            optA.value = loc.id;
            optA.textContent = loc.name;
            compareA.appendChild(optA);

            const optB = document.createElement('option');
            optB.value = loc.id;
            optB.textContent = loc.name;
            compareB.appendChild(optB);
        });
    }

    if (compareBtn) {
        compareBtn.addEventListener('click', () => {
            const idA = compareA.value;
            const idB = compareB.value;

            if (!idA || !idB) {
                alert('Please select two states to compare!');
                return;
            }

            const stateA = mapData.locations.find(loc => loc.id === idA);
            const stateB = mapData.locations.find(loc => loc.id === idB);

            if (stateA && stateB) {
                showComparison(stateA, stateB);
            }
        });
    }

    if (comparisonBackBtn) {
        comparisonBackBtn.addEventListener('click', () => {
            comparisonOverlay.classList.remove('open');
            if (comparisonOverlayFocusTrap) {
                comparisonOverlayFocusTrap.deactivate();
                comparisonOverlayFocusTrap = null;
            }
        });
    }

    /**
     * State comparison rating metrics and facts.
     * Evaluates four cultural and accessibility metrics on a 1-10 scale:
     * - heritage: Density of historical monuments and UNESCO World Heritage Sites.
     * - cuisine: Variety, uniqueness, and global prominence of regional culinary traditions.
     * - access: Transport infrastructure, tourist ease, and availability of transit options.
     * - art: Traditional dance forms, local music, painting styles, and folk festivals.
     * - fact: A short, highly engaging offline trivia highlight for side-by-side rendering.
     */
    const comparisonMetrics = {
        "an": { heritage: 7, cuisine: 8, access: 6, art: 7, fact: "Home to the historic British-era Cellular Jail and pristine Radhanagar Beach." },
        "ap": { heritage: 9, cuisine: 9, access: 8, art: 8, fact: "Famous for the richest temple in the world, Tirumala Venkateswara in Tirupati." },
        "ar": { heritage: 6, cuisine: 7, access: 5, art: 9, fact: "Houses India's largest Buddhist monastery in the high-altitude town of Tawang." },
        "as": { heritage: 8, cuisine: 8, access: 7, art: 8, fact: "Home of the endangered one-horned rhinoceros in Kaziranga National Park." },
        "br": { heritage: 10, cuisine: 7, access: 8, art: 9, fact: "The birthplace of Buddhism and the ancient international seat of Nalanda University." },
        "ch": { heritage: 7, cuisine: 8, access: 9, art: 6, fact: "India's first planned modernist city designed by architect Le Corbusier." },
        "ct": { heritage: 7, cuisine: 7, access: 6, art: 9, fact: "Known for the spectacular Chitrakote Falls, often called the Niagara of India." },
        "dd": { heritage: 7, cuisine: 8, access: 7, art: 6, fact: "Blends coastal Portuguese forts with modern beach tourism enclaves." },
        "dl": { heritage: 10, cuisine: 10, access: 10, art: 8, fact: "The historic capital of empires, containing Red Fort, Qutub Minar, and India Gate." },
        "dn": { heritage: 6, cuisine: 7, access: 7, art: 8, fact: "Known for scenic tribal enclaves and quiet Daman Ganga river walks." },
        "ga": { heritage: 8, cuisine: 9, access: 9, art: 7, fact: "World-famous for its golden sand beaches and UNESCO-listed Portuguese-era churches." },
        "gj": { heritage: 9, cuisine: 9, access: 9, art: 9, fact: "Features the world's tallest statue, Statue of Unity, and Gir Forest wildlife sanctuaries." },
        "hp": { heritage: 7, cuisine: 7, access: 7, art: 8, fact: "Known for breathtaking snowcapped valleys and Dharamshala, home of the Dalai Lama." },
        "hr": { heritage: 7, cuisine: 8, access: 9, art: 7, fact: "Mentioned heavily in ancient texts; contains the historic battlefield of Kurukshetra." },
        "jh": { heritage: 7, cuisine: 7, access: 7, art: 8, fact: "The mineral capital of India, rich in waterfalls and tribal traditions." },
        "jk": { heritage: 8, cuisine: 9, access: 7, art: 9, fact: "Often called 'Paradise on Earth', famous for Dal Lake houseboats and apple orchards." },
        "ka": { heritage: 10, cuisine: 9, access: 9, art: 9, fact: "Home to the glorious ruins of the Vijayanagara Empire in Hampi." },
        "kl": { heritage: 8, cuisine: 9, access: 8, art: 10, fact: "Called 'God's Own Country', famous for backwaters, Ayurveda, and Kathakali." },
        "ld": { heritage: 5, cuisine: 8, access: 5, art: 6, fact: "A coral archipelago featuring rich marine life and blue lagoons." },
        "mh": { heritage: 10, cuisine: 10, access: 10, art: 9, fact: "Home to the rock-cut masterpiece Ajanta and Ellora Caves." },
        "ml": { heritage: 6, cuisine: 8, access: 6, art: 8, fact: "Home of the cleanest village in Asia (Mawlynnong) and living root bridges." },
        "mn": { heritage: 6, cuisine: 7, access: 6, art: 9, fact: "Birthplace of Polo and home to Loktak, the world's only floating lake." },
        "mp": { heritage: 9, cuisine: 8, access: 8, art: 9, fact: "Known as the heart of India, featuring Khajuraho temples and tiger reserves." },
        "mz": { heritage: 5, cuisine: 7, access: 5, art: 8, fact: "Known for mist-covered hills and Bamboo Dance (Cheraw)." },
        "nl": { heritage: 6, cuisine: 7, access: 6, art: 9, fact: "Host of the world-famous Hornbill Festival, showcasing diverse tribal heritage." },
        "or": { heritage: 9, cuisine: 8, access: 8, art: 9, fact: "Famous for the Sun Temple in Konark and Jagannath Rath Yatra." },
        "pb": { heritage: 8, cuisine: 10, access: 9, art: 8, fact: "Contains the magnificent Golden Temple, the spiritual center of Sikhism." },
        "py": { heritage: 7, cuisine: 9, access: 8, art: 7, fact: "A scenic French-heritage enclave and home of the utopian city Auroville." },
        "rj": { heritage: 10, cuisine: 10, access: 9, art: 10, fact: "The land of kings, famous for massive desert hillforts and grand palaces." },
        "sk": { heritage: 7, cuisine: 8, access: 6, art: 8, fact: "India's first organic state, offering panoramic views of Mount Kanchenjunga." },
        "tg": { heritage: 9, cuisine: 9, access: 9, art: 8, fact: "Famous for Charminar, Hyderabadi Biryani, and Kakatiya architecture." },
        "tn": { heritage: 10, cuisine: 9, access: 9, art: 10, fact: "Home to the oldest surviving classical language, Tamil, and massive Gopuram temples." },
        "tr": { heritage: 7, cuisine: 7, access: 6, art: 8, fact: "Known for Neermahal, a spectacular water palace built in the center of Lake Rudrasagar." },
        "up": { heritage: 10, cuisine: 10, access: 9, art: 9, fact: "Contains the Taj Mahal, one of the Seven Wonders of the World, and holy Varanasi." },
        "ut": { heritage: 8, cuisine: 7, access: 8, art: 8, fact: "The Land of Gods, containing the Himalayan Valley of Flowers." },
        "wb": { heritage: 9, cuisine: 10, access: 9, art: 10, fact: "The cultural capital, home to Nobel laureate Rabindranath Tagore and Sundarbans." }
    };

    function showComparison(stateA, stateB) {
        const colA = document.getElementById('comparison-column-a');
        const colB = document.getElementById('comparison-column-b');

        const metricsA = comparisonMetrics[stateA.id] || { heritage: 7, cuisine: 7, access: 7, art: 7, fact: "" };
        const metricsB = comparisonMetrics[stateB.id] || { heritage: 7, cuisine: 7, access: 7, art: 7, fact: "" };

        function makeMeters(metrics) {
            return `
                <div style="margin-top:20px;">
                    <div style="margin-bottom:12px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px; font-weight:600; color:var(--muted-text);">
                            <span>Heritage Richness</span>
                            <span>${metrics.heritage}/10</span>
                        </div>
                        <div style="background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
                            <div style="background:var(--saffron); width:${metrics.heritage * 10}%; height:100%; border-radius:3px;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom:12px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px; font-weight:600; color:var(--muted-text);">
                            <span>Culinary Diversity</span>
                            <span>${metrics.cuisine}/10</span>
                        </div>
                        <div style="background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
                            <div style="background:var(--primary-gold); width:${metrics.cuisine * 10}%; height:100%; border-radius:3px;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom:12px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px; font-weight:600; color:var(--muted-text);">
                            <span>Tourist Access & Transit</span>
                            <span>${metrics.access}/10</span>
                        </div>
                        <div style="background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
                            <div style="background:#00f2fe; width:${metrics.access * 10}%; height:100%; border-radius:3px;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom:20px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px; font-weight:600; color:var(--muted-text);">
                            <span>Artistic Traditions</span>
                            <span>${metrics.art}/10</span>
                        </div>
                        <div style="background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
                            <div style="background:var(--green); width:${metrics.art * 10}%; height:100%; border-radius:3px;"></div>
                        </div>
                    </div>
                </div>
            `;
        }

        if (colA && colB) {
            colA.innerHTML = `
                <h2 style="color:var(--primary-gold); margin-bottom:5px;">${stateA.name}</h2>
                <p style="color:var(--saffron); font-weight:600; margin-top:0; font-size:1.1rem;">🏛️ Capital: ${stateA.capital}</p>
                <div style="margin:20px 0; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:15px;">
                    <p style="color:var(--text-color); line-height:1.6; font-size: 0.95rem;">${stateA.description}</p>
                </div>
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">🍲 Famous Food</h4>
                <p style="margin-top:0; margin-bottom:20px; font-size: 0.95rem;">${stateA.food}</p>
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">🎉 Major Festival</h4>
                <p style="margin-top:0; margin-bottom:25px; font-size: 0.95rem;">${stateA.festival}</p>
                
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">📊 Metric Analysis</h4>
                ${makeMeters(metricsA)}
                <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; margin-bottom:25px; font-size:0.9rem; line-height:1.5; color:var(--muted-text);">
                    <strong>Key Fact:</strong> ${metricsA.fact}
                </div>
                
                <button class="btn btn-primary" onclick="window.appRouter ? window.appRouter.handleRoute('states/${stateA.id}.html', true) : window.location.href='states/${stateA.id}.html'" style="font-size:0.9rem; padding:8px 18px;">Explore Full Page</button>
            `;

            colB.innerHTML = `
                <h2 style="color:var(--primary-gold); margin-bottom:5px;">${stateB.name}</h2>
                <p style="color:var(--saffron); font-weight:600; margin-top:0; font-size:1.1rem;">🏛️ Capital: ${stateB.capital}</p>
                <div style="margin:20px 0; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:15px;">
                    <p style="color:var(--text-color); line-height:1.6; font-size: 0.95rem;">${stateB.description}</p>
                </div>
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">🍲 Famous Food</h4>
                <p style="margin-top:0; margin-bottom:20px; font-size: 0.95rem;">${stateB.food}</p>
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">🎉 Major Festival</h4>
                <p style="margin-top:0; margin-bottom:25px; font-size: 0.95rem;">${stateB.festival}</p>
                
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">📊 Metric Analysis</h4>
                ${makeMeters(metricsB)}
                <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; margin-bottom:25px; font-size:0.9rem; line-height:1.5; color:var(--muted-text);">
                    <strong>Key Fact:</strong> ${metricsB.fact}
                </div>
                
                <button class="btn btn-primary" onclick="window.appRouter ? window.appRouter.handleRoute('states/${stateB.id}.html', true) : window.location.href='states/${stateB.id}.html'" style="font-size:0.9rem; padding:8px 18px;">Explore Full Page</button>
            `;
        }

        comparisonOverlay.classList.add('open');
        comparisonOverlayFocusTrap = window.setupFocusTrap(comparisonOverlay);
    }

    // Overlay Close Triggers
    overlayBackBtn.addEventListener('click', closeOverlay);

    // ESC key closes overlay
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeOverlay();
            comparisonOverlay.classList.remove('open');
            if (comparisonOverlayFocusTrap) {
                comparisonOverlayFocusTrap.deactivate();
                comparisonOverlayFocusTrap = null;
            }
        }
    });

    // View More Button Trigger - Navigate to individual state page via SPA router or standard href
    viewMoreBtn?.addEventListener('click', () => {
        const currentId = viewMoreBtn.getAttribute('data-active-id');
        const targetPath = `states/${currentId}.html`;
        if (window.appRouter && typeof window.appRouter.handleRoute === 'function') {
            window.appRouter.handleRoute(targetPath, true);
        } else {
            window.location.href = targetPath;
        }
    });

    // Helper functions
    function showStateDetails(loc) {
        // Set Details
        overlayTitle.innerText = loc.name;
        overlayCapital.innerText = loc.capital;

        // Format story text as paragraph lines
        const storyRaw = loc.story || loc.description;
        const paragraphs = storyRaw.split('\\n\\n').map(pText => `<p class="story-paragraph">${pText}</p>`).join('');
        overlayMainText.innerHTML = paragraphs;

        // Reapply Drop Cap on first paragraph
        const firstPara = overlayMainText.querySelector('.story-paragraph');
        if (firstPara) firstPara.classList.add('drop-cap');

        // Set up highlights
        highlightsGrid.innerHTML = `
            <div class="highlight-bullet"><span class="bullet-icon">&#127963;</span><span>Capital: ${loc.capital}</span></div>
            <div class="highlight-bullet"><span class="bullet-icon">&#127835;</span><span>Famous Food: ${loc.food}</span></div>
            <div class="highlight-bullet"><span class="bullet-icon">&#127881;</span><span>Major Festival: ${loc.festival}</span></div>
        `;

        // Render SVG in canvas
        svgContainer.innerHTML = `
             <svg viewBox="${mapData.viewBox}" style="width: 80%; height: auto; max-height: 50vh; filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.5)); fill: var(--primary-gold);">
                 <path d="${loc.path}"></path>
             </svg>
         `;

        // Set dynamic theme class based on region or just a default vibrant state theme
        storyOverlay.className = 'story-overlay theme-default';

        // Open Overlay
        storyOverlay.classList.add('open');
        storyOverlayFocusTrap = window.setupFocusTrap(storyOverlay);

        // Update Quick Info Sidebar Panel
        infoPanel.className = "info-card active-state";
        const infoContent = document.getElementById('info-panel-content');
        if (infoContent) {
            infoContent.innerHTML = `
                <div class="info-card-header">
                    <div class="icon-circle">IN</div>
                    <h3>${loc.name}</h3>
                </div>
                <p class="info-card-text">
                    <strong>Capital:</strong> ${loc.capital}<br>
                    <strong>Famous Food:</strong> ${loc.food}<br>
                    <strong>Festival:</strong> ${loc.festival}
                </p>
                <p class="info-card-text" style="font-size: 0.95rem; margin-top: -15px;">
                    ${loc.description.substring(0, 110)}...
                </p>
            `;
        }

        if (viewMoreBtn) {
            viewMoreBtn.classList.remove('hidden');
            viewMoreBtn.setAttribute('data-active-id', loc.id);
        }

        // Bind audio button
        overlayAudioBtn.classList.remove('playing');
        overlayAudioBtn.innerHTML = '<span class="audio-icon">&#128266;</span> Listen to Soundscape';
        stopSoundscape();

        overlayAudioBtn.onclick = () => {
            if (overlayAudioBtn.classList.contains('playing')) {
                overlayAudioBtn.classList.remove('playing');
                overlayAudioBtn.innerHTML = '<span class="audio-icon">&#128266;</span> Listen to Soundscape';
                stopSoundscape();
            } else {
                overlayAudioBtn.classList.add('playing');
                overlayAudioBtn.innerHTML = '<span class="audio-icon">&#128263;</span> Stop Soundscape';
                playStateSoundscape(loc.name);
            }
        };

        // Bind inner overlay tabs logic
        const tabButtons = document.querySelectorAll('#state-overlay-tabs .state-tab-btn');
        const tabPanels = document.querySelectorAll('.state-tab-panel');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tabButtons.forEach(b => {
                    b.classList.remove('active');
                    b.style.color = 'var(--muted-text)';
                    b.style.fontWeight = 'normal';
                });
                btn.classList.add('active');
                btn.style.color = 'var(--primary-gold)';
                btn.style.fontWeight = 'bold';

                const targetTab = btn.dataset.tab;
                tabPanels.forEach(panel => {
                    if (panel.id === `state-tab-${targetTab}`) {
                        panel.classList.remove('hidden');
                    } else {
                        panel.classList.add('hidden');
                    }
                });
            });
        });

        // Initialize to first overview tab
        const defaultTab = document.querySelector('#state-overlay-tabs .state-tab-btn[data-tab="overview"]');
        if (defaultTab) {
            defaultTab.click();
        }

        setupScrollReveals();
        spawnStateParticles();
    }

    function spawnStateParticles() {
        const particlesContainer = document.getElementById('state-canvas-particles');
        if (!particlesContainer) return;
        particlesContainer.innerHTML = '';
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'canvas-particle';
            const size = Math.random() * 6 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = (Math.random() * 2) + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.background = 'rgba(255, 255, 255, 0.4)';
            particlesContainer.appendChild(particle);
        }
    }

    function closeOverlay() {
        storyOverlay.classList.remove('open');
        stopSoundscape();
        if (storyOverlayFocusTrap) {
            storyOverlayFocusTrap.deactivate();
            storyOverlayFocusTrap = null;
        }
    }

    // Explore Random State Action
    randomBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * mapData.locations.length);
        const randomLoc = mapData.locations[randomIndex];

        // Remove previous highlight
        document.querySelectorAll('.india-svg-map path').forEach(p => {
            p.classList.remove('highlighted-active');
        });

        // Trigger path element selection
        const pathEl = document.getElementById(`state-${randomLoc.id}`);
        if (pathEl) {
            pathEl.classList.add('highlighted-active');
            pathEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Show details
        showStateDetails(randomLoc);
    });
}

/* ==========================================================================
   3. CUISINE EXPLORER
   ========================================================================== */

function initCuisineExplorer() {
    const cuisineGrid = document.getElementById('cuisine-grid');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // Initial render
    if (!cuisineGrid) return;
    renderCuisines('all');

    // Filter Trigger click
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active status
            tabBtns.forEach(b => b.classList.remove('active'));
            // Set current active
            btn.classList.add('active');

            const region = btn.getAttribute('data-region');

            // Fading grid animation
            cuisineGrid.style.opacity = '0';
            cuisineGrid.style.transform = 'translateY(15px)';
            cuisineGrid.style.transition = 'opacity 0.25s, transform 0.25s';

            setTimeout(() => {
                renderCuisines(region);
                cuisineGrid.style.opacity = '1';
                cuisineGrid.style.transform = 'translateY(0)';
            }, 250);
        });
    });

    function renderCuisines(regionFilter) {
        cuisineGrid.innerHTML = '';

        const filteredList = regionFilter === 'all'
            ? cuisinesData
            : cuisinesData.filter(item => item.region === regionFilter);

        filteredList.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'cuisine-card glass-card';

            // Determine region badge color
            let badgeClass = 'saffron-bg';
            if (dish.region === 'south') badgeClass = 'gold-bg';
            if (dish.region === 'east') badgeClass = 'green-bg';
            if (dish.region === 'west') badgeClass = 'saffron-bg';
            if (dish.region === 'northeast') badgeClass = 'gold-bg';

            card.innerHTML = `
                <div class="cuisine-card-image">
                    <img src="${dish.image}" alt="${dish.name}" loading="lazy">
                    <span class="cuisine-region-badge ${badgeClass}">${dish.region} India</span>
                </div>
                <div class="cuisine-card-body">
                    <span class="cuisine-origin">${dish.state}</span>
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                </div>
            `;

            cuisineGrid.appendChild(card);
        });
    }
}

/* ==========================================================================
   4. FESTIVALS TIMELINE
   ========================================================================== */

function initFestivals() {
    const festivalTimeline = document.getElementById('festival-timeline');
    const stateModal = document.getElementById('state-modal');

    if (!festivalTimeline) return;
    festivalTimeline.innerHTML = '';

    festivalsData.forEach(fest => {
        const card = document.createElement('div');
        card.className = 'festival-card glass-card';
        card.innerHTML = `
            <img class="festival-card-img" src="${fest.image}" alt="${fest.name}" loading="lazy">
            <div class="festival-card-content">
                <span class="subtitle">${fest.subtitle}</span>
                <h3>${fest.name}</h3>
                <p>${fest.description}</p>
            </div>
        `;

        // Click festival to navigate to the detailed festivals page
        card.addEventListener('click', () => {
            window.location.href = 'festivals.html';
        });

        festivalTimeline.appendChild(card);
    });
}

/* ==========================================================================
   5. CULTURE SLIDER (CAROUSEL)
   ========================================================================== */

function initCultureSlider() {
    const track = document.getElementById('slider-track');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dotsContainer = document.getElementById('slider-dots');

    let currentSlide = 0;

    // Render Culture Items
    if (!track) return;
    track.innerHTML = '';
    cultureData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'slider-card';
        card.innerHTML = `
            <img class="slider-card-img" src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="slider-card-body">
                <span class="slider-card-category">${item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        track.appendChild(card);
    });

    // Render Navigation Dots
    dotsContainer.innerHTML = '';
    const totalCards = cultureData.length;

    // Determine responsive slide count limits
    function getVisibleSlidesCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function getMaxSlides() {
        return Math.max(0, totalCards - getVisibleSlidesCount());
    }

    function updateDots() {
        dotsContainer.innerHTML = '';
        const dotsCount = getMaxSlides() + 1;

        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('span');
            dot.className = `dot ${i === currentSlide ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                currentSlide = i;
                moveSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function moveSlider() {
        // Limit slide bounds
        const maxSlides = getMaxSlides();
        if (currentSlide < 0) currentSlide = 0;
        if (currentSlide > maxSlides) currentSlide = maxSlides;

        const cardWidthPercent = 100 / getVisibleSlidesCount();
        const gapOffset = 30 * currentSlide / getVisibleSlidesCount(); // 30px is gap in CSS

        // Dynamic track translation calculation
        const percentTranslation = currentSlide * cardWidthPercent;

        // Apply styling transform
        track.style.transform = `translateX(calc(-${percentTranslation}% - ${currentSlide * 20}px))`;

        // Update dot highlights
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Button controls click listeners
    nextBtn.addEventListener('click', () => {
        currentSlide++;
        moveSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide--;
        moveSlider();
    });

    // ------------------------------------------------------------------
    // TOUCH SWIPE SUPPORT (mobile)
    // Uses touchstart / touchmove / touchend â€” no external libraries.
    // Minimum threshold of 50px filters out accidental micro-drags.
    // The vertical guard prevents stealing vertical page-scroll gestures.
    // { passive: false } on touchmove lets us call preventDefault() to
    // stop page judder when a horizontal swipe is confirmed.
    // ------------------------------------------------------------------
    const sliderContainer = document.getElementById('slider-container');
    if (!sliderContainer) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false; // true once we've committed to a horizontal drag

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        isSwiping = false;
    }, { passive: true });

    sliderContainer.addEventListener('touchmove', (e) => {
        const deltaX = e.changedTouches[0].screenX - touchStartX;
        const deltaY = e.changedTouches[0].screenY - touchStartY;

        // Commit to horizontal swipe only when horizontal movement is dominant
        if (!isSwiping && Math.abs(deltaX) > Math.abs(deltaY)) {
            isSwiping = true;
        }

        // Once committed to horizontal swipe, block vertical page scroll
        if (isSwiping) {
            e.preventDefault();
        }
    }, { passive: false });

    sliderContainer.addEventListener('touchend', (e) => {
        if (!isSwiping) return; // was a vertical scroll â€” do nothing

        const deltaX = e.changedTouches[0].screenX - touchStartX;
        const SWIPE_THRESHOLD = 50; // px â€” ignore accidental micro-drags

        if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
            if (deltaX < 0) {
                // Swiped left â†’ advance to next slide
                currentSlide++;
            } else {
                // Swiped right â†’ go back to previous slide
                currentSlide--;
            }
            moveSlider();
        }

        isSwiping = false;
    }, { passive: true });
    // ------------------------------------------------------------------

    // Initialize layout dots
    updateDots();

    // Re-adjust slider items on resize
    window.addEventListener('resize', () => {
        const max = getMaxSlides();
        if (currentSlide > max) {
            currentSlide = max;
        }
        updateDots();
        moveSlider();
    });
}

/* ==========================================================================
   6. FOOD QUIZ GAME
   ========================================================================== */

function initQuiz() {
    // Screen containers
    const introScreen = document.getElementById('quiz-intro-screen');
    const questionScreen = document.getElementById('quiz-question-screen');
    const resultScreen = document.getElementById('quiz-result-screen');

    // Buttons
    const startBtn = document.getElementById('btn-start-quiz');
    const restartBtn = document.getElementById('btn-restart-quiz');
    const heroStartBtn = document.getElementById('btn-start-quiz-hero');

    // Gameplay fields
    const currentQNum = document.getElementById('current-q-num');
    const progressFill = document.getElementById('quiz-progress-fill');
    const questionText = document.getElementById('quiz-question-text');
    const optionsGrid = document.getElementById('quiz-options-grid');
    const feedback = document.getElementById('quiz-feedback');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');
    const finalScore = document.getElementById('quiz-final-score');
    const resultMsg = document.getElementById('quiz-result-message');

    let currentQuestionIndex = 0;
    let score = 0;
    let locked = false;

    // Start triggers
    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (restartBtn) restartBtn.addEventListener('click', startQuiz);

    if (heroStartBtn) {
        heroStartBtn.addEventListener('click', () => {
            // Scroll to quiz and start
            document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
            startQuiz();
        });
    }

    function startQuiz() {
        if (!introScreen) return;
        currentQuestionIndex = 0;
        score = 0;
        locked = false;

        introScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        questionScreen.classList.remove('hidden');

        loadQuestion();
    }

    function loadQuestion() {
        locked = false;
        feedback.classList.add('hidden');

        const q = quizQuestions[currentQuestionIndex];
        const shuffledOptions = [...q.options];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }

        // Set texts and fills
        currentQNum.innerText = currentQuestionIndex + 1;
        progressFill.style.width = ((currentQuestionIndex + 1) / 8 * 100) + '%';
        questionText.innerText = q.question;

        // Load Options buttons
        optionsGrid.innerHTML = '';
        shuffledOptions.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            btn.addEventListener('click', () => selectOption(btn, opt));
            optionsGrid.appendChild(btn);
        });
    }

    function selectOption(clickedBtn, selectedVal) {
        if (locked) return;
        locked = true;

        const q = quizQuestions[currentQuestionIndex];
        const isCorrect = (selectedVal === q.answer);

        const optionBtns = optionsGrid.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.classList.add('disabled');
            // Show correct solution regardless
            if (btn.innerText === q.answer) {
                btn.classList.add('correct');
            }
        });

        if (isCorrect) {
            clickedBtn.classList.add('correct');
            score++;
            showFeedback(true);
        } else {
            clickedBtn.classList.add('wrong');
            showFeedback(false, q.answer);
        }

        // Delay loading next stage
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }, 1800);
    }

    function showFeedback(isCorrect, correctAnswer) {
        feedback.classList.remove('hidden', 'correct', 'wrong');

        if (isCorrect) {
            feedback.classList.add('correct');
            feedbackIcon.innerText = '✅';
            feedbackText.innerText = 'Correct! Great job!';
        } else {
            feedback.classList.add('wrong');
            feedbackIcon.innerText = '❌';
            feedbackText.innerText = `Incorrect. The answer is ${correctAnswer}`;
        }
    }

    function showResults() {
        questionScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');

        finalScore.innerText = score;

        // Select message matching rank
        if (score === 8) {
            resultMsg.innerText = "Incredible Mastermind!  🥳 You scored a perfect 8/8! You are an expert on India's vast culinary heritage!";
            document.getElementById('quiz-result-icon').innerText = '🎉';
        } else if (score >= 5) {
            resultMsg.innerText = `Great score! 👍 You got ${score}/8 correct. You have a solid grasp of Indian cuisine!`;
            document.getElementById('quiz-result-icon').innerText = '🎉';
        } else {
            resultMsg.innerText = `You scored ${score}/8. Keep exploring the interactive map and food lists to discover more flavors! 🍛`;
            document.getElementById('quiz-result-icon').innerText = '🍛';
        }
    }
}

/* ==========================================================================
   SUB-PAGES INITIALIZATION LOGIC & MAPPINGS
   ========================================================================== */

// Stubs for lazy-loaded pages
function initCuisinePage() {}
function initFestivalsPage() {}



/* ==========================================================================
   WEB AUDIO API SOUNDSCAPE SYNTHESIZER
   ========================================================================== */
var audioCtx = null;
var soundscapeActive = false;
var audioTimeout = null;
var currentFestivalPlaying = '';
var activeAudioNodes = [];

function initAudioSynth() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playSoundscape(festName, drumElement) {
    initAudioSynth();
    stopSoundscape();

    soundscapeActive = true;
    currentFestivalPlaying = festName;

    if (festName === "Diwali") {
        playDiwaliSoundscape(drumElement);
    } else if (festName === "Holi") {
        playHoliSoundscape();
    } else if (festName === "Eid") {
        playEidSoundscape();
    } else if (festName === "Pongal") {
        playPongalSoundscape();
    } else if (festName === "Navratri") {
        playNavratriSoundscape(drumElement);
    } else if (festName === "Bihu") {
        playBihuSoundscape(drumElement);
    }
}

function stopSoundscape() {
    soundscapeActive = false;
    currentFestivalPlaying = '';
    if (audioTimeout) {
        clearTimeout(audioTimeout);
        audioTimeout = null;
    }
    // Stop all active running nodes to prevent leaks (especially Eid drone)
    activeAudioNodes.forEach(node => {
        try {
            node.stop();
        } catch (e) {
            // Already stopped or not started
        }
    });
    activeAudioNodes = [];
}

// 1. Diwali Sparkler crackles & dynamic flame flickers
function playDiwaliSoundscape(flameElement) {
    if (!soundscapeActive || currentFestivalPlaying !== "Diwali") return;

    const time = audioCtx.currentTime;
    const bufferSize = audioCtx.sampleRate * 0.08;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() > 0.985 ? (Math.random() * 2 - 1) : 0;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 5000;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.06, time);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start();

    // Sparkle flicker visual sync
    if (flameElement && Math.random() > 0.5) {
        flameElement.style.transform = `scale(${Math.random() * 0.2 + 0.95}) rotate(${Math.random() * 4 - 2}deg)`;
        setTimeout(() => {
            if (flameElement) flameElement.style.transform = '';
        }, 100);
    }

    audioTimeout = setTimeout(() => playDiwaliSoundscape(flameElement), 80 + Math.random() * 150);
}

// 2. Holi Dhol strike rhythm
function playHoliSoundscape() {
    let beatIndex = 0;
    const tempo = 120;
    const beatDuration = 60 / tempo;

    function playBeatLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Holi") return;

        const pattern = [1, 0, 0.6, 1, 1, 0, 0.6, 0.4];
        const strength = pattern[beatIndex % pattern.length];

        if (strength > 0) {
            synthesizeDholStrike(strength);
        }

        beatIndex++;
        audioTimeout = setTimeout(playBeatLoop, (beatDuration * 1000) / 2);
    }
    playBeatLoop();
}

function synthesizeDholStrike(strength) {
    const time = audioCtx.currentTime;

    // Low drum body
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(strength >= 1 ? 65 : 85, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.35);

    gain.gain.setValueAtTime(strength * 0.45, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.35);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.4);

    // High head snap
    const snapOsc = audioCtx.createOscillator();
    const snapGain = audioCtx.createGain();
    snapOsc.type = "triangle";
    snapOsc.frequency.setValueAtTime(280, time);
    snapOsc.frequency.exponentialRampToValueAtTime(80, time + 0.07);

    snapGain.gain.setValueAtTime(strength * 0.1, time);
    snapGain.gain.exponentialRampToValueAtTime(0.01, time + 0.07);

    snapOsc.connect(snapGain);
    snapGain.connect(audioCtx.destination);
    snapOsc.start(time);
    snapOsc.stop(time + 0.08);
}

// 3. Eid Serene ambient drone & hanging chimes
function playEidSoundscape() {
    let chimeIndex = 0;

    // Continuous ambient drone oscillators
    const drone1 = audioCtx.createOscillator();
    const drone2 = audioCtx.createOscillator();
    const droneGain = audioCtx.createGain();

    drone1.type = "sine";
    drone1.frequency.value = 110; // A2
    drone2.type = "triangle";
    drone2.frequency.value = 165; // E3
    droneGain.gain.value = 0.035;

    drone1.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(audioCtx.destination);

    drone1.start();
    drone2.start();

    activeAudioNodes.push(drone1, drone2);

    function playChimeLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Eid") {
            try { drone1.stop(); } catch (e) { }
            try { drone2.stop(); } catch (e) { }
            return;
        }

        const scale = [440, 494, 554, 659, 740]; // Pentatonic Major
        const freq = scale[chimeIndex % scale.length];

        const time = audioCtx.currentTime;
        const chime = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        chime.type = "sine";
        chime.frequency.value = freq;
        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 1.5);

        chime.connect(gain);
        gain.connect(audioCtx.destination);
        chime.start(time);
        chime.stop(time + 1.6);

        chimeIndex++;
        audioTimeout = setTimeout(playChimeLoop, 1500 + Math.random() * 2000);
    }
    playChimeLoop();
}

// 4. Pongal Harvest syncopations
function playPongalSoundscape() {
    let beatIndex = 0;
    const tempo = 96;
    const beatDuration = 60 / tempo;

    function playPongalLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Pongal") return;

        const pattern = [1, 0, 0, 1, 0.5, 0, 1, 0.4];
        const strength = pattern[beatIndex % pattern.length];

        if (strength > 0) {
            synthesizeClap(strength);
        }

        beatIndex++;
        audioTimeout = setTimeout(playPongalLoop, (beatDuration * 1000) / 2);
    }
    playPongalLoop();
}

function synthesizeClap(strength) {
    const time = audioCtx.currentTime;
    const bufferSize = audioCtx.sampleRate * 0.08;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1100;
    filter.Q.value = 3;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(strength * 0.16, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start(time);
}

// 5. Navratri Dandiya tapping sticks
function playNavratriSoundscape(sticksElement) {
    let beatIndex = 0;
    const tempo = 124;
    const beatDuration = 60 / tempo;

    function playNavratriLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Navratri") return;

        const pattern = [1, 1, 0.6, 1, 0, 1, 1, 0.6];
        const strength = pattern[beatIndex % pattern.length];

        if (strength > 0) {
            synthesizeDandiyaStrike(strength);
            if (sticksElement) {
                sticksElement.classList.add('beat-pulse');
                setTimeout(() => sticksElement.classList.remove('beat-pulse'), 150);
            }
        }

        beatIndex++;
        audioTimeout = setTimeout(playNavratriLoop, (beatDuration * 1000) / 2);
    }
    playNavratriLoop();
}

function synthesizeDandiyaStrike(strength) {
    const time = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(1350, time);
    osc.frequency.exponentialRampToValueAtTime(750, time + 0.04);

    gain.gain.setValueAtTime(strength * 0.14, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.05);
}

// 6. Bihu High-tempo Assamese Dhol beat
function playBihuSoundscape(drumElement) {
    let beatIndex = 0;
    const tempo = 142;
    const beatDuration = 60 / tempo;

    function playBihuLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Bihu") return;

        const pattern = [1, 0.5, 1, 0.5, 1, 1, 0.5, 1];
        const strength = pattern[beatIndex % pattern.length];

        if (strength > 0) {
            synthesizeDholStrike(strength * 1.1);
            if (drumElement) {
                drumElement.classList.add('beat-pulse');
                setTimeout(() => drumElement.classList.remove('beat-pulse'), 150);
            }
        }

        beatIndex++;
        audioTimeout = setTimeout(playBihuLoop, (beatDuration * 1000) / 2);
    }
    playBihuLoop();
}

// 7. Generic State Ambient Drone
function playStateSoundscape(stateName) {
    initAudioSynth();
    stopSoundscape();

    soundscapeActive = true;
    currentFestivalPlaying = "State";

    // Play a mystical sitar/flute-like ambient drone
    const drone1 = audioCtx.createOscillator();
    const drone2 = audioCtx.createOscillator();
    const droneGain = audioCtx.createGain();

    drone1.type = "sine";
    drone1.frequency.value = 146.83; // D3
    drone2.type = "triangle";
    drone2.frequency.value = 220.00; // A3

    droneGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 2); // Fade in

    drone1.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(audioCtx.destination);

    drone1.start();
    drone2.start();

    activeAudioNodes.push(drone1, drone2);

    // Add occasional wind chimes/bells
    function playStateChime() {
        if (!soundscapeActive || currentFestivalPlaying !== "State") return;

        const scale = [587.33, 659.25, 739.99, 880.00, 987.77]; // D Major Pentatonic
        const freq = scale[Math.floor(Math.random() * scale.length)];

        const time = audioCtx.currentTime;
        const chime = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        chime.type = "sine";
        chime.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 2);

        chime.connect(gain);
        gain.connect(audioCtx.destination);
        chime.start(time);
        chime.stop(time + 2.1);

        audioTimeout = setTimeout(playStateChime, 2000 + Math.random() * 4000);
    }
    playStateChime();
}


/* ==========================================================================
   SUB-PAGES INITIALIZATION LOGIC STUBS
   ========================================================================== */
function initCulturePage() { console.log("Culture page stub called"); }
function initSportsPage() { console.log("Sports page stub called"); }
function initSciencePage() { console.log("Science page stub called"); }
function initMusicPage() { console.log("Music page stub called"); }
function initLiteraturePage() { console.log("Literature page stub called"); }
function initDancePage() { console.log("Dance page stub called"); }
function initStartupPage() { console.log("Startup page stub called"); }
function initPersonalitiesPage() { console.log("Personalities page stub called"); }
function initSpiritualCarousel() { console.log("Spiritual page stub called"); }
function initRoadTripFlipCards() { console.log("Roadtrip page stub called"); }


function initBharatGuide() {
    const fabGuide = document.getElementById('fab-guide');
    const chatWindow = document.getElementById('guide-chat-window');
    const btnCloseChat = document.getElementById('btn-close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const btnSendMsg = document.getElementById('btn-send-msg');

    if (!fabGuide) return; // Not on this page

    // Knowledge Graph is now loaded from chatbot-data.js

    let isSynthesizing = false;

    // Toggle Chat
    fabGuide.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            chatInput.focus();
        }
    });

    btnCloseChat.addEventListener('click', () => {
        chatWindow.classList.remove('open');
        if (isSynthesizing) {
            window.speechSynthesis.cancel();
            isSynthesizing = false;
        }
    });

    // Send Message
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'user-message');
        chatInput.value = '';

        // Determine bot response using external knowledge base
        let response = "I'm sorry, I seem to be having trouble accessing my knowledge base. Let's try again later.";
        if (typeof findBestResponse === 'function') {
            response = findBestResponse(text);
        }

        // Show typing indicator
        const typingId = showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator(typingId);
            addMessage(response, 'bot-message');
            speakResponse(response);
        }, 1200 + Math.random() * 800);
    }

    btnSendMsg.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Chat UI helpers
    function addMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message';
        msgDiv.id = id;
        msgDiv.innerHTML = `
            <div class="message-content typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    renderTimeline();
    renderTimelineDetail(timelineData[0]);
    setActiveTimelineButton(timelineGrid.querySelector('[data-timeline-id="all"]'));
    renderAthletes();
    setActiveFilterButton(activeFilter);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.getAttribute('data-sports-filter') || 'all';
            setActiveFilterButton(activeFilter);

            const matchingMilestone = timelineData.find(item => item.category === activeFilter) || timelineData[0];
            activeTimelineId = matchingMilestone.id;
            setActiveTimelineButton(timelineGrid.querySelector(`[data-timeline-id="${matchingMilestone.id}"]`));
            renderTimelineDetail(matchingMilestone);
            renderAthletes();
        });
    });

    searchInput.addEventListener('input', () => {
        renderAthletes();
    });

    timelineGrid.addEventListener('click', (event) => {
        const button = event.target.closest('[data-timeline-filter]');
        if (!button) return;

        const filter = button.getAttribute('data-timeline-filter') || 'all';
        activeTimelineId = button.getAttribute('data-timeline-id') || 'all';
        activeFilter = filter;
        setActiveFilterButton(filter);
        setActiveTimelineButton(button);

        const milestone = timelineData.find(item => item.id === activeTimelineId) || timelineData[0];
        renderTimelineDetail(milestone);
        renderAthletes();
        sportsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (!isModalOpen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key === 'Tab') {
            trapModalFocus(event);
        }
    });

    function setActiveFilterButton(filterValue) {
        filterButtons.forEach(btn => {
            const isActive = (btn.getAttribute('data-sports-filter') || 'all') === filterValue;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function setActiveTimelineButton(activeButton) {
        const buttons = timelineGrid.querySelectorAll('[data-timeline-filter]');
        buttons.forEach(btn => {
            const isActive = activeButton ? btn === activeButton : false;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function renderAthletes() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredAthletes = athleteData.filter(athlete => {
            const matchesFilter = activeFilter === 'all' || athlete.category === activeFilter;
            const matchesSearch = !query || [
                athlete.name,
                athlete.subtitle,
                athlete.summary,
                athlete.story,
                athlete.category,
                ...(athlete.highlights || [])
            ].join(' ').toLowerCase().includes(query);
            return matchesFilter && matchesSearch;
        });

        athleteGrid.innerHTML = '';

        if (filteredAthletes.length === 0) {
            athleteGrid.innerHTML = `
                <div class="sports-empty-state glass-card">
                    <h3>No athletes found</h3>
                    <p>Try a different search term or switch back to All categories.</p>
                    <button type="button" class="btn btn-primary" id="sports-reset-filters">Show All Athletes</button>
                </div>
            `;

            const resetBtn = document.getElementById('sports-reset-filters');
            resetBtn?.addEventListener('click', () => {
                searchInput.value = '';
                activeFilter = 'all';
                activeTimelineId = 'all';
                setActiveFilterButton('all');
                setActiveTimelineButton(timelineGrid.querySelector('[data-timeline-id="all"]'));
                renderTimelineDetail(timelineData[0]);
                renderAthletes();
            });
            return;
        }

        filteredAthletes.forEach(athlete => {
            const card = document.createElement('article');
            card.className = 'athlete-card glass-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for ${athlete.name}`);
            card.setAttribute('data-category', athlete.category);

            card.innerHTML = `
                <div class="athlete-card-header">
                    <div class="athlete-media ${athlete.category}">
                        <img src="${athlete.image}" alt="${athlete.name}" loading="lazy">
                    </div>
                    <div class="athlete-card-title">
                        <span class="sports-badge ${athlete.category}">${getCategoryLabel(athlete.category)}</span>
                        <h3>${athlete.name}</h3>
                        <p>${athlete.subtitle}</p>
                    </div>
                </div>
                <p class="athlete-summary">${athlete.summary}</p>
                <div class="achievement-chip-row">
                    ${athlete.highlights.map(item => `<span class="achievement-chip">${item}</span>`).join('')}
                </div>
                <div class="athlete-card-footer">
                    <span class="card-sport-note">Click to explore career highlights</span>
                    <button type="button" class="btn btn-secondary athlete-view-btn">View Details</button>
                </div>
            `;

            card.addEventListener('click', () => openModal(athlete, card));
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal(athlete, card);
                }
            });

            athleteGrid.appendChild(card);
        });
    }

    function renderTimeline() {
        timelineGrid.innerHTML = '';

        timelineData.forEach(item => {
            const timelineButton = document.createElement('button');
            timelineButton.type = 'button';
            timelineButton.className = `sports-timeline-item glass-card ${item.category}`;
            timelineButton.setAttribute('data-timeline-filter', item.category);
            timelineButton.setAttribute('data-timeline-id', item.id);
            timelineButton.setAttribute('aria-pressed', 'false');
            timelineButton.innerHTML = `
                <span class="timeline-year">${item.year}</span>
                <span class="sports-badge ${item.category}">${getCategoryLabel(item.category)}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
            `;

            timelineGrid.appendChild(timelineButton);
        });
    }

    function renderTimelineDetail(item) {
        timelineDetail.innerHTML = `
            <div class="timeline-detail-head">
                <span class="sports-badge ${item.category}">${getCategoryLabel(item.category)}</span>
                <span class="timeline-detail-year">${item.year}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.detail}</p>
        `;
    }

    function openModal(athlete, trigger) {
        lastFocusedTrigger = trigger || document.activeElement;
        isModalOpen = true;

        modalCategory.className = `sports-badge ${athlete.category}`;
        modalCategory.textContent = getCategoryLabel(athlete.category);
        modalTitle.textContent = athlete.name;
        modalSubtitle.textContent = athlete.subtitle;
        modalStory.textContent = athlete.story;

        modalHighlights.innerHTML = athlete.highlights.map(item => `<li>${item}</li>`).join('');
        modalStats.innerHTML = athlete.stats.map(stat => `
            <div class="modal-stat">
                <span class="modal-stat-label">${stat.label}</span>
                <span class="modal-stat-value">${stat.value}</span>
            </div>
        `).join('');

        modalAvatar.className = `sports-modal-avatar ${athlete.category}`;
        modalAvatar.innerHTML = `<img src="${athlete.image}" alt="${athlete.name}" loading="lazy">`;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            modalClose.focus();
        });
    }

    function closeModal() {
        if (!isModalOpen) return;

        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isModalOpen = false;

        if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
            lastFocusedTrigger.focus();
        }
    }

    function trapModalFocus(event) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements.length) return;

        const focusable = Array.from(focusableElements).filter(el => !el.hasAttribute('disabled'));
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function getCategoryLabel(category) {
        if (category === 'cricket') return 'Cricket';
        if (category === 'olympics') return 'Olympics';
        if (category === 'indigenous') return 'Indigenous Sports';
        return 'All';
    }
}

function initSciencePage() {
    const scienceAsset = fileName => `assets/science/${encodeURIComponent(fileName)}`;
    const statsGrid = document.getElementById('science-stats-grid');
    const isroGrid = document.getElementById('science-isro-grid');
    const scientistGrid = document.getElementById('science-scientist-grid');
    const searchInput = document.getElementById('science-search-input');
    const filterButtons = document.querySelectorAll('[data-science-filter]');
    const timelineGrid = document.getElementById('science-timeline');
    const timelineDetail = document.getElementById('science-timeline-detail');
    const modal = document.getElementById('science-modal');
    const modalClose = document.getElementById('science-modal-close');
    const modalAvatar = document.getElementById('science-modal-avatar');
    const modalCategory = document.getElementById('science-modal-category');
    const modalTitle = document.getElementById('science-modal-title');
    const modalSubtitle = document.getElementById('science-modal-subtitle');
    const modalStory = document.getElementById('science-modal-story');
    const modalHighlights = document.getElementById('science-modal-highlights');
    const modalStats = document.getElementById('science-modal-stats');

    if (!statsGrid || !isroGrid || !scientistGrid || !searchInput || !filterButtons.length || !timelineGrid || !timelineDetail || !modal || !modalClose) {
        return;
    }

    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('is-visible');
    });

    const statsData = [
        {
            label: 'Space missions',
            value: '100+',
            detail: 'India has built a deep track record across Earth orbit, lunar, Mars, and solar science missions.'
        },
        {
            label: 'Nobel-winning discovery',
            value: 'Raman Effect',
            detail: "C. V. Raman's 1928 discovery reshaped physics and earned the 1930 Nobel Prize."
        },
        {
            label: 'Satellites launched',
            value: '400+',
            detail: 'Indian launch systems have carried domestic and international payloads into orbit for decades.'
        },
        {
            label: 'Research institutions',
            value: '70+',
            detail: 'Premier labs, councils, and universities continue to power discovery across the country.'
        }
    ];

    const isroData = [
        { id: 'chandrayaan-3', year: '2023', title: 'Chandrayaan-3', type: 'Lunar Mission', category: 'space', image: scienceAsset('chandrayaan-3.png'), summary: "India achieved a historic soft landing near the Moon's south polar region.", contribution: 'Precision landing, rover operations, and reusable landing systems.', highlights: ['South polar region', 'Pragyan rover', 'Soft landing milestone'] },
        { id: 'mangalyaan', year: '2013', title: 'Mangalyaan', type: 'Mars Mission', category: 'space', image: scienceAsset('mangalyaan.png'), summary: 'The Mars Orbiter Mission proved India could reach another planet on a disciplined budget.', contribution: 'Reliable interplanetary navigation and deep-space operations.', highlights: ['Mars orbit insertion', 'Low-cost engineering', 'Global recognition'] },
        { id: 'aryabhata', year: '1975', title: 'Aryabhata', type: 'First Satellite', category: 'space', image: scienceAsset('aryabhata.png'), summary: "India's first satellite opened the country's space era.", contribution: 'A foundation for later launch, communications, and observation programs.', highlights: ['First Indian satellite', '1975 launch', 'Space age milestone'] },
        { id: 'aditya-l1', year: '2023', title: 'Aditya-L1', type: 'Solar Mission', category: 'space', image: scienceAsset('aditya-l1.png'), summary: "India's solar observatory studies the Sun from the L1 vantage point.", contribution: 'Solar corona, winds, and space-weather observations.', highlights: ['Sun monitoring', 'L1 halo orbit', 'Space weather'] }
    ];

    const scientistData = [
        { id: 'cv-raman', category: 'physics', image: scienceAsset('cv-raman.png'), name: 'C. V. Raman', subtitle: 'Physics pioneer', achievement: 'Discovered the Raman Effect.', contribution: 'Showed how light changes wavelength while scattering through matter.', story: 'C. V. Raman transformed Indian science with the Raman Effect, a discovery that became one of the most famous results in modern physics. His work placed India on the global scientific map and inspired generations of researchers.', highlights: ['1930 Nobel Prize', 'Raman spectroscopy', 'Foundational physics'], stats: [{ label: 'Field', value: 'Physics' }, { label: 'Legacy', value: 'Light scattering' }, { label: 'Era', value: '1920s-1950s' }] },
        { id: 'apj-abdul-kalam', category: 'space', image: scienceAsset('apj-abudal kalam.png'), name: 'A. P. J. Abdul Kalam', subtitle: 'Missile scientist and teacher', achievement: "Helped lead India's launch and missile programs.", contribution: 'Connected engineering, space systems, and national ambition.', story: "A. P. J. Abdul Kalam became one of India's most admired science leaders. His work in rockets, missile development, and public science communication made him a symbol of aspiration and possibility.", highlights: ['Launch systems', 'Missile development', 'Public science leader'], stats: [{ label: 'Field', value: 'Space' }, { label: 'Known for', value: 'Guiding large systems' }, { label: 'Legacy', value: "People's President" }] },
        { id: 'vikram-sarabhai', category: 'space', image: scienceAsset('vikram-sarabhai.png'), name: 'Vikram Sarabhai', subtitle: 'Father of Indian space program', achievement: 'Built the vision that became ISRO.', contribution: 'Championed satellites, applications, and scientific institutions.', story: "Vikram Sarabhai argued that space technology should solve real problems on Earth. That vision shaped India's space program into a practical national platform for communication, weather, and science.", highlights: ['ISRO inspiration', 'Space applications', 'Institution builder'], stats: [{ label: 'Field', value: 'Space' }, { label: 'Role', value: 'Visionary' }, { label: 'Legacy', value: 'Institution builder' }] },
        { id: 'homi-bhabha', category: 'physics', image: scienceAsset('homi-bhabha.png'), name: 'Homi J. Bhabha', subtitle: 'Architect of nuclear science', achievement: 'Founded major Indian research institutions.', contribution: 'Built long-term scientific capacity in physics and atomic research.', story: "Homi J. Bhabha helped establish a strong scientific foundation through TIFR and other research efforts. His work strengthened India's capacity in physics, energy, and advanced research.", highlights: ['TIFR founder', 'Atomic research', 'Scientific institution builder'], stats: [{ label: 'Field', value: 'Physics' }, { label: 'Focus', value: 'Research ecosystem' }, { label: 'Legacy', value: 'Foundational leader' }] },
        { id: 'janaki-ammal', category: 'biology', image: scienceAsset('janaki-ammal.png'), name: 'Janaki Ammal', subtitle: 'Botanist and cytogeneticist', achievement: 'Advanced plant breeding and biodiversity research.', contribution: 'Improved understanding of Indian flora and agricultural genetics.', story: 'Janaki Ammal became a pioneering voice in botany and cytogenetics. Her work on plants, chromosomes, and biodiversity helped frame a more scientific approach to agriculture and conservation.', highlights: ['Botany pioneer', 'Plant genetics', 'Biodiversity research'], stats: [{ label: 'Field', value: 'Biology' }, { label: 'Focus', value: 'Plants' }, { label: 'Legacy', value: 'Trailblazing researcher' }] },
        { id: 'ms-swaminathan', category: 'agriculture', image: scienceAsset('ms-swaminathan.png'), name: 'M. S. Swaminathan', subtitle: 'Green Revolution leader', achievement: 'Helped transform food security in India.', contribution: 'Improved crop productivity and agricultural resilience.', story: "M. S. Swaminathan played a defining role in India's Green Revolution. His research and advocacy improved agricultural output and made food security a central national priority.", highlights: ['Green Revolution', 'Food security', 'Crop science'], stats: [{ label: 'Field', value: 'Agriculture' }, { label: 'Focus', value: 'Crop systems' }, { label: 'Legacy', value: 'Food security' }] },
        { id: 'srinivasa-ramanujan', category: 'mathematics', image: scienceAsset('srinivas-ramanujan.png'), name: 'Srinivasa Ramanujan', subtitle: 'Mathematical prodigy', achievement: 'Expanded number theory with deep new identities.', contribution: 'Left a lasting mark on pure mathematics and analytic number theory.', story: "Srinivasa Ramanujan's formulas and insights continue to influence mathematics worldwide. His work remains a reminder that original thinking can emerge far from established centers of power.", highlights: ['Number theory', 'Infinite series', 'Global mathematics icon'], stats: [{ label: 'Field', value: 'Mathematics' }, { label: 'Style', value: 'Pure insight' }, { label: 'Legacy', value: 'International influence' }] }
    ];

    const timelineData = [
        { id: 'raman-effect', category: 'physics', year: '1928', title: 'Raman Effect discovered', summary: 'A landmark physics breakthrough in light scattering.', detail: 'C. V. Raman and K. S. Krishnan showed that light can change wavelength when it scatters through a medium. The result became a defining achievement for Indian science and a foundation for spectroscopy.' },
        { id: 'tifr-founded', category: 'physics', year: '1945', title: 'TIFR is founded', summary: 'A leading center for advanced Indian research takes shape.', detail: 'Homi J. Bhabha helped establish the Tata Institute of Fundamental Research, creating a long-term home for physics, mathematics, and broader scientific inquiry.' },
        { id: 'isro-founded', category: 'space', year: '1969', title: 'ISRO is founded', summary: 'India organizes a national space program for satellites and launch systems.', detail: "The Indian Space Research Organisation brought together launch, satellite, and research efforts under one national mission. It became the backbone of India's modern space capability." },
        { id: 'aryabhata-launch', category: 'space', year: '1975', title: 'Aryabhata enters orbit', summary: 'India launches its first satellite and steps into the space age.', detail: "Aryabhata marked the country's first successful satellite mission and proved that India could design, build, and launch hardware for space exploration." },
        { id: 'mangalyaan-launch', category: 'space', year: '2013', title: 'Mangalyaan launches', summary: 'The Mars Orbiter Mission earns global attention.', detail: 'Mangalyaan demonstrated precise interplanetary engineering and efficient mission design. Its success became a symbol of Indian scientific discipline and ambition.' },
        { id: 'chandrayaan-3-landing', category: 'space', year: '2023', title: 'Chandrayaan-3 lands on the Moon', summary: 'India completes a historic soft landing near the lunar south pole.', detail: 'Chandrayaan-3’s landing created a defining scientific moment. The mission combined robotics, navigation, and lander control to achieve a feat that resonated across the world.' },
        { id: 'aditya-l1-orbit', category: 'space', year: '2024', title: 'Aditya-L1 reaches orbit', summary: 'India turns its focus toward the Sun and space weather.', detail: "Aditya-L1 helps study the Sun's corona, winds, and solar activity from the L1 vantage point. It expanded India's portfolio from planetary exploration to solar science." }
    ];

    const categoryLabels = {
        all: 'All',
        space: 'Space',
        physics: 'Physics',
        medicine: 'Medicine',
        agriculture: 'Agriculture',
        mathematics: 'Mathematics',
        biology: 'Biology'
    };

    let activeFilter = 'all';
    let activeTimelineId = timelineData[0].id;
    let lastFocusedTrigger = null;
    let isModalOpen = false;

    renderStats();
    renderIsroCards();
    renderTimeline();
    renderTimelineDetail(timelineData[0]);
    setActiveTimelineButton(timelineGrid.querySelector(`[data-science-timeline-id="${timelineData[0].id}"]`));
    renderScientists();
    setActiveFilterButton(activeFilter);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.getAttribute('data-science-filter') || 'all';
            setActiveFilterButton(activeFilter);
            renderScientists();
        });
    });

    searchInput.addEventListener('input', () => {
        renderScientists();
    });

    timelineGrid.addEventListener('click', event => {
        const button = event.target.closest('[data-science-timeline-id]');
        if (!button) return;

        activeTimelineId = button.getAttribute('data-science-timeline-id') || timelineData[0].id;
        const milestone = timelineData.find(item => item.id === activeTimelineId) || timelineData[0];
        setActiveTimelineButton(button);
        renderTimelineDetail(milestone);
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', event => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', event => {
        if (!isModalOpen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key === 'Tab') {
            trapModalFocus(event);
        }
    });

    function renderStats() {
        statsGrid.innerHTML = statsData.map(stat => `
            <article class="science-stat-card glass-card">
                <span class="science-stat-label">${stat.label}</span>
                <strong class="science-stat-value">${stat.value}</strong>
                <p class="science-stat-detail">${stat.detail}</p>
            </article>
        `).join('');
    }

    function renderIsroCards() {
        isroGrid.innerHTML = isroData.map(item => `
            <article class="science-isro-card glass-card" data-mission-type="${item.category}">
                <div class="science-isro-card-top">
                    <div class="science-mission-avatar science-avatar-frame" aria-hidden="true">
                        <img class="science-avatar-image science-avatar-image-contain" src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
                    </div>
                    <div class="science-isro-card-head">
                        <span class="science-badge ${item.category}">${categoryLabels[item.category] || 'Space'}</span>
                        <span class="science-mission-year">${item.year}</span>
                    </div>
                </div>
                <h3>${item.title}</h3>
                <p class="science-mission-summary">${item.summary}</p>
                <p class="science-mission-contribution">${item.contribution}</p>
                <div class="science-chip-row">${item.highlights.map(highlight => `<span class="science-chip">${highlight}</span>`).join('')}</div>
            </article>
        `).join('');
    }

    function renderScientists() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredScientists = scientistData.filter(scientist => {
            const matchesFilter = activeFilter === 'all' || scientist.category === activeFilter;
            const matchesSearch = !query || [scientist.name, scientist.subtitle, scientist.achievement, scientist.contribution, scientist.story, scientist.category, ...(scientist.highlights || [])].join(' ').toLowerCase().includes(query);
            return matchesFilter && matchesSearch;
        });

        scientistGrid.innerHTML = '';

        if (filteredScientists.length === 0) {
            scientistGrid.innerHTML = `
                <div class="science-empty-state glass-card">
                    <h3>No scientists found</h3>
                    <p>Try a different search term or switch back to All Fields.</p>
                    <button type="button" class="btn btn-primary" id="science-reset-filters">Show All Scientists</button>
                </div>
            `;

            document.getElementById('science-reset-filters')?.addEventListener('click', () => {
                searchInput.value = '';
                activeFilter = 'all';
                setActiveFilterButton('all');
                renderScientists();
            });
            return;
        }

        filteredScientists.forEach(scientist => {
            const card = document.createElement('article');
            card.className = 'science-scientist-card glass-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for ${scientist.name}`);
            card.setAttribute('data-category', scientist.category);
            card.setAttribute('data-scientist-id', scientist.id);

            card.innerHTML = `
                <div class="science-scientist-card-head">
                    <div class="science-scientist-avatar science-avatar-frame ${scientist.category} ${scientist.id}" aria-hidden="true">
                        <img class="science-avatar-image science-avatar-image-cover" src="${scientist.image}" alt="${scientist.name}" loading="lazy" decoding="async">
                    </div>
                    <div class="science-scientist-title">
                        <span class="science-badge ${scientist.category}">${categoryLabels[scientist.category] || scientist.category}</span>
                        <h3>${scientist.name}</h3>
                        <p>${scientist.subtitle}</p>
                    </div>
                </div>
                <p class="science-scientist-achievement">${scientist.achievement}</p>
                <p class="science-scientist-contribution">${scientist.contribution}</p>
                <div class="science-chip-row">${scientist.highlights.map(item => `<span class="science-chip">${item}</span>`).join('')}</div>
                <div class="science-scientist-footer">
                    <span class="science-card-note">Click to explore achievements</span>
                    <button type="button" class="btn btn-secondary science-view-btn">Open Details</button>
                </div>
            `;

            card.addEventListener('click', () => openModal(scientist, card));
            card.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal(scientist, card);
                }
            });

            scientistGrid.appendChild(card);
        });
    }

    function renderTimeline() {
        timelineGrid.innerHTML = timelineData.map(item => `
            <button type="button" class="science-timeline-item glass-card ${item.category}" data-science-timeline-id="${item.id}" aria-pressed="false">
                <span class="timeline-year">${item.year}</span>
                <span class="science-badge ${item.category}">${categoryLabels[item.category] || 'Science'}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
            </button>
        `).join('');
    }

    function renderTimelineDetail(item) {
        timelineDetail.innerHTML = `
            <div class="timeline-detail-head">
                <span class="science-badge ${item.category}">${categoryLabels[item.category] || 'Science'}</span>
                <span class="timeline-detail-year">${item.year}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.detail}</p>
        `;
    }

    function setActiveFilterButton(filterValue) {
        filterButtons.forEach(btn => {
            const isActive = (btn.getAttribute('data-science-filter') || 'all') === filterValue;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function setActiveTimelineButton(activeButton) {
        const buttons = timelineGrid.querySelectorAll('[data-science-timeline-id]');
        buttons.forEach(btn => {
            const isActive = activeButton ? btn === activeButton : false;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function openModal(scientist, trigger) {
        lastFocusedTrigger = trigger || document.activeElement;
        isModalOpen = true;

        modalCategory.className = `science-badge ${scientist.category}`;
        modalCategory.textContent = categoryLabels[scientist.category] || scientist.category;
        modalTitle.textContent = scientist.name;
        modalSubtitle.textContent = scientist.subtitle;
        modalStory.textContent = scientist.story;

        modalHighlights.innerHTML = scientist.highlights.map(item => `<li>${item}</li>`).join('');
        modalStats.innerHTML = scientist.stats.map(stat => `
            <div class="modal-stat">
                <span class="modal-stat-label">${stat.label}</span>
                <span class="modal-stat-value">${stat.value}</span>
            </div>
        `).join('');

        modalAvatar.className = `science-modal-avatar science-avatar-frame ${scientist.category} ${scientist.id}`;
        modalAvatar.innerHTML = `<img class="science-avatar-image science-avatar-image-cover" src="${scientist.image}" alt="${scientist.name}" loading="lazy" decoding="async">`;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            modalClose.focus();
        });
    }

    function closeModal() {
        if (!isModalOpen) return;

        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isModalOpen = false;

        if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
            lastFocusedTrigger.focus();
        }
    }

    function trapModalFocus(event) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusableElements.length) return;

        const focusable = Array.from(focusableElements).filter(el => !el.hasAttribute('disabled'));
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
}

function initMusicPage() {
    const musicAsset = fileName => `assets/music/${encodeURI(fileName)}`;
    const artistGrid = document.getElementById('music-artist-grid');
    const summaryPanel = document.getElementById('music-genre-summary');
    const searchInput = document.getElementById('music-search-input');
    const tabButtons = document.querySelectorAll('[data-music-tab]');
    const instrumentGrid = document.getElementById('music-instrument-grid');
    const modal = document.getElementById('music-modal');
    const modalClose = document.getElementById('music-modal-close');
    const modalAvatar = document.getElementById('music-modal-avatar');
    const modalBadge = document.getElementById('music-modal-badge');
    const modalTitle = document.getElementById('music-modal-title');
    const modalSubtitle = document.getElementById('music-modal-subtitle');
    const modalContribution = document.getElementById('music-modal-contribution');
    const modalRegion = document.getElementById('music-modal-region');
    const modalInstruments = document.getElementById('music-modal-instruments');
    const modalHighlights = document.getElementById('music-modal-highlights');

    if (!artistGrid || !summaryPanel || !searchInput || !tabButtons.length || !instrumentGrid || !modal || !modalClose) {
        return;
    }

    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('is-visible');
    });

    const genreData = {
        classical: {
            label: 'Classical',
            badge: 'Classical lineages',
            title: 'Ragas, gharanas, and temple traditions',
            description: 'Indian classical music carries rigorous melodic and rhythmic systems that reward patience, improvisation, and deep listening. From khayal and dhrupad to Carnatic kritis, the tradition is defined by disciplined expression and living transmission.',
            accent: 'classical',
            chips: ['Raga structure', 'Concert discipline', 'Guru-shishya lineages']
        },
        folk: {
            label: 'Folk',
            badge: 'Community sound',
            title: 'Songs rooted in seasons, labor, and ritual',
            description: 'Folk music keeps everyday memory alive through harvest songs, devotional choruses, wedding pieces, and oral storytelling. It is direct, regional, and deeply tied to local identity.',
            accent: 'folk',
            chips: ['Oral tradition', 'Festival rhythm', 'Regional voices']
        },
        modern: {
            label: 'Modern',
            badge: 'Contemporary sound',
            title: 'Film, fusion, indie, and global reach',
            description: 'Modern Indian music blends cinema, pop, electronica, and crossover sounds. It connects old melodies to new production, widening the audience for Indian voices across languages and platforms.',
            accent: 'modern',
            chips: ['Film music', 'Fusion bands', 'Streaming culture']
        }
    };

    const artistData = [
        {
            id: 'ravi-shankar',
            genre: 'classical',
            name: 'Ravi Shankar',
            subtitle: 'Sitar maestro and global ambassador',
            image: musicAsset('ravi-shankar.png'),
            region: 'Bengal / Pan-Indian',
            contribution: 'Brought Hindustani classical music to world stages and inspired cross-cultural collaborations.',
            highlights: ['Sitar recital', 'Global concert tours', 'Bridge between traditions'],
            instruments: ['Sitar', 'Tanpura'],
            listeningNote: 'A luminous string tone with spacious improvisation and strong melodic arcs.'
        },
        {
            id: 'ms-subbulakshmi',
            genre: 'classical',
            name: 'M. S. Subbulakshmi',
            subtitle: 'Carnatic vocal legend',
            image: musicAsset('ms-subbulakshmi.png'),
            region: 'Tamil Nadu',
            contribution: 'Turned Carnatic music into a cultural beacon through devotional concerts and precise artistry.',
            highlights: ['Vocal purity', 'Devotional repertoire', 'International acclaim'],
            instruments: ['Voice', 'Veena'],
            listeningNote: 'A devotional clarity that makes every phrase feel serene and exact.'
        },
        {
            id: 'bhimsen-joshi',
            genre: 'classical',
            name: 'Bhimsen Joshi',
            subtitle: 'Khayal master of the Kirana gharana',
            image: musicAsset('bhimsen-joshi.png'),
            region: 'Karnataka / Maharashtra',
            contribution: 'Known for expansive ragas, emotional intensity, and a commanding concert presence.',
            highlights: ['Khayal form', 'Kirana gharana', 'Powerful alaap'],
            instruments: ['Voice', 'Harmonium'],
            listeningNote: 'Long, soaring phrases that build from stillness into thrilling melodic movement.'
        },
        {
            id: 'lalgudi-jayaraman',
            genre: 'classical',
            name: 'Lalgudi Jayaraman',
            subtitle: 'Violin innovator',
            image: musicAsset('lalgudi-jayaraman.png'),
            region: 'Tamil Nadu',
            contribution: 'Reimagined Carnatic violin performance with lyrical phrasing and refined accompaniment.',
            highlights: ['Violin technique', 'Carnatic concerts', 'Composer and teacher'],
            instruments: ['Violin', 'Voice'],
            listeningNote: 'Elegant bowing and ornamentation that make the violin sing like a human voice.'
        },
        {
            id: 'zakir-hussain',
            genre: 'classical',
            name: 'Zakir Hussain',
            subtitle: 'Tabla virtuoso',
            image: musicAsset('zakir-hussain.png'),
            region: 'Mumbai / Global',
            contribution: 'Expanded tabla into both classical and crossover spaces with dazzling rhythmic command.',
            highlights: ['Tabla recitals', 'Rhythmic improvisation', 'Cross-genre collaborations'],
            instruments: ['Tabla', 'Percussion'],
            listeningNote: 'Fast, precise tabla language that turns rhythm into a storytelling art form.'
        },
        {
            id: 'baul-tradition',
            genre: 'folk',
            name: 'Baul voices',
            subtitle: 'Mystic Bengali folk tradition',
            image: musicAsset('baul-voices.png'),
            region: 'West Bengal',
            contribution: 'Carried spiritual poetry and portable instruments across villages and gatherings.',
            highlights: ['Ektara and dotara', 'Mystic lyrics', 'Traveling performers'],
            instruments: ['Ektara', 'Dotara'],
            listeningNote: 'Open-throated, wandering songs built around devotion and philosophical longing.'
        },
        {
            id: 'bihu-ensemble',
            genre: 'folk',
            name: 'Bihu ensembles',
            subtitle: 'Assamese harvest music',
            image: musicAsset('bihu-ensembles.png'),
            region: 'Assam',
            contribution: 'Celebrates spring, community, and the energy of the Bihu festival through dance and song.',
            highlights: ['Harvest celebration', 'Community chorus', 'Dance-driven rhythm'],
            instruments: ['Dhol', 'Pepa'],
            listeningNote: 'Bright percussion and celebratory movement that feels alive from the first beat.'
        },
        {
            id: 'lavani-performers',
            genre: 'folk',
            name: 'Lavani performers',
            subtitle: 'Expressive Marathi folk stagecraft',
            image: musicAsset('lavani-performers.png'),
            region: 'Maharashtra',
            contribution: 'Blends fast rhythms, narrative lyrics, and dramatic performance into a vibrant folk form.',
            highlights: ['Taal-heavy rhythms', 'Story-driven lyrics', 'Stage presence'],
            instruments: ['Dholki', 'Manjira'],
            listeningNote: 'A quick pulse with expressive vocals that keep the performance theatrical and direct.'
        },
        {
            id: 'rajasthani-manganiyar',
            genre: 'folk',
            name: 'Rajasthani Manganiyar',
            subtitle: 'Desert ballad tradition',
            image: musicAsset('Rajasthani-Manganiyar.png'),
            region: 'Rajasthan',
            contribution: 'Preserves devotional, heroic, and pastoral songs through richly ornamented vocal style.',
            highlights: ['Desert ballads', 'Wedding songs', 'Oral heritage'],
            instruments: ['Kamaicha', 'Khartal'],
            listeningNote: 'A resonant, earthy sound shaped by the open desert and the pulse of community gatherings.'
        },
        {
            id: 'pandavani',
            genre: 'folk',
            name: 'Pandavani storytellers',
            subtitle: 'Epic narration from Chhattisgarh',
            image: musicAsset('Pandavani-storytellers.png'),
            region: 'Chhattisgarh',
            contribution: 'Performs Mahabharata episodes through song, gesture, and dramatic oral storytelling.',
            highlights: ['Epic narration', 'Stage storytelling', 'Community memory'],
            instruments: ['Tambura', 'Manjira'],
            listeningNote: 'Narrative singing that moves like theatre, carrying myth, memory, and moral reflection.'
        },
        {
            id: 'ar-rahman',
            genre: 'modern',
            name: 'A. R. Rahman',
            subtitle: 'Composer of a new Indian sound',
            image: musicAsset('ar-rahman.png'),
            region: 'Tamil Nadu / Global',
            contribution: 'Reframed film music with layered production, emotional themes, and global collaborators.',
            highlights: ['Film scoring', 'Fusion textures', 'Award-winning soundtracks'],
            instruments: ['Synths', 'Orchestration'],
            listeningNote: 'Polished, cinematic arrangements that travel from intimate melody to huge emotional release.'
        },
        {
            id: 'lata-mangeshkar',
            genre: 'modern',
            name: 'Lata Mangeshkar',
            subtitle: 'Voice of generations',
            image: musicAsset('Lata-Mangeshkar.png'),
            region: 'Maharashtra / Pan-Indian',
            contribution: 'Defined playback singing for decades with unmatched range, clarity, and emotional reach.',
            highlights: ['Playback era', 'National icon', 'Iconic film songs'],
            instruments: ['Voice', 'Orchestral playback'],
            listeningNote: 'A clear, pure voice that made film melodies feel timeless and intimate.'
        },
        {
            id: 'kishore-kumar',
            genre: 'modern',
            name: 'Kishore Kumar',
            subtitle: 'Playful playback legend',
            image: musicAsset('kishore-kumar.png'),
            region: 'Madhya Pradesh / Mumbai',
            contribution: 'Brought spontaneity, humor, and emotional elasticity to Hindi film music.',
            highlights: ['Expressive playback', 'Versatile performer', 'Era-defining hits'],
            instruments: ['Voice', 'Film arrangement'],
            listeningNote: 'Effortless phrasing and playful tone shifts that make every song feel alive.'
        },
        {
            id: 'shreya-ghoshal',
            genre: 'modern',
            name: 'Shreya Ghoshal',
            subtitle: 'Contemporary playback favorite',
            image: musicAsset('shreya-goshal.png'),
            region: 'West Bengal / Mumbai',
            contribution: 'Represents a new generation of film vocals with precision, warmth, and versatility.',
            highlights: ['Multi-language singing', 'Live performances', 'Modern playback standard'],
            instruments: ['Voice', 'Studio arrangement'],
            listeningNote: 'Controlled, expressive singing that moves cleanly through contemporary film textures.'
        },
        {
            id: 'amit-trivedi',
            genre: 'modern',
            name: 'Amit Trivedi',
            subtitle: 'Indie-fusion composer',
            image: musicAsset('amit-trivedi.png'),
            region: 'Gujarat / Mumbai',
            contribution: 'Bridges indie sensibility and film composition with inventive instrumentation.',
            highlights: ['Indie fusion', 'Fresh arrangements', 'Young audience appeal'],
            instruments: ['Guitar', 'Electronics'],
            listeningNote: 'A hybrid sound that feels experimental while staying deeply melodic.'
        }
    ];

    const instrumentData = [
        {
            name: 'Sitar',
            category: 'String',
            description: 'A resonant long-necked lute associated with Hindustani classical performance and meditative melodic flights.',
            image: musicAsset('sitar.png'),
            accent: 'classical'
        },
        {
            name: 'Tabla',
            category: 'Percussion',
            description: 'A pair of tuned drums that can articulate complex rhythmic cycles with remarkable precision.',
            image: musicAsset('tabla.png'),
            accent: 'folk'
        },
        {
            name: 'Veena',
            category: 'String',
            description: 'A sacred and expressive plucked instrument closely tied to Carnatic music and temple aesthetics.',
            image: musicAsset('veena.png'),
            accent: 'modern'
        },
        {
            name: 'Bansuri',
            category: 'Wind',
            description: 'A bamboo flute whose breathy tone is central to many devotional and classical soundscapes.',
            image: musicAsset('bansuri.png'),
            accent: 'classical'
        },
        {
            name: 'Mridangam',
            category: 'Percussion',
            description: 'The foundational drum of Carnatic ensembles, known for its rich tonal range and speed.',
            image: musicAsset('Mridangam.png'),
            accent: 'folk'
        },
        {
            name: 'Sarangi',
            category: 'String',
            description: 'A bowed instrument admired for its close vocal resemblance and emotional depth in North Indian traditions.',
            image: musicAsset('sarangi.png'),
            accent: 'modern'
        }
    ];

    let activeGenre = 'classical';
    let activeAudioId = null;
    let lastFocusedArtistId = null;
    let lastFocusedTriggerKind = 'card';
    let lastFocusedTrigger = null;
    let isModalOpen = false;

    renderInstruments();
    renderArtists();
    setActiveTab(activeGenre);

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            activeGenre = button.getAttribute('data-music-tab') || 'classical';
            setActiveTab(activeGenre);
            renderArtists();
        });
    });

    searchInput.addEventListener('input', () => {
        renderArtists();
    });

    artistGrid.addEventListener('click', event => {
        const playButton = event.target.closest('[data-music-play]');
        if (playButton) {
            event.stopPropagation();
            const card = playButton.closest('[data-artist-id]');
            const artistId = card?.getAttribute('data-artist-id');
            if (!artistId) return;
            activeAudioId = activeAudioId === artistId ? null : artistId;
            renderArtists();
            return;
        }

        const detailsButton = event.target.closest('[data-music-details]');
        const card = event.target.closest('[data-artist-id]');

        if (detailsButton && card) {
            event.stopPropagation();
            openModal(card.getAttribute('data-artist-id'), detailsButton);
            return;
        }

        if (card) {
            openModal(card.getAttribute('data-artist-id'), card);
        }
    });

    artistGrid.addEventListener('keydown', event => {
        const card = event.target.closest('[data-artist-id]');
        if (!card) return;

        if (event.key === 'Enter' || event.key === ' ') {
            const target = event.target;
            if (target.matches('button, a, input, [role="button"]')) {
                return;
            }

            event.preventDefault();
            openModal(card.getAttribute('data-artist-id'), card);
        }
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (!isModalOpen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key === 'Tab') {
            trapModalFocus(event);
        }
    });

    function setActiveTab(tabName) {
        tabButtons.forEach(button => {
            const isActive = (button.getAttribute('data-music-tab') || 'classical') === tabName;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function renderInstruments() {
        instrumentGrid.innerHTML = instrumentData.map(instrument => `
            <article class="music-instrument-card glass-card ${instrument.accent}">
                <div class="music-instrument-visual ${instrument.accent}" aria-hidden="true">
                    <img src="${instrument.image}" alt="${instrument.name}" loading="lazy" decoding="async" class="music-instrument-image">
                </div>
                <div class="music-instrument-body">
                    <span class="music-instrument-badge">${instrument.category}</span>
                    <h3>${instrument.name}</h3>
                    <p>${instrument.description}</p>
                </div>
            </article>
        `).join('');
    }

    function renderArtists() {
        const query = searchInput.value.trim().toLowerCase();
        const activeGenreConfig = genreData[activeGenre];
        const filteredArtists = artistData.filter(artist => {
            const matchesGenre = artist.genre === activeGenre;
            const haystack = [
                artist.name,
                artist.subtitle,
                artist.region,
                artist.contribution,
                artist.listeningNote,
                artist.genre,
                ...(artist.highlights || []),
                ...(artist.instruments || [])
            ].join(' ').toLowerCase();
            const matchesSearch = !query || haystack.includes(query);
            return matchesGenre && matchesSearch;
        });

        summaryPanel.innerHTML = `
            <div class="music-genre-summary-copy">
                <span class="section-badge music-summary-badge">${activeGenreConfig.badge}</span>
                <h3>${activeGenreConfig.title}</h3>
                <p>${activeGenreConfig.description}</p>
                <div class="music-chips">
                    ${activeGenreConfig.chips.map(chip => `<span class="music-chip">${chip}</span>`).join('')}
                </div>
            </div>
            <div class="music-summary-stats" aria-label="Genre summary">
                <div class="music-summary-stat">
                    <strong>${filteredArtists.length}</strong>
                    <span>matching artists</span>
                </div>
                <div class="music-summary-stat">
                    <strong>${artistData.filter(item => item.genre === activeGenre).length}</strong>
                    <span>genre profiles</span>
                </div>
                <div class="music-summary-stat">
                    <strong>${activeGenreConfig.label}</strong>
                    <span>current tab</span>
                </div>
            </div>
        `;

        if (filteredArtists.length === 0) {
            artistGrid.innerHTML = `
                <div class="music-empty-state glass-card">
                    <h3>No artists found</h3>
                    <p>Try a different search term or switch to another music tab.</p>
                    <button type="button" class="btn btn-primary" id="music-reset-search">Show All Artists</button>
                </div>
            `;

            document.getElementById('music-reset-search')?.addEventListener('click', () => {
                searchInput.value = '';
                renderArtists();
            });
            return;
        }

        artistGrid.innerHTML = filteredArtists.map(artist => {
            const isPlaying = activeAudioId === artist.id;

            return `
                <article class="music-artist-card glass-card ${artist.genre} ${isPlaying ? 'is-playing' : ''}" tabindex="0" role="button" data-artist-id="${artist.id}" aria-label="View details for ${artist.name}">
                    <div class="music-artist-card-top">
                        <div class="music-avatar ${artist.genre}" aria-hidden="true">
                            <img src="${artist.image}" alt="${artist.name}" loading="lazy" decoding="async" class="music-avatar-image">
                        </div>
                        <div class="music-artist-title">
                            <span class="music-badge ${artist.genre}">${activeGenreConfig.label}</span>
                            <h3>${artist.name}</h3>
                            <p>${artist.subtitle}</p>
                        </div>
                    </div>
                    <p class="music-artist-contribution">${artist.contribution}</p>
                    <div class="music-meta-row">
                        <span class="music-meta-label">Region / style</span>
                        <span class="music-meta-value">${artist.region}</span>
                    </div>
                    <div class="music-chip-row">
                        ${artist.highlights.map(item => `<span class="music-chip">${item}</span>`).join('')}
                    </div>
                    <div class="music-audio-placeholder" data-audio-state="${isPlaying ? 'playing' : 'paused'}">
                        <button type="button" class="music-play-btn" data-music-play aria-pressed="${isPlaying ? 'true' : 'false'}" aria-label="${isPlaying ? 'Pause sample preview for ' + artist.name : 'Play sample preview for ' + artist.name}">
                            <span class="music-play-icon" aria-hidden="true">${isPlaying ? '❚❚' : '▶'}</span>
                            <span>${isPlaying ? 'Pause preview' : 'Play preview'}</span>
                        </button>
                        <div class="music-audio-copy">
                            <span class="music-audio-label">Audio placeholder</span>
                            <span class="music-audio-status">${isPlaying ? 'Sample preview playing' : artist.listeningNote}</span>
                        </div>
                        <div class="music-audio-bars" aria-hidden="true">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div class="music-card-footer">
                        <span class="music-card-note">Click for more about the artist</span>
                        <button type="button" class="btn btn-secondary music-details-btn" data-music-details>View Details</button>
                    </div>
                </article>
            `;
        }).join('');

        artistGrid.querySelectorAll('.music-artist-card').forEach(card => {
            card.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    const target = event.target;
                    if (target.matches('button, a, input, [role="button"]')) {
                        return;
                    }

                    event.preventDefault();
                    openModal(card.getAttribute('data-artist-id'), card);
                }
            });
        });
    }

    function openModal(artistId, trigger) {
        const artist = artistData.find(item => item.id === artistId);
        if (!artist) return;

        const activeGenreConfig = genreData[artist.genre];
        lastFocusedArtistId = artistId;
        lastFocusedTrigger = trigger || document.activeElement;
        lastFocusedTriggerKind = trigger?.matches?.('[data-music-details]') ? 'details' : 'card';
        isModalOpen = true;

        modalAvatar.className = `music-modal-avatar ${artist.genre}`;
        modalAvatar.innerHTML = `<img src="${artist.image}" alt="${artist.name}" loading="lazy" decoding="async" class="music-modal-image">`;
        modalBadge.className = `music-badge ${artist.genre}`;
        modalBadge.textContent = activeGenreConfig.label;
        modalTitle.textContent = artist.name;
        modalSubtitle.textContent = artist.subtitle;
        modalContribution.textContent = artist.contribution;
        modalRegion.textContent = artist.region;
        modalInstruments.innerHTML = artist.instruments.map(item => `<span class="music-chip">${item}</span>`).join('');
        modalHighlights.innerHTML = artist.highlights.map(item => `<li>${item}</li>`).join('');

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            modalClose.focus();
        });
    }

    function closeModal() {
        if (!isModalOpen) return;

        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isModalOpen = false;
        renderArtists();
        restoreFocus();
    }

    function trapModalFocus(event) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusableElements.length) return;

        const focusable = Array.from(focusableElements).filter(el => !el.hasAttribute('disabled'));
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function restoreFocus() {
        let focusTarget = null;

        if (lastFocusedArtistId) {
            const selector = lastFocusedTriggerKind === 'details'
                ? `[data-artist-id="${lastFocusedArtistId}"] [data-music-details]`
                : `[data-artist-id="${lastFocusedArtistId}"]`;
            focusTarget = document.querySelector(selector);
        }

        if (!focusTarget && lastFocusedTrigger && document.contains(lastFocusedTrigger)) {
            focusTarget = lastFocusedTrigger;
        }

        if (focusTarget && typeof focusTarget.focus === 'function') {
            requestAnimationFrame(() => {
                focusTarget.focus();
            });
        }
    }
}

function initLiteraturePage() {
    const worksGrid = document.getElementById('literature-works-grid');
    const authorsGrid = document.getElementById('literature-authors-grid');
    const ancientGrid = document.getElementById('literature-ancient-grid');
    const statsGrid = document.getElementById('literature-stats-grid');
    const searchInput = document.getElementById('literature-search-input');
    const filterButtons = document.querySelectorAll('[data-literature-filter]');
    const modal = document.getElementById('literature-modal');
    const modalClose = document.getElementById('literature-modal-close');
    const modalAvatar = document.getElementById('literature-modal-avatar');
    const modalBadge = document.getElementById('literature-modal-badge');
    const modalTitle = document.getElementById('literature-modal-title');
    const modalSubtitle = document.getElementById('literature-modal-subtitle');
    const modalStory = document.getElementById('literature-modal-story');
    const modalSignificance = document.getElementById('literature-modal-significance');
    const modalMeta = document.getElementById('literature-modal-meta');
    const modalHighlights = document.getElementById('literature-modal-highlights');

    if (!worksGrid || !authorsGrid || !ancientGrid || !statsGrid || !searchInput || !filterButtons.length || !modal || !modalClose || !modalAvatar || !modalBadge || !modalTitle || !modalSubtitle || !modalStory || !modalSignificance || !modalMeta || !modalHighlights) {
        return;
    }

    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('is-visible');
    });

    const categoryLabels = {
        ancient: 'Ancient',
        epic: 'Epic',
        poetry: 'Poetry',
        modern: 'Modern',
        regional: 'Regional',
        philosophy: 'Philosophy'
    };

    const collectionLabels = {
        work: 'Literary work',
        author: 'Author',
        ancient: 'Ancient text'
    };

    const literatureImagePaths = {
        works: {
            ramayana: 'assets/literature/works/ramayana.png',
            mahabharata: 'assets/literature/works/mahabharata.png',
            'bhagavad-gita': 'assets/literature/works/bhagvad-gita.png',
            arthashastra: 'assets/literature/works/Arthashastra.png',
            tirukkural: 'assets/literature/works/Tirukkural.png',
            gitanjali: 'assets/literature/works/Gitanjali.png',
            godan: 'assets/literature/works/godan.png',
            'malgudi-days': 'assets/literature/works/Malgudi%20Days.png',
            'discovery-of-india': 'assets/literature/works/The%20Discovery%20of%20India.png',
            "midnights-children": 'assets/literature/works/Midnight%E2%80%99s%20Children.png',
            'train-to-pakistan': 'assets/literature/works/Train%20to%20Pakistan.png',
            abhijnanasakuntalam: 'assets/literature/works/Abhijnanasakuntalam.png',
            panchatantra: 'assets/literature/works/Panchatantra.png'
        },
        authors: {
            'rabindranath-tagore': 'assets/literature/authors/Rabindranath%20Tagore.png',
            'munshi-premchand': 'assets/literature/authors/Munshi%20Premchand.png',
            'rk-narayan': 'assets/literature/authors/R.%20K.%20Narayan.png',
            kalidasa: 'assets/literature/authors/Kalidasa.png',
            valmiki: 'assets/literature/authors/Valmiki.png',
            'ved-vyasa': 'assets/literature/authors/Ved%20Vyasa.png',
            'subramania-bharati': 'assets/literature/authors/Subramania%20Bharati.png',
            'mahadevi-verma': 'assets/literature/authors/Mahadevi%20Verma.png',
            'amrita-pritam': 'assets/literature/authors/Amrita%20Pritam.png',
            'bankim-chandra-chatterjee': 'assets/literature/authors/Bankim%20Chandra%20Chatterjee.png',
            'khushwant-singh': 'assets/literature/authors/Khushwant%20Singh.png',
            'sarojini-naidu': 'assets/literature/authors/Sarojini%20Naidu.png'
        },
        texts: {
            vedas: 'assets/literature/texts/Vedas.png',
            upanishads: 'assets/literature/texts/Upanishads.png',
            'ramayana-ancient': 'assets/literature/texts/Ramayana.png',
            'mahabharata-ancient': 'assets/literature/texts/Mahabharata.png',
            'arthashastra-ancient': 'assets/literature/texts/Arthashastra.png',
            'panchatantra-ancient': 'assets/literature/texts/Panchatantra.png',
            'natya-shastra': 'assets/literature/texts/Natya%20Shastra.png',
            'charaka-samhita': 'assets/literature/texts/Charaka%20Samhita.png',
            'sushruta-samhita': 'assets/literature/texts/Sushruta%20Samhita.png'
        }
    };

    const worksData = [
        {
            id: 'ramayana',
            kind: 'work',
            category: 'epic',
            title: 'Ramayana',
            subtitle: 'Valmiki and the epic tradition',
            language: 'Sanskrit',
            era: 'c. 500 BCE - 100 BCE',
            summary: 'A foundational epic of exile, devotion, and return that shapes ideas of duty and ideal kingship.',
            significance: 'Its moral language and characters remain central to Indian storytelling across regions and languages.',
            highlights: ['Rama and Sita', 'Dharma and exile', 'Pan-Indian retellings'],
            facts: [
                { label: 'Author / tradition', value: 'Valmiki' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient epic' }
            ]
        },
        {
            id: 'mahabharata',
            kind: 'work',
            category: 'epic',
            title: 'Mahabharata',
            subtitle: 'Ved Vyasa and the great war narrative',
            language: 'Sanskrit',
            era: 'c. 400 BCE - 400 CE',
            summary: 'A vast epic of kinship, conflict, philosophy, and political order anchored by the Kurukshetra war.',
            significance: 'Its scale and philosophical range make it a major source for ethics, governance, and cultural memory.',
            highlights: ['Kurukshetra', 'Bhishma and Krishna', 'Epic philosophy'],
            facts: [
                { label: 'Author / tradition', value: 'Ved Vyasa' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient epic' }
            ]
        },
        {
            id: 'bhagavad-gita',
            kind: 'work',
            category: 'philosophy',
            title: 'Bhagavad Gita',
            subtitle: 'Dialogue within the Mahabharata',
            language: 'Sanskrit',
            era: 'c. 2nd century BCE - 2nd century CE',
            summary: 'A compact philosophical dialogue on action, duty, devotion, and self-knowledge.',
            significance: 'It became one of the most studied spiritual texts in India and beyond.',
            highlights: ['Karma yoga', 'Bhakti', 'Inner discipline'],
            facts: [
                { label: 'Tradition', value: 'Mahabharata scripture' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Classical period' }
            ]
        },
        {
            id: 'arthashastra',
            kind: 'work',
            category: 'philosophy',
            title: 'Arthashastra',
            subtitle: 'Kautilya on statecraft and economics',
            language: 'Sanskrit',
            era: 'c. 3rd century BCE',
            summary: 'A systematic treatise on governance, economics, security, and administration.',
            significance: 'It remains a landmark text for political theory and practical statecraft.',
            highlights: ['Administration', 'Strategy', 'Public order'],
            facts: [
                { label: 'Author / tradition', value: 'Kautilya' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Mauryan age' }
            ]
        },
        {
            id: 'tirukkural',
            kind: 'work',
            category: 'regional',
            title: 'Tirukkural',
            subtitle: 'Thiruvalluvar and universal ethics',
            language: 'Tamil',
            era: 'c. 1st century BCE - 5th century CE',
            summary: 'A brief but expansive classic on virtue, wealth, and love in tightly crafted couplets.',
            significance: 'Its aphoristic style made it one of the most beloved ethical texts in Tamil literature.',
            highlights: ['1330 couplets', 'Virtue, wealth, love', 'Enduring moral clarity'],
            facts: [
                { label: 'Author / tradition', value: 'Thiruvalluvar' },
                { label: 'Language', value: 'Tamil' },
                { label: 'Era', value: 'Classical Tamil' }
            ]
        },
        {
            id: 'gitanjali',
            kind: 'work',
            category: 'poetry',
            title: 'Gitanjali',
            subtitle: 'Rabindranath Tagore',
            language: 'Bengali / English',
            era: '1910',
            summary: 'A lyric sequence of devotional and humanist poems that opened Indian poetry to the world stage.',
            significance: 'It helped secure Tagore the Nobel Prize and broadened the reach of Indian modern poetry.',
            highlights: ['Lyric devotion', 'Humanism', 'Global recognition'],
            facts: [
                { label: 'Author', value: 'Rabindranath Tagore' },
                { label: 'Language', value: 'Bengali / English' },
                { label: 'Era', value: 'Early modern' }
            ]
        },
        {
            id: 'godan',
            kind: 'work',
            category: 'modern',
            title: 'Godan',
            subtitle: 'Munshi Premchand',
            language: 'Hindi',
            era: '1936',
            summary: 'A stark novel of peasant hardship, debt, and social inequality in colonial India.',
            significance: 'It stands as one of the strongest social realist novels in Hindi literature.',
            highlights: ['Peasant life', 'Social realism', 'Economic struggle'],
            facts: [
                { label: 'Author', value: 'Munshi Premchand' },
                { label: 'Language', value: 'Hindi' },
                { label: 'Era', value: '1930s' }
            ]
        },
        {
            id: 'malgudi-days',
            kind: 'work',
            category: 'modern',
            title: 'Malgudi Days',
            subtitle: 'R. K. Narayan',
            language: 'English',
            era: '1943',
            summary: 'A warm and sharply observed collection of stories set in the fictional town of Malgudi.',
            significance: 'Its clear prose and memorable characters helped define Indian English fiction for generations.',
            highlights: ['Malgudi town', 'Quiet humor', 'Everyday life'],
            facts: [
                { label: 'Author', value: 'R. K. Narayan' },
                { label: 'Language', value: 'English' },
                { label: 'Era', value: 'Mid 20th century' }
            ]
        },
        {
            id: 'discovery-of-india',
            kind: 'work',
            category: 'modern',
            title: 'The Discovery of India',
            subtitle: 'Jawaharlal Nehru',
            language: 'English',
            era: '1946',
            summary: 'A reflective historical meditation on India’s civilization, diversity, and political awakening.',
            significance: 'It helped frame a post-independence understanding of Indian identity and continuity.',
            highlights: ['Civilizational sweep', 'National reflection', 'History and identity'],
            facts: [
                { label: 'Author', value: 'Jawaharlal Nehru' },
                { label: 'Language', value: 'English' },
                { label: 'Era', value: '1940s' }
            ]
        },
        {
            id: 'midnights-children',
            kind: 'work',
            category: 'modern',
            title: "Midnight's Children",
            subtitle: 'Salman Rushdie',
            language: 'English',
            era: '1981',
            summary: 'A magical-realist novel linking a child’s life to the political history of independent India.',
            significance: 'It became a landmark of Indian English fiction and global postcolonial literature.',
            highlights: ['Magical realism', 'Independence era', 'Narrative ambition'],
            facts: [
                { label: 'Author', value: 'Salman Rushdie' },
                { label: 'Language', value: 'English' },
                { label: 'Era', value: 'Late 20th century' }
            ]
        },
        {
            id: 'train-to-pakistan',
            kind: 'work',
            category: 'modern',
            title: 'Train to Pakistan',
            subtitle: 'Khushwant Singh',
            language: 'English',
            era: '1956',
            summary: 'A spare and powerful novel about Partition, violence, and the human cost of political rupture.',
            significance: 'It remains one of the most vivid literary accounts of the Partition experience.',
            highlights: ['Partition memory', 'Village life', 'Human cost'],
            facts: [
                { label: 'Author', value: 'Khushwant Singh' },
                { label: 'Language', value: 'English' },
                { label: 'Era', value: '1950s' }
            ]
        },
        {
            id: 'abhijnanasakuntalam',
            kind: 'work',
            category: 'ancient',
            title: 'Abhijnanasakuntalam',
            subtitle: 'Kalidasa',
            language: 'Sanskrit',
            era: 'c. 4th - 5th century CE',
            summary: 'A celebrated Sanskrit play about recognition, love, memory, and royal destiny.',
            significance: 'It became one of the best-known classical Indian dramas in world literature.',
            highlights: ['Courtly drama', 'Recognition motif', 'Classical Sanskrit'],
            facts: [
                { label: 'Author', value: 'Kalidasa' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Classical India' }
            ]
        },
        {
            id: 'panchatantra',
            kind: 'work',
            category: 'ancient',
            title: 'Panchatantra',
            subtitle: 'Vishnu Sharma and animal fables',
            language: 'Sanskrit',
            era: 'c. 3rd century BCE - 3rd century CE',
            summary: 'A playful and wise collection of linked fables used to teach politics, prudence, and friendship.',
            significance: 'Its stories travelled widely through Asia, Africa, and Europe in many retellings.',
            highlights: ['Animal fables', 'Practical wisdom', 'Global retellings'],
            facts: [
                { label: 'Author / tradition', value: 'Vishnu Sharma' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient India' }
            ]
        }
    ];

    const authorsData = [
        {
            id: 'rabindranath-tagore',
            kind: 'author',
            category: 'poetry',
            title: 'Rabindranath Tagore',
            subtitle: 'Bengali poet, novelist, composer',
            language: 'Bengali / English',
            era: '1861-1941',
            summary: 'A towering modern voice whose poems, songs, and prose reshaped Indian literary modernity.',
            significance: 'The first Asian Nobel laureate in literature and a defining figure in Bengal’s cultural renaissance.',
            highlights: ['Gitanjali', 'Gora', 'Gitabitan'],
            facts: [
                { label: 'Language / region', value: 'Bengal' },
                { label: 'Era', value: '1861-1941' },
                { label: 'Known for', value: 'Poetry and song' }
            ]
        },
        {
            id: 'munshi-premchand',
            kind: 'author',
            category: 'modern',
            title: 'Munshi Premchand',
            subtitle: 'Hindi and Urdu social realist',
            language: 'Hindi / Urdu',
            era: '1880-1936',
            summary: 'A major chronicler of peasant life, social struggle, and moral complexity.',
            significance: 'Helped define realism in modern Hindi literature and gave voice to ordinary people.',
            highlights: ['Godan', 'Kafan', 'Nirmala'],
            facts: [
                { label: 'Language / region', value: 'North India' },
                { label: 'Era', value: '1880-1936' },
                { label: 'Known for', value: 'Social realism' }
            ]
        },
        {
            id: 'rk-narayan',
            kind: 'author',
            category: 'modern',
            title: 'R. K. Narayan',
            subtitle: 'Storyteller of Malgudi',
            language: 'English',
            era: '1906-2001',
            summary: 'Known for gentle irony, clear prose, and the enduring fictional town of Malgudi.',
            significance: 'Helped establish Indian English fiction with warmth, precision, and accessibility.',
            highlights: ['Malgudi Days', 'Swami and Friends', 'Guide'],
            facts: [
                { label: 'Language / region', value: 'Tamil Nadu' },
                { label: 'Era', value: '1906-2001' },
                { label: 'Known for', value: 'Malgudi stories' }
            ]
        },
        {
            id: 'kalidasa',
            kind: 'author',
            category: 'ancient',
            title: 'Kalidasa',
            subtitle: 'Classical Sanskrit dramatist and poet',
            language: 'Sanskrit',
            era: 'c. 4th - 5th century CE',
            summary: 'A master of lyrical imagination whose plays and poems set a high classical standard.',
            significance: 'His works remain central to the Sanskrit canon and to later Indian literary taste.',
            highlights: ['Abhijnanasakuntalam', 'Meghaduta', 'Raghuvamsha'],
            facts: [
                { label: 'Language / region', value: 'Classical Sanskrit' },
                { label: 'Era', value: 'Ancient India' },
                { label: 'Known for', value: 'Drama and lyric poetry' }
            ]
        },
        {
            id: 'valmiki',
            kind: 'author',
            category: 'epic',
            title: 'Valmiki',
            subtitle: 'Authorial voice of the Ramayana',
            language: 'Sanskrit',
            era: 'Ancient India',
            summary: 'Traditionally credited with composing the Ramayana and shaping the epic form.',
            significance: 'Valmiki became a symbolic source for the epic imagination across South Asia.',
            highlights: ['Ramayana', 'Epic narration', 'Poetic authority'],
            facts: [
                { label: 'Language / region', value: 'Sanskrit tradition' },
                { label: 'Era', value: 'Ancient India' },
                { label: 'Known for', value: 'The Ramayana' }
            ]
        },
        {
            id: 'ved-vyasa',
            kind: 'author',
            category: 'epic',
            title: 'Ved Vyasa',
            subtitle: 'Tradition linked to the Mahabharata',
            language: 'Sanskrit',
            era: 'Ancient India',
            summary: 'The legendary compiler and narrator associated with the Mahabharata and related texts.',
            significance: 'His name stands for one of the most influential narrative and philosophical traditions in India.',
            highlights: ['Mahabharata', 'Puranic tradition', 'Epic wisdom'],
            facts: [
                { label: 'Language / region', value: 'Sanskrit tradition' },
                { label: 'Era', value: 'Ancient India' },
                { label: 'Known for', value: 'Epic compilation' }
            ]
        },
        {
            id: 'subramania-bharati',
            kind: 'author',
            category: 'regional',
            title: 'Subramania Bharati',
            subtitle: 'Tamil poet and nationalist writer',
            language: 'Tamil',
            era: '1882-1921',
            summary: 'A passionate modern poet whose verses fused nationalism, reform, and lyrical force.',
            significance: 'His work helped modernize Tamil poetry and energize cultural and political awakening.',
            highlights: ['Deshika', 'Kuyil Pattu', 'Vande Mataram lyrics'],
            facts: [
                { label: 'Language / region', value: 'Tamil Nadu' },
                { label: 'Era', value: '1882-1921' },
                { label: 'Known for', value: 'Modern Tamil poetry' }
            ]
        },
        {
            id: 'mahadevi-verma',
            kind: 'author',
            category: 'poetry',
            title: 'Mahadevi Verma',
            subtitle: 'Hindi poet and essayist',
            language: 'Hindi',
            era: '1907-1987',
            summary: 'A major modernist voice whose poetry and essays explored loneliness, empathy, and selfhood.',
            significance: 'She became one of the most important women writers in modern Hindi literature.',
            highlights: ['Yama', 'Nihar', 'Neerja'],
            facts: [
                { label: 'Language / region', value: 'Hindi heartland' },
                { label: 'Era', value: '1907-1987' },
                { label: 'Known for', value: 'Modernist poetry' }
            ]
        },
        {
            id: 'amrita-pritam',
            kind: 'author',
            category: 'regional',
            title: 'Amrita Pritam',
            subtitle: 'Punjabi poet and novelist',
            language: 'Punjabi / Hindi',
            era: '1919-2005',
            summary: 'A bold lyrical voice whose work captured love, Partition, and the inner life of women.',
            significance: 'She remains one of the most influential modern writers in Punjabi literature.',
            highlights: ['Ajj Aakhan Waris Shah Nu', 'Pinjar', 'Partition poetry'],
            facts: [
                { label: 'Language / region', value: 'Punjab' },
                { label: 'Era', value: '1919-2005' },
                { label: 'Known for', value: 'Partition and love poetry' }
            ]
        },
        {
            id: 'bankim-chandra-chatterjee',
            kind: 'author',
            category: 'modern',
            title: 'Bankim Chandra Chatterjee',
            subtitle: 'Novelist and nationalist thinker',
            language: 'Bengali',
            era: '1838-1894',
            summary: 'A pioneering novelist whose work helped shape the Indian literary public sphere.',
            significance: 'His writing bridged literary modernity, public debate, and nationalist feeling.',
            highlights: ['Anandamath', 'Vande Mataram', `Rajmohan's Wife`],
            facts: [
                { label: 'Language / region', value: 'Bengal' },
                { label: 'Era', value: '1838-1894' },
                { label: 'Known for', value: 'Nationalist fiction' }
            ]
        },
        {
            id: 'khushwant-singh',
            kind: 'author',
            category: 'modern',
            title: 'Khushwant Singh',
            subtitle: 'Novelist, editor, and commentator',
            language: 'English',
            era: '1915-2014',
            summary: 'A sharp observer of politics, Partition, and urban life with a lively public voice.',
            significance: 'He made complex historical subjects accessible through fiction and journalism.',
            highlights: ['Train to Pakistan', 'Delhi', 'History writing'],
            facts: [
                { label: 'Language / region', value: 'Punjab / Delhi' },
                { label: 'Era', value: '1915-2014' },
                { label: 'Known for', value: 'Partition fiction' }
            ]
        },
        {
            id: 'sarojini-naidu',
            kind: 'author',
            category: 'poetry',
            title: 'Sarojini Naidu',
            subtitle: 'Poet and public leader',
            language: 'English',
            era: '1879-1949',
            summary: 'A lyrical poet whose public life connected literature, freedom, and civic leadership.',
            significance: 'Known as the Nightingale of India, she linked poetry to the freedom movement.',
            highlights: ['The Golden Threshold', 'Freedom speeches', 'Lyric poetry'],
            facts: [
                { label: 'Language / region', value: 'Hyderabad' },
                { label: 'Era', value: '1879-1949' },
                { label: 'Known for', value: 'Lyric poetry and leadership' }
            ]
        }
    ];

    const ancientTextsData = [
        {
            id: 'vedas',
            kind: 'ancient',
            category: 'ancient',
            title: 'Vedas',
            subtitle: 'Foundational hymns and ritual knowledge',
            language: 'Vedic Sanskrit',
            era: 'c. 1500 BCE - 500 BCE',
            summary: 'A layered corpus of hymns, rituals, and cosmological inquiry that anchors early Indian thought.',
            significance: 'The Vedic corpus shaped ritual practice, scholarship, and philosophical imagination for centuries.',
            highlights: ['Rig, Sama, Yajur, Atharva', 'Oral transmission', 'Sacred knowledge'],
            facts: [
                { label: 'Tradition', value: 'Shruti' },
                { label: 'Language', value: 'Vedic Sanskrit' },
                { label: 'Era', value: 'Ancient India' }
            ]
        },
        {
            id: 'upanishads',
            kind: 'ancient',
            category: 'philosophy',
            title: 'Upanishads',
            subtitle: 'Philosophical inquiry into self and reality',
            language: 'Sanskrit',
            era: 'c. 800 BCE - 300 BCE',
            summary: 'Dialogues that turn from ritual toward questions of self, consciousness, and ultimate reality.',
            significance: 'They became central to Vedanta and later Indian philosophical traditions.',
            highlights: ['Atman and Brahman', 'Meditation', 'Inquiry'],
            facts: [
                { label: 'Tradition', value: 'Vedanta roots' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient India' }
            ]
        },
        {
            id: 'ramayana-ancient',
            kind: 'ancient',
            category: 'epic',
            title: 'Ramayana',
            subtitle: 'The epic of Rama and Sita',
            language: 'Sanskrit',
            era: 'c. 500 BCE - 100 BCE',
            summary: 'A classic epic of exile, devotion, and return that has been retold in countless regional forms.',
            significance: 'It remains one of the most influential narrative foundations in South Asian culture.',
            highlights: ['Rama and Sita', 'Dharma', 'Living retellings'],
            facts: [
                { label: 'Tradition', value: 'Valmiki' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient epic' }
            ]
        },
        {
            id: 'mahabharata-ancient',
            kind: 'ancient',
            category: 'epic',
            title: 'Mahabharata',
            subtitle: 'The great war and its philosophy',
            language: 'Sanskrit',
            era: 'c. 400 BCE - 400 CE',
            summary: 'A monumental epic that mixes war, kinship, ethics, and philosophical reflection.',
            significance: 'Its influence reaches literature, performance, politics, and everyday moral language.',
            highlights: ['Kurukshetra', 'Bhagavad Gita', 'Epic scale'],
            facts: [
                { label: 'Tradition', value: 'Ved Vyasa' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient epic' }
            ]
        },
        {
            id: 'arthashastra-ancient',
            kind: 'ancient',
            category: 'philosophy',
            title: 'Arthashastra',
            subtitle: 'Statecraft, economics, and governance',
            language: 'Sanskrit',
            era: 'c. 3rd century BCE',
            summary: 'A highly practical treatise on the mechanics of government, diplomacy, and public order.',
            significance: 'It remains one of the most studied classical Indian texts on politics and administration.',
            highlights: ['Strategy', 'Administration', 'Public order'],
            facts: [
                { label: 'Tradition', value: 'Kautilya' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Mauryan age' }
            ]
        },
        {
            id: 'panchatantra-ancient',
            kind: 'ancient',
            category: 'ancient',
            title: 'Panchatantra',
            subtitle: 'Animal fables and political wisdom',
            language: 'Sanskrit',
            era: 'c. 3rd century BCE - 3rd century CE',
            summary: 'A linked set of fables that teaches prudence, friendship, and strategy through story.',
            significance: 'Its stories travelled widely and continue to shape global fable traditions.',
            highlights: ['Animal tales', 'Practical wisdom', 'World travel'],
            facts: [
                { label: 'Tradition', value: 'Vishnu Sharma' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient India' }
            ]
        },
        {
            id: 'natya-shastra',
            kind: 'ancient',
            category: 'ancient',
            title: 'Natya Shastra',
            subtitle: 'Performing arts and dramatic theory',
            language: 'Sanskrit',
            era: 'c. 200 BCE - 200 CE',
            summary: 'A seminal treatise on drama, dance, music, aesthetics, and performance conventions.',
            significance: 'It remains a core reference for Indian theatre and performance theory.',
            highlights: ['Rasa theory', 'Stagecraft', 'Aesthetic system'],
            facts: [
                { label: 'Tradition', value: 'Bharata Muni' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient India' }
            ]
        },
        {
            id: 'charaka-samhita',
            kind: 'ancient',
            category: 'philosophy',
            title: 'Charaka Samhita',
            subtitle: 'Classical Ayurvedic medicine',
            language: 'Sanskrit',
            era: 'c. 1st century CE',
            summary: 'A foundational Ayurvedic text on diagnosis, treatment, and medical ethics.',
            significance: 'It shaped the classical framework of Indian medicine and clinical reasoning.',
            highlights: ['Ayurveda', 'Diagnosis', 'Medical ethics'],
            facts: [
                { label: 'Tradition', value: 'Classical Ayurveda' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient India' }
            ]
        },
        {
            id: 'sushruta-samhita',
            kind: 'ancient',
            category: 'philosophy',
            title: 'Sushruta Samhita',
            subtitle: 'Surgery and medical craft',
            language: 'Sanskrit',
            era: 'c. 1st millennium BCE - 1st millennium CE',
            summary: 'A classical medical work known for surgical procedures, instruments, and anatomical insight.',
            significance: 'It became a landmark text for surgery and technical medical knowledge.',
            highlights: ['Surgery', 'Anatomy', 'Instrument lists'],
            facts: [
                { label: 'Tradition', value: 'Sushruta' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient India' }
            ]
        }
    ];
    worksData.forEach(item => {
        item.image = literatureImagePaths.works[item.id] || '';
    });
    authorsData.forEach(item => {
        item.image = literatureImagePaths.authors[item.id] || '';
    });
    ancientTextsData.forEach(item => {
        item.image = literatureImagePaths.texts[item.id] || '';
    });

    const allItems = [...worksData, ...authorsData, ...ancientTextsData];
    const languages = new Set();
    allItems.forEach(item => {
        item.language.split(/[\/,]/).map(part => part.trim()).filter(Boolean).forEach(part => languages.add(part));
    });

    const statsData = [
        { label: 'Ancient texts', value: String(ancientTextsData.length), detail: 'From the Vedas to classic treatises on drama, medicine, and statecraft.' },
        { label: 'Languages represented', value: String(languages.size), detail: 'Sanskrit, Tamil, Hindi, Bengali, Punjabi, and English all appear across the archive.' },
        { label: 'Famous authors', value: String(authorsData.length), detail: 'Poets, novelists, dramatists, and public thinkers who shaped modern Indian letters.' },
        { label: 'Literary categories', value: String(Object.keys(categoryLabels).length), detail: 'Epic, poetry, modern, regional, philosophy, and ancient knowledge traditions.' }
    ];

    let activeFilter = 'all';
    let lastFocusedTrigger = null;
    let isModalOpen = false;

    renderStats();
    renderCollections();
    setActiveFilterButton(activeFilter);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.getAttribute('data-literature-filter') || 'all';
            setActiveFilterButton(activeFilter);
            renderCollections();
        });
    });

    searchInput.addEventListener('input', () => {
        renderCollections();
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (!isModalOpen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key === 'Tab') {
            trapModalFocus(event);
        }
    });

    document.querySelectorAll('[data-literature-reset]').forEach(button => {
        button.addEventListener('click', resetFilters);
    });

    function renderStats() {
        statsGrid.innerHTML = statsData.map(stat => `
            <article class="literature-stat-card glass-card">
                <span class="literature-stat-label">${stat.label}</span>
                <strong class="literature-stat-value">${stat.value}</strong>
                <p class="literature-stat-detail">${stat.detail}</p>
            </article>
        `).join('');
    }

    function renderCollections() {
        const query = searchInput.value.trim().toLowerCase();

        renderCollection(worksGrid, worksData, query, 'works');
        renderCollection(authorsGrid, authorsData, query, 'authors');
        renderCollection(ancientGrid, ancientTextsData, query, 'ancient texts');
    }

    function renderCollection(grid, collection, query, emptyLabel) {
        const filteredItems = collection.filter(item => matchesFilter(item) && matchesSearch(item, query));

        grid.innerHTML = '';

        if (!filteredItems.length) {
            grid.innerHTML = `
                <div class="literature-empty-state glass-card">
                    <h3>No ${emptyLabel} found</h3>
                    <p>Try a different search term or switch back to All categories.</p>
                    <button type="button" class="btn btn-primary" data-literature-reset>Show all entries</button>
                </div>
            `;

            grid.querySelectorAll('[data-literature-reset]').forEach(button => {
                button.addEventListener('click', resetFilters);
            });
            return;
        }

        filteredItems.forEach(item => {
            const card = document.createElement('article');
            card.className = 'literature-card glass-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View details for ${item.title}`);
            card.setAttribute('data-category', item.category);
            card.setAttribute('data-literature-id', item.id);
            card.innerHTML = `
                <div class="literature-card-media ${item.category}">
                    <img class="literature-card-image" src="${item.image || ''}" alt="${item.title}" loading="lazy" decoding="async">
                    <div class="literature-card-fallback">${getMonogram(item.title)}</div>
                </div>
                <div class="literature-card-head">
                    <div class="literature-card-title">
                        <span class="literature-badge ${item.category}">${getCategoryLabel(item.category)}</span>
                        <h3>${item.title}</h3>
                        <p>${item.subtitle}</p>
                    </div>
                </div>
                <div class="literature-meta-row" aria-label="Literature metadata">
                    <span class="literature-meta-chip">${item.language}</span>
                    <span class="literature-meta-chip">${item.era}</span>
                    <span class="literature-meta-chip">${collectionLabels[item.kind] || 'Literature'}</span>
                </div>
                <p class="literature-summary">${item.summary}</p>
                <p class="literature-significance">${item.significance}</p>
                <div class="literature-chip-row">${item.highlights.map(highlight => `<span class="literature-chip">${highlight}</span>`).join('')}</div>
                <div class="literature-card-footer">
                    <span class="literature-card-note">Open the details card for more context</span>
                    <button type="button" class="btn btn-secondary literature-details-btn" data-literature-details>View Details</button>
                </div>
            `;
            syncLiteratureMedia(card, item);

            card.addEventListener('click', event => {
                const trigger = event.target.closest('[data-literature-details]');
                openModal(item, trigger || card);
            });

            card.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    const target = event.target;
                    if (target.matches('button, a, input, textarea, select')) {
                        return;
                    }

                    event.preventDefault();
                    openModal(item, card);
                }
            });

            grid.appendChild(card);
        });
    }

    function matchesFilter(item) {
        if (activeFilter === 'all') {
            return true;
        }

        if (activeFilter === 'ancient') {
            return item.category === 'ancient' || item.kind === 'ancient';
        }

        return item.category === activeFilter;
    }

    function matchesSearch(item, query) {
        if (!query) {
            return true;
        }

        const searchable = [
            item.title,
            item.subtitle,
            item.language,
            item.era,
            item.summary,
            item.significance,
            item.kind,
            item.category,
            ...(item.highlights || []),
            ...(item.facts || []).map(fact => `${fact.label} ${fact.value}`)
        ].join(' ').toLowerCase();

        return searchable.includes(query);
    }

    function setActiveFilterButton(filterValue) {
        filterButtons.forEach(btn => {
            const isActive = (btn.getAttribute('data-literature-filter') || 'all') === filterValue;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function getCategoryLabel(category) {
        return categoryLabels[category] || 'Literature';
    }

    function getMonogram(value) {
        return value
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map(part => part[0])
            .join('')
            .toUpperCase();
    }

    function syncLiteratureMedia(root, item) {
        const media = root.classList.contains('literature-modal-avatar')
            ? root
            : root.querySelector('.literature-card-media');
        const img = root.classList.contains('literature-modal-avatar')
            ? root.querySelector('.literature-modal-image')
            : root.querySelector('.literature-card-image');
        if (!media || !img) return;

        const fallback = root.classList.contains('literature-modal-avatar')
            ? root.querySelector('.literature-modal-fallback')
            : media.querySelector('.literature-card-fallback');
        const resolveFallback = () => {
            media.classList.add('is-missing');
            media.classList.remove('is-loaded');
            if (fallback) fallback.textContent = getMonogram(item.title);
        };

        if (!item.image) {
            resolveFallback();
            return;
        }

        img.addEventListener('load', () => {
            media.classList.add('is-loaded');
            media.classList.remove('is-missing');
        }, { once: true });
        img.addEventListener('error', resolveFallback, { once: true });

        if (img.complete && img.naturalWidth > 0) {
            media.classList.add('is-loaded');
            media.classList.remove('is-missing');
        } else if (!img.complete) {
            media.classList.add('is-loading');
        }
    }

    function openModal(item, trigger) {
        lastFocusedTrigger = trigger || document.activeElement;
        isModalOpen = true;

        modalAvatar.className = `literature-modal-avatar ${item.category}`;
        modalAvatar.innerHTML = `
            <img class="literature-modal-image" src="${item.image || ''}" alt="${item.title}" loading="lazy" decoding="async">
            <div class="literature-modal-fallback">${getMonogram(item.title)}</div>
        `;
        syncLiteratureMedia(modalAvatar, item);
        modalBadge.className = `literature-badge ${item.category}`;
        modalBadge.textContent = `${getCategoryLabel(item.category)} / ${collectionLabels[item.kind] || 'Literature'}`;
        modalTitle.textContent = item.title;
        modalSubtitle.textContent = item.subtitle;
        modalStory.textContent = item.summary;
        modalSignificance.textContent = item.significance;
        modalMeta.innerHTML = item.facts.map(fact => `
            <div class="literature-modal-meta-item">
                <span class="literature-modal-meta-label">${fact.label}</span>
                <span class="literature-modal-meta-value">${fact.value}</span>
            </div>
        `).join('');
        modalHighlights.innerHTML = item.highlights.map(highlight => `<li>${highlight}</li>`).join('');

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            modalClose.focus();
        });
    }

    function closeModal() {
        if (!isModalOpen) return;

        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isModalOpen = false;

        if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
            requestAnimationFrame(() => {
                lastFocusedTrigger.focus();
            });
        }
    }

    function trapModalFocus(event) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const focusable = Array.from(focusableElements).filter(el => !el.hasAttribute('disabled'));
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function resetFilters() {
        searchInput.value = '';
        activeFilter = 'all';
        setActiveFilterButton(activeFilter);
        renderCollections();
        searchInput.focus();
    }
}

function initDancePage() {
    const danceAsset = fileName => `assets/dances/${encodeURI(fileName)}`;
    const danceGrid = document.getElementById('dance-grid');
    const searchInput = document.getElementById('dance-search-input');
    const stateSelect = document.getElementById('dance-state-filter');
    const typeButtons = document.querySelectorAll('[data-dance-filter]');
    const videoGrid = document.getElementById('dance-video-grid');
    const quizForm = document.getElementById('dance-quiz-form');
    const quizQuestionsGrid = document.getElementById('dance-quiz-questions');
    const quizResult = document.getElementById('dance-quiz-result');
    const quizReset = document.getElementById('dance-quiz-reset');
    const modal = document.getElementById('dance-modal');
    const modalClose = document.getElementById('dance-modal-close');
    const modalVisual = document.getElementById('dance-modal-visual');
    const modalBadge = document.getElementById('dance-modal-badge');
    const modalTitle = document.getElementById('dance-modal-title');
    const modalSubtitle = document.getElementById('dance-modal-subtitle');
    const modalOrigin = document.getElementById('dance-modal-origin');
    const modalMovement = document.getElementById('dance-modal-movement');
    const modalCostume = document.getElementById('dance-modal-costume');
    const modalFeatures = document.getElementById('dance-modal-features');
    const modalNotes = document.getElementById('dance-modal-notes');

    if (!danceGrid || !searchInput || !stateSelect || !typeButtons.length || !videoGrid || !quizForm || !quizQuestionsGrid || !quizResult || !quizReset || !modal || !modalClose) {
        return;
    }

    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('is-visible');
    });

    const danceTypeConfig = {
        classical: {
            label: 'Classical',
            badge: 'Classical heritage',
            accent: 'classical'
        },
        folk: {
            label: 'Folk',
            badge: 'Folk celebration',
            accent: 'folk'
        }
    };

    const danceData = [
        {
            id: 'bharatanatyam',
            type: 'classical',
            name: 'Bharatanatyam',
            state: 'Tamil Nadu',
            region: 'Tamil temple tradition',
            image: danceAsset('bharatanatyam.png'),
            monogram: 'BN',
            description: 'A precise classical form rooted in temple heritage, sculpture-like poses, and rhythmic footwork.',
            features: ['Anga shuddha', 'Temple devotion', 'Hand gestures'],
            movement: 'Sharp lines, sculpted poses, and fast rhythmic passages.',
            costume: 'Silk sari costumes, pleated fans, temple jewelry, and expressive eye makeup.',
            music: 'Nattuvangam, mridangam, and Carnatic vocal accompaniment.',
            significance: 'One of India\'s most recognized classical dance traditions and a global symbol of Indian performance art.'
        },
        {
            id: 'kathak',
            type: 'classical',
            name: 'Kathak',
            state: 'Uttar Pradesh / North India',
            region: 'Court and temple storytelling',
            image: danceAsset('kathak.jpg'),
            monogram: 'KT',
            description: 'A graceful storytelling dance known for pirouettes, rhythmic patterns, and dramatic abhinaya.',
            features: ['Gat-bhav', 'Chakkars', 'Storytelling'],
            movement: 'Spins, intricate footwork, and fluid gestures that move from lyric to percussive.',
            costume: 'Anarkali-style costumes, ankle bells, and jewelry that highlight turning movement.',
            music: 'Tabla, sarangi, and khayal or thumri melodies.',
            significance: 'A bridge between temple storytelling and north Indian court aesthetics.'
        },
        {
            id: 'odissi',
            type: 'classical',
            name: 'Odissi',
            state: 'Odisha',
            region: 'Jagannath temple culture',
            image: danceAsset('odissi.png'),
            monogram: 'OD',
            description: 'A lyrical dance famous for its curved torso, devotional mood, and statuesque elegance.',
            features: ['Tribhangi stance', 'Temple imagery', 'Lyrical grace'],
            movement: 'Soft torso bends, expressive wrists, and flowing transitions between stillness and motion.',
            costume: 'Silver jewelry, woven silk, and a distinctive waist belt and headpiece.',
            music: 'Odissi percussion and melodic vocal support with strong devotional cadence.',
            significance: 'A deeply devotional classical form with a distinctive sculptural profile.'
        },
        {
            id: 'kathakali',
            type: 'classical',
            name: 'Kathakali',
            state: 'Kerala',
            region: 'Story drama theatre',
            image: danceAsset('kathakali.png'),
            monogram: 'KK',
            description: 'A dramatic classical dance-theatre tradition known for painted faces, bold gestures, and epic stories.',
            features: ['Face paint', 'Mudras', 'Epic narration'],
            movement: 'Powerful, controlled gestures and expressive eye work that reads like living theatre.',
            costume: 'Layered skirts, towering headgear, and elaborate green or red facial makeup.',
            music: 'Chenda and maddalam percussion with vocal narration.',
            significance: 'One of the most theatrical forms in India, combining dance, drama, and ritual display.'
        },
        {
            id: 'kuchipudi',
            type: 'classical',
            name: 'Kuchipudi',
            state: 'Andhra Pradesh',
            region: 'Village performance tradition',
            image: danceAsset('kuchipudi.png'),
            monogram: 'KU',
            description: 'A brisk classical form that blends speed, expressiveness, and dramatic stage presence.',
            features: ['Fast transitions', 'Dance-drama', 'Expressive face work'],
            movement: 'Quick footwork, light leaps, and lively storytelling with comic and devotional threads.',
            costume: 'Bright silk outfits with ornamented pleats and expressive stage makeup.',
            music: 'Carnatic music with percussion and vocal support.',
            significance: 'Known for its lively theatricality and the balance between grace and tempo.'
        },
        {
            id: 'manipuri',
            type: 'classical',
            name: 'Manipuri',
            state: 'Manipur',
            region: 'Vaishnav devotional tradition',
            image: danceAsset('manipuri.png'),
            monogram: 'MA',
            description: 'A gentle and devotional classical style with circular movement and restrained elegance.',
            features: ['Circular patterns', 'Soft steps', 'Devotional mood'],
            movement: 'Floating, circular phrases and restrained upper-body motion.',
            costume: 'Cylindrical skirts, translucent fabrics, and floral crowns in performance pieces.',
            music: 'Pung percussion, vocals, and devotional melodies.',
            significance: 'A tranquil classical tradition shaped by devotion and community ritual.'
        },
        {
            id: 'mohiniyattam',
            type: 'classical',
            name: 'Mohiniyattam',
            state: 'Kerala',
            region: 'Temple and court heritage',
            image: danceAsset('mohiniyattam.png'),
            monogram: 'MO',
            description: 'A lyrical dance form associated with soft swaying motion and feminine elegance.',
            features: ['Soft sways', 'Lasya', 'Temple grace'],
            movement: 'Wave-like torso motion, gentle footwork, and composed facial expression.',
            costume: 'White and gold kasavu sarees with jasmine flowers and subtle jewelry.',
            music: 'Carnatic music with soft percussion and melodic support.',
            significance: 'Celebrated for its flowing beauty and serene classical expression.'
        },
        {
            id: 'sattriya',
            type: 'classical',
            name: 'Sattriya',
            state: 'Assam',
            region: 'Monastic tradition',
            image: danceAsset('sattriya.png'),
            monogram: 'SA',
            description: 'A classical form from Assamese monasteries that combines devotion, narrative, and disciplined rhythm.',
            features: ['Monastic roots', 'Devotional storytelling', 'Rhythmic discipline'],
            movement: 'Structured steps, devotional gestures, and controlled storytelling sequences.',
            costume: 'Assamese traditional drapes, ornate jewelry, and stage-specific fabrics.',
            music: 'Khol percussion, cymbals, and Vaishnav devotional song.',
            significance: 'A living classical heritage linked to Assamese religious and cultural institutions.'
        },
        {
            id: 'bihu',
            type: 'folk',
            name: 'Bihu',
            state: 'Assam',
            region: 'Spring harvest celebration',
            image: danceAsset('bihu.png'),
            monogram: 'BI',
            description: 'An energetic folk dance that celebrates harvest, youth, and the arrival of spring.',
            features: ['Harvest joy', 'Fast rhythm', 'Community chorus'],
            movement: 'Quick steps, hip-driven rhythm, and joyful partner movement.',
            costume: 'Bright mekhela chadors with red accents and festival ornaments.',
            music: 'Dhol, pepa, and lively Assamese songs.',
            significance: 'A beloved Assamese festival dance that brings villages and cities into the same celebration.'
        },
        {
            id: 'garba',
            type: 'folk',
            name: 'Garba',
            state: 'Gujarat',
            region: 'Navratri circles',
            image: danceAsset('garba.png'),
            monogram: 'GA',
            description: 'A devotional circle dance performed during Navratri with graceful turns and collective rhythm.',
            features: ['Circular patterns', 'Festival devotion', 'Hand claps'],
            movement: 'Rhythmic steps around a center point with coordinated claps and turns.',
            costume: 'Colorful chaniya cholis, embroidered mirrors, and festive jewelry.',
            music: 'Dhol, percussion, and devotional songs.',
            significance: 'One of the most recognizable festival dances in western India.'
        },
        {
            id: 'ghoomar',
            type: 'folk',
            name: 'Ghoomar',
            state: 'Rajasthan',
            region: 'Desert palace and village tradition',
            image: danceAsset('ghoomar.png'),
            monogram: 'GH',
            description: 'A swirling folk dance known for wide spins, elegant lines, and celebratory motion.',
            features: ['Spins', 'Festive grace', 'Palace heritage'],
            movement: 'Circular spinning and graceful arm movement that creates a flowing silhouette.',
            costume: 'Flared ghagras with mirror work, veils, and elaborate jewelry.',
            music: 'Folk songs and percussion with a regal celebratory tone.',
            significance: 'A strong emblem of Rajasthani identity and festive ceremony.'
        },
        {
            id: 'lavani',
            type: 'folk',
            name: 'Lavani',
            state: 'Maharashtra',
            region: 'Performance and storytelling stage',
            image: danceAsset('lavani.png'),
            monogram: 'LA',
            description: 'A fast folk form that blends powerful rhythm, dramatic expression, and social commentary.',
            features: ['Strong rhythm', 'Expressive performance', 'Powada energy'],
            movement: 'Quick footwork and lively expression with direct audience connection.',
            costume: 'Nauvari sarees, bold jewelry, and stage-ready movement-friendly draping.',
            music: 'Dholki, taal, and energetic sung verses.',
            significance: 'A high-energy Marathi performance tradition with both entertainment and commentary.'
        },
        {
            id: 'bhangra',
            type: 'folk',
            name: 'Bhangra',
            state: 'Punjab',
            region: 'Harvest celebration',
            image: danceAsset('bhangra.png'),
            monogram: 'BH',
            description: 'A high-energy harvest dance defined by jumps, shoulder lifts, and exuberant group rhythm.',
            features: ['Jumps', 'Harvest joy', 'Group energy'],
            movement: 'Explosive jumps, joyful arm patterns, and powerful synchronized steps.',
            costume: 'Vibrant kurta pajamas, phulkari accents, and festive turbans.',
            music: 'Dhol beats and call-and-response celebration songs.',
            significance: 'A global symbol of Punjabi energy and celebratory movement.'
        },
        {
            id: 'chhau',
            type: 'folk',
            name: 'Chhau',
            state: 'Odisha / Jharkhand / West Bengal',
            region: 'Masked martial storytelling',
            image: danceAsset('chhau.png'),
            monogram: 'CH',
            description: 'A powerful dance-theatre form that combines martial movement, masks, and mythic narratives.',
            features: ['Masks', 'Martial movement', 'Mythic stories'],
            movement: 'Acrobatic leaps, stylized combat, and expansive body lines.',
            costume: 'Masks, headgear, and dramatic costumes that support larger-than-life storytelling.',
            music: 'Percussion-led rhythm and village performance ensembles.',
            significance: 'A spectacular regional form that joins ritual, athletics, and folklore.'
        },
        {
            id: 'kalbelia',
            type: 'folk',
            name: 'Kalbelia',
            state: 'Rajasthan',
            region: 'Nomadic desert communities',
            image: danceAsset('kalbelia.png'),
            monogram: 'KA',
            description: 'A serpentine dance famous for its flowing spins and snake-like arm and torso movement.',
            features: ['Snake-like flow', 'Nomadic roots', 'Quick spins'],
            movement: 'Wave-like torso motion, sudden turns, and continuous flowing steps.',
            costume: 'Black flowing skirts embroidered with mirror work and silver ornaments.',
            music: 'Pungi, khanjari, and desert folk melodies.',
            significance: 'A vivid folk tradition tied to Rajasthan\'s nomadic heritage.'
        },
        {
            id: 'pandavani',
            type: 'folk',
            name: 'Pandavani',
            state: 'Chhattisgarh',
            region: 'Epic storytelling performance',
            image: danceAsset('pandavani.png'),
            monogram: 'PA',
            description: 'A narrative folk performance that retells Mahabharata episodes through song, gesture, and drama.',
            features: ['Epic narration', 'Solo storytelling', 'Community memory'],
            movement: 'Narrative gestures, dramatic pauses, and forceful vocal delivery.',
            costume: 'Simple performance dress with accessories that support storytelling presence.',
            music: 'Tambura, manjira, and sung narration.',
            significance: 'A strong oral tradition that keeps epic literature alive in village performance spaces.'
        }
    ];

    function getDanceFallbackLabel(dance) {
        return dance.type === 'classical' ? 'Classical' : 'Folk';
    }

    function getDanceMediaMarkup(dance, variant) {
        const fallbackMarkup = `
            <div class="dance-image-fallback" aria-hidden="true">
                <span class="dance-fallback-monogram">${dance.monogram}</span>
                <span class="dance-fallback-label">${getDanceFallbackLabel(dance)}</span>
            </div>
        `;

        if (!dance.image) {
            return fallbackMarkup;
        }

        const imageClass = variant === 'modal' ? 'dance-modal-image' : 'dance-card-image';
        return `
            <img src="${dance.image}" alt="${dance.name}" loading="lazy" decoding="async" class="${imageClass}">
            ${fallbackMarkup}
        `;
    }

    function syncDanceMediaState(scope) {
        const root = scope || document;
        const mediaContainers = root.querySelectorAll('.dance-card-media, .dance-modal-visual');

        mediaContainers.forEach(container => {
            const img = container.querySelector('img');
            if (!img) {
                container.classList.add('is-missing');
                container.classList.remove('is-loaded');
                return;
            }

            const markLoaded = () => {
                if (img.naturalWidth > 0) {
                    container.classList.add('is-loaded');
                    container.classList.remove('is-missing');
                } else {
                    container.classList.add('is-missing');
                    container.classList.remove('is-loaded');
                }
            };

            if (img.complete) {
                markLoaded();
            } else {
                img.addEventListener('load', markLoaded, { once: true });
                img.addEventListener('error', () => {
                    container.classList.add('is-missing');
                    container.classList.remove('is-loaded');
                }, { once: true });
            }
        });
    }

    const quizQuestions = [
        {
            prompt: 'Which state is Bharatanatyam associated with?',
            options: ['Tamil Nadu', 'Punjab', 'Gujarat'],
            answer: 'Tamil Nadu'
        },
        {
            prompt: 'Is Bihu classical or folk?',
            options: ['Classical', 'Folk', 'Modern'],
            answer: 'Folk'
        },
        {
            prompt: 'Which dance is famous for elaborate makeup and epic storytelling from Kerala?',
            options: ['Kathakali', 'Odissi', 'Lavani'],
            answer: 'Kathakali'
        },
        {
            prompt: 'Garba is most closely associated with which state?',
            options: ['Rajasthan', 'Assam', 'Gujarat'],
            answer: 'Gujarat'
        }
    ];

    const uniqueStates = Array.from(new Set(danceData.map(item => item.state))).sort((a, b) => a.localeCompare(b));

    let activeType = 'all';
    let activeState = 'all';
    let selectedPreviewId = null;
    let quizAnswers = {};
    let quizSubmitted = false;
    let lastFocusedTrigger = null;
    let isModalOpen = false;

    populateStateOptions();
    renderDanceCards();
    renderVideoPreviews();
    renderQuiz();
    setActiveTypeButton('all');

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            activeType = button.getAttribute('data-dance-filter') || 'all';
            setActiveTypeButton(activeType);
            renderDanceCards();
        });
    });

    searchInput.addEventListener('input', () => {
        renderDanceCards();
    });

    stateSelect.addEventListener('change', () => {
        activeState = stateSelect.value || 'all';
        renderDanceCards();
    });

    danceGrid.addEventListener('click', event => {
        const detailsButton = event.target.closest('[data-dance-details]');
        const card = event.target.closest('[data-dance-id]');

        if (detailsButton && card) {
            event.stopPropagation();
            openModal(card.getAttribute('data-dance-id'), detailsButton);
            return;
        }

        if (card) {
            openModal(card.getAttribute('data-dance-id'), card);
        }
    });

    danceGrid.addEventListener('keydown', event => {
        const card = event.target.closest('[data-dance-id]');
        if (!card) return;

        if (event.key === 'Enter' || event.key === ' ') {
            const target = event.target;
            if (target.matches('button, a, input, [role="button"], select')) {
                return;
            }

            event.preventDefault();
            openModal(card.getAttribute('data-dance-id'), card);
        }
    });

    videoGrid.addEventListener('click', event => {
        const previewButton = event.target.closest('[data-dance-preview]');
        if (!previewButton) return;

        const previewId = previewButton.getAttribute('data-dance-preview');
        selectedPreviewId = selectedPreviewId === previewId ? null : previewId;
        renderVideoPreviews();
    });

    quizForm.addEventListener('submit', event => {
        event.preventDefault();
        quizSubmitted = true;

        const score = quizQuestions.reduce((total, question, index) => {
            return total + (quizAnswers[index] === question.answer ? 1 : 0);
        }, 0);

        const total = quizQuestions.length;
        quizResult.innerHTML = `
                <strong>Your score: ${score} / ${total}</strong>
                <p>${score === total ? 'Perfect score. You know your dance heritage beautifully.' : score >= 3 ? 'Strong recall. A quick review will make it even better.' : 'Good start. Revisit the cards above and try again.'}</p>
            `;
        renderQuiz();
    });

    quizReset.addEventListener('click', () => {
        quizAnswers = {};
        quizSubmitted = false;
        quizResult.innerHTML = '';
        renderQuiz();
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (!isModalOpen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key === 'Tab') {
            trapModalFocus(event);
        }
    });

    function populateStateOptions() {
        stateSelect.innerHTML = [
            '<option value="all">All States & Regions</option>',
            ...uniqueStates.map(state => `<option value="${state}">${state}</option>`)
        ].join('');
    }

    function setActiveTypeButton(typeValue) {
        typeButtons.forEach(button => {
            const isActive = (button.getAttribute('data-dance-filter') || 'all') === typeValue;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function renderDanceCards() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredDances = danceData.filter(dance => {
            const matchesType = activeType === 'all' || dance.type === activeType;
            const matchesState = activeState === 'all' || dance.state === activeState;
            const matchesSearch = !query || [
                dance.name,
                dance.state,
                dance.region,
                dance.description,
                dance.movement,
                dance.costume,
                dance.music,
                dance.significance,
                dance.type,
                ...(dance.features || [])
            ].join(' ').toLowerCase().includes(query);

            return matchesType && matchesState && matchesSearch;
        });

        if (filteredDances.length === 0) {
            danceGrid.innerHTML = `
                <div class="dance-empty-state glass-card">
                    <h3>No dances found</h3>
                    <p>Try a different search term or reset the type and state filters.</p>
                    <button type="button" class="btn btn-primary" id="dance-reset-filters">Show All Dances</button>
                </div>
            `;

            document.getElementById('dance-reset-filters')?.addEventListener('click', () => {
                activeType = 'all';
                activeState = 'all';
                searchInput.value = '';
                stateSelect.value = 'all';
                setActiveTypeButton('all');
                renderDanceCards();
            });
            return;
        }

        danceGrid.innerHTML = filteredDances.map(dance => {
            const typeConfig = danceTypeConfig[dance.type];
            return `
                <article class="dance-card glass-card ${dance.type}" tabindex="0" role="button" data-dance-id="${dance.id}" aria-label="View details for ${dance.name}">
                    <div class="dance-card-media ${dance.type}">
                        ${getDanceMediaMarkup(dance, 'card')}
                    </div>
                    <div class="dance-card-body">
                        <div class="dance-card-topline">
                            <span class="dance-badge ${dance.type}">${typeConfig.label}</span>
                            <span class="dance-state-chip">${dance.state}</span>
                        </div>
                        <h3>${dance.name}</h3>
                        <p class="dance-card-region">${dance.region}</p>
                        <p class="dance-card-description">${dance.description}</p>
                        <div class="dance-feature-chip-row">
                            ${dance.features.map(feature => `<span class="dance-chip">${feature}</span>`).join('')}
                        </div>
                        <div class="dance-card-footer">
                            <span class="dance-card-note">Open for costume and movement details</span>
                            <button type="button" class="btn btn-secondary dance-details-btn" data-dance-details>View Details</button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        syncDanceMediaState(danceGrid);
    }

    function renderVideoPreviews() {
        const previewData = [
            {
                id: 'bharatanatyam',
                title: 'Bharatanatyam Adavu Sequence',
                type: 'classical',
                note: 'Video preview placeholder',
                description: 'Footwork and mudra practice from the Tamil classical tradition.'
            },
            {
                id: 'garba',
                title: 'Garba Circle Preview',
                type: 'folk',
                note: 'Video preview placeholder',
                description: 'A festive circle pattern built around hand-claps and rhythmic turns.'
            },
            {
                id: 'bihu',
                title: 'Bihu Festival Motion',
                type: 'folk',
                note: 'Video preview placeholder',
                description: 'Spring energy from Assam with quick steps and bright percussion.'
            }
        ];

        videoGrid.innerHTML = previewData.map(preview => {
            const isSelected = selectedPreviewId === preview.id;

            return `
                <article class="dance-video-card glass-card ${preview.type} ${isSelected ? 'is-selected' : ''}">
                    <div class="dance-video-stage ${preview.type}" aria-hidden="true">
                        <span class="dance-video-label">${preview.note}</span>
                        <strong>${preview.title}</strong>
                        <p>${preview.description}</p>
                    </div>
                    <div class="dance-video-meta">
                        <span class="dance-badge ${preview.type}">${danceTypeConfig[preview.type].label}</span>
                        <button type="button" class="dance-preview-btn" data-dance-preview="${preview.id}" aria-pressed="${String(isSelected)}" aria-label="${isSelected ? 'Remove preview selection for ' + preview.title : 'Select preview for ' + preview.title}">
                            <span class="dance-preview-icon" aria-hidden="true">${isSelected ? '❚❚' : '▶'}</span>
                            <span>${isSelected ? 'Preview selected' : 'Play preview'}</span>
                        </button>
                    </div>
                    <div class="dance-video-status" aria-live="polite">${isSelected ? 'Preview selected' : 'Tap play to highlight this video placeholder'}</div>
                </article>
            `;
        }).join('');
    }

    function renderQuiz() {
        quizQuestionsGrid.innerHTML = quizQuestions.map((question, index) => {
            const selectedAnswer = quizAnswers[index];
            const questionClass = quizSubmitted
                ? (selectedAnswer === question.answer ? 'is-correct' : 'is-incorrect')
                : '';

            return `
                <fieldset class="dance-quiz-question glass-card ${questionClass}">
                    <legend>
                        <span class="dance-quiz-number">0${index + 1}</span>
                        <span>${question.prompt}</span>
                    </legend>
                    <div class="dance-quiz-options" role="radiogroup" aria-label="${question.prompt}">
                        ${question.options.map(option => {
                const optionId = `dance-quiz-${index}-${option.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                const isSelected = selectedAnswer === option;
                const isCorrect = quizSubmitted && option === question.answer;
                const isWrong = quizSubmitted && isSelected && option !== question.answer;
                return `
                                <label class="dance-quiz-option ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-incorrect' : ''}" for="${optionId}">
                                    <input type="radio" id="${optionId}" name="dance-question-${index}" value="${option}" ${isSelected ? 'checked' : ''}>
                                    <span>${option}</span>
                                </label>
                            `;
            }).join('')}
                    </div>
                    ${quizSubmitted ? `<p class="dance-question-feedback">${selectedAnswer === question.answer ? 'Correct answer picked.' : `Correct answer: ${question.answer}`}</p>` : ''}
                </fieldset>
            `;
        }).join('');

        quizQuestionsGrid.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener('change', event => {
                const match = event.target.name.match(/dance-question-(\d+)/);
                if (!match) return;

                quizAnswers[Number(match[1])] = event.target.value;
                if (quizSubmitted) {
                    const score = quizQuestions.reduce((total, question, index) => {
                        return total + (quizAnswers[index] === question.answer ? 1 : 0);
                    }, 0);
                    const total = quizQuestions.length;
                    quizResult.innerHTML = `
                        <strong>Your score: ${score} / ${total}</strong>
                        <p>${score === total ? 'Perfect score. You know your dance heritage beautifully.' : score >= 3 ? 'Strong recall. A quick review will make it even better.' : 'Good start. Revisit the cards above and try again.'}</p>
                    `;
                    renderQuiz();
                }
            });
        });
    }

    function openModal(danceId, trigger) {
        const dance = danceData.find(item => item.id === danceId);
        if (!dance) return;

        lastFocusedTrigger = trigger || document.activeElement;
        isModalOpen = true;

        modalVisual.className = `dance-modal-visual ${dance.type}`;
        modalVisual.innerHTML = getDanceMediaMarkup(dance, 'modal');
        modalBadge.className = `dance-badge ${dance.type}`;
        modalBadge.textContent = danceTypeConfig[dance.type].label;
        modalTitle.textContent = dance.name;
        modalSubtitle.textContent = `${dance.state} | ${dance.region}`;
        modalOrigin.textContent = dance.significance;
        modalMovement.textContent = dance.movement;
        modalCostume.textContent = `${dance.costume} Music and stage rhythm: ${dance.music}`;
        modalFeatures.innerHTML = dance.features.map(feature => `<span class="dance-chip">${feature}</span>`).join('');
        modalNotes.textContent = dance.description;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        syncDanceMediaState(modalVisual);

        requestAnimationFrame(() => {
            modalClose.focus();
        });
    }

    function closeModal() {
        if (!isModalOpen) return;

        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isModalOpen = false;

        if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
            requestAnimationFrame(() => {
                lastFocusedTrigger.focus();
            });
        }
    }

    function trapModalFocus(event) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusableElements.length) return;

        const focusable = Array.from(focusableElements).filter(el => !el.hasAttribute('disabled'));
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
}

const startupCategoryThemes = {
    tech: {
        label: 'Tech',
        accent: '#FF9933',
        soft: 'rgba(255, 153, 51, 0.18)'
    },
    fintech: {
        label: 'Fintech',
        accent: '#128807',
        soft: 'rgba(18, 136, 7, 0.18)'
    },
    edtech: {
        label: 'Edtech',
        accent: '#FFB01F',
        soft: 'rgba(255, 176, 31, 0.18)'
    }
};

const startupData = [
    {
        id: 'zerodha',
        name: 'Zerodha',
        category: 'fintech',
        logo: 'assets/images/startups/zerodha.png',
        logoAlt: 'Zerodha logo',
        founders: ['Nithin Kamath', 'Nikhil Kamath'],
        founded: 2010,
        city: 'Bengaluru',
        description: 'A lean discount brokerage that helped make retail investing more approachable, low-cost, and digital-first in India.',
        focus: 'Retail investing platform',
        unicorn: true
    },
    {
        id: 'flipkart',
        name: 'Flipkart',
        category: 'tech',
        logo: 'assets/images/startups/flipkart.png',
        logoAlt: 'Flipkart logo',
        founders: ['Sachin Bansal', 'Binny Bansal'],
        founded: 2007,
        city: 'Bengaluru',
        description: 'One of Indiaâ€™s original e-commerce giants, known for scaling online shopping, logistics, and product discovery at national scale.',
        focus: 'E-commerce marketplace',
        unicorn: true
    },
    {
        id: 'paytm',
        name: 'Paytm',
        category: 'fintech',
        logo: 'assets/images/startups/paytm.png',
        logoAlt: 'Paytm logo',
        founders: ['Vijay Shekhar Sharma'],
        founded: 2010,
        city: 'Noida',
        description: 'A consumer payments and financial services platform that helped normalize QR payments, wallets, and merchant acceptance.',
        focus: 'Digital payments',
        unicorn: true
    },
    {
        id: 'nykaa',
        name: 'Nykaa',
        category: 'tech',
        logo: 'assets/images/startups/nykaa.png',
        logoAlt: 'Nykaa logo',
        founders: ['Falguni Nayar'],
        founded: 2012,
        city: 'Mumbai',
        description: 'A beauty and lifestyle commerce platform that blended content, commerce, and premium discovery for modern shoppers.',
        focus: 'Beauty commerce',
        unicorn: true
    },
    {
        id: 'swiggy',
        name: 'Swiggy',
        category: 'tech',
        logo: 'assets/images/startups/swiggy.png',
        logoAlt: 'Swiggy logo',
        founders: ['Sriharsha Majety', 'Nandan Reddy', 'Rahul Jaimini'],
        founded: 2014,
        city: 'Bengaluru',
        description: 'An on-demand delivery and food commerce platform that turned convenience into a habit for millions of Indian households.',
        focus: 'Food delivery',
        unicorn: true
    },
    {
        id: 'zomato',
        name: 'Zomato',
        category: 'tech',
        logo: 'assets/images/startups/zomato.png',
        logoAlt: 'Zomato logo',
        founders: ['Deepinder Goyal', 'Pankaj Chaddah'],
        founded: 2008,
        city: 'Gurugram',
        description: 'A food discovery and delivery company that evolved from restaurant listings into a broader consumer internet brand.',
        focus: 'Food discovery',
        unicorn: true
    },
    {
        id: 'byjus',
        name: "Byju's",
        category: 'edtech',
        logo: 'assets/images/startups/byju-s.png',
        logoAlt: "Byju's logo",
        founders: ['Byju Raveendran'],
        founded: 2011,
        city: 'Bengaluru',
        description: 'A learning platform that popularized app-led education, test prep, and digital lessons for students across age groups.',
        focus: 'Learning platform',
        unicorn: true
    },
    {
        id: 'razorpay',
        name: 'Razorpay',
        category: 'fintech',
        logo: 'assets/images/startups/razorpay.png',
        logoAlt: 'Razorpay logo',
        founders: ['Harshil Mathur', 'Shashank Kumar'],
        founded: 2014,
        city: 'Bengaluru',
        description: 'A business payments stack used by startups and enterprises for checkout, payouts, subscriptions, and banking workflows.',
        focus: 'Payments infrastructure',
        unicorn: true
    },
    {
        id: 'phonepe',
        name: 'PhonePe',
        category: 'fintech',
        logo: 'assets/images/startups/phonepe.png',
        logoAlt: 'PhonePe logo',
        founders: ['Sameer Nigam', 'Rahul Chari', 'Burzin Engineer'],
        founded: 2015,
        city: 'Bengaluru',
        description: 'A UPI and financial services app that became a mainstream payment habit for consumers and merchants alike.',
        focus: 'UPI payments',
        unicorn: true
    },
    {
        id: 'meesho',
        name: 'Meesho',
        category: 'tech',
        logo: 'assets/images/startups/meesho.png',
        logoAlt: 'Meesho logo',
        founders: ['Vidit Aatrey', 'Sanjeev Barnwal'],
        founded: 2015,
        city: 'Bengaluru',
        description: 'A social commerce platform that helped small sellers and first-time buyers discover value-led online retail.',
        focus: 'Social commerce',
        unicorn: true
    }
];

const startupFounderProfiles = [
    {
        name: 'Nithin Kamath',
        startup: 'Zerodha',
        founderImage: 'assets/images/founders/nithin-kamath.png',
        founderImageAlt: 'Portrait photo of Nithin Kamath',
        detail: 'Focused on simplifying investing and keeping the brokerage model efficient, transparent, and low cost.'
    },
    {
        name: 'Falguni Nayar',
        startup: 'Nykaa',
        founderImage: 'assets/images/founders/falguni-nayar.png',
        founderImageAlt: 'Portrait photo of Falguni Nayar',
        detail: 'Built a category-defining consumer brand around beauty discovery, trust, and premium retail experiences.'
    },
    {
        name: 'Vijay Shekhar Sharma',
        startup: 'Paytm',
        founderImage: 'assets/images/founders/vijay-shekhar-sharma.png',
        founderImageAlt: 'Portrait photo of Vijay Shekhar Sharma',
        detail: 'Pushed digital payments into daily life with a product strategy built around scale and ease of use.'
    },
    {
        name: 'Sriharsha Majety',
        startup: 'Swiggy',
        founderImage: 'assets/images/founders/sriharsha-majety.png',
        founderImageAlt: 'Portrait photo of Sriharsha Majety',
        detail: 'Helped shape convenience-led commerce with fast delivery, logistics execution, and strong consumer trust.'
    },
    {
        name: 'Deepinder Goyal',
        startup: 'Zomato',
        founderImage: 'assets/images/founders/deepinder-goyal.png',
        founderImageAlt: 'Portrait photo of Deepinder Goyal',
        detail: 'Turned restaurant discovery into a consumer platform that later expanded into delivery and subscriptions.'
    },
    {
        name: 'Byju Raveendran',
        startup: "Byju's",
        founderImage: 'assets/images/founders/byju-raveendran.png',
        founderImageAlt: 'Portrait photo of Byju Raveendran',
        detail: 'Brought a mobile-first learning style to the center of Indiaâ€™s edtech boom.'
    },
    {
        name: 'Harshil Mathur',
        startup: 'Razorpay',
        founderImage: 'assets/images/founders/harshil-mathur.png',
        founderImageAlt: 'Portrait photo of Harshil Mathur',
        detail: 'Focused on payments infrastructure that lets businesses move money with fewer operational headaches.'
    },
    {
        name: 'Sameer Nigam',
        startup: 'PhonePe',
        founderImage: 'assets/images/founders/sameer-nigam.png',
        founderImageAlt: 'Portrait photo of Sameer Nigam',
        detail: 'Built a large-scale payments habit around UPI, merchant acceptance, and financial services.'
    }
];

function initStartupPage() {
    const startupGrid = document.getElementById('startup-grid');
    const founderGrid = document.getElementById('startup-founder-grid');
    const searchInput = document.getElementById('startup-search-input');
    const clearBtn = document.getElementById('startup-clear-search');
    const filterBtns = document.querySelectorAll('.startup-filter-btn');
    const resultsText = document.getElementById('startup-results-text');
    const savedSummary = document.getElementById('startup-saved-summary');
    const savedList = document.getElementById('startup-favorites-list');
    const statVisible = document.getElementById('startup-stat-visible');
    const statUnicorn = document.getElementById('startup-stat-unicorn');
    const statYear = document.getElementById('startup-stat-year');
    const statSaved = document.getElementById('startup-stat-saved');
    const heroTotal = document.getElementById('startup-hero-total');
    const heroSectors = document.getElementById('startup-hero-sectors');
    const heroUnicorns = document.getElementById('startup-hero-unicorns');

    if (!startupGrid || !founderGrid || !searchInput) return;

    const favorites = new Set(loadFavorites());
    let currentCategory = 'all';
    let searchQuery = '';

    renderAll();
    registerStartupSearchIndex();

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-startup-category') || 'all';
            animateRender();
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        animateRender();
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchQuery = '';
            animateRender();
        }
    });

    clearBtn?.addEventListener('click', () => {
        currentCategory = 'all';
        searchQuery = '';
        searchInput.value = '';
        filterBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-startup-category') === 'all'));
        animateRender();
        searchInput.focus();
    });

    function animateRender() {
        startupGrid.style.opacity = '0';
        startupGrid.style.transform = 'translateY(14px)';
        startupGrid.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

        setTimeout(() => {
            renderAll();
            startupGrid.style.opacity = '1';
            startupGrid.style.transform = 'translateY(0)';
        }, 180);
    }

    function renderAll() {
        const visibleStartups = getFilteredStartups();
        renderStats(visibleStartups);
        renderStartupCards(visibleStartups);
        renderFounderCards();
        renderSavedSummary(visibleStartups);
    }

    function getFilteredStartups() {
        return startupData.filter(item => {
            const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
            const searchableText = [
                item.name,
                item.category,
                item.city,
                item.focus,
                item.description,
                item.founders.join(' ')
            ].join(' ').toLowerCase();
            const matchesSearch = searchQuery === '' || searchableText.includes(searchQuery);
            return matchesCategory && matchesSearch;
        });
    }

    function renderStartupCards(items) {
        startupGrid.innerHTML = '';

        if (items.length === 0) {
            startupGrid.innerHTML = `
                <div class="startup-empty-state glass-card">
                    <h3>No startups match this view</h3>
                    <p>Try a different category or search term to explore another part of the Indian startup landscape.</p>
                </div>
            `;
            return;
        }

        items.forEach(item => {
            const theme = startupCategoryThemes[item.category];
            const card = document.createElement('article');
            card.className = 'startup-card glass-card';
            card.dataset.category = item.category;
            card.style.setProperty('--startup-accent', theme.accent);
            card.style.setProperty('--startup-accent-soft', theme.soft);

            const isFavorite = favorites.has(item.id);
            const foundersText = item.founders.join(', ');
            const initials = getStartupInitials(item.name);

            card.innerHTML = `
                <div class="startup-card-top">
                    <div class="startup-brand-badge" aria-label="${item.logoAlt || `${item.name} logo`}">
                        <img class="startup-brand-image" src="${item.logo || ''}" alt="${item.logoAlt || `${item.name} logo`}" loading="lazy">
                        <span class="startup-brand-fallback">${initials}</span>
                    </div>
                    <button class="startup-favorite-btn ${isFavorite ? 'is-favorite' : ''}" type="button"
                        aria-pressed="${isFavorite}" aria-label="${isFavorite ? 'Remove' : 'Add'} ${item.name} to favorites"
                        data-startup-id="${item.id}">
                        <span class="favorite-icon" aria-hidden="true">â¤</span>
                    </button>
                </div>
                <div class="startup-card-body">
                    <div class="startup-card-badges">
                        <span class="startup-badge startup-badge-category">${theme.label}</span>
                        <span class="startup-badge startup-badge-unicorn">Unicorn</span>
                    </div>
                    <h3>${item.name}</h3>
                    <p class="startup-card-description">${item.description}</p>
                    <dl class="startup-meta-list">
                        <div>
                            <dt>Founders</dt>
                            <dd>${foundersText}</dd>
                        </div>
                        <div>
                            <dt>Founded</dt>
                            <dd>${item.founded}</dd>
                        </div>
                        <div>
                            <dt>City</dt>
                            <dd>${item.city}</dd>
                        </div>
                        <div>
                            <dt>Focus</dt>
                            <dd>${item.focus}</dd>
                        </div>
                    </dl>
                </div>
            `;

            card.querySelector('.startup-favorite-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(item.id);
            });

            setupCompactBadge(
                card.querySelector('.startup-brand-image'),
                card.querySelector('.startup-brand-badge'),
                card.querySelector('.startup-brand-fallback'),
                { transparentOnly: true }
            );

            startupGrid.appendChild(card);
        });
    }

    function renderFounderCards() {
        founderGrid.innerHTML = '';

        startupFounderProfiles.forEach((founder, index) => {
            const profile = startupData.find(item => item.name === founder.startup) || startupData[index % startupData.length];
            const theme = startupCategoryThemes[profile.category];
            const card = document.createElement('article');
            card.className = 'founder-card glass-card';
            card.style.setProperty('--startup-accent', theme.accent);
            card.style.setProperty('--startup-accent-soft', theme.soft);
            const initials = getFounderInitials(founder.name);

            card.innerHTML = `
                <div class="founder-card-top">
                    <div class="founder-avatar-badge" aria-label="${founder.founderImageAlt || `Portrait photo of ${founder.name}`}">
                        <img class="founder-card-image" src="${founder.founderImage || ''}" alt="${founder.founderImageAlt || `Portrait photo of ${founder.name}`}" loading="lazy">
                        <span class="founder-image-fallback">${initials}</span>
                    </div>
                    <span class="founder-pill">${founder.startup}</span>
                </div>
                <div class="founder-card-body">
                    <h3>${founder.name}</h3>
                    <p>${founder.detail}</p>
                </div>
            `;
            setupCompactBadge(
                card.querySelector('.founder-card-image'),
                card.querySelector('.founder-avatar-badge'),
                card.querySelector('.founder-image-fallback'),
                { transparentOnly: false }
            );
            founderGrid.appendChild(card);
        });
    }

    function renderStats(items) {
        const unicornCount = items.filter(item => item.unicorn).length;
        const savedCount = items.filter(item => favorites.has(item.id)).length;
        const averageYear = items.length
            ? Math.round(items.reduce((sum, item) => sum + item.founded, 0) / items.length)
            : null;
        const sectorCount = new Set(items.map(item => item.category)).size;

        statVisible.textContent = items.length;
        statUnicorn.textContent = unicornCount;
        statYear.textContent = averageYear || 'â€”';
        statSaved.textContent = savedCount;

        if (heroTotal) heroTotal.textContent = startupData.length;
        if (heroSectors) heroSectors.textContent = Object.keys(startupCategoryThemes).length;
        if (heroUnicorns) heroUnicorns.textContent = startupData.filter(item => item.unicorn).length;

        if (resultsText) {
            resultsText.textContent = items.length === 0
                ? 'No startups match the current view.'
                : `${items.length} startup${items.length === 1 ? '' : 's'} visible across ${sectorCount} ${sectorCount === 1 ? 'category' : 'categories'}.`;
        }
    }

    function renderSavedSummary(items) {
        const savedItems = items.filter(item => favorites.has(item.id));

        if (savedSummary) {
            savedSummary.textContent = savedItems.length
                ? `${savedItems.length} favorite${savedItems.length === 1 ? '' : 's'} in this view`
                : 'No saved startups in the current view.';
        }

        if (savedList) {
            savedList.innerHTML = savedItems.length
                ? savedItems.map(item => `<li><span class="saved-dot"></span>${item.name}</li>`).join('')
                : '<li class="saved-empty">Tap the heart icon on any card to save it here.</li>';
        }
    }

    function toggleFavorite(startupId) {
        if (favorites.has(startupId)) {
            favorites.delete(startupId);
            window.Journey?.removeFromJourney(`startup-${startupId}`);
        } else {
            favorites.add(startupId);
            const item = startupData.find((s) => s.id === startupId);
            window.Journey?.saveToJourney({
                id: `startup-${startupId}`,
                explorerPage: 'startup.html',
                title: item ? item.name : `Startup #${startupId}`,
                thumbnail: item ? (item.logo || '') : '',
                category: item ? (item.category || 'startup') : 'startup'
            });
        }

        renderAll();
    }

    // Favorites now live in the shared "My Journey" store (see journey.js).
    // This reads that shared store and pulls out just the startup ids so
    // the rest of this page's logic (Set of ids) doesn't have to change.
    function loadFavorites() {
        if (!window.Journey) return [];
        return window.Journey.getJourney()
            .filter((item) => item.explorerPage === 'startup.html')
            .map((item) => item.id.replace(/^startup-/, ''));
    }

    // Registers this page's bookmarkable items with the site-wide,
    // cross-explorer search index (see journey.js / Journey.search).
    function registerStartupSearchIndex() {
        if (!window.Journey) return;
        window.Journey.registerSearchItems('startup.html', startupData.map((item) => ({
            id: `startup-${item.id}`,
            title: item.name,
            description: item.description || item.focus || '',
            link: 'startup.html'
        })));
    }

    function setupCompactBadge(imgEl, mediaEl, fallbackEl, options = {}) {
        if (!imgEl || !mediaEl || !fallbackEl) return;

        const { transparentOnly = false } = options;

        const setLoaded = async () => {
            if (transparentOnly) {
                const keep = await shouldKeepBrandImage(imgEl, { requireTransparency: true });
                if (!keep) {
                    mediaEl.classList.remove('image-loaded');
                    mediaEl.classList.add('image-error');
                    imgEl.style.display = 'none';
                    fallbackEl.style.display = 'flex';
                    return;
                }
            }
            mediaEl.classList.add('image-loaded');
            mediaEl.classList.remove('image-error');
            imgEl.style.display = 'block';
            fallbackEl.style.display = 'none';
        };

        const setError = () => {
            mediaEl.classList.remove('image-loaded');
            mediaEl.classList.add('image-error');
            imgEl.style.display = 'none';
            fallbackEl.style.display = 'flex';
        };

        if (imgEl.complete && imgEl.naturalWidth > 0) {
            setLoaded();
            return;
        }

        imgEl.addEventListener('load', setLoaded, { once: true });
        imgEl.addEventListener('error', setError, { once: true });
    }

    function shouldKeepBrandImage(imgEl, options = {}) {
        return new Promise((resolve) => {
            try {
                const { requireTransparency = false } = options;
                const canvas = document.createElement('canvas');
                const size = 24;
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                if (!ctx) {
                    resolve(true);
                    return;
                }

                const sourceWidth = imgEl.naturalWidth || 1;
                const sourceHeight = imgEl.naturalHeight || 1;
                const scale = Math.min(size / sourceWidth, size / sourceHeight);
                const drawWidth = sourceWidth * scale;
                const drawHeight = sourceHeight * scale;
                const offsetX = (size - drawWidth) / 2;
                const offsetY = (size - drawHeight) / 2;

                ctx.clearRect(0, 0, size, size);
                ctx.drawImage(imgEl, offsetX, offsetY, drawWidth, drawHeight);
                const data = ctx.getImageData(0, 0, size, size).data;

                let edgePixels = 0;
                let transparentEdges = 0;
                let opaqueEdges = 0;

                for (let y = 0; y < size; y++) {
                    for (let x = 0; x < size; x++) {
                        const isEdge = x < 2 || y < 2 || x >= size - 2 || y >= size - 2;
                        if (!isEdge) continue;
                        edgePixels += 1;
                        const idx = (y * size + x) * 4;
                        const a = data[idx + 3];

                        if (a < 250) {
                            transparentEdges += 1;
                        } else {
                            opaqueEdges += 1;
                        }
                    }
                }

                const transparentRatio = edgePixels ? transparentEdges / edgePixels : 0;

                if (requireTransparency) {
                    resolve(transparentRatio > 0.05);
                } else {
                    resolve(opaqueEdges > 0);
                }
            } catch (error) {
                resolve(true);
            }
        });
    }

    function getStartupInitials(name) {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .slice(0, 3)
            .toUpperCase();
    }

    function getFounderInitials(name) {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .slice(0, 2)
            .toUpperCase();
    }
}

/* ==========================================================================
   BHARAT GUIDE AI LOGIC
   ========================================================================== */

function initBharatGuide() {
    const fabGuide = document.getElementById('fab-guide');
    const chatWindow = document.getElementById('guide-chat-window');
    const btnCloseChat = document.getElementById('btn-close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const btnSendMsg = document.getElementById('btn-send-msg');

    if (!fabGuide) return; // Not on this page

    // Prevent duplicate event listener registrations on SPA page transitions
    if (fabGuide.dataset.listenerBound) return;
    fabGuide.dataset.listenerBound = "true";

    // Knowledge Graph is now loaded from chatbot-data.js

    let isSynthesizing = false;

    // Toggle Chat
    fabGuide.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            chatInput.focus();
        }
    });

    btnCloseChat.addEventListener('click', () => {
        chatWindow.classList.remove('open');
        if (isSynthesizing) {
            window.speechSynthesis.cancel();
            isSynthesizing = false;
        }
        fabGuide.focus();
    });

    chatWindow.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            btnCloseChat.click();
        }
    });

    // Send Message
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'user-message');
        chatInput.value = '';

        // Determine bot response using external knowledge base
        let response = "I'm sorry, I seem to be having trouble accessing my knowledge base. Let's try again later.";
        if (typeof findBestResponse === 'function') {
            response = findBestResponse(text);
        }

        // Show typing indicator
        const typingId = showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator(typingId);
            addMessage(response, 'bot-message');
            speakResponse(response);
        }, 1200 + Math.random() * 800);
    }

    btnSendMsg.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Chat UI helpers
    function addMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message';
        msgDiv.id = id;
        msgDiv.innerHTML = `
            <div class="message-content typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Web Speech API (Text-to-Speech)
    function speakResponse(text) {
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel(); // Cancel any ongoing speech

        const utterance = new SpeechSynthesisUtterance(text);

        // Try to find an Indian English voice for authenticity
        const voices = window.speechSynthesis.getVoices();
        const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'));

        if (indianVoice) {
            utterance.voice = indianVoice;
        }

        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        isSynthesizing = true;
        utterance.onend = () => { isSynthesizing = false; };

        window.speechSynthesis.speak(utterance);
    }

    // Ensure voices are loaded (Chrome issue)
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }
}


/* ==========================================================================
   PERSONALITIES TYPE CHANGE FUNC
   ========================================================================== */
function initPersonalitiesPage() {
    const tabs = document.querySelectorAll('.category-tab');
    const cards = document.querySelectorAll('.person-card');

    function filterCards(category) {
        cards.forEach(card => {
            if (card.getAttribute('data-category') === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterCards(tab.getAttribute('data-category'));
        });
    });

    // Show only Historical Legends by default on page load
    filterCards('historical');
}


/* ==========================================================================
   SPIRITUAL CARDS ANIMATION CARSOUL
   ========================================================================== */

const spiritualData = [

    {
        id: "s2",
        name: "Taj Mahal",
        location: "Agra, Uttar Pradesh",
        rating: 4.9,
        image: "assets/Taj_Mahal.png",
        description: "An ivory-marble mausoleum built by Shah Jahan for Mumtaz Mahal — a monument to love recognized as one of the world's most extraordinary architectural achievements."
    },
    {
        id: "s3",
        name: "Golden Temple",
        location: "Amritsar, Punjab",
        rating: 4.9,
        image: "assets/Golden_Temple.png",
        description: "A spiritual sanctuary and one of the holiest Sikh shrines, symbolizing equality, devotion and human brotherhood."
    },
    {
        id: "s6",
        name: "Meenakshi Temple",
        location: "Madurai, Tamil Nadu",
        rating: 4.8,
        image: "assets/Meenakshi_Temple.png",
        description: "A Dravidian temple crowned with towering, painted gopurams depicting thousands of sculpted deities — a living center of worship for centuries."
    },
    {
        id: "s7",
        name: "Jama Masjid",
        location: "New Delhi",
        rating: 4.7,
        image: "assets/Jama_Masjid.png",
        description: "Commissioned by Shah Jahan, one of India's largest mosques, its red sandstone courtyard holding tens of thousands at Friday prayer."
    },
    {
        id: "s8",
        name: "Basilica of Bom Jesus",
        location: "Old Goa",
        rating: 4.6,
        image: "assets/Basilica_of_Bom_Jesus.png",
        description: "A UNESCO World Heritage Baroque church holding the mortal remains of St. Francis Xavier, its facade unplastered by design."
    },
    {
        id: "s9",
        name: "Kedarnath Temple",
        location: "Uttarakhand",
        rating: 4.9,
        image: "assets/Kedarnath.png",
        description: "Perched at 3,583m in the Garhwal Himalayas, one of the twelve Jyotirlingas — reached only on foot, mule, or by helicopter."
    },
    {
        id: "s10",
        name: "Hemis Monastery",
        location: "Ladakh",
        rating: 4.7,
        image: "assets/Hemis_Monastery.png",
        description: "The largest and wealthiest monastery in Ladakh, home to a masked Cham dance festival held once every twelve years."
    }
];

function initSpiritualCarousel() {
    const carousel = document.getElementById('spiritual-carousel');
    const dotsContainer = document.getElementById('spiritual-dots');
    const prevBtn = document.getElementById('spiritual-prev');
    const nextBtn = document.getElementById('spiritual-next');
    const detailTitle = document.getElementById('spiritual-detail-title');
    const detailLoc = document.getElementById('spiritual-detail-location');
    const detailDesc = document.getElementById('spiritual-detail-desc');
    const exploreBtn = document.getElementById('spiritual-explore-btn');

    if (!carousel) return;

    const total = spiritualData.length;
    let activeIndex = 2; // start on Golden Temple, matching the reference image
    const VISIBLE_RANGE = 2; // shows activeIndex -2 ... +2 (5 cards)

    // Build all card elements once; visibility/position is handled in render()
    carousel.innerHTML = '';
    spiritualData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'spiritual-card';
        card.setAttribute('data-index', index);
        card.style.backgroundImage = `url(${item.image})`;
        card.innerHTML = `
            <div class="spiritual-card-rating">★ ${item.rating}</div>
            <div class="spiritual-card-overlay">
                <h4>${item.name}</h4>
                <div class="spiritual-card-loc">📍 ${item.location}</div>
            </div>
        `;
        card.addEventListener('click', () => {
            activeIndex = index;
            render();
        });
        carousel.appendChild(card);
    });

    // Circular distance from activeIndex, shortest path around the loop
    function getCircularOffset(index) {
        let diff = index - activeIndex;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        return diff;
    }

    function render() {
        const panel = document.querySelector('.spiritual-detail-panel');
        panel.classList.add('updating');

        const cards = carousel.querySelectorAll('.spiritual-card');

        cards.forEach((card, index) => {
            const offset = getCircularOffset(index);
            const absOffset = Math.abs(offset);

            card.classList.remove('is-active');

            if (absOffset > VISIBLE_RANGE) {
                card.style.display = 'none';
                return;
            }

            card.style.display = 'block';

            const spacing = 200;
            const scale = offset === 0 ? 1 : absOffset === 1 ? 0.8 : 0.62;
            const opacity = offset === 0 ? 1 : absOffset === 1 ? 0.7 : 0.35;
            const zIndex = 10 - absOffset;
            const translateX = offset * spacing;

            card.style.zIndex = zIndex;
            card.style.opacity = opacity;
            card.style.transform =
                `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`;

            if (offset === 0) card.classList.add('is-active');
        });

        const activeItem = spiritualData[activeIndex];
        detailTitle.innerText = activeItem.name; // confirm you want this back
        detailDesc.innerText = activeItem.description;

        requestAnimationFrame(() => {
            panel.classList.remove('updating');
        });
    }

    function goNext() {
        activeIndex = (activeIndex + 1) % total; // wraps to 0 at the end
        render();
    }

    function goPrev() {
        activeIndex = (activeIndex - 1 + total) % total; // wraps to last at the start
        render();
    }

    nextBtn.addEventListener('click', goNext);
    prevBtn.addEventListener('click', goPrev);

    render();
}

// Toast notification styling injection for PWA offline/online states
function injectPWAToastStyles() {
    if (document.getElementById('pwa-toast-styles')) return;
    const style = document.createElement('style');
    style.id = 'pwa-toast-styles';
    style.textContent = `
        .pwa-toast {
            position: fixed;
            bottom: 25px;
            right: 25px;
            background: hsl(222, 35%, 12%);
            border: 1px solid rgba(255, 176, 31, 0.3);
            border-radius: 8px;
            padding: 12px 20px;
            color: #f1f1f1;
            font-family: 'Outfit', sans-serif;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 10000;
        }
        .pwa-toast.show {
            transform: translateY(0);
            opacity: 1;
        }
        .pwa-toast-success {
            border-color: #138808;
        }
        .pwa-toast-warning {
            border-color: #ff6f3c;
        }
    `;
    document.head.appendChild(style);
}

function showPWAToast(message, type = 'info') {
    injectPWAToastStyles();
    let toast = document.getElementById('pwa-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'pwa-toast';
        toast.className = 'pwa-toast';
        document.body.appendChild(toast);
    }
    
    let icon = 'ℹ️';
    if (type === 'success') {
        icon = '✅';
        toast.className = 'pwa-toast pwa-toast-success';
    } else if (type === 'warning') {
        icon = '⚠️';
        toast.className = 'pwa-toast pwa-toast-warning';
    } else {
        toast.className = 'pwa-toast';
    }
    
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // 1. Try to detect root prefix from the script src attribute loading app.js
        const script = document.querySelector('script[src*="app.js"]');
        let prefix = '';
        if (script) {
            const src = script.getAttribute('src');
            const match = src.match(/^(\.\.\/)+/);
            if (match) {
                prefix = match[0];
            }
        }
        
        // 2. Fallback: Detect prefix based on URL path segment depth
        if (!prefix) {
            const pathname = window.location.pathname;
            const isSubdir = pathname.includes('/states/') || 
                            pathname.includes('/forts/') || 
                            pathname.includes('/freedom-timeline/') || 
                            pathname.includes('/handloom/') || 
                            pathname.includes('/kingdoms/') || 
                            pathname.includes('/postal-stamps/') || 
                            pathname.includes('/traditional-games/') || 
                            pathname.includes('/toys/') || 
                            pathname.includes('/geological-wonders/') || 
                            pathname.includes('/innovation-timeline/');
            prefix = isSubdir ? '../' : './';
        }

        navigator.serviceWorker.register(prefix + 'sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, err => {
                console.log('ServiceWorker registration failed: ', err);
            });

        // 3. Listen to online/offline connection state changes to notify users
        window.addEventListener('online', () => {
            showPWAToast('Your internet connection has been restored. Welcome back online!', 'success');
        });
        window.addEventListener('offline', () => {
            showPWAToast('Connection lost. You are now browsing in offline mode.', 'warning');
        });
    });
}

