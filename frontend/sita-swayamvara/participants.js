/**
 * Participants Module
 */
const PARTICIPANTS = [
    { name: "Rama", kingdom: "Ayodhya", initial: "R", desc: "The divine prince who effortlessly accomplished the feat, proving his worthiness as Sita's husband." },
    { name: "Sita", kingdom: "Mithila", initial: "S", desc: "The princess of Mithila, whose hand was the prize. She had secretly vowed in her heart to marry only Rama." },
    { name: "King Janaka", kingdom: "Mithila", initial: "J", desc: "The wise and pious king who organized the Swayamvara and was overjoyed by Rama's success." },
    { name: "Sage Vishwamitra", kingdom: "Ashram", initial: "V", desc: "The powerful sage who brought Rama and Lakshmana to Mithila and encouraged Rama to participate." },
    { name: "Other Kings", kingdom: "Various", initial: "👑", desc: "Numerous rulers from across Bharatvarsha, including kings of Magadha and Kashi, who failed the challenge." }
];

function renderParticipants() {
    const container = document.getElementById('participants-grid');
    if (!container) return;
    container.innerHTML = PARTICIPANTS.map(p => `
        <div class="participant-card">
            <div class="participant-avatar">${p.initial}</div>
            <h4>${p.name}</h4>
            <div class="kingdom">${p.kingdom}</div>
            <p>${p.desc}</p>
        </div>
    `).join('');
}
window.renderParticipants = renderParticipants;
