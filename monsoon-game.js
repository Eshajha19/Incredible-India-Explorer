import { monsoonEngine } from './js-modules/monsoon-engine.js';

document.addEventListener('DOMContentLoaded', () => {
    initUI();

    monsoonEngine.subscribe((state, currentSeason) => {
        updateScoreboard(state, currentSeason);
        renderStates(state);
        checkModal(state);
    });

    document.getElementById('btn-start').addEventListener('click', () => {
        document.getElementById('btn-start').style.display = 'none';
        monsoonEngine.resetGame();
        monsoonEngine.startEngine();
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
        document.getElementById('game-over-modal').classList.add('hidden');
        document.getElementById('btn-start').style.display = 'block';
        monsoonEngine.resetGame();
        renderStates(monsoonEngine.state); // Reset UI quickly
    });

    setupDragAndDrop();
});

function initUI() {
    renderStates(monsoonEngine.state);
}

function updateScoreboard(state, currentSeason) {
    document.getElementById('ui-score').textContent = Math.floor(state.score);
    document.getElementById('ui-multiplier').textContent = `x${state.multiplier}`;
    document.getElementById('ui-season').textContent = currentSeason.name;
    document.getElementById('ui-timer').textContent = `${state.timer}s`;
}

function renderStates(state) {
    const grid = document.getElementById('states-grid');
    grid.innerHTML = ''; // Re-render approach (React style but vanilla)

    state.statesData.forEach(st => {
        const card = document.createElement('div');
        card.className = `state-card status-${st.status}`;
        card.setAttribute('data-state-id', st.id);

        let icon = "🟢";
        if (st.status === "Drought") icon = "🔴";
        if (st.status === "Flood") icon = "🔵";

        card.innerHTML = `
            <h3>${icon} ${st.name}</h3>
            <div class="water-bar-container">
                <div class="water-bar" style="width: ${Math.min(st.waterLevel, 100)}%"></div>
            </div>
            <p>Water Level: ${Math.floor(st.waterLevel)}</p>
            <p class="status-label ${st.status}">${st.status}</p>
        `;

        // Setup drop zones for this card
        card.addEventListener('dragover', (e) => {
            e.preventDefault();
            card.classList.add('drag-over');
        });
        
        card.addEventListener('dragleave', (e) => {
            card.classList.remove('drag-over');
        });

        card.addEventListener('drop', (e) => {
            e.preventDefault();
            card.classList.remove('drag-over');
            monsoonEngine.rain(st.id);
            
            // Visual feedback on cloud
            const cloudId = e.dataTransfer.getData('text/plain');
            const cloud = document.getElementById(cloudId);
            if (cloud) {
                // simple animation
                cloud.style.transform = 'scale(0.8)';
                setTimeout(() => cloud.style.transform = 'scale(1)', 150);
            }
        });

        grid.appendChild(card);
    });
}

function checkModal(state) {
    if (state.gameOver) {
        document.getElementById('game-over-modal').classList.remove('hidden');
        document.getElementById('modal-title').textContent = state.gameWon ? "🎉 YOU WON! 🎉" : "❌ GAME OVER ❌";
        document.getElementById('modal-title').style.color = state.gameWon ? "var(--green)" : "#ef4444";
        document.getElementById('modal-reason').textContent = state.reason;
        document.getElementById('modal-score').textContent = Math.floor(state.score);
    }
}

function setupDragAndDrop() {
    const clouds = document.querySelectorAll('.rain-cloud');
    clouds.forEach(cloud => {
        cloud.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            e.dataTransfer.effectAllowed = 'copy';
        });
    });
}
