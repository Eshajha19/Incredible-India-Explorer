/**
 * space.js
 * Indian Space Heritage Explorer - Data & Application Logic
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

export const spaceData = [
  {
    id: "sdsc-shar",
    title: "Satish Dhawan Space Centre (SDSC SHAR)",
    state: "Andhra Pradesh",
    stateCode: "ap",
    location: "Sriharikota",
    category: "Launch Sites",
    yearEstablishedOrLaunched: 1971,
    type: "Primary Spaceport / Rocket Launch Complex",
    launchVehicleOrRocket: "SLV-3, ASLV, PSLV, GSLV, LVM3, SSLV",
    image: "assets/science/aditya-l1.png",
    description: "India's premier spaceport located on Sriharikota island along the Bay of Bengal, providing optimal launch azimuths over open ocean waters.",
    keyContributions: "Houses First and Second Launch Pads, Solid Propellant Plant, Vehicle Assembly Buildings, and Static Test Facilities. Has launched all major Indian space missions including Chandrayaan-1/2/3 and Mangalyaan.",
    tags: ["sdsc", "shar", "sriharikota", "andhra pradesh", "launch pad", "isro", "spaceport"]
  },
  {
    id: "vssc-trivandrum",
    title: "Vikram Sarabhai Space Centre (VSSC)",
    state: "Kerala",
    stateCode: "kl",
    location: "Thiruvananthapuram",
    category: "Research Centres",
    yearEstablishedOrLaunched: 1963,
    type: "Lead Launch Vehicle Development Centre",
    launchVehicleOrRocket: "SLV-3, PSLV, GSLV, LVM3, RLV",
    image: "assets/science/vikram-sarabhai.png",
    description: "Named after the Father of the Indian Space Program Dr. Vikram Sarabhai, VSSC is ISRO's lead facility for rocket technology development.",
    keyContributions: "Responsible for research and development of launch vehicles (PSLV, GSLV, LVM3), solid propellants, aerodynamics, composite materials, and avionics.",
    tags: ["vssc", "vikram sarabhai", "thiruvananthapuram", "kerala", "rocket development", "isro"]
  },
  {
    id: "ursc-bengaluru",
    title: "UR Rao Satellite Centre (URSC)",
    state: "Karnataka",
    stateCode: "ka",
    location: "Bengaluru",
    category: "Research Centres",
    yearEstablishedOrLaunched: 1972,
    type: "Lead Satellite Design & Manufacturing Centre",
    launchVehicleOrRocket: "Satellites (INSAT, GSAT, IRS, Chandrayaan, Mangalyaan)",
    image: "assets/science/aryabhata.png",
    description: "Formerly ISRO Satellite Centre (ISAC), URSC is the lead centre for design, development, fabrication, and testing of all Indian spacecraft.",
    keyContributions: "Built over 100 satellites including India's first satellite Aryabhata, remote sensing series IRS, communication satellites GSAT, and lunar/interplanetary probes.",
    tags: ["ursc", "ur rao", "bengaluru", "karnataka", "satellites", "isac", "isro"]
  },
  {
    id: "sac-ahmedabad",
    title: "Space Applications Centre (SAC)",
    state: "Gujarat",
    stateCode: "gj",
    location: "Ahmedabad",
    category: "Research Centres",
    yearEstablishedOrLaunched: 1972,
    type: "Communication & Remote Sensing Payload Centre",
    launchVehicleOrRocket: "Communication & Earth Observation Payloads",
    image: "assets/West_India.png",
    description: "A major ISRO R&D facility focused on practical application of space technology for national development in communication, navigation, and remote sensing.",
    keyContributions: "Develops optical and microwave sensors for remote sensing satellites, satellite communication transponders, NavIC navigation receivers, and weather instruments.",
    tags: ["sac", "ahmedabad", "gujarat", "payloads", "remote sensing", "navic", "isro"]
  },
  {
    id: "lpsc-valiamala",
    title: "Liquid Propulsion Systems Centre (LPSC)",
    state: "Kerala",
    stateCode: "kl",
    location: "Valiamala (Thiruvananthapuram) & Bengaluru",
    category: "Research Centres",
    yearEstablishedOrLaunched: 1987,
    type: "Liquid & Cryogenic Rocket Engine Centre",
    launchVehicleOrRocket: "Vikas Engine, CE-20 Cryogenic Engine",
    image: "assets/travel_mountains.png",
    description: "The centre of excellence for liquid and cryogenic propulsion control systems powering ISRO's operational launch vehicles.",
    keyContributions: "Developed the hypergolic Vikas engine used in PSLV/GSLV stages, indigenous CE-7.5 and CE-20 Cryogenic engines for LVM3, and satellite thrusters.",
    tags: ["lpsc", "valiamala", "kerala", "cryogenic", "vikas engine", "propulsion", "isro"]
  },
  {
    id: "nrsc-hyderabad",
    title: "National Remote Sensing Centre (NRSC)",
    state: "Telangana",
    stateCode: "tg",
    location: "Hyderabad",
    category: "Research Centres",
    yearEstablishedOrLaunched: 1974,
    type: "Earth Observation Data & Disaster Management",
    launchVehicleOrRocket: "IRS, Cartosat, Resourcesat Data Processing",
    image: "assets/South_India.png",
    description: "Responsible for acquisition, processing, dissemination, and application of Earth observation satellite data across India.",
    keyContributions: "Operates Shadnagar ground station, supports Bhuvan geospatial platform, disaster monitoring during floods/cyclones, and agricultural crop assessment.",
    tags: ["nrsc", "hyderabad", "telangana", "remote sensing", "earth observation", "bhuvan", "isro"]
  },
  {
    id: "terls-thumba",
    title: "Thumba Equatorial Rocket Launching Station (TERLS)",
    state: "Kerala",
    stateCode: "kl",
    location: "Thumba (Thiruvananthapuram)",
    category: "Launch Sites",
    yearEstablishedOrLaunched: 1963,
    type: "Equatorial Sounding Rocket Launching Site",
    launchVehicleOrRocket: "Nike-Apache, RH-200 Rohini Sounding Rockets",
    image: "assets/travel_beaches.png",
    description: "The historic cradle of the Indian space program located on the geomagnetic equator, established with UN international support.",
    keyContributions: "Launched India's very first sounding rocket on Nov 21, 1963 (Nike-Apache). Served as the launching pad for upper atmospheric and electrojet research.",
    tags: ["terls", "thumba", "kerala", "sounding rocket", "first launch", "isro", "equatorial"]
  },
  {
    id: "istrac-bengaluru",
    title: "ISRO Telemetry, Tracking & Command Network (ISTRAC)",
    state: "Karnataka",
    stateCode: "ka",
    location: "Bengaluru",
    category: "Tracking Centres",
    yearEstablishedOrLaunched: 1976,
    type: "Ground Tracking & Deep Space Antenna Complex",
    launchVehicleOrRocket: "Indian Deep Space Network (IDSN 32m Antenna)",
    image: "assets/science/chandrayaan-3.png",
    description: "Provides tracking, telemetry, and command support to low earth orbit satellites, launch vehicles, and deep space missions.",
    keyContributions: "Operates global ground stations and Byalalu Deep Space Network (IDSN) that maintained telemetry contact with Chandrayaan-3 lander and Mangalyaan.",
    tags: ["istrac", "bengaluru", "karnataka", "tracking", "deep space network", "idsn", "telemetry"]
  },
  {
    id: "mcf-hassan",
    title: "Master Control Facility (MCF)",
    state: "Karnataka",
    stateCode: "ka",
    location: "Hassan (Karnataka) & Bhopal (Madhya Pradesh)",
    category: "Tracking Centres",
    yearEstablishedOrLaunched: 1982,
    type: "Geostationary Satellite Control Centre",
    launchVehicleOrRocket: "INSAT, GSAT Orbit Raising Operations",
    image: "assets/Central_India.png",
    description: "Monitors and controls all geostationary and geosynchronous communication and weather satellites launched by ISRO.",
    keyContributions: "Performs critical orbit-raising manoeuvres, payload in-orbit testing, station-keeping, and eclipse management for INSAT and GSAT fleets.",
    tags: ["mcf", "hassan", "bhopal", "karnataka", "geostationary", "insat", "gsat", "control"]
  },
  {
    id: "hsfc-bengaluru",
    title: "Human Space Flight Centre (HSFC)",
    state: "Karnataka",
    stateCode: "ka",
    location: "Bengaluru",
    category: "Research Centres",
    yearEstablishedOrLaunched: 2019,
    type: "Lead Centre for Gaganyaan Crewed Missions",
    launchVehicleOrRocket: "LVM3 Human Rated Launch Vehicle (HRLV)",
    image: "assets/science/apj-abudal kalam.png",
    description: "Established to lead implementation of the Gaganyaan national human spaceflight program and future space station initiatives.",
    keyContributions: "Responsible for astronaut training, life support systems, crew module design, environmental control, and crew escape system test flights.",
    tags: ["hsfc", "gaganyaan", "astronaut", "human spaceflight", "bengaluru", "karnataka", "isro"]
  },
  {
    id: "kulasekarapattinam-spaceport",
    title: "Kulasekarapattinam Spaceport",
    state: "Tamil Nadu",
    stateCode: "tn",
    location: "Kulasekarapattinam (Thoothukudi)",
    category: "Launch Sites",
    yearEstablishedOrLaunched: 2024,
    type: "Secondary Spaceport for Small Satellites",
    launchVehicleOrRocket: "SSLV (Small Satellite Launch Vehicle) & Private Rockets",
    image: "assets/South_India.png",
    description: "India's upcoming second launch site designed specifically for small satellite launch vehicles heading straight south to polar orbits.",
    keyContributions: "Eliminates the mandatory eastward detour around Sri Lanka required from Sriharikota, saving significant rocket fuel for polar SSO launches.",
    tags: ["kulasekarapattinam", "thoothukudi", "tamil nadu", "sslv", "second spaceport", "isro"]
  },
  {
    id: "kalam-launch-complex",
    title: "Dr APJ Abdul Kalam Launch Complex (Wheeler Island)",
    state: "Odisha",
    stateCode: "od",
    location: "Bhadrak District",
    category: "Launch Sites",
    yearEstablishedOrLaunched: 1993,
    type: "Defence & Strategic Rocket Testing Range",
    launchVehicleOrRocket: "Agni, Prithvi, K-Series Missiles",
    image: "assets/East_India.png",
    description: "Located on Wheeler Island off the coast of Odisha, renamed in 2015 to honor former President and Missile Man Dr. APJ Abdul Kalam.",
    keyContributions: "Primary test site for India's long-range strategic ballistics, anti-satellite (A-SAT) interceptors, and hypersonic technology demonstrators.",
    tags: ["kalam island", "wheeler island", "odisha", "bhadrak", "missile testing", "dr apj abdul kalam"]
  },
  {
    id: "aryabhata-satellite",
    title: "Aryabhata Satellite",
    state: "Karnataka",
    stateCode: "ka",
    location: "Built at URSC Bengaluru",
    category: "Historic Satellites",
    yearEstablishedOrLaunched: 1975,
    type: "India's First Satellite",
    launchVehicleOrRocket: "Soviet Kosmos-3M Rocket",
    image: "assets/science/aryabhata.png",
    description: "Named after the 5th-century Indian mathematician-astronomer Aryabhata, marking India's entry into the space age on April 19, 1975.",
    keyContributions: "Weighed 360 kg and carried scientific instruments to measure X-ray astronomy, solar physics, and ionospheric phenomena.",
    tags: ["aryabhata", "first satellite", "1975", "isro", "kosmos", "bengaluru"]
  },
  {
    id: "bhaskara-1",
    title: "Bhaskara-I",
    state: "Karnataka",
    stateCode: "ka",
    location: "Built at URSC Bengaluru",
    category: "Historic Satellites",
    yearEstablishedOrLaunched: 1979,
    type: "Experimental Earth Observation Satellite",
    launchVehicleOrRocket: "Soviet Interkosmos Launcher",
    image: "assets/travel_forests.png",
    description: "Named after 7th-century mathematician Bhaskaracharya, it was India's first experimental satellite equipped with TV cameras and microwave radiometers.",
    keyContributions: "Provided pioneer satellite imagery for hydrology, forestry, snow cover estimation, and sea surface temperature analysis.",
    tags: ["bhaskara", "1979", "earth observation", "remote sensing", "isro", "satellite"]
  },
  {
    id: "rohini-rs1",
    title: "Rohini Satellite (RS-1)",
    state: "Andhra Pradesh",
    stateCode: "ap",
    location: "Launched from SDSC Sriharikota",
    category: "Historic Satellites",
    yearEstablishedOrLaunched: 1980,
    type: "First Orbiting Satellite by Indian Rocket",
    launchVehicleOrRocket: "SLV-3 (Satellite Launch Vehicle 3)",
    image: "assets/ancient_india_illustration.png",
    description: "On July 18, 1980, Rohini RS-1 was successfully placed into Earth orbit by India's indigenous SLV-3 rocket under Dr APJ Abdul Kalam's direction.",
    keyContributions: "Made India the 6th spacefaring nation capable of launching indigenous satellites using an indigenously developed launch vehicle.",
    tags: ["rohini", "slv-3", "1980", "sriharikota", "kalam", "indigenous rocket"]
  },
  {
    id: "insat-system",
    title: "INSAT Communication Constellation",
    state: "Karnataka",
    stateCode: "ka",
    location: "Controlled from MCF Hassan",
    category: "Historic Satellites",
    yearEstablishedOrLaunched: 1983,
    type: "Geostationary Telecommunication & Weather Satellite System",
    launchVehicleOrRocket: "Ariane / GSLV / LVM3",
    image: "assets/culture_default.png",
    description: "One of the largest domestic communication satellite systems in the Asia-Pacific region, revolutionizing television broadcasting and telecommunications across India.",
    keyContributions: "Transformed rural TV reach, weather forecasting, disaster warning, search-and-rescue operations, and VSAT banking networks nationwide.",
    tags: ["insat", "gsat", "communication", "meteorology", "telecom", "isro", "geostationary"]
  },
  {
    id: "irs-1a",
    title: "IRS-1A (Indian Remote Sensing Satellite)",
    state: "Gujarat",
    stateCode: "gj",
    location: "Payload by SAC Ahmedabad",
    category: "Historic Satellites",
    yearEstablishedOrLaunched: 1988,
    type: "First Generation Civilian Remote Sensing Satellite",
    launchVehicleOrRocket: "Vostok Rocket",
    image: "assets/heroriver.png",
    description: "Launched on March 17, 1988, IRS-1A laid the foundation for India's world-leading civilian Earth observation satellite program.",
    keyContributions: "Equipped with LISS-I and LISS-II linear imaging cameras to monitor agricultural health, groundwater mapping, and mineral exploration.",
    tags: ["irs-1a", "remote sensing", "1988", "earth observation", "isro", "liss"]
  },
  {
    id: "chandrayaan-1",
    title: "Chandrayaan-1 Lunar Mission",
    state: "Andhra Pradesh",
    stateCode: "ap",
    location: "SDSC Sriharikota",
    category: "Deep Space & Solar",
    yearEstablishedOrLaunched: 2008,
    type: "India's First Lunar Exploration Mission",
    launchVehicleOrRocket: "PSLV-C11",
    image: "assets/science/aryabhata.png",
    description: "India's maiden deep space mission to the Moon launched on Oct 22, 2008, carrying 11 scientific payloads from India, NASA, and ESA.",
    keyContributions: "Made the historic discovery of water molecules (H2O and OH) on the lunar surface using the Moon Mineralogy Mapper (M3) and Impact Probe (MIP).",
    tags: ["chandrayaan-1", "moon", "lunar water discovery", "2008", "pslv", "isro"]
  },
  {
    id: "mangalyaan-mom",
    title: "Mangalyaan (Mars Orbiter Mission)",
    state: "Andhra Pradesh",
    stateCode: "ap",
    location: "SDSC Sriharikota",
    category: "Deep Space & Solar",
    yearEstablishedOrLaunched: 2013,
    type: "First Interplanetary Mars Mission",
    launchVehicleOrRocket: "PSLV-C25",
    image: "assets/science/mangalyaan.png",
    description: "India's first interplanetary mission launched on Nov 5, 2013, entering Martian orbit on Sept 24, 2014, on its very first attempt.",
    keyContributions: "Built at a record low cost of $74 million. Made India the 4th space agency to reach Mars and the 1st in Asia. Operates in orbit for over 7 years capturing full-disk Mars imagery.",
    tags: ["mangalyaan", "mom", "mars orbiter", "2013", "pslv", "isro", "interplanetary"]
  },
  {
    id: "astrosat",
    title: "ASTROSAT Observatory",
    state: "Karnataka",
    stateCode: "ka",
    location: "ISTRAC / URSC Bengaluru",
    category: "Deep Space & Solar",
    yearEstablishedOrLaunched: 2015,
    type: "Multi-Wavelength Space Observatory",
    launchVehicleOrRocket: "PSLV-C30",
    image: "assets/science/aditya-l1.png",
    description: "India's first dedicated space astronomy observatory launched on Sept 28, 2015, observing the universe simultaneously in Ultraviolet, Optical, and X-ray bands.",
    keyContributions: "Studied black holes, neutron stars, active galactic nuclei, and deep space star formation rates across international astronomy collaborations.",
    tags: ["astrosat", "astronomy", "space telescope", "2015", "x-ray", "ultraviolet", "isro"]
  },
  {
    id: "pslv-c37-record",
    title: "PSLV-C37 104 Satellites Launch",
    state: "Andhra Pradesh",
    stateCode: "ap",
    location: "SDSC Sriharikota",
    category: "Historic Missions",
    yearEstablishedOrLaunched: 2017,
    type: "World Record Multiple Satellite Deployment Flight",
    launchVehicleOrRocket: "PSLV-C37 (XL variant)",
    image: "assets/science/chandrayaan-3.png",
    description: "On Feb 15, 2017, ISRO created international history by deploying 104 satellites into precise sun-synchronous orbit using a single PSLV rocket.",
    keyContributions: "Demonstrated unmatched orbital precision, multi-payload adapter technology, and commercial launch capabilities of the PSLV rocket.",
    tags: ["pslv-c37", "104 satellites", "world record", "2017", "pslv", "isro", "sriharikota"]
  },
  {
    id: "chandrayaan-2",
    title: "Chandrayaan-2 Lunar Exploration",
    state: "Andhra Pradesh",
    stateCode: "ap",
    location: "SDSC Sriharikota",
    category: "Deep Space & Solar",
    yearEstablishedOrLaunched: 2019,
    type: "Lunar Orbiter, Lander Vikram & Rover Pragyan",
    launchVehicleOrRocket: "GSLV Mk III-M1 (LVM3)",
    image: "assets/science/chandrayaan-3.png",
    description: "Launched on July 22, 2019, carrying an Orbiter, Vikram Lander, and Pragyan Rover to explore the unmapped lunar South Pole.",
    keyContributions: "The Orbiter continues to operate flawlessly in lunar orbit, providing highest-resolution lunar surface maps (OHRC) and solar flare spectrometry.",
    tags: ["chandrayaan-2", "vikram lander", "pragyan rover", "2019", "gslv mk iii", "isro"]
  },
  {
    id: "chandrayaan-3",
    title: "Chandrayaan-3 Historic South Pole Landing",
    state: "Andhra Pradesh",
    stateCode: "ap",
    location: "SDSC Sriharikota",
    category: "Deep Space & Solar",
    yearEstablishedOrLaunched: 2023,
    type: "Lunar South Pole Soft Landing & Rover Exploration",
    launchVehicleOrRocket: "LVM3-M4 (Fat Boy)",
    image: "assets/science/chandrayaan-3.png",
    description: "On August 23, 2023, India became the 1st nation to land near the Moon's South Pole ('Shiv Shakti Point') and the 4th nation to achieve a soft lunar landing.",
    keyContributions: "Pragyan rover confirmed the presence of Sulfur (S), Iron, Calcium, and Chromium in lunar south pole soil and measured thermal conductivity of lunar regolith.",
    tags: ["chandrayaan-3", "shiv shakti point", "south pole landing", "2023", "pragyan", "lvm3", "isro"]
  },
  {
    id: "aditya-l1",
    title: "Aditya-L1 Solar Mission",
    state: "Andhra Pradesh",
    stateCode: "ap",
    location: "SDSC Sriharikota",
    category: "Deep Space & Solar",
    yearEstablishedOrLaunched: 2023,
    type: "India's Maiden Solar Observatory at L1 Point",
    launchVehicleOrRocket: "PSLV-C57",
    image: "assets/science/aditya-l1.png",
    description: "Launched on Sept 2, 2023, and inserted into a halo orbit around Sun-Earth Lagrange Point 1 (L1), 1.5 million km from Earth, on Jan 6, 2024.",
    keyContributions: "Observes the solar atmosphere, coronal mass ejections (CMEs), solar wind dynamics, and space weather without facing Earth eclipses.",
    tags: ["aditya-l1", "solar mission", "lagrange point l1", "sun", "2023", "pslv", "isro"]
  },
  {
    id: "xposat",
    title: "XPoSat (X-ray Polarimeter Satellite)",
    state: "Andhra Pradesh",
    stateCode: "ap",
    location: "SDSC Sriharikota",
    category: "Deep Space & Solar",
    yearEstablishedOrLaunched: 2024,
    type: "X-ray Polarimetry Space Telescope",
    launchVehicleOrRocket: "PSLV-C58",
    image: "assets/science/aditya-l1.png",
    description: "Launched on Jan 1, 2024, as the world's 2nd space observatory dedicated to studying polarization of X-rays from cosmic sources.",
    keyContributions: "Measures radiation polarization from high-energy cosmic sources like pulsars, black hole binaries, supernova remnants, and active galactic nuclei.",
    tags: ["xposat", "x-ray", "polarimetry", "black hole", "2024", "pslv", "isro"]
  },
  {
    id: "gaganyaan-mission",
    title: "Gaganyaan Human Spaceflight Program",
    state: "Karnataka",
    stateCode: "ka",
    location: "HSFC Bengaluru & SDSC Sriharikota",
    category: "Historic Missions",
    yearEstablishedOrLaunched: 2024,
    type: "First Indian Human Spaceflight Mission",
    launchVehicleOrRocket: "Human Rated LVM3 (HRLV)",
    image: "assets/science/apj-abudal kalam.png",
    description: "India's flagship human spaceflight initiative designed to send a 3-member astronaut crew to a 400 km Low Earth Orbit (LEO) for a 3-day mission.",
    keyContributions: "Demonstrates human-rated LVM3 vehicle, crew module emergency escape system, Vyommitra humanoid robot test flights, and safe ocean splashdown recovery.",
    tags: ["gaganyaan", "human spaceflight", "astronauts", "vyommitra", "lvm3", "isro", "2024"]
  },
  {
    id: "slv3-rocket",
    title: "SLV-3 (Satellite Launch Vehicle 3)",
    state: "Kerala",
    stateCode: "kl",
    location: "Developed at VSSC Thiruvananthapuram",
    category: "Launch Vehicles",
    yearEstablishedOrLaunched: 1980,
    type: "Four-stage Solid Propellant Satellite Launcher",
    launchVehicleOrRocket: "SLV-3",
    image: "assets/science/vikram-sarabhai.png",
    description: "India's first experimental satellite launch vehicle project led by Project Director Dr. APJ Abdul Kalam during 1970-1980.",
    keyContributions: "Pioneered indigenous solid rocket motors, guidance systems, and interstages, successfully orbited Rohini RS-1 satellite on July 18, 1980.",
    tags: ["slv-3", "kalam", "first rocket", "vssc", "solid propellant", "isro"]
  },
  {
    id: "pslv-rocket",
    title: "PSLV (Polar Satellite Launch Vehicle)",
    state: "Kerala",
    stateCode: "kl",
    location: "Developed at VSSC Thiruvananthapuram",
    category: "Launch Vehicles",
    yearEstablishedOrLaunched: 1993,
    type: "Four-stage Solid/Liquid Hybrid Workhorse Rocket",
    launchVehicleOrRocket: "PSLV (G, CA, XL variants)",
    image: "assets/science/chandrayaan-3.png",
    description: "Known as the trusted 'Workhorse of ISRO', PSLV is a versatile medium-lift launch vehicle with over 50 successful operational flights.",
    keyContributions: "Successfully launched Chandrayaan-1, Mangalyaan, ASTROSAT, Aditya-L1, PSLV-C37 (104 satellites), and hundreds of international customer satellites.",
    tags: ["pslv", "workhorse", "isro", "vssc", "vikas engine", "launch vehicle"]
  }
];

/**
 * Filter space items based on search query, state, and category.
 */
export function filterSpaceItems(items, { search = "", state = "all", category = "all" } = {}) {
  if (!Array.isArray(items)) return [];

  const query = search.trim().toLowerCase();

  return items.filter(item => {
    // Search query match (title, location, state, category, type, description, keyContributions, launchVehicleOrRocket, tags)
    const matchesSearch = !query || [
      item.title,
      item.location,
      item.state,
      item.category,
      item.type,
      item.description,
      item.keyContributions,
      item.launchVehicleOrRocket,
      ...(item.tags || [])
    ].some(field => field && field.toLowerCase().includes(query));

    // State filter match
    const matchesState = state === "all" || item.stateCode === state || item.state.toLowerCase() === state.toLowerCase();

    // Category filter match
    const matchesCategory = category === "all" || item.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesState && matchesCategory;
  });
}

/**
 * Group an array of space items by category.
 */
export function groupSpaceItemsByCategory(items) {
  if (!Array.isArray(items)) return {};

  return items.reduce((acc, item) => {
    const cat = item.category || "General";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(item);
    return acc;
  }, {});
}

/**
 * Group an array of space items by state name.
 */
export function groupSpaceItemsByState(items) {
  if (!Array.isArray(items)) return {};

  return items.reduce((acc, item) => {
    const state = item.state || "Unknown State";
    if (!acc[state]) {
      acc[state] = [];
    }
    acc[state].push(item);
    return acc;
  }, {});
}

/**
 * Extract unique states sorted alphabetically.
 */
export function getUniqueStates(items = spaceData) {
  const map = new Map();
  items.forEach(i => {
    if (i.state && i.stateCode) {
      map.set(i.stateCode, i.state);
    }
  });
  return Array.from(map.entries())
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Extract unique categories sorted alphabetically.
 */
export function getUniqueCategories(items = spaceData) {
  const set = new Set(items.map(i => i.category).filter(Boolean));
  return Array.from(set).sort();
}

/* ==========================================================================
   BROWSER DOM INTERACTION CODE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.spaceData = spaceData;
  window.filterSpaceItems = filterSpaceItems;
  window.groupSpaceItemsByCategory = groupSpaceItemsByCategory;
  window.groupSpaceItemsByState = groupSpaceItemsByState;
  window.getUniqueStates = getUniqueStates;
  window.getUniqueCategories = getUniqueCategories;

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("space-search");
    const stateFilter = document.getElementById("state-filter");
    const categoryFilter = document.getElementById("category-filter");
    const gridContainer = document.getElementById("space-grid");
    const resultStatus = document.getElementById("result-status");
    const emptyState = document.getElementById("empty-state");
    const clearFiltersBtn = document.getElementById("clear-filters");
    const emptyResetBtn = document.getElementById("empty-reset");

    // Modal elements
    const spaceModal = document.getElementById("space-modal");
    const modalCloseBtn = document.getElementById("modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalState = document.getElementById("modal-state");
    const modalCategory = document.getElementById("modal-category");
    const modalLocation = document.getElementById("modal-location");
    const modalYear = document.getElementById("modal-year");
    const modalRocket = document.getElementById("modal-rocket");
    const modalDescription = document.getElementById("modal-description");
    const modalContributions = document.getElementById("modal-contributions");
    const modalImage = document.getElementById("modal-image");
    const modalPrevBtn = document.getElementById("modal-prev-btn");
    const modalNextBtn = document.getElementById("modal-next-btn");

    // Timeline tab buttons
    const timelineButtons = document.querySelectorAll(".timeline-button");
    const timelineYear = document.getElementById("timeline-year");
    const timelineTitle = document.getElementById("timeline-title");
    const timelineText = document.getElementById("timeline-text");

    const timelineMilestones = {
      incospar: {
        year: "1962",
        title: "INCOSPAR Formed by Dr. Vikram Sarabhai",
        text: "The Indian National Committee for Space Research (INCOSPAR) was established under the Department of Atomic Energy, headed by pioneer scientist Dr. Vikram Sarabhai, setting the foundation for India's civilian space vision."
      },
      thumba: {
        year: "1963",
        title: "First Sounding Rocket Launched from Thumba",
        text: "On November 21, 1963, a Nike-Apache sounding rocket was launched from Thumba Equatorial Rocket Launching Station (TERLS) near Thiruvananthapuram, marking the launch of India's space program."
      },
      isro: {
        year: "1969",
        title: "ISRO Established",
        text: "The Indian Space Research Organisation (ISRO) was formally founded on August 15, 1969, superseding INCOSPAR with a mission to harness space technology for national development."
      },
      aryabhata: {
        year: "1975",
        title: "Aryabhata - India's 1st Satellite",
        text: "India launched its very first satellite, Aryabhata, on April 19, 1975. The 360 kg satellite was designed at URSC Bengaluru and carried scientific X-ray and solar physics instruments."
      },
      slv3: {
        year: "1980",
        title: "SLV-3 & Rohini Orbit Success",
        text: "Under Project Director Dr. APJ Abdul Kalam, the SLV-3 rocket successfully placed Rohini RS-1 satellite into orbit from Sriharikota, making India the 6th spacefaring nation with independent launch capacity."
      },
      chandrayaan1: {
        year: "2008",
        title: "Chandrayaan-1 Discovers Lunar Water",
        text: "India's maiden lunar orbiter mission Chandrayaan-1 discovered water molecules (H2O and OH) on the Moon using the Moon Impact Probe (MIP) and NASA M3 payload."
      },
      mangalyaan: {
        year: "2013-14",
        title: "Mangalyaan Mars Orbiter Mission",
        text: "Launched on PSLV-C25, Mangalyaan entered Martian orbit on September 24, 2014, on its first attempt, making India the first Asian country to reach Mars."
      },
      chandrayaan3: {
        year: "2023",
        title: "Chandrayaan-3 South Pole Soft Landing",
        text: "On August 23, 2023, Chandrayaan-3 landed near the Moon's South Pole at 'Shiv Shakti Point', making India the 1st country to soft-land on the lunar south pole."
      },
      adityal1: {
        year: "2023-24",
        title: "Aditya-L1 Solar Mission",
        text: "India launched its first solar space observatory Aditya-L1 to Sun-Earth Lagrange Point L1 (1.5 million km away) to continuously observe solar coronal mass ejections and space weather."
      }
    };

    let currentFilteredItems = [...spaceData];
    let currentItemIndex = -1;

    // Populate State dropdown options dynamically
    if (stateFilter) {
      const states = getUniqueStates();
      states.forEach(({ code, name }) => {
        const opt = document.createElement("option");
        opt.value = code;
        opt.textContent = name;
        stateFilter.appendChild(opt);
      });
    }

    // Populate Category dropdown options dynamically
    if (categoryFilter) {
      const categories = getUniqueCategories();
      categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat.toLowerCase();
        opt.textContent = cat;
        categoryFilter.appendChild(opt);
      });
    }

    function renderCards() {
      if (!gridContainer) return;

      const searchVal = searchInput ? searchInput.value : "";
      const stateVal = stateFilter ? stateFilter.value : "all";
      const categoryVal = categoryFilter ? categoryFilter.value : "all";

      currentFilteredItems = filterSpaceItems(spaceData, {
        search: searchVal,
        state: stateVal,
        category: categoryVal
      });

      // Update counter status
      if (resultStatus) {
        resultStatus.textContent = `Showing ${currentFilteredItems.length} of ${spaceData.length} ISRO centres & space missions`;
      }

      // Handle empty state
      if (currentFilteredItems.length === 0) {
        gridContainer.innerHTML = "";
        if (emptyState) emptyState.hidden = false;
        return;
      } else {
        if (emptyState) emptyState.hidden = true;
      }

      gridContainer.innerHTML = "";
      const cardsWrapper = document.createElement("div");
      cardsWrapper.className = "space-cards-grid";
      currentFilteredItems.forEach((item, idx) => {
        cardsWrapper.appendChild(createSpaceCard(item, idx));
      });
      gridContainer.appendChild(cardsWrapper);
    }

    function createSpaceCard(item, globalIdx) {
      const card = document.createElement("article");
      card.className = "space-card";
      card.setAttribute("data-id", item.id);
      card.setAttribute("tabindex", "0");

      card.innerHTML = `
        <div class="card-image-wrap">
          <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='assets/science/aditya-l1.png'">
          <span class="card-badge state-badge">${item.state}</span>
          <span class="card-badge category-badge">${item.category}</span>
        </div>
        <div class="card-body">
          <div class="card-location">📍 ${item.location} · Year: ${item.yearEstablishedOrLaunched}</div>
          <h3 class="card-title">${item.title}</h3>
          <p class="card-type">🚀 <strong>Type:</strong> ${item.type}</p>
          <p class="card-description">${item.description}</p>
          <button type="button" class="btn-view-details" data-index="${globalIdx}">
            View Technical Details →
          </button>
        </div>
      `;

      const viewBtn = card.querySelector(".btn-view-details");
      viewBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        openSpaceModal(globalIdx);
      });

      card.addEventListener("click", () => {
        openSpaceModal(globalIdx);
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openSpaceModal(globalIdx);
        }
      });

      return card;
    }

    function openSpaceModal(index) {
      if (index < 0 || index >= currentFilteredItems.length) return;
      currentItemIndex = index;
      const item = currentFilteredItems[index];

      if (modalTitle) modalTitle.textContent = item.title;
      if (modalState) modalState.textContent = item.state;
      if (modalCategory) modalCategory.textContent = item.category;
      if (modalLocation) modalLocation.textContent = item.location;
      if (modalYear) modalYear.textContent = item.yearEstablishedOrLaunched;
      if (modalRocket) modalRocket.textContent = item.launchVehicleOrRocket;
      if (modalDescription) modalDescription.textContent = item.description;
      if (modalContributions) modalContributions.textContent = item.keyContributions;
      if (modalImage) {
        modalImage.src = item.image;
        modalImage.alt = item.title;
      }

      if (spaceModal) {
        spaceModal.hidden = false;
        spaceModal.classList.add("active");
        document.body.classList.add("modal-open");
        modalCloseBtn?.focus();
      }
    }

    function closeSpaceModal() {
      if (spaceModal) {
        spaceModal.hidden = true;
        spaceModal.classList.remove("active");
        document.body.classList.remove("modal-open");
      }
    }

    function resetFilters() {
      if (searchInput) searchInput.value = "";
      if (stateFilter) stateFilter.value = "all";
      if (categoryFilter) categoryFilter.value = "all";
      renderCards();
    }

    // Timeline tab handlers
    timelineButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        timelineButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const key = btn.dataset.key;
        const milestone = timelineMilestones[key];
        if (milestone) {
          if (timelineYear) timelineYear.textContent = milestone.year;
          if (timelineTitle) timelineTitle.textContent = milestone.title;
          if (timelineText) timelineText.textContent = milestone.text;
        }
      });
    });

    // Event Listeners
    searchInput?.addEventListener("input", renderCards);
    stateFilter?.addEventListener("change", renderCards);
    categoryFilter?.addEventListener("change", renderCards);
    clearFiltersBtn?.addEventListener("click", resetFilters);
    emptyResetBtn?.addEventListener("click", resetFilters);

    modalCloseBtn?.addEventListener("click", closeSpaceModal);

    modalPrevBtn?.addEventListener("click", () => {
      if (currentItemIndex > 0) openSpaceModal(currentItemIndex - 1);
    });

    modalNextBtn?.addEventListener("click", () => {
      if (currentItemIndex < currentFilteredItems.length - 1) openSpaceModal(currentItemIndex + 1);
    });

    spaceModal?.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-close-modal") || e.target === spaceModal) {
        closeSpaceModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (spaceModal && !spaceModal.hidden) {
        if (e.key === "Escape") closeSpaceModal();
        if (e.key === "ArrowLeft" && currentItemIndex > 0) openSpaceModal(currentItemIndex - 1);
        if (e.key === "ArrowRight" && currentItemIndex < currentFilteredItems.length - 1) openSpaceModal(currentItemIndex + 1);
      }
    });

    // Initial render
    renderCards();
  });
}
