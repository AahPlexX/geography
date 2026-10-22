import type { AnswerOption, Question, SavedAnswer } from '../types';

type Props = {
  question: Question;
  saved?: SavedAnswer;
  position: number;
  total: number;
  hintOpen: boolean;
  speechSupported: boolean;
  onToggleHint: () => void;
  onSpeak: () => void;
  onAnswer: (text: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  atFirst: boolean;
  atLast: boolean;
};

type AnswerState = 'open' | 'correct' | 'wrong' | 'muted';

const categoryLabels = {
  globe: 'Parts of a globe',
  world: 'Continents and oceans',
  compass: 'Compass rose',
  us_regions: 'U.S. regions and features',
  symbols: 'National symbols',
} as const;

const ANSWER_LETTERS = ['A', 'B', 'C', 'D'] as const;

function answerState(option: AnswerOption, saved: SavedAnswer | undefined): AnswerState {
  if (!saved) return 'open';
  if (option.isCorrect) return 'correct';
  return saved.selectedText === option.text ? 'wrong' : 'muted';
}

export function QuestionPanel({ question, saved, position, total, hintOpen, speechSupported, onToggleHint, onSpeak, onAnswer, onPrevious, onNext, atFirst, atLast }: Props) {
  const correct = question.options.find((option) => option.isCorrect);
  const chosen = saved ? question.options.find((option) => option.text === saved.selectedText) : undefined;

  return (
    <section className="question-panel" aria-labelledby="question-title">
      <div className="question-meta">
        <span className="question-number">Question {question.id}</span>
        <span className="topic-name">{categoryLabels[question.category]}</span>
        <span className="sequence-position">{position} of {total}</span>
      </div>

      <h2 id="question-title">{question.question}</h2>

      <div className="question-tools">
        <button type="button" className="quiet-button" onClick={onToggleHint} aria-expanded={hintOpen} aria-controls={hintOpen ? 'question-hint' : undefined}>
          {hintOpen ? 'Hide hint' : 'Show hint'}
        </button>
        <button type="button" className="quiet-button" onClick={onSpeak} disabled={!speechSupported} title={speechSupported ? 'Read the question and choices aloud' : 'Read aloud is not supported in this browser'}>
          Read question aloud
        </button>
      </div>

      {hintOpen && <aside id="question-hint" className="hint-box"><strong>Hint:</strong> {question.hint}</aside>}

      <div className="answer-list" role="group" aria-label="Answer choices">
        {question.options.map((option, index) => {
          const selected = saved?.selectedText === option.text;
          const state = answerState(option, saved);
          return (
            <button
              key={option.text}
              type="button"
              className={`answer-option answer-option--${state}`}
              onClick={() => onAnswer(option.text)}
              aria-pressed={selected}
            >
              <span className="answer-letter" aria-hidden="true">{ANSWER_LETTERS[index]}</span>
              <span>{option.text}</span>
              {saved && option.isCorrect && <span className="answer-state">Correct</span>}
              {saved && selected && !option.isCorrect && <span className="answer-state">Your answer</span>}
            </button>
          );
        })}
      </div>

      <div className="feedback" aria-live="polite">
        {saved?.isCorrect && (
          <div className="feedback-box feedback-box--correct">
            <strong>Correct.</strong> {correct?.rationale}
          </div>
        )}
        {saved && !saved.isCorrect && (
          <div className="feedback-box feedback-box--wrong">
            <p><strong>Try again.</strong> {chosen?.rationale}</p>
            {correct && <p><strong>Correct answer: {correct.text}.</strong> {correct.rationale}</p>}
          </div>
        )}
      </div>

      <footer className="question-footer">
        <button type="button" className="secondary-button" onClick={onPrevious} disabled={atFirst}>Previous question</button>
        <span style={{ color: '#5f7385' }}>{question.origin}</span>
        <button type="button" className="primary-button" onClick={onNext}>{atLast ? 'View report card' : 'Next question'}</button>
      </footer>
    </section>
  );
}
