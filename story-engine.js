const storyData = {
    gandhi: {
        heroTitle: "Path of Non-Violence",
        heroColor: "var(--primary-saffron)",
        events: [
            { year: "1915", title: "The Return", desc: "Mahatma Gandhi returns to India from South Africa, bringing with him the philosophy of Satyagraha (truth-force) and non-violent resistance." },
            { year: "1917", title: "Champaran Satyagraha", desc: "The first major civil disobedience movement. Gandhi organizes impoverished farmers against oppressive British indigo planters, securing a major victory." },
            { year: "1920", title: "Non-Cooperation Movement", desc: "A nationwide campaign to boycott British goods, courts, and educational institutions. Millions of Indians surrender their British titles and jobs." },
            { year: "1930", title: "The Salt March (Dandi March)", desc: "A 240-mile march to the Arabian Sea to protest the British salt monopoly. Gandhi boils seawater to make salt, awakening the world's conscience." },
            { year: "1942", title: "Quit India Movement", desc: "The final, decisive call for the British to leave India immediately with the legendary slogan: 'Do or Die'." }
        ]
    },
    bhagat: {
        heroTitle: "Path of Revolution",
        heroColor: "var(--primary-gold)",
        events: [
            { year: "1919", title: "Jallianwala Bagh Massacre", desc: "A 12-year-old Bhagat Singh visits the blood-stained grounds of Jallianwala Bagh, deeply impacting him and sparking his revolutionary fire." },
            { year: "1926", title: "Naujawan Bharat Sabha", desc: "Bhagat Singh founds a socialist youth organization to encourage political revolution and secularism against British rule." },
            { year: "1928", title: "Avenging Lala Lajpat Rai", desc: "Following the brutal death of senior leader Lala Lajpat Rai during a lathi charge, Singh and his comrades assassinate British officer John Saunders." },
            { year: "1929", title: "Assembly Bombing", desc: "To 'make the deaf hear', Singh and Batukeshwar Dutt throw harmless smoke bombs in the Central Legislative Assembly and surrender voluntarily, using their trial to publicize their cause." },
            { year: "1931", title: "Martyrdom", desc: "Bhagat Singh is hanged at the age of 23, kissing the rope with a smile. He becomes an eternal symbol of youth sacrifice and uncompromising revolution." }
        ]
    },
    bose: {
        heroTitle: "Path of Armed Struggle",
        heroColor: "var(--primary-green)",
        events: [
            { year: "1921", title: "Resignation from ICS", desc: "Subhas Chandra Bose resigns from the highly prestigious Indian Civil Service in London, refusing to serve the British, and returns to join the freedom struggle." },
            { year: "1939", title: "INC Presidency", desc: "Elected president of the Indian National Congress against Gandhi's preferred candidate, Bose eventually resigns due to ideological differences regarding radical, immediate action." },
            { year: "1941", title: "The Great Escape", desc: "Placed under house arrest by the British, Bose miraculously escapes India in disguise, traveling through Afghanistan and Russia to seek international alliances." },
            { year: "1943", title: "Indian National Army (INA)", desc: "Bose takes charge of the INA in Singapore, raising a massive army of Indian POWs and civilians with the legendary call: 'Give me blood, and I shall give you freedom!'" },
            { year: "1944", title: "March to Delhi", desc: "The INA successfully hoists the Indian tricolor in the Andaman Islands and parts of Manipur, engaging in direct, fierce military clashes with British forces." }
        ]
    }
};

let currentPath = null;
let currentEventIndex = -1;

document.addEventListener('app:route-changed', () => {
    const crossroadsScreen = document.getElementById('crossroads-screen');
    const journeyScreen = document.getElementById('journey-screen');
    const pathCards = document.querySelectorAll('.path-card');
    
    const journeyTitle = document.getElementById('journey-title');
    const timelineContainer = document.getElementById('interactive-timeline');
    const btnNextEvent = document.getElementById('btn-next-event');
    const btnReset = document.getElementById('btn-reset-story');

    if (!crossroadsScreen || !journeyScreen) return;

    // Handle Path Selection
    pathCards.forEach(card => {
        card.addEventListener('click', () => {
            currentPath = card.getAttribute('data-path');
            currentEventIndex = -1;
            startJourney();
        });
    });

    // Handle Next Event Unlock
    btnNextEvent.addEventListener('click', unlockNextEvent);

    // Handle Reset
    btnReset.addEventListener('click', () => {
        journeyScreen.classList.remove('active');
        setTimeout(() => {
            journeyScreen.classList.add('hidden');
            crossroadsScreen.classList.remove('hidden');
            setTimeout(() => crossroadsScreen.classList.add('active'), 50);
        }, 500);
    });

    function startJourney() {
        const data = storyData[currentPath];
        journeyTitle.innerText = data.heroTitle;
        journeyTitle.style.color = data.heroColor;
        
        // Clear timeline
        timelineContainer.innerHTML = '';
        btnNextEvent.style.display = 'inline-flex';
        btnNextEvent.innerText = 'Unlock First Event';

        // Transition screens
        crossroadsScreen.classList.remove('active');
        setTimeout(() => {
            crossroadsScreen.classList.add('hidden');
            journeyScreen.classList.remove('hidden');
            setTimeout(() => journeyScreen.classList.add('active'), 50);
        }, 500);
    }

    function unlockNextEvent() {
        const data = storyData[currentPath];
        currentEventIndex++;

        if (currentEventIndex < data.events.length) {
            const eventData = data.events[currentEventIndex];
            
            // Create event element
            const eventEl = document.createElement('div');
            eventEl.className = 'timeline-event locked';
            eventEl.style.borderLeftColor = data.heroColor;
            
            eventEl.innerHTML = `
                <div class="event-year" style="color: ${data.heroColor}">${eventData.year}</div>
                <div class="event-content">
                    <h3>${eventData.title}</h3>
                    <p>${eventData.desc}</p>
                </div>
            `;
            
            timelineContainer.appendChild(eventEl);
            
            // Trigger animation
            setTimeout(() => {
                eventEl.classList.remove('locked');
                eventEl.classList.add('unlocked');
                // Scroll to bottom of timeline
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }, 50);

            // Update button text
            btnNextEvent.innerText = 'Unlock Next Event';
            
            if (currentEventIndex === data.events.length - 1) {
                btnNextEvent.style.display = 'none'; // Reached the end
            }
        }
    }
});
