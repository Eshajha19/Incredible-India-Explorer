/**
 * Story Data Module
 * Timeline of the Yaksha encounter
 */

const STORY_TIMELINE = [
    {
        phase: "The Forest Exile",
        title: "The Pandavas' Journey",
        description: "During their twelve years of forest exile, the Pandavas wandered through various woods. One day, exhausted and thirsty, they sought water in a forest."
    },
    {
        phase: "The Sacred Lake",
        title: "The Mysterious Guardian",
        description: "They discovered a beautiful lake, but as each brother (Nakula, Sahadeva, Arjuna, and Bhima) went to drink, a Yaksha's voice warned them: 'Answer my questions first, or you shall die.' Ignoring the warning, they drank and fell lifeless."
    },
    {
        phase: "Yudhishthira's Turn",
        title: "The Test of Wisdom",
        description: "Finding his brothers unconscious, Yudhishthira approached the lake. The Yaksha appeared and began asking profound philosophical questions. Yudhishthira, with patience and wisdom, answered each one correctly."
    },
    {
        phase: "The Revelation",
        title: "Father and Son Reunited",
        description: "Pleased with Yudhishthira's wisdom and adherence to dharma, the Yaksha revealed himself as Yama (Dharma), Yudhishthira's divine father. He blessed his son and revived all the Pandavas."
    }
];

function renderStoryTimeline() {
    const container = document.getElementById('story-timeline');
    if (!container) return;

    container.innerHTML = STORY_TIMELINE.map(event => `
        <div class="timeline-item">
            <span class="timeline-phase">${event.phase}</span>
            <h4>${event.title}</h4>
            <p>${event.description}</p>
        </div>
    `).join('');
}

window.renderStoryTimeline = renderStoryTimeline;
