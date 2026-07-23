// Himalayan Expedition Game Logic

// Data
const PEAKS = [
    { id: 'kangchenjunga', name: 'Kangchenjunga', alt: 8586, diff: 'Hard', tempBase: -20, unlockReq: 0 },
    { id: 'nanda-devi', name: 'Nanda Devi', alt: 7816, diff: 'Medium', tempBase: -15, unlockReq: 8586 },
    { id: 'kamet', name: 'Kamet', alt: 7756, diff: 'Medium', tempBase: -10, unlockReq: 7816 },
    { id: 'trisul', name: 'Trisul', alt: 7120, diff: 'Easy', tempBase: -5, unlockReq: 0 }
];

const WEATHER_EVENTS = [
    { id: 'clear', name: '☀️ Clear Skies', desc: 'Perfect conditions for climbing.', tempMod: 0, staminaCost: 1 },
    { id: 'snow', name: '🌨️ Light Snow', desc: 'Slightly colder, slower progress.', tempMod: -5, staminaCost: 1.2 },
    { id: 'blizzard', name: '🌪️ Blizzard', desc: 'Freezing winds! High stamina drain.', tempMod: -15, staminaCost: 2 },
    { id: 'avalanche', name: '⚠️ Avalanche Warning', desc: 'Climbing is extremely dangerous!', tempMod: -10, staminaCost: 3 }
];

// State
let resources = { oxygen: 100, stamina: 100, food: 100, temp: 100 };
let currentAltitude = 0;
let maxAltitude = parseInt(localStorage.getItem('highestAltitude') || '0');
let selectedPeak = null;
let isPlaying = false;
let currentWeather = WEATHER_EVENTS[0];
let weatherTurns = 0;

// DOM Elements
const els = {
    ox: document.getElementById('val-oxygen'),
    st: document.getElementById('val-stamina'),
    fd: document.getElementById('val-food'),
    tm: document.getElementById('val-temp'),
    barOx: document.getElementById('bar-oxygen'),
    barSt: document.getElementById('bar-stamina'),
    barFd: document.getElementById('bar-food'),
    barTm: document.getElementById('bar-temp'),
    
    wTitle: document.getElementById('weather-status'),
    wDesc: document.getElementById('weather-desc'),
    wLayer: document.getElementById('weather-layer'),
    
    btnClimb: document.getElementById('btn-climb'),
    btnRest: document.getElementById('btn-rest'),
    btnEat: document.getElementById('btn-eat'),
    
    lblAlt: document.getElementById('lbl-altitude'),
    lblTgt: document.getElementById('lbl-target-alt'),
    marker: document.getElementById('climber-marker'),
    
    log: document.getElementById('game-log'),
    selector: document.getElementById('peak-selector'),
    btnStart: document.getElementById('btn-start'),
    btnAbandon: document.getElementById('btn-abandon'),
    
    statName: document.getElementById('stat-name'),
    statAlt: document.getElementById('stat-alt'),
    statDiff: document.getElementById('stat-diff'),
    
    modal: document.getElementById('game-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalMsg: document.getElementById('modal-message'),
    modalIcon: document.getElementById('modal-icon'),
    finalStats: document.getElementById('final-stats'),
    btnRetry: document.getElementById('btn-retry'),
};

// Init
function init() {
    renderPeaks();
    setupListeners();
}

function renderPeaks() {
    els.selector.innerHTML = '';
    // Sort by altitude asc for display
    const sortedPeaks = [...PEAKS].sort((a,b) => a.alt - b.alt);
    
    sortedPeaks.forEach(peak => {
        const isLocked = peak.unlockReq > maxAltitude;
        
        const btn = document.createElement('button');
        btn.className = `peak-btn ${isLocked ? 'locked' : ''}`;
        btn.innerHTML = `
            <strong>${peak.name}</strong>
            <span>${peak.alt}m - ${peak.diff}</span>
            ${isLocked ? `<br><small>🔒 Reach ${peak.unlockReq}m to unlock</small>` : ''}
        `;
        
        if (!isLocked) {
            btn.onclick = () => selectPeak(peak, btn);
        }
        
        els.selector.appendChild(btn);
    });
}

function selectPeak(peak, btnElement) {
    if (isPlaying) return;
    
    document.querySelectorAll('.peak-btn').forEach(b => b.classList.remove('selected'));
    btnElement.classList.add('selected');
    
    selectedPeak = peak;
    els.statName.textContent = peak.name;
    els.statAlt.textContent = `${peak.alt}m`;
    els.statDiff.textContent = peak.diff;
    els.lblTgt.textContent = peak.alt;
    
    els.btnStart.disabled = false;
}

function setupListeners() {
    els.btnStart.addEventListener('click', startGame);
    els.btnAbandon.addEventListener('click', () => endGame(false, "Expedition Abandoned."));
    els.btnRetry.addEventListener('click', () => {
        els.modal.classList.add('hidden');
        if (selectedPeak) startGame();
    });
    
    els.btnClimb.addEventListener('click', () => takeAction('climb'));
    els.btnRest.addEventListener('click', () => takeAction('rest'));
    els.btnEat.addEventListener('click', () => takeAction('eat'));
}

function startGame() {
    if (!selectedPeak) return;
    
    isPlaying = true;
    resources = { oxygen: 100, stamina: 100, food: 100, temp: 100 };
    currentAltitude = 0;
    currentWeather = WEATHER_EVENTS[0];
    weatherTurns = 0;
    
    els.btnStart.classList.add('hidden');
    els.btnAbandon.classList.remove('hidden');
    
    enableActions(true);
    updateUI();
    
    els.log.innerHTML = '';
    addLog(`Expedition to ${selectedPeak.name} started!`, 'sys');
}

function enableActions(enable) {
    els.btnClimb.disabled = !enable;
    els.btnRest.disabled = !enable;
    els.btnEat.disabled = !enable;
    
    // Disable peak selection
    document.querySelectorAll('.peak-btn').forEach(b => {
        b.style.pointerEvents = enable ? 'none' : 'auto';
    });
}

function takeAction(action) {
    if (!isPlaying) return;
    
    // Base costs
    const baseOx = 2;
    const baseFd = 3;
    const baseTemp = 2;
    
    let msg = "";
    let msgType = "";
    
    if (action === 'climb') {
        const stamCost = 15 * currentWeather.staminaCost;
        if (resources.stamina < stamCost) {
            addLog("Not enough stamina to climb! Rest first.", "warn");
            return;
        }
        
        resources.stamina -= stamCost;
        resources.oxygen -= baseOx * 3;
        resources.food -= baseFd * 2;
        resources.temp += 5; // warm up while moving
        
        const progress = Math.floor(Math.random() * 200) + 200; // 200-400m
        currentAltitude += progress;
        msg = `Climbed ${progress}m. (Stamina -${stamCost})`;
        
    } else if (action === 'rest') {
        resources.stamina = Math.min(100, resources.stamina + 40);
        resources.oxygen -= baseOx;
        resources.food -= baseFd;
        resources.temp -= 10; // cool down while resting
        
        msg = `Rested at camp. Stamina restored, but you feel colder.`;
        
    } else if (action === 'eat') {
        if (resources.food < 10) {
            addLog("Not enough food left!", "warn");
            return;
        }
        resources.food -= 10; // consume specific amount to boost temp/stamina
        resources.stamina = Math.min(100, resources.stamina + 10);
        resources.temp = Math.min(100, resources.temp + 20);
        resources.oxygen -= baseOx;
        
        msg = `Ate warm rations. Body temperature increased.`;
    }
    
    // Global environment effects
    resources.temp += (selectedPeak.tempBase / 10) + (currentWeather.tempMod / 2);
    
    // Bounds check
    for (let key in resources) {
        resources[key] = Math.max(0, Math.min(100, resources[key]));
    }
    
    addLog(msg, msgType);
    updateWeather();
    updateUI();
    checkEndConditions();
}

function updateWeather() {
    weatherTurns++;
    // Change weather randomly after a few turns
    if (weatherTurns > 2 && Math.random() > 0.6) {
        weatherTurns = 0;
        const newWeather = WEATHER_EVENTS[Math.floor(Math.random() * WEATHER_EVENTS.length)];
        
        if (newWeather.id !== currentWeather.id) {
            currentWeather = newWeather;
            addLog(`Weather changed: ${currentWeather.name}`, 'sys');
        }
    }
}

function updateUI() {
    // Update bars
    for (let key in resources) {
        const val = Math.round(resources[key]);
        els[key.substring(0,2)].textContent = `${val}%`;
        
        const bar = els[`bar${key.charAt(0).toUpperCase() + key.slice(1,2)}`]; // e.g. barOx
        bar.style.width = `${val}%`;
        
        if (val < 20) {
            bar.classList.add('critical');
        } else {
            bar.classList.remove('critical');
        }
    }
    
    // Altitude
    els.lblAlt.textContent = currentAltitude;
    const progressPct = Math.min(100, (currentAltitude / selectedPeak.alt) * 100);
    
    // Visual marker moves from bottom (10%) to top (90%)
    const visualBottom = 10 + (progressPct * 0.8);
    els.marker.style.bottom = `${visualBottom}%`;
    
    // Weather
    els.wTitle.className = `weather-status ${currentWeather.id}`;
    els.wTitle.textContent = currentWeather.name;
    els.wDesc.textContent = currentWeather.desc;
    
    if (currentWeather.id === 'blizzard' || currentWeather.id === 'snow') {
        els.wLayer.className = 'weather-layer blizzard';
    } else {
        els.wLayer.className = 'weather-layer';
    }
}

function addLog(msg, type = '') {
    const div = document.createElement('div');
    div.className = `log-entry ${type}`;
    div.textContent = msg;
    els.log.prepend(div);
}

function checkEndConditions() {
    if (currentAltitude >= selectedPeak.alt) {
        endGame(true, "Summit reached!");
        return;
    }
    
    if (resources.oxygen <= 0) endGame(false, "You ran out of oxygen.");
    else if (resources.stamina <= 0) endGame(false, "You collapsed from exhaustion.");
    else if (resources.food <= 0) endGame(false, "You starved on the mountain.");
    else if (resources.temp <= 0) endGame(false, "You froze to death.");
}

function endGame(win, msg) {
    isPlaying = false;
    enableActions(false);
    
    els.btnStart.classList.remove('hidden');
    els.btnStart.textContent = "Restart";
    els.btnStart.disabled = false;
    els.btnAbandon.classList.add('hidden');
    
    els.modalTitle.textContent = win ? "Summit Success!" : "Expedition Failed";
    els.modalIcon.textContent = win ? "🏆" : "💀";
    els.modalMsg.textContent = msg;
    
    els.modal.classList.remove('hidden');
    
    if (win) {
        els.finalStats.classList.remove('hidden');
        document.getElementById('summit-name').textContent = selectedPeak.name;
        document.getElementById('summit-alt').textContent = currentAltitude;
        
        if (currentAltitude > maxAltitude) {
            maxAltitude = currentAltitude;
            localStorage.setItem('highestAltitude', maxAltitude);
            document.getElementById('unlock-message').textContent = "New max altitude reached! New peaks may be unlocked.";
            renderPeaks(); // re-render to unlock
        } else {
            document.getElementById('unlock-message').textContent = "";
        }
    } else {
        els.finalStats.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', init);
