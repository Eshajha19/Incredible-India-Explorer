document.addEventListener("app:route-changed", () => {
  const searchInput = document.getElementById("stepwell-search");
  const filters = [...document.querySelectorAll(".stepwell-filter")];
  const cards = [...document.querySelectorAll(".stepwell-card")];
  const status = document.getElementById("stepwell-status");
  const emptyState = document.getElementById("stepwell-empty");

  const modal = document.getElementById("stepwell-modal");
  const modalClose = document.getElementById("modal-close");
  const detailButtons = [...document.querySelectorAll(".details-button")];

  const galleryModal = document.getElementById("gallery-modal");
  const galleryImage = document.getElementById("gallery-modal-image");
  const galleryCaption = document.getElementById(
    "gallery-modal-caption"
  );
  const galleryClose = document.getElementById("gallery-close");
  const galleryItems = [
    ...document.querySelectorAll(".gallery-item"),
  ];

  let activeRegion = "all";
  let lastFocused = null;

  function filterStepwells() {
    const term = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const searchText = (
        card.dataset.search || ""
      ).toLowerCase();

      const matchesSearch = searchText.includes(term);

      const matchesRegion =
        activeRegion === "all" ||
        card.dataset.region === activeRegion;

      const visible = matchesSearch && matchesRegion;

      card.hidden = !visible;

      if (visible) {
        visibleCount += 1;
      }
    });

    const filtered =
      term.length > 0 || activeRegion !== "all";

    status.textContent = filtered
      ? `Found ${visibleCount} stepwell${
          visibleCount === 1 ? "" : "s"
        }`
      : `Showing all ${visibleCount} stepwells`;

    emptyState.classList.toggle(
      "visible",
      visibleCount === 0
    );
  }

  searchInput.addEventListener(
    "input",
    filterStepwells
  );

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeRegion = button.dataset.region;

      filters.forEach((item) => {
        const active = item === button;

        item.classList.toggle(
          "active",
          active
        );

        item.setAttribute(
          "aria-pressed",
          String(active)
        );
      });

      filterStepwells();
    });
  });

  function openDetails(button) {
    lastFocused = button;

    document.getElementById(
      "modal-title"
    ).textContent = button.dataset.name;

    document.getElementById(
      "modal-location"
    ).textContent = button.dataset.location;

    document.getElementById(
      "modal-period"
    ).textContent = button.dataset.period;

    document.getElementById(
      "modal-dynasty"
    ).textContent = button.dataset.dynasty;

    document.getElementById(
      "modal-style"
    ).textContent = button.dataset.style;

    document.getElementById(
      "modal-significance"
    ).textContent = button.dataset.significance;

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

  function closeDetails() {
    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );

    if (lastFocused) {
      lastFocused.focus();
    }
  }

  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openDetails(button);
    });
  });

  modalClose.addEventListener(
    "click",
    closeDetails
  );

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeDetails();
    }
  });

  function openGallery(item) {
    const image = item.querySelector("img");

    galleryImage.src = image.src;
    galleryImage.alt = image.alt;

    galleryCaption.textContent =
      item.dataset.caption;

    galleryModal.classList.add("open");

    galleryModal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "modal-open"
    );

    galleryClose.focus();
  }

  function closeGallery() {
    galleryModal.classList.remove("open");

    galleryModal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      openGallery(item);
    });

    item.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          openGallery(item);
        }
      }
    );
  });

  galleryClose.addEventListener(
    "click",
    closeGallery
  );

  galleryModal.addEventListener(
    "click",
    (event) => {
      if (event.target === galleryModal) {
        closeGallery();
      }
    }
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        if (
          modal.classList.contains("open")
        ) {
          closeDetails();
        }

        if (
          galleryModal.classList.contains(
            "open"
          )
        ) {
          closeGallery();
        }
      }
    }
  );

  const menuToggle =
    document.getElementById("menu-toggle");

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
          String(!expanded)
        );
      }
    );
  }

  filterStepwells();
});