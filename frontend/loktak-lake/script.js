import { LOKTAK_DATA } from './loktak-data.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    renderStats();
    renderHistory();
    renderPhumdis();
    renderSangai();
    renderBiodiversity();
    renderCommunity();
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
    if (!container || !LOKTAK_DATA.stats) return;

    container.innerHTML = LOKTAK_DATA.stats
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
    if (title) title.textContent = LOKTAK_DATA.history.title;
    if (content) content.textContent = LOKTAK_DATA.history.content;
}

function renderPhumdis() {
    const title = document.getElementById('phumdis-title');
    const content = document.getElementById('phumdis-content');
    if (title) title.textContent = LOKTAK_DATA.phumdis.title;
    if (content) content.textContent = LOKTAK_DATA.phumdis.content;
}

function renderSangai() {
    const keibulContent = document.getElementById('keibul-content');
    const grid = document.getElementById('keibul-highlights');

    if (keibulContent) keibulContent.textContent = LOKTAK_DATA.keibulLamjao.content;

    if (grid && LOKTAK_DATA.keibulLamjao.highlights) {
        grid.innerHTML = LOKTAK_DATA.keibulLamjao.highlights
            .map((h) => `<div class="hl-item">🦌 ${h}</div>`)
            .join('');
    }
}

function renderBiodiversity() {
    const ramsarTitle = document.getElementById('ramsar-title');
    const ramsarContent = document.getElementById('ramsar-content');
    const bioTitle = document.getElementById('bio-title');
    const bioContent = document.getElementById('bio-content');

    if (ramsarTitle) ramsarTitle.textContent = LOKTAK_DATA.ramsarSite.title;
    if (ramsarContent) ramsarContent.textContent = LOKTAK_DATA.ramsarSite.content;
    if (bioTitle) bioTitle.textContent = LOKTAK_DATA.biodiversity.title;
    if (bioContent) bioContent.textContent = LOKTAK_DATA.biodiversity.content;
}

function renderCommunity() {
    const content = document.getElementById('community-content');
    if (content) content.textContent = LOKTAK_DATA.localCommunities.content;
}

function renderMapHotspots() {
    const listContainer = document.getElementById('hotspots-list');
    if (!listContainer || !LOKTAK_DATA.hotspots) return;

    listContainer.innerHTML = LOKTAK_DATA.hotspots
        .map(
            (spot, index) => `
        <button class="spot-btn ${index === 0 ? 'active' : ''}" data-id="${spot.id}">
            <span class="spot-name">${spot.name}</span>
        </button>
    `
        )
        .join('');

    showHotspotDetail(LOKTAK_DATA.hotspots[0]);

    listContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.spot-btn');
        if (!btn) return;

        const id = btn.getAttribute('data-id');
        const spot = LOKTAK_DATA.hotspots.find((s) => s.id === id);

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
        <h3 style="margin: 0 0 0.5rem; color: #34d399; font-size: 1.5rem;">${spot.name}</h3>
        <p style="color: var(--loktak-text-sub); line-height: 1.6; margin-bottom: 1.25rem;">${spot.desc}</p>
        <div style="font-family: monospace; font-size: 0.85rem; color: #94a3b8; background: rgba(0,0,0,0.2); padding: 0.5rem 0.85rem; border-radius: 0.5rem;">Coordinates: ${spot.lat}° N, ${spot.lng}° E</div>
    `;
}

function renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container || !LOKTAK_DATA.gallery) return;

    container.innerHTML = LOKTAK_DATA.gallery
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
    if (!container || !LOKTAK_DATA.facts) return;

    container.innerHTML = LOKTAK_DATA.facts
        .map((f) => `<div class="trivia-box">💡 ${f}</div>`)
        .join('');
}
