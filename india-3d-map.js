/**
 * india-3d-map.js
 *
 * Renders the interactive 3D India map (india-3d-map.html) using Three.js.
 * State/UT boundaries are extruded from india-map-data.js; destinations
 * come from the site's existing trip-data.js dataset. Projection,
 * clustering, and distance math live in js-modules/map3d-core.js so they
 * stay unit-testable without a WebGL context.
 *
 * See docs/INDIA_3D_MAP.md for the architecture writeup.
 */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

(function () {
    "use strict";

    var Core = window.Map3DCore;
    var STATE_COLOR = 0x1b6b3a;
    var STATE_HOVER_COLOR = 0xff9933;
    var STATE_EDGE_COLOR = 0x0a2e18;
    var MARKER_COLOR = 0xffb01f;
    var MARKER_BOOKMARKED_COLOR = 0xff9933;
    var CLUSTER_COLOR = 0x138808;

    var container = document.getElementById("map3d-canvas");
    if (!container) return;

    var state = {
        activeCategories: new Set(),
        bookmarks: loadBookmarks(),
        selected: null,
        bookmarkedOnly: false,
        destinations: (window.tripDestinations || []).slice()
    };

    // ---------------------------------------------------------------
    // Scene setup
    // ---------------------------------------------------------------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1220);
    scene.fog = new THREE.Fog(0x0b1220, 60, 140);

    var camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        500
    );
    camera.position.set(0, 42, 34);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 10;
    controls.maxDistance = 75;
    controls.maxPolarAngle = Math.PI / 2.15;
    controls.target.set(0, 0, 0);

    var hemiLight = new THREE.HemisphereLight(0xbfd8ff, 0x0a1a10, 0.9);
    scene.add(hemiLight);
    var sunLight = new THREE.DirectionalLight(0xfff2d9, 1.1);
    sunLight.position.set(-20, 40, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(2048, 2048);
    sunLight.shadow.camera.left = -40;
    sunLight.shadow.camera.right = 40;
    sunLight.shadow.camera.top = 40;
    sunLight.shadow.camera.bottom = -40;
    scene.add(sunLight);

    var groundGeo = new THREE.PlaneGeometry(200, 200);
    var groundMat = new THREE.MeshStandardMaterial({ color: 0x081018, roughness: 1 });
    var ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.55;
    ground.receiveShadow = true;
    scene.add(ground);

    var statesGroup = new THREE.Group();
    var markersGroup = new THREE.Group();
    scene.add(statesGroup);
    scene.add(markersGroup);

    // ---------------------------------------------------------------
    // Build extruded state geometry from india-map-data.js
    // ---------------------------------------------------------------
    var stateMeshes = [];
    (window.indiaStatesGeo || []).forEach(function (stateFeature) {
        var group = new THREE.Group();
        var heightSeed = hashString(stateFeature.id);
        var height = 0.35 + (heightSeed % 10) / 40; // subtle relief variation per state

        stateFeature.rings.forEach(function (ring) {
            if (ring.length < 4) return;
            var shape = new THREE.Shape();
            ring.forEach(function (pt, i) {
                var p = Core.project(pt[0], pt[1]);
                if (i === 0) shape.moveTo(p[0], -p[1]);
                else shape.lineTo(p[0], -p[1]);
            });

            var extrudeSettings = { depth: height, bevelEnabled: false, curveSegments: 1 };
            var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            geometry.rotateX(-Math.PI / 2);

            var material = new THREE.MeshStandardMaterial({
                color: STATE_COLOR,
                roughness: 0.75,
                metalness: 0.05
            });
            var mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData.stateId = stateFeature.id;
            mesh.userData.stateName = stateFeature.name;
            mesh.userData.slug = stateFeature.slug;
            mesh.userData.baseColor = STATE_COLOR;

            var edges = new THREE.EdgesGeometry(geometry, 20);
            var edgeMat = new THREE.LineBasicMaterial({ color: STATE_EDGE_COLOR, transparent: true, opacity: 0.6 });
            var edgeLines = new THREE.LineSegments(edges, edgeMat);
            mesh.add(edgeLines);

            group.add(mesh);
            stateMeshes.push(mesh);
        });
        statesGroup.add(group);
    });

    function hashString(str) {
        var h = 0;
        for (var i = 0; i < str.length; i++) {
            h = (h * 31 + str.charCodeAt(i)) >>> 0;
        }
        return h;
    }

    // ---------------------------------------------------------------
    // Markers + clustering
    // ---------------------------------------------------------------
    var markerObjects = []; // { mesh, kind: 'marker'|'cluster', payload }
    var sphereGeoMarker = new THREE.SphereGeometry(0.42, 20, 20);
    var sphereGeoCluster = new THREE.SphereGeometry(0.6, 20, 20);

    function rebuildMarkers() {
        markersGroup.children.forEach(function (child) {
            if (child.material) {
                if (child.material.map) child.material.map.dispose();
                child.material.dispose();
            }
        });
        markersGroup.clear();
        markerObjects = [];

        var filtered = Core.filterByCategory(state.destinations, state.activeCategories);
        if (state.bookmarkedOnly) {
            filtered = Core.filterByBookmarks(filtered, state.bookmarks);
        }

        var camDist = camera.position.distanceTo(controls.target);
        var cellSize = Core.cellSizeForZoom(camDist);
        var clusters = Core.clusterDestinations(filtered, cellSize);

        clusters.forEach(function (cluster) {
            var isCluster = cluster.count > 1;
            var geo = isCluster ? sphereGeoCluster : sphereGeoMarker;
            var single = cluster.items[0];
            var isBookmarked = !isCluster && state.bookmarks.has(single.id);
            var color = isCluster ? CLUSTER_COLOR : (isBookmarked ? MARKER_BOOKMARKED_COLOR : MARKER_COLOR);
            var mat = new THREE.MeshStandardMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.35,
                roughness: 0.4
            });
            var mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(cluster.x, 0.75, -cluster.y);
            mesh.castShadow = true;
            markersGroup.add(mesh);

            if (isCluster) {
                var label = makeSprite(String(cluster.count));
                label.position.set(cluster.x, 1.45, -cluster.y);
                markersGroup.add(label);
            }

            markerObjects.push({
                mesh: mesh,
                kind: isCluster ? "cluster" : "marker",
                payload: isCluster ? cluster : single
            });
        });
    }

    function makeSprite(text) {
        var canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillRect(0, 0, 64, 64);
        ctx.font = "bold 34px Outfit, sans-serif";
        ctx.fillStyle = "`#ffffff`";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 32, 34);
        var tex = new THREE.CanvasTexture(canvas);
        var mat = new THREE.SpriteMaterial({ map: tex, depthTest: false });
        var sprite = new THREE.Sprite(mat);
        sprite.scale.set(0.9, 0.9, 0.9);
        return sprite;
    }

    // ---------------------------------------------------------------
    // Interaction: raycasting for hover + click on states and markers
    // ---------------------------------------------------------------
    var raycaster = new THREE.Raycaster();
    var pointer = new THREE.Vector2();
    var hoveredState = null;

    function updatePointer(evt) {
        var rect = renderer.domElement.getBoundingClientRect();
        var clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
        var clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
        pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    }

    renderer.domElement.addEventListener("mousemove", function (evt) {
        updatePointer(evt);
        raycaster.setFromCamera(pointer, camera);

        var markerHits = raycaster.intersectObjects(markerObjects.map(function (m) { return m.mesh; }));
        if (markerHits.length > 0) {
            renderer.domElement.style.cursor = "pointer";
            if (hoveredState) {
                hoveredState.material.color.setHex(hoveredState.userData.baseColor);
                hoveredState = null;
            }
            hideStateTooltip();
        } else {
            var stateHits = raycaster.intersectObjects(stateMeshes);
            if (hoveredState) {
                hoveredState.material.color.setHex(hoveredState.userData.baseColor);
                hoveredState = null;
            }
            if (stateHits.length > 0) {
                hoveredState = stateHits[0].object;
                hoveredState.material.color.setHex(STATE_HOVER_COLOR);
                renderer.domElement.style.cursor = "pointer";
                showStateTooltip(evt, hoveredState.userData.stateName);
            } else {
                renderer.domElement.style.cursor = "default";
                hideStateTooltip();
            }
        }
    });

    renderer.domElement.addEventListener("click", function (evt) {
        updatePointer(evt);
        raycaster.setFromCamera(pointer, camera);

        var markerHits = raycaster.intersectObjects(markerObjects.map(function (m) { return m.mesh; }));
        if (markerHits.length > 0) {
            var hitMesh = markerHits[0].object;
            var obj = markerObjects.find(function (m) { return m.mesh === hitMesh; });
            if (obj.kind === "cluster") {
                flyTo(obj.mesh.position, camera.position.distanceTo(controls.target) * 0.45);
            } else {
                selectDestination(obj.payload);
            }
            return;
        }

        var stateHits = raycaster.intersectObjects(stateMeshes);
        if (stateHits.length > 0) {
            var slug = stateHits[0].object.userData.slug;
            window.location.href = "dist/states/" + slug + ".html";
        }
    });

    function flyTo(targetPos, newDistance) {
        var dir = camera.position.clone().sub(controls.target).normalize();
        controls.target.set(targetPos.x, 0, targetPos.z);
        camera.position.copy(controls.target.clone().add(dir.multiplyScalar(Math.max(newDistance, controls.minDistance))));
    }

    var tooltipEl = document.getElementById("map3d-state-tooltip");
    function showStateTooltip(evt, name) {
        if (!tooltipEl) return;
        tooltipEl.textContent = name;
        tooltipEl.style.opacity = "1";
        tooltipEl.style.left = (evt.clientX + 14) + "px";
        tooltipEl.style.top = (evt.clientY + 14) + "px";
    }
    function hideStateTooltip() {
        if (tooltipEl) tooltipEl.style.opacity = "0";
    }

    // ---------------------------------------------------------------
    // Destination detail panel + nearby recommendations
    // ---------------------------------------------------------------
    var panelEl = document.getElementById("map3d-panel");
    var panelBody = document.getElementById("map3d-panel-body");
    var panelClose = document.getElementById("map3d-panel-close");

    function selectDestination(dest) {
        state.selected = dest;
        renderPanel();
        if (panelEl) panelEl.classList.add("open");
    }

    function renderPanel() {
        if (!panelBody || !state.selected) return;
        var dest = state.selected;
        var isBookmarked = state.bookmarks.has(dest.id);
        var nearby = Core.nearestDestinations(dest, state.destinations, 4);

        panelBody.innerHTML =
            '<span class="map3d-panel-eyebrow">' + escapeHtml(dest.state) + '</span>' +
            '<h3>' + escapeHtml(dest.name) + '</h3>' +
            '<p class="map3d-panel-desc">' + escapeHtml(dest.description || "") + '</p>' +
            '<div class="map3d-panel-tags">' +
                dest.categories.map(function (c) { return '<span class="map3d-tag">' + escapeHtml(c) + '</span>'; }).join("") +
            '</div>' +
            '<ul class="map3d-highlights">' +
                (dest.highlights || []).map(function (h) { return '<li>' + escapeHtml(h) + '</li>'; }).join("") +
            '</ul>' +
            '<button class="map3d-bookmark-btn' + (isBookmarked ? ' active' : '') + '" id="map3d-bookmark-toggle">' +
                (isBookmarked ? "★ Bookmarked" : "☆ Bookmark this place") +
            '</button>' +
            '<h4>Nearby to explore</h4>' +
            '<ul class="map3d-nearby-list">' +
                nearby.map(function (n) {
                    return '<li data-dest-id="' + escapeHtml(n.destination.id) + '">' +
                        '<span>' + escapeHtml(n.destination.name) + '</span>' +
                        '<span class="map3d-nearby-dist">' + Math.round(n.distanceKm) + ' km</span>' +
                    '</li>';
                }).join("") +
            '</ul>';

        var bookmarkBtn = document.getElementById("map3d-bookmark-toggle");
        if (bookmarkBtn) {
            bookmarkBtn.addEventListener("click", function () {
                toggleBookmark(dest.id);
                renderPanel();
                rebuildMarkers();
            });
        }
        panelBody.querySelectorAll(".map3d-nearby-list li").forEach(function (li) {
            li.addEventListener("click", function () {
                var id = li.getAttribute("data-dest-id");
                var next = state.destinations.find(function (d) { return d.id === id; });
                if (next) selectDestination(next);
            });
        });
    }

    if (panelClose) {
        panelClose.addEventListener("click", function () {
            if (panelEl) panelEl.classList.remove("open");
        });
    }

    function escapeHtml(str) {
        var div = document.createElement("div");
        div.textContent = String(str == null ? "" : str);
        return div.innerHTML;
    }

    // ---------------------------------------------------------------
    // Bookmarks (localStorage)
    // ---------------------------------------------------------------
    function loadBookmarks() {
        try {
            var raw = localStorage.getItem("map3d:bookmarks");
            return new Set(raw ? JSON.parse(raw) : []);
        } catch (e) {
            return new Set();
        }
    }
    function saveBookmarks() {
        try {
            localStorage.setItem("map3d:bookmarks", JSON.stringify(Array.from(state.bookmarks)));
        } catch (e) { /* storage unavailable — bookmarks just won't persist */ }
    }
    function toggleBookmark(id) {
        if (state.bookmarks.has(id)) state.bookmarks.delete(id);
        else state.bookmarks.add(id);
        saveBookmarks();
    }

    // ---------------------------------------------------------------
    // Category filter chips
    // ---------------------------------------------------------------
    var filterBar = document.getElementById("map3d-filters");
    function buildFilterChips() {
        if (!filterBar) return;
        var categories = Array.from(new Set(state.destinations.flatMap(function (d) { return d.categories; }))).sort();
        filterBar.innerHTML = categories.map(function (c) {
            return '<button class="map3d-chip" data-cat="' + escapeHtml(c) + '">' + escapeHtml(c) + '</button>';
        }).join("");
        filterBar.querySelectorAll(".map3d-chip").forEach(function (chip) {
            chip.addEventListener("click", function () {
                var cat = chip.getAttribute("data-cat");
                if (state.activeCategories.has(cat)) {
                    state.activeCategories.delete(cat);
                    chip.classList.remove("active");
                } else {
                    state.activeCategories.add(cat);
                    chip.classList.add("active");
                }
                rebuildMarkers();
            });
        });
    }

    var bookmarkToggleEl = document.getElementById("map3d-bookmarked-toggle");
    if (bookmarkToggleEl) {
        bookmarkToggleEl.addEventListener("click", function () {
            state.bookmarkedOnly = !state.bookmarkedOnly;
            bookmarkToggleEl.classList.toggle("active", state.bookmarkedOnly);
            rebuildMarkers();
        });
    }

    var resetBtn = document.getElementById("map3d-reset-view");
    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            camera.position.set(0, 42, 34);
            controls.target.set(0, 0, 0);
            state.activeCategories.clear();
            state.bookmarkedOnly = false;
            if (bookmarkToggleEl) bookmarkToggleEl.classList.remove("active");
            filterBar && filterBar.querySelectorAll(".map3d-chip").forEach(function (c) { c.classList.remove("active"); });
            rebuildMarkers();
        });
    }

    // ---------------------------------------------------------------
    // Resize + render loop
    // ---------------------------------------------------------------
    window.addEventListener("resize", function () {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    var lastClusterDistance = null;
    function animate() {
        requestAnimationFrame(animate);
        controls.update();

        var camDist = camera.position.distanceTo(controls.target);
        if (lastClusterDistance === null || Math.abs(camDist - lastClusterDistance) > 2) {
            lastClusterDistance = camDist;
            rebuildMarkers();
        }

        renderer.render(scene, camera);
    }

    buildFilterChips();
    rebuildMarkers();
    animate();

    var loadingEl = document.getElementById("map3d-loading");
    if (loadingEl) loadingEl.style.display = "none";
})();
