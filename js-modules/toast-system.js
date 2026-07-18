(function () {
    'use strict';

    const TOAST_CONTAINER_ID = 'app-toast-container';
    const DEFAULT_DURATION = 4000;

    let container = null;

    function getContainer() {
        if (container) return container;
        container = document.getElementById(TOAST_CONTAINER_ID);
        if (!container) {
            container = document.createElement('div');
            container.id = TOAST_CONTAINER_ID;
            container.className = 'app-toast-container';
            container.setAttribute('aria-live', 'polite');
            container.setAttribute('aria-relevant', 'additions removals');
            document.body.appendChild(container);
        }
        return container;
    }

    function createToast(message, type, duration) {
        const toast = document.createElement('div');
        toast.className = 'app-toast app-toast-' + type;
        toast.setAttribute('role', 'alert');

        const iconMap = {
            info: 'info-circle',
            success: 'check-circle',
            warning: 'exclamation-triangle',
            error: 'x-circle'
        };
        const iconName = iconMap[type] || 'info-circle';

        toast.innerHTML =
            '<svg class="app-toast-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
            getIconPath(iconName) +
            '</svg>' +
            '<span class="app-toast-message">' + escapeHtml(message) + '</span>' +
            '<button class="app-toast-close" aria-label="Dismiss">&times;</button>';

        const container = getContainer();
        container.appendChild(toast);

        requestAnimationFrame(function () {
            toast.classList.add('app-toast-visible');
        });

        let hideTimer = setTimeout(function () {
            dismiss(toast);
        }, duration || DEFAULT_DURATION);

        toast.querySelector('.app-toast-close').addEventListener('click', function () {
            clearTimeout(hideTimer);
            dismiss(toast);
        });

        toast.addEventListener('mouseenter', function () {
            clearTimeout(hideTimer);
        });

        toast.addEventListener('mouseleave', function () {
            hideTimer = setTimeout(function () {
                dismiss(toast);
            }, duration || DEFAULT_DURATION);
        });
    }

    function dismiss(toast) {
        if (!toast || toast.classList.contains('app-toast-dismissing')) return;
        toast.classList.add('app-toast-dismissing');
        toast.classList.remove('app-toast-visible');
        toast.addEventListener('transitionend', function () {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        });
        setTimeout(function () {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 400);
    }

    function getIconPath(name) {
        var paths = {
            'info-circle': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
            'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
            'exclamation-triangle': '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
            'x-circle': '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
        };
        return paths[name] || paths['info-circle'];
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    }

    window.ToastNotifier = {
        info: function (message, duration) { createToast(message, 'info', duration); },
        success: function (message, duration) { createToast(message, 'success', duration); },
        warning: function (message, duration) { createToast(message, 'warning', duration); },
        error: function (message, duration) { createToast(message, 'error', duration); },
        dismissAll: function () {
            var toasts = (container || document.getElementById(TOAST_CONTAINER_ID));
            if (toasts) {
                Array.from(toasts.children).forEach(dismiss);
            }
        }
    };
})();
