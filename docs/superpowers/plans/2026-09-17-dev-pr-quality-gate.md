# Dev Pull-Request Quality Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Run the complete portfolio quality gate before any pull request enters `dev`, while keeping GitHub Pages deployment exclusive to `main`.

**Architecture:** Extend the existing workflow trigger to accept pull requests targeting `dev` and `main`. Replace broad non-PR deployment conditions with one exact production expression repeated on artifact upload, deploy, and health jobs. Protect `dev` remotely with the trusted `quality-gate` context after the workflow change reaches `main`.

**Tech Stack:** GitHub Actions YAML, Node.js test runner, js-yaml, GitHub branch protection API

**Spec:** `docs/superpowers/specs/2026-09-17-dev-pr-quality-gate-design.md`

## Global Constraints

- Pull requests targeting `dev` or `main` run `quality-gate` and never deploy.
- Pushes to `main` run the gate, upload `_site`, deploy Pages, and run production health checks.
- Pushes to `dev` do not trigger this workflow.
- Manual dispatch deploys only when its selected ref is `main`.
- `main` protection remains unchanged.
- `dev` requires the trusted GitHub Actions `quality-gate`, pull requests, current branches, and resolved conversations, with zero required approvals and no force pushes or deletion.

---

### Task 1: Encode trigger and production-boundary requirements in tests

**Files:**
- Modify: `scripts/workflow.test.cjs`
- Modify: `.github/workflows/pages.yml`

**Interfaces:**
- Consumes: parsed workflow object already loaded in `scripts/workflow.test.cjs`.
- Produces: exact `productionCondition` used by the Pages upload step and the two production jobs.
- Produces: pull-request targets `['dev', 'main']` and push target `['main']`.

- [ ] **Step 1: Write the failing workflow test**

Append this test shape to `scripts/workflow.test.cjs`:

```js
test('dev pull requests run quality checks but only main can deploy', () => {
  assert.deepEqual([...workflow.on.pull_request.branches].sort(), ['dev', 'main']);
  assert.deepEqual(workflow.on.push.branches, ['main']);

  const productionCondition = "github.ref == 'refs/heads/main' && (github.event_name == 'push' || github.event_name == 'workflow_dispatch')";
  const pagesUpload = actionStep('quality-gate', 'actions/upload-pages-artifact');
  assert.equal(pagesUpload.if, productionCondition);
  assert.equal(workflow.jobs.deploy.if, productionCondition);
  assert.equal(workflow.jobs['production-health'].if, productionCondition);
  assert.equal(productionCondition.includes('refs/heads/dev'), false);
});
```

- [ ] **Step 2: Run the focused test and verify red**

Run:

```bash
node --test scripts/workflow.test.cjs
```

Expected: FAIL because the current pull-request list contains only `main` and the current deployment conditions accept every non-PR event.

- [ ] **Step 3: Narrow workflow triggers and deployment conditions**

Change the workflow trigger to:

```yaml
on:
  pull_request:
    branches: [dev, main]
  push:
    branches: [main]
  workflow_dispatch:
```

Use this exact condition on the `Upload verified Pages artifact` step and on both `deploy` and `production-health` jobs:

```yaml
if: ${{ github.ref == 'refs/heads/main' && (github.event_name == 'push' || github.event_name == 'workflow_dispatch') }}
```

- [ ] **Step 4: Verify green and run the complete local gate**

Run:

```bash
node --test scripts/workflow.test.cjs
npm audit --audit-level=high
npm run verify
git diff --check
```

Expected: 16 unit tests, 4 Chromium tests, clean high-severity audit, and no diff whitespace errors.

- [ ] **Step 5: Commit**

```bash
git add scripts/workflow.test.cjs .github/workflows/pages.yml
git commit -m "ci: validate pull requests targeting dev"
```

### Task 2: Document the two-stage branch flow

**Files:**
- Modify: `README.md`

**Interfaces:**
- Documents: project branch → `dev` quality gate → `main` quality gate → production deployment.

- [ ] **Step 1: Update the quality-gate section**

State that pull requests targeting either `dev` or `main` must pass `quality-gate`, but only accepted `main` revisions produce the Pages artifact and deployment. Include this flow:

```text
project branch -> dev PR quality-gate -> main PR quality-gate -> main deployment and health check
```

- [ ] **Step 2: Verify documentation and repository state**

Run:

```bash
git diff --check
npm run test:unit
```

Expected: no whitespace errors and all 16 unit tests pass.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: explain dev and main quality gates"
```

### Task 3: Activate and verify the remote dev gate

**Files:**
- No additional repository files.

**Interfaces:**
- Consumes: `quality-gate` check emitted by GitHub Actions app ID `15368`.
- Produces: protected `dev` branch and an unchanged Actions-only production Pages source.

- [ ] **Step 1: Push and create a pull request**

After Hao authorizes the push, push `codex/dev-quality-gate` and create a PR into `main` summarizing trigger coverage, deployment isolation, local tests, and the planned `dev` protection.

- [ ] **Step 2: Wait for the required check**

Use `gh pr checks --watch` and require `quality-gate` to pass. Confirm `deploy` and `production-health` are skipped on the PR.

- [ ] **Step 3: Merge through protected main**

Hao merges the green PR. Wait for the resulting `main` workflow and require `quality-gate`, `deploy`, and `production-health` to pass.

- [ ] **Step 4: Protect dev**

Apply branch protection to `dev` with:

```json
{
  "required_status_checks": {
    "strict": true,
    "checks": [{"context": "quality-gate", "app_id": 15368}]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": false,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 0,
    "require_last_push_approval": false
  },
  "restrictions": null,
  "required_linear_history": false,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true,
  "lock_branch": false,
  "allow_fork_syncing": true
}
```

- [ ] **Step 5: Read back and report final state**

Verify that `dev` has strict `quality-gate`, administrator enforcement, zero approvals, conversation resolution, and disabled force push/deletion. Verify Pages still reports `build_type: workflow` and the live site responds successfully. Report the PR, production run, and branch-protection state to Hao.
