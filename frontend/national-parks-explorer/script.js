/**
 * National Parks Explorer – India
 * Premium production-ready logic using pure Vanilla JavaScript (ES6+).
 * Features: Interactive SVG Map, Live Filtering & Search, Animated Counters,
 * Scroll Reveal, Glassmorphic Modals, Parallax Scroll, and Ripple Animations.
 */

(function () {
    'use strict';

    /* ==========================================================================
       1. DATA STRUCTURE (All 12+ Featured Sanctuaries with Different Images)
       ========================================================================== */
    const PARKS_DATA = [
        {
            id: 'corbett',
            name: 'Jim Corbett National Park',
            state: 'Uttarakhand',
            region: 'North',
            established: 1936,
            image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80',
            description: 'India’s oldest national park and the inaugural stronghold of Project Tiger. Nestled amidst the sub-Himalayan belt and Ramganga river valley, Corbett is renowned for its majestic Bengal tigers, dense riverine forests, and immense wild elephant herds.',
            wildlife: ['Bengal Tiger', 'Asian Elephant', 'Leopard', 'Sloth Bear', 'Gharial'],
            featured: true
        },
        {
            id: 'kaziranga',
            name: 'Kaziranga National Park',
            state: 'Assam',
            region: 'Northeast',
            established: 1974,
            image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1000&q=80',
            description: 'A prestigious UNESCO World Heritage Site across the untouched floodplains of the Brahmaputra River. Kaziranga shelters two-thirds of the globe’s surviving great one-horned rhinoceroses among towering elephant grasses and scenic marshland pools.',
            wildlife: ['One-horned Rhino', 'Wild Water Buffalo', 'Royal Tiger', 'Swamp Deer', 'Hoolock Gibbon'],
            featured: true
        },
        {
            id: 'ranthambore',
            name: 'Ranthambore National Park',
            state: 'Rajasthan',
            region: 'West',
            established: 1980,
            image: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=1000&q=80',
            description: 'Famed for diurnal tiger sightings amidst dramatic crumbling royal forts, ancient Hindu temples, and tranquil forest lakes. Ranthambore encapsulates a regal blend of Rajasthani historical grandeur and untamed dry deciduous savannah wildlife.',
            wildlife: ['Bengal Tiger', 'Indian Leopard', 'Nilgai', 'Marsh Crocodile', 'Sambar Deer'],
            featured: true
        },
        {
            id: 'gir',
            name: 'Gir National Park',
            state: 'Gujarat',
            region: 'West',
            established: 1965,
            image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80',
            description: 'The final ecological sanctuary on Earth for the wild Asiatic Lion. Spanned across the rugged dry deciduous forests and thorn acacia shrubland of the Kathiawar peninsula, Gir stands as an undisputed triumph of modern zoological preservation.',
            wildlife: ['Asiatic Lion', 'Indian Leopard', 'Chausingha', 'Striped Hyena', 'Mugger Crocodile'],
            featured: true
        },
        {
            id: 'sundarbans',
            name: 'Sundarbans National Park',
            state: 'West Bengal',
            region: 'East',
            established: 1984,
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
            description: 'The Earth’s most extensive unbroken halophilic mangrove archipelago across the Ganges-Brahmaputra Delta. Celebrated for enigmatic, amphibious royal tigers that readily swim across expansive salt estuaries and nocturnal waterways.',
            wildlife: ['Royal Bengal Tiger', 'Saltwater Crocodile', 'Gangetic Dolphin', 'Fishing Cat', 'Water Monitor'],
            featured: true
        },
        {
            id: 'kanha',
            name: 'Kanha National Park',
            state: 'Madhya Pradesh',
            region: 'Central',
            established: 1955,
            image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
            description: 'The sweeping evergreen Sal forests and golden grassy meadows that inspired Rudyard Kipling’s timeless "Jungle Book". Kanha earned world acclaim by successfully reversing the imminent extinction of the Barasingha (hard-ground swamp deer).',
            wildlife: ['Bengal Tiger', 'Barasingha Deer', 'Indian Wild Dog (Dhole)', 'Sloth Bear', 'Gaur'],
            featured: true
        },
        {
            id: 'bandipur',
            name: 'Bandipur National Park',
            state: 'Karnataka',
            region: 'South',
            established: 1974,
            image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80',
            description: 'An integral biological jewel within the sprawling Nilgiri Biosphere Reserve. Shielded by the majestic backdrop of the Western Ghats, Bandipur supports monumental nomadic herds of Asiatic elephants and formidable gaur bison.',
            wildlife: ['Indian Elephant', 'Gaur (Indian Bison)', 'Bengal Tiger', 'Leopard', 'Four-horned Antelope'],
            featured: true
        },
        {
            id: 'periyar',
            name: 'Periyar National Park',
            state: 'Kerala',
            region: 'South',
            established: 1982,
            image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80',
            description: 'Perched high along the mountainous Cardamom Hills of Kerala, Periyar centers around a tranquil artificial woodland reservoir where wild elephants gather to drink, bathe, and socialize amidst thick tropical evergreen rainforest canopies.',
            wildlife: ['Asian Elephant', 'Nilgiri Tahr', 'Lion-tailed Macaque', 'Bengal Tiger', 'Nilgiri Langur'],
            featured: true
        },
        {
            id: 'hemis',
            name: 'Hemis National Park',
            state: 'Ladakh',
            region: 'North',
            established: 1981,
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
            description: 'India’s loftiest and territorially largest national sanctuary spanning 4,400 sq km north of the Himalayan alpine zone. Famous worldwide as the premier kingdom of the elusive, ghostlike Snow Leopard cruising mountainous granite cliffs.',
            wildlife: ['Snow Leopard', 'Tibetan Wolf', 'Himalayan Blue Sheep (Bharal)', 'Asiatic Ibex', 'Golden Eagle'],
            featured: true
        },
        {
            id: 'great-himalayan',
            name: 'Great Himalayan National Park',
            state: 'Himachal Pradesh',
            region: 'North',
            established: 1984,
            image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1000&q=80',
            description: 'An undisputed UNESCO natural monument preserving unspoiled glacial valleys, crystalline rivers, and pristine conifer woodlands. Safeguards fragile Himalayan ecosystems and rare high-altitude pheasants across dramatic elevation shifts.',
            wildlife: ['Western Tragopan', 'Snow Leopard', 'Himalayan Tahr', 'Himalayan Brown Bear', 'Musk Deer'],
            featured: true
        },
        {
            id: 'silent-valley',
            name: 'Silent Valley National Park',
            state: 'Kerala',
            region: 'South',
            established: 1984,
            image: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1000&q=80',
            description: 'A miraculous survivor of ancient, undisturbed tropical shola rainforest within the Kundali Hills. Characterized by an extraordinary ecological stillness, it shelters hyper-endemic Western Ghats fauna that exist nowhere else on Earth.',
            wildlife: ['Lion-tailed Macaque', 'Malabar Giant Squirrel', 'Great Indian Hornbill', 'Nilgiri Wood-Pigeon', 'King Cobra'],
            featured: true
        },
        {
            id: 'nagarhole',
            name: 'Nagarhole National Park',
            state: 'Karnataka',
            region: 'South',
            established: 1988,
            image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1000&q=80',
            description: 'Christened after the winding subterranean streams ("Nagar-hole" meaning cobra river) that cascade through thick rosewood and teak timberlands. An action-packed amphitheater for spotting wild mega-herbivores and elusive black panthers.',
            wildlife: ['Black Panther', 'Bengal Tiger', 'Indian Elephant', 'Sloth Bear', 'Dhole'],
            featured: true
        }
    ];

    /* ==========================================================================
       2. APPLICATION STATE
       ========================================================================== */
    var filterState = {
        search: '',
        state: 'all',
        region: 'all'
    };
    var mapZoomLevel = 1.0;
    var mapPanX = 0;
    var mapPanY = 0;

    /* ==========================================================================
       3. DOMContentLoaded & INITIALIZATION
       ========================================================================== */
    document.addEventListener('DOMContentLoaded', function () {
        initNavigation();
        initRippleEffects();
        initScrollAnimations();
        initStatsCounter();
        initHeroParallax();
        initFilters();
        initGridRender();
        initIndiaMap();
        initModalEvents();
        initFooterLinks();
    });

    /* ==========================================================================
       4. NAVIGATION & MOBILE HAMBURGER
       ========================================================================== */
    function initNavigation() {
        var navbar = document.getElementById('navbar');
        var hamburger = document.getElementById('hamburger-toggle');
        var navMenu = document.getElementById('nav-menu');
        var backToTopBtn = document.getElementById('back-to-top-btn');
        var navLinks = document.querySelectorAll('.nav-menu .nav-link');

        window.addEventListener('scroll', function () {
            var scrollPos = window.scrollY;
            if (scrollPos > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            if (scrollPos > 350) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }

            // Highlight active menu item based on scroll position
            updateActiveNavOnScroll();
        }, { passive: true });

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function () {
                var isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
                hamburger.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('open');
            });

            // Close drawer when link is clicked
            navLinks.forEach(function (link) {
                link.addEventListener('click', function () {
                    navMenu.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', false);
                });
            });
        }
    }

    function updateActiveNavOnScroll() {
        var sections = document.querySelectorAll('section[id]');
        var scrollPosition = window.scrollY + 120;

        sections.forEach(function (current) {
            var sectionTop = current.offsetTop;
            var sectionHeight = current.offsetHeight;
            var sectionId = current.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu .nav-link').forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ==========================================================================
       5. RIPPLE BUTTON ANIMATIONS
       ========================================================================== */
    function initRippleEffects() {
        document.body.addEventListener('click', function (e) {
            var btn = e.target.closest('.ripple');
            if (!btn) return;

            var rect = btn.getBoundingClientRect();
            var size = Math.max(rect.width, rect.height);
            var x = e.clientX - rect.left - size / 2;
            var y = e.clientY - rect.top - size / 2;

            var ripple = document.createElement('span');
            ripple.className = 'ripple-wave';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            btn.appendChild(ripple);

            setTimeout(function () {
                if (ripple && ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    }

    /* ==========================================================================
       6. SCROLL REVEAL (IntersectionObserver) & HERO PARALLAX
       ========================================================================== */
    function initScrollAnimations() {
        var revealElements = document.querySelectorAll('.reveal-on-scroll');
        if (!revealElements.length) return;

        if (!('IntersectionObserver' in window)) {
            revealElements.forEach(function (el) { el.classList.add('revealed'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

        revealElements.forEach(function (el) { observer.observe(el); });
    }

    function initHeroParallax() {
        var heroBg = document.getElementById('hero-bg');
        if (!heroBg) return;

        window.addEventListener('scroll', function () {
            var offset = window.scrollY;
            if (offset < window.innerHeight) {
                heroBg.style.transform = 'translate3d(0, ' + (offset * 0.3) + 'px, 0) scale(1.03)';
            }
        }, { passive: true });
    }

    /* ==========================================================================
       7. ANIMATED STATISTICS COUNTER
       ========================================================================== */
    function initStatsCounter() {
        var statNumbers = document.querySelectorAll('.stat-number');
        if (!statNumbers.length) return;

        if (!('IntersectionObserver' in window)) {
            statNumbers.forEach(function (el) { el.innerText = el.getAttribute('data-target') + '+'; });
            return;
        }

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCountUp(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(function (el) { observer.observe(el); });
    }

    function animateCountUp(element) {
        var target = parseInt(element.getAttribute('data-target'), 10);
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            var easeProgress = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(easeProgress * (target - start) + start);
            
            element.innerText = current + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.innerText = target + '+';
            }
        }
        window.requestAnimationFrame(step);
    }

    /* ==========================================================================
       8. FILTER & SEARCH COMMAND SYSTEM
       ========================================================================== */
    function initFilters() {
        var stateSelect = document.getElementById('state-select');
        var searchInput = document.getElementById('search-input');
        var resetBtn = document.getElementById('reset-filters-btn');
        var regionPills = document.querySelectorAll('.pill-btn[data-region]');

        // Dynamically populate state select from unique dataset states
        if (stateSelect) {
            var uniqueStates = PARKS_DATA.map(function (p) { return p.state; })
                .filter(function (val, idx, self) { return self.indexOf(val) === idx; })
                .sort();

            uniqueStates.forEach(function (stateName) {
                var option = document.createElement('option');
                option.value = stateName;
                option.textContent = stateName;
                stateSelect.appendChild(option);
            });

            stateSelect.addEventListener('change', function (e) {
                filterState.state = e.target.value;
                updateGridDisplay();
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', function (e) {
                filterState.search = e.target.value.trim().toLowerCase();
                updateGridDisplay();
            });
        }

        if (regionPills.length) {
            regionPills.forEach(function (btn) {
                btn.addEventListener('click', function (e) {
                    var selectedRegion = e.currentTarget.getAttribute('data-region');
                    filterState.region = selectedRegion;

                    regionPills.forEach(function (p) { p.classList.remove('active'); });
                    e.currentTarget.classList.add('active');
                    updateGridDisplay();
                });
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                resetAllFilters();
            });
        }
    }

    function resetAllFilters() {
        filterState.search = '';
        filterState.state = 'all';
        filterState.region = 'all';

        var searchInput = document.getElementById('search-input');
        var stateSelect = document.getElementById('state-select');
        var regionPills = document.querySelectorAll('.pill-btn[data-region]');
        var activeBadge = document.getElementById('active-filter-badge');

        if (searchInput) searchInput.value = '';
        if (stateSelect) stateSelect.value = 'all';
        if (activeBadge) activeBadge.textContent = '';

        if (regionPills.length) {
            regionPills.forEach(function (p) {
                p.classList.remove('active');
                if (p.getAttribute('data-region') === 'all') p.classList.add('active');
            });
        }

        // Deactivate active map highlights
        document.querySelectorAll('.state-path').forEach(function (path) {
            path.classList.remove('active');
        });

        updateGridDisplay();
    }

    /* ==========================================================================
       9. DYNAMIC NATIONAL PARKS GRID RENDERING
       ========================================================================== */
    function initGridRender() {
        updateGridDisplay();
    }

    function updateGridDisplay() {
        var gridContainer = document.getElementById('parks-grid');
        var counterText = document.getElementById('parks-counter');
        var activeBadge = document.getElementById('active-filter-badge');
        if (!gridContainer) return;

        var filteredParks = PARKS_DATA.filter(function (park) {
            var matchesState = (filterState.state === 'all' || park.state.toLowerCase() === filterState.state.toLowerCase());
            var matchesRegion = (filterState.region === 'all' || park.region.toLowerCase() === filterState.region.toLowerCase());
            var matchesSearch = true;
            if (filterState.search) {
                var q = filterState.search;
                var textString = (park.name + ' ' + park.state + ' ' + park.description + ' ' + park.wildlife.join(' ')).toLowerCase();
                matchesSearch = textString.indexOf(q) !== -1;
            }
            return matchesState && matchesRegion && matchesSearch;
        });

        gridContainer.innerHTML = '';

        if (counterText) {
            counterText.innerHTML = 'Showing <strong>' + filteredParks.length + '</strong> of <strong>' + PARKS_DATA.length + '</strong> featured sanctuaries';
        }

        if (activeBadge) {
            if (filterState.state !== 'all' || filterState.region !== 'all' || filterState.search !== '') {
                var msg = 'Active Filter: ';
                if (filterState.state !== 'all') msg += 'State (' + filterState.state + ') ';
                if (filterState.region !== 'all') msg += 'Region (' + filterState.region + ') ';
                if (filterState.search !== '') msg += 'Keyword ("' + filterState.search + '") ';
                activeBadge.innerHTML = msg;
            } else {
                activeBadge.innerHTML = '';
            }
        }

        if (filteredParks.length === 0) {
            var emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-state';
            emptyDiv.innerHTML = '
                <div class="empty-icon">🐆</div>
                <h3>No Wilderness Matched Your Criteria</h3>
                <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto 20px;">
                    We could not locate any national sanctuary matching those exact filtering coordinates. Try clearing your search parameters!
                </p>
                <button type="button" onclick="document.getElementById(\'reset-filters-btn\').click()" class="btn btn-primary ripple">Reset All Filters</button>
            ';
            gridContainer.appendChild(emptyDiv);
            return;
        }

        var fragment = document.createDocumentFragment();

        filteredParks.forEach(function (park, idx) {
            var card = document.createElement('article');
            card.className = 'park-card';
            card.style.animation = 'fadeUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) ' + (Math.min(idx * 0.08, 0.5)) + 's both';

            var tagsHtml = park.wildlife.slice(0, 4).map(function (tag) {
                var icon = '🐾';
                if (tag.toLowerCase().indexOf('tiger') !== -1) icon = '🐅';
                else if (tag.toLowerCase().indexOf('elephant') !== -1) icon = '🐘';
                else if (tag.toLowerCase().indexOf('rhino') !== -1) icon = '🦏';
                else if (tag.toLowerCase().indexOf('lion') !== -1) icon = '🦁';
                else if (tag.toLowerCase().indexOf('leopard') !== -1) icon = '🐆';
                else if (tag.toLowerCase().indexOf('bear') !== -1 || tag.toLowerCase().indexOf('crocodile') !== -1) icon = '🐊';
                return '<span class="wildlife-tag"><span>' + icon + '</span> ' + tag + '</span>';
            }).join('');

            card.innerHTML = '
                <div class="park-image-wrapper">
                    <img class="park-image" src="' + park.image + '" alt="' + park.name + '" loading="lazy" />
                    <div class="park-badges-top">
                        <span class="badge-state">📍 ' + park.state + '</span>
                        <span class="badge-region">' + park.region + '</span>
                    </div>
                </div>
                <div class="park-content">
                    <div class="park-meta-sub">
                        <span>Est. ' + park.established + '</span>
                        <span>' + park.wildlife.length + '+ Flagship Species</span>
                    </div>
                    <h3>' + park.name + '</h3>
                    <p class="park-desc">' + park.description + '</p>
                    <div class="wildlife-tags-container">
                        ' + tagsHtml + '
                    </div>
                    <button type="button" class="btn-explore ripple" data-park-id="' + park.id + '" aria-label="Explore details about ' + park.name + '">
                        <span>Explore Sanctuary</span> <span>→</span>
                    </button>
                </div>
            ';

            fragment.appendChild(card);
        });

        gridContainer.appendChild(fragment);

        // Bind Explore button click handlers for modals
        var exploreBtns = gridContainer.querySelectorAll('.btn-explore[data-park-id]');
        exploreBtns.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                var pid = e.currentTarget.getAttribute('data-park-id');
                openParkModal(pid);
            });
        });
    }

    /* ==========================================================================
       10. INTERACTIVE INDIA SVG MAP ENGINE
       ========================================================================== */
    function initIndiaMap() {
        var mapContainer = document.getElementById('india-svg-wrapper');
        var tooltip = document.getElementById('map-tooltip');
        var zoomInBtn = document.getElementById('map-zoom-in');
        var zoomOutBtn = document.getElementById('map-zoom-out');
        var resetZoomBtn = document.getElementById('map-reset');
        if (!mapContainer) return;

        // Check if map-data.js loaded INDIA_MAP_STATES
        if (typeof INDIA_MAP_STATES === 'undefined' || !INDIA_MAP_STATES.length) {
            mapContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Interactive map data is currently synchronizing...</p>';
            return;
        }

        // Create high quality SVG elements
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 750 820');
        svg.setAttribute('role', 'img');
        svg.setAttribute('aria-label', 'Interactive vector map of India showing states and union territories');
        svg.setAttribute('id', 'interactive-map-svg');

        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('id', 'map-zoom-group');
        g.style.transition = 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
        g.style.transformOrigin = 'center center';

        INDIA_MAP_STATES.forEach(function (stateItem) {
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', stateItem.path);
            path.setAttribute('id', 'state-' + stateItem.id);
            path.setAttribute('data-name', stateItem.name);
            path.setAttribute('class', 'state-path');

            // Count parks in this state from our featured database
            var stateParkCount = PARKS_DATA.filter(function (p) {
                return p.state.toLowerCase() === stateItem.name.toLowerCase();
            }).length;
            path.setAttribute('data-count', stateParkCount);

            // Hover Tooltip Events
            path.addEventListener('mouseenter', function (e) {
                var sName = e.target.getAttribute('data-name');
                var count = parseInt(e.target.getAttribute('data-count'), 10);
                var countStr = count === 1 ? '1 Featured Sanctuary' : (count > 1 ? count + ' Featured Sanctuaries' : 'Explore regional biodiversity');
                
                if (tooltip) {
                    tooltip.innerHTML = '<strong>' + sName + '</strong><br/><span style="font-size: 0.8rem; color: var(--accent-gold);">' + countStr + '</span>';
                    tooltip.classList.add('visible');
                }
            });

            path.addEventListener('mousemove', function (e) {
                if (tooltip) {
                    tooltip.style.left = e.clientX + 'px';
                    tooltip.style.top = e.clientY + 'px';
                }
            });

            path.addEventListener('mouseleave', function () {
                if (tooltip) {
                    tooltip.classList.remove('visible');
                }
            });

            // Click to Filter Parks and Highlight State
            path.addEventListener('click', function (e) {
                var targetState = e.target.getAttribute('data-name');
                document.querySelectorAll('.state-path').forEach(function (sp) { sp.classList.remove('active'); });
                e.target.classList.add('active');

                // Apply filter
                var stateSelect = document.getElementById('state-select');
                var matchFound = false;
                if (stateSelect) {
                    Array.from(stateSelect.options).forEach(function (opt) {
                        if (opt.value.toLowerCase() === targetState.toLowerCase()) {
                            stateSelect.value = opt.value;
                            filterState.state = opt.value;
                            matchFound = true;
                        }
                    });
                }

                if (!matchFound) {
                    filterState.state = targetState;
                }
                updateGridDisplay();

                // Scroll smoothly down to explore hub
                var exploreHub = document.getElementById('explore-hub');
                if (exploreHub) {
                    exploreHub.scrollIntoView({ behavior: 'smooth' });
                }
            });

            g.appendChild(path);
        });

        svg.appendChild(g);
        mapContainer.appendChild(svg);

        // Map Zoom Controls
        function applyMapTransform() {
            var group = document.getElementById('map-zoom-group');
            if (group) {
                group.style.transform = 'translate(' + mapPanX + 'px, ' + mapPanY + 'px) scale(' + mapZoomLevel + ')';
            }
        }

        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', function () {
                mapZoomLevel = Math.min(mapZoomLevel + 0.3, 3.0);
                applyMapTransform();
            });
        }
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', function () {
                mapZoomLevel = Math.max(mapZoomLevel - 0.3, 0.7);
                applyMapTransform();
            });
        }
        if (resetZoomBtn) {
            resetZoomBtn.addEventListener('click', function () {
                mapZoomLevel = 1.0;
                mapPanX = 0;
                mapPanY = 0;
                applyMapTransform();
            });
        }
    }

    /* ==========================================================================
       11. NATIONAL PARK DETAILS MODAL SYSTEM
       ========================================================================== */
    function initModalEvents() {
        var modalOverlay = document.getElementById('park-detail-modal');
        var closeBtn = document.getElementById('close-modal-btn');
        var closeFooterBtn = document.getElementById('modal-close-footer');
        var safariBtn = document.getElementById('modal-safari-btn');
        if (!modalOverlay) return;

        if (closeBtn) {
            closeBtn.addEventListener('click', function () { closeParkModal(); });
        }
        if (closeFooterBtn) {
            closeFooterBtn.addEventListener('click', function () { closeParkModal(); });
        }
        if (safariBtn) {
            safariBtn.addEventListener('click', function () {
                alert('Safari booking & permit portal guidance will be available in the upcoming eco-tourism season. Please contact regional park administrative offices for instant permit availability!');
            });
        }

        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                closeParkModal();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeParkModal();
            }
        });
    }

    function openParkModal(parkId) {
        var modalOverlay = document.getElementById('park-detail-modal');
        var park = PARKS_DATA.find(function (p) { return p.id === parkId; });
        if (!modalOverlay || !park) return;

        document.getElementById('modal-park-title').textContent = park.name;
        document.getElementById('modal-park-state').innerHTML = '📍 State: <strong>' + park.state + '</strong>';
        document.getElementById('modal-park-region').innerHTML = '🧭 Region: <strong>' + park.region + ' India</strong>';
        document.getElementById('modal-park-year').innerHTML = '📅 Established: <strong>' + park.established + '</strong>';
        document.getElementById('modal-park-desc').textContent = park.description;
        
        var imgElem = document.getElementById('modal-park-img');
        imgElem.src = park.image;
        imgElem.alt = park.name + ' Scenic Canopy';

        var wildlifeContainer = document.getElementById('modal-wildlife-container');
        wildlifeContainer.innerHTML = park.wildlife.map(function (species) {
            return '<span class="wildlife-tag" style="padding: 8px 16px; font-size: 0.9rem; background: rgba(33, 161, 104, 0.18); color: #ffffff; border: 1px solid rgba(33, 161, 104, 0.4);">🌿 ' + species + '</span>';
        }).join('');

        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeParkModal() {
        var modalOverlay = document.getElementById('park-detail-modal');
        if (!modalOverlay) return;

        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    /* ==========================================================================
       12. FOOTER QUICK LINKS BINDING
       ========================================================================== */
    function initFooterLinks() {
        var footerLinks = document.querySelectorAll('.footer-park-link[data-park]');
        footerLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                var targetName = e.currentTarget.getAttribute('data-park');
                var searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.value = targetName;
                    filterState.search = targetName.toLowerCase();
                    updateGridDisplay();
                }
            });
        });
    }

})();
