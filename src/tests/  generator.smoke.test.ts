import { describe, it, expect } from 'vitest';
import { generateCreature } from '../services/generator';
import type { Element, Rarity } from '../lib/types';

const ELEMENTS: Element[] = [
  'fire',
  'water',
  'earth',
  'air',
  'lightning',
  'ice',
  'shadow',
  'light',
  'nature',
  'metal',
  'spirit',
];
const RARITIES: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

describe('generator (smoke)', () => {
  it('returns a valid creature shape', () => {
    const c = generateCreature();
    expect(typeof c.name).toBe('string');
    expect(typeof c.title).toBe('string');
    expect(Array.isArray(c.elements)).toBe(true);
    expect(c.elements.length).toBeGreaterThanOrEqual(1);
    expect(c.elements.length).toBeLessThanOrEqual(2);
    c.elements.forEach((e) => expect(ELEMENTS).toContain(e));
    expect(RARITIES).toContain(c.rarity);

    const s = c.stats;
    ['hp', 'attack', 'defense', 'speed', 'magic', 'luck'].forEach((k) => {
      expect(typeof (s as any)[k]).toBe('number');
      expect((s as any)[k]).toBeGreaterThan(0);
    });

    expect(Array.isArray(c.traits)).toBe(true);
    expect(c.traits.length).toBeGreaterThan(0);
  });
});
