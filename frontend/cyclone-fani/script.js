(() => {
    window.Journey.registerSearchItems('frontend/cyclone-fani/index.html', [
        {
            id: 'cyclone-fani',
            title: 'Cyclone Fani 2019',
            description: 'Document Cyclone Fani (2019) and India\'s cyclone preparedness in Odisha.',
            link: 'frontend/cyclone-fani/index.html'
        }
    ]);

    const stormData = {
        formed: "26 April 2019",
        dissipated: "4 May 2019",
        peak: "Extremely Severe Cyclonic Storm",
        peak_winds: "~215 km/h",
        landfall_winds: "175-185 km/h",
        pressure: "~932 hPa",
        landfall: "3 May 2019 near Puri, Odisha",
        fatalities: "~89 (India), ~19 (Bangladesh)",
        evacuated: "1.2 million+",
        economic_loss: "US$8+ billion"
    };

    const impactData = {
        houses: "16,000+ fully damaged",
        trees: "12 million+ uprooted",
        power: "Widespread outages",
        schools: "~16,000 damaged",
        districts: "Puri, Khordha, Cuttack, Jagatsinghpur"
    };

    const responseData = {
        ndrf: "37+ teams",
        army: "Road clearance & rescue",
        odraf: "State rapid-action teams",
        power_restore: "Priority corridors in days"
    };

    const lessonsData = [
        "Early accurate warnings save lives at scale",
        "Mass evacuation works when shelters and transport are ready",
        "Cyclone-resistant construction reduces wind damage",
        "Community volunteers are crucial for last-mile action",
        "Power and communication grids need hardening",
        "Mangroves and coastal ecosystems buffer storm impacts"
    ];

    const sourcesData = [
        { name: "India Meteorological Department", url: "https://www.imd.gov.in" },
        { name: "Odisha State Disaster Management Authority", url: "https://www.osdma.org" },
        { name: "National Disaster Management Authority", url: "https://ndma.gov.in" },
        { name: "National Disaster Response Force", url: "https://ndrf.gov.in" },
        { name: "Joint Typhoon Warning Center", url: "https://www.metoc.navy.mil/jtwc" }
    ];

    document.addEventListener("DOMContentLoaded", () => {
        initMap();
        initTabs();
        renderSources();
    });

    function initMap() {
        const map = L.map("fani-map", {
            scrollWheelZoom: false,
            minZoom: 5,
        }).setView([19.5, 86.5], 6);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
            maxZoom: 18,
        }).addTo(map);

        // Approximate Fani track points: formation -> landfall -> inland
        const track = [
            [3.5, 92.5],   // Formation area near Sumatra / SE Bay of Bengal
            [7.0, 91.0],
            [11.0, 89.5],
            [14.5, 87.5],
            [17.0, 86.5],
            [19.8, 85.9],  // Landfall near Puri
            [21.5, 87.0],  // West Bengal
            [23.0, 89.0],  // Bangladesh border
        ];

        const polyline = L.polyline(track, {
            color: "#ff8c42",
            weight: 3,
            opacity: 0.9,
            dashArray: "6 6",
        }).addTo(map);

        polyline.bindPopup("<strong>Cyclone Fani's approximate track</strong><br>26 April – 4 May 2019");

        // Formation point
        L.circleMarker(track[0], {
            radius: 6,
            color: "#4fc3f7",
            fillColor: "#4fc3f7",
            fillOpacity: 0.8,
        })
            .addTo(map)
            .bindPopup("<strong>Formation zone</strong><br>SE Bay of Bengal, ~26 April 2019");

        // Landfall point
        L.circleMarker(track[5], {
            radius: 9,
            color: "#e94560",
            fillColor: "#e94560",
            fillOpacity: 0.85,
        })
            .addTo(map)
            .bindPopup("<strong>Landfall</strong><br>Near Puri, Odisha<br>3 May 2019, ~08:00 IST");

        // Landfall impact area
        L.circle([19.8, 85.9], {
            radius: 60000,
            color: "#e94560",
            fillColor: "#ff8c42",
            fillOpacity: 0.12,
        })
            .addTo(map)
            .bindPopup("Peak wind damage zone around Puri");

        // Dissipation point
        L.circleMarker(track[7], {
            radius: 6,
            color: "#90a4ae",
            fillColor: "#90a4ae",
            fillOpacity: 0.8,
        })
            .addTo(map)
            .bindPopup("<strong>Weakening</strong><br>Overland, ~4 May 2019");

        map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
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
        const sourcesGrid = document.querySelector(".cyclone-fani-sources .three");
        if (!sourcesGrid) return;

        sourcesGrid.innerHTML = "";

        sourcesData.forEach((source) => {
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