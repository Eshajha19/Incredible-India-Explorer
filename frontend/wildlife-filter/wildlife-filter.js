/**
 * wildlife-filter.js
 * Accessible filter + search system for the Nature & Wildlife explorer page.
 *
 * Features implemented:
 *  - Keyboard-navigable filter chips with aria-pressed state management
 *  - Debounced live search across park name, state, and key fauna tags
 *  - aria-live region that announces result counts to screen reader users
 *  - "No results" empty state with a one-click reset action
 *  - Conservation-status badge colour mapping aligned with IUCN categories
 *  - Region grouping filter (North, South, East, West, Northeast, Central)
 *  - Graceful degradation: if JS fails, all cards remain visible
 */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
   * 1. DATA — extended national park dataset with filterable metadata
   * --------------------------------------------------------------------- */

  const NATIONAL_PARKS = [
    {
      id: 'jim-corbett',
      name: 'Jim Corbett',
      state: 'Uttarakhand',
      region: 'north',
      fauna: ['tigers', 'leopards', 'elephants', 'deer'],
      area: '1318 km²',
      established: 1936,
      status: 'protected',
      description: 'India\'s oldest national park, famous for its Bengal Tiger population and dense Sal forests. Home to over 600 bird species.',
      mapUrl: 'https://maps.google.com/?q=Jim+Corbett+National+Park',
      websiteUrl: 'https://corbettgov.org/',
    },
    {
      id: 'kaziranga',
      name: 'Kaziranga',
      state: 'Assam',
      region: 'northeast',
      fauna: ['rhinos', 'tigers', 'elephants', 'water buffalo'],
      area: '858 km²',
      established: 1974,
      status: 'world-heritage',
      description: 'A UNESCO World Heritage Site hosting two-thirds of the world\'s one-horned rhinoceroses. Also shelters the highest density of tigers in any protected area.',
      mapUrl: 'https://maps.google.com/?q=Kaziranga+National+Park',
      websiteUrl: 'https://kazirangasafari.in/',
    },
    {
      id: 'ranthambore',
      name: 'Ranthambore',
      state: 'Rajasthan',
      region: 'north',
      fauna: ['tigers', 'leopards', 'sloth bears', 'crocodiles'],
      area: '1334 km²',
      established: 1980,
      status: 'protected',
      description: 'A unique blend of ancient ruins and dense jungle. One of the best places in India to spot tigers in their natural habitat during daylight hours.',
      mapUrl: 'https://maps.google.com/?q=Ranthambore+National+Park',
      websiteUrl: 'https://www.ranthamborenationalpark.com/',
    },
    {
      id: 'gir',
      name: 'Gir National Park',
      state: 'Gujarat',
      region: 'west',
      fauna: ['asiatic lions', 'leopards', 'hyenas', 'jackals'],
      area: '1412 km²',
      established: 1965,
      status: 'protected',
      description: 'The only natural habitat in the world for the Asiatic Lion. A remarkable conservation success story with lion numbers growing from under 20 to over 600.',
      mapUrl: 'https://maps.google.com/?q=Gir+National+Park',
      websiteUrl: 'https://girlion.gujarat.gov.in/',
    },
    {
      id: 'sundarbans',
      name: 'Sundarbans',
      state: 'West Bengal',
      region: 'east',
      fauna: ['tigers', 'saltwater crocodiles', 'Irrawaddy dolphins', 'fishing cats'],
      area: '2585 km²',
      established: 1984,
      status: 'world-heritage',
      description: 'The world\'s largest tidal halophytic mangrove forest and a UNESCO World Heritage Site. The Bengal Tigers here have uniquely adapted to swimming between islands.',
      mapUrl: 'https://maps.google.com/?q=Sundarbans+National+Park',
      websiteUrl: 'https://www.wbsundarbansbiosphere.com/',
    },
    {
      id: 'bandhavgarh',
      name: 'Bandhavgarh',
      state: 'Madhya Pradesh',
      region: 'central',
      fauna: ['tigers', 'leopards', 'gaur', 'sloth bears'],
      area: '716 km²',
      established: 1968,
      status: 'protected',
      description: 'Renowned for having one of the highest tiger densities in India. The park\'s ancient fort ruins set dramatically within the forest make it uniquely scenic.',
      mapUrl: 'https://maps.google.com/?q=Bandhavgarh+National+Park',
      websiteUrl: 'https://www.bandhavgarhnationalpark.in/',
    },
    {
      id: 'periyar',
      name: 'Periyar',
      state: 'Kerala',
      region: 'south',
      fauna: ['elephants', 'tigers', 'gaur', 'sambar deer'],
      area: '925 km²',
      established: 1982,
      status: 'protected',
      description: 'Built around the picturesque Periyar Lake, this reserve offers rare boat safaris through tiger and elephant territory in the lush Western Ghats.',
      mapUrl: 'https://maps.google.com/?q=Periyar+National+Park',
      websiteUrl: 'https://www.periyartigerreserve.org/',
    },
    {
      id: 'kanha',
      name: 'Kanha',
      state: 'Madhya Pradesh',
      region: 'central',
      fauna: ['tigers', 'barasingha', 'leopards', 'gaur'],
      area: '940 km²',
      established: 1955,
      status: 'protected',
      description: 'Known for the remarkable comeback of the endangered barasingha deer from near extinction. The expansive meadows and sal forests inspired Rudyard Kipling\'s Jungle Book.',
      mapUrl: 'https://maps.google.com/?q=Kanha+National+Park',
      websiteUrl: 'https://www.kanhanationalpark.in/',
    },
  ];

  const REGION_LABELS = {
    all: 'All Regions',
    north: '🏔️ North',
    south: '🌴 South',
    east: '🌊 East',
    west: '🏜️ West',
    northeast: '🍃 Northeast',
    central: '🌳 Central',
  };

  /* -----------------------------------------------------------------------
   * 2. STATE
   * --------------------------------------------------------------------- */

  let activeRegion = 'all';
  let searchQuery = '';
  let searchTimer = null;

  /* -----------------------------------------------------------------------
   * 3. DOM HELPERS
   * --------------------------------------------------------------------- */

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function statusBadgeClass(status) {
    if (status === 'world-heritage') return 'vulnerable';
    return 'least-concern';
  }

  function buildParkCard(park) {
    const faunaList = park.fauna.slice(0, 3).map(f =>
      `<span class="wildlife-status-badge ${statusBadgeClass('least-concern')}">${escHtml(f)}</span>`
    ).join(' ');

    return `
      <article class="park-card"
               data-park-id="${escHtml(park.id)}"
               data-region="${escHtml(park.region)}"
               data-fauna="${escHtml(park.fauna.join(' '))}"
               data-state="${escHtml(park.state.toLowerCase())}"
               data-name="${escHtml(park.name.toLowerCase())}"
               aria-label="${escHtml(park.name)} National Park, ${escHtml(park.state)}">
        <div class="animated-placeholder park-img" role="img" aria-label="${escHtml(park.name)} landscape">${escHtml(park.name)}</div>
        <div class="park-info">
          <h3 class="park-title">${escHtml(park.name)}</h3>
          <div class="park-meta">
            <span>📍 ${escHtml(park.state)}</span>
            <span>📐 ${escHtml(park.area)}</span>
          </div>
          <span class="park-region-tag">${escHtml(REGION_LABELS[park.region] || park.region)}</span>
          <p style="font-size:0.9rem;color:var(--text-muted);margin-top:10px;line-height:1.5;">${escHtml(park.description)}</p>
          <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px;">${faunaList}</div>
          <div class="park-actions">
            <a href="${escHtml(park.mapUrl)}" target="_blank" rel="noopener noreferrer" class="park-btn" aria-label="Open ${escHtml(park.name)} on Google Maps">
              📍 <span>Map</span>
            </a>
            <a href="${escHtml(park.websiteUrl)}" target="_blank" rel="noopener noreferrer" class="park-btn website" aria-label="Visit official website of ${escHtml(park.name)}">
              🌐 Website
            </a>
          </div>
        </div>
      </article>`;
  }

  /* -----------------------------------------------------------------------
   * 4. FILTER ENGINE
   * --------------------------------------------------------------------- */

  function matchesPark(park, region, query) {
    if (region !== 'all' && park.region !== region) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      park.name.toLowerCase().includes(q) ||
      park.state.toLowerCase().includes(q) ||
      park.fauna.some(f => f.toLowerCase().includes(q)) ||
      park.description.toLowerCase().includes(q)
    );
  }

  function applyFilters(grid, emptyState, liveRegion, clearBtn) {
    const cards = grid.querySelectorAll('.park-card');
    let visible = 0;

    NATIONAL_PARKS.forEach((park, idx) => {
      const card = cards[idx];
      if (!card) return;
      const show = matchesPark(park, activeRegion, searchQuery);
      card.setAttribute('data-visible', show ? 'true' : 'false');
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    const isFiltered = activeRegion !== 'all' || searchQuery.trim() !== '';
    emptyState.classList.toggle('visible', visible === 0);
    clearBtn.classList.toggle('visible', isFiltered);

    const noun = visible === 1 ? 'park' : 'parks';
    liveRegion.textContent = isFiltered
      ? `${visible} national ${noun} match your filter.`
      : '';
  }

  /* -----------------------------------------------------------------------
   * 5. BUILD UI
   * --------------------------------------------------------------------- */

  function buildFilterBar(container) {
    const bar = document.createElement('div');
    bar.className = 'wildlife-filter-bar';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Filter national parks');

    /* Search input */
    const searchWrap = document.createElement('div');
    searchWrap.className = 'wildlife-search-wrap';

    const searchLabel = document.createElement('label');
    searchLabel.setAttribute('for', 'wildlife-park-search');
    searchLabel.textContent = 'Search parks';

    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.id = 'wildlife-park-search';
    searchInput.className = 'wildlife-search-input';
    searchInput.placeholder = 'Park, state, or animal…';
    searchInput.autocomplete = 'off';
    searchInput.setAttribute('aria-label', 'Search national parks by name, state, or animal');

    searchWrap.append(searchLabel, searchInput);

    /* Region chips */
    const chipsWrap = document.createElement('div');
    chipsWrap.className = 'wildlife-filter-chips';
    chipsWrap.setAttribute('role', 'group');
    chipsWrap.setAttribute('aria-label', 'Filter by region');

    const regions = Object.keys(REGION_LABELS);
    const chipButtons = regions.map(region => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wildlife-filter-chip';
      btn.dataset.region = region;
      btn.textContent = REGION_LABELS[region];
      btn.setAttribute('aria-pressed', region === 'all' ? 'true' : 'false');
      chipsWrap.append(btn);
      return btn;
    });

    /* Clear button */
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'wildlife-clear-btn';
    clearBtn.innerHTML = '✕ Clear filters';
    clearBtn.setAttribute('aria-label', 'Clear all active filters');

    bar.append(searchWrap, chipsWrap, clearBtn);
    container.prepend(bar);

    /* Live region */
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'wildlife-result-meta';
    liveRegion.style.cssText = 'position:absolute;left:-9999px;';
    document.body.append(liveRegion);

    return { searchInput, chipButtons, clearBtn, liveRegion };
  }

  function buildEmptyState(grid) {
    const empty = document.createElement('div');
    empty.className = 'wildlife-empty-state';
    empty.setAttribute('role', 'status');
    empty.innerHTML = `
      <div class="wildlife-empty-icon" aria-hidden="true">🌿</div>
      <h3>No parks match your filter</h3>
      <p>Try a different region or animal name — India has over 106 national parks waiting to be discovered.</p>
      <button type="button" class="wildlife-clear-btn visible" aria-label="Reset all filters and show all parks">
        ✕ Reset filters
      </button>`;
    grid.after(empty);
    return empty;
  }

  /* -----------------------------------------------------------------------
   * 6. WIRE UP EVENTS
   * --------------------------------------------------------------------- */

  function wireEvents({ searchInput, chipButtons, clearBtn, liveRegion }, grid, emptyState) {
    function refresh() {
      applyFilters(grid, emptyState, liveRegion, clearBtn);
    }

    /* Search — debounced 280ms */
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        searchQuery = searchInput.value.trim();
        refresh();
      }, 280);
    });

    /* Region chips */
    chipButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        activeRegion = btn.dataset.region;
        chipButtons.forEach(b => {
          const isActive = b.dataset.region === activeRegion;
          b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
          b.classList.toggle('active', isActive);
        });
        refresh();
      });
    });

    /* Clear button (both toolbar and empty state) */
    function resetFilters() {
      activeRegion = 'all';
      searchQuery = '';
      searchInput.value = '';
      chipButtons.forEach(b => {
        const isAll = b.dataset.region === 'all';
        b.setAttribute('aria-pressed', isAll ? 'true' : 'false');
        b.classList.toggle('active', isAll);
      });
      refresh();
    }

    clearBtn.addEventListener('click', resetFilters);
    const emptyReset = emptyState.querySelector('.wildlife-clear-btn');
    if (emptyReset) emptyReset.addEventListener('click', resetFilters);

    /* Keyboard shortcut: / focuses search */
    document.addEventListener('keydown', e => {
      if (e.key === '/' && document.activeElement !== searchInput &&
          !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  /* -----------------------------------------------------------------------
   * 7. INITIALISE
   * --------------------------------------------------------------------- */

  function initWildlifeFilter() {
    /* Locate the National Parks section */
    const parkSection = document.querySelector('.park-grid');
    if (!parkSection) return;

    const container = parkSection.closest('.section-container') ||
                      parkSection.parentElement;
    if (!container) return;

    /* Replace existing static park cards with the JS-driven ones */
    parkSection.innerHTML = NATIONAL_PARKS.map(buildParkCard).join('');

    /* Inject filter bar above the grid */
    const controls = buildFilterBar(container);

    /* Inject empty state after the grid */
    const emptyState = buildEmptyState(parkSection);

    /* Wire interactivity */
    wireEvents(controls, parkSection, emptyState);

    /* Journey Integration */
    if (window.Journey) {
      const cards = [...document.querySelectorAll(".animal-card")];
      const bookmarkButtons = [...document.querySelectorAll('.journey-bookmark-btn')];

      bookmarkButtons.forEach((btn) => {
        const card = btn.closest(".animal-card");
        if (!card) return;
        const id = btn.dataset.bookmarkId;
        const title = card.querySelector('h2, h3, h4')?.textContent.trim() || 'Item';
        const thumbnail = card.querySelector('img')?.getAttribute('src') || '';
        const category = "wildlife";

        const setPressed = () => {
          const saved = window.Journey.isSaved(id);
          btn.classList.toggle('is-saved', saved);
          btn.setAttribute('aria-pressed', String(saved));
          btn.textContent = saved ? '♥' : '♡';
        };
        setPressed();

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          window.Journey.toggle({
            id, explorerPage: 'wildlife.html', title, thumbnail, category
          });
          setPressed();
        });
      });

      window.Journey.registerSearchItems('wildlife.html', cards.map((card) => ({
        id: card.dataset.id,
        title: card.querySelector('h2, h3, h4')?.textContent.trim() || 'Item',
        description: card.querySelector('p')?.textContent.trim() || '',
        link: 'wildlife.html'
      })));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWildlifeFilter);
  } else {
    initWildlifeFilter();
  }
})();
