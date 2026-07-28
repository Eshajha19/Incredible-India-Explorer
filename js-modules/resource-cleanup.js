/**
 * resource-cleanup.js
 * Lightweight cleanup registry for SPA route transitions.
 * Prevents memory leaks by ensuring event listeners, timers, and
 * other resources are properly disposed when navigating between pages.
 *
 * Usage in feature pages:
 *   ResourceCleanup.register(() => { myModal.close(); });
 *   ResourceCleanup.addManagedListener(btn, 'click', onClick);
 *   const id = ResourceCleanup.addManagedTimeout(() => {}, 1000);
 *
 * All registered cleanups are automatically executed by the router
 * (via RouteLifecycleManager.runCleanups()) before each route change.
 */

window.ResourceCleanup = {
    runAll() {
        if (window.appLifecycle && typeof window.appLifecycle.runCleanups === 'function') {
            window.appLifecycle.runCleanups();
        }
    },

    register(cleanupFn) {
        if (typeof cleanupFn !== 'function') return;
        if (window.appLifecycle && typeof window.appLifecycle.registerCleanup === 'function') {
            window.appLifecycle.registerCleanup(cleanupFn);
        }
    },

    addManagedListener(element, event, handler, options) {
        if (!element || !event || typeof handler !== 'function') return;
        element.addEventListener(event, handler, options);
        this.register(() => {
            element.removeEventListener(event, handler, options);
        });
    },

    addManagedTimeout(fn, delay) {
        const id = setTimeout(fn, delay);
        this.register(() => clearTimeout(id));
        return id;
    },

    addManagedInterval(fn, delay) {
        const id = setInterval(fn, delay);
        this.register(() => clearInterval(id));
        return id;
    },

    addManagedObserver(observer) {
        if (!observer || typeof observer.disconnect !== 'function') return;
        this.register(() => observer.disconnect());
    },

    addManagedAbortController(controller) {
        if (!controller || typeof controller.abort !== 'function') return;
        this.register(() => controller.abort());
    }
};