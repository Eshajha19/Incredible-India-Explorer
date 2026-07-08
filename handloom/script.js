document.addEventListener("app:route-changed", () => {
  const searchInput = document.getElementById("handloom-search");
  const filterButtons = [...document.querySelectorAll(".handloom-filter")];
  const cards = [...document.querySelectorAll(".handloom-card")];
  const status = document.getElementById("handloom-status");
  const emptyState = document.getElementById("handloom-empty");

  const modal = document.getElementById("handloom-modal");
  const modalClose = document.getElementById("handloom-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalLocation = document.getElementById("modal-location");
  const modalTechnique = document.getElementById("modal-technique");
  const modalRegion = document.getElementById("modal-region");
  const modalSignificance = document.getElementById("modal-significance");
  const modalDescription = document.getElementById("modal-description");

  const detailButtons = [...document.querySelectorAll(".details-button")];
  const menuToggle = document.getElementById("menu-toggle");

  let activeRegion = "all";
  let lastFocusedElement = null;

  function filterHandlooms() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const searchText = (card.dataset.search || "").toLowerCase();
      const region = card.dataset.region;

      const matchesSearch = searchText.includes(searchTerm);
      const matchesRegion = activeRegion === "all" || region === activeRegion;

      const visible = matchesSearch && matchesRegion;

      card.hidden = !visible;

      if (visible) {
        visibleCount++;
      }
    });

    const filtersApplied = searchTerm.length > 0 || activeRegion !== "all";

    status.textContent = filtersApplied
      ? `Found ${visibleCount} handloom tradition${visibleCount === 1 ? "" : "s"}`
      : `Showing all ${visibleCount} handloom traditions`;

    emptyState.classList.toggle("visible", visibleCount === 0);
  }

  searchInput.addEventListener("input", filterHandlooms);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeRegion = button.dataset.region;

      filterButtons.forEach((btn) => {
        const active = btn === button;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-pressed", active);
      });

      filterHandlooms();
    });
  });

  function openModal(button) {
    lastFocusedElement = button;

    modalTitle.textContent = button.dataset.name;
    modalLocation.textContent = button.dataset.location;
    modalTechnique.textContent = button.dataset.technique;
    modalRegion.textContent = button.dataset.regionLabel;
    modalSignificance.textContent = button.dataset.significance;
    modalDescription.textContent = button.dataset.details;

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
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !expanded);
    });
  }

  // Scroll to top button functionality
  const scrollButton = document.getElementById("btn-scroll-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollButton.classList.add("visible");
    } else {
      scrollButton.classList.remove("visible");
    }
  });

  scrollButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Initialize page
  filterHandlooms();
});
