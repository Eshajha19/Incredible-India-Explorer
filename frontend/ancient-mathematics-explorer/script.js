const mathematicians = [
    {
        id: 'aryabhata',
        name: 'Aryabhata',
        period: '476–550 CE',
        description: 'Pioneering astronomer and mathematician who revolutionized Indian mathematics.',
        contributions: [
            'Defined the value of π (pi) as 3.1416',
            'Developed the place-value system and zero',
            'Created trigonometric functions and tables',
            'Calculated solar and lunar eclipses'
        ],
        biography: 'Aryabhata was born in Kusumapura (modern-day Patna) and is considered one of the greatest mathematicians and astronomers of ancient India. His seminal work, the Aryabhatiya, written at the age of 23, covered mathematics and astronomy. He proposed that the Earth rotates on its axis and explained the causes of solar and lunar eclipses.',
        mathematicalContributions: [
            'Developed the concept of zero and the decimal place-value system',
            'Calculated π (pi) to four decimal places: 3.1416',
            'Created sine and cosine functions in trigonometry',
            'Solved quadratic equations and indeterminate equations',
            'Developed methods for finding square and cube roots',
            'Formulated the algebraic identity (a+b)² = a² + 2ab + b²'
        ],
        historicalSignificance: 'Aryabhata\'s work influenced mathematics across Asia and the Islamic world. His calculation of π was remarkably accurate for his time. The place-value system he helped develop became the foundation of modern mathematics. His astronomical theories were ahead of their time, including the correct explanation of eclipses.'
    },
    {
        id: 'brahmagupta',
        name: 'Brahmagupta',
        period: '598–668 CE',
        description: 'Mathematician and astronomer who made groundbreaking contributions to algebra and number theory.',
        contributions: [
            'First to use zero as a number',
            'Developed rules for negative numbers',
            'Formulated Brahmagupta\'s formula for cyclic quadrilaterals',
            'Solved quadratic equations with two solutions'
        ],
        biography: 'Brahmagupta was born in Bhillamala (modern-day Bhinmal, Rajasthan) and served as the head of the astronomical observatory at Ujjain. His major work, Brahmasphutasiddhanta, contained significant mathematical innovations including the first clear treatment of zero as a number and rules for arithmetic with negative numbers.',
        mathematicalContributions: [
            'First to treat zero as a number with its own properties',
            'Established rules for arithmetic with positive and negative numbers',
            'Developed Brahmagupta\'s formula: Area = √((s-a)(s-b)(s-c)(s-d)) for cyclic quadrilaterals',
            'Solved quadratic equations of the form ax² + bx = c',
            'Developed methods for solving indeterminate equations',
            'Calculated the Earth\'s circumference with remarkable accuracy'
        ],
        historicalSignificance: 'Brahmagupta\'s work on zero and negative numbers was revolutionary, laying the groundwork for modern algebra. His formula for the area of cyclic quadrilaterals is still used today. His astronomical calculations were influential across the Islamic world and later in Europe.'
    },
    {
        id: 'bhaskara-ii',
        name: 'Bhaskara II',
        period: '1114–1185 CE',
        description: 'Known as Bhaskaracharya, he was the last great mathematician of ancient India.',
        contributions: [
            'Developed differential calculus fundamentals',
            'Solved cubic and quartic equations',
            'Calculated derivatives and integration',
            'Wrote Lilavati on arithmetic and Bijaganita on algebra'
        ],
        biography: 'Bhaskara II was born in Bijapur, Karnataka, and became the head of the astronomical observatory at Ujjain. He wrote several influential works including Siddhanta Shiromani, which consisted of four parts: Lilavati (arithmetic), Bijaganita (algebra), Goladhyaya (sphere), and Grahaganita (mathematics of planets).',
        mathematicalContributions: [
            'Developed early concepts of differential calculus',
            'Discovered the derivative formula and Rolle\'s theorem',
            'Solved cubic and quartic equations algebraically',
            'Developed methods for solving indeterminate equations',
            'Calculated the instantaneous rate of change',
            'Proposed that division by zero results in infinity'
        ],
        historicalSignificance: 'Bhaskara II\'s work represents the pinnacle of ancient Indian mathematics. His Lilavati was written as a textbook for his daughter and became famous for its poetic presentation of mathematical problems. His calculus concepts predated European discoveries by several centuries.'
    },
    {
        id: 'pingala',
        name: 'Pingala',
        period: 'c. 200 BCE',
        description: 'Ancient scholar who made fundamental discoveries in combinatorics and binary numbers.',
        contributions: [
            'Discovered binary number system',
            'Developed Pascal\'s Triangle (Meru Prastara)',
            'Created combinatorial mathematics',
            'Formulated meter patterns in Sanskrit poetry'
        ],
        biography: 'Pingala was an ancient Indian scholar who lived around the 2nd-3rd century BCE. His work Chandashastra dealt with Sanskrit prosody (meter in poetry). In studying poetic meters, he discovered mathematical principles that would become fundamental to combinatorics and computer science.',
        mathematicalContributions: [
            'Discovered the binary number system using light (laghu) and heavy (guru) syllables',
            'Developed Meru Prastara, now known as Pascal\'s Triangle',
            'Formulated the concept of permutations and combinations',
            'Calculated the number of possible meter patterns using combinatorial methods',
            'Developed algorithms for enumerating combinations',
            'Created the first known reference to zero as a symbol'
        ],
        historicalSignificance: 'Pingala\'s discoveries in binary numbers and combinatorics were revolutionary and predated similar discoveries in other civilizations by over a millennium. His work on Pascal\'s Triangle demonstrates the advanced mathematical thinking in ancient India. His binary system is the foundation of modern computing.'
    },
    {
        id: 'baudhayana',
        name: 'Baudhayana',
        period: 'c. 800 BCE',
        description: 'Ancient priest and mathematician who discovered the Pythagorean theorem before Pythagoras.',
        contributions: [
            'Discovered Pythagorean theorem',
            'Calculated square root of 2 with high precision',
            'Developed geometric constructions',
            'Created Sulba Sutras for altar construction'
        ],
        biography: 'Baudhayana was an ancient Indian priest and mathematician who lived around 800 BCE. He is credited with authoring the Baudhayana Sulba Sutra, one of the oldest Sulba Sutras (texts on geometry) that provided instructions for constructing ritual altars. His work contains some of the earliest known mathematical discoveries.',
        mathematicalContributions: [
            'Stated the Pythagorean theorem: "The rope stretched along the diagonal of a rectangle produces an area which the vertical and horizontal sides make together"',
            'Calculated the value of √2 as 1.4142156, remarkably accurate for his time',
            'Developed methods for constructing geometric shapes including circles, squares, and rectangles',
            'Created procedures for transforming one geometric shape into another while preserving area',
            'Developed approximate methods for squaring the circle',
            'Formulated early concepts of irrational numbers'
        ],
        historicalSignificance: 'Baudhayana\'s discovery of the Pythagorean theorem predates Pythagoras by several centuries, demonstrating the advanced mathematical knowledge in ancient India. His precise calculation of √2 shows sophisticated understanding of irrational numbers. The Sulba Sutras represent some of the oldest known mathematical texts in the world.'
    }
];

// Sort mathematicians by period (chronological order)
const sortedMathematicians = [...mathematicians].sort((a, b) => {
    const periodA = parseInt(a.period);
    const periodB = parseInt(b.period);
    return periodA - periodB;
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    toggleTheme();
}

themeToggle.addEventListener('click', toggleTheme);

// Render mathematician cards
function renderMathematicians() {
    const container = document.getElementById('mathematicians-container');
    container.innerHTML = '';

    sortedMathematicians.forEach((mathematician, index) => {
        const card = document.createElement('div');
        card.className = 'mathematician-card';
        card.setAttribute('data-id', mathematician.id);
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <h2>${mathematician.name}</h2>
            <span class="period">${mathematician.period}</span>
            <p class="description">${mathematician.description}</p>
            <div class="contributions">
                <h3>Key Contributions:</h3>
                <ul>
                    ${mathematician.contributions.slice(0, 3).map(contrib => `<li>${contrib}</li>`).join('')}
                </ul>
            </div>
            <span class="view-more">View Details →</span>
        `;

        card.addEventListener('click', () => openModal(mathematician));
        container.appendChild(card);
    });
}

// Modal functionality
const modal = document.getElementById('detail-modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal');

function openModal(mathematician) {
    modalBody.innerHTML = `
        <h2>${mathematician.name}</h2>
        <p class="modal-period">${mathematician.period}</p>
        
        <div class="modal-section">
            <h3>Biography</h3>
            <p>${mathematician.biography}</p>
        </div>
        
        <div class="modal-section">
            <h3>Mathematical Contributions</h3>
            <ul>
                ${mathematician.mathematicalContributions.map(contrib => `<li>${contrib}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Historical Significance</h3>
            <p>${mathematician.historicalSignificance}</p>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Timeline animation
function animateTimeline() {
    const cards = document.querySelectorAll('.mathematician-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMathematicians();
    animateTimeline();
});
