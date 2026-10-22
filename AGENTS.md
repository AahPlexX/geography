---
project: AahPlexX/geography
work_unit: GEO-001
document_status: active
authoritative_branch: main
last_updated: 2026-10-21
---

# Repository instructions

`AGENTS.md` is the single repository instruction file.

## Authority and continuity

- `origin/main` is the only long-lived authoritative branch. Do not open pull requests unless the owner explicitly overrides this rule.
- Before every write, verify repository, `main` tip, branch inventory, pull-request inventory, and the working state available through the active tool. Preserve changes you did not create.
- Keep implementation, tracker, task, decision, and handoff state synchronized in the same work step. A stale tracker means the work is incomplete.
- Never rewrite historical documents to make current state look cleaner. Record new facts in the active tracker or decision log.
- Never commit secrets, credentials, private keys, or user-identifying study data.

## Authoritative project documents

- Product/design requirements: `docs/superpowers/specs/2026-10-21-geography-study-site-design.md`
- Work-unit status and evidence: `docs/tracker/GEO-001.md`
- Task execution state: `docs/tasks/GEO-001.md`
- Work-unit index: `docs/INDEX.md`
- Decisions: `docs/DECISIONS.md`

Keep each fact in one authoritative place and link to it instead of copying it into multiple documents.

## Engineering defaults

- Package manager: pnpm only.
- Pin every direct dependency to an exact version; do not use caret or tilde ranges.
- Prefer existing code, then browser/platform APIs, then installed dependencies, then the smallest necessary custom code.
- Do not add speculative abstractions, unused extension points, placeholder features, or dependencies without a present requirement.
- Use the scripts declared by `package.json` as validation entrypoints after the scaffold exists. Do not invent commands that are not present in the repository.
- Every non-trivial branch, parser, state transition, or persistence boundary needs a focused automated test.
- Accessibility, input validation, data integrity, and deployment correctness are never simplification targets.
- Use semantic HTML first. Use ARIA only where native semantics are unavailable, including interactive SVG regions.
- All client UI must remain usable without horizontal scrolling or typographic collisions across phone, tablet, desktop, and large displays.

## Current external standards baseline

Verified 2026-10-21 against official sources:

- Vite: https://vite.dev/guide/
- React: https://react.dev/versions
- Tailwind CSS: https://tailwindcss.com/docs/installation/framework-guides
- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- MDN Web APIs: https://developer.mozilla.org/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/

Re-verify externally changeable facts before changing dependencies, deployment configuration, or browser API assumptions.
