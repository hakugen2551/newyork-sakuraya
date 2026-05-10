const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const photoPlaceholderSVG = `<div class="photo-ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><p>写真を追加</p></div>`;

// Map of item labels to image filenames
const mapping = [
  { jp: 'シュークリーム', img: 'food-01-cream-puff.png' },
  { jp: 'ミニパイ',       img: 'food-02-mini-pie.png' },
  { jp: 'デコミニパイ',  img: 'food-03-deco-mini-pie.png' },
  { jp: 'カムジャパン',  img: 'food-04-kamja-pan.png' },
  { jp: 'プリン',        img: 'food-05-pudding.png' },
  { jp: 'バターサンドクッキー', img: 'food-06-butter-sand-cookie.png' },
  { jp: 'フレッシュグミ', img: 'food-07-fresh-gummy.png' },
  { jp: '抹茶オーレ',    img: 'drink-01-matcha-ole.png' },
  { jp: 'ほうじ茶オーレ', img: 'drink-02-hojicha-ole.png' },
  // Lemonade: jp-label was changed so look for the corrected text
  { jp: '糸島れもんレモネード', img: 'drink-03-itoshima-lemonade.png', cardMatch: 'ITOSHIMA<br>LEMONADE' },
  { jp: '糸島スカッシュ', img: 'drink-04-itoshima-squash.png' },
  { jp: 'オレンジジュース', img: 'drink-05-rich-orange-juice.png' },
  { jp: 'アイスコーヒー', img: 'drink-06-iced-coffee.png' },
  { jp: 'ホットコーヒー', img: 'drink-07-hot-coffee.png' },
];

// For each product-card, find the photo-side before the info-side with the matching jp-label
// Strategy: split by product-card blocks and process each
const cardRegex = /(<div class="product-card">[\s\S]*?<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>)/g;

function injectImage(cardHtml, imgFile) {
  // Replace photo-ph div: make it hidden
  const hiddenPh = `<div class="photo-ph" style="display:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><p>写真を追加</p></div>`;
  // Add img before photo-ph
  const imgTag = `<img class="uploaded" src="images/${imgFile}" alt="">\n      `;
  return cardHtml.replace(photoPlaceholderSVG, imgTag + hiddenPh);
}

// Process each mapping by finding the card block containing the jp-label
for (const m of mapping) {
  // Build search pattern: find product-card block that contains the jp-label span
  // We'll find the block containing this jp-label and inject the image

  // Match a product-card block containing the jp-label
  const labelEscaped = m.jp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `(<div class="product-card">\\s*\\n\\s*<div class="photo-side"[^>]*>\\s*\\n\\s*)` +
    `(${photoPlaceholderSVG.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})` +
    `(\\s*\\n\\s*<input[^>]*>\\s*\\n\\s*</div>\\s*\\n\\s*<div class="info-side[^"]*">\\s*\\n\\s*<span class="jp-label">${labelEscaped}</span>)`,
    'g'
  );

  const imgTag = `<img class="uploaded" src="images/${m.img}" alt="">\n      `;
  const hiddenPh = `<div class="photo-ph" style="display:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><p>写真を追加</p></div>`;

  const newHtml = html.replace(pattern, (match, p1, p2, p3) => {
    return p1 + imgTag + hiddenPh + p3;
  });

  if (newHtml === html) {
    console.warn(`WARNING: No replacement made for: ${m.jp}`);
  } else {
    html = newHtml;
    console.log(`Updated card for: ${m.jp} → ${m.img}`);
  }
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('HTML updated successfully!');
