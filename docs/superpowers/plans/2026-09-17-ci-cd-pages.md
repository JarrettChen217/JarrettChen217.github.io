# Portfolio CI/CD and GitHub Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Require a verified pull request before changes enter `main`, then deploy the exact tested static artifact to GitHub Pages and confirm the production site is healthy.

**Architecture:** A single GitHub Actions workflow owns both paths: pull requests stop after the `quality-gate` job, while `main` pushes pass the same job and continue to Pages deployment and production health verification. Local Node tests protect the YAML compiler and deployment allowlist; Playwright exercises the built `_site` artifact in Chromium. Repository settings make the stable quality job mandatory before merge.

**Tech Stack:** Node.js 22, Node test runner, js-yaml 4.3.2, Playwright 1.63.0 with Chromium, GitHub Actions, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-09-17-ci-cd-pages-design.md`

## Global Constraints

- Production remains `https://jarrettchen217.github.io/` and contains only static public files.
- Use standard GitHub-hosted Ubuntu runners; do not introduce paid runners or third-party hosting.
- Pull-request jobs have read-only repository permissions and cannot deploy.
- The deployment job runs only after the complete quality gate succeeds on `main`.
- Failure screenshots, traces, videos, and the HTML report are uploaded only on failure and retained for seven days.
- Browser tests assert behaviour and responsive safety, not pixel-perfect screenshots.
- The generated `_site/` directory is allowlisted and must exclude YAML sources, tests, documentation, dependencies, Git data, and `photo-inbox`.
- Main-branch protection is activated only after GitHub has registered the successful `quality-gate` check.

---

## File structure

- `package.json` / `package-lock.json`: pin safe build and browser-test dependencies and expose reproducible local commands.
- `.gitignore`: keep `_site/`, Playwright output, and browser reports out of Git.
- `scripts/build-site.cjs`: create the production artifact from an explicit top-level allowlist.
- `scripts/build-site.test.cjs`: prove the allowlist includes required runtime files and excludes repository-only material.
- `playwright.config.cjs`: define the local static server, Chromium settings, and failure-only diagnostics.
- `tests/e2e/portfolio.spec.cjs`: exercise routes, bilingual behaviour, filtering, media, browser errors, failed requests, and mobile overflow.
- `.github/workflows/pages.yml`: implement the PR gate, main deployment, and post-deployment health check.
- `README.md`: document local parity commands, merge rules, deployment, and failure-report retrieval.

### Task 1: Pin safe dependencies and local command surface

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `npm run test:unit`, `npm run build:site`, `npm run test:e2e`, and `npm run verify` commands used by later tasks and GitHub Actions.
- Produces: exact dev dependencies `js-yaml@4.3.2` and `@playwright/test@1.63.0`.

- [ ] **Step 1: Record the current security failure**

Run:

```bash
npm audit --audit-level=high
```

Expected: exit 1 with the `js-yaml` resource-consumption advisory affecting 4.2.0.

- [ ] **Step 2: Upgrade and pin dependencies**

Run:

```bash
npm install --save-dev --save-exact js-yaml@4.3.2 @playwright/test@1.63.0
```

Expected: `package.json` and `package-lock.json` pin both exact versions.

- [ ] **Step 3: Add stable scripts**

Change `package.json` scripts to:

```json
{
  "build": "node scripts/build-projects.cjs",
  "build:site": "node scripts/build-site.cjs",
  "check": "node scripts/build-projects.cjs --check",
  "test": "npm run test:unit",
  "test:unit": "node --test scripts/*.test.cjs",
  "test:e2e": "playwright test",
  "verify": "npm run check && npm run test:unit && npm run build:site && npm run test:e2e"
}
```

- [ ] **Step 4: Ignore generated outputs**

Append these exact entries to `.gitignore`:

```gitignore
_site/
playwright-report/
test-results/
```

- [ ] **Step 5: Verify the dependency gate**

Run:

```bash
npm audit --audit-level=high
npm run check
npm run test:unit
```

Expected: the audit reports zero high-or-critical vulnerabilities, project data is current, and all existing unit tests pass.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json .gitignore
git commit -m "build: pin CI and browser test dependencies"
```

### Task 2: Build a minimal, allowlisted Pages artifact

**Files:**
- Create: `scripts/build-site.test.cjs`
- Create: `scripts/build-site.cjs`

**Interfaces:**
- Produces: `buildSite({ root, output }) -> string`, returning the absolute output directory.
- Produces: `_site/` with the six runtime files, `.nojekyll`, and `assets/` only.
- Consumes: the `npm run build:site` command declared in Task 1.

- [ ] **Step 1: Write the failing allowlist test**

Create `scripts/build-site.test.cjs` with a temporary fixture containing the runtime files, `assets/example.webp`, and forbidden `projects.yml`, `README.md`, `photo-inbox/private.jpg`, and `docs/internal.md`. Assert that `buildSite` returns the requested output, copies the runtime files and asset, creates an empty `.nojekyll`, and exposes exactly this top-level list:

```js
[
  '.nojekyll',
  'app.js',
  'assets',
  'content.js',
  'index.html',
  'projects-data.js',
  'styles.css'
]
```

Also assert that `projects.yml`, `README.md`, `photo-inbox`, and `docs` do not exist in the output.

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
node --test scripts/build-site.test.cjs
```

Expected: FAIL because `./build-site.cjs` does not exist.

- [ ] **Step 3: Implement the allowlisted builder**

Create `scripts/build-site.cjs` with these public entries:

```js
const PUBLIC_FILES = [
  'index.html',
  'app.js',
  'content.js',
  'projects-data.js',
  'styles.css',
];

function buildSite({ root = ROOT, output = path.join(root, '_site') } = {}) {
  const resolvedRoot = path.resolve(root);
  const resolvedOutput = path.resolve(output);
  fs.rmSync(resolvedOutput, { recursive: true, force: true });
  fs.mkdirSync(resolvedOutput, { recursive: true });
  for (const file of PUBLIC_FILES) {
    fs.copyFileSync(path.join(resolvedRoot, file), path.join(resolvedOutput, file));
  }
  fs.cpSync(path.join(resolvedRoot, 'assets'), path.join(resolvedOutput, 'assets'), {
    recursive: true,
  });
  fs.writeFileSync(path.join(resolvedOutput, '.nojekyll'), '');
  return resolvedOutput;
}
```

Export `{ buildSite, PUBLIC_FILES }`; when executed directly, build `_site/` and print its path. Do not run the project-data generator inside this script: `npm run check` must reject stale generated data rather than silently rewriting it.

- [ ] **Step 4: Run the focused and full unit suites**

Run:

```bash
node --test scripts/build-site.test.cjs
npm run test:unit
npm run build:site
```

Expected: all unit tests pass, and `_site/` contains only the pinned top-level allowlist.

- [ ] **Step 5: Commit**

```bash
git add scripts/build-site.cjs scripts/build-site.test.cjs
git commit -m "build: create allowlisted Pages artifact"
```

### Task 3: Add real-browser portfolio smoke tests

**Files:**
- Create: `playwright.config.cjs`
- Create: `tests/e2e/portfolio.spec.cjs`

**Interfaces:**
- Consumes: `_site/` from `npm run build:site`.
- Consumes: published project IDs parsed from `projects.yml` with `js-yaml`.
- Produces: exit status for `npm run test:e2e`, `playwright-report/`, and `test-results/` failure diagnostics.

- [ ] **Step 1: Create the Playwright runtime configuration**

Set `testDir` to `tests/e2e`, `outputDir` to `test-results`, and reporters to `line` plus HTML at `playwright-report`. Use one Chromium project with a desktop viewport. Configure:

```js
use: {
  baseURL: 'http://127.0.0.1:4173',
  trace: 'retain-on-failure',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},
webServer: {
  command: 'python3 -m http.server 4173 --bind 127.0.0.1 --directory _site',
  url: 'http://127.0.0.1:4173',
  reuseExistingServer: !process.env.CI,
  timeout: 30_000,
}
```

Set `forbidOnly: Boolean(process.env.CI)`, `retries: 0`, and a 30-second test timeout.

- [ ] **Step 2: Write browser failure collection first**

In `tests/e2e/portfolio.spec.cjs`, add a helper that records:

- `pageerror` events;
- console messages whose type is `error`;
- same-origin responses with status 400 or greater.

Return an assertion callback that requires the collected list to equal `[]`. Register it before each navigation and call it at the end of every test.

- [ ] **Step 3: Cover overview and bilingual navigation**

Add a test that clears `localStorage`, opens `/#overview`, verifies `About me`, clicks the `中文` language button, verifies `关于我` and `<html lang="zh">`, then switches back through `EN` and verifies `<html lang="en">`.

- [ ] **Step 4: Cover the catalogue, search, filters, and reset**

Open `/#projects`, assert the result status reports all published projects, search for `AVL`, verify the AVL project link remains, combine the search with the Australia region filter, enter a guaranteed absent term and verify the empty state, then click `Clear filters` and verify the complete count returns.

- [ ] **Step 5: Cover every published detail route and media rules**

Parse `projects.yml` and loop over every `published: true` project ID. For each `/#project/<id>`, require the project heading and `Back to all projects` link. On `avl-visualisation`, require at least one gallery preview, require `video[controls]`, and assert the video has no `autoplay` attribute.

- [ ] **Step 6: Cover contact and mobile overflow**

Verify `/#contact` renders its heading. Set the viewport to `390 × 844` and visit Overview, Projects, and the AVL detail route; for each route assert:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

- [ ] **Step 7: Run the new suite from a clean artifact**

Run:

```bash
npx playwright install chromium
npm run build:site
npm run test:e2e
```

Expected: all routes pass with no page exceptions, console errors, failed same-origin responses, or mobile overflow.

- [ ] **Step 8: Prove the test detects a broken page, then restore it**

Temporarily rename `_site/projects-data.js`, run `npm run test:e2e`, and confirm at least one test fails because the request returns 404 or the page cannot render. Restore the generated artifact by running `npm run build:site`; do not commit the temporary break.

- [ ] **Step 9: Commit**

```bash
git add playwright.config.cjs tests/e2e/portfolio.spec.cjs
git commit -m "test: exercise portfolio in Chromium"
```

### Task 4: Add the pull-request gate and Pages deployment workflow

**Files:**
- Create: `.github/workflows/pages.yml`

**Interfaces:**
- Consumes: `npm run check`, `npm run test:unit`, `npm run build:site`, and `npm run test:e2e`.
- Produces: required check context `quality-gate`.
- Produces: GitHub Pages deployment URL as `deploy.outputs.page_url`.

- [ ] **Step 1: Create the workflow triggers and default permissions**

Use the workflow name `Portfolio quality and Pages`, with `pull_request` targeting `main`, `push` targeting `main`, and `workflow_dispatch`. Set top-level permissions to `contents: read`.

- [ ] **Step 2: Implement `quality-gate`**

Create a job whose job ID and displayed name are both `quality-gate`, running on `ubuntu-latest` with a 15-minute timeout. Its steps are:

```yaml
- uses: actions/checkout@v6
- uses: actions/setup-node@v6
  with:
    node-version: 22
    cache: npm
- run: npm ci --ignore-scripts
- run: npm audit --audit-level=high
- run: npm run check
- run: npm run test:unit
- run: npx playwright install --with-deps chromium
- run: npm run build:site
- run: npm run test:e2e
```

Upload `playwright-report/` and `test-results/` with `actions/upload-artifact@v4` only when the job has failed and report files exist. Name the artifact `playwright-failure-${{ github.run_id }}` and set `retention-days: 7`.

On non-pull-request events only, upload `_site/` with `actions/upload-pages-artifact@v4` after all tests pass.

- [ ] **Step 3: Implement the protected deploy job**

Add `deploy`, conditional on a non-pull-request event and dependent on `quality-gate`. Give only this job:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
```

Deploy with `actions/deploy-pages@v4`, expose its `page_url` as a job output, and add workflow concurrency group `pages` with `cancel-in-progress: false` so production deployments cannot race.

- [ ] **Step 4: Implement production health verification**

Add `production-health`, conditional on a non-pull-request event and dependent on `deploy`. Pass the deployed URL through an environment variable and use `curl --fail --silent --show-error --retry 6 --retry-all-errors --retry-delay 5` to verify:

- the site root contains `<title>Hao Chen</title>`;
- `styles.css` contains `--accent:#375d73`;
- `app.js` contains `function route()`;
- `projects-data.js` contains `Generated from projects.yml`.

Print the deployed URL in the GitHub step summary after all checks succeed.

- [ ] **Step 5: Validate workflow syntax locally**

Parse `.github/workflows/pages.yml` using `js-yaml` with the JSON schema and assert the top-level mapping contains `name`, `on`, `permissions`, and the three expected jobs. Then run `git diff --check`.

Expected: YAML parses, all job dependencies resolve by exact ID, and no whitespace errors exist.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/pages.yml
git commit -m "ci: gate changes and deploy verified Pages site"
```

### Task 5: Document the operating workflow and run the complete local gate

**Files:**
- Modify: `README.md`

**Interfaces:**
- Documents: contributor commands, required check, production deployment, and failure-report workflow.

- [ ] **Step 1: Replace stale publication status**

Remove the statements that Pages has not been activated and that the workspace has not been pushed. State that the public site is hosted at `https://jarrettchen217.github.io/`.

- [ ] **Step 2: Add a CI/CD section**

Document these exact local commands:

```bash
npm ci --ignore-scripts
npm audit --audit-level=high
npx playwright install chromium
npm run verify
```

Explain that pull requests to `main` must pass `quality-gate`, successful `main` revisions deploy the allowlisted `_site/` artifact, and failed browser runs provide a seven-day `playwright-failure-<run-id>` artifact in GitHub Actions.

- [ ] **Step 3: Run the complete local verification**

Run:

```bash
npm ci --ignore-scripts
npm audit --audit-level=high
npx playwright install chromium
npm run verify
git diff --check
git status --short
```

Expected: audit clean at high severity, generated data current, all unit and browser tests pass, `_site/` is ignored, and only intended source files remain changed.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: explain portfolio quality and deployment gates"
```

### Task 6: Activate the remote gate and verify the first deployment

**Files:**
- No repository file changes.

**Interfaces:**
- Consumes: remote check context emitted by `.github/workflows/pages.yml`.
- Produces: protected `main`, Actions-based Pages source, and a verified production deployment.

- [ ] **Step 1: Push the feature branch and open the pull request**

Run only after Hao authorizes the push:

```bash
git push -u origin codex/ci-pages
gh pr create --base main --head codex/ci-pages \
  --title "Add verified CI/CD for portfolio Pages" \
  --body "Adds a required data, unit, security, bundle, and Chromium quality gate; deploys the tested allowlisted artifact to GitHub Pages after main merges; retains failure diagnostics for seven days; and documents local verification. After this PR's quality-gate succeeds, Pages will be switched to GitHub Actions and main will require that check before future merges."
```

The PR body must summarize the quality gate, deployment flow, cost controls, local verification, and the later settings activation.

- [ ] **Step 2: Wait for and inspect the quality check**

Use `gh pr checks --watch` and verify the exact successful check context through the commit check-runs API. It must resolve to `quality-gate` before branch protection references it.

- [ ] **Step 3: Switch Pages to GitHub Actions**

Update the repository Pages build type to `workflow` through the GitHub Pages settings or REST API. Immediately read the Pages configuration back and require `build_type: workflow` before continuing.

- [ ] **Step 4: Protect `main`**

Create branch protection requiring the registered `quality-gate` context with strict up-to-date branches, pull requests with zero mandatory approving reviews, conversation resolution, administrator enforcement, no force pushes, and no branch deletion. Read the protection object back and verify every flag.

- [ ] **Step 5: Merge through the protected path**

Merge the PR only after the required check is green. Do not bypass protection or push the implementation directly to `main`.

- [ ] **Step 6: Observe production deployment and health**

Wait for the `Portfolio quality and Pages` run on `main`. Require all three jobs—`quality-gate`, `deploy`, and `production-health`—to succeed, then request `https://jarrettchen217.github.io/` and confirm it serves the merged revision's expected runtime files.

- [ ] **Step 7: Report activated protections**

Provide Hao the PR URL, workflow-run URL, live site URL, required check name, Pages source, and branch-protection summary. If any remote setting cannot be applied, leave the PR unmerged and report the exact blocker without weakening the gate.
