export type Element =
  | 'fire'
  | 'water'
  | 'earth'
  | 'air'
  | 'lightning'
  | 'ice'
  | 'shadow'
  | 'light'
  | 'nature'
  | 'metal'
  | 'spirit';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  magic: number;
  luck: number;
}

export interface Creature {
  id?: string;
  name: string;
  title: string;
  elements: Element[];
  rarity: Rarity;
  stats: Stats;
  traits: string[];
  seed?: string;
}

export interface GenerateConstraints {
  seed?: string;
  element?: Element;
  rarity?: Rarity;
  minTotal?: number;
  maxTotal?: number;
}
