/**
 * state-challenge.js
 * State Borders Journey Challenge - Data & Application Logic
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Core States & Neighboring Adjacency Dataset
export const statesData = [
  {
    id: "JK",
    name: "Jammu & Kashmir",
    capital: "Srinagar",
    neighbors: ["HP", "PB"],
    quiz: {
      question: "Which lake in Srinagar is famous for its houseboats (shikaras)?",
      answer: "Dal Lake"
    },
    coords: { x: 430, y: 90 }
  },
  {
    id: "HP",
    name: "Himachal Pradesh",
    capital: "Shimla",
    neighbors: ["JK", "PB", "HR", "UK", "UP"],
    quiz: {
      question: "Which mountain pass connects the Kullu Valley with the Lahaul and Spiti Valleys?",
      answer: "Rohtang Pass"
    },
    coords: { x: 450, y: 130 }
  },
  {
    id: "PB",
    name: "Punjab",
    capital: "Chandigarh",
    neighbors: ["JK", "HP", "HR", "RJ"],
    quiz: {
      question: "Which holy city in Punjab is home to the Golden Temple (Harmandir Sahib)?",
      answer: "Amritsar"
    },
    coords: { x: 410, y: 150 }
  },
  {
    id: "HR",
    name: "Haryana",
    capital: "Chandigarh",
    neighbors: ["HP", "PB", "RJ", "UP"],
    quiz: {
      question: "Which historic town in Haryana is known as the battlefield of the Mahabharata war?",
      answer: "Kurukshetra"
    },
    coords: { x: 440, y: 180 }
  },
  {
    id: "UK",
    name: "Uttarakhand",
    capital: "Dehradun",
    neighbors: ["HP", "UP"],
    quiz: {
      question: "Which holy river originates from the Gangotri glacier in Uttarakhand?",
      answer: "Ganga"
    },
    coords: { x: 480, y: 140 }
  },
  {
    id: "RJ",
    name: "Rajasthan",
    capital: "Jaipur",
    neighbors: ["PB", "HR", "UP", "MP", "GJ"],
    quiz: {
      question: "Which great desert covers most of western Rajasthan?",
      answer: "Thar Desert"
    },
    coords: { x: 370, y: 230 }
  },
  {
    id: "UP",
    name: "Uttar Pradesh",
    capital: "Lucknow",
    neighbors: ["HP", "HR", "UK", "RJ", "MP", "CG", "JH", "BR"],
    quiz: {
      question: "Which white marble monument in Agra is one of the Seven Wonders of the World?",
      answer: "Taj Mahal"
    },
    coords: { x: 490, y: 210 }
  },
  {
    id: "GJ",
    name: "Gujarat",
    capital: "Gandhinagar",
    neighbors: ["RJ", "MP", "MH"],
    quiz: {
      question: "Which national park in Gujarat is the only natural habitat of the Asiatic Lion?",
      answer: "Gir National Park"
    },
    coords: { x: 330, y: 290 }
  },
  {
    id: "MP",
    name: "Madhya Pradesh",
    capital: "Bhopal",
    neighbors: ["RJ", "UP", "GJ", "MH", "CG"],
    quiz: {
      question: "Which UNESCO World Heritage site in MP is famous for stone age cave paintings?",
      answer: "Bhimbetka"
    },
    coords: { x: 460, y: 290 }
  },
  {
    id: "MH",
    name: "Maharashtra",
    capital: "Mumbai",
    neighbors: ["GJ", "MP", "CG", "TG", "KA", "GA"],
    quiz: {
      question: "Which ancient rock-cut cave monument near Aurangabad is famous for painting frescoes?",
      answer: "Ajanta Caves"
    },
    coords: { x: 440, y: 370 }
  },
  {
    id: "GA",
    name: "Goa",
    capital: "Panaji",
    neighbors: ["MH", "KA"],
    quiz: {
      question: "Which four-tiered waterfall on the Mandovi River is a famous tourist attraction in Goa?",
      answer: "Dudhsagar Falls"
    },
    coords: { x: 420, y: 440 }
  },
  {
    id: "KA",
    name: "Karnataka",
    capital: "Bengaluru",
    neighbors: ["GA", "MH", "TG", "AP", "KL", "TN"],
    quiz: {
      question: "Which group of monuments and ruins was the capital of the Vijayanagara Empire?",
      answer: "Hampi"
    },
    coords: { x: 460, y: 450 }
  },
  {
    id: "KL",
    name: "Kerala",
    capital: "Thiruvananthapuram",
    neighbors: ["KA", "TN"],
    quiz: {
      question: "What is the name of Kerala's famous classical dance-drama known for heavy makeup and costumes?",
      answer: "Kathakali"
    },
    coords: { x: 470, y: 530 }
  },
  {
    id: "TN",
    name: "Tamil Nadu",
    capital: "Chennai",
    neighbors: ["KA", "KL", "AP"],
    quiz: {
      question: "Which coastal town near Chennai is famous for its rock-cut temples and stone monolith chariots?",
      answer: "Mahabalipuram"
    },
    coords: { x: 500, y: 520 }
  },
  {
    id: "AP",
    name: "Andhra Pradesh",
    capital: "Amaravati",
    neighbors: ["KA", "TN", "TG", "OD", "CG"],
    quiz: {
      question: "Which spaceport island housing ISRO's launch complex is located in Andhra Pradesh?",
      answer: "Sriharikota"
    },
    coords: { x: 510, y: 450 }
  },
  {
    id: "TG",
    name: "Telangana",
    capital: "Hyderabad",
    neighbors: ["MH", "KA", "AP", "CG"],
    quiz: {
      question: "Which majestic hilltop fortress is located on the western outskirts of Hyderabad?",
      answer: "Golconda Fort"
    },
    coords: { x: 490, y: 410 }
  },
  {
    id: "CG",
    name: "Chhattisgarh",
    capital: "Raipur",
    neighbors: ["MP", "MH", "TG", "AP", "OD", "JH", "UP"],
    quiz: {
      question: "Which waterfall in Bastar is widely known as the 'Niagara of India' due to its width?",
      answer: "Chitrakote Falls"
    },
    coords: { x: 520, y: 330 }
  },
  {
    id: "OD",
    name: "Odisha",
    capital: "Bhubaneswar",
    neighbors: ["AP", "CG", "JH", "WB"],
    quiz: {
      question: "Which UNESCO World Heritage site in Konark is styled as a colossal chariot of the Sun God?",
      answer: "Sun Temple"
    },
    coords: { x: 580, y: 330 }
  },
  {
    id: "JH",
    name: "Jharkhand",
    capital: "Ranchi",
    neighbors: ["UP", "CG", "OD", "WB", "BR"],
    quiz: {
      question: "Which industrial city in Jharkhand is named after the founder of the Tata Group?",
      answer: "Jamshedpur"
    },
    coords: { x: 560, y: 270 }
  },
  {
    id: "BR",
    name: "Bihar",
    capital: "Patna",
    neighbors: ["UP", "JH", "WB"],
    quiz: {
      question: "Which town in Bihar is the holy site where Prince Siddhartha attained enlightenment under the Bodhi Tree?",
      answer: "Bodh Gaya"
    },
    coords: { x: 550, y: 220 }
  },
  {
    id: "WB",
    name: "West Bengal",
    capital: "Kolkata",
    neighbors: ["OD", "JH", "BR", "SK", "AS"],
    quiz: {
      question: "Which delta region in West Bengal is the world's largest mangrove forest and home to the Royal Bengal Tiger?",
      answer: "Sundarbans"
    },
    coords: { x: 600, y: 270 }
  },
  {
    id: "SK",
    name: "Sikkim",
    capital: "Gangtok",
    neighbors: ["WB"],
    quiz: {
      question: "Which mountain on Sikkim's border is the third highest peak in the world?",
      answer: "Kanchenjunga"
    },
    coords: { x: 600, y: 180 }
  },
  {
    id: "AS",
    name: "Assam",
    capital: "Dispur",
    neighbors: ["WB", "AR", "NL", "MN", "MZ", "TR", "ML"],
    quiz: {
      question: "Which famous national park in Assam is known for preserving the world's largest population of great Indian one-horned rhinoceroses?",
      answer: "Kaziranga"
    },
    coords: { x: 680, y: 210 }
  },
  {
    id: "AR",
    name: "Arunachal Pradesh",
    capital: "Itanagar",
    neighbors: ["AS", "NL"],
    quiz: {
      question: "Which Buddhist monastery in Arunachal is the largest in India and second largest in the world?",
      answer: "Tawang Monastery"
    },
    coords: { x: 720, y: 180 }
  },
  {
    id: "NL",
    name: "Nagaland",
    capital: "Kohima",
    neighbors: ["AS", "AR", "MN"],
    quiz: {
      question: "Which annual festival in Nagaland showcases all Naga tribal cultures in a single event?",
      answer: "Hornbill Festival"
    },
    coords: { x: 740, y: 210 }
  },
  {
    id: "MN",
    name: "Manipur",
    capital: "Imphal",
    neighbors: ["AS", "NL", "MZ"],
    quiz: {
      question: "Which freshwater lake in Manipur is famous for its floating phumdis and Keibul Lamjao Park?",
      answer: "Loktak Lake"
    },
    coords: { x: 730, y: 230 }
  },
  {
    id: "MZ",
    name: "Mizoram",
    capital: "Aizawl",
    neighbors: ["AS", "MN", "TR"],
    quiz: {
      question: "Which traditional Mizo folk dance utilizes bamboo staves clapped together rhythmically?",
      answer: "Cheraw Dance"
    },
    coords: { x: 720, y: 260 }
  },
  {
    id: "TR",
    name: "Tripura",
    capital: "Agartala",
    neighbors: ["AS", "MZ"],
    quiz: {
      question: "Which water palace in Agartala is built in the middle of Rudrasagar Lake?",
      answer: "Neermahal"
    },
    coords: { x: 700, y: 250 }
  },
  {
    id: "ML",
    name: "Meghalaya",
    capital: "Shillong",
    neighbors: ["AS"],
    quiz: {
      question: "Which village in Meghalaya holds the world record for the highest average annual rainfall?",
      answer: "Mawsynram"
    },
    coords: { x: 670, y: 230 }
  }
];

/**
 * Check if two states are neighboring/adjacent.
 */
export function checkAdjacency(stateAId, stateBId, dataset = statesData) {
  if (!stateAId || !stateBId) return false;
  const stateA = dataset.find(s => s.id === stateAId);
  return !!(stateA && stateA.neighbors.includes(stateBId));
}

/**
 * Verify if user answered the quiz trivia correctly (case-insensitive).
 */
export function verifyQuizAnswer(stateId, userAnswer, dataset = statesData) {
  if (!stateId || !userAnswer) return false;
  const state = dataset.find(s => s.id === stateId);
  if (!state) return false;
  return state.quiz.answer.trim().toLowerCase() === userAnswer.trim().toLowerCase();
}

/**
 * Get unlocked achievements based on path travel log.
 */
export function getAchievements(path = []) {
  const achievements = [];
  if (!Array.isArray(path) || path.length === 0) return achievements;

  const pathSet = new Set(path);

  // 1. Coastal Cruiser (touches coastal states: MH, GA, KA, KL, TN, AP, OD, WB)
  const coastal = ["MH", "GA", "KA", "KL", "TN", "AP", "OD", "WB"];
  const coastalCrossed = coastal.filter(s => pathSet.has(s));
  if (coastalCrossed.length >= 4) {
    achievements.push({
      id: "coastal",
      title: "Coastal Cruiser",
      description: "Cruised through 4 or more beautiful coastal states of India."
    });
  }

  // 2. Himalayan Explorer (touches mountains: JK, HP, UK, SK, AR)
  const himalayas = ["JK", "HP", "UK", "SK", "AR"];
  const himalayasCrossed = himalayas.filter(s => pathSet.has(s));
  if (himalayasCrossed.length >= 3) {
    achievements.push({
      id: "himalayan",
      title: "Himalayan Explorer",
      description: "Explored 3 or more high altitude Himalayan border states."
    });
  }

  // 3. Seven Sisters (touches Northeast sisters: AS, AR, NL, MN, MZ, TR, ML)
  const sisters = ["AS", "AR", "NL", "MN", "MZ", "TR", "ML"];
  const sistersCrossed = sisters.filter(s => pathSet.has(s));
  if (sistersCrossed.length >= 4) {
    achievements.push({
      id: "sevensisters",
      title: "Seven Sisters Advocate",
      description: "Crossed into 4 or more Northeastern sister states."
    });
  }

  // 4. Great Traverse
  if (path.length >= 8) {
    achievements.push({
      id: "traverse",
      title: "The Great Traverse",
      description: "Crossed a total of 8 or more state borders in a single journey."
    });
  }

  // 5. Border Crosser (first crossing)
  if (path.length >= 2) {
    achievements.push({
      id: "bordercrosser",
      title: "Border Crosser",
      description: "Initiated the journey by successfully crossing your first border!"
    });
  }

  return achievements;
}

/**
 * Filter states list by search query.
 */
export function filterStatesList(items, query = "") {
  if (!Array.isArray(items)) return [];
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(s => 
    s.name.toLowerCase().includes(q) || 
    s.capital.toLowerCase().includes(q) || 
    s.id.toLowerCase().includes(q)
  );
}

/**
 * Helper to calculate shortest path length between two states (BFS).
 */
export function calculateJourneyPath(startId, endId, dataset = statesData) {
  if (!startId || !endId) return [];
  if (startId === endId) return [startId];

  const queue = [[startId]];
  const visited = new Set([startId]);

  while (queue.length > 0) {
    const currentPath = queue.shift();
    const currentId = currentPath[currentPath.length - 1];

    const currentState = dataset.find(s => s.id === currentId);
    if (currentState) {
      for (const neighbor of currentState.neighbors) {
        if (neighbor === endId) {
          return [...currentPath, endId];
        }
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...currentPath, neighbor]);
        }
      }
    }
  }

  return []; // path not found
}

/* ==========================================================================
   BROWSER DOM & TRIVIA WORKSPACE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.statesData = statesData;
  window.checkAdjacency = checkAdjacency;
  window.verifyQuizAnswer = verifyQuizAnswer;
  window.getAchievements = getAchievements;
  window.calculateJourneyPath = calculateJourneyPath;

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("state-search");
    const startSelect = document.getElementById("start-state");
    const destinationSelect = document.getElementById("destination-state");
    const btnStartJourney = document.getElementById("btn-start-journey");

    // Game stats
    const statsLocation = document.getElementById("stat-location");
    const statsStreak = document.getElementById("stat-streak");
    const statsScore = document.getElementById("stat-score");

    // SVG Map
    const svgMap = document.getElementById("borders-map");
    const connectionsGroup = document.getElementById("map-connections");
    const statesGroup = document.getElementById("map-nodes");

    // Quiz Panel
    const quizCard = document.getElementById("quiz-card");
    const quizStateName = document.getElementById("quiz-state-name");
    const quizQuestion = document.getElementById("quiz-question");
    const quizInput = document.getElementById("quiz-answer-input");
    const btnSubmitAnswer = document.getElementById("btn-submit-answer");
    const quizFeedback = document.getElementById("quiz-feedback");

    // Journey Path Log
    const pathLogList = document.getElementById("path-log-list");

    // Achievements Shelf
    const achievementsShelf = document.getElementById("achievements-shelf");

    let currentPosition = null; // state ID
    let destinationPosition = null; // state ID
    let currentStreak = 0;
    let travelLog = []; // list of visited state IDs
    let targetPendingState = null; // state ID user is trying to cross into

    // Populate start/destination selects
    statesData.forEach(state => {
      const opt1 = document.createElement("option");
      opt1.value = state.id;
      opt1.textContent = state.name;
      startSelect?.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = state.id;
      opt2.textContent = state.name;
      destinationSelect?.appendChild(opt2);
    });

    function drawMap() {
      if (!svgMap || !statesGroup || !connectionsGroup) return;

      // 1. Draw Neighbor connection paths
      connectionsGroup.innerHTML = "";
      const drawnLinks = new Set();
      statesData.forEach(state => {
        state.neighbors.forEach(nId => {
          const key = [state.id, nId].sort().join("-");
          if (!drawnLinks.has(key)) {
            drawnLinks.add(key);
            const neighbor = statesData.find(s => s.id === nId);
            if (neighbor) {
              const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
              line.setAttribute("x1", state.coords.x);
              line.setAttribute("y1", state.coords.y);
              line.setAttribute("x2", neighbor.coords.x);
              line.setAttribute("y2", neighbor.coords.y);
              line.setAttribute("class", "map-border-line");
              connectionsGroup.appendChild(line);
            }
          }
        });
      });

      // 2. Draw State nodes
      statesGroup.innerHTML = "";
      statesData.forEach(state => {
        const isCurrent = currentPosition === state.id;
        const isDestination = destinationPosition === state.id;
        const isAdjacent = currentPosition && checkAdjacency(currentPosition, state.id);

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", `state-node ${isCurrent ? "current" : ""} ${isDestination ? "destination" : ""} ${isAdjacent ? "adjacent" : ""}`);
        g.setAttribute("transform", `translate(${state.coords.x}, ${state.coords.y})`);
        g.setAttribute("tabindex", "0");
        g.setAttribute("role", "button");

        // Outer glow
        const glow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        glow.setAttribute("r", isCurrent || isDestination ? 18 : 12);
        glow.setAttribute("class", "node-glow-ring");

        // Inner dot
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("r", isCurrent || isDestination ? 10 : 6);
        dot.setAttribute("class", "node-core-dot");

        // Label
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("y", -16);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("class", "node-map-label");
        label.textContent = state.name;

        g.appendChild(glow);
        g.appendChild(dot);
        g.appendChild(label);

        // Click to step
        g.addEventListener("click", () => {
          if (isAdjacent) {
            promptBorderCrossing(state.id);
          }
        });

        g.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (isAdjacent) {
              promptBorderCrossing(state.id);
            }
          }
        });

        statesGroup.appendChild(g);
      });
    }

    btnStartJourney?.addEventListener("click", () => {
      const startId = startSelect.value;
      const destId = destinationSelect.value;

      if (startId === destId) {
        alert("Please choose different starting and destination states.");
        return;
      }

      currentPosition = startId;
      destinationPosition = destId;
      currentStreak = 0;
      travelLog = [startId];
      targetPendingState = null;

      // Close quiz panel
      if (quizCard) quizCard.hidden = true;
      if (quizFeedback) quizFeedback.textContent = "";

      updateDashboard();
      drawMap();
    });

    function promptBorderCrossing(stateId) {
      const targetState = statesData.find(s => s.id === stateId);
      if (!targetState) return;

      targetPendingState = stateId;

      if (quizCard) {
        quizCard.hidden = false;
        quizCard.classList.add("active");
        if (quizStateName) quizStateName.textContent = targetState.name;
        if (quizQuestion) quizQuestion.textContent = targetState.quiz.question;
        if (quizInput) {
          quizInput.value = "";
          quizInput.focus();
        }
        if (quizFeedback) quizFeedback.textContent = "";
      }
    }

    btnSubmitAnswer?.addEventListener("click", () => {
      if (!targetPendingState) return;

      const answer = quizInput.value;
      const isCorrect = verifyQuizAnswer(targetPendingState, answer);

      if (isCorrect) {
        // Success
        currentStreak++;
        currentPosition = targetPendingState;
        travelLog.push(currentPosition);

        if (quizFeedback) {
          quizFeedback.textContent = "✅ Correct Answer! Border crossed successfully.";
          quizFeedback.style.color = "#10b981";
        }

        setTimeout(() => {
          if (quizCard) quizCard.hidden = true;
          targetPendingState = null;

          // Check Win Condition
          if (currentPosition === destinationPosition) {
            alert(`🎉 Congratulations! You have successfully reached ${statesData.find(s => s.id === destinationPosition).name} in ${travelLog.length - 1} border crossings!`);
          }

          updateDashboard();
          drawMap();
        }, 1500);
      } else {
        // Fail
        currentStreak = 0;
        if (quizFeedback) {
          quizFeedback.textContent = "❌ Incorrect Answer. Try again!";
          quizFeedback.style.color = "#ef4444";
        }
      }
    });

    // Support keyboard submit on Enter
    quizInput?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        btnSubmitAnswer?.click();
      }
    });

    function updateDashboard() {
      const current = statesData.find(s => s.id === currentPosition);
      const dest = statesData.find(s => s.id === destinationPosition);

      if (statsLocation) {
        statsLocation.textContent = current ? `${current.name} (Destination: ${dest ? dest.name : 'N/A'})` : "Choose Start & Destination";
      }

      if (statsStreak) {
        statsStreak.textContent = currentStreak;
      }

      if (statsScore) {
        statsScore.textContent = travelLog.length > 0 ? travelLog.length - 1 : 0;
      }

      // Update Path Log Timeline
      if (pathLogList) {
        pathLogList.innerHTML = "";
        travelLog.forEach((id, idx) => {
          const state = statesData.find(s => s.id === id);
          if (state) {
            const li = document.createElement("li");
            li.innerHTML = `
              <strong>${idx === 0 ? "Start" : `Step ${idx}`}:</strong> 
              <span>${state.name} (${state.capital})</span>
            `;
            pathLogList.appendChild(li);
          }
        });
      }

      // Update achievements
      if (achievementsShelf) {
        achievementsShelf.innerHTML = "";
        const achievements = getAchievements(travelLog);

        if (achievements.length === 0) {
          achievementsShelf.innerHTML = "<p class='muted'>No badges earned yet. Cross adjacent states to unlock.</p>";
        } else {
          achievements.forEach(ach => {
            const badge = document.createElement("div");
            badge.className = "achievement-badge";
            badge.innerHTML = `
              <div class="badge-icon">🏆</div>
              <div class="badge-info">
                <h4>${ach.title}</h4>
                <p>${ach.description}</p>
              </div>
            `;
            achievementsShelf.appendChild(badge);
          });
        }
      }
    }

    // Interactive search to center map or highlights
    searchInput?.addEventListener("input", () => {
      const val = searchInput.value;
      const filtered = filterStatesList(statesData, val);
      // Optional: Add styling highlighting to search-matched states on map
    });

    // Initial render
    drawMap();
    updateDashboard();
  });
}
