import {
  Creature,
  Element,
  GenerateConstraints,
  Rarity,
  Stats,
} from '../lib/types';

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
  'Aeth',
  'Vael',
  'Drak',
  'Syl',
  'Noct',
  'Kael',
  'Zer',
  'Rav',
  'Iri',
  'Thal',
  'Vor',
  'Luma',
  'Nyx',
  'Ezra',
  'Quel',
  'Ashen',
  'Obsi',
  'Grim',
  'Serap',
  'Arca',
  'Myrr',
  'Umbr',
  'Kryn',
  'Eld',
];
const NAME_B = [
  'riel',
  'gorath',
  'syl',
  'thas',
  'wyn',
  'vorn',
  'astra',
  'shade',
  'bane',
  'dread',
  'mourn',
  'frost',
  'flame',
  'sunder',
  'weaver',
  'soulrend',
  'silence',
  'whisper',
  'thorn',
  'watcher',
  'seer',
  'caller',
  'warden',
  'walker',
  'binder',
];
const TITLES = [
  'the Voidwalker',
  'the Eternal Warden',
  'the Last Seer',
  'the Oathbreaker',
  'the Pale Flame',
  'the Frostbound Herald',
  'the Stormcaller',
  'the Bone Crown',
  'the Dawnless',
  'the Chainspeaker',
  'the Hollow Saint',
  'the Eclipse Herald',
  'the Rune-Bound',
  'the Bloodforged',
  'the Whisper in the Roots',
  'the Serpent of Ashes',
  'the Keeper of Black Sunlight',
  'the Shattered Prophet',
  'the Hand of the Abyss',
  'of the Thornwild',
  'of the Silent Depths',
];

const TRAITS = [
  'carries a curse older than empires',
  'drinks moonlight instead of water',
  'bleeds silver embers',
  'speaks in voices that are not its own',
  'leaves frost sigils where it walks',
  'whispers bargains to sleeping minds',
  'is followed by silent, unseen hands',
  'heart is bound in runic chains',
  'bones resonate like crystal when angered',
  'shadow moves half a second late',
  'eyes reflect futures that never happened',
  'smells faintly of burnt roses and ozone',
  'plants bow in its presence',
  'cannot cross consecrated thresholds',
  'wears a crown of living thorns',
];

const rng = () => Math.random();

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

  return { name, title, elements, rarity, stats, traits };
}
