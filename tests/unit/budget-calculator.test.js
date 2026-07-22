import { describe, it, expect, beforeEach } from 'vitest';
import { BudgetCalculatorEngine } from '../../js-modules/budget-calculator-engine.js';

describe('BudgetCalculatorEngine', () => {
  let budgetEngine;

  beforeEach(() => {
    budgetEngine = new BudgetCalculatorEngine({ totalBudget: 10000, currency: 'INR' });
  });

  it('should initialize budget and empty expenses', () => {
    expect(budgetEngine.totalBudget).toBe(10000);
    expect(budgetEngine.getTotalSpent()).toBe(0);
    expect(budgetEngine.getRemainingBudget()).toBe(10000);
  });

  it('should add valid expenses and update total spent', () => {
    const exp = budgetEngine.addExpense('Hotel Stay', 4000, 'lodging');
    expect(exp).not.toBeNull();
    expect(budgetEngine.getTotalSpent()).toBe(4000);
    expect(budgetEngine.getRemainingBudget()).toBe(6000);
  });

  it('should reject invalid expenses', () => {
    expect(budgetEngine.addExpense('', 500)).toBeNull();
    expect(budgetEngine.addExpense('Food', -100)).toBeNull();
  });

  it('should calculate category breakdown', () => {
    budgetEngine.addExpense('Hotel', 3000, 'lodging');
    budgetEngine.addExpense('Train', 1000, 'transport');
    budgetEngine.addExpense('Taxi', 500, 'transport');

    const breakdown = budgetEngine.getCategoryBreakdown();
    expect(breakdown.lodging).toBe(3000);
    expect(breakdown.transport).toBe(1500);
  });

  it('should reflect correct budget health status', () => {
    expect(budgetEngine.getBudgetHealth().status).toBe('healthy');

    budgetEngine.addExpense('Resort', 9000, 'lodging');
    expect(budgetEngine.getBudgetHealth().status).toBe('warning');

    budgetEngine.addExpense('Shopping', 2000, 'misc');
    expect(budgetEngine.getBudgetHealth().status).toBe('exceeded');
  });

  it('should format INR currency properly', () => {
    expect(budgetEngine.formatCurrency(5000)).toBe('₹5,000');
  });
});
