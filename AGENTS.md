---
project: AahPlexX/geography
work_units: [GEO-001, GEO-002]
document_status: active
authoritative_branch: main
last_updated: 2026-10-22
---

# Repository instructions

`AGENTS.md` is the single repository instruction file.

## Authority and continuity

- `origin/main` is the only long-lived authoritative branch. Do not open pull requests unless the owner explicitly overrides this rule.
- Before every write, verify repository, `main` tip, branch inventory, pull-request inventory, and the working state available through the active tool. Preserve changes you did not create.
- Keep implementation, tracker, task, decision, and handoff state synchronized in the same work step. A stale tracker means the work is incomplete.
- Never rewrite historical documents to make current state look cleaner. Record new facts in the active tracker, status amendment, or decision log.
- Never commit secrets, credentials, private keys, or user-identifying study/explorer data.
- Treat `docs/INDEX.md` as the work-unit directory. Read the active tracker/task/spec/approval/plan for the work unit being changed before editing production code.
- `GEO-001` and `GEO-002` are separate work units. GEO-002 work must not satisfy its scope by deleting, repurposing, or weakening GEO-001 functionality.

## Authoritative project documents

### GEO-001 — Geography Study Lab

- Product/design requirements: `docs/superpowers/specs/2026-10-21-geography-study-site-design.md`
- Active product/design amendments: `docs/superpowers/specs/2026-10-21-geography-study-site-amendments.md`
- Implementation plans: `docs/superpowers/plans/2026-10-21-geography-study-site.md` and `docs/superpowers/plans/2026-10-22-randomized-exam-map-visual-gating.md`
- Work-unit status/evidence: `docs/tracker/GEO-001.md`
- Task execution state: `docs/tasks/GEO-001.md`

### GEO-002 — Interactive World Explorer

- Product/design requirements: `docs/superpowers/specs/2026-10-22-interactive-world-explorer-design.md`
- Specification approval status: `docs/superpowers/specs/2026-10-22-interactive-world-explorer-approval.md`
- Master implementation roadmap: `docs/superpowers/plans/2026-10-22-interactive-world-explorer.md`
- Phase A — Foundation: `docs/superpowers/plans/2026-10-22-interactive-world-explorer-foundation.md`
- Phase B — Global Data Expansion: `docs/superpowers/plans/2026-10-22-interactive-world-explorer-data.md`
- Phase C — Learning & Enrichment: `docs/superpowers/plans/2026-10-22-interactive-world-explorer-learning.md`
- Phase D — Exploration Tools & Release Hardening: `docs/superpowers/plans/2026-10-22-interactive-world-explorer-tools-release.md`
- Work-unit status/evidence: `docs/tracker/GEO-002.md`
- Task execution state: `docs/tasks/GEO-002.md`

### Shared

- Work-unit index: `docs/INDEX.md`
- Decisions: `docs/DECISIONS.md`
- Project overview: `README.md`

Keep each fact in one authoritative place and link to it instead of copying it into multiple documents where possible.

## Engineering defaults

- Package manager: pnpm only.
- Pin every direct dependency version; do not use caret or tilde ranges.
- Verify the current stable/supported dependency version from authoritative sources before adding or changing a dependency.
- Prefer existing code, then browser/platform APIs, then installed dependencies, then the smallest necessary custom code.
- Do not add speculative abstractions, unused extension points, placeholder features, or dependencies without a present requirement.
- Use the scripts declared by `package.json` as validation entrypoints after the scaffold exists. Do not invent commands that are not present in the repository.
- Every non-trivial branch, parser, state transition, persistence boundary, data normalizer, or input-interaction boundary needs a focused automated test.
- Accessibility, input validation, data integrity, performance safety, and deployment correctness are never simplification targets.
- Use semantic HTML first. Use ARIA only where native semantics are unavailable, including interactive SVG regions.
- All client UI must remain usable without horizontal scrolling or typographic collisions across phone, tablet, desktop, and large displays.
- Required functionality must not depend on paid/sign-up/private-key external services unless the owner explicitly approves a later architecture change.
- External runtime data is untrusted: validate it, fail soft, and keep locally available product behavior usable when optional services fail.
- For GEO-002, read both the master roadmap and the relevant phase plan before implementation; do not collapse phase boundaries or skip the recorded TDD/release gates.

## Current external standards baseline

Verified 2026-10-21/22 against official sources:

- Vite: https://vite.dev/guide/
- React: https://react.dev/versions
- Tailwind CSS: https://tailwindcss.com/docs/installation/framework-guides
- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- MDN Web APIs: https://developer.mozilla.org/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Natural Earth terms: https://www.naturalearthdata.com/about/terms-of-use/
- World Bank Indicators API: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392
- MediaWiki cross-site API: https://www.mediawiki.org/wiki/API:Cross-site_requests
- D3 zoom: https://d3js.org/d3-zoom
- npm `d3-zoom`: 3.0.0 verified 2026-10-22
- npm `d3-selection`: 3.0.0 verified 2026-10-22
- npm `@types/d3-zoom`: 3.0.9 verified 2026-10-22
- npm `@types/d3-selection`: 3.0.12 verified 2026-10-22

Re-verify externally changeable facts before changing dependencies, deployment configuration, browser API assumptions, or external runtime API contracts.
