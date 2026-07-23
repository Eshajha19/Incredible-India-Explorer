
document.addEventListener("DOMContentLoaded", () => {
  const routes = [{"id": "ladakh", "name": "Ladakh High Pass", "range": "Himalayan", "state": "Ladakh", "difficulty": "Hard", "altitude": 5359, "days": 4, "supplies": 28, "survival": -18, "reward": 42, "image": "../../assets/travel_mountains.png", "challenge": "Which mountain range system is Ladakh mainly associated with?", "options": ["Himalayan", "Western Ghats", "Eastern Ghats", "Aravalli"], "answer": "Himalayan", "fact": "Ladakh's high-altitude passes require careful acclimatisation and supply planning."}, {"id": "sikkim", "name": "Sikkim Alpine Trail", "range": "Himalayan", "state": "Sikkim", "difficulty": "Hard", "altitude": 4500, "days": 3, "supplies": 24, "survival": -15, "reward": 40, "image": "../../assets/travel_mountains.png", "challenge": "Which famous peak is strongly associated with Sikkim?", "options": ["Kangchenjunga", "Anamudi", "Mahendragiri", "Guru Shikhar"], "answer": "Kangchenjunga", "fact": "Sikkim routes are known for alpine landscapes and Kangchenjunga views."}, {"id": "uttarakhand", "name": "Garhwal Glacier Walk", "range": "Himalayan", "state": "Uttarakhand", "difficulty": "Medium", "altitude": 3900, "days": 3, "supplies": 20, "survival": -13, "reward": 34, "image": "../../assets/travel_mountains.png", "challenge": "Which river is strongly linked with Uttarakhand pilgrimage geography?", "options": ["Ganga", "Mandovi", "Kaveri", "Indravati"], "answer": "Ganga", "fact": "Uttarakhand combines Himalayan trekking, glaciers, sacred rivers, and forest trails."}, {"id": "munnar", "name": "Munnar Tea Ridge", "range": "Western Ghats", "state": "Kerala", "difficulty": "Easy", "altitude": 1600, "days": 2, "supplies": 12, "survival": -6, "reward": 24, "image": "../../assets/travel_forests.png", "challenge": "Munnar is part of which mountain system?", "options": ["Western Ghats", "Himalayan", "Eastern Ghats", "Vindhya"], "answer": "Western Ghats", "fact": "Munnar is known for tea gardens, misty ridges, and biodiversity-rich Western Ghats slopes."}, {"id": "nilgiri", "name": "Nilgiri Blue Hills", "range": "Western Ghats", "state": "Tamil Nadu", "difficulty": "Medium", "altitude": 2637, "days": 2, "supplies": 15, "survival": -9, "reward": 29, "image": "../../assets/travel_mountains.png", "challenge": "The Nilgiri Hills are connected to which wider mountain chain?", "options": ["Western Ghats", "Aravalli", "Satpura", "Eastern Ghats"], "answer": "Western Ghats", "fact": "The Nilgiris form a major meeting zone of hill ecology in southern India."}, {"id": "coorg", "name": "Coorg Coffee Highlands", "range": "Western Ghats", "state": "Karnataka", "difficulty": "Easy", "altitude": 1750, "days": 2, "supplies": 11, "survival": -6, "reward": 25, "image": "../../assets/travel_forests.png", "challenge": "Coorg is famous for which crop and hill landscape?", "options": ["Coffee", "Saffron", "Wheat", "Tea only"], "answer": "Coffee", "fact": "Coorg combines coffee estates, forested ridges, waterfalls, and Western Ghats biodiversity."}, {"id": "araku", "name": "Araku Valley Route", "range": "Eastern Ghats", "state": "Andhra Pradesh", "difficulty": "Easy", "altitude": 1300, "days": 2, "supplies": 10, "survival": -5, "reward": 23, "image": "../../assets/travel_forests.png", "challenge": "Araku Valley belongs to which mountain system?", "options": ["Eastern Ghats", "Western Ghats", "Himalayan", "Karakoram"], "answer": "Eastern Ghats", "fact": "Araku Valley is a scenic Eastern Ghats region known for coffee, caves, and tribal culture."}, {"id": "mahendragiri", "name": "Mahendragiri Ridge", "range": "Eastern Ghats", "state": "Odisha", "difficulty": "Medium", "altitude": 1501, "days": 2, "supplies": 14, "survival": -8, "reward": 27, "image": "../../assets/travel_hidden.png", "challenge": "Mahendragiri is a notable peak in which range?", "options": ["Eastern Ghats", "Himalayan", "Western Ghats", "Aravalli"], "answer": "Eastern Ghats", "fact": "Mahendragiri is an important Eastern Ghats peak associated with biodiversity and mythology."}, {"id": "jeypore", "name": "Jeypore Hill Circuit", "range": "Eastern Ghats", "state": "Odisha", "difficulty": "Medium", "altitude": 1200, "days": 2, "supplies": 13, "survival": -7, "reward": 26, "image": "../../assets/travel_forests.png", "challenge": "Which region best describes the Jeypore hill circuit?", "options": ["Eastern Ghats", "Thar Desert", "Coastal Plain", "Indo-Gangetic Plain"], "answer": "Eastern Ghats", "fact": "Jeypore and nearby hill regions connect forests, tribal heritage, and Eastern Ghats terrain."}, {"id": "meghalaya", "name": "Meghalaya Rain Ridge", "range": "Northeast Hills", "state": "Meghalaya", "difficulty": "Medium", "altitude": 1496, "days": 2, "supplies": 16, "survival": -10, "reward": 31, "image": "../../assets/travel_hidden.png", "challenge": "Meghalaya's rainy hill routes are famous for what natural feature?", "options": ["Living root bridges", "Sand dunes", "Salt flats", "Mangrove islands"], "answer": "Living root bridges", "fact": "Meghalaya expedition routes often combine rainforests, caves, waterfalls, and living root bridges."}];
  const events = [{"title": "Altitude sickness", "text": "Thin air slows the team. Survival drops unless you choose easier routes next.", "supplies": -3, "survival": -9}, {"title": "Local guide bonus", "text": "A guide helps you find a safer shortcut and explains regional geography.", "supplies": 2, "survival": 7}, {"title": "Landslide detour", "text": "A blocked trail costs extra supplies and time.", "supplies": -5, "survival": -6}, {"title": "Clear weather window", "text": "Good visibility boosts morale and route progress.", "supplies": 0, "survival": 8}, {"title": "Forest leech zone", "text": "Wet forest terrain slows the group and drains energy.", "supplies": -2, "survival": -5}];
  const saveKey = "incredible-india-mountain-expedition-save";

  const gearConfig = {
    light: { supplies: -3, survival: -5, label: "light pack" },
    balanced: { supplies: 0, survival: 0, label: "balanced pack" },
    heavy: { supplies: 5, survival: 7, label: "heavy safety pack" },
  };

  const paceConfig = {
    slow: { days: 1, supplies: 3, survival: 8, label: "slow acclimatisation" },
    steady: { days: 0, supplies: 0, survival: 0, label: "steady pace" },
    fast: { days: -1, supplies: -4, survival: -8, label: "fast push" },
  };

  let game = {
    supplies: 90,
    survival: 100,
    score: 0,
    daysUsed: 0,
    completed: [],
    activeRange: "All",
    pendingRoute: null,
  };

  const routeGrid = document.getElementById("route-grid");
  const completedGrid = document.getElementById("completed-grid");
  const eventCard = document.getElementById("event-card");
  const quizPanel = document.getElementById("quiz-panel");
  const choiceGrid = document.getElementById("choice-grid");
  const feedback = document.getElementById("feedback-card");

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

  function selectedModifiers() {
    const gear = gearConfig[document.getElementById("gear-select").value];
    const pace = paceConfig[document.getElementById("pace-select").value];
    return { gear, pace };
  }

  function routeCost(route) {
    const { gear, pace } = selectedModifiers();
    return {
      supplies: Math.max(3, route.supplies + gear.supplies + pace.supplies),
      survival: route.survival + gear.survival + pace.survival,
      days: Math.max(1, route.days + pace.days),
      gear,
      pace,
    };
  }

  function randomEvent() {
    return events[Math.floor(Math.random() * events.length)];
  }

  function updateStats() {
    document.getElementById("supplies").textContent = game.supplies;
    document.getElementById("survival").textContent = game.survival;
    document.getElementById("score").textContent = game.score;
    document.getElementById("days-used").textContent = game.daysUsed;
    document.getElementById("supply-total").textContent = game.supplies;
    document.getElementById("survival-total").textContent = game.survival;
    document.getElementById("completed-total").textContent = `${game.completed.length}/${routes.length}`;

    const rank = game.completed.length >= routes.length
      ? "Summit legend"
      : game.completed.length >= 7
        ? "Expedition leader"
        : game.completed.length >= 4
          ? "Ridge explorer"
          : "Base camp learner";

    document.getElementById("rank-label").textContent = rank;
  }

  function visibleRoutes() {
    if (game.activeRange === "All") return routes;
    return routes.filter((route) => route.range === game.activeRange);
  }

  function renderRoutes() {
    routeGrid.innerHTML = visibleRoutes().map((route) => {
      const completed = game.completed.includes(route.id);
      const cost = routeCost(route);
      const blocked = completed || game.supplies < cost.supplies || game.survival + cost.survival <= 0;

      return `
        <article class="route-card ${completed ? "completed" : ""}">
          <img src="${escapeHtml(route.image)}" alt="${escapeHtml(route.name)} route" onerror="this.src='../../assets/hero_banner.png'">
          <div class="route-card-body">
            <h4>${completed ? "✓ " : ""}${escapeHtml(route.name)}</h4>
            <p>
              ${escapeHtml(route.range)} · ${escapeHtml(route.state)}<br>
              Altitude: ${route.altitude} m · ${escapeHtml(route.difficulty)}<br>
              Cost: ${cost.supplies} supplies · ${cost.days} days · survival ${cost.survival}
            </p>
            <button type="button" data-route="${escapeHtml(route.id)}" ${blocked ? "disabled" : ""}>
              ${completed ? "Completed" : "Start route"}
            </button>
          </div>
        </article>
      `;
    }).join("");

    routeGrid.querySelectorAll("[data-route]").forEach((button) => {
      button.addEventListener("click", () => startRoute(button.dataset.route));
    });
  }

  function renderCompleted() {
    completedGrid.innerHTML = routes.map((route) => {
      const done = game.completed.includes(route.id);
      return `<div class="completed-chip ${done ? "done" : ""}">${done ? "✓ " : "○ "}${escapeHtml(route.name)}</div>`;
    }).join("");
  }

  function renderAll() {
    updateStats();
    renderRoutes();
    renderCompleted();
  }

  function startRoute(routeId) {
    const route = routes.find((item) => item.id === routeId);
    if (!route || game.completed.includes(routeId)) return;

    game.pendingRoute = routeId;
    quizPanel.hidden = false;
    feedback.className = "feedback-card";
    feedback.innerHTML = "";
    document.getElementById("quiz-title").textContent = route.name;
    document.getElementById("quiz-meta").textContent = `${route.range} · ${route.state} · ${route.difficulty}`;
    document.getElementById("quiz-question").textContent = route.challenge;

    choiceGrid.innerHTML = shuffle(route.options).map((option) => `
      <button class="choice-btn" type="button" data-answer="${escapeHtml(option)}">${escapeHtml(option)}</button>
    `).join("");

    choiceGrid.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => resolveQuiz(button));
    });
  }

  function resolveQuiz(button) {
    const route = routes.find((item) => item.id === game.pendingRoute);
    if (!route) return;

    const correct = button.dataset.answer === route.answer;
    choiceGrid.querySelectorAll("button").forEach((choice) => {
      choice.disabled = true;
      if (choice.dataset.answer === route.answer) choice.classList.add("correct");
    });

    if (!correct) button.classList.add("wrong");

    const cost = routeCost(route);
    const event = Math.random() < 0.68 ? randomEvent() : null;

    game.supplies -= cost.supplies;
    game.survival = clamp(game.survival + cost.survival, 0, 100);
    game.daysUsed += cost.days;

    let eventText = "";
    if (event) {
      game.supplies += event.supplies;
      game.survival = clamp(game.survival + event.survival, 0, 100);
      eventText = `<br><br><strong>Expedition event: ${escapeHtml(event.title)}</strong><br>${escapeHtml(event.text)}<br>Impact: ${event.supplies} supplies · survival ${event.survival}`;
    }

    if (correct) {
      game.score += route.reward;
      if (!game.completed.includes(route.id)) game.completed.push(route.id);
      feedback.className = "feedback-card visible";
      feedback.innerHTML = `<strong>Correct! Route completed.</strong><br>${escapeHtml(route.fact)}<br>Reward: +${route.reward} score.${eventText}`;
    } else {
      game.score += Math.round(route.reward / 3);
      feedback.className = "feedback-card visible";
      feedback.innerHTML = `<strong>Wrong answer, but the expedition continues.</strong><br>Correct answer: <strong>${escapeHtml(route.answer)}</strong>.<br>${escapeHtml(route.fact)}${eventText}`;
    }

    if (game.supplies <= 0 || game.survival <= 0) {
      feedback.innerHTML += "<br><br><strong>Survival warning:</strong> supplies or survival are critically low. Use rest camp or reset.";
    }

    renderAll();
  }

  function restCamp() {
    if (game.supplies < 6) {
      eventCard.className = "event-card visible";
      eventCard.innerHTML = "<strong>Cannot rest.</strong> You need at least 6 supplies for a safe camp.";
      return;
    }

    game.supplies -= 6;
    game.survival = clamp(game.survival + 18, 0, 100);
    game.daysUsed += 1;
    eventCard.className = "event-card visible";
    eventCard.innerHTML = "<strong>Rest camp complete.</strong> Survival restored by 18 points.";
    renderAll();
  }

  function suggestRoute() {
    const available = visibleRoutes()
      .filter((route) => !game.completed.includes(route.id))
      .map((route) => ({ route, cost: routeCost(route) }))
      .filter((item) => item.cost.supplies <= game.supplies && game.survival + item.cost.survival > 0)
      .sort((a, b) => (b.route.reward / b.cost.supplies) - (a.route.reward / a.cost.supplies));

    eventCard.className = "event-card visible";
    if (!available.length) {
      eventCard.innerHTML = "<strong>No safe route found.</strong> Rest or change gear/pace strategy.";
      return;
    }

    const best = available[0];
    eventCard.innerHTML = `<strong>Suggested route:</strong> ${escapeHtml(best.route.name)} · ${best.cost.supplies} supplies · ${best.cost.days} days · best reward-per-supply route in current filter.`;
  }

  function saveGame() {
    localStorage.setItem(saveKey, JSON.stringify(game));
    eventCard.className = "event-card visible";
    eventCard.innerHTML = "<strong>Expedition saved.</strong> Your mountain progress is stored in this browser.";
  }

  function resetGame() {
    if (!confirm("Reset Mountain Expedition progress?")) return;
    localStorage.removeItem(saveKey);
    game = {
      supplies: 90,
      survival: 100,
      score: 0,
      daysUsed: 0,
      completed: [],
      activeRange: "All",
      pendingRoute: null,
    };
    quizPanel.hidden = true;
    eventCard.className = "event-card";
    eventCard.innerHTML = "";
    renderAll();
  }

  function loadGame() {
    try {
      const saved = JSON.parse(localStorage.getItem(saveKey) || "null");
      if (saved && Array.isArray(saved.completed)) game = saved;
    } catch {
      // Ignore corrupt saves.
    }
  }

  document.querySelectorAll("[data-range]").forEach((button) => {
    button.addEventListener("click", () => {
      game.activeRange = button.dataset.range;
      document.querySelectorAll("[data-range]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderRoutes();
    });
  });

  ["gear-select", "pace-select"].forEach((id) => {
    document.getElementById(id).addEventListener("change", renderRoutes);
  });

  document.getElementById("rest-button").addEventListener("click", restCamp);
  document.getElementById("suggest-route").addEventListener("click", suggestRoute);
  document.getElementById("save-game").addEventListener("click", saveGame);
  document.getElementById("reset-game").addEventListener("click", resetGame);

  loadGame();
  renderAll();

  window.MountainExpeditionAdventure = {
    routes: () => [...routes],
    state: () => ({ ...game }),
    suggestRoute,
    saveGame,
    resetGame,
  };
});
