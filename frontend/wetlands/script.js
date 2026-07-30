import { WETLANDS_DATA } from './wetlands-data.js';

let activeTypeFilter = 'All';
let activeStateFilter = 'All';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    renderStats();
    renderStateFilterOptions();
    renderTypeFilterPills();
    renderFeaturedWetlands();
    renderAllWetlands();
    renderMapHotspots();
    renderTrivia();
    bindSearchAndFilters();
});

function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeToggleBtn.textContent = isLight ? '🌙' : '☀️';
    });
}

function initNavbar() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });
}

function renderStats() {
    const container = document.getElementById('stats-grid');
    if (!container || !WETLANDS_DATA.stats) return;

    container.innerHTML = WETLANDS_DATA.stats
        .map(
            (stat) => `
        <div class="stat-card">
            <span class="stat-icon">${stat.icon}</span>
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `
        )
        .join('');
}

function renderStateFilterOptions() {
    const select = document.getElementById('state-filter');
    if (!select || !WETLANDS_DATA.states) return;

    select.innerHTML = WETLANDS_DATA.states
        .map((st) => `<option value="${st}">${st}</option>`)
        .join('');
}

function renderTypeFilterPills() {
    const container = document.getElementById('type-pills-row');
    if (!container || !WETLANDS_DATA.types) return;

    container.innerHTML = WETLANDS_DATA.types
        .map(
            (type) => `
        <button class="type-pill-btn ${type === 'All' ? 'active' : ''}" data-type="${type}">
            ${type}
        </button>
    `
        )
        .join('');
}

function getFilteredWetlands() {
    return WETLANDS_DATA.wetlands.filter((item) => {
        const matchesType = activeTypeFilter === 'All' || item.type === activeTypeFilter;
        const matchesState = activeStateFilter === 'All' || item.state === activeStateFilter;

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
            !q ||
            item.name.toLowerCase().includes(q) ||
            item.state.toLowerCase().includes(q) ||
            item.type.toLowerCase().includes(q) ||
            item.shortDesc.toLowerCase().includes(q) ||
            (item.keyFauna && item.keyFauna.some((f) => f.toLowerCase().includes(q)));

        return matchesType && matchesState && matchesSearch;
    });
}

function renderFeaturedWetlands() {
    const container = document.getElementById('featured-grid');
    if (!container) return;

    const featured = WETLANDS_DATA.wetlands.filter((w) => w.isFeatured);
    container.innerHTML = featured.map(createWetlandCardHtml).join('');
}

function renderAllWetlands() {
    const container = document.getElementById('all-wetlands-grid');
    const countText = document.getElementById('results-count-text');
    if (!container) return;

    const filtered = getFilteredWetlands();

    if (countText) {
        countText.textContent = `Showing ${filtered.length} of ${WETLANDS_DATA.wetlands.length} wetlands`;
    }

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--wetland-text-sub); padding: 3rem;">No wetlands match your current filter and search query.</div>`;
        return;
    }

    container.innerHTML = filtered.map(createWetlandCardHtml).join('');
}

function createWetlandCardHtml(item) {
    return `
        <div class="wetland-card">
            <div class="wetland-card-img">
                <img src="${item.image}" alt="${item.name}" loading="lazy" />
                <span class="wetland-type-badge">${item.type}</span>
            </div>
            <div class="wetland-card-body">
                <div class="wetland-state-tag">📍 ${item.state}</div>
                <h3 class="wetland-card-title">${item.name}</h3>
                <p class="wetland-card-desc">${item.shortDesc}</p>
                <div class="wetland-card-footer">
                    <span class="wetland-area">Area: ${item.area}</span>
                    <a href="${item.exploreUrl}" class="btn-explore">Explore</a>
                </div>
            </div>
        </div>
    `;
}

function bindSearchAndFilters() {
    const searchInput = document.getElementById('search-input');
    const stateSelect = document.getElementById('state-filter');
    const typeContainer = document.getElementById('type-pills-row');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderAllWetlands();
        });
    }

    if (stateSelect) {
        stateSelect.addEventListener('change', (e) => {
            activeStateFilter = e.target.value;
            renderAllWetlands();
        });
    }

    if (typeContainer) {
        typeContainer.addEventListener('click', (e) => {
            if (!e.target.classList.contains('type-pill-btn')) return;

            document.querySelectorAll('.type-pill-btn').forEach((btn) => btn.classList.remove('active'));
            e.target.classList.add('active');

            activeTypeFilter = e.target.getAttribute('data-type');
            renderAllWetlands();
        });
    }
}

function renderMapHotspots() {
    const listContainer = document.getElementById('map-hotspots-list');
    if (!listContainer || !WETLANDS_DATA.wetlands) return;

    listContainer.innerHTML = WETLANDS_DATA.wetlands
        .map(
            (w, index) => `
        <button class="map-spot-btn ${index === 0 ? 'active' : ''}" data-id="${w.id}">
            <span class="spot-title">${w.name}</span>
            <span class="spot-sub">📍 ${w.state} • ${w.type}</span>
        </button>
    `
        )
        .join('');

    showMapPreview(WETLANDS_DATA.wetlands[0]);

    listContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.map-spot-btn');
        if (!btn) return;

        const id = btn.getAttribute('data-id');
        const item = WETLANDS_DATA.wetlands.find((w) => w.id === id);

        document.querySelectorAll('.map-spot-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        if (item) {
            showMapPreview(item);
        }
    });
}

function showMapPreview(item) {
    const previewContainer = document.getElementById('map-preview-card');
    if (!previewContainer) return;

    previewContainer.innerHTML = `
        <h3 style="margin: 0 0 0.5rem; color: #22d3ee; font-size: 1.5rem;">${item.name}</h3>
        <div style="font-size: 0.85rem; color: #10b981; font-weight: 700; margin-bottom: 1rem;">${item.state} • Ramsar Site #${item.ramsarSiteNo} (${item.ramsarDeclared})</div>
        <p style="color: var(--wetland-text-sub); line-height: 1.6; margin-bottom: 1.25rem;">${item.shortDesc}</p>
        <div style="font-family: monospace; font-size: 0.85rem; color: #94a3b8; background: rgba(0,0,0,0.2); padding: 0.5rem 0.85rem; border-radius: 0.5rem; margin-bottom: 1.25rem;">Coordinates: ${item.coordinates.lat}° N, ${item.coordinates.lng}° E</div>
        <a href="${item.exploreUrl}" class="btn-explore" style="display: inline-block; text-align: center;">Launch ${item.name} Explorer</a>
    `;
}

function renderTrivia() {
    const container = document.getElementById('trivia-grid');
    if (!container || !WETLANDS_DATA.didYouKnow) return;

    container.innerHTML = WETLANDS_DATA.didYouKnow
        .map(
            (t) => `
        <div class="trivia-card">
            <h3>💡 ${t.title}</h3>
            <p>${t.fact}</p>
        </div>
    `
        )
        .join('');
}
