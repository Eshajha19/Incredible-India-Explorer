/**
 * Bow Challenge Module
 */
const CHALLENGE_STEPS = [
    { step: 1, title: "The Immovable Object", desc: "The Pinaka was brought into the assembly hall in a massive, iron-bound chest. It was so heavy that it required a wheeled cart and many strong men to move it." },
    { step: 2, title: "The Failures of Kings", desc: "One by one, mighty kings and warriors stepped forward. They strained, sweated, and failed to even lift the bow, let alone string it. Many left in humiliation." },
    { step: 3, title: "Rama's Request", desc: "At the urging of Sage Vishwamitra, the young Prince Rama approached the bow. He asked King Janaka for permission to examine it." },
    { step: 4, title: "The Divine Feat", desc: "Rama lifted the massive bow with one hand as if it were a mere plaything. He effortlessly fixed the string to both ends and began to pull it back to test its tension." },
    { step: 5, title: "The Shattering", desc: "As Rama pulled the string, the bow, unable to withstand the divine energy of the Vishnu avatar, snapped in two with a deafening, thunderous roar that shook the earth." }
];

function renderChallengeDetails() {
    const container = document.getElementById('challenge-details');
    if (!container) return;
    container.innerHTML = CHALLENGE_STEPS.map(step => `
        <div class="challenge-step">
            <div class="step-number">${step.step}</div>
            <h4>${step.title}</h4>
            <p>${step.desc}</p>
        </div>
    `).join('');
}
window.renderChallengeDetails = renderChallengeDetails;
