/**
 * modal-utils.js
 * Unified Modal and Focus-Trap utilities for Incredible India Explorer
 */
(function() {
    const activeTraps = new Map();

    function lockBodyScroll() {
        document.body.style.overflow = 'hidden';
    }

    function unlockBodyScroll() {
        if (activeTraps.size === 0) {
            document.body.style.overflow = '';
        }
    }

    function createFocusTrap(modalEl, restoreEl) {
        if (!modalEl) return null;
        
        const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
        const previousActiveElement = restoreEl === null ? null : (restoreEl || document.activeElement);
        
        // Initial focus
        const focusableElements = Array.from(modalEl.querySelectorAll(focusableSelector));
        if (focusableElements.length > 0) {
            setTimeout(() => focusableElements[0].focus(), 50);
        } else {
            modalEl.setAttribute('tabindex', '-1');
            setTimeout(() => modalEl.focus(), 50);
        }
        
        const keydownHandler = function(e) {
            if (e.key === 'Tab') {
                const elements = Array.from(modalEl.querySelectorAll(focusableSelector));
                if (elements.length === 0) return;
                const first = elements[0];
                const last = elements[elements.length - 1];
                
                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === first || document.activeElement === modalEl) {
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
        
        modalEl.addEventListener('keydown', keydownHandler);
        
        return {
            deactivate: function() {
                modalEl.removeEventListener('keydown', keydownHandler);
                if (previousActiveElement && typeof previousActiveElement.focus === 'function' && document.body.contains(previousActiveElement)) {
                    setTimeout(() => previousActiveElement.focus(), 50);
                }
            }
        };
    }

    function openModal({ modalEl, triggerEl, onOpen, onClose }) {
        if (!modalEl) return;
        
        modalEl.classList.add('open');
        modalEl.setAttribute('aria-hidden', 'false');
        lockBodyScroll();
        
        // Create focus trap
        const trap = createFocusTrap(modalEl, triggerEl);
        activeTraps.set(modalEl, {
            trap: trap,
            triggerEl: triggerEl === null ? null : (triggerEl || document.activeElement),
            onClose: onClose
        });
        
        if (onOpen) onOpen();
    }

    function closeModal(modalEl) {
        if (!modalEl) return;
        
        modalEl.classList.remove('open');
        modalEl.setAttribute('aria-hidden', 'true');
        
        const state = activeTraps.get(modalEl);
        if (state) {
            if (state.trap) {
                state.trap.deactivate();
            } else if (state.triggerEl && typeof state.triggerEl.focus === 'function' && document.body.contains(state.triggerEl)) {
                setTimeout(() => state.triggerEl.focus(), 50);
            }
            
            activeTraps.delete(modalEl);
            
            if (state.onClose) {
                state.onClose();
            }
        }
        
        unlockBodyScroll();
    }

    // Expose to window object
    window.ModalUtils = {
        openModal,
        closeModal,
        createFocusTrap,
        lockBodyScroll,
        unlockBodyScroll
    };
})();
