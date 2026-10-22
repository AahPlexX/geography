# Interactive World Explorer — Phase C Learning & Enrichment Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the broad Phase B atlas into a learning surface that explains selected entities, exposes validated relationships and provenance, and optionally enriches country/entity details with fail-soft World Bank and Wikimedia data without making the explorer network-dependent.

**Architecture:** Local normalized entity data remains authoritative for identity, geometry, hierarchy, and locally available facts. Optional enrichment is isolated behind typed clients/parsers with request deduplication, bounded browser-session caching, abort/stale protection, explicit loading/unavailable states, and source attribution.

**Tech Stack:** Existing explorer stack, browser `fetch`/`AbortController`, World Bank Indicators API v2, Wikimedia/MediaWiki Action API anonymous CORS.

## Global Constraints

External data never controls map identity/geometry. No API key, account, payment, backend proxy, or secret. Do not insert external HTML. Stale responses cannot overwrite a newer selection. Network failure leaves the selected entity, local facts, map, search, and navigation usable.

---

### Task C1: Build the local entity learning presenter

**Files:**
- Create: `src/explorer/learning/local-facts.ts`
- Create: `src/explorer/learning/entity-presentation.ts`
- Create: `src/explorer/components/EntityOverview.tsx`
- Create: `src/explorer/components/RelatedEntities.tsx`
- Modify: `src/explorer/components/EntityPanel.tsx`
- Create: `tests/explorer-learning.test.ts`
- Modify: `package.json`

**Interfaces:**
- `buildEntityPresentation(entity, index, relations): EntityPresentation`.
- `EntityPresentation` contains `title`, `kindLabel`, `breadcrumbIds`, `localFactRows`, `relatedGroups`, `sourceDisclosure`, and map actions; empty/unsupported fields are omitted rather than rendered as empty placeholders.

- [ ] **Step 1: Add failing presenter tests**

Use fixtures for continent, country, Admin-1, marine feature, river, lake, physical region, elevation point, and populated place. Assert human-readable kind labels, parent path, geometry/location context, local identifiers only when present, supported related groups, source disclosure, and absence of fabricated facts for missing source fields.

- [ ] **Step 2: Verify failure**

Run: `node --experimental-strip-types --test tests/explorer-learning.test.ts`
Expected: presentation modules missing.

- [ ] **Step 3: Implement local presentation**

Create per-kind adapters that map validated normalized properties into concise educational labels. Keep one shared panel shell; do not build independent page templates per entity kind. Provide actions `Zoom here`, `Explore parent`, `Explore children/related` when those targets exist.

- [ ] **Step 4: Focused pass**

Run learning tests; all local presentation assertions pass.

- [ ] **Step 5: Integration**

Run `pnpm test && pnpm build`.
Expected: explorer remains fully functional offline after local assets are available.

- [ ] **Step 6: Commit**

Commit message: `feat: add explorer learning panels`

### Task C2: Add World Bank country statistics with validation and stale-request protection

**Files:**
- Create: `src/explorer/enrichment/world-bank.ts`
- Create: `src/explorer/enrichment/request-cache.ts`
- Create: `src/explorer/components/CountryStatistics.tsx`
- Modify: `src/explorer/components/EntityPanel.tsx`
- Modify: `tests/explorer-learning.test.ts`

**Interfaces:**
- `WORLD_BANK_INDICATORS` exact local metadata for population `SP.POP.TOTL`, land area `AG.LND.TOTL.K2`, density `EN.POP.DNST`, life expectancy `SP.DYN.LE00.IN`.
- `fetchWorldBankStats(countryCode, signal?): Promise<WorldBankStatsResult>` where result is discriminated `available | unavailable | invalid` and never throws into rendering code for ordinary network/data failures.
- Cache key includes country code + indicator set/version; cache lives only in memory for the current page session.

- [ ] **Step 1: Add failing parser/client tests**

Fixture responses cover valid current values, missing latest year requiring selection of newest non-null value, entirely null series, malformed response shape, HTTP failure, abort, and country without compatible World Bank code. Assert each displayed value carries indicator label and source year.

- [ ] **Step 2: Verify failure**

Run focused learning test; client/parser missing.

- [ ] **Step 3: Implement**

Issue on-demand v2 JSON requests only for country/territory entities with validated compatible code. Fetch indicators concurrently with one selection-scoped AbortController. Cache successful parsed results; do not persist third-party payloads in localStorage. If selection changes, abort previous work and ignore stale completion by selection token even if abort is not honored upstream.

- [ ] **Step 4: Focused pass**

Run tests; parser/error/stale cases pass.

- [ ] **Step 5: Integration**

Run `pnpm test && pnpm build`.
Expected: no secret/env variable added and no server requirement introduced.

- [ ] **Step 6: Commit**

Commit message: `feat: add country statistics enrichment`

### Task C3: Add opt-in Wikimedia summaries and media

**Files:**
- Create: `src/explorer/enrichment/wikimedia.ts`
- Create: `src/explorer/components/WikimediaEnrichment.tsx`
- Modify: `src/explorer/components/EntityPanel.tsx`
- Modify: `tests/explorer-learning.test.ts`

**Interfaces:**
- `resolveWikimediaTitle(entity): string | null` uses source-provided Wikidata/Wikipedia identifiers/title metadata when available; name-only guessing is not treated as an unambiguous link.
- `fetchWikimediaSummary(title, signal?): Promise<WikimediaResult>` returns plaintext intro, canonical page URL/title, optional thumbnail metadata, and attribution fields; no HTML injection.

- [ ] **Step 1: Add failing tests**

Fixtures cover unambiguous entity link, entity without reliable wiki link, plaintext extract, missing thumbnail, disambiguation/missing page, malformed response, HTTP/rate-limit failure, abort, and stale response. Assert no request occurs until the learner expands the enrichment section.

- [ ] **Step 2: Verify failure**

Run focused test; Wikimedia module absent.

- [ ] **Step 3: Implement on-demand enrichment**

Use MediaWiki Action API anonymous CORS with `origin=*`, `format=json`, plaintext intro/extract fields, and page-image thumbnail metadata. Do not render arbitrary API HTML. Cache successful results in memory by canonical title. Present clear `From Wikimedia` attribution and a normal external link to the canonical article.

- [ ] **Step 4: Focused pass**

Run tests; lazy-request, validation, and stale-safety assertions pass.

- [ ] **Step 5: Integration**

Run `pnpm test && pnpm build`.
Expected: no broad prefetch and explorer local features remain network-independent.

- [ ] **Step 6: Commit**

Commit message: `feat: add optional Wikimedia enrichment`

### Task C4: Complete related exploration and enrichment state UX

**Files:**
- Create: `src/explorer/enrichment/enrichment-state.ts`
- Modify: `src/explorer/components/RelatedEntities.tsx`
- Modify: `src/explorer/components/CountryStatistics.tsx`
- Modify: `src/explorer/components/WikimediaEnrichment.tsx`
- Modify: `src/explorer/ExplorerPage.tsx`
- Modify: `tests/explorer-learning.test.ts`
- Modify: `tests/explorer-domain.test.ts`

**Interfaces:**
- `EnrichmentState<T> = idle | loading | available<T> | unavailable(reason) | retryable(reason)`.
- Related navigation always selects a stable local entity ID and routes through the same URL/history selection mechanism as map/search selection.

- [ ] **Step 1: Add failing state/navigation tests**

Assert visible loading text, retry button only for retryable failures, unavailable content never removes local panel sections, switching entity resets incompatible enrichment state, related links create browser-history entries, Back restores previous selected entity, and focus lands on the updated entity heading after an explicit related-navigation activation.

- [ ] **Step 2: Verify failure**

Run learning/domain focused tests; state orchestration missing.

- [ ] **Step 3: Implement**

Centralize enrichment state transitions; keep each provider isolated. Announce loading/failure/available changes through a polite status region without repeatedly moving focus. Related-navigation buttons/links call the existing selection/history action and request map fit only after local selection succeeds.

- [ ] **Step 4: Focused pass**

Run both focused test files; assertions pass.

- [ ] **Step 5: Integration**

Run `pnpm test && pnpm build`.
Expected: all GEO-001/GEO-002 tests green.

- [ ] **Step 6: Commit**

Commit message: `feat: complete explorer learning flow`

### Task C5: Verify API contracts and document source behavior

**Files:**
- Modify: `docs/tracker/GEO-002.md`
- Modify: `docs/DECISIONS.md`
- Create if evidence warrants: `docs/explorer/SOURCES.md`
- Modify: `README.md` only if public behavior/source disclosure changed materially.

**Interfaces:**
- Source record documents endpoint family, authentication requirement (`none`), request timing, cache scope, parser version/fields, attribution, and fail-soft behavior.

- [ ] **Step 1: Re-verify authoritative API docs**

Confirm World Bank v2 unauthenticated access and MediaWiki anonymous CORS/rate-limit guidance on the implementation date. If either contract changed incompatibly, keep the provider disabled and record the blocker rather than introducing credentials.

- [ ] **Step 2: Run full automated gate**

Run: `pnpm validate`
Expected: all tests and production build pass.

- [ ] **Step 3: Record evidence**

Update tracker/task/source docs with exact commit/run evidence and any provider-specific limitations. Do not mark browser UX verified without manual evidence.

- [ ] **Step 4: Commit**

Commit message: `docs: record explorer learning evidence`

## Phase C Exit Criteria

Every supported entity has a coherent local learning panel with location/hierarchy/provenance and valid related navigation. Compatible countries can optionally show validated World Bank statistics. Entities with unambiguous Wikimedia linkage can optionally show plaintext summaries/media. Network/provider failure never disables local exploration, and stale responses cannot replace newer selection content.

## Unresolved Product Decisions

None. Provider fields and interaction timing are fixed by this plan; future additional providers or unrestricted indicator browsing require a new documented scope decision.
