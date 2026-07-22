const monuments = [
    { id: 1, name: "Taj Mahal", image: "assets/Taj_Mahal.png" },
    { id: 2, name: "Qutub Minar", image: "https://picsum.photos/id/1016/800/800" }, // Fallback if asset doesn't exist
    { id: 3, name: "Hawa Mahal", image: "assets/Hawa_Mahal.png" },
    { id: 4, name: "Gateway of India", image: "assets/travel_beaches.png" },
    { id: 5, name: "Charminar", image: "assets/travel_hidden.png" },
    { id: 6, name: "Konark Sun Temple", image: "assets/Konark_Sun_Temple.png" }
];

const difficulties = {
    easy: { grid: 3, time: 120, hints: 3, pieces: 9 },
    medium: { grid: 4, time: 180, hints: 2, pieces: 16 },
    hard: { grid: 5, time: 240, hints: 1, pieces: 25 }
};

// Game State
let currentMonument = monuments[0];
let currentDifficulty = 'easy';
let boardState = []; // Track what is currently placed on the board
let score = 0;
let timer = 0;
let timerInterval = null;
let hintsRemaining = 0;
let isPlaying = false;
let unlockedLevel = parseInt(localStorage.getItem('monumentProgress') || '1');

// DOM Elements
const dropZone = document.getElementById('drop-zone');
const piecesPool = document.getElementById('pieces-pool');
const timerDisplay = document.getElementById('timer-display');
const scoreDisplay = document.getElementById('score-display');
const hintsDisplay = document.getElementById('hints-display');
const monumentList = document.getElementById('monument-list');
const difficultySelector = document.getElementById('difficulty-selector');
const btnStart = document.getElementById('btn-start');
const btnHint = document.getElementById('btn-hint');
const monumentTitle = document.getElementById('monument-title');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const modal = document.getElementById('game-modal');

// Init
function init() {
    renderLevelSelector();
    setupEventListeners();
    loadLevel(monuments[0]);
}

function setupEventListeners() {
    btnStart.addEventListener('click', startGame);
    btnHint.addEventListener('click', useHint);
    difficultySelector.addEventListener('change', (e) => {
        currentDifficulty = e.target.value;
        if (!isPlaying) loadLevel(currentMonument);
    });
    document.getElementById('btn-next-level').addEventListener('click', () => {
        modal.style.display = 'none';
        const nextMonument = monuments.find(m => m.id === currentMonument.id + 1);
        if (nextMonument) {
            loadLevel(nextMonument);
            startGame();
        }
    });
    document.getElementById('btn-retry').addEventListener('click', () => {
        modal.style.display = 'none';
        startGame();
    });
}

function renderLevelSelector() {
    monumentList.innerHTML = '';
    monuments.forEach(monument => {
        const isUnlocked = monument.id <= unlockedLevel;
        const item = document.createElement('div');
        item.className = `monument-item ${isUnlocked ? 'unlocked' : 'locked'} ${currentMonument.id === monument.id ? 'active' : ''}`;
        
        item.innerHTML = `
            <img src="${monument.image}" alt="${monument.name}">
            <div class="monument-item-title">${monument.name}</div>
            ${!isUnlocked ? '<span class="monument-item-lock">🔒 Locked</span>' : ''}
        `;
        
        if (isUnlocked) {
            item.addEventListener('click', () => {
                if (isPlaying) {
                    if(!confirm("Are you sure you want to abandon the current game?")) return;
                    stopTimer();
                }
                loadLevel(monument);
                renderLevelSelector(); // update active state
            });
        }
        
        monumentList.appendChild(item);
    });
}

function loadLevel(monument) {
    currentMonument = monument;
    monumentTitle.textContent = monument.name;
    isPlaying = false;
    btnStart.textContent = "Start Game";
    btnStart.disabled = false;
    
    const config = difficulties[currentDifficulty];
    hintsRemaining = config.hints;
    timer = config.time;
    score = 0;
    
    updateHUD();
    updateProgress(0);
    
    // Clear boards
    dropZone.innerHTML = '';
    piecesPool.innerHTML = '';
    
    // Set grid classes
    dropZone.className = `puzzle-board grid-${config.grid}x${config.grid}`;
    piecesPool.className = `pieces-pool grid-${config.grid}x${config.grid}`;
    
    // Create drop slots
    for (let i = 0; i < config.pieces; i++) {
        const slot = document.createElement('div');
        slot.className = 'drop-slot';
        slot.dataset.index = i;
        slot.innerHTML = i + 1; // Just for visual cue during dev
        
        // Drag over events
        slot.addEventListener('dragover', e => {
            e.preventDefault();
            if(!slot.hasChildNodes()) slot.classList.add('drag-over');
        });
        slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
        slot.addEventListener('drop', handleDrop);
        
        dropZone.appendChild(slot);
    }
}

function startGame() {
    if (isPlaying) return;
    isPlaying = true;
    btnStart.textContent = "Playing...";
    btnStart.disabled = true;
    score = 0;
    
    const config = difficulties[currentDifficulty];
    hintsRemaining = config.hints;
    timer = config.time;
    boardState = new Array(config.pieces).fill(null);
    
    updateHUD();
    generatePieces();
    startTimer();
}

function generatePieces() {
    const config = difficulties[currentDifficulty];
    piecesPool.innerHTML = '';
    
    let piecesArray = [];
    
    for (let i = 0; i < config.pieces; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.draggable = true;
        piece.dataset.target = i;
        
        // Calculate background position
        const row = Math.floor(i / config.grid);
        const col = i % config.grid;
        
        // For a 3x3 grid, size is 300%. Steps are 0%, 50%, 100%
        // Formula: position = (col / (grid - 1)) * 100%
        const xPos = config.grid > 1 ? (col / (config.grid - 1)) * 100 : 0;
        const yPos = config.grid > 1 ? (row / (config.grid - 1)) * 100 : 0;
        
        piece.style.backgroundImage = `url('${currentMonument.image}')`;
        piece.style.backgroundSize = `${config.grid * 100}% ${config.grid * 100}%`;
        piece.style.backgroundPosition = `${xPos}% ${yPos}%`;
        
        // Drag events
        piece.addEventListener('dragstart', handleDragStart);
        piece.addEventListener('dragend', handleDragEnd);
        
        piecesArray.push(piece);
    }
    
    // Shuffle pieces
    piecesArray.sort(() => Math.random() - 0.5);
    
    piecesArray.forEach(p => piecesPool.appendChild(p));
}

let draggedPiece = null;

function handleDragStart(e) {
    if (!isPlaying) return;
    draggedPiece = this;
    setTimeout(() => this.classList.add('dragging'), 0);
    e.dataTransfer.setData('text/plain', this.dataset.target);
}

function handleDragEnd() {
    this.classList.remove('dragging');
    draggedPiece = null;
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    if (!isPlaying || !draggedPiece) return;
    if (this.hasChildNodes()) return; // Already has a piece
    
    const targetSlotIndex = parseInt(this.dataset.index);
    const pieceTargetIndex = parseInt(draggedPiece.dataset.target);
    
    if (targetSlotIndex === pieceTargetIndex) {
        // Correct drop
        this.innerHTML = ''; // clear visual cue text
        this.appendChild(draggedPiece);
        draggedPiece.draggable = false; // Disable dragging once placed
        draggedPiece.classList.add('glow-animation');
        boardState[targetSlotIndex] = pieceTargetIndex;
        
        updateProgress();
        checkWinCondition();
    } else {
        // Wrong drop
        draggedPiece.classList.add('shake-animation');
        setTimeout(() => draggedPiece.classList.remove('shake-animation'), 500);
        score = Math.max(0, score - 10);
        updateHUD();
    }
}

function useHint() {
    if (!isPlaying || hintsRemaining <= 0) return;
    
    // Find first empty slot
    const emptySlotIndex = boardState.findIndex(val => val === null);
    if (emptySlotIndex === -1) return;
    
    // Find the corresponding piece in the pool
    const targetPiece = piecesPool.querySelector(`[data-target="${emptySlotIndex}"]`);
    if (targetPiece) {
        const slot = dropZone.querySelector(`[data-index="${emptySlotIndex}"]`);
        slot.innerHTML = '';
        slot.appendChild(targetPiece);
        targetPiece.draggable = false;
        targetPiece.classList.add('glow-animation');
        
        boardState[emptySlotIndex] = emptySlotIndex;
        hintsRemaining--;
        updateHUD();
        updateProgress();
        checkWinCondition();
    }
}

function updateProgress() {
    const config = difficulties[currentDifficulty];
    const placed = boardState.filter(val => val !== null).length;
    const percentage = Math.round((placed / config.pieces) * 100);
    
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}% Completed`;
}

function startTimer() {
    timerDisplay.classList.remove('timer-pulse');
    timerInterval = setInterval(() => {
        timer--;
        updateHUD();
        
        if (timer <= 10) {
            timerDisplay.classList.add('timer-pulse');
        }
        
        if (timer <= 0) {
            stopTimer();
            gameOver(false);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerDisplay.classList.remove('timer-pulse');
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function updateHUD() {
    timerDisplay.textContent = formatTime(timer);
    scoreDisplay.textContent = score;
    hintsDisplay.textContent = hintsRemaining;
}

function checkWinCondition() {
    const config = difficulties[currentDifficulty];
    const placed = boardState.filter(val => val !== null).length;
    
    if (placed === config.pieces) {
        stopTimer();
        gameOver(true);
    }
}

function gameOver(isWin) {
    isPlaying = false;
    
    if (isWin) {
        // Calculate Score
        const baseScore = 1000;
        const timeBonus = timer * 5;
        const hintBonus = hintsRemaining * 100;
        const totalScore = baseScore + timeBonus + hintBonus;
        score += totalScore;
        
        document.getElementById('modal-title').textContent = "Monument Reconstructed!";
        document.getElementById('modal-message').textContent = "Excellent architecture skills!";
        document.getElementById('modal-base-score').textContent = baseScore;
        document.getElementById('modal-time-bonus').textContent = `+ ${timeBonus}`;
        document.getElementById('modal-hint-bonus').textContent = `+ ${hintBonus}`;
        document.getElementById('modal-total-score').textContent = totalScore;
        
        // Unlock next
        if (unlockedLevel < monuments.length && currentMonument.id === unlockedLevel) {
            unlockedLevel++;
            localStorage.setItem('monumentProgress', unlockedLevel.toString());
            renderLevelSelector();
        }
        
        document.getElementById('btn-next-level').style.display = unlockedLevel > currentMonument.id ? 'inline-block' : 'none';
        
    } else {
        document.getElementById('modal-title').textContent = "Time's Up!";
        document.getElementById('modal-message').textContent = "You ran out of time. Try again!";
        document.getElementById('modal-base-score').textContent = "0";
        document.getElementById('modal-time-bonus').textContent = "0";
        document.getElementById('modal-hint-bonus').textContent = "0";
        document.getElementById('modal-total-score').textContent = "0";
        document.getElementById('btn-next-level').style.display = 'none';
    }
    
    document.getElementById('modal-image').style.backgroundImage = `url('${currentMonument.image}')`;
    modal.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', init);
