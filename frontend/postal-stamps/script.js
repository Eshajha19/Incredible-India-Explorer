document.addEventListener("app:route-changed", () => {
  const categoryFilter = document.getElementById("category-filter");
  const yearFilter = document.getElementById("year-filter");
  const stampsGrid = document.getElementById("stamps-grid");
  const stampsStatus = document.getElementById("stamps-status");
  const stampsEmpty = document.getElementById("stamps-empty");
  const modal = document.getElementById("stamp-modal");
  const modalClose = document.getElementById("stamp-modal-close");
  const menuToggle = document.getElementById("menu-toggle");

  // Stamp data collection
  const stampsData = [
    {
      id: 1,
      title: "Mahatma Gandhi",
      category: "personalities",
      year: 1948,
      denomination: "1.5 Annas",
      theme: "Freedom Movement",
      description: "India's first commemorative stamp featuring Mahatma Gandhi, issued after his assassination. This stamp marked the beginning of India's philatelic tribute to its national leaders.",
      image: "../assets/Abdul_kalam.png"
    },
    {
      id: 2,
      title: "Taj Mahal",
      category: "monuments",
      year: 1963,
      denomination: "15 Paise",
      theme: "Architectural Heritage",
      description: "A beautiful depiction of the Taj Mahal, one of the Seven Wonders of the World. This stamp celebrates India's Mughal architectural masterpiece and symbol of eternal love.",
      image: "../assets/Taj_Mahal.png"
    },
    {
      id: 3,
      title: "Diwali Festival",
      category: "festivals",
      year: 2017,
      denomination: "5 Rupees",
      theme: "Festival of Lights",
      description: "Commemorative stamp celebrating Diwali, the Hindu festival of lights. Features traditional diya lamps and rangoli patterns representing prosperity and joy.",
      image: "../assets/culture_default.png"
    },
    {
      id: 4,
      title: "Royal Bengal Tiger",
      category: "wildlife",
      year: 1989,
      denomination: "2 Rupees",
      theme: "Wildlife Conservation",
      description: "Stamp featuring the majestic Royal Bengal Tiger, India's national animal. Part of the wildlife conservation series to raise awareness about endangered species.",
      image: "../assets/travel_hidden.png"
    },
    {
      id: 5,
      title: "Chandrayaan-2",
      category: "achievements",
      year: 2019,
      denomination: "5 Rupees",
      theme: "Space Exploration",
      description: "Celebrating India's second lunar exploration mission. This stamp honors ISRO's achievement in space technology and scientific advancement.",
      image: "../assets/science/chandrayaan-3.png"
    },
    {
      id: 6,
      title: "Independence Day",
      category: "history",
      year: 1947,
      denomination: "3 Annas",
      theme: "Freedom",
      description: "First stamp issued after India's independence. Features the Ashoka Pillar and the tricolor, symbolizing the birth of a free nation.",
      image: "../assets/Ashoka.png"
    },
    {
      id: 7,
      title: "Dr. B.R. Ambedkar",
      category: "personalities",
      year: 1990,
      denomination: "1 Rupee",
      theme: "Social Justice",
      description: "Commemorative stamp honoring Dr. B.R. Ambedkar, the architect of the Indian Constitution and champion of social equality.",
      image: "../assets/Abdul_kalam.png"
    },
    {
      id: 8,
      title: "Sun Temple Konark",
      category: "monuments",
      year: 1968,
      denomination: "20 Paise",
      theme: "UNESCO Heritage",
      description: "Stamp featuring the magnificent Sun Temple at Konark, Odisha. A UNESCO World Heritage Site known for its architectural grandeur and intricate stone carvings.",
      image: "../assets/Taj_Mahal.png"
    },
    {
      id: 9,
      title: "Holi Festival",
      category: "festivals",
      year: 2020,
      denomination: "5 Rupees",
      theme: "Festival of Colors",
      description: "Vibrant stamp celebrating Holi, the festival of colors. Depicts the playful spirit and cultural significance of this spring festival.",
      image: "../assets/culture_default.png"
    },
    {
      id: 10,
      title: "Indian Elephant",
      category: "wildlife",
      year: 1975,
      denomination: "1 Rupee",
      theme: "Wildlife Heritage",
      description: "Stamp featuring the Indian elephant, revered as a symbol of wisdom and strength. Part of the series on India's diverse wildlife.",
      image: "../assets/travel_hidden.png"
    },
    {
      id: 11,
      title: "Mangalyaan Mission",
      category: "achievements",
      year: 2014,
      denomination: "5 Rupees",
      theme: "Mars Exploration",
      description: "Celebrating India's first interplanetary mission to Mars. ISRO made history with this cost-effective and successful Mars Orbiter Mission.",
      image: "../assets/science/aditya-l1.png"
    },
    {
      id: 12,
      title: "Republic Day",
      category: "history",
      year: 1950,
      denomination: "2 Annas",
      theme: "Constitution",
      description: "Stamp issued on the first Republic Day, commemorating the adoption of the Indian Constitution. Features the national emblem and democratic values.",
      image: "../assets/Ashoka.png"
    },
    {
      id: 13,
      title: "Rabindranath Tagore",
      category: "personalities",
      year: 1961,
      denomination: "15 Paise",
      theme: "Literature & Arts",
      description: "Commemorative stamp honoring Nobel laureate Rabindranath Tagore on his birth centenary. Celebrating his contributions to literature, music, and art.",
      image: "../assets/culture_default.png"
    },
    {
      id: 14,
      title: "Qutub Minar",
      category: "monuments",
      year: 1964,
      denomination: "10 Paise",
      theme: "Medieval Architecture",
      description: "Stamp featuring the Qutub Minar, the tallest brick minaret in the world. A masterpiece of Indo-Islamic architecture in Delhi.",
      image: "../assets/Taj_Mahal.png"
    },
    {
      id: 15,
      title: "Pongal Festival",
      category: "festivals",
      year: 2018,
      denomination: "5 Rupees",
      theme: "Harvest Festival",
      description: "Stamp celebrating Pongal, the Tamil harvest festival. Features traditional elements like sugarcane, pots, and sun motifs representing prosperity.",
      image: "../assets/culture_default.png"
    },
    {
      id: 16,
      title: "Peacock",
      category: "wildlife",
      year: 1963,
      denomination: "15 Paise",
      theme: "National Bird",
      description: "Stamp featuring the peacock, India's national bird. Known for its stunning plumage and graceful dance, symbolizing beauty and grace.",
      image: "../assets/travel_hidden.png"
    },
    {
      id: 17,
      title: "Dr. A.P.J. Abdul Kalam",
      category: "personalities",
      year: 2015,
      denomination: "5 Rupees",
      theme: "People's President",
      description: "Commemorative stamp honoring Dr. A.P.J. Abdul Kalam, the Missile Man of India and beloved President. A tribute to his scientific contributions and inspiring leadership.",
      image: "../assets/Abdul_kalam.png"
    },
    {
      id: 18,
      title: "Ajanta Caves",
      category: "monuments",
      year: 1972,
      denomination: "1 Rupee",
      theme: "Buddhist Art",
      description: "Stamp featuring the ancient Ajanta Caves, renowned for their magnificent Buddhist paintings and sculptures. A UNESCO World Heritage Site.",
      image: "../assets/Taj_Mahal.png"
    }
  ];

  let activeCategory = "all";
  let activeYearRange = "all";
  let lastFocusedElement = null;

  function getYearRange(year) {
    if (year >= 1947 && year <= 1960) return "1947-1960";
    if (year >= 1961 && year <= 1980) return "1961-1980";
    if (year >= 1981 && year <= 2000) return "1981-2000";
    if (year >= 2001 && year <= 2020) return "2001-2020";
    if (year >= 2021) return "2021-present";
    return "1947-1960";
  }

  function createStampCard(stamp) {
    const card = document.createElement("article");
    card.className = "stamp-card";
    card.dataset.category = stamp.category;
    card.dataset.year = stamp.year;
    card.dataset.yearRange = getYearRange(stamp.year);

    card.innerHTML = `
      <div class="stamp-card-image">
        <img src="${stamp.image}" alt="${stamp.title} stamp" loading="lazy">
        <span class="stamp-card-category">${stamp.category}</span>
      </div>
      <div class="stamp-card-body">
        <div class="stamp-card-year">${stamp.year}</div>
        <h3>${stamp.title}</h3>
        <div class="stamp-card-denomination">${stamp.denomination}</div>
        <p class="stamp-card-description">${stamp.description}</p>
        <div class="stamp-card-theme">Theme: ${stamp.theme}</div>
      </div>
    `;

    card.addEventListener("click", () => openModal(stamp));
    return card;
  }

  function renderStamps() {
    stampsGrid.innerHTML = "";
    let visibleCount = 0;

    const filteredStamps = stampsData.filter(stamp => {
      const matchesCategory = activeCategory === "all" || stamp.category === activeCategory;
      const stampYearRange = getYearRange(stamp.year);
      const matchesYear = activeYearRange === "all" || stampYearRange === activeYearRange;
      return matchesCategory && matchesYear;
    });

    filteredStamps.forEach(stamp => {
      const card = createStampCard(stamp);
      stampsGrid.appendChild(card);
      visibleCount++;
    });

    const filtersApplied = activeCategory !== "all" || activeYearRange !== "all";
    stampsStatus.textContent = filtersApplied
      ? `Found ${visibleCount} stamp${visibleCount === 1 ? "" : "s"}`
      : `Showing all ${visibleCount} stamps`;

    stampsEmpty.classList.toggle("visible", visibleCount === 0);
  }

  function openModal(stamp) {
    lastFocusedElement = document.activeElement;

    document.getElementById("modal-image").src = stamp.image;
    document.getElementById("modal-image").alt = `${stamp.title} stamp`;
    document.getElementById("modal-category").textContent = stamp.category;
    document.getElementById("modal-title").textContent = stamp.title;
    document.getElementById("modal-year").textContent = stamp.year;
    document.getElementById("modal-denomination").textContent = stamp.denomination;
    document.getElementById("modal-description").textContent = stamp.description;
    document.getElementById("modal-theme").textContent = stamp.theme;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Event listeners for filters
  categoryFilter.addEventListener("change", () => {
    activeCategory = categoryFilter.value;
    renderStamps();
  });

  yearFilter.addEventListener("change", () => {
    activeYearRange = yearFilter.value;
    renderStamps();
  });

  // Modal event listeners
  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // Menu toggle for mobile
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !expanded);
    });
  }

  // Initialize page
  renderStamps();
});
