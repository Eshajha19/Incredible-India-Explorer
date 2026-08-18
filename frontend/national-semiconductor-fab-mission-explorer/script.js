document.addEventListener('DOMContentLoaded', () => {
    // Semiconductor Facilities Collection
    const semiconductorFacilities = [
        {
            id: "ISM-FAB-01",
            name: "Dholera Commercial Silicon Wafer Megafab",
            type: "foundry",
            state: "Gujarat (Dholera SIR)",
            capacity: "50,000 WPM (300mm)",
            promoter: "Tata Electronics / PSMC",
            investment: "₹91,000 Crore ($11 Billion)",
            description: "India's first commercial silicon foundry manufacturing 28nm, 40nm, and 55/90nm planar CMOS chips for display drivers, microcontrollers, and PMICs.",
            status: "Under Construction"
        },
        {
            id: "ISM-OSAT-01",
            name: "Micron Sanand ATMP / OSAT Packaging Plant",
            type: "osat",
            state: "Gujarat (Sanand GIDC)",
            capacity: "48 Million Chips / Day",
            promoter: "Micron Technology",
            investment: "₹22,500 Crore ($2.75 Billion)",
            description: "Advanced Assembly, Testing, Marking, and Packaging (ATMP) plant for DRAM memory modules, NAND flash chips, and high-density SSD storage.",
            status: "Pilot Production Active"
        },
        {
            id: "ISM-OSAT-02",
            name: "Jagiroad Semiconductor Assembly Plant",
            type: "osat",
            state: "Assam (Jagiroad)",
            capacity: "15 Billion Chips / Year",
            promoter: "Tata Semiconductor Assembly (TSAT)",
            investment: "₹27,000 Crore ($3.2 Billion)",
            description: "Greenfield OSAT facility serving automotive, electric vehicles, consumer electronics, and mobile communications sectors.",
            status: "Under Construction"
        },
        {
            id: "ISM-OSAT-03",
            name: "CG Power / Renesas Sanand OSAT Unit",
            type: "osat",
            state: "Gujarat (Sanand GIDC)",
            capacity: "15 Million Chips / Day",
            promoter: "CG Power / Renesas / Stars Micro",
            investment: "₹7,600 Crore ($900 Million)",
            description: "Joint venture OSAT facility specializing in power management ICs, industrial analog chips, and automotive microcontrollers.",
            status: "Groundbroken"
        },
        {
            id: "ISM-CMP-01",
            name: "L&T Semiconductor GaN / SiC Compound Fab",
            type: "compound",
            state: "Karnataka (Bengaluru / Mysuru)",
            capacity: "10,000 WPM (6-inch)",
            promoter: "Larsen & Toubro (L&T)",
            investment: "₹8,300 Crore ($1 Billion)",
            description: "Compound semiconductor foundry producing Gallium Nitride (GaN) and Silicon Carbide (SiC) high-frequency power electronics for EV fast chargers and 5G/6G RF towers.",
            status: "Site Approval Phase"
        },
        {
            id: "ISM-DSG-01",
            name: "India Chip Design Linked Incentive (DLI) Hub",
            type: "design",
            state: "Telangana & Karnataka",
            capacity: "100+ Fabless Startups",
            promoter: "C-DAC / MeitY DLI Scheme",
            investment: "₹1,000 Crore DLI Fund",
            description: "National EDA tool cloud infrastructure enabling Indian chip design startups to tape-out RISC-V microprocessors, AI edge accelerators, and satellite communication ASICs.",
            status: "Operational"
        }
    ];

    // DOM Elements
    const cardsContainer = document.getElementById('fab-cards-container');
    const searchInput = document.getElementById('fab-search');
    const categoryButtons = document.querySelectorAll('.filter-btn');
    const activeCounter = document.getElementById('active-count');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const runCalcBtn = document.getElementById('run-calc-btn');
    const calcResultBox = document.getElementById('calc-result');

    // Theme Toggle Handler
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggleBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    // Render Cards Function
    function renderCards(data) {
        cardsContainer.innerHTML = '';
        if (data.length === 0) {
            cardsContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                    <i class="fa-solid fa-microchip" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p style="font-size: 1.1rem; font-weight: 600;">No Semiconductor Facilities Match Your Query</p>
                    <p style="font-size: 0.85rem;">Try adjusting keyword filters or select "All Facilities".</p>
                </div>
            `;
            activeCounter.textContent = "Showing 0 Facilities";
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'fab-card';
            card.innerHTML = `
                <div>
                    <span class="card-tag">${item.type}</span>
                    <h4 class="card-title">${item.name}</h4>
                    <p class="card-desc">${item.description}</p>
                </div>
                <div>
                    <div class="card-meta">
                        <div class="meta-row">
                            <span class="meta-label">Promoter:</span>
                            <span class="meta-value">${item.promoter}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">Location:</span>
                            <span class="meta-value">${item.state}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">Outlay Investment:</span>
                            <span class="meta-value" style="color: var(--primary-color);">${item.investment}</span>
                        </div>
                    </div>
                    <div class="card-actions">
                        <button class="btn-query" onclick="alert('Querying MeitY ISM Telemetry for ${item.name} (${item.id})... Construction progress nominal.')">
                            <i class="fa-solid fa-chart-line"></i> View Fab Specifications
                        </button>
                    </div>
                </div>
            `;
            cardsContainer.appendChild(card);
        });

        activeCounter.textContent = `Showing ${data.length} Semiconductor Facilities`;
    }

    // Filter Logic
    let activeType = 'all';
    let searchQuery = '';

    function filterData() {
        const filtered = semiconductorFacilities.filter(item => {
            const matchesType = activeType === 'all' || item.type === activeType;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery) ||
                                  item.promoter.toLowerCase().includes(searchQuery) ||
                                  item.state.toLowerCase().includes(searchQuery) ||
                                  item.description.toLowerCase().includes(searchQuery);
            return matchesType && matchesSearch;
        });
        renderCards(filtered);
    }

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeType = btn.getAttribute('data-type');
            filterData();
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterData();
    });

    // Wafer Yield Calculation Logic
    runCalcBtn.addEventListener('click', () => {
        const wpm = parseFloat(document.getElementById('calc-wpm').value) || 50000;
        const node = document.getElementById('calc-node').value;

        // Dies per 300mm wafer assumption (~640 dies per 300mm wafer @ 28nm)
        let diePerWafer = 640;
        let yieldRate = 92.4;
        let sector = "Automotive & MCU Electronics";

        if (node === "40nm") {
            diePerWafer = 450;
            yieldRate = 95.8;
            sector = "Industrial Microcontrollers & Smart Cards";
        } else if (node === "14nm") {
            diePerWafer = 980;
            yieldRate = 88.2;
            sector = "5G Infrastructure & AI Edge Processors";
        } else if (node === "GaN") {
            diePerWafer = 320;
            yieldRate = 89.5;
            sector = "EV Power Inverters & Solar Inverters";
        }

        const totalChipsAnnual = ((wpm * 12 * diePerWafer * yieldRate) / 100).toFixed(0);

        document.getElementById('calc-title').textContent = `Fab Output Calculated: ${wpm.toLocaleString()} WPM @ ${node}`;
        document.getElementById('res-chips').textContent = `${(totalChipsAnnual / 1000000).toFixed(1)} Million Defect-Free Chips / Year`;
        document.getElementById('res-yield').textContent = `${yieldRate}% Wafer Die Yield`;
        document.getElementById('res-sector').textContent = sector;

        calcResultBox.classList.remove('hidden');
    });

    // Initial Execution
    renderCards(semiconductorFacilities);
});
