document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("architecture-search");

  const filterButtons = [
    ...document.querySelectorAll(".architecture-filter"),
  ];

  const architectureCards = [
    ...document.querySelectorAll(".architecture-card"),
  ];

  const status = document.getElementById("architecture-status");
  const emptyState = document.getElementById("architecture-empty");

  const modal = document.getElementById("architecture-modal");
  const modalClose = document.getElementById("architecture-modal-close");

  const modalTitle = document.getElementById("modal-title");
  const modalLocation = document.getElementById("modal-location");
  const modalYear = document.getElementById("modal-year");
  const modalCategory = document.getElementById("modal-category");
  const modalHighlights = document.getElementById("modal-highlights");
  const modalDescription = document.getElementById("modal-description");

  const architectureButtons = [
    ...document.querySelectorAll(".architecture-button"),
  ];

  const menuToggle = document.getElementById("menu-toggle");

  let activeCategory = "all";
  let lastFocusedElement = null;

  function filterArchitecture() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    let visibleCount = 0;

    architectureCards.forEach((card) => {
      const searchText = (card.dataset.search || "").toLowerCase();

      const categories = (card.dataset.category || "").split(" ");

      const matchesSearch = searchText.includes(searchTerm);

      const matchesCategory =
        activeCategory === "all" ||
        categories.includes(activeCategory);

      const visible = matchesSearch && matchesCategory;

      card.hidden = !visible;

      if (visible) {
        visibleCount++;
      }
    });

    const filtersApplied =
      searchTerm.length > 0 ||
      activeCategory !== "all";

    status.textContent = filtersApplied
      ? `Found ${visibleCount} architectural wonder${
          visibleCount === 1 ? "" : "s"
        }`
      : `Showing all ${visibleCount} architectural wonders`;

    emptyState.classList.toggle(
      "visible",
      visibleCount === 0
    );
  }

  searchInput.addEventListener(
    "input",
    filterArchitecture
  );

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;

      filterButtons.forEach((btn) => {
        const active = btn === button;

        btn.classList.toggle("active", active);

        btn.setAttribute(
          "aria-pressed",
          active
        );
      });

      filterArchitecture();
    });
  });

  function openModal(button) {
    lastFocusedElement = button;

    modalTitle.textContent = button.dataset.name;

    modalLocation.textContent =
      button.dataset.location;

    modalYear.textContent =
      button.dataset.year;

    modalCategory.textContent =
      button.dataset.style;

    modalHighlights.textContent =
      button.dataset.highlights;

    modalDescription.textContent =
      button.dataset.description;

    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "modal-open"
    );

    modalClose.focus();
  }
    function closeModal() {
    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  architectureButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button);
    });
  });

  modalClose.addEventListener(
    "click",
    closeModal
  );

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        modal.classList.contains("open")
      ) {
        closeModal();
      }
    }
  );

  if (menuToggle) {
    menuToggle.addEventListener(
      "click",
      () => {
        const expanded =
          menuToggle.getAttribute(
            "aria-expanded"
          ) === "true";

        menuToggle.setAttribute(
          "aria-expanded",
          !expanded
        );
      }
    );
  }

  // Initialize page
  filterArchitecture();
});