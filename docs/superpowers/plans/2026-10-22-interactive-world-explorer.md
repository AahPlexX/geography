# Interactive World Explorer Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a local-first, highly interactive `/geography/explore/` atlas that teaches political and physical geography across touch, mouse, trackpad/wheel, keyboard, and responsive layouts without removing or regressing GEO-001.

**Architecture:** GEO-002 is an additive multi-page application surface inside the existing Vite build. A build-time Natural Earth pipeline produces a normalized entity/search index plus progressively loadable political and physical geography chunks; the runtime explorer uses React, `d3-geo`, exact-pinned `d3-zoom`/`d3-selection`, URL-owned exploration state, and fail-soft optional World Bank/Wikimedia enrichment. The implementation is split into four independently reviewable phases so a new agent can resume at any phase boundary.

**Tech Stack:** React 19.3.1, TypeScript 7.0.2, Vite 8.3.5, Tailwind CSS 4.3.3, `d3-geo` 3.1.1, recommended exact pins `d3-zoom` 3.0.0, `d3-selection` 3.0.0, `@types/d3-zoom` 3.0.9, `@types/d3-selection` 3.0.12, Node 22.23.4, pnpm 12.14.0, GitHub Pages.

## Global Constraints

- Preserve `/geography/`, `/geography/exam/`, `/geography/map/`, all GEO-001 curriculum behavior, attempt randomization, score history, visual gating, Study Sheet behavior, and standalone map behavior.
- Add `/geography/explore/` as a real GitHub Pages entry and add one landing-page entry without removing existing choices.
- Core exploration must remain usable if every external API is unavailable.
- Required functionality may not depend on signup, payment, private credentials, API keys, or public tile endpoints whose terms do not explicitly support the intended use.
- Natural Earth is the canonical spatial source; pin immutable source revisions where practical and emit a source manifest with source URL/revision, record counts, processing version, output paths, and hashes.
- Search must be local and usable before detailed global geometry is loaded.
- Do not load every Admin-1 polygon, river, lake, physical region, and populated place at startup.
- Required interaction parity: touch, mouse, wheel/trackpad, and keyboard. Hover may enhance but never gate information.
- Target WCAG 2.2 AA, reduced-motion support, semantic HTML first, visible focus, no color-only meaning, and non-gesture equivalents.
- Persisted explorer data is local/browser-only, versioned, validated on read, and fail-soft.
- Optional World Bank/Wikimedia responses are untrusted, validated, abortable/stale-safe, and clearly attributed.
- Keep `docs/tracker/GEO-002.md`, `docs/tasks/GEO-002.md`, `docs/DECISIONS.md`, this plan set, `docs/INDEX.md`, and relevant project-level docs synchronized after every executable work step.
- Work only on `main`; do not open pull requests unless the owner explicitly overrides repository policy.

## Plan Decisions Authorized by Owner Delegation

These choices resolve externally visible seams not fixed precisely by the design specification. They are part of this implementation plan and may be revised only with a documented decision change.

1. **Projection/runtime rendering:** keep a Natural Earth-style geographic projection using `d3-geo`; pan/zoom is a viewport transform, not a switch to Web Mercator tiles.
2. **Initial search ranking:** exact normalized name → exact alias/code → prefix name → prefix alias → substring. Do not add fuzzy edit-distance matching in GEO-002 unless evidence shows it is needed.
3. **Overlap selection precedence:** explicit active layer and visible rendered target wins; when multiple targets overlap, the visually topmost enabled layer wins. Search remains the deterministic alternative for tiny/ambiguous features.
4. **Compare mode:** initial release compares exactly two compatible entities; this satisfies the requirement while keeping the UI legible on phones.
5. **Measurement:** initial release supports a two-point great-circle distance measurement with move/reset controls rather than arbitrary multi-segment route drawing.
6. **Recent history:** keep the 20 most recent valid entity IDs, newest first, de-duplicated.
7. **Country statistics:** start with four World Bank indicators when available: population (`SP.POP.TOTL`), land area km² (`AG.LND.TOTL.K2`), population density (`EN.POP.DNST`), and life expectancy (`SP.DYN.LE00.IN`). Show source year for each value.
8. **Wikimedia enrichment:** fetch only after a learner opens the enrichment section for the selected entity; no speculative global prefetch.
9. **Map technology:** SVG remains the initial renderer because the data pipeline/lazy loading keeps active DOM feature counts bounded. Canvas/WebGL is a future evidence-driven optimization, not part of GEO-002.

## Phase Graph

1. **Phase A — Explorer Foundation**  
   Route, isolated shell, responsive map workspace, local country/continent entity index, search, deep links, D3 pan/zoom, selection, keyboard alternatives, landing integration, and direct-page smoke. This creates the first useful `/explore/` release.
2. **Phase B — Global Data Expansion**  
   Build/source manifest, Admin-1 chunks, marine/water, rivers/lakes, physical regions/landforms, populated places, layer loading, stable IDs, hierarchy/relationships, provenance, and integrity/performance validation.
3. **Phase C — Learning & Enrichment**  
   Entity-detail learning surface, related navigation, local facts, source disclosure, World Bank statistics, Wikimedia summaries/media, request caching/abort/stale protection, and explicit unavailable states.
4. **Phase D — Exploration Tools & Release Hardening**  
   Compare, geodesic distance measurement, bookmarks, recent history, full keyboard/focus/reduced-motion hardening, manual phone/tablet/laptop QA, performance checks, and final public smoke.

Phase A must complete before B/C/D. Phase B must complete before C because enrichment identifiers and broad entity coverage depend on the normalized entity model. Phase D can begin its persistence/math work after A but final release validation waits for B and C.

## Requirement Coverage Matrix

- **Phase A:** GEO-002-001–005, 013–015, 022–035, 047–049, 054–059, 062, 064–065, 069–071.
- **Phase B:** GEO-002-006–010, 013–021, 036, 038, 041–042, 058–063, 067–068, 071.
- **Phase C:** GEO-002-011–012, 037–042, 050–053, 060–061, 064.
- **Phase D:** GEO-002-022–032, 042–046, 053–066, 068–071.

Requirements intentionally appear in more than one phase when later phases extend or re-verify an earlier contract.

## Plan Artifacts

- `docs/superpowers/plans/2026-10-22-interactive-world-explorer-foundation.md`
- `docs/superpowers/plans/2026-10-22-interactive-world-explorer-data.md`
- `docs/superpowers/plans/2026-10-22-interactive-world-explorer-learning.md`
- `docs/superpowers/plans/2026-10-22-interactive-world-explorer-tools-release.md`

## Verification Contract Across All Phases

Every implementation task follows red → green → integration verification. Focused test files are added to the existing explicit `package.json` test command as they become real. `pnpm test` must keep every existing GEO-001 test green. `pnpm build` must continue emitting all existing HTML entries plus the explorer entry after Phase A. Production workflow smoke must continue testing existing pages and add `/geography/explore/` once it is deployed.

Manual browser/input assertions remain unverified until actual evidence exists; source review, unit tests, or screenshots alone may not be recorded as proof of touch/trackpad/keyboard behavior.

## Current External Verification (2026-10-22)

- `d3-zoom` latest npm release is `3.0.0`; it supports click-drag pan, wheel zoom, touch gestures, programmatic transforms, and scale/translate constraints.
- `d3-selection` latest npm release is `3.0.0`; `@types/d3-selection` latest is `3.0.12`; `@types/d3-zoom` latest observed is `3.0.9`.
- Natural Earth terms state its raster/vector data is public domain.
- World Bank Indicators API states API keys/authentication are not necessary.
- MediaWiki Action API permits anonymous cross-origin requests with `origin=*`; rate/request limits still apply.

Re-verify these facts immediately before dependency/API writes if implementation occurs on a later date.

## Unresolved Product Decisions

None that changes plan structure. The owner delegated administrative approval for implementation decisions on 2026-10-22; the observable defaults above are therefore recorded as plan decisions rather than left implicit.
