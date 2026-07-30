/**
 * Kolleru Lake Explorer Dataset
 * One of India's Largest Freshwater Lakes & Ramsar Site #1209
 */

export const KOLLERU_DATA = {
    id: 'kolleru-lake',
    name: 'Kolleru Lake Explorer',
    subtitle: 'India\'s Premier Spot-billed Pelican Sanctuary & Krishna-Godavari Freshwater Basin',
    location: 'Eluru & Bapatla Districts, Andhra Pradesh',
    ramsarSiteNo: 1209,
    ramsarDeclared: 2002,
    area: '901 km² (Monsoon) / 135 km² (Summer)',
    type: 'Freshwater Natural Lake & Flood Balancing Reservoir',
    coordinates: { lat: 16.63, lng: 81.33 },

    stats: [
        { label: 'Monsoon Lake Area', value: '901 km²', icon: '🌊' },
        { label: 'Winter Avian Visitors', value: '200,000+', icon: '🦩' },
        { label: 'Freshwater Fish Species', value: '63+', icon: '🐟' },
        { label: 'Spot-billed Pelican Colony', value: '5,000+', icon: '🦢' }
    ],

    geography: {
        title: 'Krishna-Godavari Inter-Deltaic Basin',
        content: 'Situated in Andhra Pradesh between the deltas of the Krishna and Godavari rivers, Kolleru Lake is a massive natural freshwater wetland. It acts as a natural flood-balancing reservoir, collecting catchment runoff from streams like Budameru, Tammileru, and Ramileru, before draining into the Bay of Bengal through the 60-km Upputeru channel.'
    },

    ramsarSite: {
        title: 'Ramsar Site & Wildlife Protection',
        content: 'Kolleru Lake was declared a Wildlife Sanctuary under the Wildlife Protection Act in 1999 and designated a Ramsar Wetland of International Importance in 2002 (Site #1209). Comprehensive eco-restoration operations ("Operation Kolleru") removed illegal aquaculture bunds to revive the lake\'s natural hydrology.'
    },

    birdSanctuary: {
        title: 'Atapaka Bird Sanctuary & Pelican Haven',
        content: 'The Atapaka sanctuary area within Kolleru is world-famous as one of the largest breeding colonies of Spot-billed Pelicans (Pelecanus philippensis) and Painted Storks in South Asia. Artificial nesting mounds and tall Barringtonia trees provide safe roosting for migratory birds arriving from Northern Eurasia and Central Asia.'
    },

    freshwaterEcosystem: {
        title: 'Shallow Freshwater Marsh Habitat',
        content: 'Kolleru is a shallow water body averaging 1 to 1.5 meters in depth. Dense floating macrophyte beds dominated by Phragmites karka, Typha angustata, and Nymphaea water lilies form a rich breeding ground for aquatic organisms.'
    },

    fishDiversity: {
        title: 'Rich Freshwater Fisheries',
        content: 'Kolleru supports over 63 species of freshwater fish, including Channa striata (Murrel), Anabas testudineus (Climbing Perch), Heteropneustes fossilis (Catfish), Labeo rohita, and freshwater prawns. It supports traditional fishing livelihoods across dozens of surrounding island villages (Lanka habitations).'
    },

    migratoryBirds: [
        { name: 'Spot-billed Pelican', status: 'Near Threatened', desc: 'Large waterbird with distinctive spotted beak; breeds in thousands at Atapaka.' },
        { name: 'Painted Stork', status: 'Breeding Resident', desc: 'Striking black-and-white pink-tinged stork nesting in dense colonies.' },
        { name: 'Glossy Ibis', status: 'Winter Migrant', desc: 'Iridescent metallic bronze-green ibis foraging in shallow marsh mudflats.' },
        { name: 'Asian Openbill Stork', status: 'Breeding Resident', desc: 'Specialized snail-eating stork with distinctive gap between bill mandibles.' }
    ],

    hotspots: [
        { id: 'atapaka', name: 'Atapaka Pelican Paradise', lat: 16.65, lng: 81.30, desc: 'World-famous pelican breeding site with bird-watching towers and boat rides.' },
        { id: 'eluru-watchtower', name: 'Eluru Eco-Tower', lat: 16.70, lng: 81.10, desc: 'Forest department watchtower overlooking the northern wetland marshes.' },
        { id: 'upputeru', name: 'Upputeru Drain Outlet', lat: 16.48, lng: 81.45, desc: 'Natural outlet channel connecting freshwater Kolleru to the Bay of Bengal.' },
        { id: 'peddainti', name: 'Peddainti Ammavari Temple', lat: 16.62, lng: 81.35, desc: 'Historic temple situated on Kolletikota island village inside the lake.' }
    ],

    gallery: [
        { title: 'Spot-billed Pelicans at Atapaka', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kolleru_Lake_Andhra_Pradesh.jpg/960px-Kolleru_Lake_Andhra_Pradesh.jpg', caption: 'Thousands of Spot-billed Pelicans nesting on Barringtonia trees at Atapaka.' },
        { title: 'Painted Storks Foraging', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Painted_Storks_Kolleru.jpg/960px-Painted_Storks_Kolleru.jpg', caption: 'Painted storks in shallow freshwater marshlands.' },
        { title: 'Sunset over Kolleru Waters', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kolleru_Sunset.jpg/960px-Kolleru_Sunset.jpg', caption: 'Golden sunset reflecting across calm open lake waters.' }
    ],

    facts: [
        'Kolleru is one of South Asia\'s largest breeding grounds for the Spot-billed Pelican.',
        'The lake acts as a vital natural flood-mitigation basin between Krishna and Godavari rivers.',
        'During winter months, over 200,000 birds flock to Kolleru along the East Asian-Australasian Flyway.'
    ]
};
