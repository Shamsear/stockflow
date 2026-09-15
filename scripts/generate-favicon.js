const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="logo-navy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
    <linearGradient id="logo-teal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F766E" />
      <stop offset="100%" stop-color="#14B8A6" />
    </linearGradient>
  </defs>
  <path d="M10 14C10 10.6863 12.6863 8 16 8H36C37.1046 8 38 8.89543 38 10V16C38 17.1046 37.1046 18 36 18H20C17.7909 18 16 19.7909 16 22C16 22.5523 15.5523 23 15 23H11C10.4477 23 10 22.5523 10 22V14Z" fill="url(#logo-navy)" />
  <rect x="20" y="21" width="8" height="6" rx="3" fill="#0F766E" />
  <path d="M38 34C38 37.3137 35.3137 40 32 40H12C10.8954 40 10 39.1046 10 38V32C10 30.8954 10.8954 30 12 30H28C30.2091 30 32 28.2091 32 26C32 25.4477 32.4477 25 33 25H37C37.5523 25 38 25.4477 38 26V34Z" fill="url(#logo-teal)" />
</svg>`;

async function generateIcons() {
  const svgBuffer = Buffer.from(svgContent);

  const rootDir = path.join(__dirname, '..');

  // Write app/icon.svg
  fs.writeFileSync(path.join(rootDir, 'app', 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.svg'), svgContent);
  fs.writeFileSync(path.join(rootDir, 'public', 'logo-icon.svg'), svgContent);

  // Generate PNG sizes
  const p16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const p32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const p48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const p180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const p192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const p512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  fs.writeFileSync(path.join(rootDir, 'public', 'apple-touch-icon.png'), p180);
  fs.writeFileSync(path.join(rootDir, 'app', 'apple-icon.png'), p180);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon-192.png'), p192);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon-512.png'), p512);

  // Construct standard multi-image ICO format (16x16, 32x32, 48x48 PNGs wrapped in ICO header)
  const images = [
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 }
  ];

  const headerSize = 6;
  const dirEntrySize = 16;
  const numImages = images.length;
  let offset = headerSize + dirEntrySize * numImages;

  const icoHeader = Buffer.alloc(headerSize);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // Type: 1 = ICO
  icoHeader.writeUInt16LE(numImages, 4); // Number of images

  const dirEntries = [];
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width, 0);
    entry.writeUInt8(img.height, 1);
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Image data size
    entry.writeUInt32LE(offset, 12); // Offset of image data
    offset += img.buffer.length;
    dirEntries.push(entry);
  }

  const icoBuffer = Buffer.concat([
    icoHeader,
    ...dirEntries,
    ...images.map(img => img.buffer)
  ]);

  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(rootDir, 'app', 'favicon.ico'), icoBuffer);

  console.log('Successfully generated StockFlow favicon.ico, icon.svg, apple-icon.png, and public icons!');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
