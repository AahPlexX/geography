---
project: AahPlexX/geography
work_unit: GEO-002
document_status: design_approved_pending_owner_spec_review
authoritative_branch: main
last_updated: 2026-10-22
---

# Interactive World Explorer — Product and Architecture Specification

## 1. Authority and purpose

This document defines the approved design for `GEO-002`, an Interactive World Explorer embedded in the existing Geography Study Lab repository. GEO-002 is a project-within-the-project: it has its own route, data model, interaction model, task record, tracker, and implementation plan, but it shares the existing Vite + React + TypeScript + Tailwind deployment and must not regress GEO-001.

The explorer is not a replacement for the Grade 3 exam, practice experience, Study Sheet, or standalone reference map. It is a broader geography-learning environment for freely exploring political and physical geography with touch, mouse, trackpad/wheel, keyboard, search, and contextual navigation.

This specification was derived from owner-approved architecture on 2026-10-22. Implementation must not begin until the owner reviews and approves this committed specification and the subsequent implementation plan is written.

## 2. Non-regression boundary

### GEO-002-001 — Additive route

The explorer SHALL be additive at `/geography/explore/` with a real GitHub Pages HTML entry point. Existing `/geography/`, `/geography/exam/`, and `/geography/map/` entry points SHALL remain present and functional.

### GEO-002-002 — Preserve GEO-001 behavior

Implementation SHALL NOT remove or repurpose existing learner activities, curriculum, teacher-key behavior, attempt randomization, submitted score history, question-specific visual gating, Study Sheet behavior, or standalone-map behavior.

### GEO-002-003 — Isolated module boundary

Explorer implementation SHALL live primarily under `src/explorer/` (or an equivalently isolated explorer subtree) rather than expanding the existing exam `App.tsx` into a second application. Shared components/utilities may be reused only when their contracts remain appropriate for both work units.

### GEO-002-004 — Landing integration

The existing non-exam landing page SHALL gain an additive, prominent `Explore the world` entry linking to `/geography/explore/`. Existing landing choices SHALL remain available.

## 3. Product objective and success criteria

### GEO-002-005 — Learning objective

A learner SHALL be able to start from the world, find or directly select a geographic entity, understand where it is, understand its containing geography and relationships, inspect relevant facts, and continue exploring related places without entering a quiz flow.

### GEO-002-006 — Supported geography classes

The explorer data model SHALL support at minimum:

- continents;
- countries and territories;
- first-order administrative divisions such as states, provinces, regions, departments, and equivalent Admin-1 entities;
- oceans, seas, gulfs, bays, and other named marine regions available in the canonical source layers;
- major lakes and rivers available in the canonical source layers;
- islands and named physical regions available in the canonical source layers;
- deserts, mountain ranges, and elevation/physical-region points where represented by the canonical source layers;
- populated places where represented by the selected Natural Earth populated-place layer.

The United States SHALL expose all states through the same Admin-1 model rather than through a U.S.-only special-case architecture.

### GEO-002-007 — Coverage semantics

“Any” geographic entity means any entity represented in the explorer's documented canonical datasets and selected supported layers. The product SHALL NOT fabricate records for entities absent from those datasets. The UI SHALL expose data provenance and source coverage where relevant.

## 4. Architectural approach

### GEO-002-008 — Local-first atlas

The authoritative spatial explorer SHALL be local-first and static-site compatible. Build-time processing SHALL fetch, validate, compact, normalize, chunk, and emit geographic assets into the deployed site. Runtime external APIs SHALL be optional enrichment only.

The explorer SHALL remain useful if all optional runtime APIs are unavailable.

### GEO-002-009 — No account, payment, or secret dependency

No core or enrichment source may require the repository owner or learner to create an account, provide credentials, supply a private API key, or pay for usage. No secret SHALL be embedded in the browser bundle.

### GEO-002-010 — Canonical spatial source

Natural Earth SHALL be the primary canonical source for world political/physical geometry because its vector/raster map data is public domain and is suitable for static redistribution. Source revisions SHALL be pinned to immutable upstream revisions where practical, recorded in a generated source manifest, and validated before build artifacts are accepted.

Existing GEO-001 Natural Earth country geometry may be reused where appropriate; GEO-002 may add separately processed Natural Earth layers and scales without changing the semantics of the existing exam map asset.

### GEO-002-011 — Optional enrichment sources

The initial approved optional enrichment sources are:

- World Bank Indicators API for curated country-level statistics; it must be treated as unauthenticated optional enrichment and never as the authoritative spatial source.
- Wikimedia/MediaWiki public APIs for optional public summaries and media; browser requests SHALL use anonymous cross-origin patterns documented by Wikimedia and SHALL honor rate limits/etiquette through on-demand requests, debouncing, caching, and no broad speculative prefetching.

An implementation agent MAY omit an enrichment source from an early phase if the local explorer is complete without it, but MAY NOT substitute a source that requires login, payment, or a private API key.

### GEO-002-012 — External API fail-soft behavior

Failure, timeout, rate limiting, malformed responses, CORS failure, or upstream changes from an optional API SHALL NOT prevent entity selection, map navigation, search, hierarchy display, local facts, or local source attribution. Enrichment surfaces SHALL have explicit loading, unavailable, and retry states.

## 5. Normalized geography model

### GEO-002-013 — `GeoEntity` contract

Every searchable/selectable entity SHALL normalize into one stable contract. Exact TypeScript naming may differ, but the model SHALL represent at minimum:

- stable local `id`;
- entity `kind`;
- display `name`;
- searchable `aliases` when available;
- parent entity IDs when known;
- source dataset and source identifier;
- geometry reference or point reference;
- centroid/representative point when derivable;
- bounding box when derivable;
- country/ISO/Wikidata identifiers when source data provides them;
- optional locally stored facts/properties appropriate to the entity kind.

The normalized index SHALL not require loading every detailed geometry file before search is usable.

### GEO-002-014 — Stable IDs

Entity IDs SHALL remain stable across rebuilds as long as the source entity identity remains stable. IDs SHALL be based on canonical source identifiers plus entity kind/source namespace, not array position or search ranking.

### GEO-002-015 — Parent hierarchy

The explorer SHALL support hierarchical navigation such as `Earth → North America → United States → Louisiana` when parent relationships are known. Breadcrumbs SHALL be navigable and SHALL not depend on external APIs.

### GEO-002-016 — Relationships

The explorer MAY expose borders, containing regions, children, related physical features, or connected entities only when the relationship is directly present in canonical data or is produced by a validated deterministic build-time derivation. It SHALL NOT present guessed geographic relationships as facts.

## 6. Data pipeline and asset strategy

### GEO-002-017 — Build-time source manifest

A generated manifest SHALL record every explorer dataset, upstream source URL/revision, processing version, output filename(s), record/feature counts, and content hash. Build validation SHALL fail on structurally invalid required source data.

### GEO-002-018 — Layer separation

Political and physical data SHALL be emitted as independently loadable layers/chunks so the browser does not load all global detail on first paint. At minimum, architecture SHALL separate:

- world/continent overview;
- Admin-0 countries/territories;
- Admin-1 subdivisions;
- marine/water features;
- rivers/lakes;
- physical regions/landforms;
- populated places;
- compact search/entity index.

### GEO-002-019 — Progressive detail

The initial explorer view SHALL load only enough data to render and search the world overview. Detailed Admin-1, hydrographic, physical-region, and populated-place geometry SHALL lazy-load based on selection, enabled layers, or useful zoom context. No detailed layer may be loaded merely because it exists.

### GEO-002-020 — Chunking

Large layers SHALL be chunked by a stable geographic or functional boundary when doing so materially reduces transfer and parse cost. Admin-1 geometry SHOULD be chunked by parent country/territory or another comparably stable grouping so selecting one country does not load every Admin-1 polygon worldwide.

### GEO-002-021 — Data validation

Automated validation SHALL detect at minimum malformed feature collections, missing required identifiers/names, duplicate normalized IDs, unresolved mandatory parent references, invalid generated-manifest hashes, and search-index references to nonexistent entities.

## 7. Map and direct-manipulation interaction

### GEO-002-022 — Input parity

Core exploration SHALL work with phone/tablet touch, mouse, trackpad/wheel, and keyboard. No required action may exist only on hover or only as a gesture.

### GEO-002-023 — Pan and zoom

The map SHALL support:

- pointer/touch drag panning;
- pinch-to-zoom on touch-capable devices;
- wheel/trackpad zoom;
- double-click/double-tap zoom where it does not conflict with selection;
- visible zoom-in, zoom-out, and reset/home controls;
- programmatic fit/focus on a selected entity;
- bounded zoom and pan so users cannot irretrievably lose the map.

A D3 zoom behavior is the preferred implementation direction because the current project already uses D3 geography and D3's zoom module directly supports click-drag, wheel, pinch/touch, programmatic transforms, and translation/scale constraints. Any new direct dependency SHALL be exact-pinned only after its current stable release is re-verified during implementation planning.

### GEO-002-024 — Scroll safety

The explorer SHALL avoid trapping normal page scrolling unnecessarily. Wheel/trackpad behavior SHALL preserve an understandable way to leave or scroll past the map at zoom limits or through an equivalent explicit interaction design. Touch gestures SHALL use browser-compatible `touch-action` behavior and SHALL not disable unrelated page gestures outside the map surface.

### GEO-002-025 — Selection behavior

A click/tap on a selectable visible feature SHALL select the best supported entity at the active layer/zoom. Selection SHALL visibly highlight the entity, update the information surface, update deep-link state, and offer fit/focus without silently changing unrelated state.

### GEO-002-026 — Hover behavior

Hover-capable devices MAY show lightweight preview affordances, but all information available through hover SHALL also be available through focus, selection, search, or another non-hover interaction.

### GEO-002-027 — Keyboard map alternative

Keyboard users SHALL have an efficient equivalent to direct map pointing. The explorer SHALL provide searchable/browsable visible or contextual entities and keyboard-operable map controls. It SHALL NOT create thousands of simultaneously tabbable SVG paths.

### GEO-002-028 — Reduced motion

When `prefers-reduced-motion: reduce` is active, fly-to transitions, animated zoom tours, sheet motion, and other nonessential spatial animations SHALL be disabled or reduced to immediate state changes.

## 8. Responsive workspace

### GEO-002-029 — Phone layout

On narrow phones, the map SHALL remain the primary canvas and entity details SHALL use a touch-friendly bottom sheet/drawer with meaningful collapsed, partial, and expanded states. Essential map controls SHALL remain reachable without requiring the sheet to be fully dismissed.

### GEO-002-030 — Tablet layout

Tablet layout SHALL adapt between bottom-sheet and split-workspace patterns according to available dimensions rather than device user-agent assumptions. Portrait and landscape orientations SHALL both remain usable.

### GEO-002-031 — Laptop/desktop layout

Laptop/desktop layouts SHALL provide a persistent contextual information panel alongside the map when space permits. Pointer hover MAY add previews but SHALL not alter required behavior.

### GEO-002-032 — Large displays

Very large displays SHALL constrain text line length and panel width rather than stretching reading surfaces across the viewport. The map may expand to use available space.

## 9. Search and discovery

### GEO-002-033 — Local universal search

Search SHALL operate from the local normalized entity index and SHALL not require a network request. Typeahead SHALL begin from one character, update as the user types, and support names plus documented aliases.

### GEO-002-034 — Search ranking

Search ranking SHALL prioritize exact matches, normalized-prefix matches, and appropriate high-level geography before weaker substring matches. Search SHALL handle case normalization and diacritics predictably. Fuzzy behavior, if added, SHALL not outrank a valid exact/prefix result.

### GEO-002-035 — Search result context

Results SHALL include enough context to disambiguate same/similar names, such as entity kind and parent geography. Selecting a result SHALL navigate/focus the map and open the same entity-detail surface used by map selection.

### GEO-002-036 — Layer controls

Users SHALL be able to show/hide meaningful explorer layers without losing the current selected entity. Layer controls SHALL be responsive, keyboard operable, and persist only when persistence improves continuity without creating stale invalid state.

## 10. Entity learning surface

### GEO-002-037 — Consistent detail shell

All entity types SHALL use a consistent detail shell that adapts sections to available data rather than rendering empty placeholders.

### GEO-002-038 — Local core information

The detail shell SHALL be able to show locally sourced information including, where applicable:

- entity name and kind;
- containing geography/breadcrumb;
- map location and extent;
- source/provenance;
- locally available identifiers/properties;
- related/child/neighbor entities supported by validated local data;
- actions such as `Zoom here`, `Explore parent`, and `Explore related`.

### GEO-002-039 — Optional country statistics

Country/territory entities MAY expose a curated World Bank statistics section. Initial statistics SHALL be a small educational set rather than an unrestricted indicator browser. Values SHALL display indicator/source labels and data year/date when supplied by the API.

### GEO-002-040 — Optional Wikimedia enrichment

Entities MAY expose an optional Wikimedia summary/media section when an unambiguous source link can be established. Wikimedia content SHALL be clearly attributed as external enrichment and SHALL not replace local geographic identity or geometry.

### GEO-002-041 — Source visibility

The information panel SHALL make the source of local geometry/facts and optional external enrichment discoverable. Disputed or incomplete source data SHALL not be silently editorialized into a stronger claim than the source supports.

## 11. Exploration tools

### GEO-002-042 — Related exploration

The user SHALL be able to move from a selected entity to its parent, supported children, and validated related entities without returning to the landing page.

### GEO-002-043 — Compare mode

A compare tool SHALL support at least two simultaneously selected compatible entities and present shared fields side by side. Fields absent for one entity SHALL be shown as unavailable rather than inferred.

### GEO-002-044 — Measurement mode

The explorer SHALL provide a distance measurement interaction appropriate to a world map. Distance calculation SHALL use spherical/geodesic-aware math rather than raw projected pixel distance. Measurement mode SHALL have touch, pointer, and keyboard-accessible entry/exit/reset controls.

### GEO-002-045 — Bookmarks

Users SHALL be able to bookmark explorer entities locally on the current browser/device without an account. Stored bookmarks SHALL contain stable local entity IDs only (plus minimal version metadata), SHALL validate against the current entity index on load, and SHALL fail soft if storage is unavailable.

### GEO-002-046 — Recent exploration

The explorer MAY keep a bounded local list of recently selected entity IDs to make backtracking easier. It SHALL not collect analytics or send exploration history to a server.

## 12. URL and state model

### GEO-002-047 — Deep links

A selected entity SHALL be deep-linkable under `/geography/explore/`. URL state MAY additionally include meaningful layer/mode state, but SHALL not encode large data blobs or transient pointer positions.

### GEO-002-048 — Navigation history

Selecting entities through search, map, breadcrumbs, or related links SHALL use browser-history semantics intentionally so Back/Forward can traverse meaningful exploration states without reloading the entire site.

### GEO-002-049 — Invalid URL recovery

Unknown entity IDs, unsupported layer values, or malformed explorer URL state SHALL recover to safe explorer defaults with an understandable notice rather than crashing or redirecting into the exam.

## 13. Privacy, security, and network behavior

### GEO-002-050 — No learner account

GEO-002 SHALL not introduce accounts, authentication, backend persistence, advertising, tracking pixels, or analytics as part of this work unit.

### GEO-002-051 — Network minimization

Optional external enrichment requests SHALL occur only when needed for visible learner content. The explorer SHALL not crawl or prefetch large amounts of third-party content in the background.

### GEO-002-052 — Untrusted external data

All optional API payloads SHALL be treated as untrusted. Runtime parsers SHALL validate required fields and tolerate missing or malformed optional values. No external HTML SHALL be inserted unsanitized into the DOM.

### GEO-002-053 — Storage validation

Bookmarks, recent history, and any persisted explorer preferences SHALL be versioned and validated on read. Storage failures SHALL leave the active explorer usable in memory.

## 14. Accessibility and inclusive interaction

### GEO-002-054 — WCAG target

Explorer implementation SHALL target WCAG 2.2 AA and preserve the repository's existing semantic-HTML-first policy.

### GEO-002-055 — Non-gesture equivalents

Every gesture-driven action SHALL have a visible or keyboard-operable equivalent when the gesture is required to accomplish a task. Pinch SHALL not be the only way to zoom; direct touching of a polygon SHALL not be the only way to select it.

### GEO-002-056 — Focus and announcements

Opening/closing adaptive detail surfaces, changing selected entities, entering/exiting compare/measure modes, and loading/failing enrichment SHALL manage focus and/or accessible announcements so screen-reader and keyboard users understand state changes.

### GEO-002-057 — Touch targets and color

Interactive controls SHALL meet the project's WCAG/touch-target expectations, SHALL not rely on color alone, and SHALL have visible focus indicators. Dense map geometry is exempt from pretending every polygon is a conventional 44px control; equivalent search/list selection SHALL satisfy operability for small geographic features.

## 15. Performance and resilience

### GEO-002-058 — No all-world-detail startup

Initial explorer startup SHALL NOT fetch or parse every Admin-1 polygon, river, lake, physical region, and populated place worldwide. Detail layers SHALL load progressively.

### GEO-002-059 — Responsive interaction

Panning, zooming, hover/focus previews, and selection SHALL remain responsive on contemporary phones/tablets/laptops targeted by the project. Expensive relation/search computations SHOULD be precomputed at build time or indexed rather than recomputed across all global features on each pointer event.

### GEO-002-060 — Request cancellation/staleness

When selection changes while an optional enrichment request is in flight, stale responses SHALL not overwrite the current entity panel. Fetches SHOULD be abortable where practical.

### GEO-002-061 — Local fallback

If an optional API is unavailable, locally generated entity content and navigation SHALL still render. If a lazily loaded local layer fails, the UI SHALL expose which layer failed and allow retry while preserving the rest of the explorer state.

## 16. Testing and verification

### GEO-002-062 — Existing-suite regression gate

Every implementation revision SHALL continue to pass all existing GEO-001 tests and build validation before GEO-002 is considered releasable.

### GEO-002-063 — Data-pipeline tests

Automated tests SHALL cover source validation, normalized IDs, duplicate detection, chunk/manifest integrity, parent references, and search-index references.

### GEO-002-064 — Domain tests

Automated tests SHALL cover route parsing, explorer URL state, search ranking, entity selection state, bookmark/history validation, layer-state validation, compare-state rules, measurement math, and fail-soft enrichment parsing.

### GEO-002-065 — Build/deploy tests

Production build SHALL emit a direct `dist/explore/index.html` entry. The post-deploy smoke gate SHALL fetch `/geography/explore/`, verify its expected page title and hashed application asset, and continue verifying all existing public entry points.

### GEO-002-066 — Manual interaction QA

Before GEO-002 is marked verified, manual browser evidence SHALL cover at minimum:

- narrow phone viewport with touch-class interactions;
- tablet portrait and landscape behavior;
- laptop/desktop mouse interactions;
- wheel/trackpad-class zoom and page-scroll behavior;
- keyboard-only search, selection, controls, panel navigation, compare, and measurement entry/exit;
- reduced-motion behavior;
- focus management and screen-reader-oriented interaction review;
- no horizontal overflow or obscured controls at representative viewport sizes.

If a required browser/input mode cannot be tested in the active environment, the corresponding task SHALL remain explicitly unverified rather than inferred from source code.

## 17. Delivery boundaries and prohibited shortcuts

### GEO-002-067 — No paid/keyed map platform

Do not introduce a tile, geocoding, map, or data platform that requires payment, signup, account credentials, or a private token for required functionality.

### GEO-002-068 — No public tile abuse

Do not build required functionality on unrestricted use of a third-party public tile endpoint merely because it currently responds without authentication. Any future tile source must have terms that explicitly support the intended use and must remain optional unless the owner approves a revised architecture.

### GEO-002-069 — No replacement of `/map/`

The existing standalone `/geography/map/` reference page SHALL remain. The richer explorer is a separate product surface and SHALL NOT silently replace the existing map route.

### GEO-002-070 — No router/backend migration by implication

This work unit does not authorize migration to a new frontend framework, server-rendered architecture, backend, database, or global state library. Add such architecture only if later evidence proves it necessary and the owner approves the resulting design amendment.

### GEO-002-071 — No monolithic implementation

Explorer data loading, entity normalization/search, map interaction, detail/enrichment, persistence, and URL state SHALL have clear testable module boundaries. Implementation SHALL not place the whole explorer into one component/file.

## 18. Source baseline verified 2026-10-22

The following external facts were re-verified before this specification was written:

- Natural Earth terms state that all versions of its raster and vector map data are public domain and may be used/modified/distributed without permission: `https://www.naturalearthdata.com/about/terms-of-use/`.
- World Bank Indicators API documentation states API keys/authentication are not necessary for access: `https://datahelpdesk.worldbank.org/knowledgebase/articles/889392`.
- MediaWiki cross-site API documentation states anonymous CORS requests may be made with `origin=*`; request/rate limits still apply and must be respected: `https://www.mediawiki.org/wiki/API:Cross-site_requests` and `https://www.mediawiki.org/wiki/API:FAQ`.
- D3 zoom documentation states direct manipulation supports click-drag panning, wheel zooming, pinch touch, programmatic transforms, and scale/translation constraints: `https://d3js.org/d3-zoom`.

Externally changeable dependency/API assumptions SHALL be re-verified during implementation planning and again before adding/upgrading dependencies or committing new runtime API contracts.

## 19. Design acceptance summary

The approved GEO-002 design is complete when this specification is owner-reviewed and the implementation plan subsequently maps all GEO-002 requirement IDs to executable tasks/tests. No requirement in this document authorizes removing an existing GEO-001 feature.
