import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { generateCreature } from '../services/generator';

function withMockedRandom(sequence: number[], fn: () => void) {
  const orig = Math.random;
  let i = 0;
  vi.spyOn(Math, 'random').mockImplementation(
    () => sequence[i++ % sequence.length]
  );
  try {
    fn();
  } finally {
    (Math.random as any).mockRestore?.();
    (Math.random as any) = orig;
  }
}

describe('generator (unit)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('respects forced rarity and clamps total via min/max', () => {
    withMockedRandom([0.1, 0.2, 0.3, 0.4, 0.5, 0.6], () => {
      const c = generateCreature({
        rarity: 'epic',
        minTotal: 540,
        maxTotal: 550,
      });
      const sum = Object.values(c.stats).reduce((a, b) => a + b, 0);
      expect(sum).toBeGreaterThanOrEqual(540);
      expect(sum).toBeLessThanOrEqual(570);
      expect(c.rarity).toBe('epic');
    });
  });

  it('respects forced element and applies correct stat bonus', () => {
    withMockedRandom([0.05, 0.8, 0.7, 0.6, 0.5, 0.4], () => {
      const c = generateCreature({ element: 'fire', rarity: 'rare' });
      expect(c.elements.includes('fire')).toBe(true);
      expect(c.stats.attack).toBeGreaterThan(30);
    });
  });

  it('produces 1–2 elements and never duplicates the same element twice', () => {
    const c = generateCreature();
    expect(c.elements.length).toBeGreaterThanOrEqual(1);
    expect(c.elements.length).toBeLessThanOrEqual(2);
    if (c.elements.length === 2) {
      expect(c.elements[0]).not.toBe(c.elements[1]);
    }
  });
});
