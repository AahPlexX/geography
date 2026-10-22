import type { Question } from '../types';

export function buildSpeechText(question: Question) {
  const letters = ['A', 'B', 'C', 'D'];
  return `${question.question} ${question.options.map((option, index) => `Choice ${letters[index]}: ${option.text}.`).join(' ')}`;
}
