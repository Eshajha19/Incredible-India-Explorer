/**
 * heritage-threats.js
 * Heritage Threat Monitor module tracking endangered sites across India.
 */

const heritageThreats = [
    {
        id: "taj-mahal-pollution",
        siteName: "Taj Mahal",
        location: "Agra, Uttar Pradesh",
        category: "pollution",
        categoryLabel: "Air & Industrial Pollution",
        badgeClass: "badge-pollution",
        severity: "critical",
        severityLabel: "Critical Risk",
        description: "Industrial emissions, rubber factories, and diesel exhaust lead to airborne soot deposition, causing yellowing of the pristine white Makrana marble facade and acid rain degradation.",
        conservationEfforts: "Taj Trapezium Zone (TTZ) established restricting heavy industries, zero-emission electric vehicle corridors implemented, and periodic mud-pack natural clay treatments applied."
    },
    {
        id: "majuli-island-erosion",
        siteName: "Majuli River Island",
        location: "Brahmaputra Basin, Assam",
        category: "climate",
        categoryLabel: "Climate Change & Erosion",
        badgeClass: "badge-climate",
        severity: "critical",
        severityLabel: "Critical Risk",
        description: "The world's largest inhabited river island has shrunk from over 1,200 sq km in 1900 to under 350 sq km due to severe Brahmaputra seasonal monsoon floods and riverbank erosion, threatening 500-year-old Neo-Vaishnavite Satras.",
        conservationEfforts: "Geo-textile riverbank reinforcement, bamboo porcupine dams, and bio-engineering projects along vulnerable banks."
    },
    {
        id: "jaisalmer-fort-water",
        siteName: "Jaisalmer Golden Fort",
        location: "Jaisalmer, Rajasthan",
        category: "water",
        categoryLabel: "Water Seepage & Structure",
        badgeClass: "badge-water",
        severity: "high",
        severityLabel: "High Concern",
        description: "Modern piped water supply without adequate drainage in the living fort has caused water seepage into soft yellow sandstone foundations on Trikuta Hill, leading to partial bastion collapses.",
        conservationEfforts: "Comprehensive drainage overhaul by ASI, sewage pipe replacement, and heritage housing capacity regulations."
    },
    {
        id: "sundarbans-sea-level",
        siteName: "Sundarbans Cultural & Eco Landscape",
        location: "South 24 Parganas, West Bengal",
        category: "climate",
        categoryLabel: "Climate Change & Coastal Erosion",
        badgeClass: "badge-climate",
        severity: "critical",
        severityLabel: "Critical Risk",
        description: "Accelerated sea-level rise (over 3mm/year) and intensifying Bay of Bengal cyclones submerge tidal islands, destroy mangrove habitats, and salinize historic coastal shrines and indigenous fishing settlements.",
        conservationEfforts: "Mangrove afforestation drives, embankment strengthening, and community climate resilience monitoring."
    },
    {
        id: "golden-temple-sarovar",
        siteName: "Sri Harmandir Sahib Surroundings",
        location: "Amritsar, Punjab",
        category: "pollution",
        categoryLabel: "Air & Industrial Pollution",
        badgeClass: "badge-pollution",
        severity: "high",
        severityLabel: "High Concern",
        description: "Heavy vehicular traffic, generator fumes, and agricultural stubble burning lead to high PM2.5 levels that dull gold foil gilding on the temple dome and pollute the sacred Sarovar water.",
        conservationEfforts: "Pedestrianized marble plaza around shrine, 24/7 air quality monitoring stations, and electric auto-rickshaw zone."
    },
    {
        id: "humayun-tomb-urban",
        siteName: "Humayun's Tomb Area",
        location: "Nizamuddin, New Delhi",
        category: "encroachment",
        categoryLabel: "Urban Encroachment",
        badgeClass: "badge-encroachment",
        severity: "moderate",
        severityLabel: "Moderate Watch",
        description: "High-density urban development, illegal vertical expansion, and infrastructure construction encroach upon the historical buffer zone of the 16th-century Mughal mausoleum complex.",
        conservationEfforts: "Aga Khan Trust for Culture (AKTC) buffer zone revitalization, Sundar Nursery urban park creation, and strict municipal building height caps."
    },
    {
        id: "hampi-ruins-tourism",
        siteName: "Hampi Monumental Complex",
        location: "Vijayanagara, Karnataka",
        category: "tourism",
        categoryLabel: "Tourism Pressure & Vandalism",
        badgeClass: "badge-tourism",
        severity: "high",
        severityLabel: "High Concern",
        description: "Unregulated commercial tourism, foot-traffic strain on dry-masonry stone structures, and occasional vandalism of carved pillars threaten Vijayanagara archaeological ruins.",
        conservationEfforts: "Visitor capacity capping at main temples, digital e-ticketing, security monitoring, and relocation of commercial markets outside core zone."
    },
    {
        id: "shimla-colonial-hillside",
        siteName: "Shimla Heritage Zone",
        location: "Shimla, Himachal Pradesh",
        category: "climate",
        categoryLabel: "Climate Change & Erosion",
        badgeClass: "badge-climate",
        severity: "high",
        severityLabel: "High Concern",
        description: "Unplanned concrete construction on steep hill slopes combined with intense cloudbursts causes landslides that damage 19th-century British colonial timber-and-stone architecture like the Viceregal Lodge.",
        conservationEfforts: "State green zone building bans, slope stability mapping, and heritage structure retrofitting."
    },
    {
        id: "konark-coastal-erosion",
        siteName: "Konark Sun Temple Coast",
        location: "Puri, Odisha",
        category: "climate",
        categoryLabel: "Climate Change & Erosion",
        badgeClass: "badge-climate",
        severity: "moderate",
        severityLabel: "Moderate Watch",
        description: "Coastal proximity exposes chlorite and khondalite stone carvings to saline sea winds and frequent severe Eastern Seaboard cyclones, causing surface flaking.",
        conservationEfforts: "Chemical weather-proofing coats, shelterbelt tree planting along coastline, and sand-fill structural reviews."
    },
    {
        id: "chilika-lake-heritage",
        siteName: "Chilika Lake Fishing Shrines",
        location: "Ganjam/Puri, Odisha",
        category: "water",
        categoryLabel: "Water Seepage & Ecosystem",
        badgeClass: "badge-water",
        severity: "moderate",
        severityLabel: "Moderate Watch",
        description: "Siltation, changed salinity balances, and illegal aquaculture encroach upon traditional fishing villages and island temples within Asia's largest brackish lagoon.",
        conservationEfforts: "Sea-mouth desiltation by Chilika Development Authority (CDA) and eco-tourism fishing community guidelines."
    }
];

/**
 * Filters threat items based on search query, category, and severity level.
 */
function getFilteredThreats(query = "", category = "all", severity = "all") {
    const q = query.toLowerCase().trim();
    return heritageThreats.filter(item => {
        const matchesCat = category === "all" || item.category === category;
        const matchesSev = severity === "all" || item.severity === severity;
        const matchesSearch = !q ||
            item.siteName.toLowerCase().includes(q) ||
            item.location.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.conservationEfforts.toLowerCase().includes(q);
        return matchesCat && matchesSev && matchesSearch;
    });
}

/**
 * Renders the threat monitor cards in the grid.
 */
function renderThreatsGrid() {
    if (typeof document === "undefined") return;

    const grid = document.getElementById("threats-grid");
    if (!grid) return;

    const query = document.getElementById("threat-search")?.value || "";
    const category = document.getElementById("category-filter")?.value || "all";
    const severity = document.getElementById("severity-filter")?.value || "all";

    const filtered = getFilteredThreats(query, category, severity);

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #8b949e;">
                <p>No endangered heritage sites match your filter criteria.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(site => `
        <div class="threat-card" data-id="${site.id}">
            <div>
                <div class="card-top">
                    <span class="badge ${site.badgeClass}">${site.categoryLabel}</span>
                    <span class="severity-pill severity-${site.severity}">${site.severityLabel}</span>
                </div>
                <h3>${site.siteName}</h3>
                <p class="location-text">📍 ${site.location}</p>
                <p class="threat-description">${site.description}</p>
            </div>
            <div class="conservation-box">
                <strong>🛡️ Conservation & Protection:</strong>
                <p>${site.conservationEfforts}</p>
            </div>
        </div>
    `).join('');
}

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        renderThreatsGrid();
        document.getElementById("threat-search")?.addEventListener("input", renderThreatsGrid);
        document.getElementById("category-filter")?.addEventListener("change", renderThreatsGrid);
        document.getElementById("severity-filter")?.addEventListener("change", renderThreatsGrid);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { heritageThreats, getFilteredThreats };
}
