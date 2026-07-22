// Festival Games Core & Minigames

// State & Badges
let totalScore = parseInt(localStorage.getItem('festivalTotalScore') || '0');
let highScores = JSON.parse(localStorage.getItem('festivalHighScores') || '{"holi":0,"diwali":0,"onam":0,"lohri":0,"pongal":0}');
let unlockedBadges = JSON.parse(localStorage.getItem('festivalBadges') || '[]');

const BADGES = {
    holi: { id: 'badge-holi', icon: '🎨', name: 'Color Master', desc: 'Score 500+ in Holi', reqScore: 500 },
    diwali: { id: 'badge-diwali', icon: '🪔', name: 'Light Keeper', desc: 'Score 300+ in Diwali', reqScore: 300 },
    onam: { id: 'badge-onam', icon: '🌸', name: 'Pookkalam Artist', desc: 'Score 400+ in Onam', reqScore: 400 },
    lohri: { id: 'badge-lohri', icon: '🔥', name: 'Harvest Gatherer', desc: 'Score 300+ in Lohri', reqScore: 300 },
    pongal: { id: 'badge-pongal', icon: '🍲', name: 'Master Chef', desc: 'Score 400+ in Pongal', reqScore: 400 }
};

// Global Game State
let currentGame = null;
let currentScore = 0;
let gameTime = 0;
let gameTimer = null;
let loopTimer = null; // for requestAnimationFrame

// DOM Elements
const els = {
    hub: document.getElementById('hub-screen'),
    gameScreen: document.getElementById('game-screen'),
    totalScore: document.getElementById('total-score'),
    badgeContainer: document.getElementById('badge-container'),
    
    gameTitle: document.getElementById('current-game-title'),
    gameScore: document.getElementById('game-score'),
    gameTime: document.getElementById('game-time'),
    
    modal: document.getElementById('game-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalScore: document.getElementById('modal-score'),
    badgeAlert: document.getElementById('badge-alert'),
    badgeIcon: document.getElementById('badge-unlocked-icon'),
    badgeName: document.getElementById('badge-unlocked-name'),
    
    btnBack: document.getElementById('btn-back'),
    btnRetry: document.getElementById('btn-retry'),
    btnModalHub: document.getElementById('btn-modal-hub')
};

// Hub Init
function initHub() {
    els.totalScore.textContent = totalScore;
    
    // Update High Scores in UI
    ['holi', 'diwali', 'onam', 'lohri', 'pongal'].forEach(game => {
        const hsEl = document.getElementById(`hs-${game}`);
        if(hsEl) hsEl.textContent = highScores[game];
    });
    
    // Render Badges
    els.badgeContainer.innerHTML = '';
    for (let key in BADGES) {
        const badge = BADGES[key];
        const isUnlocked = unlockedBadges.includes(badge.id);
        
        const bEl = document.createElement('div');
        bEl.className = `badge-icon ${isUnlocked ? 'unlocked' : ''}`;
        bEl.textContent = badge.icon;
        bEl.title = `${badge.name}: ${badge.desc}`;
        els.badgeContainer.appendChild(bEl);
    }
}

// Global Game Flow
window.startMiniGame = function(gameId) {
    els.hub.classList.remove('active');
    els.gameScreen.classList.add('active');
    
    // Hide all game containers
    document.querySelectorAll('.mini-game-container').forEach(c => c.classList.add('hidden'));
    
    currentGame = gameId;
    currentScore = 0;
    els.gameScore.textContent = currentScore;
    
    document.getElementById(`container-${gameId}`).classList.remove('hidden');
    
    // Initialize specific game
    switch(gameId) {
        case 'holi': initHoli(); break;
        case 'diwali': initDiwali(); break;
        case 'onam': initOnam(); break;
        case 'lohri': initLohri(); break;
        case 'pongal': initPongal(); break;
    }
};

function endGame() {
    clearInterval(gameTimer);
    cancelAnimationFrame(loopTimer);
    
    els.modalScore.textContent = currentScore;
    
    // Check High Score
    if (currentScore > highScores[currentGame]) {
        highScores[currentGame] = currentScore;
        localStorage.setItem('festivalHighScores', JSON.stringify(highScores));
        els.modalTitle.textContent = "New High Score!";
    } else {
        els.modalTitle.textContent = "Time's Up!";
    }
    
    // Check Badges
    const badgeDef = BADGES[currentGame];
    if (badgeDef && currentScore >= badgeDef.reqScore && !unlockedBadges.includes(badgeDef.id)) {
        unlockedBadges.push(badgeDef.id);
        localStorage.setItem('festivalBadges', JSON.stringify(unlockedBadges));
        
        els.badgeAlert.classList.remove('hidden');
        els.badgeIcon.textContent = badgeDef.icon;
        els.badgeName.textContent = badgeDef.name;
    } else {
        els.badgeAlert.classList.add('hidden');
    }
    
    // Update Total
    totalScore += currentScore;
    localStorage.setItem('festivalTotalScore', totalScore);
    
    els.modal.classList.remove('hidden');
}

function returnToHub() {
    clearInterval(gameTimer);
    cancelAnimationFrame(loopTimer);
    els.modal.classList.add('hidden');
    els.gameScreen.classList.remove('active');
    els.hub.classList.add('active');
    initHub();
}

els.btnBack.addEventListener('click', returnToHub);
els.btnModalHub.addEventListener('click', returnToHub);
els.btnRetry.addEventListener('click', () => {
    els.modal.classList.add('hidden');
    window.startMiniGame(currentGame);
});

/* ==========================================
   MINI GAME: HOLI (Color Match)
========================================== */
let holiColors = ['#ff4757', '#2ed573', '#1e90ff', '#f1c40f', '#9b59b6', '#e17055', '#00cec9', '#fd79a8', '#ffeaa7'];
let holiTarget = '';

function initHoli() {
    els.gameTitle.textContent = "🎨 Holi: Color Match Rush";
    gameTime = 30;
    els.gameTime.textContent = gameTime;
    
    gameTimer = setInterval(() => {
        gameTime--;
        els.gameTime.textContent = gameTime;
        if(gameTime <= 0) endGame();
    }, 1000);
    
    nextHoliRound();
}

function nextHoliRound() {
    const grid = document.getElementById('holi-grid');
    const tgtEl = document.getElementById('holi-target-color');
    grid.innerHTML = '';
    
    // Pick 9 colors
    let roundColors = [...holiColors].sort(() => Math.random() - 0.5).slice(0, 9);
    holiTarget = roundColors[Math.floor(Math.random() * roundColors.length)];
    
    tgtEl.style.backgroundColor = holiTarget;
    tgtEl.style.color = getContrastYIQ(holiTarget);
    
    roundColors.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'holi-btn';
        btn.style.backgroundColor = c;
        btn.onclick = () => {
            if (c === holiTarget) {
                currentScore += 50;
                els.gameScore.textContent = currentScore;
                nextHoliRound();
            } else {
                currentScore = Math.max(0, currentScore - 20);
                els.gameScore.textContent = currentScore;
            }
        };
        grid.appendChild(btn);
    });
}

function getContrastYIQ(hexcolor){
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

/* ==========================================
   MINI GAME: DIWALI (Memory Run)
========================================== */
let diwaliSeq = [];
let diwaliPlayerSeq = [];
let diwaliLevel = 1;

function initDiwali() {
    els.gameTitle.textContent = "🪔 Diwali: Memory Run";
    gameTime = 60;
    els.gameTime.textContent = gameTime;
    diwaliLevel = 1;
    
    const row = document.getElementById('diwali-diyas');
    row.innerHTML = '';
    for(let i=0; i<4; i++) {
        const diya = document.createElement('div');
        diya.className = 'diya';
        diya.id = `diya-${i}`;
        diya.textContent = '🪔';
        diya.onclick = () => handleDiyaClick(i);
        row.appendChild(diya);
    }
    
    gameTimer = setInterval(() => {
        gameTime--;
        els.gameTime.textContent = gameTime;
        if(gameTime <= 0) endGame();
    }, 1000);
    
    startDiwaliSequence();
}

function startDiwaliSequence() {
    document.getElementById('diwali-status').textContent = "Watch carefully...";
    diwaliSeq = [];
    diwaliPlayerSeq = [];
    const seqLen = 2 + diwaliLevel;
    
    for(let i=0; i<seqLen; i++) {
        diwaliSeq.push(Math.floor(Math.random() * 4));
    }
    
    // Disable clicks
    document.querySelectorAll('.diya').forEach(d => d.style.pointerEvents = 'none');
    
    let step = 0;
    const interval = setInterval(() => {
        if (step >= diwaliSeq.length) {
            clearInterval(interval);
            document.getElementById('diwali-status').textContent = "Your turn!";
            document.querySelectorAll('.diya').forEach(d => d.style.pointerEvents = 'auto');
            return;
        }
        
        flashDiya(diwaliSeq[step]);
        step++;
    }, 800);
}

function flashDiya(index) {
    const diya = document.getElementById(`diya-${index}`);
    diya.classList.add('lit');
    setTimeout(() => diya.classList.remove('lit'), 400);
}

function handleDiyaClick(index) {
    flashDiya(index);
    diwaliPlayerSeq.push(index);
    
    const currStep = diwaliPlayerSeq.length - 1;
    if (diwaliPlayerSeq[currStep] !== diwaliSeq[currStep]) {
        // Wrong
        document.getElementById('diwali-status').textContent = "Wrong! Try again.";
        currentScore = Math.max(0, currentScore - 10);
        els.gameScore.textContent = currentScore;
        setTimeout(startDiwaliSequence, 1000);
        return;
    }
    
    if (diwaliPlayerSeq.length === diwaliSeq.length) {
        // Round complete
        document.getElementById('diwali-status').textContent = "Correct!";
        currentScore += (100 * diwaliLevel);
        els.gameScore.textContent = currentScore;
        diwaliLevel++;
        setTimeout(startDiwaliSequence, 1000);
    }
}

/* ==========================================
   MINI GAME: ONAM (Pookkalam)
========================================== */
function initOnam() {
    els.gameTitle.textContent = "🌸 Onam: Pookkalam Assembly";
    gameTime = 45;
    els.gameTime.textContent = gameTime;
    
    const board = document.getElementById('onam-board');
    const pieces = document.getElementById('onam-pieces');
    board.innerHTML = '';
    pieces.innerHTML = '';
    
    const flowers = ['🌺', '🌼', '🌻', '🌸'];
    const positions = [
        {top: '20%', left: '50%'}, {top: '80%', left: '50%'},
        {top: '50%', left: '20%'}, {top: '50%', left: '80%'}
    ];
    
    // Create drop zones
    flowers.forEach((f, i) => {
        const zone = document.createElement('div');
        zone.className = 'drop-zone';
        zone.dataset.flower = f;
        zone.style.top = positions[i].top;
        zone.style.left = positions[i].left;
        board.appendChild(zone);
        
        const piece = document.createElement('div');
        piece.className = 'flower-piece';
        piece.textContent = f;
        piece.draggable = true;
        piece.dataset.flower = f;
        
        piece.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', f);
            e.dataTransfer.setData('sourceId', piece.id = `piece-${i}`);
        });
        
        pieces.appendChild(piece);
    });
    
    // Setup drop zones
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.addEventListener('dragover', e => e.preventDefault());
        zone.addEventListener('drop', e => {
            e.preventDefault();
            const f = e.dataTransfer.getData('text/plain');
            if (f === zone.dataset.flower && !zone.classList.contains('filled')) {
                zone.textContent = f;
                zone.classList.add('filled');
                document.getElementById(e.dataTransfer.getData('sourceId')).style.visibility = 'hidden';
                
                currentScore += 100;
                els.gameScore.textContent = currentScore;
                
                if(document.querySelectorAll('.drop-zone.filled').length === flowers.length) {
                    setTimeout(() => initOnam(), 1000); // restart pattern
                }
            }
        });
    });
    
    gameTimer = setInterval(() => {
        gameTime--;
        els.gameTime.textContent = gameTime;
        if(gameTime <= 0) endGame();
    }, 1000);
}

/* ==========================================
   MINI GAME: LOHRI (Collector)
========================================== */
let lohriCtx;
let playerX = 250;
let fallingItems = [];

function initLohri() {
    els.gameTitle.textContent = "🔥 Lohri: Resource Collector";
    gameTime = 45;
    els.gameTime.textContent = gameTime;
    
    const canvas = document.getElementById('lohri-canvas');
    lohriCtx = canvas.getContext('2d');
    playerX = 250;
    fallingItems = [];
    
    document.addEventListener('keydown', handleLohriKey);
    
    gameTimer = setInterval(() => {
        gameTime--;
        els.gameTime.textContent = gameTime;
        if(gameTime <= 0) {
            document.removeEventListener('keydown', handleLohriKey);
            endGame();
        }
    }, 1000);
    
    loopTimer = requestAnimationFrame(lohriLoop);
}

function handleLohriKey(e) {
    if (currentGame !== 'lohri') return;
    if (e.key === 'ArrowLeft') playerX = Math.max(0, playerX - 30);
    if (e.key === 'ArrowRight') playerX = Math.min(500, playerX + 30);
}

function lohriLoop() {
    if (currentGame !== 'lohri' || gameTime <= 0) return;
    
    lohriCtx.clearRect(0, 0, 600, 400);
    
    // Draw player (basket)
    lohriCtx.fillStyle = '#e17055';
    lohriCtx.fillRect(playerX, 350, 100, 40);
    lohriCtx.fillStyle = '#fff';
    lohriCtx.font = '20px sans-serif';
    lohriCtx.fillText('🧺', playerX + 35, 375);
    
    // Spawn items
    if (Math.random() < 0.05) {
        const type = Math.random() > 0.3 ? 'sweet' : 'coal';
        fallingItems.push({
            x: Math.random() * 550,
            y: 0,
            type: type,
            speed: 2 + Math.random() * 3
        });
    }
    
    // Update and draw items
    for (let i = fallingItems.length - 1; i >= 0; i--) {
        let item = fallingItems[i];
        item.y += item.speed;
        
        lohriCtx.font = '30px sans-serif';
        lohriCtx.fillText(item.type === 'sweet' ? '🥜' : '🪨', item.x, item.y);
        
        // Collision
        if (item.y > 350 && item.y < 390 && item.x > playerX - 30 && item.x < playerX + 100) {
            if (item.type === 'sweet') {
                currentScore += 20;
            } else {
                currentScore = Math.max(0, currentScore - 10);
            }
            els.gameScore.textContent = currentScore;
            fallingItems.splice(i, 1);
        } else if (item.y > 400) {
            fallingItems.splice(i, 1);
        }
    }
    
    loopTimer = requestAnimationFrame(lohriLoop);
}

/* ==========================================
   MINI GAME: PONGAL (Timing)
========================================== */
let markerPos = 0;
let markerDir = 1;
let pongalTarget = { start: 40, end: 60 };

function initPongal() {
    els.gameTitle.textContent = "🍲 Pongal: Perfect Timing";
    gameTime = 30;
    els.gameTime.textContent = gameTime;
    
    markerPos = 0;
    
    const btn = document.getElementById('btn-pongal-action');
    btn.onclick = handlePongalClick;
    
    gameTimer = setInterval(() => {
        gameTime--;
        els.gameTime.textContent = gameTime;
        if(gameTime <= 0) endGame();
    }, 1000);
    
    loopTimer = requestAnimationFrame(pongalLoop);
}

function handlePongalClick() {
    // Check if marker is in target zone (40% to 60%)
    if (markerPos >= pongalTarget.start && markerPos <= pongalTarget.end) {
        // Perfect
        currentScore += 100;
        document.getElementById('pongal-pot').style.transform = 'scale(1.2)';
        setTimeout(() => document.getElementById('pongal-pot').style.transform = 'scale(1)', 200);
        // Randomize target for next click
        pongalTarget.start = Math.random() * 60 + 10; // 10 to 70
        pongalTarget.end = pongalTarget.start + 20; // 20% width
        const tz = document.getElementById('pongal-target-zone');
        tz.style.left = `${pongalTarget.start}%`;
        tz.style.width = `20%`;
    } else {
        // Miss
        currentScore = Math.max(0, currentScore - 20);
    }
    els.gameScore.textContent = currentScore;
}

function pongalLoop() {
    if (currentGame !== 'pongal' || gameTime <= 0) return;
    
    markerPos += 1.5 * markerDir; // Speed
    if (markerPos >= 100) {
        markerPos = 100;
        markerDir = -1;
    } else if (markerPos <= 0) {
        markerPos = 0;
        markerDir = 1;
    }
    
    document.getElementById('pongal-marker').style.left = `${markerPos}%`;
    loopTimer = requestAnimationFrame(pongalLoop);
}

// Init Hub on load
document.addEventListener('DOMContentLoaded', initHub);
