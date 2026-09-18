# Pages Playable Artifact Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish interactive project pages in the GitHub Pages artifact and make CI/CD fail whenever a declared playable route is missing or inaccessible.

**Architecture:** Extend the existing explicit artifact allowlist with the public `play/` tree. Verify the same contract at three boundaries: filesystem artifact tests, Playwright against `_site`, and post-deployment HTTP health checks.

**Tech Stack:** Node.js 22, node:test, Playwright Chromium, GitHub Actions, GitHub Pages, Bash/curl.

**Spec:** `docs/superpowers/specs/2026-09-18-pages-playable-artifact-design.md`

## Global Constraints

- Keep private authoring inputs excluded from `_site`.
- Do not start or download the full Unity runtime in Playwright.
- Production checks must tolerate Pages propagation delay and avoid full downloads of large Unity files.
- Work from `fix/pages-playable-artifact`, integrate into `dev`, then incrementally merge `dev` into `main`.

---

### Task 1: Publish the playable tree and enforce the artifact contract

**Files:**
- Modify: `scripts/build-site.test.cjs`
- Modify: `scripts/build-site.cjs`

**Interfaces:**
- Consumes: repository root containing `play/`.
- Produces: `_site/play/**` copied by `buildSite({ root, output })`.

- [ ] **Step 1: Write failing artifact tests**

Add a fixture at `play/midas-curse/index.html` plus representative `Build/*.unityweb` and loader files. Assert the files appear beneath `output/play/midas-curse/`, while private inputs remain absent. Add a real-repository test that parses published project play URLs and asserts their built entry files remain inside `_site` and exist.

- [ ] **Step 2: Verify the focused tests fail**

Run: `node --test scripts/build-site.test.cjs`

Expected: FAIL because `output/play/midas-curse/index.html` does not exist.

- [ ] **Step 3: Implement the minimal allowlisted directory copy**

Define `PUBLIC_DIRECTORIES = ['assets', 'play']`, copy each directory recursively, and export the constant alongside `buildSite` and `PUBLIC_FILES`.

- [ ] **Step 4: Verify the focused and complete unit suites pass**

Run: `node --test scripts/build-site.test.cjs && npm test`

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add scripts/build-site.cjs scripts/build-site.test.cjs
git commit -m "fix: publish playable project artifacts"
```

### Task 2: Exercise the deployed artifact in Playwright

**Files:**
- Modify: `tests/e2e/portfolio.spec.cjs`

**Interfaces:**
- Consumes: `_site` served by the existing Playwright web server.
- Produces: a browser test covering the Midas case-study-to-play-page route and loader response.

- [ ] **Step 1: Write the browser regression test**

Open `/#project/midas-curse-unity`, click `Play Game`, assert the URL is `/play/midas-curse/index.html`, verify the page heading and Start Game button, then request `/play/midas-curse/Build/midas-curse.loader.js` and require status 200 with a non-empty body.

- [ ] **Step 2: Prove the test would catch the original omission**

Temporarily run the test against an artifact built from the parent of Task 1, or remove `_site/play` after building, and confirm it fails on a 404. Restore the Task 1 implementation before continuing.

- [ ] **Step 3: Build the artifact and run the focused browser test**

Run: `npm run build:site && npx playwright test --grep "opens the Midas playable artifact"`

Expected: PASS without starting the Unity runtime.

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/portfolio.spec.cjs
git commit -m "test: cover playable project navigation"
```

### Task 3: Guard the production deployment

**Files:**
- Modify: `.github/workflows/pages.yml`
- Modify: `scripts/workflow.test.cjs`

**Interfaces:**
- Consumes: deployed Pages URL from the deploy job.
- Produces: production-health failure when the play page or Unity runtime files are unavailable.

- [ ] **Step 1: Write a failing workflow contract test**

Assert the production-health script contains the Midas page, loader, data, framework, and wasm paths; assert large runtime checks use `--range 0-0`.

- [ ] **Step 2: Verify the focused test fails**

Run: `node --test scripts/workflow.test.cjs`

Expected: FAIL because the current health script mentions none of the playable paths.

- [ ] **Step 3: Extend production health checks**

Fetch the play page and loader with the existing retrying `curl_args`. Check the page title and loader content. Request byte zero from each large Unity asset with `curl --range 0-0 --output /dev/null` so the job verifies availability without downloading the complete files.

- [ ] **Step 4: Verify workflow and unit tests pass**

Run: `node --test scripts/workflow.test.cjs && npm test`

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add .github/workflows/pages.yml scripts/workflow.test.cjs
git commit -m "ci: verify deployed playable assets"
```

### Task 4: Full verification and staged release

**Files:**
- Verify only; no planned source changes.

**Interfaces:**
- Consumes: all earlier task commits.
- Produces: verified commits on `dev` and `main`, successful Pages deployment, and healthy public URLs.

- [ ] **Step 1: Run full local verification**

Run: `npm run verify && git diff --check`

Expected: unit, build, and browser checks all pass with no whitespace errors.

- [ ] **Step 2: Push the feature branch and create a PR to dev**

Push `fix/pages-playable-artifact`, create a merge-commit PR targeting `dev`, wait for required checks, and merge without squash or rebase.

- [ ] **Step 3: Verify dev and open the incremental PR to main**

Confirm the feature commits are ancestors of `origin/dev`. Create a PR from `dev` to `main`, wait for required checks, and merge with a merge commit.

- [ ] **Step 4: Wait for Pages deployment and production health**

Wait for the `main` push workflow to finish successfully. If it fails, inspect the failing job before changing code.

- [ ] **Step 5: Verify the public deployment independently**

Use `curl --fail` on the public play page and loader, and range requests on the data, framework, and wasm assets. Confirm the root portfolio remains available.

