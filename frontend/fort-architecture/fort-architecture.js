/**
 * fort-architecture.js
 * Indian Fort Architecture Comparison Explorer
 */

const fortStyles = {
    rajput: {
        id: "rajput",
        name: "Rajput Forts",
        icon: "🏰",
        era: "7th–19th century CE",
        color: "#f97316",
        overview: "Built on imposing natural geography — hilltops, cliffs, and desert ridges — Rajput forts epitomize chivalric valor. Characterized by multiple concentric walls, elaborate gate systems (Pols), and intricate palace apartments within the military structure.",
        defenseStrategy: "Hilltop citadels exploiting natural terrain. Zigzag entry gates (Pol) with elephant-stopper spikes, catapult towers (Murar), and concealed water channels.",
        materials: "Yellow and red Jodhpur sandstone, granite, local limestone. Lime mortar with jaggery additive for binding strength.",
        artisticStyle: "Intricate Jali screens, chhatris (umbrella domes), Sheesh Mahal mirror mosaics, zenana murals in bright Rajasthani pigments.",
        waterSystems: "Stepped reservoirs (Kunds), hidden cisterns collecting rainwater, tunnels to natural springs within hillforts.",
        highlights: ["Multi-layered concentric walls", "Ornate Jharokha overhanging balconies", "Elephants-proof spiked gates", "Integrated palace-and-fort complex"],
        landmarks: ["Mehrangarh Fort, Jodhpur", "Chittorgarh Fort, Rajasthan", "Amber Fort, Jaipur", "Kumbhalgarh Fort, Rajasthan", "Junagarh Fort, Bikaner"]
    },
    mughal: {
        id: "mughal",
        name: "Mughal Forts",
        icon: "🕌",
        era: "16th–18th century CE",
        color: "#8b5cf6",
        overview: "Mughal forts synthesized Persian, Central Asian, and Indian architectural traditions. They served simultaneously as military fortifications and royal palaces, featuring grand open courtyards, garden-pavilions, and audience halls within formidable sandstone walls.",
        defenseStrategy: "Massive red sandstone curtain walls (40–70 ft thick), wide moats, strategically positioned bastions for flanking fire, and underground escape tunnels.",
        materials: "Agra red sandstone base with white Makrana marble inlaid palace interiors. Imported Afghan lapis lazuli and Persian faience tilework on throne rooms.",
        artisticStyle: "Pietra Dura inlay marble work, Persian arabesques, Diwan-i-Khas open-pillared audience halls, Chini Ka Rauza Persian tile facades.",
        waterSystems: "Sophisticated hydraulic engineering: canal-fed central tanks, hammam baths, subterranean aqueducts, and Mughal garden chahar-bagh water channels.",
        highlights: ["Diwan-i-Aam and Diwan-i-Khas dual courts", "Red sandstone rampart walls", "Intricate pietra dura marble inlays", "Enclosed Mughal char-bagh gardens"],
        landmarks: ["Agra Fort, Uttar Pradesh", "Red Fort (Lal Qila), Delhi", "Lahore Fort (Pakistan)", "Golconda Fort, Hyderabad", "Allahabad Fort, Prayagraj"]
    },
    maratha: {
        id: "maratha",
        name: "Maratha Forts",
        icon: "⚔️",
        era: "17th–19th century CE",
        color: "#10b981",
        overview: "Maratha forts were lean, strategically functional military machines optimized for guerrilla warfare across the Western Ghats. Shivaji Maharaj's genius military engineering created both inaccessible mountain forts (Giridugg) and coastal sea forts (Jaldurga) to dominate trade and defend against Mughal and British forces.",
        defenseStrategy: "Inaccessible vertical cliff approaches, rolling terrain bastions for crossfire, concealed sally ports for cavalry raids, and sea forts controlling coastal shipping.",
        materials: "Local Deccan basalt and laterite. Dry-stone coursed masonry without mortar in mountain forts for structural flexibility during earthquakes.",
        artisticStyle: "Minimal ornamentation — pragmatic military architecture. Occasional carved Maratha royal emblems (Gadi inscription), deity niches at entrances.",
        waterSystems: "Rock-cut cisterns (Hauda) carved into basalt summit plateaus, spring tapping via underground qanat channels, and coastal fort tidal pools.",
        highlights: ["Sea forts (Jaldurga) controlling ocean lanes", "Cliff-edge positioning requiring rope ladders", "Minimal ornamentation for stealth", "Interconnected signaling fire-tower networks"],
        landmarks: ["Raigad Fort, Raigad", "Sinhagad Fort, Pune", "Pratapgad Fort, Satara", "Murud-Janjira Sea Fort, Raigad", "Vijaydurg Sea Fort, Sindhudurg"]
    },
    european: {
        id: "european",
        name: "European / Colonial Forts",
        icon: "⚓",
        era: "16th–19th century CE",
        color: "#06b6d4",
        overview: "Portuguese, Dutch, French, and British colonial forts introduced star-fort (trace italienne) geometry optimized for cannon warfare. Angular bastions eliminated dead zones for flanking fire, while coastal positioning prioritized naval control of trade routes over land defense.",
        defenseStrategy: "Star-shaped bastions eliminating cannon dead-zones, low-profile thick earthwork walls to absorb cannonball impact, moats, and overlapping fields of fire.",
        materials: "Laterite stone (Portuguese), brick and lime mortar (British and Dutch). Later British forts used industrial-era fired brick, wrought iron, and imported Scottish granite.",
        artisticStyle: "European baroque chapel facades within fort precincts, British colonial Neo-Classical officer's quarters, Portuguese Manueline stone window carvings.",
        waterSystems: "Fresh water cisterns with rainwater collection, underground magazines designed to remain dry, and coastal forts with desalination filtration wells.",
        highlights: ["Star-shaped trace italienne bastion plan", "Low-profile walls for cannon resistance", "Coastal and river-mouth positioning", "Chapel and administrative quarters within"],
        landmarks: ["Fort Aguada, Goa", "Fort St. George, Chennai", "Fort William, Kolkata", "Diu Fort, Daman & Diu", "Chapora Fort, North Goa"]
    }
};

const FEATURES = [
    { key: "era", label: "Historical Period" },
    { key: "defenseStrategy", label: "Defense Strategy" },
    { key: "materials", label: "Building Materials" },
    { key: "artisticStyle", label: "Artistic Style" },
    { key: "waterSystems", label: "Water Systems" },
    { key: "highlights", label: "Key Highlights" },
    { key: "landmarks", label: "Landmark Examples" }
];

/**
 * Renders a single comparison column for the given style ID.
 */
function renderColumn(styleId) {
    const style = fortStyles[styleId];
    if (!style) return "";

    return `
        <div class="comparison-column">
            <div class="column-header" style="background:linear-gradient(135deg,${style.color}22,${style.color}08);border-bottom:3px solid ${style.color};">
                <span class="style-icon">${style.icon}</span>
                <h3 style="color:${style.color}">${style.name}</h3>
                <span class="style-era">${style.era}</span>
            </div>
            <div class="column-body">
                ${FEATURES.map(f => {
                    const val = style[f.key];
                    let content = "";
                    if (Array.isArray(val)) {
                        if (f.key === "landmarks") {
                            content = `<ul class="landmark-list">${val.map(v => `<li>${v}</li>`).join("")}</ul>`;
                        } else {
                            content = val.map(v => `<span class="highlight-tag">${v}</span>`).join("");
                        }
                    } else {
                        content = `<span class="feature-value">${val}</span>`;
                    }
                    return `
                        <div class="feature-row">
                            <div class="feature-label">${f.label}</div>
                            <div>${content}</div>
                        </div>
                    `;
                }).join("")}
            </div>
        </div>
    `;
}

/**
 * Renders both comparison columns.
 */
function renderComparison() {
    if (typeof document === "undefined") return;
    const grid = document.getElementById("comparison-grid");
    if (!grid) return;

    const styleA = document.getElementById("style-a")?.value || "rajput";
    const styleB = document.getElementById("style-b")?.value || "mughal";

    grid.innerHTML = renderColumn(styleA) + renderColumn(styleB);
}

/**
 * Renders all 4 fort style overview cards at the bottom.
 */
function renderOverview() {
    if (typeof document === "undefined") return;
    const overview = document.getElementById("styles-overview");
    if (!overview) return;

    overview.innerHTML = Object.values(fortStyles).map(style => `
        <div class="style-overview-card">
            <span class="overview-icon">${style.icon}</span>
            <h3 style="color:${style.color}">${style.name}</h3>
            <p class="overview-era">${style.era}</p>
            <p class="overview-desc">${style.overview}</p>
        </div>
    `).join("");
}

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        renderComparison();
        renderOverview();
        document.getElementById("style-a")?.addEventListener("change", renderComparison);
        document.getElementById("style-b")?.addEventListener("change", renderComparison);
    });
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { fortStyles, FEATURES, renderColumn };
}
