import { KOLLERU_DATA } from './kolleru-data.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    renderStats();
    renderGeography();
    renderSanctuaryAndRamsar();
    renderEcosystemAndFish();
    renderBirds();
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
    if (!container || !KOLLERU_DATA.stats) return;

    container.innerHTML = KOLLERU_DATA.stats
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

function renderGeography() {
    const title = document.getElementById('geo-title');
    const content = document.getElementById('geo-content');
    if (title) title.textContent = KOLLERU_DATA.geography.title;
    if (content) content.textContent = KOLLERU_DATA.geography.content;
}

function renderSanctuaryAndRamsar() {
    const ramsarTitle = document.getElementById('ramsar-title');
    const ramsarContent = document.getElementById('ramsar-content');
    const sanctuaryTitle = document.getElementById('sanctuary-title');
    const sanctuaryContent = document.getElementById('sanctuary-content');

    if (ramsarTitle) ramsarTitle.textContent = KOLLERU_DATA.ramsarSite.title;
    if (ramsarContent) ramsarContent.textContent = KOLLERU_DATA.ramsarSite.content;
    if (sanctuaryTitle) sanctuaryTitle.textContent = KOLLERU_DATA.birdSanctuary.title;
    if (sanctuaryContent) sanctuaryContent.textContent = KOLLERU_DATA.birdSanctuary.content;
}

function renderEcosystemAndFish() {
    const ecoTitle = document.getElementById('eco-title');
    const ecoContent = document.getElementById('eco-content');
    const fishTitle = document.getElementById('fish-title');
    const fishContent = document.getElementById('fish-content');

    if (ecoTitle) ecoTitle.textContent = KOLLERU_DATA.freshwaterEcosystem.title;
    if (ecoContent) ecoContent.textContent = KOLLERU_DATA.freshwaterEcosystem.content;
    if (fishTitle) fishTitle.textContent = KOLLERU_DATA.fishDiversity.title;
    if (fishContent) fishContent.textContent = KOLLERU_DATA.fishDiversity.content;
}

function renderBirds() {
    const container = document.getElementById('birds-grid');
    if (!container || !KOLLERU_DATA.migratoryBirds) return;

    container.innerHTML = KOLLERU_DATA.migratoryBirds
        .map(
            (b) => `
        <div class="bird-card">
            <h4>🦢 ${b.name}</h4>
            <span class="bird-status">${b.status}</span>
            <p>${b.desc}</p>
        </div>
    `
        )
        .join('');
}

function renderMapHotspots() {
    const listContainer = document.getElementById('hotspots-list');
    if (!listContainer || !KOLLERU_DATA.hotspots) return;

    listContainer.innerHTML = KOLLERU_DATA.hotspots
        .map(
            (spot, index) => `
        <button class="spot-btn ${index === 0 ? 'active' : ''}" data-id="${spot.id}">
            <span class="spot-name">${spot.name}</span>
        </button>
    `
        )
        .join('');

    showHotspotDetail(KOLLERU_DATA.hotspots[0]);

    listContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.spot-btn');
        if (!btn) return;

        const id = btn.getAttribute('data-id');
        const spot = KOLLERU_DATA.hotspots.find((s) => s.id === id);

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
        <p style="color: var(--kolleru-text-sub); line-height: 1.6; margin-bottom: 1.25rem;">${spot.desc}</p>
        <div style="font-family: monospace; font-size: 0.85rem; color: #94a3b8; background: rgba(0,0,0,0.2); padding: 0.5rem 0.85rem; border-radius: 0.5rem;">Coordinates: ${spot.lat}° N, ${spot.lng}° E</div>
    `;
}

function renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container || !KOLLERU_DATA.gallery) return;

    container.innerHTML = KOLLERU_DATA.gallery
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
    if (!container || !KOLLERU_DATA.facts) return;

    container.innerHTML = KOLLERU_DATA.facts
        .map((f) => `<div class="trivia-box">💡 ${f}</div>`)
        .join('');
}
