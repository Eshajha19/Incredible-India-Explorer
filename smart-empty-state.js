/* Issue #250 — Smart No-Results Suggestions */

(function () {
  "use strict";

  const CONFIG = {
    containerSelector:
      "[data-smart-empty-container], .cards-grid, .heritage-grid, .wildlife-grid, .textile-grid, .water-grid, .instrument-grid, .butterfly-grid, .bazaar-grid, .script-grid, .glossary-grid, .destinations-grid, .festival-grid, .cuisine-grid, .universities-grid, .plants-grid, .wonders-grid, .trees-grid, .unesco-grid",
    itemSelector:
      "[data-search-item], [data-filter-item], .heritage-card, .wildlife-card, .textile-card, .water-card, .instrument-card, .butterfly-card, .bazaar-card, .script-card, .glossary-card, .destination-card, .festival-card, .cuisine-card, .university-card, .plant-card, .wonder-card, .tree-card, .unesco-card",
    searchSelector:
      "input[type='search'], input[id*='search' i], input[placeholder*='search' i]",
    filterSelector:
      "select, [data-filter], button[data-category], button[data-region], .filter-btn, .category-chip",
  };

  const DEFAULT_EXAMPLES = [
    "heritage",
    "Rajasthan",
    "temple",
    "music",
    "water",
    "culture",
  ];

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  function normalise(value) {
    return String(value || "").toLowerCase().trim();
  }

  function getVisibleItems(container) {
    return Array.from(container.querySelectorAll(CONFIG.itemSelector)).filter((item) => {
      const style = window.getComputedStyle(item);
      return !item.hidden && style.display !== "none" && style.visibility !== "hidden";
    });
  }

  function getAllItems(container) {
    return Array.from(container.querySelectorAll(CONFIG.itemSelector));
  }

  function getSearchInput(scope) {
    return (
      scope.querySelector(CONFIG.searchSelector) ||
      document.querySelector(CONFIG.searchSelector)
    );
  }

  function getFilterControls(scope) {
    return Array.from(
      new Set([
        ...scope.querySelectorAll(CONFIG.filterSelector),
        ...document.querySelectorAll(CONFIG.filterSelector),
      ])
    ).filter((control) => !control.closest(".smart-empty-state"));
  }

  function itemText(item) {
    return [
      item.dataset.search || "",
      item.dataset.name || "",
      item.dataset.title || "",
      item.dataset.category || "",
      item.dataset.region || "",
      item.dataset.state || "",
      item.textContent || "",
    ].join(" ");
  }

  function tokenise(text) {
    return normalise(text)
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 2);
  }

  function levenshtein(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);

    for (let j = 1; j <= b.length; j += 1) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= a.length; i += 1) {
      for (let j = 1; j <= b.length; j += 1) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[a.length][b.length];
  }

  function getPopularTerms(items) {
    const counts = new Map();

    items.forEach((item) => {
      tokenise(itemText(item)).forEach((token) => {
        if (token.length > 14) return;
        counts.set(token, (counts.get(token) || 0) + 1);
      });
    });

    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([term]) => term);
  }

  function getClosestTerms(query, items) {
    const cleanQuery = normalise(query);
    if (!cleanQuery) return [];

    const uniqueTerms = [...new Set(items.flatMap((item) => tokenise(itemText(item))))];

    return uniqueTerms
      .map((term) => ({
        term,
        score: levenshtein(cleanQuery, term),
      }))
      .filter((entry) => entry.score <= Math.max(3, Math.floor(cleanQuery.length / 2)))
      .sort((a, b) => a.score - b.score)
      .slice(0, 5)
      .map((entry) => entry.term);
  }

  function getAvailableValues(items) {
    const values = new Set();

    items.forEach((item) => {
      ["category", "region", "state", "type"].forEach((key) => {
        if (item.dataset[key]) values.add(item.dataset[key]);
      });

      const badges = item.querySelectorAll(".category-badge, .region-badge, .tag-pill, .badge");
      badges.forEach((badge) => {
        const text = badge.textContent.trim();
        if (text && text.length < 28) values.add(text);
      });
    });

    return [...values].slice(0, 10);
  }

  function dispatchInput(input, value) {
    if (!input) return;

    input.value = value;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.focus();
  }

  function resetFilters(scope) {
    const searchInput = getSearchInput(scope);
    if (searchInput) {
      searchInput.value = "";
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
      searchInput.dispatchEvent(new Event("change", { bubbles: true }));
    }

    getFilterControls(scope).forEach((control) => {
      if (control instanceof HTMLSelectElement) {
        control.selectedIndex = 0;
        control.dispatchEvent(new Event("change", { bubbles: true }));
      } else if (control instanceof HTMLButtonElement) {
        const value = normalise(control.dataset.category || control.dataset.region || control.dataset.filter || control.textContent);
        if (["all", "all categories", "all regions", "show all"].includes(value)) {
          control.click();
        }
      }
    });
  }

  function createState(container) {
    const state = document.createElement("section");
    state.className = "smart-empty-state";
    state.setAttribute("role", "status");
    state.setAttribute("aria-live", "polite");
    state.innerHTML = `
      <div class="smart-empty-state__header">
        <span class="smart-empty-state__icon" aria-hidden="true">🔎</span>
        <h3>No matching results found</h3>
        <p data-smart-empty-message>Try adjusting your search or clearing one of the filters.</p>
      </div>
      <div class="smart-empty-state__sections">
        <div class="smart-empty-box">
          <h4>Quick fixes</h4>
          <div class="smart-empty-actions" data-smart-empty-actions></div>
        </div>
        <div class="smart-empty-box">
          <h4>Closest matches</h4>
          <div class="smart-empty-chips" data-smart-empty-suggestions></div>
        </div>
        <div class="smart-empty-box">
          <h4>Try examples</h4>
          <div class="smart-empty-chips" data-smart-empty-examples></div>
        </div>
        <div class="smart-empty-box">
          <h4>Available categories / regions</h4>
          <div class="smart-empty-chips" data-smart-empty-values></div>
        </div>
      </div>
      <div class="smart-empty-box" style="margin-top:18px">
        <h4>Search tips</h4>
        <ul class="smart-empty-tip-list">
          <li>Use one simple keyword instead of a full sentence.</li>
          <li>Try a state, region, category, or object name.</li>
          <li>Clear filters when search and category do not match together.</li>
        </ul>
      </div>
    `;

    container.append(state);
    return state;
  }

  function button(label, className = "smart-empty-btn") {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = className;
    btn.textContent = label;
    return btn;
  }

  function renderChips(parent, values, onClick, emptyText) {
    parent.innerHTML = "";

    if (!values.length) {
      const span = document.createElement("span");
      span.textContent = emptyText;
      span.style.color = "var(--smart-empty-muted)";
      parent.append(span);
      return;
    }

    values.forEach((value) => {
      const chip = button(value, "smart-empty-chip suggestion");
      chip.addEventListener("click", () => onClick(value));
      parent.append(chip);
    });
  }

  function updateState(container, state) {
    const allItems = getAllItems(container);
    const visibleItems = getVisibleItems(container);
    const searchInput = getSearchInput(document);
    const query = searchInput ? searchInput.value.trim() : "";
    const shouldShow = allItems.length > 0 && visibleItems.length === 0;

    state.classList.toggle("is-visible", shouldShow);

    if (!shouldShow) return;

    const actions = state.querySelector("[data-smart-empty-actions]");
    const suggestions = state.querySelector("[data-smart-empty-suggestions]");
    const examples = state.querySelector("[data-smart-empty-examples]");
    const values = state.querySelector("[data-smart-empty-values]");
    const message = state.querySelector("[data-smart-empty-message]");

    message.textContent = query
      ? `No result matched “${query}”. Try a close match, a popular example, or clear active filters.`
      : "No result matched the selected filters. Try clearing one filter or reset all filters.";

    actions.innerHTML = "";

    const clearSearch = button("Clear search", "smart-empty-btn");
    clearSearch.addEventListener("click", () => dispatchInput(searchInput, ""));
    actions.append(clearSearch);

    const resetAll = button("Reset all filters", "smart-empty-btn primary");
    resetAll.addEventListener("click", () => resetFilters(document));
    actions.append(resetAll);

    const firstSelect = document.querySelector("select");
    if (firstSelect && firstSelect.selectedIndex > 0) {
      const clearSelect = button(`Clear ${firstSelect.previousElementSibling?.textContent || "selected"} filter`, "smart-empty-btn");
      clearSelect.addEventListener("click", () => {
        firstSelect.selectedIndex = 0;
        firstSelect.dispatchEvent(new Event("change", { bubbles: true }));
      });
      actions.append(clearSelect);
    }

    renderChips(
      suggestions,
      getClosestTerms(query, allItems),
      (value) => dispatchInput(searchInput, value),
      "Type a search keyword to see close matches."
    );

    renderChips(
      examples,
      getPopularTerms(allItems).slice(0, 6).length ? getPopularTerms(allItems).slice(0, 6) : DEFAULT_EXAMPLES,
      (value) => dispatchInput(searchInput, value),
      "No examples available yet."
    );

    renderChips(
      values,
      getAvailableValues(allItems),
      (value) => dispatchInput(searchInput, value),
      "No categories or regions detected."
    );
  }

  function watchContainer(container) {
    if (container.dataset.smartEmptyReady === "true") return;
    container.dataset.smartEmptyReady = "true";

    const state = createState(container);

    const update = () => requestAnimationFrame(() => updateState(container, state));

    const observer = new MutationObserver(update);
    observer.observe(container, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ["style", "hidden", "class"],
    });

    document.addEventListener("input", update, true);
    document.addEventListener("change", update, true);
    document.addEventListener("click", update, true);

    update();
  }

  function initSmartEmptyStates() {
    if (document.body.dataset.disableSmartEmptyState === "true") return;

    const containers = Array.from(document.querySelectorAll(CONFIG.containerSelector));
    containers.forEach(watchContainer);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSmartEmptyStates);
  } else {
    initSmartEmptyStates();
  }

  window.SmartEmptyState = {
    refresh: initSmartEmptyStates,
  };
})();
