---
project: AahPlexX/geography
work_unit: GEO-001
document_status: active
authoritative_branch: main
last_updated: 2026-10-22
---

# Geography Study Site Active Amendments

This file changes only the facts listed below. All unmodified requirements in `2026-10-21-geography-study-site-design.md` remain authoritative. Where a listed amendment conflicts with the base design, this file is authoritative for that fact.

## A-001 — Revised teacher worksheet curriculum

The owner's later supplied HTML is authoritative where it changes the earlier source. Questions 4–7 and 38–41 use the teacher-aligned hemisphere wording and answers from that later source. The repeated older questions numbered 39–41 that appear immediately after the revised 38–41 block are a merge artifact and are prohibited from the 60-question bank. Questions 42–60 continue unchanged from the later source.

Teacher worksheet sorting key:

- Northern Hemisphere box: North America, Europe, Asia, Africa.
- Southern Hemisphere box: South America, Antarctica, Australia.
- Eastern Hemisphere box: Antarctica, Africa, Asia, Australia, Europe.
- Western Hemisphere box: North America, South America.

The accurate interactive map does not redefine these assessment answers. Study lab copy must state that map geometry is geographically accurate while hemisphere sorting questions follow the teacher's worksheet key.

## A-002 — Category counts

This amendment replaces GEO-001-003.

**GEO-001-003 — Category integrity**

**Behavior:** Category counts are derived from the authoritative question objects rather than duplicated display constants.

**Acceptance test:** Dataset invariants assert the exact active category counts, and filter labels render counts from the dataset rather than hard-coded badge text from the source HTML.

## A-003 — Lean test runner

The planned Vitest dependency is removed. Non-browser domain tests use the Node.js built-in test runner with Node's TypeScript type-stripping support where a test imports `.ts` modules. This changes tooling only; the base specification's required behaviors and validation coverage remain unchanged.

## A-004 — Deep-linked expanded interface state

This amendment extends Sections 6 and GEO-001-017. The URL owns `topic`, `view`, `questionId`, `hintOpen`, `questionMapOpen`, question-map `page`, and optional manually previewed `stage`. Versioned local storage still owns only learner progress. Invalid URL values fall back safely.

## A-005 — High-fidelity world map

### GEO-001-031 — Geographically faithful interactive world map

**Behavior:** The world stage uses real generalized geographic geometry rather than hand-drawn continent blobs. Build-time map data comes from Natural Earth Admin 0 Countries at 1:50m, pinned to immutable upstream commit `ca96624a56bd078437bca8184e78163e5039ad19`. The client renders the Natural Earth I projection with country coastlines/boundaries, groups country features into seven classroom continents (`Oceania` displayed as `Australia`), and projects continent labels, five ocean hotspots, the Equator, and Prime Meridian onto the same coordinate system.

**Accessibility:** Continents, oceans, Equator, and Prime Meridian remain keyboard-operable labeled hotspots; four native answer buttons remain the equivalent non-spatial path.

**Acceptance test:** Automated tests assert the immutable 1:50m source, validate required country/continent metadata, and verify continent grouping. Browser QA confirms recognizable continent/coastline shapes and usable pointer/keyboard targets at approximately 390px, 768px, and 1440px.

## A-006 — Current CI runtime baseline

GitHub Actions uses Node.js `22.23.4` LTS for the release workflow. Vite's `/geography/` base and pnpm-only requirement are unchanged.

## A-007 — Same-test curriculum expansion

### GEO-001-032 — Expanded 80-question bank

**Behavior:** The quiz contains exactly 80 unique questions with IDs `1` through `80`. Questions `61` through `80` add non-conflicting practice drawn only from concepts already present in the existing worksheet/study-guide material, rationales, and study reference. The teacher worksheet hemisphere key in A-001 remains unchanged. Active category totals are `globe=13`, `world=22`, `compass=10`, `us_regions=25`, `symbols=10`.

**Acceptance test:** Source/data invariants assert IDs `1..80` exactly once, four choices and one correct answer per question, the exact category totals, and retention of the teacher-key regression strings.

## A-008 — Persistent submitted score history

### GEO-001-033 — Score-history persistence boundary

**Behavior:** In-progress answers continue using the existing progress store. Submitted scores use a separate versioned local-storage record and are never written merely because an answer changes. Resetting current practice does not erase score history.

**Acceptance test:** Storage tests round-trip valid score history, reject malformed entries, fail soft when storage is unavailable, and keep score history independent from current-progress reset data.

### GEO-001-034 — Attempted-question score calculation

**Behavior:** A submitted score percentage is calculated from questions actually answered, not from the full bank. Every submitted result displays both the percentage and the attempted count against the total bank, for example `3 / 80 questions • 100%` when three answered questions are all correct.

**Acceptance test:** A score-record test submits `3` answered, `3` correct, total `80` and asserts `accuracy=100`, `answered=3`, and `total=80`.

### GEO-001-035 — Valid submission lifecycle

**Behavior:** A history entry is created only when the learner completes all 80 questions or explicitly chooses `Submit score early` after answering at least one but fewer than 80 questions. One early submission and one eventual completed submission may be stored for the same attempt; repeated activation of the same submission kind in the same attempt is a no-op. Resetting practice starts a new attempt identifier without deleting prior history.

**Acceptance test:** Domain/storage tests reject empty submissions, reject an incomplete `completed` record, reject an `early` record with all questions answered, deduplicate the same attempt/kind, allow early then completed records for one attempt, and verify attempt ID rotation on reset.

### GEO-001-036 — Score-history report UI

**Behavior:** The report card shows the current score as percentage plus `answered / total questions`, exposes `Submit score early` only when at least one but fewer than all questions are answered, and lists persisted score history newest first with submission type and local date/time.

**Acceptance test:** Source/browser inspection confirms the report card includes attempted/total context, conditional early-submit control, and a score-history list; manual browser QA verifies the interaction and persistence on reload.

## A-009 — Landing page, randomized exam, standalone map, and question-specific visuals

### GEO-001-037 — Non-exam landing page and direct page URLs

**Behavior:** `https://aahplexx.github.io/geography/` is a learner landing page rather than an active exam question. The landing page provides clear entry points to the randomized exam, study/practice experience, and standalone map. The exam is directly addressable at `/geography/exam/` and the standalone world map is directly addressable at `/geography/map/`. These paths are emitted as real GitHub Pages HTML entry points by the Vite build; no client router dependency is introduced.

**Acceptance test:** Source/build tests assert dedicated `exam/index.html` and `map/index.html` inputs, route resolution for root/exam/map, and production build output for each direct page.

### GEO-001-038 — Attempt-scoped randomized exam order

**Behavior:** Each attempt receives one permutation of all 80 stable question IDs generated with a Fisher-Yates shuffle whose default random source is `Math.random()`. The permutation is stored with the active attempt ID and is reused on reload so an in-progress exam cannot reorder itself. Starting a new attempt generates and stores a fresh permutation. Topic filters preserve the relative order from that attempt permutation. Stable curriculum IDs remain persistence/deep-link keys but learner-facing numbering uses the current sequence position.

**Acceptance test:** Unit tests prove the shuffle is a non-mutating permutation, a deterministic injected random source produces the expected Fisher-Yates order, the same attempt reloads its stored order without invoking randomness, and a new attempt invokes the random source again.

### GEO-001-039 — Explicit question visual requirements

**Behavior:** Question visuals are opt-in data, not inferred from category or the legacy study `stage`. The active question objects expose `visualStage: Stage | null`; `null` renders no exam/practice diagram. A curated question-to-visual mapping is the single source of truth for questions whose wording genuinely depends on a globe, world map, compass, U.S. study diagram, or symbol gallery. Teacher-key sorting questions that could conflict with geographically accurate map geometry remain non-visual.

**Acceptance test:** Dataset tests assert the exact curated question-ID-to-visual-stage mapping and verify representative recall questions remain `visualStage=null`.

### GEO-001-040 — Visual interaction isolation

**Behavior:** In exam/practice, only the current question's configured visual may render. The learner cannot switch to unrelated diagrams from the question surface. A question visual may submit an answer only when the selected hotspot maps to the current question's answer contract; reference-only visual interactions never mutate score. In Study Sheet mode and on the standalone map page, diagram/map interaction is reference-only and cannot answer an exam question.

**Acceptance test:** Source/domain tests confirm visual rendering is gated by `current.visualStage`, non-visual questions omit the stage panel, learner-facing numbering uses randomized position, and standalone/study map interaction is not wired to answer persistence. Manual browser QA verifies the same behavior once browser control is available.
