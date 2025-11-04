import 'dotenv/config';
import express from 'express';
import creatures from './routes/creatures';
import { errorHandler } from './middleware/error';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    name: 'Fantasy Creature Generator API',
    routes: [
      {
        path: '/creatures/random',
        query: ['element', 'rarity', 'minTotal', 'maxTotal'],
      },
    ],
  });
});

app.use('/creatures', creatures);
app.use(errorHandler);

const PORT = process.env.PORT ?? 5003;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
