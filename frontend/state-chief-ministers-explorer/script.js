/**
 * State Chief Ministers Explorer Data & Application Logic
 */

const CHIEF_MINISTERS_DATA = [
    {
        id: 'ap',
        state: 'Andhra Pradesh',
        cmName: 'N. Chandrababu Naidu',
        party: 'TDP',
        partyCategory: 'Regional',
        capital: 'Amaravati',
        region: 'South',
        tookOffice: 'June 2024',
        facts: [
            'Known as a pioneer of IT infrastructure and economic reforms in Andhra Pradesh.',
            'Served as the 4th Chief Minister of divided Andhra Pradesh.',
            'Promoted Green Field Mega City project for Amaravati capital.'
        ]
    },
    {
        id: 'ar',
        state: 'Arunachal Pradesh',
        cmName: 'Pema Khandu',
        party: 'BJP',
        partyCategory: 'BJP',
        capital: 'Itanagar',
        region: 'Northeast',
        tookOffice: 'July 2016',
        facts: [
            'One of India\'s youngest Chief Ministers when first assuming office in 2016.',
            'Championed border infrastructure and tourism development in Eastern Himalayas.',
            'Holds degree from Hindu College, Delhi University.'
        ]
    },
    {
        id: 'as',
        state: 'Assam',
        cmName: 'Himanta Biswa Sarma',
        party: 'BJP',
        partyCategory: 'BJP',
        capital: 'Dispur',
        region: 'Northeast',
        tookOffice: 'May 2021',
        facts: [
            'Serves as Convenor of North-East Democratic Alliance (NEDA).',
            'Over-saw major health and education infrastructure expansions across Northeast.',
            'Avid sports administrator and former President of Badminton Association of India.'
        ]
    },
    {
        id: 'br',
        state: 'Bihar',
        cmName: 'Nitish Kumar',
        party: 'JD(U)',
        partyCategory: 'Regional',
        capital: 'Patna',
        region: 'East',
        tookOffice: 'February 2015',
        facts: [
            'Longest-serving Chief Minister of Bihar with multiple terms.',
            'Spearheaded historic women reservation policies in local government and police force.',
            'Engineered railway reforms during stint as Union Railway Minister.'
        ]
    },
    {
        id: 'cg',
        state: 'Chhattisgarh',
        cmName: 'Vishnu Deo Sai',
        party: 'BJP',
        partyCategory: 'BJP',
        capital: 'Raipur',
        region: 'Central',
        tookOffice: 'December 2023',
        facts: [
            'First tribal Chief Minister of Chhattisgarh state.',
            'Former Union Minister of State for Steel and Mines.',
            'Initiated key welfare programs for forest dwellling communities.'
        ]
    },
    {
        id: 'dl',
        state: 'Delhi (NCT)',
        cmName: 'Atishi Marlena',
        party: 'AAP',
        partyCategory: 'AAP',
        capital: 'New Delhi',
        region: 'UT',
        tookOffice: 'September 2024',
        facts: [
            'Third female Chief Minister of Delhi.',
            'Spearheaded public education transformation and school reforms in Delhi.',
            'Oxford University Rhodes Scholar.'
        ]
    },
    {
        id: 'ga',
        state: 'Goa',
        cmName: 'Pramod Sawant',
        party: 'BJP',
        partyCategory: 'BJP',
        capital: 'Panaji',
        region: 'West',
        tookOffice: 'March 2019',
        facts: [
            'Ayurvedic medical practitioner by qualification.',
            'Former Speaker of the Goa Legislative Assembly.',
            'Promoted sustainable eco-tourism and digital connectivity across hinterland Goa.'
        ]
    },
    {
        id: 'gj',
        state: 'Gujarat',
        cmName: 'Bhupendra Patel',
        party: 'BJP',
        partyCategory: 'BJP',
        capital: 'Gandhinagar',
        region: 'West',
        tookOffice: 'September 2021',
        facts: [
            'Civil engineer by background with deep urban planning governance experience.',
            'Led major infrastructure projects under Ahmedabad Urban Development Authority (AUDA).',
            'Championed GIFT City international financial services hub expansion.'
        ]
    },
    {
        id: 'hr',
        state: 'Haryana',
        cmName: 'Nayab Singh Saini',
        party: 'BJP',
        partyCategory: 'BJP',
        capital: 'Chandigarh',
        region: 'North',
        tookOffice: 'March 2024',
        facts: [
            'Former Member of Parliament from Kurukshetra Lok Sabha constituency.',
            'Focuses on agricultural welfare reforms and sports infrastructure.',
            'Represented Haryana in state cabinet prior to CM appointment.'
        ]
    },
    {
        id: 'hp',
        state: 'Himachal Pradesh',
        cmName: 'Sukhvinder Singh Sukhu',
        party: 'INC',
        partyCategory: 'INC',
        capital: 'Shimla',
        region: 'North',
        tookOffice: 'December 2022',
        facts: [
            'Rose through student union politics to state leadership.',
            'Pioneered green state initiatives aiming for 100% renewable energy transition.',
            'Introduced Mukhyamantri Sukh-Ashray scheme for orphaned children.'
        ]
    },
    {
        id: 'jk',
        state: 'Jammu & Kashmir',
        cmName: 'Omar Abdullah',
        party: 'JKNC',
        partyCategory: 'Regional',
        capital: 'Srinagar / Jammu',
        region: 'UT',
        tookOffice: 'October 2024',
        facts: [
            'First Chief Minister of Union Territory of Jammu & Kashmir.',
            'Youngest Union Minister of State for External Affairs at age 29.',
            'Advocates statehood restoration and tourism development.'
        ]
    },
    {
        id: 'jh',
        state: 'Jharkhand',
        cmName: 'Hemant Soren',
        party: 'JMM',
        partyCategory: 'Regional',
        capital: 'Ranchi',
        region: 'East',
        tookOffice: 'December 2019',
        facts: [
            'Son of veteran leader Shibu Soren; leader of Jharkhand Mukti Morcha.',
            'Initiated universal pension scheme and forest rights empowerment.',
            'Promoted indigenous sports talent and tribal cultural preservation.'
        ]
    },
    {
        id: 'ka',
        state: 'Karnataka',
        cmName: 'Siddaramaiah',
        party: 'INC',
        partyCategory: 'INC',
        capital: 'Bengaluru',
        region: 'South',
        tookOffice: 'May 2023',
        facts: [
            'Presented record number of state budgets as Finance Minister and CM.',
            'Championed Ahinda social welfare movements and Guarantee schemes.',
            'Promoted Bengaluru tech startup ecosystem expansion.'
        ]
    },
    {
        id: 'kl',
        state: 'Kerala',
        cmName: 'Pinarayi Vijayan',
        party: 'CPI(M)',
        partyCategory: 'Regional',
        capital: 'Thiruvananthapuram',
        region: 'South',
        tookOffice: 'May 2016',
        facts: [
            'First Chief Minister of Kerala to win back-to-back re-elections in 40 years.',
            'Over-saw K-FON public internet project and health sector modernization.',
            'Longest-serving Politburo member from Kerala.'
        ]
    },
    {
        id: 'mp',
        state: 'Madhya Pradesh',
        cmName: 'Mohan Yadav',
        party: 'BJP',
        partyCategory: 'BJP',
        capital: 'Bhopal',
        region: 'Central',
        tookOffice: 'December 2023',
        facts: [
            'Former Higher Education Minister of Madhya Pradesh.',
            'Focuses on NEP 2020 rollout and cultural heritage tourism.',
            'Holds doctorate (Ph.D.) in Political Science.'
        ]
    },
    {
        id: 'mh',
        state: 'Maharashtra',
        cmName: 'Devendra Fadnavis',
        party: 'BJP',
        partyCategory: 'BJP',
        capital: 'Mumbai',
        region: 'West',
        tookOffice: 'December 2024',
        facts: [
            'Second youngest Mayor of Nagpur at age 27.',
            'Spearheaded Samruddhi Mahamarg expressway and Mumbai metro network expansion.',
            'Author of published books on state budgeting and governance.'
        ]
    },
    {
        id: 'mn',
        state: 'Manipur',
        cmName: 'N. Biren Singh',
        party: 'BJP',
        partyCategory: 'BJP',
        capital: 'Imphal',
        region: 'Northeast',
        tookOffice: 'March 2017',
        facts: [
            'Former national level football player who won Durand Cup with BSF team.',
            'Former investigative journalist and chief editor of Naharolgi Thoudang.',
            'Launched Go to Hills initiative for hill-valley integration.'
        ]
    },
    {
        id: 'ml',
        state: 'Meghalaya',
        cmName: 'Conrad Sangma',
        party: 'NPP',
        partyCategory: 'Regional',
        capital: 'Shillong',
        region: 'Northeast',
        tookOffice: 'March 2018',
        facts: [
            'President of National People\'s Party (NPP), first national party from Northeast.',
            'Wharton School of Business alumnus.',
            'Pioneered green economy, music, and youth entrepreneurship initiatives.'
        ]
    },
    {
        id: 'mz',
        state: 'Mizoram',
        cmName: 'Lalduhoma',
        party: 'ZPM',
        partyCategory: 'Regional',
        capital: 'Aizawl',
        region: 'Northeast',
        tookOffice: 'December 2023',
        facts: [
            'Former IPS officer who served in security details.',
            'Founder leader of Zoram People\'s Movement (ZPM).',
            'Focuses on anti-corruption and agricultural price minimum support.'
        ]
    },
    {
        id: 'nl',
        state: 'Nagaland',
        cmName: 'Neiphiu Rio',
        party: 'NDPP',
        partyCategory: 'Regional',
        capital: 'Kohima',
        region: 'Northeast',
        tookOffice: 'March 2018',
        facts: [
            'Serving 5th term as Chief Minister of Nagaland.',
            'Conceived world-famous Hornbill Festival celebrating Naga heritage.',
            'Played key role in Naga peace accords and regional diplomacy.'
        ]
    },
    {
        id: 'od',
        state: 'Odisha',
        cmName: 'Mohan Charan Majhi',
        party: 'BJP',
        partyCategory: 'BJP',
        capital: 'Bhubaneswar',
        region: 'East',
        tookOffice: 'June 2024',
        facts: [
            'Four-term MLA from Keonjhar tribal belt.',
            'Promotes mining revenue transparency and Odia cultural identity.',
            'First BJP Chief Minister of Odisha.'
        ]
    },
    {
        id: 'py',
        state: 'Puducherry',
        cmName: 'N. Rangasamy',
        party: 'AINRC',
        partyCategory: 'Regional',
        capital: 'Puducherry',
        region: 'UT',
        tookOffice: 'May 2021',
        facts: [
            'Founder of All India N.R. Congress.',
            'Served multiple terms as Chief Minister of Puducherry UT.',
            'Known for simplicity and direct grassroots voter accessibility.'
        ]
    },
    {
        id: 'pb',
        state: 'Punjab',
        cmName: 'Bhagwant Mann',
        party: 'AAP',
        partyCategory: 'AAP',
        capital: 'Chandigarh',
        region: 'North',
        tookOffice: 'March 2022',
        facts: [
            'Former popular satirist and two-term Lok Sabha MP from Sangrur.',
            'Introduced 30,000+ free electricity units and Aam Aadmi Clinics in Punjab.',
            'Focuses on industrial investment and anti-drug campaigns.'
        ]
    },
    {
        id: 'rj',
        state: 'Rajasthan',
        cmName: 'Bhajan Lal Sharma',
        party: 'BJP',
        partyCategory: 'BJP',
        capital: 'Jaipur',
        region: 'West',
        tookOffice: 'December 2023',
        facts: [
            'First-time MLA from Sanganer elected straight to Chief Ministership.',
            'Longstanding organizational administrator in Rajasthan.',
            'Focuses on Eastern Rajasthan Canal Project (ERCP) water security.'
        ]
    },
    {
        id: 'sk',
        state: 'Sikkim',
        cmName: 'Prem Singh Tamang',
        party: 'SKM',
        partyCategory: 'Regional',
        capital: 'Gangtok',
        region: 'Northeast',
        tookOffice: 'May 2019',
        facts: [
            'Founder of Sikkim Krantikari Morcha (SKM).',
            'Championed Sikkim 100% organic farming status and Himalayan ecology.',
            'Pioneered Aama Yojana for non-working mothers.'
        ]
    },
    {
        id: 'tn',
        state: 'Tamil Nadu',
        cmName: 'M. K. Stalin',
        party: 'DMK',
        partyCategory: 'Regional',
        capital: 'Chennai',
        region: 'South',
        tookOffice: 'May 2021',
        facts: [
            'Son of iconic Tamil leader M. Karunanidhi; President of DMK.',
            'Launched Naan Mudhalvan skill development & Chief Minister\'s Breakfast scheme.',
            'First directly elected Mayor of Chennai.'
        ]
    },
    {
        id: 'tg',
        state: 'Telangana',
        cmName: 'A. Revanth Reddy',
        party: 'INC',
        partyCategory: 'INC',
        capital: 'Hyderabad',
        region: 'South',
        tookOffice: 'December 2023',
        facts: [
            'Led Telangana Pradesh Congress Committee to decisive electoral victory.',
            'Focuses on 6 Guarantees including free bus travel for women.',
            'Championed Hyderabad Artificial Intelligence Hub masterplan.'
        ]
    },
    {
        id: 'tr',
        state: 'Tripura',
        cmName: 'Manik Saha',
        party: 'BJP',
        partyCategory: 'BJP',
        capital: 'Agartala',
        region: 'Northeast',
        tookOffice: 'May 2022',
        facts: [
            'Maxillofacial surgeon and professor of dental surgery.',
            'Former Rajya Sabha MP from Tripura.',
            'Focuses on health infrastructure, connectivity with Bangladesh, and IT parks.'
        ]
    },
    {
        id: 'up',
        state: 'Uttar Pradesh',
        cmName: 'Yogi Adityanath',
        party: 'BJP',
        partyCategory: 'BJP',
        capital: 'Lucknow',
        region: 'North',
        tookOffice: 'March 2017',
        facts: [
            'Five-term former Member of Parliament from Gorakhpur.',
            'Head Priest (Mahant) of Gorakhnath Math temple complex.',
            'Pioneered UP defense industrial corridor, expressway networks, and law & order reforms.'
        ]
    },
    {
        id: 'uk',
        state: 'Uttarakhand',
        cmName: 'Pushkar Singh Dhami',
        party: 'BJP',
        partyCategory: 'BJP',
        capital: 'Dehradun',
        region: 'North',
        tookOffice: 'July 2021',
        facts: [
            'Youngest Chief Minister of Uttarakhand state at age 45.',
            'Enacted India\'s first post-independence Uniform Civil Code (UCC).',
            'Pioneered stringent anti-cheating recruitment law.'
        ]
    },
    {
        id: 'wb',
        state: 'West Bengal',
        cmName: 'Mamata Banerjee',
        party: 'AITC',
        partyCategory: 'Regional',
        capital: 'Kolkata',
        region: 'East',
        tookOffice: 'May 2011',
        facts: [
            'First female Chief Minister of West Bengal.',
            'Founder and Chairperson of All India Trinamool Congress.',
            'Pioneered UN-awarded Kanyashree Prakalpa social welfare scheme.'
        ]
    }
];

function filterCMData(data, search = '', region = 'all', party = 'all') {
    const s = search.trim().toLowerCase();
    return data.filter(item => {
        const matchesSearch = !s ||
            item.state.toLowerCase().includes(s) ||
            item.cmName.toLowerCase().includes(s) ||
            item.party.toLowerCase().includes(s) ||
            item.capital.toLowerCase().includes(s);

        const matchesRegion = region === 'all' || item.region === region;
        const matchesParty = party === 'all' ||
            (party === 'BJP' && item.partyCategory === 'BJP') ||
            (party === 'INC' && item.partyCategory === 'INC') ||
            (party === 'AAP' && item.partyCategory === 'AAP') ||
            (party === 'Regional' && item.partyCategory === 'Regional');

        return matchesSearch && matchesRegion && matchesParty;
    });
}

function getPartyClass(partyCategory) {
    switch(partyCategory) {
        case 'BJP': return 'party-bjp';
        case 'INC': return 'party-inc';
        case 'AAP': return 'party-aap';
        default: return 'party-regional';
    }
}

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('cm-search-input');
        const clearBtn = document.getElementById('clear-search');
        const regionFilter = document.getElementById('region-filter');
        const partyFilter = document.getElementById('party-filter');
        const cmGrid = document.getElementById('cm-grid');
        const statsOverview = document.getElementById('stats-overview');
        const cmModal = document.getElementById('cm-modal');
        const modalBody = document.getElementById('modal-body');
        const modalCloseBtn = document.getElementById('modal-close-btn');

        function renderStats() {
            if (!statsOverview) return;
            const total = CHIEF_MINISTERS_DATA.length;
            const bjpCount = CHIEF_MINISTERS_DATA.filter(c => c.partyCategory === 'BJP').length;
            const incCount = CHIEF_MINISTERS_DATA.filter(c => c.partyCategory === 'INC').length;
            const regionalCount = CHIEF_MINISTERS_DATA.filter(c => c.partyCategory === 'Regional' || c.partyCategory === 'AAP').length;

            statsOverview.innerHTML = `
                <div class="stat-box">
                    <div class="stat-number">${total}</div>
                    <div class="stat-label">States & UTs Covered</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number" style="color: #fb923c;">${bjpCount}</div>
                    <div class="stat-label">BJP Chief Ministers</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number" style="color: #38bdf8;">${incCount}</div>
                    <div class="stat-label">INC Chief Ministers</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number" style="color: #c084fc;">${regionalCount}</div>
                    <div class="stat-label">Regional & Other Parties</div>
                </div>
            `;
        }

        function renderGrid(items) {
            if (!cmGrid) return;
            if (items.length === 0) {
                cmGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--cm-text-secondary);">
                        <h3>No Chief Ministers found matching your filter criteria.</h3>
                        <p>Try resetting search or filter options.</p>
                    </div>
                `;
                return;
            }

            cmGrid.innerHTML = items.map(item => `
                <div class="cm-card" data-id="${item.id}" tabindex="0" role="button" aria-label="View details for ${item.cmName}, CM of ${item.state}">
                    <div>
                        <span class="cm-party-tag ${getPartyClass(item.partyCategory)}">${item.party}</span>
                        <div class="cm-card-header">
                            <div class="cm-avatar">👤</div>
                            <div class="cm-title-box">
                                <h3>${item.cmName}</h3>
                                <p>📍 ${item.state}</p>
                            </div>
                        </div>
                        <div class="cm-details-preview">
                            <strong>Capital:</strong> ${item.capital}<br>
                            <strong>Took Office:</strong> ${item.tookOffice}
                        </div>
                    </div>
                    <div class="cm-card-footer">
                        <span>${item.region} India</span>
                        <span>View State Facts &rarr;</span>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.cm-card').forEach(card => {
                const openModal = () => {
                    const id = card.getAttribute('data-id');
                    const cmObj = CHIEF_MINISTERS_DATA.find(c => c.id === id);
                    if (cmObj) showModal(cmObj);
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

        function showModal(cm) {
            if (!cmModal || !modalBody) return;
            modalBody.innerHTML = `
                <div class="modal-header-flex">
                    <div class="modal-avatar">🏛️</div>
                    <div>
                        <span class="cm-party-tag ${getPartyClass(cm.partyCategory)}">${cm.party}</span>
                        <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.2rem;">${cm.cmName}</h2>
                        <p style="color: var(--cm-accent-gold); font-size: 1.1rem; font-weight: 600;">Chief Minister of ${cm.state}</p>
                    </div>
                </div>

                <div class="modal-info-list">
                    <div class="modal-info-item">
                        <span>Capital City</span>
                        <strong>${cm.capital}</strong>
                    </div>
                    <div class="modal-info-item">
                        <span>Political Party</span>
                        <strong>${cm.party}</strong>
                    </div>
                    <div class="modal-info-item">
                        <span>Geographic Region</span>
                        <strong>${cm.region} India</strong>
                    </div>
                    <div class="modal-info-item">
                        <span>Assumed Office</span>
                        <strong>${cm.tookOffice}</strong>
                    </div>
                </div>

                <div class="modal-facts-box">
                    <h4>Key Governance & State Facts</h4>
                    <ul class="modal-facts-list">
                        ${cm.facts.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            `;
            cmModal.classList.remove('hidden');
        }

        function updateView() {
            const searchVal = searchInput ? searchInput.value : '';
            const regionVal = regionFilter ? regionFilter.value : 'all';
            const partyVal = partyFilter ? partyFilter.value : 'all';

            if (clearBtn) {
                if (searchVal) clearBtn.classList.remove('hidden');
                else clearBtn.classList.add('hidden');
            }

            const filtered = filterCMData(CHIEF_MINISTERS_DATA, searchVal, regionVal, partyVal);
            renderGrid(filtered);
        }

        if (searchInput) searchInput.addEventListener('input', updateView);
        if (regionFilter) regionFilter.addEventListener('change', updateView);
        if (partyFilter) partyFilter.addEventListener('change', updateView);

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                updateView();
            });
        }

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                if (cmModal) cmModal.classList.add('hidden');
            });
        }

        if (cmModal) {
            cmModal.addEventListener('click', (e) => {
                if (e.target === cmModal) cmModal.classList.add('hidden');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cmModal && !cmModal.classList.contains('hidden')) {
                cmModal.classList.add('hidden');
            }
        });

        renderStats();
        updateView();
    });
}

if (typeof module !== 'undefined') {
    module.exports = {
        CHIEF_MINISTERS_DATA,
        filterCMData,
        getPartyClass
    };
}
