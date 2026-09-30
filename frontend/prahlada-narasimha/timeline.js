/**
 * Timeline Module
 */
const NARASIMHA_TIMELINE = [
    { phase: "The Boon", title: "The Rise of Tyranny", desc: "Hiranyakashipu performs severe penance and receives a near-invincibility boon from Brahma, declaring himself the supreme god." },
    { phase: "The Persecution", title: "Testing the Boy", desc: "Discovering Prahlada's devotion to Vishnu, the king subjects him to deadly trials: snake bites, elephant trampling, and poisoning. Prahlada survives unharmed." },
    { phase: "The Holika Incident", title: "Fire and Faith", desc: "The king's sister Holika, who was immune to fire, sits in a pyre with Prahlada. By Vishnu's grace, Holika burns, and Prahlada emerges untouched." },
    { phase: "The Confrontation", title: "Where is Your God?", desc: "Enraged, Hiranyakashipu points to a stone pillar and demands to know if Vishnu is in it. Prahlada calmly replies, 'He is everywhere.'" },
    { phase: "The Emergence", title: "Narasimha Appears", desc: "The pillar splits open. From it emerges Narasimha, a terrifying being with the body of a man and the head of a lion, roaring fiercely." },
    { phase: "The Justice", title: "The Boon Fulfilled", desc: "Narasimha carries the king to the threshold (neither inside nor outside) at twilight (neither day nor night), places him on his lap (neither earth nor sky), and tears him apart with his claws (not a weapon)." }
];

function renderNarasimhaTimeline() {
    const container = document.getElementById('narasimha-timeline');
    if (!container) return;
    container.innerHTML = NARASIMHA_TIMELINE.map(event => `
        <div class="timeline-item">
            <span class="timeline-phase">${event.phase}</span>
            <h4>${event.title}</h4>
            <p>${event.desc}</p>
        </div>
    `).join('');
}
window.renderNarasimhaTimeline = renderNarasimhaTimeline;
