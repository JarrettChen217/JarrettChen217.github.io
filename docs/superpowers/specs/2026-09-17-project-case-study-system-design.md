# Reusable Project Case-Study System

## Purpose

Preserve a consistent academic portfolio experience as new projects are added. Future project pages should reuse the existing Berry Street process narrative, media behaviour, typography, spacing, and responsive rules instead of introducing project-specific layouts.

## Deliverables

1. `docs/project-case-study-guide.md` — the human- and agent-facing source of truth for project-detail composition.
2. `docs/templates/project-process.yml` — a copy-ready bilingual YAML example that matches the validated public schema.
3. A short README entry linking to both resources and defining the update workflow.

The guide complements, rather than replaces, `projects.yml` and its compiler tests.

## Composition Contract

A process-led case study uses the existing project header and Background section, followed by one continuous process narrative. The recommended sequence is:

1. Discover
2. Define
3. Prototype
4. Test & learn
5. Refine & validate

Stage labels may be renamed when another project genuinely uses different language, but the following visual grammar remains fixed:

- one numbered vertical rail;
- one stage heading, concise explanation, and optional personal-contribution callout;
- up to three evidence findings;
- normally one or two relevant media items per stage;
- the existing image preview and controllable video components;
- two media columns on wider screens and one column on mobile;
- the shared site typography, colours, spacing, captions, and breakpoints.

Projects without enough process evidence continue using the existing compact detail layout. They must not imitate completeness with empty stages.

## Content Rules

- Lead with outcomes and supported decisions; mention process only where it explains the result.
- Attribute individual contribution conservatively and distinguish it from team work.
- Require complete English and Chinese text for every public field.
- Do not invent metrics, scope, ownership, client feedback, or outcomes.
- Use descriptive captions and alt text that explain why an artifact is present.
- Publish only reviewed, compressed derivatives. Keep originals and private research outside public assets.
- Crop or omit faces and identifying information when consent is not established.
- Do not describe internal research, verification, or editing instructions on the public page.

## Layout Governance

The existing process renderer and CSS are the default design system. A future contributor should first try to express a project through the supported YAML fields. New one-off components, colours, type scales, card styles, breakpoints, or navigation patterns are not allowed for a single project.

A new presentation pattern is justified only when:

1. the current schema cannot truthfully represent the material;
2. the pattern will serve multiple projects;
3. both languages and mobile behaviour are designed together;
4. renderer, compiler, and responsive tests are updated; and
5. this guide is revised in the same change.

Site-wide visual evolution remains possible, but it should update all project pages coherently.

## Template Shape

The YAML template will include:

- stable project identity and metadata;
- bilingual summary and background;
- optional verified external background link;
- an empty `work` list when process stages own contribution content;
- the process heading, introduction, and five representative stages;
- optional contribution, findings, gallery, and demo examples;
- comments identifying optional fields and media-dimension requirements.

It will use neutral placeholder copy that cannot be mistaken for a real claim.

## README Workflow

The README will direct maintainers to:

1. read the case-study guide;
2. copy the YAML template into `projects.yml`;
3. prepare compressed 800/1600 image derivatives;
4. build generated data;
5. run schema and browser tests;
6. inspect English and Chinese desktop/mobile views before publishing.

## Verification

- `npm run build`
- `npm run check`
- `npm test`
- `git diff --check`
- confirm all documented file links exist;
- confirm the example compiles after its placeholders are replaced;
- verify the guide does not contradict the current compiler or renderer.

## Scope

This change documents and templates the established system. It does not create a new page design, alter the current Berry Street page, or automatically migrate other projects.
