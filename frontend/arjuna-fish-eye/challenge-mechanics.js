/**
 * Challenge Mechanics Module
 * Details the step-by-step method Arjuna used to succeed
 */

const METHOD_STEPS = [
    {
        step: 1,
        title: "The Disguise",
        description: "Arjuna, along with his brothers, attended the Swayamvara disguised as Brahmins. This humble appearance masked his true identity as a Kshatriya prince and master archer."
    },
    {
        step: 2,
        title: "Observing the Challenge",
        description: "Before attempting, Arjuna carefully observed the rotating fish mechanism, the angle of reflection in the oil pool, and the precise timing needed for the shot."
    },
    {
        step: 3,
        title: "Mental Preparation",
        description: "Arjuna cleared his mind of all distractions—the assembled kings, the beautiful princess, the difficulty of the task. He focused only on the target."
    },
    {
        step: 4,
        title: "The Approach",
        description: "When other mighty warriors like Karna, Shalya, and Duryodhana failed, Arjuna stepped forward calmly, despite the assembly's skepticism about a 'Brahmin' attempting."
    },
    {
        step: 5,
        title: "Stringing the Bow",
        description: "With effortless strength, Arjuna strung the massive bow that others couldn't even lift, demonstrating his divine power and skill."
    },
    {
        step: 6,
        title: "Perfect Concentration",
        description: "Arjuna looked not at the fish directly, but only at its reflection in the oil below. He blocked out everything else—this was ekagrata in action."
    },
    {
        step: 7,
        title: "The Perfect Shot",
        description: "In one fluid motion, Arjuna released five arrows in rapid succession, all piercing through the eye of the rotating fish. The assembly erupted in astonishment."
    }
];

/**
 * Renders the method steps in the DOM
 */
function renderMethodSteps() {
    const container = document.getElementById('method-steps');
    if (!container) return;

    container.innerHTML = METHOD_STEPS.map(step => `
        <div class="method-step">
            <div class="step-number">${step.step}</div>
            <h4>${step.title}</h4>
            <p>${step.description}</p>
        </div>
    `).join('');
}

window.renderMethodSteps = renderMethodSteps;
