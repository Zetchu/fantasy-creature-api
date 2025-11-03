import { Router } from 'express';
import { z } from 'zod';
import { generateCreature } from '../services/generator';

const router = Router();

const genQuery = z.object({
  seed: z.string().optional(),
  element: z
    .enum([
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
    ] as const)
    .optional(),
  rarity: z
    .enum(['common', 'uncommon', 'rare', 'epic', 'legendary'] as const)
    .optional(),
  minTotal: z.coerce.number().int().positive().optional(),
  maxTotal: z.coerce.number().int().positive().optional(),
});

router.get('/random', (req, res, next) => {
  try {
    const q = genQuery.parse(req.query);
    res.json(generateCreature(q));
  } catch (e) {
    next(e);
  }
});

export default router;
