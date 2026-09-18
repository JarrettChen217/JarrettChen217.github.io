# Midas Curse Gameplay Loop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a concise, bilingual four-stage gameplay loop to the Midas Curse case study before its engineering narrative.

**Architecture:** Extend the generic project compiler and ordered detail renderer with one optional `mechanics` data object. Keep all copy and ordering in `projects.yml`, generate `projects-data.js`, and add a small responsive CSS component that follows the existing academic visual system.

**Tech Stack:** YAML, Node.js CommonJS build scripts and `node:test`, vanilla JavaScript, HTML and CSS.

**Spec:** `docs/superpowers/specs/2026-09-17-midas-gameplay-loop-design.md`

## Global Constraints

- Render the section after Background and before Process only through `sectionOrder`.
- Preserve the white background, existing font scale, muted colours, light rules and responsive layout.
- All bilingual copy and section data live in `projects.yml`; do not hardcode Midas copy in `app.js`.
- Treat gameplay mechanics as team outcomes and preserve existing personal-contribution wording.
- Do not publish a shop hotkey.
- Existing projects without `mechanics` must render unchanged.

---

### Task 1: Validate and compile the generic mechanics contract

**Files:**
- Modify: `scripts/build-projects.test.cjs`
- Modify: `scripts/build-projects.cjs`

**Interfaces:**
- Consumes: YAML `mechanics = {heading, intro, steps[]}` with bilingual text and stable step IDs.
- Produces: compiled `project.mechanics = {heading: [en, zh], intro: [en, zh], steps: [{id, title: [en, zh], body: [en, zh]}]}` and accepts `mechanics` in `sectionOrder`.

- [ ] **Step 1: Write failing compiler tests** that assert order, bilingual arrays, source-metadata removal, acceptance of `mechanics` in `sectionOrder`, and rejection of unsafe/duplicate IDs or incomplete translations.
- [ ] **Step 2: Run `node --test scripts/build-projects.test.cjs`** and confirm failure because the compiler omits or rejects the new mechanics contract.
- [ ] **Step 3: Add minimal compiler support** using the existing bilingual validators and stable-ID rules; never copy unknown or editorial fields.
- [ ] **Step 4: Run `node --test scripts/build-projects.test.cjs`** and confirm the compiler tests pass.
- [ ] **Step 5: Commit** with `feat: compile project gameplay mechanics`.

### Task 2: Render the ordered bilingual mechanics section

**Files:**
- Modify: `scripts/build-projects.test.cjs`
- Modify: `app.js`
- Modify: `styles.css`

**Interfaces:**
- Consumes: compiled `project.mechanics` from Task 1.
- Produces: escaped `.project-mechanics`, `.mechanics-flow` and `.mechanics-step` markup routed through `detailSections()`.

- [ ] **Step 1: Write failing renderer tests** for English and Chinese headings/body text, escaping, omission on unrelated projects, and Background → Mechanics → Process order.
- [ ] **Step 2: Run `node --test scripts/build-projects.test.cjs`** and confirm failure because no mechanics markup exists.
- [ ] **Step 3: Add `projectMechanics(project)`** and the `mechanics` entry in the section map, using only existing escaping and bilingual helpers.
- [ ] **Step 4: Add restrained responsive styles**: four equal columns with light separators on wide screens, two columns at tablet widths, and one column with horizontal rules at 640px and below.
- [ ] **Step 5: Run `node --test scripts/build-projects.test.cjs`** and confirm the renderer tests pass.
- [ ] **Step 6: Commit** with `feat: render project gameplay loop`.

### Task 3: Add evidence-backed Midas content and generated data

**Files:**
- Modify: `scripts/build-projects.test.cjs`
- Modify: `projects.yml`
- Regenerate: `projects-data.js`

**Interfaces:**
- Consumes: the generic mechanics schema and renderer from Tasks 1–2.
- Produces: the four approved bilingual Midas stages ordered between Background and Process.

- [ ] **Step 1: Write a failing Midas regression test** for the four step IDs, representative English and Chinese mechanics text, and the declared section order.
- [ ] **Step 2: Run `node --test scripts/build-projects.test.cjs`** and confirm failure because Midas has no mechanics data.
- [ ] **Step 3: Add the approved bilingual mechanics object** to the Midas project and change its order to `[background, mechanics, process, video, demo, product, contributions, journey, engineering, team, credits]`.
- [ ] **Step 4: Run `npm run build`** to regenerate `projects-data.js`.
- [ ] **Step 5: Run `npm test` and `npm run check`** and confirm the repository suite and generated-data check pass.
- [ ] **Step 6: Commit** with `content: explain Midas gameplay loop`.

### Task 4: Browser QA and delivery

**Files:**
- Verify: `projects.yml`, `projects-data.js`, `app.js`, `styles.css`

**Interfaces:**
- Consumes: the completed mechanics feature and the existing local HTTP preview.
- Produces: verified bilingual desktop/mobile presentation and a pushed branch.

- [ ] **Step 1: Run `git diff --check`, `npm run build`, `npm test`, and `npm run check`** and record zero failures.
- [ ] **Step 2: Inspect English and Chinese at desktop width** and confirm the section appears between Background and Process with four readable stages.
- [ ] **Step 3: Inspect English and Chinese at 390px width** and confirm one-column flow, readable rules and no horizontal overflow.
- [ ] **Step 4: Review `git diff --stat`, `git status --short`, and recent commits** to ensure only the planned files changed.
- [ ] **Step 5: Push `project/midas-curse-unity`** and report the commit IDs and verification evidence.
