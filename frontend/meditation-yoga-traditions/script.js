// Indian Meditation & Yoga Traditions — Script Module

document.addEventListener('DOMContentLoaded', () => {
    // ─── Tab Switching ────────────────────────────────────────────────
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            tabContents.forEach(tc => tc.style.display = 'none');
            const target = document.getElementById('tab-' + btn.dataset.tab);
            if (target) target.style.display = 'block';
        });
    });

    // ─── Render Yoga Traditions ──────────────────────────────────────
    renderTraditions();
    renderPopularityChart();

    function renderTraditions() {
        const grid = document.getElementById('traditions-grid');
        if (!grid) return;
        grid.innerHTML = YOGA_TRADITIONS.map(t => `
            <div class="tradition-card" style="--card-color: ${t.color}" onclick="this.classList.toggle('expanded')">
                <div class="header">
                    <div>
                        <div class="name">${t.name}</div>
                        <div class="origin">${t.origin} · ${t.period}</div>
                    </div>
                    <span class="badge" style="background: ${t.color}20; color: ${t.color}; border-color: ${t.color}40;">${t.difficulty}</span>
                </div>
                <div class="desc">${t.description}</div>
                <div style="margin-bottom: 8px;">
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">Founder: ${Array.isArray(t.founder) ? t.founder.join(', ') : t.founder}</span>
                </div>
                <div>
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">Key Text: <em>${t.text}</em></span>
                </div>
                <div class="meta">
                    ${t.benefits.map(b => `<span class="badge" style="background: ${t.color}15; color: ${t.color}; border-color: ${t.color}30;">${b}</span>`).join('')}
                </div>
                <div style="margin-top: 12px;">
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">Key Asanas:</span>
                    <div style="font-size: 0.8rem; color: var(--accent-gold); margin-top: 4px;">${t.keyAsanas.join(' · ')}</div>
                </div>
                <div style="margin-top: 12px; padding: 10px; border-radius: 8px; background: rgba(245, 158, 11, 0.05);">
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">Philosophy: </span>
                    <span style="font-size: 0.8rem; color: var(--text-primary); font-style: italic;">${t.philosophy}</span>
                </div>
                <div style="margin-top: 12px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;">
                        <span>Global Popularity</span>
                        <span>${t.modernPopularity}%</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${t.modernPopularity}%; background: ${t.color};"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderPopularityChart() {
        const chart = document.getElementById('popularity-chart');
        if (!chart) return;
        chart.innerHTML = YOGA_TRADITIONS
            .sort((a, b) => b.modernPopularity - a.modernPopularity)
            .map(t => `
                <div class="pop-bar">
                    <div class="label">${t.name}</div>
                    <div class="track">
                        <div class="fill" style="width: ${t.modernPopularity}%; background: ${t.color};">${t.modernPopularity}%</div>
                    </div>
                </div>
            `).join('');
    }

    // ─── Render Meditation Techniques ────────────────────────────────
    function renderMeditation() {
        const container = document.getElementById('meditation-techniques');
        if (!container) return;
        container.innerHTML = MEDITATION_TECHNIQUES.map(m => `
            <div class="technique-card" style="--tech-color: ${m.color};">
                <div class="name" style="color: ${m.color};">${m.name}</div>
                <div class="english">${m.origin} · ${m.difficulty} · ${m.duration}</div>
                <div class="desc" style="margin-bottom: 12px;">${m.description}</div>
                <div style="padding: 12px; border-radius: 8px; background: rgba(0,0,0,0.2); margin-bottom: 8px;">
                    <div style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 600; margin-bottom: 4px;">How to Practice:</div>
                    <div style="font-size: 0.85rem; color: var(--text-primary);">${m.method}</div>
                </div>
                <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 8px;">
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">⏱️ ${m.duration}</span>
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">🕐 Best: ${m.bestTime}</span>
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">🔮 ${m.chakra}</span>
                </div>
                <div class="meta" style="display: flex; gap: 6px; flex-wrap: wrap;">
                    ${m.benefits.map(b => `<span class="badge" style="background: ${m.color}15; color: ${m.color}; border-color: ${m.color}30;">${b}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // ─── Render Chakra System ────────────────────────────────────────
    function renderChakras() {
        const wheelContainer = document.getElementById('chakra-wheel-container');
        const cardsContainer = document.getElementById('chakra-cards');
        if (!wheelContainer) return;

        // Wheel
        wheelContainer.innerHTML = `
            <div class="chakra-wheel">
                <div class="chakra-center" id="chakra-center-default">
                    <div class="icon">🔮</div>
                    <div class="label">Click a Chakra</div>
                </div>
            </div>
        `;

        // Cards
        cardsContainer.innerHTML = CHAKRAS.map(c => `
            <div class="tradition-card" style="--card-color: ${c.color}; cursor: pointer;" onclick="selectChakra('${c.id}')">
                <div class="header">
                    <div>
                        <div class="name">${c.icon} ${c.name}</div>
                        <div class="origin">${c.english} · ${c.element}</div>
                    </div>
                    <span class="badge" style="background: ${c.color}20; color: ${c.color}; border-color: ${c.color}40;">${c.petal} petals</span>
                </div>
                <div class="desc">${c.description}</div>
                <div class="meta">
                    <span class="badge" style="background: ${c.color}15; color: ${c.color}; border-color: ${c.color}30;">🔊 ${c.mantra}</span>
                    <span class="badge" style="background: ${c.color}15; color: ${c.color}; border-color: ${c.color}30;">📍 ${c.location}</span>
                </div>
            </div>
        `).join('');

        // Make selectChakra global
        window.selectChakra = function(id) {
            const chakra = CHAKRAS.find(c => c.id === id);
            if (!chakra) return;
            const detail = document.getElementById('chakra-detail');
            detail.style.borderLeft = `4px solid ${chakra.color}`;
            detail.innerHTML = `
                <div class="title" style="color: ${chakra.color};">${chakra.icon} ${chakra.name}</div>
                <div class="subtitle">${chakra.english} · ${chakra.element} Element · ${chakra.location}</div>
                <div style="margin-bottom: 16px;">
                    <div style="font-size: 0.85rem; color: var(--text-primary); line-height: 1.6;">${chakra.description}</div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div style="padding: 12px; border-radius: 8px; background: rgba(0,0,0,0.2);">
                        <div style="font-size: 0.7rem; color: var(--text-secondary);">Seed Mantra</div>
                        <div style="font-size: 1.2rem; font-weight: 700; color: ${chakra.color};">${chakra.mantra}</div>
                    </div>
                    <div style="padding: 12px; border-radius: 8px; background: rgba(0,0,0,0.2);">
                        <div style="font-size: 0.7rem; color: var(--text-secondary);">Petals</div>
                        <div style="font-size: 1.2rem; font-weight: 700; color: ${chakra.color};">${chakra.petal}</div>
                    </div>
                </div>
                <div style="margin-top: 16px; padding: 12px; border-radius: 8px; background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444;">
                    <div style="font-size: 0.75rem; color: #ef4444; font-weight: 600;">Blockage Signs</div>
                    <div style="font-size: 0.85rem; color: var(--text-primary); margin-top: 4px;">${chakra.blockage}</div>
                </div>
                <div style="margin-top: 12px; padding: 12px; border-radius: 8px; background: rgba(34, 197, 94, 0.1); border-left: 3px solid #22c55e;">
                    <div style="font-size: 0.75rem; color: #22c55e; font-weight: 600;">When Awakened</div>
                    <div style="font-size: 0.85rem; color: var(--text-primary); margin-top: 4px;">${chakra.awakening}</div>
                </div>
            `;
        };
    }

    // ─── Render Pranayama ────────────────────────────────────────────
    function renderPranayama() {
        const container = document.getElementById('pranayama-techniques');
        if (!container) return;
        container.innerHTML = PRANAYAMA_TECHNIQUES.map(p => `
            <div class="technique-card" style="--tech-color: ${p.color};">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <div class="name" style="color: ${p.color};">${p.name}</div>
                        <div class="english">${p.english}</div>
                    </div>
                    <span class="badge" style="background: ${p.color}20; color: ${p.color}; border-color: ${p.color}40;">${p.difficulty}</span>
                </div>
                <div class="desc" style="margin-top: 8px;">${p.description}</div>
                <div style="display: flex; gap: 12px; margin-top: 12px; font-size: 0.8rem; color: var(--text-secondary);">
                    <span>⏱️ ${p.duration}</span>
                </div>
                <div class="meta" style="margin-top: 8px;">
                    ${p.benefits.map(b => `<span class="badge" style="background: ${p.color}15; color: ${p.color}; border-color: ${p.color}30;">${b}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // ─── Render Sutras & Practitioners ──────────────────────────────
    function renderSages() {
        const sutras = document.getElementById('yoga-sutras');
        const practitioners = document.getElementById('practitioners');
        if (sutas) sutras.innerHTML = YOGA_SUTRAS.map(s => `
            <div class="sutra-card">
                <div class="meta">Sutra ${s.sutra} · ${s.section} · ${s.theme}</div>
                <div class="sanskrit">${s.sanskrit}</div>
                <div class="translation">"${s.translation}"</div>
            </div>
        `).join('');

        if (practitioners) practitioners.innerHTML = FAMOUS_PRACTITIONERS.map(p => `
            <div class="practitioner-card">
                <div class="avatar">${p.name.charAt(0)}</div>
                <div class="info">
                    <div class="name">${p.name}</div>
                    <div class="era">${p.era} · ${p.tradition}</div>
                    <div class="contribution">${p.contribution}</div>
                    <div style="margin-top: 6px;"><span class="badge" style="font-size: 0.7rem;">${p.notable}</span></div>
                </div>
            </div>
        `).join('');
    }

    // ─── Render Insights ────────────────────────────────────────────
    function renderInsights() {
        const insights = document.getElementById('insights');
        const stats = document.getElementById('yoga-stats');
        if (insights) {
            insights.innerHTML = [
                { icon: "🕉️", title: "5,000 Years of Wisdom", color: "#f59e0b", body: "Yoga originated in the Indus Valley Civilization (c. 3000 BCE) with seals depicting meditative postures. The Upanishads (800–500 BCE) systematized meditation, and Patanjali's Yoga Sutras (200 BCE) created the classical framework still followed today." },
                { icon: "🌍", title: "Global Impact", color: "#22c55e", body: "Yoga is practiced by an estimated 300+ million people worldwide. India's International Day of Yoga (June 21) was adopted by the UN in 2014 with support from 177 nations — the highest number of co-sponsors for any UN resolution." },
                { icon: "🧠", title: "Science Meets Tradition", color: "#06b6d4", body: "Modern neuroscience confirms what yogis knew: meditation physically changes the brain. Regular practice increases gray matter in the prefrontal cortex (decision-making), hippocampus (memory), and shrinks the amygdala (fear/stress). MRI studies show measurable changes after just 8 weeks." },
                { icon: "🔥", title: "The Eight Limbs", color: "#ef4444", body: "Patanjali's Ashtanga (eight-limbed) path includes: Yama (ethics), Niyama (discipline), Asana (posture), Pranayama (breath), Pratyahara (withdrawal), Dharana (concentration), Dhyana (meditation), and Samadhi (absorption). Most modern yoga focuses on just one limb." },
                { icon: "🏛️", title: "Living Heritage", color: "#a855f7", body: "India's spiritual traditions remain vibrant: Rishikesh hosts 300+ yoga schools, Mysore's Ashtanga institute draws 1,000+ students yearly, and Bihar School of Yoga preserves traditional practices. From Himalayan caves to urban studios, the tradition continues to evolve." },
            ].map(i => `
                <div class="insight-card" style="--insight-color: ${i.color};">
                    <div class="title"><span>${i.icon}</span> <span style="color: ${i.color};">${i.title}</span></div>
                    <div class="body">${i.body}</div>
                </div>
            `).join('');
        }

        if (stats) {
            stats.innerHTML = [
                { value: "300M+", label: "Practitioners Worldwide", icon: "🧘", color: "#f59e0b" },
                { value: "36,000+", label: "Yoga Studios in US Alone", icon: "🏛️", color: "#a855f7" },
                { value: "$37B", label: "Global Yoga Market Size", icon: "💰", color: "#22c55e" },
                { value: "177", label: "UN Member States for IDY", icon: "🌍", color: "#06b6d4" },
                { value: "196", label: "Yoga Sutras (Classical Text)", icon: "📜", color: "#ef4444" },
                { value: "8", label: "Limbs of Ashtanga Yoga", icon: "🕉️", color: "#ec4899" },
            ].map(s => `
                <div class="card" style="text-align: center; padding: 20px;">
                    <div style="font-size: 1.5rem; margin-bottom: 4px;">${s.icon}</div>
                    <div style="font-size: 1.8rem; font-weight: 800; color: ${s.color};">${s.value}</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">${s.label}</div>
                </div>
            `).join('');
        }
    }

    // ─── Meditation Timer ────────────────────────────────────────────
    let timerInterval = null;
    let timerSeconds = 600; // 10 min default
    let timerRunning = false;

    const timerDisplay = document.getElementById('timer-display');
    const timerStatus = document.getElementById('timer-status');
    const timerStartBtn = document.getElementById('timer-start');
    const timerPauseBtn = document.getElementById('timer-pause');
    const timerResetBtn = document.getElementById('timer-reset');
    const timerDurationSelect = document.getElementById('timer-duration');

    function updateTimerDisplay() {
        const mins = Math.floor(timerSeconds / 60);
        const secs = timerSeconds % 60;
        if (timerDisplay) timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    if (timerDurationSelect) {
        timerDurationSelect.addEventListener('change', () => {
            timerSeconds = parseInt(timerDurationSelect.value) * 60;
            timerRunning = false;
            clearInterval(timerInterval);
            updateTimerDisplay();
            if (timerStatus) timerStatus.textContent = 'Ready to begin your practice';
            if (timerStartBtn) timerStartBtn.style.display = '';
            if (timerPauseBtn) timerPauseBtn.style.display = 'none';
        });
    }

    if (timerStartBtn) {
        timerStartBtn.addEventListener('click', () => {
            timerRunning = true;
            timerStartBtn.style.display = 'none';
            timerPauseBtn.style.display = '';
            if (timerStatus) timerStatus.textContent = '🧘 Focus on your breath...';

            timerInterval = setInterval(() => {
                timerSeconds--;
                updateTimerDisplay();
                if (timerSeconds <= 0) {
                    clearInterval(timerInterval);
                    timerRunning = false;
                    if (timerStatus) timerStatus.textContent = '🔔 Practice complete. Namaste 🙏';
                    if (timerPauseBtn) timerPauseBtn.style.display = 'none';
                    if (timerStartBtn) timerStartBtn.style.display = '';
                    // Play a subtle completion sound
                    try {
                        const ctx = new (window.AudioContext || window.webkitAudioContext)();
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.frequency.value = 528; // Love frequency
                        osc.type = 'sine';
                        gain.gain.setValueAtTime(0.3, ctx.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
                        osc.start(ctx.currentTime);
                        osc.stop(ctx.currentTime + 2);
                    } catch (e) { /* Audio not available */ }
                }
            }, 1000);
        });
    }

    if (timerPauseBtn) {
        timerPauseBtn.addEventListener('click', () => {
            if (timerRunning) {
                clearInterval(timerInterval);
                timerRunning = false;
                timerPauseBtn.textContent = '▶ Resume';
                if (timerStatus) timerStatus.textContent = '⏸ Paused';
            } else {
                timerRunning = true;
                timerPauseBtn.textContent = '⏸ Pause';
                if (timerStatus) timerStatus.textContent = '🧘 Focus on your breath...';
                timerInterval = setInterval(() => {
                    timerSeconds--;
                    updateTimerDisplay();
                    if (timerSeconds <= 0) {
                        clearInterval(timerInterval);
                        timerRunning = false;
                        if (timerStatus) timerStatus.textContent = '🔔 Practice complete. Namaste 🙏';
                        timerPauseBtn.style.display = 'none';
                        if (timerStartBtn) timerStartBtn.style.display = '';
                    }
                }, 1000);
            }
        });
    }

    if (timerResetBtn) {
        timerResetBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerRunning = false;
            timerSeconds = parseInt(timerDurationSelect?.value || 10) * 60;
            updateTimerDisplay();
            if (timerStatus) timerStatus.textContent = 'Ready to begin your practice';
            if (timerStartBtn) timerStartBtn.style.display = '';
            if (timerPauseBtn) { timerPauseBtn.style.display = 'none'; timerPauseBtn.textContent = '⏸ Pause'; }
        });
    }

    // ─── Initialize all sections ────────────────────────────────────
    renderMeditation();
    renderChakras();
    renderPranayama();
    renderSages();
    renderInsights();
    updateTimerDisplay();
});
