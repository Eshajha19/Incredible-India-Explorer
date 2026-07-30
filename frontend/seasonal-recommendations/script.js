import { SeasonalRecommendationEngine } from "../../js-modules/seasonal-recommendation-engine.js";

const PREFS_KEY = "seasonalRecommendations.prefs.v1";

const destinations = window.tripDestinations || [];
const events = (window.eventData && window.eventData.events) || [];

const engine = new SeasonalRecommendationEngine({ destinations, events });

// All distinct destination categories present in trip-data.js, used to
// drive the interest-chip filter (mirrors event-discovery's approach of
// deriving chips from the dataset rather than hardcoding a list).
const ALL_CATEGORIES = Array.from(
  new Set(destinations.flatMap((d) => d.categories || [])),
).sort();

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : fallback;
    return parsed && typeof parsed === "object" ? parsed : fallback;
  } catch (err) {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // Storage may be unavailable (private browsing, quota); fail silently.
  }
}

function populateMonthSelect() {
  const select = document.getElementById("month-select");
  const currentMonth = new Date().getMonth() + 1;
  SeasonalRecommendationEngine.MONTHS.forEach((name, index) => {
    const option = document.createElement("option");
    option.value = String(index + 1);
    option.textContent = name;
    if (index + 1 === currentMonth) option.selected = true;
    select.appendChild(option);
  });
}

function renderInterestChips() {
  const wrap = document.getElementById("interest-chips");
  wrap.innerHTML = "";
  ALL_CATEGORIES.forEach((category) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "interest-chip";
    chip.textContent = category;
    chip.dataset.category = category;
    chip.addEventListener("click", () => chip.classList.toggle("active"));
    wrap.appendChild(chip);
  });
}

function getSelectedInterests() {
  return Array.from(document.querySelectorAll(".interest-chip.active")).map(
    (el) => el.dataset.category,
  );
}

function applySavedPrefs() {
  const prefs = loadJSON(PREFS_KEY, {});
  if (prefs.month) {
    const select = document.getElementById("month-select");
    select.value = String(prefs.month);
  }
  if (Array.isArray(prefs.interests)) {
    prefs.interests.forEach((category) => {
      const chip = document.querySelector(`.interest-chip[data-category="${category}"]`);
      if (chip) chip.classList.add("active");
    });
  }
}

function renderAlternatives(container, destination, month) {
  const alternatives = engine.getAlternatives(destination, month, 3);
  container.innerHTML = "";

  if (!alternatives.length) {
    const p = document.createElement("p");
    p.textContent = "No clearly better-timed alternative found in this category.";
    container.appendChild(p);
    return;
  }

  alternatives.forEach((alt) => {
    const p = document.createElement("p");
    p.textContent = `${alt.destination.name} (${alt.destination.state}) — ${alt.explanation}`;
    container.appendChild(p);
  });
}

function renderResults(results, month) {
  const grid = document.getElementById("destination-grid");
  const emptyState = document.getElementById("empty-state");
  const resultsCount = document.getElementById("results-count");

  grid.innerHTML = "";
  resultsCount.textContent = results.length
    ? `${results.length} destination${results.length === 1 ? "" : "s"}`
    : "";
  emptyState.hidden = results.length > 0;

  results.forEach((result) => {
    const { destination, seasonalFit, festivals, explanation } = result;

    const card = document.createElement("article");
    card.className = "destination-card";

    const top = document.createElement("div");
    top.className = "destination-card-top";

    const heading = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = destination.name;
    const state = document.createElement("div");
    state.className = "destination-state";
    state.textContent = destination.state;
    heading.appendChild(h3);
    heading.appendChild(state);

    const badge = document.createElement("span");
    badge.className = `fit-badge ${seasonalFit.level}`;
    badge.textContent = seasonalFit.level.replace("-", " ");

    top.appendChild(heading);
    top.appendChild(badge);

    const explanationEl = document.createElement("p");
    explanationEl.className = "destination-explanation";
    explanationEl.textContent = explanation;

    const tags = document.createElement("div");
    tags.className = "category-tags";
    (destination.categories || []).forEach((category) => {
      const tag = document.createElement("span");
      tag.className = "category-tag";
      tag.textContent = category;
      tags.appendChild(tag);
    });

    card.appendChild(top);
    card.appendChild(explanationEl);
    card.appendChild(tags);

    // Only surface the "find alternatives" action for destinations that
    // are actually a mediocre-to-poor fit this month.
    if (seasonalFit.level === "shoulder" || seasonalFit.level === "off-season") {
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "alternatives-toggle";
      toggle.textContent = "See in-season alternatives";

      const panel = document.createElement("div");
      panel.className = "alternatives-panel";
      panel.hidden = true;

      toggle.addEventListener("click", () => {
        panel.hidden = !panel.hidden;
        if (!panel.hidden && !panel.dataset.rendered) {
          renderAlternatives(panel, destination, month);
          panel.dataset.rendered = "true";
        }
      });

      card.appendChild(toggle);
      card.appendChild(panel);
    }

    if (festivals.length) {
      const festivalNote = document.createElement("p");
      festivalNote.className = "destination-explanation";
      festivalNote.textContent = `Festivals this month: ${festivals.map((f) => f.name).join(", ")}`;
      card.appendChild(festivalNote);
    }

    grid.appendChild(card);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const month = parseInt(document.getElementById("month-select").value, 10);
  const interests = getSelectedInterests();

  saveJSON(PREFS_KEY, { month, interests });

  const results = engine.recommend({ month, interests, limit: 12 });
  document.getElementById("results-section").hidden = false;
  renderResults(results, month);
}

function handleReset() {
  document.querySelectorAll(".interest-chip.active").forEach((chip) => chip.classList.remove("active"));
  localStorage.removeItem(PREFS_KEY);
  document.getElementById("results-section").hidden = true;
}

function init() {
  populateMonthSelect();
  renderInterestChips();
  applySavedPrefs();

  document.getElementById("filters-form").addEventListener("submit", handleSubmit);
  document.getElementById("reset-filters").addEventListener("click", handleReset);

  // If the user has saved prefs from a previous visit, show results immediately.
  const prefs = loadJSON(PREFS_KEY, {});
  if (prefs.month) {
    const results = engine.recommend({ month: prefs.month, interests: prefs.interests || [], limit: 12 });
    document.getElementById("results-section").hidden = false;
    renderResults(results, prefs.month);
  }
}

document.addEventListener("DOMContentLoaded", init);
