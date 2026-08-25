// Indian Textile Heritage Explorer — Script Module

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

    renderWeaving();
    renderEmbroidery();
    renderCrafts();
    renderProcess();
    renderSustainability();
    renderStats();
    renderInsights();

    // ─── Weaving Traditions ──────────────────────────────────────────
    function renderWeaving() {
        const grid = document.getElementById('weaving-grid');
        if (!grid) return;
        grid.innerHTML = WEAVING_TRADITIONS.map(t => `
            <div class="textile-card" style="--card-color: ${t.color};">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                    <div class="name" style="color: ${t.color};">${t.name}</div>
                    ${t.iconic ? `<span class="badge" style="background: ${t.color}20; color: ${t.color}; border-color: ${t.color}40;">⭐ Iconic</span>` : ''}
                </div>
                <div class="origin">📍 ${t.origin} · 📅 ${t.period}</div>
                <div class="desc">${t.description}</div>
                <div style="margin-bottom: 8px;">
                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;"><strong>Fabric:</strong> ${t.fabric}</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary);"><strong>Process:</strong> ${t.process}</div>
                </div>
                <div style="margin-bottom: 8px;">
                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 6px;"><strong>Motifs:</strong></div>
                    <div class="meta">
                        ${t.motifs.map(m => `<span class="badge" style="background: ${t.color}15; color: ${t.color}; border-color: ${t.color}30;">${m}</span>`).join('')}
                    </div>
                </div>
                <div style="display: flex; gap: 12px; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border);">
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">🏷️ ${t.certification}</span>
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">💰 ${t.price}</span>
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">👥 ${t.weavers} weavers</span>
                </div>
            </div>
        `).join('');
    }

    // ─── Embroidery Styles ───────────────────────────────────────────
    function renderEmbroidery() {
        const grid = document.getElementById('embroidery-grid');
        if (!grid) return;
        grid.innerHTML = EMBROIDERY_STYLES.map(e => `
            <div class="embroidery-card" style="--emb-color: ${e.color};">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                    <div>
                        <div class="name" style="color: ${e.color}; font-size: 1.1rem; font-weight: 700;">${e.name}</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary);">📍 ${e.origin}</div>
                    </div>
                    <span class="badge" style="background: ${e.color}20; color: ${e.color}; border-color: ${e.color}40;">${e.difficulty}</span>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">${e.description}</div>
                <div style="margin-bottom: 8px;">
                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 6px;"><strong>Key Stitches:</strong></div>
                    <div class="stitch-list">
                        ${e.stitches.map(s => `<span class="stitch-badge" style="border-color: ${e.color}40; color: ${e.color};">${s}</span>`).join('')}
                    </div>
                </div>
                <div style="margin-top: 12px;">
                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 6px;"><strong>Used in:</strong> ${e.usage.join(' · ')}</div>
                </div>
            </div>
        `).join('');
    }

    // ─── Textile Crafts ──────────────────────────────────────────────
    function renderCrafts() {
        const grid = document.getElementById('crafts-grid');
        if (!grid) return;
        grid.innerHTML = TEXTILE_CRAFTS.map(c => `
            <div class="craft-card" style="--craft-color: ${c.color};">
                <div class="name" style="color: ${c.color}; font-size: 1.1rem; font-weight: 700; margin-bottom: 4px;">${c.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">📍 ${c.origin}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">${c.description}</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div style="padding: 10px; border-radius: 8px; background: rgba(0,0,0,0.2);">
                        <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 4px;"><strong>Tools</strong></div>
                        <div style="font-size: 0.8rem; color: var(--text-primary);">${c.tools.join(', ')}</div>
                    </div>
                    <div style="padding: 10px; border-radius: 8px; background: rgba(0,0,0,0.2);">
                        <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 4px;"><strong>Natural Dyes</strong></div>
                        <div style="font-size: 0.8rem; color: var(--text-primary);">${c.dyes.join(', ')}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ─── Weaving Process ─────────────────────────────────────────────
    function renderProcess() {
        const container = document.getElementById('process-steps');
        if (!container) return;
        const steps = [
            { step: 1, title: "Fiber Harvesting", desc: "Cotton bolls picked, silk cocoons harvested, or wool sheared from sheep. Raw fibers sorted by quality and length.", icon: "🌾" },
            { step: 2, title: "Fiber Processing", desc: "Cotton ginned (seeds removed), silk reeled from cocoons, wool scoured and carded. Fibers cleaned and aligned.", icon: "🔄" },
            { step: 3, title: "Spinning (Charkha)", desc: "Fibers spun into yarn using traditional charkha (spinning wheel). Thread thickness and twist determine fabric character.", icon: "🪡" },
            { step: 4, title: "Dyeing", desc: "Yarn dyed using natural (plant/mineral) or synthetic dyes. Multiple dipping for depth. Ikat involves pre-dyeing before weaving.", icon: "🎨" },
            { step: 5, title: "Warp Preparation", desc: "Long threads (warp) measured, wound onto the beam, and threaded through heddles and reed. This defines the fabric width.", icon: "📐" },
            { step: 6, title: "Weaving", desc: "Warp threads interlace with weft on the handloom. The weaver operates pedals (treadles) and throws the shuttle. Rhythmic, meditative work.", icon: "🧵" },
            { step: 7, title: "Zari / Embellishment", desc: "For luxury textiles: gold/silver thread (zari) woven in, sequins, stones, or mirror work added during or after weaving.", icon: "✨" },
            { step: 8, title: "Washing & Finishing", desc: "Fabric washed to remove sizing, softened, and pressed. Some textiles require multiple washings (Kalamkari: 20+ rounds).", icon: "💧" },
            { step: 9, title: "Quality Inspection", desc: "Finished fabric inspected for consistency, pattern accuracy, thread count, and defects. Master weavers assess each piece.", icon: "🔍" },
            { step: 10, title: "Cutting & Stitching", desc: "Fabric cut and tailored into sarees, kurtas, dupattas, or other garments. Edges finished with borders or piping.", icon: "✂️" },
        ];
        container.innerHTML = steps.map(s => `
            <div class="process-step">
                <div style="display: flex; align-items: start; gap: 12px;">
                    <span style="font-size: 1.5rem;">${s.icon}</span>
                    <div>
                        <div style="font-weight: 700; color: var(--accent-gold); margin-bottom: 4px;">Step ${s.step}: ${s.title}</div>
                        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${s.desc}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ─── Sustainability ──────────────────────────────────────────────
    function renderSustainability() {
        const grid = document.getElementById('sustainability-grid');
        if (!grid) return;
        grid.innerHTML = SUSTAINABILITY_FACTS.map(f => `
            <div class="insight-card" style="--insight-color: ${f.color};">
                <div class="title"><span style="font-size: 1.2rem;">${f.icon}</span> <span style="color: ${f.color};">${f.title}</span></div>
                <div class="body">${f.body}</div>
            </div>
        `).join('');
    }

    // ─── Stats ──────────────────────────────────────────────────────
    function renderStats() {
        const grid = document.getElementById('stats-grid');
        if (!grid) return;
        grid.innerHTML = TEXTILE_STATISTICS.map(s => `
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
        const insights = [
            { icon: "🧵", title: "The Golden Thread of Trade", color: "#d4a24e", body: "India's textile trade dates back to 3000 BCE. Indus Valley civilizations exported cotton to Mesopotamia. The Roman Empire called Indian muslin 'woven wind.' The Silk Route carried Indian textiles as far as Rome and China, making textiles India's most valuable export for millennia." },
            { icon: "👑", title: "Mughal Patronage", color: "#e07b39", body: "The Mughal court elevated Indian textiles to art. Emperor Akbar established royal karkhanas (workshops) employing 10,000+ artisans. Banarasi brocades, Chikan embroidery, and Kalamkari painting all reached their zenith under Mughal patronage and Persian-Indian fusion aesthetics." },
            { icon: "🌍", title: "India's Textile Diplomacy", color: "#22c55e", body: "Indian textiles shaped world history. British East India Company's desire to control Indian cotton trade led to colonial expansion. Mahatma Gandhi's khadi movement turned textiles into a weapon of resistance — spinning charkha became the symbol of Indian independence." },
            { icon: "🔬", title: "Ancient Technology", color: "#06b6d4", body: "Dhaka muslin — so fine it was called 'woven air' — had a thread count of 600+ (modern luxury cotton is 400). The secret? An extinct cotton variety (Phuti karpas) and river water from the Meghna. Rediscovery efforts are underway using DNA analysis." },
            { icon: "💎", title: "Patola — The Queen of Silks", color: "#ec4899", body: "A single Patola saree takes 4-6 months to weave. The double ikat technique requires both warp and weft threads to be resist-dyed with mathematical precision — a misalignment of even 1mm ruins the pattern. Only 300 families in Patan still practice this 900-year-old art." },
            { icon: "🌿", title: "The Sustainable Choice", color: "#22c55e", body: "In an era of fast fashion (the world's 2nd largest polluter), Indian handloom textiles are inherently sustainable: zero electricity, zero chemical dyes (traditionally), 100% biodegradable, and supporting 4.3 million families. Choosing handloom is choosing the planet." },
        ];
        container.innerHTML = insights.map(i => `
            <div class="insight-card" style="--insight-color: ${i.color};">
                <div class="title"><span style="font-size: 1.2rem;">${i.icon}</span> <span style="color: ${i.color};">${i.title}</span></div>
                <div class="body">${i.body}</div>
            </div>
        `).join('');
    }
});
