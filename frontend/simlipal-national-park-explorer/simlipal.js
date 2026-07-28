/**
 * Simlipal National Park Explorer — Interactive Logic
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        renderQuickStats();
        renderWaterfalls();
        renderElephantsWildlife();
        renderForestTypes();
        renderTribalCommunities();
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
        if (!container || typeof SIMLIPAL_INFO === 'undefined') return;

        var html = '';
        SIMLIPAL_INFO.quickStats.forEach(function (st) {
            html +=
                '<div class="stat-card glass-card">' +
                '<div class="stat-icon">' + st.icon + '</div>' +
                '<span class="stat-value">' + st.value + '</span>' +
                '<span class="stat-label">' + st.label + '</span>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderWaterfalls() {
        var container = document.getElementById('waterfalls-grid');
        if (!container || typeof WATERFALLS === 'undefined') return;

        var html = '';
        WATERFALLS.forEach(function (wf) {
            html +=
                '<div class="fall-card glass-card">' +
                '<div style="font-size:2rem; margin-bottom:0.4rem;">' + wf.icon + '</div>' +
                '<h3 style="font-family:var(--font-heading); font-size:1.6rem; color:var(--gold-bright); margin-bottom:0.4rem;">' + wf.name + '</h3>' +
                '<div class="fall-height-meter">' +
                '<span style="font-size:1.4rem; font-weight:800; color:var(--waterfall-blue);">' + wf.height + '</span>' +
                '<span style="font-size:0.85rem; color:var(--simlipal-text-muted-dark);">&bull; ' + wf.type + '</span>' +
                '</div>' +
                '<p style="font-size:0.92rem; color:var(--simlipal-text-muted-dark); line-height:1.65; margin-bottom:1rem;">' + wf.description + '</p>' +
                '<div style="font-size:0.85rem; color:var(--silk-amber);">🌊 <strong>Feeder River:</strong> ' + wf.river + '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderElephantsWildlife() {
        var container = document.getElementById('wildlife-grid');
        if (!container || typeof ELEPHANTS_WILDLIFE === 'undefined') return;

        var html = '';
        ELEPHANTS_WILDLIFE.forEach(function (w) {
            html +=
                '<div class="glass-card" style="overflow:hidden; display:flex; flex-direction:column;">' +
                '<div style="height:190px; position:relative; overflow:hidden; background:#0f172a;">' +
                '<img src="' + w.image + '" alt="' + w.name + '" style="width:100%; height:100%; object-fit:cover;" loading="lazy" onerror="this.src=\'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elephant_safari_in_Kaziranga.jpg/800px-Elephant_safari_in_Kaziranga.jpg\'">' +
                '<span style="position:absolute; top:0.8rem; right:0.8rem; padding:0.3rem 0.7rem; border-radius:999px; font-size:0.75rem; font-weight:700; background:rgba(220,38,38,0.9); color:#fff;">' + w.status + '</span>' +
                '</div>' +
                '<div style="padding:1.5rem; display:flex; flex-direction:column; flex-grow:1;">' +
                '<h3 style="font-family:var(--font-heading); font-size:1.3rem; margin-bottom:0.2rem;">' + w.name + '</h3>' +
                '<div style="font-style:italic; font-size:0.85rem; color:var(--gold-bright); margin-bottom:0.8rem;">' + w.scientificName + '</div>' +
                '<p style="font-size:0.9rem; color:var(--simlipal-text-muted-dark); line-height:1.55;">' + w.description + '</p>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderForestTypes() {
        var container = document.getElementById('forest-grid');
        if (!container || typeof FOREST_TYPES === 'undefined') return;

        var html = '';
        FOREST_TYPES.forEach(function (ft) {
            html +=
                '<div class="forest-card glass-card">' +
                '<div style="font-size:2rem; margin-bottom:0.4rem;">' + ft.icon + '</div>' +
                '<h3>' + ft.name + '</h3>' +
                '<p style="font-size:0.9rem; color:var(--simlipal-text-muted-dark); line-height:1.6; margin-bottom:1rem;">' + ft.description + '</p>' +
                '<div style="font-size:0.82rem; padding:0.6rem 0.8rem; border-radius:8px; background:rgba(245,158,11,0.1); border-left:3px solid var(--silk-amber); color:var(--gold-bright);">' +
                '🌿 <strong>Key Species:</strong> ' + ft.flora +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderTribalCommunities() {
        var container = document.getElementById('tribal-grid');
        if (!container || typeof TRIBAL_COMMUNITIES === 'undefined') return;

        var html = '';
        TRIBAL_COMMUNITIES.forEach(function (tr) {
            html +=
                '<div class="tribal-card glass-card">' +
                '<div style="font-size:2rem; margin-bottom:0.4rem;">' + tr.icon + '</div>' +
                '<h3 style="font-family:var(--font-heading); font-size:1.3rem; color:var(--gold-bright); margin-bottom:0.6rem;">' + tr.name + '</h3>' +
                '<p style="font-size:0.92rem; color:var(--simlipal-text-muted-dark); line-height:1.6;">' + tr.description + '</p>' +
                '</div>';
        });
        container.innerHTML = html;
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
                '<p style="font-size:0.92rem; color:var(--simlipal-text-muted-dark); line-height:1.6;">' + item.description + '</p>' +
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
            var icon = spot.category === 'gate' ? '🚪' : spot.category === 'fall' ? '🌊' : spot.category === 'tiger' ? '🐅' : '🐊';
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
