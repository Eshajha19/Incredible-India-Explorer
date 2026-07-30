import { describe, it, expect } from "vitest";
import {
  computeShares,
  computeBalances,
  simplifySettlements,
  getCategoryBreakdown,
  generateReport,
  reportToCSV,
  ExpenseSplitterEngine,
} from "../../js-modules/expense-splitter-engine.js";

const participants = [
  { id: "priya", name: "Priya" },
  { id: "rahul", name: "Rahul" },
  { id: "sara", name: "Sara" },
];

describe("computeShares", () => {
  it("splits equally, giving the rounding remainder to the last participant", () => {
    const shares = computeShares({
      amount: 100,
      splitType: "equal",
      participantIds: ["priya", "rahul", "sara"],
    });
    expect(shares.priya).toBe(33.33);
    expect(shares.rahul).toBe(33.33);
    expect(shares.sara).toBe(33.34); // absorbs the leftover paisa
    expect(shares.priya + shares.rahul + shares.sara).toBeCloseTo(100, 2);
  });

  it("splits by percentage", () => {
    const shares = computeShares({
      amount: 1000,
      splitType: "percentage",
      participantIds: ["priya", "rahul"],
      splitDetails: { priya: 70, rahul: 30 },
    });
    expect(shares.priya).toBe(700);
    expect(shares.rahul).toBe(300);
  });

  it("rejects a percentage split that doesn't total 100", () => {
    expect(() =>
      computeShares({
        amount: 1000,
        splitType: "percentage",
        participantIds: ["priya", "rahul"],
        splitDetails: { priya: 70, rahul: 20 },
      }),
    ).toThrow(/100/);
  });

  it("splits by custom amounts", () => {
    const shares = computeShares({
      amount: 500,
      splitType: "custom",
      participantIds: ["priya", "rahul"],
      splitDetails: { priya: 350, rahul: 150 },
    });
    expect(shares.priya).toBe(350);
    expect(shares.rahul).toBe(150);
  });

  it("rejects custom amounts that don't add up to the expense total", () => {
    expect(() =>
      computeShares({
        amount: 500,
        splitType: "custom",
        participantIds: ["priya", "rahul"],
        splitDetails: { priya: 350, rahul: 100 },
      }),
    ).toThrow(/add up/);
  });

  it("rejects a non-positive amount", () => {
    expect(() =>
      computeShares({ amount: 0, splitType: "equal", participantIds: ["priya"] }),
    ).toThrow();
  });

  it("rejects an unknown split type", () => {
    expect(() =>
      computeShares({ amount: 100, splitType: "lottery", participantIds: ["priya"] }),
    ).toThrow(/Unknown splitType/);
  });
});

describe("computeBalances", () => {
  it("computes paid/owed/net for a simple equal-split trip", () => {
    const group = {
      participants,
      expenses: [
        {
          id: "e1", amount: 300, paidBy: "priya", splitType: "equal",
          participantIds: ["priya", "rahul", "sara"], category: "food",
        },
      ],
    };
    const balances = computeBalances(group);
    expect(balances.priya.paid).toBe(300);
    expect(balances.priya.owed).toBe(100);
    expect(balances.priya.net).toBe(200);
    expect(balances.rahul.net).toBe(-100);
    expect(balances.sara.net).toBe(-100);
  });

  it("nets out correctly across multiple expenses paid by different people", () => {
    const group = {
      participants,
      expenses: [
        { id: "e1", amount: 300, paidBy: "priya", splitType: "equal", participantIds: ["priya", "rahul", "sara"] },
        { id: "e2", amount: 150, paidBy: "rahul", splitType: "equal", participantIds: ["priya", "rahul", "sara"] },
      ],
    };
    const balances = computeBalances(group);
    // Total spend 450, equal share 150 each.
    expect(balances.priya.net).toBe(150); // paid 300, owed 150
    expect(balances.rahul.net).toBe(0);   // paid 150, owed 150
    expect(balances.sara.net).toBe(-150); // paid 0, owed 150
  });
});

describe("simplifySettlements", () => {
  it("produces zero transactions when everyone is already even", () => {
    const balances = { a: { net: 0 }, b: { net: 0 } };
    expect(simplifySettlements(balances)).toEqual([]);
  });

  it("produces a single transaction for a simple two-person debt", () => {
    const balances = { a: { net: 100 }, b: { net: -100 } };
    const settlements = simplifySettlements(balances);
    expect(settlements).toEqual([{ from: "b", to: "a", amount: 100 }]);
  });

  it("minimizes transactions for a three-person cycle-free case", () => {
    // priya is owed 200, rahul is owed 0 (even), sara owes 200.
    // Should be a single transaction, not routed through rahul.
    const balances = { priya: { net: 200 }, rahul: { net: 0 }, sara: { net: -200 } };
    const settlements = simplifySettlements(balances);
    expect(settlements).toEqual([{ from: "sara", to: "priya", amount: 200 }]);
  });

  it("uses at most (participants - 1) transactions for a more complex case", () => {
    // Classic case: A owes 100, B is owed 40, C is owed 60.
    const balances = { a: { net: -100 }, b: { net: 40 }, c: { net: 60 } };
    const settlements = simplifySettlements(balances);
    expect(settlements.length).toBeLessThanOrEqual(2);
    const totalSettled = settlements.reduce((sum, t) => sum + t.amount, 0);
    expect(totalSettled).toBeCloseTo(100, 2);
  });

  it("accepts a raw net-amount map as well as full balance entries", () => {
    const settlements = simplifySettlements({ a: 50, b: -50 });
    expect(settlements).toEqual([{ from: "b", to: "a", amount: 50 }]);
  });
});

describe("getCategoryBreakdown", () => {
  it("totals expenses per category", () => {
    const group = {
      expenses: [
        { amount: 200, category: "food" },
        { amount: 100, category: "food" },
        { amount: 500, category: "accommodation" },
      ],
    };
    expect(getCategoryBreakdown(group)).toEqual({ food: 300, accommodation: 500 });
  });

  it("buckets expenses with no category as 'uncategorized'", () => {
    const group = { expenses: [{ amount: 50 }] };
    expect(getCategoryBreakdown(group)).toEqual({ uncategorized: 50 });
  });
});

describe("generateReport / reportToCSV", () => {
  it("produces a full report with settlements and category data", () => {
    const group = {
      tripName: "Goa Trip",
      participants,
      expenses: [
        { id: "e1", amount: 300, paidBy: "priya", splitType: "equal", participantIds: ["priya", "rahul", "sara"], category: "food" },
      ],
    };
    const report = generateReport(group);
    expect(report.tripName).toBe("Goa Trip");
    expect(report.totalSpend).toBe(300);
    expect(report.categoryBreakdown).toEqual({ food: 300 });
    expect(report.settlements.length).toBeGreaterThan(0);
  });

  it("serializes a report to CSV containing the key sections", () => {
    const report = generateReport({
      tripName: "Goa Trip",
      participants,
      expenses: [{ id: "e1", amount: 300, paidBy: "priya", splitType: "equal", participantIds: ["priya", "rahul", "sara"], category: "food" }],
    });
    const csv = reportToCSV(report);
    expect(csv).toMatch(/Trip,Goa Trip/);
    expect(csv).toMatch(/Category,Amount/);
    expect(csv).toMatch(/Settlement From,Settlement To,Amount/);
  });
});

describe("ExpenseSplitterEngine", () => {
  it("adds participants and rejects duplicates", () => {
    const engine = new ExpenseSplitterEngine({ tripName: "Kerala Trip" });
    engine.addParticipant({ id: "priya", name: "Priya" });
    expect(() => engine.addParticipant({ id: "priya", name: "Priya" })).toThrow(/already exists/);
  });

  it("validates an expense before adding it", () => {
    const engine = new ExpenseSplitterEngine({ tripName: "Kerala Trip", participants });
    expect(() =>
      engine.addExpense({ amount: 100, splitType: "percentage", participantIds: ["priya", "rahul"], splitDetails: { priya: 10, rahul: 10 } }),
    ).toThrow(/100/);
  });

  it("computes balances and settlements end-to-end", () => {
    const engine = new ExpenseSplitterEngine({ tripName: "Kerala Trip", participants });
    engine.addExpense({ amount: 300, paidBy: "priya", splitType: "equal", participantIds: ["priya", "rahul", "sara"], category: "food" });
    const balances = engine.getBalances();
    expect(balances.priya.net).toBe(200);
    expect(engine.getSettlements().length).toBeGreaterThan(0);
  });

  it("prevents removing a participant who is party to an expense", () => {
    const engine = new ExpenseSplitterEngine({ tripName: "Kerala Trip", participants });
    engine.addExpense({ amount: 300, paidBy: "priya", splitType: "equal", participantIds: ["priya", "rahul", "sara"] });
    expect(() => engine.removeParticipant("rahul")).toThrow(/party to existing expenses/);
  });

  it("allows removing a participant with no expense history", () => {
    const engine = new ExpenseSplitterEngine({ tripName: "Kerala Trip", participants });
    engine.removeParticipant("sara");
    expect(engine.group.participants.map((p) => p.id)).not.toContain("sara");
  });
});
