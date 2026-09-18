# DaisyWorld Context and Extension Narrative Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an accurate, compact bilingual explanation of the course context, DaisyWorld model, ant-colony analogy, and extension mechanisms to the existing project detail page.

**Architecture:** Update only the `daisyworld` record's existing `summary` and `background` fields. The existing compiler generates `projects-data.js`; the generic detail renderer remains unchanged.

**Tech Stack:** YAML, Node.js test runner, existing project-data compiler, static JavaScript site.

**Spec:** `docs/superpowers/specs/2026-09-17-daisyworld-context-extension-design.md`

## Global Constraints

- Work only in `/Users/haochen/Documents/Gogs_Repositories/JarrettChen217.github.io-worktrees/daisyworld` on `project/daisyworld`.
- Keep the generic detail layout and schema; do not modify `app.js` or `styles.css`.
- Treat ant-colony shortest-path behaviour as an explanatory analogy only; do not claim that DaisyWorld simulates ants or route finding.
- Preserve the existing contribution bullets and local demo metadata.
- Do not claim results, Lucky Clover effects, metrics, validation, performance, or replication success.
- Paraphrase README concepts; do not publish commands, student identifiers, source links, or private research notes.
- Regenerate `projects-data.js` via `npm run build`; do not edit it manually.
- Do not commit, push, merge, deploy, or modify the main checkout.

---

### Task 1: Protect the new public narrative

**Files:**
- Modify: `scripts/build-projects.test.cjs:95-129`

**Interfaces:**
- Consumes: parsed `projects.yml` through `compile()`.
- Produces: regression assertions for compiled bilingual DaisyWorld copy.

- [ ] **Step 1: Write the failing narrative assertions**

Append these lines inside the existing DaisyWorld test:

```js
assert.match(project.summary[0], /SWEN90004/);
assert.match(project.summary[1], /SWEN90004/);
assert.match(project.background[0], /ant-colony shortest-path/);
assert.match(project.background[0], /does not simulate ants or route finding/);
assert.match(project.background[1], /蚂蚁群体寻找最短路径/);
assert.match(project.background[1], /不模拟蚂蚁或路径寻优/);
assert.match(project.background[0], /pollution zones/);
assert.match(project.background[1], /污染区域/);
```

- [ ] **Step 2: Verify the assertion initially fails**

Run:

```bash
node --test --test-name-pattern='DaisyWorld publishes' scripts/build-projects.test.cjs
```

Expected: FAIL because the current public copy lacks the course, analogy, and extension narrative.

### Task 2: Refresh only the existing bilingual content fields

**Files:**
- Modify: `projects.yml:522-548`

**Interfaces:**
- Consumes: bilingual `summary` and `background` objects.
- Produces: public source copy compiled to `[en, zh]` arrays.

- [ ] **Step 1: Replace `summary` with this verified framing**

```yaml
summary:
  en: A three-person Python reimplementation and extension of NetLogo's DaisyWorld for SWEN90004 Modelling Complex Software Systems, exploring how simple local rules can accumulate into system-level environmental feedback.
  zh: 墨尔本大学 SWEN90004“复杂软件系统建模”课程中的三人团队项目：用 Python 复现并扩展 NetLogo 的 DaisyWorld，探索简单的局部规则如何累积为系统层面的环境反馈。
```

- [ ] **Step 2: Replace `background` with this conservative explanation**

```yaml
background:
  en: SWEN90004 framed the assignment as a modelling exercise: teams reimplemented a selected NetLogo grid model, investigated its behaviour, and proposed an extension. Our Python version separates parameter configuration, simulation control, Pygame rendering, and notebook-based data inspection; black and white daisies, bare soil, local temperature, reproduction, ageing, and heat diffusion interact on a toroidal grid. Ant-colony shortest-path examples offer a useful analogy for the course's complex-systems lens: simple local pheromone feedback can accumulate into a collective route. DaisyWorld does not simulate ants or route finding; its system-level patterns arise instead from vegetation, albedo, and temperature feedback. The extension adds pollution zones and spread, pollution-dependent behaviour and visual overlays, plus a Lucky Clover mutation and pollution-mitigation pathway. These are implemented mechanisms, not reported experimental results.
  zh: SWEN90004 将作业设为一次建模练习：团队复现一个指定的 NetLogo 网格模型，考察其行为，并提出扩展。我们的 Python 版本分离了参数配置、仿真控制、Pygame 渲染与基于 notebook 的数据检查；黑、白雏菊、裸地、局部温度、繁殖、衰老与热扩散在环形网格中通过局部规则互动。蚂蚁群体寻找最短路径是理解这门课复杂系统视角的一个类比：简单的局部信息素反馈能够累积成群体路线。DaisyWorld 不模拟蚂蚁或路径寻优；它的系统层面模式来自植被、反照率与温度之间的反馈。扩展代码加入污染区域及其传播、受污染影响的行为与可视化覆盖层，以及 Lucky Clover 的变异和污染缓解路径。这些是已实现的机制，不是实验结果报告。
```

- [ ] **Step 3: Verify the focused test passes**

Run:

```bash
node --test --test-name-pattern='DaisyWorld publishes' scripts/build-projects.test.cjs
```

Expected: PASS with the English and Chinese narrative contract in compiled data.

### Task 3: Generate and check the public page data

**Files:**
- Modify: `projects-data.js` (generated only)

**Interfaces:**
- Consumes: validated `projects.yml`.
- Produces: regenerated project data consumed by `app.js`.

- [ ] **Step 1: Generate the derived data**

```bash
npm run build
```

Expected: `Generated projects-data.js from projects.yml`.

- [ ] **Step 2: Run full verification**

```bash
npm test
npm run check
git diff --check
```

Expected: 24 tests pass, generated output is current, and there are no whitespace errors.

- [ ] **Step 3: Inspect scope**

Confirm the diff is limited to DaisyWorld source copy, generated data, the narrative contract test, and accompanying design/plan notes. Confirm no external source link, result number, or new renderer field appears.
