/**
 * Kaziranga National Park Explorer — Interactive Logic
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        renderQuickStats();
        renderRhinoBodyParts();
        renderWildlife();
        renderBirdSpecies();
        renderSafariOptions();
        renderConservationTimeline();
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
        if (!container || typeof KAZIRANGA_INFO === 'undefined') return;

        var html = '';
        KAZIRANGA_INFO.quickStats.forEach(function (st) {
            html +=
                '<div class="stat-card glass-card">' +
                '<div class="stat-icon">' + st.icon + '</div>' +
                '<span class="stat-value">' + st.value + '</span>' +
                '<span class="stat-label">' + st.label + '</span>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderRhinoBodyParts() {
        var container = document.getElementById('rhino-stats');
        if (!container || typeof RHINO_BODY_PARTS === 'undefined') return;

        var html = '';
        RHINO_BODY_PARTS.forEach(function (part) {
            html +=
                '<div class="rhino-stat-item">' +
                '<span class="stat-emoji">' + part.icon + '</span>' +
                '<span class="stat-val">' + part.value + '</span>' +
                '<span class="stat-lbl">' + part.label + '</span>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderWildlife() {
        var container = document.getElementById('wildlife-grid');
        if (!container || typeof WILDLIFE === 'undefined') return;

        var html = '';
        WILDLIFE.forEach(function (w) {
            html +=
                '<div class="glass-card" style="overflow:hidden; display:flex; flex-direction:column;">' +
                '<div style="height:190px; position:relative; overflow:hidden; background:#0f172a;">' +
                '<img src="' + w.image + '" alt="' + w.name + '" style="width:100%; height:100%; object-fit:cover;" loading="lazy" onerror="this.src=\'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elephant_safari_in_Kaziranga.jpg/800px-Elephant_safari_in_Kaziranga.jpg\'">' +
                '<span style="position:absolute; top:0.8rem; right:0.8rem; padding:0.3rem 0.7rem; border-radius:999px; font-size:0.75rem; font-weight:700; background:rgba(220,38,38,0.9); color:#fff;">' + w.status + '</span>' +
                '</div>' +
                '<div style="padding:1.5rem; display:flex; flex-direction:column; flex-grow:1;">' +
                '<h3 style="font-family:var(--font-heading); font-size:1.3rem; margin-bottom:0.2rem;">' + w.name + '</h3>' +
                '<div style="font-style:italic; font-size:0.85rem; color:var(--gold-bright); margin-bottom:0.8rem;">' + w.scientificName + '</div>' +
                '<p style="font-size:0.9rem; color:var(--kaziranga-text-muted-dark); line-height:1.55;">' + w.description + '</p>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderBirdSpecies() {
        var container = document.getElementById('birds-grid');
        if (!container || typeof BIRD_SPECIES === 'undefined') return;

        var html = '';
        BIRD_SPECIES.forEach(function (b) {
            html +=
                '<div class="glass-card" style="overflow:hidden; display:flex; flex-direction:column;">' +
                '<div style="height:170px; position:relative; overflow:hidden; background:#0f172a;">' +
                '<img src="' + b.image + '" alt="' + b.name + '" style="width:100%; height:100%; object-fit:cover;" loading="lazy" onerror="this.style.display=\'none\'">' +
                '<span style="position:absolute; top:0.8rem; right:0.8rem; padding:0.3rem 0.7rem; border-radius:999px; font-size:0.75rem; font-weight:700; background:rgba(220,38,38,0.9); color:#fff;">' + b.status + '</span>' +
                '</div>' +
                '<div style="padding:1.5rem; display:flex; flex-direction:column; flex-grow:1;">' +
                '<h3 style="font-family:var(--font-heading); font-size:1.2rem; margin-bottom:0.2rem;">' + b.icon + ' ' + b.name + '</h3>' +
                '<div style="font-style:italic; font-size:0.82rem; color:var(--gold-bright); margin-bottom:0.8rem;">' + b.scientificName + '</div>' +
                '<p style="font-size:0.88rem; color:var(--kaziranga-text-muted-dark); line-height:1.5;">' + b.description + '</p>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderSafariOptions() {
        var container = document.getElementById('safari-grid');
        if (!container || typeof SAFARI_OPTIONS === 'undefined') return;

        var html = '';
        SAFARI_OPTIONS.forEach(function (s) {
            var highlightsHtml = '';
            s.highlights.forEach(function (h) {
                highlightsHtml += '<li>✨ <span>' + h + '</span></li>';
            });

            html +=
                '<div class="glass-card" style="overflow:hidden; display:flex; flex-direction:column;">' +
                '<div style="padding:1.5rem 1.5rem 0.5rem;">' +
                '<h3 style="font-family:var(--font-heading); font-size:1.4rem; color:var(--gold-bright); margin-bottom:0.3rem;">' + s.title + '</h3>' +
                '<p style="font-size:0.9rem; color:var(--kaziranga-text-muted-dark); line-height:1.5;">' + s.description + '</p>' +
                '</div>' +
                '<div class="safari-card-body">' +
                '<div class="safari-detail-row"><span class="safari-detail-label">⏱ Duration</span><span class="safari-detail-value">' + s.duration + '</span></div>' +
                '<div class="safari-detail-row"><span class="safari-detail-label">🕐 Timings</span><span class="safari-detail-value">' + s.timing + '</span></div>' +
                '<div class="safari-detail-row"><span class="safari-detail-label">💰 Cost</span><span class="safari-detail-value">' + s.cost + '</span></div>' +
                '<div class="safari-detail-row"><span class="safari-detail-label">👥 Capacity</span><span class="safari-detail-value">' + s.capacity + '</span></div>' +
                '<div class="safari-detail-row" style="flex-wrap:wrap;"><span class="safari-detail-label">📍 Zones</span><span class="safari-detail-value" style="text-align:right; max-width:60%;">' + s.zones + '</span></div>' +
                '<ul class="safari-highlights">' + highlightsHtml + '</ul>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderConservationTimeline() {
        var container = document.getElementById('conservation-timeline');
        if (!container || typeof CONSERVATION_HISTORY === 'undefined') return;

        var html = '';
        CONSERVATION_HISTORY.forEach(function (item) {
            html +=
                '<div class="timeline-item">' +
                '<div class="timeline-dot"></div>' +
                '<div class="timeline-card glass-card">' +
                '<div style="font-weight:800; font-size:1.2rem; color:var(--gold-bright); margin-bottom:0.4rem;">' + item.year + '</div>' +
                '<h4>' + item.title + '</h4>' +
                '<p style="font-size:0.92rem; color:var(--kaziranga-text-muted-dark); line-height:1.6;">' + item.description + '</p>' +
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
            var icon = spot.category === 'gate' ? '🚪' : spot.category === 'wildlife' ? '🦏' : spot.category === 'water' ? '💧' : spot.category === 'tiger' ? '🐅' : '📍';
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
