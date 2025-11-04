import { Router } from 'express';
import { z } from 'zod';
import { generateCreature } from '../services/generator';

const router = Router();

const generateQuery = z.object({
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
    const q = generateQuery.parse(req.query);
    res.json(generateCreature(q));
  } catch (e) {
    next(e);
  }
});

const teamQuery = generateQuery.extend({
  n: z.coerce.number().int().min(1).max(12).default(6),
  distinct: z
    .union([
      z.literal('1'),
      z.literal('true'),
      z.literal('0'),
      z.literal('false'),
    ])
    .optional()
    .transform((v) => v === '1' || v === 'true'),
});

router.get('/team', (req, res, next) => {
  try {
    const { n, distinct, ...base } = teamQuery.parse(req.query);

    const team = [];
    const seen = new Set<string>();

    for (let i = 0; i < n; i++) {
      let tries = 0;
      let c = generateCreature(base);
      while (distinct && tries < 10) {
        const key = `${c.name}|${c.title}`;
        if (!seen.has(key)) {
          seen.add(key);
          break;
        }
        c = generateCreature(base);
        tries++;
      }
      if (distinct) seen.add(`${c.name}|${c.title}`);
      team.push(c);
    }
    res.json(team);
  } catch (e) {
    next(e);
  }
});

export default router;
