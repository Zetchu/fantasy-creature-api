🐉 Fantasy Creature Generator API

A simple REST API built with TypeScript, Express, and Zod that procedurally generates fantasy creatures with random names, titles, stats, and traits — inspired by Lord of the Rings, Final Fantasy, and Isekai worlds.

🚀 Features

Procedurally generates unique creatures

Element & rarity system (common → legendary)

Randomized stats and traits

Team generation with optional distinct members

Type-safe validation (Zod)

Includes smoke, unit, and integration tests

🧩 Endpoints
GET /

Returns API info and available routes.

GET /creatures/random

Generates a single creature.

Query params:
element, rarity, minTotal, maxTotal

Example:

GET /creatures/random?element=fire&rarity=epic

Response:

{
"name": "Aethsoulrend",
"title": "the Frostbound Herald",
"elements": ["fire","air"],
"rarity": "epic",
"stats": { "hp": 88, "attack": 120, "defense": 95, "speed": 80, "magic": 75, "luck": 62 },
"traits": ["bleeds silver embers", "smells of ozone"]
}

GET /creatures/team

Generates multiple creatures.

Query params:
n (1–12), distinct, element, rarity, minTotal, maxTotal

Example:

GET /creatures/team?n=5&distinct=true

🧪 Testing

Includes:

Smoke tests (for generator & routes)

Comprehensive unit test (generation logic)

Integration test (Express API)

Run tests:

npm test

⚙️ Run Locally
npm install
npm run dev

Then open:
👉 http://localhost:5003/

📁 Structure
src/
├── index.ts # Entry point (Express setup)
├── routes/creatures.ts # /random and /team endpoints
├── services/generator.ts # Creature generation logic
├── lib/types.ts # Type definitions
└── middleware/error.ts # Error handling

🪄 Example Output
Name: Sylshade
Title: the Hollow Saint
Element: Shadow
Rarity: Legendary
Traits: speaks in voices that are not its own, wears a crown of living thorns
