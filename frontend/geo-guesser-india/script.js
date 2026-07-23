// ---------- Location Data (landmark clue, state hint, visual emoji, fact) ----------
const allLocations = [
  { place: "Taj Mahal", state: "Uttar Pradesh", visual: "🕌", landmarkClue: "A white marble mausoleum built by a Mughal emperor for his wife", stateHint: "This state shares a border with Delhi and Rajasthan", fact: "The Taj Mahal took approximately 22 years to complete.", difficulty: "easy" },
  { place: "Gateway of India", state: "Maharashtra", visual: "🏛️", landmarkClue: "A basalt archway overlooking the Arabian Sea, built to commemorate a royal visit", stateHint: "This state's capital is India's financial hub", fact: "The Gateway of India was completed in 1924.", difficulty: "easy" },
  { place: "Golden Temple", state: "Punjab", visual: "🛕", landmarkClue: "A gold-plated Sikh shrine surrounded by a sacred pool", stateHint: "This state is known as the land of five rivers", fact: "The temple's dome is covered in real gold leaf.", difficulty: "easy" },
  { place: "Hawa Mahal", state: "Rajasthan", visual: "🏯", landmarkClue: "A pink sandstone palace with hundreds of small windows for royal women to view the streets", stateHint: "This desert state is home to the Thar Desert", fact: "Hawa Mahal has 953 small windows called jharokhas.", difficulty: "easy" },
  { place: "Victoria Memorial", state: "West Bengal", visual: "🏰", landmarkClue: "A white marble memorial dedicated to a British monarch, now a museum", stateHint: "This state's capital was once the capital of British India", fact: "Victoria Memorial was completed in 1921.", difficulty: "easy" },
  { place: "Mysore Palace", state: "Karnataka", visual: "👑", landmarkClue: "An illuminated royal palace famous during a major autumn festival", stateHint: "This state is a major hub for India's tech industry", fact: "The palace is illuminated with nearly 100,000 lights during Dasara.", difficulty: "easy" },
  { place: "Charminar", state: "Telangana", visual: "🕌", landmarkClue: "A monument with four grand arches and minarets, built to commemorate the end of a plague", stateHint: "This state's capital is known for pearls and biryani", fact: "Charminar was built in 1591.", difficulty: "easy" },
  { place: "India Gate", state: "Delhi", visual: "🎗️", landmarkClue: "A war memorial arch honoring soldiers who died in World War I", stateHint: "This is India's national capital territory", fact: "India Gate stands 42 meters tall.", difficulty: "easy" },

  { place: "Meenakshi Temple", state: "Tamil Nadu", visual: "🛕", landmarkClue: "A temple complex with towering, colorfully sculpted gopurams dedicated to a goddess", stateHint: "This southern state is known for classical Bharatanatyam dance", fact: "The temple has over 33,000 sculptures.", difficulty: "medium" },
  { place: "Qutub Minar", state: "Delhi", visual: "🗼", landmarkClue: "The tallest brick minaret in the world, built to mark a military victory", stateHint: "This is India's national capital territory", fact: "Qutub Minar stands 73 meters tall.", difficulty: "medium" },
  { place: "Konark Sun Temple", state: "Odisha", visual: "🛞", landmarkClue: "A temple shaped like a giant chariot with stone wheels dedicated to the sun god", stateHint: "This eastern coastal state is known for its temple architecture", fact: "The temple has 24 intricately carved stone wheels.", difficulty: "medium" },
  { place: "Amber Fort", state: "Rajasthan", visual: "🏯", landmarkClue: "A hilltop fort with mirrored halls, once reached by elephant rides", stateHint: "This desert state is home to the Thar Desert", fact: "Amber Fort's Sheesh Mahal is covered in tiny mirror tiles.", difficulty: "medium" },
  { place: "Ellora Caves", state: "Maharashtra", visual: "⛰️", landmarkClue: "Rock-cut cave temples representing Hindu, Buddhist, and Jain traditions in one site", stateHint: "This state's capital is India's financial hub", fact: "The Kailasa temple here was carved from a single rock.", difficulty: "medium" },
  { place: "Dal Lake", state: "Jammu and Kashmir", visual: "🛶", landmarkClue: "A lake famous for its floating gardens and traditional houseboats", stateHint: "This northern region is known as 'Paradise on Earth'", fact: "Dal Lake covers an area of about 18 square kilometers.", difficulty: "medium" },
  { place: "Hampi", state: "Karnataka", visual: "🗿", landmarkClue: "Ancient ruins of a Vijayanagara-era capital scattered among giant boulders", stateHint: "This state is a major hub for India's tech industry", fact: "Hampi was once one of the richest cities in the world.", difficulty: "medium" },
  { place: "Khajuraho Temples", state: "Madhya Pradesh", visual: "🛕", landmarkClue: "A group of medieval temples famous for their intricate sculptural artwork", stateHint: "This state is often called the 'heart of India'", fact: "Only about 20 of the original 85 temples survive today.", difficulty: "medium" },
  { place: "Living Root Bridges", state: "Meghalaya", visual: "🌉", landmarkClue: "Bridges grown from the roots of rubber fig trees over generations", stateHint: "This northeastern state receives some of the highest rainfall on Earth", fact: "Some living root bridges take over 15 years to fully form.", difficulty: "medium" },
  { place: "Rann of Kutch", state: "Gujarat", visual: "🏜️", landmarkClue: "A vast white salt marsh that hosts a famous winter cultural festival", stateHint: "This westernmost state has a long coastline on the Arabian Sea", fact: "The Rann of Kutch is one of the largest salt deserts in the world.", difficulty: "medium" },

  { place: "Valley of Flowers", state: "Uttarakhand", visual: "🌸", landmarkClue: "A high-altitude Himalayan valley that bursts into colorful blooms each monsoon", stateHint: "This Himalayan state is home to major pilgrimage routes", fact: "The valley is a UNESCO World Heritage Site.", difficulty: "hard" },
  { place: "Sun Temple, Modhera", state: "Gujarat", visual: "☀️", landmarkClue: "A stepped temple complex aligned so sunlight enters the sanctum at equinox", stateHint: "This westernmost state has a long coastline on the Arabian Sea", fact: "The temple's stepwell (kund) has 108 miniature shrines.", difficulty: "hard" },
  { place: "Nubra Valley", state: "Ladakh", visual: "🐫", landmarkClue: "A cold desert valley famous for double-humped camels amid sand dunes", stateHint: "This union territory sits at extremely high altitude in the Himalayas", fact: "Nubra Valley sits at over 10,000 feet above sea level.", difficulty: "hard" },
  { place: "Chilika Lake", state: "Odisha", visual: "🦩", landmarkClue: "Asia's largest brackish water lagoon, a major stop for migratory birds", stateHint: "This eastern coastal state is known for its temple architecture", fact: "Over 160 species of migratory birds visit Chilika Lake.", difficulty: "hard" },
  { place: "Majuli Island", state: "Assam", visual: "🏞️", landmarkClue: "The world's largest river island, home to unique Vaishnavite monasteries", stateHint: "This northeastern state is famous for its tea gardens", fact: "Majuli is shrinking due to erosion by the Brahmaputra River.", difficulty: "hard" },
  { place: "Pangong Lake", state: "Ladakh", visual: "🏔️", landmarkClue: "A high-altitude lake that changes color across shades of blue throughout the day", stateHint: "This union territory sits at extremely high altitude in the Himalayas", fact: "About two-thirds of Pangong Lake lies across the border in Tibet.", difficulty: "hard" },
  { place: "Bhimbetka Caves", state: "Madhya Pradesh", visual: "🎨", landmarkClue: "Rock shelters containing some of the earliest traces of human life in India, with ancient paintings", stateHint: "This state is often called the 'heart of India'", fact: "Some cave paintings here are over 10,000 years old.", difficulty: "hard" },
  { place: "Great Rann Flamingo City", state: "Gujarat", visual: "🦩", landmarkClue: "A remote breeding ground where thousands of flamingos gather in a salt desert", stateHint: "This westernmost state has a long coastline on the Arabian Sea", fact: "It's one of the largest flamingo breeding sites in Asia.", difficulty: "hard" },
  { place: "Dzukou Valley", state: "Nagaland", visual: "🌺", landmarkClue: "A remote valley known as the 'Valley of Flowers of the Northeast'", stateHint: "This northeastern state borders Myanmar", fact: "Dzukou Valley is famous for a rare lily found only here.", difficulty: "hard" },
  { place: "Sundarbans", state: "West Bengal", visual: "🐅", landmarkClue: "The world's largest mangrove forest, home to a famous striped big cat", stateHint: "This state's capital was once the capital of British India", fact: "Sundarbans is the only mangrove forest with tigers.", difficulty: "hard" },
  { place: "Spiti Valley", state: "Himachal Pradesh", visual: "🏔️", landmarkClue: "A cold desert mountain valley dotted with ancient Buddhist monasteries", stateHint: "This Himalayan state is popular for hill stations", fact: "Spiti Valley is often called 'Little Tibet'.", difficulty: "hard" },
  { place: "Loktak Lake", state: "Manipur", visual: "🌊", landmarkClue: "The largest freshwater lake in Northeast India, famous for floating circular islands of vegetation", stateHint: "This northeastern state is known for its classical dance form", fact: "The floating islands are locally called 'phumdis'.", difficulty: "hard" }
];

const difficultyConfig = {
  easy:   { time: 90, count: 8  },
  medium: { time: 75, count: 10 },
  hard:   { time: 60, count: 12 }
};

const BEST_SCORE_KEY = "geoGuesserBestScore";

// ---------- State ----------
let selectedDifficulty = null;
let rounds = [];
let currentIndex = 0;
let score = 0;
let multiplier = 1;
let timeLeft = 0;
let timerInterval = null;
let answered = false;
let gameOverByTimeout = false;

// ---------- DOM References ----------
const introScreen = document.getElementById("introScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const difficultyBtns = document.querySelectorAll(".difficulty-btn");
const startBtn = document.getElementById("startBtn");

const scoreValue = document.getElementById("scoreValue");
const timerValue = document.getElementById("timerValue");
const roundCount = document.getElementById("roundCount");
const multiplierValue = document.getElementById("multiplierValue");
const progressFill = document.getElementById("progressFill");

const landmarkVisual = document.getElementById("landmarkVisual");
const landmarkClue = document.getElementById("landmarkClue");
const stateHint = document.getElementById("stateHint");
const optionsGrid = document.getElementById("optionsGrid");
const factBox = document.getElementById("factBox");
const factText = document.getElementById("factText");

const resultIcon = document.getElementById("resultIcon");
const finalScoreValue = document.getElementById("finalScoreValue");
const resultMessage = document.getElementById("resultMessage");
const playerNameInput = document.getElementById("playerNameInput");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const leaderboardPreviewList = document.getElementById("leaderboardPreviewList");
const finalLeaderboardList = document.getElementById("finalLeaderboardList");

const bestScoreBadge = document.getElementById("bestScoreBadge");
const bestScoreValue = document.getElementById("bestScoreValue");

// ---------- Utility ----------
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getWrongOptions(correctPlace, pool, count) {
  const others = pool.filter(p => p.place !== correctPlace);
  return shuffleArray(others).slice(0, count).map(p => p.place);
}

// ---------- Best Score (persists in browser) ----------
function loadBestScore() {
  const saved = localStorage.getItem(BEST_SCORE_KEY);
  const best = saved ? parseInt(saved, 10) : 0;
  if (best > 0) {
    bestScoreValue.textContent = best;
    bestScoreBadge.classList.remove("hidden");
  }
  return best;
}

function saveBestScoreIfHigher(newScore) {
  const best = parseInt(localStorage.getItem(BEST_SCORE_KEY) || "0", 10);
  if (newScore > best) {
    localStorage.setItem(BEST_SCORE_KEY, newScore);
  }
}

// ---------- Leaderboard (in-memory for this session) ----------
let leaderboard = [];

function renderLeaderboard(listEl) {
  listEl.innerHTML = "";
  if (leaderboard.length === 0) {
    listEl.innerHTML = `<li class="empty-leaderboard">No scores yet — be the first!</li>`;
    return;
  }
  const sorted = [...leaderboard].sort((a, b) => b.score - a.score).slice(0, 5);
  sorted.forEach((entry, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${i + 1}. ${entry.name}</span><span>${entry.score} pts</span>`;
    listEl.appendChild(li);
  });
}

// ---------- Difficulty Selection ----------
difficultyBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    difficultyBtns.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedDifficulty = btn.dataset.difficulty;
    startBtn.disabled = false;
  });
});

startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  introScreen.classList.remove("hidden");
  difficultyBtns.forEach(b => b.classList.remove("selected"));
  selectedDifficulty = null;
  startBtn.disabled = true;
});

// ---------- Game Flow ----------
function startGame() {
  const config = difficultyConfig[selectedDifficulty];
  const difficultyPool = allLocations.filter(p => p.difficulty === selectedDifficulty);

  rounds = shuffleArray(difficultyPool).slice(0, config.count);
  currentIndex = 0;
  score = 0;
  multiplier = 1;
  gameOverByTimeout = false;
  scoreValue.textContent = "0";
  multiplierValue.textContent = "x1";

  introScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  startTotalTimer(config.time);
  loadRound();
}

// Single timer that runs for the ENTIRE game duration, non-stop
function startTotalTimer(seconds) {
  clearInterval(timerInterval);
  timeLeft = seconds;
  timerValue.textContent = timeLeft;
  timerValue.classList.remove("urgent");

  timerInterval = setInterval(() => {
    timeLeft--;
    timerValue.textContent = timeLeft;
    if (timeLeft <= 10) timerValue.classList.add("urgent");

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOverByTimeout = true;
      endGame();
    }
  }, 1000);
}

function loadRound() {
  answered = false;
  factBox.classList.add("hidden");

  const loc = rounds[currentIndex];

  landmarkVisual.textContent = loc.visual;
  landmarkClue.textContent = loc.landmarkClue;
  stateHint.textContent = loc.stateHint;
  roundCount.textContent = `${currentIndex + 1}/${rounds.length}`;
  progressFill.style.width = `${(currentIndex / rounds.length) * 100}%`;

  const wrongOptions = getWrongOptions(loc.place, allLocations, 3);
  const allOptions = shuffleArray([loc.place, ...wrongOptions]);

  optionsGrid.innerHTML = "";
  allOptions.forEach(placeName => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = placeName;
    btn.addEventListener("click", () => handleAnswer(btn, placeName, loc));
    optionsGrid.appendChild(btn);
  });
}

function handleAnswer(btn, chosenPlace, loc) {
  if (answered || gameOverByTimeout) return;
  answered = true;

  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(b => (b.disabled = true));

  if (chosenPlace === loc.place) {
    btn.classList.add("correct");
    const timeBonus = Math.max(5, Math.ceil(timeLeft / 4));
    const roundScore = (10 + timeBonus) * multiplier;
    score += roundScore;
    multiplier = Math.min(multiplier + 1, 5);
  } else {
    btn.classList.add("wrong");
    multiplier = 1;
    buttons.forEach(b => {
      if (b.textContent === loc.place) b.classList.add("correct");
    });
  }

  scoreValue.textContent = score;
  multiplierValue.textContent = `x${multiplier}`;
  showFact(loc.fact);
  setTimeout(nextRound, 1800);
}

function showFact(fact) {
  factText.textContent = fact;
  factBox.classList.remove("hidden");
}

function nextRound() {
  if (gameOverByTimeout) return;

  currentIndex++;
  if (currentIndex >= rounds.length) {
    endGame();
  } else {
    loadRound();
  }
}

function endGame() {
  clearInterval(timerInterval);
  gameScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScoreValue.textContent = score;
  saveBestScoreIfHigher(score);
  loadBestScore();

  const maxPossible = rounds.length * 30 * 3;
  const percent = score / maxPossible;

  if (gameOverByTimeout) {
    resultIcon.textContent = "⏰";
    resultMessage.textContent = "Time's up! Here's your final expedition score — try again to explore more!";
  } else if (percent >= 0.6) {
    resultIcon.textContent = "🏆";
    resultMessage.textContent = "Incredible! You're a true India geography expert!";
  } else if (percent >= 0.35) {
    resultIcon.textContent = "🎉";
    resultMessage.textContent = "Nice work! You know your Indian landmarks well.";
  } else {
    resultIcon.textContent = "📍";
    resultMessage.textContent = "Good try! Play again to discover more of India's wonders.";
  }

  renderLeaderboard(finalLeaderboardList);
}

saveScoreBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (!name) {
    playerNameInput.focus();
    return;
  }
  leaderboard.push({ name, score });
  renderLeaderboard(finalLeaderboardList);
  renderLeaderboard(leaderboardPreviewList);
  playerNameInput.value = "";
  saveScoreBtn.disabled = true;
  saveScoreBtn.textContent = "Saved!";
});

// ---------- Init ----------
renderLeaderboard(leaderboardPreviewList);
loadBestScore();