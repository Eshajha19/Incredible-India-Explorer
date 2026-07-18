/* Issue #194 — Cross-Explorer Compare Drawer */

(function () {
  "use strict";

  const STORAGE_KEY = "incredible-india-compare-items";
  const MAX_ITEMS = 3;
  const FALLBACK_IMAGE = "assets/hero_banner.png";

  const CONFIG = {
    cardSelector:
      "[data-compare-item], .heritage-card, .wildlife-card, .textile-card, .water-card, .instrument-card, .butterfly-card, .bazaar-card, .script-card",
    titleSelector: "h1, h2, h3, .card-title, .title",
    imageSelector: "img",
    descriptionSelector:
      ".description, .significance, .history, .how, .habitat-preview, p",
  };

  let compareItems = [];
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

  function readStorage() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.slice(0, MAX_ITEMS) : [];
    } catch {
      return [];
    }
  }

  function writeStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compareItems));
  }

  function showToast(message) {
    let toast = document.querySelector(".compare-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.className = "compare-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.append(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2200);
  }

  function getCardTitle(card) {
    const explicit = card.getAttribute("data-compare-title");
    if (explicit) return explicit;

    const title = card.querySelector(CONFIG.titleSelector);
    return title ? title.textContent.trim() : "Explorer item";
  }

  function getCardImage(card) {
    const explicit = card.getAttribute("data-compare-image");
    if (explicit) return explicit;

    const image = card.querySelector(CONFIG.imageSelector);
    return image ? image.getAttribute("src") || FALLBACK_IMAGE : FALLBACK_IMAGE;
  }

  function getCardDescription(card) {
    const explicit = card.getAttribute("data-compare-description");
    if (explicit) return explicit;

    const description = card.querySelector(CONFIG.descriptionSelector);
    return description ? description.textContent.trim() : "No description provided.";
  }

  function readField(card, field, fallback = "—") {
    const explicit = card.getAttribute(`data-compare-${field}`);
    if (explicit) return explicit;

    const target = card.querySelector(`[data-compare-field="${field}"]`);
    if (target) return target.textContent.trim();

    return fallback;
  }

  function getPageLabel() {
    const pageTitle = document.querySelector("h1");
    if (pageTitle) return pageTitle.textContent.trim().replace(/\s+/g, " ");

    return document.title.replace(" | Incredible India", "").trim() || "Explorer";
  }

  function buildItem(card) {
    const title = getCardTitle(card);
    const id =
      card.getAttribute("data-compare-id") ||
      card.dataset.id ||
      card.id ||
      `${slugify(getPageLabel())}-${slugify(title)}`;

    return {
      id,
      title,
      page: getPageLabel(),
      url: `${location.pathname}${card.id ? `#${card.id}` : ""}`,
      image: getCardImage(card),
      description: getCardDescription(card),
      state: readField(card, "state", readField(card, "region")),
      category: readField(card, "category", readField(card, "type")),
      significance: readField(card, "significance", getCardDescription(card)),
      fact: readField(card, "fact"),
    };
  }

  function isSelected(id) {
    return compareItems.some((item) => item.id === id);
  }

  function addItem(item) {
    if (isSelected(item.id)) {
      removeItem(item.id);
      return;
    }

    if (compareItems.length >= MAX_ITEMS) {
      showToast(`You can compare up to ${MAX_ITEMS} items only.`);
      return;
    }

    compareItems.push(item);
    writeStorage();
    showToast(`${item.title} added to compare.`);
    updateUi();
  }

  function removeItem(id) {
    const removed = compareItems.find((item) => item.id === id);
    compareItems = compareItems.filter((item) => item.id !== id);
    writeStorage();

    if (removed) {
      showToast(`${removed.title} removed from compare.`);
    }

    updateUi();
  }

  function clearItems() {
    compareItems = [];
    writeStorage();
    updateUi();
    renderDrawer();
    showToast("Compare list cleared.");
  }

  function injectButtons() {
    const cards = Array.from(document.querySelectorAll(CONFIG.cardSelector));

    cards.forEach((card) => {
      if (card.querySelector(".compare-action")) return;

      const item = buildItem(card);
      card.dataset.compareResolvedId = item.id;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "compare-action";
      button.textContent = isSelected(item.id) ? "✓ Compare" : "+ Compare";
      button.setAttribute("aria-pressed", String(isSelected(item.id)));
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        addItem(buildItem(card));
      });

      const media =
        card.querySelector(".heritage-media, .wildlife-media, .textile-media, .water-media, .instrument-media, .butterfly-media, .bazaar-media, .script-media") ||
        card.querySelector("figure") ||
        card;

      media.append(button);
    });
  }

  function createFab() {
    fab = document.createElement("button");
    fab.type = "button";
    fab.className = "compare-fab";
    fab.hidden = true;
    fab.innerHTML = `<span>Compare</span><span class="compare-fab__count">0</span>`;
    fab.addEventListener("click", openDrawer);
    document.body.append(fab);
  }

  function createDrawer() {
    drawer = document.createElement("section");
    drawer.className = "compare-drawer";
    drawer.hidden = true;
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-labelledby", "compare-drawer-title");
    drawer.innerHTML = `
      <div class="compare-drawer__backdrop" data-compare-close></div>
      <div class="compare-drawer__panel">
        <header class="compare-drawer__header">
          <div>
            <h2 id="compare-drawer-title">Compare explorer cards</h2>
            <p>Select up to ${MAX_ITEMS} items and compare them side by side.</p>
          </div>
          <div class="compare-drawer__controls">
            <button type="button" data-compare-clear>Clear all</button>
            <button type="button" class="compare-drawer__close" data-compare-close aria-label="Close compare drawer">×</button>
          </div>
        </header>
        <div class="compare-drawer__hint">Fields are gathered from card metadata when available, with safe fallbacks for older explorer cards.</div>
        <div class="compare-table-wrap" data-compare-content></div>
      </div>
    `;

    drawer.addEventListener("click", (event) => {
      if (event.target.matches("[data-compare-close]")) {
        closeDrawer();
      }

      const removeButton = event.target.closest("[data-compare-remove]");
      if (removeButton) {
        removeItem(removeButton.dataset.compareRemove);
        renderDrawer();
      }

      if (event.target.matches("[data-compare-clear]")) {
        clearItems();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!drawer.hidden && event.key === "Escape") {
        closeDrawer();
      }
    });

    document.body.append(drawer);
  }

  function renderDrawer() {
    const content = drawer.querySelector("[data-compare-content]");

    if (!compareItems.length) {
      content.innerHTML = `
        <div class="compare-empty">
          <div>
            <h3>No items selected yet</h3>
            <p>Use the Compare button on explorer cards to add up to ${MAX_ITEMS} items.</p>
          </div>
        </div>
      `;
      return;
    }

    const rows = [
      ["Page", "page"],
      ["State / Region", "state"],
      ["Category / Type", "category"],
      ["Description", "description"],
      ["Significance", "significance"],
      ["Fact", "fact"],
    ];

    const headCells = compareItems.map((item) => `
      <th>
        <div class="compare-item-head">
          <img src="${escapeHtml(item.image || FALLBACK_IMAGE)}" alt="${escapeHtml(item.title)}" onerror="this.src='${FALLBACK_IMAGE}'">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.page)}</span>
          <button type="button" class="compare-remove" data-compare-remove="${escapeHtml(item.id)}">Remove</button>
        </div>
      </th>
    `).join("");

    const bodyRows = rows.map(([label, key]) => `
      <tr>
        <td>${escapeHtml(label)}</td>
        ${compareItems.map((item) => `<td>${escapeHtml(item[key] || "—")}</td>`).join("")}
      </tr>
    `).join("");

    content.innerHTML = `
      <table class="compare-table">
        <thead>
          <tr>
            <th>Field</th>
            ${headCells}
          </tr>
        </thead>
        <tbody>${bodyRows}</tbody>
      </table>
    `;
  }

  function openDrawer() {
    renderDrawer();
    drawer.hidden = false;
    document.body.classList.add("compare-open");

    const close = drawer.querySelector(".compare-drawer__close");
    if (close) close.focus();
  }

  function closeDrawer() {
    drawer.hidden = true;
    document.body.classList.remove("compare-open");
    fab.focus();
  }

  function updateUi() {
    if (!fab) return;

    fab.hidden = compareItems.length === 0;
    fab.querySelector(".compare-fab__count").textContent = String(compareItems.length);

    document.querySelectorAll(".compare-action").forEach((button) => {
      const card = button.closest(CONFIG.cardSelector);
      if (!card) return;

      const selected = isSelected(card.dataset.compareResolvedId);
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
      button.textContent = selected ? "✓ Compare" : "+ Compare";
    });
  }

  function initCompareDrawer() {
    if (document.body.dataset.disableCompareDrawer === "true") return;
    if (document.querySelector(".compare-drawer")) return;

    compareItems = readStorage();
    createFab();
    createDrawer();
    injectButtons();
    updateUi();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCompareDrawer);
  } else {
    initCompareDrawer();
  }

  window.CompareDrawer = {
    add: addItem,
    remove: removeItem,
    clear: clearItems,
    open: openDrawer,
    items: () => [...compareItems],
  };
})();
