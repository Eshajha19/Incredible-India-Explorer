import { HEMIS_DATA } from './hemis-data.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    renderQuickStats();
    renderSnowLeopardSpotlight();
    renderEcosystemZones();
    renderWildlife();
    renderTrekkingRoutes();
    renderGeographyAndClimate();
    renderHotspots();
    renderGallery('All');
    renderGalleryFilters();
    renderConservation();
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

function renderQuickStats() {
    const container = document.getElementById('stats-grid');
    if (!container || !HEMIS_DATA.quickStats) return;

    container.innerHTML = HEMIS_DATA.quickStats
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

function renderSnowLeopardSpotlight() {
    const adaptationsContainer = document.getElementById('adaptations-grid');
    const trackingSeasonText = document.getElementById('tracking-season-text');
    if (!HEMIS_DATA.snowLeopardSpotlight) return;

    if (adaptationsContainer && HEMIS_DATA.snowLeopardSpotlight.adaptations) {
        adaptationsContainer.innerHTML = HEMIS_DATA.snowLeopardSpotlight.adaptations
            .map(
                (item) => `
            <div class="adaptation-item">
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
            </div>
        `
            )
            .join('');
    }

    if (trackingSeasonText) {
        trackingSeasonText.textContent = HEMIS_DATA.snowLeopardSpotlight.bestTrackingSeason;
    }
}

function renderEcosystemZones() {
    const container = document.getElementById('zones-grid');
    if (!container || !HEMIS_DATA.highAltitudeEcosystem.zones) return;

    container.innerHTML = HEMIS_DATA.highAltitudeEcosystem.zones
        .map(
            (zone) => `
        <div class="zone-card">
            <h3>${zone.name}</h3>
            <p>${zone.desc}</p>
        </div>
    `
        )
        .join('');
}

function renderWildlife() {
    const container = document.getElementById('wildlife-grid');
    if (!container || !HEMIS_DATA.himalayanWildlife) return;

    container.innerHTML = HEMIS_DATA.himalayanWildlife
        .map(
            (item) => `
        <div class="wildlife-card">
            <div class="wildlife-header">
                <span class="wildlife-icon">${item.icon}</span>
                <span class="status-badge">${item.status}</span>
            </div>
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
        </div>
    `
        )
        .join('');
}

function renderTrekkingRoutes() {
    const container = document.getElementById('treks-grid');
    if (!container || !HEMIS_DATA.trekkingRoutes) return;

    container.innerHTML = HEMIS_DATA.trekkingRoutes
        .map(
            (trek) => `
        <div class="trek-card">
            <h3>${trek.name}</h3>
            <div class="trek-meta">
                <span class="meta-pill">⏱️ ${trek.duration}</span>
                <span class="meta-pill">🏔️ ${trek.maxAltitude}</span>
                <span class="meta-pill">⚡ ${trek.difficulty}</span>
            </div>
            <p>${trek.desc}</p>
            <div class="highlights-title">Trail Highlights</div>
            <ul class="highlights-list">
                ${trek.highlights.map((h) => `<li>${h}</li>`).join('')}
            </ul>
        </div>
    `
        )
        .join('');
}

function renderGeographyAndClimate() {
    const geoText = document.getElementById('geography-text');
    const climateText = document.getElementById('climate-text');
    const bestTimeText = document.getElementById('best-time-text');

    if (geoText) geoText.textContent = HEMIS_DATA.geographyAndClimate.geography;
    if (climateText) climateText.textContent = HEMIS_DATA.geographyAndClimate.climate;
    if (bestTimeText) bestTimeText.textContent = `📅 Best Time: ${HEMIS_DATA.geographyAndClimate.bestTimeToVisit}`;
}

function renderHotspots() {
    const listContainer = document.getElementById('hotspots-list');
    const detailContainer = document.getElementById('hotspot-detail-card');
    if (!listContainer || !HEMIS_DATA.mapHotspots) return;

    listContainer.innerHTML = HEMIS_DATA.mapHotspots
        .map(
            (spot, index) => `
        <button class="hotspot-item-btn ${index === 0 ? 'active' : ''}" data-id="${spot.id}">
            <span class="hotspot-name">${spot.name}</span>
            <span class="hotspot-category">${spot.category}</span>
        </button>
    `
        )
        .join('');

    showHotspotDetail(HEMIS_DATA.mapHotspots[0]);

    listContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.hotspot-item-btn');
        if (!btn) return;

        const id = btn.getAttribute('data-id');
        const spot = HEMIS_DATA.mapHotspots.find((s) => s.id === id);

        document.querySelectorAll('.hotspot-item-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        if (spot) {
            showHotspotDetail(spot);
        }
    });
}

function showHotspotDetail(spot) {
    const detailContainer = document.getElementById('hotspot-detail-card');
    if (!detailContainer) return;

    detailContainer.innerHTML = `
        <h3 class="active-detail-title">${spot.name}</h3>
        <div><span class="active-detail-cat">${spot.category}</span></div>
        <p class="active-detail-desc">${spot.desc}</p>
        <div class="active-detail-coords">Coordinates: ${spot.lat}° N, ${spot.lng}° E</div>
    `;
}

function renderGallery(filter) {
    const container = document.getElementById('gallery-grid');
    if (!container || !HEMIS_DATA.gallery) return;

    const filteredItems =
        filter === 'All'
            ? HEMIS_DATA.gallery
            : HEMIS_DATA.gallery.filter((item) => item.category.toLowerCase() === filter.toLowerCase());

    container.innerHTML = filteredItems
        .map(
            (item) => `
        <div class="gallery-item-card">
            <img src="${item.url}" alt="${item.title}" loading="lazy" />
            <div class="gallery-caption">
                <h4>${item.title}</h4>
                <p>${item.caption}</p>
            </div>
        </div>
    `
        )
        .join('');
}

function renderGalleryFilters() {
    const filterContainer = document.getElementById('gallery-filters');
    if (!filterContainer) return;

    filterContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;

        document.querySelectorAll('.filter-btn').forEach((btn) => btn.classList.remove('active'));
        e.target.classList.add('active');

        const filter = e.target.getAttribute('data-filter');
        renderGallery(filter);
    });
}

function renderConservation() {
    const title = document.getElementById('conservation-title');
    const desc = document.getElementById('conservation-desc');
    const grid = document.getElementById('initiatives-grid');

    if (!HEMIS_DATA.conservation) return;

    if (title) title.textContent = HEMIS_DATA.conservation.title;
    if (desc) desc.textContent = HEMIS_DATA.conservation.desc;

    if (grid && HEMIS_DATA.conservation.initiatives) {
        grid.innerHTML = HEMIS_DATA.conservation.initiatives
            .map(
                (item) => `
            <div class="initiative-item">
                <h4>${item.name}</h4>
                <p>${item.detail}</p>
            </div>
        `
            )
            .join('');
    }
}
