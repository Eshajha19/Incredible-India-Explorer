document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderVocabulary();
    renderLegends();
    renderReferences();
    initAudioHandlers();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof MARATHI_INFO === 'undefined') return;

    grid.innerHTML = MARATHI_INFO.quickStats
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

function renderVocabulary() {
    const grid = document.getElementById('vocab-grid');
    if (!grid || typeof VOCABULARY === 'undefined') return;

    grid.innerHTML = VOCABULARY.map(
        v => `
        <div class="vocab-card">
            <div class="vocab-top">
                <span class="vocab-native" lang="mr">${v.native}</span>
                <button class="vocab-speak-btn" data-word="${v.native}" data-translit="${v.translit}" aria-label="Listen to ${v.translit}">🔊</button>
            </div>
            <div class="vocab-translit">${v.translit}</div>
            <div class="vocab-meaning">${v.meaning}</div>
            <div class="vocab-ipa">${v.ipa}</div>
        </div>
    `
    ).join('');
}

function renderLegends() {
    const grid = document.getElementById('legends-grid');
    if (!grid || typeof LITERARY_LEGENDS === 'undefined') return;

    grid.innerHTML = LITERARY_LEGENDS.map(
        l => `
        <div class="legend-card">
            <div class="card-header">
                <h3>${l.icon} ${l.author}</h3>
            </div>
            <p class="legend-title"><strong>${l.title}</strong></p>
            <p>${l.description}</p>
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

function playSynthesizedTone(freq = 440, duration = 0.25) {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {
        console.warn('Web Audio synthesis not supported', e);
    }
}

function speakMarathi(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'mr-IN';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    } else {
        playSynthesizedTone(520, 0.3);
    }
}

function initAudioHandlers() {
    const greetingBtn = document.getElementById('greeting-audio-btn');
    if (greetingBtn) {
        greetingBtn.addEventListener('click', () => {
            speakMarathi('नमस्कार');
            playSynthesizedTone(587, 0.2);
        });
    }

    const vocabGrid = document.getElementById('vocab-grid');
    if (vocabGrid) {
        vocabGrid.addEventListener('click', e => {
            const btn = e.target.closest('.vocab-speak-btn');
            if (btn) {
                const word = btn.getAttribute('data-word');
                speakMarathi(word);
                playSynthesizedTone(440, 0.15);
            }
        });
    }
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
