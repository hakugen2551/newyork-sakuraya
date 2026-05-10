const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'images');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

const SIZE = 800;

function save(canvas, name) {
  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUT, name), buf);
  console.log('Saved:', name);
}

function base(bg = '#FFFFFF') {
  const c = createCanvas(SIZE, SIZE);
  const ctx = c.getContext('2d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);
  return { c, ctx };
}

function shadow(ctx, x, y, w, h, alpha = 0.12) {
  const g = ctx.createRadialGradient(x, y + h * 0.55, w * 0.05, x, y + h * 0.55, w * 0.52);
  g.addColorStop(0, `rgba(60,40,20,${alpha})`);
  g.addColorStop(1, 'rgba(60,40,20,0)');
  ctx.fillStyle = g;
  ctx.ellipse(x, y + h * 0.55, w * 0.5, h * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();
}

// ── FOOD 01: シュークリーム (Cream Puff) ──────────────────────────────────
function food01() {
  const { c, ctx } = base();
  const cx = 400, cy = 360, r = 175;

  // Shadow
  ctx.beginPath();
  const sg = ctx.createRadialGradient(cx, cy + r * 0.85, r * 0.1, cx, cy + r * 0.85, r * 0.65);
  sg.addColorStop(0, 'rgba(80,50,20,0.18)');
  sg.addColorStop(1, 'rgba(80,50,20,0)');
  ctx.fillStyle = sg;
  ctx.ellipse(cx, cy + r * 0.82, r * 0.62, r * 0.15, 0, 0, Math.PI * 2);
  ctx.fill();

  // Bottom half — lighter baked pastry
  const bg1 = ctx.createRadialGradient(cx - 30, cy + 20, 20, cx, cy + 40, r);
  bg1.addColorStop(0, '#E8C87A');
  bg1.addColorStop(0.4, '#C89A3C');
  bg1.addColorStop(1, '#8B5E1A');
  ctx.beginPath();
  ctx.arc(cx, cy + 18, r, 0, Math.PI * 2);
  ctx.fillStyle = bg1;
  ctx.fill();

  // Top cap — darker golden dome
  const tg = ctx.createRadialGradient(cx - 40, cy - 60, 15, cx, cy - 20, r * 0.88);
  tg.addColorStop(0, '#F0D080');
  tg.addColorStop(0.3, '#D4A030');
  tg.addColorStop(0.7, '#A06820');
  tg.addColorStop(1, '#7A4C10');
  ctx.beginPath();
  ctx.arc(cx, cy - 18, r * 0.88, Math.PI, 0);
  ctx.closePath();
  ctx.fillStyle = tg;
  ctx.fill();

  // Crack / split line with cream filling visible
  // Cream filling base
  const creamG = ctx.createLinearGradient(cx - 140, cy, cx + 140, cy + 30);
  creamG.addColorStop(0, '#FFF8EC');
  creamG.addColorStop(0.5, '#FFFEF8');
  creamG.addColorStop(1, '#FFF0D8');
  ctx.beginPath();
  ctx.ellipse(cx, cy + 2, 138, 30, 0, 0, Math.PI * 2);
  ctx.fillStyle = creamG;
  ctx.fill();

  // Cream swirl suggestion (lighter peaks)
  for (let i = -3; i <= 3; i++) {
    const wx = cx + i * 38;
    const peakG = ctx.createRadialGradient(wx, cy - 8, 2, wx, cy + 5, 22);
    peakG.addColorStop(0, 'rgba(255,253,245,0.95)');
    peakG.addColorStop(0.6, 'rgba(255,245,220,0.7)');
    peakG.addColorStop(1, 'rgba(255,240,200,0)');
    ctx.beginPath();
    ctx.ellipse(wx, cy + 5, 18, 26, i * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = peakG;
    ctx.fill();
  }

  // Highlight on top dome
  const hl = ctx.createRadialGradient(cx - 55, cy - 80, 5, cx - 45, cy - 65, 60);
  hl.addColorStop(0, 'rgba(255,255,220,0.55)');
  hl.addColorStop(1, 'rgba(255,255,220,0)');
  ctx.beginPath();
  ctx.arc(cx, cy - 18, r * 0.88, Math.PI, 0);
  ctx.closePath();
  ctx.fillStyle = hl;
  ctx.fill();

  // Powdered sugar dusting on top
  ctx.save();
  ctx.globalAlpha = 0.22;
  const sg2 = ctx.createRadialGradient(cx, cy - 60, 10, cx, cy - 40, 110);
  sg2.addColorStop(0, 'rgba(255,255,255,0.9)');
  sg2.addColorStop(0.5, 'rgba(255,255,255,0.3)');
  sg2.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = sg2;
  ctx.beginPath();
  ctx.arc(cx, cy - 18, r * 0.85, Math.PI, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  save(c, 'food-01-cream-puff.png');
}

// ── FOOD 02: ミニパイ (Mini Pie) ──────────────────────────────────────────
function food02() {
  const { c, ctx } = base();
  const cx = 400, cy = 370, w = 280, h = 120;

  // Shadow
  ctx.beginPath();
  const sg = ctx.createRadialGradient(cx, cy + h * 0.8, 10, cx, cy + h * 0.8, w * 0.55);
  sg.addColorStop(0, 'rgba(80,50,15,0.2)');
  sg.addColorStop(1, 'rgba(80,50,15,0)');
  ctx.fillStyle = sg;
  ctx.ellipse(cx, cy + h * 0.75, w * 0.52, h * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pie body — side wall
  const sideG = ctx.createLinearGradient(cx - w / 2, cy, cx + w / 2, cy + h * 0.4);
  sideG.addColorStop(0, '#C8873A');
  sideG.addColorStop(0.5, '#A06020');
  sideG.addColorStop(1, '#7A4810');
  ctx.beginPath();
  ctx.ellipse(cx, cy + h * 0.55, w / 2, h * 0.22, 0, 0, Math.PI * 2);
  ctx.fillStyle = sideG;
  ctx.fill();

  // Pie top surface
  const topG = ctx.createRadialGradient(cx - 40, cy - 20, 10, cx, cy, w * 0.42);
  topG.addColorStop(0, '#E8B850');
  topG.addColorStop(0.4, '#D09030');
  topG.addColorStop(0.8, '#B07020');
  topG.addColorStop(1, '#8B5010');
  ctx.beginPath();
  ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = topG;
  ctx.fill();

  // Lattice top pattern
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx, cy, w / 2 - 2, h / 2 - 2, 0, 0, Math.PI * 2);
  ctx.clip();

  const lw = 14;
  ctx.strokeStyle = '#C88028';
  ctx.lineWidth = lw;
  ctx.lineCap = 'round';

  // Diagonal lines one way
  for (let i = -6; i <= 6; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + i * 48 - 200, cy - 200);
    ctx.lineTo(cx + i * 48 + 200, cy + 200);
    ctx.stroke();
  }

  // Diagonal lines other way
  for (let i = -6; i <= 6; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + i * 48 - 200, cy + 200);
    ctx.lineTo(cx + i * 48 + 200, cy - 200);
    ctx.stroke();
  }
  ctx.restore();

  // Border ring
  ctx.beginPath();
  ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.strokeStyle = '#8B5010';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Glaze highlight
  const glaze = ctx.createRadialGradient(cx - 50, cy - 30, 5, cx, cy, 120);
  glaze.addColorStop(0, 'rgba(255,230,150,0.45)');
  glaze.addColorStop(1, 'rgba(255,200,80,0)');
  ctx.beginPath();
  ctx.ellipse(cx, cy, w / 2 - 5, h / 2 - 5, 0, 0, Math.PI * 2);
  ctx.fillStyle = glaze;
  ctx.fill();

  save(c, 'food-02-mini-pie.png');
}

// ── FOOD 03: デコミニパイ (Deco Mini Pie) ────────────────────────────────
function food03() {
  const { c, ctx } = base();
  const cx = 400, cy = 360, w = 240, h = 100;

  // Shadow
  ctx.beginPath();
  const sg = ctx.createRadialGradient(cx, cy + h * 1.2, 5, cx, cy + h * 1.2, w * 0.55);
  sg.addColorStop(0, 'rgba(80,50,15,0.18)');
  sg.addColorStop(1, 'rgba(80,50,15,0)');
  ctx.fillStyle = sg;
  ctx.ellipse(cx, cy + h * 1.15, w * 0.52, h * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pie base
  const baseG = ctx.createLinearGradient(cx, cy, cx, cy + h);
  baseG.addColorStop(0, '#D49030');
  baseG.addColorStop(1, '#8B5010');
  ctx.beginPath();
  ctx.ellipse(cx, cy + h * 0.55, w / 2, h * 0.22, 0, 0, Math.PI * 2);
  ctx.fillStyle = baseG;
  ctx.fill();

  // Pie top surface
  const topG = ctx.createRadialGradient(cx - 30, cy - 15, 8, cx, cy, w * 0.42);
  topG.addColorStop(0, '#EEC050');
  topG.addColorStop(0.5, '#C89030');
  topG.addColorStop(1, '#9A6018');
  ctx.beginPath();
  ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = topG;
  ctx.fill();

  // Decorative border crust
  ctx.beginPath();
  ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.strokeStyle = '#7A4810';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Decorative scallop edge
  const scallops = 16;
  for (let i = 0; i < scallops; i++) {
    const angle = (i / scallops) * Math.PI * 2;
    const bx = cx + (w / 2 - 2) * Math.cos(angle);
    const by = cy + (h / 2 - 2) * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(bx, by, 9, 0, Math.PI * 2);
    ctx.fillStyle = '#C87828';
    ctx.fill();
  }

  // Heart decoration on top
  ctx.save();
  ctx.translate(cx, cy - 5);
  ctx.scale(1, 0.55);
  ctx.beginPath();
  ctx.moveTo(0, 12);
  ctx.bezierCurveTo(-30, -10, -55, -5, -55, -30);
  ctx.bezierCurveTo(-55, -55, -20, -60, 0, -30);
  ctx.bezierCurveTo(20, -60, 55, -55, 55, -30);
  ctx.bezierCurveTo(55, -5, 30, -10, 0, 12);
  ctx.fillStyle = '#E05070';
  ctx.fill();
  ctx.restore();

  // Berry decorations
  const berries = [{x:-55,y:-25,c:'#C83060'},{x:55,y:-25,c:'#C83060'},{x:0,y:-38,c:'#D04070'}];
  for (const b of berries) {
    ctx.beginPath();
    ctx.arc(cx + b.x * 0.5, cy + b.y * 0.5, 9, 0, Math.PI * 2);
    ctx.fillStyle = b.c;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + b.x * 0.5 - 3, cy + b.y * 0.5 - 3, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fill();
  }

  // Glaze
  const glaze = ctx.createRadialGradient(cx - 40, cy - 25, 5, cx, cy, 100);
  glaze.addColorStop(0, 'rgba(255,230,150,0.4)');
  glaze.addColorStop(1, 'rgba(255,200,80,0)');
  ctx.beginPath();
  ctx.ellipse(cx, cy, w / 2 - 14, h / 2 - 10, 0, 0, Math.PI * 2);
  ctx.fillStyle = glaze;
  ctx.fill();

  save(c, 'food-03-deco-mini-pie.png');
}

// ── FOOD 04: カムジャパン (Kamja Pan) ─────────────────────────────────────
function food04() {
  const { c, ctx } = base();
  const cx = 400, cy = 370, rx = 200, ry = 130;

  // Shadow
  ctx.beginPath();
  const sg = ctx.createRadialGradient(cx, cy + ry * 0.85, 10, cx, cy + ry * 0.85, rx * 0.65);
  sg.addColorStop(0, 'rgba(60,40,20,0.2)');
  sg.addColorStop(1, 'rgba(60,40,20,0)');
  ctx.fillStyle = sg;
  ctx.ellipse(cx, cy + ry * 0.82, rx * 0.62, ry * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Main bun body
  const bunG = ctx.createRadialGradient(cx - 50, cy - 40, 20, cx + 10, cy + 20, rx * 1.1);
  bunG.addColorStop(0, '#F0D8A0');
  bunG.addColorStop(0.3, '#DDB060');
  bunG.addColorStop(0.7, '#C08030');
  bunG.addColorStop(1, '#8A5518');
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = bunG;
  ctx.fill();

  // Scoring lines on top (decorative cuts)
  ctx.save();
  ctx.strokeStyle = '#7A4410';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - 80, cy - 30);
  ctx.quadraticCurveTo(cx, cy - 60, cx + 80, cy - 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 100, cy + 10);
  ctx.quadraticCurveTo(cx, cy - 20, cx + 100, cy + 10);
  ctx.stroke();
  ctx.restore();

  // Sesame seeds
  const seeds = [
    {x:-30,y:-45},{x:10,y:-52},{x:50,y:-42},{x:-60,y:-20},
    {x:0,y:-28},{x:40,y:-22},{x:20,y:-50},{x:-20,y:-15}
  ];
  for (const s of seeds) {
    ctx.save();
    ctx.translate(cx + s.x, cy + s.y);
    ctx.rotate(Math.random() * Math.PI);
    ctx.beginPath();
    ctx.ellipse(0, 0, 5, 3, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#F5F0E0';
    ctx.fill();
    ctx.restore();
  }

  // Potato filling peek — small window at top
  const fillG = ctx.createRadialGradient(cx, cy - 40, 2, cx, cy - 35, 28);
  fillG.addColorStop(0, '#F8F0D0');
  fillG.addColorStop(0.5, '#EDD898');
  fillG.addColorStop(1, 'rgba(230,200,120,0)');
  ctx.beginPath();
  ctx.ellipse(cx, cy - 38, 22, 14, 0, 0, Math.PI * 2);
  ctx.fillStyle = fillG;
  ctx.fill();

  // Highlight
  const hl = ctx.createRadialGradient(cx - 60, cy - 55, 5, cx - 40, cy - 40, 80);
  hl.addColorStop(0, 'rgba(255,248,220,0.5)');
  hl.addColorStop(1, 'rgba(255,248,220,0)');
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = hl;
  ctx.fill();

  save(c, 'food-04-kamja-pan.png');
}

// ── FOOD 05: プリン (Pudding) ─────────────────────────────────────────────
function food05() {
  const { c, ctx } = base();
  const cx = 400, cy = 360;
  const pw = 220, ph = 180;

  // Shadow
  ctx.beginPath();
  const sg = ctx.createRadialGradient(cx, cy + ph * 0.62, 10, cx, cy + ph * 0.62, pw * 0.55);
  sg.addColorStop(0, 'rgba(80,40,0,0.2)');
  sg.addColorStop(1, 'rgba(80,40,0,0)');
  ctx.fillStyle = sg;
  ctx.ellipse(cx, cy + ph * 0.6, pw * 0.5, ph * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pudding body (trapezoid-ish dome shape)
  ctx.save();
  ctx.beginPath();
  // Bottom ellipse
  ctx.ellipse(cx, cy + ph * 0.4, pw * 0.48, ph * 0.14, 0, 0, Math.PI);
  // left side
  ctx.lineTo(cx - pw * 0.45, cy - ph * 0.15);
  // top dome
  ctx.ellipse(cx, cy - ph * 0.15, pw * 0.45, ph * 0.35, 0, Math.PI, 0);
  // right side
  ctx.lineTo(cx + pw * 0.48, cy + ph * 0.4);
  ctx.closePath();

  const bodyG = ctx.createLinearGradient(cx - pw * 0.5, cy - ph * 0.5, cx + pw * 0.5, cy + ph * 0.5);
  bodyG.addColorStop(0, '#F8D878');
  bodyG.addColorStop(0.4, '#E8B840');
  bodyG.addColorStop(0.8, '#C88E18');
  bodyG.addColorStop(1, '#A86A08');
  ctx.fillStyle = bodyG;
  ctx.fill();
  ctx.restore();

  // Caramel sauce on top — dark amber pool
  const caramelG = ctx.createRadialGradient(cx, cy - ph * 0.2, 5, cx, cy - ph * 0.1, pw * 0.38);
  caramelG.addColorStop(0, '#8B3A00');
  caramelG.addColorStop(0.4, '#A84A08');
  caramelG.addColorStop(0.7, '#C86818');
  caramelG.addColorStop(1, 'rgba(180,90,20,0)');
  ctx.beginPath();
  ctx.ellipse(cx, cy - ph * 0.15, pw * 0.42, ph * 0.32, 0, 0, Math.PI * 2);
  ctx.fillStyle = caramelG;
  ctx.fill();

  // Caramel drips down the sides
  ctx.save();
  ctx.globalAlpha = 0.7;
  for (let i = -1; i <= 1; i++) {
    const drx = cx + i * 60;
    const caramDrip = ctx.createLinearGradient(drx, cy - ph * 0.05, drx, cy + ph * 0.25);
    caramDrip.addColorStop(0, 'rgba(140,60,5,0.85)');
    caramDrip.addColorStop(1, 'rgba(180,90,20,0)');
    ctx.beginPath();
    ctx.ellipse(drx, cy + ph * 0.1, 12, 55, i * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = caramDrip;
    ctx.fill();
  }
  ctx.restore();

  // Body highlight (translucent sheen)
  const hl = ctx.createRadialGradient(cx - 50, cy - ph * 0.1, 5, cx - 20, cy + ph * 0.1, 100);
  hl.addColorStop(0, 'rgba(255,248,200,0.4)');
  hl.addColorStop(1, 'rgba(255,248,200,0)');
  ctx.beginPath();
  ctx.save();
  ctx.ellipse(cx, cy - ph * 0.1, pw * 0.44, ph * 0.6, 0, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = hl;
  ctx.fillRect(cx - pw, cy - ph, pw * 2, ph * 2);
  ctx.restore();

  save(c, 'food-05-pudding.png');
}

// ── FOOD 06: バターサンドクッキー (Butter Sand Cookie) ───────────────────
function food06() {
  const { c, ctx } = base();
  const cx = 400, cy = 360, r = 155;

  // Shadow
  ctx.beginPath();
  const sg = ctx.createRadialGradient(cx, cy + r * 0.85, 8, cx, cy + r * 0.85, r * 0.62);
  sg.addColorStop(0, 'rgba(80,55,20,0.18)');
  sg.addColorStop(1, 'rgba(80,55,20,0)');
  ctx.fillStyle = sg;
  ctx.ellipse(cx, cy + r * 0.82, r * 0.6, r * 0.13, 0, 0, Math.PI * 2);
  ctx.fill();

  // Bottom cookie layer
  const bot = ctx.createRadialGradient(cx - 30, cy + 20, 10, cx + 20, cy + 30, r);
  bot.addColorStop(0, '#E8C878');
  bot.addColorStop(0.5, '#C8963A');
  bot.addColorStop(1, '#9A6818');
  ctx.beginPath();
  ctx.arc(cx, cy + 22, r, 0, Math.PI * 2);
  ctx.fillStyle = bot;
  ctx.fill();

  // Cream filling band (visible at middle)
  const cream = ctx.createLinearGradient(cx, cy - 10, cx, cy + 18);
  cream.addColorStop(0, '#FFFEF5');
  cream.addColorStop(0.5, '#FFF8E8');
  cream.addColorStop(1, '#FFEFCc');
  ctx.beginPath();
  ctx.arc(cx, cy + 5, r - 3, Math.PI, 0);
  ctx.lineTo(cx + r - 3, cy + 18);
  ctx.arc(cx, cy + 18, r - 3, 0, Math.PI);
  ctx.closePath();
  ctx.fillStyle = cream;
  ctx.fill();

  // Top cookie layer
  const top = ctx.createRadialGradient(cx - 45, cy - 55, 8, cx, cy - 18, r);
  top.addColorStop(0, '#F0D070');
  top.addColorStop(0.3, '#D4A030');
  top.addColorStop(0.7, '#B07820');
  top.addColorStop(1, '#8A5415');
  ctx.beginPath();
  ctx.arc(cx, cy - 20, r, Math.PI, 0);
  ctx.closePath();
  ctx.fillStyle = top;
  ctx.fill();

  // Cookie texture — small dots/holes
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy - 20, r - 2, Math.PI, 0);
  ctx.closePath();
  ctx.clip();
  ctx.fillStyle = 'rgba(100,60,10,0.12)';
  const dotPos = [
    {x:-80,y:-60},{x:-30,y:-80},{x:30,y:-70},{x:80,y:-55},
    {x:-100,y:-30},{x:0,y:-40},{x:100,y:-30},{x:-50,y:-10},
    {x:50,y:-15},{x:-120,y:0},{x:120,y:0}
  ];
  for (const d of dotPos) {
    ctx.beginPath();
    ctx.arc(cx + d.x, cy + d.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Highlight
  const hl = ctx.createRadialGradient(cx - 55, cy - 75, 5, cx - 35, cy - 55, 80);
  hl.addColorStop(0, 'rgba(255,245,200,0.5)');
  hl.addColorStop(1, 'rgba(255,245,200,0)');
  ctx.beginPath();
  ctx.arc(cx, cy - 20, r, Math.PI, 0);
  ctx.closePath();
  ctx.fillStyle = hl;
  ctx.fill();

  // Cream edge highlight
  const cedge = ctx.createLinearGradient(cx - r, cy + 5, cx + r, cy + 5);
  cedge.addColorStop(0, 'rgba(255,255,255,0)');
  cedge.addColorStop(0.5, 'rgba(255,255,255,0.7)');
  cedge.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.beginPath();
  ctx.rect(cx - r, cy - 4, r * 2, 28);
  ctx.fillStyle = cedge;
  ctx.fill();

  save(c, 'food-06-butter-sand-cookie.png');
}

// ── FOOD 07: フレッシュグミ (Fresh Gummy) ─────────────────────────────────
function food07() {
  const { c, ctx } = base();

  // Scattered gummy candies arrangement
  const gummies = [
    {x:320, y:320, rx:62, ry:48, color:'#FF5580', light:'#FF88A8', angle:-0.15, label:'STRAW'},
    {x:480, y:305, rx:58, ry:44, color:'#FFAA00', light:'#FFD060', angle:0.2, label:'MANGO'},
    {x:250, y:430, rx:55, ry:42, color:'#60C830', light:'#98E060', angle:-0.3, label:'APPLE'},
    {x:420, y:430, rx:60, ry:46, color:'#9050F0', light:'#C090FF', angle:0.1, label:'GRAPE'},
    {x:555, y:415, rx:56, ry:43, color:'#FF6820', light:'#FFA060', angle:-0.2, label:'ORANGE'},
    {x:350, y:530, rx:52, ry:40, color:'#E81060', light:'#FF5090', angle:0.25, label:'BERRY'},
    {x:490, y:530, rx:54, ry:41, color:'#20B8E8', light:'#70D8F8', angle:-0.1, label:'SODA'},
  ];

  for (const g of gummies) {
    ctx.save();
    ctx.translate(g.x, g.y);
    ctx.rotate(g.angle);

    // Drop shadow
    ctx.beginPath();
    ctx.ellipse(4, 6, g.rx, g.ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fill();

    // Gummy body
    const bodyG = ctx.createRadialGradient(-g.rx * 0.2, -g.ry * 0.2, g.ry * 0.1, g.rx * 0.1, g.ry * 0.1, g.rx * 1.2);
    bodyG.addColorStop(0, g.light);
    bodyG.addColorStop(0.5, g.color);
    bodyG.addColorStop(1, g.color + 'CC');
    ctx.beginPath();
    ctx.ellipse(0, 0, g.rx, g.ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = bodyG;
    ctx.globalAlpha = 0.88;
    ctx.fill();

    // Shine
    ctx.globalAlpha = 1;
    const shine = ctx.createRadialGradient(-g.rx * 0.3, -g.ry * 0.35, 2, -g.rx * 0.15, -g.ry * 0.2, g.rx * 0.5);
    shine.addColorStop(0, 'rgba(255,255,255,0.75)');
    shine.addColorStop(0.6, 'rgba(255,255,255,0.15)');
    shine.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = shine;
    ctx.fill();

    ctx.restore();
  }

  save(c, 'food-07-fresh-gummy.png');
}

// ── DRINK helpers ─────────────────────────────────────────────────────────
function drawGlass(ctx, cx, cy, w, h, liqColor, liqColor2, foamColor, hasIce = false, hasBubbles = false) {
  const gw = w, gh = h;

  // Shadow
  ctx.beginPath();
  const sg = ctx.createRadialGradient(cx, cy + gh / 2 + 18, 5, cx, cy + gh / 2 + 18, gw * 0.55);
  sg.addColorStop(0, 'rgba(0,0,0,0.15)');
  sg.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = sg;
  ctx.ellipse(cx, cy + gh / 2 + 15, gw * 0.5, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Glass shape (slightly tapered)
  const glassPath = () => {
    ctx.beginPath();
    ctx.moveTo(cx - gw * 0.38, cy - gh / 2);
    ctx.lineTo(cx - gw / 2, cy + gh / 2);
    ctx.ellipse(cx, cy + gh / 2, gw / 2, 14, 0, Math.PI, 0);
    ctx.lineTo(cx + gw * 0.38, cy - gh / 2);
    ctx.ellipse(cx, cy - gh / 2, gw * 0.38, 10, 0, 0, Math.PI);
    ctx.closePath();
  };

  // Liquid fill
  ctx.save();
  glassPath();
  ctx.clip();

  if (liqColor2) {
    const liqG = ctx.createLinearGradient(cx, cy - gh / 2, cx, cy + gh / 2);
    liqG.addColorStop(0, liqColor2);
    liqG.addColorStop(0.45, liqColor2);
    liqG.addColorStop(0.5, liqColor);
    liqG.addColorStop(1, liqColor);
    ctx.fillStyle = liqG;
  } else {
    const liqG = ctx.createLinearGradient(cx - gw / 2, cy, cx + gw / 2, cy);
    liqG.addColorStop(0, liqColor + 'DD');
    liqG.addColorStop(0.5, liqColor);
    liqG.addColorStop(1, liqColor + 'AA');
    ctx.fillStyle = liqG;
  }
  ctx.fillRect(cx - gw, cy - gh / 2, gw * 2, gh);

  // Ice cubes
  if (hasIce) {
    const icePos = [{x:-40,y:30},{x:10,y:50},{x:45,y:20},{x:-15,y:65},{x:30,y:75}];
    for (const ip of icePos) {
      const is = 32;
      ctx.save();
      ctx.translate(cx + ip.x, cy + ip.y);
      ctx.rotate(ip.x * 0.04);
      const iceG = ctx.createLinearGradient(-is/2, -is/2, is/2, is/2);
      iceG.addColorStop(0, 'rgba(220,240,255,0.85)');
      iceG.addColorStop(1, 'rgba(180,215,245,0.65)');
      ctx.fillStyle = iceG;
      ctx.strokeStyle = 'rgba(180,210,240,0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-is/2, -is/2, is, is, 4);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }

  // Bubbles
  if (hasBubbles) {
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    for (let i = 0; i < 18; i++) {
      const bx = cx + (Math.random() - 0.5) * gw * 0.7;
      const by = cy + (Math.random() - 0.2) * gh * 0.5;
      const br = 2 + Math.random() * 4;
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();

  // Glass walls
  glassPath();
  const glassG = ctx.createLinearGradient(cx - gw / 2, cy, cx + gw / 2, cy);
  glassG.addColorStop(0, 'rgba(255,255,255,0.55)');
  glassG.addColorStop(0.08, 'rgba(255,255,255,0.12)');
  glassG.addColorStop(0.5, 'rgba(255,255,255,0.04)');
  glassG.addColorStop(0.92, 'rgba(255,255,255,0.08)');
  glassG.addColorStop(1, 'rgba(255,255,255,0.45)');
  ctx.strokeStyle = 'rgba(200,225,255,0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = glassG;
  ctx.fill();

  // Foam / cream top
  if (foamColor) {
    ctx.save();
    glassPath();
    ctx.clip();
    const fh = gh * 0.08;
    const foamG = ctx.createLinearGradient(cx, cy - gh / 2, cx, cy - gh / 2 + fh * 2);
    foamG.addColorStop(0, foamColor);
    foamG.addColorStop(1, foamColor + '00');
    ctx.fillStyle = foamG;
    ctx.fillRect(cx - gw, cy - gh / 2, gw * 2, fh * 2.5);
    ctx.restore();
  }

  // Top rim highlight
  ctx.beginPath();
  ctx.ellipse(cx, cy - gh / 2, gw * 0.38, 10, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function drawMugCup(ctx, cx, cy, w, h, bodyColor, steamColor) {
  const sh = ctx.createRadialGradient(cx, cy + h / 2 + 18, 5, cx, cy + h / 2 + 18, w * 0.55);
  sh.addColorStop(0, 'rgba(0,0,0,0.14)');
  sh.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.beginPath();
  ctx.fillStyle = sh;
  ctx.ellipse(cx, cy + h / 2 + 15, w * 0.5, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // Saucer
  const saucerG = ctx.createRadialGradient(cx - 30, cy + h / 2 + 5, 5, cx, cy + h / 2 + 10, w * 0.55);
  saucerG.addColorStop(0, '#F5F0E8');
  saucerG.addColorStop(1, '#D8CFC0');
  ctx.beginPath();
  ctx.ellipse(cx, cy + h / 2 + 10, w * 0.52, 16, 0, 0, Math.PI * 2);
  ctx.fillStyle = saucerG;
  ctx.fill();

  // Cup body
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx - w / 2 + 12, cy - h / 2);
  ctx.lineTo(cx - w / 2, cy + h / 2 - 5);
  ctx.quadraticCurveTo(cx - w / 2, cy + h / 2, cx - w / 2 + 8, cy + h / 2);
  ctx.lineTo(cx + w / 2 - 8, cy + h / 2);
  ctx.quadraticCurveTo(cx + w / 2, cy + h / 2, cx + w / 2, cy + h / 2 - 5);
  ctx.lineTo(cx + w / 2 - 12, cy - h / 2);
  ctx.ellipse(cx, cy - h / 2, w / 2 - 12, 10, 0, Math.PI, 0);
  ctx.closePath();

  const bodyG = ctx.createLinearGradient(cx - w / 2, cy, cx + w / 2, cy);
  bodyG.addColorStop(0, '#F0EBE0');
  bodyG.addColorStop(0.1, '#FBF8F3');
  bodyG.addColorStop(0.5, '#FFFEFB');
  bodyG.addColorStop(0.9, '#F5F0E5');
  bodyG.addColorStop(1, '#E0DAD0');
  ctx.fillStyle = bodyG;
  ctx.fill();

  // Liquid inside
  ctx.beginPath();
  ctx.ellipse(cx, cy, w / 2 - 18, 10, 0, 0, Math.PI * 2);
  ctx.fillStyle = bodyColor;
  ctx.fill();

  // Liquid pool depth
  const liquidG = ctx.createLinearGradient(cx, cy - 10, cx, cy + h / 2 - 8);
  liquidG.addColorStop(0, bodyColor + 'FF');
  liquidG.addColorStop(1, bodyColor + 'CC');
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx - w / 2 + 18, cy);
  ctx.lineTo(cx - w / 2 + 1, cy + h / 2 - 8);
  ctx.lineTo(cx + w / 2 - 1, cy + h / 2 - 8);
  ctx.lineTo(cx + w / 2 - 18, cy);
  ctx.ellipse(cx, cy, w / 2 - 18, 10, 0, Math.PI, 0);
  ctx.closePath();
  ctx.fillStyle = liquidG;
  ctx.fill();
  ctx.restore();

  // Handle
  ctx.beginPath();
  ctx.moveTo(cx + w / 2 - 12, cy - h * 0.1);
  ctx.quadraticCurveTo(cx + w / 2 + 55, cy - h * 0.1, cx + w / 2 + 55, cy + h * 0.15);
  ctx.quadraticCurveTo(cx + w / 2 + 55, cy + h * 0.4, cx + w / 2 - 12, cy + h * 0.35);
  ctx.strokeStyle = '#E0DAD0';
  ctx.lineWidth = 14;
  ctx.stroke();
  ctx.strokeStyle = '#F0ECE5';
  ctx.lineWidth = 7;
  ctx.stroke();

  // Cup rim top
  ctx.beginPath();
  ctx.ellipse(cx, cy - h / 2, w / 2 - 12, 10, 0, 0, Math.PI * 2);
  const rimG = ctx.createLinearGradient(cx - w/2, cy-h/2, cx + w/2, cy-h/2);
  rimG.addColorStop(0, '#E5E0D8');
  rimG.addColorStop(0.5, '#F8F5F0');
  rimG.addColorStop(1, '#E0DBD3');
  ctx.fillStyle = rimG;
  ctx.fill();
  ctx.restore();

  // Steam wisps
  if (steamColor) {
    for (let i = -1; i <= 1; i++) {
      const sx = cx + i * 28;
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.strokeStyle = steamColor;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(sx, cy - h / 2 - 10);
      ctx.quadraticCurveTo(sx + 12 * (i === 0 ? 1 : -i), cy - h / 2 - 45, sx, cy - h / 2 - 80);
      ctx.quadraticCurveTo(sx - 10 * (i === 0 ? 1 : -i), cy - h / 2 - 110, sx, cy - h / 2 - 140);
      ctx.stroke();
      ctx.restore();
    }
  }
}

// ── DRINK 01: 抹茶オーレ (Matcha Olé) ────────────────────────────────────
function drink01() {
  const { c, ctx } = base();
  drawGlass(ctx, 400, 380, 200, 280, '#4A8040', '#F5F0E5', 'rgba(255,255,240,0.85)', true, false);

  // Matcha powder dusting on foam
  ctx.save();
  ctx.globalAlpha = 0.4;
  const matchaG = ctx.createRadialGradient(400, 240, 5, 400, 240, 80);
  matchaG.addColorStop(0, '#6A9448');
  matchaG.addColorStop(1, 'rgba(100,140,60,0)');
  ctx.fillStyle = matchaG;
  ctx.beginPath();
  ctx.ellipse(400, 242, 76, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Warabimochi spheres at bottom
  ctx.save();
  ctx.beginPath();
  ctx.rect(300, 340, 200, 180);
  ctx.clip();
  const mochiPos = [{x:370,y:460},{x:400,y:480},{x:430,y:458},{x:385,y:500},{x:415,y:498}];
  for (const m of mochiPos) {
    const mg = ctx.createRadialGradient(m.x - 4, m.y - 4, 2, m.x, m.y, 16);
    mg.addColorStop(0, '#E8D8B0');
    mg.addColorStop(1, '#C0A060');
    ctx.beginPath();
    ctx.arc(m.x, m.y, 14, 0, Math.PI * 2);
    ctx.fillStyle = mg;
    ctx.fill();
  }
  ctx.restore();

  save(c, 'drink-01-matcha-ole.png');
}

// ── DRINK 02: ほうじ茶オーレ (Hojicha Olé) ───────────────────────────────
function drink02() {
  const { c, ctx } = base();
  drawGlass(ctx, 400, 380, 200, 280, '#8B5E38', '#F5F0E5', 'rgba(255,250,240,0.9)', true, false);

  // Hojicha layer tinting
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = '#6A3A15';
  ctx.beginPath();
  ctx.ellipse(400, 380, 90, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Warabimochi at bottom
  ctx.save();
  ctx.beginPath();
  ctx.rect(300, 340, 200, 180);
  ctx.clip();
  const mochiPos = [{x:370,y:460},{x:400,y:480},{x:430,y:458},{x:385,y:500},{x:415,y:498}];
  for (const m of mochiPos) {
    const mg = ctx.createRadialGradient(m.x - 4, m.y - 4, 2, m.x, m.y, 16);
    mg.addColorStop(0, '#E8D0A0');
    mg.addColorStop(1, '#B89050');
    ctx.beginPath();
    ctx.arc(m.x, m.y, 14, 0, Math.PI * 2);
    ctx.fillStyle = mg;
    ctx.fill();
  }
  ctx.restore();

  save(c, 'drink-02-hojicha-ole.png');
}

// ── DRINK 03: 糸島れもんレモネード (Itoshima Lemonade) ───────────────────
function drink03() {
  const { c, ctx } = base();
  drawGlass(ctx, 400, 380, 200, 280, '#F8D830', '#FFFAF0', null, false, false);

  // Lemon slice floating on top
  const lx = 418, ly = 245;
  // Lemon circle
  const lemG = ctx.createRadialGradient(lx - 8, ly - 8, 3, lx, ly, 32);
  lemG.addColorStop(0, '#FFF068');
  lemG.addColorStop(0.6, '#F0C820');
  lemG.addColorStop(1, '#D8A010');
  ctx.beginPath();
  ctx.arc(lx, ly, 32, 0, Math.PI * 2);
  ctx.fillStyle = lemG;
  ctx.fill();

  // Lemon segments
  ctx.save();
  ctx.translate(lx, ly);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(29 * Math.cos(a), 29 * Math.sin(a));
    ctx.strokeStyle = 'rgba(200,160,0,0.35)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();

  // Center pith
  ctx.beginPath();
  ctx.arc(lx, ly, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#FFF8B0';
  ctx.fill();

  // Lemon rind
  ctx.beginPath();
  ctx.arc(lx, ly, 32, 0, Math.PI * 2);
  ctx.strokeStyle = '#D89810';
  ctx.lineWidth = 4;
  ctx.stroke();

  save(c, 'drink-03-itoshima-lemonade.png');
}

// ── DRINK 04: 糸島れもんスカッシュ (Itoshima Squash) ─────────────────────
function drink04() {
  const { c, ctx } = base();
  drawGlass(ctx, 400, 380, 200, 280, '#F8E040', '#FEFFF5', null, false, true);

  // Lemon slice
  const lx = 415, ly = 245;
  const lemG = ctx.createRadialGradient(lx - 8, ly - 8, 3, lx, ly, 30);
  lemG.addColorStop(0, '#FFF870');
  lemG.addColorStop(0.6, '#F0D020');
  lemG.addColorStop(1, '#D8A810');
  ctx.beginPath();
  ctx.arc(lx, ly, 30, 0, Math.PI * 2);
  ctx.fillStyle = lemG;
  ctx.fill();
  ctx.save();
  ctx.translate(lx, ly);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(27 * Math.cos(a), 27 * Math.sin(a));
    ctx.strokeStyle = 'rgba(200,160,0,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();
  ctx.beginPath();
  ctx.arc(lx, ly, 30, 0, Math.PI * 2);
  ctx.strokeStyle = '#D8A010';
  ctx.lineWidth = 4;
  ctx.stroke();

  // More prominent bubbles rising
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(300, 240);
  ctx.lineTo(500, 240);
  ctx.lineTo(500, 520);
  ctx.lineTo(300, 520);
  ctx.clip();
  for (let i = 0; i < 30; i++) {
    const bx = 310 + Math.random() * 180;
    const by = 260 + Math.random() * 230;
    const br = 2 + Math.random() * 5;
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();

  save(c, 'drink-04-itoshima-squash.png');
}

// ── DRINK 05: 濃厚オレンジジュース (Rich Orange Juice) ────────────────────
function drink05() {
  const { c, ctx } = base();
  drawGlass(ctx, 400, 390, 210, 260, '#F07018', '#FFF8F0', null, false, false);

  // Orange slice
  const ox = 412, oy = 250;
  const org = ctx.createRadialGradient(ox - 10, oy - 10, 4, ox, oy, 34);
  org.addColorStop(0, '#FFD060');
  org.addColorStop(0.5, '#FF8020');
  org.addColorStop(1, '#C85010');
  ctx.beginPath();
  ctx.arc(ox, oy, 34, 0, Math.PI * 2);
  ctx.fillStyle = org;
  ctx.fill();
  ctx.save();
  ctx.translate(ox, oy);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(31 * Math.cos(a), 31 * Math.sin(a));
    ctx.strokeStyle = 'rgba(180,80,10,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();
  ctx.beginPath();
  ctx.arc(ox, oy, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#FFE888';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(ox, oy, 34, 0, Math.PI * 2);
  ctx.strokeStyle = '#C05010';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Pulp texture hint
  ctx.save();
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = '#FF6010';
  for (let i = 0; i < 20; i++) {
    const px = 310 + Math.random() * 180;
    const py = 300 + Math.random() * 200;
    ctx.beginPath();
    ctx.ellipse(px, py, 3, 6, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  save(c, 'drink-05-rich-orange-juice.png');
}

// ── DRINK 06: アイスコーヒー (Iced Coffee) ────────────────────────────────
function drink06() {
  const { c, ctx } = base();
  drawGlass(ctx, 400, 380, 195, 275, '#1A0A02', '#F5EED8', 'rgba(240,220,180,0.6)', true, false);

  // Coffee darkness visible through glass
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = '#1A0A02';
  ctx.fillRect(310, 380, 180, 120);
  ctx.restore();

  save(c, 'drink-06-iced-coffee.png');
}

// ── DRINK 07: ホットコーヒー (Hot Coffee) ─────────────────────────────────
function drink07() {
  const { c, ctx } = base();
  drawMugCup(ctx, 400, 390, 200, 160, '#1C0A02', '#888');
  save(c, 'drink-07-hot-coffee.png');
}

// ── RUN ALL ───────────────────────────────────────────────────────────────
food01();
food02();
food03();
food04();
food05();
food06();
food07();
drink01();
drink02();
drink03();
drink04();
drink05();
drink06();
drink07();
console.log('All 14 images generated!');
