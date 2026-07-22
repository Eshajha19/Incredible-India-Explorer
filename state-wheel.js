
document.addEventListener("DOMContentLoaded", () => {
  const states = [{"id": "rajasthan", "state": "Rajasthan", "region": "West", "color": "#ff9933", "challenge": "Which desert is strongly associated with Rajasthan?", "options": ["Thar Desert", "Rann of Kutch", "Cold Desert", "Sundarbans"], "answer": "Thar Desert", "fact": "Rajasthan is famous for desert landscapes, forts, palaces, stepwells, and folk traditions.", "image": "assets/travel_deserts.png"}, {"id": "kerala", "state": "Kerala", "region": "South", "color": "#138808", "challenge": "Which classical dance-drama is strongly associated with Kerala?", "options": ["Kathakali", "Garba", "Bhangra", "Lavani"], "answer": "Kathakali", "fact": "Kerala is known for backwaters, Ayurveda, coconut landscapes, Kathakali, and spice heritage.", "image": "assets/travel_islands.png"}, {"id": "assam", "state": "Assam", "region": "Northeast", "color": "#4f8cff", "challenge": "Which crop and drink is Assam globally famous for?", "options": ["Tea", "Coffee", "Saffron", "Coconut"], "answer": "Tea", "fact": "Assam is known for tea gardens, Bihu, Brahmaputra river culture, silk, and wildlife.", "image": "assets/travel_forests.png"}, {"id": "gujarat", "state": "Gujarat", "region": "West", "color": "#f59e0b", "challenge": "Which festival dance is most closely linked with Gujarat?", "options": ["Garba", "Odissi", "Kathak", "Yakshagana"], "answer": "Garba", "fact": "Gujarat is famous for Garba, stepwells, textiles, coastal trade, and the Asiatic lion.", "image": "assets/heritage_stepwells.png"}, {"id": "punjab", "state": "Punjab", "region": "North", "color": "#22c55e", "challenge": "Which folk dance is strongly associated with Punjab?", "options": ["Bhangra", "Ghoomar", "Bihu", "Kathakali"], "answer": "Bhangra", "fact": "Punjab is known for farming, Sikh heritage, music, Bhangra, and hearty cuisine.", "image": "assets/culture.png"}, {"id": "tamil-nadu", "state": "Tamil Nadu", "region": "South", "color": "#ef4444", "challenge": "Which classical dance form is strongly associated with Tamil Nadu?", "options": ["Bharatanatyam", "Lavani", "Chhau", "Bihu"], "answer": "Bharatanatyam", "fact": "Tamil Nadu is known for Tamil language, temple architecture, Bharatanatyam, and Carnatic music.", "image": "assets/heritage_temples.png"}, {"id": "west-bengal", "state": "West Bengal", "region": "East", "color": "#a855f7", "challenge": "Which festival is one of West Bengal's biggest cultural celebrations?", "options": ["Durga Puja", "Onam", "Baisakhi", "Hornbill Festival"], "answer": "Durga Puja", "fact": "West Bengal is known for literature, music, sweets, Durga Puja, and the Sundarbans.", "image": "assets/culture.png"}, {"id": "odisha", "state": "Odisha", "region": "East", "color": "#06b6d4", "challenge": "Which classical dance form is linked with Odisha?", "options": ["Odissi", "Garba", "Kathakali", "Bhangra"], "answer": "Odissi", "fact": "Odisha is known for Jagannath culture, Odissi dance, temple architecture, Pattachitra, and Chilika Lake.", "image": "assets/heritage_temples.png"}, {"id": "maharashtra", "state": "Maharashtra", "region": "West", "color": "#fb7185", "challenge": "Which city in Maharashtra is known as India's film and finance hub?", "options": ["Mumbai", "Pune", "Nagpur", "Nashik"], "answer": "Mumbai", "fact": "Maharashtra combines forts, cinema, Marathi culture, coastal food, and major urban centres.", "image": "assets/heritage_forts.png"}, {"id": "karnataka", "state": "Karnataka", "region": "South", "color": "#84cc16", "challenge": "Which heritage site in Karnataka was once the capital of Vijayanagara?", "options": ["Hampi", "Konark", "Sanchi", "Nalanda"], "answer": "Hampi", "fact": "Karnataka is known for Hampi, Kannada culture, sandalwood, Bengaluru, and Western Ghats.", "image": "assets/heritage_temples.png"}, {"id": "telangana", "state": "Telangana", "region": "South", "color": "#14b8a6", "challenge": "Which city is strongly associated with Hyderabadi Biryani?", "options": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"], "answer": "Hyderabad", "fact": "Telangana is known for Deccan heritage, Hyderabad, biryani, Bonalu, forts, and Telugu culture.", "image": "assets/culture.png"}, {"id": "uttar-pradesh", "state": "Uttar Pradesh", "region": "North", "color": "#f97316", "challenge": "Which classical dance form has strong roots in Uttar Pradesh?", "options": ["Kathak", "Bharatanatyam", "Garba", "Bihu"], "answer": "Kathak", "fact": "Uttar Pradesh is known for spiritual cities, Awadhi food, Kathak, monuments, and literature.", "image": "assets/heritage_temples.png"}];
  const completedKey = "incredible-india-state-wheel-completed";
  const scoreKey = "incredible-india-state-wheel-score";

  const wheel = document.getElementById("wheel");
  const spinButton = document.getElementById("spin-button");
  const spinStatus = document.getElementById("spin-status");
  const statePreview = document.getElementById("state-preview");
  const timerCount = document.getElementById("timer-count");
  const questionBox = document.getElementById("question-box");
  const choiceGrid = document.getElementById("choice-grid");
  const feedback = document.getElementById("feedback-card");
  const collectionGrid = document.getElementById("collection-grid");

  let current = null;
  let rotation = 0;
  let timer = null;
  let timeLeft = 30;
  let completed = readArray(completedKey);
  let score = Number(localStorage.getItem(scoreKey) || 0);

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function readArray(key) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function saveProgress() {
    localStorage.setItem(completedKey, JSON.stringify(completed));
    localStorage.setItem(scoreKey, String(score));
  }

  function updateStats() {
    document.getElementById("state-count").textContent = states.length;
    document.getElementById("completed-count").textContent = completed.length;
    document.getElementById("score-count").textContent = score;
  }

  function renderCollection() {
    collectionGrid.innerHTML = states.map((state) => {
      const done = completed.includes(state.id);
      return `<div class="collection-chip ${done ? "done" : ""}">${done ? "✓ " : "○ "}${escapeHtml(state.state)}</div>`;
    }).join("");
  }

  function statePreviewHtml(state) {
    return `
      <img src="${escapeHtml(state.image)}" alt="${escapeHtml(state.state)} preview" onerror="this.src='assets/hero_banner.png'">
      <div>
        <h3>${escapeHtml(state.state)}</h3>
        <p>${escapeHtml(state.region)} India · Complete the 30-second challenge to add it to your collection.</p>
      </div>
    `;
  }

  function startChallenge(state) {
    current = state;
    clearInterval(timer);
    timeLeft = 30;
    timerCount.textContent = timeLeft;
    statePreview.innerHTML = statePreviewHtml(state);
    questionBox.textContent = state.challenge;
    feedback.className = "feedback-card";
    feedback.innerHTML = "";

    choiceGrid.innerHTML = shuffle(state.options).map((option) => `
      <button class="choice-btn" type="button" data-answer="${escapeHtml(option)}">${escapeHtml(option)}</button>
    `).join("");

    choiceGrid.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => checkAnswer(button));
    });

    timer = setInterval(() => {
      timeLeft -= 1;
      timerCount.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        lockChoices();
        feedback.className = "feedback-card visible";
        feedback.innerHTML = `<strong>Time up!</strong><br>The correct answer was <strong>${escapeHtml(current.answer)}</strong>. ${escapeHtml(current.fact)}`;
      }
    }, 1000);
  }

  function lockChoices() {
    choiceGrid.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
      if (button.dataset.answer === current.answer) button.classList.add("correct");
    });
  }

  function checkAnswer(button) {
    clearInterval(timer);
    lockChoices();

    const correct = button.dataset.answer === current.answer;
    if (!correct) button.classList.add("wrong");

    if (correct) {
      if (!completed.includes(current.id)) completed.push(current.id);
      const earned = 10 + timeLeft;
      score += earned;
      feedback.className = "feedback-card visible";
      feedback.innerHTML = `<strong>Correct! +${earned} points.</strong><br>${escapeHtml(current.fact)}`;
    } else {
      feedback.className = "feedback-card visible";
      feedback.innerHTML = `<strong>Not quite.</strong><br>The correct answer was <strong>${escapeHtml(current.answer)}</strong>. ${escapeHtml(current.fact)}`;
    }

    saveProgress();
    updateStats();
    renderCollection();
  }

  function spinWheel() {
    spinButton.disabled = true;
    feedback.className = "feedback-card";
    spinStatus.textContent = "Spinning...";

    const selectedIndex = Math.floor(Math.random() * states.length);
    const degreesPerSlice = 360 / states.length;
    const target = 360 - (selectedIndex * degreesPerSlice + degreesPerSlice / 2);
    rotation += 1440 + target;
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
      const selectedState = states[selectedIndex];
      spinStatus.textContent = `Landed on ${selectedState.state}. Complete the micro-challenge!`;
      startChallenge(selectedState);
      spinButton.disabled = false;
    }, 3100);
  }

  document.getElementById("reset-progress").addEventListener("click", () => {
    if (!confirm("Reset completed states and score?")) return;
    completed = [];
    score = 0;
    saveProgress();
    updateStats();
    renderCollection();
    spinStatus.textContent = "Progress reset. Spin again!";
  });

  spinButton.addEventListener("click", spinWheel);

  updateStats();
  renderCollection();

  statePreview.innerHTML = "<p>Spin the wheel to reveal a state and begin a 30-second challenge.</p>";
  questionBox.textContent = "Your challenge will appear here after the wheel lands.";
  choiceGrid.innerHTML = "";

  window.StateWheelChallenge = {
    states: () => [...states],
    spin: spinWheel,
  };
});
