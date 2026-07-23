import { RiverEngine } from './js-modules/river-engine.js';

let engine;
let canvas, ctx;
let lastTime = 0;
let animationFrameId;

// Input state
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    a: false,
    d: false
};

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    
    engine = new RiverEngine(canvas.width, canvas.height);
    
    initUI();
    drawFrame(0); // Initial draw

    document.getElementById('btn-start').addEventListener('click', startGame);
    document.getElementById('btn-restart').addEventListener('click', restartGame);
    document.getElementById('river-select').addEventListener('change', (e) => {
        if (engine.state.paused) {
            engine.setRiver(parseInt(e.target.value));
            drawFrame(0);
        }
    });

    window.addEventListener('keydown', (e) => {
        if (keys.hasOwnProperty(e.key)) {
            keys[e.key] = true;
            if(['ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
        }
    });

    window.addEventListener('keyup', (e) => {
        if (keys.hasOwnProperty(e.key)) {
            keys[e.key] = false;
        }
    });
});

function initUI() {
    updateHUD();
}

function startGame() {
    document.getElementById('btn-start').style.display = 'none';
    engine.start();
    lastTime = performance.now();
    cancelAnimationFrame(animationFrameId);
    animationLoop(lastTime);
}

function restartGame() {
    document.getElementById('game-over-modal').classList.add('hidden');
    document.getElementById('btn-start').style.display = 'inline-block';
    engine.resetState();
    // Keep selected river
    engine.setRiver(parseInt(document.getElementById('river-select').value));
    updateHUD();
    drawFrame(0);
}

function handleInput() {
    if (keys.ArrowLeft || keys.a) engine.moveBoat(-1);
    if (keys.ArrowRight || keys.d) engine.moveBoat(1);
}

function animationLoop(currentTime) {
    if (engine.state.gameOver) {
        showGameOver();
        return;
    }

    if (!engine.state.paused) {
        handleInput();
        engine.update(currentTime);
        drawFrame(currentTime);
        updateHUD();
    }

    animationFrameId = requestAnimationFrame(animationLoop);
}

function drawFrame(currentTime) {
    // 1. Draw River Background
    ctx.fillStyle = engine.state.river.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw simple scrolling banks
    const scrollOffset = (engine.state.distance * 100) % 40;
    ctx.fillStyle = '#22c55e'; // Green banks
    for(let y = -40; y < canvas.height; y+=40) {
        // Left bank
        ctx.fillRect(0, y + scrollOffset, 20, 40);
        // Right bank
        ctx.fillRect(canvas.width - 20, y + scrollOffset, 20, 40);
    }

    // 2. Draw Entities
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    engine.state.entities.forEach(ent => {
        if (ent.active) {
            ctx.fillText(ent.icon, ent.x, ent.y);
            if (ent.name) {
                ctx.font = "12px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(ent.name, ent.x, ent.y + 25);
                ctx.font = "30px Arial"; // reset
            }
        }
    });

    // 3. Draw Boat
    const b = engine.state.boat;
    
    // If invulnerable flash or something could go here
    ctx.fillText("🚤", b.x, b.y);
}

function updateHUD() {
    const s = engine.state;
    document.getElementById('ui-health').textContent = s.health > 0 ? "❤️".repeat(s.boat.health) : "☠️";
    document.getElementById('ui-score').textContent = Math.floor(s.score);
    document.getElementById('ui-dist').textContent = s.distance.toFixed(1);
    document.getElementById('ui-fish').textContent = s.fishCount;
    document.getElementById('ui-badges').textContent = s.badges.length > 0 ? s.badges.join(', ') : 'None';
}

function showGameOver() {
    document.getElementById('game-over-modal').classList.remove('hidden');
    document.getElementById('final-score').textContent = Math.floor(engine.state.score);
    document.getElementById('final-dist').textContent = engine.state.distance.toFixed(1);
}
