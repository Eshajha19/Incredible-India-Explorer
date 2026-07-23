// Treasure Hunt Game Logic

const GAME_DATA = [
    {
        id: 'rj', name: 'Rajasthan',
        riddle: 'I am the Land of Kings, where the desert sands meet majestic forts. The Palace of Winds stands tall here.',
        hint: 'Look to the west, sharing a border with Pakistan.',
        monument: 'Hawa Mahal', desc: 'A beautiful palace in Jaipur with intricate honeycomb windows.',
        img: 'assets/Hawa_Mahal.png', pos: { top: '35%', left: '25%' }
    },
    {
        id: 'mh', name: 'Maharashtra',
        riddle: 'Home to the city of dreams and a massive archway built to welcome a King overlooking the Arabian Sea.',
        hint: 'Located in the western peninsular region.',
        monument: 'Gateway of India', desc: 'An iconic arch monument built in the early 20th century in Mumbai.',
        img: 'https://picsum.photos/id/1020/400/300', pos: { top: '60%', left: '30%' }
    },
    {
        id: 'or', name: 'Odisha',
        riddle: 'A coastal eastern state known for a massive chariot temple dedicated to the Sun God.',
        hint: 'Located on the eastern coast along the Bay of Bengal.',
        monument: 'Konark Sun Temple', desc: 'A 13th-century CE Sun temple at Konark about 35 kilometres northeast from Puri.',
        img: 'assets/Konark_Sun_Temple.png', pos: { top: '55%', left: '65%' }
    },
    {
        id: 'up', name: 'Uttar Pradesh',
        riddle: 'I hold a tear drop on the cheek of eternity, built out of white marble for love.',
        hint: 'A large state in the northern plains.',
        monument: 'Taj Mahal', desc: 'An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra.',
        img: 'assets/Taj_Mahal.png', pos: { top: '35%', left: '45%' }
    },
    {
        id: 'ka', name: 'Karnataka',
        riddle: 'Famous for its IT hub today, but historically known for a grand illuminated palace in the city of Mysuru.',
        hint: 'A southwestern state with Arabian Sea coastlines.',
        monument: 'Mysore Palace', desc: 'A historical palace and a royal residence at Mysore.',
        img: 'assets/Mysore_Palace.png', pos: { top: '75%', left: '35%' }
    }
];

// Add some dummy states for wrong guesses
const DUMMY_STATES = [
    { id: 'gj', name: 'Gujarat', pos: { top: '45%', left: '15%' } },
    { id: 'mp', name: 'Madhya Pradesh', pos: { top: '48%', left: '40%' } },
    { id: 'tn', name: 'Tamil Nadu', pos: { top: '85%', left: '40%' } },
    { id: 'kl', name: 'Kerala', pos: { top: '85%', left: '30%' } },
    { id: 'wb', name: 'West Bengal', pos: { top: '50%', left: '75%' } },
    { id: 'jk', name: 'Jammu & Kashmir', pos: { top: '15%', left: '30%' } },
    { id: 'as', name: 'Assam', pos: { top: '40%', left: '85%' } }
];

let currentClueIndex = 0;
let score = 5000;
let hintsUsed = 0;
let hintsLeft = 3;
let timeElapsed = 0;
let timerInterval;

const els = {
    riddleNum: document.getElementById('riddle-number'),
    totalRiddles: document.getElementById('total-riddles'),
    score: document.getElementById('th-score'),
    time: document.getElementById('th-time'),
    clueText: document.getElementById('th-clue-text'),
    btnHint: document.getElementById('btn-hint'),
    hintText: document.getElementById('hint-text'),
    hintsLeft: document.getElementById('hints-left'),
    
    nodesContainer: document.getElementById('state-nodes-container'),
    mapFeedback: document.getElementById('map-feedback'),
    passportGrid: document.getElementById('passport-grid'),
    
    correctModal: document.getElementById('correct-modal'),
    modalStateName: document.getElementById('modal-state-name'),
    modalMonumentImg: document.getElementById('modal-monument-img'),
    modalMonumentName: document.getElementById('modal-monument-name'),
    modalMonumentDesc: document.getElementById('modal-monument-desc'),
    btnNextClue: document.getElementById('btn-next-clue'),
    
    gameOverModal: document.getElementById('game-over-modal'),
    fsScore: document.getElementById('fs-score'),
    fsTime: document.getElementById('fs-time'),
    fsHints: document.getElementById('fs-hints'),
    btnPlayAgain: document.getElementById('btn-play-again'),
    
    topScoreDisplay: document.getElementById('top-score-display')
};

function initGame() {
    currentClueIndex = 0;
    score = 5000;
    hintsUsed = 0;
    hintsLeft = 3;
    timeElapsed = 0;
    
    els.totalRiddles.textContent = GAME_DATA.length;
    els.passportGrid.innerHTML = '';
    els.nodesContainer.innerHTML = '';
    
    // Draw empty passport slots
    GAME_DATA.forEach((_, i) => {
        els.passportGrid.innerHTML += `
            <div class="stamp-slot" id="stamp-slot-${i}">
                <img src="" class="stamp-img" id="stamp-img-${i}">
            </div>
        `;
    });

    // Draw Map Nodes
    const allStates = [...GAME_DATA, ...DUMMY_STATES];
    allStates.forEach(s => {
        const node = document.createElement('div');
        node.className = 'state-node';
        node.dataset.id = s.id;
        node.dataset.name = s.name;
        node.style.top = s.pos.top;
        node.style.left = s.pos.left;
        node.onclick = () => handleNodeClick(s);
        els.nodesContainer.appendChild(node);
    });

    // Load High Score
    const hs = JSON.parse(localStorage.getItem('th-highscore') || '{"score": 0, "time": 0}');
    if(hs.score > 0) {
        els.topScoreDisplay.textContent = `${hs.score} pts (${formatTime(hs.time)})`;
    }

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeElapsed++;
        els.time.textContent = formatTime(timeElapsed);
        
        // Time penalty every 10 seconds
        if (timeElapsed > 0 && timeElapsed % 10 === 0) {
            updateScore(-10);
        }
    }, 1000);

    els.gameOverModal.classList.add('hidden');
    
    loadClue();
}

function loadClue() {
    const clue = GAME_DATA[currentClueIndex];
    els.riddleNum.textContent = currentClueIndex + 1;
    els.clueText.textContent = clue.riddle;
    
    els.hintText.classList.add('hidden');
    els.hintText.textContent = clue.hint;
    
    els.btnHint.disabled = hintsLeft <= 0;
    els.hintsLeft.textContent = hintsLeft;
    
    // Remove hint highlights
    document.querySelectorAll('.state-node').forEach(n => n.classList.remove('hint-highlight'));
}

function updateScore(change) {
    score += change;
    els.score.textContent = score;
}

function showFeedback(text, isCorrect) {
    els.mapFeedback.textContent = text;
    els.mapFeedback.className = `map-feedback ${isCorrect ? 'correct' : 'wrong'}`;
    els.mapFeedback.classList.remove('hidden');
    
    // reset animation
    els.mapFeedback.style.animation = 'none';
    els.mapFeedback.offsetHeight; /* trigger reflow */
    els.mapFeedback.style.animation = null; 
}

function handleNodeClick(stateData) {
    const currentClue = GAME_DATA[currentClueIndex];
    const nodeEl = document.querySelector(`.state-node[data-id="${stateData.id}"]`);
    
    if (stateData.id === currentClue.id) {
        // Correct
        showFeedback("Correct!", true);
        nodeEl.classList.add('unlocked');
        updateScore(500); // Correct guess bonus
        
        // Show Modal
        els.modalStateName.textContent = currentClue.name;
        els.modalMonumentName.textContent = currentClue.monument;
        els.modalMonumentDesc.textContent = currentClue.desc;
        els.modalMonumentImg.src = currentClue.img;
        els.correctModal.classList.remove('hidden');
        
        // Stamp Passport
        const slot = document.getElementById(`stamp-slot-${currentClueIndex}`);
        const img = document.getElementById(`stamp-img-${currentClueIndex}`);
        // Using a generic stamp image or monument for the stamp
        img.src = currentClue.img.startsWith('http') ? currentClue.img : `../${currentClue.img}`; // Fix path if needed, but since it's inline we use the direct src
        img.src = currentClue.img;
        slot.classList.add('stamped');
        
    } else {
        // Incorrect
        showFeedback("Wrong State! Penalty -100", false);
        updateScore(-100);
        
        // Flash red
        nodeEl.style.borderColor = '#ff4757';
        nodeEl.style.backgroundColor = 'rgba(255, 71, 87, 0.5)';
        setTimeout(() => {
            if(!nodeEl.classList.contains('unlocked')) {
                nodeEl.style.borderColor = '';
                nodeEl.style.backgroundColor = '';
            }
        }, 500);
    }
}

els.btnHint.addEventListener('click', () => {
    if (hintsLeft > 0) {
        hintsLeft--;
        hintsUsed++;
        updateScore(-200);
        els.hintsLeft.textContent = hintsLeft;
        
        els.hintText.classList.remove('hidden');
        
        // Highlight correct node slightly
        const currentClue = GAME_DATA[currentClueIndex];
        const nodeEl = document.querySelector(`.state-node[data-id="${currentClue.id}"]`);
        if(nodeEl) nodeEl.classList.add('hint-highlight');
        
        if (hintsLeft === 0) els.btnHint.disabled = true;
    }
});

els.btnNextClue.addEventListener('click', () => {
    els.correctModal.classList.add('hidden');
    currentClueIndex++;
    
    if (currentClueIndex < GAME_DATA.length) {
        loadClue();
    } else {
        triggerGameOver();
    }
});

els.btnPlayAgain.addEventListener('click', () => {
    initGame();
});

function triggerGameOver() {
    clearInterval(timerInterval);
    
    els.fsScore.textContent = score;
    els.fsTime.textContent = formatTime(timeElapsed);
    els.fsHints.textContent = hintsUsed;
    
    // Save High Score
    const hs = JSON.parse(localStorage.getItem('th-highscore') || '{"score": 0, "time": 0}');
    if (score > hs.score) {
        localStorage.setItem('th-highscore', JSON.stringify({score, time: timeElapsed}));
    }
    
    els.gameOverModal.classList.remove('hidden');
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// Start
document.addEventListener('DOMContentLoaded', initGame);
