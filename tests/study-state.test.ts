import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const curriculumFiles = [
  'src/data/globe.ts',
  'src/data/world-original.ts',
  'src/data/world-expanded.ts',
  'src/data/compass.ts',
  'src/data/us-original-a.ts',
  'src/data/us-original-b.ts',
  'src/data/us-expanded.ts',
  'src/data/symbols.ts',
];

const readCurriculum = async () => Promise.all(curriculumFiles.map((path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')));

test('question bank source contains exactly IDs 1 through 60 once each', async () => {
  const sources = await readCurriculum();
  const ids = sources.flatMap((source) => [...source.matchAll(/\bid:(\d+),/g)].map((match) => Number(match[1]))).sort((a, b) => a - b);
  assert.deepEqual(ids, Array.from({ length: 60 }, (_, index) => index + 1));
});

test('every question source contains four choices and exactly one correct choice', async () => {
  const sources = await readCurriculum();
  const combined = sources.join('\n');
  const questionStarts = [...combined.matchAll(/\bid:(\d+),/g)];
  for (let index = 0; index < questionStarts.length; index += 1) {
    const start = questionStarts[index].index ?? 0;
    const end = questionStarts[index + 1]?.index ?? combined.length;
    const block = combined.slice(start, end);
    assert.equal((block.match(/isCorrect:/g) ?? []).length, 4, `question ${questionStarts[index][1]} must have four choices`);
    assert.equal((block.match(/isCorrect:true/g) ?? []).length, 1, `question ${questionStarts[index][1]} must have one correct choice`);
  }
});

test('teacher-key hemisphere revisions remain authoritative', async () => {
  const sources = (await readCurriculum()).join('\n');
  assert.match(sources, /Africa is sorted into the Northern Hemisphere box and the Eastern Hemisphere box/);
  assert.match(sources, /EXACT four continents written inside the Northern Hemisphere box/);
  assert.match(sources, /Eastern Hemisphere box has 5 continents/);
  assert.match(sources, /BOTH the Northern Hemisphere box AND the Eastern Hemisphere box/);
  assert.match(sources, /EXACT three continents written in the Southern Hemisphere box/);
});

test('world map fetch uses Natural Earth 1:50m source', async () => {
  const source = await readFile(new URL('../scripts/fetch-map.mjs', import.meta.url), 'utf8');
  assert.match(source, /ne_50m_admin_0_countries/);
  assert.doesNotMatch(source, /ne_110m_admin_0_countries/);
});
