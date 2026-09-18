# Berry Street process narrative design

## Goal

Restructure the Berry Street Teachers App detail page around the evidence-backed path from client discovery to final validation. The process should connect the whole page instead of appearing as a standalone timeline, and every chapter should include one or two relevant project artifacts.

## Narrative structure

The page retains its existing title, metadata, concise summary and TIPE background. The remaining case study becomes five numbered chapters:

1. **Discover** — explain the private readiness check-in need, the client constraints and the TIPE context. Show the goal model as the principal artifact and summarize client decisions as text rather than publishing private meeting records.
2. **Define** — show how personas, Role–Do–Be–Feel, user stories and prioritisation translated conversations into requirements. Use the Role–Do–Be–Feel model and user-story map as evidence.
3. **Prototype** — show the team's low-fidelity student check-in and teacher-dashboard screens. Explain that the course paper-prototyping material informed the review–refine method, but do not reproduce the lecturer's example as team work.
4. **Test & learn** — show a privacy-cropped frame from the client usability test. Keep the prototype, task title and relevant subtitles; remove participant faces. Present only the clearest findings: dashboard density, confusion between scale and count, and unclear trend labels.
5. **Refine & validate** — pair the low-fidelity and high-fidelity dashboards, retain the existing chart-switching demo, and state the final client feedback accurately. Close with the existing team photograph and handover context.

## Content rules

- Keep all public copy bilingual and sourced from supplied project records.
- Do not describe the requirements models as UML; the located artifacts are a Goal Model, Role–Do–Be–Feel model, personas and user stories.
- Do not present the lecturer's paper-prototype photograph as a team deliverable.
- Do not publish raw meeting transcripts, private email addresses or internal research paths.
- Attribute the usability-test facilitation and Scrum Master coordination to Hao only where supported by project records.
- Emphasize outcomes and learning. Mention problems only when they directly explain a subsequent design decision.

## Data architecture

Add an optional `process` object to a project in `projects.yml`. It contains a bilingual page heading and introduction plus an ordered `stages` list. Each stage has a stable lowercase ID, bilingual label/title/body, optional bilingual contribution, optional bilingual findings, zero or more validated local images, and an optional validated local MP4 demo.

The compiler validates all translated text, local asset paths, dimensions, stage IDs and media types. Private editorial metadata is discarded. Existing projects without `process` continue using the generic detail renderer unchanged.

For a project with `process`, the detail renderer keeps the title, metadata, summary and background, then renders the ordered process chapters. Existing standalone `work`, `journey`, product gallery and engineering gallery blocks are not repeated for that project. The team photograph and handover material appear as the closing chapter content.

## Visual design

- Preserve the current white academic layout, typeface and muted blue palette.
- Use a narrow numbered stage rail beside each chapter on desktop.
- Use light horizontal rules to connect chapters; avoid cards, shadows and decorative gradients.
- Let media sit within the chapter that explains it. Two related images may form a two-column pair.
- On screens at or below 640px, stack the stage marker above the content and reduce all media groups to one column.
- Preserve accessible large-image previews, lazy loading, intrinsic image dimensions, keyboard focus and reduced motion behavior.
- Video remains user-controlled with no autoplay.

## Asset plan

- Reuse the existing goal model, dashboard demo, dashboard screenshot, team photograph and selected planning images where they support the new chapters.
- Export public-facing images from the supplied Role–Do–Be–Feel, user-story-map, low-fidelity and high-fidelity PDFs.
- Export one privacy-cropped usability-test frame from the supplied video.
- Store final optimized derivatives under `assets/projects/berry-street/` using lowercase kebab-case names and WebP variants at approximately 800 px and 1600 px widths where the source supports them.
- Do not copy the source PDFs, transcripts or full meeting video into the public site repository.

## Verification

- Compiler tests prove the optional process schema keeps order, strips private metadata and rejects unsafe or incomplete entries.
- Renderer tests prove the five bilingual stages, contribution notes, findings, images and optional demo appear in stage order without duplicating the legacy Berry Street sections.
- The generated project data must be current.
- Desktop English, desktop Chinese and a 390 px mobile viewport must be visually inspected.
- The mobile page must have no horizontal overflow, and participant faces must not appear in the selected test frame.
