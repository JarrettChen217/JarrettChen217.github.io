# Midas Curse Unity Project Design

## Purpose

Add one bilingual portfolio case study for **Midas Curse — Unity Survival Game** / **Midas Curse（Unity 生存游戏）**. Project 1 and Project 2 are presented as two development stages of the same Cosmic Creators game, from August to early November 2023.

The case study is evidence-led. It foregrounds the playable result, core mechanics, and Hao Chen's verified contributions while describing team outcomes as team outcomes. It identifies this project as Hao's first experience with Unity and the starting point for his systematic study of Unity, shader concepts, and game development; it does not claim mastery.

## Information architecture

- Stable project ID: `midas-curse-unity`.
- `projects.yml` remains the source of truth for English and Chinese copy, media references, section order, video, play link, team name, credits, and Overview selection.
- Overview adds only `{id: midas-curse-unity}`. It reuses the canonical project summary and does not copy project content.
- The detail sequence is: summary, embedded gameplay video and actions, background/core gameplay, personal contributions, gameplay media, brief design iteration, supporting design media, team record, credits, and resources.
- Existing projects keep their current default section order. An optional validated `sectionOrder` field changes order only where explicitly configured.

## Content boundaries

- Attribute the game concept, integrated result, design iterations, shader work, and evaluation to Cosmic Creators unless authorship is individually verified.
- Hao's contribution summary may include player running animation and Blend Tree work, health feedback, pause/shop interactions, enemy spawning and animation adjustments, camera/audio/UI work, and implementation debugging supported by the reports and commit history.
- Describe shader learning as part of the learning journey. Do not assign a specific shader to Hao without stronger evidence.
- Do not publish Noita reference GIFs, music MP4 files, course materials, peer reviews, private data, unrelated logs, or source code.
- Treat third-party models, environments, icons, animations, sound, music, tutorials, and effects as credited dependencies, not personal or team-original art.
- Do not commit `OurGroup.jpg` until public-display permission is confirmed.

## Media and interaction

- The confirmed YouTube watch page works, but its owner settings reject third-party embedding. Show a local 16:9 video poster linked to YouTube and provide a visible **Watch Demo / 观看演示** action instead of leaving a broken iframe.
- Provide **Play Game / 在线试玩** to a standalone `play/midas-curse/` page.
- The play page copies only the outer Unity WebGL runtime set: one loader, one data archive, one framework file, and one WebAssembly file. It does not copy duplicate nested builds.
- Rename runtime files to stable lowercase names and use relative URLs so the page works both locally and at the GitHub Pages root.
- Keep WebGL loading user-triggered to avoid a roughly 59 MB download when someone only reads the case study.
- Convert selected source images and GIFs into web-friendly WebP derivatives. Preserve originals in their read-only source locations.
- Preferred media: project cover, gold-path mechanic, maze design/model, visual-feedback improvement, and—after permission—the team photo.

## Visual direction

The surrounding site remains academic and restrained. Midas uses its own media rather than decorative gradients or game-themed chrome.

- **Base:** white `#ffffff`
- **Text:** existing charcoal `#303b42`
- **Academic accent:** existing blue `#375d73`
- **Rules:** existing pale grey `#e5eaed`
- **Game action accent:** muted ochre `#8a641d`, reserved for the demo/play actions
- **Type:** the site's existing system sans-serif stack and heading scale
- **Layout:** left-aligned reading column, hairline section rules, two-column supporting media on desktop and one column on mobile
- **Memorable element:** the gameplay demo and paired actions directly below the project brief

## Data contracts

Optional project fields introduced by this case study:

- `team`: bilingual non-empty string.
- `featuredVideo`: YouTube ID, canonical HTTPS watch URL, validated local poster dimensions, and bilingual caption.
- `play`: safe repository-relative `.html` URL and bilingual label.
- `sectionOrder`: unique values from the renderer's documented section keys.
- `credits`: bilingual title/body plus an optional HTTPS source URL.

The compiler strips research paths and unrecognized metadata, validates all new fields, and generates `projects-data.js`.

## Accessibility and responsive behavior

- Video iframe has a bilingual title, a fixed aspect ratio, lazy loading, and a fallback watch link.
- Actions have visible keyboard focus and remain full-width tap targets on small screens.
- Images retain dimensions, alt text, lazy loading, and in-page preview behavior.
- Desktop and mobile preserve source order and avoid horizontal overflow.
- The WebGL page exposes loading progress, a keyboard-focusable canvas, fullscreen control, a back link, and a clear message if loading fails.

## Verification

- TDD covers compiler validation, Overview identity reuse, bilingual rendering, section ordering, safe relative play paths, and YouTube output.
- `npm test`, `npm run check`, and `git diff --check` must pass before each implementation-phase commit.
- Run a local HTTP server and verify the case study in English and Chinese at desktop and mobile widths.
- Open the standalone WebGL page over HTTP, verify all four runtime resources return successfully, and confirm the loader reaches Unity initialization rather than a missing-path error.
- After branch push, verify the branch contents and public-page path assumptions without changing the repository's configured Pages source.
