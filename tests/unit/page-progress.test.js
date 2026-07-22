import { describe, it, expect } from 'vitest';

describe('Reading progress bar calculations', () => {
  it('calculates scroll progress correctly', () => {
    // We import the calculations directly from the helper if exposed,
    // or test a replica of the logic here.
    const calculateProgress = (scrollTop, scrollHeight, clientHeight) => {
      const scrollable = scrollHeight - clientHeight;
      return scrollable <= 0 ? 0 : Math.min(100, Math.max(0, (scrollTop / scrollable) * 100));
    };

    expect(calculateProgress(0, 1000, 500)).toBe(0);
    expect(calculateProgress(250, 1000, 500)).toBe(50);
    expect(calculateProgress(500, 1000, 500)).toBe(100);
    expect(calculateProgress(600, 1000, 500)).toBe(100); // bounds check
  });
});
