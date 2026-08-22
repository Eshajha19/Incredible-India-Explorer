/**
 * Roopkund Trek Explorer — Data Module
 * Comprehensive dataset covering the Roopkund Trek (Chamoli, Garhwal Himalayas),
 * 5,029m Mystery Skeleton Lake, Ali & Bedni Bugyals, Junargali Ridge (5,120m),
 * Mt. Trishul and Nanda Ghunti vistas, and Nanda Devi Raj Jat pilgrimage history.
 */

const ROOPKUND_INFO = {
    id: "roopkund-trek",
    title: "Roopkund Trek (The Mystery Skeleton Lake)",
    region: "Chamoli District, Garhwal Himalayas, Uttarakhand",
    maxAltitude: "5,029 Meters (16,499 Feet) at Roopkund Lake / 5,120m at Junargali",
    trekDistance: "Approx. 53 km (Round Trip)",
    duration: "6 to 8 Days",
    difficulty: "Moderate to Difficult",
    baseCamp: "Lohajung Village (2,300m / 7,545 ft)",
    historicalMystery: "Hundreds of ancient skeletons dating to ~850 CE and ~1800 CE discovered by H.K. Madhwal in 1942",
    reveredPeaks: "Mt. Trishul (7,120m) & Mt. Nanda Ghunti (6,309m)",
    pilgrimageHeritage: "Sacred Nanda Devi Raj Jat Yatra 12-year pilgrimage trail",
    quickStats: [
        { label: "Lake Altitude", value: "5,029m (16,499 ft)", icon: "🏔️" },
        { label: "Difficulty", value: "Moderate–Difficult", icon: "🥾" },
        { label: "Duration", value: "6–8 Days (53 km)", icon: "⏱️" },
        { label: "Twin Bugyals", value: "Ali & Bedni Bugyal", icon: "🌿" },
        { label: "Base Village", value: "Lohajung, Chamoli", icon: "📍" },
        { label: "Mystery", value: "Ancient Skeletal Lake", icon: "💀" }
    ]
};

const TRAIL_CAMPSITES = [
    {
        day: "Day 1: Lohajung Base to Didna Village",
        altitude: "Lohajung (2,300m) to Didna (2,450m) — 8 km",
        description: "Trail descends to the Neel Ganga river via Raun Bagad bridge, ascending through rhododendron and oak forests to Didna settlement.",
        icon: "🌲"
    },
    {
        day: "Day 2: Didna to Ali Bugyal & Bedni Bugyal",
        altitude: "Didna to Ali Bugyal (3,400m) to Bedni Bugyal (3,550m) — 10 km",
        description: "Climb through dense forests into the vast emerald meadows of Ali Bugyal, continuing along gentle knolls to Bedni Kund reflecting Mt. Trishul.",
        icon: "🌿"
    },
    {
        day: "Day 3: Bedni Bugyal to Ghora Lotani & Patar Nachauni",
        altitude: "Bedni (3,550m) to Patar Nachauni (3,850m) — 7 km",
        description: "Trail crosses tree-line transitions and high-altitude pastures where alpine winds sweep across the open Himalayan ridges.",
        icon: "💨"
    },
    {
        day: "Day 4: Patar Nachauni to Kalu Vinayak & Bhagwabasa",
        altitude: "Patar Nachauni to Kalu Vinayak (4,300m) to Bhagwabasa (4,300m) — 5 km",
        description: "Ascending the stone-carved steps to the ancient black Ganesha shrine of Kalu Vinayak, leading to the barren stone haven of Bhagwabasa.",
        icon: "🛕"
    },
    {
        day: "Day 5: Summit Push to Roopkund Lake & Junargali Pass",
        altitude: "Bhagwabasa to Roopkund (5,029m) & Junargali (5,120m) — 6 km",
        description: "Pre-dawn snow climb to the glacial tarn of Roopkund Lake beneath the sheer vertical face of Mount Trishul.",
        icon: "🏔️"
    },
    {
        day: "Day 6: Descent to Bedni Bugyal & Wan Village to Lohajung",
        altitude: "Bhagwabasa to Bedni to Wan (2,400m) to Lohajung",
        description: "Rapid descent through the sacred Latu Devta temple grove and giant cypress trees of Wan village returning to Lohajung.",
        icon: "🏡"
    }
];

const HISTORICAL_MYSTERIES = [
    {
        topic: "The 1942 Discovery by H.K. Madhwal",
        description: "Forest Ranger Hari Kishan Madhwal discovered hundreds of human bones preserved in glacial ice during World War II.",
        icon: "🔍"
    },
    {
        topic: "DNA & Paleogenomics Breakthrough (2019)",
        description: "Nature Communications genetic study revealed two distinct events: South Asians (~800 CE) and Mediterranean migrants (~1800 CE).",
        icon: "🧬"
    },
    {
        topic: "Legend of King Jasdhawal & Nanda Devi Curse",
        description: "Garhwali folklore recounts King Jasdhawal of Kanauj and Queen Balampa incurring the wrath of Goddess Nanda Devi with fatal hailstorms.",
        icon: "👑"
    }
];

const REFERENCES = [
    { text: "Harney, É. et al. (2019). Ancient DNA from the skeletons of Roopkund Lake reveals Mediterranean migrants in India. Nature Communications.", link: "https://www.nature.com/articles/s41467-019-11357-9" },
    { text: "Uttarakhand Tourism Development Board (UTDB) — Roopkund Glacial Lake Profile.", link: "https://uttarakhandtourism.gov.in" },
    { text: "Archaeological Survey of India (ASI) — Heritage and Bio-archaeological Preservation in Garhwal.", link: "https://asi.nic.in" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ROOPKUND_INFO, TRAIL_CAMPSITES, HISTORICAL_MYSTERIES, REFERENCES };
}
