# Interactive World Explorer — Phase A Foundation Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the first useful `/geography/explore/` release with a preserved existing site, local continent/country exploration, universal local search, deep links, responsive details, and high-quality pan/zoom/select interaction across touch, mouse, wheel/trackpad, and keyboard.

**Architecture:** Add a fourth Vite HTML entry and an isolated `src/explorer/` application. Reuse the existing validated Natural Earth country asset to bootstrap a normalized local entity/search index for continents and countries, then render it through an SVG `d3-geo` map controlled by exact-pinned `d3-zoom`/`d3-selection`; later phases extend the same contracts rather than replacing them.

**Tech Stack:** Existing stack plus exact pins `d3-zoom@3.0.0`, `d3-selection@3.0.0`, `@types/d3-zoom@3.0.9`, `@types/d3-selection@3.0.12`.

## Global Constraints

Preserve all GEO-001 behavior and routes. Do not touch exam curriculum semantics. No API key/backend/router. Search is local. External enrichment is absent from this phase. Every gesture has a visible/keyboard alternative. All persisted/URL state is validated and fail-soft.

---

### Task A1: Add the isolated explorer route and release entry

**Files:**
- Create: `explore/index.html`
- Create: `src/explorer/ExplorerPage.tsx`
- Create: `tests/explorer-foundation.test.ts`
- Modify: `src/lib/app-route.ts`
- Modify: `src/main.tsx`
- Modify: `src/components/LandingPage.tsx`
- Modify: `vite.config.ts`
- Modify: `.github/workflows/deploy.yml`
- Modify: `package.json`

**Interfaces:**
- Consumes: existing `resolveAppRoute(pathname, basePath)` and `import.meta.env.BASE_URL` navigation pattern.
- Produces: `AppRoute` including `'explore'`; direct `/geography/explore/`; `ExplorerPage` root component.

- [ ] **Step 1: Add the focused failing test**

Add assertions that `resolveAppRoute('/geography/explore/', '/geography/') === 'explore'`, `explore/index.html` contains the expected title, Vite includes `explore/index.html`, `src/main.tsx` selects `ExplorerPage`, the landing page links to `${base}explore/`, and the workflow smoke script includes `/geography/explore/`.

- [ ] **Step 2: Verify the relevant failure**

Run: `node --experimental-strip-types --test tests/explorer-foundation.test.ts`
Expected: route/entry/link/smoke assertions fail because explorer files and route do not exist.

- [ ] **Step 3: Implement the minimum behavior**

Add the HTML entry, extend the route union/resolver, render `ExplorerPage` from `main.tsx`, add a prominent additive landing card without altering existing cards, register the Vite input, and extend post-deploy smoke with expected explorer title and hashed bundle checks. `ExplorerPage` initially renders semantic heading, concise purpose text, and a loading shell only.

- [ ] **Step 4: Verify the focused pass**

Run: `node --experimental-strip-types --test tests/explorer-foundation.test.ts`
Expected: route/entry/integration assertions pass.

- [ ] **Step 5: Run the affected integration check**

Run: `pnpm test && pnpm build`
Expected: existing tests remain green and `dist/explore/index.html` is emitted alongside all existing pages.

- [ ] **Step 6: Commit the passing deliverable**

Commit message: `feat: add interactive explorer entry`

### Task A2: Establish normalized continent/country entities and local search data

**Files:**
- Create: `src/explorer/types.ts`
- Create: `src/explorer/build/entity-normalize.mjs`
- Create: `scripts/build-explorer-foundation.mjs`
- Create generated: `public/data/explorer/entities.json`
- Create generated: `public/data/explorer/manifest.json`
- Create: `tests/explorer-data.test.ts`
- Modify: `package.json` predev/prebuild scripts so existing `fetch-map.mjs` runs before explorer generation.

**Interfaces:**
- Produces `GeoEntityKind = 'continent' | 'country' | ...future kinds`; `GeoEntitySummary` with `id`, `kind`, `name`, `aliases`, `parentIds`, `source`, `sourceId`, optional `centroid`, `bbox`, identifiers, and local properties.
- Produces `ExplorerManifest` with `schemaVersion`, `processingVersion`, source records, output paths/counts/hashes.
- Generates stable IDs `ne:continent:<normalized-name>` and `ne:country:<ADM0_A3>`; if a source country lacks a unique usable `ADM0_A3`, fail generation rather than invent array-position identity.

- [ ] **Step 1: Add failing data tests**

Assert generated entity IDs are unique, every country has a continent parent, continent entities are synthetic parents derived from country metadata, search data loads without geometry parsing, every generated file referenced by the manifest exists and hashes/counts match, and malformed/missing identifiers fail validation.

- [ ] **Step 2: Verify the relevant failure**

Run: `node --experimental-strip-types --test tests/explorer-data.test.ts`
Expected: missing normalization/generator modules and assets cause focused failures.

- [ ] **Step 3: Implement the minimum data pipeline**

Read the existing `public/data/world-countries.geojson` after `fetch-map.mjs`; create continent and country summaries, derive country bbox/centroid using `d3-geo` utilities or deterministic geometry helpers, emit compact JSON and SHA-256 manifest metadata. Do not modify `world-countries.geojson` semantics.

- [ ] **Step 4: Verify focused pass**

Run: `node scripts/fetch-map.mjs && node scripts/build-explorer-foundation.mjs && node --experimental-strip-types --test tests/explorer-data.test.ts`
Expected: deterministic generated assets and integrity tests pass.

- [ ] **Step 5: Integration check**

Run: `pnpm test && pnpm build`
Expected: generated explorer assets ship without changing existing map output.

- [ ] **Step 6: Commit**

Commit message: `feat: add explorer entity index`

### Task A3: Add local typeahead, URL state, and navigation history

**Files:**
- Create: `src/explorer/search.ts`
- Create: `src/explorer/url-state.ts`
- Create: `src/explorer/data-loader.ts`
- Create: `src/explorer/components/ExplorerSearch.tsx`
- Create: `src/explorer/components/ExplorerBreadcrumbs.tsx`
- Modify: `src/explorer/ExplorerPage.tsx`
- Modify: `tests/explorer-foundation.test.ts`

**Interfaces:**
- `rankEntities(query: string, entities: readonly GeoEntitySummary[], limit = 12): GeoEntitySummary[]`
- `parseExplorerUrl(search: string, validIds: ReadonlySet<string>): ExplorerUrlState`
- `serializeExplorerUrl(state: ExplorerUrlState): string`
- `loadEntityIndex(baseUrl: string, signal?: AbortSignal): Promise<ExplorerIndex>`

- [ ] **Step 1: Add failing behavior tests**

Cover one-character search, exact/prefix/substring precedence, case/diacritic normalization, aliases/codes, contextual result labels, empty query, invalid URL entity recovery, valid entity round-trip, and Back/Forward state restoration through a pure reducer/history adapter test.

- [ ] **Step 2: Verify failure**

Run: `node --experimental-strip-types --test tests/explorer-foundation.test.ts`
Expected: search/URL modules missing.

- [ ] **Step 3: Implement**

Load only the compact index at startup. Search begins after one character and limits rendered results. Selection uses `history.pushState`; initialization and `popstate` validate entity IDs and recover invalid IDs to no selection with a visible notice. Breadcrumbs use local parent IDs only.

- [ ] **Step 4: Focused pass**

Run the focused test; all search/url assertions pass.

- [ ] **Step 5: Integration**

Run `pnpm test && pnpm build`.
Expected: all tests/build green.

- [ ] **Step 6: Commit**

Commit message: `feat: add explorer search and deep links`

### Task A4: Add D3 pan/zoom and selectable world map

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `src/explorer/map/zoom-controller.ts`
- Create: `src/explorer/map/map-geometry.ts`
- Create: `src/explorer/components/ExplorerMap.tsx`
- Create: `src/explorer/components/MapControls.tsx`
- Modify: `src/explorer/ExplorerPage.tsx`
- Modify: `tests/explorer-foundation.test.ts`

**Interfaces:**
- `createZoomBehavior(options)` wraps `d3-zoom` with explicit scale/translate extents and reduced-motion duration control.
- `fitEntity(entity, viewport, projection)` returns a bounded transform.
- `ExplorerMap` accepts `selectedId`, `onSelect(id)`, `reducedMotion`, and entity/geometry data.

- [ ] **Step 1: Add failing tests**

Test transform clamping, fit-to-bounds math, reset transform, reduced-motion zero-duration path, topmost-enabled target selection policy, and source assertions that visible zoom-in/zoom-out/home controls exist and the map is not implemented as thousands of tabbable paths.

- [ ] **Step 2: Verify failure**

Run focused test; expect missing dependency/modules.

- [ ] **Step 3: Add exact dependencies and implementation**

Install exact pins only. Use `d3-selection` to attach `d3-zoom` to the SVG root. Configure bounded scale/translation, wheel/trackpad handling that permits page scroll when zoom has reached the corresponding limit, touch pinch/pan, double-click/double-tap, visible controls, and programmatic fit/reset. Map feature paths are pointer-selectable; keyboard selection occurs through search/context lists instead of per-path tab stops.

- [ ] **Step 4: Focused pass**

Run focused test; transform/interaction contracts pass.

- [ ] **Step 5: Integration**

Run `pnpm test && pnpm build`.
Expected: exact dependency lockfile is stable and all current pages compile.

- [ ] **Step 6: Commit**

Commit message: `feat: add explorer pan zoom map`

### Task A5: Build adaptive details workspace and accessibility baseline

**Files:**
- Create: `src/explorer/components/EntityPanel.tsx`
- Create: `src/explorer/components/ExplorerShell.tsx`
- Create: `src/explorer/components/EntityList.tsx`
- Create: `src/explorer/explorer.css`
- Modify: `src/explorer/ExplorerPage.tsx`
- Modify: `tests/explorer-foundation.test.ts`

**Interfaces:**
- `EntityPanel` consumes selected `GeoEntitySummary`, parents/children, and focus callbacks.
- `ExplorerShell` exposes semantic regions for search/navigation, map, and details; CSS media/container rules switch between phone bottom sheet and larger split workspace.

- [ ] **Step 1: Add failing source/domain assertions**

Assert semantic landmarks/headings, live status region, focus-return contract for sheet close/open, visible non-gesture controls, reduced-motion CSS, phone bottom-sheet classes, tablet/desktop split rules, no hover-only text, and a keyboard-selectable contextual entity list.

- [ ] **Step 2: Verify failure**

Run focused test; expect missing shell/panel/accessibility hooks.

- [ ] **Step 3: Implement minimum responsive UX**

Phone: full map plus collapsed/partial/expanded bottom sheet with safe-area padding. Tablet: adaptive sheet/split based on width. Desktop: persistent side panel with constrained reading width. Selection announces the entity name/kind; search focus remains predictable; Escape collapses transient search/sheet UI without clearing selection unless explicitly requested. Reduced motion removes fly/sheet transitions.

- [ ] **Step 4: Focused pass**

Run focused test; assertions pass.

- [ ] **Step 5: Integration and release check**

Run `pnpm test && pnpm build`; after deploy, verify root/exam/map/explore smoke. Manual browser evidence remains a separate unverified task until actually performed.

- [ ] **Step 6: Commit**

Commit message: `feat: complete explorer foundation workspace`

## Phase A Exit Criteria

A deployed learner can enter `/geography/explore/`, search continents/countries from one character, select by map or keyboard-search/list, pan/zoom with touch/mouse/wheel/trackpad-class input, use visible zoom controls, follow breadcrumbs, deep-link a selected entity, navigate Back/Forward, and read responsive local details. All GEO-001 tests/build/smoke remain green. No Phase B/C/D feature is required to call Phase A complete.

## Unresolved Product Decisions

None for Phase A. Observable choices are fixed by the master plan decisions.
