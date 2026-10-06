# Welcher WM-Tipper bist du?

A playful German personality quiz for the free football prediction game on [tipmaster.de](https://tipmaster.de/world-cup/). Seven questions about how you tip — gut vs. data, favourites vs. underdogs, risk, loyalty, timing — sort you into one of six tipping personalities, with a shareable 1080×1350 result card drawn on `<canvas>`.

It's a Tippspiel (prediction game), not betting: no odds, no money, just bragging rights in the Tipprunde.

## Personas

| | Persona | Share of all 16,384 answer paths |
|---|---|---|
| 🍀 | Der Bauchtipper | 18.5 % |
| 🔮 | Die Statistik-Hexe | 21.5 % |
| 🐕 | Der Underdog-Romantiker | 15.5 % |
| 🧣 | Der Fanbrillen-Tipper | 12.8 % |
| 📋 | Der 2:1-Beamte | 14.8 % |
| ⏰ | Der Last-Minute-Chaot | 16.8 % |

## Project layout

- `index.html` — the whole app: one self-contained file with inline CSS/JS. The only external request is Google Fonts. Quiz data is embedded as JSON in `<script type="application/json" id="quiz-data">`, and `window.scoreAnswers(indices)` exposes the scoring.
- `scripts/build.mjs` — production build: minifies `index.html` into `dist/index.html`.
- `tests/balance.mjs` — runs every answer combination and fails if a persona can't be reached or wins more than 30 %.

## Commands

```sh
npm install
npm test        # persona balance check
npm run build   # → dist/index.html
```

You can also just open `index.html` in a browser; it needs no build step.

## Deploy

Vercel runs `npm run build` and serves `dist/` (see `vercel.json`).
