# Geography Study Lab

A public Grade 3 geography study site with an additive Interactive World Explorer subproject. Live site: `https://aahplexx.github.io/geography/`.

## GEO-001 — deployed study lab

The established site keeps its 80 teacher-aligned questions, randomized attempt order, practice/study modes, question-specific visuals, submitted score history, standalone reference map, and non-exam landing page. Public routes remain `/geography/`, `/geography/exam/`, and `/geography/map/`. Historical release/accessibility evidence remains in `docs/tracker/GEO-001.md` and `docs/DECISIONS.md`.

## GEO-002 — Interactive World Explorer

Execution is inline because the current host has no genuine subagent-dispatch tool and simulated subagents are prohibited by owner direction.

**A1 is verified.** `/geography/explore/` is live as an additive foundation shell. Run `39959963234` passed 33/33 tests, production build, Pages deploy, and four-page public smoke.

**A2 is being validated.** Red run `39960760297` produced exactly the two intended missing-data-pipeline failures. The first green attempt, run `39961380504`, then surfaced a real pinned-source exception before tests: Natural Earth classifies `SGS` (South Georgia and the South Sandwich Islands) as `Seven seas (open ocean)`. UN M49 places `SGS` in South America, so the current retry contains one stable-ID-specific `SGS → South America` rule with provenance retained in the entity metadata. No generic open-ocean fallback exists; unexpected source classifications still fail generation.

The rest of A2 remains strict and local-first: stable `ADM0_A3` IDs, seven continent parents, bbox/centroid/source metadata, a geometry-free generated entity index, hashed manifest, TypeScript contracts, and deterministic generation before dev/test/build. Generated assets remain gitignored like the established world-map build artifacts.

Later approved phases add local search and URL state, pan/zoom/selection, Admin-1 and physical layers, adaptive details, compare, geodesic measurement, bookmarks/history, optional World Bank/Wikimedia enrichment, accessibility hardening, and real manual input QA.

## Authoritative documents

Use [`docs/INDEX.md`](docs/INDEX.md) as the work-unit directory. GEO-002 execution state is authoritative in [`docs/tracker/GEO-002.md`](docs/tracker/GEO-002.md), [`docs/tasks/GEO-002.md`](docs/tasks/GEO-002.md), and [`progress.md`](progress.md). Repository rules are in [`AGENTS.md`](AGENTS.md); shared decisions are in [`docs/DECISIONS.md`](docs/DECISIONS.md).

## Stack

Vite + React + TypeScript + Tailwind CSS + `d3-geo`, managed with pnpm and deployed through GitHub Actions to GitHub Pages. Direct dependencies are exact-pinned. Planned D3 interaction dependencies are not installed until the later task that adds and verifies them.
