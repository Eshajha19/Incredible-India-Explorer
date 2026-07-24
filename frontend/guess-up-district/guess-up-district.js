/**
 * guess-up-district.js
 * "Guess the Uttar Pradesh District" Educational Game Engine & Dataset
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Core 20 Uttar Pradesh District Quiz Dataset
export const districts = [
  {
    id: "varanasi",
    name: "Varanasi",
    division: "Varanasi",
    headquarters: "Varanasi",
    odop: "Banarasi Silk Sarees & Pink Gulabi Meenakari",
    landmarks: ["Dashashwamedh Ghat", "Kashi Vishwanath Temple", "Sarnath Stupa"],
    clues: [
      "Known as Kashi or Banaras, one of the world's oldest living cities along the sacred Ganga River.",
      "Famous for Dashashwamedh Ghat, Kashi Vishwanath Temple, and world-renowned Banarasi Silk Sarees.",
      "Home to Sarnath where Lord Buddha delivered his first sermon after enlightenment."
    ]
  },
  {
    id: "agra",
    name: "Agra",
    division: "Agra",
    headquarters: "Agra",
    odop: "Leather Products & Marble Inlay Handicrafts",
    landmarks: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri"],
    clues: [
      "Situated along the Yamuna River, served as the capital of the Mughal Empire under Akbar, Jahangir, and Shah Jahan.",
      "Home to the world-famous white marble mausoleum Taj Mahal, one of the Seven Wonders of the World.",
      "Renowned for Agra Fort, Fatehpur Sikri Panch Mahal, and delicious Petha sweet delicacy."
    ]
  },
  {
    id: "lucknow",
    name: "Lucknow",
    division: "Lucknow",
    headquarters: "Lucknow",
    odop: "Chikankari & Zardozi Embroidery",
    landmarks: ["Bada Imambara", "Rumi Darwaza", "Chattar Manzil"],
    clues: [
      "The capital city of Uttar Pradesh, historically celebrated as the 'City of Nawabs'.",
      "Famous for Bada Imambara, Chhota Imambara, Rumi Darwaza, and exquisite Chikankari embroidery.",
      "Celebrated for its polite Tehzeeb culture and Awadhi culinary heritage including Tunday Kababs."
    ]
  },
  {
    id: "ayodhya",
    name: "Ayodhya",
    division: "Ayodhya",
    headquarters: "Ayodhya",
    odop: "Jaggery (Gud) & Bamboo Crafts",
    landmarks: ["Shri Ram Janmabhoomi Mandir", "Hanuman Garhi", "Saryu River Ghats"],
    clues: [
      "Situated along the sacred Saryu River, ancient capital of the Ikshvaku dynasty.",
      "Revered birthplace of Lord Rama, home to Shri Ram Janmabhoomi Mandir and Hanuman Garhi.",
      "Hosts the record-breaking grand Deepotsav festival with millions of earthen lamps along Ram Ki Paudi."
    ]
  },
  {
    id: "prayagraj",
    name: "Prayagraj",
    division: "Prayagraj",
    headquarters: "Prayagraj",
    odop: "Moonj Crafts & Guava Cultivation",
    landmarks: ["Triveni Sangam", "Anand Bhavan", "Bade Hanuman Temple"],
    clues: [
      "Formerly known as Allahabad, situated at the sacred Triveni Sangam confluence of Ganga, Yamuna, and Saraswati.",
      "Hosts the world's largest religious gathering, the Kumbh Mela and annual Magh Mela.",
      "Home to Anand Bhavan, historic Old Naini Bridge, and famous Moonj reed handicraft products."
    ]
  },
  {
    id: "jhansi",
    name: "Jhansi",
    division: "Jhansi",
    headquarters: "Jhansi",
    odop: "Wooden Toys & Brassware",
    landmarks: ["Jhansi Fort", "Rani Mahal", "Barua Sagar"],
    clues: [
      "Historic gateway to Bundelkhand, famous for the heroic 1857 resistance led by Maharani Lakshmibai.",
      "Features a prominent granite hilltop fort constructed by King Bir Singh Deo of Orchha.",
      "Bordered by the Betwa and Pahuj rivers, known for handcrafted wooden toys and brassware."
    ]
  },
  {
    id: "mathura",
    name: "Mathura",
    division: "Agra",
    headquarters: "Mathura",
    odop: "Sanjhi Art & Sanitary Fittings",
    landmarks: ["Shri Krishna Janmasthan", "Dwarkadhish Temple", "Vishram Ghat"],
    clues: [
      "Revered as the sacred birthplace of Lord Krishna along the Yamuna River in Braj Bhoomi.",
      "Home to Shri Krishna Janmasthan Temple Complex, Dwarkadhish Temple, and Vishram Ghat.",
      "Famous for Peda sweet delicacy and vibrant Lathmar Holi celebrations."
    ]
  },
  {
    id: "gorakhpur",
    name: "Gorakhpur",
    division: "Gorakhpur",
    headquarters: "Gorakhpur",
    odop: "Terracotta Craft & Readymade Garments",
    landmarks: ["Gorakhnath Temple", "Gita Press", "Ramgarh Taal"],
    clues: [
      "Located along the Rapti River, home to the famous Gorakhnath Temple and Nath monastic tradition.",
      "Headquarters of the North Eastern Railway and home to Gita Press, world's largest publisher of Hindu texts.",
      "Renowned for hand-molded terracotta pottery, elephant figurines, and clay craft."
    ]
  },
  {
    id: "kanpur",
    name: "Kanpur Nagar",
    division: "Kanpur",
    headquarters: "Kanpur",
    odop: "Leather Products & Textile Goods",
    landmarks: ["IIT Kanpur", "Allen Forest Zoo", "Bithoor Ghats"],
    clues: [
      "Situated on the banks of the Ganga, major industrial hub historically known as the 'Manchester of the East'.",
      "Famed worldwide for leather manufacturing, textile mills, and premier IIT Kanpur institute.",
      "Features historic freedom trail site Bithoor, Allen Forest Zoo, and J.K. Temple."
    ]
  },
  {
    id: "kannauj",
    name: "Kannauj",
    division: "Kanpur",
    headquarters: "Kannauj",
    odop: "Attar (Natural Perfume) & Essential Oils",
    landmarks: ["Archaeological Museum", "Lakh Bahosi Sanctuary", "Gauri Shankar Temple"],
    clues: [
      "Ancient capital of Emperor Harshavardhana in the 7th century, situated near the Ganga River.",
      "Globally renowned as the 'Perfume Capital of India' (Grasse of the East).",
      "Famous for traditional Attar (natural perfume hydro-distilled in copper deg-bhapka stills)."
    ]
  },
  {
    id: "aligarh",
    name: "Aligarh",
    division: "Aligarh",
    headquarters: "Aligarh",
    odop: "Locks & Hardware Fittings",
    landmarks: ["Aligarh Muslim University", "Aligarh Fort (Koil)", "Teerthdham Mangalayatan"],
    clues: [
      "Located in western UP, home to the prestigious Aligarh Muslim University (AMU) founded by Sir Syed Ahmed Khan.",
      "Globally famous for its lock manufacturing industry, earning it the nickname 'Tala Nagari'.",
      "Features the 16th-century Aligarh Fort (Koil Fort) and historic hardware manufacturing."
    ]
  },
  {
    id: "moradabad",
    name: "Moradabad",
    division: "Moradabad",
    headquarters: "Moradabad",
    odop: "Brass Handicrafts & Metalware",
    landmarks: ["Jama Masjid Moradabad", "Ramganga River Bank", "Raza Library nearby"],
    clues: [
      "Situated on the banks of the Ramganga River, established in 1600 by Prince Murad, son of Shah Jahan.",
      "World-famous as the 'Brass City' (Pital Nagari) for its massive brass handicraft exports.",
      "Major international hub for handcrafted metalware, brass lamps, and engraved copper vessels."
    ]
  },
  {
    id: "firozabad",
    name: "Firozabad",
    division: "Agra",
    headquarters: "Firozabad",
    odop: "Glass Bangles & Glassware",
    landmarks: ["Jain Temple Chandrawati", "Glass Art Emporiums", "Kanshi Ram Park"],
    clues: [
      "Located near Agra in western UP, known as the 'City of Bangles' (Suhag Nagari).",
      "World-famous center for glass manufacturing, colorful glass bangles, and artistic chandeliers.",
      "Established during the reign of Sultan Firoz Shah Tughlaq in the 14th century."
    ]
  },
  {
    id: "saharanpur",
    name: "Saharanpur",
    division: "Saharanpur",
    headquarters: "Saharanpur",
    odop: "Wood Carving Handicrafts",
    landmarks: ["Shakumbhari Devi Temple", "Botanical Garden", "Darul Uloom Deoband"],
    clues: [
      "Northernmost district of UP in the fertile Doab region, world-famous for wood carving handicrafts.",
      "Renowned for the ancient Shakumbhari Devi Shakti Peeth temple and Darul Uloom Deoband institute.",
      "Major producer of delicious Dussehri mangoes, sugarcane, and wooden furniture exports."
    ]
  },
  {
    id: "mirzapur",
    name: "Mirzapur",
    division: "Mirzapur",
    headquarters: "Mirzapur",
    odop: "Handmade Carpets & Brass Utensils",
    landmarks: ["Vindhyachal Shakti Peeth", "Wyndham Falls", "Chunar Fort nearby"],
    clues: [
      "Located along the Ganga River, famous for the sacred Vindhyachal Shakti Peeth temple.",
      "Internationally renowned for handmade brassware and hand-knotted woollen carpet weaving.",
      "Home to scenic Wyndham Waterfalls and historic Chunar Fort along the river bends."
    ]
  },
  {
    id: "kushinagar",
    name: "Kushinagar",
    division: "Gorakhpur",
    headquarters: "Kushinagar (Padrauna)",
    odop: "Banana Fiber Products & Crafts",
    landmarks: ["Mahaparinirvana Temple", "Ramabhar Stupa", "Matha Kuar Shrine"],
    clues: [
      "International Buddhist pilgrimage center where Lord Buddha attained Mahaparinirvana.",
      "Features the 6-meter Reclining Buddha Mahaparinirvana Temple and Ramabhar Stupa.",
      "Famous for banana fiber handicrafts and eco-friendly artisan textiles."
    ]
  },
  {
    id: "jaunpur",
    name: "Jaunpur",
    division: "Varanasi",
    headquarters: "Jaunpur",
    odop: "Attar Perfumes & Woollen Carpets",
    landmarks: ["Shahi Bridge (Gomti)", "Atala Masjid", "Shahi Qila"],
    clues: [
      "Founded by Firoz Shah Tughlaq, capital of the Sharqi Dynasty, historically known as 'Shiraz-e-Hind'.",
      "Famous for the 16th-century Shahi Bridge over the Gomti River and Atala Masjid.",
      "Renowned for Imarti sweet delicacy and jasmine perfume extracts."
    ]
  },
  {
    id: "chitrakoot",
    name: "Chitrakoot",
    division: "Chitrakoot",
    headquarters: "Chitrakoot (Karwi)",
    odop: "Wooden Toys & Carvings",
    landmarks: ["Kamadgiri Hill", "Ramghat", "Sati Anusuya Ashram"],
    clues: [
      "Located in the northern Vindhya range bordering Madhya Pradesh along the Mandakini River.",
      "Holy forest abode where Lord Rama, Sita, and Lakshmana spent 11 years of exile.",
      "Celebrated for Kamadgiri Hill parikrama, Ramghat, and handcrafted wooden toys."
    ]
  },
  {
    id: "meerut",
    name: "Meerut",
    division: "Meerut",
    headquarters: "Meerut",
    odop: "Sports Goods & Equipment",
    landmarks: ["Augarnath Temple", "St. John Church", "Hastinapur Sanctuary"],
    clues: [
      "Historic epicenter where the Indian Rebellion of 1857 was sparked by Mangal Pandey's movement.",
      "Globally known as the 'Sports City of India' for producing top-quality cricket bats and gear.",
      "Ancient historical site linked to Mayasura in Mahabharata and Hastinapur."
    ]
  },
  {
    id: "bareilly",
    name: "Bareilly",
    division: "Bareilly",
    headquarters: "Bareilly",
    odop: "Zari-Zardozi Embroidery & Cane Furniture",
    landmarks: ["Trivati Nath Temple", "Ala Hazrat Dargah", "Fun City"],
    clues: [
      "Located in northern Rohilkhand region along the Ramganga River, known as 'Bans Bareilly'.",
      "Famous for Zari-Zardozi hand embroidery, cane-bamboo furniture, and Surma (kohl).",
      "Renowned in Indian pop culture for its famous bazaars and Dargah Ala Hazrat shrine."
    ]
  }
];

// Achievement Badges Dataset
export const achievementBadges = [
  {
    id: "badge_first_correct",
    title: "UP Explorer",
    description: "Correctly guess your first UP district!",
    icon: "🗺️",
    criteria: (stats) => stats.correctCount >= 1
  },
  {
    id: "badge_streak_3",
    title: "On a Roll",
    description: "Achieve a 3-question correct streak!",
    icon: "🔥",
    criteria: (stats) => stats.streak >= 3
  },
  {
    id: "badge_streak_5",
    title: "District Master",
    description: "Achieve a 5-question streak without a single mistake!",
    icon: "👑",
    criteria: (stats) => stats.streak >= 5
  },
  {
    id: "badge_score_500",
    title: "High Scorer",
    description: "Score over 500 total points in a game!",
    icon: "🏆",
    criteria: (stats) => stats.score >= 500
  },
  {
    id: "badge_hard_mode",
    title: "Cryptic Scholar",
    description: "Successfully complete a round in Hard Mode!",
    icon: "🧠",
    criteria: (stats) => stats.mode === "hard" && stats.correctCount >= 3
  },
  {
    id: "badge_timed_hero",
    title: "Speed Demon",
    description: "Score 5+ correct answers in Timed Challenge Mode!",
    icon: "⚡",
    criteria: (stats) => stats.mode === "timed" && stats.correctCount >= 5
  }
];

// Game Modes Definition
export const gameModes = {
  easy: {
    id: "easy",
    name: "Easy Mode",
    cluesShown: 3,
    timePerQuestion: 0, // No timer limit per question
    pointsPerCorrect: 100,
    hintPenalty: 25,
    description: "3 clear clues & 4 choices. Perfect for beginners!"
  },
  medium: {
    id: "medium",
    name: "Medium Mode",
    cluesShown: 2,
    timePerQuestion: 25, // 25 seconds
    pointsPerCorrect: 150,
    hintPenalty: 35,
    description: "2 subtle clues with a 25-second timer per question."
  },
  hard: {
    id: "hard",
    name: "Hard Mode",
    cluesShown: 1,
    timePerQuestion: 15, // 15 seconds
    pointsPerCorrect: 250,
    hintPenalty: 50,
    description: "1 cryptic clue & 15-second timer. Highest points!"
  },
  timed: {
    id: "timed",
    name: "60-Sec Timed Challenge",
    cluesShown: 2,
    totalGameTime: 60, // 60 seconds total
    pointsPerCorrect: 120,
    hintPenalty: 30,
    description: "Race against a 60-second countdown clock!"
  }
};

const HIGH_SCORE_KEY = "guess_up_district_high_scores";

/**
 * Get district profile object by ID or name.
 */
export function getDistrictById(id, list = districts) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(d => d.id.toLowerCase() === target || d.name.toLowerCase() === target);
}

/**
 * Generate a random question with 4 choices (1 correct, 3 distractors).
 */
export function getRandomQuestion(modeId = "easy", excludedIds = [], list = districts) {
  if (!Array.isArray(list) || list.length === 0) return null;

  // Filter available districts not in excluded list
  const available = list.filter(d => !excludedIds.includes(d.id));
  const pool = available.length > 0 ? available : list;

  const correctDistrict = pool[Math.floor(Math.random() * pool.length)];

  // Pick 3 unique distractors
  const distractors = list
    .filter(d => d.id !== correctDistrict.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Combine and shuffle options
  const options = [...distractors, correctDistrict].sort(() => 0.5 - Math.random());

  const modeConfig = gameModes[modeId] || gameModes.easy;

  // Slice clues according to mode
  const cluesToDisplay = correctDistrict.clues.slice(0, modeConfig.cluesShown);

  return {
    correctDistrict,
    options,
    clues: cluesToDisplay,
    allClues: correctDistrict.clues,
    modeConfig
  };
}

/**
 * Evaluate answer, score, time bonus, and streak.
 */
export function evaluateAnswer(selectedName, correctDistrict, timeRemaining = 0, modeId = "easy", hintUsed = false) {
  if (!correctDistrict) return { isCorrect: false, scoreEarned: 0 };

  const isCorrect = selectedName.trim().toLowerCase() === correctDistrict.name.trim().toLowerCase();
  const modeConfig = gameModes[modeId] || gameModes.easy;

  if (!isCorrect) {
    return {
      isCorrect: false,
      scoreEarned: 0,
      streakBonus: 0
    };
  }

  let basePoints = modeConfig.pointsPerCorrect;
  if (hintUsed) {
    basePoints = Math.max(10, basePoints - modeConfig.hintPenalty);
  }

  // Time bonus (10 points per remaining second in per-question timer mode)
  const timeBonus = timeRemaining > 0 ? timeRemaining * 5 : 0;
  const scoreEarned = basePoints + timeBonus;

  return {
    isCorrect: true,
    basePoints,
    timeBonus,
    scoreEarned
  };
}

/**
 * Check which achievement badges are unlocked based on player statistics.
 */
export function checkUnlockedBadges(stats = { score: 0, streak: 0, correctCount: 0, mode: "easy" }) {
  if (!stats) return [];
  return achievementBadges.filter(badge => badge.criteria(stats));
}

/**
 * Get high scores object from localStorage.
 */
export function getHighScores() {
  if (typeof localStorage === "undefined") return { easy: 0, medium: 0, hard: 0, timed: 0 };
  try {
    const raw = localStorage.getItem(HIGH_SCORE_KEY);
    return raw ? JSON.parse(raw) : { easy: 0, medium: 0, hard: 0, timed: 0 };
  } catch (e) {
    return { easy: 0, medium: 0, hard: 0, timed: 0 };
  }
}

/**
 * Save high score for a game mode if higher than existing record.
 */
export function saveHighScore(modeId, newScore) {
  if (!modeId || typeof localStorage === "undefined") return false;
  try {
    const scores = getHighScores();
    const currentHigh = scores[modeId] || 0;
    if (newScore > currentHigh) {
      scores[modeId] = newScore;
      localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(scores));
      return true; // New high score record!
    }
    return false;
  } catch (e) {
    return false;
  }
}

/* ==========================================================================
   BROWSER DOM & GAME ENGINE BINDINGS
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.upDistrictsData = districts;
  window.achievementBadgesData = achievementBadges;
  window.gameModesData = gameModes;
  window.getDistrictById = getDistrictById;
  window.getRandomQuestion = getRandomQuestion;
  window.evaluateAnswer = evaluateAnswer;
  window.checkUnlockedBadges = checkUnlockedBadges;
  window.getHighScores = getHighScores;
  window.saveHighScore = saveHighScore;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const modeSelectButtons = document.querySelectorAll(".btn-mode");
    const modeDescText = document.getElementById("mode-desc-text");
    const btnStartGame = document.getElementById("btn-start-game");

    const gameContainer = document.getElementById("game-play-area");
    const setupContainer = document.getElementById("game-setup-area");
    const resultsContainer = document.getElementById("game-results-area");

    // HUD Elements
    const hudScore = document.getElementById("hud-score");
    const hudStreak = document.getElementById("hud-streak");
    const hudTimer = document.getElementById("hud-timer");
    const hudProgress = document.getElementById("hud-progress");
    const progressBarFill = document.getElementById("progress-bar-fill");

    // Question Card Elements
    const cluesList = document.getElementById("clues-list");
    const optionsGrid = document.getElementById("options-grid");
    const btnUseHint = document.getElementById("btn-use-hint");
    const hintNotice = document.getElementById("hint-notice");
    const feedbackBanner = document.getElementById("feedback-banner");

    // Results Elements
    const finalScoreDisplay = document.getElementById("final-score");
    const finalAccuracyDisplay = document.getElementById("final-accuracy");
    const finalStreakDisplay = document.getElementById("final-streak");
    const highScoreNotice = document.getElementById("high-score-notice");
    const unlockedBadgesGrid = document.getElementById("unlocked-badges-grid");
    const btnPlayAgain = document.getElementById("btn-play-again");
    const btnChangeMode = document.getElementById("btn-change-mode");

    // Game State Variables
    let currentModeId = "easy";
    let score = 0;
    let streak = 0;
    let maxStreak = 0;
    let currentQuestionIndex = 0;
    const totalQuestions = 10;
    let correctAnswersCount = 0;
    let askedDistrictIds = [];
    let currentQuestion = null;
    let hintUsedForCurrentQuestion = false;
    let timerInterval = null;
    let secondsLeft = 0;

    // High Score UI Update
    function updateHighScoreDisplay() {
      const scores = getHighScores();
      document.querySelectorAll(".high-score-val").forEach(el => {
        const mode = el.dataset.mode;
        if (mode && scores[mode] !== undefined) {
          el.textContent = `${scores[mode]} pts`;
        }
      });
    }

    updateHighScoreDisplay();

    // Mode Selector Handler
    modeSelectButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        modeSelectButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentModeId = btn.dataset.mode;

        const config = gameModes[currentModeId];
        if (modeDescText && config) {
          modeDescText.textContent = config.description;
        }
      });
    });

    // Start Game
    btnStartGame?.addEventListener("click", startGame);

    function startGame() {
      score = 0;
      streak = 0;
      maxStreak = 0;
      currentQuestionIndex = 0;
      correctAnswersCount = 0;
      askedDistrictIds = [];
      clearInterval(timerInterval);

      if (setupContainer) setupContainer.style.display = "none";
      if (resultsContainer) resultsContainer.style.display = "none";
      if (gameContainer) gameContainer.style.display = "block";

      if (currentModeId === "timed") {
        secondsLeft = gameModes.timed.totalGameTime;
        startTimedChallengeClock();
      }

      nextQuestion();
    }

    function startTimedChallengeClock() {
      updateTimerHUD();
      timerInterval = setInterval(() => {
        secondsLeft--;
        updateTimerHUD();
        if (secondsLeft <= 0) {
          clearInterval(timerInterval);
          endGame();
        }
      }, 1000);
    }

    function startQuestionClock() {
      const modeConfig = gameModes[currentModeId];
      if (!modeConfig || modeConfig.timePerQuestion <= 0) return;

      secondsLeft = modeConfig.timePerQuestion;
      updateTimerHUD();

      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        secondsLeft--;
        updateTimerHUD();
        if (secondsLeft <= 0) {
          clearInterval(timerInterval);
          // Time out - evaluate as incorrect
          handleTimeOut();
        }
      }, 1000);
    }

    function updateTimerHUD() {
      if (!hudTimer) return;
      if (currentModeId === "easy") {
        hudTimer.textContent = "⏱️ ∞ (No Limit)";
      } else {
        hudTimer.textContent = `⏱️ ${secondsLeft}s`;
      }
    }

    function updateHUD() {
      if (hudScore) hudScore.textContent = score;
      if (hudStreak) hudStreak.textContent = `${streak} 🔥`;
      if (hudProgress) hudProgress.textContent = `Q ${currentQuestionIndex}/${totalQuestions}`;

      const pct = (currentQuestionIndex / totalQuestions) * 100;
      if (progressBarFill) progressBarFill.style.width = `${pct}%`;
    }

    function nextQuestion() {
      if (currentQuestionIndex >= totalQuestions && currentModeId !== "timed") {
        endGame();
        return;
      }

      currentQuestionIndex++;
      hintUsedForCurrentQuestion = false;

      if (feedbackBanner) {
        feedbackBanner.style.display = "none";
        feedbackBanner.className = "feedback-banner";
      }
      if (hintNotice) hintNotice.style.display = "none";
      if (btnUseHint) {
        btnUseHint.disabled = false;
        btnUseHint.textContent = "💡 Use Hint (-25 pts)";
      }

      currentQuestion = getRandomQuestion(currentModeId, askedDistrictIds);
      if (!currentQuestion) {
        endGame();
        return;
      }

      askedDistrictIds.push(currentQuestion.correctDistrict.id);

      updateHUD();
      renderClues();
      renderOptions();

      if (currentModeId === "medium" || currentModeId === "hard") {
        startQuestionClock();
      }
    }

    function renderClues() {
      if (!cluesList) return;
      cluesList.innerHTML = "";
      currentQuestion.clues.forEach((clueText, i) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="clue-num">Clue ${i + 1}:</span> ${clueText}`;
        cluesList.appendChild(li);
      });
    }

    function renderOptions() {
      if (!optionsGrid) return;
      optionsGrid.innerHTML = "";

      currentQuestion.options.forEach(district => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn-option";
        btn.textContent = district.name;

        btn.addEventListener("click", () => {
          handleOptionClick(district.name, btn);
        });

        optionsGrid.appendChild(btn);
      });
    }

    function handleOptionClick(selectedName, clickedBtn) {
      // Disable all option buttons
      const allBtns = optionsGrid?.querySelectorAll(".btn-option");
      allBtns?.forEach(b => b.disabled = true);

      if (currentModeId === "medium" || currentModeId === "hard") {
        clearInterval(timerInterval);
      }

      const result = evaluateAnswer(
        selectedName,
        currentQuestion.correctDistrict,
        secondsLeft,
        currentModeId,
        hintUsedForCurrentQuestion
      );

      if (result.isCorrect) {
        clickedBtn.classList.add("correct");
        score += result.scoreEarned;
        streak++;
        correctAnswersCount++;
        if (streak > maxStreak) maxStreak = streak;

        showFeedback(true, `Correct! +${result.scoreEarned} pts (${currentQuestion.correctDistrict.name}: ${currentQuestion.correctDistrict.odop})`);
      } else {
        clickedBtn.classList.add("incorrect");
        streak = 0;

        // Highlight correct answer
        allBtns?.forEach(b => {
          if (b.textContent === currentQuestion.correctDistrict.name) {
            b.classList.add("correct");
          }
        });

        showFeedback(false, `Incorrect! The correct answer was ${currentQuestion.correctDistrict.name} (${currentQuestion.correctDistrict.division} Division).`);
      }

      updateHUD();

      setTimeout(() => {
        if (currentModeId === "timed" && secondsLeft <= 0) {
          endGame();
        } else {
          nextQuestion();
        }
      }, 1800);
    }

    function handleTimeOut() {
      const allBtns = optionsGrid?.querySelectorAll(".btn-option");
      allBtns?.forEach(b => {
        b.disabled = true;
        if (b.textContent === currentQuestion.correctDistrict.name) {
          b.classList.add("correct");
        }
      });

      streak = 0;
      updateHUD();
      showFeedback(false, `Time's up! The correct answer was ${currentQuestion.correctDistrict.name}.`);

      setTimeout(() => {
        nextQuestion();
      }, 1800);
    }

    function showFeedback(isSuccess, message) {
      if (!feedbackBanner) return;
      feedbackBanner.textContent = message;
      feedbackBanner.className = `feedback-banner ${isSuccess ? "success" : "error"}`;
      feedbackBanner.style.display = "block";
    }

    // Hint Button Handler
    btnUseHint?.addEventListener("click", () => {
      if (hintUsedForCurrentQuestion || !currentQuestion) return;
      hintUsedForCurrentQuestion = true;
      btnUseHint.disabled = true;
      btnUseHint.textContent = "💡 Hint Used";

      // If additional clue available, append it
      if (currentQuestion.allClues.length > currentQuestion.clues.length) {
        const extraClue = currentQuestion.allClues[currentQuestion.clues.length];
        const li = document.createElement("li");
        li.className = "extra-hint-clue";
        li.innerHTML = `<span class="clue-num">Bonus Hint:</span> ${extraClue}`;
        cluesList?.appendChild(li);
      } else {
        // Eliminate 2 wrong choices
        const wrongBtns = Array.from(optionsGrid?.querySelectorAll(".btn-option") || [])
          .filter(b => b.textContent !== currentQuestion.correctDistrict.name);

        wrongBtns.slice(0, 2).forEach(b => {
          b.disabled = true;
          b.style.opacity = "0.3";
        });
      }

      if (hintNotice) {
        hintNotice.textContent = `Hint active! ${gameModes[currentModeId].hintPenalty} points deducted on correct answer.`;
        hintNotice.style.display = "block";
      }
    });

    // End Game & Results
    function endGame() {
      clearInterval(timerInterval);

      if (gameContainer) gameContainer.style.display = "none";
      if (resultsContainer) resultsContainer.style.display = "block";

      const accuracy = totalQuestions > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0;
      const isNewHigh = saveHighScore(currentModeId, score);

      if (finalScoreDisplay) finalScoreDisplay.textContent = score;
      if (finalAccuracyDisplay) finalAccuracyDisplay.textContent = `${accuracy}% (${correctAnswersCount}/${totalQuestions})`;
      if (finalStreakDisplay) finalStreakDisplay.textContent = `${maxStreak} 🔥`;

      if (highScoreNotice) {
        highScoreNotice.style.display = isNewHigh ? "block" : "none";
      }

      // Check Badges Unlocked
      const stats = {
        score,
        streak: maxStreak,
        correctCount: correctAnswersCount,
        mode: currentModeId,
        accuracy
      };

      const unlocked = checkUnlockedBadges(stats);
      renderBadges(unlocked);
      updateHighScoreDisplay();
    }

    function renderBadges(unlockedList) {
      if (!unlockedBadgesGrid) return;
      unlockedBadgesGrid.innerHTML = "";

      achievementBadges.forEach(badge => {
        const isUnlocked = unlockedList.some(b => b.id === badge.id);
        const card = document.createElement("div");
        card.className = `badge-card ${isUnlocked ? "unlocked" : "locked"}`;
        card.innerHTML = `
          <span class="badge-icon">${badge.icon}</span>
          <div class="badge-info">
            <strong>${badge.title}</strong>
            <p>${badge.description}</p>
          </div>
          <span class="badge-status">${isUnlocked ? "✓ Unlocked" : "🔒 Locked"}</span>
        `;
        unlockedBadgesGrid.appendChild(card);
      });
    }

    // Play Again & Change Mode handlers
    btnPlayAgain?.addEventListener("click", startGame);
    btnChangeMode?.addEventListener("click", () => {
      if (resultsContainer) resultsContainer.style.display = "none";
      if (setupContainer) setupContainer.style.display = "block";
    });
  });
}
