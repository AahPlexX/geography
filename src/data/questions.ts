import type { Question } from '../types.ts';
import { compassQuestions } from './compass.ts';
import { extraQuestions } from './extra.ts';
import { globeQuestions } from './globe.ts';
import { visualStageForQuestion } from './question-visuals.ts';
import { symbolQuestions } from './symbols.ts';
import { usExpandedQuestions } from './us-expanded.ts';
import { usOriginalQuestionsA } from './us-original-a.ts';
import { usOriginalQuestionsB } from './us-original-b.ts';
import { worldExpandedQuestions } from './world-expanded.ts';
import { worldOriginalQuestions } from './world-original.ts';

const sourceQuestions = [
  ...globeQuestions,
  ...worldOriginalQuestions,
  ...compassQuestions,
  ...usOriginalQuestionsA,
  ...usOriginalQuestionsB,
  ...symbolQuestions,
  ...worldExpandedQuestions,
  ...usExpandedQuestions,
  ...extraQuestions,
].sort((a, b) => a.id - b.id);

export const questions: readonly Question[] = sourceQuestions.map((question) => ({
  ...question,
  visualStage: visualStageForQuestion(question.id),
}));
