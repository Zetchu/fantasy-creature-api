import {
  Creature,
  Element,
  GenerateConstraints,
  Rarity,
  Stats,
} from '../lib/types';
import { hashSeed, mulberry32 } from '../lib/rng';

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

const NAME_A = [
  'Pyro',
  'Aqua',
  'Terra',
  'Zeph',
  'Volt',
  'Glacia',
  'Umbra',
  'Lux',
  'Sylva',
  'Ferr',
  'Etho',
];
const NAME_B = [
  'fang',
  'warden',
  'weaver',
  'mancer',
  'stalker',
  'blade',
  'bloom',
  'caller',
  'smith',
  'singer',
  'roamer',
];
const TITLES = [
  'Warden',
  'Herald',
  'Seeker',
  'Keeper',
  'Shaper',
  'Sentinel',
  'Sage',
  'Nomad',
  'Champion',
  'Arbiter',
  'Harbinger',
];

const TRAITS = [
  'bioluminescent markings',
  'smolders in moonlight',
  'echoes footsteps',
  'leaves frost prints',
  'magnetized aura',
  'whispers to roots',
  'shifts shade at noon',
  'conductive scales',
  'glass feathers',
  'runic scars',
];

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function rollElements(rng: () => number, forced?: Element): Element[] {
  if (forced) {
    if (rng() < 0.4) {
      const alt = pick(
        rng,
        ELEMENTS.filter((e) => e !== forced)
      );
      return [forced, alt];
    }
    return [forced];
  }
  if (rng() < 0.7) return [pick(rng, ELEMENTS)];
  const a = pick(rng, ELEMENTS);
  const b = pick(
    rng,
    ELEMENTS.filter((e) => e !== a)
  );
  return [a, b];
}

function rollRarity(rng: () => number, forced?: Rarity): Rarity {
  if (forced) return forced;
  const r = rng();
  if (r < 0.45) return 'common';
  if (r < 0.75) return 'uncommon';
  if (r < 0.9) return 'rare';
  if (r < 0.98) return 'epic';
  return 'legendary';
}

function statBudgetFor(rarity: Rarity): number {
  switch (rarity) {
    case 'common':
      return 300;
    case 'uncommon':
      return 380;
    case 'rare':
      return 450;
    case 'epic':
      return 520;
    case 'legendary':
      return 600;
  }
}

function allocateStats(rng: () => number, total: number): Stats {
  const bias = [1, 1, 1, 1, 1, 1].map(() => rng() + 0.25);
  const sum = bias.reduce((a, b) => a + b, 0);
  const base = bias.map((b) => Math.max(20, Math.round((b / sum) * total)));
  const [hp, attack, defense, speed, magic, luck] = base;
  return { hp, attack, defense, speed, magic, luck };
}

export function generateCreature(input: GenerateConstraints = {}): Creature {
  const seed = input.seed ?? `${Date.now()}:${Math.random()}`;
  const rng = mulberry32(hashSeed(seed));

  const rarity = rollRarity(rng, input.rarity);
  let total = statBudgetFor(rarity);
  if (input.minTotal) total = Math.max(total, input.minTotal);
  if (input.maxTotal) total = Math.min(total, input.maxTotal);

  const elements = rollElements(rng, input.element);
  const name = pick(rng, NAME_A) + pick(rng, NAME_B);
  const title = `${pick(rng, TITLES)}`;
  const traits = Array.from(
    new Set([pick(rng, TRAITS), pick(rng, TRAITS), pick(rng, TRAITS)])
  ).slice(0, 3);

  const stats = allocateStats(rng, total);
  if (elements.includes('fire')) {
    stats.attack += 10;
  }
  if (elements.includes('water')) {
    stats.magic += 10;
  }
  if (elements.includes('earth')) {
    stats.defense += 10;
  }
  if (elements.includes('air')) {
    stats.speed += 10;
  }
  if (elements.includes('shadow')) {
    stats.luck += 8;
  }
  if (elements.includes('light')) {
    stats.hp += 8;
  }

  return { name, title, elements, rarity, stats, traits, seed };
}
