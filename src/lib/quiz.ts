import type { AnswerMap, Category, Question, SavedAnswer, Topic } from '../types';

export function filterQuestions<T extends Pick<Question, 'category'>>(questions: readonly T[], category: Topic): T[] {
  return category === 'all' ? [...questions] : questions.filter((question) => question.category === category);
}

export function scoreAnswers(answers: AnswerMap) {
  const values = Object.values(answers);
  const correct = values.filter((answer) => answer.isCorrect).length;
  return {
    answered: values.length,
    correct,
    accuracy: values.length === 0 ? 0 : Math.round((correct / values.length) * 100),
  };
}

export function validateQuestionBank(questions: readonly Question[]) {
  const ids = new Set<number>();
  for (const question of questions) {
    if (!Number.isInteger(question.id) || question.id < 1) throw new Error(`Invalid question id: ${question.id}`);
    if (ids.has(question.id)) throw new Error(`Duplicate question id: ${question.id}`);
    ids.add(question.id);
    if (question.options.length !== 4) throw new Error(`Question ${question.id} must have four options.`);
    if (question.options.filter((option) => option.isCorrect).length !== 1) throw new Error(`Question ${question.id} must have exactly one correct answer.`);
  }
  return true;
}

export function normalizeAnswer(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function matchHotspot(question: Pick<Question, 'options' | 'interactiveTarget'>, hotspotName: string) {
  const target = normalizeAnswer(hotspotName);
  const exact = question.options.find((option) => normalizeAnswer(option.text) === target);
  if (exact) return exact;
  const fuzzy = question.options.find((option) => {
    const normalized = normalizeAnswer(option.text);
    return normalized.includes(target) || target.includes(normalized);
  });
  if (fuzzy) return fuzzy;
  if (question.interactiveTarget && normalizeAnswer(question.interactiveTarget) === target) {
    return question.options.find((option) => option.isCorrect) ?? null;
  }
  return null;
}

export function applyAnswer(answers: AnswerMap, streak: number, question: Question, selectedText: string) {
  const chosen = question.options.find((option) => option.text === selectedText);
  if (!chosen) return { answers, streak, changed: false };
  const previous = answers[question.id];
  if (previous?.selectedText === selectedText) return { answers, streak, changed: false };
  const saved: SavedAnswer = { selectedText, isCorrect: chosen.isCorrect };
  return {
    answers: { ...answers, [question.id]: saved },
    streak: chosen.isCorrect ? streak + 1 : 0,
    changed: true,
  };
}

export const categoryCounts = (questions: readonly Pick<Question, 'category'>[]): Record<Category, number> => ({
  globe: questions.filter((q) => q.category === 'globe').length,
  world: questions.filter((q) => q.category === 'world').length,
  compass: questions.filter((q) => q.category === 'compass').length,
  us_regions: questions.filter((q) => q.category === 'us_regions').length,
  symbols: questions.filter((q) => q.category === 'symbols').length,
});
