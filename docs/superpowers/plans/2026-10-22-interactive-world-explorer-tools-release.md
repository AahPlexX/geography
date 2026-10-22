# Interactive World Explorer — Phase D Exploration Tools & Release Hardening Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete GEO-002 with compare, geodesic distance measurement, local bookmarks/recent history, accessibility/performance hardening, and evidence-backed release validation across phone, tablet, and laptop interaction modes.

**Architecture:** Tools are independent explorer modes/state modules layered over the same stable entity IDs, URL selection model, map controller, and validated local storage boundary. Release hardening adds no new backend or map provider; it verifies the complete local-first explorer and preserves the existing four-page GitHub Pages deployment contract plus the explorer entry.

**Tech Stack:** Existing explorer stack, `d3-geo` spherical distance utilities where appropriate, browser localStorage/history/focus APIs, existing GitHub Actions/Pages pipeline.

## Global Constraints

Compare initially means exactly two compatible entities. Measurement is two-point great-circle distance, not projected pixel distance. Bookmarks/history store stable entity IDs only and validate on read. No analytics/accounts/backend. Manual interaction claims require real evidence. Existing GEO-001 behavior remains release-blocking regression coverage.

---

### Task D1: Add two-entity compare mode

**Files:**
- Create: `src/explorer/compare.ts`
- Create: `src/explorer/components/ComparePanel.tsx`
- Modify: `src/explorer/ExplorerPage.tsx`
- Modify: `src/explorer/url-state.ts`
- Create: `tests/explorer-tools.test.ts`
- Modify: `package.json`

**Interfaces:**
- `CompareState = { primaryId: string; secondaryId: string } | null`.
- `canCompare(a, b): boolean` permits comparisons where both entities expose a meaningful shared presentation family; country↔country and Admin-1↔Admin-1 are guaranteed initial compatible pairs, while unsupported cross-kind pairs return false with an explanatory UI state.
- URL compare state uses stable IDs and is omitted when invalid/incomplete.

- [ ] **Step 1: Add failing compare tests**

Cover starting compare from a selected entity, choosing the second entity through search/list, exact two-entity limit, duplicate selection rejection, incompatible pair rejection, missing field display as unavailable, invalid deep-link IDs dropping compare state safely, Back/Forward restoration, and exiting compare without clearing primary selection.

- [ ] **Step 2: Verify failure**

Run: `node --experimental-strip-types --test tests/explorer-tools.test.ts`
Expected: compare module/UI missing.

- [ ] **Step 3: Implement**

Add an explicit `Compare` action in the entity panel. Reuse the local search component in a compare-selection mode. Present shared fields side-by-side, never inferred. On phones use stacked cards with sticky entity headers; larger screens use a two-column comparison table/card layout. Preserve map selection highlighting for both entities with primary/secondary non-color labels/pattern semantics.

- [ ] **Step 4: Focused pass**

Run tools tests; compare assertions pass.

- [ ] **Step 5: Integration**

Run `pnpm test && pnpm build`.
Expected: compare state does not affect exam/score storage.

- [ ] **Step 6: Commit**

Commit message: `feat: add explorer compare mode`

### Task D2: Add geodesic two-point distance measurement

**Files:**
- Create: `src/explorer/measure.ts`
- Create: `src/explorer/components/MeasureControls.tsx`
- Create: `src/explorer/components/MeasureOverlay.tsx`
- Modify: `src/explorer/components/ExplorerMap.tsx`
- Modify: `src/explorer/ExplorerPage.tsx`
- Modify: `tests/explorer-tools.test.ts`

**Interfaces:**
- `GeoPoint = readonly [longitude: number, latitude: number]`.
- `greatCircleDistanceKm(a: GeoPoint, b: GeoPoint): number` uses spherical/geodesic math (`geoDistance` radians × Earth mean radius 6371.0088 km or equivalent validated implementation).
- `MeasureState = idle | choosingStart | choosingEnd(start) | complete(start,end,distanceKm)`.

- [ ] **Step 1: Add failing math/state tests**

Assert identical points = 0 km, known approximate New York↔London great-circle distance within an explicit tolerance, antimeridian pair correctness, state transitions, reset, Escape exit, keyboard coordinate/selected-entity-point alternative, and no distance derived from SVG pixels.

- [ ] **Step 2: Verify failure**

Run tools test; measure module missing.

- [ ] **Step 3: Implement**

Add visible measure mode control. Pointer/touch map activation records geographic coordinates by inverting the projection/zoom transform. Keyboard users can set start/end using the selected entity representative point or focused coordinate controls. Draw endpoint markers and great-circle/geodesic visual line when projection supports it. Show km and miles, with the stored calculation canonical in km.

- [ ] **Step 4: Focused pass**

Run tools tests; math/state assertions pass.

- [ ] **Step 5: Integration**

Run `pnpm test && pnpm build`.
Expected: map pan/zoom remains available outside active point placement and exiting measurement restores normal selection mode.

- [ ] **Step 6: Commit**

Commit message: `feat: add explorer distance measurement`

### Task D3: Add validated bookmarks and recent exploration

**Files:**
- Create: `src/explorer/storage.ts`
- Create: `src/explorer/components/SavedPlaces.tsx`
- Modify: `src/explorer/ExplorerPage.tsx`
- Modify: `tests/explorer-tools.test.ts`

**Interfaces:**
- `EXPLORER_STORAGE_KEY = 'geography-explorer-state-v1'` or equivalent versioned key.
- Stored shape contains `version`, `bookmarkIds: string[]`, `recentIds: string[]`, and optional validated preferences only; no third-party payloads or learner identifiers.
- `loadExplorerStorage(storage, validIds)` and `saveExplorerStorage(storage, state)` fail soft.

- [ ] **Step 1: Add failing storage tests**

Cover fresh storage, valid round-trip, malformed JSON, wrong version, unknown IDs, duplicate IDs, storage read exception, storage write exception, bookmark toggle, recent de-duplication, newest-first ordering, and cap of 20 recent IDs.

- [ ] **Step 2: Verify failure**

Run tools test; storage module missing.

- [ ] **Step 3: Implement**

Add bookmark toggle to entity panel, saved/recent sections to explorer navigation, and local validation. Bookmarks are not arbitrarily capped in GEO-002; recent items cap at 20. If localStorage fails, UI remains functional for the current session and announces that saved places cannot persist.

- [ ] **Step 4: Focused pass**

Run tools tests; persistence assertions pass.

- [ ] **Step 5: Integration**

Run `pnpm test && pnpm build`.
Expected: no change to GEO-001 progress/score keys.

- [ ] **Step 6: Commit**

Commit message: `feat: add explorer saved places`

### Task D4: Accessibility, reduced-motion, scroll, and performance hardening

**Files:**
- Modify: `src/explorer/explorer.css`
- Modify: `src/explorer/components/ExplorerMap.tsx`
- Modify: `src/explorer/components/ExplorerShell.tsx`
- Modify: `src/explorer/components/EntityPanel.tsx`
- Modify: `src/explorer/components/LayerControls.tsx`
- Modify: `src/explorer/components/ComparePanel.tsx`
- Modify: `src/explorer/components/MeasureControls.tsx`
- Modify: `tests/explorer-foundation.test.ts`
- Modify: `tests/explorer-domain.test.ts`
- Modify: `tests/explorer-tools.test.ts`

**Interfaces:**
- All transient state changes expose predictable focus/announcement contracts.
- Reduced motion is resolved from `prefers-reduced-motion` and passed to zoom/sheet transitions.
- Map wheel behavior respects zoom limits so page scrolling is not permanently trapped.

- [ ] **Step 1: Add/strengthen automated assertions**

Cover semantic labels/landmarks, no required hover-only action, visible focus hooks, reduced-motion no-animation path, Escape behavior, dialog/sheet focus return, 44px-class conventional control targets, layer/compare/measure keyboard entry/exit, unknown state recovery, and source-level protection against every map feature entering tab order.

- [ ] **Step 2: Verify failures**

Run focused explorer tests and identify only genuine missing hardening behavior; do not weaken assertions to make tests pass.

- [ ] **Step 3: Implement targeted fixes**

Repair the concrete failures. Profile/render counts and generated asset sizes; if performance issues are caused by excessive simultaneously rendered features, tighten zoom/layer visibility and chunk loading before considering a renderer rewrite. Keep Canvas/WebGL out unless measured evidence demonstrates SVG cannot meet the target.

- [ ] **Step 4: Automated pass**

Run: `pnpm validate`
Expected: all GEO-001 and GEO-002 tests/build pass.

- [ ] **Step 5: Commit**

Commit message: `fix: harden explorer accessibility and performance`

### Task D5: Manual multi-input QA and repair loop

**Files:**
- Modify implementation files only for defects actually observed.
- Modify: `docs/tracker/GEO-002.md`
- Modify: `docs/tasks/GEO-002.md`
- Add evidence references under an existing repository evidence convention if one exists at implementation time; do not invent screenshots/results that were not captured.

**Required evidence matrix:**

- Phone narrow viewport: touch pan, pinch zoom, tap selection, bottom-sheet states, search keyboard, visible zoom controls, measure placement, bookmarks.
- Tablet portrait + landscape: touch interaction, adaptive panel transition, no obscured controls/overflow.
- Laptop/desktop mouse: drag pan, click selection, hover enhancement with equivalent non-hover access.
- Wheel/trackpad-class input: zoom, zoom-limit page-scroll escape, no permanent scroll trap.
- Keyboard only: search, result selection, layer controls, breadcrumbs, panel, compare entry/exit, measurement alternative, saved/recent, focus return, Back/Forward.
- Reduced motion: fit/reset/entity navigation occurs without nonessential fly/sheet animation.
- Screen-reader-oriented review: landmarks, selected-entity announcements, enrichment loading/failure, mode changes, button/link names.

- [ ] **Step 1: Run manual matrix on deployed candidate**

Record exact viewport/device/input evidence that was actually tested. If browser control is unavailable, keep D5 blocked and do not mark GEO-002 verified.

- [ ] **Step 2: Repair observed defects test-first where reproducible**

For each defect, add the smallest automated regression when practical, then fix and rerun affected validation.

- [ ] **Step 3: Re-run affected manual cases**

Record pass/fail evidence after repair.

- [ ] **Step 4: Commit evidence/fixes**

Commit message reflects the actual repair/evidence scope.

### Task D6: Final release gate and living-document handoff

**Files:**
- Modify: `.github/workflows/deploy.yml` only if smoke coverage still lacks explorer assets/routes.
- Modify: `README.md`
- Modify: `docs/INDEX.md`
- Modify: `docs/DECISIONS.md`
- Modify: `docs/tracker/GEO-002.md`
- Modify: `docs/tasks/GEO-002.md`
- Review/update: `AGENTS.md` authoritative-doc links if plan paths changed.

**Interfaces:**
- CI build → Pages deploy → public smoke verifies `/geography/`, `/geography/exam/`, `/geography/map/`, `/geography/explore/`, each expected title/hashed bundle, existing world-map asset, explorer entity/manifest assets, and at least one representative lazy chunk.

- [ ] **Step 1: Run full local/CI-equivalent gate**

Run: `pnpm validate`
Expected: complete automated suite and production build pass.

- [ ] **Step 2: Push and inspect exact-head GitHub Actions**

Require frozen install, tests, TypeScript/Vite build, Pages configuration/artifact, deploy, and public smoke success for the exact runtime revision. Do not claim deployment success from a prior commit.

- [ ] **Step 3: Verify public direct pages/assets**

Public smoke must confirm all four HTML entry points and representative explorer static assets. Optional external APIs are not release blockers because they are fail-soft; local explorer data is.

- [ ] **Step 4: Synchronize living documentation**

Tracker names exact verified commit/run IDs, manual evidence status, dataset/source revisions, unresolved limitations, and the next safe action. Tasks move to `verified` only with their stated evidence. README describes the user-visible explorer without overstating unsupported entities or accessibility certification.

- [ ] **Step 5: Commit docs-only handoff if needed**

Commit message: `docs: finalize explorer release evidence`

- [ ] **Step 6: Verify docs-only exact head**

Because docs commits trigger deployment in the current repository, inspect the exact-head workflow or explicitly record if a newer docs-only run is queued/cancelled while the immediately preceding identical runtime revision is green.

## Phase D Exit Criteria

Compare, measurement, bookmarks, and recent exploration work against stable local entities; accessibility/performance hardening is automated and manually exercised where environment access permits; all existing GEO-001 behavior stays green; the deployed explorer and lazy data assets pass public smoke; and living documentation contains enough exact state/evidence for an unrelated future agent to continue without this chat.

## Unresolved Product Decisions

None. Manual evidence availability is a verification blocker, not a product-design decision; if required input/browser modes cannot be exercised, GEO-002 remains partially unverified rather than weakening the acceptance contract.
