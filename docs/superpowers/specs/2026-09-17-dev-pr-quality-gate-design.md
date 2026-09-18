# Dev Pull-Request Quality Gate Design

## Purpose

Catch integration defects before project branches enter `dev`, while preserving `main` as the only production deployment source.

## Workflow behaviour

- Pull requests targeting either `dev` or `main` run the complete `quality-gate` job.
- Pull-request runs never upload a Pages artifact, deploy, or run production health checks.
- Pushes to `main` run `quality-gate`, upload the verified `_site` artifact, deploy GitHub Pages, and run production health checks.
- Pushes to `dev` do not trigger this workflow. The merge gate is enforced on the pull request instead.
- Manual dispatch is production-capable only when the selected ref is `main`; dispatching another ref runs validation without deployment.

Every deployment condition must therefore test both the event and branch explicitly. A broad condition such as “not a pull request” is not sufficient.

## Branch protection

Protect `dev` with the same trusted GitHub Actions `quality-gate` context used by `main`:

- require pull requests;
- require the branch to be current before merge;
- require conversation resolution;
- require zero approving reviews so a single maintainer can merge;
- enforce the rule for administrators;
- prohibit force pushes and deletion.

`main` protection remains unchanged.

## Regression protection

Extend the workflow unit test to prove:

- `pull_request.branches` is exactly `dev` and `main`;
- `push.branches` remains exactly `main`;
- every Pages upload/deploy/health condition calls a shared production expression equivalent to `push on main` or `workflow_dispatch on main`;
- `dev` can never satisfy the production expression.

## Verification and rollout

Run the full local gate, open a pull request into `main`, and wait for `quality-gate`. After merge, verify the production deployment succeeds. Then configure and read back `dev` branch protection. A small test pull request targeting `dev` is optional because GitHub registers the same workflow check from the merged workflow definition.

## Out of scope

- Deploying a public preview from `dev`.
- Running the workflow on direct pushes to project branches.
- Adding mandatory human approvals.
- Changing the production site or portfolio content.
