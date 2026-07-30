/**
 * Loktak Lake Explorer Dataset
 * World's Only Floating National Park & Ramsar Site #463
 */

export const LOKTAK_DATA = {
    id: 'loktak-lake',
    name: 'Loktak Lake Explorer',
    subtitle: 'Home of Floating Phumdis & the Endangered Sangai Dancing Deer',
    location: 'Bishnupur District, Manipur',
    ramsarSiteNo: 463,
    ramsarDeclared: 1990,
    area: '287 km²',
    type: 'Freshwater Lake & Wetland',
    coordinates: { lat: 24.55, lng: 93.8 },

    stats: [
        { label: 'Lake Surface Area', value: '287 km²', icon: '🌊' },
        { label: 'Sangai Deer Population', value: '250+', icon: '🦌' },
        { label: 'Floating NP Area', value: '40 km²', icon: '🌿' },
        { label: 'Aquatic Flora Species', value: '233+', icon: '🪷' }
    ],

    history: {
        title: 'Historical & Cultural Heart of Manipur',
        content: 'Loktak Lake has played a central role in the history, economy, and folklore of Manipur. Nearby Moirang was the ancient capital of the Moirang kingdom and the setting for the legendary Meitei love story of Khamba and Thoibi. During WWII, the Indian National Army (INA) hoisted the Indian tricolor flag for the first time on mainland soil at Moirang near Loktak in 1944.'
    },

    phumdis: {
        title: 'Floating Phumdis — Ecological Marvel',
        content: 'Phumdis are floating masses of vegetation, soil, and organic matter at various stages of decomposition. Covering a substantial portion of Loktak Lake, these floating mats range in thickness from a few inches to over 2 meters. During dry months, the phumdis sink to the lakebed to absorb nutrients before floating again when water levels rise.'
    },

    ramsarSite: {
        title: 'Ramsar Site & Ithai Barrage Challenge',
        content: 'Designated a Ramsar Wetland in 1990, Loktak was placed on the Montreux Record in 1993 due to changes in hydrological regime caused by the construction of the Ithai Barrage. Eco-restoration measures aim to restore natural water fluctuations and protect the fragile floating ecosystem.'
    },

    keibulLamjao: {
        title: 'Keibul Lamjao National Park',
        subtitle: 'The World\'s Only Floating National Park',
        content: 'Located on the southern rim of Loktak Lake, Keibul Lamjao spans 40 km² of floating phumdi terrain. It is the world\'s only floating national park, created specifically to protect the critically endangered Sangai deer from habitat loss and poaching.',
        highlights: [
            'Only habitat in the world for the wild Sangai deer.',
            'Park terrain shifts dynamically with wind and water currents.',
            'Guarded by local forest rangers on wooden dugout canoes.'
        ]
    },

    sangaiDeer: {
        title: 'Sangai Deer (Rucervus eldii eldii)',
        subtitle: 'The Dancing Deer of Manipur',
        content: 'The Sangai is an endangered brow-antlered deer species endemic to Manipur. Because they walk delicately over the spongy, swaying phumdi vegetation to balance their body weight, they appear to dance as they step, earning them the nickname "Dancing Deer".',
        status: 'Endangered (IUCN Red List)'
    },

    biodiversity: {
        title: 'Rich Flora & Avian Diversity',
        content: 'Loktak harbors 233 species of aquatic macrophytes, 100 species of birds, and over 400 animal species. Common bird inhabitants include the Black-necked Stork, Spot-billed Duck, Purple Heron, and Indian Cormorant.'
    },

    localCommunities: {
        title: 'Floating Villages & Phumshangs',
        content: 'Fishermen of the Meitei community live directly on the phumdis in floating huts known as Phumshangs. They utilize traditional circular fishing structures called Athapan to trap fish in the calm waters of the lake.'
    },

    hotspots: [
        { id: 'sendra', name: 'Sendra Island', lat: 24.52, lng: 93.80, desc: 'Elevated island hill offering 360-degree panoramic views of Loktak\'s floating phumdis.' },
        { id: 'keibul', name: 'Keibul Lamjao NP Core Zone', lat: 24.45, lng: 93.78, desc: 'Floating national park watchtower for spotting Sangai deer grazing at dawn.' },
        { id: 'karang', name: 'Karang Island', lat: 24.56, lng: 93.82, desc: 'India\'s first cashless island village situated in the middle of Loktak Lake.' },
        { id: 'moirang', name: 'Moirang INA Memorial', lat: 24.50, lng: 93.77, desc: 'Historic town where Netaji Subhash Chandra Bose\'s INA raised the tricolor in 1944.' },
        { id: 'phubala', name: 'Phubala Resort & Bay', lat: 24.53, lng: 93.75, desc: 'Scenic western shore bay popular for water sports and canoeing.' }
    ],

    gallery: [
        { title: 'Floating Phumdis of Loktak', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Loktak_lake_Manipur.jpg/960px-Loktak_lake_Manipur.jpg', caption: 'Aerial view of circular floating phumdis on Loktak Lake.' },
        { title: 'Sangai Deer in Keibul Lamjao', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Sangai_deer_Keibul_Lamjao.jpg/960px-Sangai_deer_Keibul_Lamjao.jpg', caption: 'Sangai deer standing alert on spongy phumdi grass.' },
        { title: 'Sendra Island Viewpoint', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Sendra_Island_Loktak.jpg/960px-Sendra_Island_Loktak.jpg', caption: 'Panoramic vista of the lake from Sendra hill.' },
        { title: 'Fisherman in Dugout Canoe', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Loktak_Fisherman.jpg/960px-Loktak_Fisherman.jpg', caption: 'Traditional Meitei fisherman navigating between floating huts.' }
    ],

    facts: [
        'Loktak is home to the world\'s only floating national park (Keibul Lamjao).',
        'Local villagers build floating huts called Phumshangs directly on top of thick phumdis.',
        'The Sangai deer\'s distinctive posture on swaying grass earned it the name "Dancing Deer".'
    ]
};
