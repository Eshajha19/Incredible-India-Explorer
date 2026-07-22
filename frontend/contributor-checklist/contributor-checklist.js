document.addEventListener("DOMContentLoaded", () => {
  const checklistCategories = [
  {
    "id": "structure",
    "title": "HTML / CSS / JS Structure",
    "icon": "🧱",
    "description": "Confirm that the page follows the project’s simple frontend structure.",
    "items": [
      "Created separate HTML, CSS, and JS files when the issue asks for them.",
      "Linked the new CSS file inside the page head.",
      "Loaded the new JS file before the closing body tag.",
      "Used semantic HTML sections, headings, buttons, and labels.",
      "Kept file names consistent with the issue requirements.",
      "Avoided unrelated file changes."
    ]
  },
  {
    "id": "responsive",
    "title": "Responsive Design",
    "icon": "📱",
    "description": "Verify that the feature works on desktop, tablet, and mobile.",
    "items": [
      "Checked layout on desktop width.",
      "Checked layout on tablet width.",
      "Checked layout on mobile width.",
      "Cards, controls, modals, and buttons do not overflow.",
      "Text remains readable on small screens.",
      "Touch targets are easy to tap."
    ]
  },
  {
    "id": "theme",
    "title": "Dark / Light Theme",
    "icon": "🌓",
    "description": "Make sure the feature respects the existing theme system.",
    "items": [
      "Verified dark theme readability.",
      "Verified light theme readability.",
      "Used existing CSS variables where possible.",
      "Avoided hardcoded colors that break light mode.",
      "Borders, cards, buttons, and modals remain visible in both themes."
    ]
  },
  {
    "id": "interaction",
    "title": "Search, Filters, and Interactions",
    "icon": "🔎",
    "description": "Check all interactive behavior before submitting the PR.",
    "items": [
      "Search works for expected keywords.",
      "Filters work independently.",
      "Combined search and filters work together.",
      "Clear/reset filters button works.",
      "Empty state appears when no results match.",
      "Interactive buttons do not trigger unexpected page jumps."
    ]
  },
  {
    "id": "modal",
    "title": "Modal and Accessibility",
    "icon": "♿",
    "description": "Review modals, dialogs, focus states, and labels.",
    "items": [
      "Modal opens correctly.",
      "Modal closes using close button.",
      "Modal closes using Escape key when supported.",
      "Backdrop close works when supported.",
      "Buttons and inputs have accessible labels.",
      "Keyboard focus states are visible."
    ]
  },
  {
    "id": "assets",
    "title": "Images and Fallbacks",
    "icon": "🖼️",
    "description": "Avoid broken images and poor visual fallback behavior.",
    "items": [
      "All image paths use existing local assets.",
      "Images have useful alt text.",
      "Image loading does not break the card layout.",
      "Fallback image behavior is handled in JS when needed.",
      "No external image dependency was added without reason."
    ]
  },
  {
    "id": "quality",
    "title": "Console and Final Quality",
    "icon": "✅",
    "description": "Final self-review checks before commit and PR.",
    "items": [
      "Browser console has no JavaScript errors.",
      "JavaScript syntax check passes.",
      "No duplicate HTML IDs were introduced.",
      "No spelling mistakes in visible headings/buttons.",
      "PR description includes testing details.",
      "git diff only contains relevant changes."
    ]
  }
];
  const storageKey = "incredible-india-contributor-checklist-v1";

  const grid = document.getElementById("checklist-grid");
  const categoryFilter = document.getElementById("category-filter");
  const resetButton = document.getElementById("reset-checklist");
  const expandAllButton = document.getElementById("expand-all");
  const checkVisibleButton = document.getElementById("check-visible");

  const progressLabel = document.getElementById("progress-label");
  const progressPercent = document.getElementById("progress-percent");
  const progressFill = document.getElementById("progress-fill");
  const toolbarPercent = document.getElementById("toolbar-percent");
  const toolbarCount = document.getElementById("toolbar-count");

  let checklistState = readState();

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function readState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(checklistState));
  }

  function itemKey(categoryId, index) {
    return `${categoryId}-${index}`;
  }

  function isChecked(categoryId, index) {
    return Boolean(checklistState[itemKey(categoryId, index)]);
  }

  function getTotals(scope = checklistCategories) {
    const total = scope.reduce((sum, category) => sum + category.items.length, 0);
    const done = scope.reduce((sum, category) => {
      return sum + category.items.filter((_, index) => isChecked(category.id, index)).length;
    }, 0);

    return {
      total,
      done,
      percent: total === 0 ? 0 : Math.round((done / total) * 100)
    };
  }

  function renderCategoryOptions() {
    checklistCategories.forEach(category => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.title;
      categoryFilter.append(option);
    });
  }

  function renderChecklist() {
    grid.innerHTML = checklistCategories.map(category => {
      const done = category.items.filter((_, index) => isChecked(category.id, index)).length;
      const complete = done === category.items.length;
      const items = category.items.map((item, index) => {
        const key = itemKey(category.id, index);
        return `
          <label class="checklist-item">
            <input type="checkbox" data-check-key="${escapeHtml(key)}" data-category="${escapeHtml(category.id)}" ${isChecked(category.id, index) ? "checked" : ""}>
            <span>${escapeHtml(item)}</span>
          </label>`;
      }).join("");

      return `
        <article class="checklist-card is-open ${complete ? "is-complete" : ""}" data-category="${escapeHtml(category.id)}">
          <button type="button" class="checklist-card__toggle" aria-expanded="true">
            <span class="checklist-icon" aria-hidden="true">${escapeHtml(category.icon)}</span>
            <span class="checklist-title">
              <h3>${escapeHtml(category.title)}</h3>
              <p>${escapeHtml(category.description)}</p>
            </span>
            <span class="checklist-count">${done} / ${category.items.length}</span>
            <span class="checklist-chevron" aria-hidden="true">⌄</span>
          </button>
          <div class="checklist-items">${items}</div>
        </article>`;
    }).join("");

    bindChecklistEvents();
    applyFilter();
    updateProgress();
  }

  function bindChecklistEvents() {
    document.querySelectorAll(".checklist-card__toggle").forEach(button => {
      button.addEventListener("click", () => {
        const card = button.closest(".checklist-card");
        const isOpen = card.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(isOpen));
      });
    });

    document.querySelectorAll("[data-check-key]").forEach(input => {
      input.addEventListener("change", () => {
        checklistState[input.dataset.checkKey] = input.checked;
        saveState();
        updateCard(input.closest(".checklist-card"));
        updateProgress();
      });
    });
  }

  function updateCard(card) {
    const categoryId = card.dataset.category;
    const category = checklistCategories.find(item => item.id === categoryId);
    const done = category.items.filter((_, index) => isChecked(categoryId, index)).length;
    card.querySelector(".checklist-count").textContent = `${done} / ${category.items.length}`;
    card.classList.toggle("is-complete", done === category.items.length);
  }

  function updateProgress() {
    const totals = getTotals();
    progressLabel.textContent = `${totals.done} of ${totals.total} complete`;
    progressPercent.textContent = `${totals.percent}%`;
    progressFill.style.width = `${totals.percent}%`;
    toolbarPercent.textContent = `${totals.percent}%`;
    toolbarCount.textContent = `${totals.done} / ${totals.total}`;
  }

  function applyFilter() {
    const selected = categoryFilter.value;
    document.querySelectorAll(".checklist-card").forEach(card => {
      card.hidden = selected !== "all" && card.dataset.category !== selected;
    });
  }

  function expandOrCollapseAll() {
    const cards = Array.from(document.querySelectorAll(".checklist-card:not([hidden])"));
    const shouldOpen = cards.some(card => !card.classList.contains("is-open"));

    cards.forEach(card => {
      card.classList.toggle("is-open", shouldOpen);
      const button = card.querySelector(".checklist-card__toggle");
      button.setAttribute("aria-expanded", String(shouldOpen));
    });

    expandAllButton.textContent = shouldOpen ? "Collapse all" : "Expand all";
  }

  function checkAllVisible() {
    document.querySelectorAll(".checklist-card:not([hidden]) [data-check-key]").forEach(input => {
      input.checked = true;
      checklistState[input.dataset.checkKey] = true;
      updateCard(input.closest(".checklist-card"));
    });

    saveState();
    updateProgress();
  }

  function resetChecklist() {
    const confirmed = window.confirm("Reset all checklist progress in this browser?");
    if (!confirmed) return;

    checklistState = {};
    saveState();
    renderChecklist();
  }

  renderCategoryOptions();
  renderChecklist();

  categoryFilter.addEventListener("change", applyFilter);
  expandAllButton.addEventListener("click", expandOrCollapseAll);
  checkVisibleButton.addEventListener("click", checkAllVisible);
  resetButton.addEventListener("click", resetChecklist);
});
