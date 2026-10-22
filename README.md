# Geography Study Lab

A focused Grade 3 geography study site built from the supplied Bayou Bridges and world-geography material. The primary learner is preparing for the same classroom test material; the site is public so anyone can use the same study set.

Live site: `https://aahplexx.github.io/geography/`

## Current state

The active `main` implementation expands the teacher-aligned 60-question bank to 80 questions using only same-material practice and adds separate persistent submitted-score history. In-progress answers remain locally saved as before; submitted score history is written only after all 80 questions are completed or when the learner explicitly chooses `Submit score early` after answering at least one question.

An early score uses only questions actually answered for its percentage and preserves the attempted count against the full bank. For example, three correct answers out of three attempted questions is stored and shown as `3 / 80 questions` with a `100%` score rather than implying that all 80 questions were completed.

TDD red run `39790911108` verified the expected missing-behavior failures before implementation. Green implementation run `39792575263` on commit `e0338da46da3c59bdfd1f436ec3f56a13d4f973a` passed frozen install, all `27/27` committed tests, TypeScript/Vite build, Pages configuration, and artifact upload. Its Pages deployment remains queued behind an older failed run in the workflow's single `pages` concurrency group, so no live-deployment claim is made for that revision yet.

The pnpm 12 lockfile is committed and CI uses `pnpm install --frozen-lockfile`. The app remains a static Vite + React + TypeScript + Tailwind client with no account, backend, analytics service, or learner-identifying data collection.

Deployed 1440 px WCAG 2.2 A/AA automation reports zero failures for seven representative baseline states. Those scans are evidence, not a compliance certification, and do not replace the still-required screenshot/interaction QA at 390 px, 768 px, and 1440 px.

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
