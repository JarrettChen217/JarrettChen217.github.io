# Midas Curse Process Narrative and YouTube Embed Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reuse Berry Street's numbered process presentation for an evidence-led Midas Curse engineering story, then place the user-provided responsive YouTube embed after it without changing the site's established academic typography.

**Architecture:** Merge `dev@220ad37` so the branch receives the generic `process` compiler, renderer, tests, and styles. Refactor the detail renderer into one section-order path that supports both Berry Street's existing process-only flow and Midas's mixed process/video/media flow. Keep all bilingual copy, process stages, the embed URL, and the optional baked badge in `projects.yml`; generate `projects-data.js` from it.

**Tech Stack:** Static HTML/CSS/JavaScript, Node.js test runner, `js-yaml`, Unity WebGL, YouTube iframe, WebP assets.

**Spec:** `docs/superpowers/specs/2026-09-17-midas-curse-unity-design.md`

## Global Constraints

- Preserve the white academic layout, current system sans-serif stack, heading scale, light rules, and responsive breakpoints.
- Reuse Berry Street's `process` contract and visible layout; do not create a Midas-only process component.
- The golden-ground and shader pipeline is a Cosmic Creators team system. Do not present it as Hao's sole work.
- State explicitly that generative-AI coding assistants were not part of the team's 2023 workflow, while keeping the emphasis on documentation, tutorials, prototypes, code review, and manual debugging.
- Keep the kawaii treatment limited to one baked WebP badge; substantive bilingual copy remains selectable HTML.
- Do not add `OurGroup.jpg` until public-display permission is confirmed.
- The YouTube iframe must not autoplay and must retain the visible Watch Demo fallback link.
- All production content and asset references remain in `projects.yml`; `projects-data.js` stays generated.

---

### Task 1: Integrate the Berry Street process foundation

**Files:**
- Merge: `dev@220ad37` into `project/midas-curse-unity`
- Resolve if needed: `app.js`, `styles.css`, `projects.yml`, `projects-data.js`, `scripts/build-projects.cjs`, `scripts/build-projects.test.cjs`

**Interfaces:**
- Consumes: `process = {heading, intro, stages[]}` from Berry Street.
- Produces: one branch containing both Berry Street process support and the existing Midas `featuredVideo`, `play`, `sectionOrder`, `credits`, and WebGL page.

- [ ] **Step 1: Record the clean pre-merge state**

Run:

```bash
git status --short --branch
git rev-parse dev project/midas-curse-unity
```

Expected: the Midas worktree is clean; `dev` resolves to `220ad37`.

- [ ] **Step 2: Merge the current development branch**

Run:

```bash
git merge --no-ff dev -m "merge: bring Berry Street process layout into Midas branch"
```

Expected: either a merge commit or explicit conflicts in the six shared website files; no reset, checkout, or force operation.

- [ ] **Step 3: Resolve shared-file conflicts by union, not replacement**

Keep these Berry Street capabilities:

```text
backgroundLink
process.heading / process.intro / process.stages
process stage contribution, findings, gallery, and demo
projectProcess(), processMedia(), process layout CSS
```

Keep these Midas capabilities:

```text
team / featuredVideo / play / sectionOrder / credits
detailSections() ordered rendering
Midas media, generated data, and WebGL play page
```

- [ ] **Step 4: Rebuild generated project data**

Run:

```bash
npm run build
```

Expected: `projects-data.js` contains both Berry Street `process` data and Midas fields.

- [ ] **Step 5: Verify the merged baseline**

Run:

```bash
npm test
npm run check
git diff --check
```

Expected: all inherited tests pass before new behavior is added.

- [ ] **Step 6: Commit the integration if conflict resolution changed tracked files outside the merge commit**

```bash
git add app.js styles.css projects.yml projects-data.js scripts/build-projects.cjs scripts/build-projects.test.cjs
git commit -m "merge: reconcile process and Midas project support"
```

### Task 2: Validate embed URLs, process badges, and ordered process sections

**Files:**
- Modify: `scripts/build-projects.test.cjs`
- Modify: `scripts/build-projects.cjs`

**Interfaces:**
- Consumes: `featuredVideo.youtubeId`, `featuredVideo.embedUrl`, `process.badge`, and `sectionOrder` from YAML.
- Produces: compiled `featuredVideo.embedUrl: string`, `process.badge: {src,width,height,alt}`, and the accepted section key `process`.

- [ ] **Step 1: Write failing compiler tests**

Add assertions equivalent to:

```js
assert.equal(project.featuredVideo.embedUrl,
  'https://www.youtube.com/embed/_KGzpyql4ps?si=UOvL9itUuzPHptUr');
assert.deepEqual(project.process.badge,{
  src:'assets/projects/avl-visualisation/avl-interface-800.webp',
  width:800,
  height:397,
  alt:['Built by hand in 2023','2023 年手工构建']
});
assert.deepEqual(project.sectionOrder.slice(0,3),['background','process','video']);
```

Add rejection cases for `http:`, non-YouTube hosts, a mismatched `/embed/<id>` path, unsafe badge paths, missing badge files, invalid dimensions, untranslated alt text, and duplicate/unknown section keys.

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node --test scripts/build-projects.test.cjs
```

Expected: FAIL because `embedUrl`, `process.badge`, and/or the `process` section key are not yet compiled by the merged implementation.

- [ ] **Step 3: Implement minimal compiler support**

Validate the embed URL with logic equivalent to:

```js
let embed;
try { embed=new URL(value.embedUrl); } catch { fail(`${field}: invalid embed URL`); }
if(embed.protocol!=='https:' ||
   !['youtube.com','www.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com'].includes(embed.hostname) ||
   embed.pathname!==`/embed/${value.youtubeId}`) {
  fail(`${field}: embed URL must match the YouTube ID`);
}
```

Compile `process.badge` through the same repository-contained WebP validation used for project logos and gallery images. Add `process` to the allowed `sectionOrder` keys.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run:

```bash
node --test scripts/build-projects.test.cjs
```

Expected: all compiler tests pass.

- [ ] **Step 5: Commit the validated data contract**

```bash
git add scripts/build-projects.cjs scripts/build-projects.test.cjs
git commit -m "feat: validate Midas process and video embed data"
```

### Task 3: Render one ordered process/video flow without changing Berry Street

**Files:**
- Modify: `scripts/build-projects.test.cjs`
- Modify: `app.js`
- Modify: `styles.css`

**Interfaces:**
- Consumes: compiled `process`, optional `process.badge`, `featuredVideo.embedUrl`, and `sectionOrder`.
- Produces: `projectProcess(p)` with an optional badge and `featuredVideo(p)` with a responsive iframe; `detailSections(p)` renders `process` in declared order.

- [ ] **Step 1: Write failing renderer tests**

Assert real generated HTML:

```js
assert.match(html,/class="process-badge"/);
assert.match(html,/src="https:\/\/www\.youtube\.com\/embed\/_KGzpyql4ps\?si=UOvL9itUuzPHptUr"/);
assert.match(html,/loading="lazy"/);
assert.match(html,/referrerpolicy="strict-origin-when-cross-origin"/);
assert.match(html,/allowfullscreen/);
assert.ok(html.indexOf('project-process') < html.indexOf('project-featured-video'));
assert.match(html,/Watch Demo/);
```

Render Berry Street separately and assert that all five process stage IDs remain in source order and that no `.process-badge` is emitted when the badge field is absent.

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node --test scripts/build-projects.test.cjs
```

Expected: FAIL because the merged renderer does not yet emit the requested iframe/badge/combined ordering.

- [ ] **Step 3: Implement the minimal shared renderer**

Render the iframe with the requested attributes:

```html
<iframe
  src="..."
  title="..."
  loading="lazy"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen></iframe>
```

Add `process:()=>projectProcess(p)` to the common section map. When `sectionOrder` is absent, keep Berry Street's current default of background followed by process and preserve legacy defaults for projects without process data.

- [ ] **Step 4: Match existing typography and responsive behavior**

Use the existing font stack and process type sizes. Add only:

```css
.process-header-with-badge{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:start}
.process-badge{width:clamp(120px,18vw,190px);height:auto}
.video-embed{position:relative;aspect-ratio:16/9;background:#f3f5f6}
.video-embed iframe{width:100%;height:100%;border:0;display:block}
@media(max-width:640px){.process-header-with-badge{grid-template-columns:1fr}.process-badge{width:145px}}
```

Do not change body, heading, paragraph, or process-stage fonts.

- [ ] **Step 5: Run the focused and full tests**

Run:

```bash
node --test scripts/build-projects.test.cjs
npm test
```

Expected: all tests pass, including Berry Street process regressions.

- [ ] **Step 6: Commit the shared renderer**

```bash
git add app.js styles.css scripts/build-projects.test.cjs
git commit -m "feat: order process narrative before embedded demo"
```

### Task 4: Add evidence-led bilingual Midas process content and baked badge

**Files:**
- Create: `assets/projects/midas-curse-unity/built-by-hand-2023.webp`
- Modify: `projects.yml`
- Generate: `projects-data.js`

**Interfaces:**
- Consumes: the validated `process` and `featuredVideo.embedUrl` contracts.
- Produces: five concise bilingual stages and one fixed typographic badge asset.

- [ ] **Step 1: Create and inspect the badge asset**

Create `/tmp/midas-built-by-hand.svg` with a rounded warm-cream label, muted ochre lettering, and small star/spark accents. Render with the locally installed `Bradley Hand Bold.ttf`, then bake it into WebP so the published page never depends on a visitor font. The SVG content should follow this exact structure:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="760" height="240" viewBox="0 0 760 240">
  <rect x="12" y="12" width="736" height="216" rx="76" fill="#fffaf0" stroke="#d7bd7b" stroke-width="5"/>
  <g fill="#c6922d" aria-hidden="true">
    <path d="M84 58l8 18 19 8-19 8-8 19-8-19-19-8 19-8z"/>
    <path d="M680 132l6 13 13 6-13 6-6 13-6-13-13-6 13-6z"/>
    <circle cx="668" cy="78" r="7"/>
  </g>
  <text x="380" y="142" text-anchor="middle" fill="#7a5717"
        font-family="Bradley Hand" font-size="62" font-weight="700">Built by hand · 2023</text>
</svg>
```

Run:

```bash
rsvg-convert -w 760 -h 240 /tmp/midas-built-by-hand.svg -o /tmp/midas-built-by-hand.png
cwebp -quiet -q 88 -m 6 -alpha_q 100 /tmp/midas-built-by-hand.png -o assets/projects/midas-curse-unity/built-by-hand-2023.webp
```

Inspect the WebP at full size and reject any misspelling, clipping, or unreadable characters.

- [ ] **Step 2: Add the exact embed URL and process data**

Add to `featuredVideo`:

```yaml
embedUrl: https://www.youtube.com/embed/_KGzpyql4ps?si=UOvL9itUuzPHptUr
```

Set:

```yaml
sectionOrder: [background, process, video, demo, product, contributions, journey, engineering, team, credits]
```

Use this process heading and introduction:

```yaml
heading:
  en: Engineering the Midas Curse
  zh: 构建 Midas Curse 核心机制
intro:
  en: >-
    In 2023, before generative-AI coding assistants were part of our workflow,
    Cosmic Creators learned through Unity documentation, tutorials, prototypes,
    code review, and manual debugging. The result was not a single shader trick,
    but a connected system in which movement, ground state, combat, skills, and
    visual feedback all respond to the same golden-path mechanic.
  zh: >-
    2023 年，生成式 AI 编程助手尚未进入我们的开发流程。Cosmic Creators
    通过阅读 Unity 文档、研究教程、制作原型、相互审阅代码并手动调试推进开发。
    最终成果并非单一的 Shader 技巧，而是一套将移动、地面状态、战斗、技能与
    视觉反馈连接到同一黄金路径机制的系统。
```

Add five stages:

```text
01 Concept — Turn a myth into a playable rule / 把神话转化为可玩的规则
02 System model — Represent the floor as an interactive grid / 将地面表示为可交互网格
03 State logic — Give every gold tile a lifecycle / 为每块黄金地面建立生命周期
04 Shader feedback — Make system state readable in motion / 用 Shader 呈现系统状态
05 Browser delivery — Adapt the effect for WebGL / 为 WebGL 调整视觉实现
```

The stage bodies must describe the team system and verified code behavior, not personal ownership.

- [ ] **Step 3: Generate and validate public data**

Run:

```bash
npm run build
npm run check
```

Expected: YAML compiles and `projects-data.js` is current.

- [ ] **Step 4: Commit content and asset**

```bash
git add assets/projects/midas-curse-unity/built-by-hand-2023.webp projects.yml projects-data.js
git commit -m "content: explain Midas golden-ground engineering"
```

### Task 5: Browser, bilingual, and fallback verification

**Files:**
- Verify: `app.js`, `styles.css`, `projects.yml`, `projects-data.js`
- Verify: `assets/projects/midas-curse-unity/built-by-hand-2023.webp`

**Interfaces:**
- Consumes: the completed local page at `/#project/midas-curse-unity`.
- Produces: evidence that the page remains readable, responsive, bilingual, and usable when YouTube embedding fails.

- [ ] **Step 1: Run all automated checks fresh**

Run:

```bash
npm test
npm run check
git diff --check
```

Expected: zero failures and no stale generated output.

- [ ] **Step 2: Verify English desktop layout**

Open `http://127.0.0.1:8765/#project/midas-curse-unity` and confirm:

```text
Background → numbered process → YouTube iframe → early gold-path demo
```

Confirm the badge is a small accent, the process uses Berry Street typography, and no horizontal overflow appears.

- [ ] **Step 3: Verify Chinese and mobile layout**

Switch to Chinese and inspect the same order. At 390×844, confirm the process stages remain single-column, the badge moves below/alongside the header without crowding, and the iframe keeps 16:9 proportions.

- [ ] **Step 4: Verify YouTube behavior and fallback**

Attempt playback inside the actual iframe. If YouTube returns a configuration/owner restriction, record the exact visible outcome and confirm **Watch Demo / 观看演示** opens `https://www.youtube.com/watch?v=_KGzpyql4ps` successfully.

- [ ] **Step 5: Verify branch integrity**

Run:

```bash
git status --short --branch
git rev-list --left-right --count origin/project/midas-curse-unity...HEAD
git -C /Users/haochen/Documents/Gogs_Repositories/JarrettChen217.github.io status --short --branch
```

Expected: the isolated worktree contains only intentional changes, and the original `dev` worktree remains untouched.

- [ ] **Step 6: Push phase commits**

```bash
git push origin project/midas-curse-unity
```

Expected: the remote branch reaches the same `HEAD`; do not merge into `dev` or `main` without a separate user decision.
