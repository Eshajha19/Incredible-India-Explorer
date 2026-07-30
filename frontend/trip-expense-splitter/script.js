import {
  ExpenseSplitterEngine,
  reportToCSV,
} from "../../js-modules/expense-splitter-engine.js";

const STORAGE_KEY = "tripExpenseSplitter.group.v1";

let engine = new ExpenseSplitterEngine(loadGroup());
let activeSplitType = "equal";

function loadGroup() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

function saveGroup() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(engine.toJSON()));
  } catch (err) {
    // Storage may be unavailable (private browsing, quota); the session
    // still works, it just won't persist across reloads.
  }
}

function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function participantName(id) {
  const p = engine.group.participants.find((p) => p.id === id);
  return p ? p.name : id;
}

function showError(elementId, message) {
  const el = document.getElementById(elementId);
  if (!message) {
    el.hidden = true;
    el.textContent = "";
    return;
  }
  el.hidden = false;
  el.textContent = message;
}

// --- Rendering ---

function renderTripName() {
  document.getElementById("trip-name").value = engine.group.tripName || "";
}

function renderParticipants() {
  const chips = document.getElementById("participant-chips");
  chips.innerHTML = "";
  engine.group.participants.forEach((p) => {
    const chip = document.createElement("span");
    chip.className = "participant-chip";
    chip.textContent = p.name;
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "×";
    removeBtn.setAttribute("aria-label", `Remove ${p.name}`);
    removeBtn.addEventListener("click", () => {
      try {
        engine.removeParticipant(p.id);
        showError("participant-error", null);
        saveGroup();
        renderAll();
      } catch (err) {
        showError("participant-error", err.message);
      }
    });
    chip.appendChild(removeBtn);
    chips.appendChild(chip);
  });

  renderPaidBySelect();
  renderSplitCheckboxes();
}

function renderPaidBySelect() {
  const select = document.getElementById("expense-paid-by");
  const previous = select.value;
  select.innerHTML = "";
  engine.group.participants.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = p.name;
    select.appendChild(option);
  });
  if (previous) select.value = previous;
}

function renderSplitCheckboxes() {
  const wrap = document.getElementById("split-participants");
  wrap.innerHTML = "";
  engine.group.participants.forEach((p) => {
    const label = document.createElement("label");
    label.className = "checkbox-pill";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = p.id;
    checkbox.checked = true;
    checkbox.addEventListener("change", renderSplitDetails);
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(p.name));
    wrap.appendChild(label);
  });
  renderSplitDetails();
}

function getSelectedSplitParticipantIds() {
  return Array.from(document.querySelectorAll("#split-participants input:checked")).map((el) => el.value);
}

function renderSplitDetails() {
  const container = document.getElementById("split-details");
  const participantIds = getSelectedSplitParticipantIds();

  if (activeSplitType === "equal" || participantIds.length === 0) {
    container.hidden = true;
    container.innerHTML = "";
    return;
  }

  container.hidden = false;
  container.innerHTML = "";
  const unitLabel = activeSplitType === "percentage" ? "%" : "₹";

  participantIds.forEach((id) => {
    const row = document.createElement("div");
    row.className = "split-detail-row";
    const label = document.createElement("span");
    label.textContent = participantName(id);
    const input = document.createElement("input");
    input.type = "number";
    input.step = "0.01";
    input.min = "0";
    input.dataset.participantId = id;
    input.placeholder = unitLabel;
    row.appendChild(label);
    row.appendChild(input);
    container.appendChild(row);
  });
}

function renderExpenses() {
  const list = document.getElementById("expense-list");
  const emptyState = document.getElementById("expense-empty-state");
  list.innerHTML = "";

  emptyState.hidden = engine.group.expenses.length > 0;

  engine.group.expenses.forEach((expense) => {
    const item = document.createElement("div");
    item.className = "expense-item";

    const main = document.createElement("div");
    main.className = "expense-item-main";
    const title = document.createElement("span");
    title.className = "expense-item-title";
    title.textContent = expense.description;
    const meta = document.createElement("span");
    meta.className = "expense-item-meta";
    meta.textContent = `Paid by ${participantName(expense.paidBy)} · ${expense.category} · ${expense.splitType} split among ${expense.participantIds.length}`;
    main.appendChild(title);
    main.appendChild(meta);

    const amount = document.createElement("span");
    amount.className = "expense-item-amount";
    amount.textContent = formatCurrency(expense.amount);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      engine.removeExpense(expense.id);
      saveGroup();
      renderAll();
    });

    item.appendChild(main);
    item.appendChild(amount);
    item.appendChild(removeBtn);
    list.appendChild(item);
  });
}

function renderBalances() {
  const list = document.getElementById("balance-list");
  list.innerHTML = "";
  const balances = engine.getBalances();

  if (Object.keys(balances).length === 0) {
    list.innerHTML = '<p class="empty-state">Add participants to see balances.</p>';
    return;
  }

  Object.entries(balances).forEach(([id, entry]) => {
    const row = document.createElement("div");
    row.className = "balance-row";
    const name = document.createElement("span");
    name.textContent = participantName(id);
    const amount = document.createElement("span");
    const level = entry.net > 0.01 ? "positive" : entry.net < -0.01 ? "negative" : "neutral";
    amount.className = `balance-amount ${level}`;
    amount.textContent =
      entry.net > 0.01
        ? `is owed ${formatCurrency(entry.net)}`
        : entry.net < -0.01
        ? `owes ${formatCurrency(Math.abs(entry.net))}`
        : "settled up";
    row.appendChild(name);
    row.appendChild(amount);
    list.appendChild(row);
  });
}

function renderSettlements() {
  const list = document.getElementById("settlement-list");
  const emptyState = document.getElementById("settlement-empty-state");
  const count = document.getElementById("settlement-count");
  list.innerHTML = "";

  const settlements = engine.getSettlements();
  emptyState.hidden = settlements.length > 0;
  count.textContent = settlements.length
    ? `${settlements.length} payment${settlements.length === 1 ? "" : "s"}`
    : "";

  settlements.forEach((t) => {
    const row = document.createElement("div");
    row.className = "settlement-row";
    row.innerHTML = `<span>${participantName(t.from)} → ${participantName(t.to)}</span><span>${formatCurrency(t.amount)}</span>`;
    list.appendChild(row);
  });
}

function renderCategories() {
  const list = document.getElementById("category-list");
  list.innerHTML = "";
  const report = engine.getReport();

  const entries = Object.entries(report.categoryBreakdown);
  if (!entries.length) {
    list.innerHTML = '<p class="empty-state">No spending yet.</p>';
    return;
  }

  entries
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, amount]) => {
      const row = document.createElement("div");
      row.className = "category-row";
      row.innerHTML = `<span>${category}</span><span>${formatCurrency(amount)}</span>`;
      list.appendChild(row);
    });
}

function renderAll() {
  renderTripName();
  renderParticipants();
  renderExpenses();
  renderBalances();
  renderSettlements();
  renderCategories();
}

// --- Event handlers ---

function handleTripNameChange() {
  engine.group.tripName = document.getElementById("trip-name").value.trim() || "Trip";
  saveGroup();
}

function handleAddParticipant(event) {
  event.preventDefault();
  const input = document.getElementById("participant-name");
  const name = input.value.trim();
  if (!name) return;

  try {
    engine.addParticipant({ id: `p-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, name });
    showError("participant-error", null);
    input.value = "";
    saveGroup();
    renderAll();
  } catch (err) {
    showError("participant-error", err.message);
  }
}

function handleSplitTypeChange(event) {
  const button = event.target.closest(".split-type-btn");
  if (!button) return;
  activeSplitType = button.dataset.splitType;
  document.querySelectorAll(".split-type-btn").forEach((btn) => btn.classList.toggle("active", btn === button));
  renderSplitDetails();
}

function buildSplitDetails() {
  const details = {};
  document.querySelectorAll("#split-details input").forEach((input) => {
    details[input.dataset.participantId] = parseFloat(input.value) || 0;
  });
  return details;
}

function handleAddExpense(event) {
  event.preventDefault();

  const description = document.getElementById("expense-description").value.trim();
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const category = document.getElementById("expense-category").value;
  const paidBy = document.getElementById("expense-paid-by").value;
  const participantIds = getSelectedSplitParticipantIds();

  if (!paidBy) {
    showError("expense-error", "Add at least one participant first.");
    return;
  }
  if (participantIds.length === 0) {
    showError("expense-error", "Select at least one participant to split this expense among.");
    return;
  }

  const expense = {
    description,
    amount,
    category,
    paidBy,
    participantIds,
    splitType: activeSplitType,
    splitDetails: activeSplitType === "equal" ? {} : buildSplitDetails(),
    date: new Date().toISOString(),
  };

  try {
    engine.addExpense(expense);
    showError("expense-error", null);
    event.target.reset();
    activeSplitType = "equal";
    document.querySelectorAll(".split-type-btn").forEach((btn, i) => btn.classList.toggle("active", i === 0));
    saveGroup();
    renderAll();
  } catch (err) {
    showError("expense-error", err.message);
  }
}

function handleExportCSV() {
  const report = engine.getReport();
  const csv = reportToCSV(report);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${(report.tripName || "trip").replace(/\s+/g, "-").toLowerCase()}-expense-report.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function handleExportPDF() {
  // No PDF library dependency, consistent with how this project already
  // handles PDF export elsewhere (js-modules/trip-planner.js,
  // frontend/compare-states-data/compare.js): a print stylesheet hides
  // everything but the report, and the browser's own "Save as PDF"
  // print destination produces the file.
  window.print();
}

function handleResetGroup() {
  if (!window.confirm("Start a new trip? This clears all participants and expenses saved in this browser.")) {
    return;
  }
  engine = new ExpenseSplitterEngine({ tripName: "Trip" });
  saveGroup();
  renderAll();
}

function init() {
  document.getElementById("trip-name").addEventListener("change", handleTripNameChange);
  document.getElementById("add-participant-form").addEventListener("submit", handleAddParticipant);
  document.getElementById("split-type-toggle").addEventListener("click", handleSplitTypeChange);
  document.getElementById("add-expense-form").addEventListener("submit", handleAddExpense);
  document.getElementById("export-csv").addEventListener("click", handleExportCSV);
  document.getElementById("export-pdf").addEventListener("click", handleExportPDF);
  document.getElementById("reset-group").addEventListener("click", handleResetGroup);

  renderAll();
}

document.addEventListener("DOMContentLoaded", init);
