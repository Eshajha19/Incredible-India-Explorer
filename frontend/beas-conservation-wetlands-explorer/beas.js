/**
 * Beas Conservation Wetlands Explorer — Interactive Logic
 */

(function () {
    'use strict';

    var activeLightboxIdx = 0;

    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        renderQuickStats();
        renderHydrologySeasons();
        renderThreatsAndConservation();
        renderFishGrid();
        renderHabitats();
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
        if (lbClose) {
            lbClose.addEventListener('click', closeLightbox);
        }
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
        if (!container || typeof BEAS_INFO === 'undefined') return;

        var html = '';
        BEAS_INFO.quickStats.forEach(function (st) {
            html +=
                '<div class="stat-card glass-card">' +
                '<div class="stat-icon">' + st.icon + '</div>' +
                '<span class="stat-value">' + st.value + '</span>' +
                '<span class="stat-label">' + st.label + '</span>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderHydrologySeasons() {
        var container = document.getElementById('seasons-grid');
        if (!container || typeof BEAS_HYDROLOGY === 'undefined') return;

        var html = '';
        BEAS_HYDROLOGY.seasons.forEach(function (s) {
            html +=
                '<div class="season-card glass-card">' +
                '<div class="season-header">' +
                '<span class="season-icon">' + s.icon + '</span>' +
                '<span class="season-months">' + s.months + '</span>' +
                '</div>' +
                '<h4>' + s.name + '</h4>' +
                '<p>' + s.description + '</p>' +
                '<div class="season-highlight">🌟 ' + s.highlight + '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderThreatsAndConservation() {
        var threatsContainer = document.getElementById('threats-list');
        if (threatsContainer && typeof DOLPHIN_INFO !== 'undefined') {
            var threatsHtml = '';
            DOLPHIN_INFO.threats.forEach(function (t) {
                threatsHtml += '<div class="threat-item">⚠️ ' + t + '</div>';
            });
            threatsContainer.innerHTML = threatsHtml;
        }

        var consContainer = document.getElementById('conservation-list');
        if (consContainer && typeof DOLPHIN_INFO !== 'undefined') {
            var consHtml = '';
            DOLPHIN_INFO.conservation.forEach(function (c) {
                consHtml += '<li>✅ ' + c + '</li>';
            });
            consContainer.innerHTML = consHtml;
        }
    }

    function renderFishGrid() {
        var container = document.getElementById('fish-grid');
        if (!container || typeof FISH_SPECIES === 'undefined') return;

        var html = '';
        FISH_SPECIES.forEach(function (fish) {
            var statusSlug = fish.status.toLowerCase().replace(/\s+/g, '-');
            html +=
                '<div class="fish-card glass-card">' +
                '<div class="fish-card-header">' +
                '<h3>' + fish.name + '</h3>' +
                '<span class="fish-icon">' + fish.icon + '</span>' +
                '</div>' +
                '<div class="fish-scientific">' + fish.scientificName + '</div>' +
                '<div class="fish-meta">' +
                '<span class="fish-tag ' + statusSlug + '">' + fish.status + '</span>' +
                '<span class="fish-size">📏 ' + fish.size + '</span>' +
                '</div>' +
                '<p class="fish-desc">' + fish.description + '</p>' +
                '<div class="fish-habitat">🌊 Habitat: ' + fish.habitat + '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderHabitats() {
        var container = document.getElementById('habitats-grid');
        if (!container || typeof BEAS_WETLAND_ECOLOGY === 'undefined') return;

        var html = '';
        BEAS_WETLAND_ECOLOGY.habitats.forEach(function (h) {
            html +=
                '<div class="habitat-card glass-card">' +
                '<div class="habitat-icon">' + h.icon + '</div>' +
                '<h4>' + h.name + '</h4>' +
                '<p>' + h.description + '</p>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderHistoryTimeline() {
        var container = document.getElementById('timeline-container');
        if (!container || typeof BEAS_TIMELINE === 'undefined') return;

        var html = '';
        BEAS_TIMELINE.forEach(function (item) {
            html +=
                '<div class="timeline-item">' +
                '<div class="timeline-dot"></div>' +
                '<div class="timeline-card glass-card">' +
                '<div class="timeline-year">' + item.year + '</div>' +
                '<h4>' + item.title + '</h4>' +
                '<p>' + item.description + '</p>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderInteractiveMap() {
        var container = document.getElementById('map-hotspots-layer');
        var infoPopup = document.getElementById('map-info-popup');
        if (!container || typeof BEAS_MAP === 'undefined') return;

        var html = '';
        BEAS_MAP.forEach(function (spot) {
            var icon = spot.category === 'gate' ? '🚪' : spot.category === 'heritage' ? '🏛️' : spot.category === 'wildlife' ? '🐬' : '🔭';
            html +=
                '<button type="button" class="map-hotspot-pin" style="left:' + spot.x + '%; top:' + spot.y + '%;" data-spot-id="' + spot.id + '" aria-label="' + spot.name + '">' +
                icon +
                '</button>';
        });
        container.innerHTML = html;

        container.querySelectorAll('.map-hotspot-pin').forEach(function (pin) {
            pin.addEventListener('click', function () {
                var spot = BEAS_MAP.find(function (s) { return s.id === pin.dataset.spot-id; });
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
                '<h4>' + img.title + '</h4>' +
                '<p>' + img.caption + '</p>' +
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
        activeLightboxIdx = idx;
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
