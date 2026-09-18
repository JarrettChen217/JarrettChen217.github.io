# Pages Playable Artifact Design

## Problem

The Midas Curse Unity WebGL files exist in the repository and pass source-tree tests, but the Pages builder publishes only top-level runtime files and `assets/`. The resulting `_site` artifact omits `play/midas-curse`, while browser tests never follow the Play Game link and the production health check probes only core portfolio files. CI therefore reports success even though the deployed game URL returns 404.

## Goal

Make playable project routes part of the public artifact contract and verify that contract at build, browser, and deployed-production boundaries.

## Artifact contract

`scripts/build-site.cjs` will continue using an explicit allowlist. In addition to the existing top-level files and `assets/`, it will publish the repository's `play/` tree. Private authoring inputs such as `projects.yml`, `docs/`, `photo-inbox/`, and repository documentation remain excluded.

The build-site unit test will create a representative playable fixture and assert that its entry page and Unity build files are copied into the output. It will still assert that private paths are absent. A repository-level contract test will build the real artifact and verify that every repository-relative `play.url` declared by a published project resolves to a file inside `_site` without escaping the artifact root.

## Browser verification

Playwright will open the Midas case study from the built `_site`, follow Play Game, and confirm that the standalone page and Start Game button render. It will request the Unity loader through the same local HTTP server and require a successful response. The test will not click Start Game, so CI does not download or initialise the roughly 60 MB runtime bundle during every browser run.

## Production verification

After the Pages deployment, the production-health job will continue checking core portfolio assets and will additionally:

- fetch the Midas play page and verify its title;
- fetch the Unity loader and verify a known loader token;
- issue range requests for the data, framework, and wasm files and require HTTP success.

The range requests validate deployed availability without downloading each complete runtime file. Existing retry behaviour remains in place for Pages propagation delay.

## Delivery

The fix is developed on `fix/pages-playable-artifact` in an isolated worktree. After the full local verification passes, it is merged and pushed to `dev`. The same verified increment is then merged into `main`, where the existing workflow deploys Pages. Completion requires the main workflow to succeed and the public Midas URL plus its Unity resources to return successful responses.

