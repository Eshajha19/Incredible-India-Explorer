// travel-recommend-data.js
// -----------------------------------------------------------------------------
// Dataset that powers the "Recommended For You" AI travel recommendation engine
// on travel.html (see issue #185). Each destination is tagged with:
//   - tags:    interest categories used for preference-based filtering
//              (mountains, beaches, heritage, adventure, wildlife, food, desert,
//               islands, forests, spiritual)
//   - budget:  'budget' | 'mid' | 'luxury'  (used for budget-aware suggestions)
//   - seasons: months/season labels this place is best visited in
//              ('winter', 'summer', 'monsoon', 'year-round')
//   - region:  used as a light tie-breaker for "similar destinations"
//
// Exposed as window.TRAVEL_DESTINATIONS in the browser, and via module.exports
// in Node so the scoring logic can be unit tested without a DOM.
// -----------------------------------------------------------------------------

(function (root) {
  const TRAVEL_DESTINATIONS = [
    {
      id: 'rec-ladakh',
      name: 'Ladakh',
      tagline: 'High-altitude desert & Buddhist monasteries',
      image: 'assets/travel_mountains.png',
      region: 'north',
      tags: ['mountains', 'adventure'],
      budget: 'mid',
      seasons: ['summer'],
      description: "Cross some of the world's highest motorable passes, camp beside turquoise Pangong Lake, and explore centuries-old monasteries clinging to cliffs."
    },
    {
      id: 'rec-manali',
      name: 'Manali',
      tagline: 'Snow peaks, river valleys & adventure sports',
      image: 'assets/travel_mountains.png',
      region: 'north',
      tags: ['mountains', 'adventure'],
      budget: 'mid',
      seasons: ['summer', 'winter'],
      description: 'A backpacker favourite in the Kullu Valley, offering paragliding, river rafting, snow treks, and easy access to the Rohtang Pass.'
    },
    {
      id: 'rec-spiti',
      name: 'Spiti Valley',
      tagline: 'Cold desert mountains & ancient monasteries',
      image: 'assets/travel_mountains.png',
      region: 'north',
      tags: ['mountains', 'adventure'],
      budget: 'budget',
      seasons: ['summer'],
      description: "Known as 'Little Tibet', a remote high-altitude circuit of unpaved roads, 1,000-year-old monasteries, and dramatic lunar landscapes."
    },
    {
      id: 'rec-goa',
      name: 'Goa',
      tagline: 'Sun-drenched beaches & Portuguese heritage',
      image: 'assets/travel_beaches.png',
      region: 'west',
      tags: ['beaches', 'food'],
      budget: 'mid',
      seasons: ['winter'],
      description: 'Golden shores, laid-back beach shacks, buzzing nightlife, and a unique Indo-Portuguese culture make Goa a classic coastal getaway.'
    },
    {
      id: 'rec-andaman',
      name: 'Andaman Islands',
      tagline: 'Coral reefs, marine life & pristine coves',
      image: 'assets/travel_islands.png',
      region: 'islands',
      tags: ['beaches', 'islands', 'wildlife'],
      budget: 'luxury',
      seasons: ['winter'],
      description: 'Scuba dive through vivid coral reefs, relax on Radhanagar Beach, and learn the poignant history of the Cellular Jail.'
    },
    {
      id: 'rec-lakshadweep',
      name: 'Lakshadweep',
      tagline: 'Remote coral atolls & turquoise lagoons',
      image: 'assets/travel_islands.png',
      region: 'islands',
      tags: ['beaches', 'islands'],
      budget: 'luxury',
      seasons: ['winter'],
      description: "India's smallest union territory — a cluster of coral atolls with some of the clearest lagoon waters in the country."
    },
    {
      id: 'rec-kerala-backwaters',
      name: 'Kerala Backwaters',
      tagline: 'Houseboats through palm-fringed canals',
      image: 'assets/travel_forests.png',
      region: 'south',
      tags: ['beaches', 'food', 'forests'],
      budget: 'mid',
      seasons: ['winter'],
      description: 'Drift through the tranquil canals of Alleppey and Kumarakom on a traditional houseboat, feasting on fresh Keralan seafood along the way.'
    },
    {
      id: 'rec-jaisalmer',
      name: 'Jaisalmer',
      tagline: 'Golden dunes & desert forts',
      image: 'assets/travel_deserts.png',
      region: 'west',
      tags: ['desert', 'heritage', 'adventure'],
      budget: 'mid',
      seasons: ['winter'],
      description: 'Camel safaris into the Thar Desert, nights under the stars in a luxury camp, and the honey-gold ramparts of Jaisalmer Fort.'
    },
    {
      id: 'rec-jaipur',
      name: 'Jaipur',
      tagline: 'The Pink City of palaces & bazaars',
      image: 'assets/travel_deserts.png',
      region: 'west',
      tags: ['heritage', 'food'],
      budget: 'mid',
      seasons: ['winter'],
      description: 'Wander through Amber Fort and Hawa Mahal, shop in vibrant bazaars, and sample legendary Rajasthani thalis.'
    },
    {
      id: 'rec-udaipur',
      name: 'Udaipur',
      tagline: 'The City of Lakes & royal palaces',
      image: 'assets/travel_deserts.png',
      region: 'west',
      tags: ['heritage'],
      budget: 'luxury',
      seasons: ['winter'],
      description: 'Shimmering lakes, opulent palace hotels, and romantic sunset boat rides make Udaipur one of India\u2019s most elegant destinations.'
    },
    {
      id: 'rec-hampi',
      name: 'Hampi',
      tagline: 'Ruins of the Vijayanagara Empire',
      image: 'assets/travel_hidden.png',
      region: 'south',
      tags: ['heritage', 'adventure'],
      budget: 'budget',
      seasons: ['winter'],
      description: 'A surreal UNESCO World Heritage boulder landscape scattered with 14th-century temple ruins, best explored by bicycle or on foot.'
    },
    {
      id: 'rec-varanasi',
      name: 'Varanasi',
      tagline: 'Ancient ghats on the sacred Ganges',
      image: 'assets/travel_hidden.png',
      region: 'north',
      tags: ['heritage', 'spiritual', 'food'],
      budget: 'budget',
      seasons: ['winter'],
      description: 'Witness the mesmerizing Ganga Aarti at dusk, wander the ghats at dawn, and experience one of the oldest living cities on Earth.'
    },
    {
      id: 'rec-rishikesh',
      name: 'Rishikesh',
      tagline: 'Yoga capital & whitewater rafting',
      image: 'assets/travel_mountains.png',
      region: 'north',
      tags: ['adventure', 'spiritual'],
      budget: 'budget',
      seasons: ['year-round'],
      description: 'Raft the rapids of the Ganges by day and join a riverside yoga or meditation session by evening in this Himalayan foothill town.'
    },
    {
      id: 'rec-ranthambore',
      name: 'Ranthambore National Park',
      tagline: 'Tiger safaris amid ruined forts',
      image: 'assets/travel_forests.png',
      region: 'west',
      tags: ['wildlife'],
      budget: 'mid',
      seasons: ['winter'],
      description: 'One of the best places in India to spot wild tigers, with jeep safaris weaving past lakes and the ruins of a 10th-century fort.'
    },
    {
      id: 'rec-kaziranga',
      name: 'Kaziranga National Park',
      tagline: 'Home to the one-horned rhinoceros',
      image: 'assets/travel_forests.png',
      region: 'northeast',
      tags: ['wildlife', 'forests'],
      budget: 'mid',
      seasons: ['winter'],
      description: 'A UNESCO World Heritage grassland sanctuary and the best place on Earth to see the great Indian one-horned rhinoceros in the wild.'
    },
    {
      id: 'rec-sundarbans',
      name: 'Sundarbans',
      tagline: 'Mangrove forests & the Royal Bengal Tiger',
      image: 'assets/travel_forests.png',
      region: 'east',
      tags: ['wildlife', 'forests'],
      budget: 'mid',
      seasons: ['winter'],
      description: "The world's largest mangrove forest, home to elusive Royal Bengal Tigers, saltwater crocodiles, and a maze of tidal waterways."
    },
    {
      id: 'rec-coorg',
      name: 'Coorg',
      tagline: 'Misty coffee estates in the Western Ghats',
      image: 'assets/travel_forests.png',
      region: 'south',
      tags: ['mountains', 'food', 'forests'],
      budget: 'mid',
      seasons: ['monsoon', 'winter'],
      description: 'Rolling coffee and spice plantations, waterfalls shrouded in mist, and some of South India\u2019s most distinctive Kodava cuisine.'
    },
    {
      id: 'rec-munnar',
      name: 'Munnar',
      tagline: 'Emerald tea gardens in the Western Ghats',
      image: 'assets/travel_forests.png',
      region: 'south',
      tags: ['mountains', 'forests'],
      budget: 'mid',
      seasons: ['winter'],
      description: 'Rolling hills carpeted in tea estates, cool mountain air, and scenic viewpoints across the Kannan Devan Hills.'
    },
    {
      id: 'rec-meghalaya',
      name: 'Meghalaya',
      tagline: 'Living root bridges & waterfall country',
      image: 'assets/travel_hidden.png',
      region: 'northeast',
      tags: ['adventure', 'forests', 'wildlife'],
      budget: 'mid',
      seasons: ['monsoon', 'winter'],
      description: 'Trek to centuries-old living root bridges woven by the Khasi tribe, and chase waterfalls in one of the wettest places on Earth.'
    },
    {
      id: 'rec-amritsar',
      name: 'Amritsar',
      tagline: 'The Golden Temple & Punjabi hospitality',
      image: 'assets/travel_hidden.png',
      region: 'north',
      tags: ['heritage', 'spiritual', 'food'],
      budget: 'budget',
      seasons: ['winter'],
      description: 'Witness the glowing Golden Temple at night, join the communal langar meal, and feast on legendary Punjabi food nearby.'
    }
  ];

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TRAVEL_DESTINATIONS };
  } else {
    root.TRAVEL_DESTINATIONS = TRAVEL_DESTINATIONS;
  }
})(typeof window !== 'undefined' ? window : globalThis);