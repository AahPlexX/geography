export type Category = 'globe' | 'world' | 'compass' | 'us_regions' | 'symbols';
export type Topic = 'all' | Category;
export type Stage = 'globe' | 'world' | 'compass' | 'us_map' | 'symbols';
export type ViewMode = 'practice' | 'quiz' | 'study';

export type AnswerOption = {
  text: string;
  isCorrect: boolean;
  rationale: string;
};

export type Question = {
  id: number;
  category: Category;
  stage: Stage;
  visualStage?: Stage | null;
  interactiveTarget: string | null;
  origin: string;
  question: string;
  options: readonly AnswerOption[];
  hint: string;
};

export type SavedAnswer = {
  selectedText: string;
  isCorrect: boolean;
};

export type AnswerMap = Record<number, SavedAnswer>;
