# CI/CD and GitHub Pages Design

## Purpose

Protect the public portfolio from unverified changes while keeping hosting simple and free. Every pull request targeting `main` must prove that project data, generated files, JavaScript behaviour, responsive routes, and core assets work before merge. Every accepted `main` revision must pass the same gate before it replaces the live GitHub Pages site.

The production URL remains `https://jarrettchen217.github.io/`. GitHub Actions supplies temporary standard Linux runners for validation and deployment; it does not become a persistent application server.

## Current state

- GitHub Pages publishes the repository root from `main` using the legacy branch source.
- `main` has no branch protection or required status checks.
- The repository has build consistency checks and 13 Node tests, but no GitHub Actions workflow.
- Browser behaviour is not tested in a real browser.
- `js-yaml` is pinned to 4.2.0 and has a patched high-severity resource-consumption advisory; the fixed release is 4.3.2.

## Recommended pipeline

Use one workflow with a stable required-check name and two paths:

1. On every pull request targeting `main`, run the complete quality gate and publish diagnostic artifacts only when it fails.
2. On every push to `main`, run the same quality gate, build a minimal static-site artifact, deploy it through the official GitHub Pages actions, and verify the deployed URL.
3. Allow manual workflow dispatch for recovery and controlled re-deployment.

Deployment must depend on the successful quality job. A failed test therefore cannot update the live site.

## Quality gate

The required quality job runs on a standard Ubuntu GitHub-hosted runner with a pinned Node.js LTS major and dependencies installed from `package-lock.json`.

It performs these checks in order:

1. `npm ci --ignore-scripts` installs the exact locked dependency graph.
2. A high-severity dependency audit fails the job. `js-yaml` is upgraded to 4.3.2 as part of this work.
3. `npm run check` verifies that `projects-data.js` exactly matches `projects.yml` and that the project schema, translations, IDs, selections, and asset references remain valid.
4. `npm test` runs the Node test suite.
5. Playwright starts the built static site on a loopback-only server and runs Chromium smoke tests.
6. The static deployment bundle is checked to ensure that only public runtime files are included.

The quality job has read-only repository permissions. It must not deploy pull-request code or receive a Pages write token.

## Browser coverage

The Playwright suite validates behaviour that source-level tests cannot prove:

- the Overview, Projects, Contact, and every published project-detail route render;
- English and Chinese modes both render and can be switched;
- project keyword search and category filters return coherent results and can be reset;
- navigation links and project links lead to their intended fragment routes;
- the main desktop and mobile viewport layouts do not create horizontal overflow;
- uncaught page exceptions, unexpected console errors, failed same-origin requests, and missing public assets fail the test;
- image previews and video controls remain present without forcing media autoplay.

The test should assert stable behaviours and accessible labels rather than pixel-perfect styling. Screenshot comparison is intentionally deferred because it creates noisy baselines for a content-heavy portfolio.

Playwright records screenshots, traces, and video only for failures. GitHub retains the uploaded failure report for seven days. Successful runs upload no browser artifacts.

## Static deployment artifact

A focused site-build script creates a fresh `_site/` directory containing only files needed in production:

- `index.html`
- `app.js`
- `content.js`
- `projects-data.js`
- `styles.css`
- `.nojekyll`
- the selected public `assets/` tree

It excludes source YAML, tests, documentation, `node_modules`, `photo-inbox`, Git metadata, and private working material. Automated tests pin this allowlist so future repository files are not silently published.

The Pages workflow uses the official `configure-pages`, `upload-pages-artifact`, and `deploy-pages` actions. The deploy job alone receives `pages: write` and `id-token: write`; all other jobs retain read-only permissions. Concurrent deployments are serialized so two rapid merges cannot race.

## Post-deployment verification

After GitHub Pages reports a successful deployment, a final health job requests the production URL and its core JavaScript and CSS assets with retries to allow CDN propagation. It verifies successful HTTP responses and expected page markers. A failure marks the workflow red even though the previous version may already have been replaced; the Actions summary and deployment environment retain the exact revision and URL for diagnosis.

Full browser behaviour is tested against the exact local artifact before deployment. Reinstalling Chromium only to repeat the full suite against production is intentionally avoided to keep the workflow fast and economical.

## Merge protection and activation order

Activation is staged to avoid locking `main` before GitHub has registered the new status-check name:

1. Implement and run the workflow on the feature branch.
2. Open a pull request into `main` and confirm the quality check succeeds.
3. Configure the repository Pages source as GitHub Actions.
4. Protect `main`: require a pull request and the stable quality check, require the branch to be current before merge, block force pushes and deletion, and include administrators so direct pushes cannot bypass the gate.
5. Merge the feature pull request and observe the first Actions-based production deployment and health check.

The repository may remain single-maintainer. No approving review is required by default because that could make Hao unable to merge his own pull requests; the automated quality check is the mandatory gate.

## Failure handling

- Data, unit, audit, or browser failure: block merge and attach only the relevant seven-day diagnostic report.
- Build-bundle failure: block merge or deployment; never publish a partial `_site` directory.
- Deployment failure: keep the workflow red and preserve the last successfully deployed site where GitHub Pages permits.
- Post-deployment health failure: surface a red production workflow with the deployed revision and URL; reruns are available through manual dispatch.
- Flaky browser behaviour must be fixed or narrowly documented. Tests are not globally retried to turn intermittent failures green.

## Cost and retention controls

Use only standard GitHub-hosted runners and the public repository's GitHub Pages environment. Do not select larger paid runners or third-party preview hosting. Cache only Playwright browser binaries when it materially reduces runtime, and keep failure artifacts for seven days. There is no scheduled polling in this first version; each pull request and `main` update is checked automatically.

## Documentation

The README will describe:

- the local commands equivalent to the CI quality gate;
- what the required GitHub check covers;
- how deployment from `main` works;
- where to find a failed browser report;
- the rule that production changes enter through pull requests rather than direct pushes.

## Out of scope

- Per-pull-request public preview URLs.
- Pixel-by-pixel visual regression baselines.
- A continuously running backend or monitoring server.
- External paid CI, hosting, or observability services.
- Changing portfolio content or case-study presentation.

These can be added later without weakening the merge and deployment gate defined here.
