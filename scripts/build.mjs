// Production build: minifies the single-file quiz into dist/index.html.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { minify } from 'html-minifier-terser';

const src = await readFile('index.html', 'utf8');
const out = await minify(src, {
  collapseWhitespace: true,
  conservativeCollapse: true,
  removeComments: true,
  minifyCSS: true,
  // Only real JS is minified; the application/json quiz-data block is left as-is.
  minifyJS: { compress: true, mangle: true },
  useShortDoctype: true,
});

await rm('dist', { recursive: true, force: true });
await mkdir('dist');
await writeFile('dist/index.html', out);

const kb = (n) => (n / 1024).toFixed(1) + ' KB';
console.log(`dist/index.html  ${kb(Buffer.byteLength(src))} → ${kb(Buffer.byteLength(out))}`);
