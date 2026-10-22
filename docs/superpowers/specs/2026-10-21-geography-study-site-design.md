---
project: AahPlexX/geography
work_unit: GEO-001
document_status: active
authoritative_branch: main
last_updated: 2026-10-21
---

# Geography Study Site Design

## 1. Product definition

The product is a focused Grade 3 geography study site derived from the owner's supplied 60-question Bayou Bridges and world-geography quiz. The primary learner is the owner's son preparing for school tests; public learners are a secondary audience. The page's primary job is to make repeated visual recall practice fast, understandable, and confidence-building.

The supplied HTML/JavaScript quiz is the curriculum and interaction source for GEO-001. Migration preserves the 60 questions, four-choice answer sets, rationales, hints, categories, interactive study stages, question map, read-aloud action, report card, filters, and reset behavior unless this specification explicitly improves an implementation defect or accessibility problem.

Fresh visitors start at `0 / 60`; the three pre-populated answers in the supplied script are prior-session state and are not product defaults.

## 2. Design direction

### Central idea

Turn the learner's worksheet world into a calm geography lab: one large instructional map or diagram remains the memorable visual anchor while the quiz controls stay quiet, readable, and predictable.

### Subject-specific cues

- Map lines, region fills, labels, latitude/longitude-style guide lines, and water/land contrast.
- Compass geometry and directional orientation.
- Worksheet/highlighter colors used to encode learning state rather than decorative gradients.

### Chosen art direction

`Geography lab` is selected over a field-notebook treatment and a direct classroom-worksheet replica because it best preserves the interactive map-first behavior without copying the source page's duplicated chrome.

### Palette

- Atlas navy: `#0B1F33`
- Map water: `#EAF6FF`
- Land green: `#16A34A`
- Study amber: `#F59E0B`
- Correction red: `#DC2626`
- Paper white: `#FFFFFF`

Color is reserved for topic identity, answer state, progress, and geographic meaning. Decorative gradients are not required.

### Typography

- Fredoka: display headings and short learner-facing emphasis.
- Nunito: body copy, controls, rationales, hints, and navigation.
- Text measure stays under 80 characters for prose blocks.
- Heading line wrapping is balanced where supported.

### Layout

Wide view:

```text
[brand + progress + score + streak]
[topic filters + question map + report + reset]
[      interactive geography stage      ][ question + choices ]
[ study tip / source                    ][ previous / next   ]
```

Narrow view:

```text
[brand + compact progress]
[question + choices]
[interactive geography stage]
[topic filters + question map]
```

The wide map-first layout is authoritative because the interactive geography stage is the most characteristic element in the source material. On phones the question moves first so the learner does not need to scroll past a large diagram before knowing what to find.

Major text blocks are left-aligned for scanability. Map labels and numeric score/progress values are centered because their meaning is spatial or quantitative. No body copy is justified.

## 3. Technical architecture

### Runtime

Static single-page client application:

- Vite `8.3.5`
- React `19.3.1`
- React DOM `19.3.1`
- TypeScript `7.0.2`
- Tailwind CSS `4.3.3`
- `@tailwindcss/vite` `4.3.3`
- `@vitejs/plugin-react` `6.1.2`
- `@types/react` `19.3.0`
- `@types/react-dom` `19.3.0`
- Vitest `5.0.5`
- pnpm only

All direct dependency versions are exact-pinned. Vite requires Node `20.19+` or `22.12+`; the repository shall declare an engine compatible with the current Vite requirement.

### Deliberately omitted dependencies

- No client router: one page; URL state is handled with `URLSearchParams` and the History API.
- No global state library: React state plus small pure domain functions are sufficient.
- No icon package: text, emoji where educationally meaningful, CSS, and SVG cover the interface.
- No component framework: the product has a small, bespoke interface and Tailwind is already required.
- No runtime data service or backend: study content is bundled with the static site.

### Planned source boundaries

- `src/data/questions.ts`: typed 60-question curriculum dataset only.
- `src/domain/quiz.ts`: pure filtering, score, progress, answer, and streak logic.
- `src/lib/urlState.ts`: parse/serialize filter, view, and question state.
- `src/lib/storage.ts`: versioned local progress parsing and persistence.
- `src/components/`: app shell and reusable learner controls.
- `src/components/stages/`: world map, globe, compass, U.S. regions, and symbols study stages.
- `src/styles.css`: Tailwind import, tokens, focus treatment, reduced-motion rules, and minimal stage-specific CSS.
- `src/**/*.test.ts`: focused unit tests for non-trivial domain and persistence behavior.
- `.github/workflows/deploy.yml`: build and deploy `dist/` to GitHub Pages from `main`.

## 4. Requirement status vocabulary

Only these values are valid in GEO-001 tracking documents:

- `planned`: accepted requirement not yet under implementation.
- `in_progress`: implementation has begun but fresh completion evidence is incomplete.
- `blocked`: progress depends on missing external evidence or owner input.
- `verified`: fresh evidence satisfies the acceptance test.
- `prohibited`: requirement was explicitly rejected; the reason must remain recorded.

Requirement IDs are never reused or renumbered.

## 5. Product requirements and acceptance tests

### GEO-001-001 — GitHub Pages entry

**Behavior:** The production build renders the Geography Study Lab at `https://aahplexx.github.io/geography/` using Vite's `/geography/` base path.

**Acceptance test:** A production build resolves its JS/CSS assets under `/geography/`, and the deployed URL renders the application without a 404 or blank screen.

### GEO-001-002 — Curriculum integrity

**Behavior:** The application contains exactly 60 questions with unique integer IDs `1` through `60`; every question has one category, one stage, four answer choices, exactly one correct answer, one hint, one origin label, and rationales sufficient to explain the result.

**Acceptance test:** A dataset invariant test asserts count `60`, ID set `1..60`, four options per question, and exactly one `isCorrect` option per question.

### GEO-001-003 — Category integrity

**Behavior:** The supplied category distribution is preserved: `globe=10`, `world=18`, `compass=7`, `us_regions=17`, `symbols=8`.

**Acceptance test:** A dataset invariant test asserts the exact five category counts.

### GEO-001-004 — Fresh-session state

**Behavior:** A learner with no saved progress sees `0 / 60` answered, `0%` accuracy, and streak `0`.

**Acceptance test:** Initialize the quiz with empty storage and assert all three values are zero.

### GEO-001-005 — Answer interaction

**Behavior:** Choosing an answer immediately shows whether it is correct, identifies the correct answer after an incorrect choice, and displays the supplied rationale without navigating away from the question.

**Acceptance test:** For one correct and one incorrect selection, the quiz state exposes the correct feedback state and rationale source.

### GEO-001-006 — Answer replacement without duplicate inflation

**Behavior:** Re-selecting the same saved option is a no-op. Changing an answer updates the saved answer and derived score once rather than inflating progress or streak through repeated clicks.

**Acceptance test:** Submit the same correct option twice and assert answered count and streak do not change on the second identical submission.

### GEO-001-007 — Topic filters

**Behavior:** Learners can filter to all questions or any of the five supplied categories. The filter changes the visible question sequence without deleting saved progress.

**Acceptance test:** Apply each category and assert the sequence length matches GEO-001-003 while previously saved answers remain present.

### GEO-001-008 — Question navigation

**Behavior:** Previous, next, and question-map controls navigate within the active filtered sequence. End-of-sequence next action opens the report card.

**Acceptance test:** Assert previous is unavailable at index `0`, next advances in-range, question-map selection targets the requested question, and next at the last index requests the report state.

### GEO-001-009 — Question map status

**Behavior:** The question map distinguishes unanswered, currently correct, and currently incorrect questions and identifies the active question without relying on color alone.

**Acceptance test:** Render state data for one question in each status and assert each produces a distinct text/accessible label in addition to visual color.

### GEO-001-010 — Five instructional stages

**Behavior:** The application provides the five supplied study stages: world map, globe/hemispheres, compass rose, U.S. regions/features, and national symbols.

**Acceptance test:** Stage registry contains exactly the five stage keys referenced by the 60-question dataset and every question stage resolves.

### GEO-001-011 — Direct stage interaction

**Behavior:** Where a question has an interactive target, selecting the matching labeled hotspot can answer the question. Incorrect or unrelated stage selections provide clear feedback without corrupting saved answers.

**Acceptance test:** A matching hotspot resolves to the correct option; an unrelated hotspot resolves to informational feedback and leaves the answer unchanged.

### GEO-001-012 — Keyboard-equivalent map access

**Behavior:** Interactive SVG hotspots are keyboard focusable and operable because SVG lacks a native button element; the four native answer buttons always provide an equivalent non-spatial path.

**Acceptance test:** Every interactive SVG hotspot has a programmatic name, focusability, and Enter/Space activation behavior; each question still exposes four native `<button>` choices.

### GEO-001-013 — Study modes

**Behavior:** Learners can use `Practice` (map + question), `Quiz focus` (question emphasis), or `Study lab` (full-width stage + study reference). Mode changes do not reset progress.

**Acceptance test:** Switching through the three mode values changes layout state while the saved answers object remains unchanged.

### GEO-001-014 — Hints

**Behavior:** A learner can reveal and hide the supplied hint for the current question without changing score or answer state.

**Acceptance test:** Toggle hint state twice and assert answer/score state is unchanged.

### GEO-001-015 — Read aloud

**Behavior:** When the browser supports speech synthesis, `Read question aloud` speaks the question and four choices. When unsupported, the action is unavailable or reports that read-aloud is not supported without throwing an error.

**Acceptance test:** With a mocked speech API, the generated utterance contains question text and choices A-D; without the API, the helper returns an unsupported result.

### GEO-001-016 — Progress persistence

**Behavior:** Answers and study progress persist locally on the same browser using a versioned `localStorage` record. Malformed or incompatible stored data is ignored safely and the learner can still start fresh.

**Acceptance test:** Round-trip a valid progress record, reject malformed JSON/schema input, and initialize successfully after rejection.

### GEO-001-017 — Deep-linkable study state

**Behavior:** Active topic filter, study mode, and question ID are represented in the URL query string. Loading a valid deep link restores those values; invalid values fall back to safe defaults without a crash.

**Acceptance test:** Parse and serialize valid state losslessly; parse invalid filter/view/question values to documented defaults.

### GEO-001-018 — Reset protection

**Behavior:** Resetting progress requires confirmation before deleting saved answers. Cancel keeps all progress; confirm clears progress and returns to the first question in the active filter.

**Acceptance test:** Cancel leaves state unchanged; confirm returns an empty answer map, streak `0`, and current index `0`.

### GEO-001-019 — Report card

**Behavior:** The report card displays answered count, correct count, and accuracy derived from the current saved answers and provides a clear continue-practicing action.

**Acceptance test:** Given known answer states, report totals and rounded percentage match the derived score function.

### GEO-001-020 — Study reference

**Behavior:** Study lab mode includes the supplied reference facts for hemispheres, continents/oceans, compass directions, U.S. regions/features, Great Lakes, rivers, and six national symbols.

**Acceptance test:** The study reference component exposes all source sections and required named items from the supplied HTML.

### GEO-001-021 — Responsive layout

**Behavior:** The interface remains usable at phone, tablet, desktop, and large-display widths without horizontal page scrolling, clipped controls, overlapping text, or typographic smooshing.

**Acceptance test:** Browser QA at approximately `390px`, `768px`, and `1440px` widths shows no horizontal overflow and all primary actions remain reachable.

### GEO-001-022 — Semantic navigation and headings

**Behavior:** The page includes one `<h1>`, hierarchical headings, a skip link to `<main>`, `<button>` for actions, and navigation links only for navigation.

**Acceptance test:** DOM inspection confirms a working skip link, one h1, ordered heading hierarchy, and no clickable `div`/`span` used as an action.

### GEO-001-023 — Focus and target accessibility

**Behavior:** Every interactive control has a visible `:focus-visible` indicator and pointer targets meet or exceed WCAG 2.2 target-size minimums or documented spacing/equivalent exceptions.

**Acceptance test:** Browser QA confirms visible keyboard focus; CSS/control sizing provides at least `24x24 CSS px` effective targets for standalone controls.

### GEO-001-024 — Reduced motion

**Behavior:** Non-essential motion is disabled or reduced when `prefers-reduced-motion: reduce` is active. Animations use transform/opacity rather than layout-affecting properties.

**Acceptance test:** Reduced-motion emulation suppresses non-essential pulse/transition effects while all state changes remain understandable.

### GEO-001-025 — Color-independent answer state

**Behavior:** Correct, incorrect, active, and unanswered states use text/icon/label cues in addition to green/red/other colors.

**Acceptance test:** Remove color in browser inspection and answer/question-map states remain distinguishable by text or symbol.

### GEO-001-026 — Modal behavior

**Behavior:** Report and reset dialogs are real modal dialogs with a visible title, close/cancel path, focus containment, Escape support, and focus return to the trigger.

**Acceptance test:** Keyboard browser QA opens each dialog, tabs remain within it, Escape closes when safe, and focus returns to the triggering control.

### GEO-001-027 — Safe touch behavior

**Behavior:** The layout preserves browser zoom, uses `touch-action: manipulation` on direct controls where useful, contains modal/drawer overscroll, and accounts for safe-area insets on full-width sticky UI.

**Acceptance test:** Mobile browser QA verifies zoom remains enabled and fixed/sticky controls do not collide with safe areas.

### GEO-001-028 — Production font loading

**Behavior:** Fredoka and Nunito are loaded with `display=swap` and preconnected font origins; readable system fallbacks are declared.

**Acceptance test:** `index.html` contains preconnects and a font stylesheet using display swap, and content remains readable with font requests blocked.

### GEO-001-029 — GitHub Pages deployment

**Behavior:** A GitHub Actions workflow builds on pushes to `main`, uploads `dist/` as the Pages artifact, and deploys through the `github-pages` environment using GitHub's official Pages actions flow.

**Acceptance test:** Workflow syntax is valid, build succeeds in CI, Pages deployment job succeeds, and the target URL serves the built commit.

### GEO-001-030 — No unnecessary backend or accounts

**Behavior:** The first production release is static and requires no account, login, analytics service, database, API key, server, or learner-identifying data collection.

**Acceptance test:** Production source and network inspection show no backend/API credential requirement and no account/auth flow.

## 6. State model

The minimum runtime state is:

- `filter`: `all | globe | world | compass | us_regions | symbols`
- `view`: `practice | quiz | study`
- `questionId`: integer ID present in the active filtered sequence
- `answers`: map keyed by question ID with selected option identity and correctness
- `streak`: derived/updated by answer transitions, never by identical repeat submission
- `hintOpen`: ephemeral boolean for the current question
- `reportOpen`: ephemeral modal state

The URL owns `filter`, `view`, and `questionId`. Versioned local storage owns learner progress. Derived score and accuracy are not persisted.

## 7. Data integrity rules

- Question IDs, option IDs/text, categories, stages, hints, rationales, and source labels are immutable curriculum data during a session.
- UI state must reference question IDs rather than array indices across filters.
- Stored progress must be parsed as untrusted input because learners or browser extensions can edit local storage.
- Unknown stored question IDs or invalid option identities are dropped rather than trusted.
- Changing curriculum data later requires a storage-version decision and updated invariant tests.

## 8. Accessibility and web standards

Target: WCAG 2.2 AA, while using the stronger visible-focus treatment described by WCAG 2.2 Focus Appearance guidance where practical.

Required implementation principles:

- Semantic HTML before ARIA.
- Native buttons for answer and command actions.
- ARIA only for SVG hotspot semantics, dialog relationships, and live feedback where native semantics cannot express the interaction.
- `aria-live="polite"` for answer feedback and async status updates that are not already announced through focus movement.
- No disabled zoom.
- Visible keyboard focus on every interactive element.
- Controls remain visible when focused beneath sticky chrome.
- Touch targets meet WCAG 2.2 AA minimum-size requirements or a documented exception.
- Reduced-motion preference honored.

## 9. GitHub Pages deployment

Vite `base` is `/geography/`. Deployment follows the official GitHub Pages Actions flow: checkout, setup pnpm/Node, install with frozen lockfile, run repository validation/build scripts, configure Pages, upload `dist/`, deploy Pages.

If repository Pages settings cannot be changed by the connected GitHub capability, code/workflow deployment is still completed and the tracker records the exact missing repository-setting evidence as a blocker rather than claiming the site live.

## 10. Validation strategy

### Automated

- Dataset invariant tests.
- Quiz/domain transition tests.
- URL parse/serialize tests.
- Storage validation/migration-boundary tests.
- Type check.
- Production build.

### Browser validation

At minimum test approximately `390px`, `768px`, and `1440px` widths:

- first-screen hierarchy and characteristic map/question presentation;
- no horizontal overflow or clipped controls;
- keyboard-only navigation and visible focus;
- direct hotspot and native answer-button equivalence;
- report/reset dialog focus behavior;
- reduced-motion behavior;
- deep-link reload behavior;
- persisted-progress reload behavior.

Take screenshots during browser validation, critique the three largest visual/usability defects, repair them, and repeat for up to three rounds if material defects remain.

## 11. External evidence baseline

Verified 2026-10-21:

- React latest major documentation reports React 19.3: https://react.dev/versions
- Vite getting started and Node compatibility: https://vite.dev/guide/
- Tailwind v4 framework installation uses the Vite plugin: https://tailwindcss.com/docs/installation/framework-guides
- GitHub Pages custom Actions publishing flow: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- MDN `SpeechSynthesisUtterance`: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
- MDN History `replaceState`: https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WCAG 2.2 additions including Focus Not Obscured and Target Size: https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- npm registry current direct-version evidence: `react@19.3.1`, `react-dom@19.3.1`, `vite@8.3.5`, `@vitejs/plugin-react@6.1.2`, `tailwindcss@4.3.3`, `@tailwindcss/vite@4.3.3`, `typescript@7.0.2`, `@types/react@19.3.0`, `@types/react-dom@19.3.0`, `vitest@5.0.5`.

Externally changeable versions and platform requirements must be re-verified before later dependency upgrades.

## 12. Non-goals for GEO-001

- User accounts, authentication, cloud sync, leaderboards, multiplayer, social sharing, telemetry, ads, payments, CMS, teacher dashboard, or backend APIs.
- A general-purpose geography curriculum beyond the supplied 60-question test set.
- Photographic decoration. The subject is communicated through instructional SVG maps/diagrams, so photograph licensing is not applicable to this release.
- A new routing framework or design-system dependency.

## 13. Definition of done

GEO-001 is complete only when every non-prohibited requirement in Section 5 is `verified` with fresh evidence in `docs/tracker/GEO-001.md`, `pnpm` validation/build scripts pass at the final `main` revision, browser QA passes at the required widths, internal documentation matches repository state, no open pull requests or stranded branches exist, and the GitHub Pages URL is live or the single remaining external Pages-setting blocker is explicitly recorded.
