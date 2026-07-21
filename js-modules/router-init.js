/**
 * router-init.js
 * Route Initialization Engine & Per-Page Route Mappings
 */

(function () {
    /**
     * Declarative mapping of route patterns -> script dependencies & init handlers
     */
    const ROUTE_INIT_MAP = {
        'cuisine.html': {
            script: 'js-modules/cuisine.js',
            initName: 'initCuisinePage',
            name: 'Cuisine'
        },
        'festivals.html': {
            script: 'js-modules/festivals.js',
            initName: 'initFestivalsPage',
            name: 'Festivals'
        },
        'culture.html': {
            script: 'js-modules/culture.js',
            initName: 'initCulturePage',
            name: 'Culture'
        },
        'literature.html': {
            script: 'js-modules/literature.js',
            initName: 'initLiteraturePage',
            name: 'Literature'
        },
        'dance.html': {
            script: 'js-modules/dance.js',
            initName: 'initDancePage',
            name: 'Dance'
        },
        'music.html': {
            script: 'js-modules/music.js',
            initName: 'initMusicPage',
            name: 'Music'
        },
        'sports.html': {
            script: 'js-modules/sports.js',
            initName: 'initSportsPage',
            name: 'Sports'
        },
        'science.html': {
            script: 'js-modules/science.js',
            initName: 'initSciencePage',
            name: 'Science'
        },
        'personalities.html': {
            script: 'js-modules/personalities.js',
            initName: 'initPersonalitiesPage',
            before: 'initScrollEffects',
            useSafeInit: true,
            name: 'Personalities'
        },
        'spiritual.html': {
            script: 'js-modules/spiritual.js',
            initName: 'initSpiritualCarousel',
            before: 'initScrollEffects',
            useSafeInit: true,
            name: 'Spiritual'
        },
        'startup.html': {
            script: 'js-modules/startup.js',
            initName: 'initStartupPage',
            useSafeInit: true,
            name: 'Startup'
        },
        'travel.html': {
            script: 'js-modules/roadtrip.js',
            initName: 'initRoadTripFlipCards',
            useSafeInit: true,
            name: 'Travel'
        },
        'trip-planner.html': {
            scripts: ['trip-data.js', 'js-modules/trip-planner.js'],
            initName: 'initTripPlannerPage',
            useSafeInit: true,
            name: 'Trip Planner'
        },
        'heritage.html': { log: '✅ Heritage page loaded successfully' },
        'monuments.html': { log: '✅ Monuments page loaded successfully' },
        'hidden-gems.html': { log: '✅ Hidden Gems page loaded successfully' },
        'railways.html': { log: '✅ Railways Explorer page loaded successfully' },
        'adventure.html': { log: 'Adventure page loaded successfully' }
    };

    /**
     * Safe init helper — wraps a page init function in try-catch so a single
     * failing section doesn't break the entire SPA route transition.
     */
    function safeInitFn(initFn, name) {
        try {
            const result = initFn();
            if (result && typeof result.catch === 'function') {
                result.catch(err => {
                    console.error(`[App] Async error in ${name}:`, err);
                    if (window.ToastNotifier) {
                        window.ToastNotifier.error(`${name} encountered an error. Some features may not work.`);
                    }
                });
            }
        } catch (err) {
            console.error(`[App] Error initializing ${name}:`, err);
            if (window.ToastNotifier) {
                window.ToastNotifier.error(`${name} failed to load. Please refresh the page.`);
            }
        }
    }

    /**
     * Error boundary for lazyLoadScript chains
     */
    function handleInitError(pageName, err) {
        console.error(`[App] Failed to load ${pageName} page module:`, err);
        if (window.ToastNotifier) {
            window.ToastNotifier.error(`Could not load ${pageName} content. Please try again.`);
        }
    }

    /**
     * Fallback initialization for landing page components
     */
    function initLandingPage() {
        if (typeof window.initScrollEffects === 'function') {
            window.initScrollEffects();
        }

        const lazyInit = (elementId, scriptPath, initFuncName, name) => {
            const el = document.getElementById(elementId);
            if (!el) return;

            const loadAndInit = () => {
                const runner = () => {
                    if (typeof window[initFuncName] === 'function') {
                        safeInitFn(window[initFuncName], name);
                    }
                };
                if (scriptPath && typeof window.lazyLoadScript === 'function') {
                    window.lazyLoadScript(scriptPath).then(runner).catch(err => handleInitError(name, err));
                } else {
                    runner();
                }
            };

            if ('IntersectionObserver' in window) {
                const obs = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            loadAndInit();
                            obs.disconnect();
                        }
                    });
                }, { rootMargin: '200px' });
                if (typeof window.iiRegisterObserver === 'function') {
                    window.iiRegisterObserver(obs);
                }
                obs.observe(el);
            } else {
                loadAndInit();
            }
        };

        lazyInit('map-container', 'js-modules/initMap.js', 'initInteractiveMap', 'Interactive Map');
        lazyInit('cuisine-grid', 'js-modules/initLandingSections.js', 'initCuisineExplorer', 'Cuisine Explorer');
        lazyInit('festival-timeline', 'js-modules/initLandingSections.js', 'initFestivals', 'Festivals');
        lazyInit('slider-container', 'js-modules/initLandingSections.js', 'initCultureSlider', 'Culture Slider');
        lazyInit('quiz-card', 'js-modules/initQuiz.js', 'initQuiz', 'Quiz');
        lazyInit('fab-guide', 'js-modules/initBharatGuide.js', 'initBharatGuide', 'Bharat Guide');
    }

    /**
     * Main Route Initialization Handler
     */
    function handleRouteInit() {
        if (typeof window.iiDisconnectRouteObservers === 'function') {
            window.iiDisconnectRouteObservers();
        }

        if (typeof window.initNavigation === 'function') window.initNavigation();
        if (typeof window.initThemeToggle === 'function') window.initThemeToggle();
        if (typeof window.initRotatingText === 'function') window.initRotatingText();

        const pathname = window.location.pathname;
        let matched = false;

        for (const [routePattern, routeConfig] of Object.entries(ROUTE_INIT_MAP)) {
            if (pathname.includes(routePattern)) {
                matched = true;
                if (routeConfig.log) {
                    console.log(routeConfig.log);
                    break;
                }

                if (routeConfig.before && typeof window[routeConfig.before] === 'function') {
                    window[routeConfig.before]();
                }

                const executeInit = () => {
                    const initFn = window[routeConfig.initName];
                    if (typeof initFn === 'function') {
                        if (routeConfig.useSafeInit) {
                            safeInitFn(initFn, routeConfig.name);
                        } else {
                            initFn();
                        }
                    }
                };

                if (typeof window.lazyLoadScript === 'function') {
                    if (routeConfig.scripts) {
                        let promise = Promise.resolve();
                        routeConfig.scripts.forEach(s => {
                            promise = promise.then(() => window.lazyLoadScript(s));
                        });
                        promise.then(executeInit).catch(err => handleInitError(routeConfig.name, err));
                    } else if (routeConfig.script) {
                        window.lazyLoadScript(routeConfig.script).then(executeInit).catch(err => handleInitError(routeConfig.name, err));
                    } else {
                        executeInit();
                    }
                } else {
                    executeInit();
                }
                break;
            }
        }

        if (!matched) {
            initLandingPage();
        }
    }

    // Bind route event listener
    document.addEventListener('app:route-changed', handleRouteInit);

    // Export helpers on window
    window.safeInitFn = safeInitFn;
    window.handleInitError = handleInitError;
    window.handleRouteInit = handleRouteInit;
    window.ROUTE_INIT_MAP = ROUTE_INIT_MAP;
})();
