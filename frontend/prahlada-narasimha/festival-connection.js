/**
 * Festival Connection Module
 */
const FESTIVAL_CONNECTIONS = [
    { title: "Narasimha Jayanti", desc: "The primary festival celebrating the appearance of the Narasimha avatar. It is observed on the 14th day of the bright fortnight in the month of Vaishakha, with fasting and night-long vigils." },
    { title: "Holika Dahan", desc: "The night before Holi, bonfires are lit to commemorate the burning of the demoness Holika and the miraculous survival of Prahlada, symbolizing the victory of good over evil." },
    { title: "Ahobilam Temple", desc: "One of the most sacred pilgrimage sites in Andhra Pradesh, believed to be the exact location where Narasimha appeared. It features nine distinct forms (Navanarasimha) of the deity." }
];

function renderFestivalConnections() {
    const container = document.getElementById('festival-details');
    if (!container) return;
    container.innerHTML = FESTIVAL_CONNECTIONS.map(f => `
        <div class="festival-card">
            <h4>${f.title}</h4>
            <p>${f.desc}</p>
        </div>
    `).join('');
}
window.renderFestivalConnections = renderFestivalConnections;
