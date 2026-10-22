import assert from 'node:assert/strict';
import test from 'node:test';
import { appendScoreRecord, ATTEMPT_KEY, createScoreRecord, loadAttemptId, loadScoreHistory, parseScoreHistory, saveScoreHistory, SCORE_HISTORY_KEY, startNewAttempt } from '../src/lib/storage.ts';

test('an early 3-of-80 perfect attempt records 100% while preserving attempted count', () => {
  const record = createScoreRecord({ answered: 3, correct: 3, accuracy: 100 }, 80, 'early', 'attempt-1', '2026-10-22T14:00:00.000Z');
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

test('score percentage is derived from questions actually answered', () => {
  assert.equal(createScoreRecord({ answered: 4, correct: 3, accuracy: 0 }, 80, 'early', 'attempt-1', '2026-10-22T14:00:00.000Z')?.accuracy, 75);
});

test('score records reject empty or incorrectly classified submissions', () => {
  assert.equal(createScoreRecord({ answered: 0, correct: 0, accuracy: 0 }, 80, 'early', 'attempt-1', '2026-10-22T14:00:00.000Z'), null);
  assert.equal(createScoreRecord({ answered: 79, correct: 79, accuracy: 100 }, 80, 'completed', 'attempt-1', '2026-10-22T14:00:00.000Z'), null);
  assert.equal(createScoreRecord({ answered: 80, correct: 80, accuracy: 100 }, 80, 'early', 'attempt-1', '2026-10-22T14:00:00.000Z'), null);
});

test('history deduplicates the same submission kind within an attempt but allows early then completed', () => {
  const early = createScoreRecord({ answered: 3, correct: 3, accuracy: 100 }, 80, 'early', 'attempt-1', '2026-10-22T14:00:00.000Z');
  const complete = createScoreRecord({ answered: 80, correct: 72, accuracy: 90 }, 80, 'completed', 'attempt-1', '2026-10-22T15:00:00.000Z');
  assert.ok(early);
  assert.ok(complete);
  const once = appendScoreRecord([], early);
  const duplicate = appendScoreRecord(once, early);
  assert.strictEqual(duplicate, once);
  assert.deepEqual(appendScoreRecord(once, complete), [complete, early]);
});

test('score history round-trips, rejects malformed records, and fails soft when storage is unavailable', () => {
  const record = createScoreRecord({ answered: 3, correct: 2, accuracy: 67 }, 80, 'early', 'attempt-1', '2026-10-22T14:00:00.000Z');
  assert.ok(record);
  let stored: string | null = null;
  const storage = {
    getItem: (key: string) => key === SCORE_HISTORY_KEY ? stored : null,
    setItem: (key: string, value: string) => { if (key === SCORE_HISTORY_KEY) stored = value; },
  };
  assert.equal(saveScoreHistory(storage, [record]), true);
  assert.deepEqual(loadScoreHistory(storage), [record]);
  assert.deepEqual(parseScoreHistory('{bad json'), []);
  assert.deepEqual(parseScoreHistory(JSON.stringify({ version: 1, entries: [{ ...record, accuracy: 100 }] })), []);

  const brokenStorage = {
    getItem: () => { throw new Error('blocked'); },
    setItem: () => { throw new Error('blocked'); },
  };
  assert.deepEqual(loadScoreHistory(brokenStorage), []);
  assert.equal(saveScoreHistory(brokenStorage, [record]), false);
});

test('attempt identifiers persist until reset starts a new attempt', () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
  };
  assert.equal(loadAttemptId(storage, () => 'attempt-1'), 'attempt-1');
  assert.equal(values.get(ATTEMPT_KEY), 'attempt-1');
  assert.equal(loadAttemptId(storage, () => 'should-not-be-used'), 'attempt-1');
  assert.equal(startNewAttempt(storage, () => 'attempt-2'), 'attempt-2');
  assert.equal(loadAttemptId(storage, () => 'should-not-be-used'), 'attempt-2');
});
