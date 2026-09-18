# DaisyWorld Local Pygame Demo Design

## Goal

Add one compact bilingual, local-runtime demonstration to the existing DaisyWorld project detail page.

## Scope

- Record approximately ten seconds of the extension model running in a real macOS Pygame window.
- Retain the native macOS title bar and its close, minimise, and zoom controls in the recording.
- Use the existing project-level `demo` media field: a silent 720×760 H.264 MP4 for playback and a 720×760 WebP poster from its first frame.
- Add the assets only under `assets/projects/daisyworld/`; add only the `demo` metadata to the existing `daisyworld` project entry.
- Keep the existing generic renderer and styles unchanged. The built-in demo control already provides manual playback, no autoplay, an enlarged view, and bilingual captions.

## Capture and wording

- Run a committed source snapshot in a temporary directory, never the source repository with pre-existing IDE files.
- Use a fixed random seed for repeatable capture. The source Pygame renderer, model rules, and native macOS window are the visual source of truth.
- The page caption states that this is a local macOS/Pygame functional demonstration with a fixed seed; it is not an experimental result, a performance measure, or evidence that Lucky Clover appeared in a saved experiment.
- No live-status claim is rendered on the website. The actual Pygame window title bar is the local-runtime evidence in the captured media.

## Exclusions

- No separate screenshot gallery, GIF, external link, result chart, metric, architecture section, or homepage selection.
- No final-report, course-brief, student-information, or source-note material.
- The user has confirmed publication permission for the sprites and the derived recording.

## Validation

- A DaisyWorld-specific contract test first fails because no demo exists, then asserts the compiled MP4, poster, dimensions, bilingual disclaimer, and lack of a source link.
- `npm test`, `npm run build`, `npm run check`, and `git diff --check` pass.
- `ffprobe` confirms a video duration close to ten seconds, one H.264 video stream, no audio stream, and 720×760 dimensions.
- Local desktop and mobile previews confirm a manually controlled video, visible native title bar in the poster, correct language switching, and no overflow or external project link.
