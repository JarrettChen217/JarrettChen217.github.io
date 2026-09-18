# Berry Street TIPE Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Explain the Berry Street project's TIPE premise in its Background section and provide a bilingual official-source link.

**Architecture:** Extend the existing project compiler with one optional `backgroundLink` object containing bilingual text and an HTTPS URL. Render that compiled object only inside the project's Background section, then configure the Berry Street entry in `projects.yml` with the approved copy and University of Melbourne source.

**Tech Stack:** YAML, Node.js, vanilla JavaScript, CSS, Node test runner

**Spec:** `docs/superpowers/specs/2026-09-17-berry-street-tipe-background-design.md`

## Global Constraints

- Use TIPE, not TIDE.
- Do not describe supported students as a fixed or deficient group.
- Keep all public copy in `projects.yml`.
- Accept only HTTPS source links with bilingual labels.
- Projects without `backgroundLink` must render unchanged.
- Do not commit or push without a separate user request.

---

### Task 1: Optional background source link

**Files:**
- Modify: `scripts/build-projects.test.cjs`
- Modify: `scripts/build-projects.cjs`
- Modify: `app.js`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `backgroundLink: {label: {en, zh}, url: string}`
- Produces: `backgroundLink: {label: [string, string], url: string}` and a `.background-link` anchor below the Background paragraph

- [ ] **Step 1: Write a failing integration test**

Inject a valid `backgroundLink` into the Berry Street fixture, compile it, and render both languages. Assert the link sits inside the Background section, uses the correct bilingual label and escaped HTTPS URL, and is absent from a project without the field. Add invalid HTTP, malformed URL and incomplete-translation cases.

- [ ] **Step 2: Run the focused tests and verify failure**

Run: `node --test scripts/build-projects.test.cjs`

Expected: the compiler omits `backgroundLink` and the renderer has no `.background-link` anchor.

- [ ] **Step 3: Implement compiler, renderer and restrained styling**

Compile only bilingual labels and HTTPS URLs, render the optional source link immediately after the background paragraph, escape all values, and style it as a compact underlined text link.

- [ ] **Step 4: Run the focused tests**

Run: `node --test scripts/build-projects.test.cjs`

Expected: all focused tests pass.

### Task 2: Approved TIPE content and verification

**Files:**
- Modify: `projects.yml`
- Regenerate: `projects-data.js`

**Interfaces:**
- Consumes: the approved English and Chinese TIPE copy and the University of Melbourne source URL
- Produces: the public Berry Street Background section in both languages

- [ ] **Step 1: Replace the Berry Street background copy and add the source link**

Use the exact approved wording from the design, preserving the acronym and cautious description of students' needs.

- [ ] **Step 2: Regenerate and verify project data**

Run: `npm run build && npm run check`

Expected: generated project data is current.

- [ ] **Step 3: Run complete automated verification**

Run: `npm test && git diff --check`

Expected: all tests pass and no whitespace errors are present.

- [ ] **Step 4: Review in the browser**

Check the Berry Street Background section in English and Chinese at desktop and mobile widths. Confirm the link is legible, the paragraph remains readable, and there is no horizontal overflow.
