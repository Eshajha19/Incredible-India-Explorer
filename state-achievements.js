/**
 * state-achievements.js
 * State Achievement Timeline - Data Structures & Interactive Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Core 26 Landmark State Achievements Dataset
export const achievements = [
  {
    id: "ach-1",
    year: 1913,
    title: "First Asian Nobel Laureate in Literature (Rabindranath Tagore)",
    state: "West Bengal",
    stateCode: "WB",
    region: "East",
    category: "literature",
    description: "Rabindranath Tagore won the Nobel Prize in Literature for Gitanjali, establishing India's modern literary renaissance on the global stage.",
    significance: "Pioneered modern Indian poetry, composed national anthems for two nations (India & Bangladesh), and founded Visva-Bharati University.",
    icon: "📚"
  },
  {
    id: "ach-2",
    year: 1930,
    title: "Raman Effect Nobel Prize in Physics (Sir C.V. Raman)",
    state: "Tamil Nadu",
    stateCode: "TN",
    region: "South",
    category: "science",
    description: "Sir C.V. Raman discovered light scattering (Raman Effect) at the Indian Association for the Cultivation of Science, becoming the first Asian scientist to receive a Nobel Prize.",
    significance: "Revolutionized molecular spectroscopy and established foundational scientific research institutions across South India.",
    icon: "🔬"
  },
  {
    id: "ach-3",
    year: 1951,
    title: "India's First Institute of Technology (IIT Kharagpur)",
    state: "West Bengal",
    stateCode: "WB",
    region: "East",
    category: "education",
    description: "IIT Kharagpur was established at Hijli Detention Camp to forge world-class engineering talent for post-independence nation building.",
    significance: "Sparked the premier IIT education system that produced global technology leaders, researchers, and innovators.",
    icon: "🎓"
  },
  {
    id: "ach-4",
    year: 1963,
    title: "First Indian Sounding Rocket Launched from Thumba",
    state: "Kerala",
    stateCode: "KL",
    region: "South",
    category: "science",
    description: "Dr. Vikram Sarabhai and Dr. APJ Abdul Kalam launched Nike-Apache rocket from Thumba Equatorial Rocket Launching Station in Thiruvananthapuram.",
    significance: "Began India's space journey from a humble fishing village church to becoming a global space superpower.",
    icon: "🚀"
  },
  {
    id: "ach-5",
    year: 1970,
    title: "Amul & The White Revolution (Operation Flood)",
    state: "Gujarat",
    stateCode: "GJ",
    region: "West",
    category: "economy",
    description: "Dr. Verghese Kurien and Tribhuvandas Patel built Anand Milk Union Limited (Amul), turning India from a milk-deficient nation into the world's largest milk producer.",
    significance: "Empowered millions of rural women farmers through cooperative dairy economics.",
    icon: "🥛"
  },
  {
    id: "ach-6",
    year: 1973,
    title: "Launch of Project Tiger at Jim Corbett National Park",
    state: "Uttarakhand",
    stateCode: "UK",
    region: "North",
    category: "environment",
    description: "Project Tiger was launched from Jim Corbett Park to save the Bengal tiger from extinction, creating pioneer tiger reserves across India.",
    significance: "Saved the apex predator and made India home to over 75% of the world's wild tiger population.",
    icon: "🐅"
  },
  {
    id: "ach-7",
    year: 1974,
    title: "Chipko Movement Eco-Forest Protection",
    state: "Uttarakhand",
    stateCode: "UK",
    region: "North",
    category: "environment",
    description: "Led by Gaura Devi and Sunderlal Bahuguna in Chamoli, village women hugged trees to prevent commercial deforestation in the Himalayas.",
    significance: "Became a global symbol of non-violent environmentalism and community forest conservation.",
    icon: "🌲"
  },
  {
    id: "ach-8",
    year: 1975,
    title: "Aryabhata - First Indian Satellite Built in Bengaluru",
    state: "Karnataka",
    stateCode: "KA",
    region: "South",
    category: "science",
    description: "Designed and fabricated at ISRO Satellite Centre in Bengaluru, Aryabhata was launched into orbit, launching India's satellite era.",
    significance: "Laid the foundation for India's communication, remote sensing, and navigation constellation.",
    icon: "🛰️"
  },
  {
    id: "ach-9",
    year: 1983,
    title: "Cricket World Cup Triumph Led by Kapil Dev",
    state: "Haryana",
    stateCode: "HR",
    region: "North",
    category: "sports",
    description: "Kapil Dev ('The Haryana Hurricane') captained India to defeat West Indies at Lord's, winning India's first Cricket World Cup.",
    significance: "Transformed cricket into India's most passionate sport and established Indian sporting belief.",
    icon: "🏏"
  },
  {
    id: "ach-10",
    year: 1984,
    title: "India's First Underground Metro Mass Rapid Transit",
    state: "West Bengal",
    stateCode: "WB",
    region: "East",
    category: "technology",
    description: "Kolkata Metro opened India's first underground rapid transit rail system from Esplanade to Bhowanipore.",
    significance: "Pioneered modern urban rail transportation infrastructure across Indian metropolises.",
    icon: "🚇"
  },
  {
    id: "ach-11",
    year: 1988,
    title: "Viswanathan Anand Becomes India's First Grandmaster",
    state: "Tamil Nadu",
    stateCode: "TN",
    region: "South",
    category: "sports",
    description: "18-year-old Viswanathan Anand became India's first Grandmaster, later winning 5 World Chess Championship titles.",
    significance: "Sparked Chennai as the 'Chess Capital of India' and inspired dozens of Indian teenage prodigies.",
    icon: "♟️"
  },
  {
    id: "ach-12",
    year: 1991,
    title: "Kerala Declared India's First Fully Literate State",
    state: "Kerala",
    stateCode: "KL",
    region: "South",
    category: "education",
    description: "Through the Saksharata Samiti mass campaign, Kerala achieved 100% adult literacy, leading national human development indicators.",
    significance: "Demonstrated that high social literacy and healthcare index can be achieved irrespective of industrial GDP.",
    icon: "📖"
  },
  {
    id: "ach-13",
    year: 1998,
    title: "Pokhran-II Underground Nuclear Tests (Operation Shakti)",
    state: "Rajasthan",
    stateCode: "RJ",
    region: "North-West",
    category: "science",
    description: "India conducted 5 underground nuclear tests in the Thar Desert at Pokhran, establishing strategic nuclear deterrence.",
    significance: "Elevated India's global geopolitical standing and indigenous nuclear technology capabilities.",
    icon: "⚛️"
  },
  {
    id: "ach-14",
    year: 2000,
    title: "Bengaluru Rises as Global Silicon Valley of Asia",
    state: "Karnataka",
    stateCode: "KA",
    region: "South",
    category: "technology",
    description: "Bengaluru established its dominance as India's software export capital, hosting global tech R&D hubs and unicorn startups.",
    significance: "Positioned India as the software engine of the 21st-century global digital economy.",
    icon: "💻"
  },
  {
    id: "ach-15",
    year: 2008,
    title: "Chandrayaan-1 Confirms Water Molecules on the Moon",
    state: "Andhra Pradesh",
    stateCode: "AP",
    region: "South",
    category: "science",
    description: "Launched from Sriharikota, Chandrayaan-1's Moon Impact Probe discovered lunar water ice molecules.",
    significance: "A major scientific milestone that reshaped global lunar exploration and future crewed mission planning.",
    icon: "🌕"
  },
  {
    id: "ach-16",
    year: 2008,
    title: "Abhinav Bindra Wins India's First Individual Olympic Gold",
    state: "Punjab",
    stateCode: "PB",
    region: "North",
    category: "sports",
    description: "Shooter Abhinav Bindra won gold in 10m Air Rifle at Beijing Olympics, breaking India's 28-year individual Olympic gold draught.",
    significance: "Proved that Indian individual athletes could conquer the top podium at Olympic games.",
    icon: "🥇"
  },
  {
    id: "ach-17",
    year: 2012,
    title: "Mary Kom Olympic Boxing Medal & Northeast Sporting Pride",
    state: "Manipur",
    stateCode: "MN",
    region: "North-East",
    category: "sports",
    description: "MC Mary Kom won bronze at London Olympics, adding to her 6 World Championship titles and inspiring Northeastern sports academies.",
    significance: "Established Manipur as a powerhouse of Indian boxing, weightlifting, and football.",
    icon: "🥊"
  },
  {
    id: "ach-18",
    year: 2013,
    title: "Mars Orbiter Mission (Mangalyaan) First-Try Success",
    state: "Karnataka",
    stateCode: "KA",
    region: "South",
    category: "science",
    description: "ISRO placed Mangalyaan into Martian orbit on its maiden attempt at a fraction of Hollywood movie budgets.",
    significance: "India became the first Asian nation to reach Mars orbit and the first in the world to succeed on maiden try.",
    icon: "🔴"
  },
  {
    id: "ach-19",
    year: 2015,
    title: "Cochin Airport - World's First 100% Solar-Powered Airport",
    state: "Kerala",
    stateCode: "KL",
    region: "South",
    category: "environment",
    description: "Cochin International Airport (CIAL) powered all terminal operations via a 46,000 solar panel grid.",
    significance: "Received the UN Champions of the Earth Award for sustainable green aviation leadership.",
    icon: "☀️"
  },
  {
    id: "ach-20",
    year: 2016,
    title: "Sikkim Declared World's First 100% Organic State",
    state: "Sikkim",
    stateCode: "SK",
    region: "North-East",
    category: "environment",
    description: "Sikkim phased out all synthetic chemical fertilizers and pesticides across 75,000 hectares of farmland.",
    significance: "Won the UN Future Policy Gold Award for eco-agriculture, soil protection, and biodiversity.",
    icon: "🍃"
  },
  {
    id: "ach-21",
    year: 2018,
    title: "Ranji & Domestic Cricket Tournament Supremacy",
    state: "Maharashtra",
    stateCode: "MH",
    region: "West",
    category: "sports",
    description: "Mumbai won its record 41st Ranji Trophy title, reinforcing decades of domestic cricket excellence and producing legend batsmen.",
    significance: "Nurtured iconic players from Sunil Gavaskar and Sachin Tendulkar to modern international stars.",
    icon: "🏆"
  },
  {
    id: "ach-22",
    year: 2019,
    title: "Statue of Unity Engineering Marvel Completed",
    state: "Gujarat",
    stateCode: "GJ",
    region: "West",
    category: "technology",
    description: "The world's tallest statue (182m) honoring Sardar Vallabhbhai Patel was constructed along the Narmada River.",
    significance: "Engineered to withstand high wind velocities and earthquakes while generating mega eco-tourism revenue.",
    icon: "🗽"
  },
  {
    id: "ach-23",
    year: 2021,
    title: "Neeraj Chopra Wins Historic Olympic Athletics Javelin Gold",
    state: "Haryana",
    stateCode: "HR",
    region: "North",
    category: "sports",
    description: "Neeraj Chopra threw 87.58m to win India's first-ever Olympic gold medal in athletics at Tokyo 2020.",
    significance: "Sparked a revolution in track and field sports across Indian youth.",
    icon: "🎯"
  },
  {
    id: "ach-24",
    year: 2023,
    title: "Chandrayaan-3 Historic Moon South Pole Landing",
    state: "Andhra Pradesh",
    stateCode: "AP",
    region: "South",
    category: "science",
    description: "Launched from Sriharikota, Vikram lander soft-landed near the lunar South Pole at Shiv Shakti Point.",
    significance: "India became the first country to land near the lunar South Pole and 4th country to soft land on Moon.",
    icon: "🚀"
  },
  {
    id: "ach-25",
    year: 2024,
    title: "World Cup Hockey & Olympic Sports Revival Sponsorship",
    state: "Odisha",
    stateCode: "OD",
    region: "East",
    category: "sports",
    description: "Odisha built world-class hockey stadiums in Bhubaneswar and Rourkela, sponsoring Indian national hockey teams to back-to-back Olympic medals.",
    significance: "Pioneered state-backed sporting ecosystem revival for national pride.",
    icon: "🏑"
  },
  {
    id: "ach-26",
    year: 2025,
    title: "Himalayan High Altitude Solar-Wind Renewable Microgrids",
    state: "Himachal Pradesh",
    stateCode: "HP",
    region: "North",
    category: "environment",
    description: "Himachal Pradesh pioneered 100% green energy battery storage microgrids for remote mountain villages.",
    significance: "Demonstrated zero-carbon energy resilience in fragile high-altitude mountain eco-zones.",
    icon: "⚡"
  }
];

// Core Categories List
export const categories = [
  { id: "all", name: "All Categories", icon: "✨" },
  { id: "sports", name: "Sports", icon: "🏆" },
  { id: "science", name: "Science & Space", icon: "🔬" },
  { id: "education", name: "Education & Literacy", icon: "🎓" },
  { id: "economy", name: "Economy & Industry", icon: "📈" },
  { id: "literature", name: "Literature & Arts", icon: "📚" },
  { id: "technology", name: "Technology & IT", icon: "💻" },
  { id: "environment", name: "Environmental Conservation", icon: "🌿" }
];

const BOOKMARK_STORAGE_KEY = "state_achievement_bookmarks";

/**
 * Get bookmarked achievement IDs from localStorage.
 */
export function getBookmarkedIds() {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(BOOKMARK_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Toggle bookmark status for an achievement ID.
 */
export function toggleBookmark(id) {
  if (!id || typeof localStorage === "undefined") return false;
  try {
    const current = getBookmarkedIds();
    const idx = current.indexOf(id);
    let updated;
    if (idx !== -1) {
      updated = current.filter(item => item !== id);
    } else {
      updated = [...current, id];
    }
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(updated));
    return updated.includes(id);
  } catch (e) {
    return false;
  }
}

/**
 * Filter achievements list by search query, state, category, and bookmarked filter.
 */
export function filterAchievements(list = achievements, { search = "", state = "all", category = "all", bookmarkedOnly = false, bookmarkedIds = [] } = {}) {
  if (!Array.isArray(list)) return [];
  const query = search.trim().toLowerCase();
  const bookmarkedSet = new Set(bookmarkedIds);

  return list.filter(item => {
    const matchesSearch = !query || [
      item.title,
      item.state,
      item.category,
      item.description,
      item.significance,
      String(item.year)
    ].some(field => field && field.toLowerCase().includes(query));

    const matchesState = state === "all" || item.stateCode.toLowerCase() === state.toLowerCase() || item.state.toLowerCase() === state.toLowerCase();
    const matchesCategory = category === "all" || item.category.toLowerCase() === category.toLowerCase();
    const matchesBookmark = !bookmarkedOnly || bookmarkedSet.has(item.id);

    return matchesSearch && matchesState && matchesCategory && matchesBookmark;
  });
}

/**
 * Sort achievements by year (ascending or descending).
 */
export function sortAchievementsByYear(list = achievements, order = "asc") {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => {
    return order === "desc" ? b.year - a.year : a.year - b.year;
  });
}

/**
 * Get unique state names and state codes.
 */
export function getUniqueStates(list = achievements) {
  if (!Array.isArray(list)) return [];
  const map = new Map();
  list.forEach(item => {
    if (!map.has(item.stateCode)) {
      map.set(item.stateCode, item.state);
    }
  });
  return Array.from(map.entries()).map(([code, name]) => ({ code, name })).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get unique categories from list.
 */
export function getUniqueCategories(list = achievements) {
  if (!Array.isArray(list)) return [];
  const set = new Set(list.map(a => a.category).filter(Boolean));
  return Array.from(set).sort();
}

/* ==========================================================================
   BROWSER DOM & TIMELINE WORKSPACE ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.achievementsData = achievements;
  window.categoriesData = categories;
  window.filterAchievements = filterAchievements;
  window.sortAchievementsByYear = sortAchievementsByYear;
  window.toggleBookmark = toggleBookmark;
  window.getBookmarkedIds = getBookmarkedIds;
  window.getUniqueStates = getUniqueStates;

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("ach-search");
    const stateFilter = document.getElementById("state-filter");
    const categoryFilter = document.getElementById("category-filter");
    const sortOrderSelect = document.getElementById("sort-order");
    const bookmarkToggleBtn = document.getElementById("btn-toggle-bookmarks");
    const resultStatus = document.getElementById("result-status");
    const btnResetFilters = document.getElementById("reset-filters");

    // Timeline Stream container
    const timelineStream = document.getElementById("timeline-stream");

    let isBookmarkedOnly = false;

    // Populate state dropdown
    if (stateFilter) {
      getUniqueStates(achievements).forEach(st => {
        const opt = document.createElement("option");
        opt.value = st.code;
        opt.textContent = st.name;
        stateFilter.appendChild(opt);
      });
    }

    // Populate category dropdown
    if (categoryFilter) {
      categories.forEach(cat => {
        if (cat.id !== "all") {
          const opt = document.createElement("option");
          opt.value = cat.id;
          opt.textContent = `${cat.icon} ${cat.name}`;
          categoryFilter.appendChild(opt);
        }
      });
    }

    function renderTimeline() {
      if (!timelineStream) return;

      const searchVal = searchInput ? searchInput.value : "";
      const stateVal = stateFilter ? stateFilter.value : "all";
      const catVal = categoryFilter ? categoryFilter.value : "all";
      const sortVal = sortOrderSelect ? sortOrderSelect.value : "asc";

      const bookmarkedIds = getBookmarkedIds();

      const filtered = filterAchievements(achievements, {
        search: searchVal,
        state: stateVal,
        category: catVal,
        bookmarkedOnly: isBookmarkedOnly,
        bookmarkedIds: bookmarkedIds
      });

      const sorted = sortAchievementsByYear(filtered, sortVal);

      if (resultStatus) {
        resultStatus.textContent = `Showing ${sorted.length} of ${achievements.length} landmark achievements ${isBookmarkedOnly ? '(Bookmarked)' : ''}`;
      }

      timelineStream.innerHTML = "";

      if (sorted.length === 0) {
        timelineStream.innerHTML = `
          <div class="empty-timeline-card">
            <h3>No State Achievements Found</h3>
            <p>Try adjusting your search query, state, or category filters.</p>
          </div>
        `;
        return;
      }

      sorted.forEach((item, idx) => {
        const isBookmarked = bookmarkedIds.includes(item.id);

        const card = document.createElement("article");
        card.className = `timeline-card ${idx % 2 === 0 ? "left" : "right"}`;
        card.innerHTML = `
          <div class="timeline-node-marker">
            <span class="node-year">${item.year}</span>
          </div>

          <div class="timeline-card-content">
            <div class="card-top-bar">
              <span class="cat-badge ${item.category}">${item.icon} ${item.category}</span>
              <span class="state-badge">📍 ${item.state}</span>
              <button type="button" class="bookmark-btn ${isBookmarked ? 'active' : ''}" data-id="${item.id}" title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Achievement'}">
                ${isBookmarked ? '★' : '☆'}
              </button>
            </div>

            <h3 class="card-title">${item.title}</h3>
            <p class="card-desc">${item.description}</p>
            <div class="card-impact">
              <strong>Impact:</strong> ${item.significance}
            </div>
          </div>
        `;

        // Bookmark click listener
        const bBtn = card.querySelector(".bookmark-btn");
        bBtn?.addEventListener("click", (e) => {
          e.stopPropagation();
          const newStatus = toggleBookmark(item.id);
          bBtn.classList.toggle("active", newStatus);
          bBtn.textContent = newStatus ? "★" : "☆";
          bBtn.title = newStatus ? "Remove Bookmark" : "Bookmark Achievement";

          if (isBookmarkedOnly) {
            renderTimeline();
          }
        });

        timelineStream.appendChild(card);
      });
    }

    // Toggle bookmarked view button
    bookmarkToggleBtn?.addEventListener("click", () => {
      isBookmarkedOnly = !isBookmarkedOnly;
      bookmarkToggleBtn.classList.toggle("active", isBookmarkedOnly);
      bookmarkToggleBtn.textContent = isBookmarkedOnly ? "★ Showing Bookmarked" : "☆ View Bookmarked";
      renderTimeline();
    });

    // Reset filters
    btnResetFilters?.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (stateFilter) stateFilter.value = "all";
      if (categoryFilter) categoryFilter.value = "all";
      if (sortOrderSelect) sortOrderSelect.value = "asc";
      isBookmarkedOnly = false;
      if (bookmarkToggleBtn) {
        bookmarkToggleBtn.classList.remove("active");
        bookmarkToggleBtn.textContent = "☆ View Bookmarked";
      }
      renderTimeline();
    });

    // Event listeners
    searchInput?.addEventListener("input", renderTimeline);
    stateFilter?.addEventListener("change", renderTimeline);
    categoryFilter?.addEventListener("change", renderTimeline);
    sortOrderSelect?.addEventListener("change", renderTimeline);

    // Initial render
    renderTimeline();
  });
}
