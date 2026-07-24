/**
 * up-filming.js
 * Uttar Pradesh Filming Locations Explorer - Dataset & Interactive Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Core 6 Mandatory UP Filming Locations Dataset
export const locations = [
  {
    id: "varanasi_ghats",
    name: "Varanasi Ghats",
    city: "Varanasi",
    tagline: "Spiritual Ganges Riverbanks & Eternal Ghats",
    description: "The ancient riverbank ghats of Varanasi (Dashashwamedh, Manikarnika, Assi, Harishchandra) provide an unmatched atmospheric backdrop for emotional climaxes, spiritual journeys, and vibrant boat sequences.",
    famousMovies: ["Raanjhanaa", "Masaan", "Gangs of Wasseypur", "Piku", "Water"],
    highlights: ["Dashashwamedh Evening Aarti", "Morning Boat Shoots", "Kashi Alleyways", "Manikarnika Ghat"],
    btsFact: "During the filming of Raanjhanaa, Dhanush and Sonam Kapoor's bicycle chase scenes through narrow Kashi lanes required shooting at 5:00 AM to manage overwhelming local crowds.",
    coords: { x: 580, y: 340, lat: 25.3176, lng: 82.9739 },
    icon: "🛕",
    colorTheme: "#f97316"
  },
  {
    id: "taj_mahal",
    name: "Taj Mahal",
    city: "Agra",
    tagline: "Global Monument of Eternal Love",
    description: "The UNESCO World Heritage marble mausoleum along the Yamuna River. A legendary filming destination for iconic romantic duets, historical epics, and international cinema.",
    famousMovies: ["Slumdog Millionaire", "Bunty Aur Babli", "Mere Brother Ki Dulhan", "Young Seeta / Jodha Akbar", "Tevar"],
    highlights: ["Yamuna River Reflection Shoots", "Mehtab Bagh Sunset Shots", "Central Garden Pathway", "Red Sandstone Forecourt"],
    btsFact: "Strict Archaeological Survey of India (ASI) regulations forbid heavy film equipment on the main marble dome platform, forcing directors to use telephoto lenses from across the Yamuna at Mehtab Bagh.",
    coords: { x: 220, y: 190, lat: 27.1751, lng: 78.0421 },
    icon: "🕌",
    colorTheme: "#eab308"
  },
  {
    id: "lucknow",
    name: "Lucknow",
    city: "Lucknow",
    tagline: "Awadhi Havelis, Imambaras & Nawabi Heritage",
    description: "The City of Nawabs offers magnificent colonial architecture, royal palaces, bustling Chowk bazaars, and historic Imambaras. Lucknow is one of India's most popular filming hubs.",
    famousMovies: ["Gulabo Sitabo", "Jolly LLB 2", "Tanu Weds Manu", "Ishaqzaade", "Article 15", "Umrao Jaan"],
    highlights: ["Bada Imambara Rumi Darwaza", "Chattar Manzil", "Mahmudabad Palace", "Chowk Old City Lanes"],
    btsFact: "Shooting Gulabo Sitabo inside the 100-year-old Mahmudabad Palace required preserving delicate heritage woodwork while filming Amitabh Bachchan and Ayushmann Khurrana's comedic landlord squabbles.",
    coords: { x: 420, y: 220, lat: 26.8467, lng: 80.9462 },
    icon: "🏛️",
    colorTheme: "#10b981"
  },
  {
    id: "agra",
    name: "Agra (Fort & Streets)",
    city: "Agra",
    tagline: "Mughal Fortresses & Historic Streetscapes",
    description: "Beyond the Taj, Agra's grand red sandstone Agra Fort, Fatehpur Sikri, and historic bazaars offer dramatic settings for action chases, period dramas, and romantic capers.",
    famousMovies: ["Mughal-e-Azam", "Pardes", "Tevar", "Yamla Pagla Deewana", "Jodha Akbar"],
    highlights: ["Agra Fort Sandstone Ramparts", "Fatehpur Sikri Panch Mahal", "Sadara Bazaar Streets", "Diwan-i-Khas"],
    btsFact: "High-octane action chase scenes for Tevar were filmed along the soaring sandstone walls of Agra Fort in searing 42°C summer heat.",
    coords: { x: 210, y: 200, lat: 27.1795, lng: 78.0211 },
    icon: "🏰",
    colorTheme: "#ec4899"
  },
  {
    id: "jhansi",
    name: "Jhansi",
    city: "Jhansi",
    tagline: "Fortress Ramparts & Freedom Warrior Lore",
    description: "The historic city of Maharani Lakshmibai, featuring the hilltop Jhansi Fort, rocky terrain, and nearby Betwa river banks that inspire period war dramas and action sagas.",
    famousMovies: ["Manikarnika: The Queen of Jhansi", "Jhansi Ki Rani", "Badhaai Do", "Bala"],
    highlights: ["Jhansi Fort Hilltop Ramparts", "Barua Sagar Fort", "Rani Mahal Palace", "Betwa River Bank"],
    btsFact: "Period battle reenactments for Manikarnika incorporated local Jhansi horsemen and trained swordfighters against the authentic granite hill backdrop of Jhansi Fort.",
    coords: { x: 320, y: 340, lat: 25.4484, lng: 78.5685 },
    icon: "⚔️",
    colorTheme: "#8b5cf6"
  },
  {
    id: "prayagraj",
    name: "Prayagraj",
    city: "Prayagraj",
    tagline: "Triveni Sangam Confluence & Colonial Rail Bridges",
    description: "Where holy rivers meet. Prayagraj's Triveni Sangam ghats, colonial-era Old Naini Railway Bridge, and Victorian Anand Bhavan feature prominently in crime dramas, romances, and social stories.",
    famousMovies: ["Gangs of Wasseypur", "Shaadi Mein Zaroor Aana", "Mukkabaaz", "Lagaam"],
    highlights: ["Triveni Sangam River Confluence", "Old Naini Bridge", "Anand Bhavan Heritage", "Prayagraj Junction Station"],
    btsFact: "Anurag Kashyap captured real live crowd atmospheres at Prayagraj Junction and Naini Bridge for Gangs of Wasseypur without using elaborate artificial sets.",
    coords: { x: 460, y: 320, lat: 25.4358, lng: 81.8463 },
    icon: "🌊",
    colorTheme: "#06b6d4"
  }
];

// Core Movies Dataset (12 Movies shot in UP)
export const movies = [
  {
    id: "m-1",
    title: "Raanjhanaa",
    year: 2013,
    director: "Aanand L. Rai",
    cast: ["Dhanush", "Sonam Kapoor", "Abhay Deol"],
    locationIds: ["varanasi_ghats", "lucknow"],
    genre: "Romance / Drama",
    description: "A passionate romantic drama following Kundan's obsessive love story set against the colorful ghats of Varanasi and the colleges of Lucknow.",
    btsTrivia: "Dhanush spent two weeks living along the Varanasi ghats before shooting to master local UP mannerisms, tea stall slang, and body language.",
    posterIcon: "🚲",
    rating: "8.1/10"
  },
  {
    id: "m-2",
    title: "Masaan",
    year: 2015,
    director: "Neeraj Ghaywan",
    cast: ["Vicky Kaushal", "Richa Chadha", "Shweta Tripathi", "Sanjay Mishra"],
    locationIds: ["varanasi_ghats"],
    genre: "Drama / Indie",
    description: "A critically acclaimed tale of two tragic love stories navigating social taboos and mortality along the cremation ghats of Kashi.",
    btsTrivia: "Vicky Kaushal stayed at Harishchandra Ghat for days, observing real dome undertakers to authentically portray Deepak's character.",
    posterIcon: "🔥",
    rating: "8.2/10"
  },
  {
    id: "m-3",
    title: "Gangs of Wasseypur",
    year: 2012,
    director: "Anurag Kashyap",
    cast: ["Manoj Bajpayee", "Nawazuddin Siddiqui", "Richa Chadha", "Pankaj Tripathi"],
    locationIds: ["varanasi_ghats", "prayagraj"],
    genre: "Crime / Action",
    description: "An epic multi-generational gang war drama spanning coal mafia rivalries, filmed extensively across Varanasi and Prayagraj.",
    btsTrivia: "The famous train platform sequence was shot guerrilla-style at Prayagraj station with real unsuspecting passengers in the background.",
    posterIcon: "🔫",
    rating: "8.2/10"
  },
  {
    id: "m-4",
    title: "Slumdog Millionaire",
    year: 2008,
    director: "Danny Boyle",
    cast: ["Dev Patel", "Freida Pinto", "Anil Kapoor"],
    locationIds: ["taj_mahal", "agra"],
    genre: "Drama / Romance",
    description: "The Oscar-winning global phenomenon featuring Jamal's childhood adventures as an unofficial tour guide at the Taj Mahal.",
    btsTrivia: "Danny Boyle captured the Taj Mahal tour guide sequence using lightweight digital cameras to maneuver through Agra's crowds.",
    posterIcon: "🏆",
    rating: "8.0/10"
  },
  {
    id: "m-5",
    title: "Bunty Aur Babli",
    year: 2005,
    director: "Shaad Ali",
    cast: ["Abhishek Bachchan", "Rani Mukerji", "Amitabh Bachchan"],
    locationIds: ["taj_mahal", "agra", "lucknow"],
    genre: "Comedy / Crime",
    description: "A classic heist comedy about two ambitious small-town dreamers who stage hilarious cons across Agra, Taj Mahal, and Lucknow.",
    btsTrivia: "The famous 'Kajra Re' song dance sequence was filmed on a massive soundstage with Taj Mahal motifs crafted by UP artisans.",
    posterIcon: "🎩",
    rating: "7.2/10"
  },
  {
    id: "m-6",
    title: "Gulabo Sitabo",
    year: 2020,
    director: "Shoojit Sircar",
    cast: ["Amitabh Bachchan", "Ayushmann Khurrana"],
    locationIds: ["lucknow"],
    genre: "Comedy / Drama",
    description: "A delightful satire about a crotchety old landlord and his stubborn tenant fighting over a crumbling ancestral mansion in Lucknow.",
    btsTrivia: "Amitabh Bachchan underwent 3 hours of prosthetic makeup daily in Lucknow heat to portray the elderly landlord Mirza.",
    posterIcon: "🏚️",
    rating: "7.3/10"
  },
  {
    id: "m-7",
    title: "Jolly LLB 2",
    year: 2017,
    director: "Subhash Kapoor",
    cast: ["Akshay Kumar", "Huma Qureshi", "Saurabh Shukla"],
    locationIds: ["lucknow"],
    genre: "Courtroom Drama / Comedy",
    description: "A courtroom comedy-drama following a struggling lawyer in Lucknow who takes on a corrupt police encounter case.",
    btsTrivia: "Filming at Chattar Manzil and Lucknow High Court precincts was completed in a record 30 days due to efficient local production support.",
    posterIcon: "⚖️",
    rating: "7.2/10"
  },
  {
    id: "m-8",
    title: "Article 15",
    year: 2019,
    director: "Anubhav Sinha",
    cast: ["Ayushmann Khurrana", "Manoj Pahwa", "Kumud Mishra"],
    locationIds: ["lucknow"],
    genre: "Crime / Social Drama",
    description: "An intense investigative thriller following an IPS officer uncovering systemic injustice in rural Uttar Pradesh.",
    btsTrivia: "Shot in swampy rural terrain outside Lucknow during foggy winter mornings to create a haunting visual atmosphere.",
    posterIcon: "🚓",
    rating: "8.2/10"
  },
  {
    id: "m-9",
    title: "Piku",
    year: 2015,
    director: "Shoojit Sircar",
    cast: ["Amitabh Bachchan", "Deepika Padukone", "Irrfan Khan"],
    locationIds: ["varanasi_ghats"],
    genre: "Comedy / Drama",
    description: "A heartwarming road trip journey ending at a picturesque heritage hotel along the serene Varanasi ghats.",
    btsTrivia: "The night bicycle riding scene featuring Amitabh Bachchan along Varanasi's ghat promenade was shot with minimal artificial lighting.",
    posterIcon: "🚗",
    rating: "7.6/10"
  },
  {
    id: "m-10",
    title: "Manikarnika: The Queen of Jhansi",
    year: 2019,
    director: "Kangana Ranaut, Radha Krishna Jagarlamudi",
    cast: ["Kangana Ranaut", "Atul Kulkarni", "Ankita Lokhande"],
    locationIds: ["jhansi"],
    genre: "Action / Historical Epic",
    description: "A biographical action epic depicting the fierce resistance of Rani Lakshmibai of Jhansi against the British East India Company.",
    btsTrivia: "Kangana Ranaut underwent extensive sword-fighting and horse-riding training on location around Jhansi Fort.",
    posterIcon: "🐎",
    rating: "7.0/10"
  },
  {
    id: "m-11",
    title: "Shaadi Mein Zaroor Aana",
    year: 2017,
    director: "Ratnaa Sinha",
    cast: ["Rajkummar Rao", "Kriti Kharbanda"],
    locationIds: ["prayagraj", "lucknow"],
    genre: "Romance / Drama",
    description: "A revenge romance following Satyendra's journey from a heartbroken groom in Prayagraj to an IAS officer in Lucknow.",
    btsTrivia: "Prominently showcases Prayagraj's Triveni Sangam, Civil Lines, and coaching hubs where civil service aspirants study.",
    posterIcon: "💍",
    rating: "7.7/10"
  },
  {
    id: "m-12",
    title: "Tanu Weds Manu",
    year: 2011,
    director: "Aanand L. Rai",
    cast: ["Rhavan", "Kangana Ranaut", "Jimmy Sheirgill"],
    locationIds: ["lucknow"],
    genre: "Romance / Comedy",
    description: "A romantic comedy depicting the colorful chaos of an NRI doctor falling in love with a feisty girl in Lucknow.",
    btsTrivia: "The wedding celebration scenes highlighted traditional Awadhi catering, zardozi attire, and festive street processions in Lucknow.",
    posterIcon: "🎉",
    rating: "7.5/10"
  }
];

// Behind-the-Scenes Facts Dataset
export const btsTriviaList = [
  {
    id: "bts-1",
    locationId: "varanasi_ghats",
    movieTitle: "Raanjhanaa",
    title: "Early Morning Ghat Shoots",
    factText: "Dhanush and Sonam Kapoor's bicycle chase scenes through narrow Kashi lanes required shooting at 5:00 AM to beat the surging local crowds.",
    category: "Crowd Management"
  },
  {
    id: "bts-2",
    locationId: "taj_mahal",
    movieTitle: "Slumdog Millionaire",
    title: "ASI Equipment Restrictions",
    factText: "Strict Archaeological Survey of India (ASI) regulations forbid heavy camera rigs on the central marble dome platform, requiring telephoto shots from Mehtab Bagh.",
    category: "Heritage Protection"
  },
  {
    id: "bts-3",
    locationId: "lucknow",
    movieTitle: "Gulabo Sitabo",
    title: "Preserving 100-Year-Old Palace",
    factText: "Filming inside the historic Mahmudabad Palace required zero nails or heavy lighting rigs to protect century-old delicate teakwood architecture.",
    category: "Set Design"
  },
  {
    id: "bts-4",
    locationId: "agra",
    movieTitle: "Tevar",
    title: "Summer Heat on Sandstone Walls",
    factText: "High-octane rooftop chase sequences across Agra Fort's red sandstone walls were filmed under 42°C summer heat with cooling breaks every 20 minutes.",
    category: "Action Stunts"
  },
  {
    id: "bts-5",
    locationId: "jhansi",
    movieTitle: "Manikarnika",
    title: "Local Jhansi Horsemen Warriors",
    factText: "The grand battle sequences utilized local Jhansi horsemen and trained swordfighters against the natural granite hill background of Jhansi Fort.",
    category: "Casting & Extras"
  },
  {
    id: "bts-6",
    locationId: "prayagraj",
    movieTitle: "Gangs of Wasseypur",
    title: "Guerrilla Railway Station Shoots",
    factText: "Anurag Kashyap filmed live crowd atmospheres at Prayagraj Junction and Naini Bridge using hidden cameras without stopping train traffic.",
    category: "Cinematography"
  }
];

// Interactive Gallery Items Dataset
export const galleryItems = [
  {
    id: "gal-1",
    title: "Sunrise Boat Ride at Dashashwamedh Ghat",
    locationId: "varanasi_ghats",
    movieTitle: "Raanjhanaa",
    category: "Iconic Scenes",
    caption: "Kundan's early morning boat ride along the misty Ganges in Raanjhanaa.",
    icon: "🌅"
  },
  {
    id: "gal-2",
    title: "Taj Mahal Reflecting Pool Walk",
    locationId: "taj_mahal",
    movieTitle: "Slumdog Millionaire",
    category: "Architecture",
    caption: "Jamal giving tour explanations near the famous Taj Mahal reflecting pool.",
    icon: "🕌"
  },
  {
    id: "gal-3",
    title: "Mahmudabad Palace Courtyard",
    locationId: "lucknow",
    movieTitle: "Gulabo Sitabo",
    category: "Behind the Scenes",
    caption: "Amitabh Bachchan as Mirza in the ancestral courtyard of Mahmudabad Palace in Lucknow.",
    icon: "🏛️"
  },
  {
    id: "gal-4",
    title: "Agra Fort Sandstone Ramparts Action",
    locationId: "agra",
    movieTitle: "Tevar",
    category: "Iconic Scenes",
    caption: "Rooftop action chase sequence along the historic red sandstone walls of Agra Fort.",
    icon: "🏰"
  },
  {
    id: "gal-5",
    title: "Jhansi Fort Hilltop Ramparts",
    locationId: "jhansi",
    movieTitle: "Manikarnika",
    category: "Architecture",
    caption: "Kangana Ranaut as Rani Lakshmibai overlooking Jhansi from the fort ramparts.",
    icon: "⚔️"
  },
  {
    id: "gal-6",
    title: "Triveni Sangam Sunset Confluence",
    locationId: "prayagraj",
    movieTitle: "Shaadi Mein Zaroor Aana",
    category: "Sunset & Ghats",
    caption: "Satyendra and Aarti at the sacred Triveni Sangam confluence in Prayagraj.",
    icon: "🌊"
  }
];

/**
 * Get location profile by ID.
 */
export function getLocationById(locationId, list = locations) {
  if (!locationId || !Array.isArray(list)) return undefined;
  return list.find(loc => loc.id.toLowerCase() === locationId.toLowerCase());
}

/**
 * Get movie object by ID.
 */
export function getMovieById(movieId, list = movies) {
  if (!movieId || !Array.isArray(list)) return undefined;
  return list.find(m => m.id.toLowerCase() === movieId.toLowerCase());
}

/**
 * Get movies filmed at a specific location ID.
 */
export function getMoviesByLocation(locationId, list = movies) {
  if (!locationId || !Array.isArray(list)) return [];
  const target = locationId.toLowerCase();
  return list.filter(m => m.locationIds.some(loc => loc.toLowerCase() === target));
}

/**
 * Get BTS trivia for a specific location ID.
 */
export function getTriviaByLocation(locationId, list = btsTriviaList) {
  if (!locationId || !Array.isArray(list)) return [];
  const target = locationId.toLowerCase();
  return list.filter(t => t.locationId.toLowerCase() === target);
}

/**
 * Filter movies by search query, location ID, or genre.
 */
export function filterMovies(query = "", locationId = "all", genre = "all", list = movies) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  const loc = locationId.trim().toLowerCase();
  const g = genre.trim().toLowerCase();

  return list.filter(movie => {
    const matchesQuery = !q || [
      movie.title,
      movie.director,
      movie.genre,
      movie.description,
      movie.btsTrivia,
      ...movie.cast
    ].some(field => field && field.toLowerCase().includes(q));

    const matchesLocation = loc === "all" || movie.locationIds.some(l => l.toLowerCase() === loc);
    const matchesGenre = g === "all" || movie.genre.toLowerCase().includes(g);

    return matchesQuery && matchesLocation && matchesGenre;
  });
}

/**
 * Filter gallery items by location ID and category.
 */
export function filterGallery(locationId = "all", category = "all", list = galleryItems) {
  if (!Array.isArray(list)) return [];
  const loc = locationId.trim().toLowerCase();
  const cat = category.trim().toLowerCase();

  return list.filter(item => {
    const matchesLocation = loc === "all" || item.locationId.toLowerCase() === loc;
    const matchesCategory = cat === "all" || item.category.toLowerCase() === cat;
    return matchesLocation && matchesCategory;
  });
}

/* ==========================================================================
   BROWSER DOM & INTERACTIVE EXPLORER ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.upLocationsData = locations;
  window.upMoviesData = movies;
  window.btsTriviaListData = btsTriviaList;
  window.galleryItemsData = galleryItems;
  window.getLocationById = getLocationById;
  window.getMovieById = getMovieById;
  window.getMoviesByLocation = getMoviesByLocation;
  window.filterMovies = filterMovies;
  window.filterGallery = filterGallery;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM Element References
    const locationChips = document.querySelectorAll(".btn-location-chip");
    const movieSearchInput = document.getElementById("movie-search");
    const genreFilterSelect = document.getElementById("genre-filter");
    const moviesGridContainer = document.getElementById("movies-grid");
    const btsGridContainer = document.getElementById("bts-grid");
    const galleryGridContainer = document.getElementById("gallery-grid");
    const galleryCategorySelect = document.getElementById("gallery-category-filter");

    // Location Detail Inspector Elements
    const activeLocationName = document.getElementById("active-location-name");
    const activeLocationTagline = document.getElementById("active-location-tagline");
    const activeLocationDesc = document.getElementById("active-location-desc");
    const activeLocationBts = document.getElementById("active-location-bts");
    const activeLocationHighlights = document.getElementById("active-location-highlights");
    const activeLocationMoviesCount = document.getElementById("active-location-movies-count");

    // Modal elements
    const galleryModal = document.getElementById("gallery-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalImageTitle = document.getElementById("modal-img-title");
    const modalImageLoc = document.getElementById("modal-img-loc");
    const modalImageCaption = document.getElementById("modal-img-caption");
    const modalImageIcon = document.getElementById("modal-img-icon");

    let currentSelectedLocationId = "all";

    // Initialize UI
    function renderAll() {
      renderActiveLocationInspector();
      renderMovies();
      renderBtsTrivia();
      renderGallery();
    }

    // Render Active Location Inspector
    function renderActiveLocationInspector() {
      if (currentSelectedLocationId === "all") {
        if (activeLocationName) activeLocationName.textContent = "All Uttar Pradesh Locations";
        if (activeLocationTagline) activeLocationTagline.textContent = "Varanasi Ghats, Taj Mahal, Lucknow, Agra, Jhansi, Prayagraj";
        if (activeLocationDesc) activeLocationDesc.textContent = "Select a specific filming location chip above or on the map to inspect its iconic film heritage, movies, and behind-the-scenes trivia.";
        if (activeLocationBts) activeLocationBts.textContent = "Uttar Pradesh's diverse heritage offers film producers 30% production subsidies, authentic historical monuments, and rich cultural traditions.";
        if (activeLocationMoviesCount) activeLocationMoviesCount.textContent = `${movies.length} Movies Featured`;
        if (activeLocationHighlights) {
          activeLocationHighlights.innerHTML = `
            <li>📍 Varanasi Ghats</li>
            <li>📍 Taj Mahal & Agra</li>
            <li>📍 Lucknow Palaces</li>
            <li>📍 Jhansi Fort</li>
            <li>📍 Prayagraj Sangam</li>
          `;
        }
        return;
      }

      const loc = getLocationById(currentSelectedLocationId);
      if (!loc) return;

      const filmedMovies = getMoviesByLocation(loc.id);

      if (activeLocationName) activeLocationName.textContent = `${loc.icon} ${loc.name}`;
      if (activeLocationTagline) activeLocationTagline.textContent = loc.tagline;
      if (activeLocationDesc) activeLocationDesc.textContent = loc.description;
      if (activeLocationBts) activeLocationBts.textContent = loc.btsFact;
      if (activeLocationMoviesCount) activeLocationMoviesCount.textContent = `${filmedMovies.length} Movies Filmed Here`;

      if (activeLocationHighlights) {
        activeLocationHighlights.innerHTML = "";
        loc.highlights.forEach(h => {
          const li = document.createElement("li");
          li.textContent = `✨ ${h}`;
          activeLocationHighlights.appendChild(li);
        });
      }
    }

    // Render Movie Cards Grid
    function renderMovies() {
      if (!moviesGridContainer) return;
      moviesGridContainer.innerHTML = "";

      const query = movieSearchInput ? movieSearchInput.value : "";
      const genre = genreFilterSelect ? genreFilterSelect.value : "all";

      const filtered = filterMovies(query, currentSelectedLocationId, genre);

      if (filtered.length === 0) {
        moviesGridContainer.innerHTML = `
          <div class="empty-msg-card">
            <h3>No Movies Found</h3>
            <p>Try adjusting your search query or location filter.</p>
          </div>
        `;
        return;
      }

      filtered.forEach(movie => {
        const card = document.createElement("article");
        card.className = "movie-card";

        const locationBadges = movie.locationIds.map(locId => {
          const loc = getLocationById(locId);
          return loc ? `<span class="loc-tag">${loc.icon} ${loc.name}</span>` : '';
        }).join(" ");

        card.innerHTML = `
          <div class="movie-card-header">
            <span class="movie-poster-icon">${movie.posterIcon}</span>
            <div>
              <span class="movie-year-badge">${movie.year}</span>
              <span class="movie-rating-badge">★ ${movie.rating}</span>
            </div>
          </div>

          <h3 class="movie-title">${movie.title}</h3>
          <p class="movie-director">Dir. ${movie.director} · <em>${movie.genre}</em></p>
          <p class="movie-desc">${movie.description}</p>

          <div class="movie-cast-box">
            <strong>Starring:</strong> ${movie.cast.join(", ")}
          </div>

          <div class="movie-locations-bar">
            ${locationBadges}
          </div>

          <div class="movie-bts-box">
            <strong>🎬 BTS Fact:</strong> ${movie.btsTrivia}
          </div>
        `;

        moviesGridContainer.appendChild(card);
      });
    }

    // Render Behind-the-Scenes Facts Grid
    function renderBtsTrivia() {
      if (!btsGridContainer) return;
      btsGridContainer.innerHTML = "";

      let list = btsTriviaList;
      if (currentSelectedLocationId !== "all") {
        list = getTriviaByLocation(currentSelectedLocationId);
      }

      if (list.length === 0) {
        btsGridContainer.innerHTML = `
          <div class="empty-msg-card">
            <p>No BTS facts available for this location filter.</p>
          </div>
        `;
        return;
      }

      list.forEach(bts => {
        const loc = getLocationById(bts.locationId);
        const card = document.createElement("div");
        card.className = "bts-trivia-card";
        card.innerHTML = `
          <div class="bts-card-header">
            <span class="bts-cat-badge">${bts.category}</span>
            <span class="bts-loc-badge">📍 ${loc ? loc.name : ''}</span>
          </div>
          <h4>${bts.title} (${bts.movieTitle})</h4>
          <p>${bts.factText}</p>
        `;
        btsGridContainer.appendChild(card);
      });
    }

    // Render Interactive Gallery Grid
    function renderGallery() {
      if (!galleryGridContainer) return;
      galleryGridContainer.innerHTML = "";

      const cat = galleryCategorySelect ? galleryCategorySelect.value : "all";
      const filtered = filterGallery(currentSelectedLocationId, cat);

      if (filtered.length === 0) {
        galleryGridContainer.innerHTML = `
          <div class="empty-msg-card">
            <p>No gallery stills available for this filter.</p>
          </div>
        `;
        return;
      }

      filtered.forEach(item => {
        const loc = getLocationById(item.locationId);
        const card = document.createElement("div");
        card.className = "gallery-item-card";
        card.innerHTML = `
          <div class="gallery-icon-box">
            <span>${item.icon}</span>
          </div>
          <div class="gallery-info">
            <span class="gallery-cat-badge">${item.category}</span>
            <h4>${item.title}</h4>
            <p><strong>Film:</strong> ${item.movieTitle} (${loc ? loc.name : ''})</p>
          </div>
        `;

        card.addEventListener("click", () => {
          openGalleryModal(item);
        });

        galleryGridContainer.appendChild(card);
      });
    }

    // Open Lightbox Gallery Modal
    function openGalleryModal(item) {
      if (!galleryModal) return;
      const loc = getLocationById(item.locationId);

      if (modalImageTitle) modalImageTitle.textContent = item.title;
      if (modalImageLoc) modalImageLoc.textContent = `${loc ? loc.icon + " " + loc.name : ''} · ${item.movieTitle}`;
      if (modalImageCaption) modalImageCaption.textContent = item.caption;
      if (modalImageIcon) modalImageIcon.textContent = item.icon;

      galleryModal.classList.add("active");
    }

    // Modal Close Handler
    modalCloseBtn?.addEventListener("click", () => {
      galleryModal?.classList.remove("active");
    });

    // Location Chip Clicks
    locationChips.forEach(chip => {
      chip.addEventListener("click", () => {
        locationChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        currentSelectedLocationId = chip.dataset.locationId;
        renderAll();
      });
    });

    // Search and Genre Filter Listeners
    movieSearchInput?.addEventListener("input", renderMovies);
    genreFilterSelect?.addEventListener("change", renderMovies);
    galleryCategorySelect?.addEventListener("change", renderGallery);

    // Initial Full Render
    renderAll();
  });
}
