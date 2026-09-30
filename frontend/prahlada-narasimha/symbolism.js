/**
 * Symbolism Module
 */
const SYMBOLISM_ITEMS = [
    { icon: "🦁", title: "Neither Man nor Beast", desc: "As a lion-headed man, Narasimha was neither fully human nor fully animal, bypassing the 'man or beast' condition of the boon." },
    { icon: "🌅", title: "Neither Day nor Night", desc: "The avatar appeared at twilight (sandhya), a transitional period that is technically neither day nor night." },
    { icon: "🚪", title: "Neither Inside nor Outside", desc: "The killing took place on the threshold of the palace courtyard, a liminal space that is neither fully indoors nor outdoors." },
    { icon: "🦅", title: "Neither Earth nor Sky", desc: "Hiranyakashipu was placed on Narasimha's lap, meaning he was not on the ground (earth) nor in the air (sky)." },
    { icon: "🐾", title: "No Manufactured Weapon", desc: "The king was torn apart by Narasimha's natural claws, which are not a 'weapon created' by any artisan, thus fulfilling the final condition." }
];

function renderSymbolism() {
    const container = document.getElementById('symbolism-grid');
    if (!container) return;
    container.innerHTML = SYMBOLISM_ITEMS.map(item => `
        <div class="symbol-card">
            <div class="icon">${item.icon}</div>
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
        </div>
    `).join('');
}
window.renderSymbolism = renderSymbolism;
