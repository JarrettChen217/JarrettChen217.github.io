// Convert a chosen avatar into browser-sized PNGs and a multi-size ICO.
// Originals stay in photo-inbox; only these small exports are published.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const source = path.resolve(process.argv[2] || path.join(root, 'photo-inbox/profile/hao-chen-pixel-favicon-transparent-source.png'));
const output = path.join(root, 'assets/branding');
const sizes = [16, 32, 48];
fs.mkdirSync(output, { recursive: true });
const images = sizes.map(size => {
  const destination = path.join(output, `favicon-${size}.png`);
  if (source === destination) throw new Error('Source must not be an output file');
  execFileSync('sips', ['-s', 'format', 'png', '-z', String(size), String(size), source, '--out', destination], { stdio: 'pipe' });
  return fs.readFileSync(destination);
});

// ICO directory entries point at embedded PNGs, supported by modern browsers.
const directory = Buffer.alloc(6 + 16 * sizes.length);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
images.forEach((data, index) => {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(data.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += data.length;
});
fs.writeFileSync(path.join(output, 'favicon.ico'), Buffer.concat([directory, ...images]));
console.log(`Prepared 16 / 32 / 48 px favicons in ${output}`);
