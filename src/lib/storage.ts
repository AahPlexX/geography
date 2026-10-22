import type { AnswerMap } from '../types.ts';

export const STORAGE_KEY = 'geography-study-progress-v1';
export const SCORE_HISTORY_KEY = 'geography-score-history-v1';
export const ATTEMPT_KEY = 'geography-study-attempt-v1';
const VERSION = 1;
const SCORE_HISTORY_VERSION = 1;
export type StoredProgress = { answers: AnswerMap; streak: number };
export type AnswerIndex = ReadonlyMap<number, ReadonlyMap<string, boolean>>;
export type ScoreSubmissionKind = 'early' | 'completed';
export type ScoreRecord = {
  attemptId: string;
  kind: ScoreSubmissionKind;
  answered: number;
  total: number;
  correct: number;
  accuracy: number;
  submittedAt: string;
};

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

export function createScoreRecord(
  score: { answered: number; correct: number; accuracy: number },
  total: number,
  kind: ScoreSubmissionKind,
  attemptId: string,
  submittedAt: string,
): ScoreRecord | null {
  if (!Number.isInteger(total) || total < 1) return null;
  if (!Number.isInteger(score.answered) || score.answered < 1 || score.answered > total) return null;
  if (!Number.isInteger(score.correct) || score.correct < 0 || score.correct > score.answered) return null;
  if (kind === 'early' && score.answered >= total) return null;
  if (kind === 'completed' && score.answered !== total) return null;
  if (!attemptId.trim() || Number.isNaN(Date.parse(submittedAt))) return null;
  return {
    attemptId,
    kind,
    answered: score.answered,
    total,
    correct: score.correct,
    accuracy: Math.round((score.correct / score.answered) * 100),
    submittedAt,
  };
}

export function appendScoreRecord(history: ScoreRecord[], record: ScoreRecord): ScoreRecord[] {
  if (history.some((entry) => entry.attemptId === record.attemptId && entry.kind === record.kind)) return history;
  return [record, ...history];
}

export function serializeScoreHistory(history: readonly ScoreRecord[]) {
  return JSON.stringify({ version: SCORE_HISTORY_VERSION, entries: history });
}

export function parseScoreHistory(raw: string | null): ScoreRecord[] {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw) as { version?: unknown; entries?: unknown };
    if (value.version !== SCORE_HISTORY_VERSION || !Array.isArray(value.entries)) return [];
    const history: ScoreRecord[] = [];
    for (const entry of value.entries) {
      if (!entry || typeof entry !== 'object') continue;
      const candidate = entry as Partial<ScoreRecord>;
      if ((candidate.kind !== 'early' && candidate.kind !== 'completed') || typeof candidate.attemptId !== 'string' || typeof candidate.submittedAt !== 'string') continue;
      if (typeof candidate.answered !== 'number' || typeof candidate.total !== 'number' || typeof candidate.correct !== 'number' || typeof candidate.accuracy !== 'number') continue;
      const record = createScoreRecord(candidate as { answered: number; correct: number; accuracy: number }, candidate.total, candidate.kind, candidate.attemptId, candidate.submittedAt);
      if (!record || candidate.accuracy !== record.accuracy) continue;
      if (!history.some((saved) => saved.attemptId === record.attemptId && saved.kind === record.kind)) history.push(record);
    }
    return history;
  } catch {
    return [];
  }
}

export function loadScoreHistory(storage: StorageLike): ScoreRecord[] {
  try {
    return parseScoreHistory(storage.getItem(SCORE_HISTORY_KEY));
  } catch {
    return [];
  }
}

export function saveScoreHistory(storage: StorageLike, history: readonly ScoreRecord[]): boolean {
  try {
    storage.setItem(SCORE_HISTORY_KEY, serializeScoreHistory(history));
    return true;
  } catch {
    return false;
  }
}

export function loadAttemptId(storage: StorageLike, createId: () => string): string {
  try {
    const stored = storage.getItem(ATTEMPT_KEY);
    if (stored?.trim()) return stored;
  } catch {
    // Fall through and keep the generated in-memory attempt usable.
  }
  return startNewAttempt(storage, createId);
}

export function startNewAttempt(storage: StorageLike, createId: () => string): string {
  const attemptId = createId();
  try {
    storage.setItem(ATTEMPT_KEY, attemptId);
  } catch {
    // Browser storage can be unavailable; the active attempt still works in memory.
  }
  return attemptId;
}
