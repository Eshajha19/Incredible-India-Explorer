/**
 * Freedom Fighters Knowledge Hub Data & Application Logic
 */

const FREEDOM_FIGHTERS_DATA = [
    {
        id: 'gandhi',
        name: 'Mahatma Gandhi',
        title: 'Father of the Nation',
        lifespan: '1869 – 1948',
        era: 'Gandhian Era',
        region: 'West',
        birthplace: 'Porbandar, Gujarat',
        movements: ['Non-Cooperation Movement', 'Salt Satyagraha (Dandi March)', 'Quit India Movement'],
        biography: 'Mohandas Karamchand Gandhi led India\'s independence movement against British rule using nonviolent civil disobedience (Ahimsa and Satyagraha), inspiring civil rights movements globally.',
        timeline: [
            { year: '1915', event: 'Returned to India from South Africa and joined Indian National Congress.' },
            { year: '1920', event: 'Launched Non-Cooperation Movement following Jallianwala Bagh massacre.' },
            { year: '1930', event: 'Led 240-mile Dandi Salt March defying British salt tax monopoly.' },
            { year: '1942', event: 'Initiated Quit India Movement with famous "Do or Die" call.' }
        ],
        contributions: 'Pioneered Ahimsa (non-violence) philosophy, promoted Khadi self-reliance, empowered rural communities, and unified millions across all social strata.',
        rareFacts: 'Nominated 5 times for the Nobel Peace Prize but never awarded. Traveled third class on Indian Railways throughout his campaigns.',
        quote: 'Be the change that you wish to see in the world.'
    },
    {
        id: 'netaji',
        name: 'Subhas Chandra Bose',
        title: 'Netaji',
        lifespan: '1897 – 1945',
        era: 'Revolutionary',
        region: 'East',
        birthplace: 'Cuttack, Odisha',
        movements: ['Indian National Army (INA / Azad Hind Fauj)', 'Forward Bloc', 'Non-Cooperation'],
        biography: 'Netaji Subhas Chandra Bose was a charismatic revolutionary nationalist who established the Azad Hind Government and led the Indian National Army to fight British colonial rule militarily during WWII.',
        timeline: [
            { year: '1920', event: 'Ranked 4th in Indian Civil Services (ICS) exam but resigned to join freedom struggle.' },
            { year: '1938', event: 'Elected President of Indian National Congress at Haripura.' },
            { year: '1941', event: 'Daring submarine escape from British house arrest to Berlin and Japan.' },
            { year: '1943', event: 'Proclaimed Provisional Government of Free India in Singapore.' }
        ],
        contributions: 'Formed Azad Hind Fauj (INA) including Rani of Jhansi women\'s regiment; gave immortal slogans "Give me blood, and I shall give you freedom!" and "Jai Hind!".',
        rareFacts: 'Established India\'s first national planning committee in 1938 and formed the first all-women combat regiment (Rani of Jhansi Regiment).',
        quote: 'Give me blood, and I will give you freedom!'
    },
    {
        id: 'bhagat-singh',
        name: 'Bhagat Singh',
        title: 'Shaheed-e-Azam',
        lifespan: '1907 – 1931',
        era: 'Revolutionary',
        region: 'North',
        birthplace: 'Banga, Punjab (now Pakistan)',
        movements: ['Hindustan Socialist Republican Association (HSRA)', 'Naujawan Bharat Sabha'],
        biography: 'Bhagat Singh was a legendary revolutionary socialist whose martyrdom at age 23 galvanized youth across India to join the freedom movement.',
        timeline: [
            { year: '1926', event: 'Founded Naujawan Bharat Sabha to foster youth revolutionary consciousness.' },
            { year: '1928', event: 'Avenged Lala Lajpat Rai\'s death in Saunders action alongside Rajguru & Sukhdev.' },
            { year: '1929', event: 'Threw non-lethal bombs in Central Legislative Assembly to "make the deaf hear".' },
            { year: '1931', event: 'Martyred by hanging in Lahore Jail on March 23 alongside Rajguru and Sukhdev.' }
        ],
        contributions: 'Infused socialist ideology into freedom movement; popularized the rallying cry "Inquilab Zindabad!" (Long Live the Revolution).',
        rareFacts: 'Observed a historic 63-day hunger strike in Lahore Jail demanding equal rights for Indian political prisoners.',
        quote: 'They may kill me, but they cannot kill my ideas.'
    },
    {
        id: 'rani-lakshmibai',
        name: 'Rani Lakshmibai',
        title: 'Rani of Jhansi',
        lifespan: '1828 – 1858',
        era: '1857 Revolt',
        region: 'Central',
        birthplace: 'Varanasi, Uttar Pradesh',
        movements: ['1857 First War of Indian Independence'],
        biography: 'Rani Lakshmibai was the courageous queen of the princely state of Jhansi who became a leading figure and symbol of resistance during the 1857 Rebellion.',
        timeline: [
            { year: '1853', event: 'Opposed Lord Dalhousie\'s unjust "Doctrine of Lapse" annexing Jhansi.' },
            { year: '1857', event: 'Assumed command of Jhansi forces defying British siege.' },
            { year: '1858', event: 'Fought valiantly at Gwalior Fort strapped with her adopted son Damodar Rao.' }
        ],
        contributions: 'Symbolized fearless armed resistance against British East India Company imperial expansionism; inspired future generations of female revolutionaries.',
        rareFacts: 'British General Hugh Rose praised her as "personally the smartest and bravest military leader of the rebels".',
        quote: 'I will not give up my Jhansi!'
    },
    {
        id: 'patel',
        name: 'Sardar Vallabhbhai Patel',
        title: 'Iron Man of India',
        lifespan: '1875 – 1950',
        era: 'Gandhian Era',
        region: 'West',
        birthplace: 'Nadiad, Gujarat',
        movements: ['Kheda Satyagraha', 'Bardoli Satyagraha', 'Quit India Movement'],
        biography: 'Sardar Patel was a barrister and statesman who served as India\'s first Deputy Prime Minister and Home Minister, masterminding the peaceful integration of 565 princely states into unified India.',
        timeline: [
            { year: '1918', event: 'Led Kheda peasant satyagraha securing tax relief during famine.' },
            { year: '1928', event: 'Earned title "Sardar" (Leader) during victorious Bardoli Satyagraha.' },
            { year: '1947', event: 'Integrated 565 princely states into the Indian Union within two years.' }
        ],
        contributions: 'Architect of United India; created All India Services (IAS/IPS) termed the "Steel Frame of India".',
        rareFacts: 'The Statue of Unity in Gujarat honoring Sardar Patel stands 182 meters high, making it the tallest statue in the world.',
        quote: 'Manpower without unity is not a strength unless it is harmonized and united properly.'
    },
    {
        id: 'azad',
        name: 'Chandrashekhar Azad',
        title: 'Azad',
        lifespan: '1906 – 1931',
        era: 'Revolutionary',
        region: 'North',
        birthplace: 'Bhabhra, Madhya Pradesh',
        movements: ['Kakori Conspiracy', 'Hindustan Socialist Republican Association (HSRA)'],
        biography: 'Chandrashekhar Azad was a fierce revolutionary strategist and mentor to Bhagat Singh who vowed never to be captured alive by the British police.',
        timeline: [
            { year: '1921', event: 'Joined Non-Cooperation Movement at age 15 and adopted the name "Azad" (Free).' },
            { year: '1925', event: 'Executed Kakori train robbery to fund revolutionary weapon purchases.' },
            { year: '1931', event: 'Fought solo gun battle against police at Alfred Park, Allahabad, fulfilling his pledge of remaining free.' }
        ],
        contributions: 'Reorganized HSRA into a formidable armed movement for socialist liberation; mentored young revolutionaries across North India.',
        rareFacts: 'Alfred Park in Prayagraj was renamed Chandrashekhar Azad Park in honor of his supreme sacrifice.',
        quote: 'We will face the bullets of the enemies. We have been free and will remain free!'
    },
    {
        id: 'sarojini-naidu',
        name: 'Sarojini Naidu',
        title: 'Nightingale of India',
        lifespan: '1879 – 1949',
        era: 'Gandhian Era',
        region: 'South',
        birthplace: 'Hyderabad, Telangana',
        movements: ['Dharasana Satyagraha', 'Civil Disobedience', 'Quit India Movement'],
        biography: 'Sarojini Naidu was a renowned poet, orator, feminist leader, and Indian independence activist who became the first female President of Indian National Congress and first female Governor of an Indian state.',
        timeline: [
            { year: '1914', event: 'Met Mahatma Gandhi in London and dedicated her life to national freedom.' },
            { year: '1925', event: 'Presided over Kanpur session of Indian National Congress (1st Indian woman INC president).' },
            { year: '1930', event: 'Led Dharasana Salt Works satyagraha after Gandhi\'s arrest.' },
            { year: '1947', event: 'Appointed Governor of United Provinces (now Uttar Pradesh).' }
        ],
        contributions: 'Pioneered women\'s suffrage and equal rights in India; published acclaimed poetry collections including "The Golden Threshold".',
        rareFacts: 'Her birthday (February 13) is celebrated annually across India as National Women\'s Day.',
        quote: 'A country\'s greatness lies in its undying ideals of love and sacrifice that inspire the mothers of the race.'
    },
    {
        id: 'tilak',
        name: 'Bal Gangadhar Tilak',
        title: 'Lokmanya',
        lifespan: '1856 – 1920',
        era: 'Early Nationalist',
        region: 'West',
        birthplace: 'Ratnagiri, Maharashtra',
        movements: ['All India Home Rule League', 'Swadeshi Movement'],
        biography: 'Bal Gangadhar Tilak was a scholar, mathematician, journalist, and nationalist leader whom British authorities called "The Father of the Indian Unrest".',
        timeline: [
            { year: '1881', event: 'Founded radical nationalist newspapers Kesari (Marathi) and Mahratta (English).' },
            { year: '1893', event: 'Transformed Ganesh Chaturthi into a public community festival to mobilize nationalist unity.' },
            { year: '1916', event: 'Founded Indian Home Rule League and orchestrated Lucknow Pact between Congress & Muslim League.' }
        ],
        contributions: 'Gave the iconic rallying slogan "Swaraj is my birthright and I shall have it!"; popularized Swadeshi goods and boycott of foreign textiles.',
        rareFacts: 'Wrote the profound philosophical commentary "Gita Rahasya" while serving 6 years solitary imprisonment in Mandalay Prison, Myanmar.',
        quote: 'Swaraj is my birthright and I shall have it!'
    },
    {
        id: 'ambedkar',
        name: 'Dr. B.R. Ambedkar',
        title: 'Babasaheb',
        lifespan: '1891 – 1956',
        era: 'Gandhian Era',
        region: 'West',
        birthplace: 'Mhow, Madhya Pradesh',
        movements: ['Mahad Satyagraha', 'Depressed Classes Movement', 'Constituent Assembly'],
        biography: 'Dr. Bhimrao Ramji Ambedkar was a polymath, jurist, economist, and social reformer who campaigned against social discrimination and served as Chairman of the Drafting Committee of the Indian Constitution.',
        timeline: [
            { year: '1927', event: 'Led historic Mahad Satyagraha asserting Dalits\' rights to public water sources.' },
            { year: '1932', event: 'Signed Poona Pact securing reserved seats for depressed classes in legislatures.' },
            { year: '1947', event: 'Appointed India\'s first Law Minister and Chairman of Constitution Drafting Committee.' }
        ],
        contributions: 'Architect of the Constitution of India guaranteeing fundamental rights, gender equality, and affirmative action; founder of Reserve Bank of India conceptual blueprint.',
        rareFacts: 'Doctorates from Columbia University and London School of Economics; possessed a personal library of over 50,000 books.',
        quote: 'Educate, Agitate, Organize.'
    }
];

function filterFreedomFighters(data, search = '', era = 'all', region = 'all') {
    const s = search.trim().toLowerCase();
    return data.filter(item => {
        const matchesSearch = !s ||
            item.name.toLowerCase().includes(s) ||
            item.title.toLowerCase().includes(s) ||
            item.quote.toLowerCase().includes(s) ||
            item.birthplace.toLowerCase().includes(s) ||
            item.movements.some(m => m.toLowerCase().includes(s));

        const matchesEra = era === 'all' || item.era === era;
        const matchesRegion = region === 'all' || item.region === region;

        return matchesSearch && matchesEra && matchesRegion;
    });
}

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('ff-search-input');
        const clearBtn = document.getElementById('clear-search');
        const eraFilter = document.getElementById('era-filter');
        const regionFilter = document.getElementById('region-filter');
        const ffGrid = document.getElementById('ff-grid');
        const ffModal = document.getElementById('ff-modal');
        const modalBody = document.getElementById('modal-body');
        const modalCloseBtn = document.getElementById('modal-close-btn');

        // Quote Spotlight Carousel
        const quoteText = document.getElementById('quote-text');
        const quoteAuthor = document.getElementById('quote-author');
        let currentQuoteIdx = 0;

        function rotateQuote() {
            if (!quoteText || !quoteAuthor) return;
            const currentObj = FREEDOM_FIGHTERS_DATA[currentQuoteIdx];
            quoteText.textContent = `"${currentObj.quote}"`;
            quoteAuthor.textContent = `\u2014 ${currentObj.title} ${currentObj.name}`;
            currentQuoteIdx = (currentQuoteIdx + 1) % FREEDOM_FIGHTERS_DATA.length;
        }

        setInterval(rotateQuote, 6000);

        function renderGrid(items) {
            if (!ffGrid) return;
            if (items.length === 0) {
                ffGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--ff-text-secondary);">
                        <h3>No Freedom Fighters found matching your search.</h3>
                        <p>Try resetting filters or search keywords.</p>
                    </div>
                `;
                return;
            }

            ffGrid.innerHTML = items.map(item => `
                <div class="ff-card" data-id="${item.id}" tabindex="0" role="button" aria-label="View biography of ${item.name}">
                    <div>
                        <span class="ff-era-badge">${item.era}</span>
                        <div class="ff-card-header">
                            <div class="ff-avatar">🇮🇳</div>
                            <div class="ff-title-box">
                                <h3>${item.name}</h3>
                                <p>${item.title} (${item.lifespan})</p>
                            </div>
                        </div>
                        <p class="ff-bio-snippet">${item.biography.substring(0, 140)}...</p>
                        <div class="ff-movements-tags">
                            ${item.movements.map(m => `<span class="tag-movement">${m}</span>`).join('')}
                        </div>
                    </div>
                    <div class="ff-card-footer">
                        <span>📍 ${item.birthplace}</span>
                        <span>Read Full Bio &rarr;</span>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.ff-card').forEach(card => {
                const openModal = () => {
                    const id = card.getAttribute('data-id');
                    const ffObj = FREEDOM_FIGHTERS_DATA.find(f => f.id === id);
                    if (ffObj) showModal(ffObj);
                };
                card.addEventListener('click', openModal);
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal();
                    }
                });
            });
        }

        function showModal(ff) {
            if (!ffModal || !modalBody) return;
            modalBody.innerHTML = `
                <div class="modal-header-flex">
                    <div class="modal-avatar">🇮🇳</div>
                    <div>
                        <span class="ff-era-badge">${ff.era}</span>
                        <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.2rem;">${ff.name}</h2>
                        <p style="color: var(--ff-gold); font-size: 1.1rem; font-weight: 600;">"${ff.title}" (${ff.lifespan})</p>
                    </div>
                </div>

                <div style="font-size: 1.05rem; line-height: 1.65; color: var(--ff-text-primary); margin-bottom: 1.2rem;">
                    <strong>Biography:</strong> ${ff.biography}
                </div>

                <div class="modal-section-title">Key Timeline & Milestones</div>
                <div class="timeline-list">
                    ${ff.timeline.map(t => `
                        <div class="timeline-item">
                            <strong>${t.year}:</strong> ${t.event}
                        </div>
                    `).join('')}
                </div>

                <div class="modal-section-title">Major Contributions & Movements</div>
                <p style="color: var(--ff-text-secondary); line-height: 1.6;">${ff.contributions}</p>

                <div class="rare-fact-box">
                    <strong>💡 Rare Historical Fact:</strong> ${ff.rareFacts}
                </div>

                <div style="margin-top: 1.2rem; padding: 1rem; border-radius: 10px; background: rgba(0,0,0,0.3); border-left: 3px solid var(--ff-gold);">
                    <em style="color: var(--ff-gold); font-size: 1.05rem;">"${ff.quote}"</em>
                </div>
            `;
            ffModal.classList.remove('hidden');
        }

        function updateView() {
            const searchVal = searchInput ? searchInput.value : '';
            const eraVal = eraFilter ? eraFilter.value : 'all';
            const regionVal = regionFilter ? regionFilter.value : 'all';

            if (clearBtn) {
                if (searchVal) clearBtn.classList.remove('hidden');
                else clearBtn.classList.add('hidden');
            }

            const filtered = filterFreedomFighters(FREEDOM_FIGHTERS_DATA, searchVal, eraVal, regionVal);
            renderGrid(filtered);
        }

        if (searchInput) searchInput.addEventListener('input', updateView);
        if (eraFilter) eraFilter.addEventListener('change', updateView);
        if (regionFilter) regionFilter.addEventListener('change', updateView);

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                updateView();
            });
        }

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                if (ffModal) ffModal.classList.add('hidden');
            });
        }

        if (ffModal) {
            ffModal.addEventListener('click', (e) => {
                if (e.target === ffModal) ffModal.classList.add('hidden');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && ffModal && !ffModal.classList.contains('hidden')) {
                ffModal.classList.add('hidden');
            }
        });

        updateView();
    });
}

if (typeof module !== 'undefined') {
    module.exports = {
        FREEDOM_FIGHTERS_DATA,
        filterFreedomFighters
    };
}
