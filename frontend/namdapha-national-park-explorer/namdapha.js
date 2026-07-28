/**
 * Namdapha National Park Explorer — Interactive Logic
 */

(function () {
    'use strict';

    var currentBirdCategory = 'all';
    var birdSearchQuery = '';
    var activeRouteId = 'trek-1';

    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        renderQuickStats();
        renderAltitudeZones();
        renderFourBigCats();
        renderRareMammals();
        renderBirdCategoryTabs();
        renderBirdsGrid();
        renderTrekkingRoutes();
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
        if (!container || typeof NAMDAPHA_INFO === 'undefined') return;

        var html = '';
        NAMDAPHA_INFO.quickStats.forEach(function (st) {
            html +=
                '<div class="stat-card glass-card">' +
                '<div class="stat-icon">' + st.icon + '</div>' +
                '<span class="stat-value">' + st.value + '</span>' +
                '<span class="stat-label">' + st.label + '</span>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderAltitudeZones() {
        var container = document.getElementById('altitude-zones-grid');
        if (!container || typeof ALTITUDE_ZONES === 'undefined') return;

        var html = '';
        ALTITUDE_ZONES.forEach(function (zone) {
            html +=
                '<div class="zone-card glass-card">' +
                '<div class="zone-header">' +
                '<span class="zone-icon">' + zone.icon + '</span>' +
                '<span class="zone-range">' + zone.range + '</span>' +
                '</div>' +
                '<h3>' + zone.name + '</h3>' +
                '<p>' + zone.description + '</p>' +
                '<div class="zone-meta"><strong>Key Flora:</strong> ' + zone.flora + '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderFourBigCats() {
        var container = document.getElementById('cats-grid');
        if (!container || typeof FOUR_BIG_CATS === 'undefined') return;

        var html = '';
        FOUR_BIG_CATS.forEach(function (cat) {
            var statusSlug = cat.status.toLowerCase();
            html +=
                '<div class="cat-card glass-card">' +
                '<div class="cat-card-img-wrap">' +
                '<img class="cat-card-img" src="' + cat.image + '" alt="' + cat.name + '" loading="lazy" onerror="this.src=\'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Neofelis_nebulosa.jpg/800px-Neofelis_nebulosa.jpg\'">' +
                '<span class="cat-status-badge status-' + statusSlug + '">' + cat.status + '</span>' +
                '</div>' +
                '<div class="cat-card-body">' +
                '<h3>' + cat.name + '</h3>' +
                '<div class="cat-scientific">' + cat.scientificName + ' &bull; ' + cat.habitat + '</div>' +
                '<p class="cat-desc">' + cat.description + '</p>' +
                '<div class="cat-adaptation">🐾 <strong>Adaptation:</strong> ' + cat.adaptations + '</div>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderRareMammals() {
        var container = document.getElementById('mammals-grid');
        if (!container || typeof RARE_MAMMALS === 'undefined') return;

        var html = '';
        RARE_MAMMALS.forEach(function (m) {
            html +=
                '<div class="mammal-card glass-card">' +
                '<div class="mammal-header">' +
                '<span class="mammal-icon">' + m.icon + '</span>' +
                '<div>' +
                '<h3>' + m.name + '</h3>' +
                '<span style="font-size:0.82rem; color:var(--jungle-teal); font-style:italic;">' + m.scientificName + '</span>' +
                '</div>' +
                '</div>' +
                '<p>' + m.description + '</p>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderBirdCategoryTabs() {
        var container = document.getElementById('category-tabs');
        if (!container) return;

        var categories = [
            { id: 'all', label: 'All Species' },
            { id: 'hornbills', label: 'Hornbills' },
            { id: 'waterfowl', label: 'Waterfowl & Forest Ducks' },
            { id: 'gamebirds', label: 'Pheasants & Tragopans' },
            { id: 'passerines', label: 'Trogons & Songbirds' }
        ];

        var html = '';
        categories.forEach(function (cat) {
            var activeClass = cat.id === currentBirdCategory ? 'active' : '';
            html +=
                '<button type="button" class="tab-btn ' + activeClass + '" data-category="' + cat.id + '">' +
                cat.label +
                '</button>';
        });
        container.innerHTML = html;

        container.querySelectorAll('.tab-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentBirdCategory = btn.dataset.category;
                container.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                renderBirdsGrid();
            });
        });
    }

    function renderBirdsGrid() {
        var container = document.getElementById('birds-grid');
        if (!container || typeof BIRDLIFE === 'undefined') return;

        var filtered = BIRDLIFE.filter(function (bird) {
            var matchCategory = currentBirdCategory === 'all' || bird.category === currentBirdCategory;
            var matchSearch = !birdSearchQuery ||
                bird.name.toLowerCase().includes(birdSearchQuery) ||
                bird.scientificName.toLowerCase().includes(birdSearchQuery) ||
                bird.description.toLowerCase().includes(birdSearchQuery);
            return matchCategory && matchSearch;
        });

        if (filtered.length === 0) {
            container.innerHTML = '<div class="glass-card" style="padding:2rem; grid-column:1/-1; text-align:center;">No birds match your search query or category filter.</div>';
            return;
        }

        var html = '';
        filtered.forEach(function (bird) {
            html +=
                '<div class="cat-card glass-card">' +
                '<div class="cat-card-img-wrap" style="height:190px;">' +
                '<img class="cat-card-img" src="' + bird.image + '" alt="' + bird.name + '" loading="lazy" onerror="this.src=\'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Great_Hornbill_Keoladeo.jpg/800px-Great_Hornbill_Keoladeo.jpg\'">' +
                '<span class="cat-status-badge status-vulnerable">' + bird.status + '</span>' +
                '</div>' +
                '<div class="cat-card-body">' +
                '<h3>' + bird.name + '</h3>' +
                '<div class="cat-scientific">' + bird.scientificName + ' &bull; Wingspan: ' + bird.wingspan + '</div>' +
                '<p class="cat-desc">' + bird.description + '</p>' +
                '<div style="font-size:0.82rem; color:var(--namdapha-text-muted-dark); border-top:1px solid var(--namdapha-border-dark); padding-top:0.6rem;">🔊 <strong>Call:</strong> ' + bird.callNote + '</div>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderTrekkingRoutes() {
        var selector = document.getElementById('route-list-selector');
        var detailsPanel = document.getElementById('route-details-panel');
        if (!selector || !detailsPanel || typeof TREKKING_ROUTES === 'undefined') return;

        var selectorHtml = '';
        TREKKING_ROUTES.forEach(function (r) {
            var activeClass = r.id === activeRouteId ? 'active' : '';
            selectorHtml +=
                '<button type="button" class="route-item-btn ' + activeClass + '" data-route-id="' + r.id + '">' +
                '<h4>' + r.title + '</h4>' +
                '<span class="route-badge">🥾 ' + r.distance + ' &bull; ' + r.duration + '</span>' +
                '</button>';
        });
        selector.innerHTML = selectorHtml;

        selector.querySelectorAll('.route-item-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                activeRouteId = btn.dataset.route-id;
                selector.querySelectorAll('.route-item-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                updateRouteDetails();
            });
        });

        updateRouteDetails();
    }

    function updateRouteDetails() {
        var detailsPanel = document.getElementById('route-details-panel');
        if (!detailsPanel || typeof TREKKING_ROUTES === 'undefined') return;

        var route = TREKKING_ROUTES.find(function (r) { return r.id === activeRouteId; }) || TREKKING_ROUTES[0];

        var html =
            '<h3>' + route.title + '</h3>' +
            '<div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin:0.8rem 0 1.2rem;">' +
            '<span style="padding:0.3rem 0.8rem; border-radius:999px; font-size:0.82rem; background:rgba(255,255,255,0.08);">📏 Distance: ' + route.distance + '</span>' +
            '<span style="padding:0.3rem 0.8rem; border-radius:999px; font-size:0.82rem; background:rgba(255,255,255,0.08);">⏱️ Duration: ' + route.duration + '</span>' +
            '<span style="padding:0.3rem 0.8rem; border-radius:999px; font-size:0.82rem; background:rgba(255,255,255,0.08);">🟢 Difficulty: ' + route.difficulty + '</span>' +
            '</div>' +
            '<p style="line-height:1.65; color:var(--namdapha-text-muted-dark); margin-bottom:1rem;">' + route.description + '</p>' +
            '<div style="font-size:0.9rem; margin-bottom:1.5rem;"><strong>Terrain:</strong> ' + route.terrain + '</div>' +
            '<h4>Camp Overnight Stops</h4>' +
            '<div style="display:flex; gap:0.8rem; flex-wrap:wrap; margin-top:0.6rem;">' +
            route.camps.map(function (c) { return '<div style="padding:0.8rem; border-radius:8px; background:rgba(255,255,255,0.04); border:1px solid var(--namdapha-border-dark); font-size:0.88rem;">⛺ ' + c + '</div>'; }).join('') +
            '</div>';

        detailsPanel.innerHTML = html;
    }

    function renderInteractiveMap() {
        var container = document.getElementById('map-hotspots-layer');
        var infoPopup = document.getElementById('map-info-popup');
        if (!container || typeof MAP_HOTSPOTS === 'undefined') return;

        var html = '';
        MAP_HOTSPOTS.forEach(function (spot) {
            var icon = spot.category === 'gate' ? '🚪' : spot.category === 'base' ? '🏕️' : spot.category === 'peak' ? '🏔️' : '⛺';
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
