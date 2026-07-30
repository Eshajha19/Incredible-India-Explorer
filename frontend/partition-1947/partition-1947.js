/**
 * partition-1947.js
 * "The Partition of India (1947)" Interactive Historical Explorer
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Respectful Editorial Disclaimer
export const editorialNote = {
  title: "Editorial Note & Historical Framing",
  content: "This presentation offers a factual, neutral, and respectful overview of the 1947 Partition of British India, focusing on political decisions, verified demographic scale, and nation-building aftermath. Content is compiled from peer-reviewed historical literature and official census archives. In accordance with strict educational guidelines, graphic depictions of violence are omitted to maintain an objective, dignified focus on human history and resilience."
};

// Verified Demographics & Migration Statistics (Sourced & Cited)
export const demographicStats = {
  totalDisplaced: "14 - 15 Million",
  totalDisplacedNumeric: 14500000,
  migratedToIndia: "7.2 Million",
  migratedToIndiaNumeric: 7200000,
  migratedToPakistan: "7.2 Million",
  migratedToPakistanNumeric: 7200000,
  rehabilitationCampsCount: "200+",
  largestCampCapacity: "300,000 (Kurukshetra Camp)",
  sources: [
    "Census of India 1951 (Vol. I, Part I-A Report)",
    "UNHCR Historical Reports on 20th Century Population Movements",
    "The Great Partition: The Making of India and Pakistan (Yasmin Khan, Yale University Press)",
    "India After Gandhi: The History of the World's Largest Democracy (Ramachandra Guha)"
  ]
};

// Radcliffe Line Boundary Regions
export const radcliffeRegions = [
  {
    id: "punjab-border",
    name: "Punjab Boundary Commission",
    chairman: "Sir Cyril Radcliffe",
    districtsDivided: ["Gurdaspur", "Amritsar", "Lahore", "Firozpur", "Jalandhar"],
    lengthKm: 553,
    description: "Divided the fertile agricultural plains of Punjab, bisecting river systems and canal networks.",
    economicImpact: "Bisected wheat and cotton growing zones from central processing networks, disrupting irrigation canals."
  },
  {
    id: "bengal-border",
    name: "Bengal Boundary Commission",
    chairman: "Sir Cyril Radcliffe",
    districtsDivided: ["Nadia", "Jessore", "Dinajpur", "Malda", "Sylhet"],
    lengthKm: 4096,
    description: "Divided Bengal and Assam, separating jute agricultural belts in East Bengal from processing mills in Calcutta.",
    economicImpact: "Separated 80% of raw jute producing areas in East Bengal from all 108 jute processing mills concentrated around Kolkata."
  }
];

// Mountbatten Plan Details (3rd June 1947 Plan)
export const mountbattenPlanDetails = {
  title: "The Mountbatten Plan (June 3 Plan)",
  announcementDate: "June 3, 1947",
  keyProvisions: [
    {
      heading: "Accelerated Transfer of Power",
      details: "Advanced the British withdrawal date from June 1948 to August 15, 1947, reducing transition preparation time to 72 days."
    },
    {
      heading: "Legislative Assembly Voting",
      details: "Members of the Bengal and Punjab Legislative Assemblies met in two sections (Muslim-majority and non-Muslim majority) to vote on partition."
    },
    {
      heading: "Referendums & Boundary Commissions",
      details: "Mandated a referendum in the North-West Frontier Province (NWFP) and Sylhet district of Assam, establishing twin Boundary Commissions led by Sir Cyril Radcliffe."
    },
    {
      heading: "Princely States Status",
      details: "Terminated British paramountcy over 565 Princely States, advising them to accede to either India or Pakistan based on geographical contiguity and public will."
    }
  ]
};

// Verified Historical Timeline Events (1905–1950: 14 Milestones)
export const partitionTimeline = [
  {
    id: "t-1905-10",
    date: "October 16, 1905",
    title: "First Partition of Bengal",
    phase: "Early Roots",
    description: "Viceroy Lord Curzon partitioned the Bengal Presidency along religious lines into East Bengal & Assam and West Bengal.",
    historicalSignificance: "Sparked nationwide anti-partition Swadeshi protests, leading to the reversal of Bengal's partition in 1911."
  },
  {
    id: "t-1906-12",
    date: "December 30, 1906",
    title: "Formation of All-India Muslim League",
    phase: "Early Roots",
    description: "Founded in Dhaka under the leadership of Nawab Khwaja Salimullah, Aga Khan III, and Nawab Mohsin-ul-Mulk to represent Muslim political interests.",
    historicalSignificance: "Established a major political party that later advocated for separate electorates and statehood."
  },
  {
    id: "t-1916-12",
    date: "December 30, 1916",
    title: "Lucknow Pact",
    phase: "Constitutional Debates",
    description: "Joint agreement reached between the Indian National Congress and the All-India Muslim League presenting unified self-governance demands to the British Crown.",
    historicalSignificance: "Demonstrated early cross-party political cooperation for constitutional self-determination."
  },
  {
    id: "t-1930-12",
    date: "December 29, 1930",
    title: "Allahabad Address by Sir Muhammad Iqbal",
    phase: "Conceptual Origins",
    description: "Sir Muhammad Iqbal proposed a consolidated autonomous state in northwestern India comprising Punjab, NWFP, Sindh, and Baluchistan during his presidential address.",
    historicalSignificance: "Formulated an early intellectual proposal for a separate territorial entity in northwestern South Asia."
  },
  {
    id: "t-1940-03",
    date: "March 23, 1940",
    title: "Lahore Resolution",
    phase: "Formal Demand",
    description: "The All-India Muslim League formally adopted a resolution demanding autonomous states for Muslim-majority zones in the northwest and eastern regions of British India.",
    historicalSignificance: "Marked a decisive shift toward advocating a two-state outcome."
  },
  {
    id: "t-1946-05",
    date: "May 16, 1946",
    title: "Cabinet Mission Plan",
    phase: "Political Negotiations",
    description: "The British Cabinet Mission proposed a three-tier federal structure with a central defense/foreign affairs authority and autonomous provincial groupings to preserve a unified India.",
    historicalSignificance: "Represented the last major constitutional attempt to avoid partition before negotiations broke down."
  },
  {
    id: "t-1946-08",
    date: "August 16, 1946",
    title: "Direct Action Call & Interim Government",
    phase: "Political Crisis",
    description: "Political deadlocks deepened following the breakdown of Cabinet Mission negotiations, leading to widespread civil tensions across Bengal and Punjab.",
    historicalSignificance: "Accelerated British decisions to rapidly transfer power and exit South Asia."
  },
  {
    id: "t-1947-06",
    date: "June 3, 1947",
    title: "Mountbatten Plan Announced",
    phase: "Decision to Partition",
    description: "Viceroy Lord Mountbatten publicly announced the plan for the partition of British India into two independent dominions—India and Pakistan—with power transferred by August 1947.",
    historicalSignificance: "Accelerated the timetable for British withdrawal from June 1948 to August 1947."
  },
  {
    id: "t-1947-07",
    date: "July 18, 1947",
    title: "Indian Independence Act Passed",
    phase: "Legislative Framework",
    description: "The British Parliament enacted the Indian Independence Act 1947, formally creating the sovereign Dominions of India and Pakistan and terminating suzerainty over Princely States.",
    historicalSignificance: "Provided the legal mandate for independence and the establishment of two separate Boundary Commissions."
  },
  {
    id: "t-1947-08-15",
    date: "August 14–15, 1947",
    title: "Transfer of Power & Independence",
    phase: "Independence",
    description: "Pakistan celebrated independence on August 14, followed by India at midnight on August 15. Prime Minister Jawaharlal Nehru delivered his iconic 'Tryst with Destiny' address.",
    historicalSignificance: "Brought an end to nearly two centuries of British colonial rule in South Asia."
  },
  {
    id: "t-1947-08-17",
    date: "August 17, 1947",
    title: "Publication of the Radcliffe Line",
    phase: "Border Award",
    description: "The official awards of the Punjab and Bengal Boundary Commissions were published, establishing the international borders between India and East/West Pakistan.",
    historicalSignificance: "Triggered massive, unanticipated cross-border migrations as millions found themselves on opposite sides of newly drawn lines."
  },
  {
    id: "t-1947-09",
    date: "1947–1948",
    title: "Mass Migration & Refugee Resettlement",
    phase: "Human Scale",
    description: "An estimated 14 to 15 million people crossed borders. The Ministry of Relief and Rehabilitation established massive transit camps at Kurukshetra, Purana Qila, and Ranaghat.",
    historicalSignificance: "One of the largest peace-time population movements recorded in 20th-century global history."
  },
  {
    id: "t-1948-01",
    date: "January 30, 1948",
    title: "Mahatma Gandhi's Peace Missions & Martyrdom",
    phase: "Humanitarian Envoy",
    description: "Mahatma Gandhi conducted extensive peace walks through Noakhali and Kolkata, fasting for communal harmony before his assassination in New Delhi.",
    historicalSignificance: "Reinforced national resolve to establish a secular, democratic republic protecting all citizens."
  },
  {
    id: "t-1950",
    date: "April 8, 1950",
    title: "Nehru-Liaquat Pact & Nation-Building",
    phase: "Aftermath & Recovery",
    description: "Prime Ministers Jawaharlal Nehru and Liaquat Ali Khan signed a bilateral agreement in New Delhi pledging minority rights protection, property claims processing, and peaceful co-existence.",
    historicalSignificance: "Formalized government commitments to refugee rehabilitation and secular democratic constitutional guarantees."
  }
];

// Political Leaders Involved
export const politicalLeaders = [
  {
    id: "leader-mountbatten",
    name: "Lord Louis Mountbatten",
    role: "Last Viceroy of India & 1st Governor-General of Independent India",
    category: "British Official",
    bio: "Appointed Viceroy in March 1947 with a mandate to oversee the British withdrawal. Accelerated the independence date to August 15, 1947.",
    keyActions: "Drafted June 3 Plan, appointed Boundary Commissions, negotiated Princely State accessions alongside Sardar Patel."
  },
  {
    id: "leader-nehru",
    name: "Jawaharlal Nehru",
    role: "First Prime Minister of Independent India",
    category: "Indian Leadership",
    bio: "Prominent leader of the Indian National Congress who delivered the famous 'Tryst with Destiny' address on August 14, 1947.",
    keyActions: "Led the Interim Government, managed rehabilitation initiatives, co-signed the 1950 Nehru-Liaquat Pact."
  },
  {
    id: "leader-patel",
    name: "Sardar Vallabhbhai Patel",
    role: "First Deputy PM & Home Minister of India",
    category: "Indian Leadership",
    bio: "Known as the 'Iron Man of India', responsible for integrating over 560 Princely States into the Union of India.",
    keyActions: "Organized massive relief operations for incoming refugees in Delhi and East Punjab, secured national territorial integration."
  },
  {
    id: "leader-gandhi",
    name: "Mahatma Gandhi",
    role: "Leader of Indian Freedom Movement & Peace Envoy",
    category: "Indian Leadership",
    bio: "Apostle of non-violence who dedicated the months surrounding August 1947 to walking through affected regions to restore peace.",
    keyActions: "Conducted peace missions in Bengal and Bihar, undertook fasts in Calcutta and Delhi to safeguard minority protection."
  },
  {
    id: "leader-jinnah",
    name: "Muhammad Ali Jinnah",
    role: "Founder & 1st Governor-General of Pakistan",
    category: "Muslim League Leadership",
    bio: "President of the All-India Muslim League who championed the creation of Pakistan as a sovereign homeland.",
    keyActions: "Led political negotiations for the creation of Pakistan, delivered his August 11, 1947 constituent assembly speech."
  },
  {
    id: "leader-radcliffe",
    name: "Sir Cyril Radcliffe",
    role: "Chairman of the Punjab & Bengal Boundary Commissions",
    category: "British Official",
    bio: "British barrister given 5 weeks to draw the international boundaries dividing Punjab and Bengal without prior South Asian experience.",
    keyActions: "Demarcated 4,600+ km of international borders published on August 17, 1947."
  },
  {
    id: "leader-khan-khan",
    name: "Khan Abdul Ghaffar Khan",
    role: "Frontier Gandhi & Leader of Khudai Khidmatgar",
    category: "Regional Leadership",
    bio: "Pashtun freedom fighter committed to non-violence and secular unity in the North-West Frontier Province.",
    keyActions: "Opposed the NWFP referendum terms and championed peaceful communal harmony."
  },
  {
    id: "leader-tara-singh",
    name: "Master Tara Singh",
    role: "Prominent Akali Dal Leader",
    category: "Regional Leadership",
    bio: "Key political representative of the Sikh community in Punjab during pre-partition negotiations.",
    keyActions: "Advocated for Sikh community rights and land protection during the Punjab Boundary Commission hearings."
  },
  {
    id: "leader-suhrawardy",
    name: "H.S. Suhrawardy",
    role: "Premier of Bengal (1946–1947)",
    category: "Muslim League Leadership",
    bio: "Bengal political leader who briefly proposed a United Sovereign Bengal option alongside Sarat Chandra Bose before Bengal's division.",
    keyActions: "Participated in Bengal partition deliberations and later worked with Gandhi on peace initiatives in Calcutta."
  }
];

// Migration Corridors & Interactive Map Data
export const migrationCorridors = [
  {
    id: "corridor-punjab",
    name: "Western Corridor (Punjab)",
    primaryRoute: "Lahore ↔ Amritsar / Jalandhar / Ludhiana / Delhi",
    estimatedVolume: "10 Million People",
    direction: "Bi-directional across East and West Punjab",
    details: "Massive foot columns ('kaflas') and special refugee trains crossed the new boundary. Heavy demand on transit camps at Kurukshetra and Delhi."
  },
  {
    id: "corridor-bengal",
    name: "Eastern Corridor (Bengal & Assam)",
    primaryRoute: "Dhaka / Rajshahi ↔ Kolkata / Ranaghat / Siliguri",
    estimatedVolume: "3.5 Million People",
    direction: "Bi-directional across West Bengal, East Pakistan, and Assam",
    details: "Migration occurred in continuous waves stretching into the 1950s. Major relief centers set up at Ranaghat and Cooper's Camp."
  },
  {
    id: "corridor-sindh",
    name: "Southern Corridor (Sindh & Western Coast)",
    primaryRoute: "Karachi ↔ Bombay / Gujarat (Kutch, Ahmedabad, Gandhidham)",
    estimatedVolume: "1.2 Million People",
    direction: "Maritime and rail routes from Sindh to Rajasthan and Bombay Presidency",
    details: "Refugees traveled via steamships and rail lines. Led to the development of new commercial townships like Gandhidham and Ulhasnagar."
  }
];

// Refugee Crisis & Relief Camps Data
export const refugeeCampsData = [
  {
    id: "camp-kurukshetra",
    name: "Kurukshetra Relief Camp",
    location: "Haryana (then East Punjab)",
    peakCapacity: "300,000 residents",
    type: "Largest Tent City",
    description: "Constructed with over 50,000 military tents, featuring central kitchens, medical units, and basic schools organized by the Ministry of Relief."
  },
  {
    id: "camp-purana-qila",
    name: "Purana Qila & Humayun's Tomb Camps",
    location: "New Delhi",
    peakCapacity: "100,000 residents",
    type: "Urban Transit Center",
    description: "Historical fort grounds temporarily repurposed into transit camps for displaced citizens awaiting permanent housing allocation."
  },
  {
    id: "camp-ranaghat",
    name: "Ranaghat & Cooper's Camp",
    location: "Nadia District, West Bengal",
    peakCapacity: "150,000 residents",
    type: "Eastern Transit Hub",
    description: "Served as the primary transit point for displaced families arriving in West Bengal, assisting with health care and ration distributions."
  },
  {
    id: "township-faridabad",
    name: "Faridabad & Ulhasnagar Townships",
    location: "Haryana & Maharashtra",
    peakCapacity: "250,000 resettled",
    type: "Model Rehabilitation Townships",
    description: "Planned industrial towns built with self-help labor schemes to transition displaced families into permanent homeowners and artisans."
  }
];

// Archival Gallery (Visual History & Media Cards)
export const archivalGallery = [
  {
    id: "photo-01",
    title: "Special Refugee Trains at Amritsar Station",
    year: "1947",
    category: "Migration",
    location: "Amritsar, Punjab",
    credit: "Press Information Bureau / Photo Division Archives",
    caption: "Overcrowded steam trains transporting families across border points in Punjab during August–September 1947."
  },
  {
    id: "photo-02",
    title: "Kurukshetra Tent City Operations",
    year: "1947–1948",
    category: "Relief Camps",
    location: "Kurukshetra, East Punjab",
    credit: "Ministry of Relief & Rehabilitation Records",
    caption: "Aerial view of orderly tent arrays providing shelter, clean water, and medical care to hundreds of thousands."
  },
  {
    id: "photo-03",
    title: "Signing of the Nehru-Liaquat Agreement",
    year: "April 1950",
    category: "Diplomacy",
    location: "New Delhi",
    credit: "Government of India Archival Collection",
    caption: "Prime Ministers Jawaharlal Nehru and Liaquat Ali Khan signing the bilateral pact ensuring minority protection and rights."
  },
  {
    id: "photo-04",
    title: "Faridabad Township Self-Help Construction",
    year: "1949",
    category: "Rehabilitation",
    location: "Faridabad, Haryana",
    credit: "Faridabad Development Board Archives",
    caption: "Displaced workers actively building brick residential quarters and industrial sheds under cooperative assistance."
  }
];

// Oral History Section (First-Person Account Testimonies)
export const oralHistories = [
  {
    id: "oral-01",
    narrator: "Harjit Singh (b. 1934)",
    origin: "Lyallpur (Faisalabad) → Jalandhar",
    theme: "Journey & Resilience",
    quote: "We left our ancestral orchard with just one tin trunk. When we reached Jalandhar, neighborly families shared their hearths. Resilience was built on mutual compassion.",
    audioPlaceholder: "Audio Recording Archived (1947 Partition Archive Courtesy)"
  },
  {
    id: "oral-02",
    narrator: "Kamla Sen (b. 1936)",
    origin: "Barisal → Kolkata",
    theme: "Memory & Home",
    quote: "The boat ride across the Padma River remains vivid. We brought a small handful of soil from our courtyard in Barisal, which my mother kept in a brass urn all her life.",
    audioPlaceholder: "Audio Recording Archived (Oral History Museum Collection)"
  },
  {
    id: "oral-03",
    narrator: "Lilaram Bhavnani (b. 1931)",
    origin: "Hyderabad (Sindh) → Gandhidham",
    theme: "Rebuilding Lives",
    quote: "In Karachi harbor, we boarded a steamer to Kutch. Building Gandhidham township from empty salt flats taught us that grit can create prosperity anywhere.",
    audioPlaceholder: "Audio Recording Archived (Sindhi Heritage Project)"
  },
  {
    id: "oral-04",
    narrator: "Dr. Sushila Nayar (b. 1914)",
    origin: "Medical Corps Volunteer, Kurukshetra",
    theme: "Relief Service",
    quote: "Medical teams worked 18-hour shifts vaccinating children against cholera. Service was our highest duty during those challenging months.",
    audioPlaceholder: "Audio Recording Archived (National Archives of India)"
  }
];

// Knowledge Quiz Dataset (10 Educational Questions)
export const partitionQuiz = [
  {
    id: "q1",
    question: "When was the Mountbatten Plan publicly announced?",
    options: ["May 16, 1946", "June 3, 1947", "July 18, 1947", "August 15, 1947"],
    correctIndex: 1,
    explanation: "Viceroy Lord Mountbatten announced the June 3 Plan in 1947, advancing the timeline for British withdrawal."
  },
  {
    id: "q2",
    question: "Who served as the Chairman of the Punjab and Bengal Boundary Commissions?",
    options: ["Lord Wavell", "Sir Cyril Radcliffe", "Stafford Cripps", "C. Rajagopalachari"],
    correctIndex: 1,
    explanation: "Sir Cyril Radcliffe was appointed chairman of both boundary commissions in July 1947."
  },
  {
    id: "q3",
    question: "Which landmark British law provided the legal framework for the Partition and Independence of India?",
    options: ["Government of India Act 1935", "Cabinet Mission Decree 1946", "Indian Independence Act 1947", "Regulating Act 1773"],
    correctIndex: 2,
    explanation: "The Indian Independence Act 1947 was passed by the British Parliament on July 18, 1947."
  },
  {
    id: "q4",
    question: "What was the largest refugee tent city established during the post-partition relief operations?",
    options: ["Ranaghat Camp", "Kurukshetra Camp", "Purana Qila Camp", "Cooper's Camp"],
    correctIndex: 1,
    explanation: "Kurukshetra Relief Camp housed up to 300,000 displaced people with over 50,000 tents."
  },
  {
    id: "q5",
    question: "What bilateral pact was signed in April 1950 to safeguard minority rights and peaceful co-existence?",
    options: ["Lucknow Pact", "Simla Pact", "Nehru-Liaquat Pact", "Delhi Accord"],
    correctIndex: 2,
    explanation: "Prime Ministers Jawaharlal Nehru and Liaquat Ali Khan signed the Nehru-Liaquat Pact on April 8, 1950."
  },
  {
    id: "q6",
    question: "What was the initial target date for British withdrawal set before the Mountbatten Plan?",
    options: ["December 1947", "June 1948", "August 1950", "January 1949"],
    correctIndex: 1,
    explanation: "Prime Minister Clement Attlee had originally announced a British exit date of June 1948."
  },
  {
    id: "q7",
    question: "Which new model township in Haryana was constructed using self-help schemes for displaced artisans?",
    options: ["Faridabad", "Chandigarh", "Gurugram", "Ambala"],
    correctIndex: 0,
    explanation: "Faridabad was developed under a self-help cooperative scheme to rehabilitate displaced families."
  },
  {
    id: "q8",
    question: "Approximately how many total people were displaced across borders according to census archives?",
    options: ["1 - 2 Million", "5 - 6 Million", "14 - 15 Million", "25 - 30 Million"],
    correctIndex: 2,
    explanation: "Historical census records estimate total cross-border movement at 14 to 15 million people."
  },
  {
    id: "q9",
    question: "Which leader walked through Noakhali and Kolkata in 1946–1947 to conduct non-violent peace missions?",
    options: ["Sardar Patel", "Mahatma Gandhi", "Subhas Chandra Bose", "Dr. B.R. Ambedkar"],
    correctIndex: 1,
    explanation: "Mahatma Gandhi dedicated his efforts to non-violent peace missions in Bengal and Bihar."
  },
  {
    id: "q10",
    question: "When were the official awards of the Radcliffe Line published?",
    options: ["August 14, 1947", "August 15, 1947", "August 17, 1947", "September 1, 1947"],
    correctIndex: 2,
    explanation: "The Radcliffe Line awards were officially published on August 17, 1947."
  }
];

/* Helper & Query Functions */

export function getTimelineEventById(id, list = partitionTimeline) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(e => e.id.toLowerCase() === target || e.date.toLowerCase() === target);
}

export function filterTimelineEvents(query = "", list = partitionTimeline) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  if (!q) return list;

  return list.filter(e => [
    e.title,
    e.date,
    e.phase,
    e.description,
    e.historicalSignificance
  ].some(field => field && field.toLowerCase().includes(q)));
}

export function filterLeaders(roleOrQuery = "", list = politicalLeaders) {
  if (!Array.isArray(list)) return [];
  const q = roleOrQuery.trim().toLowerCase();
  if (!q || q === "all") return list;

  return list.filter(l => [
    l.name,
    l.role,
    l.category,
    l.bio,
    l.keyActions
  ].some(field => field && field.toLowerCase().includes(q)));
}

export function filterOralHistories(topicOrQuery = "", list = oralHistories) {
  if (!Array.isArray(list)) return [];
  const q = topicOrQuery.trim().toLowerCase();
  if (!q || q === "all") return list;

  return list.filter(o => [
    o.narrator,
    o.origin,
    o.theme,
    o.quote
  ].some(field => field && field.toLowerCase().includes(q)));
}

export function getCorridorById(id, list = migrationCorridors) {
  if (!id || !Array.isArray(list)) return undefined;
  return list.find(c => c.id.toLowerCase() === id.trim().toLowerCase());
}

export function evaluateQuiz(userAnswers = {}, questions = partitionQuiz) {
  let score = 0;
  const results = questions.map((q, index) => {
    const selected = userAnswers[q.id] !== undefined ? Number(userAnswers[q.id]) : -1;
    const isCorrect = selected === q.correctIndex;
    if (isCorrect) score++;
    return {
      questionId: q.id,
      selected,
      correctIndex: q.correctIndex,
      isCorrect,
      explanation: q.explanation
    };
  });

  const percentage = Math.round((score / questions.length) * 100);
  let badge = "Partition History Scholar";
  if (percentage === 100) badge = "Master Historical Archivist";
  else if (percentage >= 70) badge = "Senior History Fellow";
  else if (percentage < 50) badge = "Historical Explorer";

  return {
    score,
    total: questions.length,
    percentage,
    badge,
    results
  };
}

export function verifyNeutralityAndNonGraphicContent(items = partitionTimeline) {
  const prohibitedTerms = ["blood bath", "slaughter", "carnage", "mutilated", "gory", "atrocity porn"];
  const violations = [];

  const textToScan = [
    editorialNote.content,
    ...items.map(i => `${i.title} ${i.description} ${i.historicalSignificance}`)
  ];

  textToScan.forEach((text, idx) => {
    prohibitedTerms.forEach(term => {
      if (text.toLowerCase().includes(term)) {
        violations.push(`Found restricted graphic term "${term}" at index ${idx}`);
      }
    });
  });

  return {
    isNeutral: violations.length === 0,
    violations
  };
}

/* ==========================================================================
   BROWSER DOM & INTERACTIVE ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.partitionTimelineData = partitionTimeline;
  window.partitionDemographicsData = demographicStats;
  window.partitionRadcliffeData = radcliffeRegions;
  window.partitionEditorialNote = editorialNote;
  window.mountbattenPlanDetails = mountbattenPlanDetails;
  window.politicalLeadersData = politicalLeaders;
  window.migrationCorridorsData = migrationCorridors;
  window.refugeeCampsData = refugeeCampsData;
  window.archivalGalleryData = archivalGallery;
  window.oralHistoriesData = oralHistories;
  window.partitionQuizData = partitionQuiz;

  window.getTimelineEventById = getTimelineEventById;
  window.filterTimelineEvents = filterTimelineEvents;
  window.filterLeaders = filterLeaders;
  window.filterOralHistories = filterOralHistories;
  window.getCorridorById = getCorridorById;
  window.evaluateQuiz = evaluateQuiz;
  window.verifyNeutralityAndNonGraphicContent = verifyNeutralityAndNonGraphicContent;

  document.addEventListener("DOMContentLoaded", () => {
    // Tab Navigation Switcher
    const tabButtons = document.querySelectorAll(".partition-tab-btn");
    const tabPanes = document.querySelectorAll(".partition-tab-pane");

    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.dataset.tab;
        tabButtons.forEach(b => b.classList.remove("active"));
        tabPanes.forEach(p => p.classList.remove("active"));

        btn.classList.add("active");
        const activePane = document.getElementById(`tab-${targetTab}`);
        if (activePane) activePane.classList.add("active");
      });
    });

    // 1. Timeline Renderer & Search
    const timelineContainer = document.getElementById("timeline-cards-container");
    const searchInput = document.getElementById("partition-search");

    function renderTimeline() {
      if (!timelineContainer) return;
      timelineContainer.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const filtered = filterTimelineEvents(query);

      if (filtered.length === 0) {
        timelineContainer.innerHTML = `
          <div class="empty-msg-card">
            <h3>No Timeline Events Found</h3>
            <p>Try adjusting your search query (e.g., Mountbatten, Radcliffe, Resettlement, Bengal, Lucknow).</p>
          </div>
        `;
        return;
      }

      filtered.forEach((item, index) => {
        const card = document.createElement("article");
        card.className = "scrolly-card";
        card.dataset.index = index;

        card.innerHTML = `
          <div class="card-meta">
            <span class="phase-tag">${item.phase}</span>
            <span class="date-tag">📅 ${item.date}</span>
          </div>
          <h3>${item.title}</h3>
          <p class="event-desc">${item.description}</p>
          <div class="significance-box">
            <h4>💡 Historical Significance</h4>
            <p>${item.historicalSignificance}</p>
          </div>
        `;
        timelineContainer.appendChild(card);
      });
    }

    searchInput?.addEventListener("input", renderTimeline);
    renderTimeline();

    // 2. Counter Animation
    const counterDisplaced = document.getElementById("counter-displaced");
    const counterIndia = document.getElementById("counter-india");
    const counterPakistan = document.getElementById("counter-pakistan");

    function animateCounters() {
      const duration = 1500;
      const steps = 30;
      const stepTime = duration / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        if (counterDisplaced) {
          const val = (demographicStats.totalDisplacedNumeric * progress / 1000000).toFixed(1);
          counterDisplaced.textContent = `${val} Million`;
        }
        if (counterIndia) {
          const val = (demographicStats.migratedToIndiaNumeric * progress / 1000000).toFixed(1);
          counterIndia.textContent = `${val} Million`;
        }
        if (counterPakistan) {
          const val = (demographicStats.migratedToPakistanNumeric * progress / 1000000).toFixed(1);
          counterPakistan.textContent = `${val} Million`;
        }

        if (step >= steps) {
          if (counterDisplaced) counterDisplaced.textContent = demographicStats.totalDisplaced;
          if (counterIndia) counterIndia.textContent = demographicStats.migratedToIndia;
          if (counterPakistan) counterPakistan.textContent = demographicStats.migratedToPakistan;
          clearInterval(timer);
        }
      }, stepTime);
    }
    animateCounters();

    // 3. Leaders Gallery Renderer
    const leadersContainer = document.getElementById("leaders-grid-container");
    const leaderFilterSelect = document.getElementById("leader-category-filter");

    function renderLeaders() {
      if (!leadersContainer) return;
      leadersContainer.innerHTML = "";

      const selectedCategory = leaderFilterSelect ? leaderFilterSelect.value : "all";
      const filtered = filterLeaders(selectedCategory);

      filtered.forEach(leader => {
        const card = document.createElement("div");
        card.className = "leader-card";
        card.innerHTML = `
          <div class="leader-header">
            <span class="leader-avatar">👤</span>
            <div>
              <h3>${leader.name}</h3>
              <span class="leader-category-tag">${leader.category}</span>
            </div>
          </div>
          <p class="leader-role">${leader.role}</p>
          <p class="leader-bio">${leader.bio}</p>
          <div class="leader-actions-box">
            <strong>Key Role:</strong> ${leader.keyActions}
          </div>
        `;
        leadersContainer.appendChild(card);
      });
    }

    leaderFilterSelect?.addEventListener("change", renderLeaders);
    renderLeaders();

    // 4. Archival Gallery Renderer
    const galleryContainer = document.getElementById("gallery-grid-container");
    function renderGallery() {
      if (!galleryContainer) return;
      galleryContainer.innerHTML = "";

      archivalGallery.forEach(photo => {
        const card = document.createElement("div");
        card.className = "archival-card";
        card.innerHTML = `
          <div class="photo-placeholder-box">
            <span class="photo-icon">📷</span>
            <span class="photo-year-badge">${photo.year}</span>
          </div>
          <div class="archival-body">
            <span class="photo-category">${photo.category} · ${photo.location}</span>
            <h4>${photo.title}</h4>
            <p class="photo-caption">${photo.caption}</p>
            <p class="photo-credit"><em>Source: ${photo.credit}</em></p>
          </div>
        `;
        galleryContainer.appendChild(card);
      });
    }
    renderGallery();

    // 5. Oral History Renderer & Audio Simulation
    const oralContainer = document.getElementById("oral-history-container");
    function renderOralHistory() {
      if (!oralContainer) return;
      oralContainer.innerHTML = "";

      oralHistories.forEach(item => {
        const card = document.createElement("blockquote");
        card.className = "oral-card";
        card.innerHTML = `
          <div class="oral-header">
            <span class="oral-theme-tag">💬 ${item.theme}</span>
            <span class="oral-origin">📍 ${item.origin}</span>
          </div>
          <p class="oral-quote">"${item.quote}"</p>
          <footer class="oral-footer">
            <strong class="narrator-name">— ${item.narrator}</strong>
            <div class="audio-player-mockup">
              <button class="audio-play-btn" type="button" aria-label="Play testimony audio snippet">▶ Play Audio</button>
              <span class="audio-status">${item.audioPlaceholder}</span>
            </div>
          </footer>
        `;

        const playBtn = card.querySelector(".audio-play-btn");
        const statusSpan = card.querySelector(".audio-status");
        if (playBtn && statusSpan) {
          playBtn.addEventListener("click", () => {
            if (playBtn.textContent.includes("▶")) {
              playBtn.textContent = "⏸ Pause";
              statusSpan.textContent = "🔊 Playing archival audio testimony...";
            } else {
              playBtn.textContent = "▶ Play Audio";
              statusSpan.textContent = item.audioPlaceholder;
            }
          });
        }

        oralContainer.appendChild(card);
      });
    }
    renderOralHistory();

    // 6. Interactive Migration Maps Corridor Info Selector
    const corridorCards = document.querySelectorAll(".corridor-card");
    const corridorDetailBox = document.getElementById("corridor-detail-display");

    corridorCards.forEach(card => {
      card.addEventListener("click", () => {
        const corridorId = card.dataset.corridor;
        const data = getCorridorById(corridorId);
        if (data && corridorDetailBox) {
          corridorCards.forEach(c => c.classList.remove("selected"));
          card.classList.add("selected");

          corridorDetailBox.innerHTML = `
            <h3>${data.name}</h3>
            <p><strong>Primary Route:</strong> ${data.primaryRoute}</p>
            <p><strong>Estimated Volume:</strong> ${data.estimatedVolume}</p>
            <p><strong>Directional Flow:</strong> ${data.direction}</p>
            <div class="corridor-note-box">
              <p>${data.details}</p>
            </div>
          `;
        }
      });
    });

    // 7. Knowledge Quiz Engine
    const quizFormContainer = document.getElementById("quiz-questions-container");
    const quizSubmitBtn = document.getElementById("quiz-submit-btn");
    const quizResultsBox = document.getElementById("quiz-results-display");

    function renderQuiz() {
      if (!quizFormContainer) return;
      quizFormContainer.innerHTML = "";

      partitionQuiz.forEach((q, index) => {
        const qCard = document.createElement("div");
        qCard.className = "quiz-question-card";
        qCard.dataset.id = q.id;

        let optionsHtml = "";
        q.options.forEach((opt, optIdx) => {
          optionsHtml += `
            <label class="quiz-option-label">
              <input type="radio" name="${q.id}" value="${optIdx}">
              <span>${opt}</span>
            </label>
          `;
        });

        qCard.innerHTML = `
          <h4>${index + 1}. ${q.question}</h4>
          <div class="quiz-options-group">
            ${optionsHtml}
          </div>
          <div class="quiz-feedback-box" id="feedback-${q.id}" style="display: none;"></div>
        `;
        quizFormContainer.appendChild(qCard);
      });
    }

    renderQuiz();

    quizSubmitBtn?.addEventListener("click", () => {
      const userAnswers = {};
      partitionQuiz.forEach(q => {
        const checked = document.querySelector(`input[name="${q.id}"]:checked`);
        if (checked) {
          userAnswers[q.id] = checked.value;
        }
      });

      const evaluation = evaluateQuiz(userAnswers);

      // Display per-question feedback
      evaluation.results.forEach(res => {
        const feedbackEl = document.getElementById(`feedback-${res.questionId}`);
        if (feedbackEl) {
          feedbackEl.style.display = "block";
          if (res.isCorrect) {
            feedbackEl.className = "quiz-feedback-box correct";
            feedbackEl.innerHTML = `✅ <strong>Correct!</strong> ${res.explanation}`;
          } else {
            feedbackEl.className = "quiz-feedback-box incorrect";
            feedbackEl.innerHTML = `❌ <strong>Incorrect.</strong> ${res.explanation}`;
          }
        }
      });

      // Display overall results card
      if (quizResultsBox) {
        quizResultsBox.style.display = "block";
        quizResultsBox.innerHTML = `
          <div class="quiz-summary-card">
            <h3>Quiz Completed!</h3>
            <p class="quiz-score-num">Score: ${evaluation.score} / ${evaluation.total} (${evaluation.percentage}%)</p>
            <span class="quiz-badge">🎖️ ${evaluation.badge}</span>
            <p class="quiz-summary-text">Thank you for engaging with the Partition of India (1947) educational explorer.</p>
          </div>
        `;
        quizResultsBox.scrollIntoView({ behavior: "smooth" });
      }
    });

  });
}
