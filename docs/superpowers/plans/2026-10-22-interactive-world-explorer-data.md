# Interactive World Explorer — Phase B Global Data Expansion Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the Phase A continent/country explorer into a global political-and-physical atlas covering canonical Natural Earth Admin-1, marine/water, river/lake, physical-region/landform, elevation, and populated-place layers without loading all detail at startup.

**Architecture:** Build a pinned Natural Earth source registry and deterministic normalization pipeline that emits one compact global entity/search index plus independently loadable geometry/data chunks. Admin-1 is chunked by parent country; physical layers are chunked by functional layer and, when materially useful, stable geographic partitions. Runtime layer loading is cached, abortable, manifest-validated, and independent from optional web APIs.

**Tech Stack:** Existing Phase A stack, Node build scripts, SHA-256 manifests, Natural Earth GeoJSON pinned to immutable upstream revisions.

## Global Constraints

Natural Earth remains canonical spatial data. Do not modify GEO-001 `world-countries.geojson` semantics. All generated IDs must be stable and duplicate-free. Missing required identity is a build failure, not a fallback to array position. Search remains available before geometry chunks load. Provenance is present for every entity. No public tile dependency.

---

### Task B1: Create the pinned source registry and generated manifest pipeline

**Files:**
- Create: `src/explorer/build/source-registry.mjs`
- Create: `src/explorer/build/manifest.mjs`
- Create: `src/explorer/build/validate-source.mjs`
- Create: `scripts/fetch-explorer-data.mjs`
- Modify: `package.json`
- Modify: `tests/explorer-data.test.ts`
- Generated: `public/data/explorer/source-manifest.json`

**Interfaces:**
- `EXPLORER_SOURCES`: immutable records `{ key, url, revision, kind, requiredProperties }`.
- `validateFeatureCollection(sourceKey, value): ValidationResult`.
- manifest source entry `{ key, sourceUrl, revision, sha256, sourceFeatureCount, generatedOutputs[] }`.

- [ ] **Step 1: Add failing source-registry tests**

Assert all required layers have immutable HTTPS URLs pinned to the selected Natural Earth revision; source keys are unique; validators reject non-FeatureCollections, too-small/empty required layers, features without geometry, and missing identity/name properties required by that layer.

- [ ] **Step 2: Verify the relevant failure**

Run: `node --experimental-strip-types --test tests/explorer-data.test.ts`
Expected: source registry/manifest APIs missing.

- [ ] **Step 3: Implement the source registry and fetch cache**

Register exact canonical datasets for Admin-0 countries, Admin-1 states/provinces, marine geography polygons, rivers/lake centerlines, lakes, geography-region polygons/points, geography-region elevation points, and populated places. Fetch only when cached source hash/revision does not match. Record upstream URL/revision and raw hash before normalization.

- [ ] **Step 4: Verify focused pass**

Run the focused data test with fixture FeatureCollections; no network dependency is required for unit assertions.

- [ ] **Step 5: Integration check**

Run: `node scripts/fetch-explorer-data.mjs && pnpm test && pnpm build`
Expected: all required sources validate, existing pages still build, source manifest is deterministic for unchanged inputs.

- [ ] **Step 6: Commit**

Commit message: `feat: add explorer source manifest pipeline`

### Task B2: Normalize global political entities and Admin-1 chunks

**Files:**
- Modify: `src/explorer/types.ts`
- Extend/Create: `src/explorer/build/entity-normalize.mjs`
- Create: `src/explorer/build/chunk-writer.mjs`
- Modify: `scripts/fetch-explorer-data.mjs`
- Modify: `tests/explorer-data.test.ts`
- Generated: `public/data/explorer/entities.json`
- Generated: `public/data/explorer/admin1/<country-id>.geojson`

**Interfaces:**
- Stable country ID precedence: usable unique `ADM0_A3`; otherwise validated unique Natural Earth entity identifier explicitly carried in the source. No positional fallback.
- Stable Admin-1 ID precedence: `adm1_code` when present/unique, else validated `ne_id`; emitted as `ne:admin1:<source-id>`.
- `GeoEntitySummary.kind` adds `admin1`; parent country ID is mandatory for Admin-1 entities.

- [ ] **Step 1: Add failing normalization/chunk tests**

Fixtures cover U.S. state, Australian state, Canadian province, non-English/diacritic names, duplicate/absent IDs, parent-country mismatch, aliases/postal/ISO codes, bbox/centroid generation, and chunk path stability. Assert loading Louisiana does not require the global Admin-1 geometry file.

- [ ] **Step 2: Verify failure**

Run focused data test; Admin-1 normalization/chunks absent.

- [ ] **Step 3: Implement political normalization**

Normalize Admin-1 entities into the shared index. Preserve useful source fields as typed local properties only when documented/validated: `iso_3166_2`, `postal`, `type_en`, parent identifiers, multilingual aliases when available. Write one compact geometry FeatureCollection per parent country/territory using stable file names derived from parent entity ID.

- [ ] **Step 4: Focused pass**

Run data tests; IDs/parents/chunks pass.

- [ ] **Step 5: Integration**

Run `pnpm test && pnpm build`; inspect generated manifest counts and ensure country search remains valid.

- [ ] **Step 6: Commit**

Commit message: `feat: add global state province data`

### Task B3: Normalize marine, hydrographic, physical-region, elevation, and populated-place entities

**Files:**
- Modify: `src/explorer/types.ts`
- Modify: `src/explorer/build/entity-normalize.mjs`
- Modify: `src/explorer/build/chunk-writer.mjs`
- Modify: `scripts/fetch-explorer-data.mjs`
- Modify: `tests/explorer-data.test.ts`
- Generated under: `public/data/explorer/layers/`

**Interfaces:**
- Entity kinds extend to `marine`, `river`, `lake`, `island`, `physical_region`, `elevation`, `place` as source classification permits.
- Every entity exposes source provenance and stable source ID; unknown source classifications map only through an explicit normalization table tested with fixtures.

- [ ] **Step 1: Add failing per-layer fixture tests**

Cover one representative ocean/sea, river, lake, island/physical region, mountain/elevation point, and populated place. Assert stable IDs, names/aliases, point/polygon/line geometry references, no cross-kind ID collisions, and search-context labels that disambiguate identical names.

- [ ] **Step 2: Verify failure**

Run focused data test; kinds/layers missing.

- [ ] **Step 3: Implement normalized layers**

Emit compact geometry only with properties required for selection/rendering; richer local entity metadata lives in `entities.json`. Chunk very large point/line layers using stable geographic partitions only after measuring generated size; if a layer is already acceptably small, keep one layer file rather than adding needless chunk complexity. Record the chosen output structure and byte sizes in the manifest.

- [ ] **Step 4: Focused pass**

Run data tests; all canonical kinds validate.

- [ ] **Step 5: Integration**

Run `pnpm test && pnpm build`; confirm initial HTML bundle does not inline generated geometry.

- [ ] **Step 6: Commit**

Commit message: `feat: add physical geography explorer layers`

### Task B4: Add runtime layer loader, cache, and layer controls

**Files:**
- Create: `src/explorer/layers.ts`
- Create: `src/explorer/layer-loader.ts`
- Create: `src/explorer/components/LayerControls.tsx`
- Modify: `src/explorer/components/ExplorerMap.tsx`
- Modify: `src/explorer/ExplorerPage.tsx`
- Create/Modify: `tests/explorer-domain.test.ts`

**Interfaces:**
- `ExplorerLayerId = 'countries' | 'admin1' | 'marine' | 'rivers' | 'lakes' | 'physical' | 'elevation' | 'places'`.
- `loadLayer(request: LayerRequest, signal?: AbortSignal): Promise<LoadedLayer>`.
- In-memory cache key includes manifest/schema version plus stable chunk path.
- Layer state parser validates only known layer IDs.

- [ ] **Step 1: Add failing loader/state tests**

Assert default layers do not load all detail, enabling a layer requests only its needed chunk, concurrent identical requests coalesce, aborted requests do not poison cache, failed chunks expose retryable error state, selection survives layer toggles, and unknown persisted/URL layer IDs are discarded.

- [ ] **Step 2: Verify failure**

Run: `node --experimental-strip-types --test tests/explorer-domain.test.ts`
Expected: layer loader/state modules missing.

- [ ] **Step 3: Implement loader and UI**

Load Admin-1 for the selected/visible parent country when enabled; load physical layers only when enabled or zoom context makes them useful according to explicit layer policy. Use accessible checkboxes/toggles with counts/brief descriptions. Preserve current entity selection even when its geometry layer is hidden; panel remains available and offers `Show on map`.

- [ ] **Step 4: Focused pass**

Run domain tests; loader/cache/state assertions pass.

- [ ] **Step 5: Integration**

Run `pnpm test && pnpm build`; verify no all-detail startup fetch is introduced through source inspection/build artifact references.

- [ ] **Step 6: Commit**

Commit message: `feat: add progressive explorer layers`

### Task B5: Add hierarchy, deterministic relationships, and provenance UI

**Files:**
- Create: `src/explorer/relationships.ts`
- Create: `src/explorer/components/SourceDisclosure.tsx`
- Modify: `src/explorer/components/ExplorerBreadcrumbs.tsx`
- Modify: `src/explorer/components/EntityPanel.tsx`
- Modify: `tests/explorer-data.test.ts`
- Modify: `tests/explorer-domain.test.ts`

**Interfaces:**
- `getParents(id, index)`, `getChildren(id, index)`, `getLocalRelations(id, relationIndex)` return stable IDs only.
- Build-time relation data includes only source-provided or deterministic validated relationships. Border relations are added only if a reliable source field or deterministic geometry derivation has a focused validation test.

- [ ] **Step 1: Add failing relation/provenance tests**

Assert Earth → continent → country → Admin-1 hierarchy, orphan detection, no relation to unknown IDs, provenance source/revision visibility, and that relation functions never synthesize a relationship from name similarity.

- [ ] **Step 2: Verify failure**

Run focused tests; relation module missing.

- [ ] **Step 3: Implement**

Generate/store hierarchy and safe relation lists. Add panel sections for parent, children, supported related entities, and source disclosure. Use progressive disclosure for source details so attribution is discoverable without dominating the learning panel.

- [ ] **Step 4: Focused pass**

Run data/domain tests; hierarchy/provenance assertions pass.

- [ ] **Step 5: Integration**

Run `pnpm test && pnpm build`.
Expected: all GEO-001 and GEO-002 automated checks green.

- [ ] **Step 6: Commit**

Commit message: `feat: add explorer hierarchy and provenance`

## Phase B Exit Criteria

The explorer can find/select canonical continents, countries/territories, global Admin-1 subdivisions, supported marine/water features, rivers/lakes, physical regions/landforms/elevation points, and populated places; detailed geometry loads progressively; source manifest/integrity checks pass; and provenance/hierarchy are local and deterministic.

## Unresolved Product Decisions

No structural product decision remains. The exact chunk threshold for non-Admin-1 physical layers is an engineering measurement decision: use the simplest output that keeps individual transfer/parse costs reasonable and record measured byte sizes in the generated manifest/tracker rather than hard-coding an arbitrary threshold in advance.
