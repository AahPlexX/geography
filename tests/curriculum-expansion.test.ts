import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const currentCurriculumFiles = [
  'src/data/globe.ts',
  'src/data/world-original.ts',
  'src/data/world-expanded.ts',
  'src/data/compass.ts',
  'src/data/us-original-a.ts',
  'src/data/us-original-b.ts',
  'src/data/us-expanded.ts',
  'src/data/symbols.ts',
];

const readCurrentCurriculum = async () => Promise.all(currentCurriculumFiles.map((path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')));
const idPattern = /(?:\bid\s*:|"id"\s*:)\s*(\d+)/g;
const categoryPattern = /(?:\bcategory\s*:|"category"\s*:)\s*['"]([^'"]+)['"]/g;

test('expanded curriculum contains IDs 1 through 80 exactly once', async () => {
  const sources = await readCurrentCurriculum();
  const ids = sources.flatMap((source) => [...source.matchAll(idPattern)].map((match) => Number(match[1]))).sort((a, b) => a - b);
  assert.deepEqual(ids, Array.from({ length: 80 }, (_, index) => index + 1));
});

test('expanded category totals match the 80-question specification', async () => {
  const sources = await readCurrentCurriculum();
  const categories = sources.flatMap((source) => [...source.matchAll(categoryPattern)].map((match) => match[1]));
  const counts = Object.fromEntries(['globe', 'world', 'compass', 'us_regions', 'symbols'].map((category) => [category, categories.filter((value) => value === category).length]));
  assert.deepEqual(counts, { globe: 13, world: 22, compass: 10, us_regions: 25, symbols: 10 });
});
