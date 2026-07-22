/* ==========================================================================
   MY INDIA JOURNEY - SHARED BOOKMARK + CROSS-EXPLORER SEARCH MODULE
   Loaded site-wide (alongside app.js / pages-common.js) on every explorer
   page. Provides a single localStorage-backed schema that any page can
   write to, replacing one-off, page-specific favorite keys.

   Public API (window.Journey):
     Journey.getJourney()            -> array of saved items
     Journey.saveToJourney(item)     -> add/update an item, returns array
     Journey.removeFromJourney(id)   -> remove an item, returns array
     Journey.isSaved(id)             -> boolean
     Journey.toggle(item)            -> save if absent, remove if present
     Journey.registerSearchItems(page, items) -> add a page's searchable
                                        items to the cross-explorer index
     Journey.search(query)           -> array of matching indexed items

   See README.md / CONTRIBUTING.md "Adding a new explorer to My Journey"
   for the two things every new explorer page should do.
   ========================================================================== */

(function () {
    'use strict';

    const JOURNEY_KEY = 'india-explorer-journey';
    const LEGACY_STARTUP_KEY = 'startup-favorites';

    // In-memory, per-page-load search index. Rebuilt every time pages
    // register via the app:route-changed cycle, so it never goes stale
    // when the lightweight router swaps pages in and out.
    let searchIndex = [];

    /* ---------------------------------------------------------------- */
    /* Core storage helpers                                             */
    /* ---------------------------------------------------------------- */

    function readJourney() {
        try {
            const stored = JSON.parse(localStorage.getItem(JOURNEY_KEY) || '[]');
            return Array.isArray(stored) ? stored : [];
        } catch (error) {
            return [];
        }
    }

    function writeJourney(items) {
        localStorage.setItem(JOURNEY_KEY, JSON.stringify(items));
        return items;
    }

    function getJourney() {
        return readJourney();
    }

    function isSaved(id) {
        return readJourney().some((item) => item.id === id);
    }

    function saveToJourney(item) {
        if (!item || !item.id) {
            throw new Error('saveToJourney requires an item with an id');
        }

        const items = readJourney();
        const existingIndex = items.findIndex((entry) => entry.id === item.id);

        const record = {
            id: item.id,
            explorerPage: item.explorerPage || window.location.pathname.split('/').pop(),
            title: item.title || item.name || 'Untitled',
            thumbnail: item.thumbnail || item.image || '',
            category: item.category || 'general',
            savedAt: existingIndex >= 0 ? items[existingIndex].savedAt : new Date().toISOString()
        };

        if (existingIndex >= 0) {
            items[existingIndex] = record;
        } else {
            items.push(record);
        }

        return writeJourney(items);
    }

    function removeFromJourney(id) {
        const items = readJourney().filter((item) => item.id !== id);
        return writeJourney(items);
    }

    function toggle(item) {
        if (isSaved(item.id)) {
            removeFromJourney(item.id);
            return false;
        }
        saveToJourney(item);
        return true;
    }

    /* ---------------------------------------------------------------- */
    /* One-time migration from the legacy startup-favorites key          */
    /* ---------------------------------------------------------------- */

    function migrateLegacyStartupFavorites() {
        const legacyRaw = localStorage.getItem(LEGACY_STARTUP_KEY);
        if (!legacyRaw) return;

        let legacyIds = [];
        try {
            const parsed = JSON.parse(legacyRaw);
            if (Array.isArray(parsed)) legacyIds = parsed;
        } catch (error) {
            localStorage.removeItem(LEGACY_STARTUP_KEY);
            return;
        }

        if (legacyIds.length === 0) {
            localStorage.removeItem(LEGACY_STARTUP_KEY);
            return;
        }

        const items = readJourney();
        const existingIds = new Set(items.map((item) => item.id));

        // startupData (defined in app.js) gives us the title/category to
        // enrich the migrated record. Fall back to a minimal record if the
        // page that owns this data hasn't loaded (e.g. migration running
        // from a different explorer page).
        const startupLookup = Array.isArray(window.startupData)
            ? new Map(window.startupData.map((s) => [s.id, s]))
            : new Map();

        legacyIds.forEach((legacyId) => {
            const journeyId = `startup-${legacyId}`;
            if (existingIds.has(journeyId)) return;

            const source = startupLookup.get(legacyId);
            items.push({
                id: journeyId,
                explorerPage: 'startup.html',
                title: source ? source.name : `Startup #${legacyId}`,
                thumbnail: source ? (source.logo || '') : '',
                category: source ? (source.category || 'startup') : 'startup',
                savedAt: new Date().toISOString()
            });
            existingIds.add(journeyId);
        });

        writeJourney(items);
        localStorage.removeItem(LEGACY_STARTUP_KEY);
    }

    /* ---------------------------------------------------------------- */
    /* Cross-explorer search index                                      */
    /* ---------------------------------------------------------------- */
    function registerSearchItems(page, items) {
       if (!Array.isArray(items)) return;

       // Remove old registrations for this page
       searchIndex = searchIndex.filter((entry) => entry.page !== page);

       items.forEach((item) => {
         searchIndex.push({
            page,
            id: item.id,

            title:
                item.title ||
                item.name ||
                item.place ||
                item.monument ||
                "Untitled",

            description:
                item.description ||
                item.summary ||
                item.about ||
                item.location ||
                "",

            category:
                item.category ||
                page.replace(".html", ""),

            image:
                item.image ||
                item.thumbnail ||
                item.logo ||
                "",

            link:
                item.link ||
                `${page}#${item.id}`
            });
        });
    }

    function search(query) {
        const q = (query || '').trim().toLowerCase();
        if (!q) return [];

        return searchIndex.filter((entry) => {
            const haystack =
            `${entry.title} ${entry.description} ${entry.category}`
            .toLowerCase();
            return haystack.includes(q);
        });
    }

    function getSearchIndex() {
        return searchIndex.slice();
    }

    /* ---------------------------------------------------------------- */
    /* Shared nav search bar (progressive: only wires up if the shared   */
    /* nav on the current page includes a #journey-search-input)         */
    /* ---------------------------------------------------------------- */

    function initJourneySearchBar() {
        const input = document.getElementById('journey-search-input');
        const results = document.getElementById('journey-search-results');
        if (!input || !results) return;

        function render(query) {
            const matches = search(query).slice(0, 8);

            if (!query.trim()) {
                results.hidden = true;
                results.innerHTML = '';
                return;
            }

            results.hidden = false;
            results.innerHTML = matches.length
                ? matches
                    .map((m) => `<a class="journey-search-result" href="${m.link}">
                     <span class="journey-search-result-title">${m.title}</span>
                     <span class="journey-search-result-page">
                        ${m.category} • ${m.page.replace(".html", "")}
<                    /span>
                    </a>`)
                    .join('')
                : '<p class="journey-search-empty">No matches across the explorers yet.</p>';
        }

        input.addEventListener('input', (e) => render(e.target.value));
        input.addEventListener('focus', (e) => render(e.target.value));
        document.addEventListener('click', (e) => {
            if (!results.contains(e.target) && e.target !== input) {
                results.hidden = true;
            }
        });
    }

    /* ---------------------------------------------------------------- */
    /* Init                                                              */
    /* ---------------------------------------------------------------- */

    /* ---------------------------------------------------------------- */
    /* "My Journey" page rendering (journey.html)                        */
    /* ---------------------------------------------------------------- */

    function initJourneyPage() {
        const grid = document.getElementById('journey-grid');
        if (!grid) return; // Not on journey.html

        const emptyState = document.getElementById('journey-empty');
        const progressText = document.getElementById('journey-progress-text');
        const progressBar = document.getElementById('journey-progress-bar');

        // Every explorer page currently live on the site. Kept as a plain
        // list (rather than derived) so the progress indicator still makes
        // sense even before every page registers with Journey.
        const ALL_EXPLORER_PAGES = [
            'architecture.html', 'cuisine.html', 'wildlife.html', 'monuments.html',
            'museums.html', 'unesco.html', 'tribes.html', 'festivals.html',
            'culture.html', 'dance.html', 'music.html', 'sports.html', 'science.html',
            'personalities.html', 'spiritual.html', 'startup.html', 'heritage.html',
            'hidden-gems.html', 'railways.html', 'adventure.html'
        ];

        function render() {
            const items = getJourney();

            if (items.length === 0) {
                grid.innerHTML = '';
                if (emptyState) emptyState.hidden = false;
            } else {
                if (emptyState) emptyState.hidden = true;
                grid.innerHTML = '';

                const grouped = items.reduce((acc, item) => {
                    const key = item.explorerPage || 'other';
                    acc[key] = acc[key] || [];
                    acc[key].push(item);
                    return acc;
                }, {});

                Object.keys(grouped).sort().forEach((page) => {
                    const section = document.createElement('section');
                    section.className = 'journey-group';
                    section.innerHTML = `<h2 class="journey-group-title">${page.replace('.html', '').replace(/-/g, ' ')}</h2>`;

                    const cardsWrap = document.createElement('div');
                    cardsWrap.className = 'journey-cards';

                    grouped[page].forEach((item) => {
                        const card = document.createElement('article');
                        card.className = 'journey-card';
                        card.innerHTML = `
                            ${item.thumbnail ? `<img src="${item.thumbnail}" alt="${item.title}" loading="lazy">` : '<div class="journey-card-noimg">🧭</div>'}
                            <div class="journey-card-body">
                                <h3>${item.title}</h3>
                                <p class="journey-card-meta">${item.category} &middot; saved ${new Date(item.savedAt).toLocaleDateString()}</p>
                                <div class="journey-card-actions">
                                    <a class="journey-card-link" href="${page}">Visit</a>
                                    <button class="journey-card-remove" type="button" data-id="${item.id}">Remove</button>
                                </div>
                            </div>
                        `;
                        cardsWrap.appendChild(card);
                    });

                    section.appendChild(cardsWrap);
                    grid.appendChild(section);
                });

                grid.querySelectorAll('.journey-card-remove').forEach((btn) => {
                    btn.addEventListener('click', () => {
                        removeFromJourney(btn.dataset.id);
                        render();
                    });
                });
            }

            const exploredPages = new Set(items.map((item) => item.explorerPage)).size;
            const total = ALL_EXPLORER_PAGES.length;
            if (progressText) {
                progressText.textContent = `You've explored ${exploredPages} of ${total} regions of India!`;
            }
            if (progressBar) {
                progressBar.style.width = `${Math.min(100, Math.round((exploredPages / total) * 100))}%`;
            }
        }

        render();
    }

    document.addEventListener('app:route-changed', () => {
        migrateLegacyStartupFavorites();
        initJourneySearchBar();
        initJourneyPage();
    });

    // Run once immediately too, in case journey.js loads after the first
    // app:route-changed has already fired (e.g. direct page load order).
    migrateLegacyStartupFavorites();

    /**
     * Enrich a saved journey item with its search index metadata.
     * Cross-references the item's ID against indiaSearchIndex to pull in
     * category, full description, and resolved URL for richer display.
     */
    function enrichFromSearchIndex(item) {
        if (!item || !item.id || typeof window.indiaSearchIndex === 'undefined') {
            return item;
        }
        var match = window.indiaSearchIndex.find(function (entry) {
            return entry.url && entry.url.indexOf(item.id) !== -1;
        });
        if (match) {
            return {
                id: item.id,
                explorerPage: item.explorerPage,
                title: item.title,
                thumbnail: item.thumbnail,
                category: match.category || item.category,
                savedAt: item.savedAt,
                description: match.description
            };
        }
        return item;
    }

    /**
     * Get enriched journey items with search index cross-references.
     */
    function getEnrichedJourney() {
        return getJourney().map(enrichFromSearchIndex);
    }

    window.Journey = {
        getJourney,
        saveToJourney,
        removeFromJourney,
        isSaved,
        toggle,
        registerSearchItems,
        search,
        getSearchIndex,
        enrichFromSearchIndex: enrichFromSearchIndex,
        getEnrichedJourney: getEnrichedJourney
    };
})();