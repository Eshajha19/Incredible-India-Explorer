/**
 * Questions and Answers Module
 * Selected philosophical questions from the Yaksha Prashna
 */

const QUESTIONS_ANSWERS = [
    {
        question: "What is the greatest wonder in the world?",
        answer: "Every day, countless people die and go to the abode of Yama. Yet, those who remain behind believe they are immortal. This is the greatest wonder."
    },
    {
        question: "What is the path to heaven?",
        answer: "Truthfulness, righteousness, self-control, and purity of heart—these are the qualities that lead to heaven, not mere rituals or sacrifices."
    },
    {
        question: "What is the greatest refuge for a person?",
        answer: "The Vedas are the greatest refuge, for they contain all knowledge. But more importantly, one's own conduct (dharma) is the ultimate refuge."
    },
    {
        question: "What should be renounced to become wealthy?",
        answer: "Desire (kama) must be renounced. One who is free from greed and excessive desire finds true wealth in contentment."
    },
    {
        question: "What is true knowledge?",
        answer: "True knowledge is understanding the difference between what is permanent and what is temporary, between the self (atman) and the non-self."
    },
    {
        question: "What is the greatest strength?",
        answer: "Self-control (atma-samyama) is the greatest strength. One who has conquered their own mind and senses is truly powerful."
    },
    {
        question: "What is true happiness?",
        answer: "Contentment (santosha) is true happiness. One who is satisfied with what they have, without craving for more, experiences lasting joy."
    },
    {
        question: "What is the greatest disease?",
        answer: "Desire (kama) is the greatest disease. It causes endless suffering and can never be fully satisfied."
    },
    {
        question: "Who is truly happy?",
        answer: "One who has no debts, is not in exile, is far from home, and has simple food to eat—that person is truly happy. More deeply, one who is free from attachment and aversion is happy."
    },
    {
        question: "What is the greatest charity?",
        answer: "Teaching and sharing knowledge is the greatest charity, for it empowers others permanently. But compassion and kindness to all beings is also supreme charity."
    }
];

function renderQuestionsAnswers() {
    const container = document.getElementById('qa-container');
    if (!container) return;

    container.innerHTML = QUESTIONS_ANSWERS.map(qa => `
        <div class="qa-item">
            <div class="question">${qa.question}</div>
            <div class="answer">${qa.answer}</div>
        </div>
    `).join('');
}

window.renderQuestionsAnswers = renderQuestionsAnswers;
