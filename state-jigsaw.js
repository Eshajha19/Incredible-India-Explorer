/**
 * state-jigsaw.js
 * State Shape Jigsaw Puzzle Game Engine & Dataset
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Core 10 State Puzzle Profiles Dataset
export const stateProfiles = [
  {
    id: "state-kl",
    code: "KL",
    name: "Kerala",
    capital: "Thiruvananthapuram",
    rivers: ["Periyar", "Bharathappuzha", "Pamba"],
    landmarks: ["Alleppey Backwaters", "Munnar Tea Gardens", "Padmanabhaswamy Temple"],
    funFacts: "Known as 'God's Own Country', Kerala has the highest literacy rate in India and pioneered the world's first fully solar-powered airport.",
    motto: "God's Own Country",
    colorTheme: "#10b981",
    patternIcon: "🌴"
  },
  {
    id: "state-wb",
    code: "WB",
    name: "West Bengal",
    capital: "Kolkata",
    rivers: ["Hooghly (Ganga)", "Teesta", "Subarnarekha"],
    landmarks: ["Victoria Memorial", "Howrah Bridge", "Sundarbans Mangrove Tiger Reserve"],
    funFacts: "Home to the world's largest mangrove forest (Sundarbans) and India's first underground metro railway system.",
    motto: "Cultural Capital of India",
    colorTheme: "#ec4899",
    patternIcon: "🐯"
  },
  {
    id: "state-mh",
    code: "MH",
    name: "Maharashtra",
    capital: "Mumbai",
    rivers: ["Godavari", "Krishna", "Tapi"],
    landmarks: ["Gateway of India", "Ajanta & Ellora Caves", "Western Ghats Sahyadri"],
    funFacts: "Mumbai is India's financial capital and home to Bollywood, while UNESCO-listed Ajanta Caves date back to 2nd Century BCE.",
    motto: "Financial & Heritage Gateway",
    colorTheme: "#f97316",
    patternIcon: "👑"
  },
  {
    id: "state-rj",
    code: "RJ",
    name: "Rajasthan",
    capital: "Jaipur",
    rivers: ["Chambal", "Luni", "Banas"],
    landmarks: ["Amber Fort", "Hawa Mahal (Pink City)", "Thar Desert Dunes"],
    funFacts: "India's largest state by area, famed for majestic hill forts, vibrant folk music, and rich royal Rajput history.",
    motto: "Land of Kings",
    colorTheme: "#eab308",
    patternIcon: "🏰"
  },
  {
    id: "state-tn",
    code: "TN",
    name: "Tamil Nadu",
    capital: "Chennai",
    rivers: ["Kaveri", "Vaigai", "Thamirabarani"],
    landmarks: ["Meenakshi Temple", "Brihadisvara Temple Tanjore", "Marina Beach"],
    funFacts: "Boasts over 33,000 ancient Dravidian temples and the world's second-longest natural urban beach in Chennai.",
    motto: "Cradle of Dravidian Heritage",
    colorTheme: "#8b5cf6",
    patternIcon: "🛕"
  },
  {
    id: "state-pb",
    code: "PB",
    name: "Punjab",
    capital: "Chandigarh",
    rivers: ["Sutlej", "Beas", "Ravi"],
    landmarks: ["Golden Temple (Harmandir Sahib)", "Wagah Border", "Jallianwala Bagh"],
    funFacts: "The 'Granary of India' produces a major portion of India's wheat and rice, renowned for warm hospitality and energetic Bhangra folk dance.",
    motto: "Granary of India",
    colorTheme: "#06b6d4",
    patternIcon: "🌾"
  },
  {
    id: "state-gj",
    code: "GJ",
    name: "Gujarat",
    capital: "Gandhinagar",
    rivers: ["Narmada", "Sabarmati", "Tapi"],
    landmarks: ["Statue of Unity", "Great Rann of Kutch", "Gir Forest Asiatic Lions"],
    funFacts: "Home to the world's tallest statue (Statue of Unity, 182m) and the last remaining wild habitat of Asiatic Lions in Gir.",
    motto: "Jewel of Western India",
    colorTheme: "#f43f5e",
    patternIcon: "🦁"
  },
  {
    id: "state-od",
    code: "OD",
    name: "Odisha",
    capital: "Bhubaneswar",
    rivers: ["Mahanadi", "Brahmani", "Baitarani"],
    landmarks: ["Konark Sun Temple", "Jagannath Temple Puri", "Chilika Lake Lagoon"],
    funFacts: "Bhubaneswar is called the 'Temple City of India', while Chilika Lake is Asia's largest brackish water lagoon.",
    motto: "Soul of Incredible India",
    colorTheme: "#14b8a6",
    patternIcon: "🌅"
  },
  {
    id: "state-ka",
    code: "KA",
    name: "Karnataka",
    capital: "Bengaluru",
    rivers: ["Kaveri", "Tungabhadra", "Krishna"],
    landmarks: ["Mysore Palace", "Hampi UNESCO Ruins", "Jog Falls"],
    funFacts: "Bengaluru is Asia's top IT software hub, while Hampi preserves the breathtaking stone architecture of the Vijayanagara Empire.",
    motto: "One State, Many Worlds",
    colorTheme: "#6366f1",
    patternIcon: "🐘"
  },
  {
    id: "state-as",
    code: "AS",
    name: "Assam",
    capital: "Dispur",
    rivers: ["Brahmaputra", "Barak", "Manas"],
    landmarks: ["Kaziranga National Park", "Kamakhya Temple", "Majuli River Island"],
    funFacts: "Home to two-thirds of the world's great one-horned rhinoceros population and Majuli, the world's largest inhabited river island.",
    motto: "Land of the Red River & Blue Hills",
    colorTheme: "#a855f7",
    patternIcon: "🦏"
  }
];

/**
 * Get state profile object by state code or ID.
 */
export function getStateProfile(stateCode, list = stateProfiles) {
  if (!stateCode || !Array.isArray(list)) return undefined;
  const target = stateCode.trim().toLowerCase();
  return list.find(s => s.code.toLowerCase() === target || s.id.toLowerCase() === target);
}

/**
 * Calculate grid dimension (rows = cols = sqrt(pieceCount))
 * Supported piece counts: 9 (3x3), 16 (4x4), 25 (5x5).
 */
export function getGridDimension(pieceCount = 9) {
  const count = Number(pieceCount);
  if (count === 25) return 5;
  if (count === 16) return 4;
  return 3; // Default 3x3 (9 pieces)
}

/**
 * Generate puzzle pieces for a selected state profile and piece count.
 */
export function generatePuzzlePieces(stateCode = "KL", pieceCount = 9) {
  const profile = getStateProfile(stateCode) || stateProfiles[0];
  const gridDim = getGridDimension(pieceCount);
  const totalPieces = gridDim * gridDim;
  const pieces = [];

  for (let index = 0; index < totalPieces; index++) {
    const row = Math.floor(index / gridDim);
    const col = index % gridDim;
    const bgX = (col / (gridDim - 1)) * 100;
    const bgY = (row / (gridDim - 1)) * 100;

    pieces.push({
      id: `${profile.code}-piece-${index}`,
      stateCode: profile.code,
      correctIndex: index,
      row,
      col,
      bgPosition: `${bgX}% ${bgY}%`,
      icon: profile.patternIcon,
      color: profile.colorTheme,
      label: `${row + 1},${col + 1}`
    });
  }

  return pieces;
}

/**
 * Shuffle array of puzzle pieces for the available piece bank.
 */
export function shufflePieces(pieces = []) {
  if (!Array.isArray(pieces)) return [];
  const shuffled = [...pieces];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Check if a placed piece index matches its target board slot index.
 */
export function isPlacementCorrect(piece, targetSlotIndex) {
  if (!piece || typeof targetSlotIndex !== "number") return false;
  return piece.correctIndex === targetSlotIndex;
}

/**
 * Check if puzzle board is 100% completed correctly.
 * boardState is an array of size pieceCount containing placed piece objects or nulls.
 */
export function isPuzzleComplete(boardState = [], pieceCount = 9) {
  if (!Array.isArray(boardState) || boardState.length !== Number(pieceCount)) return false;
  return boardState.every((piece, index) => {
    return piece && piece.correctIndex === index;
  });
}

/**
 * Calculate completion percentage of current board state.
 */
export function calculateCompletionPercentage(boardState = [], pieceCount = 9) {
  if (!Array.isArray(boardState) || pieceCount <= 0) return 0;
  const correctCount = boardState.reduce((acc, piece, index) => {
    return acc + (piece && piece.correctIndex === index ? 1 : 0);
  }, 0);
  return Math.round((correctCount / pieceCount) * 100);
}

/* ==========================================================================
   BROWSER DOM & DRAG-AND-DROP GAME ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.stateProfilesData = stateProfiles;
  window.getStateProfile = getStateProfile;
  window.generatePuzzlePieces = generatePuzzlePieces;
  window.shufflePieces = shufflePieces;
  window.isPuzzleComplete = isPuzzleComplete;
  window.calculateCompletionPercentage = calculateCompletionPercentage;

  document.addEventListener("DOMContentLoaded", () => {
    const stateSelect = document.getElementById("state-select");
    const diffButtons = document.querySelectorAll(".btn-diff");
    const boardContainer = document.getElementById("target-board");
    const piecesBank = document.getElementById("pieces-bank");
    const moveCounter = document.getElementById("move-counter");
    const timerDisplay = document.getElementById("timer-display");
    const progressText = document.getElementById("progress-text");
    const btnResetGame = document.getElementById("btn-reset-game");
    const btnHintGame = document.getElementById("btn-hint-game");

    // Modal elements
    const completionModal = document.getElementById("completion-modal");
    const modalCloseBtn = document.getElementById("modal-close");
    const btnPlayAgain = document.getElementById("btn-play-again");
    const modalStateName = document.getElementById("modal-state-name");
    const modalStateCapital = document.getElementById("modal-state-capital");
    const modalStateRivers = document.getElementById("modal-state-rivers");
    const modalStateLandmarks = document.getElementById("modal-state-landmarks");
    const modalStateFacts = document.getElementById("modal-state-facts");
    const modalStatsText = document.getElementById("modal-stats-text");

    let currentStateCode = "KL";
    let currentPieceCount = 9;
    let piecesList = [];
    let boardState = []; // array of placed piece objects or null
    let movesCount = 0;
    let timerSeconds = 0;
    let timerInterval = null;
    let selectedBankPieceId = null;

    // Populate state select dropdown
    if (stateSelect) {
      stateProfiles.forEach(st => {
        const opt = document.createElement("option");
        opt.value = st.code;
        opt.textContent = `${st.patternIcon} ${st.name} (${st.motto})`;
        stateSelect.appendChild(opt);
      });
    }

    function startTimer() {
      stopTimer();
      timerSeconds = 0;
      updateTimerUI();
      timerInterval = setInterval(() => {
        timerSeconds++;
        updateTimerUI();
      }, 1000);
    }

    function stopTimer() {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }

    function updateTimerUI() {
      if (!timerDisplay) return;
      const mins = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
      const secs = (timerSeconds % 60).toString().padStart(2, '0');
      timerDisplay.textContent = `${mins}:${secs}`;
    }

    function initGame() {
      stopTimer();
      movesCount = 0;
      selectedBankPieceId = null;
      if (moveCounter) moveCounter.textContent = "0";

      const gridDim = getGridDimension(currentPieceCount);
      piecesList = generatePuzzlePieces(currentStateCode, currentPieceCount);
      boardState = new Array(currentPieceCount).fill(null);

      updateProgressUI();

      // Set CSS grid layout for target board
      if (boardContainer) {
        boardContainer.style.gridTemplateColumns = `repeat(${gridDim}, 1fr)`;
        boardContainer.style.gridTemplateRows = `repeat(${gridDim}, 1fr)`;
        boardContainer.innerHTML = "";

        for (let i = 0; i < currentPieceCount; i++) {
          const slot = document.createElement("div");
          slot.className = "board-slot";
          slot.dataset.slotIndex = i;
          slot.innerHTML = `<span class="slot-number">${i + 1}</span>`;

          // Dragover & Drop handlers
          slot.addEventListener("dragover", (e) => {
            e.preventDefault();
            slot.classList.add("drag-over");
          });

          slot.addEventListener("dragleave", () => {
            slot.classList.remove("drag-over");
          });

          slot.addEventListener("drop", (e) => {
            e.preventDefault();
            slot.classList.remove("drag-over");
            const pieceId = e.dataTransfer.getData("text/plain");
            placePieceInSlot(pieceId, i);
          });

          // Click-to-place handler
          slot.addEventListener("click", () => {
            if (selectedBankPieceId !== null) {
              placePieceInSlot(selectedBankPieceId, i);
            }
          });

          boardContainer.appendChild(slot);
        }
      }

      // Populate Pieces Bank
      if (piecesBank) {
        piecesBank.innerHTML = "";
        const shuffled = shufflePieces(piecesList);
        shuffled.forEach(piece => {
          const tile = document.createElement("div");
          tile.className = "puzzle-piece-tile";
          tile.id = piece.id;
          tile.setAttribute("draggable", "true");
          tile.dataset.pieceId = piece.id;
          tile.style.backgroundColor = piece.color;
          tile.innerHTML = `
            <span class="piece-icon">${piece.icon}</span>
            <span class="piece-label">${piece.label}</span>
          `;

          // Dragstart
          tile.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", piece.id);
            tile.classList.add("dragging");
            if (timerSeconds === 0 && !timerInterval) startTimer();
          });

          tile.addEventListener("dragend", () => {
            tile.classList.remove("dragging");
          });

          // Click select
          tile.addEventListener("click", () => {
            if (timerSeconds === 0 && !timerInterval) startTimer();
            document.querySelectorAll(".puzzle-piece-tile").forEach(t => t.classList.remove("selected"));
            if (selectedBankPieceId === piece.id) {
              selectedBankPieceId = null;
            } else {
              selectedBankPieceId = piece.id;
              tile.classList.add("selected");
            }
          });

          piecesBank.appendChild(tile);
        });
      }
    }

    function placePieceInSlot(pieceId, slotIndex) {
      if (!pieceId) return;
      const pieceObj = piecesList.find(p => p.id === pieceId);
      if (!pieceObj) return;

      // Increment moves
      movesCount++;
      if (moveCounter) moveCounter.textContent = movesCount;
      if (timerSeconds === 0 && !timerInterval) startTimer();

      // Check if slot already has a piece; if so return old piece to bank
      const existingPiece = boardState[slotIndex];
      if (existingPiece) {
        returnPieceToBank(existingPiece);
      }

      boardState[slotIndex] = pieceObj;

      // Update Slot DOM
      const slot = boardContainer?.querySelector(`[data-slot-index="${slotIndex}"]`);
      if (slot) {
        slot.innerHTML = `
          <div class="placed-piece-content" style="background-color: ${pieceObj.color}">
            <span class="piece-icon">${pieceObj.icon}</span>
            <span class="piece-label">${pieceObj.label}</span>
          </div>
        `;
        slot.classList.add("filled");
        slot.classList.toggle("correct-snap", pieceObj.correctIndex === slotIndex);
      }

      // Hide or remove piece tile from bank
      const bankTile = document.getElementById(pieceId);
      if (bankTile) bankTile.style.display = "none";

      selectedBankPieceId = null;
      updateProgressUI();

      // Check completion
      if (isPuzzleComplete(boardState, currentPieceCount)) {
        stopTimer();
        setTimeout(showCompletionModal, 300);
      }
    }

    function returnPieceToBank(pieceObj) {
      const bankTile = document.getElementById(pieceObj.id);
      if (bankTile) bankTile.style.display = "flex";
    }

    function updateProgressUI() {
      const pct = calculateCompletionPercentage(boardState, currentPieceCount);
      if (progressText) progressText.textContent = `${pct}% Assembled`;
    }

    function showCompletionModal() {
      const profile = getStateProfile(currentStateCode);
      if (!profile || !completionModal) return;

      if (modalStateName) modalStateName.textContent = profile.name;
      if (modalStateCapital) modalStateCapital.textContent = profile.capital;
      if (modalStateRivers) modalStateRivers.textContent = profile.rivers.join(", ");
      if (modalStateLandmarks) modalStateLandmarks.textContent = profile.landmarks.join(" · ");
      if (modalStateFacts) modalStateFacts.textContent = profile.funFacts;
      if (modalStatsText) {
        const mins = Math.floor(timerSeconds / 60);
        const secs = timerSeconds % 60;
        modalStatsText.textContent = `Completed in ${mins}m ${secs}s with ${movesCount} moves on ${currentPieceCount}-piece grid!`;
      }

      completionModal.classList.add("active");
    }

    // Modal Close
    modalCloseBtn?.addEventListener("click", () => completionModal?.classList.remove("active"));
    btnPlayAgain?.addEventListener("click", () => {
      completionModal?.classList.remove("active");
      initGame();
    });

    // Reset Game
    btnResetGame?.addEventListener("click", () => {
      initGame();
    });

    // Hint Button (places 1 correct piece)
    btnHintGame?.addEventListener("click", () => {
      // Find first empty or incorrect slot
      const targetSlot = boardState.findIndex((piece, idx) => !piece || piece.correctIndex !== idx);
      if (targetSlot !== -1) {
        const correctPiece = piecesList.find(p => p.correctIndex === targetSlot);
        if (correctPiece) {
          placePieceInSlot(correctPiece.id, targetSlot);
        }
      }
    });

    // State selector change
    stateSelect?.addEventListener("change", (e) => {
      currentStateCode = e.target.value;
      initGame();
    });

    // Difficulty buttons click
    diffButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        diffButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentPieceCount = Number(btn.dataset.pieces);
        initGame();
      });
    });

    // Initial game launch
    initGame();
  });
}
