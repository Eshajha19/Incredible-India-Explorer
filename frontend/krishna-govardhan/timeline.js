/**
 * Timeline Module
 */
const GOVARDHAN_TIMELINE = [
    { day: "Preparation", title: "The Change of Worship", description: "Krishna convinces the villagers to cancel the Indra Yajna and instead worship Govardhan Hill, preparing a massive feast of offerings." },
    { day: "Day 1", title: "Indra's Fury", description: "Enraged by the slight, Indra commands the clouds to unleash a torrential, apocalyptic storm upon Vrindavan to drown the village and its cattle." },
    { day: "Day 1-2", title: "The Divine Lift", description: "As the floodwaters rise, Krishna calmly walks to Govardhan Hill, uproots it, and holds it aloft on the little finger of his left hand like a giant umbrella." },
    { day: "Day 3-6", title: "The Shelter", description: "The entire population of Vrindavan, along with all their cattle and belongings, gathers under the mountain. Krishna stands unwavering, without food or sleep, protecting them." },
    { day: "Day 7", title: "Indra's Surrender", description: "Realizing the futility of his anger and recognizing Krishna's supreme divinity, Indra ceases the storm, bows down, and seeks forgiveness." },
    { day: "Aftermath", title: "The Blessing", description: "Indra blesses the village, and Govardhan is forever revered as 'Giriraj' (King of Mountains) and a form of Krishna himself." }
];

function renderGovardhanTimeline() {
    const container = document.getElementById('govardhan-timeline');
    if (!container) return;
    container.innerHTML = GOVARDHAN_TIMELINE.map(event => `
        <div class="timeline-item">
            <span class="timeline-day">${event.day}</span>
            <h4>${event.title}</h4>
            <p>${event.description}</p>
        </div>
    `).join('');
}
window.renderGovardhanTimeline = renderGovardhanTimeline;
