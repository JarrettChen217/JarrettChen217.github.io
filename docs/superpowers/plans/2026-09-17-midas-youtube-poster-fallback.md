# Midas YouTube Poster Fallback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop showing the YouTube player that returns error 150 and present the existing responsive gameplay poster with working Watch Demo and Play Game actions.

**Architecture:** Keep the shared optional iframe compiler and renderer unchanged. Remove only `featuredVideo.embedUrl` from the canonical Midas project in `projects.yml`; the existing `featuredVideo()` fallback then renders the validated local poster. Lock this project-specific decision with a real fixture/render regression test and regenerate `projects-data.js`.

**Tech Stack:** YAML, generated JavaScript data, static JavaScript renderer, Node.js test runner.

**Spec:** `docs/superpowers/specs/2026-09-17-midas-curse-unity-design.md`

## Global Constraints

- Keep `projects.yml` as the canonical source; never hand-edit `projects-data.js`.
- Preserve the generic optional YouTube iframe behavior for videos that allow embedding.
- Preserve the current project order, bilingual caption, poster, Watch Demo link, Play Game link, process narrative, typography, and responsive layout.
- Do not add a Midas-specific conditional to `app.js`.
- The Midas detail page must contain `.video-poster` and no `.video-embed iframe`.

---

### Task 1: Configure and verify the poster fallback

**Files:**
- Modify: `scripts/build-projects.test.cjs`
- Modify: `projects.yml`
- Generate: `projects-data.js`

**Interfaces:**
- Consumes: optional `featuredVideo.embedUrl` and the existing `featuredVideo(p)` fallback branch.
- Produces: Midas generated project data without `embedUrl`, plus rendered HTML containing the local poster and both action links.

- [x] **Step 1: Write the failing real-project regression test**

Add a test that compiles the unmodified repository fixture and renders `midas-curse-unity`:

```js
test('Midas uses the poster fallback when YouTube embedding is disabled',()=>{
 const vm=require('node:vm');const result=run(fixture());const midas=result.projects.find(project=>project.id==='midas-curse-unity');
 assert.equal(midas.featuredVideo.embedUrl,undefined);
 const context=vm.createContext({CONTENT:{projects:result.projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 const html=vm.runInContext("detail('midas-curse-unity')",context);
 assert.match(html,/class="video-poster"/);
 assert.match(html,/src="assets\/projects\/midas-curse-unity\/demo-poster-1280\.webp"/);
 assert.ok(!html.includes('class="video-embed"'));
 assert.match(html,/Watch Demo/);
 assert.match(html,/Play Game/);
});
```

- [x] **Step 2: Run the focused test and verify RED**

Run:

```bash
node --test scripts/build-projects.test.cjs
```

Expected: FAIL because the current Midas fixture still compiles the confirmed-unplayable `embedUrl` and renders `.video-embed`.

- [x] **Step 3: Apply the minimal configuration change**

Delete exactly this line from `projects.yml`:

```yaml
embedUrl: https://www.youtube.com/embed/_KGzpyql4ps?si=UOvL9itUuzPHptUr
```

Do not change `app.js`, `styles.css`, `watchUrl`, the poster, or the play URL.

- [x] **Step 4: Rebuild and verify GREEN**

Run:

```bash
npm run build
node --test scripts/build-projects.test.cjs
npm test
npm run check
git diff --check
```

Expected: the focused and full suites pass, and generated output is current.

- [x] **Step 5: Verify the actual page**

Reload `http://127.0.0.1:8765/#project/midas-curse-unity` and confirm in English and Chinese:

```text
process narrative appears before Gameplay demo
poster image and central play treatment are visible
no YouTube iframe or “This video is unavailable” box is present
Watch Demo points to https://www.youtube.com/watch?v=_KGzpyql4ps
Play Game points to play/midas-curse/index.html
```

Check desktop and 390 px mobile widths for horizontal overflow.

- [x] **Step 6: Commit and push**

```bash
git add scripts/build-projects.test.cjs projects.yml projects-data.js docs/superpowers/plans/2026-09-17-midas-youtube-poster-fallback.md
git commit -m "fix: use poster fallback for Midas demo"
git push
```
