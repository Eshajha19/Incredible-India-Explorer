import { CHILIKA_DATA } from './chilika-data.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    renderStats();
    renderHistory();
    renderGeography();
    renderRamsar();
    renderDolphins();
    renderBirds();
    renderFishing();
    renderMapHotspots();
    renderGallery();
    renderFacts();
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
    if (!container || !CHILIKA_DATA.stats) return;

    container.innerHTML = CHILIKA_DATA.stats
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

function renderHistory() {
    const title = document.getElementById('history-title');
    const content = document.getElementById('history-content');
    if (title) title.textContent = CHILIKA_DATA.history.title;
    if (content) content.textContent = CHILIKA_DATA.history.content;
}

function renderGeography() {
    const desc = document.getElementById('geo-desc');
    const grid = document.getElementById('zones-grid');

    if (desc) desc.textContent = CHILIKA_DATA.geography.content;

    if (grid && CHILIKA_DATA.geography.zones) {
        grid.innerHTML = CHILIKA_DATA.geography.zones
            .map(
                (zone) => `
            <div class="zone-card">
                <h3>${zone.name}</h3>
                <p>${zone.detail}</p>
            </div>
        `
            )
            .join('');
    }
}

function renderRamsar() {
    const title = document.getElementById('ramsar-title');
    const content = document.getElementById('ramsar-content');
    if (title) title.textContent = CHILIKA_DATA.ramsarSite.title;
    if (content) content.textContent = CHILIKA_DATA.ramsarSite.content;
}

function renderDolphins() {
    const content = document.getElementById('dolphin-content');
    const factsList = document.getElementById('dolphin-facts');

    if (content) content.textContent = CHILIKA_DATA.irrawaddyDolphins.content;

    if (factsList && CHILIKA_DATA.irrawaddyDolphins.facts) {
        factsList.innerHTML = CHILIKA_DATA.irrawaddyDolphins.facts
            .map((f) => `<div class="fact-bullet">🐬 ${f}</div>`)
            .join('');
    }
}

function renderBirds() {
    const content = document.getElementById('birds-content');
    const grid = document.getElementById('birds-grid');
    const nalabanaContent = document.getElementById('nalabana-content');

    if (content) content.textContent = CHILIKA_DATA.migratoryBirds.content;
    if (nalabanaContent) nalabanaContent.textContent = CHILIKA_DATA.nalabanaSanctuary.content;

    if (grid && CHILIKA_DATA.migratoryBirds.species) {
        grid.innerHTML = CHILIKA_DATA.migratoryBirds.species
            .map(
                (s) => `
            <div class="bird-card">
                <h4>🦩 ${s.name}</h4>
                <p>${s.desc}</p>
            </div>
        `
            )
            .join('');
    }
}

function renderFishing() {
    const content = document.getElementById('fishing-content');
    if (content) content.textContent = CHILIKA_DATA.fishingCommunities.content;
}

function renderMapHotspots() {
    const listContainer = document.getElementById('hotspots-list');
    if (!listContainer || !CHILIKA_DATA.hotspots) return;

    listContainer.innerHTML = CHILIKA_DATA.hotspots
        .map(
            (spot, index) => `
        <button class="spot-btn ${index === 0 ? 'active' : ''}" data-id="${spot.id}">
            <span class="spot-name">${spot.name}</span>
        </button>
    `
        )
        .join('');

    showHotspotDetail(CHILIKA_DATA.hotspots[0]);

    listContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.spot-btn');
        if (!btn) return;

        const id = btn.getAttribute('data-id');
        const spot = CHILIKA_DATA.hotspots.find((s) => s.id === id);

        document.querySelectorAll('.spot-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        if (spot) {
            showHotspotDetail(spot);
        }
    });
}

function showHotspotDetail(spot) {
    const detailContainer = document.getElementById('hotspot-detail');
    if (!detailContainer) return;

    detailContainer.innerHTML = `
        <h3 style="margin: 0 0 0.5rem; color: #38bdf8; font-size: 1.5rem;">${spot.name}</h3>
        <p style="color: var(--chilika-text-sub); line-height: 1.6; margin-bottom: 1.25rem;">${spot.desc}</p>
        <div style="font-family: monospace; font-size: 0.85rem; color: #94a3b8; background: rgba(0,0,0,0.2); padding: 0.5rem 0.85rem; border-radius: 0.5rem;">Coordinates: ${spot.lat}° N, ${spot.lng}° E</div>
    `;
}

function renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container || !CHILIKA_DATA.gallery) return;

    container.innerHTML = CHILIKA_DATA.gallery
        .map(
            (g) => `
        <div class="gallery-card">
            <img src="${g.url}" alt="${g.title}" loading="lazy" />
            <div class="gallery-info">
                <h4>${g.title}</h4>
                <p>${g.caption}</p>
            </div>
        </div>
    `
        )
        .join('');
}

function renderFacts() {
    const container = document.getElementById('facts-grid');
    if (!container || !CHILIKA_DATA.facts) return;

    container.innerHTML = CHILIKA_DATA.facts
        .map((f) => `<div class="trivia-box">💡 ${f}</div>`)
        .join('');
}
