import type { AnswerMap } from '../types.ts';

export const STORAGE_KEY = 'geography-study-progress-v1';
const VERSION = 1;
export type StoredProgress = { answers: AnswerMap; streak: number };
export type AnswerIndex = ReadonlyMap<number, ReadonlyMap<string, boolean>>;

export type StorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

const empty = (): StoredProgress => ({ answers: {}, streak: 0 });

export function serializeStoredProgress(progress: StoredProgress) {
  return JSON.stringify({ version: VERSION, ...progress });
}

export function parseStoredProgress(raw: string | null, answerIndex: AnswerIndex): StoredProgress {
  if (!raw) return empty();
  try {
    const value = JSON.parse(raw) as { version?: unknown; answers?: unknown; streak?: unknown };
    if (value.version !== VERSION || !value.answers || typeof value.answers !== 'object') return empty();
    const answers: AnswerMap = {};
    for (const [idText, answer] of Object.entries(value.answers)) {
      const id = Number(idText);
      const options = answerIndex.get(id);
      if (!options || !answer || typeof answer !== 'object') continue;
      const candidate = answer as { selectedText?: unknown };
      if (typeof candidate.selectedText !== 'string' || !options.has(candidate.selectedText)) continue;
      answers[id] = { selectedText: candidate.selectedText, isCorrect: options.get(candidate.selectedText) === true };
    }
    const answered = Object.values(answers);
    if (answered.length === 0) return empty();
    const correct = answered.filter((answer) => answer.isCorrect).length;
    const storedStreak = typeof value.streak === 'number' && Number.isInteger(value.streak) && value.streak >= 0 ? value.streak : 0;
    return { answers, streak: Math.min(storedStreak, correct) };
  } catch {
    return empty();
  }
}

export function loadStoredProgress(storage: StorageLike, answerIndex: AnswerIndex): StoredProgress {
  try {
    return parseStoredProgress(storage.getItem(STORAGE_KEY), answerIndex);
  } catch {
    return empty();
  }
}

export function saveStoredProgress(storage: StorageLike, progress: StoredProgress): boolean {
  try {
    storage.setItem(STORAGE_KEY, serializeStoredProgress(progress));
    return true;
  } catch {
    return false;
  }
}
