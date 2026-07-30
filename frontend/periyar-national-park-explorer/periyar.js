/**
 * Periyar National Park Explorer Application Logic
 */

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof PERIYAR_DATA === 'undefined') return;

        const statsGrid = document.getElementById('stats-grid');
        const faunaGrid = document.getElementById('fauna-grid');
        const zoneSelector = document.getElementById('zone-selector');
        const zoneDetails = document.getElementById('zone-details');
        const mapHotspotsLayer = document.getElementById('map-hotspots-layer');
        const mapInfoPopup = document.getElementById('map-info-popup');
        const galleryGrid = document.getElementById('gallery-grid');
        const lightboxModal = document.getElementById('lightbox-modal');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxClose = document.getElementById('lightbox-close');

        // Render Stats
        if (statsGrid && PERIYAR_DATA.quickStats) {
            statsGrid.innerHTML = PERIYAR_DATA.quickStats.map(s => `
                <div class="stat-box">
                    <div style="font-size: 1.8rem; margin-bottom: 0.2rem;">${s.icon}</div>
                    <div class="stat-number">${s.value}</div>
                    <div class="stat-label">${s.label}</div>
                </div>
            `).join('');
        }

        // Render Fauna
        if (faunaGrid && PERIYAR_DATA.elephantsAndFauna) {
            faunaGrid.innerHTML = PERIYAR_DATA.elephantsAndFauna.map(f => `
                <div class="fauna-card glass-card">
                    <div class="fauna-card-header">
                        <div class="fauna-icon">${f.icon}</div>
                        <div>
                            <h3>${f.name}</h3>
                            <span class="fauna-status">${f.status}</span>
                        </div>
                    </div>
                    <p>${f.desc}</p>
                </div>
            `).join('');
        }

        // Render Safari Zones
        if (zoneSelector && zoneDetails && PERIYAR_DATA.safariZones) {
            zoneSelector.innerHTML = PERIYAR_DATA.safariZones.map((z, idx) => `
                <button type="button" class="zone-btn ${idx === 0 ? 'active' : ''}" data-id="${z.id}">
                    ${z.name}
                </button>
            `).join('');

            function selectZone(id) {
                const zObj = PERIYAR_DATA.safariZones.find(z => z.id === id);
                if (!zObj) return;
                zoneDetails.innerHTML = `
                    <h3>${zObj.name}</h3>
                    <div style="font-size: 0.9rem; color: var(--periyar-gold); font-weight: 700; margin-bottom: 0.6rem;">
                        ⏱️ Timings: ${zObj.timing}
                    </div>
                    <p style="color: var(--periyar-text-muted-dark); line-height: 1.6; margin-bottom: 1rem;">
                        ${zObj.desc}
                    </p>
                    <div style="font-size: 0.88rem; padding: 0.8rem; border-radius: 8px; background: rgba(16,185,129,0.12); border-left: 3px solid var(--periyar-emerald); color: var(--periyar-text-primary-dark);">
                        🌟 <strong>Highlight:</strong> ${zObj.highlight}
                    </div>
                `;
                document.querySelectorAll('.zone-btn').forEach(btn => {
                    if (btn.getAttribute('data-id') === id) btn.classList.add('active');
                    else btn.classList.remove('active');
                });
            }

            zoneSelector.addEventListener('click', (e) => {
                const btn = e.target.closest('.zone-btn');
                if (btn) {
                    const id = btn.getAttribute('data-id');
                    selectZone(id);
                }
            });

            selectZone(PERIYAR_DATA.safariZones[0].id);
        }

        // Render Map Hotspots
        if (mapHotspotsLayer && PERIYAR_DATA.mapHotspots) {
            mapHotspotsLayer.innerHTML = PERIYAR_DATA.mapHotspots.map(h => `
                <button type="button" class="map-pin-btn" style="left: ${(h.x/1000)*100}%; top: ${(h.y/600)*100}%;" data-id="${h.id}">
                    📍 ${h.name}
                </button>
            `).join('');

            mapHotspotsLayer.addEventListener('click', (e) => {
                const pin = e.target.closest('.map-pin-btn');
                if (pin && mapInfoPopup) {
                    const id = pin.getAttribute('data-id');
                    const hObj = PERIYAR_DATA.mapHotspots.find(h => h.id === id);
                    if (hObj) {
                        mapInfoPopup.innerHTML = `
                            <h4 style="font-size: 1.1rem; color: var(--periyar-gold); margin-bottom: 0.3rem;">📍 ${hObj.name}</h4>
                            <p style="font-size: 0.9rem; color: var(--periyar-text-muted-dark);">${hObj.desc}</p>
                        `;
                        mapInfoPopup.classList.remove('hidden');
                    }
                }
            });
        }

        // Render Gallery
        if (galleryGrid && PERIYAR_DATA.gallery) {
            galleryGrid.innerHTML = PERIYAR_DATA.gallery.map(g => `
                <div class="gallery-item" data-src="${g.src}" data-caption="${g.caption}" tabindex="0" role="button" aria-label="${g.caption}">
                    <img src="${g.src}" alt="${g.caption}" />
                    <div class="gallery-caption">${g.caption}</div>
                </div>
            `).join('');

            document.querySelectorAll('.gallery-item').forEach(item => {
                const openLightbox = () => {
                    const src = item.getAttribute('data-src');
                    const cap = item.getAttribute('data-caption');
                    if (lightboxImg && lightboxCaption && lightboxModal) {
                        lightboxImg.src = src;
                        lightboxCaption.innerHTML = `<div class="lightbox-caption-text">${cap}</div>`;
                        lightboxModal.classList.remove('hidden');
                    }
                };
                item.addEventListener('click', openLightbox);
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox();
                    }
                });
            });
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                if (lightboxModal) lightboxModal.classList.add('hidden');
            });
        }

        if (lightboxModal) {
            lightboxModal.addEventListener('click', (e) => {
                if (e.target === lightboxModal) lightboxModal.classList.add('hidden');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal && !lightboxModal.classList.contains('hidden')) {
                lightboxModal.classList.add('hidden');
            }
        });
    });
}
