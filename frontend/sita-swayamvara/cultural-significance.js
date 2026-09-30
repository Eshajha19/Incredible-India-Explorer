/**
 * Cultural Significance Module
 */
const CULTURAL_ITEMS = [
    { title: "Vivaha Panchami", desc: "This major Hindu festival celebrates the wedding anniversary of Rama and Sita. It is observed with great fervor in Mithila, Ayodhya, and temples across India, featuring reenactments of the wedding." },
    { title: "Symbol of Ideal Union", desc: "The marriage of Rama and Sita is revered in Hinduism as 'Maryada Purushottam' (the ideal man) and 'Pativrata' (the ideal, devoted wife), setting the standard for marital harmony and duty." },
    { title: "Art and Literature", desc: "The Swayamvara scene is a cornerstone of the Valmiki Ramayana and has been depicted in countless miniature paintings, temple friezes (like at Hampi and Khajuraho), and classical dance dramas." }
];

function renderCulturalSignificance() {
    const container = document.getElementById('cultural-grid');
    if (!container) return;
    container.innerHTML = CULTURAL_ITEMS.map(item => `
        <div class="cultural-item">
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
        </div>
    `).join('');
}
window.renderCulturalSignificance = renderCulturalSignificance;
