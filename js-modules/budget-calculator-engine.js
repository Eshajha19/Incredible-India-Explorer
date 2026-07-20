/**
 * Traveler Budget & Expense Calculator Engine
 * Handles daily trip cost estimation, expense categories (lodging, food, transport, activities),
 * currency formatting (INR/USD/EUR), and budget status warnings.
 */

export class BudgetCalculatorEngine {
  constructor(options = {}) {
    this.totalBudget = options.totalBudget || 10000; // in INR
    this.currency = options.currency || 'INR';
    this.expenses = options.expenses || [];
  }

  addExpense(title, amount, category = 'general') {
    if (!title || typeof amount !== 'number' || amount <= 0) {
      return null;
    }
    const expense = {
      id: 'exp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title,
      amount,
      category
    };
    this.expenses.push(expense);
    return expense;
  }

  removeExpense(id) {
    const idx = this.expenses.findIndex(e => e.id === id);
    if (idx !== -1) {
      return this.expenses.splice(idx, 1)[0];
    }
    return null;
  }

  getTotalSpent() {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  getRemainingBudget() {
    return this.totalBudget - this.getTotalSpent();
  }

  getCategoryBreakdown() {
    const breakdown = {};
    this.expenses.forEach(e => {
      breakdown[e.category] = (breakdown[e.category] || 0) + e.amount;
    });
    return breakdown;
  }

  getBudgetHealth() {
    const spent = this.getTotalSpent();
    const ratio = spent / (this.totalBudget || 1);
    if (ratio > 1.0) return { status: 'exceeded', ratio, message: 'Over Budget' };
    if (ratio >= 0.85) return { status: 'warning', ratio, message: 'Near Budget Cap' };
    return { status: 'healthy', ratio, message: 'Within Budget' };
  }

  formatCurrency(amount, currency = this.currency) {
    if (currency === 'INR') {
      return '₹' + amount.toLocaleString('en-IN');
    }
    return `${currency} ${amount.toFixed(2)}`;
  }
}
