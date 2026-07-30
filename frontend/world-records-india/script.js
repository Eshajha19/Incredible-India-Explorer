(function () {
// ---------- Records Data (category, headline, detail clue, fact) ----------
const allRecords = [
  { record: "Statue of Unity", category: "Tallest Statue", detail: "This 182-metre statue of a freedom fighter, located in Gujarat, is the tallest statue in the world.", fact: "The Statue of Unity depicts Sardar Vallabhbhai Patel and stands nearly twice as tall as the Statue of Liberty.", difficulty: "easy" },
  { record: "Largest Democracy", category: "Governance", detail: "India holds the record for being the world's largest democracy by number of voters.", fact: "India's general elections involve well over 900 million eligible voters.", difficulty: "easy" },
  { record: "Kumbh Mela", category: "Largest Gathering", detail: "This religious festival holds the record for the largest peaceful gathering of people on Earth.", fact: "Tens of millions of pilgrims can gather at a single Kumbh Mela event.", difficulty: "easy" },
  { record: "Indian Postal Network", category: "Largest Postal Network", detail: "India operates the largest postal network in the world by number of post offices.", fact: "India has well over 1.5 lakh post offices spread across the country.", difficulty: "easy" },
  { record: "Guwahati-Puri Express Route", category: "Longest Rail Journey Name", detail: "Indian Railways is home to some of the world's most complex and extensive rail networks.", fact: "Indian Railways is one of the largest railway networks in the world by track length.", difficulty: "easy" },
  { record: "Dhirubhai Ambani Stadium", category: "Largest Cricket Stadium", detail: "This stadium in Ahmedabad, Gujarat holds the record as the largest cricket stadium in the world by capacity.", fact: "The stadium can seat well over 130,000 spectators.", difficulty: "easy" },
  { record: "Largest Hand-woven Carpet", category: "Handicrafts", detail: "Indian artisans have set records for producing enormous hand-woven and hand-knotted carpets.", fact: "Uttar Pradesh's carpet-weaving hubs are known for record-breaking handmade rugs.", difficulty: "easy" },
  { record: "Longest Highway Network", category: "Infrastructure", detail: "India has one of the largest road networks in the world by total length.", fact: "India's road network spans several million kilometres, connecting nearly every village.", difficulty: "easy" },

  { record: "Largest Solar Park", category: "Renewable Energy", detail: "India's Bhadla Solar Park in Rajasthan was once recognised as the largest solar power plant in the world.", fact: "Bhadla Solar Park spans thousands of hectares in the Thar Desert.", difficulty: "medium" },
  { record: "Rohit Sharma", category: "Cricket Record", detail: "This Indian cricket captain holds the record for the most sixes in international cricket history.", fact: "He surpassed West Indian legend Chris Gayle to claim the record.", difficulty: "medium" },
  { record: "Sachin Tendulkar", category: "Cricket Record", detail: "This legendary batsman holds the record for the most centuries scored in international cricket.", fact: "He remains the only player to score 100 international centuries.", difficulty: "medium" },
  { record: "Longest Underground Metro Line", category: "Urban Transport", detail: "Indian metro systems have set records for rapid expansion, with several cities building extensive underground networks.", fact: "The Delhi Metro is among the largest metro networks in the world by route length.", difficulty: "medium" },
  { record: "Largest Human Flag", category: "Mass Formation", detail: "A record-breaking human flag formation using thousands of people was created in India.", fact: "Such formations often involve tens of thousands of participants dressed in coordinated colours.", difficulty: "medium" },
  { record: "Sundarbans Mangrove Forest", category: "Natural Wonder", detail: "This delta region holds the record for the largest mangrove forest in the world.", fact: "It is shared between India and Bangladesh and is home to the Bengal tiger.", difficulty: "medium" },
  { record: "Char Dham Pariyojana", category: "Highway Engineering", detail: "This Himalayan all-weather road project set records for high-altitude engineering achievement.", fact: "It connects four major pilgrimage sites in Uttarakhand through difficult mountain terrain.", difficulty: "medium" },
  { record: "Largest Spice Producer", category: "Agriculture", detail: "India holds the record for being the world's largest producer and exporter of spices.", fact: "India produces and exports more spice varieties than any other country.", difficulty: "medium" },
  { record: "ISRO Chandrayaan-3", category: "Space Milestone", detail: "This mission made India the first country to land near the lunar south pole.", fact: "Chandrayaan-3 achieved its historic landing in August 2023.", difficulty: "medium" },

  { record: "Largest Cave Temple Complex", category: "Ancient Engineering", detail: "The Kailasa Temple at Ellora is recognised as the largest single monolithic rock excavation in the world.", fact: "The entire temple was carved out of a single rock, top-down, without any joints.", difficulty: "hard" },
  { record: "Silk Route Contributions", category: "Historic Trade", detail: "Indian textile hubs historically set records for producing some of the finest silk and muslin in the ancient trade world.", fact: "Bengal muslin was once so fine it was nicknamed 'woven air'.", difficulty: "hard" },
  { record: "World's First Nose-typing Record", category: "Unusual Talent", detail: "An Indian holds the record for the fastest typing using only the nose.", fact: "This unusual record showcases the wide range of skill-based Guinness titles held by Indians.", difficulty: "hard" },
  { record: "Longest Turban", category: "Cultural Record", detail: "An individual from Punjab holds the record for tying the longest turban in the world.", fact: "The turban stretches over 600 metres and takes hours to wrap.", difficulty: "hard" },
  { record: "Aryabhata Satellite", category: "Space History", detail: "This was India's first satellite, launched with Soviet assistance, marking a milestone in India's space history.", fact: "It was named after the ancient Indian mathematician and astronomer Aryabhata.", difficulty: "hard" },
  { record: "Largest Postal Stamp Mosaic", category: "Philately", detail: "India has set records for creating enormous mosaic artworks made entirely from postal stamps.", fact: "Such mosaics can use hundreds of thousands of individual stamps.", difficulty: "hard" },
  { record: "Great Trigonometrical Survey", category: "Historic Achievement", detail: "This 19th-century survey project measured the Himalayas and helped determine the height of the world's tallest mountain.", fact: "It was during this survey that Mount Everest's height was first calculated.", difficulty: "hard" },
  { record: "Largest Textile Industry Workforce", category: "Industry", detail: "India's textile sector holds records for employing one of the largest workforces of any single industry in the world.", fact: "The industry employs tens of millions of people directly and indirectly.", difficulty: "hard" },
  { record: "Konark Sun Temple Wheels", category: "Ancient Astronomy", detail: "This temple's 24 stone wheels are so precisely carved that they can be used as sundials to tell accurate time.", fact: "Each wheel is about 3 metres in diameter with intricately carved spokes.", difficulty: "hard" },
  { record: "Largest Vegetarian Population", category: "Demographics", detail: "India holds the record for having the largest vegetarian population of any country in the world.", fact: "A significant share of India's population follows a vegetarian diet.", difficulty: "hard" },
  { record: "World's Highest Cricket Ground", category: "Sporting Venue", detail: "This cricket ground in Himachal Pradesh holds the record for being the highest-altitude cricket stadium in the world.", fact: "The Chail Cricket Ground sits over 2,400 metres above sea level.", difficulty: "hard" },
  { record: "Largest Tea Producer", category: "Agriculture", detail: "India is among the world's largest producers and consumers of tea, a title it has held for decades.", fact: "Assam and Darjeeling are among India's most famous tea-growing regions.", difficulty: "hard" }
];

const modeConfig = {
  relaxed: { time: null, count: 8 },
  timed:   { time: 75,   count: 10 },
  rapid:   { time: 50,   count: 12 }
};

const BEST_SCORE_KEY = "worldRecordsBestScore";

// ---------- State ----------
let selectedMode = null;
let rounds = [];
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

const modeBtns = document.querySelectorAll(".mode-btn");
const startBtn = document.getElementById("startBtn");

const scoreValue = document.getElementById("scoreValue");
const timerBox = document.getElementById("timerBox");
const timerValue = document.getElementById("timerValue");
const roundCount = document.getElementById("roundCount");
const streakValue = document.getElementById("streakValue");
const progressFill = document.getElementById("progressFill");

const medalIcon = document.getElementById("medalIcon");
const recordCategory = document.getElementById("recordCategory");
const recordHeadline = document.getElementById("recordHeadline");
const recordDetail = document.getElementById("recordDetail");
const optionsGrid = document.getElementById("optionsGrid");
const factBox = document.getElementById("factBox");
const factText = document.getElementById("factText");

const trophyShelf = document.getElementById("trophyShelf");
const finalScoreValue = document.getElementById("finalScoreValue");
const resultMessage = document.getElementById("resultMessage");
const playerNameInput = document.getElementById("playerNameInput");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const leaderboardPreviewList = document.getElementById("leaderboardPreviewList");
const finalLeaderboardList = document.getElementById("finalLeaderboardList");

const bestScoreBadge = document.getElementById("bestScoreBadge");
const bestScoreValue = document.getElementById("bestScoreValue");

const medals = ["🏆", "🥇", "🎖️", "🏅"];

// ---------- Utility ----------
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getWrongOptions(correctRecord, pool, count) {
  const others = pool.filter(p => p.record !== correctRecord);
  return shuffleArray(others).slice(0, count).map(p => p.record);
}

// ---------- Best Score ----------
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

// ---------- Mode Selection ----------
modeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modeBtns.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedMode = btn.dataset.mode;
    startBtn.disabled = false;
  });
});

startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  introScreen.classList.remove("hidden");
  modeBtns.forEach(b => b.classList.remove("selected"));
  selectedMode = null;
  startBtn.disabled = true;
});

// ---------- Game Flow ----------
function startGame() {
  const config = modeConfig[selectedMode];

  rounds = shuffleArray(allRecords).slice(0, config.count);
  currentIndex = 0;
  score = 0;
  streak = 0;
  gameOverByTimeout = false;
  scoreValue.textContent = "0";
  streakValue.textContent = "0";

  introScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  if (config.time) {
    timerBox.classList.remove("hidden");
    startTotalTimer(config.time);
  } else {
    timerBox.classList.add("hidden");
    clearInterval(timerInterval);
  }

  loadRound();
}

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

  const rec = rounds[currentIndex];

  medalIcon.textContent = medals[currentIndex % medals.length];
  recordCategory.textContent = rec.category;
  recordHeadline.textContent = "Which achievement does this describe?";
  recordDetail.textContent = rec.detail;
  roundCount.textContent = `${currentIndex + 1}/${rounds.length}`;
  progressFill.style.width = `${(currentIndex / rounds.length) * 100}%`;

  const wrongOptions = getWrongOptions(rec.record, allRecords, 3);
  const allOptions = shuffleArray([rec.record, ...wrongOptions]);

  optionsGrid.innerHTML = "";
  allOptions.forEach(recordName => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = recordName;
    btn.addEventListener("click", () => handleAnswer(btn, recordName, rec));
    optionsGrid.appendChild(btn);
  });
}

function handleAnswer(btn, chosenRecord, rec) {
  if (answered || gameOverByTimeout) return;
  answered = true;

  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(b => (b.disabled = true));

  if (chosenRecord === rec.record) {
    btn.classList.add("correct");
    streak++;
    const streakBonus = Math.min(streak * 2, 10);
    score += 10 + streakBonus;
  } else {
    btn.classList.add("wrong");
    
    buttons.forEach(b => {
      if (b.textContent === rec.record) b.classList.add("correct");
    });
  }

  scoreValue.textContent = score;
  streakValue.textContent = streak;
  showFact(rec.fact);
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

  const maxPossible = rounds.length * 20;
  const percent = score / maxPossible;

  if (gameOverByTimeout) {
    trophyShelf.textContent = "⏰";
    resultMessage.textContent = "Time's up! Here's your final tally — try again for more records!";
  } else if (percent >= 0.7) {
    trophyShelf.textContent = "🏆🥇🏆";
    resultMessage.textContent = "Incredible! You truly know India's record-breaking achievements!";
  } else if (percent >= 0.4) {
    trophyShelf.textContent = "🥇🎖️";
    resultMessage.textContent = "Nice work! You know India's records well.";
  } else {
    trophyShelf.textContent = "🎖️";
    resultMessage.textContent = "Good try! Play again to discover more of India's world records.";
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
})();