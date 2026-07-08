/**
 * router.js
 * Vanilla JavaScript Single Page Application Routing Engine
 */

class LifecycleManager {
    constructor() {
        this.cleanups = [];
    }

    /**
     * Register a cleanup function to be called before the next route change.
     * @param {Function} cleanupFn 
     */
    registerCleanup(cleanupFn) {
        if (typeof cleanupFn === 'function') {
            this.cleanups.push(cleanupFn);
        }
    }

    /**
     * Execute all registered cleanups and clear the array.
     */
    runCleanups() {
        this.cleanups.forEach(fn => {
            try {
                fn();
            } catch (e) {
                console.error("Error during cleanup:", e);
            }
        });
        this.cleanups = [];
    }

    /**
     * Add an event listener to window/document and automatically register its cleanup.
     * @param {EventTarget} target (window or document)
     * @param {string} event 
     * @param {Function} handler 
     * @param {Object|boolean} options 
     */
    addEventListener(target, event, handler, options = false) {
        target.addEventListener(event, handler, options);
        this.registerCleanup(() => {
            target.removeEventListener(event, handler, options);
        });
    }
}

window.appLifecycle = new LifecycleManager();

class Router {
    constructor() {
        this.appRoot = document.getElementById('app-root');
        if (!this.appRoot) {
            // Find main and add id if it doesn't exist
            this.appRoot = document.querySelector('main');
            if (this.appRoot) {
                this.appRoot.id = 'app-root';
            }
        }

        this.loadedScripts = new Set();
        this.loadedStyles = new Set();

        // Track initially loaded scripts and styles
        document.querySelectorAll('script[src]').forEach(s => {
            // we do not want to prevent reloading of scripts if they are dynamic, but app.js and router.js shouldn't reload.
            // actually we only append if not present.
            this.loadedScripts.add(s.getAttribute('src'))
        });
        document.querySelectorAll('link[rel="stylesheet"]').forEach(l => this.loadedStyles.add(l.getAttribute('href')));

        this.init();
    }

    init() {
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            this.handleRoute(window.location.pathname + window.location.search + window.location.hash, false);
        });

        // Intercept link clicks
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            
            // Check if it's a valid internal link
            if (link && link.href && link.target !== '_blank') {
                const url = new URL(link.href);
                const currentUrl = new URL(window.location.href);

                // Same origin, and not a mailto/tel link
                if (url.origin === currentUrl.origin) {
                    
                    // If it's just a hash change on the SAME page, let default behavior happen
                    if (url.pathname === currentUrl.pathname && url.search === currentUrl.search) {
                        return; // Let browser scroll
                    }

                    // Otherwise, prevent default and navigate
                    e.preventDefault();
                    
                    // Push state only if URL actually changes
                    if (url.href !== currentUrl.href) {
                        this.handleRoute(url.pathname + url.search + url.hash, true);
                    }
                }
            }
        });

        // Fire initial route event
        this.dispatchRouteEvent();
    }

    async handleRoute(path, push = true) {
        // Clean up previous route
        window.appLifecycle.runCleanups();

        // Trigger before-route event
        document.dispatchEvent(new CustomEvent('app:before-route', { detail: { path } }));

        if (this.appRoot) {
            this.appRoot.classList.add('page-transitioning');
        }

        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const htmlString = await response.text();
            
            // Parse the fetched HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');

            // Update Title
            document.title = doc.title;

            // Extract main content
            const newMain = doc.querySelector('main');
            if (newMain && this.appRoot) {
                // Wait for fade out animation
                await new Promise(r => setTimeout(r, 300));
                
                this.appRoot.innerHTML = newMain.innerHTML;
                
                // Process new scripts and styles
                this.processHead(doc);
                this.processBodyScripts(doc);

                if (push) {
                    window.history.pushState(null, '', path);
                }

                this.appRoot.classList.remove('page-transitioning');
                
                // Handle hash scrolling if present
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

                // Dispatch route changed event
                this.dispatchRouteEvent();
            } else {
                 // Fallback if no main tag found
                 window.location.href = path;
            }

        } catch (error) {
            console.error('Routing failed:', error);
            // Fallback to normal navigation
            window.location.href = path;
        }
    }

    processHead(doc) {
        // Extract and inject new stylesheets
        doc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !this.loadedStyles.has(href)) {
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = href;
                document.head.appendChild(newLink);
                this.loadedStyles.add(href);
            }
        });
    }

    processBodyScripts(doc) {
        // Collect all scripts from the fetched page
        const scripts = [...doc.querySelectorAll('script')];
        
        scripts.forEach(oldScript => {
            const src = oldScript.getAttribute('src');
            
            if (src) {
                // External script
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
                // Inline script
                const newScript = document.createElement('script');
                newScript.textContent = oldScript.textContent;
                document.body.appendChild(newScript);
            }
        });
    }

    dispatchRouteEvent() {
        // Dispatch custom event for scripts to re-initialize
        const event = new CustomEvent('app:route-changed', {
            detail: { url: window.location.pathname }
        });
        document.dispatchEvent(event);
    }
}

// Initialize Router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.appRouter = new Router();
});
