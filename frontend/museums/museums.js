document.addEventListener("app:route-changed", () => {
  const searchInput = document.getElementById("museum-search");
  const filterButtons = [...document.querySelectorAll(".museum-filter")];
  const cards = [...document.querySelectorAll(".museum-card")];
  const status = document.getElementById("museum-status");
  const emptyState = document.getElementById("museum-empty");

  const modal = document.getElementById("museum-modal");
  const modalClose = document.getElementById("museum-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalLocation = document.getElementById("modal-location");
  const modalYear = document.getElementById("modal-year");
  const modalCategory = document.getElementById("modal-category");
  const modalHighlights = document.getElementById("modal-highlights");
  const modalDescription = document.getElementById("modal-description");

  const detailButtons = [...document.querySelectorAll(".details-button")];
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const menuToggle = document.getElementById("menu-toggle");

  // --- My Journey: bookmarks + cross-explorer search index -------------
  function initJourneyIntegration() {
    if (!window.Journey) return;

    bookmarkButtons.forEach((btn) => {
      const card = btn.closest(".museum-card");
      const id = btn.dataset.bookmarkId;
      const title = card?.querySelector("h3")?.textContent.trim() || "Museum";
      const thumbnail = card?.querySelector("img")?.getAttribute("src") || "";
      const category = (card?.dataset.category || "museum").split(" ")[0];

      const setPressed = () => {
        const saved = window.Journey.isSaved(id);
        btn.classList.toggle("is-saved", saved);
        btn.setAttribute("aria-pressed", String(saved));
        btn.textContent = saved ? "♥" : "♡";
      };

      setPressed();

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.Journey.toggle({
          id,
          explorerPage: "museums.html",
          title,
          thumbnail,
          category
        });
        setPressed();
      });
    });

    window.Journey.registerSearchItems(
      "museums.html",
      cards.map((card) => ({
        id: card.dataset.id,
        title: card.querySelector("h3")?.textContent.trim() || "Museum",
        description: card.querySelector(".museum-description")?.textContent.trim() || "",
        link: "museums.html"
      }))
    );
  }

  initJourneyIntegration();

  let activeCategory = "all";
  let lastFocusedElement = null;

  function filterMuseums() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const searchText = (card.dataset.search || "").toLowerCase();
      const categories = (card.dataset.category || "").split(" ");

      const matchesSearch = searchText.includes(searchTerm);
      const matchesCategory =
        activeCategory === "all" || categories.includes(activeCategory);

      const visible = matchesSearch && matchesCategory;

      card.hidden = !visible;

      if (visible) {
        visibleCount++;
      }
    });

    const filtersApplied =
      searchTerm.length > 0 || activeCategory !== "all";

    status.textContent = filtersApplied
      ? `Found ${visibleCount} museum${visibleCount === 1 ? "" : "s"}`
      : `Showing all ${visibleCount} museums`;

    emptyState.classList.toggle("visible", visibleCount === 0);
  }

  searchInput.addEventListener("input", filterMuseums);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;

      filterButtons.forEach((btn) => {
        const active = btn === button;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-pressed", active);
      });

      filterMuseums();
    });
  });

  function openModal(button) {
    lastFocusedElement = button;

    modalTitle.textContent = button.dataset.name;
    modalLocation.textContent = button.dataset.location;
    modalYear.textContent = button.dataset.year;
    modalCategory.textContent = button.dataset.categoryLabel;
    modalHighlights.textContent = button.dataset.highlights;
    modalDescription.textContent = button.dataset.description;

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

  detailButtons.forEach((button) => {
    button.addEventListener("click", () => openModal(button));
  });

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

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const expanded =
        menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !expanded);
    });
  }

  // Initialize page
  filterMuseums();
});