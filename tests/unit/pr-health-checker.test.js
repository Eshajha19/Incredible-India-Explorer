import { describe, it, expect } from 'vitest';
import { validateHtmlFiles } from '../../scripts/pr-health-checker.js';

describe('pr-health-checker', () => {
  it('should scan repository HTML files and report status', () => {
    const report = validateHtmlFiles();
    expect(report.totalScanned).toBeGreaterThan(0);
    expect(report.issuesCount).toBeDefined();
    expect(Array.isArray(report.issues)).toBe(true);
  });
});
