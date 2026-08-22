document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderCampsites();
    renderMysteries();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof ROOPKUND_INFO === 'undefined') return;

    grid.innerHTML = ROOPKUND_INFO.quickStats
        .map(
            stat => `
        <div class="stat-card">
            <span class="stat-icon">${stat.icon}</span>
            <div class="stat-val">${stat.value}</div>
            <div class="stat-lbl">${stat.label}</div>
        </div>
    `
        )
        .join('');
}

function renderCampsites() {
    const grid = document.getElementById('campsites-grid');
    if (!grid || typeof TRAIL_CAMPSITES === 'undefined') return;

    grid.innerHTML = TRAIL_CAMPSITES.map(
        c => `
        <div class="trail-card">
            <div class="card-header">
                <h3>${c.icon} ${c.day}</h3>
                <span class="alt-tag">${c.altitude}</span>
            </div>
            <p>${c.description}</p>
        </div>
    `
    ).join('');
}

function renderMysteries() {
    const grid = document.getElementById('mysteries-grid');
    if (!grid || typeof HISTORICAL_MYSTERIES === 'undefined') return;

    grid.innerHTML = HISTORICAL_MYSTERIES.map(
        m => `
        <div class="mystery-card">
            <div class="card-header">
                <h3>${m.icon} ${m.topic}</h3>
            </div>
            <p>${m.description}</p>
        </div>
    `
    ).join('');
}

function renderReferences() {
    const list = document.getElementById('references-list');
    if (!list || typeof REFERENCES === 'undefined') return;

    list.innerHTML = REFERENCES.map(
        r => `
        <li>
            <a href="${r.link}" target="_blank" rel="noopener noreferrer">📚 ${r.text}</a>
        </li>
    `
    ).join('');
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggleBtn.textContent = isLight ? '🌙' : '☀️';
    });
}
