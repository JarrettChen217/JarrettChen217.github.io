# Berry Street Process Narrative Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Berry Street project detail as five evidence-led chapters spanning discovery, requirements, prototyping, usability testing, refinement and validation.

**Architecture:** Extend the YAML compiler with an optional, validated `process` structure and render it only for projects that define it. Keep other project pages on the existing generic renderer. Store optimized public media locally and associate it directly with the chapter it supports.

**Tech Stack:** Static HTML, vanilla JavaScript, CSS, YAML, Node.js test runner, Poppler/FFmpeg image extraction, WebP assets.

**Spec:** `docs/superpowers/specs/2026-09-17-berry-street-process-narrative-design.md`

## Global Constraints

- Preserve the white academic layout and existing bilingual language behavior.
- Use requirements-model terminology, not UML.
- Remove participant faces from the public usability-test frame.
- Do not copy source PDFs, transcripts, private paths or the full meeting video into the public repository.
- Do not autoplay video.
- Do not alter other project detail pages.
- Do not commit or push unless Hao asks.

---

### Task 1: Process schema and compiler

**Files:**
- Modify: `scripts/build-projects.test.cjs`
- Modify: `scripts/build-projects.cjs`

**Interfaces:**
- Consumes: existing bilingual helper and local gallery/demo validation rules.
- Produces: `project.process = { heading: [en, zh], intro: [en, zh], stages: ProcessStage[] }` where each stage has `id`, `label`, `title`, `body`, optional `contribution`, optional `findings`, optional `gallery`, and optional `demo`.

- [ ] **Step 1: Write a failing compiler test** that adds a two-stage process fixture, includes private `source` metadata, and asserts translated output order plus metadata removal.
- [ ] **Step 2: Run `node --test scripts/build-projects.test.cjs`** and confirm failure because `process` is absent from compiled data.
- [ ] **Step 3: Add minimal process compilation** using the existing bilingual, local-image and local-video contracts.
- [ ] **Step 4: Add malformed-input cases** for duplicate/invalid stage IDs, missing translations, unsafe paths, missing files and invalid dimensions.
- [ ] **Step 5: Run the focused test file** and confirm all schema tests pass.

### Task 2: Process renderer and responsive chapter styling

**Files:**
- Modify: `scripts/build-projects.test.cjs`
- Modify: `app.js`
- Modify: `styles.css`

**Interfaces:**
- Consumes: compiled `project.process` from Task 1.
- Produces: `projectProcess(project)` HTML with `.project-process`, `.process-stage`, `.process-stage-marker`, `.process-findings`, `.process-gallery`, and optional existing demo markup.

- [ ] **Step 1: Write a failing renderer test** that checks English and Chinese stage labels, order, escaped copy, lazy images, optional demo controls, and the absence of legacy standalone Berry Street sections.
- [ ] **Step 2: Run the focused test** and confirm failure because the renderer does not exist.
- [ ] **Step 3: Implement the process renderer** and route process-enabled projects through it while leaving all other detail pages unchanged.
- [ ] **Step 4: Add restrained desktop and mobile CSS** for the numbered rail, chapter rules, findings and one/two-column media.
- [ ] **Step 5: Run the focused test file** and confirm all renderer tests pass.

### Task 3: Curate and optimize public project media

**Files:**
- Create: `assets/projects/berry-street/role-do-be-feel-800.webp`
- Create: `assets/projects/berry-street/role-do-be-feel-1600.webp`
- Create: `assets/projects/berry-street/user-story-map-800.webp`
- Create: `assets/projects/berry-street/user-story-map-1600.webp`
- Create: `assets/projects/berry-street/lofi-check-in-800.webp`
- Create: `assets/projects/berry-street/lofi-check-in-1600.webp`
- Create: `assets/projects/berry-street/lofi-dashboard-800.webp`
- Create: `assets/projects/berry-street/lofi-dashboard-1600.webp`
- Create: `assets/projects/berry-street/hifi-dashboard-800.webp`
- Create: `assets/projects/berry-street/hifi-dashboard-1600.webp`
- Create: `assets/projects/berry-street/usability-dashboard-test-800.webp`
- Create: `assets/projects/berry-street/usability-dashboard-test-1600.webp`

**Interfaces:**
- Consumes: supplied project PDFs and `final_pre(2).mp4` outside the public repository.
- Produces: privacy-safe WebP media with verified dimensions and lowercase kebab-case paths.

- [ ] **Step 1: Render the relevant source pages at sufficient resolution** and visually select the cleanest Role–Do–Be–Feel, user-story-map, low-fidelity and high-fidelity frames.
- [ ] **Step 2: Extract a dashboard-task video frame** and crop the participant column completely out of the image.
- [ ] **Step 3: Convert selected sources to 800 px and 1600 px WebP files** without upscaling beyond the usable source resolution.
- [ ] **Step 4: Inspect every final media file** for legibility, correct crop, absence of participant faces and reasonable file size.

### Task 4: Berry Street bilingual chapter content

**Files:**
- Modify: `projects.yml`
- Modify: `projects-data.js` (generated)

**Interfaces:**
- Consumes: Task 3 asset paths and the process schema from Task 1.
- Produces: five bilingual Berry Street stages in source order.

- [ ] **Step 1: Replace the duplicated Berry Street `work`, `journey`, product/engineering gallery and top-level demo presentation with the approved `process` chapters.** Keep the TIPE background and source link.
- [ ] **Step 2: Write concise bilingual copy** grounded in client meetings, usability feedback, prototype update notes and final validation records.
- [ ] **Step 3: Attach one or two supporting assets to each stage** and place the team photograph plus handover evidence in the closing stage.
- [ ] **Step 4: Run `npm run build`** to regenerate `projects-data.js`.
- [ ] **Step 5: Run `npm test && npm run check && git diff --check`** and resolve every failure.

### Task 5: Visual and responsive verification

**Files:**
- Verify: `http://localhost:54839/#project/berry-street`

**Interfaces:**
- Consumes: completed static site.
- Produces: visual evidence that the approved narrative works in English, Chinese and mobile layouts.

- [ ] **Step 1: Inspect the English desktop page** for narrative order, image clarity, restrained spacing and correct media captions.
- [ ] **Step 2: Switch to Chinese** and confirm all stage labels, captions, findings and contribution notes are translated.
- [ ] **Step 3: Inspect at 390 × 844** and confirm the stage rail stacks cleanly, image pairs become one column and horizontal overflow is absent.
- [ ] **Step 4: Confirm the usability-test frame contains no participant faces** and every video remains user-controlled.
- [ ] **Step 5: Run the full verification command again** immediately before reporting completion.
