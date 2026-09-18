# Berry Street Members Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an accessible, bilingual, text-only Members section to the Berry Street case study, with GitHub links for verified accounts.

**Architecture:** Store optional member data on each project in `projects.yml`, compile it through the existing public-data allowlist, and render it with a small helper in `app.js`. The output is a wrapping inline list: three verified members become safe external links and the remaining two remain plain names.

**Tech Stack:** YAML, Node.js, js-yaml, browser JavaScript, node:test, CSS.

**Spec:** `docs/superpowers/specs/2026-09-17-berry-street-members-design.md`

## Global Constraints

- Publish only the five student names found in the Wombat README; exclude IDs, emails, roles, supervisors, and industrial partners.
- Use verified HTTPS GitHub profiles only for Hao Chen (`JarrettChen217`), Gaoyongle Zhang (`XinMoZ`), and Junhao Zhu (`junhaozhu1`).
- Show Ziyu Wang and Zikun Qiu as unlinked text until their identities are verified.
- Do not use avatars, profile stacks, or new dependencies.
- Preserve English and Chinese rendering, escaping, and responsive wrapping.

---

### Task 1: Compile and render project member data

**Files:**
- Modify: `scripts/build-projects.cjs:110-113`
- Modify: `app.js:29`
- Modify: `projects.yml:117-294`
- Modify: `styles.css:14`
- Test: `scripts/build-projects.test.cjs`

**Interfaces:**
- Consumes: optional `members` list whose entries are `{name: {en: string, zh: string}, url?: string}`.
- Produces: compiled `project.members` entries of `{name: [string, string], url?: string}` and `members(project)` HTML.

- [x] **Step 1: Write the failing test**

Append a test that creates `berry-street.members` with all five names, three HTTPS GitHub URLs, plus private metadata; assert compiled output retains only `name` and `url`, and detail output has the bilingual heading, all five names, exactly three `target="_blank" rel="noopener"` links, and no private metadata.

```js
test('members compile public bilingual names and render only verified GitHub links',()=>{
  const doc=fixture();
  const p=doc.projects.find(p=>p.id==='berry-street');
  p.members=[
    {name:{en:'Ziyu Wang',zh:'Ziyu Wang'}},
    {name:{en:'Hao Chen',zh:'Hao Chen'},url:'https://github.com/JarrettChen217',source:'/private/readme.md'},
    {name:{en:'Zikun Qiu',zh:'Zikun Qiu'}},
    {name:{en:'Gaoyongle Zhang',zh:'Gaoyongle Zhang'},url:'https://github.com/XinMoZ'},
    {name:{en:'Junhao Zhu',zh:'Junhao Zhu'},url:'https://github.com/junhaozhu1'}
  ];
  const result=run(doc);const compiled=result.projects.find(p=>p.id==='berry-street');
  assert.equal(JSON.stringify(compiled).includes('/private/'),false);
  const vm=require('node:vm');
  const context=vm.createContext({CONTENT:{projects:result.projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
  let html=vm.runInContext("detail('berry-street')",context);
  assert.match(html,/Members/);assert.match(html,/Ziyu Wang/);assert.match(html,/Zikun Qiu/);
  assert.equal((html.match(/target="_blank" rel="noopener"/g)||[]).length,3);
  assert.ok(!html.includes('student.unimelb.edu.au'));
  html=vm.runInContext("language='zh';detail('berry-street')",context);
  assert.match(html,/项目成员/);assert.match(html,/Ziyu Wang/);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test scripts/build-projects.test.cjs`

Expected: FAIL because `members` is not yet compiled or rendered.

- [x] **Step 3: Write minimal implementation**

Extend the compiler immediately before `return {published:p.published,data:result};`:

```js
if(p.members!==undefined){
  if(!Array.isArray(p.members)||!p.members.length)fail(`${p.id}.members: must be a non-empty list`);
  result.members=p.members.map((member,i)=>{
    const field=`${p.id}.members[${i}]`;
    if(!member||typeof member!=='object'||Array.isArray(member))fail(`${field}: must be an object`);
    const compiled={name:bi(member.name,`${field}.name`)};
    if(member.url!==undefined){
      let url;try{url=new URL(member.url);}catch{fail(`${field}.url: invalid URL`);}
      if(url.protocol!=='https:'||url.hostname!=='github.com')fail(`${field}.url: must be a GitHub HTTPS URL`);
      compiled.url=url.href;
    }
    return compiled;
  });
}
```

Add a `members(p)` helper that escapes all display names and URLs, returns no markup for projects without members, and emits one linked or unlinked member per list item. Insert `${members(p)}` immediately after the Background section in `detail(id)`. Add the five sourced entries under Berry Street in `projects.yml`. Add a narrow CSS rule for a wrapping `.project-members-list`, without image selectors or stacked layout rules.

- [x] **Step 4: Run test to verify it passes**

Run: `node --test scripts/build-projects.test.cjs`

Expected: PASS, including the new member compiler/renderer assertion.

- [x] **Step 5: Regenerate the browser data and run full verification**

Run: `npm run build && npm run check && npm test`

Expected: generated `projects-data.js` includes Berry Street member data; schema check and all node tests pass.

- [ ] **Step 6: Commit**

```bash
git add projects.yml projects-data.js scripts/build-projects.cjs scripts/build-projects.test.cjs app.js styles.css
git commit -m "feat: list Berry Street project members"
```
