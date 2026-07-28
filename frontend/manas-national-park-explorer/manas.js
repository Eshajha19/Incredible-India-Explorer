/**
 * Manas National Park Explorer — Interactive Logic
 */

(function () {
    'use strict';

    var birdSearchQuery = '';

    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        renderQuickStats();
        renderFiveStatuses();
        renderSpeciesSpotlight();
        renderBirdsGrid();
        renderHistoryTimeline();
        renderInterestingFacts();
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

        var searchInput = document.getElementById('bird-search');
        if (searchInput) {
            searchInput.addEventListener('input', function (e) {
                birdSearchQuery = e.target.value.toLowerCase().trim();
                renderBirdsGrid();
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
        if (!container || typeof MANAS_INFO === 'undefined') return;

        var html = '';
        MANAS_INFO.quickStats.forEach(function (st) {
            html +=
                '<div class="stat-card glass-card">' +
                '<div class="stat-icon">' + st.icon + '</div>' +
                '<span class="stat-value">' + st.value + '</span>' +
                '<span class="stat-label">' + st.label + '</span>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderFiveStatuses() {
        var container = document.getElementById('statuses-grid');
        if (!container || typeof FIVE_STATUSES === 'undefined') return;

        var html = '';
        FIVE_STATUSES.forEach(function (s) {
            html +=
                '<div class="status-card glass-card">' +
                '<div class="status-header">' +
                '<span class="status-icon">' + s.icon + '</span>' +
                '<span class="status-year">Est. ' + s.year + '</span>' +
                '</div>' +
                '<h3>' + s.title + '</h3>' +
                '<p>' + s.description + '</p>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderSpeciesSpotlight() {
        var container = document.getElementById('species-grid');
        if (!container || typeof SPECIES_SPOTLIGHT === 'undefined') return;

        var html = '';
        SPECIES_SPOTLIGHT.forEach(function (sp) {
            var statusSlug = sp.status.toLowerCase().replace(/\s+/g, '-');
            html +=
                '<div class="species-card glass-card">' +
                '<div class="species-card-img-wrap">' +
                '<img class="species-card-img" src="' + sp.image + '" alt="' + sp.name + '" loading="lazy" onerror="this.src=\'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Golden_Langur_Manas.jpg/800px-Golden_Langur_Manas.jpg\'">' +
                '<span class="species-status-badge status-' + statusSlug + '">' + sp.status + '</span>' +
                '</div>' +
                '<div class="species-card-body">' +
                '<h3>' + sp.name + '</h3>' +
                '<div class="species-scientific">' + sp.scientificName + '</div>' +
                '<p class="species-desc">' + sp.description + '</p>' +
                '<div class="species-fact">🌟 <strong>Key Fact:</strong> ' + sp.fact + '</div>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderBirdsGrid() {
        var container = document.getElementById('birds-grid');
        if (!container || typeof BIRDLIFE === 'undefined') return;

        var filtered = BIRDLIFE.filter(function (bird) {
            return !birdSearchQuery ||
                bird.name.toLowerCase().includes(birdSearchQuery) ||
                bird.scientificName.toLowerCase().includes(birdSearchQuery) ||
                bird.description.toLowerCase().includes(birdSearchQuery);
        });

        if (filtered.length === 0) {
            container.innerHTML = '<div class="glass-card" style="padding:2rem; grid-column:1/-1; text-align:center;">No birds match your search query.</div>';
            return;
        }

        var html = '';
        filtered.forEach(function (bird) {
            html +=
                '<div class="species-card glass-card">' +
                '<div class="species-card-img-wrap" style="height:190px;">' +
                '<img class="species-card-img" src="' + bird.image + '" alt="' + bird.name + '" loading="lazy" onerror="this.src=\'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Great_Hornbill_Keoladeo.jpg/800px-Great_Hornbill_Keoladeo.jpg\'">' +
                '<span class="species-status-badge status-vulnerable">' + bird.status + '</span>' +
                '</div>' +
                '<div class="species-card-body">' +
                '<h3>' + bird.name + '</h3>' +
                '<div class="species-scientific">' + bird.scientificName + ' &bull; Wingspan: ' + bird.wingspan + '</div>' +
                '<p class="species-desc">' + bird.description + '</p>' +
                '<div style="font-size:0.82rem; color:var(--manas-text-muted-dark); border-top:1px solid var(--manas-border-dark); padding-top:0.6rem;">🔊 <strong>Call:</strong> ' + bird.callNote + '</div>' +
                '</div>' +
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
                '<div style="font-weight:800; font-size:1.2rem; color:var(--langur-gold); margin-bottom:0.4rem;">' + item.year + '</div>' +
                '<h4>' + item.title + '</h4>' +
                '<p style="font-size:0.92rem; color:var(--manas-text-muted-dark); line-height:1.6;">' + item.description + '</p>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderInterestingFacts() {
        var container = document.getElementById('facts-grid');
        if (!container || typeof INTERESTING_FACTS === 'undefined') return;

        var html = '';
        INTERESTING_FACTS.forEach(function (f) {
            html +=
                '<div class="fact-card glass-card">' +
                '<div class="fact-card-icon">' + f.icon + '</div>' +
                '<h3>' + f.title + '</h3>' +
                '<p>' + f.description + '</p>' +
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
            var icon = spot.category === 'gate' ? '🚪' : spot.category === 'base' ? '🏕️' : spot.category === 'center' ? '🐗' : spot.category === 'border' ? '🤝' : '🌾';
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
