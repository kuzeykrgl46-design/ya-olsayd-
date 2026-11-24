// ===== Ya Olsaydı? #3 · İnternet · Bölüm 4 (final): İnternet geri geliyor =====
// Uses lib_internet.js + lib_b2.js. TL comes from timeline4.js (estimate until the voiceover exists).
let T = 0;
const TL = window.TL || {
  uzay: [0, 4], dizi: [4, 9], kablo: [9, 14], plug: 13.2, geri: [14, 19], teyze: [19, 23], anne: [23, 28], ekmek: 25.5, fin: [28, 31], dur: 31,
};
const SUBS = window.SUBS_DATA || [];

function brightGlobe(cx, cy, R, rot, lights = 0) {
  glow(cx, cy, R * 1.3, 'rgba(120,190,255,A)', .45);
  const og = ctx.createRadialGradient(cx - R * .35, cy - R * .35, R * .1, cx, cy, R); og.addColorStop(0, '#5fa8ff'); og.addColorStop(1, '#1d4ed8');
  ctx.fillStyle = og; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();
  LAND.forEach(poly => { ctx.beginPath(); let st = false; poly.forEach(([lo, la]) => { const [x, y, d] = proj(lo, la, rot, R, cx, cy); if (d < -0.1) return; st ? ctx.lineTo(x, y) : (ctx.moveTo(x, y), st = true); }); ctx.closePath(); ctx.fillStyle = '#57cc99'; ctx.fill(); ctx.strokeStyle = '#38a3a5'; ctx.lineWidth = 3; ctx.stroke(); });
  for (let i = 0; i < 18; i++) { ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.ellipse(cx + (rnd(i) - .5) * R * 1.6, cy + (rnd(i + 5) - .5) * R * 1.6, R * .18, R * .05, rnd(i + 2), 0, 7); ctx.fill(); }
  for (let i = 0; i < 300; i++) { if (rnd(i + 99) > lights) continue; const lo = rnd(i * 2) * 360 - 180, la = rnd(i * 2 + 1) * 120 - 55; const [x, y, d] = proj(lo, la, rot, R, cx, cy); if (d < .05) continue; ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.arc(x, y, 3 + rnd(i + 3) * 3, 0, 7); ctx.fill(); }
  ctx.restore();
  ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
}
function spaceBack(t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1e3a8a'); g.addColorStop(1, '#312e81'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 160; i++) { ctx.fillStyle = `rgba(255,255,255,${.4 + rnd(i + 4) * .6})`; ctx.beginPath(); ctx.arc(rnd(i) * W, rnd(i + 3) * H, 1.5 + rnd(i + 8) * 2 + Math.sin(t * 3 + i) * .6, 0, 7); ctx.fill(); }
}
function sat(x, y, s, t, sparks) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * .8) * .06); ctx.scale(s, s);
  for (const dx of [-250, 90]) { const g = ctx.createLinearGradient(dx, 0, dx + 160, 0); g.addColorStop(0, '#1d4ed8'); g.addColorStop(1, '#60a5fa'); ctx.fillStyle = g; ctx.fillRect(dx, -60, 160, 120); ctx.strokeStyle = '#bfdbfe'; ctx.lineWidth = 3; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(dx + i * 32, -60); ctx.lineTo(dx + i * 32, 60); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(dx, 0); ctx.lineTo(dx + 160, 0); ctx.stroke(); }
  ctx.fillStyle = '#cbd5e1'; ctx.fillRect(-90, -10, 180, 20);
  const bg = ctx.createLinearGradient(-70, -70, 70, 70); bg.addColorStop(0, '#fde68a'); bg.addColorStop(1, '#f59e0b'); ctx.fillStyle = bg; rr(-70, -80, 140, 160, 16); ctx.fill();
  ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.ellipse(0, -110, 60, 20, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(-4, -110, 8, 30);
  if (sparks) for (let i = 0; i < 8; i++) { const a = rnd(i + Math.floor(t * 20)) * 6.28, r = 30 + rnd(i * 3 + Math.floor(t * 20)) * 50; ctx.strokeStyle = '#fde047'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(60, 40); ctx.lineTo(60 + Math.cos(a) * r, 40 + Math.sin(a) * r); ctx.stroke(); }
  ctx.restore();
}
function astronaut(x, y, s, t, opts = {}) {
  const { armUp = 0, cableL = null, cableR = null, sweat = false, face = 'calm' } = opts;
  ctx.save(); ctx.translate(x, y + Math.sin(t * 2) * 8); ctx.rotate(Math.sin(t * 1.3) * .05); ctx.scale(s, s);
  ctx.fillStyle = '#f1f5f9'; rr(-22, 40, 20, 70, 10); ctx.fill(); rr(4, 40, 20, 70, 10); ctx.fill();
  ctx.fillStyle = '#94a3b8'; rr(-26, 104, 26, 16, 6); ctx.fill(); rr(2, 104, 26, 16, 6); ctx.fill();
  ctx.fillStyle = '#cbd5e1'; rr(-46, -40, 20, 90, 8); ctx.fill(); // backpack edge
  ctx.fillStyle = '#f8fafc'; rr(-38, -40, 76, 90, 22); ctx.fill();
  ctx.fillStyle = TR_RED; ctx.fillRect(-30, -24, 26, 18); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-19, -15, 5, 0, 7); ctx.fill(); ctx.fillStyle = TR_RED; ctx.beginPath(); ctx.arc(-17.5, -15, 4, 0, 7); ctx.fill();
  ctx.fillStyle = '#3b82f6'; rr(6, -10, 22, 14, 4); ctx.fill(); ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(12, 16, 4, 0, 7); ctx.arc(22, 16, 4, 0, 7); ctx.fill();
  const arm = (sx, ang) => { ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 20; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx, -28); const ex = sx + Math.sin(ang) * 70, ey = -28 + Math.cos(ang) * 70; ctx.lineTo(ex, ey); ctx.stroke(); ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(ex, ey, 13, 0, 7); ctx.fill(); return [ex, ey]; };
  const L = arm(-36, -.6 - armUp), R = arm(36, .6 + armUp);
  const cable = (h, col) => { ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(h[0], h[1]); ctx.quadraticCurveTo(h[0] + (h[0] > 0 ? 40 : -40), h[1] + 80, h[0] + (h[0] > 0 ? 10 : -10), h[1] + 160); ctx.stroke(); ctx.fillStyle = '#facc15'; ctx.fillRect(h[0] - 7, h[1] - 22, 14, 18); };
  if (cableL) cable(L, cableL); if (cableR) cable(R, cableR);
  // helmet with the cousin's face
  ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.arc(0, -80, 52, 0, 7); ctx.fill();
  ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(0, -78, 40, 0, 7); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(0, -78, 40, 0, 7); ctx.clip();
  ctx.fillStyle = '#e9b48a'; ctx.beginPath(); ctx.arc(0, -72, 28, 0, 7); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(0, -86, 28, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#111'; const eo = face === 'shock' ? 4.5 : 3.5; ctx.beginPath(); ctx.arc(-10, -74, eo, 0, 7); ctx.arc(10, -74, eo, 0, 7); ctx.fill();
  ctx.strokeStyle = '#5c1a1a'; ctx.lineWidth = 3; ctx.beginPath(); if (face === 'happy') ctx.arc(0, -64, 9, .2, Math.PI - .2); else if (face === 'shock') { ctx.ellipse(0, -58, 5, 7, 0, 0, 7); } else { ctx.moveTo(-7, -60); ctx.lineTo(7, -60); } ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(-16, -96, 14, 8, -.6, 0, 7); ctx.fill();
  ctx.restore();
  if (sweat) for (let i = 0; i < 3; i++) { const p = (t * 1.5 + i / 3) % 1; ctx.fillStyle = `rgba(147,197,253,${1 - p})`; ctx.beginPath(); ctx.ellipse(48 + i * 10, -100 + p * 60, 6, 10, 0, 0, 7); ctx.fill(); }
  ctx.restore();
}

// ---------- 1. bright space: the cousin fixing the satellite ----------
function uzayScene(t) {
  spaceBack(t);
  brightGlobe(540, 1750, 820, 30 + t * 3, 0);
  sat(650, 640, 1.15, t, true);
  astronaut(330, 880, 1.6, t, { armUp: .9, cableR: '#e63946' });
}

// ---------- 2. wrong cable: a Turkish drama on every screen on Earth ----------
function dizi(cx, cy, w, h, t) {
  ctx.save(); rr(cx - w / 2, cy - h / 2, w, h, 10); ctx.clip();
  const g = ctx.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); g.addColorStop(0, '#f97316'); g.addColorStop(.6, '#fb7185'); g.addColorStop(1, '#7c2d12'); ctx.fillStyle = g; ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(cx, cy + h * .1, h * .22, 0, 7); ctx.fill();
  ctx.fillStyle = '#1e1b4b'; ctx.fillRect(cx - w / 2, cy + h * .22, w, h * .3); // sea at sunset (Bosphorus)
  ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.moveTo(cx - w / 2, cy + h * .22); ctx.lineTo(cx - w * .3, cy + h * .05); ctx.lineTo(cx - w * .26, cy + h * .22); ctx.fill(); // minaret silhouette
  ctx.fillRect(cx - w * .42, cy - h * .05, 6, h * .27);
  // two characters, dramatic stare
  const sh = Math.sin(t * 2) * 3;
  [[-w * .16, '#111827', 'short'], [w * .16, '#7f1d1d', 'long']].forEach(([dx, c, hs], i) => {
    ctx.fillStyle = c; rr(cx + dx - 30, cy + h * .02 + sh, 60, h * .3, 14); ctx.fill();
    ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(cx + dx, cy - h * .05 + sh, 26, 0, 7); ctx.fill();
    ctx.fillStyle = '#2b1d14'; ctx.beginPath(); ctx.arc(cx + dx, cy - h * .09 + sh, 27, Math.PI, 0); ctx.fill(); if (hs === 'long') ctx.fillRect(cx + dx - 27, cy - h * .09 + sh, 12, 50);
  });
  ctx.fillStyle = '#fff'; font(800, Math.round(h * .07)); ctx.textAlign = 'right'; ctx.textBaseline = 'top'; ctx.fillText('BÖLÜM 1', cx + w / 2 - 14, cy - h / 2 + 10);
  ctx.restore();
}
function diziScene(t) {
  spaceBack(t);
  brightGlobe(540, 600, 200, 40 + t * 8, 0);
  // little rays from the satellite to every TV
  const panels = [[200, 960, '🇯🇵'], [540, 960, '🇺🇸'], [880, 960, '🇧🇷'], [370, 1190, '🇩🇪'], [710, 1190, '🇬🇧']];
  panels.forEach(([x, y, f], i) => {
    const a = clamp((t - TL.dizi[0] - .3 - i * .12) / .3); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(253,224,71,.6)'; ctx.lineWidth = 4; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(540, 800); ctx.lineTo(x, y - 110); ctx.stroke(); ctx.setLineDash([]);
    softShadow(() => { ctx.fillStyle = '#0f0f12'; rr(x - 150, y - 105, 300, 190, 14); ctx.fill(); }, 20, 'rgba(0,0,0,.5)', 8);
    dizi(x, y - 10, 280, 170, t);
    ctx.fillStyle = '#fff'; font(400, 40); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(f, x - 110, y - 70);
    ctx.restore();
  });
}

// ---------- 3. red or blue? ----------
function kabloScene(t) {
  spaceBack(t);
  brightGlobe(540, 1900, 900, 30, 0);
  sat(540, 470, 1.0, t, true);
  astronaut(540, 980, 2.3, t, { armUp: .4, cableL: '#e63946', cableR: '#3b82f6', sweat: true, face: 'shock' });
  // a ticking countdown feel
  const k = 1 + Math.sin(t * 10) * .04;
  ctx.save(); ctx.translate(180, 720); ctx.scale(k, k); ctx.fillStyle = '#111c'; ctx.beginPath(); ctx.arc(0, 0, 70, 0, 7); ctx.fill(); ctx.fillStyle = '#fde047'; font(900, 60); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('⏱', 0, 4); ctx.restore();
}

// ---------- 4. internet is back ----------
function bike(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#111'; ctx.lineWidth = 6; [-70, 70].forEach(dx => { ctx.beginPath(); ctx.arc(dx, 0, 50, 0, 7); ctx.stroke(); ctx.save(); ctx.translate(dx, 0); ctx.rotate(t * 6); ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(50, 0); ctx.moveTo(0, -50); ctx.lineTo(0, 50); ctx.stroke(); ctx.restore(); });
  ctx.strokeStyle = '#10b981'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-10, -70); ctx.lineTo(50, -70); ctx.lineTo(70, 0); ctx.moveTo(-10, -70); ctx.lineTo(0, 0); ctx.lineTo(-70, 0); ctx.moveTo(50, -70); ctx.lineTo(56, -100); ctx.stroke();
  ctx.restore();
}
function trophy(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const g = ctx.createLinearGradient(-40, -120, 40, 0); g.addColorStop(0, '#fef08a'); g.addColorStop(1, '#ca8a04'); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(-34, -130); ctx.quadraticCurveTo(-40, -60, -10, -40); ctx.lineTo(-14, -10); ctx.lineTo(14, -10); ctx.lineTo(10, -40); ctx.quadraticCurveTo(40, -60, 34, -130); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -138, 24, 0, 7); ctx.fill();
  ctx.fillStyle = '#166534'; rr(-26, -10, 52, 22, 4); ctx.fill(); ctx.fillStyle = '#ca8a04'; rr(-20, 12, 40, 10, 3); ctx.fill();
  ctx.restore();
}
function scorePhone(cx, cy, s, t, open) {
  ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s); ctx.rotate(-.04);
  softShadow(() => { ctx.fillStyle = '#111'; rr(-160, -300, 320, 600, 42); ctx.fill(); }, 40, 'rgba(0,0,0,.5)', 14);
  ctx.fillStyle = '#f8fafc'; rr(-142, -272, 284, 544, 28); ctx.fill();
  ctx.fillStyle = '#111'; font(800, 20); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('19:42', -118, -246); ctx.textAlign = 'right'; ctx.fillStyle = '#16a34a'; ctx.fillText('📶 4.5G', 118, -246);
  ctx.fillStyle = '#e9ecef'; rr(-120, -220, 240, 40, 20); ctx.fill(); ctx.fillStyle = '#6c757d'; font(700, 18); ctx.textAlign = 'left'; ctx.fillText('🔒 canli-skor…', -104, -200);
  if (!open) { ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, -10, 44, t * 6, t * 6 + 4.2); ctx.stroke(); }
  else {
    ctx.fillStyle = '#0f172a'; rr(-120, -160, 240, 44, 10); ctx.fill(); ctx.fillStyle = '#fde047'; font(900, 18); ctx.textAlign = 'center'; ctx.fillText('DÜNYA KUPASI · FİNAL', 0, -138);
    ctx.fillStyle = '#fff'; rr(-120, -104, 240, 190, 14); ctx.fill(); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#16a34a'; rr(-30, -96, 60, 30, 8); ctx.fill(); ctx.fillStyle = '#fff'; font(900, 20); ctx.fillText('MS', 0, -81);
    trFlag(-112, -96, 48, 32); brFlag(64, -96, 48, 32);
    ctx.fillStyle = '#111'; font(900, 60); ctx.fillText('2 - 1', 0, -26); font(800, 22); ctx.fillText('TÜR', -73, 10); ctx.fillText('BRA', 73, 10);
    ctx.fillStyle = '#6b7280'; font(700, 18); ctx.fillText("⚽ 90+4' (P)", 0, 50);
    trophy(0, 230, .9);
  }
  ctx.restore();
}
function celebrate(t) {
  const sg = ctx.createLinearGradient(0, 0, 0, H); sg.addColorStop(0, '#0b132b'); sg.addColorStop(1, '#1b263b'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
  // fireworks
  for (let k = 0; k < 4; k++) { const ph = (t * .7 + k * .27) % 1, fx = 180 + k * 240, fy = 420 + (k % 2) * 140; ctx.save(); ctx.globalAlpha = 1 - ph; for (let i = 0; i < 14; i++) { const a = i / 14 * 6.28; ctx.strokeStyle = [TR_RED, '#fff', '#fde047'][i % 3]; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(fx + Math.cos(a) * ph * 40, fy + Math.sin(a) * ph * 40); ctx.lineTo(fx + Math.cos(a) * ph * 120, fy + Math.sin(a) * ph * 120); ctx.stroke(); } ctx.restore(); }
  [[0, 560, 280, '#415a77'], [270, 500, 270, '#4f6d8f'], [530, 580, 260, '#3d5a80'], [780, 520, 300, '#415a77']].forEach(([x, y, w, c], k) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, 1250 - y); for (let r = 0; r < 5; r++) for (let q = 0; q < 3; q++) { ctx.fillStyle = '#ffd166'; ctx.fillRect(x + 30 + q * 80, y + 40 + r * 120, 46, 66); } trFlag(x + w / 2 - 40, y + 20, 80, 54, t * 4 + k); });
  ctx.fillStyle = '#334155'; ctx.fillRect(0, 1250, W, H - 1250);
  // players lifting the cup in the middle
  [[400, -1], [680, 1]].forEach(([x], i) => { const j = Math.abs(Math.sin(t * 6 + i)) * 20; player(x, 1060 - j, 3.2, { shirt: TR_RED, shorts: '#fff', socks: TR_RED, stripe: '#fff' }, t, 0, true); });
  const jj = Math.abs(Math.sin(t * 6)) * 20; trophy(540, 860 - jj, 1.6);
  // notification bubbles from everyone's phones
  [[130, 0], [950, 7]].forEach(([x, id], i) => { castMember(id, x, 1200, .95, { pose: 'shout', face: 'shout', t, bob: i, shadow: false });
    for (let k = 0; k < 3; k++) { const q = (t * 1.2 + k / 3 + i * .3) % 1; ctx.save(); ctx.globalAlpha = 1 - q; ctx.translate(x + Math.sin(k * 2 + i) * 40, 960 - q * 220); rr(-56, -18, 112, 36, 18); ctx.fillStyle = '#ef4444'; ctx.fill(); ctx.fillStyle = '#fff'; font(800, 20); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('🔔 +' + (999 - k * 123 - i * 77), 0, 1); ctx.restore(); } });
  const bx = ((t - TL.geri[0]) * 170) % 1400 - 200;
  bike(bx, 1240, .9, t); human(bx, 1150, .9, { shirt: '#10b981', hair: '#5a3825', hairStyle: 'short', face: 'calm', skin: '#f1c27d', t, shadow: false });
}
function geriScene(t) {
  const g0 = TL.geri[0], skorAt = TL.skorAc || g0 + 1.2, champ = TL.sampiyon || g0 + 2.8;
  if (t < skorAt) { const p = clamp((t - g0) / (skorAt - g0)); spaceBack(t); brightGlobe(540, 900, lerp(420, 600, p), 20 + t * 6, p); stampHit(540, 560, '📶 İNTERNET GELDİ!', '#16a34a', (t - g0 - .3) / .3); return; }
  if (t < champ) {
    const wg = ctx.createLinearGradient(0, 0, 0, H); wg.addColorStop(0, '#5e3b2c'); wg.addColorStop(1, '#3b2418'); ctx.fillStyle = wg; ctx.fillRect(0, 0, W, H);
    const open = t > skorAt + .5;
    castMember(0, 140, 1300, 1.05, { pose: 'phoneUp', face: open ? 'shout' : 'shock', t, shadow: false });
    human(940, 1300, 1.1, { shirt: TR_RED, pants: '#fff', hair: '#111', hairStyle: 'short', face: open ? 'shout' : 'shock', pose: 'phoneUp', skin: '#e9b48a', t, shadow: false });
    scorePhone(540, 820, 1.1, t, open);
    credit('Yorumlardan: @umutbaran0643', 1250, vis(t, skorAt + .2, champ + .2, .2, .2));
    return;
  }
  celebrate(t);
  credit('Yorumlardan: @umut.tekinkus 🚲', 1250, vis(t, champ + .6, TL.geri[1] + .2, .2, .2));
}

// ---------- 5. auntie's first message ----------
function teyzeScene(t) {
  ctx.fillStyle = '#fde68a'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#ffffff44'; for (let i = 0; i < 12; i++) ctx.fillRect(i * 100, 0, 40, H);
  ctx.fillStyle = '#a16207'; ctx.fillRect(0, 1300, W, H - 1300);
  // big phone with the family group
  ctx.save(); ctx.translate(680, 820); ctx.rotate(.04);
  softShadow(() => { ctx.fillStyle = '#111'; rr(-220, -380, 440, 760, 50); ctx.fill(); }, 40, 'rgba(0,0,0,.4)', 12);
  ctx.fillStyle = '#ece5dd'; rr(-200, -350, 400, 700, 34); ctx.fill();
  ctx.fillStyle = '#075e54'; rr(-200, -350, 400, 90, 34); ctx.fillRect(-200, -300, 400, 40); ctx.fillStyle = '#fff'; font(800, 30); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('👨‍👩‍👧 Aile ❤️', -170, -306);
  const p = clamp((t - TL.teyze[0] - .5) / .4);
  if (p > 0) { ctx.save(); ctx.globalAlpha = p; ctx.translate(0, (1 - p) * 40);
    rr(-170, -220, 300, 330, 18); ctx.fillStyle = '#fff'; ctx.fill();
    const fg = ctx.createLinearGradient(0, -200, 0, 40); fg.addColorStop(0, '#f9a8d4'); fg.addColorStop(1, '#fde68a'); ctx.fillStyle = fg; rr(-155, -205, 270, 220, 12); ctx.fill();
    for (let i = 0; i < 5; i++) { const fx = -110 + i * 55, fy = -90 + Math.sin(i * 2) * 30; ctx.fillStyle = ['#ef4444', '#f97316', '#ec4899', '#a855f7', '#ef4444'][i]; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(fx + Math.cos(k) * 14, fy + Math.sin(k) * 14, 11, 0, 7); ctx.fill(); } ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(fx, fy, 9, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#be185d'; font(900, 40); ctx.textAlign = 'center'; ctx.fillText('Günaydın ☕', -20, -160);
    ctx.fillStyle = '#111'; font(700, 22); ctx.textAlign = 'left'; ctx.fillText('Teyze  🌸🌸🌸', -150, 60); ctx.fillStyle = '#6b7280'; font(600, 18); ctx.textAlign = 'right'; ctx.fillText('07:01 ✓✓', 120, 90);
    ctx.restore(); }
  ctx.restore();
  human(250, 1240, 1.55, { ...CAST[8], face: 'happy', pose: 'phoneUp', t, shadow: false });
}

// ---------- 6. hero's welcome... and mum at the door ----------
function rocketSmall(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const fl = 50 + Math.sin(t * 30) * 12; ctx.fillStyle = '#fb923c'; ctx.beginPath(); ctx.moveTo(-26, 110); ctx.lineTo(0, 110 + fl); ctx.lineTo(26, 110); ctx.fill();
  ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.moveTo(0, -140); ctx.quadraticCurveTo(60, -50, 52, 110); ctx.lineTo(-52, 110); ctx.quadraticCurveTo(-60, -50, 0, -140); ctx.fill();
  ctx.fillStyle = TR_RED; ctx.beginPath(); ctx.moveTo(-52, 50); ctx.lineTo(-90, 120); ctx.lineTo(-52, 110); ctx.fill(); ctx.beginPath(); ctx.moveTo(52, 50); ctx.lineTo(90, 120); ctx.lineTo(52, 110); ctx.fill();
  ctx.fillStyle = '#60a5fa'; ctx.beginPath(); ctx.arc(0, -30, 28, 0, 7); ctx.fill(); trFlag(-20, 20, 40, 28);
  ctx.restore();
}
function anneScene(t) {
  const sg = ctx.createLinearGradient(0, 0, 0, H); sg.addColorStop(0, '#93c5fd'); sg.addColorStop(1, '#fef3c7'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#e9d8a6'; ctx.fillRect(560, 560, 480, 640); ctx.fillStyle = '#fff'; rr(540, 540, 520, 34, 12); ctx.fill();
  ctx.fillStyle = '#7c4a2d'; ctx.fillRect(700, 880, 200, 320); ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(870, 1140, 9, 0, 7); ctx.fill();
  ctx.fillStyle = '#bde0fe'; [[600, 640], [860, 640]].forEach(([x, y]) => { ctx.fillRect(x, y, 140, 150); ctx.strokeStyle = '#fff'; ctx.lineWidth = 8; ctx.strokeRect(x, y, 140, 150); });
  ctx.fillStyle = '#94a3b8'; ctx.fillRect(0, 1200, W, H - 1200);
  // rocket landing behind the cousin, smoke
  const land = easeOut(clamp((t - TL.anne[0]) / 1.0));
  rocketSmall(150, lerp(400, 1040, land), .9, t);
  for (let i = 0; i < 6; i++) { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.arc(80 + i * 40, 1190 - Math.sin(i) * 20, 40 * land, 0, 7); ctx.fill(); }
  // neighbours clapping
  [[330, 2], [470, 6]].forEach(([x, id], i) => castMember(id, x, 1170, .95, { face: 'happy', pose: Math.sin(t * 12 + i) > 0 ? 'shout' : 'down', t, bob: i, shadow: false }));
  // the cousin (still in his helmet) and mum at the door
  astronaut(560, 1060, 1.25, t, { face: 'shock' });
  human(800, 1170, 1.55, { shirt: '#8e44ad', hair: '#4a2c1a', hairStyle: 'long', face: 'angry', pose: 'hipsBack', skin: '#e9b48a', t, shadow: false });
  if (t > TL.ekmek) speech(760, 860, 'Uzaya gittin de ekmek almadın mı?!', clamp((t - TL.ekmek) / .25));
  stampHit(540, 560, '✅ "EVET" DİYENLER HAKLIYMIŞ', '#16a34a', (t - TL.anne[0] - .6) / .3);
  credit('Yorumlardan: @patronus_tk · @alperen_macit34', 680, vis(t, TL.anne[0] + .8, TL.anne[1], .25, .2));
}

// ---------- 7. series finale card ----------
function finScene(t) {
  spaceBack(t);
  brightGlobe(540, 1000, 380, 20 + t * 10, 1);
  trFlag(470, 560, 140, 94, t * 4);
}

// ---------- render ----------
function render(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const inR = r => t >= r[0] - .05 && t < r[1] + .3;
  if (t < TL.uzay[1] + .3) { uzayScene(t); title([['KUZEN', 96, '#fff'], ['UZAYDA 🛰️', 104, '#fde047']], .1, TL.uzay[1], t, 350); }
  if (inR(TL.dizi)) { sceneSlide(t, TL.dizi[0], () => diziScene(t)); title([['YANLIŞ KABLO!', 84, '#fff'], ['HERKES TÜRK DİZİSİNDE 📺', 56, '#fde047']], TL.dizi[0] + .1, TL.dizi[1], t, 330); }
  if (inR(TL.kablo)) {
    sceneSlide(t, TL.kablo[0], () => kabloScene(t));
    const a = vis(t, TL.kablo[0] + .4, TL.kablo[1], .25, .2), k = lerp(.6, 1, backOut(clamp((t - TL.kablo[0] - .4) / .35)));
    ctx.save(); ctx.globalAlpha = a; ctx.translate(540, 330); ctx.scale(k, k);
    softShadow(() => { rr(-410, -80, 820, 160, 30); ctx.fillStyle = '#ffd166'; ctx.fill(); }, 30, 'rgba(0,0,0,.5)', 10);
    ctx.fillStyle = '#111'; font(900, 50); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('💬 SENCE HANGİSİ?', 0, -18);
    font(900, 40); ctx.fillStyle = '#e63946'; ctx.fillText('🔴 KIRMIZI', -150, 42); ctx.fillStyle = '#111'; ctx.fillText('mı', 0, 42); ctx.fillStyle = '#2563eb'; ctx.fillText('MAVİ 🔵', 150, 42);
    ctx.restore();
  }
  if (inR(TL.geri)) {
    sceneSlide(t, TL.geri[0], () => geriScene(t));
    const sk = TL.skorAc || TL.geri[0] + 1.2, ch = TL.sampiyon || TL.geri[0] + 2.8;
    if (t >= sk && t < ch) title([['SKOR SİTELERİ', 76, '#fff'], ['SONUNDA AÇILDI 📲', 76, '#fde047']], sk + .05, ch, t, 350);
    if (t >= ch) title([['TÜRKİYE', 96, '#fff'], ['DÜNYA ŞAMPİYONU 🏆', 78, '#fde047']], ch, TL.geri[1], t, 330);
  }
  if (inR(TL.teyze)) { sceneSlide(t, TL.teyze[0], () => teyzeScene(t)); title([['TEYZENİN', 76, '#fff'], ['İLK MESAJI 🌸', 92, '#be185d']], TL.teyze[0] + .1, TL.teyze[1], t, 350); sendPrompt('Aile grubuna gönder', 1560, vis(t, TL.teyze[0] + 1, TL.teyze[1] + .2, .25, .2)); }
  if (inR(TL.anne)) { sceneSlide(t, TL.anne[0], () => anneScene(t)); title([['KAHRAMAN', 84, '#fff'], ['EVE DÖNDÜ 🚀', 92, '#ffd166']], TL.anne[0] + .1, TL.ekmek, t, 330); }
  if (t >= TL.fin[0] - .05) {
    sceneSlide(t, TL.fin[0], () => finScene(t));
    title([['İNTERNET GELİNCE', 72, '#fff'], ['İLK NEYE BAKARDIN?', 80, '#fde047']], TL.fin[0] + .1, 99, t, 360);
    pill('💬 Yorumlara yaz', 540, 1560, { size: 46, bg: '#ffd166', fg: '#111', alpha: clamp((t - TL.fin[0] - .4) / .25) });
    pill('🌍 İNTERNET SERİSİ BİTTİ', 540, 1250, { size: 40, bg: '#111c', fg: '#fff', alpha: clamp((t - TL.fin[0] - .2) / .25) });
  }
  subtitles(t);
  badge();
  if (t < .12) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .12})`; ctx.fillRect(0, 0, W, H); }
}
