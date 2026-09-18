# Midas Curse Unity Project Design

## Purpose

Add one bilingual portfolio case study for **Midas Curse — Unity Survival Game** / **Midas Curse（Unity 生存游戏）**. Project 1 and Project 2 are presented as two development stages of the same Cosmic Creators game, from August to early November 2023.

The case study is evidence-led. It foregrounds the playable result, core mechanics, and Hao Chen's verified contributions while describing team outcomes as team outcomes. It identifies this project as Hao's first experience with Unity and the starting point for his systematic study of Unity, shader concepts, and game development; it does not claim mastery.

## Information architecture

- Stable project ID: `midas-curse-unity`.
- `projects.yml` remains the source of truth for English and Chinese copy, media references, section order, video, play link, team name, credits, and Overview selection.
- Overview adds only `{id: midas-curse-unity}`. It reuses the canonical project summary and does not copy project content.
- The detail sequence is: summary, background/core gameplay, the numbered process narrative, embedded gameplay video and actions, early-mechanic media, product media, personal contributions, brief design iteration, supporting design media, team record, credits, and resources.
- Existing projects keep their current default section order. An optional validated `sectionOrder` field changes order only where explicitly configured.
- Reuse the generic `process` structure and numbered-stage presentation introduced for the Berry Street case study on `dev`. Do not create a parallel Midas-only narrative component.
- The Midas process explains the team's 2023 path from concept to implementation before generative-AI coding assistants were part of its workflow. It covers documentation/tutorial-led learning, prototyping, manual debugging, the golden-ground grid and state model, shader integration, and the WebGL-driven rendering decision without turning the section into a defect log.
- Extend the common section-order renderer so `process` can be placed between `background` and `video`. Berry Street keeps its current presentation and content; Midas can continue to use its video, early-mechanic demo, galleries, contributions, and credits after the process section.

## Content boundaries

- Attribute the game concept, integrated result, design iterations, shader work, and evaluation to Cosmic Creators unless authorship is individually verified.
- Hao's contribution summary may include player running animation and Blend Tree work, health feedback, pause/shop interactions, enemy spawning and animation adjustments, camera/audio/UI work, and implementation debugging supported by the reports and commit history.
- Describe shader learning as part of the learning journey. Do not assign a specific shader to Hao without stronger evidence.
- Describe the golden-ground and shader pipeline as a **team system**. Commit history attributes much of the grid/state implementation to Gaoyongle Zhang, the initial dissolve work to Jiayi Sun, later integration to multiple contributors, and Hao's geometry-shader enemy-death experiment to Hao. Do not collapse those contributions into a personal ownership claim.
- Hao's first-Unity reflection may explicitly say that the team learned in 2023 through documentation, tutorials, prototypes, code review, and manual debugging before generative-AI coding assistants were part of its workflow.
- Do not publish Noita reference GIFs, music MP4 files, course materials, peer reviews, private data, unrelated logs, or source code.
- Treat third-party models, environments, icons, animations, sound, music, tutorials, and effects as credited dependencies, not personal or team-original art.
- Do not commit `OurGroup.jpg` until public-display permission is confirmed.

## Media and interaction

- Embed the gameplay video in a responsive 16:9 YouTube iframe using the user-provided `https://www.youtube.com/embed/_KGzpyql4ps?si=UOvL9itUuzPHptUr` URL. Keep a visible **Watch Demo / 观看演示** link because YouTube may still reject playback according to owner or referrer policy.
- The iframe is non-autoplaying, lazy-loaded, titled bilingually, fullscreen-capable, and restricted to the permissions in the provided embed markup.
- Provide **Play Game / 在线试玩** to a standalone `play/midas-curse/` page.
- The play page copies only the outer Unity WebGL runtime set: one loader, one data archive, one framework file, and one WebAssembly file. It does not copy duplicate nested builds.
- Rename runtime files to stable lowercase names and use relative URLs so the page works both locally and at the GitHub Pages root.
- Keep WebGL loading user-triggered to avoid a roughly 59 MB download when someone only reads the case study.
- Convert selected source images and GIFs into web-friendly WebP derivatives. Preserve originals in their read-only source locations.
- Preferred media: project cover, gold-path mechanic, maze design/model, visual-feedback improvement, and—after permission—the team photo.
- Add a small baked WebP lettering badge reading **Built by hand · 2023** to the common process header. The optional badge is used by Midas and omitted by Berry Street. It uses a restrained kawaii treatment in muted gold and soft cream so every visitor sees the same lettering without depending on an installed font. All substantive technical content remains live bilingual HTML with accessible text; the badge is decorative emphasis only.

## Visual direction

The surrounding site remains academic and restrained. Midas uses its own media rather than decorative gradients or game-themed chrome.

- **Base:** white `#ffffff`
- **Text:** existing charcoal `#303b42`
- **Academic accent:** existing blue `#375d73`
- **Rules:** existing pale grey `#e5eaed`
- **Game action accent:** muted ochre `#8a641d`, reserved for the demo/play actions
- **Type:** the site's existing system sans-serif stack and heading scale
- **Layout:** left-aligned reading column, hairline section rules, two-column supporting media on desktop and one column on mobile
- **Memorable element:** a compact kawaii lettering badge introduces the hand-built engineering narrative; the gameplay iframe and paired actions follow the narrative.

## Data contracts

Optional project fields introduced by this case study:

- `team`: bilingual non-empty string.
- `featuredVideo`: YouTube ID, canonical HTTPS watch URL, validated HTTPS embed URL whose `/embed/<id>` path matches the ID, validated local poster dimensions, and bilingual caption.
- `process`: reuse Berry Street's bilingual heading, introduction, and ordered `stages`; Midas stages use the same label/title/body contract and omit individual-contribution callouts unless authorship is verified.
- `process.badge`: optional validated local WebP asset with dimensions and bilingual alt text. Existing process projects do not need to provide it.
- `play`: safe repository-relative `.html` URL and bilingual label.
- `sectionOrder`: unique values from the renderer's documented section keys.
- `credits`: bilingual title/body plus an optional HTTPS source URL.

The compiler strips research paths and unrecognized metadata, validates all new fields, and generates `projects-data.js`.

## Accessibility and responsive behavior

- Video iframe has a bilingual title, a fixed aspect ratio, lazy loading, and a fallback watch link.
- The decorative lettering badge has meaningful bilingual alt text while the full engineering explanation remains selectable HTML.
- Actions have visible keyboard focus and remain full-width tap targets on small screens.
- Images retain dimensions, alt text, lazy loading, and in-page preview behavior.
- Desktop and mobile preserve source order and avoid horizontal overflow.
- The WebGL page exposes loading progress, a keyboard-focusable canvas, fullscreen control, a back link, and a clear message if loading fails.

## Verification

- TDD covers compiler validation, Overview identity reuse, bilingual rendering, process ordering and escaping, optional process-badge validation, safe embed URLs, section ordering, safe relative play paths, and YouTube output.
- Merge the latest `dev` process implementation into the isolated Midas branch before implementation. Resolve the two render paths into one section-based renderer rather than copying Berry Street's component or changing its visible output.
- `npm test`, `npm run check`, and `git diff --check` must pass before each implementation-phase commit.
- Run a local HTTP server and verify the case study in English and Chinese at desktop and mobile widths. Confirm the numbered process appears before the gameplay iframe and that the badge remains legible without affecting text accessibility.
- Attempt playback in the real iframe environment. If YouTube rejects the embed, record the observed error and verify that the visible watch link still opens the confirmed working watch page.
- Open the standalone WebGL page over HTTP, verify all four runtime resources return successfully, and confirm the loader reaches Unity initialization rather than a missing-path error.
- After branch push, verify the branch contents and public-page path assumptions without changing the repository's configured Pages source.
