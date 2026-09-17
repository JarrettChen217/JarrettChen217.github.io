# Project Title Logos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add responsive, YAML-configured title logos to the Berry Street and AVL project detail pages.

**Architecture:** Extend the existing project compiler with one optional validated media field, then let the existing `detail()` renderer consume the compiled value. Keep presentation in a focused title-row CSS component and store optimised derivatives alongside each project's other public assets.

**Tech Stack:** YAML, Node.js, vanilla JavaScript, CSS, FFmpeg/cwebp, Node test runner

**Spec:** `docs/superpowers/specs/2026-09-17-project-title-logos-design.md`

## Global Constraints

- Preserve all supplied source images unchanged.
- Logo paths must remain inside `assets/projects/<project-id>/`.
- Projects without `logo` must render exactly as before.
- Desktop logo height is at most 56px; mobile logo height is at most 44px.
- Do not commit or push without a separate user request.

---

### Task 1: Compiler and renderer contract

**Files:**
- Modify: `scripts/build-projects.test.cjs`
- Modify: `scripts/build-projects.cjs`
- Modify: `app.js`

**Interfaces:**
- Consumes: optional YAML object `logo: {src, width, height, alt: {en, zh}}`
- Produces: compiled object `logo: {src: string, width: number, height: number, alt: [string, string]}` and `.detail-title-row` markup

- [ ] **Step 1: Write failing compiler and renderer tests**

Add one test that supplies a valid local WebP logo, checks the compiled fields and bilingual rendered `alt`, and verifies an unrelated project has no logo markup. Add invalid-path, missing-file, zero-dimension, and incomplete-translation cases.

- [ ] **Step 2: Run the focused tests and verify failure**

Run: `node --test scripts/build-projects.test.cjs`

Expected: the valid result omits `logo` or the rendered detail lacks `.project-logo`.

- [ ] **Step 3: Implement the minimum compiler and renderer support**

Validate the path against `^assets/projects/<id>/[a-z0-9-]+\.webp$`, verify containment and existence, validate positive integer dimensions, compile bilingual alt text, and render the optional image beside the existing heading.

- [ ] **Step 4: Run the focused tests**

Run: `node --test scripts/build-projects.test.cjs`

Expected: all focused tests pass.

### Task 2: Optimised logo assets and project data

**Files:**
- Create: `assets/projects/berry-street/wombat-mark.webp`
- Create: `assets/projects/avl-visualisation/aia-mark.webp`
- Modify: `projects.yml`
- Regenerate: `projects-data.js`

**Interfaces:**
- Consumes: the two supplied PNG sources
- Produces: compact transparent WebP files and valid project `logo` entries

- [ ] **Step 1: Create transparent, tightly framed derivatives**

Crop Berry Street to the mascot only, remove its pale background, and scale it to a small web asset. Copy/optimise the already transparent AIA mark without changing its design.

- [ ] **Step 2: Inspect both derivatives**

Confirm transparency, dimensions, legibility, and lack of clipping.

- [ ] **Step 3: Add YAML entries and regenerate data**

Add bilingual alt text plus intrinsic dimensions for each logo, then run `npm run build`.

- [ ] **Step 4: Verify current generated data**

Run: `npm run check`

Expected: project schema and generated output are current.

### Task 3: Responsive title treatment and verification

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: `.detail-title-row`, `.detail-heading`, and `.project-logo`
- Produces: desktop and mobile title/logo alignment without overflow

- [ ] **Step 1: Add restrained responsive styles**

Use a flex row with `justify-content: space-between`, a controlled gap, a flexible heading, and `object-fit: contain`. Use 56px desktop and 44px mobile maximum logo heights.

- [ ] **Step 2: Run the complete automated verification**

Run: `npm run build && npm test && npm run check && git diff --check`

Expected: all tests pass, generated data is current, and there are no whitespace errors.

- [ ] **Step 3: Review both pages in the browser**

Check Berry Street and AVL in English and Chinese at desktop and 390px mobile widths. Confirm title wrapping, image clarity, and absence of horizontal scrolling.
