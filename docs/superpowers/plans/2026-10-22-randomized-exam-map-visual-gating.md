# Randomized Exam, Standalone Map, and Visual Gating Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the root site a landing page, provide direct exam and standalone-map pages, randomize each persisted exam attempt with `Math.random()`, and render only question-specific visuals.

**Architecture:** Keep the existing React/Vite application and avoid a router dependency. Vite will emit three HTML entry points that share `src/main.tsx`; a small pathname resolver chooses the landing page, exam app, or standalone map page. Exam order and visual requirements are explicit data contracts: attempt order is persisted separately from answers, and visual stages are curated by question ID rather than inferred from category.

**Tech Stack:** React 19, TypeScript 7, Vite 8, Tailwind CSS 4, Node built-in test runner, pnpm 12, GitHub Pages.

## Global Constraints

- Work only on `main`; create no pull request.
- Preserve the 80-question bank, teacher worksheet key, score-history rules, current answers, and existing stable curriculum IDs.
- Use a Fisher-Yates permutation with default random source `Math.random()`; do not use `array.sort(() => Math.random() - 0.5)`.
- Persist one exam order per attempt so reload never reshuffles the active attempt.
- Root `/geography/` is a landing page, `/geography/exam/` is the exam/study app, and `/geography/map/` is a reference-only world map.
- Exam/practice visuals are opt-in per question. Non-visual questions render no diagram. Study and standalone-map interactions never change exam answers.
- Keep exact dependency pins and add no new dependency.
- Automated verification must use the repository's declared `pnpm test` and `pnpm build`; browser/manual claims remain unverified without browser evidence.

---

### Task 1: Record acceptance tests and route contract

**Files:**
- Create: `tests/exam-experience.test.ts`
- Modify: `package.json`
- Modify: `docs/superpowers/specs/2026-10-21-geography-study-site-amendments.md`
- Modify: `docs/tasks/GEO-001.md`
- Modify: `docs/tracker/GEO-001.md`
- Modify: `docs/DECISIONS.md`

**Interfaces:**
- Consumes: current question bank, current storage boundaries, Vite build, existing direct Pages deployment.
- Produces: failing acceptance contracts for `resolveAppRoute`, exam-order persistence, exact visual mapping, direct page entry points, sequence numbering, and visual gating.

- [ ] **Step 1: Add the focused failing test**

Add tests that dynamically load the proposed route/order modules so missing behavior fails as assertions, assert the exact curated visual-stage map, assert direct `exam/index.html` and `map/index.html` inputs, and assert learner-facing question numbering uses randomized position.

- [ ] **Step 2: Verify the relevant failure**

Run: `pnpm test`
Expected: new exam-experience tests fail because route/order helpers, direct page inputs, `visualStage`, and gated rendering are absent while pre-existing tests remain green.

- [ ] **Step 3: Commit the red contract**

Commit the tests and synchronized specification/tracker state to `main` without production implementation.

---

### Task 2: Add page routing and direct GitHub Pages entry points

**Files:**
- Create: `src/lib/app-route.ts`
- Create: `src/components/LandingPage.tsx`
- Create: `src/components/StandaloneMapPage.tsx`
- Create: `exam/index.html`
- Create: `map/index.html`
- Modify: `src/main.tsx`
- Modify: `vite.config.ts`

**Interfaces:**
- Consumes: `import.meta.env.BASE_URL`, existing `WorldMap`, existing shared stylesheet.
- Produces: `resolveAppRoute(pathname, basePath): 'home' | 'exam' | 'map'`; root landing; direct exam; direct standalone map.

- [ ] **Step 1: Implement the minimum routing behavior**

Normalize the Vite base path, resolve the first relative path segment, render `LandingPage` for root, `App` for `exam`, and `StandaloneMapPage` for `map`. Configure Rollup inputs for all three HTML documents.

- [ ] **Step 2: Keep the standalone map reference-only**

Reuse `WorldMap`; hotspot clicks may update local explanatory text only. Do not import answer/storage logic into the standalone map page.

- [ ] **Step 3: Verify focused routing acceptance**

Run: `pnpm test`
Expected: route/direct-entry acceptance checks pass; order/visual checks may still fail until later tasks.

---

### Task 3: Persist a randomized order per attempt

**Files:**
- Create: `src/lib/exam-order.ts`
- Modify: `src/App.tsx`
- Modify: `src/components/QuestionPanel.tsx`

**Interfaces:**
- Consumes: stable question IDs, active `attemptId`, `StorageLike` semantics, default `Math.random()`.
- Produces: `createExamOrder(ids, random?)`, `loadExamOrder(storage, attemptId, ids, random?)`, versioned stored order bound to attempt ID, randomized filtered question sequence.

- [ ] **Step 1: Implement Fisher-Yates**

Clone the input IDs; for indexes from the final element down to one, choose `j = Math.floor(random() * (i + 1))` and swap. Default `random` to `Math.random`.

- [ ] **Step 2: Validate persisted order**

Reuse a stored order only when version, attempt ID, length, uniqueness, and exact membership match the active question IDs. Malformed/stale storage falls back to a fresh in-memory permutation and fails soft if storage writes throw.

- [ ] **Step 3: Integrate with reset and filters**

Initialize the order after the attempt ID, derive ordered questions by ID lookup, filter from that ordered array, and on reset create the new attempt ID and immediately generate/store its new order. Do not assert two random attempts must differ because identical permutations are statistically possible.

- [ ] **Step 4: Change learner-facing numbering**

Question panel and question-map controls display sequence position rather than stable curriculum ID while keeping IDs as answer/deep-link keys.

- [ ] **Step 5: Verify order tests**

Run: `pnpm test`
Expected: deterministic Fisher-Yates, persistence/reload, and new-attempt random-source tests pass.

---

### Task 4: Gate visuals and isolate visual interactions

**Files:**
- Create: `src/data/question-visuals.ts`
- Modify: `src/data/questions.ts`
- Modify: `src/types.ts`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: legacy `question.stage` for Study Sheet browsing, curated visual mapping, existing `StudyStage` hotspot callback.
- Produces: exported active questions with `visualStage: Stage | null`; exam/practice stage rendering only when `visualStage !== null`.

- [ ] **Step 1: Add the curated visual map**

Use the exact audited mapping in `tests/exam-experience.test.ts`. Mapping absence means `null`; do not derive visuals from `category`, `stage`, or `interactiveTarget`.

- [ ] **Step 2: Gate stage rendering**

In Practice/Quiz, render only `current.visualStage` and remove diagram tabs from the question surface. In Study Sheet, keep manual stage tabs and use the legacy stage as the study context.

- [ ] **Step 3: Isolate hotspot effects**

Study Sheet interactions are reference-only. A configured exam/practice visual with no answer-match does not mutate answers. Non-visual questions have no stage to click. The standalone map remains fully separate from exam state.

- [ ] **Step 4: Verify focused pass**

Run: `pnpm test`
Expected: exact visual mapping, visual gating, and sequence-number assertions pass with all existing tests.

---

### Task 5: Full build, deployment evidence, and handoff synchronization

**Files:**
- Modify: `README.md`
- Modify: `docs/tasks/GEO-001.md`
- Modify: `docs/tracker/GEO-001.md`
- Modify: `docs/DECISIONS.md`

**Interfaces:**
- Consumes: completed implementation and GitHub Actions evidence.
- Produces: accurate resume state, exact test/build/deploy evidence, unresolved browser-QA blocker if browser control remains unavailable.

- [ ] **Step 1: Run full validation**

Run: `pnpm test` and `pnpm build` through the repository workflow.
Expected: all tests pass and Vite emits root, exam, and map HTML outputs plus existing assets.

- [ ] **Step 2: Inspect current-head Actions result**

Record exact commit/run evidence. Do not claim public deployment or smoke success while deploy is queued/waiting.

- [ ] **Step 3: Perform browser QA only with real browser evidence**

If browser control works, verify root is a landing page, `/exam/` has a stable randomized order across reload, reset rotates the attempt/order, non-visual questions omit diagrams, visual questions show only their required visual, and `/map/` cannot change exam score. Check 390/768/1440 responsive behavior. If browser control remains unavailable, leave manual acceptance blocked.

- [ ] **Step 4: Synchronize handoff documentation**

Update README/tracker/tasks/decisions with exact implemented behavior, current head, validation evidence, deployment state, and next action.

## Unresolved externally observable decisions

None. The owner approved the route separation, attempt-scoped `Math.random()` exam order, standalone map, and question-specific visual gating on 2026-10-22.
