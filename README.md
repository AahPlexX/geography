# Geography Study Lab

A public Grade 3 geography study site with an additive Interactive World Explorer subproject. Live site: `https://aahplexx.github.io/geography/`.

## GEO-001 — deployed study lab

The established site keeps its 80 teacher-aligned questions, attempt-scoped randomized exam order, practice/study modes, question-specific visual gating, submitted score history, standalone reference map, and non-exam landing page. Existing public routes remain:

- `/geography/` — learner landing
- `/geography/exam/` — exam/practice/study
- `/geography/map/` — standalone reference map

GEO-001 remains a static Vite + React + TypeScript + Tailwind + `d3-geo` client with pnpm, frozen-lockfile CI, GitHub Pages deployment, no learner account/backend/analytics, and no learner-identifying data collection. Historical release/accessibility evidence remains in `docs/tracker/GEO-001.md` and `docs/DECISIONS.md`.

## GEO-002 — Interactive World Explorer

GEO-002 is now executing inline because the current host has no genuine subagent-dispatch tool and the owner explicitly prohibited simulated subagents.

**Phase A Task A1 is verified.** The additive `/geography/explore/` foundation is live as a deliberately minimal explorer shell. Red Actions run `39959204385` produced 32 passes / 1 expected failure before routing existed. Green run `39959963234` then passed 33/33 tests, TypeScript/Vite build, Pages deploy, and public smoke for root, exam, map, explorer, every page's JavaScript bundle, and the existing world-map data asset. The production build emitted `dist/explore/index.html`.

**Phase A Task A2 is now in progress.** Its test-first contract defines the initial local geography index: seven normalized continents plus Natural Earth countries/territories with stable source-backed IDs and continent parentage, a geometry-free entity/search index, and a hashed source/output manifest. A2 production code is not claimed implemented until that red contract is observed failing and then made green.

The broader approved architecture remains local-first: pinned/validated Natural Earth data is authoritative; World Bank and Wikimedia are optional fail-soft enrichment and may not become required login/payment/keyed dependencies. Planned later work adds progressive global Admin-1/physical/hydrographic/populated-place layers, local search, breadcrumbs/deep links, touch/mouse/trackpad/keyboard map interaction, adaptive detail surfaces, compare, geodesic measurement, bookmarks/history, enrichment, accessibility hardening, and real manual interaction QA.

## Authoritative documents

Use [`docs/INDEX.md`](docs/INDEX.md) as the work-unit directory. GEO-002 execution state is authoritative in [`docs/tracker/GEO-002.md`](docs/tracker/GEO-002.md), [`docs/tasks/GEO-002.md`](docs/tasks/GEO-002.md), and [`progress.md`](progress.md). Repository rules are in [`AGENTS.md`](AGENTS.md); shared architectural decisions are in [`docs/DECISIONS.md`](docs/DECISIONS.md).

## Stack

Vite + React + TypeScript + Tailwind CSS + `d3-geo`, managed with pnpm and deployed through GitHub Actions to GitHub Pages. Direct dependencies are exact-pinned. Planned D3 interaction dependencies are not considered installed until the later task that actually adds and verifies them.
