/**
 * map3d-core.js
 *
 * Pure, DOM/Three.js-free helper functions for the 3D India map
 * (india-3d-map.html / india-3d-map.js). Kept separate from the
 * rendering code so the projection math and clustering logic can be
 * unit-tested (see tests/unit/map3d-core.test.js) without a WebGL
 * context or jsdom canvas shims.
 *
 * Exposed as `window.Map3DCore` for the browser build (plain script,
 * no bundler in this project) and as a CommonJS export for Vitest.
 */
(function (root) {
    "use strict";

    /**
     * Reference point for the equirectangular projection. Roughly the
     * geographic center of mainland India — used so lng/lat degrees can
     * be converted to a flat x/y plane with a single cosine correction
     * rather than a full map projection library.
     */
    var PROJECTION_ORIGIN = { lat: 22.5, lng: 80.0 };

    /** Degrees-to-plane-units scale. Tuned so India spans roughly -30..30. */
    var PROJECTION_SCALE = 3.0;

    /**
     * Project [lng, lat] (WGS84 degrees) to flat 2D [x, y] plane
     * coordinates. Equirectangular with a latitude-cosine correction so
     * shapes aren't stretched east-west near the top/bottom of the map.
     * This is intentionally simple (not a true conformal projection) —
     * accurate enough for a stylized country-scale map, not for
     * distance-critical calculations (use haversineKm for those).
     */
    function project(lng, lat) {
        var rad = Math.PI / 180;
        var x = (lng - PROJECTION_ORIGIN.lng) * Math.cos(PROJECTION_ORIGIN.lat * rad) * PROJECTION_SCALE;
        var y = (lat - PROJECTION_ORIGIN.lat) * PROJECTION_SCALE;
        return [x, y];
    }

    /** Inverse of project(), used to translate a picked plane point back to approximate lng/lat. */
    function unproject(x, y) {
        var rad = Math.PI / 180;
        var lng = x / (Math.cos(PROJECTION_ORIGIN.lat * rad) * PROJECTION_SCALE) + PROJECTION_ORIGIN.lng;
        var lat = y / PROJECTION_SCALE + PROJECTION_ORIGIN.lat;
        return [lng, lat];
    }

    /** Great-circle distance in kilometers between two lat/lng points (haversine). */
    function haversineKm(lat1, lng1, lat2, lng2) {
        var R = 6371;
        var rad = Math.PI / 180;
        var dLat = (lat2 - lat1) * rad;
        var dLng = (lng2 - lng1) * rad;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    /**
     * Return the `count` destinations nearest to `origin` (by haversine
     * distance), excluding the origin itself. Used for the "Nearby
     * attractions" panel when a marker is selected.
     */
    function nearestDestinations(origin, destinations, count) {
        return destinations
            .filter(function (d) { return d.id !== origin.id; })
            .map(function (d) {
                return { destination: d, distanceKm: haversineKm(origin.lat, origin.lng, d.lat, d.lng) };
            })
            .sort(function (a, b) { return a.distanceKm - b.distanceKm; })
            .slice(0, count || 5);
    }

    /**
     * Grid-based clustering: buckets destinations into cells of size
     * `cellSize` (in projected plane units) and returns one cluster per
     * non-empty cell. A cell with a single point is still returned as a
     * "cluster" of size 1 so callers can render it as a normal marker.
     *
     * Grid clustering (vs. a distance-threshold/greedy approach) is
     * deterministic and cheap to recompute every time the camera zoom
     * changes, which matters here since re-clustering happens on every
     * zoom step for a live 3D camera rather than once up front.
     */
    function clusterDestinations(destinations, cellSize) {
        if (!cellSize || cellSize <= 0) {
            return destinations.map(function (d) {
                var p = project(d.lng, d.lat);
                return { x: p[0], y: p[1], items: [d], count: 1 };
            });
        }

        var cells = new Map();
        destinations.forEach(function (d) {
            var p = project(d.lng, d.lat);
            var cellX = Math.round(p[0] / cellSize);
            var cellY = Math.round(p[1] / cellSize);
            var key = cellX + ":" + cellY;
            if (!cells.has(key)) {
                cells.set(key, { cellX: cellX, cellY: cellY, items: [] });
            }
            cells.get(key).items.push({ d: d, x: p[0], y: p[1] });
        });

        var clusters = [];
        cells.forEach(function (cell) {
            var sumX = 0, sumY = 0;
            cell.items.forEach(function (it) { sumX += it.x; sumY += it.y; });
            var cx = sumX / cell.items.length;
            var cy = sumY / cell.items.length;
            clusters.push({
                x: cx,
                y: cy,
                items: cell.items.map(function (it) { return it.d; }),
                count: cell.items.length
            });
        });
        return clusters;
    }

    /**
     * Pick a reasonable grid cell size for clustering given a camera
     * "zoom" distance (higher distance = further out = coarser
     * clustering). Piecewise-linear thresholds tuned for the map's
     * -30..30 plane range; kept as a pure function so the thresholds
     * are easy to unit test and retune independently of the renderer.
     */
    function cellSizeForZoom(cameraDistance) {
        if (cameraDistance > 55) return 8;
        if (cameraDistance > 40) return 5;
        if (cameraDistance > 28) return 2.5;
        if (cameraDistance > 18) return 1;
        return 0; // fully zoomed in: no clustering, show individual markers
    }

    /** Filter destinations by selected category set (empty set = no filter). */
    function filterByCategory(destinations, activeCategories) {
        if (!activeCategories || activeCategories.size === 0) return destinations;
        return destinations.filter(function (d) {
            return d.categories.some(function (c) { return activeCategories.has(c); });
        });
    }

    /** Filter to only bookmarked destinations given a Set of bookmarked ids. */
    function filterByBookmarks(destinations, bookmarkedIds) {
        return destinations.filter(function (d) { return bookmarkedIds.has(d.id); });
    }

    var api = {
        PROJECTION_ORIGIN: PROJECTION_ORIGIN,
        PROJECTION_SCALE: PROJECTION_SCALE,
        project: project,
        unproject: unproject,
        haversineKm: haversineKm,
        nearestDestinations: nearestDestinations,
        clusterDestinations: clusterDestinations,
        cellSizeForZoom: cellSizeForZoom,
        filterByCategory: filterByCategory,
        filterByBookmarks: filterByBookmarks
    };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = api;
    }
    if (typeof window !== "undefined") {
        window.Map3DCore = api;
    }
})(typeof window !== "undefined" ? window : globalThis);
