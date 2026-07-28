/**
 * Keoladeo National Park Explorer — Interactive Logic
 */

(function () {
    'use strict';

    // State Management
    var currentBirdCategory = 'all';
    var birdSearchQuery = '';
    var activeRouteId = 'route-1';
    var activeLightboxIdx = 0;

    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        renderQuickStats();
        renderHydrologySeasons();
        renderFlywayRegions();
        renderBirdCategoryTabs();
        renderBirdsGrid();
        renderCyclingRoutes();
        renderHistoryTimeline();
        renderInteractiveMap();
        renderGalleryGrid();
        bindEvents();
    });

    /* Theme Initializer */
    function initTheme() {
        var savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }

    /* Event Listeners */
    function bindEvents() {
        // Theme toggle button
        var themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', function () {
                document.body.classList.toggle('light-theme');
                var isLight = document.body.classList.contains('light-theme');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            });
        }

        // Search Input
        var searchInput = document.getElementById('bird-search');
        if (searchInput) {
            searchInput.addEventListener('input', function (e) {
                birdSearchQuery = e.target.value.toLowerCase().trim();
                renderBirdsGrid();
            });
        }

        // Lightbox Close
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

    /* Render Quick Stats */
    function renderQuickStats() {
        var container = document.getElementById('stats-grid');
        if (!container || typeof KEOLADEO_INFO === 'undefined') return;

        var html = '';
        KEOLADEO_INFO.quickStats.forEach(function (st) {
            html +=
                '<div class="stat-card glass-card">' +
                '<div class="stat-icon">' + st.icon + '</div>' +
                '<span class="stat-value">' + st.value + '</span>' +
                '<span class="stat-label">' + st.label + '</span>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    /* Render Hydrology Seasons */
    function renderHydrologySeasons() {
        var container = document.getElementById('seasons-grid');
        if (!container || typeof WETLAND_HYDROLOGY === 'undefined') return;

        var html = '';
        WETLAND_HYDROLOGY.seasons.forEach(function (s) {
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

    /* Render Flyway Regions */
    function renderFlywayRegions() {
        var container = document.getElementById('flyway-regions');
        if (!container || typeof FLYWAY_INFO === 'undefined') return;

        var html = '';
        FLYWAY_INFO.keyOriginRegions.forEach(function (r) {
            html +=
                '<div class="region-item">' +
                '<div>' +
                '<span class="region-title">📍 ' + r.region + '</span>' +
                '<span class="region-distance"> (' + r.distance + ')</span>' +
                '</div>' +
                '<div class="region-species">Birds: ' + r.species + '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    /* Render Bird Category Tabs */
    function renderBirdCategoryTabs() {
        var container = document.getElementById('category-tabs');
        if (!container) return;

        var categories = [
            { id: 'all', label: 'All Species' },
            { id: 'migratory-waterfowl', label: 'Migratory Waterfowl' },
            { id: 'resident-waders', label: 'Resident Waders' },
            { id: 'raptors', label: 'Raptors & Owls' },
            { id: 'songbirds', label: 'Songbirds & Small Birds' },
            { id: 'endangered', label: 'Threatened / Rare' }
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

    /* Render Birds Grid */
    function renderBirdsGrid() {
        var container = document.getElementById('birds-grid');
        if (!container || typeof BIRD_SPECIES === 'undefined') return;

        var filtered = BIRD_SPECIES.filter(function (bird) {
            var matchCategory = currentBirdCategory === 'all' || bird.category === currentBirdCategory;
            var matchSearch = !birdSearchQuery ||
                bird.name.toLowerCase().includes(birdSearchQuery) ||
                bird.scientificName.toLowerCase().includes(birdSearchQuery) ||
                bird.description.toLowerCase().includes(birdSearchQuery);
            return matchCategory && matchSearch;
        });

        if (filtered.length === 0) {
            container.innerHTML = '<div class="glass-card" style="padding:2rem; grid-column:1/-1; text-align:center;">No birds match your current search or category filter.</div>';
            return;
        }

        var html = '';
        filtered.forEach(function (bird) {
            var statusSlug = bird.status.toLowerCase().replace(/\s+/g, '-');
            html +=
                '<div class="bird-card glass-card">' +
                '<div class="bird-card-img-wrap">' +
                '<img class="bird-card-img" src="' + bird.image + '" alt="' + bird.name + '" loading="lazy" onerror="this.src=\'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Keoladeo_Ghana_National_Park%2C_Bharatpur%2C_Rajasthan%2C_India.jpg/800px-Keoladeo_Ghana_National_Park%2C_Bharatpur%2C_Rajasthan%2C_India.jpg\'">' +
                '<span class="bird-status-tag status-' + statusSlug + '">' + bird.status + '</span>' +
                '</div>' +
                '<div class="bird-card-body">' +
                '<div class="bird-card-header">' +
                '<h3>' + bird.name + '</h3>' +
                '<span class="bird-icon">' + bird.icon + '</span>' +
                '</div>' +
                '<div class="scientific-name">' + bird.scientificName + ' &bull; ' + bird.categoryLabel + '</div>' +
                '<p class="bird-desc">' + bird.description + '</p>' +
                '<div class="bird-meta-row">' +
                '<span>📅 ' + bird.season + '</span>' +
                '<span>🪶 Wingspan: ' + bird.wingspan + '</span>' +
                '</div>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    /* Render Cycling Routes */
    function renderCyclingRoutes() {
        var selector = document.getElementById('route-list-selector');
        var detailsPanel = document.getElementById('route-details-panel');
        if (!selector || !detailsPanel || typeof CYCLING_ROUTES === 'undefined') return;

        var selectorHtml = '';
        CYCLING_ROUTES.forEach(function (r) {
            var activeClass = r.id === activeRouteId ? 'active' : '';
            selectorHtml +=
                '<button type="button" class="route-item-btn ' + activeClass + '" data-route-id="' + r.id + '">' +
                '<h4>' + r.title + '</h4>' +
                '<span class="route-badge">🚲 ' + r.distance + ' &bull; ' + r.duration + '</span>' +
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
        if (!detailsPanel || typeof CYCLING_ROUTES === 'undefined') return;

        var route = CYCLING_ROUTES.find(function (r) { return r.id === activeRouteId; }) || CYCLING_ROUTES[0];

        var highlightsHtml = '';
        route.highlights.forEach(function (h) {
            highlightsHtml += '<div class="highlight-box">📍 ' + h + '</div>';
        });

        var html =
            '<div class="route-header-row">' +
            '<h3>' + route.title + '</h3>' +
            '<div class="route-stats-chips">' +
            '<span class="chip">📏 ' + route.distance + '</span>' +
            '<span class="chip">⏱️ ' + route.duration + '</span>' +
            '<span class="chip">🟢 Difficulty: ' + route.difficulty + '</span>' +
            '</div>' +
            '</div>' +
            '<p style="line-height:1.65; color:var(--keoladeo-text-muted-dark); margin-bottom:1rem;">' + route.description + '</p>' +
            '<div style="font-size:0.9rem; margin-bottom:1.5rem;"><strong>Allowed Transport:</strong> ' + route.transportOptions.join(', ') + ' &bull; <strong>Surface:</strong> ' + route.surface + '</div>' +
            '<div class="highlights-title">Key Trail Landmarks & Hides</div>' +
            '<div class="highlights-grid">' + highlightsHtml + '</div>';

        detailsPanel.innerHTML = html;
    }

    /* Render History Timeline */
    function renderHistoryTimeline() {
        var container = document.getElementById('timeline-container');
        if (!container || typeof HISTORY_TIMELINE === 'undefined') return;

        var html = '';
        HISTORY_TIMELINE.forEach(function (item) {
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

    /* Render Interactive Map */
    function renderInteractiveMap() {
        var container = document.getElementById('map-hotspots-layer');
        var infoPopup = document.getElementById('map-info-popup');
        if (!container || typeof MAP_HOTSPOTS === 'undefined') return;

        var html = '';
        MAP_HOTSPOTS.forEach(function (spot) {
            var icon = spot.category === 'gate' ? '🚪' : spot.category === 'heritage' ? '🏛️' : spot.category === 'wildlife' ? '🐍' : spot.category === 'hide' ? '🔭' : '🌿';
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

    /* Render Gallery Grid */
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

    /* Lightbox Modal Helper */
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
