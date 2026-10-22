import type { Stage, Topic, ViewMode } from '../types';

const topics = new Set<Topic>(['all', 'globe', 'world', 'compass', 'us_regions', 'symbols']);
const views = new Set<ViewMode>(['practice', 'quiz', 'study']);
const stages = new Set<Stage>(['globe', 'world', 'compass', 'us_map', 'symbols']);

export type UrlState = {
  topic: Topic;
  view: ViewMode;
  questionId: number;
  hintOpen: boolean;
  questionMapOpen: boolean;
  mapPage: number;
  stage: Stage | null;
};

export function parseUrlState(search: string, validQuestionIds: ReadonlySet<number>): UrlState {
  const params = new URLSearchParams(search);
  const topicValue = params.get('topic') as Topic | null;
  const viewValue = params.get('view') as ViewMode | null;
  const stageValue = params.get('stage') as Stage | null;
  const parsedQuestion = Number(params.get('q'));
  const parsedPage = Number(params.get('page'));
  const firstId = [...validQuestionIds].sort((a, b) => a - b)[0] ?? 1;
  return {
    topic: topicValue && topics.has(topicValue) ? topicValue : 'all',
    view: viewValue && views.has(viewValue) ? viewValue : 'practice',
    questionId: validQuestionIds.has(parsedQuestion) ? parsedQuestion : firstId,
    hintOpen: params.get('hint') === '1',
    questionMapOpen: params.get('jump') === '1',
    mapPage: Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1,
    stage: stageValue && stages.has(stageValue) ? stageValue : null,
  };
}

export function serializeUrlState(state: UrlState) {
  const params = new URLSearchParams();
  if (state.topic !== 'all') params.set('topic', state.topic);
  if (state.view !== 'practice') params.set('view', state.view);
  params.set('q', String(state.questionId));
  if (state.hintOpen) params.set('hint', '1');
  if (state.questionMapOpen) params.set('jump', '1');
  if (state.mapPage > 1) params.set('page', String(state.mapPage));
  if (state.stage) params.set('stage', state.stage);
  return `?${params.toString()}`;
}
