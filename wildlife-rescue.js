import { wildlifeEngine } from './js-modules/wildlife-engine.js';

document.addEventListener('DOMContentLoaded', () => {
    initUI();

    wildlifeEngine.subscribe((state, parks) => {
        updateHUD(state);
        updateParkSelector(state, parks);
        renderMap(state);
        checkModal(state);
    });

    document.getElementById('btn-continue').addEventListener('click', () => {
        document.getElementById('rescue-modal').classList.add('hidden');
        if (wildlifeEngine.state.gameWon) {
            // Load next available if won, or reset current
            wildlifeEngine.loadPark(wildlifeEngine.currentParkIndex); 
        } else {
            // Lost, reset current
            wildlifeEngine.resetState();
        }
    });

    window.addEventListener('keydown', handleInput);
});

function initUI() {
    // Initial render
    updateHUD(wildlifeEngine.state);
    updateParkSelector(wildlifeEngine.state, wildlifeEngine.parks);
    renderMap(wildlifeEngine.state);
}

function handleInput(e) {
    // Prevent default scrolling for arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
    
    switch (e.key) {
        case 'w': case 'ArrowUp': wildlifeEngine.movePlayer(0, -1); break;
        case 's': case 'ArrowDown': wildlifeEngine.movePlayer(0, 1); break;
        case 'a': case 'ArrowLeft': wildlifeEngine.movePlayer(-1, 0); break;
        case 'd': case 'ArrowRight': wildlifeEngine.movePlayer(1, 0); break;
    }
}

function updateHUD(state) {
    document.getElementById('ui-health').textContent = state.player.health;
    document.getElementById('ui-xp').textContent = state.xp;
    document.getElementById('ui-coins').textContent = state.coins;

    const invHtml = Object.keys(state.inventory).map(key => 
        `<div class="inv-item">${state.inventory[key]}x ${key}</div>`
    ).join('');
    document.getElementById('ui-inventory').innerHTML = invHtml;

    document.getElementById('message-log').textContent = state.message;
}

function updateParkSelector(state, parks) {
    const selector = document.getElementById('park-selector');
    selector.innerHTML = '<h3>National Parks</h3>';
    
    parks.forEach((p, index) => {
        const btn = document.createElement('button');
        btn.className = `park-btn ${state.park.id === p.id ? 'active' : ''}`;
        btn.disabled = !p.unlocked;
        btn.textContent = `${p.unlocked ? '🔓' : '🔒'} ${p.name}`;
        
        btn.addEventListener('click', () => {
            wildlifeEngine.loadPark(index);
        });

        selector.appendChild(btn);
    });
}

function renderMap(state) {
    const grid = document.getElementById('grid-map');
    const size = state.gridSize;
    grid.style.gridTemplateColumns = `repeat(${size}, 40px)`;
    grid.innerHTML = '';

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            // Render entities based on priorities
            let content = '';

            // 1. Traps
            const trap = state.traps.find(t => t.active && t.x === x && t.y === y);
            if (trap) content = '🕸️';

            // 2. Supplies
            const supply = state.supplies.find(s => s.active && s.x === x && s.y === y);
            if (supply) {
                if (supply.type === 'Medical Kit') content = '🧰';
                else if (supply.type === 'Tracking Tag') content = '🏷️';
                else content = '🔦';
            }

            // 3. Poachers
            const poacher = state.poachers.find(p => p.x === x && p.y === y);
            if (poacher) content = '🤠';

            // 4. Animal
            if (state.animal.x === x && state.animal.y === y && !state.animal.rescued) {
                content = state.animal.icon;
            }

            // 5. Player (Top priority)
            if (state.player.x === x && state.player.y === y) {
                cell.classList.add('player');
                content = '🏃';
            }

            cell.innerHTML = content;
            grid.appendChild(cell);
        }
    }
}

function checkModal(state) {
    if (state.gameOver) {
        document.getElementById('rescue-modal').classList.remove('hidden');
        document.getElementById('modal-title').textContent = state.gameWon ? "Mission Accomplished!" : "Mission Failed";
        document.getElementById('modal-title').style.color = state.gameWon ? "var(--green)" : "#ef4444";
        document.getElementById('modal-desc').textContent = state.message;
        
        document.getElementById('btn-continue').textContent = state.gameWon ? "Next Mission" : "Try Again";
    }
}
