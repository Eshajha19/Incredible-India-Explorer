// travel-recommend.js
// -----------------------------------------------------------------------------
// AI-powered (rule-based) travel recommendation engine for travel.html.
// Implements issue #185: personalized + budget/season-aware destination
// recommendations, with human-readable explanations and "similar destination"
// suggestions — no backend required.
//
// The scoring/matching functions at the top are pure (no DOM access) so they
// can be unit tested directly in Node — see tests/travel-recommend.test.js.
// -----------------------------------------------------------------------------

(function (root) {
  'use strict';

  const INTEREST_OPTIONS = [
    { key: 'mountains', label: 'Mountains', icon: '⛰️' },
    { key: 'beaches', label: 'Beaches', icon: '🏖️' },
    { key: 'heritage', label: 'Heritage', icon: '🏛️' },
    { key: 'adventure', label: 'Adventure', icon: '🧗' },
    { key: 'wildlife', label: 'Wildlife', icon: '🐅' },
    { key: 'food', label: 'Food', icon: '🍛' },
    { key: 'desert', label: 'Desert', icon: '🏜️' },
    { key: 'islands', label: 'Islands', icon: '🏝️' },
    { key: 'forests', label: 'Forests', icon: '🌳' },
    { key: 'spiritual', label: 'Spiritual', icon: '🕉️' }
  ];

  const BUDGET_OPTIONS = [
    { key: 'any', label: 'Any' },
    { key: 'budget', label: 'Budget' },
    { key: 'mid', label: 'Mid-range' },
    { key: 'luxury', label: 'Luxury' }
  ];

  const SEASON_OPTIONS = [
    { key: 'any', label: 'Any' },
    { key: 'winter', label: 'Winter' },
    { key: 'summer', label: 'Summer' },
    { key: 'monsoon', label: 'Monsoon' }
  ];

  const PREFS_KEY = 'travelRecPrefs';
  const RESULT_LIMIT = 6;
  const SIMILAR_LIMIT = 3;

  // ---------------------------------------------------------------------
  // Pure scoring logic
  // ---------------------------------------------------------------------

  /** Scores a single destination against a preference set. Pure function. */
  function scoreDestination(dest, prefs) {
    let score = 0;
    const matched = { interests: [], budget: false, season: false };

    (prefs.interests || []).forEach((tag) => {
      if (dest.tags.includes(tag)) {
        score += 3;
        matched.interests.push(tag);
      }
    });

    if (prefs.budget && prefs.budget !== 'any') {
      if (dest.budget === prefs.budget) {
        score += 2;
        matched.budget = true;
      }
    }

    if (prefs.season && prefs.season !== 'any') {
      if (dest.seasons.includes(prefs.season) || dest.seasons.includes('year-round')) {
        score += 2;
        matched.season = true;
      }
    }

    return { score, matched };
  }

  function hasActivePrefs(prefs) {
    return Boolean(
      (prefs.interests && prefs.interests.length) ||
      (prefs.budget && prefs.budget !== 'any') ||
      (prefs.season && prefs.season !== 'any')
    );
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /**
   * Returns the top-scoring destinations for the given preferences.
   * If no preferences are set, returns a shuffled diverse set instead (so the
   * section never looks empty on first load).
   * `jitter: true` adds small randomness to break ties — used by "Refresh".
   */
  function getRecommendations(destinations, prefs, opts) {
    opts = opts || {};
    const limit = opts.limit || RESULT_LIMIT;

    if (!hasActivePrefs(prefs)) {
      return shuffle(destinations)
        .slice(0, limit)
        .map((dest) => ({ dest, score: 0, matched: { interests: [], budget: false, season: false }, isDefault: true }));
    }

    const jitter = opts.jitter ? () => Math.random() * 0.75 : () => 0;

    return destinations
      .map((dest) => {
        const { score, matched } = scoreDestination(dest, prefs);
        return { dest, score: score + jitter(), matched, isDefault: false };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  /** Jaccard similarity over interest tags, with a small same-region bonus. */
  function similarityScore(a, b) {
    const setA = new Set(a.tags);
    const setB = new Set(b.tags);
    const intersection = [...setA].filter((t) => setB.has(t)).length;
    const union = new Set([...setA, ...setB]).size;
    let sim = union ? intersection / union : 0;
    if (a.region === b.region) sim += 0.1;
    return sim;
  }

  function getSimilarDestinations(destinations, dest, limit) {
    return destinations
      .filter((d) => d.id !== dest.id)
      .map((d) => ({ dest: d, sim: similarityScore(dest, d) }))
      .filter((x) => x.sim > 0)
      .sort((a, b) => b.sim - a.sim)
      .slice(0, limit || SIMILAR_LIMIT)
      .map((x) => x.dest);
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function labelFor(options, key) {
    const found = options.find((o) => o.key === key);
    return found ? found.label : key;
  }

  function formatList(arr) {
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return arr.join(' and ');
    return arr.slice(0, -1).join(', ') + ', and ' + arr[arr.length - 1];
  }

  /** Builds a human-readable "why this was recommended" sentence. */
  function buildReason(matched, prefs) {
    if (!matched.interests.length && !matched.budget && !matched.season) {
      return 'A well-loved pick across every travel style \u2014 a great place to start exploring.';
    }
    const parts = [];
    if (matched.interests.length) {
      const labels = matched.interests.map((k) => labelFor(INTEREST_OPTIONS, k));
      parts.push(`you love ${formatList(labels)}`);
    }
    if (matched.budget) {
      parts.push(`fits your ${labelFor(BUDGET_OPTIONS, prefs.budget).toLowerCase()} budget`);
    }
    if (matched.season) {
      parts.push(`is best visited in ${labelFor(SEASON_OPTIONS, prefs.season)}`);
    }
    return `Recommended because ${formatList(parts)}.`;
  }

  // Export pure logic for Node-based unit testing, and attach to window for the browser.
  const engine = {
    INTEREST_OPTIONS,
    BUDGET_OPTIONS,
    SEASON_OPTIONS,
    scoreDestination,
    hasActivePrefs,
    getRecommendations,
    similarityScore,
    getSimilarDestinations,
    buildReason
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = engine;
  }
  if (typeof window !== 'undefined') {
    window.TravelRecommendEngine = engine;
  }

  // ---------------------------------------------------------------------
  // DOM wiring (browser only)
  // ---------------------------------------------------------------------
  if (typeof document === 'undefined') return;

  function loadPrefs() {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (!raw) return { interests: [], budget: 'any', season: 'any' };
      const parsed = JSON.parse(raw);
      return {
        interests: Array.isArray(parsed.interests) ? parsed.interests : [],
        budget: parsed.budget || 'any',
        season: parsed.season || 'any'
      };
    } catch (e) {
      return { interests: [], budget: 'any', season: 'any' };
    }
  }

  function savePrefs(prefs) {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch (e) {
      /* localStorage unavailable — recommendations still work for this session */
    }
  }

  function initRecommendationEngine() {
    const root = document.getElementById('rec-preferences');
    if (!root) return; // section not on this page

    const destinations = window.TRAVEL_DESTINATIONS || [];
    const interestChipsEl = document.getElementById('rec-interest-chips');
    const budgetChipsEl = document.getElementById('rec-budget-chips');
    const seasonChipsEl = document.getElementById('rec-season-chips');
    const generateBtn = document.getElementById('rec-generate-btn');
    const refreshBtn = document.getElementById('rec-refresh-btn');
    const metaLine = document.getElementById('rec-meta-line');
    const grid = document.getElementById('rec-results-grid');

    let prefs = loadPrefs();

    function renderChips(container, options, mode, currentValue) {
      container.innerHTML = options.map((opt) => {
        const isActive = mode === 'multi'
          ? currentValue.includes(opt.key)
          : currentValue === opt.key;
        return `<button type="button" class="rec-chip${isActive ? ' active' : ''}" data-key="${opt.key}">${opt.icon ? opt.icon + ' ' : ''}${opt.label}</button>`;
      }).join('');
    }

    function renderAllChips() {
      renderChips(interestChipsEl, INTEREST_OPTIONS, 'multi', prefs.interests);
      renderChips(budgetChipsEl, BUDGET_OPTIONS, 'single', prefs.budget);
      renderChips(seasonChipsEl, SEASON_OPTIONS, 'single', prefs.season);
    }

    interestChipsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.rec-chip');
      if (!btn) return;
      const key = btn.dataset.key;
      const idx = prefs.interests.indexOf(key);
      if (idx > -1) prefs.interests.splice(idx, 1);
      else prefs.interests.push(key);
      btn.classList.toggle('active');
    });

    budgetChipsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.rec-chip');
      if (!btn) return;
      prefs.budget = btn.dataset.key;
      renderChips(budgetChipsEl, BUDGET_OPTIONS, 'single', prefs.budget);
    });

    seasonChipsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.rec-chip');
      if (!btn) return;
      prefs.season = btn.dataset.key;
      renderChips(seasonChipsEl, SEASON_OPTIONS, 'single', prefs.season);
    });

    function cardMarkup(entry) {
      const { dest, matched } = entry;
      const reason = buildReason(matched, prefs);
      return `
        <div class="destination-card rec-card" data-id="${dest.id}">
          <img class="destination-img" src="${dest.image}" alt="${dest.name}"/>
          <div class="destination-content">
            <span class="destination-tag">${dest.tagline}</span>
            <h3 class="destination-title">${dest.name}</h3>
            <p class="destination-desc">${dest.description}</p>
            <p class="rec-reason">💡 ${reason}</p>
            <button type="button" class="rec-similar-toggle" data-similar-for="${dest.id}">See similar destinations ▾</button>
            <div class="rec-similar-panel" id="similar-${dest.id}" hidden></div>
          </div>
          <button aria-label="Save ${dest.name} to My Journey" aria-pressed="false" class="destination-card-bookmark-btn journey-bookmark-btn" data-bookmark-id="${dest.id}" type="button">♡</button>
        </div>
      `;
    }

    function wireSimilarButtons() {
      grid.querySelectorAll('.rec-similar-toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
          const destId = btn.dataset.similarFor;
          const panel = document.getElementById(`similar-${destId}`);
          if (!panel) return;
          const isHidden = panel.hasAttribute('hidden');
          if (isHidden) {
            const dest = destinations.find((d) => d.id === destId);
            const similar = getSimilarDestinations(destinations, dest, SIMILAR_LIMIT);
            panel.innerHTML = similar.length
              ? similar.map((s) => `<span class="rec-similar-pill">${s.name}</span>`).join('')
              : '<span class="rec-similar-pill rec-similar-empty">No close matches found</span>';
            panel.removeAttribute('hidden');
            btn.textContent = 'Hide similar destinations ▴';
          } else {
            panel.setAttribute('hidden', '');
            btn.textContent = 'See similar destinations ▾';
          }
        });
      });
    }

    function render(opts) {
      const results = getRecommendations(destinations, prefs, opts || {});
      grid.innerHTML = results.map(cardMarkup).join('');
      wireSimilarButtons();

      const active = hasActivePrefs(prefs);
      metaLine.hidden = false;
      metaLine.textContent = active
        ? `Showing ${results.length} destinations matched to your preferences.`
        : `Pick your interests above and hit "Get My Recommendations" for a tailored list \u2014 here are some crowd favourites meanwhile.`;
      refreshBtn.hidden = !active;

      // Let the rest of the site's bookmark/search wiring pick up the new cards.
      document.dispatchEvent(new Event('app:route-changed'));
    }

    generateBtn.addEventListener('click', () => {
      savePrefs(prefs);
      render({ jitter: false });
    });

    refreshBtn.addEventListener('click', () => {
      render({ jitter: true });
    });

    renderAllChips();
    render({ jitter: false });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRecommendationEngine);
  } else {
    initRecommendationEngine();
  }
})(typeof window !== 'undefined' ? window : globalThis);