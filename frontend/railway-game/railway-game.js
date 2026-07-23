// Railway Game Data & State
const STATIONS = [
    { id: 1, name: "Delhi", x: 250, y: 120 },
    { id: 2, name: "Mumbai", x: 120, y: 350 },
    { id: 3, name: "Kolkata", x: 600, y: 250 },
    { id: 4, name: "Chennai", x: 450, y: 480 }
];

let tracks = []; // { id, start: stationId, end: stationId, signal: 'GREEN'/'RED' }
let trains = []; // { id, type, speed, route: [stationId, ...], progress: 0-1, trackId, latePenalty: false }
let scheduleQueue = []; // { id, type, route: [stationId, ...], deadline: number }

let score = 0;
let level = parseInt(localStorage.getItem('highestLevel') || '1');
let gameTime = 0;
let isPlaying = false;
let lastFrameTime = 0;
let spawnTimer = 0;
let trainCounter = 0;

// Config
const CONFIG = {
    trainSpeedBase: 0.05, // progress per second
    safeDistance: 0.05, // progress diff
    spawnIntervalBase: 10, // seconds
    expressBonus: 50,
    successScore: 100,
    latePenalty: 20
};

// DOM Elements
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score-display');
const timeDisplay = document.getElementById('time-display');
const levelDisplay = document.getElementById('level-display');
const scheduleList = document.getElementById('schedule-list');
const btnStart = document.getElementById('btn-start');
const btnOverlayStart = document.getElementById('btn-overlay-start');
const gameOverlay = document.getElementById('game-overlay');
const alertBanner = document.getElementById('alert-banner');
const modal = document.getElementById('game-modal');
const btnRetry = document.getElementById('btn-retry');

let selectedStation = null;

// Initialize
function init() {
    setupEventListeners();
    renderInitial();
    levelDisplay.textContent = level;
}

function setupEventListeners() {
    btnStart.addEventListener('click', startGame);
    btnOverlayStart.addEventListener('click', startGame);
    btnRetry.addEventListener('click', () => {
        modal.classList.add('hidden');
        startGame();
    });
    
    canvas.addEventListener('click', handleCanvasClick);
}

function startGame() {
    if (isPlaying) return;
    
    // Reset state
    tracks = [];
    trains = [];
    scheduleQueue = [];
    score = 0;
    gameTime = 0;
    spawnTimer = CONFIG.spawnIntervalBase;
    trainCounter = 0;
    isPlaying = true;
    selectedStation = null;
    
    gameOverlay.classList.add('hidden');
    btnStart.textContent = "Playing...";
    btnStart.disabled = true;
    
    updateHUD();
    renderSchedule();
    
    lastFrameTime = performance.now();
    requestAnimationFrame(gameLoop);
}

function handleCanvasClick(e) {
    if (!isPlaying) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    // Check if clicked on a station
    const clickedStation = STATIONS.find(s => Math.hypot(s.x - x, s.y - y) < 30);
    
    if (clickedStation) {
        if (selectedStation) {
            if (selectedStation.id !== clickedStation.id) {
                // Check if track already exists
                const exists = tracks.some(t => 
                    (t.start === selectedStation.id && t.end === clickedStation.id) ||
                    (t.start === clickedStation.id && t.end === selectedStation.id)
                );
                
                if (!exists) {
                    tracks.push({
                        id: `track-${Date.now()}`,
                        start: selectedStation.id,
                        end: clickedStation.id,
                        signal: 'GREEN'
                    });
                }
            }
            selectedStation = null; // deselect
        } else {
            selectedStation = clickedStation;
        }
        return;
    }
    
    // Deselect if clicked outside station
    selectedStation = null;
    
    // Check if clicked on a track (for signal toggle)
    // Simplified: check distance to line segment
    for (const track of tracks) {
        const s1 = STATIONS.find(s => s.id === track.start);
        const s2 = STATIONS.find(s => s.id === track.end);
        
        const dist = distToSegment({x, y}, s1, s2);
        if (dist < 15) {
            track.signal = track.signal === 'GREEN' ? 'RED' : 'GREEN';
            break; // only toggle one
        }
    }
}

// Distance from point p to segment vw
function distToSegment(p, v, w) {
    const l2 = (w.x - v.x)**2 + (w.y - v.y)**2;
    if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
}

function spawnTrainToSchedule() {
    trainCounter++;
    // Random route
    const startIdx = Math.floor(Math.random() * STATIONS.length);
    let endIdx = Math.floor(Math.random() * STATIONS.length);
    while(endIdx === startIdx) endIdx = Math.floor(Math.random() * STATIONS.length);
    
    const type = Math.random() > 0.7 ? 'Express' : 'Local';
    const deadline = gameTime + (type === 'Express' ? 15 : 25);
    
    scheduleQueue.push({
        id: trainCounter,
        type,
        route: [STATIONS[startIdx].id, STATIONS[endIdx].id],
        deadline
    });
    
    renderSchedule();
}

function dispatchTrain(scheduleId) {
    const index = scheduleQueue.findIndex(t => t.id === scheduleId);
    if (index === -1) return;
    
    const sched = scheduleQueue[index];
    
    // Find if track exists for this route directly (simplified pathfinding for now)
    const track = tracks.find(t => 
        (t.start === sched.route[0] && t.end === sched.route[1]) ||
        (t.start === sched.route[1] && t.end === sched.route[0])
    );
    
    if (!track) {
        alert("No direct track built between these stations yet!");
        return;
    }
    
    // Penalize if late
    let isLate = gameTime > sched.deadline;
    if (isLate) {
        score -= CONFIG.latePenalty;
    }
    
    // Add to active trains
    trains.push({
        id: sched.id,
        type: sched.type,
        speed: sched.type === 'Express' ? 1.5 : 1,
        route: sched.route, // [start, end]
        progress: 0,
        trackId: track.id,
        latePenalty: isLate,
        direction: track.start === sched.route[0] ? 1 : -1 // 1 if moving start->end, -1 if end->start
    });
    
    // Remove from schedule
    scheduleQueue.splice(index, 1);
    renderSchedule();
    updateHUD();
}

function checkCollisions() {
    let warning = false;
    let crash = false;
    
    for (let i = 0; i < trains.length; i++) {
        for (let j = i + 1; j < trains.length; j++) {
            const t1 = trains[i];
            const t2 = trains[j];
            
            if (t1.trackId === t2.trackId) {
                // Calculate absolute positions on the track segment
                const pos1 = t1.direction === 1 ? t1.progress : 1 - t1.progress;
                const pos2 = t2.direction === 1 ? t2.progress : 1 - t2.progress;
                
                const diff = Math.abs(pos1 - pos2);
                
                if (diff < 0.02) { // Crash
                    crash = true;
                } else if (diff < CONFIG.safeDistance) {
                    warning = true;
                }
            }
        }
    }
    
    if (warning) {
        alertBanner.classList.remove('hidden');
    } else {
        alertBanner.classList.add('hidden');
    }
    
    if (crash) {
        gameOver();
    }
}

function updateHUD() {
    scoreDisplay.textContent = score;
    const m = Math.floor(gameTime / 60).toString().padStart(2, '0');
    const s = Math.floor(gameTime % 60).toString().padStart(2, '0');
    timeDisplay.textContent = `${m}:${s}`;
}

function renderSchedule() {
    scheduleList.innerHTML = '';
    if (scheduleQueue.length === 0) {
        scheduleList.innerHTML = '<div class="empty-state">No trains waiting.</div>';
        return;
    }
    
    scheduleQueue.forEach(t => {
        const item = document.createElement('div');
        const isLate = gameTime > t.deadline;
        item.className = `schedule-item ${t.type.toLowerCase()} ${isLate ? 'late' : ''}`;
        
        const startName = STATIONS.find(s => s.id === t.route[0]).name;
        const endName = STATIONS.find(s => s.id === t.route[1]).name;
        
        item.innerHTML = `
            <div><strong>${t.type}</strong><br><small>T-${t.id}</small></div>
            <div>${startName} &rarr; ${endName}<br><small>${isLate ? 'LATE!' : Math.ceil(t.deadline - gameTime) + 's left'}</small></div>
            <button class="btn btn-primary" onclick="window.dispatchGameTrain(${t.id})">Dispatch</button>
        `;
        scheduleList.appendChild(item);
    });
}
window.dispatchGameTrain = dispatchTrain; // expose for inline onclick

function gameLoop(timestamp) {
    if (!isPlaying) return;
    
    const dt = (timestamp - lastFrameTime) / 1000; // seconds
    lastFrameTime = timestamp;
    gameTime += dt;
    
    // Spawn trains
    spawnTimer -= dt;
    if (spawnTimer <= 0) {
        spawnTrainToSchedule();
        // Difficulty scaling: decrease spawn interval over time
        const currentInterval = Math.max(3, CONFIG.spawnIntervalBase - (gameTime / 60));
        spawnTimer = currentInterval;
    }
    
    // Move trains
    for (let i = trains.length - 1; i >= 0; i--) {
        const train = trains[i];
        const track = tracks.find(t => t.id === train.trackId);
        
        if (track.signal === 'GREEN') {
            // Speed scaling based on level/time
            const speedMultiplier = 1 + (gameTime / 300); // 10% every 30s approx
            train.progress += (CONFIG.trainSpeedBase * train.speed * speedMultiplier) * dt;
            
            if (train.progress >= 1) {
                // Reached destination
                score += CONFIG.successScore;
                if (train.type === 'Express') score += CONFIG.expressBonus;
                trains.splice(i, 1);
            }
        }
    }
    
    checkCollisions();
    
    if (isPlaying) {
        updateHUD();
        // Update schedule UI every second approx
        if (Math.floor(gameTime) > Math.floor(gameTime - dt)) {
            renderSchedule();
        }
        
        renderCanvas();
        requestAnimationFrame(gameLoop);
    }
}

function renderInitial() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderMap();
}

function renderCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderMap();
}

function renderMap() {
    // Draw Tracks
    ctx.lineWidth = 4;
    tracks.forEach(track => {
        const s1 = STATIONS.find(s => s.id === track.start);
        const s2 = STATIONS.find(s => s.id === track.end);
        
        // Track line
        ctx.strokeStyle = '#555';
        ctx.beginPath();
        ctx.moveTo(s1.x, s1.y);
        ctx.lineTo(s2.x, s2.y);
        ctx.stroke();
        
        // Signal Indicator (middle of track for simplicity, or near stations)
        const midX = (s1.x + s2.x) / 2;
        const midY = (s1.y + s2.y) / 2;
        
        ctx.fillStyle = track.signal === 'GREEN' ? '#2ed573' : '#ff4757';
        ctx.beginPath();
        ctx.arc(midX, midY, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
    
    // Draw Stations
    STATIONS.forEach(station => {
        // Selection highlight
        if (selectedStation && selectedStation.id === station.id) {
            ctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
            ctx.beginPath();
            ctx.arc(station.x, station.y, 35, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.fillStyle = '#34495e';
        ctx.strokeStyle = '#f1c40f';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(station.x, station.y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#fff';
        ctx.font = '16px Outfit';
        ctx.textAlign = 'center';
        ctx.fillText(station.name, station.x, station.y - 30);
    });
    
    // Draw Trains
    trains.forEach(train => {
        const track = tracks.find(t => t.id === train.trackId);
        const s1 = STATIONS.find(s => s.id === track.start);
        const s2 = STATIONS.find(s => s.id === track.end);
        
        const actualProgress = train.direction === 1 ? train.progress : 1 - train.progress;
        
        const x = s1.x + (s2.x - s1.x) * actualProgress;
        const y = s1.y + (s2.y - s1.y) * actualProgress;
        
        ctx.fillStyle = train.type === 'Express' ? '#ff4757' : '#1e90ff';
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Train label
        ctx.fillStyle = '#fff';
        ctx.font = '10px monospace';
        ctx.fillText(`T${train.id}`, x, y + 20);
    });
}

function gameOver() {
    isPlaying = false;
    alertBanner.classList.add('hidden');
    
    document.getElementById('modal-score').textContent = score;
    
    // Calculate new level (rudimentary)
    const newLevel = Math.max(level, Math.floor(score / 500) + 1);
    if (newLevel > level) {
        level = newLevel;
        localStorage.setItem('highestLevel', level);
    }
    document.getElementById('modal-level').textContent = level;
    
    modal.classList.remove('hidden');
    btnStart.textContent = "Start Engine";
    btnStart.disabled = false;
}

document.addEventListener('DOMContentLoaded', init);
