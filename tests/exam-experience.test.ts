import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

class MemoryStorage {
  private readonly values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

const expectedVisuals = new Map<number, string>([
  [4, 'world'], [7, 'world'], [8, 'world'], [9, 'world'], [10, 'world'], [11, 'world'],
  [12, 'compass'], [13, 'compass'], [14, 'compass'], [18, 'us_map'], [28, 'symbols'], [29, 'symbols'],
  [31, 'globe'], [32, 'globe'], [33, 'globe'], [34, 'globe'], [35, 'globe'],
  [42, 'world'], [43, 'world'], [44, 'world'], [45, 'world'],
  [47, 'compass'], [48, 'compass'], [49, 'compass'], [50, 'compass'],
  [51, 'us_map'], [52, 'us_map'], [56, 'symbols'], [57, 'symbols'], [58, 'symbols'],
  [63, 'globe'], [64, 'world'], [65, 'world'], [66, 'world'], [67, 'world'], [68, 'world'],
  [69, 'compass'], [70, 'compass'], [71, 'compass'], [78, 'symbols'], [79, 'symbols'],
]);

test('application routes separate the landing page, exam, and standalone map', async () => {
  const routeModule = await import('../src/lib/app-route.ts').catch(() => null);
  assert.ok(routeModule, 'expected an application route resolver module');
  assert.equal(routeModule.resolveAppRoute('/geography/', '/geography/'), 'home');
  assert.equal(routeModule.resolveAppRoute('/geography/exam/', '/geography/'), 'exam');
  assert.equal(routeModule.resolveAppRoute('/geography/map/', '/geography/'), 'map');
});

test('exam order uses a persisted Fisher-Yates permutation for the active attempt', async () => {
  const orderModule = await import('../src/lib/exam-order.ts').catch(() => null);
  assert.ok(orderModule, 'expected exam-order persistence helpers');

  const ids = [1, 2, 3, 4];
  const source = [...ids];
  const shuffled = orderModule.createExamOrder(ids, () => 0);
  assert.deepEqual(shuffled, [2, 3, 4, 1]);
  assert.deepEqual(ids, source, 'shuffle must not mutate the canonical question list');

  const storage = new MemoryStorage();
  const first = orderModule.loadExamOrder(storage, 'attempt-a', ids, () => 0);
  assert.deepEqual(first, [2, 3, 4, 1]);

  const restored = orderModule.loadExamOrder(storage, 'attempt-a', ids, () => {
    throw new Error('persisted order should be reused without reshuffling');
  });
  assert.deepEqual(restored, first);

  let randomCalls = 0;
  const nextAttempt = orderModule.loadExamOrder(storage, 'attempt-b', ids, () => {
    randomCalls += 1;
    return 0.5;
  });
  assert.equal(nextAttempt.length, ids.length);
  assert.ok(randomCalls > 0, 'new attempt must generate a new Math.random-driven permutation');
});

test('question visuals are an explicit opt-in contract rather than category defaults', async () => {
  const { questions } = await import('../src/data/questions.ts');
  const actual = new Map(questions.filter((question) => question.visualStage !== null).map((question) => [question.id, question.visualStage]));
  assert.deepEqual(actual, expectedVisuals);
  assert.equal(questions.find((question) => question.id === 3)?.visualStage, null);
  assert.equal(questions.find((question) => question.id === 30)?.visualStage, null);
  assert.equal(questions.find((question) => question.id === 60)?.visualStage, null);
});

test('GitHub Pages build has direct landing, exam, and map entry points', async () => {
  const [rootHtml, examHtml, mapHtml, viteSource, mainSource] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8').catch(() => ''),
    readFile(new URL('../exam/index.html', import.meta.url), 'utf8').catch(() => ''),
    readFile(new URL('../map/index.html', import.meta.url), 'utf8').catch(() => ''),
    readFile(new URL('../vite.config.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/main.tsx', import.meta.url), 'utf8'),
  ]);

  assert.match(rootHtml, /Geography Study Lab/);
  assert.match(examHtml, /Geography Exam/);
  assert.match(mapHtml, /Geography Map/);
  assert.match(viteSource, /exam\/index\.html/);
  assert.match(viteSource, /map\/index\.html/);
  assert.match(mainSource, /LandingPage/);
  assert.match(mainSource, /StandaloneMapPage/);
});

test('exam UI numbers by randomized position and gates visuals per question', async () => {
  const [appSource, panelSource] = await Promise.all([
    readFile(new URL('../src/App.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/QuestionPanel.tsx', import.meta.url), 'utf8'),
  ]);

  assert.match(appSource, /loadExamOrder/);
  assert.match(appSource, /current\.visualStage/);
  assert.match(appSource, /view === 'study' \|\| current\.visualStage !== null/);
  assert.match(panelSource, /Question \{position\}/);
  assert.doesNotMatch(panelSource, /Question \{question\.id\}/);
});
