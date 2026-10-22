import type { Question } from '../types';
import { compassQuestions } from './compass';
import { extraQuestions } from './extra';
import { globeQuestions } from './globe';
import { visualStageForQuestion } from './question-visuals';
import { symbolQuestions } from './symbols';
import { usExpandedQuestions } from './us-expanded';
import { usOriginalQuestionsA } from './us-original-a';
import { usOriginalQuestionsB } from './us-original-b';
import { worldExpandedQuestions } from './world-expanded';
import { worldOriginalQuestions } from './world-original';

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
