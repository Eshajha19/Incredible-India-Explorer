
document.addEventListener("DOMContentLoaded", () => {
  const sites = [{"id": "delhi", "name": "Delhi Heritage Cluster", "state": "Delhi", "zone": "North", "x": 47, "y": 24, "cost": 3200, "days": 2, "energy": 16, "rating": 88, "type": "Monuments", "summary": "Explore Red Fort, Qutub Minar, Humayun's Tomb, museums, old city lanes, and Mughal heritage.", "image": "assets/heritage_forts.png"}, {"id": "agra", "name": "Agra Heritage Loop", "state": "Uttar Pradesh", "zone": "North", "x": 50, "y": 31, "cost": 2800, "days": 1, "energy": 12, "rating": 94, "type": "Monuments", "summary": "Plan around Taj Mahal, Agra Fort, Mughal gardens, marble craft, and Yamuna river heritage.", "image": "assets/heritage_temples.png"}, {"id": "jaipur", "name": "Jaipur Fort Circuit", "state": "Rajasthan", "zone": "West", "x": 39, "y": 33, "cost": 3500, "days": 2, "energy": 18, "rating": 90, "type": "Forts", "summary": "Balance Amer Fort, city palace routes, craft bazaars, stepwells, food, and pink city landmarks.", "image": "assets/heritage_forts.png"}, {"id": "sanchi", "name": "Sanchi Buddhist Trail", "state": "Madhya Pradesh", "zone": "Central", "x": 50, "y": 44, "cost": 2200, "days": 1, "energy": 10, "rating": 82, "type": "Buddhist", "summary": "Visit ancient stupas, gateways, inscriptions, and central Indian Buddhist heritage.", "image": "assets/heritage_ruins.png"}, {"id": "khajuraho", "name": "Khajuraho Temple Route", "state": "Madhya Pradesh", "zone": "Central", "x": 55, "y": 42, "cost": 2500, "days": 1, "energy": 12, "rating": 86, "type": "Temples", "summary": "A sculpture-rich temple circuit with strong art, architecture, and cultural interpretation value.", "image": "assets/heritage_temples.png"}, {"id": "hampi", "name": "Hampi Vijayanagara Quest", "state": "Karnataka", "zone": "South", "x": 43, "y": 70, "cost": 3000, "days": 2, "energy": 20, "rating": 96, "type": "Ruins", "summary": "A high-reward trail across temples, markets, boulders, river crossings, and Vijayanagara ruins.", "image": "assets/heritage_ruins.png"}, {"id": "mahabalipuram", "name": "Mahabalipuram Shore Trail", "state": "Tamil Nadu", "zone": "South", "x": 59, "y": 78, "cost": 2600, "days": 1, "energy": 11, "rating": 84, "type": "Coastal", "summary": "Connect shore temples, rock-cut monuments, sculpture panels, beaches, and Pallava heritage.", "image": "assets/travel_beaches.png"}, {"id": "thanjavur", "name": "Thanjavur Chola Circuit", "state": "Tamil Nadu", "zone": "South", "x": 55, "y": 84, "cost": 2800, "days": 1, "energy": 13, "rating": 89, "type": "Temples", "summary": "Visit Chola-era temple architecture, bronze traditions, classical art, and Tamil heritage.", "image": "assets/heritage_temples.png"}, {"id": "konark", "name": "Konark-Puri Heritage Run", "state": "Odisha", "zone": "East", "x": 69, "y": 58, "cost": 3000, "days": 2, "energy": 16, "rating": 87, "type": "Temples", "summary": "Optimise Sun Temple sightseeing with coastal travel, Puri culture, crafts, and food stops.", "image": "assets/heritage_temples.png"}, {"id": "sundarbans", "name": "Sundarbans Eco-Heritage", "state": "West Bengal", "zone": "East", "x": 76, "y": 54, "cost": 3600, "days": 2, "energy": 22, "rating": 88, "type": "Nature", "summary": "A demanding but rewarding trail through mangrove ecology, boat routes, wildlife, and delta life.", "image": "assets/travel_islands.png"}, {"id": "ellora", "name": "Ajanta-Ellora Cave Arc", "state": "Maharashtra", "zone": "West", "x": 39, "y": 55, "cost": 3400, "days": 2, "energy": 17, "rating": 92, "type": "Caves", "summary": "A cave-art strategy route across Buddhist, Hindu, and Jain rock-cut monuments.", "image": "assets/heritage_ruins.png"}, {"id": "rani-ki-vav", "name": "Patan Stepwell Strategy", "state": "Gujarat", "zone": "West", "x": 27, "y": 43, "cost": 2400, "days": 1, "energy": 10, "rating": 80, "type": "Stepwell", "summary": "A compact high-efficiency stop for stepwell architecture, water systems, and carved heritage.", "image": "assets/heritage_stepwells.png"}];
  const limits = { budget: 18000, days: 8, energy: 95 };
  const savedKey = "incredible-india-heritage-trail-best";

  const mapStage = document.getElementById("map-stage");
  const itineraryList = document.getElementById("itinerary-list");
  const savedRoute = document.getElementById("saved-route");
  let route = [];

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

  function distanceBetween(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.round(Math.hypot(dx, dy) * 38);
  }

  function routeDistance(items) {
    return items.slice(1).reduce((sum, site, index) => sum + distanceBetween(items[index], site), 0);
  }

  function routeTotals() {
    const selected = route.map((id) => sites.find((site) => site.id === id)).filter(Boolean);
    const budget = selected.reduce((sum, site) => sum + site.cost, 0);
    const days = selected.reduce((sum, site) => sum + site.days, 0);
    const energy = selected.reduce((sum, site) => sum + site.energy, 0);
    const rating = selected.reduce((sum, site) => sum + site.rating, 0);
    const distance = routeDistance(selected);
    const zones = new Set(selected.map((site) => site.zone)).size;
    const densityBonus = selected.length >= 3 ? Math.round(rating / Math.max(days, 1)) : 0;
    const penalty = Math.max(0, budget - limits.budget) / 160 + Math.max(0, days - limits.days) * 30 + Math.max(0, energy - limits.energy) * 3 + Math.max(0, distance - 4200) / 45;
    const score = Math.max(0, Math.round(rating + zones * 28 + densityBonus - penalty));
    return { selected, budget, days, energy, distance, rating, zones, score };
  }

  function renderMap() {
    mapStage.innerHTML = "";
    const totals = routeTotals();

    totals.selected.slice(1).forEach((site, index) => {
      const previous = totals.selected[index];
      const dx = site.x - previous.x;
      const dy = site.y - previous.y;
      const length = Math.hypot(dx, dy);
      const line = document.createElement("span");
      line.className = "route-line";
      line.style.left = `${previous.x}%`;
      line.style.top = `${previous.y}%`;
      line.style.width = `${length}%`;
      line.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
      mapStage.append(line);
    });

    sites.forEach((site) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `site-pin ${route.includes(site.id) ? "selected" : ""}`;
      button.style.left = `${site.x}%`;
      button.style.top = `${site.y}%`;
      button.dataset.siteId = site.id;
      button.innerHTML = `${route.includes(site.id) ? "✓ " : ""}${escapeHtml(site.name)}`;
      button.addEventListener("click", () => toggleSite(site.id));
      mapStage.append(button);
    });
  }

  function toggleSite(id) {
    if (route.includes(id)) {
      route = route.filter((siteId) => siteId !== id);
    } else {
      route.push(id);
    }
    renderAll();
  }

  function statusMessage(totals) {
    if (totals.selected.length < 3) return "Select at least 3 connected sites to build a strategic heritage trail.";
    const warnings = [];
    if (totals.budget > limits.budget) warnings.push("budget exceeded");
    if (totals.days > limits.days) warnings.push("day limit exceeded");
    if (totals.energy > limits.energy) warnings.push("traveller fatigue high");
    if (warnings.length) return `Route is playable but risky: ${warnings.join(", ")}.`;
    if (totals.zones >= 3) return "Excellent cross-zone itinerary with strong sightseeing density.";
    return "Good compact trail. Add another zone for a bigger exploration bonus.";
  }

  function renderMetrics() {
    const totals = routeTotals();
    document.getElementById("site-count").textContent = sites.length;
    document.getElementById("selected-count").textContent = totals.selected.length;
    document.getElementById("score-count").textContent = totals.score;
    document.getElementById("budget-used").textContent = `₹${totals.budget.toLocaleString("en-IN")}`;
    document.getElementById("days-used").textContent = totals.days;
    document.getElementById("energy-used").textContent = totals.energy;
    document.getElementById("distance-used").textContent = `${totals.distance} km`;
    document.getElementById("strategy-score").textContent = totals.score;
    document.getElementById("strategy-message").textContent = statusMessage(totals);
    document.getElementById("route-status").textContent = totals.selected.length ? `${totals.selected.length} stops planned` : "No route selected";
  }

  function renderItinerary() {
    const totals = routeTotals();
    if (!totals.selected.length) {
      itineraryList.innerHTML = '<div class="empty-route">No stops selected yet. Click map pins to build your route.</div>';
      return;
    }
    itineraryList.innerHTML = totals.selected.map((site, index) => `
      <article class="itinerary-item">
        <img src="${escapeHtml(site.image)}" alt="${escapeHtml(site.name)}" onerror="this.src='assets/hero_banner.png'">
        <div>
          <h4>${index + 1}. ${escapeHtml(site.name)}</h4>
          <p>${escapeHtml(site.state)} · ${escapeHtml(site.type)} · ${escapeHtml(site.summary)}</p>
        </div>
        <strong>₹${site.cost.toLocaleString("en-IN")} · ${site.days}d · ${site.energy} energy</strong>
      </article>
    `).join("");
  }

  function renderSaved() {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(savedKey) || "null");
    } catch {
      saved = null;
    }

    if (!saved) {
      savedRoute.innerHTML = '<div class="empty-route">No route saved yet.</div>';
      return;
    }

    savedRoute.innerHTML = `
      <div class="saved-summary">
        <strong>Score:</strong> ${saved.score} ·
        <strong>Budget:</strong> ₹${saved.budget.toLocaleString("en-IN")} ·
        <strong>Days:</strong> ${saved.days} ·
        <strong>Energy:</strong> ${saved.energy} ·
        <strong>Distance:</strong> ${saved.distance} km
        <br><strong>Stops:</strong> ${saved.names.map(escapeHtml).join(" → ")}
      </div>
    `;
  }

  function renderAll() {
    renderMap();
    renderMetrics();
    renderItinerary();
    renderSaved();
  }

  function autoPlan() {
    route = ["delhi", "agra", "jaipur", "sanchi", "khajuraho", "ellora"];
    renderAll();
    document.getElementById("strategy-message").textContent = "Starter route created. Adjust pins to improve score and reduce fatigue.";
  }

  function saveRoute() {
    const totals = routeTotals();
    if (totals.selected.length < 3) {
      alert("Select at least 3 sites before saving a strategy route.");
      return;
    }
    localStorage.setItem(savedKey, JSON.stringify({
      score: totals.score,
      budget: totals.budget,
      days: totals.days,
      energy: totals.energy,
      distance: totals.distance,
      names: totals.selected.map((site) => site.name),
      ids: route,
    }));
    renderSaved();
  }

  document.getElementById("auto-plan").addEventListener("click", autoPlan);
  document.getElementById("clear-route").addEventListener("click", () => {
    route = [];
    renderAll();
  });
  document.getElementById("save-route").addEventListener("click", saveRoute);
  document.getElementById("clear-saved").addEventListener("click", () => {
    localStorage.removeItem(savedKey);
    renderSaved();
  });

  renderAll();

  window.HeritageTrailStrategyGame = {
    sites: () => [...sites],
    autoPlan,
    clear: () => {
      route = [];
      renderAll();
    },
  };
});
