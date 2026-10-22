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
const idPattern = /(?:\bid\s*:|"id"\s*:)\s*(\d+)/g;

test('question bank source contains exactly IDs 1 through 60 once each', async () => {
  const sources = await readCurriculum();
  const ids = sources.flatMap((source) => [...source.matchAll(idPattern)].map((match) => Number(match[1]))).sort((a, b) => a - b);
  assert.deepEqual(ids, Array.from({ length: 60 }, (_, index) => index + 1));
});

test('every question source contains four choices and exactly one correct choice', async () => {
  const sources = await readCurriculum();
  for (const source of sources) {
    const starts = [...source.matchAll(idPattern)];
    for (let index = 0; index < starts.length; index += 1) {
      const start = starts[index].index ?? 0;
      const end = starts[index + 1]?.index ?? source.length;
      const block = source.slice(start, end);
      const choiceCount = (block.match(/(?:isCorrect\s*:|"isCorrect"\s*:)\s*(?:true|false)/g) ?? []).length;
      const correctCount = (block.match(/(?:isCorrect\s*:|"isCorrect"\s*:)\s*true/g) ?? []).length;
      assert.equal(choiceCount, 4, `question ${starts[index][1]} must have four choices`);
      assert.equal(correctCount, 1, `question ${starts[index][1]} must have one correct choice`);
    }
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

test('world map source uses Natural Earth 1:50m country geometry', async () => {
  const [fetchScript, mapData] = await Promise.all([
    readFile(new URL('../scripts/fetch-map.mjs', import.meta.url), 'utf8'),
    readFile(new URL('../src/lib/map-data.mjs', import.meta.url), 'utf8'),
  ]);
  assert.match(fetchScript, /NATURAL_EARTH_SOURCE/);
  assert.match(mapData, /ne_50m_admin_0_countries/);
  assert.doesNotMatch(mapData, /ne_110m_admin_0_countries/);
});

test('named div containers declare a role that supports their accessible name', async () => {
  const paths = ['src/App.tsx', 'src/components/QuestionPanel.tsx', 'src/components/StudyStage.tsx'];
  for (const path of paths) {
    const source = await readFile(new URL(`../${path}`, import.meta.url), 'utf8');
    const namedDivs = source.match(/<div\b[^>]*\baria-label\s*=[^>]*>/g) ?? [];
    for (const element of namedDivs) {
      assert.match(element, /\brole="group"/, `${path} has an aria-labelled div without role="group": ${element}`);
    }
  }
});
