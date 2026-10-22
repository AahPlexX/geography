---
project: AahPlexX/geography
work_unit: GEO-001
document_status: active
authoritative_branch: main
last_updated: 2026-10-21
---

# Decision log

Newest first. One material fact per line.

- 2026-10-21 D-016: Browser storage access is fail-soft: read failures initialize empty progress and write failures leave the active in-memory quiz usable instead of crashing the learner interface. Source: `src/lib/storage.ts` and `tests/study-state.test.ts`.
- 2026-10-21 D-015: Stored learner progress is untrusted: selected option text is checked against the current question bank, correctness is re-derived from curriculum data, and stored streak is clamped to the number of currently correct answers. Source: `src/lib/storage.ts` and `tests/study-state.test.ts`.
- 2026-10-21 D-014: Natural Earth 1:50m geometry is preserved while build-time compaction removes unused country metadata, retaining only `CONTINENT`, `NAME`, and `ADM0_A3` before the static asset is emitted. Source: `src/lib/map-data.mjs`, `scripts/fetch-map.mjs`, and `tests/map-data.test.mjs`.
- 2026-10-21 D-013: GitHub Actions uses Node.js 22.23.4 LTS; the first CI run may generate the missing pnpm lockfile because the execution container cannot reach npm, after which the lockfile is committed and CI changes to `--frozen-lockfile`. Source: `docs/superpowers/plans/2026-10-21-geography-study-site.md` Task 7.
- 2026-10-21 D-012: The world stage uses Natural Earth Admin 0 Countries 1:50m geometry pinned to commit `ca96624a56bd078437bca8184e78163e5039ad19`, rendered with Natural Earth I projection; `Oceania` is presented as classroom continent `Australia`. Source: active amendment A-005.
- 2026-10-21 D-011: The owner's later HTML supersedes earlier hemisphere curriculum for Q4–7 and Q38–41; the repeated older Q39–41 block is a merge artifact and is prohibited. Source: active amendment A-001.
- 2026-10-21 D-010: Category counts come from the 60 question objects (`10/17/7/19/7`) rather than stale source badge text (`10/18/7/17/8`). Source: active amendment A-002 and `tests/question-bank.test.mjs`.
- 2026-10-21 D-009: Domain tests use Node's built-in test runner instead of adding Vitest; browser QA remains separate. Source: active amendment A-003.
- 2026-10-21 D-008: URL state additionally covers hint expansion, question-map expansion/page, and manual stage preview so stateful controls can be deep-linked. Source: active amendment A-004.
- 2026-10-21 D-007: Fresh public sessions start empty; the supplied script's three seeded answers are migration-state artifacts, not default product data. Source: `docs/superpowers/specs/2026-10-21-geography-study-site-design.md` GEO-001-004.
- 2026-10-21 D-006: Identical repeat answer submission is a no-op so score/streak cannot be inflated by repeated clicks. Source: GEO-001-006.
- 2026-10-21 D-005: URL query state owns filter, view, and question ID; versioned local storage owns learner progress; score/accuracy remain derived. Source: spec Sections 5-7, extended by D-008.
- 2026-10-21 D-004: No router, global state library, icon package, component framework, backend, accounts, analytics, or API credentials are required for GEO-001. Source: spec Sections 3 and 12.
- 2026-10-21 D-003: The selected visual direction is Geography Lab: large instructional map/diagram plus quiet learner controls, using map lines, compass geometry, and worksheet/highlighter colors as subject-specific cues. Source: spec Section 2.
- 2026-10-21 D-002: The runtime stack is Vite + React + TypeScript + Tailwind CSS with pnpm and exact direct dependency pins; deployment target is GitHub Pages at `/geography/`. Source: spec Sections 3 and 9.
- 2026-10-21 D-001: `main` is the only long-lived authoritative branch and the repository uses direct non-PR integration unless the owner explicitly overrides it. Source: `AGENTS.md`.
