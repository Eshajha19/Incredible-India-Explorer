/**
 * Characters Module
 * Documents the major participants in the Swayamvara challenge
 */

const PARTICIPANTS_DATA = [
    {
        name: "Arjuna",
        role: "The Victor",
        initial: "A",
        description: "The third Pandava brother, disguised as a Brahmin. His unparalleled concentration and archery skill enabled him to accomplish what no other warrior could."
    },
    {
        name: "Karna",
        role: "The Mighty Challenger",
        initial: "K",
        description: "The greatest archer rival to Arjuna. He successfully strung the bow but was stopped by Draupadi's refusal to accept a 'Suta-putra' (charioteer's son)."
    },
    {
        name: "Duryodhana",
        role: "The Failed Suitor",
        initial: "D",
        description: "The eldest Kaurava prince who came with his brothers. He failed to string the bow and later felt humiliated by Arjuna's victory."
    },
    {
        name: "Shalya",
        role: "The King of Madra",
        initial: "S",
        description: "Uncle to Nakula and Sahadeva, known for his strength and skill. Despite his prowess, he could not accomplish the challenge."
    },
    {
        name: "Draupadi",
        role: "The Princess",
        initial: "Dr",
        description: "Daughter of King Drupada, born from fire. Her hand was the prize, and she had the right to choose among those who succeeded."
    },
    {
        name: "King Drupada",
        role: "The Host",
        initial: "Dr",
        description: "King of Panchala who organized the Swayamvara. He designed the challenge to find a worthy husband and attract warriors who could help against Dronacharya."
    }
];

/**
 * Renders the participants in the DOM
 */
function renderParticipants() {
    const container = document.getElementById('participants-grid');
    if (!container) return;

    container.innerHTML = PARTICIPANTS_DATA.map(char => `
        <div class="participant-card">
            <div class="participant-avatar">${char.initial}</div>
            <h4>${char.name}</h4>
            <div class="role">${char.role}</div>
            <p>${char.description}</p>
        </div>
    `).join('');
}

window.renderParticipants = renderParticipants;
