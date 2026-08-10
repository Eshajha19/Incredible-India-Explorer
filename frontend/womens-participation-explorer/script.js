document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".wom-gallery-item")];
  const leaderCards = [...document.querySelectorAll(".wom-leader-card")];

  const modal = document.getElementById("wom-modal");
  const modalClose = document.getElementById("wom-modal-close");
  const modalTitle = document.getElementById("wom-modal-title");
  const modalRole = document.getElementById("wom-modal-role");
  const modalDescription = document.getElementById("wom-modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Women & Freedom Struggle Explorer";
      const thumbnail = "frontend/assets/womens_participation_hero.svg";
      const category = "history";

      const updateBookmarkUI = () => {
        const isSaved = window.Journey.isSaved(id);
        btn.classList.toggle("is-saved", isSaved);
        btn.setAttribute("aria-pressed", String(isSaved));
        btn.innerHTML = isSaved ? "♥ Saved to Journey" : "♡ Save to Journey";
      };

      updateBookmarkUI();

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.Journey.toggle({
          id,
          explorerPage: "frontend/womens-participation-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    window.Journey.registerSearchItems("frontend/womens-participation-explorer/index.html", [
      {
        id: "wom-main",
        title: "Women & Freedom Struggle Explorer",
        description: "Explore how Indian women participated across every phase of the freedom struggle — 1857, Swadeshi, Non-Cooperation, Civil Disobedience, Quit India, and the INA.",
        link: "frontend/womens-participation-explorer/index.html"
      },
      {
        id: "wom-leaders",
        title: "Major Women Leaders",
        description: "Rani Lakshmibai, Begum Hazrat Mahal, Sarojini Naidu, Aruna Asaf Ali, Captain Lakshmi Sahgal, Kamaladevi Chattopadhyay, and more.",
        link: "frontend/womens-participation-explorer/index.html#leaders"
      },
      {
        id: "wom-map",
        title: "Women-led Activity Map",
        description: "Interactive institution-based map showing women's resistance across Jhansi, Calcutta, Delhi, Bombay, Lucknow, Nagpur, Madras, and Rangoon.",
        link: "frontend/womens-participation-explorer/index.html#map"
      },
      {
        id: "wom-timeline",
        title: "Timeline of Women's Resistance",
        description: "From the 1857 Revolt to the 1945 INA Regiment — a chronology of women-led resistance.",
        link: "frontend/womens-participation-explorer/index.html#timeline"
      }
    ]);
  }

  // --- Map Filter Logic ---------------------------------------------
  const filterButtons = [...document.querySelectorAll(".wom-filter-btn")];
  const movementLabels = {
    all: "Showing all women-led resistance locations across India. Click a node for details.",
    revolt: "Revolt of 1857: Jhansi (Rani Lakshmibai) and Kanpur (Begum Hazrat Mahal).",
    swadeshi: "Swadeshi Movement (1905): Calcutta, Barisal, and Madras — women led boycotts and flag hoisting.",
    noncoop: "Non-Cooperation (1920–22): Delhi, Lucknow, and Calcutta — women picketed and organised unions.",
    civdis: "Civil Disobedience (1930): Delhi and Calcutta — women led Salt March extensions and picketing.",
    quitindia: "Quit India (1942): Delhi, Bombay, and Nagpur — women hoisted flags, ran radio, and faced mass arrests.",
    ina: "INA & Rani of Jhansi Regiment: Bombay and Rangoon — the all-women regiment that marched into Burma."
  };

  function applyFilter(filterValue) {
    const lines = [...document.querySelectorAll(".wom-map-line")];
    const nodes = [...document.querySelectorAll(".wom-map-node")];

    filterButtons.forEach((btn) => {
      const isActive = btn.dataset.filter === filterValue;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    if (filterValue === "all") {
      lines.forEach((line) => line.classList.remove("wom-line-active", "wom-line-dim"));
      nodes.forEach((node) => node.classList.remove("wom-node-dim"));
    } else {
      lines.forEach((line) => {
        const matches = (line.dataset.movement || "").split(" ").includes(filterValue);
        line.classList.toggle("wom-line-active", matches);
        line.classList.toggle("wom-line-dim", !matches);
      });
      nodes.forEach((node) => {
        const matches = (node.dataset.movement || "").split(" ").includes(filterValue);
        node.classList.toggle("wom-node-dim", !matches);
      });
    }

    const caption = document.getElementById("wom-map-caption");
    if (caption) {
      caption.textContent = movementLabels[filterValue] || movementLabels.all;
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
  });

  // --- Gallery & Leader Modal Logic ------------------------------------------
  let lastFocusedElement = null;
  let womModalFocusTrap = null;

  function openModal(item, type, role) {
    lastFocusedElement = item;

    modalTitle.textContent = type === "gallery"
      ? item.dataset.title
      : item.querySelector("h3").textContent;
    modalRole.textContent = role || "Gallery Highlight";
    modalDescription.textContent = type === "gallery"
      ? item.dataset.desc
      : item.querySelector("p").textContent;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (typeof window.setupFocusTrap === "function") {
      womModalFocusTrap = window.setupFocusTrap(modal);
    }

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (womModalFocusTrap) {
      womModalFocusTrap.deactivate();
      womModalFocusTrap = null;
    }

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  galleryItems.forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-haspopup", "dialog");
    item.setAttribute("aria-controls", "wom-modal");
    item.addEventListener("click", () => openModal(item, "gallery"));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(item, "gallery");
      }
    });
  });

  leaderCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-controls", "wom-modal");
    card.addEventListener("click", () => {
      const role = card.querySelector(".wom-leader-role")?.textContent || "Leader";
      openModal(card, "leader", role);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // --- Scroll to Top Button -------------------------------------------
  const scrollTopBtn = document.getElementById("btn-scroll-top");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Run initialization
  applyFilter("all");
  initJourney();
});
