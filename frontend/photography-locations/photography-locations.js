/**
 * photography-locations.js
 * Photography Locations Explorer — India's best photo spots with seasonal & lighting filters.
 */

const photographyLocations = [
    {
        id: "pangong-tso",
        name: "Pangong Tso Lake",
        location: "Leh, Ladakh",
        season: "winter",
        seasonLabel: "Winter (Nov–Mar)",
        timeOfDay: "sunrise",
        timeLabel: "Sunrise (5:30–7 AM)",
        image: "assets/explorer-images/pangong-lake.png",
        emoji: "🏔️",
        tip: "Arrive before first light to capture the electric-blue gradient transition of the lake surface as dawn ignites the Himalayan peaks. The frozen winter lake (Nov–Jan) creates mirror-perfect reflections.",
        gear: ["Wide-angle 16-35mm", "Tripod essential", "ND filters", "Extra batteries (cold)"]
    },
    {
        id: "varanasi-ghats",
        name: "Varanasi Ghats at Dawn",
        location: "Varanasi, Uttar Pradesh",
        season: "winter",
        seasonLabel: "Winter (Nov–Feb)",
        timeOfDay: "sunrise",
        timeLabel: "Sunrise (5:00–7 AM)",
        emoji: "🪔",
        tip: "Hire a boat on the Ganges from Dasaswamedh Ghat before 5 AM. The soft winter river mist diffuses the morning aarti fire light and diya lamps into spectacular bokeh across the ancient stone steps.",
        gear: ["50mm f/1.4 portrait", "Boat stability mat", "ND4 filter", "Rain sleeve"]
    },
    {
        id: "mehtab-bagh-taj",
        name: "Mehtab Bagh (Taj View)",
        location: "Agra, Uttar Pradesh",
        season: "autumn",
        seasonLabel: "Autumn (Oct–Nov)",
        timeOfDay: "sunrise",
        timeLabel: "Sunrise (6:00–7:30 AM)",
        emoji: "🕌",
        tip: "Cross the Yamuna to the Moonlit Garden opposite the Taj Mahal. At sunrise, the white marble dome glows amber-gold and mirrors perfectly in the river bend. Autumn has best atmospheric clarity.",
        gear: ["200–400mm telephoto", "Remote shutter release", "Polarizing filter", "Tripod"]
    },
    {
        id: "sam-sand-dunes",
        name: "Sam Sand Dunes (Thar Desert)",
        location: "Jaisalmer, Rajasthan",
        season: "winter",
        seasonLabel: "Winter (Oct–Mar)",
        timeOfDay: "golden",
        timeLabel: "Golden Hour (5:30–6:30 PM)",
        emoji: "🐪",
        tip: "Capture silhouettes of camel caravans cresting the 30-metre dunes against a burning orange sunset sky. The oblique evening light throws dramatic sand ripple shadows. Dusk star trails are spectacular.",
        gear: ["24-70mm zoom", "Circular polarizer", "Star tracker for astrophotography", "Dust bag"]
    },
    {
        id: "valley-of-flowers",
        name: "Valley of Flowers",
        location: "Chamoli, Uttarakhand",
        season: "monsoon",
        seasonLabel: "Monsoon (Jul–Aug)",
        timeOfDay: "midday",
        timeLabel: "Midday (10 AM–2 PM)",
        emoji: "🌸",
        tip: "The monsoon (July-August) blankets 87 sq km of Himalayan meadow with 500+ wildflower species including Brahma Kamal, blue Primula, and crimson Himalayan Bistort. Midday light saturation peaks color vibrancy.",
        gear: ["Macro 100mm f/2.8", "Wide zoom 16-35mm", "Waterproof bag", "Polarizer"]
    },
    {
        id: "matanga-hill-hampi",
        name: "Matanga Hill, Hampi",
        location: "Vijayanagara, Karnataka",
        season: "winter",
        seasonLabel: "Winter (Oct–Feb)",
        timeOfDay: "sunrise",
        timeLabel: "Sunrise (6:00–7:30 AM)",
        emoji: "🏛️",
        tip: "Trek 30 minutes before dawn to the hilltop shrine overlooking Hampi's entire boulder-studded ancient cityscape. The first sunbeams pierce through stone gopuram silhouettes — legendary travel photography spot.",
        gear: ["16-35mm wide angle", "Tripod", "Remote trigger", "Headlamp"]
    },
    {
        id: "munnar-tea-gardens",
        name: "Munnar Tea Gardens",
        location: "Munnar, Kerala",
        season: "spring",
        seasonLabel: "Spring (Feb–Apr)",
        timeOfDay: "midday",
        timeLabel: "Morning–Midday (7–11 AM)",
        emoji: "🍵",
        tip: "High-altitude terraced tea gardens create undulating green carpet patterns against misty Nilgiri peaks. Post-monsoon and spring give emerald green fresh growth. Early morning mist adds natural vignetting.",
        gear: ["Drone for aerial rows", "85mm portrait", "Polarizing filter", "Graduated ND"]
    },
    {
        id: "golden-temple-night",
        name: "Golden Temple (Night Reflection)",
        location: "Amritsar, Punjab",
        season: "winter",
        seasonLabel: "Winter (Nov–Feb)",
        timeOfDay: "night",
        timeLabel: "Night (8:00 PM–Midnight)",
        emoji: "⭐",
        tip: "The Harmandir Sahib illuminated in gold leaf glitter reflects perfectly in the Sarovar lake at night. Winter evenings offer mirror-still water and deep blue twilight sky for breathtaking long-exposure compositions.",
        gear: ["Wide 24mm f/1.8", "Tripod mandatory", "Remote shutter", "10–30s exposure"]
    },
    {
        id: "alleppey-backwaters",
        name: "Alleppey Backwaters",
        location: "Alappuzha, Kerala",
        season: "autumn",
        seasonLabel: "Autumn (Sep–Dec)",
        timeOfDay: "golden",
        timeLabel: "Golden Hour (5:30–7 PM)",
        emoji: "🌿",
        tip: "Rent a kettuvallam houseboat on Kerala's network of palm-fringed lagoons. At sunset, the low tropical light turns the still water copper, silhouetting coconut palms and fishermen's Chinese nets.",
        gear: ["24-70mm", "Graduated ND filter", "Telephoto for birds", "Waterproof housing"]
    },
    {
        id: "hawa-mahal-sunrise",
        name: "Hawa Mahal Facade",
        location: "Jaipur, Rajasthan",
        season: "winter",
        seasonLabel: "Winter (Oct–Mar)",
        timeOfDay: "sunrise",
        timeLabel: "Sunrise (6:30–8:00 AM)",
        emoji: "🏯",
        tip: "Position from the cafe rooftops or street-level at Tripolia Bazaar. The 953-latticed window honeycomb facade of Hawa Mahal blazes amber-pink in the first hour of morning light. Combine with street bazaar activity.",
        gear: ["50-200mm zoom", "Step stool for elevation", "Circular polarizer", "Street photography mode"]
    }
];

/**
 * Get filtered and searched photography locations.
 */
function getFilteredLocations(query = "", season = "all", time = "all") {
    const q = query.toLowerCase().trim();
    return photographyLocations.filter(loc => {
        const matchSeason = season === "all" || loc.season === season;
        const matchTime = time === "all" || loc.timeOfDay === time;
        const matchSearch = !q ||
            loc.name.toLowerCase().includes(q) ||
            loc.location.toLowerCase().includes(q) ||
            loc.tip.toLowerCase().includes(q);
        return matchSeason && matchTime && matchSearch;
    });
}

function renderPhotoGrid() {
    if (typeof document === "undefined") return;
    const grid = document.getElementById("photo-grid");
    if (!grid) return;

    const query = document.getElementById("photo-search")?.value || "";
    const season = document.getElementById("season-filter")?.value || "all";
    const time = document.getElementById("time-filter")?.value || "all";

    const filtered = getFilteredLocations(query, season, time);

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:#8b949e;">No photography locations match your filters.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(loc => `
        <div class="photo-card" data-id="${loc.id}">
            ${loc.image
                ? `<img src="${loc.image}" alt="${loc.name}" class="card-image" loading="lazy">`
                : `<div class="card-image-placeholder" style="background:linear-gradient(135deg,rgba(245,158,11,.15),rgba(16,185,129,.1))">${loc.emoji}</div>`
            }
            <div class="card-body">
                <div class="card-badges">
                    <span class="badge-season badge-${loc.season}">${loc.seasonLabel}</span>
                    <span class="badge-time badge-${loc.timeOfDay}">${loc.timeLabel}</span>
                </div>
                <h3>${loc.name}</h3>
                <p class="card-location">📍 ${loc.location}</p>
                <p class="card-tip">${loc.tip}</p>
                <div class="gear-section">
                    ${loc.gear.map(g => `<span class="gear-tag">📷 ${g}</span>`).join("")}
                </div>
            </div>
        </div>
    `).join("");
}

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        renderPhotoGrid();
        document.getElementById("photo-search")?.addEventListener("input", renderPhotoGrid);
        document.getElementById("season-filter")?.addEventListener("change", renderPhotoGrid);
        document.getElementById("time-filter")?.addEventListener("change", renderPhotoGrid);
    });
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { photographyLocations, getFilteredLocations };
}
