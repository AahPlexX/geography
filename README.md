# Geography Study Lab

A focused Grade 3 geography study site built from the supplied Bayou Bridges and world-geography quiz. The primary learner is the owner's son preparing for school tests; the site is public so anyone can use the same study set.

Live site: `https://aahplexx.github.io/geography/`

## Current state

The Vite + React + TypeScript + Tailwind client is live on GitHub Pages. The deployed app includes the 60-question teacher-aligned curriculum, versioned local progress, URL-deep-linked study state, five instructional stages, read-aloud support, report card, and the Natural Earth 1:50m world map pipeline.

GitHub Actions run `39723241726` on commit `2fce7f331024ca483e90c978f47be157385aab53` successfully completed the frozen pnpm install, committed tests, TypeScript/Vite build, Pages deployment, and public smoke verification. The smoke check confirms the public HTML, hashed JavaScript bundle, and detailed `data/world-countries.geojson` asset remain reachable.

The pnpm 12 lockfile is committed and CI uses `pnpm install --frozen-lockfile`. Its two YAML documents are the expected pnpm 12 layout when the project pins pnpm through `packageManager`: the leading environment document records the package-manager dependency and the final document records the application dependency graph. `pnpm-workspace.yaml` keeps pnpm's default release-age protection while narrowly excluding the already-reviewed exact pin `vite@8.3.5`, which was less than 24 hours old when frozen CI was first enabled.

Deployed 1440 px WCAG 2.2 A/AA automation now reports zero failures for the default globe view, world map, compass, U.S. regions, symbols, Study Sheet, and open Question Map states. Those scans led to fixes for invalid accessible names and low-contrast topic, origin, and map-note text. The automated scans are evidence, not a compliance certification: they do not replace manual reading-order/screen-reader judgment or the still-required screenshot/interaction QA at 390 px, 768 px, and 1440 px.

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
