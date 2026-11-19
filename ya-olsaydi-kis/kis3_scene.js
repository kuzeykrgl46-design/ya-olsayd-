// ===== Ya Olsaydı #2 · Kış Bölüm 3: "Kış hiç bitmese Türkiye'yi hangi şehir kurtarır?" =====
// Adana, Rize, Konya, Denizli. TL (scene boundaries, video time) comes from timeline3.js.
let T = 0;
const TL = window.TL || {
  hook: [0, 4.9], guess: 3.4, ada: [4.9, 10.6], adaQuote: 9.1, rize: [10.6, 15], rizeQ: 12.8, konya: [15, 19.5], konyaSled: 17.2,
  den: [19.5, 25.6], denLead: 1.4, horoz: 25.6, cta: 27.7, dur: 30.5,
};
const SUBS = window.SUBS_DATA || [];

function stamp(x, y, text, col, p, s = 1) {
  if (p <= 0) return;
  const k = lerp(2.2, 1, easeOut(clamp(p))) * s;
  ctx.save(); ctx.globalAlpha *= clamp(p * 3); ctx.translate(x, y); ctx.rotate(-.1); ctx.scale(k, k);
  font(900, 40); const w = ctx.measureText(text).width + 50;
  rr(-w / 2, -38, w, 76, 14); ctx.fillStyle = col; ctx.fill();
  ctx.lineWidth = 5; ctx.strokeStyle = '#fff'; rr(-w / 2 + 8, -30, w - 16, 60, 10); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 3);
  ctx.restore();
}

function winterSky(top = '#8fa6bd', bottom = '#d4dfea', h = 1000) {
  const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, top); g.addColorStop(1, bottom);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}

function beanieHead(x, y, r, col, t, i) {
  const bob = Math.sin(t * 2.2 + i) * 4;
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(x, y + bob, r, 0, 7); ctx.fill();
  ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(x - r * .35, y + bob + 2, r * .12, 0, 7); ctx.arc(x + r * .35, y + bob + 2, r * .12, 0, 7); ctx.fill();
  ctx.strokeStyle = '#333'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y + bob + r * .3, r * .3, .2, Math.PI - .2); ctx.stroke(); // happy
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y + bob - r * .15, r * 1.02, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#ffffffcc'; ctx.fillRect(x - r * 1.04, y + bob - r * .25, r * 2.08, r * .28);
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y + bob - r * 1.25, r * .3, 0, 7); ctx.fill();
}

// ---------- Adana: man in shorts at the kebab grill ----------
function adanali(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#c68642'; ctx.fillRect(-20, 50, 15, 80); ctx.fillRect(5, 50, 15, 80);           // bare legs
  ctx.fillStyle = '#333'; rr(-26, 126, 24, 10, 4); ctx.fill(); rr(4, 126, 24, 10, 4); ctx.fill();   // slippers
  ctx.fillStyle = '#f77f00'; rr(-30, 20, 60, 42, 8); ctx.fill();                                     // shorts
  ctx.fillStyle = '#fff'; rr(-30, -42, 60, 70, 14); ctx.fill();                                      // tank top
  ctx.fillStyle = '#c68642'; ctx.fillRect(-22, -42, 10, 18); ctx.fillRect(12, -42, 10, 18);
  ctx.strokeStyle = '#c68642'; ctx.lineWidth = 13; ctx.lineCap = 'round';
  const wave = Math.sin(t * 6) * .25;
  ctx.beginPath(); ctx.moveTo(-28, -32); ctx.lineTo(-44, 20); ctx.stroke();                         // relaxed arm
  ctx.save(); ctx.translate(28, -32); ctx.rotate(-1.1 + wave); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -56); ctx.stroke(); ctx.restore(); // waving
  ctx.fillStyle = '#c68642'; ctx.beginPath(); ctx.arc(0, -66, 27, 0, 7); ctx.fill();
  ctx.fillStyle = '#2b1d14'; ctx.beginPath(); ctx.arc(0, -78, 26, Math.PI, 0); ctx.fill();          // hair
  ctx.fillStyle = '#2b1d14'; rr(-16, -54, 32, 7, 3); ctx.fill();                                     // moustache
  ctx.fillStyle = '#111'; rr(-23, -74, 20, 12, 4); ctx.fill(); rr(3, -74, 20, 12, 4); ctx.fill(); ctx.fillRect(-4, -70, 8, 3); // sunglasses
  ctx.strokeStyle = '#2b1d14'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, -50, 9, .3, Math.PI - .3); ctx.stroke(); // grin
  ctx.restore();
}
function mangal(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#3d3d3d'; ctx.fillRect(-190, 0, 380, 46); ctx.fillRect(-180, 46, 10, 70); ctx.fillRect(170, 46, 10, 70);
  for (let i = 0; i < 14; i++) { const f = .6 + .4 * Math.sin(t * 9 + i * 1.7); ctx.fillStyle = `rgba(255,${Math.round(90 + 80 * f)},0,${.7 + .3 * f})`; rr(-180 + i * 26, -6, 22, 14, 5); ctx.fill(); }
  // flames
  for (let i = 0; i < 7; i++) {
    const fx = -160 + i * 54, h = 40 + 22 * Math.sin(t * 11 + i * 2.3);
    ctx.fillStyle = '#ff9f1c'; ctx.beginPath(); ctx.moveTo(fx - 16, -4); ctx.quadraticCurveTo(fx - 10, -h * .6, fx, -h); ctx.quadraticCurveTo(fx + 10, -h * .6, fx + 16, -4); ctx.fill();
    ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.moveTo(fx - 8, -4); ctx.quadraticCurveTo(fx, -h * .5, fx + 8, -4); ctx.fill();
  }
  // skewers with meat
  ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 5;
  for (let i = 0; i < 4; i++) { const sy = -16 - i * 2, sx = -150 + i * 90; ctx.beginPath(); ctx.moveTo(sx - 20, sy); ctx.lineTo(sx + 90, sy); ctx.stroke(); ctx.fillStyle = '#7f2704'; rr(sx - 6, sy - 9, 72, 18, 9); ctx.fill(); }
  ctx.restore();
  steam(x - 120 * s, y - 40 * s, t, 3, 110, .6); steam(x + 40 * s, y - 40 * s, t + .4, 3, 120, .6);
}
function adanaScene(t) {
  winterSky('#7f93a8', '#cdd9e4', 1000);
  // buildings with snowy roofs
  [[-20, 560, 230, '#e9d8a6'], [200, 620, 200, '#f4a261'], [390, 590, 180, '#e9c46a'], [560, 540, 240, '#ddb892'], [790, 600, 300, '#cb997e']].forEach(([x, y, w, c], i) => {
    ctx.fillStyle = c; ctx.fillRect(x, y, w, 1060 - y); ctx.fillStyle = '#fff'; rr(x - 8, y - 16, w + 16, 26, 10); ctx.fill();
    ctx.fillStyle = '#ffffff99'; for (let r = 0; r < 4; r++) for (let k = 0; k < Math.floor(w / 70); k++) ctx.fillRect(x + 22 + k * 70, y + 50 + r * 95, 34, 50);
  });
  // kebab shop
  ctx.fillStyle = '#6d2e1f'; ctx.fillRect(560, 760, 470, 300);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(590, 850, 410, 180);
  ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.moveTo(540, 760); ctx.lineTo(1050, 760); ctx.lineTo(1030, 840); ctx.lineTo(560, 840); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fff'; for (let i = 0; i < 6; i++) ctx.fillRect(580 + i * 80, 760, 36, 80);
  ctx.fillStyle = '#1d3557'; rr(610, 690, 380, 74, 14); ctx.fill(); ctx.fillStyle = '#fff'; font(900, 50); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ADANA KEBAP', 800, 729);
  ctx.fillStyle = '#fff'; ctx.fillRect(540, 750, 510, 12);
  // ground
  ctx.fillStyle = '#f4f7fb'; ctx.fillRect(0, 1060, W, H - 1060);
  ctx.fillStyle = '#dfe7ef'; ctx.beginPath(); ctx.ellipse(540, 1250, 520, 40, 0, 0, 7); ctx.fill();
  // people warming their hands
  person(640, 1110, 1.15, { shirt: '#264653', hat: '#e63946' });
  person(960, 1115, 1.15, { shirt: '#6d597a', hat: '#2a9d8f' });
  mangal(800, 1150, .95, t);
  adanali(300, 1060, 1.65, t);
  speech(340, 800, 'Bu mu kış? Yak mangalı!', vis(t, TL.adaQuote, TL.ada[1] + .3, .2, .2));
  mapSnowfall(t, 90);
}

// ---------- Rize: frozen tea gardens ----------
function teaGlass(x, y, s, iced, frost) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.ellipse(0, 120, 130, 26, 0, 0, 7); ctx.fill();          // saucer
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(0, 114, 110, 18, 0, 0, 7); ctx.fill();
  const glass = () => { ctx.beginPath(); ctx.moveTo(-62, -130); ctx.bezierCurveTo(-70, -40, -24, -10, -30, 30); ctx.bezierCurveTo(-36, 70, -62, 90, -52, 112); ctx.lineTo(52, 112); ctx.bezierCurveTo(62, 90, 36, 70, 30, 30); ctx.bezierCurveTo(24, -10, 70, -40, 62, -130); ctx.closePath(); };
  ctx.save(); glass(); ctx.clip();
  ctx.fillStyle = iced ? '#c96f3b' : '#a4161a'; ctx.fillRect(-80, -100, 160, 220);
  if (iced) { // ice cubes
    [[-26, -70, .2], [18, -40, -.3], [-10, 10, .5], [20, 60, .1]].forEach(([cx, cy, r]) => { ctx.save(); ctx.translate(cx, cy); ctx.rotate(r); ctx.fillStyle = '#e0fbfcdd'; rr(-22, -22, 44, 44, 8); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); });
  }
  if (frost > 0) { ctx.fillStyle = `rgba(230,245,255,${.55 * frost})`; ctx.fillRect(-80, -140, 160, 260); }
  ctx.restore();
  glass(); ctx.lineWidth = 6; ctx.strokeStyle = '#ffffffcc'; ctx.stroke();
  ctx.fillStyle = '#ffffff88'; rr(-46, -110, 10, 90, 5); ctx.fill();
  if (frost > 0) { ctx.globalAlpha = frost; ctx.fillStyle = '#fff'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-50 + i * 20, -130); ctx.lineTo(-44 + i * 20, -100 - (i % 3) * 12); ctx.lineTo(-38 + i * 20, -130); ctx.fill(); } }
  ctx.restore();
}
function rizeScene(t) {
  winterSky('#6f8faf', '#d7e2ec', 900);
  // mountains behind
  ctx.fillStyle = '#9fb1c4'; ctx.beginPath(); ctx.moveTo(-40, 820); ctx.lineTo(220, 520); ctx.lineTo(430, 700); ctx.lineTo(680, 480); ctx.lineTo(1120, 820); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(160, 590); ctx.lineTo(220, 520); ctx.lineTo(290, 580); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(610, 560); ctx.lineTo(680, 480); ctx.lineTo(760, 545); ctx.closePath(); ctx.fill();
  // terraced tea rows, frozen
  for (let r = 0; r < 10; r++) {
    const y = 760 + r * 62, amp = 18 + r * 2;
    ctx.beginPath(); ctx.moveTo(-20, y + 40);
    for (let x = -20; x <= 1100; x += 40) ctx.lineTo(x, y + Math.sin(x / 140 + r) * amp);
    ctx.lineTo(1100, y + 60); ctx.lineTo(-20, y + 60); ctx.closePath();
    ctx.fillStyle = r % 2 ? '#2d6a4f' : '#40916c'; ctx.fill();
    ctx.beginPath(); for (let x = -20; x <= 1100; x += 40) { const yy = y + Math.sin(x / 140 + r) * amp; x === -20 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); }
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.stroke();
    ctx.fillStyle = '#e0fbfc'; for (let x = 10; x < 1080; x += 70) { const yy = y + Math.sin(x / 140 + r) * amp + 5; ctx.beginPath(); ctx.moveTo(x - 6, yy); ctx.lineTo(x, yy + 18 + (x % 3) * 5); ctx.lineTo(x + 6, yy); ctx.fill(); }
  }
  ctx.fillStyle = '#f4f7fb'; ctx.fillRect(0, 1380, W, H - 1380);
  const iced = t >= TL.rizeQ, frost = clamp((t - TL.rize[0] - .4) / 1.6);
  ctx.save(); ctx.fillStyle = '#0006'; ctx.beginPath(); ctx.ellipse(540, 1250, 280, 40, 0, 0, 7); ctx.fill(); ctx.restore();
  const pop = iced ? lerp(1.25, 1, easeOut(clamp((t - TL.rizeQ) / .3))) : 1;
  teaGlass(540, 1010, 2.0 * pop, iced, iced ? .25 : frost);
  if (iced) pill('BUZLU ÇAY 🧊', 540, 650, { size: 44, bg: '#4cc9f0', fg: '#111', alpha: clamp((t - TL.rizeQ) / .25) });
  mapSnowfall(t, 110);
}

// ---------- Konya: the plain becomes an ice rink ----------
function skater(x, y, s, col, t, i) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(t * 3 + i) * .12);
  ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 13; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-6, 40); ctx.lineTo(-24, 96); ctx.moveTo(6, 40); ctx.lineTo(30, 90); ctx.stroke();
  ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-40, 102); ctx.lineTo(-8, 102); ctx.moveTo(14, 96); ctx.lineTo(46, 96); ctx.stroke();
  ctx.fillStyle = col; rr(-26, -30, 52, 74, 14); ctx.fill();
  ctx.strokeStyle = col; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-22, -18); ctx.lineTo(-62, 0); ctx.moveTo(22, -18); ctx.lineTo(62, -10); ctx.stroke();
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -52, 21, 0, 7); ctx.fill();
  ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.arc(0, -58, 22, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#e63946'; ctx.fillRect(-20, -34, 40, 10); // scarf
  ctx.restore();
}
function konyaScene(t) {
  winterSky('#7b9cc0', '#e3ecf5', 820);
  // Mevlana's turquoise dome on the horizon
  ctx.fillStyle = '#8d99ae'; ctx.fillRect(700, 760, 220, 60); ctx.beginPath(); ctx.arc(760, 760, 44, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#2ec4b6'; ctx.fillRect(842, 690, 46, 80); ctx.beginPath(); ctx.moveTo(836, 692); ctx.lineTo(865, 600); ctx.lineTo(894, 692); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(851, 646); ctx.lineTo(865, 600); ctx.lineTo(879, 646); ctx.closePath(); ctx.fill();
  // endless flat ice
  const g = ctx.createLinearGradient(0, 820, 0, H); g.addColorStop(0, '#cfe8f3'); g.addColorStop(1, '#9fd3e8');
  ctx.fillStyle = g; ctx.fillRect(0, 820, W, H - 820);
  ctx.strokeStyle = '#ffffffaa'; ctx.lineWidth = 6;
  for (let i = 0; i < 9; i++) { const y = 870 + i * 60, x = (i * 230 + t * 40) % 1300 - 200; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 160 + i * 10, y + 8); ctx.stroke(); }
  ctx.strokeStyle = '#ffffff55'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 821); ctx.lineTo(W, 821); ctx.stroke();
  // skaters gliding
  skater(((t * 90) % 1400) - 200, 1000, .85, '#ffb703', t, 0);
  skater(1200 - ((t * 70 + 500) % 1400), 1090, 1.0, '#8338ec', t, 1);
  skater(((t * 110 + 800) % 1400) - 200, 1180, 1.15, '#06d6a0', t, 2);
  // road sign
  const sp = clamp((t - TL.konyaSled + .2) / .35);
  if (sp > 0) {
    ctx.save(); ctx.translate(230, 1010); ctx.scale(lerp(.3, 1, backOut(sp)), lerp(.3, 1, backOut(sp))); ctx.globalAlpha = clamp(sp * 2);
    ctx.fillStyle = '#6c757d'; ctx.fillRect(-8, 0, 16, 180);
    rr(-150, -110, 300, 120, 14); ctx.fillStyle = '#1d4e89'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = '#fff'; rr(-142, -102, 284, 104, 10); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; font(900, 40); ctx.fillText('KARAMAN', 0, -72); font(800, 36); ctx.fillText('→ 10 dk', 0, -26);
    ctx.restore();
  }
  // sled zooming across
  const p = prog(t, TL.konyaSled, TL.konyaSled + 1.6);
  if (p > 0 && p < 1) {
    const x = lerp(-250, 1350, easeOut(p)), y = 1150;
    ctx.strokeStyle = '#ffffffcc'; ctx.lineWidth = 6; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x - 120 - i * 30, y - 60 + i * 22); ctx.lineTo(x - 320 - i * 40, y - 60 + i * 22); ctx.stroke(); }
    ctx.save(); ctx.translate(x, y); ctx.rotate(-.06);
    ctx.fillStyle = '#264653'; rr(-34, -86, 60, 70, 14); ctx.fill();
    ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(-2, -108, 22, 0, 7); ctx.fill();
    ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.arc(-2, -114, 23, Math.PI, 0); ctx.fill();
    ctx.strokeStyle = '#264653'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(10, -70); ctx.lineTo(70, -10); ctx.stroke();
    ctx.restore();
    sled(x, y, 1.3, -.06);
  }
  mapSnowfall(t, 80);
}

// ---------- Denizli: Pamukkale's warm pools ----------
function rooster(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#e9a23b'; ctx.lineWidth = 7; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-10, 20); ctx.lineTo(-14, 110); ctx.lineTo(-30, 118); ctx.moveTo(14, 20); ctx.lineTo(16, 110); ctx.lineTo(0, 118); ctx.stroke(); // long legs
  ctx.fillStyle = '#1b4332'; ctx.beginPath(); ctx.moveTo(-30, -10); ctx.quadraticCurveTo(-110, -90, -90, 30); ctx.quadraticCurveTo(-70, -20, -30, 20); ctx.fill(); // tail
  ctx.fillStyle = '#2d6a4f'; ctx.beginPath(); ctx.moveTo(-34, 0); ctx.quadraticCurveTo(-95, -40, -80, 50); ctx.quadraticCurveTo(-60, 10, -34, 24); ctx.fill();
  ctx.fillStyle = '#9d0208'; ctx.beginPath(); ctx.ellipse(0, 0, 48, 34, -.2, 0, 7); ctx.fill(); // body
  ctx.fillStyle = '#6a040f'; ctx.beginPath(); ctx.ellipse(-6, 6, 30, 18, -.3, 0, 7); ctx.fill(); // wing
  ctx.fillStyle = '#9d0208'; ctx.beginPath(); ctx.moveTo(20, -20); ctx.quadraticCurveTo(40, -70, 34, -100); ctx.lineTo(54, -100); ctx.quadraticCurveTo(58, -60, 40, -10); ctx.fill(); // long neck
  ctx.fillStyle = '#9d0208'; ctx.beginPath(); ctx.arc(44, -108, 18, 0, 7); ctx.fill();
  ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.arc(38, -128, 7, 0, 7); ctx.arc(48, -130, 8, 0, 7); ctx.arc(57, -125, 6, 0, 7); ctx.fill(); // comb
  ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.ellipse(56, -94, 5, 9, 0, 0, 7); ctx.fill(); // wattle
  ctx.fillStyle = '#ffb703'; ctx.beginPath(); ctx.moveTo(60, -110); ctx.lineTo(78, -104); ctx.lineTo(60, -100); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(48, -112, 4, 0, 7); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(49, -112, 2, 0, 7); ctx.fill();
  ctx.restore();
}
function denizliScene(t) {
  winterSky('#8aa1b8', '#dde6ef', 900);
  ctx.fillStyle = '#c3cfdb'; ctx.beginPath(); ctx.moveTo(-40, 760); ctx.quadraticCurveTo(300, 560, 600, 680); ctx.quadraticCurveTo(850, 590, 1120, 720); ctx.lineTo(1120, 900); ctx.lineTo(-40, 900); ctx.closePath(); ctx.fill();
  // travertine terraces (top to bottom, widening)
  const tiers = [[540, 720, 300], [540, 830, 420], [540, 950, 540], [540, 1080, 660]];
  const cols = ['#ff006e', '#3a86ff', '#ffbe0b', '#8338ec', '#fb5607', '#06d6a0', '#e63946', '#4361ee'];
  let hid = 0;
  tiers.forEach(([cx, y, w], k) => {
    ctx.fillStyle = '#f8f9fa'; ctx.beginPath();
    ctx.moveTo(cx - w, y + 20); for (let i = 0; i <= 8; i++) { const x = cx - w + i * (2 * w / 8); ctx.quadraticCurveTo(x - w / 8, y + 110, x, y + 80); }
    ctx.lineTo(cx + w, y + 20); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#7fd1e8'; ctx.beginPath(); ctx.ellipse(cx, y + 24, w - 10, 38, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#ffffff66'; ctx.beginPath(); ctx.ellipse(cx - w * .3, y + 16, w * .25, 8, 0, 0, 7); ctx.fill();
    const n = 3 + k; for (let i = 0; i < n; i++) { const hx = cx - w + 60 + (i + .5) * ((2 * w - 120) / n); beanieHead(hx, y + 14, 20 + k * 2, cols[hid % cols.length], t, hid); hid++; }
    for (let i = 0; i < 3; i++) steam(cx - w * .6 + i * w * .6, y + 4, t + k * .3 + i * .2, 3, 90, .55);
  });
  ctx.fillStyle = '#f4f7fb'; ctx.fillRect(0, 1180, W, H - 1180);
  ctx.fillStyle = '#e9eef3'; ctx.fillRect(0, 1180, W, 14);
  // the queue (with the Denizli rooster at the end)
  const qp = clamp((t - TL.horoz) / .5);
  if (qp > 0) {
    ctx.save(); ctx.globalAlpha = qp; ctx.translate((1 - easeOut(qp)) * 300, 0);
    person(610, 1190, 1.0, { shirt: '#264653', hat: '#ffbe0b' }); person(710, 1192, 1.0, { shirt: '#9b2226', hat: '#3a86ff' }); person(810, 1190, 1.0, { shirt: '#6d597a', hat: '#06d6a0' });
    rooster(930, 1170, .95, t);
    ctx.restore();
    pill('SIRA ⬅', 760, 1010, { size: 34, bg: '#ffd166', fg: '#111', alpha: qp });
  }
  mapSnowfall(t, 70);
}

// ---------- render ----------
const ADA = [35.32, 37.0], RIZ = [40.52, 41.02], KON = [32.49, 37.87], DEN = [29.09, 37.78];
function render(t) {
  cam = camera(t);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawSea(t); drawMapKis(t, 1); mapSnowfall(t);
  // hook: four question marks on the snowy map
  if (t < TL.hook[1] + .4) {
    [[ADA, 'Adana'], [RIZ, 'Rize'], [KON, 'Konya'], [DEN, 'Denizli']].forEach(([ll], i) => {
      const a = clamp((t - .5 - i * .25) / .3); if (a <= 0) return;
      const [x, y] = P(...ll); ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(backOut(a), backOut(a));
      ctx.beginPath(); ctx.arc(0, 0, 34, 0, 7); ctx.fillStyle = '#ffd166'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = '#fff'; ctx.stroke();
      ctx.fillStyle = '#111'; font(900, 44); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', 0, 3); ctx.restore();
    });
    T = t; snowman(880, 1180, .9);
    title([['KİM', 80, '#fff'], ['KURTARIR?', 110, '#06d6a0']], .15, TL.hook[1], t, 400);
    pill('💬 TAHMİNİNİ YORUMLARA YAZ', W / 2, 1220, { size: 40, bg: '#ffd166', fg: '#111', alpha: vis(t, TL.guess - .1, TL.hook[1], .25, .25) });
  }
  const city = (r, ll, name, verdict, col, scene, lead = 0) => {
    if (t < r[0] - .9 || t > r[1] + .25) return;
    const [cx, cy] = P(...ll), w0 = r[0] + lead;
    if (t >= r[0] - (lead ? .9 : 0) && t < w0 + .2) { cityDot(name, ll, 1, col); stamp(cx, cy - 110, verdict, col, (t - (w0 - .8)) / .35, .9); }
    wipe(cx, cy, (t - (w0 + .05)) / .45, () => scene(t, w0));
    if (t > w0 + .4) stamp(W / 2, 1230, verdict, col, (t - (w0 + .5)) / .3, 1.1);
  };
  city(TL.ada, ADA, 'Adana', 'UMURSAMIYOR 😎', '#f77f00', adanaScene);
  city(TL.rize, RIZ, 'Rize', 'KAYBETTİ ☕', '#e63946', rizeScene);
  city(TL.konya, KON, 'Konya', 'DEV PİST ⛸️', '#3a86ff', konyaScene);
  // Denizli: short map beat for "Peki kim kurtarıyor?", then dive in and stay until the end
  if (t > TL.den[0] - .1 && t < TL.den[0] + TL.denLead + .3) {
    [[ADA, 'Adana', '#f77f00'], [RIZ, 'Rize', '#e63946'], [KON, 'Konya', '#3a86ff']].forEach(([ll, n, c]) => cityDot(n, ll, .55, c));
    title([['PEKİ', 70, '#fff'], ['KİM KURTARIYOR?', 84, '#06d6a0']], TL.den[0], TL.den[0] + TL.denLead + .2, t, 400);
  }
  city([TL.den[0], TL.dur], DEN, 'Denizli', 'KURTARDI ✅', '#06d6a0', denizliScene, TL.denLead);
  if (t < TL.horoz) {
    title([['ADANA', 104, '#fff']], TL.ada[0] + .3, TL.ada[1], t, 360);
    title([['RİZE', 110, '#fff']], TL.rize[0] + .3, TL.rize[1], t, 360);
    title([['KONYA', 104, '#fff']], TL.konya[0] + .3, TL.konya[1], t, 360);
  }
  title([['DENİZLİ', 104, '#fff']], TL.den[0] + TL.denLead + .3, TL.cta, t, 360);
  title([['TAKİPTE KAL', 96, '#ffd166'], ['SIRADAKİ BÖLÜM GELİYOR', 50, '#fff']], TL.cta, 99, t, 380);
  subtitles(t);
  badge();
  if (t < .12) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .12})`; ctx.fillRect(0, 0, W, H); }
}
