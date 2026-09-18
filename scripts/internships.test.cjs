const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function appContext(hash = '#internships') {
  const nodes = {};
  const makeNode = () => ({ addEventListener() {}, scrollIntoView() {}, focus() {}, textContent: '', innerHTML: '' });
  const context = vm.createContext({
    __nodes: nodes,
    localStorage: { getItem: () => 'en' },
    navigator: { language: 'en' },
    location: { hash },
    document: { querySelectorAll: () => [], querySelector: selector => nodes[selector] ||= makeNode(), getElementById: id => nodes[`#${id}`] ||= makeNode(), addEventListener() {} },
    window: { addEventListener() {}, scrollTo() {} },
    setInterval() {},
    requestAnimationFrame(callback) { callback(); },
  });
  const root = path.join(__dirname, '..');
  vm.runInContext(fs.readFileSync(path.join(root, 'projects-data.js'), 'utf8'), context);
  vm.runInContext(fs.readFileSync(path.join(root, 'content.js'), 'utf8'), context);
  vm.runInContext(fs.readFileSync(path.join(root, 'app.js'), 'utf8').replace(/\nrender\(\);\s*$/, ''), context);
  return context;
}

test('Internship list and detail hashes resolve as first-class routes', () => {
  assert.equal(vm.runInContext('route().page', appContext()), 'internships');
  const detailContext = appContext('#internship/cummins-us');
  assert.equal(vm.runInContext('route().page', detailContext), 'internship');
  assert.equal(vm.runInContext('route().id', detailContext), 'cummins-us');
});

test('all three internships are selected in the intended order and resolve to content', () => {
  const context = appContext();
  assert.equal(vm.runInContext('CONTENT.selectedInternships.length', context), 3);
  assert.equal(vm.runInContext('CONTENT.selectedInternships[0].id', context), 'cummins-us');
  assert.equal(vm.runInContext('CONTENT.selectedInternships[1].id', context), 'accenture');
  assert.equal(vm.runInContext('CONTENT.selectedInternships[2].id', context), 'cummins-china');
  assert.equal(vm.runInContext('new Set(CONTENT.selectedInternships.map(item => item.id)).size', context), 3);
  assert.equal(vm.runInContext('CONTENT.selectedInternships.every(item => CONTENT.internships.some(internship => internship.id === item.id))', context), true);
});

test('internship content provides bilingual catalogue and detail metadata', () => {
  const context = appContext();
  assert.equal(vm.runInContext('CONTENT.internships.length', context), 3);
  assert.equal(vm.runInContext('CONTENT.internships.every(item => item.region && item.roleKey && item.excerpt.length === 2 && item.tech)', context), true);
  assert.equal(vm.runInContext('CONTENT.internships[0].gallery.length', context), 6);
  assert.equal(vm.runInContext('CONTENT.internships[1].gallery.length', context), 3);
  assert.equal(vm.runInContext('CONTENT.internships[2].gallery.length', context), 2);
  assert.match(vm.runInContext('CONTENT.internships[0].summary[0]', context), /Codex, GitHub Copilot, and Claude Code/);
  assert.match(vm.runInContext('CONTENT.internships[0].summary[1]', context), /Codex、GitHub Copilot 与 Claude Code/);
});

test('the Internship catalogue mirrors Projects without embedding gallery photos', () => {
  const context = appContext();
  const entry = vm.runInContext('internshipEntry(CONTENT.internships[0])', context);
  const html = vm.runInContext('internships()', context);
  assert.match(entry, /href="#internship\/cummins-us"/);
  assert.match(entry, /Evidence-led manufacturing analytics/);
  assert.doesNotMatch(entry, /assets\/internships\//);
  assert.match(html, /id="internship-search"/);
  assert.match(html, /id="internship-region"/);
  assert.match(html, /id="internship-role"/);
  assert.match(html, /id="internship-result-count"/);
  assert.doesNotMatch(html, /assets\/internships/);
  vm.runInContext('updateInternshipResults()', context);
  assert.match(context.__nodes['#internship-results'].innerHTML, /Evidence-led manufacturing analytics/);
  assert.doesNotMatch(context.__nodes['#internship-results'].innerHTML, /<p>0<\/p>/);
});

test('the Internship catalogue explains its public-content boundary in both languages', () => {
  const context = appContext();
  assert.match(vm.runInContext('internships()', context), /internal code, customer information, and proprietary materials are intentionally excluded/);
  vm.runInContext("language='zh'", context);
  assert.match(vm.runInContext('internships()', context), /内部代码、客户信息与专有资料均不展示/);
});

test('optional internship logos render in catalogue, overview, and detail without empty placeholders', () => {
  const context = appContext();
  assert.equal(vm.runInContext('CONTENT.internships.every(item => item.logo?.src && item.logo?.width > 0 && item.logo?.height > 0 && item.logo?.alt.length === 2)', context), true);

  const entry = vm.runInContext("internshipEntry(CONTENT.internships.find(item => item.id === 'accenture'))", context);
  assert.match(entry, /class="entry entry-with-logo"/);
  assert.match(entry, /class="entry-logo"/);
  assert.match(entry, /alt="Accenture logo"/);

  const overviewHtml = vm.runInContext('overview()', context);
  assert.equal((overviewHtml.match(/class="entry-logo"/g) || []).length, 3);

  vm.runInContext('updateInternshipResults()', context);
  assert.equal((context.__nodes['#internship-results'].innerHTML.match(/class="entry-logo"/g) || []).length, 3);

  const detail = vm.runInContext("internshipDetail('cummins-us')", context);
  assert.match(detail, /class="detail-title-row"/);
  assert.match(detail, /class="company-logo"/);
  assert.match(detail, /alt="Cummins logo"/);

  const noLogoEntry = vm.runInContext("internshipEntry({...CONTENT.internships[0], logo: undefined})", context);
  const noLogoDetail = vm.runInContext("(() => { const item = CONTENT.internships[0]; const logo = item.logo; delete item.logo; const html = internshipDetail(item.id); item.logo = logo; return html; })()", context);
  assert.doesNotMatch(noLogoEntry, /entry-with-logo|entry-logo|<img/);
  assert.doesNotMatch(noLogoDetail, /detail-title-row|company-logo/);
});

test('internship filters are independent and search bilingual detail content', () => {
  const context = appContext();
  assert.equal(vm.runInContext("internshipFilters.query='cummins'; CONTENT.internships.filter(internshipMatches).length", context), 2);
  assert.equal(vm.runInContext("internshipFilters.query=''; internshipFilters.region='remote'; CONTENT.internships.filter(internshipMatches).length", context), 1);
  assert.equal(vm.runInContext("internshipFilters.region='all'; internshipFilters.role='software-development'; CONTENT.internships.filter(internshipMatches)[0].id", context), 'cummins-china');
  assert.equal(vm.runInContext("filters.query === '' && filters.region === 'all' && filters.type === 'all'", context), true);
});

test('individual Internship details include the right content and galleries', () => {
  const context = appContext();
  const us = vm.runInContext("internshipDetail('cummins-us')", context);
  const accenture = vm.runInContext("internshipDetail('accenture')", context);
  const china = vm.runInContext("internshipDetail('cummins-china')", context);
  const missing = vm.runInContext("internshipDetail('missing')", context);
  assert.match(us, /Back to all internships/);
  assert.match(us, /Kappa DAT-reading skill/);
  assert.equal((us.match(/data-gallery-preview/g) || []).length, 6);
  assert.match(us, /Global Manufacturing colleagues in Charleston/);
  assert.equal((accenture.match(/data-gallery-preview/g) || []).length, 3);
  assert.match(accenture, /internship-highlights/);
  assert.equal((china.match(/data-gallery-preview/g) || []).length, 2);
  assert.match(missing, /Internship not found/);
  assert.match(missing, /href="#internships"/);
});

test('Accenture presents two evidence-backed applied machine-learning studies', () => {
  const context = appContext();
  const record = "CONTENT.internships.find(item => item.id === 'accenture')";
  assert.equal(vm.runInContext(`${record}.team[0]`, context), 'Remote AI Project Team');
  assert.equal(vm.runInContext(`${record}.work.length`, context), 2);
  assert.equal(vm.runInContext(`${record}.background.length`, context), 2);
  assert.equal(vm.runInContext(`${record}.process.stages.length`, context), 4);
  assert.equal(vm.runInContext(`${record}.delivery.steps.length`, context), 4);
  assert.equal(vm.runInContext(`${record}.work.every(item => item.challenge?.length === 2 && item.role?.length === 2 && item.validation?.length === 2 && item.outcome?.length === 2)`, context), true);
  assert.equal(vm.runInContext(`${record}.gallery.every(image => /^assets\\/internships\\/accenture-[a-z-]+-(?:800|1600)\\.webp$/.test(image.src) && /^assets\\/internships\\/accenture-[a-z-]+-(?:800|1600)\\.webp$/.test(image.thumbnail))`, context), true);
  const html = vm.runInContext("internshipDetail('accenture')", context);
  assert.match(html, /Background/);
  assert.match(html, /Selected work/);
  assert.match(html, /Review sentiment classification/);
  assert.match(html, /Hourly store-sales forecasting/);
  assert.match(html, /From task brief to evidence-backed comparison/);
  assert.match(html, /Remote delivery rhythm/);
  assert.match(html, /Public case-study scope/);
  assert.equal((html.match(/class="process-stage"/g) || []).length, 4);
  assert.equal((html.match(/class="internship-delivery-step"/g) || []).length, 4);
});

test('Accenture avoids the disputed classification accuracy figures', () => {
  const context = appContext();
  const publicRecord = vm.runInContext("JSON.stringify(CONTENT.internships.find(item => item.id === 'accenture'))", context);
  assert.doesNotMatch(publicRecord, /85\.8%|84\.8%|85\.5%/);
  assert.match(publicRecord, /RMSE 0\.173/);
});

test('Cummins Charleston presents three evidence-bounded manufacturing data studies', () => {
  const context = appContext();
  const record = "CONTENT.internships.find(item => item.id === 'cummins-us')";
  assert.equal(vm.runInContext(`${record}.team[0]`, context), 'Manufacturing Engineering & Data Analytics');
  assert.equal(vm.runInContext(`${record}.work.length`, context), 3);
  assert.equal(vm.runInContext(`${record}.background.length`, context), 2);
  assert.equal(vm.runInContext(`${record}.process.stages.length`, context), 5);
  assert.equal(vm.runInContext(`${record}.delivery.steps.length`, context), 5);
  assert.equal(vm.runInContext(`${record}.work.every(item => item.challenge?.length === 2 && item.role?.length === 2 && item.validation?.length === 2 && item.outcome?.length === 2)`, context), true);
  const html = vm.runInContext("internshipDetail('cummins-us')", context);
  assert.match(html, /Background/);
  assert.match(html, /Selected work/);
  assert.match(html, /Balancing-system validation workflow/);
  assert.match(html, /Decision-support web demonstrator/);
  assert.match(html, /Read-only production-data and BI pipeline/);
  assert.match(html, /Evidence-led manufacturing analytics/);
  assert.match(html, /From plant question to reviewable evidence/);
  assert.match(html, /Public case-study scope/);
  assert.equal((html.match(/class="process-stage"/g) || []).length, 5);
  assert.equal((html.match(/class="internship-delivery-step"/g) || []).length, 5);
});

test('Cummins Charleston explains the Agent Skills build and distribution system', () => {
  const context = appContext();
  const record = "CONTENT.internships.find(item => item.id === 'cummins-us')";
  assert.equal(vm.runInContext(`${record}.agentSkills.examples.length`, context), 4);
  assert.equal(vm.runInContext(`${record}.agentSkills.stages.length`, context), 4);
  assert.equal(vm.runInContext(`${record}.agentSkills.examples.every(item => item.title.length === 2 && item.body.length === 2)`, context), true);
  assert.equal(vm.runInContext(`${record}.agentSkills.stages.every(item => item.title.length === 2 && item.body.length === 2)`, context), true);
  const html = vm.runInContext("internshipDetail('cummins-us')", context);
  assert.match(html, /From repeated prompt to shared engineering capability/);
  assert.match(html, /Kappa DAT reading and export/);
  assert.match(html, /symbolic links/);
  assert.match(html, /Codex, GitHub Copilot, and Claude Code/);
  assert.match(html, /Make all three coding agents work from the same contract/);
  assert.match(html, /Claude Code/);
  assert.match(html, /GitHub Actions/);
  assert.equal((html.match(/class="agent-skill-example"/g) || []).length, 4);
  assert.equal((html.match(/class="agent-skill-stage"/g) || []).length, 4);
});

test('Cummins Charleston names coding agents without procurement details', () => {
  const context = appContext();
  const publicRecord = vm.runInContext("JSON.stringify(CONTENT.internships.find(item => item.id === 'cummins-us'))", context);
  assert.match(publicRecord, /Codex/);
  assert.match(publicRecord, /GitHub Copilot/);
  assert.match(publicRecord, /Claude Code/);
  assert.doesNotMatch(publicRecord, /company-provided|self-funded|公司提供|自费使用/i);
});

test('Cummins Charleston public content excludes machine and product identifiers', () => {
  const context = appContext();
  const publicRecord = vm.runInContext(`JSON.stringify((({
    company, place, role, team, excerpt, tech, summary, background, highlights, work, process, delivery, boundary, gallery,
  }) => ({ company, place, role, team, excerpt, tech, summary, background, highlights, work, process, delivery, boundary, gallery }))(
    CONTENT.internships.find(item => item.id === 'cummins-us')
  ))`, context);
  const sensitive = /xento|schenck|turbotest|signalysis|rets\d+|\bATS\b|canberra|bronco|colorado|nighthawk|\bM23\b|\bID21\b|model\s*(?:name|no\.?|number)/i;
  assert.doesNotMatch(publicRecord, sensitive);
  assert.equal(vm.runInContext("CONTENT.internships.find(item => item.id === 'cummins-us').gallery.every(image => /^assets\\/internships\\/cummins-us-[a-z-]+-(?:800|1024|1600)\\.webp$/.test(image.src) && /^assets\\/internships\\/cummins-us-[a-z-]+-(?:800|1024|1600)\\.webp$/.test(image.thumbnail))", context), true);
});

test('Internship search includes the public Cummins Charleston case-study content', () => {
  const context = appContext();
  assert.equal(vm.runInContext("internshipFilters.query='read-only archive'; CONTENT.internships.filter(internshipMatches)[0].id", context), 'cummins-us');
  assert.equal(vm.runInContext("internshipFilters.query='containerized demonstrator'; CONTENT.internships.filter(internshipMatches)[0].id", context), 'cummins-us');
  assert.equal(vm.runInContext("internshipFilters.query='vibe coding'; CONTENT.internships.filter(internshipMatches)[0].id", context), 'cummins-us');
  assert.equal(vm.runInContext("internshipFilters.query='Claude Code'; CONTENT.internships.filter(internshipMatches)[0].id", context), 'cummins-us');
  assert.equal(vm.runInContext("internshipFilters.query='GitHub Copilot'; CONTENT.internships.filter(internshipMatches)[0].id", context), 'cummins-us');
  assert.equal(vm.runInContext("internshipFilters.query='Kappa DAT'; CONTENT.internships.filter(internshipMatches)[0].id", context), 'cummins-us');
  assert.equal(vm.runInContext("internshipFilters.query='GitHub Actions'; CONTENT.internships.filter(internshipMatches)[0].id", context), 'cummins-us');
  assert.equal(vm.runInContext("internshipFilters.query='symbolic links'; CONTENT.internships.filter(internshipMatches)[0].id", context), 'cummins-us');
  assert.equal(vm.runInContext("internshipFilters.query='证据边界'; CONTENT.internships.filter(internshipMatches)[0].id", context), 'cummins-us');
});

test('Cummins China presents two evidence-backed Digital Team work studies', () => {
  const context = appContext();
  const record = "CONTENT.internships.find(item => item.id === 'cummins-china')";
  assert.equal(vm.runInContext(`${record}.team[0]`, context), 'Digital Team');
  assert.equal(vm.runInContext(`${record}.work.length`, context), 2);
  assert.equal(vm.runInContext(`${record}.background.length`, context), 2);
  assert.equal(vm.runInContext(`${record}.process.stages.length`, context), 4);
  assert.equal(vm.runInContext(`${record}.delivery.steps.length`, context), 5);
  assert.equal(vm.runInContext(`${record}.work.every(item => item.challenge?.length === 2 && item.role?.length === 2 && item.validation?.length === 2 && item.outcome?.length === 2)`, context), true);
  const html = vm.runInContext("internshipDetail('cummins-china')", context);
  assert.match(html, /Background/);
  assert.match(html, /Selected work/);
  assert.match(html, /Mining haul-truck fuel comparison/);
  assert.match(html, /Heartbeat cumulative-data pipeline/);
  assert.match(html, /Problem/);
  assert.match(html, /My role/);
  assert.match(html, /Validation &amp; result/);
  assert.match(html, /server-side validation and unit tests/);
  assert.match(html, /daily incremental results with the prior full snapshot/);
  assert.match(html, /Two sprints, one delivery practice/);
  assert.match(html, /How the Digital Team moved work/);
  assert.match(html, /What I learned/);
  assert.match(html, /Public case-study scope/);
  assert.equal((html.match(/class="process-stage"/g) || []).length, 4);
  assert.equal((html.match(/class="internship-delivery-step"/g) || []).length, 5);
  assert.doesNotMatch(html, /TR60|aade_lemo|j-52LN9KZ4BXK0/);
});

test('Internship search includes the public Cummins China work-study content', () => {
  const context = appContext();
  assert.equal(vm.runInContext("internshipFilters.query='unit testing'; CONTENT.internships.filter(internshipMatches)[0].id", context), 'cummins-china');
  assert.equal(vm.runInContext("internshipFilters.query='incremental snapshot'; CONTENT.internships.filter(internshipMatches)[0].id", context), 'cummins-china');
  assert.equal(vm.runInContext("internshipFilters.query='distributed data'; CONTENT.internships.filter(internshipMatches)[0].id", context), 'cummins-china');
  assert.equal(vm.runInContext("internshipFilters.query='需求澄清'; CONTENT.internships.filter(internshipMatches)[0].id", context), 'cummins-china');
});

test('Overview presents all internships before selected projects', () => {
  const html = vm.runInContext('overview()', appContext());
  assert.match(html, /id="selected-internships"/);
  assert.equal((html.match(/<h3><a href="#internship\//g) || []).length, 3);
  assert.ok(html.indexOf('id="selected-internships"') < html.indexOf('id="selected"'));
});
