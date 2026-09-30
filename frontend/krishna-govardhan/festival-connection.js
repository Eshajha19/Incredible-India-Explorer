/**
 * Festival Connection Module
 */
const FESTIVAL_DETAILS = [
    { title: "Govardhan Puja", desc: "Celebrated the day after Diwali, this festival commemorates Krishna's act. Devotees worship small mounds of cow dung or stone representing Govardhan Hill, offering food and flowers." },
    { title: "Annakut (Mountain of Food)", desc: "A spectacular offering of 56 or 108 different vegetarian dishes (Chappan Bhog) arranged in the shape of a mountain, symbolizing the original feast offered to the hill." },
    { title: "Braj Region Significance", desc: "In Mathura, Vrindavan, and surrounding areas, the festival is marked by grand processions, devotional singing (Kirtan), and the ceremonial parikrama (circumambulation) of the actual Govardhan Hill." }
];

function renderFestivalDetails() {
    const container = document.getElementById('festival-details');
    if (!container) return;
    container.innerHTML = FESTIVAL_DETAILS.map(f => `
        <div class="festival-card">
            <h4>${f.title}</h4>
            <p>${f.desc}</p>
        </div>
    `).join('');
}
window.renderFestivalDetails = renderFestivalDetails;
