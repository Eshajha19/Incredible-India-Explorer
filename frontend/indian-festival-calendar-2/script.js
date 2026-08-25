// Indian Festival Calendar Explorer — Script Module

document.addEventListener('DOMContentLoaded', () => {
    // ─── Tab Switching ────────────────────────────────────────────────
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');
            const target = document.getElementById('tab-' + btn.dataset.tab);
            if (target) target.style.display = 'block';
        });
    });

    renderCalendar();
    renderFestivals();
    renderRegional();
    renderCategories();
    renderStats();
    renderInsights();

    // ─── Calendar View ───────────────────────────────────────────────
    function renderCalendar() {
        const grid = document.getElementById('month-grid');
        if (!grid) return;
        grid.innerHTML = FESTIVAL_MONTHS.map(m => {
            const count = m.festivals.length;
            return `
                <div class="month-card" data-month="${m.month}" onclick="showMonth(${m.month})">
                    <div style="font-size: 1.3rem; margin-bottom: 4px;">📅</div>
                    <div class="name">${m.name}</div>
                    <div class="count">${count} festival${count > 1 ? 's' : ''}</div>
                </div>
            `;
        }).join('');

        window.showMonth = function(month) {
            const m = FESTIVAL_MONTHS.find(f => f.month === month);
            if (!m) return;
            document.querySelectorAll('.month-card').forEach(c => c.classList.remove('active'));
            document.querySelector(`.month-card[data-month="${month}"]`)?.classList.add('active');

            const detail = document.getElementById('month-detail');
            detail.style.display = 'block';

            // Find festivals in this month
            const monthFestivals = FESTIVALS.filter(f => f.month === month);
            const regionalInMonth = REGIONAL_FESTIVALS.filter(r => {
                if (r.season === "Winter" && (month === 1 || month === 12 || month === 11)) return true;
                if (r.season === "Spring" && (month === 2 || month === 3 || month === 4)) return true;
                if (r.season === "Autumn" && (month === 9 || month === 10 || month === 11)) return true;
                if (r.season === "Summer" && (month === 5 || month === 6 || month === 7)) return true;
                return false;
            });

            detail.innerHTML = `
                <div class="card-title">📅 ${m.name} — Festivals & Celebrations</div>
                ${monthFestivals.length > 0 ? `
                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 0.9rem; font-weight: 600; margin-bottom: 12px; color: var(--accent-gold);">Major Festivals</div>
                        ${monthFestivals.map(f => `
                            <div style="padding: 12px; border-radius: 12px; background: var(--bg-secondary); border-left: 3px solid ${f.color}; margin-bottom: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="font-weight: 700;">${f.icon} ${f.name}</div>
                                        <div style="font-size: 0.8rem; color: var(--text-secondary);">${f.english} · ${f.duration} day${f.duration > 1 ? 's' : ''}</div>
                                    </div>
                                    <span class="badge" style="background: ${f.color}20; color: ${f.color}; border-color: ${f.color}40;">${f.category}</span>
                                </div>
                                <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 8px; line-height: 1.5;">${f.description}</div>
                                <div style="margin-top: 8px;">
                                    <div style="font-size: 0.7rem; color: var(--text-secondary);">Traditions: ${f.traditions.join(' · ')}</div>
                                    <div style="font-size: 0.7rem; color: var(--accent-gold); margin-top: 4px;">Special Food: ${f.food.join(', ')}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p style="color: var(--text-secondary); margin-bottom: 16px;">No major festivals listed for this month.</p>'}
                ${regionalInMonth.length > 0 ? `
                    <div>
                        <div style="font-size: 0.9rem; font-weight: 600; margin-bottom: 12px; color: var(--accent-purple);">Seasonal Regional Celebrations</div>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                            ${regionalInMonth.map(r => `
                                <div style="padding: 8px 14px; border-radius: 12px; background: ${r.color}15; border: 1px solid ${r.color}30; font-size: 0.8rem;">
                                    <span style="color: ${r.color};">${r.icon} ${r.name}</span>
                                    <span style="color: var(--text-secondary);"> — ${r.region}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            `;

            detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        };
    }

    // ─── Major Festivals ─────────────────────────────────────────────
    let festivalFilter = 'all';
    function renderFestivals() {
        const grid = document.getElementById('festivals-grid');
        if (!grid) return;

        const filtered = festivalFilter === 'all' ? FESTIVALS : FESTIVALS.filter(f => f.category === festivalFilter);

        grid.innerHTML = filtered.map(f => `
            <div class="festival-card" style="--fest-color: ${f.color};">
                <div class="header">
                    <div>
                        <div class="name" style="color: ${f.color};">${f.icon} ${f.name}</div>
                        <div class="english">${f.english}</div>
                    </div>
                    <span class="badge" style="background: ${f.color}20; color: ${f.color}; border: 1px solid ${f.color}40;">${f.category}</span>
                </div>
                <div class="desc">${f.description}</div>
                <div class="meta-row">
                    <span>📅 ${f.duration} day${f.duration > 1 ? 's' : ''}</span>
                    <span>🗺️ ${f.region}</span>
                    <span>⭐ ${f.significance}</span>
                </div>
                <div style="margin-bottom: 8px;">
                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 6px;"><strong>Traditions:</strong></div>
                    <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                        ${f.traditions.map(t => `<span class="badge" style="background: ${f.color}10; color: ${f.color}; border-color: ${f.color}30; font-size: 0.65rem;">${t}</span>`).join('')}
                    </div>
                </div>
                <div>
                    <div style="font-size: 0.75rem; color: var(--accent-gold);"><strong>Food:</strong> ${f.food.join(', ')}</div>
                </div>
            </div>
        `).join('');
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            festivalFilter = btn.dataset.filter;
            renderFestivals();
        });
    });

    // ─── Regional Festivals ──────────────────────────────────────────
    function renderRegional() {
        const grid = document.getElementById('regional-grid');
        if (!grid) return;
        grid.innerHTML = REGIONAL_FESTIVALS.map(r => `
            <div class="regional-card" style="--reg-color: ${r.color};">
                <div class="name" style="color: ${r.color};">${r.icon} ${r.name}</div>
                <div class="region">📍 ${r.region} · 🌤️ ${r.season}</div>
                <div class="desc">${r.description}</div>
            </div>
        `).join('');
    }

    // ─── Categories ──────────────────────────────────────────────────
    function renderCategories() {
        const container = document.getElementById('category-sections');
        if (!container) return;
        const categories = {};
        FESTIVALS.forEach(f => {
            if (!categories[f.category]) categories[f.category] = [];
            categories[f.category].push(f);
        });

        const catColors = { Hindu: "#f59e0b", Muslim: "#22c55e", Christian: "#3b82f6", Sikh: "#eab308", Buddhist: "#a855f7" };

        container.innerHTML = Object.entries(categories).map(([cat, festivals]) => `
            <div class="category-section">
                <div class="category-header" style="background: ${catColors[cat] || '#888'}15; border-left: 4px solid ${catColors[cat] || '#888'};">
                    <span style="font-size: 1.2rem;">${cat === 'Hindu' ? '🕉️' : cat === 'Muslim' ? '☪️' : cat === 'Christian' ? '✝️' : cat === 'Sikh' ? '🙏' : '☸️'}</span>
                    <span style="color: ${catColors[cat] || '#888'};">${cat} Festivals (${festivals.length})</span>
                </div>
                ${festivals.map(f => `
                    <div style="padding: 12px; border-radius: 12px; background: var(--bg-secondary); border-left: 3px solid ${f.color}; margin-bottom: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-weight: 600;">${f.icon} ${f.name} <span style="color: var(--text-secondary); font-weight: 400; font-size: 0.85rem;">— ${f.english}</span></div>
                                <div style="font-size: 0.75rem; color: var(--text-secondary);">${f.region} · ${f.duration} day${f.duration > 1 ? 's' : ''}</div>
                            </div>
                            <span class="badge" style="background: ${f.color}20; color: ${f.color};">${f.significance.substring(0, 30)}...</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }

    // ─── Stats ───────────────────────────────────────────────────────
    function renderStats() {
        const grid = document.getElementById('stats-grid');
        if (!grid) return;
        grid.innerHTML = [
            { value: "100+", label: "Major Festivals per Year", icon: "🎊", color: "#ff6b35" },
            { value: "1.4B", label: "People Celebrate Together", icon: "👥", color: "#22c55e" },
            { value: "30+", label: "Countries with Indian Festivals", icon: "🌍", color: "#3b82f6" },
            { value: "₹5L Cr", label: "Festival Season Economy", icon: "💰", color: "#f0c040" },
            { value: "28", label: "States with Unique Festivals", icon: "🗺️", color: "#a855f7" },
            { value: "365", label: "Days of Celebration", icon: "📅", color: "#ec4899" },
        ].map(s => `
            <div class="stat-card">
                <div style="font-size: 1.5rem; margin-bottom: 8px;">${s.icon}</div>
                <div class="value" style="color: ${s.color};">${s.value}</div>
                <div class="label">${s.label}</div>
            </div>
        `).join('');
    }

    // ─── Insights ────────────────────────────────────────────────────
    function renderInsights() {
        const container = document.getElementById('insights-container');
        if (!container) return;
        container.innerHTML = FESTIVAL_INSIGHTS.map(i => `
            <div class="insight-card" style="--insight-color: ${i.color};">
                <div class="title"><span style="font-size: 1.2rem;">${i.icon}</span> <span style="color: ${i.color};">${i.title}</span></div>
                <div class="body">${i.body}</div>
            </div>
        `).join('');
    }
});
