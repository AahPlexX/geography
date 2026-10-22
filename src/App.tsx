import { useEffect, useMemo, useRef, useState } from 'react';
import { QuestionPanel } from './components/QuestionPanel';
import { StudyReference } from './components/StudyReference';
import { StudyStage } from './components/StudyStage';
import { questions } from './data/questions';
import { applyAnswer, categoryCounts, filterQuestions, matchHotspot, scoreAnswers, validateQuestionBank } from './lib/quiz';
import { buildSpeechText } from './lib/speech';
import { loadStoredProgress, saveStoredProgress } from './lib/storage';
import { parseUrlState, serializeUrlState } from './lib/urlState';
import type { AnswerMap, Stage, Topic, ViewMode } from './types';

validateQuestionBank(questions);

const QUESTION_MAP_PAGE_SIZE = 20;
const validQuestionIds = new Set(questions.map((question) => question.id));
const answerIndex = new Map(questions.map((question) => [question.id, new Map(question.options.map((option) => [option.text, option.isCorrect]))]));
const counts = categoryCounts(questions);

const topicChoices: Array<{ key: Topic; label: string }> = [
  { key: 'all', label: 'All questions' },
  { key: 'globe', label: 'Parts of a globe' },
  { key: 'world', label: 'Continents and oceans' },
  { key: 'compass', label: 'Compass rose' },
  { key: 'us_regions', label: 'U.S. regions and features' },
  { key: 'symbols', label: 'National symbols' },
];

const stageChoices: Array<{ key: Stage; label: string }> = [
  { key: 'world', label: 'World map' },
  { key: 'globe', label: 'Hemispheres' },
  { key: 'compass', label: 'Compass' },
  { key: 'us_map', label: 'U.S. regions' },
  { key: 'symbols', label: 'Symbols' },
];

const viewChoices: Array<{ key: ViewMode; label: string }> = [
  { key: 'practice', label: 'Practice' },
  { key: 'quiz', label: 'Quiz focus' },
  { key: 'study', label: 'Study sheet' },
];

const scoreMessage = (answered: number, accuracy: number) => {
  if (answered === 0) return 'Choose a question to begin.';
  if (accuracy >= 90) return 'Excellent recall. Review any missed questions once more before the test.';
  if (accuracy >= 75) return 'Strong progress. Revisit the questions marked for another try.';
  return 'Keep practicing. Use the hint and study diagram when a question feels uncertain.';
};

export function App() {
  const initialUrl = useMemo(() => parseUrlState(window.location.search, validQuestionIds), []);
  const initialProgress = useMemo(() => loadStoredProgress(window.localStorage, answerIndex), []);
  const [topic, setTopic] = useState<Topic>(initialUrl.topic);
  const [view, setView] = useState<ViewMode>(initialUrl.view);
  const [questionId, setQuestionId] = useState(initialUrl.questionId);
  const [hintOpen, setHintOpen] = useState(initialUrl.hintOpen);
  const [questionMapOpen, setQuestionMapOpen] = useState(initialUrl.questionMapOpen);
  const [mapPage, setMapPage] = useState(initialUrl.mapPage);
  const [stageOverride, setStageOverride] = useState<Stage | null>(initialUrl.stage);
  const [answers, setAnswers] = useState<AnswerMap>(initialProgress.answers);
  const [streak, setStreak] = useState(initialProgress.streak);
  const [hotspotState, setHotspotState] = useState<{ name: string; correct: boolean } | null>(null);
  const [mapNudge, setMapNudge] = useState('');
  const [reportOpen, setReportOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const reportDialog = useRef<HTMLDialogElement>(null);
  const resetDialog = useRef<HTMLDialogElement>(null);

  const filtered = useMemo(() => filterQuestions(questions, topic), [topic]);
  const currentIndex = Math.max(0, filtered.findIndex((question) => question.id === questionId));
  const current = filtered[currentIndex] ?? filtered[0] ?? questions[0];
  const stage = stageOverride ?? current.stage;
  const score = useMemo(() => scoreAnswers(answers), [answers]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / QUESTION_MAP_PAGE_SIZE));
  const safeMapPage = Math.min(mapPage, totalPages);
  const visibleJumpQuestions = filtered.slice((safeMapPage - 1) * QUESTION_MAP_PAGE_SIZE, safeMapPage * QUESTION_MAP_PAGE_SIZE);
  const speechSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

  useEffect(() => {
    if (!filtered.some((question) => question.id === questionId)) {
      setQuestionId(filtered[0]?.id ?? 1);
    }
  }, [filtered, questionId]);

  useEffect(() => {
    const nextUrl = serializeUrlState({
      topic,
      view,
      questionId: current.id,
      hintOpen,
      questionMapOpen,
      mapPage: safeMapPage,
      stage: stageOverride,
    });
    window.history.replaceState(null, '', `${window.location.pathname}${nextUrl}${window.location.hash}`);
  }, [topic, view, current.id, hintOpen, questionMapOpen, safeMapPage, stageOverride]);

  useEffect(() => {
    saveStoredProgress(window.localStorage, { answers, streak });
  }, [answers, streak]);

  useEffect(() => {
    setHotspotState(null);
    setMapNudge('');
    setHintOpen(false);
  }, [current.id]);

  useEffect(() => {
    const dialog = reportDialog.current;
    if (!dialog) return;
    if (reportOpen && !dialog.open) dialog.showModal();
    if (!reportOpen && dialog.open) dialog.close();
  }, [reportOpen]);

  useEffect(() => {
    const dialog = resetDialog.current;
    if (!dialog) return;
    if (resetOpen && !dialog.open) dialog.showModal();
    if (!resetOpen && dialog.open) dialog.close();
  }, [resetOpen]);

  const goToQuestion = (id: number) => {
    setQuestionId(id);
    setStageOverride(null);
    const index = filtered.findIndex((question) => question.id === id);
    if (index >= 0) setMapPage(Math.floor(index / QUESTION_MAP_PAGE_SIZE) + 1);
    document.getElementById('question-title')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const chooseTopic = (nextTopic: Topic) => {
    setTopic(nextTopic);
    const nextQuestions = filterQuestions(questions, nextTopic);
    setQuestionId(nextQuestions[0]?.id ?? 1);
    setMapPage(1);
    setStageOverride(null);
  };

  const answer = (text: string) => {
    const result = applyAnswer(answers, streak, current, text);
    if (!result.changed) return;
    setAnswers(result.answers);
    setStreak(result.streak);
  };

  const activateHotspot = (name: string) => {
    const matched = matchHotspot(current, name);
    if (!matched) {
      setHotspotState(null);
      setMapNudge(`You selected ${name}. Check the four choices and choose the one that answers this question.`);
      return;
    }
    setMapNudge('');
    setHotspotState({ name, correct: matched.isCorrect });
    answer(matched.text);
  };

  const previous = () => {
    if (currentIndex > 0) goToQuestion(filtered[currentIndex - 1].id);
  };

  const next = () => {
    if (currentIndex < filtered.length - 1) goToQuestion(filtered[currentIndex + 1].id);
    else setReportOpen(true);
  };

  const speak = () => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(buildSpeechText(current));
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const resetProgress = () => {
    setAnswers({});
    setStreak(0);
    setQuestionId(filtered[0]?.id ?? 1);
    setMapPage(1);
    setResetOpen(false);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to study area</a>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand-block">
            <span className="brand-mark" aria-hidden="true">🐢</span>
            <div className="brand-copy">
              <p>Grade 3 · test 10/23</p>
              <h1>Geography Study Lab</h1>
            </div>
          </div>
          <nav className="view-switcher" aria-label="Study view">
            {viewChoices.map(({ key, label }) => (
              <button key={key} type="button" aria-pressed={view === key} onClick={() => setView(key)}>{label}</button>
            ))}
          </nav>
          <div className="score-strip" role="group" aria-label="Quiz progress">
            <span><strong>{score.answered}</strong> of {questions.length} done</span>
            <span><strong>{score.accuracy}%</strong> accuracy</span>
            <span><strong>{streak}</strong> streak</span>
          </div>
        </div>
        <div className="completion-track" aria-hidden="true"><span style={{ width: `${(score.answered / questions.length) * 100}%` }} /></div>
      </header>

      <main id="main-content" className="app-shell">
        <section className="topic-bar" aria-label="Question topics">
          <div className="topic-scroll">
            {topicChoices.map(({ key, label }) => {
              const count = key === 'all' ? questions.length : counts[key];
              return <button key={key} type="button" aria-pressed={topic === key} onClick={() => chooseTopic(key)}>{label} <span style={{ opacity: topic === key ? 1 : 0.8 }}>{count}</span></button>;
            })}
          </div>
          <div className="utility-actions">
            <button type="button" onClick={() => setQuestionMapOpen((open) => !open)} aria-expanded={questionMapOpen} aria-controls="question-map">Question map</button>
            <button type="button" onClick={() => setReportOpen(true)}>Report card</button>
            <button type="button" className="danger-text" onClick={() => setResetOpen(true)}>Reset progress</button>
          </div>
        </section>

        {questionMapOpen && (
          <section id="question-map" className="question-map" aria-labelledby="question-map-title">
            <div className="question-map-heading">
              <div><h2 id="question-map-title">Question map</h2><p>✓ correct · ! another try · • unanswered</p></div>
              <button type="button" onClick={() => setQuestionMapOpen(false)}>Close question map</button>
            </div>
            <div className="jump-grid">
              {visibleJumpQuestions.map((question) => {
                const saved = answers[question.id];
                const status = saved ? (saved.isCorrect ? 'correct' : 'wrong') : 'unanswered';
                const marker = status === 'correct' ? '✓' : status === 'wrong' ? '!' : '•';
                const active = current.id === question.id;
                return (
                  <button
                    key={question.id}
                    type="button"
                    className={`jump-button jump-button--${status}`}
                    aria-current={active ? 'true' : undefined}
                    aria-label={`Question ${question.id}: ${status === 'correct' ? 'correct' : status === 'wrong' ? 'needs another try' : 'unanswered'}${active ? ', current question' : ''}`}
                    onClick={() => goToQuestion(question.id)}
                  >
                    <span aria-hidden="true">{marker}</span> {question.id}
                  </button>
                );
              })}
            </div>
            {totalPages > 1 && (
              <div className="pagination" role="group" aria-label="Question map pages">
                <button type="button" disabled={safeMapPage === 1} onClick={() => setMapPage((page) => Math.max(1, page - 1))}>Previous 20</button>
                <span>Page {safeMapPage} of {totalPages}</span>
                <button type="button" disabled={safeMapPage === totalPages} onClick={() => setMapPage((page) => Math.min(totalPages, page + 1))}>Next 20</button>
              </div>
            )}
          </section>
        )}

        <div className={`workspace workspace--${view}`}>
          <section className="stage-panel" aria-labelledby="study-stage-title">
            <div className="stage-toolbar">
              <div>
                <p>Study diagram</p>
                <h2 id="study-stage-title">{stageChoices.find((choice) => choice.key === stage)?.label}</h2>
              </div>
              <div className="stage-tabs" role="group" aria-label="Study diagram">
                {stageChoices.map(({ key, label }) => (
                  <button key={key} type="button" aria-pressed={stage === key} onClick={() => setStageOverride(key)}>{label}</button>
                ))}
              </div>
            </div>
            <div className="stage-canvas">
              <StudyStage stage={stage} onHotspot={activateHotspot} selected={hotspotState} />
            </div>
            <div className="stage-note" aria-live="polite">
              <span>{current.interactiveTarget ? 'Select the diagram or choose an answer.' : 'Use the diagram as a reference, then choose an answer.'}</span>
              {mapNudge && <strong>{mapNudge}</strong>}
            </div>
          </section>

          {view !== 'study' && (
            <QuestionPanel
              question={current}
              saved={answers[current.id]}
              position={currentIndex + 1}
              total={filtered.length}
              hintOpen={hintOpen}
              speechSupported={speechSupported}
              onToggleHint={() => setHintOpen((open) => !open)}
              onSpeak={speak}
              onAnswer={answer}
              onPrevious={previous}
              onNext={next}
              atFirst={currentIndex === 0}
              atLast={currentIndex === filtered.length - 1}
            />
          )}

          {view === 'study' && <StudyReference />}
        </div>
      </main>

      <dialog ref={reportDialog} className="app-dialog" onClose={() => setReportOpen(false)}>
        <div className="dialog-body">
          <div className="dialog-heading"><div><p>Report card</p><h2>Geography practice</h2></div><button type="button" aria-label="Close report card" onClick={() => setReportOpen(false)}>×</button></div>
          <div className="report-grid">
            <div><strong>{score.answered}</strong><span>Answered</span></div>
            <div><strong>{score.correct}</strong><span>Correct</span></div>
            <div><strong>{score.accuracy}%</strong><span>Accuracy</span></div>
          </div>
          <p className="report-message">{scoreMessage(score.answered, score.accuracy)}</p>
          <div className="dialog-actions"><button type="button" className="primary-button" onClick={() => setReportOpen(false)}>Continue practicing</button></div>
        </div>
      </dialog>

      <dialog ref={resetDialog} className="app-dialog" onClose={() => setResetOpen(false)}>
        <div className="dialog-body">
          <div className="dialog-heading"><div><p>Reset progress</p><h2>Start the quiz again?</h2></div><button type="button" aria-label="Close reset confirmation" onClick={() => setResetOpen(false)}>×</button></div>
          <p>This clears all saved answers and the current streak on this device. The 60 study questions stay unchanged.</p>
          <div className="dialog-actions"><button type="button" className="secondary-button" onClick={() => setResetOpen(false)}>Keep progress</button><button type="button" className="danger-button" onClick={resetProgress}>Reset progress</button></div>
        </div>
      </dialog>
    </>
  );
}
