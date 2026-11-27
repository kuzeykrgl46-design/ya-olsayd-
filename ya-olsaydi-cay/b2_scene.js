// ===== Ya Olsaydı? #4 · Çay Bitseydi · Bölüm 2 =====
// Loaded AFTER b1_scene.js (reuses its sets, props, TL/SUBS/TEA/GOLD consts); the render() below replaces Bölüm 1's.
// TL comes from timeline2.js (estimate until the voiceover exists).

// ---------- shared overlays ----------
const SCORE = [ // [row label, value, appears in scene]
  ['🍃 RİZE', '0 gün', 'rize'], ['☕ İZMİR', '2 gün', 'izmir'], ['❄️ ERZURUM', '3 gün · hâlâ!', 'erzurum'], ['👩 ANNELER', '∞', 'anne'],
];
function scoreboard(t) {
  if (t < TL.rize[0] || t > TL.anne[1] + .3) return;
  const a = vis(t, TL.rize[0], TL.anne[1], .3, .3);
  ctx.save(); ctx.globalAlpha = a;
  const rows = SCORE.filter(r => t >= TL[r[2]][0] + .3), x = 40, y = 250, w = 470;
  softShadow(() => { rr(x, y, w, 70 + rows.length * 62, 22); ctx.fillStyle = 'rgba(17,17,17,.82)'; ctx.fill(); }, 20, 'rgba(0,0,0,.4)', 8);
  font(900, 30); ctx.fillStyle = GOLD; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('🏆 KİM KAÇ GÜN DAYANDI?', x + 22, y + 38);
  rows.forEach((r, i) => {
    const k = backOut(clamp((t - TL[r[2]][0] - .3) / .35)), yy = y + 98 + i * 62;
    ctx.save(); ctx.translate(x + 22, yy); ctx.scale(k, k);
    font(800, 32); ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.fillText(r[0], 0, 0);
    font(900, 32); ctx.fillStyle = r[1] === '∞' ? '#86efac' : r[1].startsWith('0') ? '#f87171' : GOLD; ctx.textAlign = 'right'; ctx.fillText(r[1], w - 44, 0);
    ctx.restore();
  });
  ctx.restore();
}
function commentCard(t, a, b, handle, text, y = 1185) {
  const v = vis(t, a, b, .25, .25); if (v <= 0) return;
  const k = lerp(.8, 1, backOut(clamp((t - a) / .35)));
  ctx.save(); ctx.globalAlpha = v; ctx.translate(540, y); ctx.scale(k, k);
  softShadow(() => { rr(-430, -62, 860, 124, 26); ctx.fillStyle = '#fff'; ctx.fill(); }, 24, 'rgba(0,0,0,.35)', 8);
  ctx.fillStyle = '#6b7280'; font(800, 26); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('💬 Yorumlardan: ' + handle, -395, -22);
  ctx.fillStyle = '#111'; font(900, 40); ctx.fillText(text, -395, 24);
  ctx.restore();
}
function pollCard(t, a, b, y = 1185) {
  const v = vis(t, a, b, .25, .25); if (v <= 0) return;
  const k = lerp(.8, 1, backOut(clamp((t - a) / .35))), p = easeOut(clamp((t - a - .3) / .8));
  ctx.save(); ctx.globalAlpha = v; ctx.translate(540, y); ctx.scale(k, k);
  softShadow(() => { rr(-440, -80, 880, 160, 26); ctx.fillStyle = '#fff'; ctx.fill(); }, 24, 'rgba(0,0,0,.35)', 8);
  ctx.fillStyle = '#6b7280'; font(800, 26); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('💬 SORDUNUZ: Çaysız kız isteme olur mu?', -405, -42);
  rr(-405, -6, 810, 56, 14); ctx.fillStyle = '#f1f5f9'; ctx.fill();
  rr(-405, -6, 810 * .8 * p, 56, 14); ctx.fillStyle = TEA; ctx.fill();
  ctx.fillStyle = '#fff'; font(900, 32); ctx.fillText('HAYIR %' + Math.round(80 * p), -385, 23);
  font(900, 26); ctx.fillStyle = '#111'; ctx.textAlign = 'right'; ctx.fillText('EVET %' + Math.round(20 * p), 390, 23);
  ctx.restore();
}

// ---------- props ----------
function semaver(x, y, s) { // brass samovar
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const g = ctx.createLinearGradient(-60, 0, 60, 0); g.addColorStop(0, '#92400e'); g.addColorStop(.45, '#fcd34d'); g.addColorStop(1, '#78350f');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-40, -120); ctx.quadraticCurveTo(-70, -40, -50, 40); ctx.lineTo(50, 40); ctx.quadraticCurveTo(70, -40, 40, -120); ctx.closePath(); ctx.fill();
  rr(-30, 40, 60, 30, 6); ctx.fill(); rr(-50, 66, 100, 14, 6); ctx.fill();
  ctx.strokeStyle = '#78350f'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(-58, -60, 18, Math.PI * .5, Math.PI * 1.5); ctx.arc(58, -60, 18, Math.PI * 1.5, Math.PI * .5); ctx.stroke();
  ctx.fillStyle = '#78350f'; rr(30, -10, 36, 10, 4); ctx.fill(); // tap
  ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.ellipse(0, -130, 34, 12, 0, 0, 7); ctx.fill(); teaGlass(0, -170, .45, 0, false);
  ctx.restore();
}
function sugarCube(x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = '#fff'; rr(-11 * s, -11 * s, 22 * s, 22 * s, 4 * s); ctx.fill(); ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
function teaBush(x, y, s, bare) { // rounded tea bush on a terrace; bare = only twigs left
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (bare) { ctx.strokeStyle = '#5b3a1e'; ctx.lineWidth = 4; for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * .32; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * 46, Math.sin(a) * 38); ctx.stroke(); } }
  else { ctx.fillStyle = '#15803d'; ctx.beginPath(); ctx.ellipse(0, -18, 60, 30, 0, Math.PI, 0); ctx.fill(); }
  ctx.restore();
}
function lantern(x, y, s, t, i) { ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 3 + i) * .12); ctx.fillStyle = '#1f2937'; ctx.fillRect(-2, -30 * s, 4, 30 * s); ctx.fillStyle = '#fde68a'; rr(-12 * s, 0, 24 * s, 30 * s, 6 * s); ctx.fill(); ctx.restore(); glow(x, y + 15 * s, 90 * s, 'rgba(253,230,138,A)', .45); }

// ---------- 1. hook: dad shakes the empty teapot, sirens ----------
function hookScene(t) {
  const r = TL.hook, hy = 1450, s = 3.2;
  const shake = Math.sin(t * 38) * 4;
  ctx.save(); ctx.translate(shake, Math.cos(t * 31) * 3);
  kitchenBack(t);
  // siren wash
  const sw = (Math.sin(t * 9) + 1) / 2;
  ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.fillStyle = `rgba(239,68,68,${.35 + sw * .55})`; ctx.fillRect(-100, -100, W + 200, H + 200); ctx.restore();
  const tilt = Math.sin(t * 14) * .25;
  const hands = person(540, hy, s, { ...DAD, seated: true, face: 'shout', talk: say(t, 'hook', .3, 3.9), tilt: Math.sin(t * 7) * .05, t, shadow: false, look: 0,
    handsW: [[330, 760 + Math.sin(t * 14) * 30], [760, 1040]], handShape: ['fist', 'spread'] }).hands;
  // teapot upside down in the left fist, shaken; a single drop falls
  ctx.save(); ctx.translate(hands[0][0], hands[0][1]); ctx.rotate(Math.PI * .72 + tilt); caydanlik(-20, 40, .62, 1, t); ctx.restore();
  const dp = (t * 1.2) % 1; ctx.fillStyle = 'rgba(180,35,27,.8)'; ctx.beginPath(); ctx.ellipse(hands[0][0] + 10, hands[0][1] + 60 + dp * 220, 6, 9, 0, 0, 7); ctx.fill();
  const tg = ctx.createLinearGradient(0, 1560, 0, 1920); tg.addColorStop(0, '#fff'); tg.addColorStop(1, '#e2e8f0'); ctx.fillStyle = tg; ctx.fillRect(-100, 1560, W + 200, 460);
  breakfastS(540, 1640, 1.1, t);
  ctx.restore();
  // rotating siren beams
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 2; i++) { const a = t * 4 + i * Math.PI; const g = ctx.createRadialGradient(540, 120, 0, 540, 120, 1400); g.addColorStop(0, 'rgba(255,60,60,.5)'); g.addColorStop(1, 'rgba(255,60,60,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(540, 120); ctx.arc(540, 120, 1400, a - .25, a + .25); ctx.closePath(); ctx.fill(); }
  ctx.restore();
  grain(t, .04);
}

// ---------- 2. Rize: everyone searches the bare tea fields at dusk ----------
function rizeScene(t) {
  const r = TL.rize;
  shot(t, r, 1.0, 1.18, 540, 960, 600, 1000, () => {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#312e81'); g.addColorStop(.5, '#7c3aed'); g.addColorStop(1, '#14532d'); ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, H + 600);
    ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(820, 420, 60, 0, 7); ctx.fill(); glow(820, 420, 260, 'rgba(253,230,138,A)', .25);
    // stacked terraces with bare bushes
    for (let k = 0; k < 7; k++) {
      const y = 620 + k * 150, c = ['#14532d', '#166534', '#15803d', '#166534', '#14532d', '#0f3d22', '#0b2e1a'][k];
      ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(-300, y + 40); ctx.quadraticCurveTo(540, y - 50 + (k % 2) * 30, 1380, y + 30); ctx.lineTo(1380, y + 200); ctx.lineTo(-300, y + 200); ctx.fill();
      for (let i = 0; i < 9; i++) teaBush(-60 + i * 150 + (k % 2) * 70, y + 30 - Math.sin(i / 8 * Math.PI) * 25, .8 + k * .08, true);
    }
    // searchers with lanterns
    [[170, 930, .95, '#7c2d12'], [380, 900, .85, '#1e3a8a'], [880, 950, 1.0, '#4d7c0f']].forEach(([x, y, sc, sh], i) => {
      const hh = person(x, y, sc, { shirt: sh, hair: '#222', hairStyle: i === 1 ? 'bald' : 'short', mustache: i !== 2, cap: null, hat: i === 0 ? 'flatcap' : null, face: 'stunned', t, bob: i + 2, shadow: false, handsW: [[x - 40 * sc, y - 60 * sc], [x + 70 * sc, y - 170 * sc]], handShape: ['open', 'fist'] }).hands;
      lantern(hh[1][0], hh[1][1], sc * 1.4, t, i);
    });
    // front: man on his knees with a magnifier, found nothing
    const hh = person(600, 1330, 2.0, { shirt: '#b91c1c', vest: '#1f2937', hair: '#1c1917', hairStyle: 'short', mustache: true, face: 'stunned', look: .8, t, shadow: false, seated: true,
      talk: say(t, 'rize', r[0] + .9, r[0] + 2.8), handsW: [[460, 1250], [800, 1200 + Math.sin(t * 2) * 20]], handShape: ['open', 'fist'] }).hands;
    teaBush(860, 1440, 2.2, true);
    ctx.save(); ctx.translate(hh[1][0] + 20, hh[1][1] - 40); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-30, 40); ctx.lineTo(0, 0); ctx.stroke(); ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 10; ctx.fillStyle = 'rgba(191,219,254,.35)'; ctx.beginPath(); ctx.arc(26, -30, 44, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.fillStyle = '#0b2e1a'; ctx.fillRect(-300, 1520, W + 600, 600);
  });
  speech(700, 640, 'Tek yaprak bulan kahramandır!', vis(t, sayStart('rize', r[0] + 1.1) - .3, r[1] + .2, .2, .2));
  commentCard(t, r[0] + 1.0, r[1], '@ll.o6taha', '"1 güne anca!" 😂');
  grain(t, .05);
}

// ---------- 3. İzmir: "we drink coffee" ... then hunting for a samovar ----------
function izmirScene(t) {
  const r = TL.izmir, mid = TL.izmirMid || r[0] + 1.9, after = t > mid;
  shot(t, r, 1.06, 1.0, 540, 960, 540, 960, () => {
    const g = ctx.createLinearGradient(0, 0, 0, 1100); g.addColorStop(0, '#fb923c'); g.addColorStop(1, '#fde68a'); ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, 1500);
    ctx.fillStyle = '#fef3c7'; ctx.beginPath(); ctx.arc(300, 820, 90, 0, 7); ctx.fill();
    const sg = ctx.createLinearGradient(0, 860, 0, 1180); sg.addColorStop(0, '#0ea5e9'); sg.addColorStop(1, '#0369a1'); ctx.fillStyle = sg; ctx.fillRect(-300, 880, W + 600, 300);
    ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 4; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(-100 + i * 160 + Math.sin(t + i) * 20, 940 + (i % 3) * 60); ctx.lineTo(-40 + i * 160 + Math.sin(t + i) * 20, 940 + (i % 3) * 60); ctx.stroke(); }
    ctx.fillStyle = '#9ca3af'; ctx.fillRect(-300, 1170, W + 600, 30); ctx.fillStyle = '#d6d3d1'; ctx.fillRect(-300, 1200, W + 600, 800); // Kordon promenade
    // palm trees
    [[110, 1180], [980, 1180]].forEach(([x, y]) => { ctx.strokeStyle = '#78350f'; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 30, y - 260, x + 10, y - 480); ctx.stroke(); ctx.fillStyle = '#166534'; for (let i = 0; i < 7; i++) { ctx.save(); ctx.translate(x + 10, y - 480); ctx.rotate(i / 7 * 6.28 + Math.sin(t + i) * .05); ctx.beginPath(); ctx.ellipse(70, 0, 80, 16, 0, 0, 7); ctx.fill(); ctx.restore(); } });
    // poster on a lamp post
    ctx.fillStyle = '#374151'; ctx.fillRect(820, 700, 14, 520); ctx.fillStyle = '#fef9c3'; ctx.save(); ctx.translate(827, 860); ctx.rotate(.04); rr(-110, -70, 220, 150, 8); ctx.fill(); ctx.fillStyle = TEA; font(900, 28); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ARANIYOR', 0, -36); ctx.fillStyle = '#111'; font(800, 22); ctx.fillText('SEMAVER', 0, 0); ctx.fillText('ÖDÜLLÜ!', 0, 34); ctx.restore();
    if (!after) {
      const hh = person(480, 1300, 2.1, { shirt: '#f8fafc', pants: '#1e3a8a', hair: '#3b2a1e', hairStyle: 'side', sunglasses: true, stubble: true, face: 'sly', t, shadow: true, rolled: true,
        talk: say(t, 'izmir', r[0] + .9, r[0] + 1.8), handsW: [[600, 1020], [380, 1220]], handShape: ['fist', 'open'] }).hands;
      ctx.save(); ctx.translate(hh[0][0], hh[0][1] - 20); ctx.fillStyle = '#fff'; rr(-22, -30, 44, 38, 8); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(26, -12, 10, -1.2, 1.2); ctx.stroke(); ctx.fillStyle = '#3b1f0e'; ctx.fillRect(-18, -28, 36, 6); ctx.restore();
      for (let i = 0; i < 3; i++) { const p = (t * .8 + i / 3) % 1; ctx.strokeStyle = `rgba(255,255,255,${.6 * (1 - p)})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(hh[0][0] - 10 + i * 10, hh[0][1] - 60 - p * 60); ctx.quadraticCurveTo(hh[0][0] + 10 + i * 10, hh[0][1] - 80 - p * 60, hh[0][0] - 10 + i * 10, hh[0][1] - 100 - p * 60); ctx.stroke(); }
    } else {
      const run = Math.sin((t - mid) * 6) * 120;
      person(500 + run, 1300, 2.1, { shirt: '#f8fafc', pants: '#1e3a8a', hair: '#3b2a1e', hairStyle: 'side', stubble: true, face: 'shock', look: run > 0 ? 1 : -1, t, shadow: true, rolled: true, pose: 'handsHead' });
      for (let i = 0; i < 5; i++) { const p = ((t - mid) * 1.5 + i / 5) % 1; ctx.fillStyle = `rgba(147,197,253,${1 - p})`; ctx.beginPath(); ctx.ellipse(460 + run + i * 22, 640 + p * 80, 6, 10, 0, 0, 7); ctx.fill(); }
      ctx.save(); ctx.globalAlpha = .9; semaver(860, 1130 + Math.sin(t * 4) * 6, .9); ctx.restore();
      ctx.fillStyle = '#fff'; font(900, 70); ctx.textAlign = 'center'; ctx.fillText('?', 860, 860 + Math.sin(t * 5) * 8);
    }
  });
  if (after) stampHit(540, 700, '2. GÜN: SEMAVER ARANIYOR!', TEA, (t - mid - .1) / .3);
  grain(t, .04);
}

// ---------- 4. Erzurum: uncles sucking sugar cubes, snow outside ----------
function erzurumScene(t) {
  const r = TL.erzurum, HY = 1290, s = 1.75;
  shot(t, r, 1.12, 1.0, 560, 1000, 520, 1000, () => {
    kahvehaneBack(t);
    // snow on the window side
    ctx.fillStyle = '#fff'; for (let i = 0; i < 70; i++) { const x = (rnd(i) * W + t * 20) % W, y = (rnd(i + 3) * H + t * (60 + rnd(i + 7) * 60)) % H; ctx.globalAlpha = .7; ctx.beginPath(); ctx.arc(x, y, 2 + rnd(i + 1) * 3, 0, 7); ctx.fill(); } ctx.globalAlpha = 1;
    [[290, '#6b4f3a'], [540, '#7a5236'], [790, '#6b4f3a']].forEach(([x, c]) => chairBack(x, HY - 30, s, c));
    const U = [
      { shirt: '#e7e5e4', vest: '#1f2937', hair: '#d0d0d0', hairStyle: 'grey', mustache: true, hat: 'flatcap', hatColor: '#374151', skin: '#d9a37a', old: true },
      { shirt: '#7f1d1d', hair: '#888', hairStyle: 'short', beard: true, skin: '#c68642', hat: 'flatcap', hatColor: '#1f2937' },
      { shirt: '#e2e8f0', vest: '#495057', hair: '#bbb', hairStyle: 'bald', mustache: true, glasses: true, skin: '#e0a47a', old: true },
    ];
    const P = [];
    P.push(person(290, HY - 30, s, { ...U[0], seated: true, face: 'sad', t, shadow: false, look: .4, handsW: [[230, HY - 80], [360, HY - 80]] }));
    const lift = easeOut(clamp((t - r[0] - .6) / .6));
    P.push(person(540, HY - 30, s, { ...U[1], seated: true, face: 'stunned', t, bob: 1, shadow: false, look: .8, handsW: [[470, HY - 80], [620 + lift * 20, HY - 90 - lift * 230]], handShape: ['open', 'fist'] }));
    P.push(person(790, HY - 30, s, { ...U[2], seated: true, face: 'sad', t, bob: 2, shadow: false, look: -.5, handsW: [[720, HY - 80], [860, HY - 80]] }));
    // sugar cubes in their mouths (sucking: tiny bob)
    P.forEach((p, i) => { if (i === 1 && lift > .5) return; sugarCube(p.head[0] + 2, p.head[1] + 32 * s + Math.sin(t * 6 + i) * 2, s * .75, .2 * (i - 1)); });
    if (lift > .5) sugarCube(P[1].hands[1][0] + 4, P[1].hands[1][1] - 26, 1.6, .3);
    // table with empty glasses and a sugar bowl
    ctx.fillStyle = '#4a2f1d'; ctx.fillRect(250, HY + 40, 24, 300); ctx.fillRect(806, HY + 40, 24, 300);
    ctx.fillStyle = '#7f5539'; ctx.beginPath(); ctx.moveTo(240, HY - 110); ctx.lineTo(840, HY - 110); ctx.lineTo(900, HY); ctx.lineTo(180, HY); ctx.closePath(); ctx.fill(); rr(170, HY - 4, 740, 44, 8); ctx.fill();
    [330, 540, 750].forEach(x => teaGlass(x, HY - 70, .42, 0));
    ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.ellipse(440, HY - 50, 50, 18, 0, 0, 7); ctx.fill(); for (let i = 0; i < 5; i++) sugarCube(415 + i * 12, HY - 62 - (i % 2) * 8, .8, i * .3);
  });
  pill('❄️ ERZURUM · ÇAYSIZ 3. GÜN', 540, 1185, { size: 34, bg: '#111c', fg: '#fff', alpha: clamp((t - r[0] - .3) / .3) });
  spot(540, 900, 760, .45); grain(t, .05);
}

// ---------- 5. dads: staring out of the rainy window ----------
function babalarScene(t) {
  const r = TL.babalar;
  blurred(8, () => { kitchenBack(t); familyTable(540, 1500, 900, t); breakfastS(540, 1470, .62, t); });
  ctx.fillStyle = 'rgba(30,41,59,.35)'; ctx.fillRect(0, 0, W, H);
  shot(t, r, 1.0, 1.1, 540, 960, 600, 900, () => {
    // big window with rain
    ctx.fillStyle = '#475569'; rr(560, 260, 470, 820, 16); ctx.fill(); ctx.fillStyle = '#94a3b8'; rr(585, 285, 420, 770, 10); ctx.fill();
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 14; ctx.strokeRect(585, 285, 420, 770); ctx.beginPath(); ctx.moveTo(795, 285); ctx.lineTo(795, 1055); ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.rect(585, 285, 420, 770); ctx.clip(); ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 2; for (let i = 0; i < 40; i++) { const x = 590 + rnd(i) * 410, y = 280 + ((rnd(i + 5) * 800 + t * 500) % 800); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 6, y + 26); ctx.stroke(); } ctx.restore();
    chairBack(420, 1350, 2.4, '#7c4a2a');
    const hh = person(420, 1350, 2.4, { ...DAD, seated: true, face: 'sad', look: 1, tilt: .08, t, shadow: false, handsW: [[330, 1250], [600, 1130]], handShape: ['open', 'fist'] }).hands;
    teaGlass(hh[1][0] + 8, hh[1][1] - 30, 1.1, 0, false);
  });
  pollCard(t, r[0] + .5, r[1]);
  grain(t, .05);
}

// ---------- 6. the secret: mum's hidden last tea bag ----------
function anneScene(t) {
  const r = TL.anne;
  shot(t, r, 1.0, 1.28, 540, 960, 620, 860, () => {
    ctx.fillStyle = '#0b1020'; ctx.fillRect(-300, -300, W + 600, H + 600);
    ctx.fillStyle = '#111827'; ctx.fillRect(-300, 1300, W + 600, 800);
    // cupboard (doors swing open)
    const open = easeOut(clamp((t - r[0] - .6) / .6));
    ctx.fillStyle = '#3f2a1a'; rr(520, 560, 380, 460, 10); ctx.fill(); ctx.fillStyle = '#1c1917'; rr(540, 580, 340, 420, 6); ctx.fill();
    ctx.fillStyle = '#3f2a1a'; ctx.fillRect(540, 780, 340, 12);
    // jars on the shelves, and the last tea bag at the very back
    [[575, 740, '#78350f'], [640, 750, '#9a3412'], [820, 745, '#57534e'], [600, 960, '#44403c'], [830, 955, '#7c2d12']].forEach(([x, y, c]) => { ctx.fillStyle = c; rr(x - 22, y - 50, 44, 50, 8); ctx.fill(); });
    glow(720, 930, 150 * (.6 + open * .6), 'rgba(250,204,21,A)', .55 * open);
    ctx.save(); ctx.translate(720, 930); ctx.rotate(-.06); ctx.fillStyle = '#fef3c7'; rr(-38, -48, 76, 92, 6); ctx.fill(); ctx.fillStyle = TEA; rr(-38, -48, 76, 26, 6); ctx.fill(); ctx.fillStyle = '#fff'; font(900, 16); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ÇAY', 0, -35); ctx.fillStyle = '#111'; font(800, 12); ctx.fillText('SON', 0, 0); ctx.fillText('POŞET', 0, 16); ctx.restore();
    const dw = 170 * (1 - open);
    ctx.fillStyle = '#5b3a1e'; ctx.fillRect(540, 580, dw, 420); ctx.fillRect(880 - dw, 580, dw, 420);
    // mum with a torch, finger on her lips
    const hh = person(300, 1300, 2.2, { shirt: '#be185d', dressTop: '#be185d', dress: '#831843', skin: '#e9b48a', scarf: '#fbcfe8', female: true, face: 'sly', look: .9, t, shadow: false,
      handsW: [[250, 1160], [520, 1080]], handShape: ['open', 'fist'] }).hands;
    // torch beam to the cupboard
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const bg = ctx.createLinearGradient(hh[1][0], 0, 900, 0); bg.addColorStop(0, 'rgba(255,250,200,.55)'); bg.addColorStop(1, 'rgba(255,250,200,.05)'); ctx.fillStyle = bg;
    ctx.beginPath(); ctx.moveTo(hh[1][0] + 20, hh[1][1] - 10); ctx.lineTo(920, 640); ctx.lineTo(920, 1040); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#374151'; ctx.save(); ctx.translate(hh[1][0], hh[1][1] - 6); ctx.rotate(-.35); rr(-10, -14, 56, 26, 6); ctx.fill(); ctx.fillStyle = '#fef9c3'; rr(40, -16, 10, 30, 3); ctx.fill(); ctx.restore();
  });
  if (t > r[0] + 1.3) stampHit(540, 1185, '🤫 ANNELERİN SIRRI', '#7c3aed', (t - r[0] - 1.3) / .3);
  grain(t, .07);
}

// ---------- 7. map: which city lasts longest? ----------
const Q_CITIES = [[28.98, 41.01], [32.86, 39.93], [27.14, 38.42], [40.52, 41.02], [30.7, 36.9], [41.27, 39.9], [37.02, 39.75], [29.06, 40.18], [39.72, 41.0], [43.38, 38.5], [35.32, 37.0], [38.79, 37.16]];
function finScene2(t) {
  const r = TL.fin;
  cam = { lon: 35.35, lat: 38.2 + Math.sin(t * .3) * .04, z: lerp(1.0, 1.06, clamp((t - r[0]) / 4)) };
  ctx.fillStyle = '#0b1d3a'; ctx.fillRect(0, 0, W, H);
  drawSea(t); drawMap(t, { island: false });
  Q_CITIES.forEach(([lo, la], i) => {
    const [x, y] = P(lo, la), k = .8 + Math.abs(Math.sin(t * 3 + i)) * .4;
    glow(x, y, 60, 'rgba(244,185,66,A)', .4);
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = GOLD; ctx.beginPath(); ctx.arc(0, 0, 24, 0, 7); ctx.fill(); ctx.fillStyle = '#111'; font(900, 30); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', 0, 2); ctx.restore();
  });
}

// ---------- render ----------
const SCENES2 = [['hook', hookScene], ['rize', rizeScene], ['izmir', izmirScene], ['erzurum', erzurumScene], ['babalar', babalarScene], ['anne', anneScene], ['fin', finScene2]];
function render(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  SCENES2.forEach(([k, fn]) => {
    const r = TL[k]; if (!r || t < r[0] - .02 || t > r[1] + .35) return;
    const a = t > r[1] ? 1 - (t - r[1]) / .35 : 1;
    ctx.save(); ctx.globalAlpha = clamp(a); fn(t); ctx.restore();
  });
  if (t < TL.hook[1]) title([['ÇAYSIZ', 130, '#fff'], ['3. GÜN 😱', 130, GOLD]], -1, TL.hook[1], t, 400);
  scoreboard(t);
  if (t >= TL.fin[0]) {
    title([['SENİN ŞEHRİN', 84, '#fff'], ['KAÇ GÜN', 100, GOLD], ['DAYANIR? 👇', 100, GOLD]], TL.fin[0] + .1, 99, t, 420);
    pill('⏳ SIRADAKİ BÖLÜM: SON POŞET', 540, 1180, { size: 44, bg: GOLD, fg: '#111', alpha: clamp((t - TL.fin[0] - .5) / .25) });
    pill('🔔 Takip et, kaçırma', 540, 1560, { size: 32, bg: '#111c', fg: '#fff', alpha: clamp((t - TL.fin[0] - .9) / .25) });
  }
  subtitles(t);
  badge();
}
