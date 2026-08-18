document.addEventListener('DOMContentLoaded', () => {
    // Energy Parks Collection
    const renewableParks = [
        {
            id: "RE-IND-01",
            name: "Khavda Hybrid Renewable Energy Park",
            type: "hybrid",
            state: "Gujarat (Rann of Kutch)",
            capacity: "30,000 MW",
            agency: "Adani Green / NTPC / GIPCL",
            area: "726 sq km",
            description: "World's largest renewable energy megastructure combining solar PV arrays and high-capacity wind turbine fields built across the saline salt desert.",
            status: "Phased Expansion"
        },
        {
            id: "RE-IND-02",
            name: "Bhadla Solar Park",
            type: "solar",
            state: "Rajasthan (Jodhpur)",
            capacity: "2,245 MW",
            agency: "RUMSL / SECI",
            area: "57 sq km",
            description: "Ultra mega solar installation located in Thar desert, operating over 10 million solar PV modules under high solar irradiance conditions.",
            status: "Fully Operational"
        },
        {
            id: "RE-IND-03",
            name: "Pavagada Solar Park (Shakti Sthala)",
            type: "solar",
            state: "Karnataka (Tumakuru)",
            capacity: "2,050 MW",
            agency: "KSPDCL / SECI",
            area: "53 sq km",
            description: "Land-lease model solar park constructed across drought-prone farmers' agricultural tracts, empowering local rural economy.",
            status: "Fully Operational"
        },
        {
            id: "RE-IND-04",
            name: "Muppandal Wind Farm Complex",
            type: "wind",
            state: "Tamil Nadu (Kanyakumari)",
            capacity: "1,500 MW",
            agency: "TANGEDCO / Private Operators",
            area: "120 sq km",
            description: "One of Asia's largest onshore wind turbine clusters harnessing seasonal Palghat Gap monsoon wind funnels.",
            status: "Fully Operational"
        },
        {
            id: "RE-IND-05",
            name: "Kurnool Ultra Mega Solar Park",
            type: "solar",
            state: "Andhra Pradesh (Kurnool)",
            capacity: "1,000 MW",
            agency: "APSPCL",
            area: "24 sq km",
            description: "Integrated solar park featuring single-axis trackers and robotically cleaned dry solar panel arrays.",
            status: "Fully Operational"
        },
        {
            id: "RE-IND-06",
            name: "Leh-Kargil Ultra Mega Solar & Hydrogen",
            type: "hydro",
            state: "Ladakh",
            capacity: "7,500 MW",
            agency: "SECI / NTPC",
            area: "200 sq km",
            description: "High-altitude cold desert solar farm coupled with green hydrogen production electrolysers for zero-emission mobility.",
            status: "Planning & Pre-construction"
        }
    ];

    // DOM Elements
    const cardsContainer = document.getElementById('park-cards-container');
    const searchInput = document.getElementById('park-search');
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

    // Render Function
    function renderCards(data) {
        cardsContainer.innerHTML = '';
        if (data.length === 0) {
            cardsContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                    <i class="fa-solid fa-solar-panel" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p style="font-size: 1.1rem; font-weight: 600;">No Renewable Energy Parks Match Your Query</p>
                    <p style="font-size: 0.85rem;">Try searching by park name or select "All Tech".</p>
                </div>
            `;
            activeCounter.textContent = "Showing 0 Parks";
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'park-card';
            card.innerHTML = `
                <div>
                    <span class="card-tag">${item.type}</span>
                    <h4 class="card-title">${item.name}</h4>
                    <p class="card-desc">${item.description}</p>
                </div>
                <div>
                    <div class="card-meta">
                        <div class="meta-row">
                            <span class="meta-label">Location:</span>
                            <span class="meta-value">${item.state}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">Total Capacity:</span>
                            <span class="meta-value" style="color: var(--primary-color);">${item.capacity}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">Land Footprint:</span>
                            <span class="meta-value">${item.area}</span>
                        </div>
                    </div>
                    <div class="card-actions">
                        <button class="btn-query" onclick="alert('Accessing MNRE Telemetry Portal for ${item.name} (${item.id})... Power output nominal.')">
                            <i class="fa-solid fa-chart-pie"></i> View Telemetry Data
                        </button>
                    </div>
                </div>
            `;
            cardsContainer.appendChild(card);
        });

        activeCounter.textContent = `Showing ${data.length} Energy Parks`;
    }

    // Filtering Logic
    let activeType = 'all';
    let searchQuery = '';

    function filterData() {
        const filtered = renewableParks.filter(item => {
            const matchesType = activeType === 'all' || item.type === activeType;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery) ||
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

    // Calculator Calculation Logic
    runCalcBtn.addEventListener('click', () => {
        const capacity = parseFloat(document.getElementById('calc-capacity').value) || 2250;
        const type = document.getElementById('calc-type').value;

        // Multipliers based on capacity factor
        let cf = 0.25; // default solar
        if (type === 'wind') cf = 0.32;
        if (type === 'hybrid') cf = 0.42;
        if (type === 'hydro') cf = 0.50;

        const annualGwh = (capacity * 24 * 365 * cf / 1000).toFixed(0);
        const co2Reduction = (annualGwh * 0.82 / 1000).toFixed(2); // 0.82 kg CO2 per kWh grid baseline
        const homes = ((annualGwh * 1000000) / 3600).toFixed(0); // ~3600 kWh per avg household

        document.getElementById('calc-title').textContent = `Clean Output Simulation: ${capacity} MW ${type.toUpperCase()} System`;
        document.getElementById('res-power').textContent = `${Number(annualGwh).toLocaleString()} GWh / year`;
        document.getElementById('res-co2').textContent = `${Number(co2Reduction).toLocaleString()} Million Tons CO2 / year`;
        document.getElementById('res-homes').textContent = `${Number(homes).toLocaleString()} Households`;

        calcResultBox.classList.remove('hidden');
    });

    // Initial Execution
    renderCards(renewableParks);
});
