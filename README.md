# Geography Study Lab

A public Grade 3 geography study site with an additive Interactive World Explorer subproject. Live site: `https://aahplexx.github.io/geography/`.

## GEO-001 — deployed study lab

The established site keeps its 80 teacher-aligned questions, attempt-scoped randomized exam order, practice/study modes, question-specific visual gating, submitted score history, standalone reference map, and non-exam landing page. Existing public routes remain `/geography/`, `/geography/exam/`, and `/geography/map/`. GEO-001 remains a static Vite + React + TypeScript + Tailwind + `d3-geo` client with no learner account/backend/analytics. Historical release/accessibility evidence remains in `docs/tracker/GEO-001.md` and `docs/DECISIONS.md`.

## GEO-002 — Interactive World Explorer

Execution is inline because the current host has no genuine subagent-dispatch tool and simulated subagents are prohibited by owner direction.

**A1 is verified.** `/geography/explore/` is live as a deliberately minimal additive explorer shell. Red run `39959204385` proved the missing route; green run `39959963234` passed 33/33 tests, production build, Pages deploy, and four-page public smoke. Existing GEO-001 pages remained green.

**A2 has completed its red stage.** Run `39960760297` produced 33 passes / exactly 2 expected failures, both belonging to the new foundation-data contract: the normalizer and generated entity index were absent. The current green implementation adds only the A2 foundation pipeline: stable `ADM0_A3` country IDs, seven continent parents with `Oceania` presented as `Australia`, bbox/centroid/source metadata, a geometry-free generated entity index, a hashed manifest, shared TypeScript contracts, and deterministic generation before dev/test/build. These A2 changes are not marked verified until the current CI/build gate passes.

The broader approved architecture remains local-first: pinned/validated Natural Earth data is authoritative; World Bank and Wikimedia are optional fail-soft enrichment and may not become required login/payment/keyed dependencies. Later phases add search/URL state, interactive pan/zoom/selection, global Admin-1 and physical layers, adaptive details, compare/measurement/bookmarks, enrichment, accessibility hardening, and real manual input QA.

## Authoritative documents

Use [`docs/INDEX.md`](docs/INDEX.md) as the work-unit directory. GEO-002 execution state is authoritative in [`docs/tracker/GEO-002.md`](docs/tracker/GEO-002.md), [`docs/tasks/GEO-002.md`](docs/tasks/GEO-002.md), and [`progress.md`](progress.md). Repository rules are in [`AGENTS.md`](AGENTS.md); shared decisions are in [`docs/DECISIONS.md`](docs/DECISIONS.md).

## Stack

Vite + React + TypeScript + Tailwind CSS + `d3-geo`, managed with pnpm and deployed through GitHub Actions to GitHub Pages. Direct dependencies are exact-pinned. Planned D3 interaction dependencies are not considered installed until the later task that actually adds and verifies them.
