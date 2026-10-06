// Simulates all 4^7 answer combinations and checks persona balance.
// Rule: sum weights, highest total wins, ties go to the persona listed first.
// Usage: node tests/balance.mjs [file.html]   (default: index.html)
import { readFile } from 'node:fs/promises';

const file = process.argv[2] || 'index.html';
const html = await readFile(file, 'utf8');
const m = html.match(/<script[^>]*id="?quiz-data"?[^>]*>([\s\S]*?)<\/script>/);
if (!m) throw new Error(`quiz-data block not found in ${file}`);
const { personas, questions } = JSON.parse(m[1]);

const ids = personas.map((p) => p.id);
const wins = Object.fromEntries(ids.map((id) => [id, 0]));
const total = 4 ** questions.length;

for (let n = 0; n < total; n++) {
  const score = Object.fromEntries(ids.map((id) => [id, 0]));
  let k = n;
  for (const q of questions) {
    for (const [id, w] of Object.entries(q.answers[k % 4].weights)) score[id] += w;
    k = Math.floor(k / 4);
  }
  let best = ids[0];
  for (const id of ids) if (score[id] > score[best]) best = id;
  wins[best]++;
}

let ok = true;
console.log(`${file}: ${total} Kombinationen\n`);
for (const p of personas) {
  const share = (wins[p.id] / total) * 100;
  const flag = wins[p.id] === 0 ? '  ✗ unerreichbar' : share > 30 ? '  ✗ über 30 %' : '';
  if (flag) ok = false;
  console.log(`${p.emoji}  ${p.name.padEnd(26)} ${String(wins[p.id]).padStart(5)}  ${share.toFixed(1).padStart(5)} %${flag}`);
}
console.log(ok ? '\n✓ ausgewogen' : '\n✗ unausgewogen');
process.exit(ok ? 0 : 1);
