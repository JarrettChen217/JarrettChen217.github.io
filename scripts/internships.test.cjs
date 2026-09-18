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
  assert.equal(vm.runInContext('CONTENT.internships[0].gallery.length', context), 4);
  assert.equal(vm.runInContext('CONTENT.internships[1].gallery?.length || 0', context), 0);
  assert.equal(vm.runInContext('CONTENT.internships[2].gallery.length', context), 2);
  assert.match(vm.runInContext('CONTENT.internships[0].summary[0]', context), /approval-gated/);
  assert.match(vm.runInContext('CONTENT.internships[0].summary[1]', context), /审批门控/);
});

test('the Internship catalogue mirrors Projects without embedding gallery photos', () => {
  const context = appContext();
  const entry = vm.runInContext('internshipEntry(CONTENT.internships[0])', context);
  const html = vm.runInContext('internships()', context);
  assert.match(entry, /href="#internship\/cummins-us"/);
  assert.match(entry, /Data and AI-agent workflows/);
  assert.doesNotMatch(entry, /<img/);
  assert.match(html, /id="internship-search"/);
  assert.match(html, /id="internship-region"/);
  assert.match(html, /id="internship-role"/);
  assert.match(html, /id="internship-result-count"/);
  assert.doesNotMatch(html, /assets\/internships/);
  vm.runInContext('updateInternshipResults()', context);
  assert.match(context.__nodes['#internship-results'].innerHTML, /Data and AI-agent workflows/);
  assert.doesNotMatch(context.__nodes['#internship-results'].innerHTML, /<p>0<\/p>/);
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
  assert.match(us, /approval-gated/);
  assert.equal((us.match(/<img/g) || []).length, 4);
  assert.doesNotMatch(accenture, /<img/);
  assert.doesNotMatch(accenture, /internship-highlights/);
  assert.equal((china.match(/<img/g) || []).length, 2);
  assert.match(missing, /Internship not found/);
  assert.match(missing, /href="#internships"/);
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
