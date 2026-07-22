// climate-zones.js
// Interactive Map rendering, view toggling, and card filtering logic.
// Runs standalone or within the SPA routing container.

(function () {
    "use strict";

    // -------------------------------------------------------------
    // 1. Data Schema definition
    // -------------------------------------------------------------
    const stateClimateData = {
        "an": { name: "Andaman and Nicobar Islands", zone: "monsoon", zoneLabel: "Tropical Wet / Monsoon", tempSummer: "31°C", tempWinter: "23°C", rainfall: "3100 mm", rainfallClass: "heavy", seasonClass: "monsoon-sw", desc: "Tropical rainforest climate. Warm and humid year-round with heavy maritime monsoon rainfall.", phenomenon: "Intertropical Convergence Zone shifts" },
        "ap": { name: "Andhra Pradesh", zone: "savanna", zoneLabel: "Tropical Savanna", tempSummer: "39°C", tempWinter: "17°C", rainfall: "900 mm", rainfallClass: "medium", seasonClass: "monsoon-sw", desc: "Tropical wet and dry climate with high summer heat. Vulnerable to cyclonic storm surges in autumn.", phenomenon: "Bay of Bengal Cyclone landfalls" },
        "ar": { name: "Arunachal Pradesh", zone: "montane", zoneLabel: "Montane / Alpine", tempSummer: "25°C", tempWinter: "5°C", rainfall: "3000 mm", rainfallClass: "heavy", seasonClass: "winter-snow", desc: "High alpine conditions on mountain tops transitioning to humid subtropical river valleys below.", phenomenon: "Dense Himalayan Valley Fog" },
        "as": { name: "Assam", zone: "subtropical", zoneLabel: "Humid Subtropical", tempSummer: "32°C", tempWinter: "12°C", rainfall: "2300 mm", rainfallClass: "heavy", seasonClass: "monsoon-sw", desc: "Highly humid climate with pre-monsoon showers and regular summer floods in the Brahmaputra valley.", phenomenon: "Morning Glory Clouds & River Mists" },
        "br": { name: "Bihar", zone: "subtropical", zoneLabel: "Humid Subtropical", tempSummer: "37°C", tempWinter: "13°C", rainfall: "1150 mm", rainfallClass: "moderate", seasonClass: "monsoon-sw", desc: "Hot, wet monsoon summers and dry winters. Highly fertile agricultural plains subject to flooding.", phenomenon: "Nor'westers (Kalbaishakhi)" },
        "ch": { name: "Chandigarh", zone: "semiarid", zoneLabel: "Semi-Arid", tempSummer: "39°C", tempWinter: "9°C", rainfall: "500 mm", rainfallClass: "medium", seasonClass: "summer-loo", desc: "Continental climate with hot summers and cold winters. Bordered by the foothills of the Shivaliks.", phenomenon: "Shivalik Range Breezes" },
        "ct": { name: "Chhattisgarh", zone: "savanna", zoneLabel: "Tropical Savanna", tempSummer: "39°C", tempWinter: "15°C", rainfall: "1250 mm", rainfallClass: "moderate", seasonClass: "monsoon-sw", desc: "Savanna climate with high precipitation. Forest canopies create cool microclimate pockets.", phenomenon: "Sal Forest Rainfall Enhancement" },
        "dn": { name: "Dadra and Nagar Haveli", zone: "monsoon", zoneLabel: "Tropical Wet / Monsoon", tempSummer: "35°C", tempWinter: "16°C", rainfall: "2000 mm", rainfallClass: "heavy", seasonClass: "monsoon-sw", desc: "Maritime tropical monsoon climate. Highly humid with dense rainfall from June to September.", phenomenon: "Western Ghats Monsoon Orographic Rise" },
        "dd": { name: "Daman and Diu", zone: "semiarid", zoneLabel: "Semi-Arid", tempSummer: "36°C", tempWinter: "15°C", rainfall: "800 mm", rainfallClass: "medium", seasonClass: "monsoon-sw", desc: "Coastal semi-arid climate with warm winters. Tempered by constant ocean wind breezes.", phenomenon: "Strong Coastal Sea Breezes" },
        "dl": { name: "Delhi", zone: "semiarid", zoneLabel: "Semi-Arid", tempSummer: "41°C", tempWinter: "9°C", rainfall: "600 mm", rainfallClass: "medium", seasonClass: "summer-loo", desc: "Semi-arid with hot summer winds (Loo) and chilly winters with dense radiation fog.", phenomenon: "Winter Temperature Inversion Fog" },
        "ga": { name: "Goa", zone: "monsoon", zoneLabel: "Tropical Wet / Monsoon", tempSummer: "32°C", tempWinter: "21°C", rainfall: "2900 mm", rainfallClass: "heavy", seasonClass: "monsoon-sw", desc: "Tropical monsoon climate. Heavy Southwest monsoon rainfall with warm temperatures year-round.", phenomenon: "Monsoon Surge Cloudbursts" },
        "gj": { name: "Gujarat", zone: "semiarid", zoneLabel: "Semi-Arid", tempSummer: "41°C", tempWinter: "13°C", rainfall: "700 mm", rainfallClass: "medium", seasonClass: "monsoon-sw", desc: "Semi-arid in the plains, desert conditions in the Rann of Kutch. Extreme diurnal range in desert.", phenomenon: "Rann of Kutch Salt Mirages" },
        "hr": { name: "Haryana", zone: "semiarid", zoneLabel: "Semi-Arid", tempSummer: "41°C", tempWinter: "10°C", rainfall: "450 mm", rainfallClass: "low", seasonClass: "summer-loo", desc: "Continental semi-arid zone with dry hot summers and cold winters. High agrarian dependence on irrigation.", phenomenon: "Loo Dry Winds & Dust Swirls" },
        "hp": { name: "Himachal Pradesh", zone: "montane", zoneLabel: "Montane / Alpine", tempSummer: "24°C", tempWinter: "2°C", rainfall: "1200 mm", rainfallClass: "moderate", seasonClass: "winter-snow", desc: "Mountain-dominated alpine climate with cold snow seasons. Mild and pleasant summers in hill stations.", phenomenon: "Alpine Snowstorms & Western Disturbances" },
        "jk": { name: "Jammu and Kashmir", zone: "montane", zoneLabel: "Montane / Alpine", tempSummer: "20°C", tempWinter: "-5°C", rainfall: "600 mm", rainfallClass: "medium", seasonClass: "winter-snow", desc: "Himalayan montane climate. Snow blocks high passes in winter while valleys experience cold rains.", phenomenon: "Snow-bearing Western Disturbances" },
        "jh": { name: "Jharkhand", zone: "subtropical", zoneLabel: "Humid Subtropical", tempSummer: "36°C", tempWinter: "14°C", rainfall: "1200 mm", rainfallClass: "moderate", seasonClass: "monsoon-sw", desc: "Sub-tropical plateau climate with pleasant winters and hot summers. Heavy pre-monsoon storms.", phenomenon: "Chota Nagpur Dry Lightning" },
        "ka": { name: "Karnataka", zone: "savanna", zoneLabel: "Tropical Savanna", tempSummer: "36°C", tempWinter: "16°C", rainfall: "1100 mm", rainfallClass: "moderate", seasonClass: "monsoon-sw", desc: "Interior regions are dry savanna, while the Western Ghats line experiences tropical rainforest rains.", phenomenon: "Pre-Monsoon Blossom Showers" },
        "kl": { name: "Kerala", zone: "monsoon", zoneLabel: "Tropical Wet / Monsoon", tempSummer: "33°C", tempWinter: "22°C", rainfall: "3000 mm", rainfallClass: "heavy", seasonClass: "monsoon-sw", desc: "Tropical wet climate. The entry point of India's Southwest Monsoon (Edavappathy) with lush rainfall.", phenomenon: "Edavappathy Southwest Monsoon Onset" },
        "ld": { name: "Lakshadweep", zone: "monsoon", zoneLabel: "Tropical Wet / Monsoon", tempSummer: "32°C", tempWinter: "24°C", rainfall: "1600 mm", rainfallClass: "moderate", seasonClass: "monsoon-sw", desc: "Tropical oceanic climate. Warm and humid throughout the year with moderate maritime wind patterns.", phenomenon: "Oceanic Monsoon Storm Swells" },
        "mp": { name: "Madhya Pradesh", zone: "savanna", zoneLabel: "Tropical Savanna", tempSummer: "40°C", tempWinter: "14°C", rainfall: "1000 mm", rainfallClass: "moderate", seasonClass: "monsoon-sw", desc: "Savanna climate with high seasonal variation. Heavy rain in monsoon, hot summers, dry winters.", phenomenon: "Central Plateau Heatwave Loo" },
        "mh": { name: "Maharashtra", zone: "savanna", zoneLabel: "Tropical Savanna", tempSummer: "38°C", tempWinter: "15°C", rainfall: "1000 mm", desc: "Western coast (Konkan) gets heavy monsoon rains, while Deccan plateau lies in rain shadow.", rainfallClass: "moderate", seasonClass: "monsoon-sw", phenomenon: "Western Ghats Rain Shadow Deficit" },
        "mn": { name: "Manipur", zone: "subtropical", zoneLabel: "Humid Subtropical", tempSummer: "29°C", tempWinter: "10°C", rainfall: "1500 mm", rainfallClass: "moderate", seasonClass: "monsoon-sw", desc: "Humid subtropical highland climate. Winters are chilly and dry; summers are wet and mild.", phenomenon: "Loktak Lake Evaporation Fog" },
        "ml": { name: "Meghalaya", zone: "subtropical", zoneLabel: "Humid Subtropical", tempSummer: "25°C", tempWinter: "10°C", rainfall: "6000 mm", rainfallClass: "heavy", seasonClass: "monsoon-sw", desc: "Home to the wettest places on earth. High ridges force clouds to condense, creating massive rainfall.", phenomenon: "Orographic Cloud Wall Condensation" },
        "mz": { name: "Mizoram", zone: "subtropical", zoneLabel: "Humid Subtropical", tempSummer: "28°C", tempWinter: "11°C", rainfall: "2500 mm", rainfallClass: "heavy", seasonClass: "monsoon-sw", desc: "High mountain ridge climate. Very pleasant summers, wet winters, and constant cool wind flow.", phenomenon: "Mountain Ridge Mists & Wind Gap Caps" },
        "nl": { name: "Nagaland", zone: "subtropical", zoneLabel: "Humid Subtropical", tempSummer: "28°C", tempWinter: "9°C", rainfall: "1800 mm", rainfallClass: "moderate", seasonClass: "monsoon-sw", desc: "Hilly highland climate with high forest cover, heavy summer rain, and cold dry winters.", phenomenon: "Montane Valley Thermals" },
        "or": { name: "Odisha", zone: "savanna", zoneLabel: "Tropical Savanna", tempSummer: "38°C", tempWinter: "16°C", rainfall: "1450 mm", rainfallClass: "moderate", seasonClass: "monsoon-sw", desc: "Savanna climate bordering the sea. Heavily impacted by seasonal cyclones in September-November.", phenomenon: "Severe Bay of Bengal Cyclones" },
        "pb": { name: "Punjab", zone: "semiarid", zoneLabel: "Semi-Arid", tempSummer: "40°C", tempWinter: "10°C", rainfall: "500 mm", rainfallClass: "low", seasonClass: "summer-loo", desc: "Semi-arid continental climate. Extreme heatwaves in summers, sub-zero cold waves in winter.", phenomenon: "Dust Storms & Winter Western Rains" },
        "py": { name: "Puducherry", zone: "savanna", zoneLabel: "Tropical Savanna", tempSummer: "36°C", tempWinter: "22°C", rainfall: "1200 mm", rainfallClass: "moderate", seasonClass: "monsoon-ne", desc: "Coastal savanna climate. Receives major rainfall during the Northeast retreating monsoon.", phenomenon: "Retreating NE Monsoon Gales" },
        "rj": { name: "Rajasthan", zone: "arid", zoneLabel: "Arid / Desert", tempSummer: "45°C", tempWinter: "12°C", rainfall: "250 mm", rainfallClass: "arid", seasonClass: "summer-loo", desc: "Hot desert climate in Thar. Low rainfall, high evaporation, and cold desert nights.", phenomenon: "Desert Sandstorms (Andhi)" },
        "sk": { name: "Sikkim", zone: "montane", zoneLabel: "Montane / Alpine", tempSummer: "22°C", tempWinter: "4°C", rainfall: "2500 mm", rainfallClass: "heavy", seasonClass: "winter-snow", desc: "Alpine and tundra conditions at high altitudes. Heavy snowfall in winters, cool wet summers.", phenomenon: "Glacial Valley Avalanches" },
        "tg": { name: "Telangana", zone: "savanna", zoneLabel: "Tropical Savanna", tempSummer: "42°C", tempWinter: "15°C", rainfall: "850 mm", rainfallClass: "medium", seasonClass: "monsoon-sw", desc: "Dry savanna plateau climate. Extremely hot pre-monsoon season with dry heat waves.", phenomenon: "Deccan Plateau Heatwaves" },
        "tn": { name: "Tamil Nadu", zone: "savanna", zoneLabel: "Tropical Savanna", tempSummer: "37°C", tempWinter: "21°C", rainfall: "950 mm", rainfallClass: "medium", seasonClass: "monsoon-ne", desc: "Rain shadow in summer, but gets major rainfall during the Northeast Monsoon (Oct-Dec).", phenomenon: "Northeast Retreating Monsoon Currents" },
        "tr": { name: "Tripura", zone: "subtropical", zoneLabel: "Humid Subtropical", tempSummer: "33°C", tempWinter: "13°C", rainfall: "2200 mm", rainfallClass: "heavy", seasonClass: "monsoon-sw", desc: "Humid tropical climate. Heavy monsoon downpours and humid river plain heat.", phenomenon: "Humid Monsoon Flood Surges" },
        "up": { name: "Uttar Pradesh", zone: "subtropical", zoneLabel: "Humid Subtropical", tempSummer: "38°C", tempWinter: "12°C", rainfall: "950 mm", rainfallClass: "medium", seasonClass: "summer-loo", desc: "Continental sub-tropical climate. High summers, wet monsoons, and chilly dry winters.", phenomenon: "Hot Loo Winds & Winter Frost" },
        "ut": { name: "Uttarakhand", zone: "montane", zoneLabel: "Montane / Alpine", tempSummer: "25°C", tempWinter: "3°C", rainfall: "1500 mm", rainfallClass: "moderate", seasonClass: "winter-snow", desc: "Alpine and mountain climate. Heavy snowfall in higher reaches, major pilgrim valleys get rains.", phenomenon: "Cloudburst Floods & Landslides" },
        "wb": { name: "West Bengal", zone: "subtropical", zoneLabel: "Humid Subtropical", tempSummer: "36°C", tempWinter: "15°C", rainfall: "1600 mm", rainfallClass: "moderate", seasonClass: "monsoon-sw", desc: "Subtropical plains to coastal wet delta. Highly humid summers with severe lightning storm peaks.", phenomenon: "Nor'wester Lightning Storms" }
    };

    const climateZonesInfo = [
        { id: "montane", name: "Montane / Alpine Climate", koppen: "H / ET", icon: "🏔️", tagColor: "var(--climate-montane)", desc: "Characterized by cold winters, cool summers, and heavy snowfall at higher elevations. Houses alpine meadows, coniferous forests, and glacier-fed river systems.", avgTemp: "-10°C to 20°C", rainfall: "100 mm to 2500 mm", adaptation: "Sloping roofs to shed snow, heavy woollen clothing (Pheran, Bakhu), and terrace mountain agriculture." },
        { id: "subtropical", name: "Humid Subtropical Climate", koppen: "Cwa / Cfa", icon: "🌦️", tagColor: "var(--climate-subtropical)", desc: "Hot, humid summers and dry, mild winters. This region contains the fertile Indo-Gangetic plains, receiving abundant monsoon rainfall between June and September.", avgTemp: "10°C to 38°C", rainfall: "900 mm to 2500 mm", adaptation: "High-ceiling brick structures, light cotton garments, and intensive rice/wheat crop rotation cycles." },
        { id: "savanna", name: "Tropical Savanna (Wet & Dry)", koppen: "Aw", icon: "🌾", tagColor: "var(--climate-savanna)", desc: "Predominates across the Deccan Plateau. Temperatures remain warm year-round with a long dry season followed by moderate monsoon rains.", avgTemp: "15°C to 42°C", rainfall: "700 mm to 1500 mm", adaptation: "Rainwater harvesting channels (Eris, Kunds), mud-plastered walls for insulation, and drought-hardy millets." },
        { id: "monsoon", name: "Tropical Wet / Monsoon", koppen: "Am / Af", icon: "🌴", tagColor: "var(--climate-monsoon)", desc: "Found along the Malabar Coast, Western Ghats, and Andaman Islands. Experiences high humidity and temperatures with exceptionally heavy rains from Southwest Monsoon currents.", avgTemp: "21°C to 34°C", rainfall: "1500 mm to 3500 mm", adaptation: "Verandah houses with clay tiles, lightweight breathable clothing, and spices/coconut/rubber plantation farming." },
        { id: "semiarid", name: "Semi-Arid Climate", koppen: "BSh", icon: "🌵", tagColor: "var(--climate-semiarid)", desc: "A transition zone bordering the desert regions. Warm dry winters and extremely hot summers with low and highly variable monsoon rainfall.", avgTemp: "10°C to 41°C", rainfall: "400 mm to 700 mm", adaptation: "Deep stepwells (Baoris) for water storage, pastoral animal husbandry (sheep, camel), and drought-resistant crops." },
        { id: "arid", name: "Arid / Desert Climate", koppen: "BWh", icon: "☀️", tagColor: "var(--climate-arid)", desc: "Centred over the Thar Desert of Rajasthan and Rann of Kutch. Very low precipitation, sparse scrub vegetation, and high diurnal (day-night) temperature drops.", avgTemp: "5°C to 48°C", rainfall: "< 250 mm", adaptation: "Thick-walled clay homes with tiny windows to exclude sand, underground tanks (Tanka), and seasonal pastoralism." }
    ];

    const legendsConfig = {
        climate: [
            { id: "montane", label: "Montane / Alpine", color: "var(--climate-montane)" },
            { id: "subtropical", label: "Humid Subtropical", color: "var(--climate-subtropical)" },
            { id: "savanna", label: "Tropical Savanna", color: "var(--climate-savanna)" },
            { id: "monsoon", label: "Tropical Wet / Monsoon", color: "var(--climate-monsoon)" },
            { id: "semiarid", label: "Semi-Arid", color: "var(--climate-semiarid)" },
            { id: "arid", label: "Arid / Desert", color: "var(--climate-arid)" }
        ],
        rainfall: [
            { id: "heavy", label: "Heavy (> 2000 mm)", color: "var(--rain-heavy)" },
            { id: "moderate", label: "Moderate (1000 - 2000 mm)", color: "var(--rain-moderate)" },
            { id: "medium", label: "Medium (500 - 1000 mm)", color: "var(--rain-medium)" },
            { id: "low", label: "Low (250 - 500 mm)", color: "var(--rain-low)" },
            { id: "arid", label: "Arid (< 250 mm)", color: "var(--rain-arid)" }
        ],
        seasons: [
            { id: "winter-snow", label: "Winter Snow (Western Disturbances)", color: "#7c3aed" },
            { id: "summer-loo", label: "Extreme Summer heat (Loo Winds)", color: "#ef4444" },
            { id: "monsoon-sw", label: "SW Monsoon (June-September Rain)", color: "#047857" },
            { id: "monsoon-ne", label: "NE Monsoon (Retreating Winter Rain)", color: "#0369a1" }
        ]
    };

    // -------------------------------------------------------------
    // 2. Global State Variable
    // -------------------------------------------------------------
    let currentView = "climate";
    let activeFilter = null;
    let pinnedState = null;

    // -------------------------------------------------------------
    // 3. UI Helper functions
    // -------------------------------------------------------------
    function renderLegend() {
        const legendList = document.getElementById("legend-list");
        if (!legendList) return;

        legendList.innerHTML = "";
        const items = legendsConfig[currentView];

        items.forEach(item => {
            const el = document.createElement("div");
            el.className = "legend-item";
            el.dataset.id = item.id;
            
            if (activeFilter && activeFilter !== item.id) {
                el.classList.add("dimmed");
            } else if (activeFilter === item.id) {
                el.classList.add("active-highlight");
            }

            el.innerHTML = `
                <div class="color-box" style="background-color: ${item.color}"></div>
                <span>${item.label}</span>
            `;

            // Hover interactions on Legend items
            el.addEventListener("mouseenter", () => {
                if (activeFilter) return; // Ignore hover if filter is pinned
                highlightPaths(item.id);
            });
            el.addEventListener("mouseleave", () => {
                if (activeFilter) return;
                resetHighlights();
            });

            // Click interaction to pin filter
            el.addEventListener("click", () => {
                toggleLegendFilter(item.id);
            });

            legendList.appendChild(el);
        });

        const clearBtn = document.getElementById("clear-map-filter");
        if (clearBtn) {
            if (activeFilter) {
                clearBtn.classList.remove("hidden");
            } else {
                clearBtn.classList.add("hidden");
            }
        }
    }

    function renderClimateCards() {
        const grid = document.getElementById("climate-cards-grid");
        if (!grid) return;

        grid.innerHTML = "";
        climateZonesInfo.forEach(zone => {
            const card = document.createElement("div");
            card.className = "climate-card";
            card.dataset.id = zone.id;

            if (currentView === "climate" && activeFilter && activeFilter !== zone.id) {
                card.classList.add("filtered-out");
            }

            card.innerHTML = `
                <div class="card-header-row">
                    <span class="card-icon">${zone.icon}</span>
                    <span class="card-tag" style="background: rgba(255, 255, 255, 0.05); color: ${zone.tagColor}; border: 1px solid ${zone.tagColor}33">${zone.koppen}</span>
                </div>
                <h3>${zone.name}</h3>
                <div class="card-koppen">Classification: Köppen ${zone.koppen}</div>
                <p class="card-description">${zone.desc}</p>
                <div class="card-details">
                    <div class="card-detail-item">
                        <span class="lbl">🌡️ Temp Range:</span>
                        <span class="val">${zone.avgTemp}</span>
                    </div>
                    <div class="card-detail-item">
                        <span class="lbl">🌧️ Rainfall:</span>
                        <span class="val">${zone.rainfall}</span>
                    </div>
                    <div class="card-detail-item" style="flex-direction: column; align-items: flex-start; margin-top: 10px;">
                        <span class="lbl" style="margin-bottom: 5px; font-weight: 700; color: #ffd54f;">🌱 Local Adaptation:</span>
                        <span class="val" style="font-size: 0.85rem; line-height: 1.4; color: var(--text-sub);">${zone.adaptation}</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function highlightPaths(filterId) {
        const paths = document.querySelectorAll(".state-path");
        paths.forEach(path => {
            const stateId = path.dataset.id;
            const data = stateClimateData[stateId];
            if (!data) return;

            let matches = false;
            if (currentView === "climate" && data.zone === filterId) matches = true;
            if (currentView === "rainfall" && data.rainfallClass === filterId) matches = true;
            if (currentView === "seasons" && data.seasonClass === filterId) matches = true;

            if (matches) {
                path.classList.remove("map-dimmed");
            } else {
                path.classList.add("map-dimmed");
            }
        });
    }

    function resetHighlights() {
        const paths = document.querySelectorAll(".state-path");
        paths.forEach(path => {
            path.classList.remove("map-dimmed");
        });
    }

    function toggleLegendFilter(filterId) {
        if (activeFilter === filterId) {
            activeFilter = null;
        } else {
            activeFilter = filterId;
        }

        renderLegend();
        renderClimateCards();

        if (activeFilter) {
            highlightPaths(activeFilter);
        } else {
            resetHighlights();
        }
    }

    // Colors mapping functions based on views
    function getStateColorClass(stateId) {
        const data = stateClimateData[stateId];
        if (!data) return "";

        if (currentView === "climate") {
            return `zone-${data.zone}`;
        } else if (currentView === "rainfall") {
            return `rain-${data.rainfallClass}`;
        } else if (currentView === "seasons") {
            return `season-${data.seasonClass}`;
        }
        return "";
    }

    function updateMapColors() {
        const paths = document.querySelectorAll(".state-path");
        paths.forEach(path => {
            const stateId = path.dataset.id;
            
            // Remove previous view mode classes
            path.classList.remove(
                "zone-montane", "zone-subtropical", "zone-savanna", "zone-monsoon", "zone-semiarid", "zone-arid",
                "rain-heavy", "rain-moderate", "rain-medium", "rain-low", "rain-arid",
                "season-winter-snow", "season-summer-loo", "season-monsoon-sw", "season-monsoon-ne"
            );

            // Add the new class
            const colorClass = getStateColorClass(stateId);
            if (colorClass) {
                path.classList.add(colorClass);
            }
        });
    }

    // Details sidebar panels
    function updateDetailsPanel(stateId) {
        const placeholder = document.getElementById("detail-placeholder-content");
        const activeContent = document.getElementById("detail-active-content");

        if (!stateId || !stateClimateData[stateId]) {
            if (placeholder) placeholder.classList.remove("hidden");
            if (activeContent) activeContent.classList.add("hidden");
            return;
        }

        if (placeholder) placeholder.classList.add("hidden");
        if (activeContent) activeContent.classList.remove("hidden");

        const data = stateClimateData[stateId];
        
        document.getElementById("detail-state-code").innerText = stateId;
        document.getElementById("detail-state-name").innerText = data.name;
        document.getElementById("detail-temp-summer").innerText = data.tempSummer;
        document.getElementById("detail-temp-winter").innerText = data.tempWinter;
        document.getElementById("detail-rainfall-val").innerText = data.rainfall;
        document.getElementById("detail-climate-type").innerText = data.zoneLabel;
        document.getElementById("detail-state-desc").innerText = data.desc;
        document.getElementById("detail-phenomenon").innerText = data.phenomenon;
    }

    // -------------------------------------------------------------
    // 4. Map rendering & bindings
    // -------------------------------------------------------------
    function renderSVGMap() {
        const mapContainer = document.getElementById("climate-map-container");
        if (!mapContainer || typeof mapData === "undefined") return;

        // Clear loading state
        mapContainer.innerHTML = "";

        const svgNamespace = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("viewBox", mapData.viewBox);
        svg.setAttribute("class", "india-svg-map");

        const g = document.createElementNS(svgNamespace, "g");

        mapData.locations.forEach(loc => {
            const path = document.createElementNS(svgNamespace, "path");
            path.setAttribute("d", loc.path);
            path.setAttribute("class", "state-path");
            path.setAttribute("id", `climate-state-${loc.id}`);
            path.setAttribute("data-id", loc.id);
            path.setAttribute("data-name", loc.name);

            // Keyboard accessibility
            path.setAttribute("tabindex", "0");
            path.setAttribute("role", "button");
            path.setAttribute("aria-label", loc.name);

            // Bind mouse events
            path.addEventListener("mouseenter", (e) => {
                showTooltip(e, loc.id);
            });
            path.addEventListener("mousemove", (e) => {
                positionTooltip(e);
            });
            path.addEventListener("mouseleave", () => {
                hideTooltip();
            });
            path.addEventListener("click", () => {
                selectState(loc.id);
            });
            path.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectState(loc.id);
                }
            });

            g.appendChild(path);
        });

        svg.appendChild(g);
        mapContainer.appendChild(svg);

        // Update classes based on active mode
        updateMapColors();
    }

    // Tooltip display
    function showTooltip(e, stateId) {
        const tooltip = document.getElementById("climate-tooltip");
        const data = stateClimateData[stateId];
        if (!tooltip || !data) return;

        document.getElementById("tooltip-state-name").innerText = data.name;
        document.getElementById("tooltip-temp").innerText = `${data.tempWinter} / ${data.tempSummer}`;
        document.getElementById("tooltip-rainfall").innerText = data.rainfall;
        document.getElementById("tooltip-zone").innerText = data.zoneLabel;

        tooltip.style.opacity = "1";
        positionTooltip(e);
    }

    function positionTooltip(e) {
        const tooltip = document.getElementById("climate-tooltip");
        if (!tooltip) return;

        const tooltipW = tooltip.offsetWidth || 200;
        const tooltipH = tooltip.offsetHeight || 120;

        let x = e.clientX + 16;
        let y = e.clientY + 16;

        if (x + tooltipW > window.innerWidth) x = e.clientX - tooltipW - 12;
        if (y + tooltipH > window.innerHeight) y = e.clientY - tooltipH - 12;

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
    }

    function hideTooltip() {
        const tooltip = document.getElementById("climate-tooltip");
        if (tooltip) tooltip.style.opacity = "0";
    }

    function selectState(stateId) {
        const previousActive = document.querySelector(".state-path.map-pinned");
        if (previousActive) {
            previousActive.classList.remove("map-pinned");
        }

        if (pinnedState === stateId) {
            pinnedState = null;
            updateDetailsPanel(null);
        } else {
            pinnedState = stateId;
            const pathEl = document.getElementById(`climate-state-${stateId}`);
            if (pathEl) pathEl.classList.add("map-pinned");
            updateDetailsPanel(stateId);
        }
    }

    // -------------------------------------------------------------
    // 5. Initializer & Event bindings
    // -------------------------------------------------------------
    function initExplorer() {
        renderSVGMap();
        renderLegend();
        renderClimateCards();

        // Bind View mode toggles
        const viewButtons = document.querySelectorAll(".view-btn");
        viewButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                viewButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                currentView = btn.dataset.view;
                activeFilter = null; // Clear active filter when view changes

                updateMapColors();
                resetHighlights();
                renderLegend();
                renderClimateCards();
            });
        });

        // Bind clear filter button
        const clearBtn = document.getElementById("clear-map-filter");
        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                activeFilter = null;
                resetHighlights();
                renderLegend();
                renderClimateCards();
            });
        }

        // Check if there is an initial deep link in URL
        const urlParams = new URLSearchParams(window.location.search);
        const urlZone = urlParams.get("zone");
        if (urlZone) {
            setTimeout(() => {
                toggleLegendFilter(urlZone);
                // Scroll down to cards section smoothly
                const cardsContainer = document.getElementById("climate-cards-container");
                if (cardsContainer) {
                    cardsContainer.scrollIntoView({ behavior: "smooth" });
                }
            }, 300);
        }
    }

    // Standard DOM Load registration
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initExplorer);
    } else {
        initExplorer();
    }

    // Hook into SPA Router events
    if (window.appLifecycle && typeof window.appLifecycle.registerCleanup === "function") {
        // Register cleanup functions if needed on route transition
        window.appLifecycle.registerCleanup(() => {
            hideTooltip();
            pinnedState = null;
            activeFilter = null;
        });
    }

})();
