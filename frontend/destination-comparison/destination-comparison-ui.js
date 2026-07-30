(function () {
  "use strict";

  const MAX_COMPARE = window.DestinationComparison.MAX_COMPARE;
  const ALL_DESTINATIONS = (window.tripDestinations || []).slice().sort((a, b) => a.name.localeCompare(b.name));

  let selectedIds = [];
  let lastComparison = null;
  let lastRecommendation = null;

  function $(id) {
    return document.getElementById(id);
  }

  function setStatus(message, kind) {
    const el = $("dc-status");
    el.textContent = message || "";
    el.className = "dc-status" + (kind ? ` ${kind}` : "");
  }

  // -------------------------------------------------------------------
  // Destination picker
  // -------------------------------------------------------------------
  function populateDestinationSelect() {
    const select = $("dc-destination-select");
    select.innerHTML = ALL_DESTINATIONS
      .filter((d) => !selectedIds.includes(d.id))
      .map((d) => `<option value="${d.id}">${d.name}, ${d.state}</option>`)
      .join("");
  }

  function renderChips() {
    const container = $("dc-chips");
    container.innerHTML = selectedIds
      .map((id) => {
        const d = ALL_DESTINATIONS.find((dest) => dest.id === id);
        return `<span class="dc-chip">${d ? d.name : id} <button type="button" data-remove="${id}" aria-label="Remove ${d ? d.name : id}">✕</button></span>`;
      })
      .join("");

    container.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedIds = selectedIds.filter((id) => id !== btn.dataset.remove);
        renderChips();
        populateDestinationSelect();
        invalidateResults();
      });
    });

    $("dc-add-btn").disabled = selectedIds.length >= MAX_COMPARE;
  }

  function handleAddDestination() {
    const select = $("dc-destination-select");
    const id = select.value;
    if (!id || selectedIds.includes(id) || selectedIds.length >= MAX_COMPARE) return;
    selectedIds.push(id);
    renderChips();
    populateDestinationSelect();
    invalidateResults();
  }

  // -------------------------------------------------------------------
  // Preferences
  // -------------------------------------------------------------------
  function readPreferences() {
    return {
      budgetWeight: Number($("dc-budget-weight").value),
      adventureWeight: Number($("dc-adventure-weight").value),
      familyWeight: Number($("dc-family-weight").value),
      accessibilityWeight: Number($("dc-accessibility-weight").value),
      maxDays: $("dc-max-days").value ? Number($("dc-max-days").value) : undefined,
    };
  }

  function wireRangeDisplay(id) {
    const input = $(id);
    const display = $(`${id}-val`);
    input.addEventListener("input", () => {
      display.textContent = input.value;
      // Preferences changed — recompute immediately if a comparison is on screen.
      if (lastComparison) runComparison({ silent: true });
    });
  }

  // -------------------------------------------------------------------
  // Comparison + recommendation rendering
  // -------------------------------------------------------------------
  function invalidateResults() {
    lastComparison = null;
    lastRecommendation = null;
    $("dc-results-panel").hidden = true;
    $("dc-recommendation-panel").hidden = true;
  }

  function runComparison(opts) {
    const silent = opts && opts.silent;
    if (selectedIds.length === 0) {
      if (!silent) setStatus("Add at least one destination to compare.", "error");
      return;
    }

    const costTier = $("dc-cost-tier").value;
    try {
      const comparison = window.DestinationComparison.compareDestinations(selectedIds, ALL_DESTINATIONS, costTier);
      const recommendation = window.DestinationComparison.getRecommendation(comparison, readPreferences());
      lastComparison = comparison;
      lastRecommendation = recommendation;
      renderRecommendation(recommendation);
      renderComparison(comparison, recommendation);
      if (!silent) setStatus(`Compared ${comparison.destinations.length} destination(s).`, "ok");
    } catch (err) {
      setStatus(err.message, "error");
    }
  }

  function renderRecommendation(recommendation) {
    const panel = $("dc-recommendation-panel");
    if (!recommendation.winner) {
      panel.hidden = true;
      return;
    }
    panel.hidden = false;
    panel.innerHTML = `
      <div class="dc-recommendation">
        <h3>🤖 Recommended for you: ${recommendation.winner.name}</h3>
        <p>${recommendation.explanation}</p>
      </div>`;
  }

  function renderComparison(comparison, recommendation) {
    const panel = $("dc-results-panel");
    const grid = $("dc-compare-grid");
    panel.hidden = false;

    grid.innerHTML = comparison.destinations
      .map((row) => {
        const isWinner = recommendation.winner && recommendation.winner.id === row.id;
        return `
        <div class="dc-compare-card ${isWinner ? "is-winner" : ""}">
          ${isWinner ? '<span class="winner-badge">Recommended</span>' : ""}
          <h4>${row.name}</h4>
          <div class="state">${row.state}</div>
          <div class="dc-attr"><span>Best time to visit</span><span>${row.bestTimeToVisit}</span></div>
          <div class="dc-attr"><span>Weather</span><span>${row.weather}</span></div>
          <div class="dc-attr"><span>Est. budget/day</span><span>₹${row.estimatedBudgetPerDay.toLocaleString("en-IN")}</span></div>
          <div class="dc-attr"><span>Ideal duration</span><span>${row.idealTripDuration.minDays}-${row.idealTripDuration.maxDays} days</span></div>
          <div class="dc-attr"><span>Adventure level</span><span>${"★".repeat(row.adventureLevel)}${"☆".repeat(5 - row.adventureLevel)}</span></div>
          <div class="dc-attr"><span>Family friendly</span><span>${"★".repeat(row.familyFriendliness)}${"☆".repeat(5 - row.familyFriendliness)}</span></div>
          <div class="dc-attr"><span>Accessibility</span><span>${"★".repeat(row.accessibility)}${"☆".repeat(5 - row.accessibility)}</span></div>
          <div class="dc-attr"><span>Traveler popularity</span><span>${row.userRating}/10</span></div>
          <p class="dc-attractions"><strong>Attractions:</strong> ${row.popularAttractions.join(", ")}</p>
          ${row.nearbyDestinations.length ? `<p class="dc-nearby">Nearby: ${row.nearbyDestinations.map((n) => `${n.name} (${n.distanceKm.toFixed(0)}km)`).join(", ")}</p>` : ""}
        </div>`;
      })
      .join("");
  }

  // -------------------------------------------------------------------
  // Save / Export
  // -------------------------------------------------------------------
  function handleSave() {
    if (selectedIds.length === 0) {
      setStatus("Add destinations before saving a comparison.", "error");
      return;
    }
    const names = selectedIds.map((id) => (ALL_DESTINATIONS.find((d) => d.id === id) || {}).name || id);
    window.DestinationComparison.saveComparison(names.join(" vs "), selectedIds);
    renderSavedComparisons();
    setStatus("Comparison saved.", "ok");
  }

  function handleExport() {
    if (!lastComparison) {
      setStatus("Run a comparison first, then export.", "error");
      return;
    }
    const text = window.DestinationComparison.exportComparisonText(lastComparison, lastRecommendation);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "destination-comparison.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function renderSavedComparisons() {
    const list = $("dc-saved-list");
    const saved = window.DestinationComparison.getSavedComparisons();
    if (!saved.length) {
      list.innerHTML = '<p class="dc-empty">No saved comparisons yet.</p>';
      return;
    }
    list.innerHTML = saved
      .slice()
      .reverse()
      .map(
        (entry) => `
        <div class="dc-saved-item">
          <span>${entry.name}</span>
          <span class="actions">
            <button type="button" data-load="${entry.id}">Load</button>
            <button type="button" data-delete="${entry.id}">Delete</button>
          </span>
        </div>`
      )
      .join("");

    list.querySelectorAll("[data-load]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const entry = saved.find((s) => s.id === btn.dataset.load);
        if (!entry) return;
        selectedIds = entry.ids.filter((id) => ALL_DESTINATIONS.some((d) => d.id === id)).slice(0, MAX_COMPARE);
        renderChips();
        populateDestinationSelect();
        runComparison({});
      });
    });
    list.querySelectorAll("[data-delete]").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.DestinationComparison.deleteSavedComparison(btn.dataset.delete);
        renderSavedComparisons();
      });
    });
  }

  // -------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    populateDestinationSelect();
    renderChips();
    renderSavedComparisons();

    $("dc-add-btn").addEventListener("click", handleAddDestination);
    $("dc-compare-btn").addEventListener("click", () => runComparison({}));
    $("dc-save-btn").addEventListener("click", handleSave);
    $("dc-export-btn").addEventListener("click", handleExport);
    $("dc-cost-tier").addEventListener("change", () => {
      if (lastComparison) runComparison({ silent: true });
    });
    $("dc-max-days").addEventListener("input", () => {
      if (lastComparison) runComparison({ silent: true });
    });
    ["dc-budget-weight", "dc-adventure-weight", "dc-family-weight", "dc-accessibility-weight"].forEach(wireRangeDisplay);
  });
})();
