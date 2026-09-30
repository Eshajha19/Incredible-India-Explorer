/**
 * Cultural Representations Module
 */
const CULTURAL_ITEMS = [
    { title: "Temple Sculptures", desc: "Ancient temples across India, especially in Rajasthan and Gujarat, feature intricate stone carvings of the young Krishna holding up the mountain, surrounded by cows and devotees." },
    { title: "Pichhwai Paintings", desc: "Traditional Nathdwara paintings often depict 'Shrinathji' (a form of Krishna) with his arm raised, holding the mountain, rendered in vibrant natural pigments and gold leaf." },
    { title: "Classical Dance", desc: "The story is a popular theme in Kathak and Odissi dance dramas, where the dancer uses intricate footwork and expressive gestures (Abhinaya) to portray the storm and Krishna's serene strength." }
];

function renderCulturalRepresentations() {
    const container = document.getElementById('cultural-grid');
    if (!container) return;
    container.innerHTML = CULTURAL_ITEMS.map(item => `
        <div class="cultural-item">
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
        </div>
    `).join('');
}
window.renderCulturalRepresentations = renderCulturalRepresentations;
