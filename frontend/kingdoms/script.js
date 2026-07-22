document.addEventListener("DOMContentLoaded", () => {
  const kingdoms = [
    {
      id: "maurya",
      name: "Maurya Empire",
      period: "322 BCE – 185 BCE",
      capital: "Pataliputra (modern Patna)",
      rulers: "Chandragupta Maurya, Bindusara, Ashoka the Great",
      achievements: "Unified most of the Indian subcontinent, established centralized administration, promoted Buddhism after Kalinga War, built extensive trade networks, constructed the Grand Trunk Road",
      description: "One of the largest empires in Indian history, founded by Chandragupta Maurya. Under Ashoka, it reached its peak and embraced non-violence after the devastating Kalinga War.",
      image: "../assets/monuments.png"
    },
    {
      id: "gupta",
      name: "Gupta Empire",
      period: "320 CE – 550 CE",
      capital: "Pataliputra, Ujjain",
      rulers: "Chandragupta I, Samudragupta, Chandragupta II (Vikramaditya)",
      achievements: "Golden Age of Indian culture, flourishing of arts and sciences, Aryabhata's mathematical discoveries, Kalidasa's literary works, development of decimal system, Ajanta and Ellora cave paintings",
      description: "Often called the Golden Age of India, the Gupta period witnessed remarkable achievements in arts, architecture, literature, mathematics, and science that influenced civilizations across Asia.",
      image: "../assets/architecture.png"
    },
    {
      id: "chola",
      name: "Chola Empire",
      period: "850 CE – 1279 CE",
      capital: "Tanjavur, Gangaikonda Cholapuram",
      rulers: "Rajaraja I, Rajendra I, Rajendra Chola III",
      achievements: "Maritime dominance across Southeast Asia, construction of Brihadeeswarar Temple, extensive trade networks, naval expeditions to Srivijaya, development of Tamil literature and art",
      description: "A maritime empire that dominated South India and extended its influence across the Indian Ocean to Southeast Asia. Known for magnificent temple architecture and naval prowess.",
      image: "../assets/culture.png"
    },
    {
      id: "vijayanagara",
      name: "Vijayanagara Empire",
      period: "1336 CE – 1646 CE",
      capital: "Hampi",
      rulers: "Harihara I, Bukka Raya I, Krishnadevaraya",
      achievements: "Flourishing of Carnatic music and literature, construction of Virupaksha Temple, extensive irrigation systems, promotion of Telugu and Kannada literature, military innovations",
      description: "The last great Hindu empire of South India, known for its wealth, military power, and cultural patronage. Hampi, its capital, is now a UNESCO World Heritage Site.",
      image: "../assets/heritage.png"
    },
    {
      id: "mughal",
      name: "Mughal Empire",
      period: "1526 CE – 1857 CE",
      capital: "Agra, Delhi, Lahore",
      rulers: "Babur, Akbar, Shah Jahan, Aurangzeb",
      achievements: "Construction of Taj Mahal, Red Fort, and Humayun's Tomb, synthesis of Indo-Islamic architecture, development of miniature painting, administrative reforms, Urdu language development",
      description: "An imperial power that ruled most of the Indian subcontinent for over three centuries. Known for architectural marvels, cultural synthesis, and administrative innovations that shaped modern India.",
      image: "../assets/monuments.png"
    },
    {
      id: "maratha",
      name: "Maratha Empire",
      period: "1674 CE – 1818 CE",
      capital: "Raigad, Pune, Satara",
      rulers: "Chhatrapati Shivaji Maharaj, Shambhaji, Peshwa Baji Rao I",
      achievements: "Guerrilla warfare tactics, naval fleet establishment, promotion of Sanskrit and Marathi, construction of sea forts, administrative reforms, resistance against Mughal expansion",
      description: "Founded by Chhatrapati Shivaji Maharaj, the Maratha Empire became a dominant power through innovative military tactics and strong administration. It played a crucial role in shaping India's political landscape.",
      image: "../assets/forts.png"
    }
  ];

  const fallbackImage = "../assets/hero_banner.png";
  const grid = document.getElementById("kingdom-grid");
  const timeline = document.getElementById("timeline-track");
  const modal = document.getElementById("kingdom-modal");
  const modalClose = document.getElementById("modal-close");
  let lastFocus = null;

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function createTimelineItem(kingdom, index) {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.dataset.id = kingdom.id;
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div>
        <div class="timeline-label">${escapeHtml(kingdom.name)}</div>
        <div class="timeline-period">${escapeHtml(kingdom.period)}</div>
      </div>
    `;
    item.addEventListener("click", () => {
      const card = document.querySelector(`.kingdom-card[data-id="${kingdom.id}"]`);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => openModal(kingdom, card), 500);
      }
    });
    return item;
  }

  function createCard(kingdom) {
    const card = document.createElement("article");
    card.className = "kingdom-card";
    card.dataset.id = kingdom.id;
    card.innerHTML = `
      <div class="kingdom-media">
        <img src="${escapeHtml(kingdom.image)}" alt="${escapeHtml(kingdom.name)}" loading="lazy">
        <span class="period-badge">${escapeHtml(kingdom.period)}</span>
      </div>
      <div class="kingdom-body">
        <h3>${escapeHtml(kingdom.name)}</h3>
        <p class="kingdom-capital">${escapeHtml(kingdom.capital)}</p>
        <p class="kingdom-description">${escapeHtml(kingdom.description)}</p>
        <div class="kingdom-achievements">
          <span>Major Achievement</span>
          <p>${escapeHtml(kingdom.achievements.substring(0, 100))}...</p>
        </div>
      </div>
    `;
    const img = card.querySelector("img");
    img.addEventListener("error", () => img.src = fallbackImage, { once: true });
    card.addEventListener("click", () => openModal(kingdom, card));
    return card;
  }

  timeline.replaceChildren(...kingdoms.map(createTimelineItem));
  grid.replaceChildren(...kingdoms.map(createCard));
  document.getElementById("hero-total").textContent = kingdoms.length;

  function openModal(kingdom, trigger) {
    lastFocus = trigger;
    document.getElementById("modal-period").textContent = kingdom.period;
    document.getElementById("modal-title").textContent = kingdom.name;
    document.getElementById("modal-img").src = kingdom.image;
    document.getElementById("modal-img").alt = kingdom.name;
    document.getElementById("modal-img").onerror = () => {
      document.getElementById("modal-img").onerror = null;
      document.getElementById("modal-img").src = fallbackImage;
    };
    document.getElementById("modal-description").textContent = kingdom.description;
    document.getElementById("modal-capital").textContent = kingdom.capital;
    document.getElementById("modal-rulers").textContent = kingdom.rulers;
    document.getElementById("modal-achievements").textContent = kingdom.achievements;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target.matches("[data-close-modal]")) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
  });

  // Animate timeline items on scroll
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px"
  };

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".timeline-item").forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    timelineObserver.observe(item);
  });

  // Animate cards on scroll
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".kingdom-card").forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    cardObserver.observe(card);
  });
});
