# Geography Study Lab

A focused Grade 3 geography study site built from the supplied Bayou Bridges and world-geography quiz. The primary learner is the owner's son preparing for school tests; the site is public so anyone can use the same study set.

Target site: `https://aahplexx.github.io/geography/`

## Current state

Implementation is in progress on `main`. The Vite + React + TypeScript + Tailwind client, 60-question curriculum, versioned local progress, deep-linked study state, five instructional stages, Natural Earth 1:50m world map pipeline, automated domain/data tests, and GitHub Pages workflow are implemented in the current work unit. Local dependency-free tests pass; dependency installation, production build, Pages deployment, lockfile finalization, and browser QA require GitHub Actions because this execution container cannot reach the npm registry.

## Authoritative documents

- Base requirements and design: [`docs/superpowers/specs/2026-10-21-geography-study-site-design.md`](docs/superpowers/specs/2026-10-21-geography-study-site-design.md)
- Active requirement amendments: [`docs/superpowers/specs/2026-10-21-geography-study-site-amendments.md`](docs/superpowers/specs/2026-10-21-geography-study-site-amendments.md)
- Implementation plan: [`docs/superpowers/plans/2026-10-21-geography-study-site.md`](docs/superpowers/plans/2026-10-21-geography-study-site.md)
- Current status and evidence: [`docs/tracker/GEO-001.md`](docs/tracker/GEO-001.md)
- Execution tasks: [`docs/tasks/GEO-001.md`](docs/tasks/GEO-001.md)
- Decisions: [`docs/DECISIONS.md`](docs/DECISIONS.md)
- Repository rules: [`AGENTS.md`](AGENTS.md)

## Stack

Vite + React + TypeScript + Tailwind CSS + d3-geo, managed with pnpm and deployed to GitHub Pages through GitHub Actions. Direct dependencies are exact-pinned. Natural Earth 1:50m country geometry is fetched from an immutable upstream revision during development/build and emitted as a local static site asset.
