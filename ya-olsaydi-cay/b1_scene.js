// ===== Ya Olsaydı? #4 · Çay Bitseydi · Bölüm 1 — cinematic style =====
// Needs lib_internet.js (characters, okey table, rooms). TL comes from timeline1.js (estimate until the voiceover exists).
let T = 0;
const TL = window.TL || {
  kahvalti: [0, 4], baba: [4, 7.5], haber: [7.5, 11.5], kiz: [11.5, 16], soru: [12.5, 16], kahve: [16, 19.5], kara: [19.5, 23.5],
  kasa: [23.5, 27.5], harita: [27.5, 32], fin: [32, 35], dur: 35,
};
const SUBS = window.SUBS_DATA || [];
const TEA = '#b4231b', TEA_L = '#e85d3f', GOLD = '#f4b942';

// ---------- series badge ----------
function badge() {
  ctx.save(); font(900, 34); const txt = 'YA OLSAYDI?', w = ctx.measureText(txt).width;
  rr(56, 150, w + 120, 64, 16); ctx.fillStyle = GOLD; ctx.fill();
  ctx.fillStyle = '#111'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText(txt, 78, 183);
  rr(78 + w + 14, 162, 54, 40, 10); ctx.fillStyle = '#111'; ctx.fill(); ctx.fillStyle = GOLD; ctx.textAlign = 'center'; ctx.fillText('#4', 78 + w + 41, 183);
  const bx = 56 + w + 136; font(900, 30); const label = 'ÇAY BİTSEYDİ ☕', bw = ctx.measureText(label).width + 36;
  rr(bx, 156, bw, 52, 14); ctx.fillStyle = TEA; ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillText(label, bx + bw / 2, 183);
  ctx.restore();
}

// ---------- cinematic toolkit ----------
// slow camera move over a scene: zoom from z0 to z1 around a focus point that drifts from (x0,y0) to (x1,y1)
function shot(t, r, z0, z1, x0, y0, x1, y1, fn) {
  const p = ease(clamp((t - r[0]) / (r[1] - r[0] + .4)));
  const z = lerp(z0, z1, p), fx = lerp(x0, x1, p), fy = lerp(y0, y1, p);
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-fx, -fy); fn(); ctx.restore();
}
function blurred(px, fn) { ctx.save(); ctx.filter = `blur(${px}px)`; fn(); ctx.restore(); }
function grain(t, a = .06) { const f = Math.floor(t * 24); ctx.save(); for (let i = 0; i < 900; i++) { const v = rnd(i + f * 997) > .5 ? 255 : 0; ctx.fillStyle = `rgba(${v},${v},${v},${a})`; ctx.fillRect(rnd(i * 3 + f) * W, rnd(i * 7 + f * 3) * H, 2, 2); } ctx.restore(); }
function sunRays(x, y, t, col = 'rgba(255,230,170,A)', a = .22) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 6; i++) { const ang = .9 + i * .09 + Math.sin(t * .5 + i) * .02; const g = ctx.createLinearGradient(x, y, x + Math.cos(ang) * 1600, y + Math.sin(ang) * 1600); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(ang - .03) * 1700, y + Math.sin(ang - .03) * 1700); ctx.lineTo(x + Math.cos(ang + .03) * 1700, y + Math.sin(ang + .03) * 1700); ctx.fill(); }
  ctx.restore();
}
function dust(t, n = 50, col = '255,240,200') { for (let i = 0; i < n; i++) { const x = (rnd(i) * W + Math.sin(t * .4 + i) * 40) % W, y = (rnd(i + 9) * H + Math.cos(t * .3 + i) * 30 - t * 10) % H; ctx.fillStyle = `rgba(${col},${.25 + rnd(i + 2) * .4})`; ctx.beginPath(); ctx.arc(x, (y + H) % H, 1.5 + rnd(i + 5) * 2.5, 0, 7); ctx.fill(); } }
function colorGrade(top, bottom, a) { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top.replace('A', a)); g.addColorStop(1, bottom.replace('A', a)); ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function spot(x, y, r, a = .55) { const g = ctx.createRadialGradient(x, y, r * .2, x, y, r); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }

// ---------- props ----------
function teaGlass(x, y, s, fill = 0, saucer = true) { // ince belli bardak; fill 0..1
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (saucer) { ctx.fillStyle = TEA; ctx.beginPath(); ctx.ellipse(0, 62, 70, 14, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(0, 58, 58, 9, 0, 0, 7); ctx.fill(); }
  const glass = () => { ctx.beginPath(); ctx.moveTo(-34, -70); ctx.bezierCurveTo(-38, -20, -12, -6, -16, 16); ctx.bezierCurveTo(-20, 38, -34, 48, -28, 58); ctx.lineTo(28, 58); ctx.bezierCurveTo(34, 48, 20, 38, 16, 16); ctx.bezierCurveTo(12, -6, 38, -20, 34, -70); ctx.closePath(); };
  if (fill > 0) { ctx.save(); glass(); ctx.clip(); const top = lerp(58, -58, fill); const g = ctx.createLinearGradient(0, top, 0, 58); g.addColorStop(0, '#d9480f'); g.addColorStop(1, '#7c1d0f'); ctx.fillStyle = g; ctx.fillRect(-40, top, 80, 120); ctx.restore(); }
  glass(); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.6)'; rr(-26, -60, 6, 46, 3); ctx.fill();
  ctx.restore();
}
function caydanlik(x, y, s, lidOpen = 0, t = 0) { // double teapot
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const metal = (x0, w) => { const g = ctx.createLinearGradient(x0 - w, 0, x0 + w, 0); g.addColorStop(0, '#8d99ae'); g.addColorStop(.45, '#f1f5f9'); g.addColorStop(1, '#64748b'); return g; };
  ctx.fillStyle = metal(0, 110); rr(-110, 0, 220, 160, 30); ctx.fill(); // bottom kettle
  ctx.fillStyle = '#334155'; rr(-60, -14, 120, 20, 8); ctx.fill();
  ctx.fillStyle = metal(0, 70); rr(-70, -120, 140, 110, 26); ctx.fill(); // top pot
  ctx.strokeStyle = '#475569'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(70, -90); ctx.quadraticCurveTo(120, -100, 130, -150); ctx.stroke(); // spout
  ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(0, -120, 70, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); // handle
  ctx.save(); ctx.translate(-60, -122); ctx.rotate(-lidOpen * 1.1); ctx.fillStyle = metal(60, 60); ctx.beginPath(); ctx.ellipse(60, 0, 58, 14, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(60, -14, 9, 0, 7); ctx.fill(); ctx.restore();
  if (lidOpen > .3) { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.ellipse(0, -122, 52, 11, 0, 0, 7); ctx.fill(); }
  ctx.restore();
}
function breakfast(x, y, t) { // plates on the table
  const plate = (px, py, r, fn) => { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(px, py, r, r * .35, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 3; ctx.stroke(); fn(px, py); };
  plate(x - 300, y, 90, (px, py) => { ctx.fillStyle = '#fefce8'; rr(px - 50, py - 26, 100, 34, 6); ctx.fill(); }); // peynir
  plate(x - 80, y + 30, 80, (px, py) => { for (let i = 0; i < 9; i++) { ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.ellipse(px - 40 + (i % 5) * 20, py - 6 + Math.floor(i / 5) * 14, 9, 7, 0, 0, 7); ctx.fill(); } }); // zeytin
  plate(x + 160, y, 95, (px, py) => { ctx.fillStyle = '#d97706'; ctx.lineWidth = 22; ctx.strokeStyle = '#b45309'; ctx.beginPath(); ctx.ellipse(px, py - 14, 54, 20, 0, 0, 7); ctx.stroke(); for (let i = 0; i < 14; i++) { ctx.fillStyle = '#fef3c7'; ctx.fillRect(px - 50 + rnd(i) * 100, py - 30 + rnd(i + 3) * 30, 4, 2); } }); // simit
  plate(x + 330, y + 40, 60, (px, py) => { for (let i = 0; i < 4; i++) { ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(px - 24 + i * 16, py - 6, 14, 0, 7); ctx.fill(); } }); // domates
}
function tray(x, y, s, glasses = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#c0a062'; ctx.beginPath(); ctx.ellipse(0, 0, 120, 30, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#8b6d2f'; ctx.lineWidth = 6; ctx.stroke(); for (let i = 0; i < glasses; i++) teaGlass(-60 + i * 60, -40, .5, .85, false); ctx.restore(); }

// ---------- 1. sunny breakfast, empty teapot ----------
function kahvaltiScene(t) {
  const r = TL.kahvalti;
  shot(t, r, 1.0, 1.35, 540, 960, 600, 860, () => {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#fde68a'); g.addColorStop(1, '#f59e0b'); ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, H + 400);
    // window with morning light
    ctx.fillStyle = '#fff7d6'; rr(620, 260, 360, 460, 20); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 18; ctx.strokeRect(620, 260, 360, 460); ctx.beginPath(); ctx.moveTo(800, 260); ctx.lineTo(800, 720); ctx.moveTo(620, 490); ctx.lineTo(980, 490); ctx.stroke();
    // table
    const tg = ctx.createLinearGradient(0, 1000, 0, 1500); tg.addColorStop(0, '#fff'); tg.addColorStop(1, '#e5e7eb'); ctx.fillStyle = tg; ctx.beginPath(); ctx.moveTo(-200, 1500); ctx.lineTo(80, 1000); ctx.lineTo(1000, 1000); ctx.lineTo(1280, 1500); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ef444455'; for (let i = 0; i < 8; i++) ctx.fillRect(80 + i * 120, 1000, 50, 500);
    breakfast(540, 1250, t);
    // dad behind, hand on the lid
    human(300, 1000, 1.6, { shirt: '#457b9d', pants: '#343a40', hair: '#555', hairStyle: 'short', mustache: true, face: t > r[0] + 1.6 ? 'shock' : 'happy', skin: '#e0a47a', t, shadow: false });
    const lid = clamp((t - r[0] - .8) / .6);
    caydanlik(620, 1010, 1.1, lid, t);
  });
  sunRays(880, 260, t); dust(t, 40);
  if (t > r[0] + 1.4) { const p = clamp((t - r[0] - 1.4) / .25); stampBig(540, 600, 'ÇAYDANLIK BOŞ! ☕', TEA, p); }
}
function stampBig(x, y, text, col, p) { stampHit(x, y, text, col, p); }

// ---------- 2. dad frozen with an empty glass (close-up, background blurred) ----------
function babaScene(t) {
  const r = TL.baba;
  blurred(8, () => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#fde68a'); g.addColorStop(1, '#d97706'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#fff7d6'; rr(640, 300, 360, 460, 20); ctx.fill(); breakfast(540, 1500, t); });
  shot(t, r, 1.0, 1.18, 540, 900, 540, 820, () => {
    human(540, 1350, 3.4, { shirt: '#457b9d', pants: '#343a40', hair: '#555', hairStyle: 'short', mustache: true, face: 'shock', skin: '#e0a47a', t, shadow: false });
    teaGlass(800, 1000, 2.2, 0, false);
  });
  sunRays(900, 200, t, undefined, .15);
  speech(380, 640, 'Peynir çaysız inmez ki!', vis(t, r[0] + .5, r[1] + .3, .2, .2));
}

// ---------- 3. breaking news: the anchor cries live ----------
function haberScene(t) {
  const r = TL.haber;
  shot(t, r, 1.12, 1.0, 540, 900, 540, 960, () => {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0b1d3a'); g.addColorStop(1, '#1e3a8a'); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, H + 200);
    // studio screens
    for (let i = 0; i < 3; i++) { const x = 120 + i * 300; ctx.fillStyle = '#0f172a'; rr(x, 380, 260, 170, 10); ctx.fill(); ctx.fillStyle = i === 1 ? TEA : '#1d4ed8'; rr(x + 10, 390, 240, 150, 6); ctx.fill(); ctx.fillStyle = '#fff'; font(900, 26); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(i === 1 ? '☕ ❌' : 'CANLI', x + 130, 465); }
    glow(540, 700, 500, 'rgba(96,165,250,A)', .25);
    // anchor
    human(540, 1060, 3.0, { shirt: '#111827', pants: '#111827', hair: '#2b1d14', hairStyle: 'short', face: 'shock', skin: '#e9b48a', t, shadow: false });
    for (let i = 0; i < 2; i++) { const p = (t * 1.3 + i * .5) % 1; ctx.fillStyle = `rgba(147,197,253,${1 - p})`; ctx.beginPath(); ctx.ellipse(505 + i * 70, 830 + p * 90, 9, 14, 0, 0, 7); ctx.fill(); } // tears
    // tissue in hand
    ctx.fillStyle = '#fff'; ctx.save(); ctx.translate(430 + Math.sin(t * 6) * 10, 900); ctx.rotate(-.3); rr(-30, -24, 60, 48, 8); ctx.fill(); ctx.restore();
    // desk
    const dg = ctx.createLinearGradient(0, 1080, 0, 1300); dg.addColorStop(0, '#334155'); dg.addColorStop(1, '#0f172a'); ctx.fillStyle = dg; rr(80, 980, 920, 200, 30); ctx.fill();
    ctx.fillStyle = GOLD; font(900, 44); ctx.textAlign = 'center'; ctx.fillText('HABER 24', 540, 1080);
  });
  // lower third + ticker
  ctx.fillStyle = TEA; ctx.fillRect(0, 1180, W, 90); ctx.fillStyle = '#fff'; font(900, 50); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('🔴 SON DAKİKA: ÇAY BİTTİ', 40, 1226);
  ctx.fillStyle = '#111'; ctx.fillRect(0, 1270, W, 50); ctx.fillStyle = '#fde047'; font(800, 30);
  const tick = 'Ülkede çay alarmı · Kahvaltılar iptal · Misafirlere su ikram ediliyor · Uzmanlar sakin olun diyor · '; const tw = ctx.measureText(tick).width; const off = (t * 220) % tw;
  ctx.fillText(tick + tick, -off, 1296);
  grain(t, .05);
}

// ---------- 4. "No tea, no bride!" ----------
function kizScene(t) {
  if (t > TL.kiz[0] + 2.2) sendPrompt('Annene gönder', 1440, vis(t, TL.kiz[0] + 2.2, TL.kiz[1], .25, .2));
  const r = TL.kiz, zoomAt = r[0] + 1.6;
  const z = t < zoomAt ? 1.0 : lerp(1.0, 1.6, easeOut(clamp((t - zoomAt) / .25)));
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-(t < zoomAt ? 540 : lerp(540, 820, clamp((t - zoomAt) / .25))), -(t < zoomAt ? 960 : lerp(960, 900, clamp((t - zoomAt) / .25))));
  // living room with lace curtains, sofas
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#fde2e4'); g.addColorStop(1, '#f8c4b4'); ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, H + 400);
  ctx.fillStyle = '#ffffffaa'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(100 + i * 110, 520, 50, 200, 0, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#8b5e3c'; ctx.fillRect(0, 1260, W, H - 1260);
  ctx.fillStyle = '#7f1d1d'; rr(40, 1060, 420, 180, 40); ctx.fill(); rr(620, 1060, 420, 180, 40); ctx.fill();
  // groom's family on the left, waiting politely
  human(140, 1110, 1.05, { shirt: '#1e3a8a', hair: '#111', hairStyle: 'short', face: 'calm', skin: '#e9b48a', t, shadow: false });
  human(260, 1110, 1.05, { shirt: '#6d597a', skin: '#e9b48a', scarf: '#c77dff', face: 'happy', t, shadow: false });
  human(370, 1110, 1.05, { shirt: '#111827', hair: '#bbb', hairStyle: 'grey', mustache: true, face: 'calm', skin: '#d9a37a', t, shadow: false });
  // bride's father, arms crossed, stern
  human(820, 1110, 1.3, { shirt: '#6b7280', hair: '#555', hairStyle: 'bald', mustache: true, face: 'angry', pose: 'hipsBack', skin: '#d9a37a', t, shadow: false });
  // bride frozen with an empty tray
  human(560, 1180, 1.25, { shirt: '#fbcfe8', hair: '#5a3825', hairStyle: 'long', face: 'shock', skin: '#f3c9a5', t, shadow: false });
  tray(560, 1150, 1.0, 0);
  ctx.restore();
  if (t > zoomAt) { stampHit(540, 640, 'ÇAY YOKSA KIZ DA YOK!', TEA, (t - zoomAt - .1) / .3); }
  // drama-zoom whoosh lines
  if (t > zoomAt && t < zoomAt + .35) { ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 6; for (let i = 0; i < 16; i++) { const a = i / 16 * 6.28; ctx.beginPath(); ctx.moveTo(540 + Math.cos(a) * 300, 900 + Math.sin(a) * 300); ctx.lineTo(540 + Math.cos(a) * 700, 900 + Math.sin(a) * 700); ctx.stroke(); } }
}

// ---------- 5. kahve: okey stopped, everyone stares at empty glasses ----------
function kahveScene(t) {
  const r = TL.kahve;
  shot(t, r, 1.15, 1.0, 620, 1000, 480, 1000, () => {
    const wg = ctx.createLinearGradient(0, 0, 0, H); wg.addColorStop(0, '#3b2418'); wg.addColorStop(1, '#1c110b'); ctx.fillStyle = wg; ctx.fillRect(-200, -200, W + 400, H + 400);
    // hanging lamp cone
    ctx.fillStyle = '#111'; ctx.fillRect(536, 300, 8, 260); ctx.fillStyle = '#d97706'; ctx.beginPath(); ctx.moveTo(470, 600); ctx.lineTo(610, 600); ctx.lineTo(560, 540); ctx.lineTo(520, 540); ctx.fill();
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const lg = ctx.createLinearGradient(0, 600, 0, 1300); lg.addColorStop(0, 'rgba(255,200,120,.35)'); lg.addColorStop(1, 'rgba(255,200,120,0)'); ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(470, 600); ctx.lineTo(610, 600); ctx.lineTo(900, 1300); ctx.lineTo(180, 1300); ctx.fill(); ctx.restore();
    const D = [
      { shirt: '#6f4e37', hair: '#d0d0d0', hairStyle: 'grey', mustache: true, cap: '#4a3b35', skin: '#d9a37a' },
      { shirt: '#3d5a80', hair: '#888', hairStyle: 'short', beard: true, cap: '#2b2d42', skin: '#c68642' },
      { shirt: '#495057', hair: '#bbb', hairStyle: 'bald', mustache: true, glasses: true, skin: '#e0a47a' },
    ];
    human(330, 1130, 1.25, { ...D[0], face: 'shock', t, shadow: false }); human(540, 1090, 1.1, { ...D[1], face: 'shock', t, shadow: false }); human(750, 1130, 1.25, { ...D[2], face: 'shock', t, shadow: false });
    ctx.fillStyle = '#2d6a4f'; rr(160, 1180, 760, 30, 8); ctx.fill(); ctx.fillStyle = '#7f5539'; rr(150, 1205, 780, 20, 6); ctx.fill();
    for (let i = 0; i < 18; i++) { ctx.save(); ctx.translate(200 + rnd(i) * 680, 1170 + rnd(i + 4) * 20); ctx.rotate((rnd(i + 8) - .5) * 1.4); ctx.fillStyle = '#fffaf0'; rr(-10, -14, 20, 28, 3); ctx.fill(); ctx.fillStyle = ['#e63946', '#111', '#ffb703', '#3b82f6'][i % 4]; font(900, 12); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String(i % 13 + 1), 0, 0); ctx.restore(); }
    [330, 540, 750].forEach(x => teaGlass(x, 1140, .6, 0));
  });
  spot(540, 900, 700, .6); dust(t, 30, '255,200,120'); grain(t, .06);
}

// ---------- 6. black market: "Abi taze Rize var" ----------
function karaScene(t) {
  const r = TL.kara;
  shot(t, r, 1.0, 1.25, 540, 960, 600, 920, () => {
    ctx.fillStyle = '#0b1020'; ctx.fillRect(-200, -200, W + 400, H + 400);
    ctx.fillStyle = '#1f2937'; ctx.fillRect(-100, 300, 380, 1100); ctx.fillRect(820, 260, 400, 1140);
    for (let r2 = 0; r2 < 6; r2++) { ctx.fillStyle = rnd(r2) > .5 ? '#fbbf2455' : '#11182788'; ctx.fillRect(40, 360 + r2 * 150, 70, 90); ctx.fillRect(900, 340 + r2 * 150, 70, 90); }
    ctx.fillStyle = '#111827'; ctx.fillRect(0, 1300, W, H - 1300);
    // streetlamp cone
    ctx.fillStyle = '#374151'; ctx.fillRect(700, 500, 14, 800); ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.ellipse(680, 500, 46, 14, 0, 0, 7); ctx.fill();
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const lg = ctx.createLinearGradient(0, 500, 0, 1320); lg.addColorStop(0, 'rgba(253,230,138,.45)'); lg.addColorStop(1, 'rgba(253,230,138,.02)'); ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(640, 505); ctx.lineTo(720, 505); ctx.lineTo(960, 1320); ctx.lineTo(380, 1320); ctx.fill(); ctx.restore();
    // seller in a trench coat, opening it: lined with tea packets
    const open = easeOut(clamp((t - r[0] - .6) / .5));
    ctx.save(); ctx.translate(620, 1100);
    ctx.fillStyle = '#111'; ctx.fillRect(-40, 60, 30, 140); ctx.fillRect(10, 60, 30, 140);
    ctx.fillStyle = '#a16207'; rr(-50, -80, 100, 160, 16); ctx.fill(); // inner lining
    for (let i = 0; i < 8; i++) { const px = -42 + (i % 2) * 44, py = -70 + Math.floor(i / 2) * 36; ctx.fillStyle = i % 3 ? '#16a34a' : TEA; rr(px, py, 40, 32, 4); ctx.fill(); ctx.fillStyle = '#fff'; font(900, 11); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('RİZE', px + 20, py + 16); }
    ctx.fillStyle = '#4b3621'; ctx.beginPath(); ctx.moveTo(-60, -90); ctx.lineTo(-60 - open * 90, 40); ctx.lineTo(-60 - open * 70, 120); ctx.lineTo(-50, 110); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(60, -90); ctx.lineTo(60 + open * 90, 40); ctx.lineTo(60 + open * 70, 120); ctx.lineTo(50, 110); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#4b3621'; rr(-60, -110, 120, 40, 14); ctx.fill();
    ctx.fillStyle = '#e0a47a'; ctx.beginPath(); ctx.arc(0, -140, 34, 0, 7); ctx.fill();
    ctx.fillStyle = '#111'; rr(-34, -150, 68, 16, 5); ctx.fill(); // sunglasses
    ctx.fillStyle = '#292524'; ctx.beginPath(); ctx.ellipse(0, -168, 60, 14, 0, 0, 7); ctx.fill(); rr(-36, -210, 72, 44, 10); ctx.fill(); // fedora
    ctx.restore();
    // customer, amazed
    human(330, 1250, 1.3, { shirt: '#334155', hair: '#111', hairStyle: 'short', face: 'shock', skin: '#e9b48a', t, shadow: false });
    // fog
    for (let i = 0; i < 6; i++) { ctx.fillStyle = 'rgba(148,163,184,.08)'; ctx.beginPath(); ctx.ellipse((i * 260 + t * 30) % 1400 - 200, 1240 + (i % 2) * 40, 300, 60, 0, 0, 7); ctx.fill(); }
  });
  speech(760, 700, 'Abi taze Rize var, gel bak!', vis(t, r[0] + .9, r[1] + .3, .2, .2));
  spot(620, 1000, 650, .7); grain(t, .08);
}

// ---------- 7. Rize: the last tea leaf locked in a bank vault ----------
function kasaScene(t) {
  const r = TL.kasa;
  shot(t, r, 1.0, 1.55, 540, 960, 540, 900, () => {
    const g = ctx.createRadialGradient(540, 900, 50, 540, 900, 1000); g.addColorStop(0, '#374151'); g.addColorStop(1, '#030712'); ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, H + 400);
    // vault door
    ctx.fillStyle = '#6b7280'; ctx.beginPath(); ctx.arc(540, 900, 520, 0, 7); ctx.fill(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(540, 900, 470, 0, 7); ctx.fill();
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.28; ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(540 + Math.cos(a) * 495, 900 + Math.sin(a) * 495, 14, 0, 7); ctx.fill(); }
    // laser grid
    ctx.strokeStyle = 'rgba(239,68,68,.7)'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(140, 640 + i * 90 + Math.sin(t * 2 + i) * 6); ctx.lineTo(940, 700 + i * 80); ctx.stroke(); }
    // pedestal + glass dome + single leaf in a spotlight
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const sg = ctx.createLinearGradient(0, 300, 0, 1000); sg.addColorStop(0, 'rgba(255,255,220,.35)'); sg.addColorStop(1, 'rgba(255,255,220,0)'); ctx.fillStyle = sg; ctx.beginPath(); ctx.moveTo(500, 300); ctx.lineTo(580, 300); ctx.lineTo(700, 1000); ctx.lineTo(380, 1000); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#d1d5db'; rr(450, 960, 180, 240, 10); ctx.fill(); ctx.fillStyle = '#9ca3af'; rr(430, 950, 220, 30, 8); ctx.fill();
    ctx.save(); ctx.translate(540, 880); ctx.rotate(Math.sin(t * 1.5) * .1); ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.moveTo(0, -60); ctx.quadraticCurveTo(46, -10, 0, 50); ctx.quadraticCurveTo(-46, -10, 0, -60); ctx.fill(); ctx.strokeStyle = '#14532d'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -50); ctx.lineTo(0, 46); ctx.stroke(); ctx.restore();
    glow(540, 880, 140, 'rgba(134,239,172,A)', .4);
    ctx.fillStyle = 'rgba(219,234,254,.18)'; ctx.beginPath(); ctx.arc(540, 900, 110, Math.PI, 0); ctx.lineTo(650, 955); ctx.lineTo(430, 955); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 4; ctx.stroke();
    // two guards
    [240, 840].forEach((x, i) => { human(x, 1240, 1.4, { shirt: '#111827', pants: '#111827', hair: '#111', hairStyle: 'short', cap: '#111827', glasses: true, face: 'angry', skin: '#d9a37a', t, bob: i, shadow: false }); });
  });
  pill('🇹🇷 RİZE · MERKEZ BANKASI KASASI', 540, 1250, { size: 32, bg: '#111c', fg: '#fff', alpha: clamp((t - r[0] - .4) / .3) });
  grain(t, .06);
}

// ---------- 8. map: teapot icons going out one by one ----------
const TEA_CITIES = [[28.98, 41.01], [32.86, 39.93], [27.14, 38.42], [40.52, 41.02], [30.7, 36.9], [35.32, 37.0], [41.27, 39.9], [37.02, 39.75], [32.49, 37.87], [29.06, 40.18], [39.72, 41.0], [26.56, 41.68], [43.38, 38.5], [38.79, 37.16]];
function haritaScene(t) {
  const r = TL.harita;
  cam = { lon: 35.35, lat: 39 - 1.2 + Math.sin(t * .3) * .05, z: lerp(1.05, .95, clamp((t - r[0]) / 4)) };
  ctx.fillStyle = '#0b1d3a'; ctx.fillRect(0, 0, W, H);
  drawSea(t); drawMap(t, { island: false });
  TEA_CITIES.forEach(([lo, la], i) => {
    const off = r[0] + .6 + i * .22; const on = t < off; const [x, y] = P(lo, la);
    if (on) glow(x, y, 60, 'rgba(244,185,66,A)', .5);
    ctx.save(); ctx.translate(x, y); ctx.globalAlpha = on ? 1 : .35; ctx.fillStyle = on ? GOLD : '#475569'; rr(-20, -16, 40, 30, 8); ctx.fill(); ctx.fillRect(-12, -26, 24, 12); ctx.restore();
    if (!on && t < off + .3) { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.arc(x, y, 30 * (t - off) / .3 + 10, 0, 7); ctx.fill(); }
  });
  const left = TEA_CITIES.filter((c, i) => t < r[0] + .6 + i * .22).length;
  pill('☕ ÇAYI KALAN ŞEHİR: ' + left, 540, 1250, { size: 40, bg: TEA, fg: '#fff' });
}

// ---------- 9. finale card ----------
function finScene(t) {
  const g = ctx.createRadialGradient(540, 900, 100, 540, 900, 1100); g.addColorStop(0, '#7c2d12'); g.addColorStop(1, '#1c0a05'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  dust(t, 40, '255,200,150');
  const k = 1 + Math.sin(t * 2) * .02;
  ctx.save(); ctx.translate(540, 900); ctx.scale(k, k); teaGlass(0, 0, 3.2, 0, true); ctx.restore();
  glow(540, 900, 300, 'rgba(244,185,66,A)', .2);
}

// ---------- render: scenes with soft cross-fades ----------
const SCENES = [['kahvalti', kahvaltiScene], ['baba', babaScene], ['haber', haberScene], ['kiz', kizScene], ['kahve', kahveScene], ['kara', karaScene], ['kasa', kasaScene], ['harita', haritaScene], ['fin', finScene]];
const TITLES = {
  baba: [['BABALAR', 96, '#fff'], ['DONDU 🧊', 96, GOLD]], haber: [['SON DAKİKA', 96, '#fff']], kahve: [['OKEY', 104, '#fff'], ['DURDU 🎲', 96, GOLD]],
  kara: [['KARABORSA', 104, GOLD]], kasa: [['SON YAPRAK', 96, '#fff'], ['KASADA 🔒', 96, '#86efac']],
};
function render(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  SCENES.forEach(([k, fn]) => {
    const r = TL[k]; if (!r || t < r[0] - .02 || t > r[1] + .35) return;
    const a = t > r[1] ? 1 - (t - r[1]) / .35 : 1;
    ctx.save(); ctx.globalAlpha = clamp(a); fn(t); ctx.restore();
    if (TITLES[k] && t < r[1]) title(TITLES[k], r[0] + .15, r[1], t, 350);
  });
  if (t < TL.kahvalti[1]) title([['ÇAY', 120, '#fff'], ['BİTTİ! ☕', 120, GOLD]], .1, TL.kahvalti[1], t, 380);
  if (t >= TL.kiz[0] && t < TL.kiz[0] + 1.6) title([['KIZ İSTEME', 96, '#fff']], TL.kiz[0] + .1, TL.kiz[0] + 1.6, t, 350);
  // the question: on screen only (not in the voiceover)
  if (t >= TL.soru[0] - .05 && t < TL.soru[1] + .3) {
    const a = vis(t, TL.soru[0], TL.soru[1], .2, .25), k = lerp(.6, 1, backOut(clamp((t - TL.soru[0]) / .35)));
    ctx.save(); ctx.globalAlpha = a; ctx.translate(540, 1560); ctx.scale(k, k);
    softShadow(() => { rr(-380, -56, 760, 112, 28); ctx.fillStyle = GOLD; ctx.fill(); }, 30, 'rgba(0,0,0,.5)', 10);
    ctx.fillStyle = '#111'; font(900, 46); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('💬 SEN OLSAN NE YAPARDIN?', 0, 2);
    ctx.restore();
  }
  if (t >= TL.harita[0]) { title([['TÜRKİYE ÇAYSIZ', 80, '#fff'], ['KAÇ GÜN DAYANIR?', 80, GOLD]], TL.harita[0] + .2, TL.fin[0], t, 380); }
  if (t >= TL.fin[0]) {
    title([['ÇAYSIZ DAYANAMAYACAK', 64, '#fff'], ['ARKADAŞINI', 96, GOLD], ['ETİKETLE 🏷️', 96, GOLD]], TL.fin[0] + .1, 99, t, 420);
    pill("⏳ BÖLÜM 2'DE", 540, 1560, { size: 46, bg: GOLD, fg: '#111', alpha: clamp((t - TL.fin[0] - .4) / .25) });
  }
  subtitles(t);
  badge();
  if (t < .15) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .15})`; ctx.fillRect(0, 0, W, H); }
}
