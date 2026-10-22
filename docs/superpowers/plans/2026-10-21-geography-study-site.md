---
project: AahPlexX/geography
work_unit: GEO-001
document_status: active
authoritative_branch: main
last_updated: 2026-10-21
---

# Geography Study Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the supplied 60-question Grade 3 geography study experience as an accessible Vite + React + TypeScript + Tailwind GitHub Pages site with a geographically faithful interactive world map.

**Architecture:** Static single-page React app. Curriculum is typed local data; pure TypeScript functions own quiz, URL, persistence, and map-grouping rules; instructional stages are isolated React components; Natural Earth 1:50m country geometry is fetched at build time and served as a local static asset.

**Tech Stack:** Vite, React, TypeScript, Tailwind CSS, d3-geo, pnpm, GitHub Pages Actions.

**Spec:** `docs/superpowers/specs/2026-10-21-geography-study-site-design.md`

**Active amendments:** `docs/superpowers/specs/2026-10-21-geography-study-site-amendments.md`

## Global Constraints

- `origin/main` only; no pull requests.
- pnpm only; direct dependency versions exact-pinned.
- Exactly 60 unique questions, IDs 1–60; newer teacher-key hemisphere wording supersedes the duplicated older Q39–41 source block.
- Fresh sessions start at zero progress.
- URL owns stateful view/filter/question/panel pagination state; localStorage owns versioned learner progress.
- WCAG 2.2 AA target with native controls first and keyboard-equivalent SVG hotspots.
- GitHub Pages base path is `/geography/`.
- Natural Earth 1:50m geometry is the world-map source; teacher worksheet hemisphere sorting remains the assessment key.

## Review Focus

- Invalid or stale browser progress must not inject unknown questions/options.
- Filter changes must never strand the current question outside the active sequence.
- Re-answering the same option must not inflate progress or streak.
- World-map loading failure must leave native answer buttons usable.
- Phone layouts must put the question before the large study stage and avoid horizontal page overflow.

---

### Task 1: Toolchain and deployment
**Files:** `package.json`, Vite/TS config, `.github/workflows/deploy.yml`, `index.html`
- [x] Exact-pin runtime/dev dependencies and pnpm/Node requirements.
- [x] Configure `/geography/` base, Tailwind Vite plugin, fonts, and Pages workflow.
- [ ] Run repository test/build entrypoints in GitHub Actions.

### Task 2: Curriculum integrity
**Files:** `src/data/questions.ts`, `tests/question-bank.test.mjs`
- [x] Preserve 60 IDs and actual category assignments from question objects.
- [x] Apply revised teacher-key Q4–7 and Q38–41; omit the duplicated superseded Q39–41 block.
- [x] Prove four choices and exactly one correct answer per question.

### Task 3: Quiz, URL, and persistence domain
**Files:** `src/lib/quiz.ts`, `src/lib/urlState.ts`, `src/lib/storage.ts`, `src/lib/speech.ts`, `tests/study-state.test.ts`
- [x] RED/GREEN score, answer replacement, hotspot, URL, persistence, and read-aloud text behavior.
- [x] Reject malformed storage and unknown option identities.

### Task 4: Accurate world map pipeline
**Files:** `src/lib/map-data.mjs`, `scripts/fetch-map.mjs`, `src/lib/mapGeometry.ts`, `src/components/WorldMap.tsx`, map tests
- [x] Pin Natural Earth 1:50m countries to an immutable source revision.
- [x] Validate map metadata and group source regions into seven classroom continents (`Oceania` → `Australia`).
- [x] Render Natural Earth I projected country geometry, oceans, Equator, and Prime Meridian as accessible hotspots.

### Task 5: Instructional stages and reference
**Files:** `src/components/StudyStage.tsx`, `src/components/StudyReference.tsx`
- [x] Preserve globe, compass, U.S. regions/features, and six-symbol study surfaces.
- [x] Keep teacher worksheet hemisphere lists explicit in Study lab.

### Task 6: Responsive quiz interface
**Files:** `src/App.tsx`, `src/components/QuestionPanel.tsx`, `src/styles.css`
- [x] Wire filters, three views, score/streak, hints, question navigation/map, report, reset, speech, persistence, and direct stage answering.
- [x] Use question-first phone flow and map-first wide practice flow.
- [x] Use real modal dialogs, visible focus, target sizing, reduced-motion handling, safe-area spacing, and color-independent status labels.

### Task 7: Production validation and lockfile finalization
- [x] Run local dependency-free tests.
- [ ] Use first CI run to generate the pnpm lockfile because local registry access is unavailable.
- [ ] Commit the generated lockfile and change CI install to `--frozen-lockfile`.
- [ ] Re-run test/build/deploy at the locked revision.

### Task 8: Browser QA and documentation
- [ ] Validate deployed site near 390px, 768px, and 1440px; capture/critique screenshots and repair material defects.
- [ ] Verify keyboard interaction, dialogs, persistence, deep links, reduced motion, and no horizontal overflow.
- [ ] Update README, spec, decision log, tracker, task record, and work-unit index with fresh evidence and resume state.
