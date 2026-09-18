const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const yaml = require('js-yaml');
const { buildSite } = require('./build-site.cjs');

const PUBLIC_FILES = [
  'index.html',
  'app.js',
  'content.js',
  'projects-data.js',
  'styles.css',
];

function write(root, relativePath, contents = relativePath) {
  const destination = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, contents);
}

test('buildSite publishes only the runtime allowlist and public assets', t => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-site-'));
  t.after(() => fs.rmSync(fixture, { recursive: true, force: true }));

  for (const file of PUBLIC_FILES) write(fixture, file);
  write(fixture, 'assets/projects/example.webp', 'image');
  write(fixture, 'play/midas-curse/index.html', '<title>Midas Curse</title>');
  write(fixture, 'play/midas-curse/Build/midas-curse.loader.js', 'loader');
  write(fixture, 'play/midas-curse/Build/midas-curse.data.unityweb', 'data');
  write(fixture, 'play/midas-curse/Build/midas-curse.framework.js.unityweb', 'framework');
  write(fixture, 'play/midas-curse/Build/midas-curse.wasm.unityweb', 'wasm');
  write(fixture, 'projects.yml', 'private source');
  write(fixture, 'README.md', 'repository docs');
  write(fixture, 'photo-inbox/private.jpg', 'private photo');
  write(fixture, 'docs/internal.md', 'internal docs');

  const output = path.join(fixture, 'output');
  assert.equal(buildSite({ root: fixture, output }), output);
  assert.deepEqual(fs.readdirSync(output).sort(), [
    '.nojekyll',
    'app.js',
    'assets',
    'content.js',
    'index.html',
    'play',
    'projects-data.js',
    'styles.css',
  ]);
  for (const file of PUBLIC_FILES) assert.equal(fs.readFileSync(path.join(output, file), 'utf8'), file);
  assert.equal(fs.readFileSync(path.join(output, 'assets/projects/example.webp'), 'utf8'), 'image');
  assert.equal(fs.readFileSync(path.join(output, 'play/midas-curse/index.html'), 'utf8'), '<title>Midas Curse</title>');
  assert.equal(fs.readFileSync(path.join(output, 'play/midas-curse/Build/midas-curse.loader.js'), 'utf8'), 'loader');
  assert.equal(fs.readFileSync(path.join(output, 'play/midas-curse/Build/midas-curse.data.unityweb'), 'utf8'), 'data');
  assert.equal(fs.readFileSync(path.join(output, 'play/midas-curse/Build/midas-curse.framework.js.unityweb'), 'utf8'), 'framework');
  assert.equal(fs.readFileSync(path.join(output, 'play/midas-curse/Build/midas-curse.wasm.unityweb'), 'utf8'), 'wasm');
  assert.equal(fs.readFileSync(path.join(output, '.nojekyll'), 'utf8'), '');
  for (const forbidden of ['projects.yml', 'README.md', 'photo-inbox', 'docs']) {
    assert.equal(fs.existsSync(path.join(output, forbidden)), false, `${forbidden} must not be published`);
  }
});

test('every published local play URL resolves inside the built artifact', t => {
  const repositoryRoot = path.resolve(__dirname, '..');
  const output = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-site-real-'));
  t.after(() => fs.rmSync(output, { recursive: true, force: true }));

  buildSite({ root: repositoryRoot, output });
  const catalogue = yaml.load(fs.readFileSync(path.join(repositoryRoot, 'projects.yml'), 'utf8'), {
    schema: yaml.JSON_SCHEMA,
  });
  const playUrls = catalogue.projects
    .filter(project => project.published && project.play?.url)
    .map(project => project.play.url);

  assert.ok(playUrls.length > 0, 'at least one published project must exercise the play artifact contract');
  for (const playUrl of playUrls) {
    const entry = path.resolve(output, playUrl);
    const relative = path.relative(output, entry);
    assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative), `${playUrl} must stay inside the artifact`);
    assert.ok(fs.statSync(entry).isFile(), `${playUrl} must exist in the built artifact`);
  }
});
