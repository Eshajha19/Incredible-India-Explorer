/**
 * General Elections Timeline Data & Application Logic
 */

const GENERAL_ELECTIONS_DATA = [
    {
        id: '1st-lok-sabha',
        year: 1951,
        yearDisplay: '1951–52',
        lokSabha: '1st Lok Sabha',
        decade: '1950s',
        winningParty: 'INC (Congress)',
        partyCategory: 'INC',
        pm: 'Jawaharlal Nehru',
        turnout: 45.7,
        totalSeats: 489,
        seatsWon: 364,
        majorIssues: 'First universal adult suffrage election post-independence, state building, refugee rehabilitation, and 5-Year Plan framework.',
        coalitionDetails: 'Absolute majority for Indian National Congress; Jawaharlal Nehru formed India\'s first democratically elected government.',
        keyHighlights: 'Massive logistic victory conducting democratic elections across 173 million voters, majority illiterate, using ballot box symbols.'
    },
    {
        id: '2nd-lok-sabha',
        year: 1957,
        yearDisplay: '1957',
        lokSabha: '2nd Lok Sabha',
        decade: '1950s',
        winningParty: 'INC (Congress)',
        partyCategory: 'INC',
        pm: 'Jawaharlal Nehru',
        turnout: 45.4,
        totalSeats: 494,
        seatsWon: 371,
        majorIssues: 'States Reorganisation Act (1956), industrialization, dams (Bhakra Nangal), and non-aligned foreign policy.',
        coalitionDetails: 'INC maintained overwhelming two-thirds majority under Nehru.',
        keyHighlights: 'CPI emerged as main opposition party and formed world\'s first democratically elected communist state government in Kerala.'
    },
    {
        id: '3rd-lok-sabha',
        year: 1962,
        yearDisplay: '1962',
        lokSabha: '3rd Lok Sabha',
        decade: '1960s',
        winningParty: 'INC (Congress)',
        partyCategory: 'INC',
        pm: 'Jawaharlal Nehru / Lal Bahadur Shastri',
        turnout: 55.4,
        totalSeats: 494,
        seatsWon: 361,
        majorIssues: 'Third 5-Year Plan, Sino-Indian border dispute tension, food grain self-sufficiency.',
        coalitionDetails: 'INC single party majority. Nehru passed away in 1964; Lal Bahadur Shastri succeeded as Prime Minister.',
        keyHighlights: 'Lal Bahadur Shastri coined famous slogan "Jai Jawan Jai Kisan" during 1965 war and Green Revolution inception.'
    },
    {
        id: '4th-lok-sabha',
        year: 1967,
        yearDisplay: '1967',
        lokSabha: '4th Lok Sabha',
        decade: '1960s',
        winningParty: 'INC (Congress)',
        partyCategory: 'INC',
        pm: 'Indira Gandhi',
        turnout: 61.3,
        totalSeats: 520,
        seatsWon: 283,
        majorIssues: 'Severe droughts, rupee devaluation (1966), rising food prices, non-Congress Samyukta Vidhayak Dal coalitions in states.',
        coalitionDetails: 'INC won reduced majority; Indira Gandhi formed government facing internal Syndicate opposition.',
        keyHighlights: 'First electoral setback for Congress in 8 states; marked rise of strong regional anti-Congress political alliances.'
    },
    {
        id: '5th-lok-sabha',
        year: 1971,
        yearDisplay: '1971',
        lokSabha: '5th Lok Sabha',
        decade: '1970s',
        winningParty: 'INC (Congress R)',
        partyCategory: 'INC',
        pm: 'Indira Gandhi',
        turnout: 55.3,
        totalSeats: 518,
        seatsWon: 352,
        majorIssues: '"Garibi Hatao" (Abolish Poverty) slogan, Bank Nationalisation, abolition of Privy Purses.',
        coalitionDetails: 'Indira Gandhi\'s INC(R) achieved landslide victory defeating Grand Alliance opposition coalition.',
        keyHighlights: 'Followed by 1971 Bangladesh Liberation War and Shimla Agreement; solidified Indira Gandhi\'s supremacy.'
    },
    {
        id: '6th-lok-sabha',
        year: 1977,
        yearDisplay: '1977',
        lokSabha: '6th Lok Sabha',
        decade: '1970s',
        winningParty: 'Janata Party',
        partyCategory: 'Janata Party / Third Front',
        pm: 'Morarji Desai / Charan Singh',
        turnout: 60.5,
        totalSeats: 542,
        seatsWon: 295,
        majorIssues: 'Revocation of 1975-77 Emergency, civil liberties restoration, anti-authoritarian mandate.',
        coalitionDetails: 'First non-Congress central government formed by Janata Party umbrella coalition led by Morarji Desai.',
        keyHighlights: 'Historic election where sitting PM Indira Gandhi lost her seat in Rae Bareli; restored democratic fundamental rights.'
    },
    {
        id: '7th-lok-sabha',
        year: 1980,
        yearDisplay: '1980',
        lokSabha: '7th Lok Sabha',
        decade: '1980s',
        winningParty: 'INC (Congress I)',
        partyCategory: 'INC',
        pm: 'Indira Gandhi',
        turnout: 56.9,
        totalSeats: 529,
        seatsWon: 353,
        majorIssues: 'Collapse of Janata Party internal coalition disputes, stability demand, inflation control.',
        coalitionDetails: 'Indira Gandhi returned to power with decisive landslide two-thirds majority.',
        keyHighlights: 'Restored political stability; hosted 1982 Asian Games and Asian diplomatic resurgence.'
    },
    {
        id: '8th-lok-sabha',
        year: 1984,
        yearDisplay: '1984',
        lokSabha: '8th Lok Sabha',
        decade: '1980s',
        winningParty: 'INC (Congress)',
        partyCategory: 'INC',
        pm: 'Rajiv Gandhi',
        turnout: 64.0,
        totalSeats: 514,
        seatsWon: 404,
        majorIssues: 'Assassination of Indira Gandhi, national unity wave, modernization, IT & telecom revolution.',
        coalitionDetails: 'Highest ever seat tally (404/514 seats) in Indian parliamentary history won by Congress under Rajiv Gandhi.',
        keyHighlights: 'Introduced telecom revolution, lowered voting age from 21 to 18, and initiated computerization.'
    },
    {
        id: '9th-lok-sabha',
        year: 1989,
        yearDisplay: '1989',
        lokSabha: '9th Lok Sabha',
        decade: '1980s',
        winningParty: 'National Front (Janata Dal)',
        partyCategory: 'Janata Party / Third Front',
        pm: 'V.P. Singh / Chandra Shekhar',
        turnout: 62.0,
        totalSeats: 543,
        seatsWon: 143,
        majorIssues: 'Bofors corruption allegations, Mandal Commission implementation, Ram Janmabhoomi movement.',
        coalitionDetails: 'National Front minority government led by V.P. Singh supported from outside by both BJP and Left Front.',
        keyHighlights: 'Marked commencement of coalition era in Indian central government politics; Mandal Commission reservation for OBCs.'
    },
    {
        id: '10th-lok-sabha',
        year: 1991,
        yearDisplay: '1991',
        lokSabha: '10th Lok Sabha',
        decade: '1990s',
        winningParty: 'INC (Congress)',
        partyCategory: 'INC',
        pm: 'P. V. Narasimha Rao',
        turnout: 56.7,
        totalSeats: 543,
        seatsWon: 232,
        majorIssues: 'Balance of Payments economic crisis, assassination of Rajiv Gandhi during campaign, LPG (Liberalisation, Privatisation, Globalisation).',
        coalitionDetails: 'Minority Congress government led by P.V. Narasimha Rao with Dr. Manmohan Singh as Finance Minister.',
        keyHighlights: 'Historic 1991 Economic Reforms unleashing market liberalization, ending License Raj.'
    },
    {
        id: '11th-lok-sabha',
        year: 1996,
        yearDisplay: '1996',
        lokSabha: '11th Lok Sabha',
        decade: '1990s',
        winningParty: 'BJP (Single Largest) / United Front',
        partyCategory: 'Janata Party / Third Front',
        pm: 'A.B. Vajpayee / H.D. Deve Gowda / I.K. Gujral',
        turnout: 57.9,
        totalSeats: 543,
        seatsWon: 161,
        majorIssues: 'Hung parliament, regional party ascension, coalition volatility.',
        coalitionDetails: 'Vajpayee\'s 13-day BJP government followed by United Front coalition supported by Congress from outside.',
        keyHighlights: 'Demonstrated rising strength of regional parties (DMK, TDP, SP, RJD) in central government formation.'
    },
    {
        id: '12th-lok-sabha',
        year: 1998,
        yearDisplay: '1998',
        lokSabha: '12th Lok Sabha',
        decade: '1990s',
        winningParty: 'BJP / NDA',
        partyCategory: 'BJP / NDA',
        pm: 'Atal Bihari Vajpayee',
        turnout: 61.9,
        totalSeats: 543,
        seatsWon: 182,
        majorIssues: 'Pokhran-II nuclear tests, national security, economic sanctions.',
        coalitionDetails: 'National Democratic Alliance (NDA) government led by Vajpayee; lasted 13 months before losing confidence vote by 1 vote.',
        keyHighlights: 'Pokhran-II nuclear weapons tests establishing India as a declared nuclear weapons state.'
    },
    {
        id: '13th-lok-sabha',
        year: 1999,
        yearDisplay: '1999',
        lokSabha: '1999',
        decade: '1990s',
        winningParty: 'BJP / NDA',
        partyCategory: 'BJP / NDA',
        pm: 'Atal Bihari Vajpayee',
        turnout: 59.9,
        totalSeats: 543,
        seatsWon: 182,
        majorIssues: 'Kargil War victory, Golden Quadrilateral highways, Telecom Policy 1999.',
        coalitionDetails: 'First non-Congress coalition government to complete a full 5-year term in office.',
        keyHighlights: 'Golden Quadrilateral National Highway project and Sarva Shiksha Abhiyan literacy drive.'
    },
    {
        id: '14th-lok-sabha',
        year: 2004,
        yearDisplay: '2004',
        lokSabha: '14th Lok Sabha',
        decade: '2000s',
        winningParty: 'UPA (Congress)',
        partyCategory: 'UPA',
        pm: 'Dr. Manmohan Singh',
        turnout: 58.1,
        totalSeats: 543,
        seatsWon: 145,
        majorIssues: '"India Shining" debate vs rural distress, MGNREGA social security, inclusive growth.',
        coalitionDetails: 'United Progressive Alliance (UPA) formed with outside support of Left Front; Dr. Manmohan Singh appointed PM.',
        keyHighlights: 'Enactment of Right to Information (RTI) Act 2005 and MGNREGA rural employment guarantee.'
    },
    {
        id: '15th-lok-sabha',
        year: 2009,
        yearDisplay: '2009',
        lokSabha: '15th Lok Sabha',
        decade: '2000s',
        winningParty: 'UPA (Congress)',
        partyCategory: 'UPA',
        pm: 'Dr. Manmohan Singh',
        turnout: 58.2,
        totalSeats: 543,
        seatsWon: 206,
        majorIssues: 'Indo-US Civil Nuclear Deal endorsement, high GDP growth rate, welfare rights legislation.',
        coalitionDetails: 'UPA-II government formed with enhanced Congress seat share (206 seats).',
        keyHighlights: 'Right to Education (RTE) Act passed and Aadhaar digital identity infrastructure launched.'
    },
    {
        id: '16th-lok-sabha',
        year: 2014,
        yearDisplay: '2014',
        lokSabha: '16th Lok Sabha',
        decade: '2010s',
        winningParty: 'BJP / NDA',
        partyCategory: 'BJP / NDA',
        pm: 'Narendra Modi',
        turnout: 66.4,
        totalSeats: 543,
        seatsWon: 282,
        majorIssues: 'Anti-corruption movement, economic development mandate, "Sabka Saath Sabka Vikas".',
        coalitionDetails: 'BJP achieved first single-party majority in 30 years (282 seats); Narendra Modi sworn in as PM.',
        keyHighlights: 'Record 66.4% turnout; introduced Jan Dhan Accounts, Make in India, Digital India, and GST legislation.'
    },
    {
        id: '17th-lok-sabha',
        year: 2019,
        yearDisplay: '2019',
        lokSabha: '17th Lok Sabha',
        decade: '2010s',
        winningParty: 'BJP / NDA',
        partyCategory: 'BJP / NDA',
        pm: 'Narendra Modi',
        turnout: 67.4,
        totalSeats: 543,
        seatsWon: 303,
        majorIssues: 'National security, Balakot airstrike, PM-KISAN, welfare delivery schemes.',
        coalitionDetails: 'BJP expanded single-party majority to 303 seats; NDA alliance total reached 353 seats.',
        keyHighlights: 'Highest voter turnout in Indian history (67.4%); record women voter participation; Article 370 abrogation.'
    },
    {
        id: '18th-lok-sabha',
        year: 2024,
        yearDisplay: '2024',
        lokSabha: '18th Lok Sabha',
        decade: '2020s',
        winningParty: 'BJP / NDA',
        partyCategory: 'BJP / NDA',
        pm: 'Narendra Modi',
        turnout: 65.8,
        totalSeats: 543,
        seatsWon: 240,
        majorIssues: 'Employment, constitutional protections, economic roadmap 2047, INDIA alliance challenge.',
        coalitionDetails: 'NDA coalition formed government with 293 total seats; Narendra Modi sworn in for historic 3rd consecutive term.',
        keyHighlights: '968 million registered voters; largest electoral exercise in human history utilizing 5.5 million EVMs.'
    }
];

function filterElectionsData(data, search = '', decade = 'all', party = 'all') {
    const s = search.trim().toLowerCase();
    return data.filter(item => {
        const matchesSearch = !s ||
            item.yearDisplay.toLowerCase().includes(s) ||
            item.lokSabha.toLowerCase().includes(s) ||
            item.pm.toLowerCase().includes(s) ||
            item.winningParty.toLowerCase().includes(s) ||
            item.majorIssues.toLowerCase().includes(s);

        const matchesDecade = decade === 'all' || item.decade === decade;
        const matchesParty = party === 'all' || item.partyCategory === party;

        return matchesSearch && matchesDecade && matchesParty;
    });
}

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('election-search-input');
        const clearBtn = document.getElementById('clear-search');
        const decadeFilter = document.getElementById('decade-filter');
        const partyFilter = document.getElementById('party-filter');
        const timelineList = document.getElementById('timeline-list');
        const turnoutBarChart = document.getElementById('turnout-bar-chart');
        const electionModal = document.getElementById('election-modal');
        const modalBody = document.getElementById('modal-body');
        const modalCloseBtn = document.getElementById('modal-close-btn');

        function renderTurnoutChart() {
            if (!turnoutBarChart) return;
            const maxTurnout = 75; // percentage ceiling
            turnoutBarChart.innerHTML = GENERAL_ELECTIONS_DATA.map(el => {
                const heightPct = (el.turnout / maxTurnout) * 100;
                return `
                    <div class="chart-bar-col" data-id="${el.id}" title="${el.lokSabha} (${el.yearDisplay}): ${el.turnout}% Turnout">
                        <div class="chart-bar-fill" style="height: ${heightPct}%;">
                            <span class="bar-turnout-val">${el.turnout}%</span>
                        </div>
                        <span class="chart-bar-label">'${String(el.year).slice(2)}</span>
                    </div>
                `;
            }).join('');

            document.querySelectorAll('.chart-bar-col').forEach(bar => {
                bar.addEventListener('click', () => {
                    const id = bar.getAttribute('data-id');
                    const elObj = GENERAL_ELECTIONS_DATA.find(e => e.id === id);
                    if (elObj) showModal(elObj);
                });
            });
        }

        function renderTimeline(items) {
            if (!timelineList) return;
            if (items.length === 0) {
                timelineList.innerHTML = `
                    <div style="text-align: center; padding: 3rem; color: var(--el-text-secondary);">
                        <h3>No Lok Sabha elections found matching your search.</h3>
                        <p>Try adjusting your search query or filter options.</p>
                    </div>
                `;
                return;
            }

            timelineList.innerHTML = items.map(item => `
                <div class="election-card" data-id="${item.id}" tabindex="0" role="button" aria-label="View election details for ${item.lokSabha}">
                    <div class="election-badge-col">
                        <div class="election-year">${item.yearDisplay}</div>
                        <div class="election-ls">${item.lokSabha}</div>
                    </div>

                    <div class="election-main-col">
                        <h3>${item.winningParty}</h3>
                        <div class="election-pm-line">Prime Minister: ${item.pm}</div>
                        
                        <div class="election-metrics">
                            <span>Voter Turnout: <strong>${item.turnout}%</strong></span>
                            <span>Seats Won: <strong>${item.seatsWon} / ${item.totalSeats}</strong></span>
                            <span>Decade: <strong>${item.decade}</strong></span>
                        </div>

                        <p class="election-issues-preview">
                            <strong>Key Mandate & Issues:</strong> ${item.majorIssues}
                        </p>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.election-card').forEach(card => {
                const openModal = () => {
                    const id = card.getAttribute('data-id');
                    const elObj = GENERAL_ELECTIONS_DATA.find(e => e.id === id);
                    if (elObj) showModal(elObj);
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

        function showModal(el) {
            if (!electionModal || !modalBody) return;
            modalBody.innerHTML = `
                <div class="modal-header-box">
                    <h2>${el.lokSabha} General Election (${el.yearDisplay})</h2>
                    <p>Prime Minister Appointed: ${el.pm}</p>
                </div>

                <div class="modal-stats-row">
                    <div class="modal-stat-card">
                        <span>Winning Party / Alliance</span>
                        <strong>${el.winningParty}</strong>
                    </div>
                    <div class="modal-stat-card">
                        <span>Voter Turnout</span>
                        <strong>${el.turnout}%</strong>
                    </div>
                    <div class="modal-stat-card">
                        <span>Seats Tally</span>
                        <strong>${el.seatsWon} / ${el.totalSeats}</strong>
                    </div>
                    <div class="modal-stat-card">
                        <span>Decade</span>
                        <strong>${el.decade}</strong>
                    </div>
                </div>

                <div class="modal-section-h4">Major Campaign Themes & National Issues</div>
                <p style="color: var(--el-text-secondary); line-height: 1.65; margin-bottom: 1rem;">${el.majorIssues}</p>

                <div class="modal-section-h4">Coalition Dynamics & Mandate</div>
                <p style="color: var(--el-text-secondary); line-height: 1.65; margin-bottom: 1rem;">${el.coalitionDetails}</p>

                <div class="modal-section-h4">Historical Significance & Governance Milestones</div>
                <div style="padding: 1rem; border-radius: 10px; background: rgba(2, 132, 199, 0.12); border-left: 4px solid var(--el-blue); color: var(--el-text-primary);">
                    🏛️ <strong>Key Landmark:</strong> ${el.keyHighlights}
                </div>
            `;
            electionModal.classList.remove('hidden');
        }

        function updateView() {
            const searchVal = searchInput ? searchInput.value : '';
            const decadeVal = decadeFilter ? decadeFilter.value : 'all';
            const partyVal = partyFilter ? partyFilter.value : 'all';

            if (clearBtn) {
                if (searchVal) clearBtn.classList.remove('hidden');
                else clearBtn.classList.add('hidden');
            }

            const filtered = filterElectionsData(GENERAL_ELECTIONS_DATA, searchVal, decadeVal, partyVal);
            renderTimeline(filtered);
        }

        if (searchInput) searchInput.addEventListener('input', updateView);
        if (decadeFilter) decadeFilter.addEventListener('change', updateView);
        if (partyFilter) partyFilter.addEventListener('change', updateView);

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                updateView();
            });
        }

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                if (electionModal) electionModal.classList.add('hidden');
            });
        }

        if (electionModal) {
            electionModal.addEventListener('click', (e) => {
                if (e.target === electionModal) electionModal.classList.add('hidden');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && electionModal && !electionModal.classList.contains('hidden')) {
                electionModal.classList.add('hidden');
            }
        });

        renderTurnoutChart();
        updateView();
    });
}

if (typeof module !== 'undefined') {
    module.exports = {
        GENERAL_ELECTIONS_DATA,
        filterElectionsData
    };
}
