const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_FILES = [
  'index.html',
  'app.js',
  'content.js',
  'projects-data.js',
  'styles.css',
];

function buildSite({ root = ROOT, output = path.join(root, '_site') } = {}) {
  const resolvedRoot = path.resolve(root);
  const resolvedOutput = path.resolve(output);
  fs.rmSync(resolvedOutput, { recursive: true, force: true });
  fs.mkdirSync(resolvedOutput, { recursive: true });
  for (const file of PUBLIC_FILES) {
    fs.copyFileSync(path.join(resolvedRoot, file), path.join(resolvedOutput, file));
  }
  fs.cpSync(path.join(resolvedRoot, 'assets'), path.join(resolvedOutput, 'assets'), {
    recursive: true,
  });
  fs.writeFileSync(path.join(resolvedOutput, '.nojekyll'), '');
  return resolvedOutput;
}

if (require.main === module) {
  console.log(`Built static site at ${buildSite()}`);
}

module.exports = { buildSite, PUBLIC_FILES };
