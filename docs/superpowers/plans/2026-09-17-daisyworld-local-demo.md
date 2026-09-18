# DaisyWorld Local Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one approximately ten-second, bilingual, locally captured macOS Pygame extension-model video to the DaisyWorld detail page.

**Architecture:** The existing generic `demo` pipeline accepts a project-local MP4 and WebP poster, compiles them from `projects.yml`, and renders a manually controlled accessible video. A temporary, committed source snapshot produces the recording so the source repository and main website checkout remain untouched.

**Tech Stack:** Python/Pygame, macOS `screencapture`, FFmpeg, WebP (`cwebp`), Node.js test runner, YAML, existing static site renderer.

**Spec:** `docs/superpowers/specs/2026-09-17-daisyworld-local-demo-design.md`

## Global Constraints

- Work only in `/Users/haochen/Documents/Gogs_Repositories/JarrettChen217.github.io-worktrees/daisyworld` for website changes.
- Capture from a temporary committed source snapshot; retain the native macOS Pygame title bar and controls.
- Publish a single MP4 and its poster under `assets/projects/daisyworld/`; do not add a gallery, links, GIF, result claim, metric, or homepage selection.
- Caption both languages must describe a fixed-seed local functional demonstration, not an experiment result or Lucky Clover validation.
- Do not change `app.js`, `styles.css`, or the build schema. Do not commit or push without a new user instruction.

---

### Task 1: Add the DaisyWorld demo contract

**Files:**
- Modify: `scripts/build-projects.test.cjs`
- Test: `scripts/build-projects.test.cjs`

**Interfaces:**
- Consumes: `compile(source)` from `scripts/build-projects.cjs` and the `daisyworld` source entry.
- Produces: a compiled `project.demo` object with `src`, `poster`, `width`, `height`, and two translated caption strings.

- [ ] **Step 1: Write the failing test**

```js
assert.deepEqual(project.demo,{
 src:'assets/projects/daisyworld/daisyworld-extension-local-demo.mp4',
 poster:'assets/projects/daisyworld/daisyworld-extension-local-poster.webp',
 width:720,
 height:760,
 caption:[
  'A fixed-seed local macOS/Pygame capture of the extension model\'s grid renderer. It is a functional demonstration, not an experimental result.',
  '使用固定随机种子录制的扩展模型本机 macOS/Pygame 网格渲染画面。该画面仅用于功能演示，不代表实验结果。',
 ],
});
assert.equal(source.links,undefined);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`

Expected: the DaisyWorld assertion fails because the source entry has no `demo` field.

- [ ] **Step 3: Leave production files unchanged until the capture assets exist**

Create no schema or renderer code. The existing `demo` validator and `demoVideo` renderer are the complete implementation interface.

- [ ] **Step 4: Run test to confirm the expected red state is isolated**

Run: `npm test`

Expected: all existing tests pass and the new DaisyWorld contract remains the only failing test.

### Task 2: Produce and validate the native-window media

**Files:**
- Create: `assets/projects/daisyworld/daisyworld-extension-local-demo.mp4`
- Create: `assets/projects/daisyworld/daisyworld-extension-local-poster.webp`

**Interfaces:**
- Consumes: committed extension-model source snapshot, native macOS Pygame window, `screencapture`, FFmpeg, and `cwebp`.
- Produces: an H.264, silent 720×760 MP4 near ten seconds and a 720×760 WebP first-frame poster.

- [ ] **Step 1: Run only a temporary source snapshot**

Create the snapshot with `git -C /Users/haochen/Documents/GitHub_Repositories/MCSS_Repository/SWEN90004_2025-A2 archive --format=tar HEAD | tar -x -C /private/tmp/daisyworld-pygame-capture/source`. Run its extension-model renderer using fixed seed `202505`; do not launch or write to the source repository.

- [ ] **Step 2: Capture the selected macOS Pygame window**

Launch the temporary renderer with window caption `DaisyWorld Simulation`, identify its native window, and capture about ten seconds of that window only. Retain its close, minimise, and zoom controls; never capture the rest of the desktop.

- [ ] **Step 3: Encode public assets**

Use FFmpeg to create a silent H.264 MP4 at 720×760 (preserving the captured window's aspect ratio with neutral padding) and extract its first frame. Use `cwebp` to produce `daisyworld-extension-local-poster.webp` without metadata.

- [ ] **Step 4: Verify media facts**

Run: `ffprobe -v error -show_entries format=duration:stream=codec_name,codec_type,width,height -of json assets/projects/daisyworld/daisyworld-extension-local-demo.mp4`

Expected: one H.264 video stream, no audio stream, duration close to 10 seconds, and 720×760 dimensions. Inspect the poster visually for the title bar and Pygame grid.

### Task 3: Attach and generate the video demo

**Files:**
- Modify: `projects.yml`
- Modify: `projects-data.js`
- Modify: `scripts/build-projects.test.cjs`

**Interfaces:**
- Consumes: the two Task 2 files and `demo` schema `{src, poster, width, height, caption}`.
- Produces: a compiled DaisyWorld `demo` field that renders through the existing `demoVideo` function.

- [ ] **Step 1: Add the smallest YAML field that satisfies the contract**

```yaml
demo:
  src: assets/projects/daisyworld/daisyworld-extension-local-demo.mp4
  poster: assets/projects/daisyworld/daisyworld-extension-local-poster.webp
  width: 720
  height: 760
  caption:
    en: A fixed-seed local macOS/Pygame capture of the extension model's grid renderer. It is a functional demonstration, not an experimental result.
    zh: 使用固定随机种子录制的扩展模型本机 macOS/Pygame 网格渲染画面。该画面仅用于功能演示，不代表实验结果。
```

- [ ] **Step 2: Run test to verify it passes**

Run: `npm test`

Expected: all tests pass, including the DaisyWorld demo contract.

- [ ] **Step 3: Generate browser data and check freshness**

Run: `npm run build && npm run check`

Expected: generated `projects-data.js` is current and contains no external DaisyWorld link.

### Task 4: Verify real rendering and change scope

**Files:**
- Verify: `projects.yml`, `projects-data.js`, `scripts/build-projects.test.cjs`, and the two `assets/projects/daisyworld/` files only.

**Interfaces:**
- Consumes: the generated browser data and local static HTTP preview.
- Produces: verified desktop and mobile visual evidence for review.

- [ ] **Step 1: Check whitespace and changed-file scope**

Run: `git diff --check && git diff --name-only`

Expected: no whitespace errors and no renderer, stylesheet, source-repository, or homepage-selection changes.

- [ ] **Step 2: Preview the project route locally**

Open `#project/daisyworld` on desktop and a 390px mobile viewport. Confirm the video is manually controlled, begins with the native title bar, has no external source link, and switches its caption with the language control.

- [ ] **Step 3: Hand off without publishing**

Report the exact assets, media metadata, duration/codec evidence, test/build results, and diff scope. Leave the worktree uncommitted and do not push.
