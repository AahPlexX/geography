# Geography Study Lab

A focused Grade 3 geography study site built from the supplied Bayou Bridges and world-geography material. The primary learner is preparing for the same classroom test material; the site is public so anyone can use the same study set.

Live site: `https://aahplexx.github.io/geography/`

## Current state

The active `main` implementation contains 80 teacher-aligned/same-material questions, persistent submitted-score history, a non-exam landing page, a standalone world-map page, and an attempt-scoped randomized exam. The new release is built but is **not yet claimed live**: GitHub Actions run `39798859738` has completed frozen install, `32/32` tests, TypeScript/Vite build, Pages configuration, and artifact upload for commit `e684eb82b155806e4e20ddbad7a24917cd27467a`; its Pages deploy job is currently waiting.

When that release is deployed, `/geography/` is the learner landing page, `/geography/exam/` is the exam/practice/study application, and `/geography/map/` is a standalone reference map. Each attempt receives a Fisher–Yates permutation generated from `Math.random()` and persisted with the attempt so refresh does not reorder an in-progress exam. Resetting progress starts a new attempt and a new order while preserving submitted score history.

Exam/practice visuals are explicit per-question data. Questions that do not require a globe, world map, compass, U.S. diagram, or symbol visual render no diagram. Study Sheet and the standalone map are reference-only and do not answer or score exam questions. Learner-facing question numbers use randomized sequence position while stable curriculum IDs remain persistence/deep-link keys.

Submitted score history is written only after all 80 questions are completed or when the learner explicitly chooses `Submit score early` after answering at least one question. An early score uses only questions actually answered for its percentage and preserves the attempted count against the full bank; for example, three correct answers out of three attempted questions is shown as `3 / 80 questions` with a `100%` score.

T-011's earlier release is now confirmed by run `39793543240` as a successful build, Pages deployment, and public smoke for commit `e98833f9e05e7a853fb10b7865764767b21d57a6`. T-012 used a test-first contract: red run `39797185394` produced 27 passes and 5 expected failures before implementation; current-head run `39798859738` has 32/32 tests passing and emits `dist/index.html`, `dist/exam/index.html`, and `dist/map/index.html`.

The pnpm 12 lockfile is committed and CI uses `pnpm install --frozen-lockfile`. The app remains a static Vite + React + TypeScript + Tailwind client with no account, backend, analytics service, or learner-identifying data collection.

Deployed 1440 px WCAG 2.2 A/AA automation from the earlier interface reports zero failures for seven representative baseline states. Those scans are evidence, not a compliance certification, and do not replace required screenshot/interaction QA at 390 px, 768 px, and 1440 px. Manual browser QA of the new T-012 release remains unverified because browser control is unavailable.

## Authoritative documents

- Base requirements and design: [`docs/superpowers/specs/2026-10-21-geography-study-site-design.md`](docs/superpowers/specs/2026-10-21-geography-study-site-design.md)
- Active requirement amendments: [`docs/superpowers/specs/2026-10-21-geography-study-site-amendments.md`](docs/superpowers/specs/2026-10-21-geography-study-site-amendments.md)
- Base implementation plan: [`docs/superpowers/plans/2026-10-21-geography-study-site.md`](docs/superpowers/plans/2026-10-21-geography-study-site.md)
- T-012 implementation plan: [`docs/superpowers/plans/2026-10-22-randomized-exam-map-visual-gating.md`](docs/superpowers/plans/2026-10-22-randomized-exam-map-visual-gating.md)
- Current status and evidence: [`docs/tracker/GEO-001.md`](docs/tracker/GEO-001.md)
- Execution tasks: [`docs/tasks/GEO-001.md`](docs/tasks/GEO-001.md)
- Decisions: [`docs/DECISIONS.md`](docs/DECISIONS.md)
- Repository rules: [`AGENTS.md`](AGENTS.md)

## Stack

Vite + React + TypeScript + Tailwind CSS + d3-geo, managed with pnpm and deployed to GitHub Pages through GitHub Actions. Direct dependencies are exact-pinned. Natural Earth 1:50m country geometry is fetched from an immutable upstream revision during development/build and emitted as a local static site asset.
