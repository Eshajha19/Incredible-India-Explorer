/**
 * modern-india-timeline.js
 * "The Making of Modern India (1757–1947)" Interactive Historical Timeline Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// 1. Comprehensive Timeline Dataset (1757–1947: 20 Milestones)
export const modernIndiaTimeline = [
  {
    id: "evt-1757-plassey",
    year: 1757,
    date: "June 23, 1757",
    title: "Battle of Plassey",
    category: "Major Event",
    era: "EIC Expansion (1757–1857)",
    location: "Plassey, Bengal",
    keyFigures: ["Siraj-ud-Daulah", "Robert Clive", "Mir Jafar"],
    description: "East India Company forces led by Robert Clive defeated Siraj-ud-Daulah, Nawab of Bengal, following Mir Jafar's betrayal.",
    historicalSignificance: "Marked the inauguration of British political and territorial dominance in South Asia."
  },
  {
    id: "evt-1764-buxar",
    year: 1764,
    date: "October 22, 1764",
    title: "Battle of Buxar & Treaty of Allahabad (1765)",
    category: "Major Event",
    era: "EIC Expansion (1757–1857)",
    location: "Buxar, Bihar",
    keyFigures: ["Hector Munro", "Mir Qasim", "Shah Alam II", "Shuja-ud-Daula"],
    description: "Combined armies of Mir Qasim, Shuja-ud-Daula, and Emperor Shah Alam II were defeated by EIC forces under Hector Munro.",
    historicalSignificance: "Secured Diwani (revenue collection rights) over Bengal, Bihar, and Odisha for the East India Company."
  },
  {
    id: "evt-1773-regulating-act",
    year: 1773,
    date: "June 10, 1773",
    title: "Regulating Act of 1773",
    category: "British Act",
    era: "EIC Expansion (1757–1857)",
    location: "Calcutta / London",
    keyFigures: ["Lord North", "Warren Hastings"],
    description: "First parliamentary act passed by Great Britain to regulate East India Company administration, creating the office of Governor-General of Bengal.",
    historicalSignificance: "Established parliamentary oversight over EIC governance and established a Supreme Court at Calcutta."
  },
  {
    id: "evt-1784-pitts-act",
    year: 1784,
    date: "August 13, 1784",
    title: "Pitt's India Act of 1784",
    category: "British Act",
    era: "EIC Expansion (1757–1857)",
    location: "London",
    keyFigures: ["William Pitt the Younger", "Warren Hastings"],
    description: "Established a Board of Control in London to supervise political, civil, and military affairs of the EIC in India.",
    historicalSignificance: "Created a dual system of control between the British Crown and the Company lasting until 1858."
  },
  {
    id: "evt-1817-paika-rebellion",
    year: 1817,
    date: "April 2, 1817",
    title: "Paika Rebellion (Paika Bidroha)",
    category: "Revolt",
    era: "EIC Expansion (1757–1857)",
    location: "Khurda, Odisha",
    keyFigures: ["Bakshi Jagabandhu", "Mukunda Deva II"],
    description: "Armed uprising by traditional landed militia (Paikas) of Odisha against EIC revenue land policies and salt taxes.",
    historicalSignificance: "One of the earliest organized anti-colonial armed uprisings preceding the 1857 Revolt."
  },
  {
    id: "evt-1829-sati-abolition",
    year: 1829,
    date: "December 4, 1829",
    title: "Abolition of Sati Regulation",
    category: "Reform",
    era: "EIC Expansion (1757–1857)",
    location: "Calcutta, Bengal",
    keyFigures: ["Raja Ram Mohan Roy", "Lord William Bentinck"],
    description: "Enacted Bengal Sati Regulation XVII prohibiting the practice of burning widows on funeral pyres as illegal and punishable.",
    historicalSignificance: "Pioneering milestone in 19th-century socio-religious reform led by Renaissance intellectual Raja Ram Mohan Roy."
  },
  {
    id: "evt-1855-santhal-rebellion",
    year: 1855,
    date: "June 30, 1855",
    title: "Santhal Hul (Rebellion)",
    category: "Revolt",
    era: "EIC Expansion (1757–1857)",
    location: "Rajmahal Hills / Jharkhand",
    keyFigures: ["Sidho Murmu", "Kanho Murmu", "Chand Murmu", "Bhairav Murmu"],
    description: "Tribal rebellion waged by Santhal villagers against oppressive zamindari land revenue practices and money lenders.",
    historicalSignificance: "Prompted creation of the Santhal Parganas district with special indigenous protective land laws."
  },
  {
    id: "evt-1856-widow-remarriage",
    year: 1856,
    date: "July 26, 1856",
    title: "Hindu Widows' Remarriage Act",
    category: "Reform",
    era: "EIC Expansion (1757–1857)",
    location: "Calcutta",
    keyFigures: ["Ishwar Chandra Vidyasagar", "Lord Dalhousie", "Lord Canning"],
    description: "Legalized remarriage of Hindu widows and protected inheritance rights of children born from such marriages.",
    historicalSignificance: "Major social reform spearheaded by scholar-reformer Ishwar Chandra Vidyasagar."
  },
  {
    id: "evt-1857-revolt",
    year: 1857,
    date: "May 10, 1857",
    title: "The Revolt of 1857 (First War of Independence)",
    category: "Revolt",
    era: "EIC Expansion (1757–1857)",
    location: "Meerut, Delhi, Jhansi, Kanpur, Lucknow",
    keyFigures: ["Mangal Pandey", "Rani Lakshmibai", "Bahadur Shah Zafar", "Tatya Tope", "Nana Saheb"],
    description: "Widespread uprising ignited by sepoy mutiny in Meerut that swept across northern and central India against EIC rule.",
    historicalSignificance: "Ended East India Company rule and led directly to direct administration by the British Crown."
  },
  {
    id: "evt-1858-crown-rule",
    year: 1858,
    date: "August 2, 1858",
    title: "Government of India Act 1858 & Queen's Proclamation",
    category: "British Act",
    era: "Crown Rule (1858–1918)",
    location: "Allahabad / London",
    keyFigures: ["Queen Victoria", "Lord Canning"],
    description: "Transferred government, territories, and revenues of India from EIC to the British Crown, creating the office of Viceroy.",
    historicalSignificance: "Began the British Raj era governed directly under the Secretary of State for India."
  },
  {
    id: "evt-1885-inc-formation",
    year: 1885,
    date: "December 28, 1885",
    title: "Formation of Indian National Congress",
    category: "National Movement",
    era: "Crown Rule (1858–1918)",
    location: "Bombay (Gokuldas Tejpal Sanskrit College)",
    keyFigures: ["Allan Octavian Hume", "W.C. Bonnerjee", "Dadabhai Naoroji", "Dinshaw Wacha"],
    description: "First session of the Indian National Congress held with 72 delegates representing various provinces.",
    historicalSignificance: "Created the primary political platform that mobilized nationwide constitutional and freedom movements."
  },
  {
    id: "evt-1905-swadeshi",
    year: 1905,
    date: "October 16, 1905",
    title: "Swadeshi & Boycott Movement (Partition of Bengal)",
    category: "National Movement",
    era: "Crown Rule (1858–1918)",
    location: "Calcutta, Bengal",
    keyFigures: ["Rabindranath Tagore", "Surendranath Banerjee", "Bal Gangadhar Tilak", "Lala Lajpat Rai"],
    description: "Mass movement advocating indigenous industry and boycott of British manufactured goods following Bengal's partition.",
    historicalSignificance: "Transformed Indian nationalism into a popular mass movement with cultural and economic boycott dimensions."
  },
  {
    id: "evt-1909-morley-minto",
    year: 1909,
    date: "May 25, 1909",
    title: "Morley-Minto Reforms (Indian Councils Act 1909)",
    category: "British Act",
    era: "Crown Rule (1858–1918)",
    location: "London / New Delhi",
    keyFigures: ["John Morley", "Lord Minto"],
    description: "Expanded legislative council memberships and introduced separate electorates for Muslim voters.",
    historicalSignificance: "Introduced electoral representation while embedding communal electorates into constitutional structures."
  },
  {
    id: "evt-1919-jallianwala-montagu",
    year: 1919,
    date: "April 13, 1919",
    title: "Jallianwala Bagh Massacre & GOI Act 1919",
    category: "Major Event",
    era: "Mass Movements & Independence (1919–1947)",
    location: "Amritsar, Punjab",
    keyFigures: ["Brigadier General Reginald Dyer", "Mahatma Gandhi", "Lord Chelmsford"],
    description: "British troops fired on an unarmed gathering celebrating Baisakhi in Amritsar; Montagu-Chelmsford Act introduced dyarchy in provinces.",
    historicalSignificance: "Catalyzed nationwide outrage, leading Mahatma Gandhi to launch the Non-Cooperation Movement."
  },
  {
    id: "evt-1920-non-cooperation",
    year: 1920,
    date: "August 1, 1920",
    title: "Non-Cooperation Movement",
    category: "National Movement",
    era: "Mass Movements & Independence (1919–1947)",
    location: "Nationwide",
    keyFigures: ["Mahatma Gandhi", "Shaukat Ali", "Mohammad Ali", "C.R. Das", "Motilal Nehru"],
    description: "Nationwide non-violent movement surrendering titles, boycotting law courts, government schools, and foreign cloth.",
    historicalSignificance: "Unified peasant, worker, and urban masses in non-violent resistance against colonial governance."
  },
  {
    id: "evt-1925-kakori",
    year: 1925,
    date: "August 9, 1925",
    title: "Kakori Train Action",
    category: "Revolt",
    era: "Mass Movements & Independence (1919–1947)",
    location: "Kakori near Lucknow, UP",
    keyFigures: ["Ram Prasad Bismil", "Ashfaqulla Khan", "Chandrashekhar Azad", "Rajendra Lahiri"],
    description: "Hindustan Republican Association revolutionaries intercepted a train carrying official British treasury funds to finance revolutionary activities.",
    historicalSignificance: "Symbolized armed revolutionary resistance and youth dedication to full independence."
  },
  {
    id: "evt-1930-dandi-march",
    year: 1930,
    date: "March 12, 1930",
    title: "Salt March to Dandi & Civil Disobedience Movement",
    category: "National Movement",
    era: "Mass Movements & Independence (1919–1947)",
    location: "Sabarmati to Dandi, Gujarat",
    keyFigures: ["Mahatma Gandhi", "Sarojini Naidu", "C. Rajagopalachari"],
    description: "24-day 240-mile march led by Gandhi to manufacture salt at Dandi, breaking the colonial salt monopoly tax.",
    historicalSignificance: "Gained global press coverage and initiated nationwide civil disobedience against tax laws."
  },
  {
    id: "evt-1935-goi-act",
    year: 1935,
    date: "August 2, 1935",
    title: "Government of India Act 1935",
    category: "British Act",
    era: "Mass Movements & Independence (1919–1947)",
    location: "London / New Delhi",
    keyFigures: ["Lord Willingdon", "Winston Churchill", "Jawaharlal Nehru"],
    description: "Enacted provincial autonomy, established a Federal Court, and proposed an All-India Federation of provinces and princely states.",
    historicalSignificance: "Served as a major structural template for the Constitution of India 1950."
  },
  {
    id: "evt-1942-quit-india",
    year: 1942,
    date: "August 8, 1942",
    title: "Quit India Movement & Azad Hind Fauj",
    category: "National Movement",
    era: "Mass Movements & Independence (1919–1947)",
    location: "Gowalia Tank, Bombay / Singapore",
    keyFigures: ["Mahatma Gandhi", "Subhas Chandra Bose", "Aruna Asaf Ali", "Jayaprakash Narayan"],
    description: "Gandhi issued the 'Do or Die' call demanding immediate British withdrawal; Netaji Subhas Chandra Bose mobilized the Indian National Army (INA).",
    historicalSignificance: "Final decisive mass struggle combined with external military pressure that rendered colonial rule unviable."
  },
  {
    id: "evt-1946-rin-mutiny",
    year: 1946,
    date: "February 18, 1946",
    title: "Royal Indian Navy (RIN) Mutiny",
    category: "Revolt",
    era: "Mass Movements & Independence (1919–1947)",
    location: "HMIS Talwar, Bombay Harbor",
    keyFigures: ["M.S. Khan", "Madan Singh"],
    description: "Ratings on HMIS Talwar struck over living conditions and racial discrimination, quickly spreading across 78 ships and shore establishments.",
    historicalSignificance: "Demonstrated that military forces were no longer loyal to British colonial command."
  },
  {
    id: "evt-1947-independence",
    year: 1947,
    date: "August 15, 1947",
    title: "Indian Independence & Sovereign Statehood",
    category: "Major Event",
    era: "Mass Movements & Independence (1919–1947)",
    location: "New Delhi",
    keyFigures: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel", "Lord Mountbatten"],
    description: "The Indian Independence Act 1947 came into effect, ending nearly two centuries of British colonial rule and establishing independent India.",
    historicalSignificance: "Transformed South Asia into sovereign democratic nations, culminating the long national freedom struggle."
  }
];

// 2. Governors-General & Viceroys Catalog
export const governorsGeneralCatalog = [
  {
    id: "gg-warren-hastings",
    name: "Warren Hastings",
    title: "1st Governor-General of Bengal",
    tenure: "1773–1785",
    keyPolicies: ["Dual System Abolition", "Regulating Act Implementation", "Board of Revenue Creation"],
    description: "Consolidated Company administration, established civil court systems, and patronized Orientalist studies (Asiatic Society of Bengal)."
  },
  {
    id: "gg-cornwallis",
    name: "Lord Cornwallis",
    title: "Governor-General of Bengal",
    tenure: "1786–1793",
    keyPolicies: ["Permanent Settlement of Bengal (1793)", "Cornwallis Code", "Civil Service Reforms"],
    description: "Reorganized police systems and introduced permanent zamindari revenue settlements in Bengal and Bihar."
  },
  {
    id: "gg-wellesley",
    name: "Lord Wellesley",
    title: "Governor-General of Bengal",
    tenure: "1798–1805",
    keyPolicies: ["Subsidiary Alliance System", "Fort William College Establishment"],
    description: "Expanded British territorial control through alliance treaties with Hyderabad, Mysore, Awadh, and Marathas."
  },
  {
    id: "gg-bentinck",
    name: "Lord William Bentinck",
    title: "1st Governor-General of India",
    tenure: "1828–1835",
    keyPolicies: ["Sati Abolition (1829)", "English Education Act (1835)", "Suppression of Thuggee"],
    description: "Promoted social and educational reforms influenced by Benthamite utilitarianism and Indian reformers."
  },
  {
    id: "gg-dalhousie",
    name: "Lord Dalhousie",
    title: "Governor-General of India",
    tenure: "1848–1856",
    keyPolicies: ["Doctrine of Lapse", "First Railway Line (1853)", "Electric Telegraph & Postal Act"],
    description: "Aggressively annexed kingdoms (Satara, Jhansi, Nagpur, Awadh) while laying modern physical infrastructure."
  },
  {
    id: "gg-canning",
    name: "Lord Canning",
    title: "Last Governor-General & 1st Viceroy",
    tenure: "1856–1862",
    keyPolicies: ["Suppression of 1857 Revolt", "Crown Transfer", "Indian Penal Code (1860)"],
    description: "Overseen the transition from EIC rule to direct Crown rule under Queen Victoria's Proclamation."
  },
  {
    id: "gg-ripon",
    name: "Lord Ripon",
    title: "Viceroy of India",
    tenure: "1880–1884",
    keyPolicies: ["Father of Local Self-Government", "Repeal of Vernacular Press Act", "Ilbert Bill Controversy"],
    description: "Enacted progressive reforms promoting elected local boards and press freedom."
  },
  {
    id: "gg-curzon",
    name: "Lord Curzon",
    title: "Viceroy of India",
    tenure: "1899–1905",
    keyPolicies: ["Partition of Bengal (1905)", "Ancient Monuments Preservation Act", "Police Commission"],
    description: "Centralized administration and partitioned Bengal, sparking national Swadeshi protests."
  },
  {
    id: "gg-chelmsford",
    name: "Lord Chelmsford",
    title: "Viceroy of India",
    tenure: "1916–1921",
    keyPolicies: ["Montagu-Chelmsford Reforms (1919)", "Rowlatt Act Enactment"],
    description: "Overseen World War I mobilization, Rowlatt Act passage, and provincial dyarchy."
  },
  {
    id: "gg-mountbatten",
    name: "Lord Louis Mountbatten",
    title: "Last Viceroy & 1st Governor-General of Independent India",
    tenure: "1947–1948",
    keyPolicies: ["June 3 Partition Plan", "Accelerated Transfer of Power", "Princely Accessions"],
    description: "Managed the final transfer of power and boundary commission awards in August 1947."
  }
];

// 3. British Legislative Acts Catalog
export const britishActsCatalog = [
  {
    id: "act-1773",
    title: "Regulating Act of 1773",
    year: 1773,
    provisions: "Created Governor-General of Bengal post, Supreme Court at Calcutta, and restricted EIC court of directors."
  },
  {
    id: "act-1784",
    title: "Pitt's India Act of 1784",
    year: 1784,
    provisions: "Established 6-member Board of Control in London to supervise political affairs."
  },
  {
    id: "act-1833",
    title: "Charter Act of 1833",
    year: 1833,
    provisions: "Redesignated Governor-General of Bengal as Governor-General of India; ended EIC commercial monopoly."
  },
  {
    id: "act-1858",
    title: "Government of India Act 1858",
    year: 1858,
    provisions: "Transferred governance to British Crown; created Secretary of State for India and Viceroy post."
  },
  {
    id: "act-1909",
    title: "Indian Councils Act 1909 (Morley-Minto)",
    year: 1909,
    provisions: "Introduced separate electorates for Muslims and enlarged central/provincial legislative councils."
  },
  {
    id: "act-1919",
    title: "Government of India Act 1919 (Montagu-Chelmsford)",
    year: 1919,
    provisions: "Established dyarchy in provinces, bicameral central legislature, and public service commission."
  },
  {
    id: "act-1935",
    title: "Government of India Act 1935",
    year: 1935,
    provisions: "Granted provincial autonomy, established Federal Court, and divided powers into Federal, Provincial, and Concurrent lists."
  },
  {
    id: "act-1947",
    title: "Indian Independence Act 1947",
    year: 1947,
    provisions: "Divided British India into two independent dominions (India and Pakistan) with complete sovereign legislative authority."
  }
];

// 4. Major Uprisings & Revolts Catalog
export const revoltsCatalog = [
  {
    id: "revolt-paika",
    name: "Paika Rebellion (1817)",
    leader: "Bakshi Jagabandhu",
    region: "Odisha",
    description: "Armed rebellion by Paikas protesting British land seizure and currency regulation."
  },
  {
    id: "revolt-santhal",
    name: "Santhal Hul (1855)",
    leader: "Sidho & Kanho Murmu",
    region: "Santhal Parganas",
    description: "Mass tribal uprising against moneylenders, zamindars, and colonial police."
  },
  {
    id: "revolt-1857",
    name: "Revolt of 1857",
    leader: "Rani Lakshmibai, Tatya Tope, Nana Saheb, Zafar",
    region: "North & Central India",
    description: "First nationwide war of independence against East India Company rule."
  },
  {
    id: "revolt-moplah",
    name: "Moplah Rebellion (1921)",
    leader: "Variyamkunnath Kunjahammed Haji",
    region: "Malabar, Kerala",
    description: "Agrarian and anti-colonial uprising in Malabar synchronized with Khilafat movement."
  },
  {
    id: "revolt-rin",
    name: "Royal Indian Navy Mutiny (1946)",
    leader: "M.S. Khan & Naval Ratings",
    region: "Bombay, Karachi, Kolkata",
    description: "Naval mutiny across 78 ships signaling military breakdown of colonial control."
  }
];

// 5. Social & Educational Reforms Catalog
export const reformsCatalog = [
  {
    id: "reform-sati",
    title: "Abolition of Sati (1829)",
    reformer: "Raja Ram Mohan Roy",
    impact: "Outlawed widow immolation as a criminal offense."
  },
  {
    id: "reform-education",
    title: "English Education Act (1835)",
    reformer: "T.B. Macaulay & Bentinck",
    impact: "Promoted English higher education and scientific curriculum."
  },
  {
    id: "reform-widow-remarriage",
    title: "Widow Remarriage Act (1856)",
    reformer: "Ishwar Chandra Vidyasagar",
    impact: "Legalized remarriage rights for Hindu widows."
  },
  {
    id: "reform-sharda-act",
    title: "Child Marriage Restraint Act / Sharda Act (1929)",
    reformer: "Harbilas Sarda",
    impact: "Set minimum marriageable age at 14 for girls and 18 for boys."
  }
];

// 6. National Movements Catalog
export const nationalMovementsCatalog = [
  {
    id: "mvmt-swadeshi",
    name: "Swadeshi Movement (1905)",
    leadLeaders: "Tilak, Lajpat Rai, Bipin Chandra Pal, Tagore",
    coreObjective: "Boycott foreign goods and foster indigenous industry & national schools."
  },
  {
    id: "mvmt-non-cooperation",
    name: "Non-Cooperation Movement (1920)",
    leadLeaders: "Mahatma Gandhi, Ali Brothers, Motilal Nehru",
    coreObjective: "Surrender titles, boycott British institutions, non-violent mass resistance."
  },
  {
    id: "mvmt-civil-disobedience",
    name: "Civil Disobedience Movement (1930)",
    leadLeaders: "Mahatma Gandhi, Sarojini Naidu",
    coreObjective: "Defy unjust salt taxes and colonial administrative laws."
  },
  {
    id: "mvmt-quit-india",
    name: "Quit India Movement (1942)",
    leadLeaders: "Mahatma Gandhi, Aruna Asaf Ali, Subhas Chandra Bose",
    coreObjective: "Immediate, total British withdrawal under the 'Do or Die' slogan."
  }
];

// 7. Interactive Historic Centers Map Coordinates & Details
export const historicCentersMapData = [
  {
    id: "center-plassey",
    name: "Plassey (Palashi)",
    state: "West Bengal",
    x: 650,
    y: 220,
    year: "1757",
    title: "Battle of Plassey Site",
    description: "Site of EIC's pivotal 1757 victory over Siraj-ud-Daulah, initiating Company rule."
  },
  {
    id: "center-buxar",
    name: "Buxar",
    state: "Bihar",
    x: 520,
    y: 200,
    year: "1764",
    title: "Battle of Buxar & Diwani Rights",
    description: "Decisive battle leading to the 1765 Treaty of Allahabad and revenue control."
  },
  {
    id: "center-meerut",
    name: "Meerut",
    state: "Uttar Pradesh",
    x: 310,
    y: 150,
    year: "1857",
    title: "Ignition of 1857 Revolt",
    description: "Sepoy revolt broke out on May 10, 1857, marching toward Delhi."
  },
  {
    id: "center-jhansi",
    name: "Jhansi",
    state: "Uttar Pradesh",
    x: 340,
    y: 230,
    year: "1857",
    title: "Rani Lakshmibai's Stronghold",
    description: "Epicenter of 1857 resistance led by Rani Lakshmibai against British forces."
  },
  {
    id: "center-champaran",
    name: "Champaran",
    state: "Bihar",
    x: 540,
    y: 175,
    year: "1917",
    title: "Champaran Indigo Satyagraha",
    description: "Mahatma Gandhi's first Satyagraha in India defending indigo farmers."
  },
  {
    id: "center-chauri-chaura",
    name: "Chauri Chaura",
    state: "Uttar Pradesh",
    x: 480,
    y: 185,
    year: "1922",
    title: "Chauri Chaura Incident",
    description: "Protest conflict that prompted Gandhi to halt the Non-Cooperation Movement."
  },
  {
    id: "center-kakori",
    name: "Kakori",
    state: "Uttar Pradesh",
    x: 410,
    y: 180,
    year: "1925",
    title: "Kakori Revolutionaries Action",
    description: "HRA revolutionaries intercepted official treasury train to fund freedom struggle."
  },
  {
    id: "center-dandi",
    name: "Dandi",
    state: "Gujarat",
    x: 180,
    y: 280,
    year: "1930",
    title: "Dandi Salt March Terminus",
    description: "Coastal village where Gandhi picked up salt on April 6, 1930, launching Civil Disobedience."
  },
  {
    id: "center-mumbai",
    name: "Bombay (Mumbai)",
    state: "Maharashtra",
    x: 200,
    y: 330,
    year: "1885 / 1942 / 1946",
    title: "INC Foundation & RIN Mutiny",
    description: "Birthplace of INC (1885), Quit India launch (1942), and Royal Indian Navy Mutiny (1946)."
  }
];

/* Helper Query Functions */

export function getEventById(id, list = modernIndiaTimeline) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(e => e.id.toLowerCase() === target);
}

export function filterTimelineEvents(query = "", era = "all", category = "all", list = modernIndiaTimeline) {
  if (!Array.isArray(list)) return [];
  let result = list;

  if (era && era !== "all") {
    result = result.filter(e => e.era.toLowerCase() === era.toLowerCase());
  }

  if (category && category !== "all") {
    result = result.filter(e => e.category.toLowerCase() === category.toLowerCase());
  }

  const q = query.trim().toLowerCase();
  if (q) {
    result = result.filter(e => [
      e.title,
      e.date,
      String(e.year),
      e.location,
      e.category,
      e.era,
      e.description,
      e.historicalSignificance,
      ...(e.keyFigures || [])
    ].some(field => field && field.toLowerCase().includes(q)));
  }

  return result;
}

export function filterGovernorsGeneral(query = "", list = governorsGeneralCatalog) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  if (!q || q === "all") return list;

  return list.filter(g => [
    g.name,
    g.title,
    g.tenure,
    g.description,
    ...(g.keyPolicies || [])
  ].some(field => field && field.toLowerCase().includes(q)));
}

export function filterBritishActs(query = "", list = britishActsCatalog) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  if (!q || q === "all") return list;

  return list.filter(a => [
    a.title,
    String(a.year),
    a.provisions
  ].some(field => field && field.toLowerCase().includes(q)));
}

export function filterRevolts(query = "", list = revoltsCatalog) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  if (!q || q === "all") return list;

  return list.filter(r => [
    r.name,
    r.leader,
    r.region,
    r.description
  ].some(field => field && field.toLowerCase().includes(q)));
}

export function filterReforms(query = "", list = reformsCatalog) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  if (!q || q === "all") return list;

  return list.filter(rf => [
    rf.title,
    rf.reformer,
    rf.impact
  ].some(field => field && field.toLowerCase().includes(q)));
}

export function filterNationalMovements(query = "", list = nationalMovementsCatalog) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  if (!q || q === "all") return list;

  return list.filter(nm => [
    nm.name,
    nm.leadLeaders,
    nm.coreObjective
  ].some(field => field && field.toLowerCase().includes(q)));
}

export function getHistoricCenterById(id, list = historicCentersMapData) {
  if (!id || !Array.isArray(list)) return undefined;
  return list.find(c => c.id.toLowerCase() === id.trim().toLowerCase());
}

/* Browser DOM Interaction Engine */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.modernIndiaTimelineData = modernIndiaTimeline;
  window.governorsGeneralData = governorsGeneralCatalog;
  window.britishActsData = britishActsCatalog;
  window.revoltsCatalogData = revoltsCatalog;
  window.reformsCatalogData = reformsCatalog;
  window.nationalMovementsData = nationalMovementsCatalog;
  window.historicCentersMapData = historicCentersMapData;

  window.filterTimelineEvents = filterTimelineEvents;
  window.getEventById = getEventById;
  window.filterGovernorsGeneral = filterGovernorsGeneral;
  window.filterBritishActs = filterBritishActs;
  window.filterRevolts = filterRevolts;
  window.filterReforms = filterReforms;
  window.filterNationalMovements = filterNationalMovements;
  window.getHistoricCenterById = getHistoricCenterById;

  document.addEventListener("DOMContentLoaded", () => {
    // Nav Tab Switcher
    const eraTabBtns = document.querySelectorAll(".era-tab-btn");
    const categoryFilterSelect = document.getElementById("timeline-category-filter");
    const searchInput = document.getElementById("modern-india-search");
    const timelineContainer = document.getElementById("timeline-events-container");

    let currentEra = "all";

    function renderTimeline() {
      if (!timelineContainer) return;
      timelineContainer.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const category = categoryFilterSelect ? categoryFilterSelect.value : "all";

      const filtered = filterTimelineEvents(query, currentEra, category);

      if (filtered.length === 0) {
        timelineContainer.innerHTML = `
          <div class="empty-results-card">
            <h3>No Milestones Found</h3>
            <p>Try clearing filters or adjusting your search query (e.g., Plassey, 1857, Dandi, Bentinck, Quit India).</p>
          </div>
        `;
        return;
      }

      filtered.forEach((evt) => {
        const card = document.createElement("article");
        card.className = "timeline-event-card";
        card.dataset.id = evt.id;

        const figuresHtml = (evt.keyFigures || [])
          .map(f => `<span class="figure-tag">👤 ${f}</span>`)
          .join(" ");

        card.innerHTML = `
          <div class="card-top-row">
            <span class="era-badge">${evt.era}</span>
            <span class="category-badge ${evt.category.toLowerCase().replace(/\s+/g, '-')}">${evt.category}</span>
          </div>
          <div class="event-header">
            <span class="year-stamp">${evt.year}</span>
            <div>
              <h3>${evt.title}</h3>
              <span class="location-date-tag">📍 ${evt.location} · 📅 ${evt.date}</span>
            </div>
          </div>
          <p class="event-desc">${evt.description}</p>
          <div class="key-figures-row">${figuresHtml}</div>
          <div class="significance-box">
            <strong>💡 Historical Impact:</strong> ${evt.historicalSignificance}
          </div>
        `;

        timelineContainer.appendChild(card);
      });
    }

    eraTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        eraTabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentEra = btn.dataset.era;
        renderTimeline();
      });
    });

    searchInput?.addEventListener("input", renderTimeline);
    categoryFilterSelect?.addEventListener("change", renderTimeline);

    // 2. Render Governors-General & Viceroys Section
    const ggContainer = document.getElementById("governors-grid-container");
    function renderGovernors() {
      if (!ggContainer) return;
      ggContainer.innerHTML = "";

      governorsGeneralCatalog.forEach(gg => {
        const card = document.createElement("div");
        card.className = "gg-card";

        const policiesHtml = (gg.keyPolicies || [])
          .map(p => `<li>${p}</li>`)
          .join("");

        card.innerHTML = `
          <div class="gg-header">
            <span class="gg-avatar">👑</span>
            <div>
              <h3>${gg.name}</h3>
              <span class="gg-tenure">⏳ ${gg.tenure}</span>
            </div>
          </div>
          <span class="gg-title-tag">${gg.title}</span>
          <p class="gg-desc">${gg.description}</p>
          <div class="gg-policies-box">
            <strong>Key Acts & Policies:</strong>
            <ul>${policiesHtml}</ul>
          </div>
        `;

        ggContainer.appendChild(card);
      });
    }

    // 3. Render Historic Centers Map Tooltips
    const mapMarkers = document.querySelectorAll(".map-center-node");
    const centerDisplayBox = document.getElementById("center-detail-display");

    mapMarkers.forEach(marker => {
      marker.addEventListener("click", () => {
        const centerId = marker.dataset.center;
        const data = getHistoricCenterById(centerId);

        mapMarkers.forEach(m => m.classList.remove("active"));
        marker.classList.add("active");

        if (data && centerDisplayBox) {
          centerDisplayBox.innerHTML = `
            <h3>${data.name} (${data.state})</h3>
            <span class="center-year-badge">Year: ${data.year}</span>
            <h4>${data.title}</h4>
            <p>${data.description}</p>
          `;
        }
      });
    });

    // Initializations
    renderTimeline();
    renderGovernors();
  });
}
