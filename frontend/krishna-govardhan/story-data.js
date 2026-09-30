/**
 * Story Data Module
 * Characters and core narrative data
 */
const GOVARDHAN_CHARACTERS = [
    { name: "Krishna", role: "The Divine Protector", initial: "K", desc: "The eighth avatar of Vishnu, who as a young cowherd challenged the pride of Indra to teach the value of humble devotion and duty to nature." },
    { name: "Indra", role: "King of the Gods", initial: "I", desc: "The god of rain and thunder, whose pride was wounded when the villagers stopped worshipping him, leading him to unleash a devastating storm." },
    { name: "Nanda Baba", role: "Village Chief", initial: "N", desc: "Krishna's foster father and the chief of the cowherds, who initially feared Indra's wrath but ultimately trusted Krishna's divine plan." },
    { name: "The Gopis & Gopas", role: "The Devotees", initial: "G", desc: "The cowherd men and women of Vrindavan whose unwavering faith in Krishna was rewarded with miraculous protection." }
];

function renderCharacters() {
    const container = document.getElementById('characters-grid');
    if (!container) return;
    container.innerHTML = GOVARDHAN_CHARACTERS.map(char => `
        <div class="character-card">
            <div class="character-avatar">${char.initial}</div>
            <h4>${char.name}</h4>
            <div class="role">${char.role}</div>
            <p>${char.desc}</p>
        </div>
    `).join('');
}
window.renderCharacters = renderCharacters;
