/**
 * Wisdom Lessons Module
 * Key ethical and philosophical lessons from the dialogue
 */

const WISDOM_LESSONS = [
    {
        title: " Wisdom Over Strength",
        description: "The Yaksha Prashna demonstrates that intellectual and spiritual wisdom triumphs over physical power. While Bhima and Arjuna were mighty warriors, only Yudhishthira's wisdom could save them."
    },
    {
        title: "🕉️ The Nature of Dharma",
        description: "Dharma is not rigid rules but contextual righteousness. Yudhishthira's answers show that dharma requires discernment, compassion, and understanding of deeper truths beyond surface-level duties."
    },
    {
        title: " Self-Mastery",
        description: "The greatest victory is victory over oneself. Controlling one's desires, anger, and attachments is more difficult and more important than conquering kingdoms."
    },
    {
        title: " True Wealth",
        description: "Material possessions are temporary. True wealth lies in contentment, good character, knowledge, and virtuous conduct. One who is content with little is richer than the greedy king."
    },
    {
        title: "⚖️ Justice and Compassion",
        description: "Yudhishthira's answers consistently balance justice with compassion. Dharma without mercy becomes tyranny; compassion without righteousness becomes weakness."
    },
    {
        title: "🌟 The Immortal Questions",
        description: "The questions asked by the Yaksha remain relevant today: What is happiness? What is knowledge? What is strength? These timeless inquiries guide seekers across millennia."
    }
];

function renderWisdomLessons() {
    const container = document.getElementById('wisdom-grid');
    if (!container) return;

    container.innerHTML = WISDOM_LESSONS.map(lesson => `
        <div class="wisdom-card">
            <h4>${lesson.title}</h4>
            <p>${lesson.description}</p>
        </div>
    `).join('');
}

window.renderWisdomLessons = renderWisdomLessons;
