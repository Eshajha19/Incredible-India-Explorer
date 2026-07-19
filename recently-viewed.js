/* Issue #197 — Recently Viewed Explorer History */

(function () {
  "use strict";

  const STORAGE_KEY = "incredible-india-recently-viewed";
  const MAX_ITEMS = 10;
  const FALLBACK_IMAGE = "assets/hero_banner.png";

  const CONFIG = {
    cardSelector:
      "[data-recent-item], [data-compare-item], .heritage-card, .wildlife-card, .textile-card, .water-card, .instrument-card, .butterfly-card, .bazaar-card, .script-card, .glossary-card, .destination-card, .festival-card, .cuisine-card",
    titleSelector: "h1, h2, h3, .card-title, .title",
    imageSelector: "img",
    descriptionSelector:
      ".description, .significance, .history, .how, .definition, .habitat-preview, p",
  };

  let recentItems = [];
  let drawer;
  let fab;
  let toastTimer;

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const slugify = (value) =>
    String(value || "item")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  function getNowLabel(timestamp) {
    const diff = Date.now() - timestamp;
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diff < minute) return "Just now";
    if (diff < hour) return `${Math.floor(diff / minute)} min ago`;
    if (diff < day) return `${Math.floor(diff / hour)} hr ago`;
    return `${Math.floor(diff / day)} day${Math.floor(diff / day) === 1 ? "" : "s"} ago`;
  }

  function readStorage() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.slice(0, MAX_ITEMS) : [];
    } catch {
      return [];
    }
  }

  function writeStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentItems.slice(0, MAX_ITEMS)));
  }

  function showToast(message) {
    let toast = document.querySelector(".recently-viewed-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.className = "recently-viewed-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.append(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2000);
  }

  function getPageLabel() {
    const pageTitle = document.querySelector("h1");
    if (pageTitle && pageTitle.textContent.trim()) {
      return pageTitle.textContent.trim().replace(/\s+/g, " ");
    }

    return document.title.replace(" | Incredible India", "").trim() || "Explorer";
  }

  function getCardTitle(card) {
    const explicit = card.getAttribute("data-recent-title") || card.getAttribute("data-compare-title");
    if (explicit) return explicit;

    const title = card.querySelector(CONFIG.titleSelector);
    return title ? title.textContent.trim() : getPageLabel();
  }

  function getCardImage(card) {
    const explicit = card.getAttribute("data-recent-image") || card.getAttribute("data-compare-image");
    if (explicit) return explicit;

    const image = card.querySelector(CONFIG.imageSelector);
    return image ? image.getAttribute("src") || FALLBACK_IMAGE : FALLBACK_IMAGE;
  }

  function getCardDescription(card) {
    const explicit = card.getAttribute("data-recent-description") || card.getAttribute("data-compare-description");
    if (explicit) return explicit;

    const description = card.querySelector(CONFIG.descriptionSelector);
    return description ? description.textContent.trim().replace(/\s+/g, " ").slice(0, 130) : "Explorer item";
  }

  function ensureCardId(card) {
    if (card.id) return card.id;

    const existing = card.dataset.recentResolvedId;
    if (existing) return existing;

    const id = `${slugify(getPageLabel())}-${slugify(getCardTitle(card))}`;
    let candidate = id;
    let counter = 2;

    while (document.getElementById(candidate)) {
      candidate = `${id}-${counter}`;
      counter += 1;
    }

    card.id = candidate;
    card.dataset.recentResolvedId = candidate;
    return candidate;
  }

  function buildCardItem(card) {
    const id = ensureCardId(card);
    const title = getCardTitle(card);

    return {
      id: `${location.pathname}#${id}`,
      title,
      page: getPageLabel(),
      description: getCardDescription(card),
      image: getCardImage(card),
      url: `${location.pathname}#${id}`,
      timestamp: Date.now(),
      type: card.getAttribute("data-recent-type") || card.getAttribute("data-compare-category") || "Explorer card",
    };
  }

  function buildPageItem() {
    return {
      id: location.pathname,
      title: getPageLabel(),
      page: "Page visit",
      description: document.querySelector('meta[name="description"]')?.content || "Recently opened explorer page.",
      image: FALLBACK_IMAGE,
      url: location.pathname,
      timestamp: Date.now(),
      type: "Explorer page",
    };
  }

  function addRecentItem(item, silent = false) {
    recentItems = recentItems.filter((existing) => existing.id !== item.id);
    recentItems.unshift(item);
    recentItems = recentItems.slice(0, MAX_ITEMS);
    writeStorage();
    updateUi();

    if (!silent) {
      showToast(`${item.title} added to recently viewed.`);
    }
  }

  function removeItem(id) {
    recentItems = recentItems.filter((item) => item.id !== id);
    writeStorage();
    updateUi();
    renderDrawer();
  }

  function clearHistory() {
    recentItems = [];
    writeStorage();
    updateUi();
    renderDrawer();
    showToast("Recently viewed history cleared.");
  }

  function injectCardTracking() {
    const cards = Array.from(document.querySelectorAll(CONFIG.cardSelector));

    cards.forEach((card) => {
      if (card.dataset.recentTrackingReady === "true") return;

      ensureCardId(card);
      card.dataset.recentTrackingReady = "true";

      card.addEventListener("click", (event) => {
        if (event.target.closest("a, button, input, select, textarea")) return;
        addRecentItem(buildCardItem(card), true);
      });

      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        addRecentItem(buildCardItem(card), true);
      });

      const openButtons = card.querySelectorAll("button, a");
      openButtons.forEach((button) => {
        if (button.classList.contains("recently-viewed-remove")) return;
        button.addEventListener("click", () => addRecentItem(buildCardItem(card), true));
      });
    });
  }

  function createFab() {
    fab = document.createElement("button");
    fab.type = "button";
    fab.className = "recently-viewed-fab";
    fab.hidden = true;
    fab.innerHTML = `<span>Recently Viewed</span><span class="recently-viewed-fab__count">0</span>`;
    fab.addEventListener("click", openDrawer);
    document.body.append(fab);
  }

  function createDrawer() {
    drawer = document.createElement("section");
    drawer.className = "recently-viewed-drawer";
    drawer.hidden = true;
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-labelledby", "recently-viewed-title");
    drawer.innerHTML = `
      <div class="recently-viewed-drawer__backdrop" data-recent-close></div>
      <div class="recently-viewed-drawer__panel">
        <header class="recently-viewed-drawer__header">
          <div>
            <h2 id="recently-viewed-title">Recently viewed</h2>
            <p>Quickly return to explorer pages and cards you opened recently.</p>
          </div>
          <button type="button" class="recently-viewed-close" data-recent-close aria-label="Close recently viewed drawer">×</button>
        </header>
        <div class="recently-viewed-toolbar">
          <button type="button" data-recent-add-page>Add this page</button>
          <button type="button" data-recent-clear>Clear history</button>
        </div>
        <ol class="recently-viewed-list" data-recent-list></ol>
      </div>
    `;

    drawer.addEventListener("click", (event) => {
      if (event.target.matches("[data-recent-close]")) {
        closeDrawer();
      }

      if (event.target.matches("[data-recent-clear]")) {
        clearHistory();
      }

      if (event.target.matches("[data-recent-add-page]")) {
        addRecentItem(buildPageItem());
        renderDrawer();
      }

      const removeButton = event.target.closest("[data-recent-remove]");
      if (removeButton) {
        event.preventDefault();
        event.stopPropagation();
        removeItem(removeButton.dataset.recentRemove);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!drawer.hidden && event.key === "Escape") closeDrawer();
    });

    document.body.append(drawer);
  }

  function renderDrawer() {
    const list = drawer.querySelector("[data-recent-list]");

    if (!recentItems.length) {
      list.innerHTML = `
        <li class="recently-viewed-empty">
          <div>
            <h3>No recent items yet</h3>
            <p>Open explorer cards or click “Add this page” to build your temporary history.</p>
          </div>
        </li>
      `;
      return;
    }

    list.innerHTML = recentItems.map((item) => `
      <li class="recently-viewed-item">
        <a class="recently-viewed-link" href="${escapeHtml(item.url)}">
          <img src="${escapeHtml(item.image || FALLBACK_IMAGE)}" alt="${escapeHtml(item.title)}" onerror="this.src='${FALLBACK_IMAGE}'">
          <span class="recently-viewed-copy">
            <em>${escapeHtml(item.type)} · ${escapeHtml(getNowLabel(item.timestamp))}</em>
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item.description)}</span>
          </span>
        </a>
        <button type="button" class="recently-viewed-remove" data-recent-remove="${escapeHtml(item.id)}" aria-label="Remove ${escapeHtml(item.title)} from recently viewed">×</button>
      </li>
    `).join("");
  }

  function openDrawer() {
    renderDrawer();
    drawer.hidden = false;
    document.body.classList.add("recently-viewed-open");

    const close = drawer.querySelector(".recently-viewed-close");
    if (close) close.focus();
  }

  function closeDrawer() {
    drawer.hidden = true;
    document.body.classList.remove("recently-viewed-open");

    if (fab && !fab.hidden) fab.focus();
  }

  function updateUi() {
    if (!fab) return;

    fab.hidden = recentItems.length === 0;
    fab.querySelector(".recently-viewed-fab__count").textContent = String(recentItems.length);
  }

  function highlightHashTarget() {
    if (!location.hash) return;

    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!target) return;

    target.style.scrollMarginTop = "96px";
    setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.animate(
        [
          { boxShadow: "0 0 0 rgba(255,153,51,0)" },
          { boxShadow: "0 0 0 5px rgba(255,153,51,.35)" },
          { boxShadow: "0 0 0 rgba(255,153,51,0)" }
        ],
        { duration: 1400, easing: "ease-out" }
      );
    }, 180);
  }

  function initRecentlyViewed() {
    if (document.body.dataset.disableRecentlyViewed === "true") return;
    if (document.querySelector(".recently-viewed-drawer")) return;

    recentItems = readStorage();
    createFab();
    createDrawer();
    injectCardTracking();
    addRecentItem(buildPageItem(), true);
    updateUi();
    highlightHashTarget();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRecentlyViewed);
  } else {
    initRecentlyViewed();
  }

  window.RecentlyViewedExplorer = {
    add: addRecentItem,
    remove: removeItem,
    clear: clearHistory,
    open: openDrawer,
    items: () => [...recentItems],
  };
})();
