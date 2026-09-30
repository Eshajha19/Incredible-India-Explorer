/**
 * Interactive Demo Module
 * Creates a simple interactive simulation of the concentration challenge
 */

/**
 * Initializes the interactive demo
 */
function initInteractiveDemo() {
    const container = document.getElementById('interactive-container');
    if (!container) return;

    // Create interactive elements
    container.innerHTML = `
        <div class="demo-area">
            <div class="demo-instruction">
                <h3>🎯 Test Your Focus</h3>
                <p>Click on the target when you're ready. Remember: focus only on the reflection, not the fish itself!</p>
            </div>
            <div class="target-container" id="target-container">
                <div class="fish-target" id="fish-target"></div>
                <div class="reflection-pool" id="reflection-pool">
                    <div class="reflection" id="reflection"></div>
                </div>
            </div>
            <button class="demo-btn" id="start-focus-btn">Begin Concentration Exercise</button>
            <div class="result-message" id="result-message"></div>
        </div>
    `;

    // Add event listener
    const startBtn = document.getElementById('start-focus-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startConcentrationExercise);
    }
}

/**
 * Starts the concentration exercise
 */
function startConcentrationExercise() {
    const target = document.getElementById('fish-target');
    const reflection = document.getElementById('reflection');
    const resultMsg = document.getElementById('result-message');
    const container = document.getElementById('target-container');

    if (!target || !reflection || !resultMsg || !container) return;

    // Add rotating animation
    target.classList.add('rotating');
    reflection.classList.add('rotating');

    resultMsg.innerHTML = '<p class="focus-tip">🧘 Focus only on the reflection in the pool below. Block out everything else.</p>';

    // After 3 seconds, allow the "shot"
    setTimeout(() => {
        resultMsg.innerHTML += `
            <div class="success-message">
                <p>✨ Like Arjuna, you maintained perfect focus!</p>
                <p class="lesson">Remember: True mastery comes from eliminating all distractions and seeing only the goal.</p>
            </div>
        `;

        target.classList.remove('rotating');
        reflection.classList.remove('rotating');
        target.style.opacity = '0.3';
        reflection.style.opacity = '1';
        reflection.style.transform = 'scale(1.5)';
    }, 3000);
}

window.initInteractiveDemo = initInteractiveDemo;
