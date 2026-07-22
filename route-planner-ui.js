/**
 * route-planner-ui.js
 * Wires RoutePlanner (route-planner.js) to the DOM on route-planner.html.
 * Kept separate from route-planner.js so the routing/optimization logic
 * stays pure and unit-testable in Node without a DOM.
 */
(function () {
const { ROUTE_DESTINATIONS, TRANSPORT_MODES, DESTINATION_INFO, optimizeRoute, getRoute, formatDistance, formatDuration, recommendMode } = window.RoutePlanner;
  let stops = [];
  let mode = "road";
  let map, routeLayer, markersLayer;

  function initMap() {
    map = L.map("route-map", { scrollWheelZoom: false }).setView([22.5, 79], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);
    routeLayer = L.layerGroup().addTo(map);
    markersLayer = L.layerGroup().addTo(map);
  }

  function populateStopSelect() {
    const select = document.getElementById("stop-select");
    select.innerHTML = ROUTE_DESTINATIONS
      .map((d) => `<option value="${d.id}">${d.name}, ${d.state}</option>`)
      .join("");
  }

  function renderStopList() {
    const list = document.getElementById("stop-list");
    list.innerHTML = stops
      .map(
        (s, i) => `
        <li class="stop-item" data-id="${s.id}">
          <span class="stop-index">${i + 1}</span>
          <span class="stop-name">${s.name}</span>
          <button type="button" data-remove="${s.id}" aria-label="Remove ${s.name}">✕</button>
        </li>`
      )
      .join("");

    list.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        stops = stops.filter((s) => s.id !== btn.dataset.remove);
        renderStopList();
        renderMarkers();
        renderStopInfo();
      });
    });

    renderStopInfo();
  }

  function renderStopInfo() {
    const container = document.getElementById("stop-info");
    if (!container) return;
    if (!stops.length) {
      container.innerHTML = "";
      return;
    }
    container.innerHTML = stops
      .map((s) => {
        const info = DESTINATION_INFO[s.id];
        if (!info) return "";
        return `
          <div class="stop-info-card">
            <h4>${s.name}</h4>
            <p><strong>Best time to visit:</strong> ${info.bestTime}</p>
            <p><strong>Tip:</strong> ${info.tip}</p>
            <p><strong>Nearby attractions:</strong> ${info.attractions.join(", ")}</p>
          </div>`;
      })
      .join("");
  }

  function renderMarkers() {
    markersLayer.clearLayers();
    stops.forEach((s, i) => {
      L.marker([s.lat, s.lng])
        .addTo(markersLayer)
        .bindTooltip(`${i + 1}. ${s.name}`, { permanent: false });
    });
    if (stops.length) {
      const bounds = L.latLngBounds(stops.map((s) => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }

  function renderRouteOnMap(geometry) {
    routeLayer.clearLayers();
    if (!geometry) return;
    const latlngs = geometry.coordinates.map(([lng, lat]) => [lat, lng]);
    L.polyline(latlngs, { color: "#FF9933", weight: 4, opacity: 0.85 }).addTo(routeLayer);
  }

  function setStatus(text, isError) {
    const el = document.getElementById("route-status");
    el.textContent = text || "";
    el.classList.toggle("error", !!isError);
  }

function renderSummary(result) {
    document.getElementById("route-summary").hidden = false;
    document.getElementById("summary-distance").textContent = formatDistance(result.distanceKm);
    document.getElementById("summary-duration").textContent = formatDuration(result.durationMinutes);

    const recommended = TRANSPORT_MODES[recommendMode(result.distanceKm)];
    document.getElementById("summary-recommended").textContent = `${recommended.icon} ${recommended.label}`;
    const legList = document.getElementById("route-leg-list");
    legList.innerHTML = result.legs
      .map(
        (leg, i) =>
          `<li>${stops[i].name} → ${stops[i + 1].name}: ${formatDistance(leg.distanceKm)}, ${formatDuration(leg.durationMinutes)}</li>`
      )
      .join("");

    document.getElementById("route-estimated-note").hidden = !result.estimated;
  }

  async function calculateRoute() {
    if (stops.length < 2) {
      setStatus("Add at least two stops to calculate a route.", true);
      return;
    }
    setStatus("Calculating route…");
    try {
      const result = await getRoute(stops, mode);
      renderRouteOnMap(result.geometry);
      renderSummary(result);
      setStatus(result.fromCache ? "Loaded from cache." : "Route calculated.");
    } catch (err) {
      setStatus(err.message || "Could not calculate route.", true);
    }
  }

  function handleOptimize() {
    if (stops.length < 3) {
      setStatus("Add at least three stops to optimize the order.", true);
      return;
    }
    stops = optimizeRoute(stops);
    renderStopList();
    renderMarkers();
    setStatus("Stop order optimized. Recalculate the route to update distance/time.");
  }

  function handleAddStop() {
    const select = document.getElementById("stop-select");
    const dest = ROUTE_DESTINATIONS.find((d) => d.id === select.value);
    if (!dest || stops.find((s) => s.id === dest.id)) return;
    stops.push(dest);
    renderStopList();
    renderMarkers();
  }

  function handleModeChange(e) {
    const btn = e.target.closest(".mode-btn");
    if (!btn) return;
    mode = btn.dataset.mode;
    document.querySelectorAll(".mode-btn").forEach((b) => b.classList.toggle("active", b === btn));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initMap();
    populateStopSelect();
    document.getElementById("add-stop-btn").addEventListener("click", handleAddStop);
    document.getElementById("optimize-btn").addEventListener("click", handleOptimize);
    document.getElementById("calc-route-btn").addEventListener("click", calculateRoute);
    document.getElementById("mode-selector").addEventListener("click", handleModeChange);
  });
})();