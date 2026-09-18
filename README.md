# Personal website preview

A bilingual, responsive academic-style website with Overview, searchable Internship and Projects catalogues, individual detail views, and Contact.

## Local preview

Run `python3 -m http.server 54839 --bind 127.0.0.1` in this directory, then open `http://localhost:54839`.

## Editing

### Header brand

The upper-left home link combines `assets/branding/hao-chen-header-96.png` (48px display avatar) with locally bundled Silkscreen lettering in `assets/branding/silkscreen-latin-700.woff2`. Three CSS-only pixel snowflakes animate around the avatar without moving the layout; they stop when the visitor requests reduced motion. The single `#overview` link remains keyboard-accessible and keeps the whole lockup clickable. At narrow widths, navigation occupies a separate row. The source avatar is kept in `photo-inbox/profile/hao-chen-pixel-header-source.png`.

### Browser tab icon assets

The favicon is the blue-hood pixel avatar on a transparent background. Public 16 / 32 / 48 px PNGs and the multi-size ICO live in `assets/branding/`; the active editable source stays in `photo-inbox/profile/hao-chen-pixel-favicon-transparent-source.png`. The earlier blue-background source remains alongside it as a preserved alternative.

To replace it, run `node scripts/prepare-favicon.cjs PATH_TO_SQUARE_IMAGE` (requires macOS `sips`), then increment the favicon `?v=` values together in `index.html` to refresh browser caches. The public build copies these assets automatically. Browser page titles and the header name are independent of the favicon.

### Project images

`projects.yml` now supports optional `gallery` and `architecture` lists. Gallery groups are `product`, `engineering` and `team`; each entry requires `src`, `thumbnail`, `width`, `height`, `thumbnailWidth`, and bilingual `alt`/`caption`. Both image paths must be existing WebP files inside `assets/projects/<project-id>/`. The browser uses responsive sources, deferred loading, and links to the larger compressed image. Architecture entries use bilingual `title`/`body` fields.

Prepare a selected image without modifying its original:

```sh
node scripts/prepare-image.cjs photo-inbox/avl-visualisation/collaborative-workshop.jpg assets/projects/avl-visualisation/collaborative-workshop
```

Requires local `sips` and `cwebp`. Outputs have maximum long edges of 800 and 1600 pixels, never upscale, and omit metadata. Filenames describe size targets; use actual dimensions printed by the command in YAML (portrait images have smaller widths). Quality defaults to 82; pass 92 for text-heavy screenshots. The site itself has no image-processing dependencies. Only selected compressed files belong in public assets; original inbox files stay out of Git.

- `projects.yml`: the single source for every project, translations, keywords, dates, and homepage selection. Bilingual fields use `en` / `zh` keys.
- `projects-data.js`: generated browser data; do not edit by hand.
- `content.js`: profile and internship configuration; references the generated project data.
- `app.js`: language selection, navigation, calendar progress, keyword search, and combined filters.
- `styles.css`: shared typography and responsive layout.
- `index.html`: page shell.
- `design/archive/`: historical comparison preview; not required for the website.

The `selected` list at the TOP of `projects.yml` controls the order of Overview projects by stable ID. Each optional `description` overrides only the homepage excerpt. Omitting it uses the project's canonical `summary`. Both views link to the same detail route; project data is never duplicated.

```yaml
selected:
  - id: agent-ai
    description:
      en: Short homepage introduction.
      zh: 首页短简介。
  - id: social-ai
```

Internships are configured in `content.js`. Each item has a stable `id`, bilingual company, place, role, date, excerpt and summary fields, plus `region`, `roleKey`, and `tech` values used by the Internship catalogue search and filters. Optional `team`, `background`, `work`, `process`, `delivery`, `highlights`, `boundary`, and `gallery` content appears only on `#internship/<id>` detail routes. Work entries can add public problem, role, contribution, validation, and outcome fields; all public case-study text is searchable from the catalogue. The `selectedInternships` list controls the Overview order; all three current internships are selected.

Internship photos use responsive WebP derivatives in `assets/internships/`. Public derivatives can be regenerated from reviewed originals with `scripts/prepare-image.cjs`; source photos kept in internship-specific folders such as `photo-inbox/cummins-china/` remain ignored and unpublished. Catalogue entries remain text-only, while detail galleries use lazy loading and the shared accessible image preview.

Projects have stable `id` values, bilingual names/descriptions/dates, `region`, `type`, `tech`, `keywords`, and `published` status. `published: false` keeps a draft out of the generated browser data. It does NOT make the YAML private if this repository is published, so never store secrets or private documents there.

After editing:

```sh
npm ci --ignore-scripts
npm run build
npx playwright install chromium
npm run verify
```

Refresh the local page after building. Commit `projects.yml` and its generated `projects-data.js` together when ready to publish. The browser requires neither Node.js nor a YAML parser, so GitHub Pages can serve the generated files directly.

The build rejects duplicate IDs, missing translations, unknown categories, and selected IDs that are missing or unpublished. Search matches both languages, keywords, descriptions, technologies, places, and project types. Space-separated terms must all match; location and type filters combine with the query.

Routes use URL fragments (for example `#project/agent-ai` and `#internship/cummins-us`), so direct links and reloads work on static hosting without server routing.

Calendar progress uses July 1, 2025 through January 1, 2027 as month boundaries for the master's program. It is clamped to 0–100% and refreshed on page load and every minute. The completed bachelor's timeline is fixed at 100%. These are calendar visualizations, not academic credit calculations.

Language follows the browser on the first visit and retains explicit language choices locally. No analytics, database, or external scripts are used.

## Quality gate and deployment

The public site is hosted at [jarrettchen217.github.io](https://jarrettchen217.github.io/). Pull requests targeting either `dev` or `main` must pass the required `quality-gate`, which verifies the dependency audit, generated project data, unit tests, the public deployment allowlist, and the portfolio in Chromium. Pull-request checks never deploy the site; only a verified revision accepted into `main` can publish to GitHub Pages.

```text
project branch -> dev PR quality-gate -> main PR quality-gate -> main deployment and health check
```

Run the same gate locally:

```sh
npm ci --ignore-scripts
npm audit --audit-level=high
npx playwright install chromium
npm run verify
```

After a verified pull request is merged, GitHub Actions rebuilds the allowlisted `_site/` artifact, deploys it to GitHub Pages, and checks the live HTML, CSS, application script, and generated project data. The deployment artifact contains only the runtime files and `assets/`; repository documents, YAML sources, tests, dependencies, and `photo-inbox` are excluded.

When a browser test fails, open that workflow run in GitHub Actions and download `playwright-failure-<run-id>`. It contains the HTML report and the available failure screenshot, trace, and video, and is retained for seven days. Successful runs do not upload browser diagnostics.

## Current status

### Outcome-led case studies

Berry Street and AVL include bilingual highlights below their brief and contributions. Edit optional `journey` entries inside the same project in `projects.yml`; the list order controls display order. Titles lead with delivered outcomes, with a short explanation of the development process. Missing or empty lists display no extra section.

```yaml
journey:
  - title: {en: A clearer teacher dashboard, zh: 更清晰的教师仪表盘}
    body:
      en: Describe the supported result, then briefly explain the contribution and refinement.
      zh: 先说明有依据的成果，再简述个人贡献与改进过程。
```

Both languages are required. Only title/body are compiled; do not put private research in this public YAML. Homepage selection and excerpt overrides remain independent of this detail content. Photo candidates go in `photo-inbox/<project-id>/`; they are not automatically published or rendered. Selected AVL images are now explicitly listed in the gallery. Documents can be linked after individual review.

The catalogue contains 12 visible project overviews and one unpublished software-modelling draft. The draft needs confirmation of individual contributions. Dance XR and other Unity projects await source materials. Industrial internship details and personal contact information remain outside the catalogue pending confirmation.

Keep private source documents and internal employer assets out of this repository.
