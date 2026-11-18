// ===== Ya Olsaydı #2 · Bölüm 2: "Kış hiç bitmeseydi? Kim kazanırdı, kim kaybederdi?" =====
// TL holds the scene boundaries (video time). It is filled from the voiceover timing.
let T = 0;
const TL = window.TL || {
  hook: [0, 3.5], up: [3.5, 8.5], down: [8.5, 15], erz: [15, 20], ant: [20, 23.5], ist: [23.5, 26.5], izm: [26.5, 30], end: [30, 35], dur: 36,
  downDad: 11.0, endSleep: 32.5, erzLead: 1.2,
};
const SUBS = window.SUBS_DATA || [];

function calendarM(x, y, s, alpha, month, day) {
  if (alpha <= 0) return;
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(.06);
  rr(-90, -90, 180, 190, 18); ctx.fillStyle = '#fff'; ctx.fill();
  rr(-90, -90, 180, 54, 18); ctx.fillStyle = '#e63946'; ctx.fill(); ctx.fillRect(-90, -50, 180, 14);
  ctx.fillStyle = '#fff'; font(900, 28); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(month, 0, -62);
  ctx.fillStyle = '#111'; font(900, 80); ctx.fillText(day, 0, 30);
  ctx.restore();
}

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

// ---------- skiers (country "+" and Erzurum) ----------
function skier(x, y, s, ang, col) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  ctx.strokeStyle = '#222'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-50, 40); ctx.lineTo(50, 40); ctx.moveTo(-46, 48); ctx.lineTo(54, 48); ctx.stroke(); // skis
  ctx.beginPath(); ctx.moveTo(-30, -10); ctx.lineTo(-55, 44); ctx.moveTo(30, -10); ctx.lineTo(40, 44); ctx.stroke(); // poles
  ctx.fillStyle = '#2b2d42'; ctx.fillRect(-14, 0, 12, 40); ctx.fillRect(4, 0, 12, 40);
  ctx.fillStyle = col; rr(-22, -50, 44, 56, 14); ctx.fill();
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -66, 16, 0, 7); ctx.fill();
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, -72, 17, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#4cc9f0'; rr(-14, -74, 28, 10, 5); ctx.fill(); // goggles
  ctx.restore();
}
function slopeScene(t, label) {
  winterSky('#6f8faf', '#cddbe8', 900);
  // big snowy mountain with a slope
  ctx.fillStyle = '#9fb1c4'; ctx.beginPath(); ctx.moveTo(-50, 1000); ctx.lineTo(380, 420); ctx.lineTo(560, 560); ctx.lineTo(720, 380); ctx.lineTo(1130, 1000); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(270, 570); ctx.lineTo(380, 420); ctx.lineTo(470, 520); ctx.lineTo(420, 540); ctx.lineTo(380, 500); ctx.lineTo(320, 580); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(620, 500); ctx.lineTo(720, 380); ctx.lineTo(830, 520); ctx.lineTo(760, 500); ctx.lineTo(720, 470); ctx.lineTo(670, 520); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#f4f7fb'; ctx.beginPath(); ctx.moveTo(-50, 1900); ctx.lineTo(-50, 860); ctx.quadraticCurveTo(540, 700, 1130, 980); ctx.lineTo(1130, 1900); ctx.closePath(); ctx.fill();
  // pine trees
  [[90, 900], [180, 960], [930, 1010], [1010, 1060]].forEach(([x, y]) => { ctx.fillStyle = '#2d6a4f'; ctx.beginPath(); ctx.moveTo(x, y - 130); ctx.lineTo(x - 55, y); ctx.lineTo(x + 55, y); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(x, y - 130); ctx.lineTo(x - 26, y - 70); ctx.lineTo(x + 26, y - 70); ctx.closePath(); ctx.fill(); });
  // chairlift
  ctx.strokeStyle = '#495057'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(60, 820); ctx.lineTo(760, 470); ctx.stroke();
  for (let i = 0; i < 5; i++) { const p = ((t * .08) + i / 5) % 1; const x = lerp(60, 760, p), y = lerp(820, 470, p); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 40); ctx.stroke(); ctx.fillStyle = '#e63946'; rr(x - 18, y + 38, 36, 16, 4); ctx.fill(); }
  // skiers carving down
  for (let i = 0; i < 3; i++) {
    const p = ((t * .22) + i / 3) % 1;
    const x = lerp(200 + i * 120, 820 - i * 60, p) + Math.sin(p * 12 + i) * 60, y = lerp(880, 1260, p);
    skier(x, y, .9 + i * .1, .25 + Math.sin(p * 12 + i) * .15, ['#e63946', '#ffd166', '#06d6a0'][i]);
  }
  if (label) { ctx.save(); ctx.translate(820, 1180); rr(-130, -40, 260, 80, 12); ctx.fillStyle = '#1d3557'; ctx.fill(); ctx.fillStyle = '#fff'; font(900, 30); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, 0, 2); ctx.restore(); }
  mapSnowfall(t, 120);
}

// ---------- frozen mosquito ----------
function mosquito(x, y, s, ang, frozen) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  if (frozen) { rr(-60, -50, 120, 100, 18); ctx.fillStyle = '#d7f1ffcc'; ctx.fill(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 4; ctx.stroke(); }
  ctx.fillStyle = '#3d3d3d'; ctx.beginPath(); ctx.ellipse(0, 0, 26, 9, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(-28, -2, 8, 0, 7); ctx.fill();
  ctx.strokeStyle = '#3d3d3d'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-34, 0); ctx.lineTo(-56, 6); ctx.stroke();
  for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 10, 6); ctx.lineTo(i * 14 - 6, 30); ctx.stroke(); }
  ctx.fillStyle = '#ffffffaa'; ctx.beginPath(); ctx.ellipse(4, -18, 20, 9, -.4, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(14, -16, 18, 8, -.1, 0, 7); ctx.fill();
  ctx.restore();
}
function mosquitoScene(t, t0) {
  ctx.fillStyle = '#1b2a3a'; ctx.fillRect(0, 0, W, H);
  // bedroom: window with snow, sleeping person
  ctx.fillStyle = '#2b3d52'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#9fb3c8'; ctx.fillRect(650, 520, 300, 320); ctx.strokeStyle = '#d9e2ec'; ctx.lineWidth = 12; ctx.strokeRect(650, 520, 300, 320); ctx.beginPath(); ctx.moveTo(800, 520); ctx.lineTo(800, 840); ctx.stroke();
  ctx.fillStyle = '#fff'; for (let i = 0; i < 25; i++) { ctx.beginPath(); ctx.arc(660 + rnd(i) * 280, 530 + (rnd(i + 9) * 300 + t * 60) % 300, 3 + rnd(i + 3) * 3, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#6d4c41'; ctx.fillRect(120, 1020, 760, 60); ctx.fillRect(120, 900, 30, 180);
  ctx.fillStyle = '#ff8fab'; rr(150, 930, 700, 110, 40); ctx.fill();
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(230, 930, 46, 0, 7); ctx.fill();
  ctx.strokeStyle = '#333'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(214, 928, 8, .2, Math.PI - .2); ctx.arc(246, 928, 8, .2, Math.PI - .2); ctx.stroke(); // closed eyes
  ctx.fillStyle = '#fff'; font(900, 46); ctx.textAlign = 'left'; ctx.fillText('z', 290 + Math.sin(t * 3) * 6, 860); font(900, 60); ctx.fillText('Z', 330, 800 + Math.sin(t * 3) * 8);
  // frozen mosquito falls
  const p = clamp((t - t0) / .8);
  mosquito(520, lerp(560, 990, easeOut(p) * p), 1.6, p * 2.5, true);
  if (p >= 1) { font(900, 48); ctx.fillStyle = '#bde0fe'; ctx.textAlign = 'center'; ctx.fillText('PIT!', 520, 900); }
}

// ---------- empty fruit stall ----------
function stallScene(t) {
  winterSky('#8fa6bd', '#dbe5ee', 1000);
  ctx.fillStyle = '#f4f7fb'; ctx.fillRect(0, 1180, W, H - 1180);
  // stall
  ctx.fillStyle = '#8d6e63'; ctx.fillRect(160, 860, 760, 40); ctx.fillRect(180, 900, 20, 300); ctx.fillRect(880, 900, 20, 300);
  for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#2a9d8f'; ctx.fillRect(140 + i * 89, 700, 89, 70); }
  ctx.fillStyle = '#fff'; ctx.fillRect(130, 680, 820, 24); // snow on awning
  ctx.fillStyle = '#a1887f'; ctx.fillRect(160, 1040, 760, 26);
  // empty crates with labels
  ['KARPUZ', 'DOMATES', 'KİRAZ'].forEach((n, i) => {
    const x = 220 + i * 240; ctx.fillStyle = '#c69c6d'; ctx.fillRect(x, 960, 200, 80);
    ctx.fillStyle = '#fff'; ctx.fillRect(x, 950, 200, 12);
    ctx.fillStyle = '#5d4037'; font(900, 26); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(n, x + 100, 1000);
  });
  // tiny frozen watermelon
  ctx.save(); ctx.translate(540, 1240); ctx.fillStyle = '#2d6a4f'; ctx.beginPath(); ctx.ellipse(0, 0, 40, 28, 0, 0, 7); ctx.fill();
  ctx.strokeStyle = '#95d5b2'; ctx.lineWidth = 4; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 12, -26); ctx.quadraticCurveTo(i * 16, 0, i * 12, 26); ctx.stroke(); }
  ctx.fillStyle = '#d7f1ffaa'; ctx.beginPath(); ctx.ellipse(0, -4, 48, 34, 0, 0, 7); ctx.fill(); ctx.restore();
  ctx.save(); ctx.translate(540, 820); rr(-170, -46, 340, 92, 14); ctx.fillStyle = '#e63946'; ctx.fill(); ctx.fillStyle = '#fff'; font(900, 44); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('KARPUZ YOK', 0, 3); ctx.restore();
  mapSnowfall(t, 100);
}

// ---------- dad locks the boiler ----------
function dad(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#3a3a3a'; ctx.fillRect(-22, 50, 18, 90); ctx.fillRect(4, 50, 18, 90);
  ctx.fillStyle = '#6c757d'; rr(-44, -60, 88, 120, 22); ctx.fill();          // grey cardigan
  ctx.fillStyle = '#495057'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(0, -40 + i * 24, 4, 0, 7); ctx.fill(); }
  ctx.strokeStyle = '#6c757d'; ctx.lineWidth = 18; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-40, -40); ctx.lineTo(-90, -10); ctx.moveTo(40, -40); ctx.lineTo(70, -110); ctx.stroke(); // one hand pointing up
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -96, 34, 0, 7); ctx.fill();
  ctx.fillStyle = '#ddd'; ctx.beginPath(); ctx.arc(0, -110, 34, Math.PI * 1.1, Math.PI * 1.9); ctx.fill(); // grey hair
  ctx.fillStyle = '#2b1d14'; ctx.beginPath(); ctx.ellipse(0, -80, 16, 6, 0, 0, 7); ctx.fill(); // moustache
  ctx.strokeStyle = '#222'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(-20, -112); ctx.lineTo(-6, -104); ctx.moveTo(20, -112); ctx.lineTo(6, -104); ctx.stroke(); // angry brows
  ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(-12, -96, 4, 0, 7); ctx.arc(12, -96, 4, 0, 7); ctx.fill();
  ctx.restore();
}
function thermostat(x, y, s, deg, locked) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rr(-80, -100, 160, 200, 20); ctx.fillStyle = '#f8f9fa'; ctx.fill(); ctx.strokeStyle = '#ced4da'; ctx.lineWidth = 5; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -10, 56, 0, 7); ctx.fillStyle = '#1d3557'; ctx.fill();
  ctx.fillStyle = '#4cc9f0'; font(900, 50); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(deg + '°', 0, -8);
  if (locked) {
    ctx.fillStyle = '#ffd166'; rr(-34, 50, 68, 54, 8); ctx.fill();
    ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, 50, 22, Math.PI, 0); ctx.stroke();
    ctx.fillStyle = '#5c4033'; ctx.beginPath(); ctx.arc(0, 74, 8, 0, 7); ctx.fill();
  }
  ctx.restore();
}
function dadScene(t, tLock) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#f6e7cb'); g.addColorStop(1, '#ead6b2');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#b08968'; ctx.fillRect(0, 1340, W, H - 1340);
  // family on the sofa under blankets
  ctx.fillStyle = '#6d597a'; rr(80, 1080, 560, 200, 30); ctx.fill();
  [[200, '#ffafcc'], [360, '#a2d2ff'], [520, '#cdb4db']].forEach(([x, c], i) => {
    ctx.fillStyle = c; rr(x - 75, 1010, 150, 220, 60); ctx.fill();
    ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(x, 1010, 34, 0, 7); ctx.fill();
    ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, 998, 38, Math.PI * 1.05, Math.PI * 1.95); ctx.fill();
    ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(x - 11, 1012, 4, 0, 7); ctx.arc(x + 11, 1012, 4, 0, 7); ctx.fill();
    // shiver lines
    ctx.strokeStyle = '#4cc9f0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 60 + Math.sin(t * 40 + i) * 3, 990); ctx.lineTo(x + 70, 1000); ctx.lineTo(x + 60, 1010); ctx.stroke();
  });
  const locked = t > tLock;
  thermostat(860, 760, 1.15, locked ? 18 : 24, locked);
  dad(760, 1180, 1.35, t);
  if (t > tLock + .3) speech(470, 640, 'Kim açtı bunu?!', vis(t, tLock + .3, 99, .2, .2));
}

// ---------- Antalya: frozen sea, tourists skating ----------
function antalyaFrozen(t) {
  T = t; sky(); mountains();
  ctx.fillStyle = '#d7ecf7'; ctx.fillRect(0, 760, W, 180);
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(rnd(i) * W, 780 + rnd(i + 4) * 140); ctx.lineTo(rnd(i) * W + 120, 790 + rnd(i + 7) * 140); ctx.stroke(); }
  snowyBeach(); palm(90, 1060, 1.0); palm(990, 1010, .85);
  // skating tourists on the frozen sea
  for (let i = 0; i < 2; i++) {
    const x = 380 + i * 320 + Math.sin(t * 2 + i * 2) * 90;
    ctx.save(); ctx.translate(x, 900); ctx.rotate(Math.cos(t * 2 + i * 2) * .15);
    tourist(0, -120, .8, { shirt: i ? '#4cc9f0' : '#ff6b6b', t: t + i });
    ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-30, -10); ctx.lineTo(-2, -10); ctx.moveTo(2, -10); ctx.lineTo(30, -10); ctx.stroke();
    ctx.restore();
  }
  // one fell over
  ctx.save(); ctx.translate(560, 1010); ctx.rotate(1.35); tourist(0, -60, .75, { shirt: '#ffd166', t }); ctx.restore();
  ctx.fillStyle = '#fff'; font(900, 40); ctx.textAlign = 'center'; ctx.fillText('ÇAT!', 640, 960);
  snowfall();
}

// ---------- İstanbul: snowy bridge traffic ----------
function istanbulScene(t, t0) {
  winterSky('#5e7590', '#b9c8d8', 1000);
  ctx.fillStyle = '#3d5a73'; ctx.fillRect(0, 1000, W, H - 1000); // Bosphorus
  // skyline silhouettes (domes and minarets)
  ctx.fillStyle = '#7a8ea3';
  [[140, 760], [430, 720], [760, 750]].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y + 90, 90, Math.PI, 0); ctx.fill(); ctx.fillRect(x - 100, y + 90, 200, 120); ctx.fillRect(x - 130, y - 40, 12, 250); ctx.fillRect(x + 118, y - 40, 12, 250); ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(x, y + 90, 90, Math.PI, Math.PI * 2); ctx.lineTo(x + 70, y + 40); ctx.fill(); ctx.fillStyle = '#7a8ea3'; });
  const y = 1010;
  ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 14;
  [190, 890].forEach(x => { ctx.beginPath(); ctx.moveTo(x, y + 60); ctx.lineTo(x, y - 260); ctx.stroke(); });
  ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-40, y - 40); ctx.quadraticCurveTo(190, y - 270, 190, y - 260); ctx.quadraticCurveTo(540, y - 40, 890, y - 260); ctx.quadraticCurveTo(890, y - 270, 1120, y - 40); ctx.stroke();
  ctx.fillStyle = '#495057'; ctx.fillRect(-40, y, W + 80, 46);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(-40, y - 6, W + 80, 8);
  const hues = [8, 210, 140, 45, 280, 0, 190, 25, 330, 100];
  for (let row = 0; row < 2; row++) for (let i = 0; i < 10; i++) {
    const cx = row ? 1100 - i * 112 : -40 + i * 112;
    car(cx + Math.sin(t * 2 + i) * 1.5, y - 4 + row * 70, .8, hues[(i + row * 4) % 10]);
    ctx.fillStyle = '#fff'; rr(cx - 30, y - 42 + row * 70, 60, 8, 4); ctx.fill(); // snow on roofs
  }
  const honk = Math.floor(t * 2.5) % 3;
  font(900, 46); ctx.textAlign = 'center'; ctx.lineWidth = 10; ctx.strokeStyle = '#000a'; ctx.fillStyle = '#ffd166';
  [[300, y - 110], [640, y - 130], [860, y - 90]].forEach(([hx, hy], i) => { if (i === honk) { ctx.strokeText('DIIT!', hx, hy); ctx.fillText('DIIT!', hx, hy); } });
  // "×2" traffic badge
  const p = clamp((t - t0 - .6) / .4);
  if (p > 0) { ctx.save(); ctx.translate(540, 1230); ctx.scale(backOut(p), backOut(p)); rr(-200, -50, 400, 100, 20); ctx.fillStyle = '#e63946'; ctx.fill(); ctx.fillStyle = '#fff'; font(900, 48); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('TRAFİK × 2', 0, 4); ctx.restore(); }
  mapSnowfall(t, 140);
}

// ---------- İzmir: Kordon, clock tower, panic ----------
function saatKulesi(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#e9d8a6'; ctx.fillRect(-60, -40, 120, 40); ctx.fillRect(-44, -260, 88, 220); ctx.fillRect(-34, -380, 68, 120); ctx.fillRect(-24, -470, 48, 90);
  ctx.fillStyle = '#c9a66b'; ctx.fillRect(-60, -46, 120, 8); ctx.fillRect(-48, -266, 96, 8); ctx.fillRect(-38, -386, 76, 8);
  ctx.beginPath(); ctx.arc(0, -470, 26, Math.PI, 0); ctx.fillStyle = '#c9a66b'; ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, -320, 26, 0, 7); ctx.fill(); ctx.strokeStyle = '#333'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -320); ctx.lineTo(0, -338); ctx.moveTo(0, -320); ctx.lineTo(12, -316); ctx.stroke();
  ctx.fillStyle = '#7a5c3a'; [-24, 0, 24].forEach(wx => { ctx.beginPath(); ctx.moveTo(wx - 8, -60); ctx.lineTo(wx - 8, -200); ctx.arc(wx, -200, 8, Math.PI, 0); ctx.lineTo(wx + 8, -60); ctx.fill(); });
  ctx.fillStyle = '#fff'; ctx.fillRect(-62, -48, 124, 6); ctx.fillRect(-50, -268, 100, 6); ctx.beginPath(); ctx.ellipse(0, -494, 22, 6, 0, 0, 7); ctx.fill();
  ctx.restore();
}
function izmirScene(t, t0) {
  winterSky('#8fa6bd', '#d9e4ee', 1000);
  ctx.fillStyle = '#4f86a8'; ctx.fillRect(0, 760, W, 260); // bay
  ctx.strokeStyle = '#ffffff44'; ctx.lineWidth = 3; for (let r = 0; r < 4; r++) { ctx.beginPath(); for (let x = 0; x <= W; x += 16) { const yy = 790 + r * 50 + Math.sin(x * .03 + t * 2 + r) * 4; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); }
  saatKulesi(820, 1060, 1.0);
  ctx.fillStyle = '#d9d9d9'; ctx.fillRect(0, 1020, W, 60); // Kordon promenade edge
  ctx.fillStyle = '#f4f7fb'; ctx.fillRect(0, 1060, W, H - 1060);
  palm(110, 1100, .8);
  // panicking İzmirli running with a sign
  const run = (t - t0) * 160, px = 700 - run % 900, bob = Math.abs(Math.sin(t * 12)) * -14;
  ctx.save(); ctx.translate(px, 1210 + bob);
  ctx.strokeStyle = '#6d4c41'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(30, -60); ctx.lineTo(30, -200); ctx.stroke();
  ctx.save(); ctx.translate(30, -240); ctx.rotate(Math.sin(t * 12) * .08); rr(-140, -46, 280, 92, 10); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#e63946'; ctx.lineWidth = 6; ctx.stroke();
  ctx.fillStyle = '#e63946'; font(900, 30); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('KIYAMET Mİ', 0, -14); ctx.fillText('KOPTU?!', 0, 22); ctx.restore();
  ctx.restore();
  person(px, 1210 + bob, 1.05, { shirt: '#06d6a0', armsUp: true });
  // shocked face marks
  font(900, 50); ctx.fillStyle = '#e63946'; ctx.textAlign = 'center'; ctx.fillText('!!', px - 70, 1080 + bob);
  mapSnowfall(t, 90);
}

// ---------- ending: sleeping without mosquitoes ----------
function sleepScene(t) {
  ctx.fillStyle = '#22334a'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#9fb3c8'; ctx.fillRect(680, 600, 260, 280); ctx.strokeStyle = '#d9e2ec'; ctx.lineWidth = 12; ctx.strokeRect(680, 600, 260, 280);
  ctx.fillStyle = '#fff'; for (let i = 0; i < 20; i++) { ctx.beginPath(); ctx.arc(690 + rnd(i) * 240, 610 + (rnd(i + 9) * 260 + t * 60) % 260, 3, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#6d4c41'; ctx.fillRect(120, 1060, 760, 60);
  ctx.fillStyle = '#a2d2ff'; rr(150, 960, 700, 120, 46); ctx.fill();
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(240, 960, 50, 0, 7); ctx.fill();
  ctx.strokeStyle = '#333'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(222, 958, 9, .2, Math.PI - .2); ctx.arc(258, 958, 9, .2, Math.PI - .2); ctx.stroke();
  ctx.beginPath(); ctx.arc(240, 978, 12, .2, Math.PI - .2); ctx.stroke(); // smile
  ctx.fillStyle = '#fff'; font(900, 50); ctx.textAlign = 'left'; ctx.fillText('z', 310, 880 + Math.sin(t * 3) * 6); font(900, 66); ctx.fillText('Z', 360, 810 + Math.sin(t * 3) * 8);
  // crossed-out mosquito icon
  mosquito(520, 720, 1.4, 0, false);
  ctx.strokeStyle = '#e63946'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(520, 720, 80, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(463, 663); ctx.lineTo(577, 777); ctx.stroke();
}

// ---------- render ----------
const ERZ = [41.27, 39.9], ANT = [30.7, 36.9], IST = [28.98, 41.01], IZM = [27.14, 38.42];
function scaleTilt(t) {
  const kf = [[TL.up[0], 0], [TL.up[0] + 1.2, .16], [TL.up[1] - .5, .26], [TL.down[0] + .6, .08], [TL.downDad + .4, -.12], [TL.down[1], -.18], [TL.end[0] + .6, -.5]];
  if (t <= kf[0][0]) return 0;
  for (let i = 0; i < kf.length - 1; i++) if (t <= kf[i + 1][0]) return lerp(kf[i][1], kf[i + 1][1], backOut(prog(t, kf[i][0], kf[i + 1][0])));
  return -.5;
}
function render(t) {
  cam = camera(t);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawSea(t); drawMapKis(t, 1); mapSnowfall(t);
  const inR = r => t >= r[0] && t < r[1];

  // hook: snowy map, August calendar, sunglasses snowman
  if (t < TL.hook[1] + .4) {
    calendarM(170, 1130, .9, clamp((t - .1) / .3), 'AĞUSTOS', '15');
    T = t; snowman(880, 1180, .9);
    title([['KİM KAZANIR,', 76, '#06d6a0'], ['KİM KAYBEDER?', 76, '#e63946']], .15, TL.hook[1], t, 400);
  }
  // country "+" : skiers, then frozen mosquito
  if (inR([TL.up[0] - .05, TL.up[1] + .3])) {
    const p = easeOut(clamp((t - TL.up[0]) / .35)); const mid = (TL.up[0] + TL.up[1]) / 2;
    ctx.save(); ctx.translate((1 - p) * W, 0);
    if (t < mid) slopeScene(t, 'KAYAK: 365 GÜN'); else mosquitoScene(t, mid + .3);
    ctx.restore();
    title([['ÜLKE', 70, '#fff'], [t < mid ? '✅ KAYAK 365 GÜN' : '✅ SİVRİSİNEK: 0', 60, '#06d6a0']], TL.up[0] + .1, TL.up[1], t, 360);
  }
  // country "−" : empty stall, then dad
  if (inR([TL.down[0] - .05, TL.down[1]])) {
    const p = easeOut(clamp((t - TL.down[0]) / .35));
    ctx.save(); ctx.translate((1 - p) * W, 0);
    if (t < TL.downDad) stallScene(t); else dadScene(t, TL.downDad + .9);
    ctx.restore();
    if (t >= TL.downDad) sendPrompt('Babana gönder', 1560, vis(t, TL.downDad + 1.2, TL.down[1], .25, .2));
    title([['ÜLKE', 70, '#fff'], [t < TL.downDad ? '❌ YAZ MEYVESİ YOK' : '❌ KOMBİ KİLİTLİ', 58, '#e63946']], TL.down[0] + .1, TL.down[1], t, 360);
  }
  // cities: map stamp, then dive into the city scene
  const city = (r, ll, name, verdict, col, scene, lead = 0) => {
    // lead: seconds the map stays visible before diving in (used for the 'Şehirlere gelince' intro)
    if (t < r[0] - .9 || t > r[1] + .25) return;
    const [cx, cy] = P(...ll), w0 = r[0] + lead;
    if (t < w0 + .2) { cityDot(name, ll, 1, col); stamp(cx, cy - 110, verdict, col, (t - (w0 - .8)) / .35, .9); }
    wipe(cx, cy, (t - (w0 + .05)) / .45, () => scene(t, w0));
    if (t > w0 + .4) stamp(W / 2, 1230, verdict, col, (t - (w0 + .5)) / .3, 1.1);
  };
  if (t > TL.erz[0] - .1 && t < TL.erz[0] + TL.erzLead + .3) title([['ŞEHİRLER', 96, '#fff']], TL.erz[0], TL.erz[0] + TL.erzLead + .2, t, 380);
  city(TL.erz, ERZ, 'Erzurum', 'KAZANDI ✅', '#06d6a0', (tt) => slopeScene(tt, 'PALANDÖKEN'), TL.erzLead);
  city(TL.ant, ANT, 'Antalya', 'KAYBETTİ', '#e63946', (tt) => antalyaFrozen(tt));
  city(TL.ist, IST, 'İstanbul', 'KAYBETTİ', '#e63946', (tt, t0) => istanbulScene(tt, t0));
  city(TL.izm, IZM, 'İzmir', 'PANİKTE 😱', '#f77f00', (tt, t0) => izmirScene(tt, t0));
  title([['ERZURUM', 104, '#fff']], TL.erz[0] + TL.erzLead + .3, TL.erz[1], t, 360);
  title([['ANTALYA', 104, '#fff']], TL.ant[0] + .3, TL.ant[1], t, 360);
  title([['İSTANBUL', 104, '#fff']], TL.ist[0] + .3, TL.ist[1], t, 360);
  title([['İZMİR', 110, '#fff']], TL.izm[0] + .3, TL.izm[1], t, 360);

  // persistent scale (country part + verdict)
  if (t > TL.hook[1] - .6 && t < TL.down[1] + .2) {
    const drop = easeOut(clamp((t - (TL.hook[1] - .6)) / .6));
    scale(880, lerp(380, 600, drop), .7, scaleTilt(t), vis(t, TL.hook[1] - .6, TL.down[1] + .2, .3, .2));
  }
  // ending: verdict, then sleeping without mosquitoes
  if (t > TL.end[0] - .1) {
    const v = clamp((t - TL.end[0]) / .3);
    if (t < TL.endSleep) {
      ctx.save(); ctx.globalAlpha = v * .6; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore();
      scale(W / 2, 780, 1.6, scaleTilt(t), v);
      title([['SONUÇ:', 70, '#fff'], ['KAYBEDİYORUZ', 96, '#e63946']], TL.end[0] + .1, TL.endSleep, t, 400);
    } else {
      const p = easeOut(clamp((t - TL.endSleep) / .4));
      ctx.save(); ctx.translate((1 - p) * W, 0); sleepScene(t); ctx.restore();
      title([['AMA', 70, '#fff'], ['SİVRİSİNEK YOK', 88, '#06d6a0']], TL.endSleep + .1, 99, t, 360);
    }
  }

  subtitles(t);
  badge();
  if (t < .12) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .12})`; ctx.fillRect(0, 0, W, H); }
}
