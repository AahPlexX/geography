import type { Question } from '../types';
import { compassQuestions } from './compass';
import { globeQuestions } from './globe';
import { symbolQuestions } from './symbols';
import { usExpandedQuestions } from './us-expanded';
import { usOriginalQuestionsA } from './us-original-a';
import { usOriginalQuestionsB } from './us-original-b';
import { worldExpandedQuestions } from './world-expanded';
import { worldOriginalQuestions } from './world-original';

export const questions: readonly Question[] = [
  ...globeQuestions,
  ...worldOriginalQuestions,
  ...compassQuestions,
  ...usOriginalQuestionsA,
  ...usOriginalQuestionsB,
  ...symbolQuestions,
  ...worldExpandedQuestions,
  ...usExpandedQuestions,
].sort((a, b) => a.id - b.id);
