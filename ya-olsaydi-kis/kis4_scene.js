// ===== Ya Olsaydı #2 · Kış Bölüm 4 (final): "Kış hiç bitmese sıradan bir gün nasıl geçer?" =====
// Morning duvet, dad shovelling, Kars (viewer request), Sivas, Bursa, evening stove, final card + next-series teaser.
// TL (scene boundaries, video time) comes from timeline4.js.
let T = 0;
const TL = window.TL || {
  hook: [0, 3], sabah: [3, 6.1], quote: 5.3, baba: [6.1, 9.6], again: 7.9, kars: [9.6, 14.3], karsLead: 1.2, sivas: [14.3, 17.5],
  bursa: [17.5, 19.8], aksam: [19.8, 24.8], gece: 22.3, fin: [24.8, 33], next: 26.9, cut: 29.8, ask: 30.4, dur: 33,
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
function mosquito(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#333'; ctx.lineWidth = 3;
  for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 8, 4); ctx.lineTo(i * 18, 26); ctx.stroke(); }
  ctx.fillStyle = '#c8d6e5aa'; ctx.beginPath(); ctx.ellipse(-12, -14, 18, 8, -.6, 0, 7); ctx.ellipse(12, -14, 18, 8, .6, 0, 7); ctx.fill();
  ctx.fillStyle = '#333'; ctx.beginPath(); ctx.ellipse(0, 0, 22, 7, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(24, -2, 7, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(30, -2); ctx.lineTo(48, 4); ctx.stroke();
  ctx.restore();
}
function sceneSlide(t, t0, fn) { const p = easeOut(clamp((t - t0) / .35)); ctx.save(); ctx.translate((1 - p) * W, 0); fn(); ctx.restore(); }

// ---------- morning: kid sent to school wrapped in the duvet ----------
function duvetKid(x, y, s, t) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 8) * 3); ctx.scale(s, s); ctx.rotate(Math.sin(t * 8) * .04);
  ctx.fillStyle = '#3a3a3a'; ctx.fillRect(-20, 80, 14, 40); ctx.fillRect(6, 80, 14, 40);
  ctx.fillStyle = '#4361ee'; ctx.beginPath(); ctx.moveTo(-70, 100); ctx.quadraticCurveTo(-80, -40, -30, -80); ctx.quadraticCurveTo(0, -100, 30, -80); ctx.quadraticCurveTo(80, -40, 70, 100); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#ffffff55'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(-40 + (i % 3) * 40, -10 + Math.floor(i / 3) * 60, 9, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -52, 26, 0, 7); ctx.fill();
  ctx.fillStyle = '#4361ee'; ctx.beginPath(); ctx.arc(0, -60, 34, Math.PI * 1.05, Math.PI * 1.95); ctx.fill();
  ctx.strokeStyle = '#222'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-14, -50); ctx.lineTo(-4, -50); ctx.moveTo(4, -50); ctx.lineTo(14, -50); ctx.stroke(); // sleepy eyes
  ctx.fillStyle = '#e63946'; rr(40, -10, 46, 60, 10); ctx.fill(); ctx.strokeStyle = '#9b2226'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(48, -10); ctx.lineTo(48, -30); ctx.lineTo(78, -30); ctx.lineTo(78, -10); ctx.stroke(); // school bag
  ctx.restore();
}
function sabahScene(t) {
  ctx.fillStyle = '#f6e7cb'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#b08968'; ctx.fillRect(0, 1240, W, H - 1240);
  // window with snow
  ctx.fillStyle = '#8fa6bd'; ctx.fillRect(620, 520, 340, 380); ctx.strokeStyle = '#fff'; ctx.lineWidth = 16; ctx.strokeRect(620, 520, 340, 380); ctx.beginPath(); ctx.moveTo(790, 520); ctx.lineTo(790, 900); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.fillRect(628, 860, 324, 32);
  for (let i = 0; i < 28; i++) { const x = 630 + rnd(i) * 320, y = 530 + ((rnd(i + 50) * 360 + t * 60) % 360); ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill(); }
  // clock
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(250, 640, 80, 0, 7); ctx.fill(); ctx.strokeStyle = '#333'; ctx.lineWidth = 8; ctx.stroke();
  ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(250, 640); ctx.lineTo(250, 585); ctx.moveTo(250, 640); ctx.lineTo(292, 640); ctx.stroke();
  font(900, 34); ctx.fillStyle = '#333'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('07:30', 250, 760);
  mom(300, 1110, 1.5, true);
  duvetKid(680, 1110, 1.5, t);
  speech(380, 860, 'Okula böyle git!', vis(t, TL.quote, TL.sabah[1] + .3, .2, .2));
}

// ---------- dad shovels, snow comes right back ----------
function shovelDad(x, y, s, t) {
  const swing = Math.sin(t * 7) * .35;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#2b2d42'; ctx.fillRect(-18, 40, 14, 60); ctx.fillRect(4, 40, 14, 60);
  ctx.fillStyle = '#6c757d'; rr(-30, -32, 60, 80, 14); ctx.fill();
  ctx.save(); ctx.translate(20, -10); ctx.rotate(.9 + swing);
  ctx.strokeStyle = '#8d6e63'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 120); ctx.stroke();
  ctx.fillStyle = '#e63946'; rr(-26, 110, 52, 40, 6); ctx.fill(); ctx.restore();
  ctx.strokeStyle = '#6c757d'; ctx.lineWidth = 13; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-22, -20); ctx.lineTo(16, 20 + swing * 20); ctx.moveTo(22, -20); ctx.lineTo(28, 10); ctx.stroke();
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -58, 26, 0, 7); ctx.fill();
  ctx.fillStyle = '#ccc'; ctx.beginPath(); ctx.arc(0, -70, 26, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#555'; rr(-16, -48, 32, 7, 3); ctx.fill();
  ctx.strokeStyle = '#222'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-18, -70); ctx.lineTo(-5, -64); ctx.moveTo(18, -70); ctx.lineTo(5, -64); ctx.stroke();
  ctx.restore();
}
function babaScene(t) {
  winterSky('#7f93a8', '#cdd9e4', 1000);
  ctx.fillStyle = '#e9d8a6'; ctx.fillRect(140, 420, 800, 760); ctx.fillStyle = '#fff'; rr(120, 400, 840, 40, 14); ctx.fill();
  ctx.fillStyle = '#6d4c41'; ctx.fillRect(440, 820, 200, 360); ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.arc(610, 1000, 10, 0, 7); ctx.fill();
  ctx.fillStyle = '#bde0fe'; [[200, 560], [700, 560]].forEach(([x, y]) => { ctx.fillRect(x, y, 180, 160); ctx.strokeStyle = '#fff'; ctx.lineWidth = 10; ctx.strokeRect(x, y, 180, 160); });
  ctx.fillStyle = '#f4f7fb'; ctx.fillRect(0, 1180, W, H - 1180);
  // the cleared path refills after "again"
  const refill = clamp((t - TL.again) / 1.2);
  ctx.fillStyle = '#c9d6e2'; ctx.fillRect(420, 1180, 240, 140 * (1 - refill));
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(250, 1190, 160, 60, 0, Math.PI, 0); ctx.fill(); // snow pile
  shovelDad(780, 1110, 1.45, t);
  if (t > TL.again) { mapSnowfall(t * 1.6, 260); pill('❄️ TEKRAR', 540, 760, { size: 46, bg: '#1d3557', fg: '#fff', alpha: clamp((t - TL.again) / .25) }); }
  else mapSnowfall(t, 60);
}

// ---------- Kars: still "summer holiday" ----------
function karsScene(t) {
  winterSky('#7b9cc0', '#e0e8f0', 900);
  ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.arc(860, 560, 70, 0, 7); ctx.fill(); // pale sun
  ctx.fillStyle = '#f4f7fb'; ctx.fillRect(0, 900, W, H - 900);
  ctx.fillStyle = '#dfe7ef'; ctx.beginPath(); ctx.ellipse(540, 1240, 520, 50, 0, 0, 7); ctx.fill();
  umbrella(300, 1050, 1.5, true); umbrella(800, 1060, 1.3, true);
  lounger(300, 1150, 1.6, false); lounger(780, 1160, 1.4, false);
  // a beach ball in the snow
  ctx.save(); ctx.translate(540, 1180 + Math.abs(Math.sin(t * 4)) * -40); ctx.rotate(t * 2);
  ['#e63946', '#fff', '#3a86ff', '#fff', '#ffbe0b', '#fff'].forEach((c, i) => { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 40, i * Math.PI / 3, (i + 1) * Math.PI / 3); ctx.fillStyle = c; ctx.fill(); });
  ctx.restore();
  mapSnowfall(t, 80);
}

// ---------- Sivas: snow up to the balconies ----------
function sivasScene(t) {
  winterSky('#7f93a8', '#d0dbe6', 800);
  [[60, 360, '#cb997e'], [400, 300, '#e9c46a'], [740, 340, '#ddb892']].forEach(([x, y, c]) => {
    ctx.fillStyle = c; ctx.fillRect(x, y, 290, 1200 - y); ctx.fillStyle = '#fff'; rr(x - 10, y - 18, 310, 30, 10); ctx.fill();
    ctx.fillStyle = '#bde0fe'; for (let r = 0; r < 3; r++) for (let k = 0; k < 2; k++) ctx.fillRect(x + 40 + k * 130, y + 50 + r * 150, 80, 90);
    // balcony at snow level
    ctx.fillStyle = '#6d4c41'; ctx.fillRect(x + 90, 860, 110, 150); ctx.strokeStyle = '#495057'; ctx.lineWidth = 6; ctx.strokeRect(x + 60, 980, 170, 40);
    for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x + 70 + i * 30, 980); ctx.lineTo(x + 70 + i * 30, 1020); ctx.stroke(); }
  });
  // snow buried up to the balconies
  ctx.fillStyle = '#f4f7fb'; ctx.beginPath(); ctx.moveTo(0, 1030); for (let x = 0; x <= W; x += 60) ctx.lineTo(x, 1015 + Math.sin(x / 90) * 14); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
  // person walking on the snow into a balcony door
  const p = clamp((t - TL.sivas[0] - .6) / 2.2);
  person(lerp(-60, 545, p), 940, 1.0, { shirt: '#264653', hat: '#e63946' });
  mapSnowfall(t, 120);
}

// ---------- Bursa: traffic up Uludağ ----------
function bursaScene(t) {
  winterSky('#7b9cc0', '#dde6ef', 900);
  ctx.fillStyle = '#9fb1c4'; ctx.beginPath(); ctx.moveTo(-60, 1300); ctx.lineTo(540, 420); ctx.lineTo(1140, 1300); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(400, 620); ctx.lineTo(540, 420); ctx.lineTo(680, 620); ctx.lineTo(600, 590); ctx.lineTo(540, 640); ctx.lineTo(480, 590); ctx.closePath(); ctx.fill();
  // zig-zag road jammed with cars
  const road = [[60, 1260], [900, 1110], [180, 960], [820, 820], [420, 700]];
  ctx.strokeStyle = '#495057'; ctx.lineWidth = 54; ctx.lineJoin = 'round'; ctx.beginPath(); road.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.setLineDash([18, 16]); ctx.stroke(); ctx.setLineDash([]);
  let n = 0;
  for (let s = 0; s < road.length - 1; s++) {
    const [ax, ay] = road[s], [bx, by] = road[s + 1];
    for (let k = 0; k < 7; k++) { const q = (k + .5) / 7, crawl = Math.sin(t * 2 + n) * .004; car(lerp(ax, bx, q + crawl), lerp(ay, by, q + crawl) + 6, .62, (n * 47) % 360); n++; }
  }
  ctx.fillStyle = '#f4f7fb'; ctx.fillRect(0, 1290, W, H - 1290);
  mapSnowfall(t, 90);
}

// ---------- evening stove, then bed with no mosquitoes ----------
function aksamScene(t) {
  ctx.fillStyle = '#5a3e36'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#7a5548'; ctx.fillRect(0, 1240, W, H - 1240);
  // window at night
  ctx.fillStyle = '#1d3557'; ctx.fillRect(660, 480, 300, 320); ctx.strokeStyle = '#e9d8a6'; ctx.lineWidth = 14; ctx.strokeRect(660, 480, 300, 320);
  ctx.fillStyle = '#fff'; for (let i = 0; i < 20; i++) { ctx.beginPath(); ctx.arc(670 + rnd(i) * 280, 490 + ((rnd(i + 9) * 300 + t * 50) % 300), 3.5, 0, 7); ctx.fill(); }
  // warm glow
  const gl = ctx.createRadialGradient(540, 1040, 40, 540, 1040, 600); gl.addColorStop(0, 'rgba(255,170,60,.45)'); gl.addColorStop(1, 'rgba(255,170,60,0)'); ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H);
  // stove (soba) with pipe
  ctx.fillStyle = '#2b2b2b'; rr(450, 900, 180, 240, 20); ctx.fill(); ctx.fillRect(520, 560, 40, 340); ctx.fillRect(520, 540, 200, 40);
  const f = .7 + .3 * Math.sin(t * 9); ctx.fillStyle = `rgba(255,${Math.round(120 + 60 * f)},0,1)`; rr(490, 980, 100, 70, 10); ctx.fill();
  ctx.fillStyle = '#555'; rr(440, 890, 200, 22, 8); ctx.fill();
  // chestnuts popping on the stove
  for (let i = 0; i < 6; i++) { const ph = (t * 1.3 + i * .37) % 1, jump = Math.sin(ph * Math.PI) * 60 * (i % 2 ? 1 : .6); ctx.fillStyle = '#7f4f24'; ctx.beginPath(); ctx.ellipse(470 + i * 28, 878 - jump, 13, 10, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#e9c46a'; ctx.beginPath(); ctx.arc(470 + i * 28, 872 - jump, 4, 0, 7); ctx.fill(); }
  steam(540, 860, t, 3, 90, .5);
  // family around the stove
  person(250, 1130, 1.3, { shirt: '#9b2226' }); person(330, 1150, 1.0, { shirt: '#ffb703' });
  person(800, 1130, 1.3, { shirt: '#264653' }); person(890, 1150, 1.05, { shirt: '#6d597a' });
  ctx.fillStyle = '#e9d8a6'; [[230, 1080], [820, 1080]].forEach(([x, y]) => { rr(x, y, 26, 34, 6); ctx.fill(); }); // tea glasses
}
function geceScene(t) {
  ctx.fillStyle = '#1d2d44'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#0d1b2a'; ctx.fillRect(660, 480, 300, 320); ctx.strokeStyle = '#3e5c76'; ctx.lineWidth = 14; ctx.strokeRect(660, 480, 300, 320);
  ctx.fillStyle = '#fff'; for (let i = 0; i < 20; i++) { ctx.beginPath(); ctx.arc(670 + rnd(i) * 280, 490 + ((rnd(i + 9) * 300 + t * 50) % 300), 3.5, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#6d4c41'; ctx.fillRect(120, 1060, 760, 60);
  ctx.fillStyle = '#a2d2ff'; rr(150, 960, 700, 120, 46); ctx.fill();
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(240, 960, 50, 0, 7); ctx.fill();
  ctx.strokeStyle = '#333'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(222, 958, 9, .2, Math.PI - .2); ctx.arc(258, 958, 9, .2, Math.PI - .2); ctx.stroke();
  ctx.beginPath(); ctx.arc(240, 978, 12, .2, Math.PI - .2); ctx.stroke();
  ctx.fillStyle = '#fff'; font(900, 50); ctx.textAlign = 'left'; ctx.fillText('z', 310, 880 + Math.sin(t * 3) * 6); font(900, 66); ctx.fillText('Z', 360, 810 + Math.sin(t * 3) * 8);
  mosquito(560, 720, 1.6);
  ctx.strokeStyle = '#e63946'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(570, 720, 80, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(513, 663); ctx.lineTo(627, 777); ctx.stroke();
}

// ---------- final card + teaser ----------
function tv(x, y, t, cut) {
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = '#111'; rr(-330, -200, 660, 400, 26); ctx.fill(); ctx.fillStyle = '#333'; ctx.fillRect(-60, 200, 120, 40); rr(-150, 236, 300, 22, 8); ctx.fill();
  ctx.save(); rr(-300, -172, 600, 344, 12); ctx.clip();
  if (!cut) {
    ctx.fillStyle = '#2d6a4f'; ctx.fillRect(-300, -172, 600, 344);
    ctx.strokeStyle = '#ffffffcc'; ctx.lineWidth = 4; ctx.strokeRect(-280, -150, 560, 300); ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(0, 150); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 50, 0, 7); ctx.stroke();
    const bx = Math.sin(t * 2.4) * 180, by = Math.cos(t * 1.7) * 80; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(bx, by, 12, 0, 7); ctx.fill();
    ctx.fillStyle = '#e63946'; [[-120, 40], [60, -60]].forEach(([px, py]) => { ctx.beginPath(); ctx.arc(px + Math.sin(t * 3) * 20, py, 12, 0, 7); ctx.fill(); });
    ctx.fillStyle = '#ffd166'; [[110, 50], [-60, -40]].forEach(([px, py]) => { ctx.beginPath(); ctx.arc(px + Math.cos(t * 3) * 20, py, 12, 0, 7); ctx.fill(); });
    ctx.fillStyle = '#000a'; rr(-290, -164, 200, 44, 8); ctx.fill(); ctx.fillStyle = '#fff'; font(800, 26); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('CANLI  89:59', -278, -142);
    ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.arc(-96, -142, 7, 0, 7); ctx.fill();
  } else {
    for (let i = 0; i < 900; i++) { const g = Math.floor(rnd(i + Math.floor(t * 24) * 7) * 255); ctx.fillStyle = `rgb(${g},${g},${g})`; ctx.fillRect(-300 + rnd(i * 3) * 600, -172 + rnd(i * 5 + 1) * 344, 14, 8); }
    ctx.fillStyle = '#000c'; rr(-230, -60, 460, 120, 18); ctx.fill();
    ctx.fillStyle = '#fff'; font(900, 40); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('📵 BAĞLANTI YOK', 0, 2);
  }
  ctx.restore(); ctx.restore();
}
function finScene(t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#16324f'); g.addColorStop(1, '#0a1a2b');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  mapSnowfall(t, 170);
  if (t < TL.next) { T = t; snowman(540, 1050, 1.7); }
  else tv(540, 900, t, t >= TL.cut);
}

// ---------- render ----------
const KRS = [43.1, 40.6], SIV = [37.02, 39.75], BUR = [29.06, 40.18];
function render(t) {
  cam = camera(t);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawSea(t); drawMapKis(t, 1); mapSnowfall(t);
  const inR = r => t >= r[0] - .05 && t < r[1] + .3;
  // hook: snowy map with an alarm clock
  if (t < TL.hook[1] + .4) {
    T = t; snowman(880, 1180, .9);
    ctx.save(); ctx.translate(200, 1150); ctx.rotate(Math.sin(t * 30) * .08 * clamp((t - .6) / .2));
    ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.arc(0, 0, 80, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 64, 0, 7); ctx.fill();
    ctx.strokeStyle = '#111'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -44); ctx.moveTo(0, 0); ctx.lineTo(30, 10); ctx.stroke();
    ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.arc(-56, -70, 22, 0, 7); ctx.arc(56, -70, 22, 0, 7); ctx.fill(); ctx.restore();
    title([['SIRADAN', 80, '#fff'], ['BİR GÜN ⏰', 104, '#bde0fe']], .15, TL.hook[1], t, 400);
  }
  if (inR(TL.sabah)) {
    sceneSlide(t, TL.sabah[0], () => sabahScene(t));
    title([['SABAH', 104, '#fff']], TL.sabah[0] + .1, TL.sabah[1], t, 360);
    sendPrompt('Annene gönder', 1560, vis(t, TL.quote + .2, TL.sabah[1] + .2, .25, .2));
  }
  if (inR(TL.baba)) {
    sceneSlide(t, TL.baba[0], () => babaScene(t));
    title([['BABALAR', 104, '#fff']], TL.baba[0] + .1, TL.baba[1], t, 360);
  }
  // cities
  const city = (r, ll, name, verdict, col, scene, lead = 0) => {
    if (t < r[0] - (lead ? .1 : 0) || t > r[1] + .25) return;
    const [cx, cy] = P(...ll), w0 = r[0] + lead;
    if (t < w0 + .2) { cityDot(name, ll, 1, col); stamp(cx, cy - 110, verdict, col, (t - (w0 - .8)) / .35, .9); }
    wipe(cx, cy, (t - (w0 + .05)) / .45, () => scene(t, w0));
    if (t > w0 + .4) stamp(W / 2, 1230, verdict, col, (t - (w0 + .5)) / .3, 1.1);
  };
  if (t > TL.kars[0] - .1 && t < TL.kars[0] + TL.karsLead + .3) {
    title([['YORUMLARDAN', 70, '#fff'], ['GELEN İSTEK 💬', 84, '#ffd166']], TL.kars[0], TL.kars[0] + TL.karsLead + .2, t, 400);
    pill('💬 "Kars olsun"', 540, 1180, { size: 44, bg: '#fff', fg: '#111', alpha: vis(t, TL.kars[0] + .2, TL.kars[0] + TL.karsLead + .2, .25, .2) });
  }
  city(TL.kars, KRS, 'Kars', 'YAZ TATİLİ 😎', '#f77f00', karsScene, TL.karsLead);
  city(TL.sivas, SIV, 'Sivas', 'BALKONDAN GİRİŞ 🏠', '#3a86ff', sivasScene);
  city(TL.bursa, BUR, 'Bursa', 'UZUN KUYRUK 🚗', '#e63946', bursaScene);
  title([['KARS', 110, '#fff']], TL.kars[0] + TL.karsLead + .3, TL.kars[1], t, 360);
  title([['SİVAS', 110, '#fff']], TL.sivas[0] + .3, TL.sivas[1], t, 360);
  title([['BURSA', 110, '#fff']], TL.bursa[0] + .3, TL.bursa[1], t, 360);
  if (inR(TL.aksam)) {
    sceneSlide(t, TL.aksam[0], () => { if (t < TL.gece) aksamScene(t); else geceScene(t); });
    if (t < TL.gece) title([['AKŞAM', 104, '#fff']], TL.aksam[0] + .1, TL.gece, t, 360);
    else { title([['GECE', 104, '#fff']], TL.gece + .05, TL.aksam[1], t, 360); stamp(W / 2, 1230, 'SİVRİSİNEK: 0 🦟', '#06d6a0', (t - TL.gece - .9) / .3, 1.1); }
  }
  if (t >= TL.fin[0] - .05) {
    sceneSlide(t, TL.fin[0], () => finScene(t));
    if (t < TL.next) title([['SERİ BİTTİ', 96, '#fff'], ['KIŞ BİTMEDİ ❄️', 104, '#bde0fe']], TL.fin[0] + .1, TL.next, t, 420);
    else if (t < TL.ask) title([['SIRADAKİ SERİ', 76, '#fff'], ['İNTERNET KESİLİYOR 📵', 70, '#ffd166']], TL.next + .05, TL.ask, t, 400);
    else { title([['SENCE', 80, '#fff'], ['HANGİ MAÇ? ⚽', 104, '#ffd166']], TL.ask, 99, t, 400); pill('💬 Yorumlara yaz', 540, 1230, { size: 46, bg: '#ffd166', fg: '#111', alpha: clamp((t - TL.ask - .2) / .25) }); }
  }
  subtitles(t);
  badge();
  if (t < .12) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .12})`; ctx.fillRect(0, 0, W, H); }
}
