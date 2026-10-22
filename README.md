# Geography Study Lab

A focused Grade 3 geography study site built from the supplied Bayou Bridges and world-geography material, with a separately planned Interactive World Explorer subproject. The primary learner is preparing for the same classroom test material; the site is public so anyone can use the study set.

Live site: `https://aahplexx.github.io/geography/`

## Current GEO-001 state

The active `main` implementation contains 80 teacher-aligned/same-material questions, persistent submitted-score history, a non-exam landing page, a standalone world-map page, and an attempt-scoped randomized exam.

The T-012 runtime release at commit `e684eb82b155806e4e20ddbad7a24917cd27467a` passed frozen install, all `32/32` tests, TypeScript/Vite build, Pages deployment, and the workflow's public-site release gate in run `39798859738`. The build emitted `dist/index.html`, `dist/exam/index.html`, and `dist/map/index.html`. Current release automation verifies all three direct page URLs, their expected titles/application assets, and the detailed world-map data asset.

`/geography/` is the learner landing page, `/geography/exam/` is the exam/practice/study application, and `/geography/map/` is a standalone reference map. Each attempt receives a Fisher–Yates permutation generated from `Math.random()` and persisted with the attempt so refresh does not reorder an in-progress exam. Resetting progress starts a new attempt and a new order while preserving submitted score history.

Exam/practice visuals are explicit per-question data. Questions that do not require a globe, world map, compass, U.S. diagram, or symbol visual render no diagram. Study Sheet and the standalone map are reference-only and do not answer or score exam questions. Learner-facing question numbers use randomized sequence position while stable curriculum IDs remain persistence/deep-link keys.

Submitted score history is written only after all 80 questions are completed or when the learner explicitly chooses `Submit score early` after answering at least one question. An early score uses only questions actually answered for its percentage and preserves the attempted count against the full bank; for example, three correct answers out of three attempted questions is shown as `3 / 80 questions` with a `100%` score.

The pnpm 12 lockfile is committed and CI uses `pnpm install --frozen-lockfile`. The deployed GEO-001 app remains a static Vite + React + TypeScript + Tailwind client with no account, backend, analytics service, or learner-identifying data collection.

Deployed 1440 px WCAG 2.2 A/AA automation from the earlier interface reports zero failures for seven representative baseline states. Those scans are evidence, not a compliance certification, and do not replace required screenshot/interaction QA. Manual browser QA of the T-012 release remains separately unverified where real browser-control evidence is unavailable.

## GEO-002 — Interactive World Explorer

GEO-002 is an approved additive project-within-the-project intended for `/geography/explore/`. Production explorer implementation has **not** started yet and the route is not claimed live.

The approved architecture is local-first: pinned/validated Natural Earth layers will provide canonical spatial data for continents, countries/territories, global Admin-1 states/provinces, water/marine features, rivers/lakes, physical regions/landforms, and populated places represented by the selected datasets. Optional World Bank and Wikimedia requests may enrich visible entity details but cannot be required for the explorer to function and cannot require signup, payment, API keys, or private credentials.

The explorer design requires touch, mouse, wheel/trackpad, and keyboard parity; progressive/lazy geographic detail; local one-character typeahead search; hierarchy/breadcrumb navigation; adaptive phone/tablet/desktop detail surfaces; related exploration; exactly-two compare; two-point geodesic distance measurement; local bookmarks and 20-item recent history; deep links; fail-soft enrichment; WCAG 2.2 AA target; and explicit regression protection for every existing GEO-001 route/behavior.

The GEO-002 specification is approved. A master implementation roadmap plus four independently executable phase plans are committed and self-reviewed. The next workflow gate is plan-execution mode selection; after that, implementation begins at Phase A Task A1 with a focused failing test for the additive explorer route/entry/build/smoke wiring.

## Authoritative documents

See [`docs/INDEX.md`](docs/INDEX.md) for the complete work-unit index.

### GEO-001

- Base requirements and design: [`docs/superpowers/specs/2026-10-21-geography-study-site-design.md`](docs/superpowers/specs/2026-10-21-geography-study-site-design.md)
- Active requirement amendments: [`docs/superpowers/specs/2026-10-21-geography-study-site-amendments.md`](docs/superpowers/specs/2026-10-21-geography-study-site-amendments.md)
- Base implementation plan: [`docs/superpowers/plans/2026-10-21-geography-study-site.md`](docs/superpowers/plans/2026-10-21-geography-study-site.md)
- T-012 implementation plan: [`docs/superpowers/plans/2026-10-22-randomized-exam-map-visual-gating.md`](docs/superpowers/plans/2026-10-22-randomized-exam-map-visual-gating.md)
- Status/evidence: [`docs/tracker/GEO-001.md`](docs/tracker/GEO-001.md)
- Tasks: [`docs/tasks/GEO-001.md`](docs/tasks/GEO-001.md)

### GEO-002

- Interactive World Explorer specification: [`docs/superpowers/specs/2026-10-22-interactive-world-explorer-design.md`](docs/superpowers/specs/2026-10-22-interactive-world-explorer-design.md)
- Specification approval status: [`docs/superpowers/specs/2026-10-22-interactive-world-explorer-approval.md`](docs/superpowers/specs/2026-10-22-interactive-world-explorer-approval.md)
- Master implementation roadmap: [`docs/superpowers/plans/2026-10-22-interactive-world-explorer.md`](docs/superpowers/plans/2026-10-22-interactive-world-explorer.md)
- Phase A — Foundation: [`docs/superpowers/plans/2026-10-22-interactive-world-explorer-foundation.md`](docs/superpowers/plans/2026-10-22-interactive-world-explorer-foundation.md)
- Phase B — Global Data Expansion: [`docs/superpowers/plans/2026-10-22-interactive-world-explorer-data.md`](docs/superpowers/plans/2026-10-22-interactive-world-explorer-data.md)
- Phase C — Learning & Enrichment: [`docs/superpowers/plans/2026-10-22-interactive-world-explorer-learning.md`](docs/superpowers/plans/2026-10-22-interactive-world-explorer-learning.md)
- Phase D — Exploration Tools & Release Hardening: [`docs/superpowers/plans/2026-10-22-interactive-world-explorer-tools-release.md`](docs/superpowers/plans/2026-10-22-interactive-world-explorer-tools-release.md)
- Status/evidence: [`docs/tracker/GEO-002.md`](docs/tracker/GEO-002.md)
- Tasks: [`docs/tasks/GEO-002.md`](docs/tasks/GEO-002.md)

### Shared

- Decisions: [`docs/DECISIONS.md`](docs/DECISIONS.md)
- Repository rules: [`AGENTS.md`](AGENTS.md)

## Stack

Vite + React + TypeScript + Tailwind CSS + `d3-geo`, managed with pnpm and deployed to GitHub Pages through GitHub Actions. Direct dependencies are exact-pinned. GEO-002 planning has re-verified and recommends exact additions `d3-zoom@3.0.0`, `d3-selection@3.0.0`, `@types/d3-zoom@3.0.9`, and `@types/d3-selection@3.0.12`; those dependencies are not claimed installed until implementation actually begins and passes the repository's dependency/build gates.
