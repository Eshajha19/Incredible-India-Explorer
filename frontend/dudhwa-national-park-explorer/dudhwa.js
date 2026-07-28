/**
 * Dudhwa National Park Explorer — Interactive Logic
 */

(function () {
    'use strict';

    var activeZoneId = 'sonaripur';

    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        renderQuickStats();
        renderTigersWildlife();
        renderSafariZones();
        renderHistoryTimeline();
        renderInteractiveMap();
        renderGalleryGrid();
        bindEvents();
    });

    function initTheme() {
        var savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }

    function bindEvents() {
        var themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', function () {
                document.body.classList.toggle('light-theme');
                var isLight = document.body.classList.contains('light-theme');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            });
        }

        var lbClose = document.getElementById('lightbox-close');
        if (lbClose) lbClose.addEventListener('click', closeLightbox);

        var lbModal = document.getElementById('lightbox-modal');
        if (lbModal) {
            lbModal.addEventListener('click', function (e) {
                if (e.target === lbModal) closeLightbox();
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    function renderQuickStats() {
        var container = document.getElementById('stats-grid');
        if (!container || typeof DUDHWA_INFO === 'undefined') return;

        var html = '';
        DUDHWA_INFO.quickStats.forEach(function (st) {
            html +=
                '<div class="stat-card glass-card">' +
                '<div class="stat-icon">' + st.icon + '</div>' +
                '<span class="stat-value">' + st.value + '</span>' +
                '<span class="stat-label">' + st.label + '</span>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderTigersWildlife() {
        var container = document.getElementById('wildlife-grid');
        if (!container || typeof TIGERS_WILDLIFE === 'undefined') return;

        var html = '';
        TIGERS_WILDLIFE.forEach(function (w) {
            var statusSlug = w.status.toLowerCase().replace(/\s+/g, '-');
            html +=
                '<div class="glass-card" style="overflow:hidden; display:flex; flex-direction:column;">' +
                '<div style="height:190px; position:relative; overflow:hidden; background:#0f172a;">' +
                '<img src="' + w.image + '" alt="' + w.name + '" style="width:100%; height:100%; object-fit:cover;" loading="lazy" onerror="this.src=\'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Tiger_in_Ranthambhore.jpg/800px-Tiger_in_Ranthambhore.jpg\'">' +
                '<span style="position:absolute; top:0.8rem; right:0.8rem; padding:0.3rem 0.7rem; border-radius:999px; font-size:0.75rem; font-weight:700; background:rgba(217,119,6,0.9); color:#fff;">' + w.status + '</span>' +
                '</div>' +
                '<div style="padding:1.5rem; display:flex; flex-direction:column; flex-grow:1;">' +
                '<h3 style="font-family:var(--font-heading); font-size:1.3rem; margin-bottom:0.2rem;">' + w.name + '</h3>' +
                '<div style="font-style:italic; font-size:0.85rem; color:var(--gold-bright); margin-bottom:0.8rem;">' + w.scientificName + '</div>' +
                '<p style="font-size:0.9rem; color:var(--dudhwa-text-muted-dark); line-height:1.55;">' + w.description + '</p>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderSafariZones() {
        var selector = document.getElementById('zone-list-selector');
        var detailsPanel = document.getElementById('zone-details-panel');
        if (!selector || !detailsPanel || typeof SAFARI_ZONES === 'undefined') return;

        var selectorHtml = '';
        SAFARI_ZONES.forEach(function (z) {
            var activeClass = z.id === activeZoneId ? 'active' : '';
            selectorHtml +=
                '<button type="button" class="zone-btn ' + activeClass + '" data-zone-id="' + z.id + '">' +
                '<h4>' + z.name + '</h4>' +
                '<span class="zone-badge">🚜 ' + z.type.split('&')[0] + '</span>' +
                '</button>';
        });
        selector.innerHTML = selectorHtml;

        selector.querySelectorAll('.zone-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                activeZoneId = btn.dataset.zone-id;
                selector.querySelectorAll('.zone-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                updateZoneDetails();
            });
        });

        updateZoneDetails();
    }

    function updateZoneDetails() {
        var detailsPanel = document.getElementById('zone-details-panel');
        if (!detailsPanel || typeof SAFARI_ZONES === 'undefined') return;

        var zone = SAFARI_ZONES.find(function (z) { return z.id === activeZoneId; }) || SAFARI_ZONES[0];

        var html =
            '<h3>' + zone.name + '</h3>' +
            '<div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin:0.8rem 0 1.2rem;">' +
            '<span style="padding:0.3rem 0.8rem; border-radius:999px; font-size:0.82rem; background:rgba(255,255,255,0.08);">⏱️ ' + zone.timing + '</span>' +
            '<span style="padding:0.3rem 0.8rem; border-radius:999px; font-size:0.82rem; background:rgba(255,255,255,0.08);">🚜 ' + zone.type + '</span>' +
            '</div>' +
            '<p style="line-height:1.65; color:var(--dudhwa-text-muted-dark); margin-bottom:1.2rem;">' + zone.description + '</p>' +
            '<div style="font-size:0.9rem; padding:0.8rem; border-radius:8px; background:rgba(217,119,6,0.1); border-left:3px solid var(--terai-amber); color:var(--gold-bright);">' +
            '📍 <strong>Key Zone Highlights:</strong> ' + zone.highlights +
            '</div>';

        detailsPanel.innerHTML = html;
    }

    function renderHistoryTimeline() {
        var container = document.getElementById('timeline-container');
        if (!container || typeof HISTORY_TIMELINE === 'undefined') return;

        var html = '';
        HISTORY_TIMELINE.forEach(function (item) {
            html +=
                '<div class="timeline-item">' +
                '<div class="timeline-dot"></div>' +
                '<div class="timeline-card glass-card">' +
                '<div style="font-weight:800; font-size:1.2rem; color:var(--gold-bright); margin-bottom:0.4rem;">' + item.year + '</div>' +
                '<h4>' + item.title + '</h4>' +
                '<p style="font-size:0.92rem; color:var(--dudhwa-text-muted-dark); line-height:1.6;">' + item.description + '</p>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderInteractiveMap() {
        var container = document.getElementById('map-hotspots-layer');
        var infoPopup = document.getElementById('map-info-popup');
        if (!container || typeof MAP_HOTSPOTS === 'undefined') return;

        var html = '';
        MAP_HOTSPOTS.forEach(function (spot) {
            var icon = spot.category === 'gate' ? '🚪' : spot.category === 'rhino' ? '🦏' : spot.category === 'lake' ? '🌊' : '🌾';
            html +=
                '<button type="button" class="map-hotspot-pin" style="left:' + spot.x + '%; top:' + spot.y + '%;" data-spot-id="' + spot.id + '" aria-label="' + spot.name + '">' +
                icon +
                '</button>';
        });
        container.innerHTML = html;

        container.querySelectorAll('.map-hotspot-pin').forEach(function (pin) {
            pin.addEventListener('click', function () {
                var spot = MAP_HOTSPOTS.find(function (s) { return s.id === pin.dataset.spot-id; });
                if (spot && infoPopup) {
                    infoPopup.innerHTML =
                        '<h4>' + spot.name + '</h4>' +
                        '<p>' + spot.description + '</p>';
                    infoPopup.classList.remove('hidden');
                }
            });
        });
    }

    function renderGalleryGrid() {
        var container = document.getElementById('gallery-grid');
        if (!container || typeof GALLERY_IMAGES === 'undefined') return;

        var html = '';
        GALLERY_IMAGES.forEach(function (img, idx) {
            html +=
                '<div class="gallery-item" data-idx="' + idx + '">' +
                '<img class="gallery-img" src="' + img.url + '" alt="' + img.title + '" loading="lazy">' +
                '<div class="gallery-overlay">' +
                '<h4 style="color:#fff;">' + img.title + '</h4>' +
                '<p style="color:#cbd5e1; font-size:0.82rem;">' + img.caption + '</p>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;

        container.querySelectorAll('.gallery-item').forEach(function (item) {
            item.addEventListener('click', function () {
                openLightbox(parseInt(item.dataset.idx, 10));
            });
        });
    }

    function openLightbox(idx) {
        if (typeof GALLERY_IMAGES === 'undefined' || !GALLERY_IMAGES[idx]) return;
        var modal = document.getElementById('lightbox-modal');
        var imgEl = document.getElementById('lightbox-img');
        var capEl = document.getElementById('lightbox-caption');
        if (!modal || !imgEl || !capEl) return;

        imgEl.src = GALLERY_IMAGES[idx].url;
        capEl.textContent = GALLERY_IMAGES[idx].title + ' — ' + GALLERY_IMAGES[idx].caption;
        modal.classList.remove('hidden');
    }

    function closeLightbox() {
        var modal = document.getElementById('lightbox-modal');
        if (modal) modal.classList.add('hidden');
    }
})();
