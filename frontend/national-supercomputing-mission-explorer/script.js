document.addEventListener('DOMContentLoaded', () => {
    // PARAM Supercomputing Systems Collection
    const supercomputers = [
        {
            id: "NSM-HPC-01",
            name: "PARAM Siddhi-AI",
            type: "ai",
            institution: "C-DAC Pune",
            performance: "5.26 PFLOPS (Rpeak) / 210 AI PFLOPS",
            interconnect: "NVIDIA Mellanox HDR InfiniBand",
            server: "NVIDIA DGX SuperPOD Architecture",
            description: "India's fastest AI supercomputer designed for deep learning, AI LLM training, healthcare diagnostics, computational chemistry, and smart cities.",
            status: "Operational"
        },
        {
            id: "NSM-HPC-02",
            name: "PARAM Ananta",
            type: "institutional",
            institution: "IIT Gandhinagar",
            performance: "838 TFLOPS (Rpeak)",
            interconnect: "Trinetra High-Speed Interconnect",
            server: "C-DAC Rudra Blade Server Architecture",
            description: "Direct Liquid Cooling (DLC) supercomputer empowering multidisciplinary research in atomic physics, structural engineering, and genomics.",
            status: "Operational"
        },
        {
            id: "NSM-HPC-03",
            name: "PARAM Porul",
            type: "petaflops",
            institution: "NIT Tiruchirappalli",
            performance: "838 TFLOPS (Rpeak)",
            interconnect: "C-DAC Trinetra Interconnect",
            server: "Direct Liquid Cooling (DLC) Nodes",
            description: "High-density supercomputer deployed under Phase 2 of NSM to accelerate regional research in power systems and nanostructured materials.",
            status: "Operational"
        },
        {
            id: "NSM-HPC-04",
            name: "PARAM Ganga",
            type: "petaflops",
            institution: "IIT Roorkee",
            performance: "1.66 PFLOPS (Rpeak)",
            interconnect: "High-Bandwidth Low-Latency Fabric",
            server: "C-DAC Rudra Indigenous Platform",
            description: "Peta-scale computational cluster supporting computational fluid dynamics, river basin hydrology modeling, and earthquake engineering.",
            status: "Operational"
        },
        {
            id: "NSM-HPC-05",
            name: "PARAM Sanganak",
            type: "institutional",
            institution: "IIT Kanpur",
            performance: "1.3 PFLOPS (Rpeak)",
            interconnect: "InfiniBand EDR / Trinetra",
            server: "OEM High Density HPC Blades",
            description: "Powers national cybersecurity research, drone trajectory simulations, autonomous systems, and aerospace engineering.",
            status: "Operational"
        },
        {
            id: "NSM-HPC-06",
            name: "PARAM Shivay & PARAM Pravega",
            type: "weather",
            institution: "IIT BHU / IISc Bengaluru",
            performance: "3.3 PFLOPS Combined",
            interconnect: "C-DAC Trinetra Fabric",
            server: "C-DAC Rudra & BullSequana",
            description: "Petaflop-class nodes dedicated to monsoon rain prediction, ISRO satellite data telemetry processing, and quantum chemistry.",
            status: "Operational"
        }
    ];

    // DOM Elements
    const cardsContainer = document.getElementById('hpc-cards-container');
    const searchInput = document.getElementById('hpc-search');
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
                    <i class="fa-solid fa-server" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p style="font-size: 1.1rem; font-weight: 600;">No PARAM Supercomputers Match Your Query</p>
                    <p style="font-size: 0.85rem;">Try adjusting keyword filters or select "All Systems".</p>
                </div>
            `;
            activeCounter.textContent = "Showing 0 Systems";
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'hpc-card';
            card.innerHTML = `
                <div>
                    <span class="card-tag">${item.type}</span>
                    <h4 class="card-title">${item.name}</h4>
                    <p class="card-desc">${item.description}</p>
                </div>
                <div>
                    <div class="card-meta">
                        <div class="meta-row">
                            <span class="meta-label">Host Node:</span>
                            <span class="meta-value">${item.institution}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">Peak FLOPS:</span>
                            <span class="meta-value" style="color: var(--primary-color);">${item.performance}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">Server Tech:</span>
                            <span class="meta-value">${item.server}</span>
                        </div>
                    </div>
                    <div class="card-actions">
                        <button class="btn-query" onclick="alert('Connecting to C-DAC NSM Grid Telemetry for ${item.name} (${item.id})... Node operational.')">
                            <i class="fa-solid fa-terminal"></i> Query HPC Cluster Node
                        </button>
                    </div>
                </div>
            `;
            cardsContainer.appendChild(card);
        });

        activeCounter.textContent = `Showing ${data.length} PARAM Systems`;
    }

    // Filter Logic
    let activeType = 'all';
    let searchQuery = '';

    function filterData() {
        const filtered = supercomputers.filter(item => {
            const matchesType = activeType === 'all' || item.type === activeType;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery) ||
                                  item.institution.toLowerCase().includes(searchQuery) ||
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

    // Workload Calculation Logic
    runCalcBtn.addEventListener('click', () => {
        const workload = document.getElementById('calc-workload').value;
        const petaflops = parseFloat(document.getElementById('calc-petaflops').value) || 5.26;

        let requiredFlops = 1e18; // Default climate
        let workloadName = "High-Res Climate Simulation";

        if (workload === "llm") {
            requiredFlops = 1e21;
            workloadName = "100B Parameter LLM Training";
        } else if (workload === "genomics") {
            requiredFlops = 1e16;
            workloadName = "Genome Alignment";
        } else if (workload === "aerospace") {
            requiredFlops = 1e17;
            workloadName = "ISRO CFD Fluid Dynamics";
        }

        // Time = FLOPs / (PetaFLOPS * 1e15) seconds
        const seconds = requiredFlops / (petaflops * 1e15);
        let timeFormatted = "";
        if (seconds < 60) {
            timeFormatted = `${seconds.toFixed(2)} Seconds`;
        } else if (seconds < 3600) {
            timeFormatted = `${(seconds / 60).toFixed(1)} Minutes`;
        } else {
            timeFormatted = `${(seconds / 3600).toFixed(1)} Hours`;
        }

        document.getElementById('calc-title').textContent = `Benchmark Calculated: ${workloadName}`;
        document.getElementById('res-time').textContent = timeFormatted;
        document.getElementById('res-flops').textContent = `${petaflops} PetaFLOPS Peak Performance`;
        document.getElementById('res-power').textContent = "Green500 DLC Efficiency Standard";

        calcResultBox.classList.remove('hidden');
    });

    // Initial Execution
    renderCards(supercomputers);
});
