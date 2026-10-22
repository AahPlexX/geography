---
project: AahPlexX/geography
work_unit: GEO-001
document_status: active
authoritative_branch: main
last_updated: 2026-10-21
---

# Geography Study Site Active Amendments

This file changes only the facts listed below. All unmodified requirements in `2026-10-21-geography-study-site-design.md` remain authoritative. Where a listed amendment conflicts with the base design, this file is authoritative for that fact.

## A-001 — Revised teacher worksheet curriculum

The owner's later supplied HTML is authoritative where it changes the earlier source. Questions 4–7 and 38–41 use the teacher-aligned hemisphere wording and answers from that later source. The repeated older questions numbered 39–41 that appear immediately after the revised 38–41 block are a merge artifact and are prohibited from the 60-question bank. Questions 42–60 continue unchanged from the later source.

Teacher worksheet sorting key:

- Northern Hemisphere box: North America, Europe, Asia, Africa.
- Southern Hemisphere box: South America, Antarctica, Australia.
- Eastern Hemisphere box: Antarctica, Africa, Asia, Australia, Europe.
- Western Hemisphere box: North America, South America.

The accurate interactive map does not redefine these assessment answers. Study lab copy must state that map geometry is geographically accurate while hemisphere sorting questions follow the teacher's worksheet key.

## A-002 — Category counts

This amendment replaces GEO-001-003.

**GEO-001-003 — Category integrity**

**Behavior:** Category counts are derived from the authoritative 60 question objects rather than duplicated display constants: `globe=10`, `world=17`, `compass=7`, `us_regions=19`, `symbols=7`.

**Acceptance test:** Dataset invariants assert those exact counts, and filter labels render counts from the dataset rather than hard-coded badge text from the source HTML.

## A-003 — Lean test runner

The planned Vitest dependency is removed. Non-browser domain tests use the Node.js built-in test runner with Node's TypeScript type-stripping support where a test imports `.ts` modules. This changes tooling only; the base specification's required behaviors and validation coverage remain unchanged.

## A-004 — Deep-linked expanded interface state

This amendment extends Sections 6 and GEO-001-017. The URL owns `topic`, `view`, `questionId`, `hintOpen`, `questionMapOpen`, question-map `page`, and optional manually previewed `stage`. Versioned local storage still owns only learner progress. Invalid URL values fall back safely.

## A-005 — High-fidelity world map

### GEO-001-031 — Geographically faithful interactive world map

**Behavior:** The world stage uses real generalized geographic geometry rather than hand-drawn continent blobs. Build-time map data comes from Natural Earth Admin 0 Countries at 1:50m, pinned to immutable upstream commit `ca96624a56bd078437bca8184e78163e5039ad19`. The client renders the Natural Earth I projection with country coastlines/boundaries, groups country features into seven classroom continents (`Oceania` displayed as `Australia`), and projects continent labels, five ocean hotspots, the Equator, and Prime Meridian onto the same coordinate system.

**Accessibility:** Continents, oceans, Equator, and Prime Meridian remain keyboard-operable labeled hotspots; four native answer buttons remain the equivalent non-spatial path.

**Acceptance test:** Automated tests assert the immutable 1:50m source, validate required country/continent metadata, and verify continent grouping. Browser QA confirms recognizable continent/coastline shapes and usable pointer/keyboard targets at approximately 390px, 768px, and 1440px.

## A-006 — Current CI runtime baseline

GitHub Actions uses Node.js `22.23.4` LTS for the release workflow. Vite's `/geography/` base and pnpm-only requirement are unchanged.
