import { culinaryEngine } from '../../js-modules/culinary-engine.js';
import { INGREDIENTS } from '../../js-modules/culinary-data.js';

document.addEventListener('DOMContentLoaded', () => {
    initPantry();
    
    culinaryEngine.subscribe((state) => {
        updateHUD(state);
        updateTicket(state);
        checkModal(state);
    });

    document.getElementById('btn-next-order').addEventListener('click', () => {
        document.getElementById('result-modal').classList.add('hidden');
        culinaryEngine.nextOrder();
    });

    // Force initial render
    updateHUD(culinaryEngine.state);
    updateTicket(culinaryEngine.state);
});

function initPantry() {
    const pantryGrid = document.getElementById('ui-pantry');
    pantryGrid.innerHTML = '';

    // Create buttons for all ingredients
    for (const [name, icon] of Object.entries(INGREDIENTS)) {
        const btn = document.createElement('button');
        btn.className = 'ing-btn';
        btn.innerHTML = `
            <span class="ing-icon">${icon}</span>
            <span class="ing-name">${name}</span>
        `;
        
        btn.addEventListener('click', () => {
            culinaryEngine.selectIngredient(name);
        });

        pantryGrid.appendChild(btn);
    }
}

function updateHUD(state) {
    document.getElementById('ui-score').textContent = state.score;
    document.getElementById('ui-coins').textContent = state.coins;
    document.getElementById('ui-xp').textContent = state.xp;
    document.getElementById('ui-multiplier').textContent = `x${state.multiplier}`;
    
    const msgEl = document.getElementById('ui-message');
    msgEl.textContent = state.resultMessage;
    
    // Clear transient messages after a moment if they aren't for the modal
    if (state.resultMessage && !state.gameOver) {
        setTimeout(() => {
            if (msgEl.textContent === state.resultMessage) {
                msgEl.textContent = '';
                state.resultMessage = '';
            }
        }, 3000);
    }
}

function updateTicket(state) {
    const order = state.currentOrder;
    if (!order) return;

    document.getElementById('ui-recipe-name').textContent = order.name;
    document.getElementById('ui-time-text').textContent = state.timeLeft;

    // Timer Bar
    const pct = (state.timeLeft / state.maxTime) * 100;
    const bar = document.getElementById('ui-timer-bar');
    bar.style.width = `${pct}%`;
    if (pct < 30) bar.style.backgroundColor = '#ef4444'; // Red if low time
    else bar.style.backgroundColor = '#10b981';

    // Render Checklist
    const reqsContainer = document.getElementById('ui-recipe-reqs');
    reqsContainer.innerHTML = '';

    order.ingredients.forEach((ing, i) => {
        const isDone = i < state.selectedIngredients.length;
        
        const div = document.createElement('div');
        div.className = `req-item ${isDone ? 'done' : ''}`;
        div.innerHTML = `<span class="req-box"></span> ${ing}`;
        reqsContainer.appendChild(div);
    });
}

function checkModal(state) {
    if (state.gameOver) {
        document.getElementById('result-modal').classList.remove('hidden');
        document.getElementById('modal-result-msg').textContent = state.resultMessage;
    }
}
