/**
 * Chief Justices of India Timeline Data & Application Logic
 */

const CHIEF_JUSTICES_DATA = [
    {
        id: '1st-cji-kania',
        number: '1st CJI',
        name: 'H. J. Kania',
        tenure: '26 January 1950 – 6 November 1951',
        appointmentDate: '26 January 1950',
        retirementDate: '6 November 1951 (Deceased in office)',
        tenureLength: '1 year, 284 days',
        decade: '1950s',
        domain: 'Fundamental Rights',
        landmarkJudgments: [
            {
                caseName: 'A. K. Gopalan v. State of Madras (1950)',
                summary: 'Early interpretation of Article 21 (Procedure established by law vs Due Process), upholding Preventive Detention Act while asserting fundamental rights jurisdiction.'
            }
        ],
        reforms: 'First Chief Minister of the Supreme Court of India upon inauguration of the republic; established Supreme Court rules and procedural framework.'
    },
    {
        id: '2nd-cji-sastri',
        number: '2nd CJI',
        name: 'M. Patanjali Sastri',
        tenure: '7 November 1951 – 3 January 1954',
        appointmentDate: '7 November 1951',
        retirementDate: '3 January 1954',
        tenureLength: '2 years, 57 days',
        decade: '1950s',
        domain: 'Fundamental Rights',
        landmarkJudgments: [
            {
                caseName: 'State of Madras v. V. G. Row (1952)',
                summary: 'Established classic test of reasonableness for fundamental freedom restrictions under Article 19.'
            },
            {
                caseName: 'State of West Bengal v. Anwar Ali Sarkar (1952)',
                summary: 'Struck down Special Courts procedure violating Article 14 equal protection of laws.'
            }
        ],
        reforms: 'Strengthened judicial review powers of the Supreme Court over legislative enactments.'
    },
    {
        id: '11th-cji-subba-rao',
        number: '11th CJI',
        name: 'K. Subba Rao',
        tenure: '30 June 1966 – 11 April 1967',
        appointmentDate: '30 June 1966',
        retirementDate: '11 April 1967',
        tenureLength: '285 days',
        decade: '1960s',
        domain: 'Fundamental Rights',
        landmarkJudgments: [
            {
                caseName: 'I. C. Golaknath v. State of Punjab (1967)',
                summary: 'Historic 11-judge bench ruling holding that Parliament cannot curtail or abridge Fundamental Rights via constitutional amendments.'
            }
        ],
        reforms: 'Asserted prospective overruling doctrine in constitutional jurisprudence.'
    },
    {
        id: '13th-cji-sikri',
        number: '13th CJI',
        name: 'S. M. Sikri',
        tenure: '22 January 1971 – 25 April 1973',
        appointmentDate: '22 January 1971',
        retirementDate: '25 April 1973',
        tenureLength: '2 years, 93 days',
        decade: '1970s',
        domain: 'Fundamental Rights',
        landmarkJudgments: [
            {
                caseName: 'Kesavananda Bharati v. State of Kerala (1973)',
                summary: 'Monumental 13-judge bench ruling propounding the "Basic Structure Doctrine", capping parliamentary power to alter constitutional identity.'
            }
        ],
        reforms: 'First CJI appointed directly from the Supreme Court Bar Association (advocate quota).'
    },
    {
        id: '16th-cji-chandrachud',
        number: '16th CJI',
        name: 'Y. V. Chandrachud',
        tenure: '22 February 1978 – 11 July 1985',
        appointmentDate: '22 February 1978',
        retirementDate: '11 July 1985',
        tenureLength: '7 years, 139 days (Longest CJI Tenure)',
        decade: '1970s',
        domain: 'Federalism & Governance',
        landmarkJudgments: [
            {
                caseName: 'Minerva Mills v. Union of India (1980)',
                summary: 'Reaffirmed harmony between Fundamental Rights and Directive Principles as part of basic structure.'
            },
            {
                caseName: 'Shah Bano Case (1985)',
                summary: 'Upheld Muslim woman right to maintenance under CrPC Section 125 promoting gender justice.'
            }
        ],
        reforms: 'Longest serving Chief Justice in Indian history (over 7 years); bolstered judicial independence post-Emergency.'
    },
    {
        id: '17th-cji-bhagwati',
        number: '17th CJI',
        name: 'P. N. Bhagwati',
        tenure: '12 July 1985 – 20 December 1986',
        appointmentDate: '12 July 1985',
        retirementDate: '20 December 1986',
        tenureLength: '1 year, 161 days',
        decade: '1980s',
        domain: 'Judicial Activism & PIL',
        landmarkJudgments: [
            {
                caseName: 'Maneka Gandhi v. Union of India (1978)',
                summary: 'Expanded Article 21 right to life to mean dignified, fair, just, and reasonable procedure.'
            },
            {
                caseName: 'SP Gupta v. Union of India (1981)',
                summary: 'Relaxed locus standi rule, founding Public Interest Litigation (PIL) in India.'
            }
        ],
        reforms: 'Father of Public Interest Litigation (PIL) and Legal Aid Services in India; democratized access to justice for marginalized citizens.'
    },
    {
        id: '27th-cji-verma',
        number: '27th CJI',
        name: 'J. S. Verma',
        tenure: '25 March 1997 – 18 January 1998',
        appointmentDate: '25 March 1997',
        retirementDate: '18 January 1998',
        tenureLength: '299 days',
        decade: '1990s',
        domain: 'Judicial Activism & PIL',
        landmarkJudgments: [
            {
                caseName: 'Vishaka v. State of Rajasthan (1997)',
                summary: 'Formulated binding Vishaka Guidelines against workplace sexual harassment under CEDAW.'
            },
            {
                caseName: 'SR Bommai v. Union of India (1994)',
                summary: 'Curbed misuse of Article 356 President\'s Rule asserting secularism and federalism as basic structure.'
            }
        ],
        reforms: 'Framed judicial ethics code; authored 2013 Committee Report recommending sweeping reforms in criminal law for women safety.'
    },
    {
        id: '38th-cji-kapadia',
        number: '38th CJI',
        name: 'S. H. Kapadia',
        tenure: '12 May 2010 – 28 September 2012',
        appointmentDate: '12 May 2010',
        retirementDate: '28 September 2012',
        tenureLength: '2 years, 139 days',
        decade: '2010s',
        domain: 'Court Reforms & Tech',
        landmarkJudgments: [
            {
                caseName: 'Vodafone International Holdings v. Union of India (2012)',
                summary: 'Landmark corporate tax verdict clarifying tax certainty on offshore share transfers.'
            },
            {
                caseName: 'RTE Act Validity (2012)',
                summary: 'Upheld constitutional validity of 25% quota for disadvantaged children in private schools.'
            }
        ],
        reforms: 'Strict adherence to financial integrity, tax law expertise, and pendency reduction.'
    },
    {
        id: '48th-cji-ramana',
        number: '48th CJI',
        name: 'N. V. Ramana',
        tenure: '24 April 2021 – 26 August 2022',
        appointmentDate: '24 April 2021',
        retirementDate: '26 August 2022',
        tenureLength: '1 year, 124 days',
        decade: '2020s',
        domain: 'Court Reforms & Tech',
        landmarkJudgments: [
            {
                caseName: 'Sedition Law Stay (2022)',
                summary: 'Suspended Section 124A IPC sedition law pending government re-examination.'
            },
            {
                caseName: 'Pegasus Spyware Order (2021)',
                summary: 'Appointed independent expert committee on illegal surveillance allegations.'
            }
        ],
        reforms: 'Filled record judicial vacancies across High Courts & Supreme Court; advocated national court infrastructure corporation.'
    },
    {
        id: '50th-cji-chandrachud',
        number: '50th CJI',
        name: 'D. Y. Chandrachud',
        tenure: '9 November 2022 – 10 November 2024',
        appointmentDate: '9 November 2022',
        retirementDate: '10 November 2024',
        tenureLength: '2 years, 1 day',
        decade: '2020s',
        domain: 'Court Reforms & Tech',
        landmarkJudgments: [
            {
                caseName: 'KS Puttaswamy v. Union of India (2017)',
                summary: '9-judge bench holding Right to Privacy as a fundamental right under Article 21.'
            },
            {
                caseName: 'Electoral Bonds Scheme Invalidation (2024)',
                summary: 'Struck down opaque Electoral Bonds Scheme as unconstitutional under voters\' Right to Information.'
            },
            {
                caseName: 'Article 370 Abrogation Upheld (2023)',
                summary: 'Upheld constitutional validity of reorganizing J&K into Union Territories.'
            }
        ],
        reforms: 'Pioneered e-Courts Phase III, YouTube live streaming of constitution benches, Neutral Citation System, and paperless digital courts.'
    }
];

function filterCJIData(data, search = '', decade = 'all', domain = 'all') {
    const s = search.trim().toLowerCase();
    return data.filter(item => {
        const matchesSearch = !s ||
            item.name.toLowerCase().includes(s) ||
            item.number.toLowerCase().includes(s) ||
            item.reforms.toLowerCase().includes(s) ||
            item.landmarkJudgments.some(j => j.caseName.toLowerCase().includes(s) || j.summary.toLowerCase().includes(s));

        const matchesDecade = decade === 'all' || item.decade === decade;
        const matchesDomain = domain === 'all' || item.domain === domain;

        return matchesSearch && matchesDecade && matchesDomain;
    });
}

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('cji-search-input');
        const clearBtn = document.getElementById('clear-search');
        const decadeFilter = document.getElementById('decade-filter');
        const categoryFilter = document.getElementById('category-filter');
        const cjiGrid = document.getElementById('cji-grid');
        const cjiStatsBar = document.getElementById('cji-stats-bar');
        const cjiModal = document.getElementById('cji-modal');
        const modalBody = document.getElementById('modal-body');
        const modalCloseBtn = document.getElementById('modal-close-btn');

        function renderStats() {
            if (!cjiStatsBar) return;
            cjiStatsBar.innerHTML = `
                <div class="stat-box">
                    <div class="stat-number">50+</div>
                    <div class="stat-label">Chief Justices Since 1950</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number" style="color: var(--cji-saffron);">1973</div>
                    <div class="stat-label">Basic Structure Doctrine</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number" style="color: var(--cji-blue);">PIL</div>
                    <div class="stat-label">Public Interest Litigation</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number" style="color: var(--cji-emerald);">e-Courts</div>
                    <div class="stat-label">Digital Live Streaming</div>
                </div>
            `;
        }

        function renderGrid(items) {
            if (!cjiGrid) return;
            if (items.length === 0) {
                cjiGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--cji-text-secondary);">
                        <h3>No Chief Justices found matching your filter criteria.</h3>
                        <p>Try resetting search or filter options.</p>
                    </div>
                `;
                return;
            }

            cjiGrid.innerHTML = items.map(item => `
                <div class="cji-card" data-id="${item.id}" tabindex="0" role="button" aria-label="View details for ${item.name}, ${item.number}">
                    <div>
                        <span class="cji-number-badge">${item.number} &bull; ${item.decade}</span>
                        <div class="cji-card-header">
                            <div class="cji-avatar">⚖️</div>
                            <div class="cji-title-box">
                                <h3>${item.name}</h3>
                                <p>${item.tenureLength}</p>
                            </div>
                        </div>
                        <div class="cji-details-preview">
                            <strong>Tenure:</strong> ${item.tenure}<br>
                            <strong>Primary Focus:</strong> ${item.domain}
                        </div>
                        <div class="cji-cases-tags">
                            ${item.landmarkJudgments.map(j => `<span class="tag-case">${j.caseName.split('(')[0]}</span>`).join('')}
                        </div>
                    </div>
                    <div class="cji-card-footer">
                        <span>${item.landmarkJudgments.length} Landmark Judgments</span>
                        <span>View Profile &rarr;</span>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.cji-card').forEach(card => {
                const openModal = () => {
                    const id = card.getAttribute('data-id');
                    const cjiObj = CHIEF_JUSTICES_DATA.find(c => c.id === id);
                    if (cjiObj) showModal(cjiObj);
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

        function showModal(cji) {
            if (!cjiModal || !modalBody) return;
            modalBody.innerHTML = `
                <div class="modal-header-flex">
                    <div class="modal-avatar">⚖️</div>
                    <div>
                        <span class="cji-number-badge">${cji.number} &bull; ${cji.decade}</span>
                        <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.2rem;">${cji.name}</h2>
                        <p style="color: var(--cji-gold); font-size: 1.05rem; font-weight: 600;">Tenure: ${cji.tenureLength}</p>
                    </div>
                </div>

                <div class="modal-info-list">
                    <div class="modal-info-item">
                        <span>Appointment Date</span>
                        <strong>${cji.appointmentDate}</strong>
                    </div>
                    <div class="modal-info-item">
                        <span>Retirement / Demise</span>
                        <strong>${cji.retirementDate}</strong>
                    </div>
                    <div class="modal-info-item">
                        <span>Focus Domain</span>
                        <strong>${cji.domain}</strong>
                    </div>
                    <div class="modal-info-item">
                        <span>Decade</span>
                        <strong>${cji.decade}</strong>
                    </div>
                </div>

                <div class="modal-section-h4">Landmark Supreme Court Judgments</div>
                ${cji.landmarkJudgments.map(j => `
                    <div class="landmark-case-box">
                        <h5>📌 ${j.caseName}</h5>
                        <p>${j.summary}</p>
                    </div>
                `).join('')}

                <div class="modal-section-h4">Court Reforms & Judicial Legacy</div>
                <p style="color: var(--cji-text-secondary); line-height: 1.65;">${cji.reforms}</p>
            `;
            cjiModal.classList.remove('hidden');
        }

        function updateView() {
            const searchVal = searchInput ? searchInput.value : '';
            const decadeVal = decadeFilter ? decadeFilter.value : 'all';
            const domainVal = categoryFilter ? categoryFilter.value : 'all';

            if (clearBtn) {
                if (searchVal) clearBtn.classList.remove('hidden');
                else clearBtn.classList.add('hidden');
            }

            const filtered = filterCJIData(CHIEF_JUSTICES_DATA, searchVal, decadeVal, domainVal);
            renderGrid(filtered);
        }

        if (searchInput) searchInput.addEventListener('input', updateView);
        if (decadeFilter) decadeFilter.addEventListener('change', updateView);
        if (categoryFilter) categoryFilter.addEventListener('change', updateView);

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                updateView();
            });
        }

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                if (cjiModal) cjiModal.classList.add('hidden');
            });
        }

        if (cjiModal) {
            cjiModal.addEventListener('click', (e) => {
                if (e.target === cjiModal) cjiModal.classList.add('hidden');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cjiModal && !cjiModal.classList.contains('hidden')) {
                cjiModal.classList.add('hidden');
            }
        });

        renderStats();
        updateView();
    });
}

if (typeof module !== 'undefined') {
    module.exports = {
        CHIEF_JUSTICES_DATA,
        filterCJIData
    };
}
