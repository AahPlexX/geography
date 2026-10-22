import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const idPattern = /(?:\bid\s*:|"id"\s*:)\s*(\d+)/g;
const categoryPattern = /(?:\bcategory\s*:|"category"\s*:)\s*['"]([^'"]+)['"]/g;

test('added curriculum block contains exactly IDs 61 through 80 once each', async () => {
  const source = await readFile(new URL('../src/data/extra.ts', import.meta.url), 'utf8');
  const ids = [...source.matchAll(idPattern)].map((match) => Number(match[1])).sort((a, b) => a - b);
  assert.deepEqual(ids, Array.from({ length: 20 }, (_, index) => index + 61));
});

test('added curriculum block contributes the planned category distribution', async () => {
  const source = await readFile(new URL('../src/data/extra.ts', import.meta.url), 'utf8');
  const categories = [...source.matchAll(categoryPattern)].map((match) => match[1]);
  const counts = Object.fromEntries(['globe', 'world', 'compass', 'us_regions', 'symbols'].map((category) => [category, categories.filter((value) => value === category).length]));
  assert.deepEqual(counts, { globe: 3, world: 5, compass: 3, us_regions: 6, symbols: 3 });
});

test('added questions identify themselves as added practice instead of pretending to be teacher-authored originals', async () => {
  const source = await readFile(new URL('../src/data/extra.ts', import.meta.url), 'utf8');
  const origins = [...source.matchAll(/origin\s*:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
  assert.equal(origins.length, 20);
  assert.ok(origins.every((origin) => origin.startsWith('Added #')));
});
