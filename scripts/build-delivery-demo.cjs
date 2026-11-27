const fs = require('node:fs');
const path = require('node:path');
const { buildSync } = require('esbuild');

const root = path.join(__dirname, '..');
const output = path.join(root, 'play', 'autonomous-delivery', 'demo.js');
const [{ contents }] = buildSync({
  absWorkingDir: root,
  entryPoints: ['scripts/autonomous-delivery.jsx'],
  bundle: true,
  jsx: 'automatic',
  target: 'es2020',
  define: { 'process.env.NODE_ENV': '"production"' },
  minify: true,
  legalComments: 'inline',
  banner: { js: '// Generated from scripts/autonomous-delivery.jsx. Run npm run build.' },
  write: false,
}).outputFiles;

if (process.argv.includes('--check')) {
  if (!fs.existsSync(output) || !fs.readFileSync(output).equals(contents)) {
    console.error('The delivery demo bundle is out of date. Run npm run build.');
    process.exitCode = 1;
  }
} else {
  fs.writeFileSync(output, contents);
}
