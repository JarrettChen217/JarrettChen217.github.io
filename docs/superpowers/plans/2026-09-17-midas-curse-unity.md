# Midas Curse Unity Project Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a bilingual Midas Curse case study with verified content, compressed media, a confirmed gameplay video, and an independently loadable Unity WebGL play page.

**Architecture:** Extend the existing YAML compiler with optional project metadata and ordered sections while preserving the current defaults. Render a local demo poster linked to the verified YouTube watch page (the video rejects third-party embedding) plus action links from generated data, and host a minimal standalone Unity player whose relative paths reference only one deduplicated runtime build.

**Tech Stack:** Static HTML/CSS/JavaScript, Node.js built-in test runner, js-yaml, FFmpeg/WebP tooling, Unity WebGL runtime, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-17-midas-curse-unity-design.md`

## Global Constraints

- `projects.yml` is the single source of truth for all public project copy and media references.
- English and Chinese must both be present for every user-facing project field.
- Project 1 and Project 2 are two stages of one game dated August–early November 2023.
- Do not inflate individual authorship or metrics.
- Do not copy source code, course/private materials, Noita reference GIFs, music MP4s, or duplicate WebGL builds.
- Do not publish `OurGroup.jpg` until permission is confirmed.
- Preserve the site's white academic visual system and current responsive behavior.

---

### Task 1: Lock the new YAML contracts with failing tests

**Files:**
- Modify: `scripts/build-projects.test.cjs`
- Modify: `scripts/build-projects.cjs`

**Interfaces:**
- Consumes: project YAML objects.
- Produces: compiled `team`, `featuredVideo`, `play`, `sectionOrder`, and `credits` fields with private metadata removed.

- [ ] Add focused compiler tests using literal expected objects for valid bilingual data.
- [ ] Add rejection tests for malformed YouTube IDs, non-HTTPS watch URLs, unsafe play paths, duplicate/unknown section keys, and incomplete credits.
- [ ] Run `node --test scripts/build-projects.test.cjs` and confirm the new tests fail because the fields are absent.
- [ ] Implement the minimum compiler validation and public-field projection.
- [ ] Re-run the focused test file and confirm it passes.

### Task 2: Render the ordered bilingual experience

**Files:**
- Modify: `scripts/build-projects.test.cjs`
- Modify: `app.js`
- Modify: `styles.css`

**Interfaces:**
- Consumes: compiler output from Task 1.
- Produces: `featuredVideo(p)`, project actions, team metadata, credits, and ordered section HTML.

- [ ] Add rendering tests that assert the local YouTube poster fallback, watch/play actions, bilingual text, and configured section order.
- [ ] Confirm tests fail against the existing renderer.
- [ ] Implement small section renderers and a default order matching existing pages.
- [ ] Add restrained action/video styling, keyboard focus support, desktop two-column media, and mobile one-column behavior.
- [ ] Re-run focused and full tests.

### Task 3: Prepare and register public media

**Files:**
- Create: `assets/projects/midas-curse-unity/*-1600.webp`
- Create: `assets/projects/midas-curse-unity/*-800.webp`
- Create: `assets/projects/midas-curse-unity/*.webp` animated derivatives where appropriate
- Modify: `projects.yml`
- Regenerate: `projects-data.js`

**Interfaces:**
- Consumes: read-only project report media.
- Produces: validated, compressed gallery assets and a complete canonical YAML record.

- [ ] Inspect source dimensions, animation duration, and provenance.
- [ ] Create deterministic WebP derivatives for the cover, gold-path mechanic, maze, and before/after result.
- [ ] Add the project ID to `selected` without a copied description.
- [ ] Write bilingual summary, background, contribution, iteration, captions, and credit entries grounded in the reports and commits.
- [ ] Run the generator, test suite, data check, and size inventory.

### Task 4: Add the deduplicated WebGL play page

**Files:**
- Create: `play/midas-curse/index.html`
- Create: `play/midas-curse/styles.css`
- Create: `play/midas-curse/Build/midas-curse.loader.js`
- Create: `play/midas-curse/Build/midas-curse.data.unityweb`
- Create: `play/midas-curse/Build/midas-curse.framework.js.unityweb`
- Create: `play/midas-curse/Build/midas-curse.wasm.unityweb`
- Create: `scripts/webgl-assets.test.cjs`

**Interfaces:**
- Consumes: the outer known-working Unity WebGL build.
- Produces: a user-triggered standalone player with stable relative resource URLs.

- [ ] Add an integration test that parses the play page and loader references, verifies every referenced local asset exists, and rejects nested duplicate `Build/Build` paths.
- [ ] Confirm the test fails while the page is absent.
- [ ] Copy and rename only the four required runtime files.
- [ ] Implement the bilingual player shell, progress reporting, error state, fullscreen control, and case-study return link.
- [ ] Run the integration test and serve the repository locally to verify HTTP resource status and Unity initialization.

### Task 5: Permission-gated team media and final QA

**Files:**
- Create after confirmation: `assets/projects/midas-curse-unity/team-cosmic-creators-1600.webp`
- Create after confirmation: `assets/projects/midas-curse-unity/team-cosmic-creators-800.webp`
- Modify after confirmation: `projects.yml`
- Regenerate after confirmation: `projects-data.js`

**Interfaces:**
- Consumes: explicit public-display permission.
- Produces: the final team gallery item, or no public team photo if permission is not confirmed.

- [ ] If permission is confirmed, create compressed derivatives and add a neutral bilingual team caption; otherwise leave the image outside Git.
- [ ] Check English and Chinese case-study views at desktop and mobile widths.
- [ ] Check the Overview card and Projects search/filter results use the same ID.
- [ ] Verify YouTube, Watch Demo, Play Game, gallery previews, and WebGL loading.
- [ ] Run `npm test`, `npm run check`, `git diff --check`, and review `git status` before the final commit and push.

## Commit checkpoints

1. `docs: plan Midas Curse Unity showcase`
2. `feat: add Midas Curse bilingual case study`
3. `feat: host Midas Curse WebGL build`
4. `test: verify Midas Curse responsive experience` (only if QA requires tracked fixes/tests)
