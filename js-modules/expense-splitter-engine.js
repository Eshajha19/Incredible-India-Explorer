/**
 * expense-splitter-engine.js
 *
 * Smart Trip Cost Splitter and Group Expense Management (Issue #866).
 *
 * Pure, DOM-free logic (mirrors event-recommendation-engine.js /
 * seasonal-recommendation-engine.js): a group has participants and
 * expenses, each expense is split equally, by percentage, or by custom
 * amount, and the engine computes each participant's net balance plus a
 * minimal set of settling-up transactions.
 *
 * This project is client-side only (no backend - see README / other
 * js-modules for the same pattern), so "offline recording with automatic
 * synchronization" from the issue is implemented as: all data lives in
 * the browser (persisted to localStorage by the DOM-wiring layer in
 * frontend/trip-expense-splitter/script.js) and is available immediately
 * whether or not the network is up, rather than syncing to a server that
 * doesn't exist. See docs/TRIP_EXPENSE_SPLITTER.md for the full rationale.
 */

const EPSILON = 0.01; // currency rounding tolerance (paise-level)

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function isFiniteNumber(n) {
  return typeof n === "number" && Number.isFinite(n);
}

/**
 * Computes each participant's share of a single expense.
 *
 * @param {Object} expense
 * @param {number} expense.amount Total expense amount.
 * @param {"equal"|"percentage"|"custom"} expense.splitType
 * @param {string[]} expense.participantIds Participants this expense is split among.
 * @param {Object} [expense.splitDetails] Required for percentage/custom:
 *   - percentage: { [participantId]: percentageShare } (must sum to 100, within rounding tolerance)
 *   - custom: { [participantId]: amount } (must sum to expense.amount, within rounding tolerance)
 * @returns {Object} map of participantId -> amount owed for this expense
 */
export function computeShares(expense) {
  const { amount, splitType, participantIds, splitDetails = {} } = expense || {};

  if (!isFiniteNumber(amount) || amount <= 0) {
    throw new Error("Expense amount must be a positive number");
  }
  if (!Array.isArray(participantIds) || participantIds.length === 0) {
    throw new Error("Expense must include at least one participant to split among");
  }

  if (splitType === "equal") {
    const base = round2(amount / participantIds.length);
    const shares = {};
    let allocated = 0;
    participantIds.forEach((id, index) => {
      // Give the last participant any leftover paise from rounding, so
      // shares always sum exactly to the original amount.
      const isLast = index === participantIds.length - 1;
      const share = isLast ? round2(amount - allocated) : base;
      shares[id] = share;
      allocated = round2(allocated + share);
    });
    return shares;
  }

  if (splitType === "percentage") {
    const totalPercent = participantIds.reduce(
      (sum, id) => sum + (Number(splitDetails[id]) || 0),
      0,
    );
    if (Math.abs(totalPercent - 100) > 0.5) {
      throw new Error(`Percentage split must total 100% (got ${totalPercent}%)`);
    }
    const shares = {};
    let allocated = 0;
    participantIds.forEach((id, index) => {
      const isLast = index === participantIds.length - 1;
      const share = isLast
        ? round2(amount - allocated)
        : round2((Number(splitDetails[id]) || 0) / 100 * amount);
      shares[id] = share;
      allocated = round2(allocated + share);
    });
    return shares;
  }

  if (splitType === "custom") {
    const total = participantIds.reduce(
      (sum, id) => sum + (Number(splitDetails[id]) || 0),
      0,
    );
    if (Math.abs(total - amount) > EPSILON) {
      throw new Error(
        `Custom split amounts (${round2(total)}) must add up to the expense amount (${amount})`,
      );
    }
    const shares = {};
    participantIds.forEach((id) => {
      shares[id] = round2(Number(splitDetails[id]) || 0);
    });
    return shares;
  }

  throw new Error(`Unknown splitType: ${splitType}`);
}

/**
 * Computes each participant's net balance across every expense in a group.
 * Positive balance = is owed money overall; negative = owes money overall.
 *
 * @param {Object} group { participants: [{id, name}], expenses: [...] }
 * @returns {Object} map of participantId -> { paid, owed, net }
 */
export function computeBalances(group) {
  const participants = (group && group.participants) || [];
  const expenses = (group && group.expenses) || [];

  const balances = {};
  participants.forEach((p) => {
    balances[p.id] = { paid: 0, owed: 0, net: 0 };
  });

  expenses.forEach((expense) => {
    if (!balances[expense.paidBy]) {
      balances[expense.paidBy] = { paid: 0, owed: 0, net: 0 };
    }
    balances[expense.paidBy].paid = round2(balances[expense.paidBy].paid + expense.amount);

    const shares = computeShares(expense);
    Object.entries(shares).forEach(([participantId, share]) => {
      if (!balances[participantId]) {
        balances[participantId] = { paid: 0, owed: 0, net: 0 };
      }
      balances[participantId].owed = round2(balances[participantId].owed + share);
    });
  });

  Object.keys(balances).forEach((id) => {
    balances[id].net = round2(balances[id].paid - balances[id].owed);
  });

  return balances;
}

/**
 * Simplifies who-owes-whom into the minimum number of settling-up
 * transactions, using the standard greedy debt-simplification approach:
 * repeatedly match the largest creditor with the largest debtor.
 *
 * This is a well-known heuristic (not proven globally optimal in every
 * edge case, but standard for this problem and used by tools like
 * Splitwise) - documented in docs/TRIP_EXPENSE_SPLITTER.md.
 *
 * @param {Object} balances map of participantId -> { net } (or the full
 *   computeBalances() output; only `.net` is read)
 * @returns {Array} minimal list of { from, to, amount } transactions
 */
export function simplifySettlements(balances) {
  const creditors = [];
  const debtors = [];

  Object.entries(balances || {}).forEach(([id, entry]) => {
    const net = round2(typeof entry === "number" ? entry : entry.net);
    if (net > EPSILON) creditors.push({ id, amount: net });
    else if (net < -EPSILON) debtors.push({ id, amount: round2(-net) });
  });

  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  const transactions = [];
  let ci = 0;
  let di = 0;

  while (ci < creditors.length && di < debtors.length) {
    const creditor = creditors[ci];
    const debtor = debtors[di];
    const settled = round2(Math.min(creditor.amount, debtor.amount));

    if (settled > EPSILON) {
      transactions.push({ from: debtor.id, to: creditor.id, amount: settled });
    }

    creditor.amount = round2(creditor.amount - settled);
    debtor.amount = round2(debtor.amount - settled);

    if (creditor.amount <= EPSILON) ci += 1;
    if (debtor.amount <= EPSILON) di += 1;
  }

  return transactions;
}

/** Category-wise expense totals for a group. */
export function getCategoryBreakdown(group) {
  const totals = {};
  ((group && group.expenses) || []).forEach((expense) => {
    const category = expense.category || "uncategorized";
    totals[category] = round2((totals[category] || 0) + expense.amount);
  });
  return totals;
}

/**
 * Builds a full settlement + spending report for a group: total spend,
 * category breakdown, per-participant paid/owed/net, and the minimal
 * settlement transaction list.
 */
export function generateReport(group) {
  const balances = computeBalances(group);
  const settlements = simplifySettlements(balances);
  const categoryBreakdown = getCategoryBreakdown(group);
  const totalSpend = round2(
    ((group && group.expenses) || []).reduce((sum, e) => sum + e.amount, 0),
  );

  return {
    tripName: (group && group.tripName) || "Trip",
    totalSpend,
    categoryBreakdown,
    balances,
    settlements,
    expenseCount: ((group && group.expenses) || []).length,
    participantCount: ((group && group.participants) || []).length,
  };
}

/** Serializes a report to CSV text (pure - no Blob/DOM). */
export function reportToCSV(report) {
  const lines = [];
  lines.push(`Trip,${report.tripName}`);
  lines.push(`Total Spend,${report.totalSpend}`);
  lines.push("");
  lines.push("Category,Amount");
  Object.entries(report.categoryBreakdown).forEach(([category, amount]) => {
    lines.push(`${category},${amount}`);
  });
  lines.push("");
  lines.push("Participant,Paid,Owed,Net");
  Object.entries(report.balances).forEach(([id, entry]) => {
    lines.push(`${id},${entry.paid},${entry.owed},${entry.net}`);
  });
  lines.push("");
  lines.push("Settlement From,Settlement To,Amount");
  report.settlements.forEach((t) => {
    lines.push(`${t.from},${t.to},${t.amount}`);
  });
  return lines.join("\n");
}

export class ExpenseSplitterEngine {
  /** @param {Object} [group] { tripName, participants: [{id, name}], expenses: [] } */
  constructor(group = {}) {
    this.group = {
      tripName: group.tripName || "Trip",
      participants: group.participants ? [...group.participants] : [],
      expenses: group.expenses ? [...group.expenses] : [],
    };
  }

  addParticipant(participant) {
    if (!participant || !participant.id || !participant.name) {
      throw new Error("Participant requires an id and a name");
    }
    if (this.group.participants.some((p) => p.id === participant.id)) {
      throw new Error(`Participant ${participant.id} already exists in this group`);
    }
    this.group.participants.push({ id: participant.id, name: participant.name });
    return this.group.participants;
  }

  removeParticipant(participantId) {
    const stillOwesOrIsOwed = this.group.expenses.some(
      (e) => e.paidBy === participantId || (e.participantIds || []).includes(participantId),
    );
    if (stillOwesOrIsOwed) {
      throw new Error(
        "Cannot remove a participant who is party to existing expenses. Remove/reassign those expenses first.",
      );
    }
    this.group.participants = this.group.participants.filter((p) => p.id !== participantId);
  }

  /** Validates and adds an expense (throws the same errors computeShares() would, before storing it). */
  addExpense(expense) {
    computeShares(expense); // validates split math up front, fails fast
    const record = { id: expense.id || `exp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, ...expense };
    this.group.expenses.push(record);
    return record;
  }

  removeExpense(expenseId) {
    this.group.expenses = this.group.expenses.filter((e) => e.id !== expenseId);
  }

  getBalances() {
    return computeBalances(this.group);
  }

  getSettlements() {
    return simplifySettlements(this.getBalances());
  }

  getReport() {
    return generateReport(this.group);
  }

  toJSON() {
    return this.group;
  }
}
