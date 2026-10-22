import type { StorageLike } from './storage';

export const EXAM_ORDER_KEY = 'geography-exam-order-v1';
const VERSION = 1;

type RandomSource = () => number;

type StoredExamOrder = {
  version: number;
  attemptId: string;
  ids: number[];
};

export function createExamOrder(ids: readonly number[], random: RandomSource = Math.random): number[] {
  const order = [...ids];
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }
  return order;
}

function isExactOrder(candidate: unknown, validIds: readonly number[]): candidate is number[] {
  if (!Array.isArray(candidate) || candidate.length !== validIds.length) return false;
  const expected = new Set(validIds);
  if (expected.size !== validIds.length) return false;
  const seen = new Set<number>();
  for (const value of candidate) {
    if (!Number.isInteger(value) || !expected.has(value) || seen.has(value)) return false;
    seen.add(value);
  }
  return seen.size === expected.size;
}

export function parseExamOrder(raw: string | null, attemptId: string, validIds: readonly number[]): number[] | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<StoredExamOrder>;
    if (value.version !== VERSION || value.attemptId !== attemptId || !isExactOrder(value.ids, validIds)) return null;
    return [...value.ids];
  } catch {
    return null;
  }
}

function saveExamOrder(storage: StorageLike, attemptId: string, ids: readonly number[]): boolean {
  try {
    storage.setItem(EXAM_ORDER_KEY, JSON.stringify({ version: VERSION, attemptId, ids } satisfies StoredExamOrder));
    return true;
  } catch {
    return false;
  }
}

export function loadExamOrder(
  storage: StorageLike,
  attemptId: string,
  validIds: readonly number[],
  random: RandomSource = Math.random,
): number[] {
  try {
    const stored = parseExamOrder(storage.getItem(EXAM_ORDER_KEY), attemptId, validIds);
    if (stored) return stored;
  } catch {
    // Fall through to an in-memory order when storage cannot be read.
  }

  const order = createExamOrder(validIds, random);
  saveExamOrder(storage, attemptId, order);
  return order;
}
