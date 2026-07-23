// ---------- City & Nickname Data ----------
const allCities = [
  { city: "Jaipur", nickname: "The Pink City", fact: "Jaipur's buildings were painted pink in 1876 to welcome Prince Albert.", difficulty: "easy" },
  { city: "Mumbai", nickname: "The City of Dreams", fact: "Mumbai is home to Bollywood, the world's largest film industry by output.", difficulty: "easy" },
  { city: "Varanasi", nickname: "The Spiritual Capital of India", fact: "Varanasi is one of the oldest continuously inhabited cities in the world.", difficulty: "easy" },
  { city: "Bengaluru", nickname: "The Silicon Valley of India", fact: "Bengaluru hosts thousands of tech startups and IT companies.", difficulty: "easy" },
  { city: "Agra", nickname: "The City of Love", fact: "Agra is home to the Taj Mahal, built by Shah Jahan for his wife Mumtaz Mahal.", difficulty: "easy" },
  { city: "Kolkata", nickname: "The City of Joy", fact: "Kolkata was the capital of British India until 1911.", difficulty: "easy" },
  { city: "Chennai", nickname: "The Gateway to South India", fact: "Chennai has one of the longest urban beaches in the world, Marina Beach.", difficulty: "easy" },
  { city: "Amritsar", nickname: "The Golden City", fact: "Amritsar is home to the Golden Temple, the holiest Sikh shrine.", difficulty: "easy" },

  { city: "Udaipur", nickname: "The City of Lakes", fact: "Udaipur is built around several artificial lakes, earning its romantic reputation.", difficulty: "medium" },
  { city: "Kochi", nickname: "The Queen of the Arabian Sea", fact: "Kochi was a major spice trading port for centuries.", difficulty: "medium" },
  { city: "Mysuru", nickname: "The City of Palaces", fact: "Mysuru is famous for its Dasara festival and the illuminated Mysore Palace.", difficulty: "medium" },
  { city: "Jodhpur", nickname: "The Blue City", fact: "Many houses in old Jodhpur are painted blue, originally to repel heat and insects.", difficulty: "medium" },
  { city: "Ahmedabad", nickname: "The Manchester of India", fact: "Ahmedabad earned this name due to its large textile industry.", difficulty: "medium" },
  { city: "Thiruvananthapuram", nickname: "The Evergreen City of India", fact: "Kerala's capital is known for its lush greenery year-round.", difficulty: "medium" },
  { city: "Coimbatore", nickname: "The Manchester of South India", fact: "Coimbatore is a major hub for textiles and manufacturing.", difficulty: "medium" },
  { city: "Shillong", nickname: "The Scotland of the East", fact: "Shillong's rolling hills and climate reminded the British of Scotland.", difficulty: "medium" },
  { city: "Mangaluru", nickname: "The Rome of the East", fact: "Mangaluru's coastal charm and old architecture inspired this nickname.", difficulty: "medium" },
  { city: "Bhubaneswar", nickname: "The Temple City of India", fact: "Bhubaneswar has over 700 temples spanning centuries of architecture.", difficulty: "medium" },

  { city: "Nashik", nickname: "The Wine Capital of India", fact: "Nashik's vineyards produce a majority of India's domestic wine.", difficulty: "hard" },
  { city: "Surat", nickname: "The Diamond City", fact: "Surat processes a large share of the world's cut and polished diamonds.", difficulty: "hard" },
  { city: "Pune", nickname: "The Oxford of the East", fact: "Pune hosts many prestigious educational institutions.", difficulty: "hard" },
  { city: "Madurai", nickname: "The City of Temples", fact: "Madurai's Meenakshi Temple is over 2,500 years old.", difficulty: "hard" },
  { city: "Dehradun", nickname: "The Gateway to the Himalayas", fact: "Dehradun serves as the base for many expeditions into the Himalayas.", difficulty: "hard" },
  { city: "Vadodara", nickname: "The Cultural Capital of Gujarat", fact: "Vadodara is known for its museums, palaces, and arts scene.", difficulty: "hard" },
  { city: "Indore", nickname: "The Cleanest City in India", fact: "Indore has topped India's Swachh Survekshan cleanliness rankings multiple times.", difficulty: "hard" },
  { city: "Rishikesh", nickname: "The Yoga Capital of the World", fact: "Rishikesh draws yoga practitioners from across the globe.", difficulty: "hard" },
  { city: "Darjeeling", nickname: "The Queen of the Hills", fact: "Darjeeling is famous worldwide for its distinctive tea.", difficulty: "hard" },
  { city: "Alappuzha", nickname: "The Venice of the East", fact: "Alappuzha's network of canals and backwaters inspired this name.", difficulty: "hard" },
  { city: "Panaji", nickname: "The Sunshine State's Capital", fact: "Panaji reflects Goa's Portuguese colonial heritage in its architecture.", difficulty: "hard" },
  { city: "Ranchi", nickname: "The City of Waterfalls", fact: "Ranchi and its surrounding region are dotted with numerous waterfalls.", difficulty: "hard" }
];

// Total time for the WHOLE quiz (not per question)
const difficultyConfig = {
  easy:   { time: 90,  count: 8 },
  medium: { time: 75,  count: 10 },
  hard:   { time: 60,  count: 12 }
};

const BEST_SCORE_KEY = "nicknameChallengeBestScore";
const LEADERBOARD_KEY = "nicknameChallengeLeaderboard";

// ---------- State ----------
let selectedDifficulty = null;
let questions = [];
let currentIndex = 0;
let score = 0;
let streak = 0;
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
const questionCount = document.getElementById("questionCount");
const streakValue = document.getElementById("streakValue");
const progressFill = document.getElementById("progressFill");
const nicknameText = document.getElementById("nicknameText");
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

function getWrongOptions(correctCity, pool, count) {
  const others = pool.filter(c => c.city !== correctCity);
  return shuffleArray(others).slice(0, count).map(c => c.city);
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

// ---------- Leaderboard (persists in browser via localStorage) ----------
let leaderboard = [];

function loadLeaderboard() {
  const saved = localStorage.getItem(LEADERBOARD_KEY);
  let parsed = null;
  try {
    parsed = saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.warn("Leaderboard data was corrupted, resetting to defaults.", e);
    parsed = null;
  }

  if (Array.isArray(parsed)) {
    leaderboard = parsed;
  } else {
    // Default sample names so the leaderboard isn't empty on first visit
    leaderboard = [
      { name: "Aisha", score: 210, streak: 9 },
      { name: "Rohan", score: 195, streak: 7 },
      { name: "Priya", score: 180, streak: 6 },
      { name: "Zainab", score: 165, streak: 5 },
      { name: "Kabir", score: 150, streak: 5 },
      { name: "Meera", score: 130, streak: 4 }
    ];
    saveLeaderboard();
  }
}

function saveLeaderboard() {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
}

function renderLeaderboard(listEl) {
  listEl.innerHTML = "";
  if (leaderboard.length === 0) {
    listEl.innerHTML = `<li class="empty-leaderboard">No scores yet — be the first!</li>`;
    return;
  }
  const sorted = [...leaderboard].sort((a, b) => b.score - a.score).slice(0, 8);
  sorted.forEach((entry, i) => {
    const li = document.createElement("li");
    const rankSpan = document.createElement("span");
    rankSpan.textContent = `${i + 1}. ${entry.name}`;
    const scoreSpan = document.createElement("span");
    scoreSpan.textContent = `${entry.score} pts \u00A0 🔥${entry.streak || 0}`;
    li.append(rankSpan, scoreSpan);
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
  saveScoreBtn.disabled = false;
  saveScoreBtn.textContent = "Save Score";
});

// ---------- Game Flow ----------
function startGame() {
  const config = difficultyConfig[selectedDifficulty];
  const difficultyPool = allCities.filter(c => c.difficulty === selectedDifficulty);

  questions = shuffleArray(difficultyPool).slice(0, config.count);
  currentIndex = 0;
  score = 0;
  streak = 0;
  gameOverByTimeout = false;
  scoreValue.textContent = "0";
  streakValue.textContent = "🔥 0";

  introScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  startTotalTimer(config.time);
  loadQuestion();
}

// Single timer that runs for the ENTIRE quiz duration, non-stop
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

function loadQuestion() {
  answered = false;
  factBox.classList.add("hidden");

  const q = questions[currentIndex];

  nicknameText.textContent = `"${q.nickname}"`;
  questionCount.textContent = `${currentIndex + 1}/${questions.length}`;
  progressFill.style.width = `${(currentIndex / questions.length) * 100}%`;

  const wrongOptions = getWrongOptions(q.city, allCities, 3);
  const allOptions = shuffleArray([q.city, ...wrongOptions]);

  optionsGrid.innerHTML = "";
  allOptions.forEach(cityName => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = cityName;
    btn.addEventListener("click", () => handleAnswer(btn, cityName, q));
    optionsGrid.appendChild(btn);
  });
}

function handleAnswer(btn, chosenCity, q) {
  if (answered || gameOverByTimeout) return;
  answered = true;

  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(b => (b.disabled = true));

  if (chosenCity === q.city) {
    btn.classList.add("correct");
    streak++;
    const bonus = Math.max(5, Math.ceil(timeLeft / 4));
    score += 10 + bonus;
  } else {
    btn.classList.add("wrong");
    buttons.forEach(b => {
      if (b.textContent === q.city) b.classList.add("correct");
    });
  }

  scoreValue.textContent = score;
  streakValue.textContent = `🔥 ${streak}`;
  showFact(q.fact);
  setTimeout(nextQuestion, 1800);
}

function showFact(fact) {
  factText.textContent = fact;
  factBox.classList.remove("hidden");
}

function nextQuestion() {
  if (gameOverByTimeout) return;

  currentIndex++;
  if (currentIndex >= questions.length) {
    endGame();
  } else {
    loadQuestion();
  }
}

function endGame() {
  clearInterval(timerInterval);
  gameScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScoreValue.textContent = score;
  saveBestScoreIfHigher(score);
  loadBestScore();

  const maxTimeBonus = Math.ceil(difficultyConfig[selectedDifficulty].time / 4);
  const maxPerQuestion = 10 + maxTimeBonus;
  const maxPossible = questions.length * maxPerQuestion;
  const percent = score / maxPossible;

  if (gameOverByTimeout) {
    resultIcon.textContent = "⏰";
    resultMessage.textContent = "Time's up! Here's how you did — try again to beat the clock.";
  } else if (percent >= 0.8) {
    resultIcon.textContent = "🏆";
    resultMessage.textContent = "Outstanding! You really know your Indian cities!";
  } else if (percent >= 0.5) {
    resultIcon.textContent = "🎉";
    resultMessage.textContent = "Great job! You've got solid city knowledge.";
  } else {
    resultIcon.textContent = "📚";
    resultMessage.textContent = "Nice try! Play again to learn more nicknames.";
  }

  renderLeaderboard(finalLeaderboardList);
}

saveScoreBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (!name) {
    playerNameInput.focus();
    return;
  }
  leaderboard.push({ name, score, streak: streak });
  leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 50);
  saveLeaderboard();
  renderLeaderboard(finalLeaderboardList);
  renderLeaderboard(leaderboardPreviewList);
  playerNameInput.value = "";
  saveScoreBtn.disabled = true;
  saveScoreBtn.textContent = "Saved!";
});

// ---------- Init ----------
loadLeaderboard();
renderLeaderboard(leaderboardPreviewList);
loadBestScore();