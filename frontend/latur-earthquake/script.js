(() => {
    window.Journey.registerSearchItems('frontend/latur-earthquake/index.html', [
        {
            id: 'latur-earthquake',
            title: '1993 Latur Earthquake',
            description: 'Document the 1993 Latur earthquake and earthquake preparedness in Maharashtra.',
            link: 'frontend/latur-earthquake/index.html'
        }
    ]);

    const eventData = {
        magnitude: "M<sub>s</sub> 6.4",
        depth: "10 km",
        epicenter: "Latur, Marathwada, Maharashtra",
        time: "04:53:03 IST",
        date: "30 September 1993",
        intensity: "IX (Modified Mercalli)",
        fatalities: "30,000+",
        injured: "~30,000+",
        homeless: "~500,000",
        districts: "Latur, Osmanabad, Beed, Hingoli, Parbhani, Nanded, Jalna, Aurangabad",
        felt_in: "Mumbai, Pune, Hyderabad, Bengaluru",
        rupture: "~15 km",
        aftershocks: "Several weeks"
    };

    const impactData = {
        houses_damaged: "Over 500,000 fully damaged",
        public_buildings: "Schools, hospitals, temples severely damaged",
        water_supply: "Major disruption in affected villages",
        agriculture: "Crop damage across thousands of hectares"
    };

    const responseData = {
        army_columns: "30+ deployed",
        air_force_sorties: "100+ for aerial surveys and supply drops",
        ndrf_teams: "15+ stations",
        temporary_shelters: "~100,000 erected",
        medical_camps: "30+ set up",
        air_drops: "Essential supplies to inaccessible villages"
    };

    const lessonsData = [
        "Unreinforced masonry: Extremely vulnerable; retrofitting essential",
        "Seismic zoning: Must be regularly updated with new data",
        "Building codes: Need for peninsula-specific requirements",
        "Public awareness: Critical for unprepared regions",
        "Traditional knowledge: Local wisdom on safe construction sites",
        "School safety: Earthquake drills in schools recommended"
    ];

    const sourcesData = [
        { name: "India Meteorological Department", url: "https://www.imd.gov.in" },
        { name: "Geological Survey of India", url: "https://gsi.gov.in" },
        { name: "National Disaster Response Force", url: "https://ndrf.gov.in" },
        { name: "United States Geological Survey", url: "https://earthquake.usgs.gov" },
        { name: "Maharashtra State Disaster Management Authority", url: "https://msdma.maharashtra.gov.in" }
    ];

    // Initialize Leaflet map
    document.addEventListener("DOMContentLoaded", () => {
        initMap();
        initTabs();
        renderSources();
    });

    function initMap() {
        const map = L.map("latur-map", {
            scrollWheelZoom: false,
            minZoom: 6,
        }).setView([18.41, 78.87], 11);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
            maxZoom: 18,
        }).addTo(map);

        // Epicenter marker
        L.marker([18.41, 78.87], {
            icon: L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                tooltipAnchor: [16, -28],
                shadowSize: [41, 41],
            }),
        })
            .addTo(map)
            .bindPopup("<strong>Epicenter: Latur</strong><br>30 September 1993, M 6.4");

        // Affected area circle
        L.circle([18.41, 78.87], {
            radius: 80000,
            color: "#e94560",
            fillColor: "#e94560",
            fillOpacity: 0.1,
        }).addTo(map).bindPopup("Approximate felt area");

        // Map cities marker
        L.marker([19.076, 72.877], { icon: L.icon({ iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" }) })
            .addTo(map)
            .bindPopup("<strong>Mumbai</strong><br>Felt here>");
    }

    function initTabs() {
        const tabButtons = document.querySelectorAll(".tab-btn");
        const tabPanels = document.querySelectorAll(".tab-panel");

        tabButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const target = btn.getAttribute("data-tab");

                tabButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");

                tabPanels.forEach((panel) => {
                    panel.classList.toggle("active", panel.id === "tab-" + target);
                });
            });
        });
    }

    function renderSources() {
        const sourcesGrid = document.querySelector(".latur-sources .three");
        if (!sourcesGrid) return;

        sourcesGrid.innerHTML = "";

        sourcesData.forEach((source, index) => {
            const panel = document.createElement("div");
            panel.className = "panel";
            panel.innerHTML = `
                <h3>${source.name}</h3>
                <ul>
                    <li><a href="${source.url}" target="_blank" rel="noopener">View full report</a></li>
                </ul>
            `;
            sourcesGrid.appendChild(panel);
        });
    }
})();