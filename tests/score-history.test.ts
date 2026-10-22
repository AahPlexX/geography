import assert from 'node:assert/strict';
import test from 'node:test';
import * as storageModule from '../src/lib/storage.ts';

type ScoreApi = {
  SCORE_HISTORY_KEY: string;
  ATTEMPT_KEY: string;
  createScoreRecord: (score: { answered: number; correct: number; accuracy: number }, total: number, kind: 'early' | 'completed', attemptId: string, submittedAt: string) => unknown;
  appendScoreRecord: (history: unknown[], record: unknown) => unknown[];
  parseScoreHistory: (raw: string | null) => unknown[];
  loadScoreHistory: (storage: { getItem(key: string): string | null; setItem(key: string, value: string): void }) => unknown[];
  saveScoreHistory: (storage: { getItem(key: string): string | null; setItem(key: string, value: string): void }, history: unknown[]) => boolean;
  loadAttemptId: (storage: { getItem(key: string): string | null; setItem(key: string, value: string): void }, createId: () => string) => string;
  startNewAttempt: (storage: { getItem(key: string): string | null; setItem(key: string, value: string): void }, createId: () => string) => string;
};

const api = storageModule as unknown as Partial<ScoreApi>;

test('score-history storage contract is exposed', () => {
  for (const name of ['createScoreRecord', 'appendScoreRecord', 'parseScoreHistory', 'loadScoreHistory', 'saveScoreHistory', 'loadAttemptId', 'startNewAttempt'] as const) {
    assert.equal(typeof api[name], 'function', `${name} must be implemented`);
  }
  assert.equal(typeof api.SCORE_HISTORY_KEY, 'string');
  assert.equal(typeof api.ATTEMPT_KEY, 'string');
});

test('an early 3-of-80 perfect attempt records 100% while preserving attempted count', () => {
  assert.equal(typeof api.createScoreRecord, 'function');
  const record = api.createScoreRecord!({ answered: 3, correct: 3, accuracy: 100 }, 80, 'early', 'attempt-1', '2026-10-22T14:00:00.000Z');
  assert.deepEqual(record, {
    attemptId: 'attempt-1',
    kind: 'early',
    answered: 3,
    total: 80,
    correct: 3,
    accuracy: 100,
    submittedAt: '2026-10-22T14:00:00.000Z',
  });
});

test('score records reject empty or incorrectly classified submissions', () => {
  assert.equal(typeof api.createScoreRecord, 'function');
  assert.equal(api.createScoreRecord!({ answered: 0, correct: 0, accuracy: 0 }, 80, 'early', 'attempt-1', '2026-10-22T14:00:00.000Z'), null);
  assert.equal(api.createScoreRecord!({ answered: 79, correct: 79, accuracy: 100 }, 80, 'completed', 'attempt-1', '2026-10-22T14:00:00.000Z'), null);
  assert.equal(api.createScoreRecord!({ answered: 80, correct: 80, accuracy: 100 }, 80, 'early', 'attempt-1', '2026-10-22T14:00:00.000Z'), null);
});

test('history deduplicates the same submission kind within an attempt but allows early then completed', () => {
  assert.equal(typeof api.createScoreRecord, 'function');
  assert.equal(typeof api.appendScoreRecord, 'function');
  const early = api.createScoreRecord!({ answered: 3, correct: 3, accuracy: 100 }, 80, 'early', 'attempt-1', '2026-10-22T14:00:00.000Z');
  const complete = api.createScoreRecord!({ answered: 80, correct: 72, accuracy: 90 }, 80, 'completed', 'attempt-1', '2026-10-22T15:00:00.000Z');
  assert.ok(early);
  assert.ok(complete);
  const once = api.appendScoreRecord!([], early);
  const duplicate = api.appendScoreRecord!(once, early);
  assert.strictEqual(duplicate, once);
  assert.deepEqual(api.appendScoreRecord!(once, complete), [complete, early]);
});

test('attempt identifiers persist until reset starts a new attempt', () => {
  assert.equal(typeof api.loadAttemptId, 'function');
  assert.equal(typeof api.startNewAttempt, 'function');
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
  };
  assert.equal(api.loadAttemptId!(storage, () => 'attempt-1'), 'attempt-1');
  assert.equal(api.loadAttemptId!(storage, () => 'should-not-be-used'), 'attempt-1');
  assert.equal(api.startNewAttempt!(storage, () => 'attempt-2'), 'attempt-2');
  assert.equal(api.loadAttemptId!(storage, () => 'should-not-be-used'), 'attempt-2');
});
