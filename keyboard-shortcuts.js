/* Issue #252 — Keyboard Shortcuts Helper */

(function () {
  "use strict";

  const SHORTCUTS = [
    {
      keys: ["?"],
      title: "Open shortcuts help",
      description: "Shows this keyboard shortcuts overlay.",
    },
    {
      keys: ["/"],
      title: "Focus search",
      description: "Moves focus to the first visible search input on the page.",
    },
    {
      keys: ["Esc"],
      title: "Close overlay or modal",
      description: "Closes this help overlay and attempts to close open modals or drawers.",
    },
    {
      keys: ["←", "→"],
      title: "Navigate gallery",
      description: "Clicks visible previous/next gallery controls when available.",
    },
    {
      keys: ["G", "T"],
      title: "Scroll to top",
      description: "Quickly returns to the top of the page.",
    },
    {
      keys: ["G", "H"],
      title: "Go home",
      description: "Navigates back to the home page.",
    },
  ];

  const SELECTORS = {
    search:
      "input[type='search']:not([disabled]), input[id*='search' i]:not([disabled]), input[placeholder*='search' i]:not([disabled])",
    modal:
      ".modal.show, .modal.active, .heritage-modal.active, .wildlife-modal.active, .textile-modal.active, .water-modal.active, .instrument-modal.active, .butterfly-modal.active, .bazaar-modal.active, .script-modal.active, [role='dialog']:not([hidden])",
    close:
      ".modal-close, .close-modal, [data-close], [data-modal-close], button[aria-label*='close' i]",
    next:
      ".gallery-next, .carousel-next, [data-gallery-next], button[aria-label*='next' i]",
    prev:
      ".gallery-prev, .carousel-prev, [data-gallery-prev], button[aria-label*='previous' i], button[aria-label*='prev' i]",
    scrollTop:
      "#btn-scroll-top, .btn-scroll-top, [data-scroll-top]",
  };

  let overlay;
  let trigger;
  let lastFocusedElement;
  let keyBuffer = "";
  let toastTimer;

  function isTypingTarget(target) {
    if (!target) return false;

    const tag = target.tagName;
    return (
      target.isContentEditable ||
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT"
    );
  }

  function visible(element) {
    if (!element) return false;

    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      rect.width > 0 &&
      rect.height > 0
    );
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function showToast(message) {
    let toast = document.querySelector(".keyboard-shortcuts-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.className = "keyboard-shortcuts-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.append(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1900);
  }

  function createTrigger() {
    trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "keyboard-shortcuts-trigger";
    trigger.setAttribute("aria-label", "Open keyboard shortcuts");
    trigger.setAttribute("title", "Keyboard shortcuts (?)");
    trigger.textContent = "?";
    trigger.addEventListener("click", openOverlay);
    document.body.append(trigger);
  }

  function renderShortcutRows() {
    return SHORTCUTS.map((shortcut) => {
      const keys = shortcut.keys.map((key) => `<kbd>${key}</kbd>`).join("");
      return `
        <div class="keyboard-shortcut-row">
          <div class="keyboard-shortcut-keys">${keys}</div>
          <div>
            <strong>${shortcut.title}</strong>
            <span>${shortcut.description}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  function createOverlay() {
    overlay = document.createElement("section");
    overlay.className = "keyboard-shortcuts-overlay";
    overlay.hidden = true;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "keyboard-shortcuts-title");
    overlay.innerHTML = `
      <div class="keyboard-shortcuts-backdrop" data-ks-close></div>
      <div class="keyboard-shortcuts-panel">
        <header class="keyboard-shortcuts-header">
          <div>
            <h2 id="keyboard-shortcuts-title">Keyboard shortcuts</h2>
            <p>Use these shortcuts to move faster through explorer pages. Shortcuts are disabled while typing in inputs or textareas.</p>
          </div>
          <button type="button" class="keyboard-shortcuts-close" data-ks-close aria-label="Close keyboard shortcuts">×</button>
        </header>
        <div class="keyboard-shortcuts-list">
          ${renderShortcutRows()}
        </div>
      </div>
    `;

    overlay.addEventListener("click", (event) => {
      if (event.target.matches("[data-ks-close]")) closeOverlay();
    });

    document.body.append(overlay);
  }

  function getFocusableElements() {
    return Array.from(
      overlay.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")
    ).filter((element) => !element.disabled && visible(element));
  }

  function trapFocus(event) {
    if (overlay.hidden || event.key !== "Tab") return;

    const focusable = getFocusableElements();
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

  function openOverlay() {
    lastFocusedElement = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add("keyboard-shortcuts-open");

    const close = overlay.querySelector(".keyboard-shortcuts-close");
    if (close) close.focus();
  }

  function closeOverlay() {
    overlay.hidden = true;
    document.body.classList.remove("keyboard-shortcuts-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    } else if (trigger) {
      trigger.focus();
    }
  }

  function focusSearch() {
    const search = Array.from(document.querySelectorAll(SELECTORS.search)).find(visible);

    if (!search) {
      showToast("No search input found on this page.");
      return;
    }

    search.focus();
    if (typeof search.select === "function") search.select();
    showToast("Search focused.");
  }

  function closeVisibleModal() {
    const modal = Array.from(document.querySelectorAll(SELECTORS.modal)).find(visible);

    if (!modal) return false;

    const closeButton = Array.from(modal.querySelectorAll(SELECTORS.close)).find(visible);

    if (closeButton) {
      closeButton.click();
      return true;
    }

    modal.classList.remove("show", "active", "open");
    modal.hidden = true;
    return true;
  }

  function clickGallery(direction) {
    const selector = direction === "next" ? SELECTORS.next : SELECTORS.prev;
    const button = Array.from(document.querySelectorAll(selector)).find(visible);

    if (!button) {
      showToast(direction === "next" ? "No next gallery control found." : "No previous gallery control found.");
      return;
    }

    button.click();
  }

  function scrollToTop() {
    const scrollButton = document.querySelector(SELECTORS.scrollTop);

    if (scrollButton && visible(scrollButton)) {
      scrollButton.click();
    } else {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }

    showToast("Scrolled to top.");
  }

  function goHome() {
    window.location.href = "index.html#home";
  }

  function handleBufferedShortcut(key) {
    keyBuffer = `${keyBuffer}${key}`.slice(-2);

    if (keyBuffer === "gt") {
      keyBuffer = "";
      scrollToTop();
      return true;
    }

    if (keyBuffer === "gh") {
      keyBuffer = "";
      goHome();
      return true;
    }

    window.setTimeout(() => {
      keyBuffer = "";
    }, 900);

    return false;
  }

  function handleKeydown(event) {
    if (event.key === "Tab") {
      trapFocus(event);
      return;
    }

    if (!overlay.hidden && event.key === "Escape") {
      event.preventDefault();
      closeOverlay();
      return;
    }

    if (isTypingTarget(event.target)) return;

    const key = event.key.toLowerCase();

    if (event.key === "?") {
      event.preventDefault();
      openOverlay();
      return;
    }

    if (event.key === "/") {
      event.preventDefault();
      focusSearch();
      return;
    }

    if (event.key === "Escape") {
      if (closeVisibleModal()) {
        event.preventDefault();
      }
      return;
    }

    if (event.key === "ArrowRight") {
      clickGallery("next");
      return;
    }

    if (event.key === "ArrowLeft") {
      clickGallery("prev");
      return;
    }

    if (key === "g" || key === "t" || key === "h") {
      if (handleBufferedShortcut(key)) event.preventDefault();
    }
  }

  function initKeyboardShortcuts() {
    if (document.body.dataset.disableKeyboardShortcuts === "true") return;
    if (document.querySelector(".keyboard-shortcuts-overlay")) return;

    createTrigger();
    createOverlay();
    document.addEventListener("keydown", handleKeydown);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initKeyboardShortcuts);
  } else {
    initKeyboardShortcuts();
  }

  window.KeyboardShortcutsHelper = {
    open: openOverlay,
    close: closeOverlay,
    focusSearch,
    scrollToTop,
  };
})();
