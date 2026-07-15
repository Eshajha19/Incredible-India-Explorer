/**
 * router.js
 * Vanilla JavaScript Single Page Application Routing & Lifecycle Engine
 * Fixes variable redeclaration crashes and manages execution life cycles.
 */

// ==========================================================================
// 1. LIFECYCLE & CLEANUP ENGINE
// ==========================================================================

class RouteLifecycleManager {
    constructor() {
        this.routeListeners = []; // Array of { target, type, listener, options, route }
        this.routeTimers = [];      // Array of { id, type, route }
        this.cleanups = [];         // Array of explicit cleanup functions
        this.currentRoute = null;
        this.isTracking = false;

        this.initHooks();
    }

    /**
     * Sets the active route string currently executing.
     */
    setCurrentRoute(route) {
        this.currentRoute = route;
    }

    /**
     * Toggles resource tracking for incoming addEventListener / setTimeout / setInterval.
     */
    startTracking() {
        this.isTracking = true;
    }

    stopTracking() {
        this.isTracking = false;
    }

    /**
     * Hooks window/document event listeners and standard timers to catch leaks.
     */
    initHooks() {
        const self = this;

        // Override window.addEventListener
        const originalWindowAddEventListener = window.addEventListener;
        window.addEventListener = function(type, listener, options) {
            if (self.isTracking && self.currentRoute) {
                self.routeListeners.push({
                    target: window,
                    type,
                    listener,
                    options,
                    route: self.currentRoute
                });
            }
            originalWindowAddEventListener.call(window, type, listener, options);
        };

        // Override document.addEventListener
        const originalDocumentAddEventListener = document.addEventListener;
        document.addEventListener = function(type, listener, options) {
            // Polyfill: If script tries to bind DOMContentLoaded/load after the document
            // is already loaded, fire it asynchronously on the next tick.
            if ((type === 'DOMContentLoaded' || type === 'load') && document.readyState !== 'loading') {
                setTimeout(listener, 0);
                return;
            }

            if (self.isTracking && self.currentRoute) {
                self.routeListeners.push({
                    target: document,
                    type,
                    listener,
                    options,
                    route: self.currentRoute
                });
            }
            originalDocumentAddEventListener.call(document, type, listener, options);
        };

        // Override window.setTimeout
        const originalSetTimeout = window.setTimeout;
        window.setTimeout = function(handler, delay, ...args) {
            const id = originalSetTimeout.call(window, handler, delay, ...args);
            if (self.isTracking && self.currentRoute) {
                self.routeTimers.push({
                    id,
                    type: 'timeout',
                    route: self.currentRoute
                });
            }
            return id;
        };

        // Override window.setInterval
        const originalSetInterval = window.setInterval;
        window.setInterval = function(handler, delay, ...args) {
            const id = originalSetInterval.call(window, handler, delay, ...args);
            if (self.isTracking && self.currentRoute) {
                self.routeTimers.push({
                    id,
                    type: 'interval',
                    route: self.currentRoute
                });
            }
            return id;
        };
    }

    /**
     * Explicit listener registration (emulates the original router interface)
     */
    addEventListener(target, event, handler, options = false) {
        target.addEventListener(event, handler, options);
        this.registerCleanup(() => {
            target.removeEventListener(event, handler, options);
        });
    }

    /**
     * Register a explicit custom cleanup function to be run on next transition.
     */
    registerCleanup(cleanupFn) {
        if (typeof cleanupFn === 'function') {
            this.cleanups.push(cleanupFn);
        }
    }

    /**
     * Cleans up all event listeners and timers allocated by the target route.
     */
    cleanupRoute(route) {
        // Remove event listeners
        this.routeListeners = this.routeListeners.filter(item => {
            if (item.route === route) {
                try {
                    item.target.removeEventListener(item.type, item.listener, item.options);
                } catch (e) {
                    console.error(`[Lifecycle] Error removing listener on ${route}:`, e);
                }
                return false;
            }
            return true;
        });

        // Cancel active timers
        this.routeTimers = this.routeTimers.filter(item => {
            if (item.route === route) {
                try {
                    if (item.type === 'timeout') {
                        clearTimeout(item.id);
                    } else if (item.type === 'interval') {
                        clearInterval(item.id);
                    }
                } catch (e) {
                    console.error(`[Lifecycle] Error clearing timer on ${route}:`, e);
                }
                return false;
            }
            return true;
        });
    }

    /**
     * Evaluates all registered custom cleanup functions.
     */
    runCleanups() {
        this.cleanups.forEach(fn => {
            try {
                fn();
            } catch (e) {
                console.error("[Lifecycle] Error executing custom cleanup:", e);
            }
        });
        this.cleanups = [];
    }
}

// ==========================================================================
// 2. ROUTE HISTORY TRACKER
// ==========================================================================

class RouteHistoryTracker {
    constructor() {
        this.history = [];
    }

    push(path) {
        const entry = {
            path,
            timestamp: new Date().toISOString(),
            referrer: this.history.length > 0 ? this.history[this.history.length - 1].path : document.referrer
        };
        this.history.push(entry);
        if (this.history.length > 100) {
            this.history.shift(); // Keep last 100 entries
        }
    }

    getHistory() {
        return [...this.history];
    }

    getLastRoute() {
        if (this.history.length < 2) return null;
        return this.history[this.history.length - 2];
    }
}


// ==========================================================================
// 2. ROUTE CACHE ENGINE
// ==========================================================================

class RouteCache {
    constructor(ttlMs = 300000) { // Default TTL: 5 Minutes
        this.cache = new Map();
        this.ttl = ttlMs;
    }

    set(path, data) {
        this.cache.set(path, {
            data,
            timestamp: Date.now()
        });
    }

    get(path) {
        const item = this.cache.get(path);
        if (!item) return null;

        // Invalidate expired cache items
        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(path);
            return null;
        }

        return item.data;
    }

    clear() {
        this.cache.clear();
    }
}

// ==========================================================================
// 3. PREFETCHING ENGINE (HOVER HOOKS)
// ==========================================================================

class Prefetcher {
    constructor(router) {
        this.router = router;
        this.prefetchedUrls = new Set();
    }

    init() {
        document.body.addEventListener('mouseover', (e) => this.handleHover(e));
        document.body.addEventListener('touchstart', (e) => this.handleHover(e));
    }

    handleHover(e) {
        const link = e.target.closest('a');
        if (link && link.href) {
            const url = new URL(link.href);
            const currentUrl = new URL(window.location.href);

            // Fetch only internal links not matching target="_blank"
            if (url.origin === currentUrl.origin && link.target !== '_blank') {
                const path = url.pathname + url.search + url.hash;
                if (!this.prefetchedUrls.has(path) && !this.router.cache.get(path)) {
                    this.prefetch(path);
                }
            }
        }
    }

    async prefetch(path) {
        this.prefetchedUrls.add(path);
        try {
            const response = await fetch(path);
            if (response.ok) {
                const html = await response.text();
                this.router.cache.set(path, html);
                this.router.logger.debug(`Prefetched page: ${path}`);
            }
        } catch (e) {
            this.router.logger.error(`Failed to prefetch page: ${path}`, e);
        }
    }
}

// ==========================================================================
// 4. TRANSITION EFFECTS MANAGER
// ==========================================================================

class TransitionManager {
    constructor(appRoot) {
        this.appRoot = appRoot;
    }

    async transitionOut(type = 'fade') {
        if (!this.appRoot) return;
        this.appRoot.className = `page-transition-${type}-out`;
        await new Promise(r => setTimeout(r, 250)); // Sync animation duration
    }

    transitionIn(type = 'fade') {
        if (!this.appRoot) return;
        this.appRoot.className = `page-transition-${type}-in`;
        setTimeout(() => {
            if (this.appRoot) {
                this.appRoot.className = '';
            }
        }, 250);
    }
}

function injectTransitionStyles() {
    if (document.getElementById('spa-transition-styles')) return;

    const style = document.createElement('style');
    style.id = 'spa-transition-styles';
    style.textContent = `
        .page-transition-fade-out {
            opacity: 0;
            transition: opacity 0.25s ease-out;
        }
        .page-transition-fade-in {
            opacity: 0;
            animation: spaFadeIn 0.25s ease-in forwards;
        }
        @keyframes spaFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .page-transition-slide-out {
            transform: translateX(-20px);
            opacity: 0;
            transition: transform 0.25s ease-out, opacity 0.25s ease-out;
        }
        .page-transition-slide-in {
            transform: translateX(20px);
            opacity: 0;
            animation: spaSlideIn 0.25s ease-in forwards;
        }
        @keyframes spaSlideIn {
            from { transform: translateX(20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        .page-transition-zoom-out {
            transform: scale(0.98);
            opacity: 0;
            transition: transform 0.25s ease-out, opacity 0.25s ease-out;
        }
        .page-transition-zoom-in {
            transform: scale(1.02);
            opacity: 0;
            animation: spaZoomIn 0.25s ease-in forwards;
        }
        @keyframes spaZoomIn {
            from { transform: scale(1.02); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================================================
// 5. ROUTING PERFORMANCE LOGGER
// ==========================================================================

class RouteLogger {
    constructor(enabled = true) {
        this.enabled = enabled;
    }

    info(msg) {
        if (this.enabled) console.log(`%c[Router] INFO: ${msg}`, 'color: #3b82f6; font-weight: bold;');
    }

    debug(msg) {
        if (this.enabled) console.log(`%c[Router] DEBUG: ${msg}`, 'color: #10b981;');
    }

    error(msg, err) {
        if (this.enabled) console.error(`[Router] ERROR: ${msg}`, err);
    }
}

// ==========================================================================
// 6. MAIN ROUTER ENGINE
// ==========================================================================

class Router {
    constructor() {
        this.appRoot = document.getElementById('app-root');
        if (!this.appRoot) {
            this.appRoot = document.querySelector('main');
            if (this.appRoot) {
                this.appRoot.id = 'app-root';
            }
        }

        this.loadedScripts = new Set();
        this.loadedStyles = new Set();
        this.cache = new RouteCache();
        this.logger = new RouteLogger();
        this.prefetcher = new Prefetcher(this);
        this.transitionManager = new TransitionManager(this.appRoot);
        this.lifecycle = new RouteLifecycleManager();
        this.historyTracker = new RouteHistoryTracker();
        this.currentPath = window.location.pathname + window.location.search + window.location.hash;

        // Record initial script and style states
        document.querySelectorAll('script[src]').forEach(s => {
            this.loadedScripts.add(s.getAttribute('src'));
        });
        document.querySelectorAll('link[rel="stylesheet"]').forEach(l => {
            this.loadedStyles.add(l.getAttribute('href'));
        });

        // Set global access hooks
        window.appLifecycle = this.lifecycle;

        injectTransitionStyles();
        this.init();
    }

    init() {
        // Browser popstate hook
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname + window.location.search + window.location.hash, false);
        });

        // Click intercept logic for routing links
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('a');

            if (link && link.href && link.target !== '_blank') {
                const url = new URL(link.href);
                const currentUrl = new URL(window.location.href);

                if (url.origin === currentUrl.origin) {
                    // Let default browser scroll take place if target is a simple hash on same page
                    if (url.pathname === currentUrl.pathname && url.search === currentUrl.search) {
                        return;
                    }

                    e.preventDefault();

                    if (url.href !== currentUrl.href) {
                        this.handleRoute(url.pathname + url.search + url.hash, true);
                    }
                }
            }
        });

        // Initialize Hover prefetching
        this.prefetcher.init();

        // Dispatch initial router event load
        this.dispatchRouteEvent();

        if (typeof initializeGlobalSearch === 'function') {
            initializeGlobalSearch();
        }
    }

    async handleRoute(path, push = true) {
        const startTime = performance.now();
        this.logger.info(`Navigating to: ${path}`);
        this.historyTracker.push(path);

        // Cleanup resources registered on the current route
        if (this.currentPath) {
            this.lifecycle.cleanupRoute(this.currentPath);
        }
        this.lifecycle.runCleanups();

        // Stop active audio synthesizers to prevent sound overlay leaks
        if (typeof window.stopSoundscape === 'function') {
            try {
                window.stopSoundscape();
            } catch (e) {
                this.logger.error('Failed to cleanup soundscape', e);
            }
        }

        document.dispatchEvent(new CustomEvent('app:before-route', { detail: { path } }));

        // Detect animation configuration
        let transitionType = 'fade';
        const activeLink = document.querySelector(`a[href="${path}"]`);
        if (activeLink && activeLink.dataset.transition) {
            transitionType = activeLink.dataset.transition;
        }

        // Apply visual transition-out effect
        await this.transitionManager.transitionOut(transitionType);

        try {
            let htmlString = this.cache.get(path);
            let cacheHit = true;

            if (!htmlString) {
                cacheHit = false;
                const response = await fetch(path);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                htmlString = await response.text();
                this.cache.set(path, htmlString);
            }

            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');

            document.title = doc.title;

            const newMain = doc.querySelector('main');
            if (newMain && this.appRoot) {
                // Swap main layouts
                this.appRoot.innerHTML = newMain.innerHTML;

                // Sync new styles in document head
                await this.processHead(doc);

                // Set tracking route for scripts
                this.currentPath = path;

                // Process and evaluate new scripts
                this.processBodyScripts(doc);

                if (push) {
                    window.history.pushState(null, '', path);
                }

                // Apply visual transition-in effect
                this.transitionManager.transitionIn(transitionType);

                // Smooth scroll to element hash or page top
                const hash = new URL(path, window.location.origin).hash;
                if (hash) {
                    setTimeout(() => {
                        const target = document.querySelector(hash);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100);
                } else {
                    window.scrollTo(0, 0);
                }

                this.dispatchRouteEvent();

                // Update SEO Metadata and JSON-LD Structured Data dynamically
                if (window.seoHelper && typeof window.seoHelper.update === 'function') {
                    window.seoHelper.update(doc, path);
                }

                if (typeof initializeGlobalSearch === 'function') {
                    initializeGlobalSearch();
                }

                const elapsed = (performance.now() - startTime).toFixed(1);
                this.logger.info(`Loaded ${path} in ${elapsed}ms [Cache: ${cacheHit ? 'HIT' : 'MISS'}]`);
            } else {
                window.location.href = path;
            }

        } catch (error) {
            this.logger.error(`Failed to handle route: ${path}`, error);
            window.location.href = path;
        }
    }

    processHead(doc) {
        const promises = [];
        doc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !this.loadedStyles.has(href)) {
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = href;

                const p = new Promise(resolve => {
                    newLink.onload = () => resolve();
                    newLink.onerror = () => resolve();
                });
                promises.push(p);

                document.head.appendChild(newLink);
                this.loadedStyles.add(href);
            }
        });
        return Promise.all(promises);
    }

    processBodyScripts(doc) {
        const scripts = [...doc.querySelectorAll('script')];

        scripts.forEach(oldScript => {
            const src = oldScript.getAttribute('src');

            if (src) {
                // External script execution
                if (!this.loadedScripts.has(src)) {
                    const newScript = document.createElement('script');
                    newScript.src = src;
                    Array.from(oldScript.attributes).forEach(attr => {
                        if (attr.name !== 'src') {
                            newScript.setAttribute(attr.name, attr.value);
                        }
                    });
                    document.body.appendChild(newScript);
                    this.loadedScripts.add(src);
                }
            } else {
                // Inline script sandbox wrapper processing
                const scriptText = oldScript.textContent;
                if (scriptText.trim()) {
                    const processedCode = this.preprocessInlineScript(scriptText);

                    const newScript = document.createElement('script');
                    newScript.setAttribute('data-route-script', this.currentPath);
                    newScript.textContent = processedCode;

                    // Activate resource tracking for event listeners and timers
                    this.lifecycle.setCurrentRoute(this.currentPath);
                    this.lifecycle.startTracking();

                    try {
                        document.body.appendChild(newScript);
                    } catch (e) {
                        this.logger.error("Failed to execute sandboxed script", e);
                    } finally {
                        this.lifecycle.stopTracking();
                    }
                }
            }
        });
    }

    /**
     * Formulates an IIFE closure wrapping page-specific inline scripts.
     * Extracts top-level functions and variables, declaring them globally on window
     * to prevent scope block failures or HTML onclick ReferenceErrors.
     */
    preprocessInlineScript(scriptText) {
        // Extract function declarations: function name(...)
        const fnMatches = [...scriptText.matchAll(/function\s+([a-zA-Z0-9_$]+)\s*\(/g)];
        const declaredFns = fnMatches.map(m => m[1]);

        // Extract top-level variable declarations: const name =, let name =, var name =
        const varMatches = [...scriptText.matchAll(/^\s*(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=/gm)];
        const declaredVars = varMatches.map(m => m[1]);

        // Get unified list of declarations
        const allExposed = [...new Set([...declaredFns, ...declaredVars])];

        // Format declarations to attach directly to global window object
        const exposedCode = allExposed.map(name => `try { window.${name} = ${name}; } catch(e) {}`).join('\n');

        return `
/* Sandboxed SPA Route Script */
(function() {
${scriptText}
${exposedCode}
})();`;
    }

    dispatchRouteEvent() {
        const event = new CustomEvent('app:route-changed', {
            detail: { url: window.location.pathname }
        });
        document.dispatchEvent(event);
    }
}

// Initialize Router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.appRouter = new Router();
    if (typeof initializeGlobalSearch === 'function') {
        initializeGlobalSearch();
    }
});

/* ==========================================================================
   GLOBAL SEARCH IMPLEMENTATION
   ========================================================================== */

function getPathPrefix() {
    const path = window.location.pathname;
    if (path.includes('/states/') ||
        path.includes('/traditional-games/') ||
        path.includes('/freedom-timeline/') ||
        path.includes('/postal-stamps/') ||
        path.includes('/handloom/')) {
        return '../';
    }
    return '';
}

function loadSearchScript(callback) {
    if (window.indiaSearchIndex) {
        if (callback) callback();
        return;
    }
    const script = document.createElement('script');
    script.src = getPathPrefix() + 'search-index.js';
    script.onload = () => {
        if (callback) callback();
    };
    script.onerror = () => {
        console.error("Failed to load search index.");
    };
    document.body.appendChild(script);
}

function initializeGlobalSearch() {
    const themeToggle = document.getElementById('theme-toggle');
    const navMenu = document.getElementById('nav-menu') || document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');

    if (!document.getElementById('global-search-trigger')) {
        const searchTrigger = document.createElement('button');
        searchTrigger.id = 'global-search-trigger';
        searchTrigger.className = 'btn-search-trigger';
        searchTrigger.setAttribute('aria-label', 'Search entire website');
        searchTrigger.setAttribute('title', 'Search Website');
        searchTrigger.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        `;

        if (themeToggle) {
            themeToggle.parentNode.insertBefore(searchTrigger, themeToggle);
        } else if (navMenu) {
            navMenu.appendChild(searchTrigger);
        } else if (navContainer) {
            navContainer.appendChild(searchTrigger);
        }

        // Bind open click event
        searchTrigger.addEventListener('click', openSearchModal);
    }
}

let currentFocusIndex = -1;
let previousActiveElement = null;

function createSearchModal() {
    let modal = document.getElementById('global-search-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'global-search-modal';
    modal.className = 'search-modal';
    modal.style.display = 'none';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Website Search');

    modal.innerHTML = `
        <div class="search-modal-backdrop"></div>
        <div class="search-modal-container">
            <div class="search-modal-header">
                <div class="search-input-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" id="global-search-input" placeholder="Search states, cuisines, monuments, wildlife..." aria-label="Search website content" autocomplete="off" />
                    <button id="global-search-clear" class="btn-search-clear" aria-label="Clear search" style="display: none;">✕</button>
                </div>
                <button id="global-search-close" class="btn-search-close" aria-label="Close search">✕</button>
            </div>
            <div class="search-modal-body">
                <div id="search-results-container" class="search-results-container">
                    <div class="search-initial-state">
                        <p class="search-hint-title">Search Across Incredible India</p>
                        <p class="search-hint-desc">Discover heritage, cities, wildlife, sports, and culture instantly.</p>
                        <div class="search-shortcuts">
                            <span class="search-shortcut-tag" data-query="Taj Mahal">Taj Mahal</span>
                            <span class="search-shortcut-tag" data-query="Biryani">Biryani</span>
                            <span class="search-shortcut-tag" data-query="Hornbill">Hornbill</span>
                            <span class="search-shortcut-tag" data-query="Kerala">Kerala</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-modal-footer">
                <span class="search-key-hint"><kbd>↑↓</kbd> Navigate</span>
                <span class="search-key-hint"><kbd>Enter</kbd> Select</span>
                <span class="search-key-hint"><kbd>Esc</kbd> Close</span>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setupModalEvents(modal);
    return modal;
}

function openSearchModal() {
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');

    previousActiveElement = document.activeElement;

    const modal = createSearchModal();
    modal.style.display = 'flex';

    loadSearchScript(() => {
        const input = document.getElementById('global-search-input');
        if (input) {
            performSearch(input.value);
            input.focus();
        }
    });

    document.addEventListener('keydown', handleEscKey);
}

function closeSearchModal() {
    const modal = document.getElementById('global-search-modal');
    if (!modal) return;

    modal.style.display = 'none';

    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');

    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
    }

    document.removeEventListener('keydown', handleEscKey);
}

function handleEscKey(e) {
    if (e.key === 'Escape') {
        closeSearchModal();
    }
}

function setupModalEvents(modal) {
    const backdrop = modal.querySelector('.search-modal-backdrop');
    const closeBtn = modal.querySelector('#global-search-close');
    const clearBtn = modal.querySelector('#global-search-clear');
    const input = modal.querySelector('#global-search-input');

    backdrop.addEventListener('click', closeSearchModal);
    closeBtn.addEventListener('click', closeSearchModal);

    clearBtn.addEventListener('click', () => {
        input.value = '';
        performSearch('');
        input.focus();
    });

    input.addEventListener('input', (e) => {
        currentFocusIndex = -1;
        performSearch(e.target.value);
    });

    // Keyboard navigation and accessibility
    modal.addEventListener('keydown', (e) => {
        const list = modal.querySelector('.search-results-list');

        if (e.key === 'Tab') {
            const focusableElements = Array.from(modal.querySelectorAll('input, button, [tabindex="0"], .search-result-item'));
            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
            return;
        }

        if (!list) return;
        const items = list.querySelectorAll('.search-result-item');
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentFocusIndex++;
            if (currentFocusIndex >= items.length) {
                currentFocusIndex = 0;
            }
            updateFocus(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentFocusIndex--;
            if (currentFocusIndex < 0) {
                currentFocusIndex = items.length - 1;
            }
            updateFocus(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentFocusIndex >= 0 && currentFocusIndex < items.length) {
                items[currentFocusIndex].click();
            } else if (items.length > 0) {
                items[0].click();
            }
        }
    });
}

function updateFocus(items) {
    items.forEach((item, index) => {
        if (index === currentFocusIndex) {
            item.classList.add('active');
            item.setAttribute('aria-selected', 'true');
            item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
            item.classList.remove('active');
            item.removeAttribute('aria-selected');
        }
    });
}

// Escapes regex symbols
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Highlights matches in search result items
function highlightText(text, query) {
    if (!query) return text;
    const escapedQuery = escapeRegExp(query);
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return text.replace(regex, '<span class="search-result-highlight">$1</span>');
}

// Action when search result is selected
function selectResult(url) {
    closeSearchModal();
    if (window.appRouter && typeof window.appRouter.handleRoute === 'function') {
        window.appRouter.handleRoute(url, true);
    } else {
        window.location.href = url;
    }
}

// Perform client-side indexing search
function performSearch(query) {
    const resultsContainer = document.getElementById('search-results-container');
    if (!resultsContainer) return;

    const trimmedQuery = query.trim().toLowerCase();

    const clearBtn = document.getElementById('global-search-clear');
    if (clearBtn) {
        clearBtn.style.display = trimmedQuery ? 'block' : 'none';
    }

    if (!trimmedQuery) {
        resultsContainer.innerHTML = `
            <div class="search-initial-state">
                <p class="search-hint-title">Search Across Incredible India</p>
                <p class="search-hint-desc">Discover heritage, cities, wildlife, sports, and culture instantly.</p>
                <div class="search-shortcuts">
                    <span class="search-shortcut-tag" data-query="Taj Mahal">Taj Mahal</span>
                    <span class="search-shortcut-tag" data-query="Biryani">Biryani</span>
                    <span class="search-shortcut-tag" data-query="Hornbill">Hornbill</span>
                    <span class="search-shortcut-tag" data-query="Kerala">Kerala</span>
                </div>
            </div>
        `;
        resultsContainer.querySelectorAll('.search-shortcut-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const input = document.getElementById('global-search-input');
                if (input) {
                    input.value = tag.dataset.query;
                    performSearch(tag.dataset.query);
                    input.focus();
                }
            });
        });
        return;
    }

    if (!window.indiaSearchIndex) {
        resultsContainer.innerHTML = `<div class="search-no-results">Loading search index...</div>`;
        return;
    }

    const matches = window.indiaSearchIndex.filter(item => {
        return item.title.toLowerCase().includes(trimmedQuery) ||
            item.category.toLowerCase().includes(trimmedQuery) ||
            item.description.toLowerCase().includes(trimmedQuery);
    });

    if (matches.length === 0) {
        resultsContainer.innerHTML = `
            <div class="search-no-results">
                <p>No results found for "${query}"</p>
                <p style="font-size: 0.9rem; margin-top: 5px;">Try searching for states, cuisines, monuments, or festivals.</p>
            </div>
        `;
        return;
    }

    let listHtml = '<ul class="search-results-list" role="listbox" id="search-results-list">';
    const limitedMatches = matches.slice(0, 10);

    limitedMatches.forEach((item, index) => {
        const highlightedTitle = highlightText(item.title, query);
        const prefix = getPathPrefix();
        const resolvedUrl = prefix + item.url;

        let icon = "🇮🇳";
        if (item.category.includes("Cuisine")) icon = "🍛";
        else if (item.category.includes("Festival")) icon = "🎉";
        else if (item.category.includes("Spiritual")) icon = "🕌";
        else if (item.category.includes("Wildlife")) icon = "🐯";
        else if (item.category.includes("Personalities")) icon = "👤";
        else if (item.category.includes("Heritage")) icon = "🏛️";
        else if (item.category.includes("Travel")) icon = "✈️";

        listHtml += `
            <li class="search-result-item" role="option" id="search-opt-${index}" data-index="${index}" data-url="${resolvedUrl}">
                <div class="search-result-icon">${icon}</div>
                <div class="search-result-content">
                    <div class="search-result-title-row">
                        <span class="search-result-title">${highlightedTitle}</span>
                        <span class="search-result-category">${item.category}</span>
                    </div>
                    <div class="search-result-desc">${item.description}</div>
                </div>
            </li>
        `;
    });

    listHtml += '</ul>';
    resultsContainer.innerHTML = listHtml;

    resultsContainer.querySelectorAll('.search-result-item').forEach(itemEl => {
        itemEl.addEventListener('click', () => {
            selectResult(itemEl.dataset.url);
        });
    });
}
