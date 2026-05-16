const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = 'New York桜屋since2001';
const DEST = 'sakuraya-webp';

if (!fs.existsSync(DEST)) fs.mkdirSync(DEST);

const files = fs.readdirSync(SRC).filter(f =>
  /\.(jpe?g|png|JPG|JPEG|PNG)$/.test(f)
);

console.log(`Converting ${files.length} images...`);

(async () => {
  const results = [];
  for (let i = 0; i < files.length; i++) {
    const name = files[i];
    const outName = `s${String(i+1).padStart(3,'0')}.webp`;
    const src = path.join(SRC, name);
    const dest = path.join(DEST, outName);

    try {
      const info = await sharp(src)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(dest);

      const srcSize = fs.statSync(src).size;
      const reduction = Math.round((1 - info.size / srcSize) * 100);
      console.log(`[${i+1}/${files.length}] ${name} -> ${outName} | ${Math.round(srcSize/1024)}KB -> ${Math.round(info.size/1024)}KB (-${reduction}%)`);
      results.push(outName);
    } catch(e) {
      console.error(`ERROR: ${name} - ${e.message}`);
    }
  }

  // Output JS array for index.html
  console.log('\n=== images array ===');
  console.log(JSON.stringify(results, null, 2));
  console.log('====================');
})();
