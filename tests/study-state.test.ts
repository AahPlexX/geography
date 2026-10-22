import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { questions } from '../src/data/questions.ts';

test('question bank keeps 60 unique sequential questions with one correct option each', () => {
  assert.equal(questions.length, 60);
  assert.deepEqual(questions.map((question) => question.id), Array.from({ length: 60 }, (_, index) => index + 1));
  for (const question of questions) {
    assert.equal(question.options.length, 4, `question ${question.id} must have four choices`);
    assert.equal(question.options.filter((option) => option.isCorrect).length, 1, `question ${question.id} must have one correct answer`);
  }
});

test('teacher-key hemisphere revisions remain authoritative', () => {
  assert.match(questions[4].question, /Africa written in for your class test/);
  assert.match(questions[37].question, /EXACT four continents/);
  assert.match(questions[38].question, /Eastern Hemisphere/);
  assert.match(questions[39].question, /BOTH the Northern Hemisphere box AND the Eastern Hemisphere box/);
  assert.match(questions[40].question, /EXACT three continents/);
});

test('world map fetch uses Natural Earth 1:50m source', async () => {
  const source = await readFile(new URL('../scripts/fetch-map.mjs', import.meta.url), 'utf8');
  assert.match(source, /ne_50m_admin_0_countries/);
  assert.doesNotMatch(source, /ne_110m_admin_0_countries/);
});
