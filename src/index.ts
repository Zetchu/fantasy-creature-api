import { generateCreature } from './services/generator';

// generateCreature();
console.log(generateCreature());
console.log(
  generateCreature({ seed: 'ash-2', element: 'fire', rarity: 'epic' })
);
console.log(generateCreature({ minTotal: 300, element: 'ice' }));
