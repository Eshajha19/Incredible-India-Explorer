(function () {
    'use strict';

    var LOADING_OVERLAY_ID = 'route-loading-overlay';

    function createLoadingOverlay() {
        var overlay = document.getElementById(LOADING_OVERLAY_ID);
        if (overlay) return overlay;

        overlay = document.createElement('div');
        overlay.id = LOADING_OVERLAY_ID;
        overlay.className = 'route-loading-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML =
            '<div class="route-loading-spinner">' +
            '<div class="route-loading-ring"></div>' +
            '<div class="route-loading-ring"></div>' +
            '<div class="route-loading-ring"></div>' +
            '</div>' +
            '<div class="route-loading-text">Loading...</div>';
        document.body.appendChild(overlay);
        return overlay;
    }

    function showLoading(message) {
        var overlay = createLoadingOverlay();
        var textEl = overlay.querySelector('.route-loading-text');
        if (textEl && message) {
            textEl.textContent = message;
        }
        overlay.classList.add('route-loading-active');
    }

    function hideLoading() {
        var overlay = document.getElementById(LOADING_OVERLAY_ID);
        if (overlay) {
            overlay.classList.remove('route-loading-active');
        }
    }

    window.LoadingOverlay = {
        show: showLoading,
        hide: hideLoading,
        setMessage: function (msg) {
            var overlay = document.getElementById(LOADING_OVERLAY_ID);
            if (overlay) {
                var textEl = overlay.querySelector('.route-loading-text');
                if (textEl) textEl.textContent = msg;
            }
        }
    };
})();
