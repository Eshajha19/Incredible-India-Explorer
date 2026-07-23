import { stateMissions } from './js-modules/stateMissions.js';
import { playerStore } from './js-modules/playerStore.js';

document.addEventListener('DOMContentLoaded', () => {
    initUI();
    
    // Subscribe to store updates
    playerStore.subscribe((state) => {
        updateStatsUI(state);
        renderPassportBook(state);
        renderMissions(state);
    });
});

function initUI() {
    const initialState = playerStore.state;
    updateStatsUI(initialState);
    renderPassportBook(initialState);
    renderMissions(initialState);

    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('reward-modal').classList.add('hidden');
    });
}

function updateStatsUI(state) {
    document.getElementById('stat-xp').textContent = state.xp;
    document.getElementById('stat-coins').textContent = state.coins;
    document.getElementById('stat-stamps').textContent = `${state.stamps.length} / 28`;
}

function renderPassportBook(state) {
    const stampGrid = document.getElementById('stamp-grid');
    stampGrid.innerHTML = '';

    // Render stamps (we show all possible from missions as slots)
    stateMissions.forEach(mission => {
        const isCollected = state.completedMissions.includes(mission.id);
        const el = document.createElement('div');
        el.className = `stamp-slot ${isCollected ? 'collected' : ''}`;
        el.textContent = isCollected ? mission.stamp.replace(/_/g, ' ').toUpperCase() : '?';
        stampGrid.appendChild(el);
    });

    // Render unlocked items
    const unlocksList = document.getElementById('unlocked-list');
    unlocksList.innerHTML = '';
    
    if (state.unlockedItems.length === 0) {
        unlocksList.innerHTML = '<li><span style="color:var(--text-secondary)">No items unlocked yet.</span></li>';
    } else {
        state.unlockedItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `🎁 ${item}`;
            unlocksList.appendChild(li);
        });
    }
}

function renderMissions(state) {
    const missionsList = document.getElementById('missions-list');
    missionsList.innerHTML = '';

    stateMissions.forEach(mission => {
        const isCompleted = state.completedMissions.includes(mission.id);
        
        const card = document.createElement('div');
        card.className = `mission-card ${isCompleted ? 'completed' : ''}`;
        
        card.innerHTML = `
            <div class="mission-info">
                <h3>📍 ${mission.state}</h3>
                <p><strong>Mission:</strong> ${mission.mission}</p>
                <p>${mission.description}</p>
                <div class="mission-rewards">
                    <span>⭐ ${mission.xp} XP</span>
                    <span>🪙 ${mission.coins} Coins</span>
                    <span>📖 Stamp</span>
                </div>
            </div>
            <button class="btn-start" ${isCompleted ? 'disabled' : ''}>
                ${isCompleted ? 'Completed' : 'Start Mission'}
            </button>
        `;

        if (!isCompleted) {
            const btn = card.querySelector('.btn-start');
            btn.addEventListener('click', () => startMission(mission));
        }

        missionsList.appendChild(card);
    });
}

function startMission(mission) {
    // Simulate mission gameplay/delay
    setTimeout(() => {
        const result = playerStore.completeMission(mission);
        if (result.success) {
            showRewardPopup(result.mission, result.newUnlocks);
        }
    }, 500); // 500ms delay to feel like doing something
}

function showRewardPopup(mission, newUnlocks) {
    document.getElementById('popup-xp').textContent = `⭐ +${mission.xp} XP`;
    document.getElementById('popup-coins').textContent = `🪙 +${mission.coins} Coins`;
    document.getElementById('popup-stamp').textContent = `📖 ${mission.state} Stamp Added`;

    const unlockContainer = document.getElementById('popup-unlock-container');
    const unlockItem = document.getElementById('popup-unlock-item');

    if (newUnlocks && newUnlocks.length > 0) {
        unlockContainer.classList.remove('hidden');
        unlockItem.textContent = newUnlocks.join(', ');
    } else {
        unlockContainer.classList.add('hidden');
    }

    document.getElementById('reward-modal').classList.remove('hidden');
}
