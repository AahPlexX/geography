import assert from 'node:assert/strict';
import test from 'node:test';
import { applyAnswer, categoryCounts, filterQuestions, matchHotspot, scoreAnswers, validateQuestionBank } from '../src/lib/quiz.ts';
import { buildSpeechText } from '../src/lib/speech.ts';
import { loadStoredProgress, parseStoredProgress, saveStoredProgress, serializeStoredProgress, STORAGE_KEY } from '../src/lib/storage.ts';
import { parseUrlState, serializeUrlState } from '../src/lib/urlState.ts';
import type { AnswerMap, Question } from '../src/types.ts';

const question: Question = {
  id: 1,
  category: 'world',
  stage: 'world',
  interactiveTarget: 'Pacific Ocean',
  origin: 'Test fixture',
  question: 'Which ocean is shown?',
  options: [
    { text: 'Pacific Ocean', isCorrect: true, rationale: 'The Pacific Ocean is correct.' },
    { text: 'Atlantic Ocean', isCorrect: false, rationale: 'The Atlantic Ocean is not correct.' },
    { text: 'Indian Ocean', isCorrect: false, rationale: 'The Indian Ocean is not correct.' },
    { text: 'Arctic Ocean', isCorrect: false, rationale: 'The Arctic Ocean is not correct.' },
  ],
  hint: 'Look west of North America.',
};

const answerIndex = new Map([
  [1, new Map(question.options.map((option) => [option.text, option.isCorrect]))],
]);

test('fresh and mixed scores are derived from saved answers', () => {
  assert.deepEqual(scoreAnswers({}), { answered: 0, correct: 0, accuracy: 0 });
  const answers: AnswerMap = {
    1: { selectedText: 'A', isCorrect: true },
    2: { selectedText: 'B', isCorrect: true },
    3: { selectedText: 'C', isCorrect: false },
  };
  assert.deepEqual(scoreAnswers(answers), { answered: 3, correct: 2, accuracy: 67 });
});

test('answer replacement updates once and identical repeats are no-ops', () => {
  const first = applyAnswer({}, 0, question, 'Pacific Ocean');
  assert.equal(first.changed, true);
  assert.equal(first.streak, 1);
  assert.deepEqual(scoreAnswers(first.answers), { answered: 1, correct: 1, accuracy: 100 });

  const repeated = applyAnswer(first.answers, first.streak, question, 'Pacific Ocean');
  assert.equal(repeated.changed, false);
  assert.strictEqual(repeated.answers, first.answers);
  assert.equal(repeated.streak, 1);

  const replaced = applyAnswer(first.answers, first.streak, question, 'Atlantic Ocean');
  assert.equal(replaced.changed, true);
  assert.equal(replaced.streak, 0);
  assert.deepEqual(scoreAnswers(replaced.answers), { answered: 1, correct: 0, accuracy: 0 });
});

test('unknown answer text cannot mutate quiz state', () => {
  const answers: AnswerMap = { 1: { selectedText: 'Pacific Ocean', isCorrect: true } };
  const result = applyAnswer(answers, 1, question, 'Not an option');
  assert.equal(result.changed, false);
  assert.strictEqual(result.answers, answers);
  assert.equal(result.streak, 1);
});

test('filters and category counts use the question data', () => {
  const questions = [
    question,
    { ...question, id: 2, category: 'globe' as const },
    { ...question, id: 3, category: 'world' as const },
  ];
  assert.deepEqual(filterQuestions(questions, 'world').map(({ id }) => id), [1, 3]);
  assert.deepEqual(filterQuestions(questions, 'all').map(({ id }) => id), [1, 2, 3]);
  assert.deepEqual(categoryCounts(questions), { globe: 1, world: 2, compass: 0, us_regions: 0, symbols: 0 });
});

test('hotspot matching resolves exact, fuzzy, target-only, and unrelated selections', () => {
  assert.equal(matchHotspot(question, 'Pacific Ocean')?.text, 'Pacific Ocean');
  assert.equal(matchHotspot(question, 'Pacific')?.text, 'Pacific Ocean');

  const targetOnly = { ...question, interactiveTarget: 'bottom globe' };
  assert.equal(matchHotspot(targetOnly, 'bottom globe')?.text, 'Pacific Ocean');
  assert.equal(matchHotspot(question, 'Great Lakes'), null);
});

test('question-bank validation rejects duplicate IDs and invalid option contracts', () => {
  assert.equal(validateQuestionBank([question]), true);
  assert.throws(() => validateQuestionBank([question, question]), /Duplicate question id/);
  assert.throws(() => validateQuestionBank([{ ...question, id: 2, options: question.options.slice(0, 3) }]), /must have four options/);
  assert.throws(() => validateQuestionBank([{ ...question, id: 2, options: question.options.map((option) => ({ ...option, isCorrect: false })) }]), /exactly one correct answer/);
});

test('extended URL state round-trips losslessly', () => {
  const state = {
    topic: 'world' as const,
    view: 'study' as const,
    questionId: 7,
    hintOpen: true,
    questionMapOpen: true,
    mapPage: 2,
    stage: 'world' as const,
  };
  const encoded = serializeUrlState(state);
  assert.deepEqual(parseUrlState(encoded, new Set([1, 7])), state);
});

test('invalid URL state falls back to safe defaults', () => {
  assert.deepEqual(
    parseUrlState('?topic=nope&view=nope&q=999&hint=yes&jump=yes&page=-2&stage=nope', new Set([10, 3])),
    { topic: 'all', view: 'practice', questionId: 3, hintOpen: false, questionMapOpen: false, mapPage: 1, stage: null },
  );
});

test('stored progress is versioned, validated, and correctness is re-derived', () => {
  const raw = JSON.stringify({
    version: 1,
    answers: {
      1: { selectedText: 'Pacific Ocean', isCorrect: false },
      2: { selectedText: 'Unknown', isCorrect: true },
    },
    streak: 9,
  });
  assert.deepEqual(parseStoredProgress(raw, answerIndex), {
    answers: { 1: { selectedText: 'Pacific Ocean', isCorrect: true } },
    streak: 1,
  });
  assert.deepEqual(parseStoredProgress('{bad json', answerIndex), { answers: {}, streak: 0 });
  assert.deepEqual(parseStoredProgress(JSON.stringify({ version: 2, answers: {}, streak: 1 }), answerIndex), { answers: {}, streak: 0 });
});

test('storage helpers round-trip and fail soft when browser storage throws', () => {
  let stored: string | null = null;
  const storage = {
    getItem: (key: string) => key === STORAGE_KEY ? stored : null,
    setItem: (key: string, value: string) => { if (key === STORAGE_KEY) stored = value; },
  };
  const progress = { answers: { 1: { selectedText: 'Pacific Ocean', isCorrect: true } }, streak: 1 };
  assert.equal(saveStoredProgress(storage, progress), true);
  assert.equal(stored, serializeStoredProgress(progress));
  assert.deepEqual(loadStoredProgress(storage, answerIndex), progress);

  const brokenStorage = {
    getItem: () => { throw new Error('blocked'); },
    setItem: () => { throw new Error('blocked'); },
  };
  assert.deepEqual(loadStoredProgress(brokenStorage, answerIndex), { answers: {}, streak: 0 });
  assert.equal(saveStoredProgress(brokenStorage, progress), false);
});

test('speech text contains the question and all four labeled choices', () => {
  const spoken = buildSpeechText(question);
  assert.match(spoken, /Which ocean is shown\?/);
  assert.match(spoken, /Choice A: Pacific Ocean\./);
  assert.match(spoken, /Choice B: Atlantic Ocean\./);
  assert.match(spoken, /Choice C: Indian Ocean\./);
  assert.match(spoken, /Choice D: Arctic Ocean\./);
});
