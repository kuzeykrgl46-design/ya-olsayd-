// ===== Ya Olsaydı? #3 · İnternet · Bölüm 3: İnternetsiz dünyada ilk sabah =====
// Uses lib_internet.js + lib_b2.js. TL comes from timeline3.js (estimate until the voiceover exists).
let T = 0;
const TL = window.TL || {
  hook: [0, 4], frozen: 2.0, japan: [4, 8], usa: [8, 11], infl: [11, 17], soru: [14, 17], taksi: [17, 21], anne: [21, 25], evde: 23,
  teyze: [25, 27], skor: [27, 29], uzay: [29, 35], b4: 33, dur: 35,
};
const SUBS = window.SUBS_DATA || [];

function flagBadge(code, x, y0, a = 1) { const y = 1250; pill(code, x, y, { size: 40, bg: '#111c', fg: '#fff', alpha: a }); }
function phoneSmall(x, y, s, ang = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  ctx.fillStyle = '#111'; rr(-16, -28, 32, 56, 6); ctx.fill(); ctx.fillStyle = '#c9d6e2'; rr(-13, -24, 26, 46, 4); ctx.fill();
  ctx.fillStyle = '#e63946'; ctx.font = '900 14px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('✕', 0, 0);
  ctx.restore();
}
function globe(cx, cy, R, rot, lightsOn) {
  glow(cx, cy, R * 1.25, 'rgba(70,130,255,A)', .22);
  const og = ctx.createRadialGradient(cx - R * .3, cy - R * .3, R * .1, cx, cy, R); og.addColorStop(0, '#1b3b6f'); og.addColorStop(1, '#061226');
  ctx.fillStyle = og; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();
  LAND.forEach(poly => { ctx.beginPath(); let st = false; poly.forEach(([lo, la]) => { const [x, y, d] = proj(lo, la, rot, R, cx, cy); if (d < -0.1) return; st ? ctx.lineTo(x, y) : (ctx.moveTo(x, y), st = true); }); ctx.closePath(); ctx.fillStyle = '#0f2a1d'; ctx.fill(); });
  for (let i = 0; i < 300; i++) { const lo = rnd(i * 2) * 360 - 180, la = rnd(i * 2 + 1) * 120 - 55; const [x, y, d] = proj(lo, la, rot, R, cx, cy); if (d < .05 || rnd(i + 99) > lightsOn) continue; ctx.fillStyle = 'rgba(255,209,102,.8)'; ctx.beginPath(); ctx.arc(x, y, 2 + rnd(i + 3) * 2.5, 0, 7); ctx.fill(); }
  ctx.restore();
}

// ---------- 1. hook: dark globe, then a whole block frozen over their phones ----------
function hookScene(t) {
  if (t < TL.frozen) {
    ctx.fillStyle = '#030712'; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 120; i++) { ctx.fillStyle = `rgba(255,255,255,${.2 + rnd(i + 4) * .6})`; ctx.beginPath(); ctx.arc(rnd(i) * W, rnd(i + 3) * H, 1 + rnd(i + 8) * 1.5, 0, 7); ctx.fill(); }
    globe(540, 880, 420, 20 + t * 6, clamp(1 - t / 1.4));
    pill('📵 BÜTÜN DÜNYADA BAĞLANTI YOK', 540, 1250, { size: 38, bg: '#111c', fg: '#fff', alpha: clamp((t - .4) / .3) });
    return;
  }
  // sunrise over an apartment block, everyone in bed staring at a dead phone
  const sg = ctx.createLinearGradient(0, 0, 0, 900); sg.addColorStop(0, '#ffb4a2'); sg.addColorStop(1, '#ffe5b4'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.arc(860, 470, 90, 0, 7); ctx.fill();
  softShadow(() => { ctx.fillStyle = '#b5838d'; ctx.fillRect(90, 440, 900, 1000); }, 40, 'rgba(0,0,0,.35)', 10);
  ctx.fillStyle = '#6d6875'; ctx.fillRect(70, 420, 940, 30);
  let i = 0;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
    const x = 140 + c * 290, y = 500 + r * 225, w = 220, h = 180;
    ctx.fillStyle = '#ffe8a3'; ctx.fillRect(x, y, w, h);
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    ctx.fillStyle = ['#a2d2ff', '#ffafcc', '#caffbf', '#ffd6a5'][i % 4]; rr(x + 10, y + 110, w - 20, 80, 20); ctx.fill(); // duvet
    castMember(i, x + 80, y + 160, .7, { face: 'shock', t, bob: i, shadow: false });
    phoneSmall(x + 150, y + 90, 1.3, -.2);
    ctx.restore();
    ctx.strokeStyle = '#6d6875'; ctx.lineWidth = 8; ctx.strokeRect(x, y, w, h);
    i++;
  }
  ctx.fillStyle = '#495057'; ctx.fillRect(0, 1440, W, H - 1440);
  vignette(.35);
}

// ---------- 2. Japan: everyone on the train looks out of the window ----------
function japanScene(t) {
  const sg = ctx.createLinearGradient(0, 0, 0, H); sg.addColorStop(0, '#dfe7ef'); sg.addColorStop(1, '#c9d6e2'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
  // windows with Mt Fuji scrolling by
  for (let k = 0; k < 2; k++) {
    const wx = 80 + k * 480, wy = 420, ww = 440, wh = 380;
    ctx.save(); rr(wx, wy, ww, wh, 30); ctx.clip();
    const sk = ctx.createLinearGradient(0, wy, 0, wy + wh); sk.addColorStop(0, '#8ecae6'); sk.addColorStop(1, '#e0fbfc'); ctx.fillStyle = sk; ctx.fillRect(wx, wy, ww, wh);
    const fx = wx + ww * .55 - k * 60 - (t * 25) % 120;
    ctx.fillStyle = '#5c677d'; ctx.beginPath(); ctx.moveTo(fx - 300, wy + wh); ctx.lineTo(fx, wy + 110); ctx.lineTo(fx + 300, wy + wh); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(fx - 80, wy + 185); ctx.lineTo(fx, wy + 110); ctx.lineTo(fx + 80, wy + 185); ctx.lineTo(fx + 40, wy + 170); ctx.lineTo(fx, wy + 195); ctx.lineTo(fx - 40, wy + 170); ctx.fill();
    ctx.fillStyle = '#40916c'; ctx.fillRect(wx, wy + wh - 50, ww, 50);
    for (let p = 0; p < 6; p++) { const px = wx + ((p * 120 - t * 300) % (ww + 120) + ww + 120) % (ww + 120) - 60; ctx.fillStyle = '#6c757d'; ctx.fillRect(px, wy + wh - 120, 8, 70); }
    ctx.restore();
    rr(wx, wy, ww, wh, 30); ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 14; ctx.stroke();
  }
  // grab handles
  for (let i = 0; i < 6; i++) { const x = 140 + i * 160; ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, 330); ctx.lineTo(x, 380); ctx.stroke(); ctx.beginPath(); ctx.arc(x, 400, 22, 0, 7); ctx.stroke(); }
  // seat + passengers looking up, phones in their laps
  ctx.fillStyle = '#457b9d'; rr(40, 1180, 1000, 120, 30); ctx.fill(); ctx.fillStyle = '#1d3557'; rr(40, 1290, 1000, 40, 10); ctx.fill();
  const P = [{ shirt: '#2b2d42', hair: '#111', hairStyle: 'short', skin: '#f1d1b5' }, { shirt: '#e5e5e5', hair: '#111', hairStyle: 'bob', skin: '#f6d8c0' }, { shirt: '#6c757d', hair: '#555', hairStyle: 'short', glasses: true, skin: '#f1d1b5' }, { shirt: '#ffafcc', hair: '#111', hairStyle: 'long', skin: '#f6d8c0' }, { shirt: '#264653', hair: '#222', hairStyle: 'short', skin: '#efd0b5' }];
  P.forEach((p, i) => { const x = 150 + i * 195; human(x, 1150, 1.05, { ...p, face: 'shock', t, bob: i, shadow: false }); phoneSmall(x + 4, 1200, 1.1, 1.5); });
  ctx.fillStyle = '#868e96'; ctx.fillRect(0, 1330, W, H - 1330);
  flagBadge('🇯🇵 JAPONYA', 540, 1450);
}

// ---------- 3. USA: lost between skyscrapers ----------
function usaScene(t) {
  const sg = ctx.createLinearGradient(0, 0, 0, H); sg.addColorStop(0, '#90e0ef'); sg.addColorStop(1, '#caf0f8'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
  [[0, 300, 220], [200, 180, 200], [380, 360, 180], [540, 120, 220], [740, 260, 200], [920, 200, 200]].forEach(([x, y, w], k) => {
    const g = ctx.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, '#5c677d'); g.addColorStop(1, '#33415c'); ctx.fillStyle = g; ctx.fillRect(x, y, w, 1200 - y);
    ctx.fillStyle = '#bde0fe88'; for (let r = 0; r < 20; r++) for (let q = 0; q < 4; q++) ctx.fillRect(x + 14 + q * (w - 28) / 4, y + 20 + r * 50, (w - 28) / 4 - 12, 30);
  });
  ctx.fillStyle = '#495057'; ctx.fillRect(0, 1200, W, H - 1200); ctx.fillStyle = '#ffd166'; for (let i = 0; i < 8; i++) ctx.fillRect(i * 150, 1340, 90, 12);
  // a crossing signpost with arrows in every direction
  ctx.fillStyle = '#6c757d'; ctx.fillRect(530, 700, 20, 520);
  ['↖ ?', '↗ ?', '← ?', '→ ?'].forEach((s, i) => { ctx.save(); ctx.translate(540, 760 + i * 70); ctx.rotate((i % 2 ? .08 : -.08)); rr(-120, -26, 240, 52, 8); ctx.fillStyle = '#2a9d8f'; ctx.fill(); ctx.fillStyle = '#fff'; font(900, 32); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, 0, 2); ctx.restore(); });
  const C = [{ shirt: '#e63946', hair: '#b5833c', hairStyle: 'short', skin: '#f6d2b8', cap: '#1d3557' }, { shirt: '#3a86ff', hair: '#111', hairStyle: 'curly', skin: '#8d5524' }, { shirt: '#ffb703', hair: '#5a3825', hairStyle: 'long', skin: '#f3c9a5' }, { shirt: '#6d597a', hair: '#888', hairStyle: 'grey', skin: '#e0a47a', glasses: true }];
  C.forEach((c, i) => { const x = [170, 360, 730, 920][i]; human(x + Math.sin(t * 2 + i) * 30, 1250, 1.15, { ...c, face: 'shock', pose: i % 2 ? 'handsHead' : 'phoneUp', t, bob: i, shadow: false }); });
  font(900, 70); ctx.fillStyle = '#111'; ctx.textAlign = 'center'; [[250, 1000], [820, 1000], [560, 640]].forEach(([x, y], i) => { ctx.globalAlpha = .5 + .5 * Math.sin(t * 4 + i); ctx.fillText('?', x, y); }); ctx.globalAlpha = 1;
  flagBadge('🇺🇸 AMERİKA', 540, 1450);
}

// ---------- 4. influencers out of work ----------
function selfieStick(x, y, s, ang) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.strokeStyle = '#333'; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -130 * s); ctx.stroke(); ctx.fillStyle = '#111'; rr(-14 * s, -170 * s, 28 * s, 48 * s, 5 * s); ctx.fill(); ctx.fillStyle = '#e63946'; ctx.font = `900 ${18 * s}px Inter`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('✕', 0, -146 * s); ctx.restore(); }
function inflScene(t) {
  const sg = ctx.createLinearGradient(0, 0, 0, H); sg.addColorStop(0, '#ffc8dd'); sg.addColorStop(1, '#cdb4db'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
  // ring light + backdrop
  ctx.strokeStyle = '#fffaf0'; ctx.lineWidth = 34; ctx.beginPath(); ctx.arc(540, 700, 200, 0, 7); ctx.stroke(); glow(540, 700, 260, 'rgba(255,255,255,A)', .5);
  ctx.fillStyle = '#6d6875'; ctx.fillRect(530, 900, 20, 360);
  ctx.fillStyle = '#e5989b'; ctx.fillRect(0, 1260, W, H - 1260);
  const I = [{ shirt: '#ff006e', hair: '#f5d76e', hairStyle: 'long', skin: '#f6d2b8', glasses: true }, { shirt: '#111', hair: '#111', hairStyle: 'short', skin: '#c68642', cap: '#fff' }, { shirt: '#8338ec', hair: '#ff8fab', hairStyle: 'bob', skin: '#f3c9a5' }];
  I.forEach((c, i) => { const x = [230, 540, 850][i]; human(x, 1230, 1.25, { ...c, face: 'shock', t, bob: i, shadow: false }); selfieStick(x + 50, 1120, 1, .3 - i * .25); });
  // follower counter falling to zero
  const n = Math.max(0, Math.round(2400000 * (1 - clamp((t - TL.infl[0]) / 1.6))));
  pill('👥 ' + n.toLocaleString('tr-TR') + ' izleyici', 540, 1060, { size: 42, bg: '#fff', fg: n ? '#111' : '#e63946' });
  flagBadge('🌍 DÜNYA', 540, 1450);
}

// ---------- 5. Türkiye: taxi driver vindicated ----------
function taksiScene(t) {
  const sg = ctx.createLinearGradient(0, 0, 0, H); sg.addColorStop(0, '#8ecae6'); sg.addColorStop(1, '#e0fbfc'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
  [[0, 520, 260, '#ddb892'], [240, 460, 240, '#e9c46a'], [460, 540, 230, '#f4a261'], [680, 480, 400, '#cb997e']].forEach(([x, y, w, c]) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, 1200 - y); ctx.fillStyle = '#ffffff88'; for (let r = 0; r < 6; r++) for (let q = 0; q < Math.floor(w / 80); q++) ctx.fillRect(x + 20 + q * 80, y + 30 + r * 110, 44, 60); });
  ctx.fillStyle = '#495057'; ctx.fillRect(0, 1200, W, H - 1200);
  // yellow taxi, side view
  const x = 540 + Math.sin(t * 1.5) * 10, y = 1180;
  softShadow(() => { ctx.fillStyle = '#ffd60a'; rr(x - 330, y - 150, 660, 150, 40); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - 200, y - 150); ctx.lineTo(x - 140, y - 280); ctx.lineTo(x + 150, y - 280); ctx.lineTo(x + 230, y - 150); ctx.fill(); }, 30, 'rgba(0,0,0,.4)', 10);
  ctx.fillStyle = '#111'; rr(x - 70, y - 320, 140, 44, 8); ctx.fill(); ctx.fillStyle = '#ffd60a'; font(900, 30); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('TAKSİ', x, y - 297);
  ctx.fillStyle = '#bde0fe'; ctx.beginPath(); ctx.moveTo(x - 180, y - 160); ctx.lineTo(x - 130, y - 265); ctx.lineTo(x, y - 265); ctx.lineTo(x, y - 160); ctx.fill(); ctx.beginPath(); ctx.moveTo(x + 20, y - 160); ctx.lineTo(x + 20, y - 265); ctx.lineTo(x + 140, y - 265); ctx.lineTo(x + 205, y - 160); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.moveTo(x - 180, y - 160); ctx.lineTo(x - 130, y - 265); ctx.lineTo(x, y - 265); ctx.lineTo(x, y - 160); ctx.clip();
  human(x - 80, y - 135, 1.0, { shirt: '#6c757d', hair: '#333', hairStyle: 'short', mustache: true, face: 'happy', skin: '#d9a37a', t, shadow: false }); ctx.restore();
  ctx.fillStyle = '#111'; [-200, 200].forEach(dx => { ctx.beginPath(); ctx.arc(x + dx, y, 60, 0, 7); ctx.fill(); ctx.fillStyle = '#adb5bd'; ctx.beginPath(); ctx.arc(x + dx, y, 24, 0, 7); ctx.fill(); ctx.fillStyle = '#111'; });
  // dead navigation phone on the dashboard
  phoneSmall(x + 120, y - 210, 1.6, .1);
  speech(x - 60, y - 380, 'Ben yolu bilirim abi!', vis(t, (TL.ben || TL.taksi[0] + 1.2) - .1, TL.taksi[1] + .3, .2, .2));
  flagBadge('🇹🇷 TÜRKİYE', 540, 1450);
}

// ---------- 6. mum: "Evde yemek var!" ----------
function anneScene(t) {
  ctx.fillStyle = '#f6e7cb'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#ffffff55'; for (let r = 0; r < 8; r++) for (let q = 0; q < 6; q++) ctx.fillRect(q * 190 + (r % 2) * 95, 300 + r * 60, 170, 50); // tiles
  ctx.fillStyle = '#b08968'; ctx.fillRect(0, 1260, W, H - 1260);
  ctx.fillStyle = '#ced4da'; rr(80, 860, 920, 400, 20); ctx.fill(); ctx.fillStyle = '#adb5bd'; rr(80, 860, 920, 40, 12); ctx.fill(); // counter
  // food-delivery app spinning forever on a phone stand
  ctx.save(); ctx.translate(780, 720); ctx.rotate(.05); ctx.fillStyle = '#111'; rr(-80, -140, 160, 280, 20); ctx.fill(); ctx.fillStyle = '#ff006e'; rr(-68, -126, 136, 252, 14); ctx.fill();
  ctx.fillStyle = '#fff'; font(900, 24); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('🍔 Sipariş', 0, -80);
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 10, 34, t * 6, t * 6 + 4.2); ctx.stroke(); font(800, 18); ctx.fillText('Bağlantı yok', 0, 80); ctx.restore();
  // mum with a steaming pot
  const pop = t > TL.evde ? lerp(1.15, 1, easeOut(clamp((t - TL.evde) / .3))) : 1;
  ctx.save(); ctx.translate(330, 1120); ctx.scale(pop, pop); ctx.translate(-330, -1120);
  human(330, 1120, 1.7, { shirt: '#8e44ad', hair: '#4a2c1a', hairStyle: 'long', face: t > TL.evde ? 'shout' : 'happy', pose: 'shout', skin: '#e9b48a', t, shadow: false });
  ctx.fillStyle = '#adb5bd'; rr(560, 780, 180, 80, 20); ctx.fill(); ctx.fillStyle = '#868e96'; rr(545, 770, 210, 22, 10); ctx.fill(); steam(650, 760, t, 3, 90, .7);
  ctx.restore();
  if (t > TL.evde) speech(560, 600, 'Evde yemek var!', clamp((t - TL.evde) / .25));
}

// ---------- 7. auntie phones for the first time ----------
function teyzeScene(t) {
  ctx.fillStyle = '#e9d8a6'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#ffffff33'; for (let i = 0; i < 12; i++) ctx.fillRect(i * 100, 0, 40, H);
  ctx.fillStyle = '#8d6e63'; ctx.fillRect(0, 1260, W, H - 1260);
  ctx.fillStyle = '#6d4c41'; rr(560, 980, 380, 30, 8); ctx.fill(); ctx.fillRect(590, 1010, 20, 250); ctx.fillRect(890, 1010, 20, 250);
  // rotary phone
  ctx.fillStyle = '#e63946'; rr(640, 900, 220, 90, 30); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(750, 945, 34, 0, 7); ctx.fill(); ctx.fillStyle = '#e63946'; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + t * 2; ctx.beginPath(); ctx.arc(750 + Math.cos(a) * 22, 945 + Math.sin(a) * 22, 5, 0, 7); ctx.fill(); }
  ctx.strokeStyle = '#333'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(660, 960); ctx.quadraticCurveTo(520, 1060, 470, 860); ctx.stroke();
  human(380, 1150, 1.65, { ...CAST[8], face: 'shout', pose: 'cupEar', t, shadow: false });
  ctx.fillStyle = '#e63946'; rr(450, 760, 40, 110, 16); ctx.fill(); // receiver at her ear
  // silent family group chat on the counter
  ctx.save(); ctx.translate(760, 620); ctx.fillStyle = '#111'; rr(-110, -170, 220, 340, 24); ctx.fill(); ctx.fillStyle = '#ece5dd'; rr(-96, -154, 192, 308, 16); ctx.fill();
  ctx.fillStyle = '#075e54'; rr(-96, -154, 192, 50, 16); ctx.fill(); ctx.fillStyle = '#fff'; font(800, 18); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('👨‍👩‍👧 Aile ❤️', -80, -128);
  ctx.fillStyle = '#868e96'; font(700, 18); ctx.textAlign = 'center'; ctx.fillText('Mesaj gönderilemedi ⚠️', 0, 20); ctx.restore();
  for (let i = 0; i < 3; i++) { const a = clamp(Math.sin(t * 6 - i)); ctx.strokeStyle = `rgba(230,57,70,${a})`; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(860, 860, 40 + i * 24, -1, .2); ctx.stroke(); }
}

// ---------- 8. kahve: score sites still won't load ----------
function skorScene(t) {
  const wg = ctx.createLinearGradient(0, 0, 0, H); wg.addColorStop(0, '#5e3b2c'); wg.addColorStop(1, '#3b2418'); ctx.fillStyle = wg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#2b1810'; ctx.fillRect(0, 1360, W, H - 1360);
  ctx.save(); ctx.translate(540, 420); rr(-300, -54, 600, 108, 18); ctx.fillStyle = '#1d3557'; ctx.fill(); ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 5; rr(-290, -44, 580, 88, 12); ctx.stroke(); ctx.fillStyle = '#ffd166'; font(900, 60); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('KIRAATHANE', 0, 3); ctx.restore();
  phoneBig(540, 860, .85, t, false);
  [[160, 0], [320, 9], [760, 3], [920, 11]].forEach(([x, id], i) => castMember(id, x, 1300, 1.1, { pose: 'phoneUp', face: i % 2 ? 'angry' : 'shock', t, bob: i, shadow: false }));
  credit('Yorumlardan: @umutbaran0643', 1250, vis(t, TL.skor[0] + .2, TL.skor[1] + .3, .2, .2));
  vignette(.45);
}

// ---------- 9. someone flies to space to fix the satellite ----------
function satellite(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t) * .1); ctx.scale(s, s);
  ctx.fillStyle = '#1d3557'; for (const dx of [-170, 70]) { ctx.fillRect(dx, -40, 100, 80); ctx.strokeStyle = '#4cc9f0'; ctx.lineWidth = 2; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(dx + i * 25, -40); ctx.lineTo(dx + i * 25, 40); ctx.stroke(); } }
  ctx.fillStyle = '#adb5bd'; ctx.fillRect(-70, -8, 140, 16); ctx.fillStyle = '#e9c46a'; rr(-50, -50, 100, 100, 12); ctx.fill();
  ctx.fillStyle = '#ced4da'; ctx.beginPath(); ctx.ellipse(0, -70, 40, 14, 0, 0, 7); ctx.fill();
  if (Math.sin(t * 9) > 0) { ctx.fillStyle = '#ffd166'; font(900, 40); ctx.textAlign = 'center'; ctx.fillText('⚡', 60, -60); }
  ctx.restore();
}
function uzayScene(t) {
  ctx.fillStyle = '#03071e'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 160; i++) { ctx.fillStyle = `rgba(255,255,255,${.2 + rnd(i + 4) * .7})`; ctx.beginPath(); ctx.arc(rnd(i) * W, rnd(i + 3) * H, 1 + rnd(i + 8) * 1.8, 0, 7); ctx.fill(); }
  globe(540, 1700, 700, 30, 0);
  satellite(760, 520, 1.1, t);
  const p = easeOut(clamp((t - TL.uzay[0]) / 3)), rx = lerp(260, 640, p), ry = lerp(1350, 640, p);
  // rocket with an astronaut-suited hero in the window
  ctx.save(); ctx.translate(rx, ry); ctx.rotate(.5);
  const fl = 60 + Math.sin(t * 30) * 15; ctx.fillStyle = '#ff9f1c'; ctx.beginPath(); ctx.moveTo(-30, 120); ctx.lineTo(0, 120 + fl); ctx.lineTo(30, 120); ctx.fill(); ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.moveTo(-16, 120); ctx.lineTo(0, 120 + fl * .6); ctx.lineTo(16, 120); ctx.fill();
  ctx.fillStyle = '#f8f9fa'; ctx.beginPath(); ctx.moveTo(0, -160); ctx.quadraticCurveTo(70, -60, 60, 120); ctx.lineTo(-60, 120); ctx.quadraticCurveTo(-70, -60, 0, -160); ctx.fill();
  ctx.fillStyle = TR_RED; ctx.beginPath(); ctx.moveTo(-60, 60); ctx.lineTo(-100, 130); ctx.lineTo(-60, 120); ctx.fill(); ctx.beginPath(); ctx.moveTo(60, 60); ctx.lineTo(100, 130); ctx.lineTo(60, 120); ctx.fill();
  ctx.fillStyle = '#4cc9f0'; ctx.beginPath(); ctx.arc(0, -40, 34, 0, 7); ctx.fill(); ctx.fillStyle = '#e9b48a'; ctx.beginPath(); ctx.arc(0, -36, 18, 0, 7); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, -40, 34, 0, 7); ctx.stroke();
  trFlag(-22, 20, 44, 30); ctx.restore();
  credit('Yorumlardan: @yusufsahin6170', 1250, vis(t, TL.uzay[0] + .6, TL.b4, .25, .2));
}

// ---------- render ----------
function render(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const inR = r => t >= r[0] - .05 && t < r[1] + .3;
  if (t < TL.hook[1] + .3) { hookScene(t); title(t < TL.frozen ? [['BÜTÜN DÜNYADA', 76, '#fff'], ['İNTERNET YOK 📵', 88, '#ffd166']] : [['İNTERNETSİZ', 80, '#fff'], ['İLK SABAH ☀️', 96, '#ffd166']], t < TL.frozen ? .1 : TL.frozen, t < TL.frozen ? TL.frozen : TL.hook[1], t, 350); }
  if (inR(TL.japan)) { sceneSlide(t, TL.japan[0], () => japanScene(t)); title([['İLK KEZ', 80, '#fff'], ['MANZARA 🗻', 96, '#ffd166']], TL.japan[0] + .1, TL.japan[1], t, 350); }
  if (inR(TL.usa)) { sceneSlide(t, TL.usa[0], () => usaScene(t)); title([['HARİTA YOK', 80, '#fff'], ['HERKES KAYIP 🗺️', 88, '#ffd166']], TL.usa[0] + .1, TL.usa[1], t, 350); }
  if (inR(TL.infl)) { sceneSlide(t, TL.infl[0], () => inflScene(t)); if (t < TL.soru[0]) title([["INFLUENCER'LAR", 76, '#fff'], ['İŞSİZ 🤳', 104, '#ffd166']], TL.infl[0] + .1, TL.soru[0], t, 350); }
  if (t >= TL.soru[0] - .05 && t < TL.soru[1] + .3) {
    const a = vis(t, TL.soru[0], TL.soru[1], .2, .25), k = lerp(.6, 1, backOut(clamp((t - TL.soru[0]) / .35))) * (1 + Math.sin(t * 6) * .02);
    ctx.save(); ctx.globalAlpha = a; ctx.translate(540, 320); ctx.scale(k, k);
    softShadow(() => { rr(-400, -80, 800, 160, 30); ctx.fillStyle = '#ffd166'; ctx.fill(); }, 30, 'rgba(0,0,0,.5)', 10);
    ctx.fillStyle = '#111'; font(900, 52); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('💬 SEN İLK NE YAPARDIN?', 0, -16); font(800, 32); ctx.fillText('Yorumlara yaz 👇', 0, 44);
    ctx.restore();
  }
  if (inR(TL.taksi)) { sceneSlide(t, TL.taksi[0], () => taksiScene(t)); title([['TAKSİCİLER', 80, '#fff'], ['HAKLI ÇIKTI 🚕', 88, '#ffd166']], TL.taksi[0] + .1, TL.taksi[1], t, 350); }
  if (inR(TL.anne)) { sceneSlide(t, TL.anne[0], () => anneScene(t)); title([['ANNELER', 96, '#fff'], ['KAZANDI 🍲', 96, '#ffd166']], TL.anne[0] + .1, TL.anne[1], t, 350); sendPrompt('Annene gönder', 1560, vis(t, TL.evde + .3, TL.anne[1] + .2, .25, .2)); }
  if (inR(TL.teyze)) { sceneSlide(t, TL.teyze[0], () => teyzeScene(t)); title([['TEYZE', 96, '#fff'], ['ARIYOR ☎️', 96, '#ffd166']], TL.teyze[0] + .1, TL.teyze[1], t, 350); }
  if (inR(TL.skor)) { sceneSlide(t, TL.skor[0], () => skorScene(t)); }
  if (t >= TL.uzay[0] - .05) {
    sceneSlide(t, TL.uzay[0], () => uzayScene(t));
    if (t < TL.b4) title([['UYDUYU', 80, '#fff'], ['ONARMAYA 🛰️', 96, '#ffd166']], TL.uzay[0] + .1, TL.b4, t, 350);
    else { title([['BAŞARABİLECEK', 76, '#fff'], ['Mİ? 🚀', 110, '#ffd166']], TL.b4, 99, t, 350); pill("🛰️ BÖLÜM 4'TE", 540, 1250, { size: 48, bg: '#ffd166', fg: '#111', alpha: clamp((t - TL.b4 - .3) / .25) }); }
  }
  subtitles(t);
  badge();
  if (t < .12) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .12})`; ctx.fillRect(0, 0, W, H); }
}
