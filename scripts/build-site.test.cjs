const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
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
    'projects-data.js',
    'styles.css',
  ]);
  for (const file of PUBLIC_FILES) assert.equal(fs.readFileSync(path.join(output, file), 'utf8'), file);
  assert.equal(fs.readFileSync(path.join(output, 'assets/projects/example.webp'), 'utf8'), 'image');
  assert.equal(fs.readFileSync(path.join(output, '.nojekyll'), 'utf8'), '');
  for (const forbidden of ['projects.yml', 'README.md', 'photo-inbox', 'docs']) {
    assert.equal(fs.existsSync(path.join(output, forbidden)), false, `${forbidden} must not be published`);
  }
});
