---
project: AahPlexX/geography
work_unit: GEO-001
document_status: active
authoritative_branch: main
last_updated: 2026-10-21
---

# Decision log

Newest first. One material fact per line.

- 2026-10-21 D-007: Fresh public sessions start empty; the supplied script's three seeded answers are migration-state artifacts, not default product data. Source: `docs/superpowers/specs/2026-10-21-geography-study-site-design.md` GEO-001-004.
- 2026-10-21 D-006: Identical repeat answer submission is a no-op so score/streak cannot be inflated by repeated clicks. Source: GEO-001-006.
- 2026-10-21 D-005: URL query state owns filter, view, and question ID; versioned local storage owns learner progress; score/accuracy remain derived. Source: spec Sections 5-7.
- 2026-10-21 D-004: No router, global state library, icon package, component framework, backend, accounts, analytics, or API credentials are required for GEO-001. Source: spec Sections 3 and 12.
- 2026-10-21 D-003: The selected visual direction is Geography Lab: large instructional map/diagram plus quiet learner controls, using map lines, compass geometry, and worksheet/highlighter colors as subject-specific cues. Source: spec Section 2.
- 2026-10-21 D-002: The runtime stack is Vite + React + TypeScript + Tailwind CSS with pnpm and exact direct dependency pins; deployment target is GitHub Pages at `/geography/`. Source: spec Sections 3 and 9.
- 2026-10-21 D-001: `main` is the only long-lived authoritative branch and the repository uses direct non-PR integration unless the owner explicitly overrides it. Source: `AGENTS.md`.
