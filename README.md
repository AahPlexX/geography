# Geography Study Lab

A focused Grade 3 geography study site built from the supplied Bayou Bridges and world-geography quiz. The primary learner is the owner's son preparing for school tests; the site is public so anyone can use the same study set.

Live site: `https://aahplexx.github.io/geography/`

## Current state

The Vite + React + TypeScript + Tailwind client is live on GitHub Pages. The deployed app includes the 60-question teacher-aligned curriculum, versioned local progress, URL-deep-linked study state, five instructional stages, read-aloud support, report card, and the Natural Earth 1:50m world map pipeline.

GitHub Actions run `39712628445` successfully tested, built, deployed, then fetched the public site, its hashed JavaScript bundle, and the deployed `data/world-countries.geojson` asset. The public smoke check measured the deployed map asset at 2,278,348 bytes.

Deployed-browser screenshot QA at 390 px, 768 px, and 1440 px remains outstanding. The current CI install is non-frozen while a canonical single-document pnpm 12 lockfile is normalized; all direct dependencies remain exact-pinned.

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
