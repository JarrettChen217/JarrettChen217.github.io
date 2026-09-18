# Midas Team Reunion Photo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the supplied Cosmic Creators team photograph in the Midas Curse Team section with concise bilingual context and web-sized assets.

**Architecture:** The ignored intake JPEG remains the source of truth. The repository's existing image-preparation script produces two metadata-free WebP derivatives, and the canonical `projects.yml` record references them through the existing validated gallery schema; no renderer or CSS change is needed.

**Tech Stack:** YAML, Node.js test runner, existing static-site compiler/gallery renderer, `sips`, `cwebp`, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-18-midas-team-reunion-photo-design.md`

## Global Constraints

- Work directly on `dev` as requested.
- Preserve the source JPEG outside Git.
- Use the existing Team gallery and existing responsive layout without component or CSS changes.
- Describe the photograph simply as a Cosmic Creators team photo; do not add a public timeline explanation.
- Keep all public copy bilingual.

---

### Task 1: Add and validate the Midas team photograph

**Files:**
- Modify: `scripts/build-projects.test.cjs`
- Create: `assets/projects/midas-curse-unity/team-cosmic-creators-reunion-800.webp`
- Create: `assets/projects/midas-curse-unity/team-cosmic-creators-reunion-1600.webp`
- Modify: `projects.yml`
- Generated: `projects-data.js`

**Interfaces:**
- Consumes: `scripts/prepare-image.cjs SOURCE OUTPUT_STEM [QUALITY]` and the existing gallery object schema.
- Produces: one `group: team` gallery item whose `src`, `thumbnail`, dimensions, alt text, and caption compile into `projects-data.js`.

- [ ] **Step 1: Write a focused failing test**

Add assertions to the Midas project test that require exactly one Team gallery entry using `team-cosmic-creators-reunion-1600.webp`, its 800px thumbnail, and both approved captions.

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `node --test --test-name-pattern='Midas' scripts/build-projects.test.cjs`

Expected: FAIL because the Midas record does not yet contain the Team gallery entry.

- [ ] **Step 3: Prepare the WebP derivatives**

Run:

```bash
node scripts/prepare-image.cjs \
  photo-inbox/cosmic-creators/team/cosmic-creators-reunion-2024-06-09-original.jpg \
  assets/projects/midas-curse-unity/team-cosmic-creators-reunion
```

Record the printed actual dimensions in the YAML gallery object.

- [ ] **Step 4: Add the minimal canonical YAML entry**

Append one gallery object with `group: team`, the generated WebP paths and dimensions, and the exact bilingual alt/caption text from the spec. Run `npm run build` to refresh `projects-data.js`.

- [ ] **Step 5: Run focused and full verification**

Run:

```bash
node --test --test-name-pattern='Midas' scripts/build-projects.test.cjs
npm run verify
git diff --check
```

Expected: the focused test and complete verification suite pass, and the diff check emits no output.

- [ ] **Step 6: Inspect responsive rendering**

Serve the built site and inspect `#project/midas-curse-unity` at desktop and 390px phone widths in English and Chinese. Confirm the photo appears only in Team, captions are accurate, the photo is not distorted, and no horizontal overflow occurs.

- [ ] **Step 7: Commit and push to dev**

```bash
git add docs/superpowers/specs/2026-09-18-midas-team-reunion-photo-design.md \
  docs/superpowers/plans/2026-09-18-midas-team-reunion-photo.md \
  scripts/build-projects.test.cjs projects.yml projects-data.js \
  assets/projects/midas-curse-unity/team-cosmic-creators-reunion-800.webp \
  assets/projects/midas-curse-unity/team-cosmic-creators-reunion-1600.webp
git commit -m "content: add Midas team reunion photo"
git push origin dev
```
