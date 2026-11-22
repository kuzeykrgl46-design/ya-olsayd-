// ===== Ya Olsaydı? #3 · Maçta İnternet Kesilseydi · Bölüm 2: Golü kim attı? =====
// Uses lib_internet.js (characters, rooms, broadcast). TL comes from timeline2.js.
let T = 0;
const TL = window.TL || {
  tv: [0, 5.1], mobil: [5.1, 10.3], skor: 8.3, okey: [10.3, 14.8], soru: [12.5, 15.3], kuzen: [14.8, 19], run: 17.1,
  gol: [19, 22.8], kick: 19.1, hakli: 21.2, dunya: [22.8, 30.3], off: 25.4, ask: 26.4, b3: 28, dur: 30.3, freeze: 0,
};
const SUBS = window.SUBS_DATA || [];

function credit(text, y, a) { pill('💬 ' + text, W / 2, y, { size: 36, bg: '#ffffff', fg: '#111', alpha: a }); }
function tvFrame(cx, cy, w, h) {
  softShadow(() => { ctx.fillStyle = '#0f0f12'; rr(cx - w / 2 - 18, cy - h / 2 - 18, w + 36, h + 36, 18); ctx.fill(); }, 50, 'rgba(0,0,0,.6)', 20);
  ctx.fillStyle = '#1c1c22'; ctx.fillRect(cx - 30, cy + h / 2 + 18, 60, 36); rr(cx - 150, cy + h / 2 + 50, 300, 16, 8); ctx.fill();
}

// ---------- 1. TV: every channel says "not on this channel" ----------
function tvScene(t) {
  livingRoom(t, 'rgba(80,120,220,A)');
  const cx = 540, cy = 760, w = 860, h = 500, ch = 1 + Math.floor(t * 2.2) % 9;
  tvFrame(cx, cy, w, h);
  ctx.save(); rr(cx - w / 2, cy - h / 2, w, h, 8); ctx.clip();
  const g = ctx.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); g.addColorStop(0, '#1d4ed8'); g.addColorStop(1, '#0b2a7a'); ctx.fillStyle = g; ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  if ((t * 2.2) % 1 < .12) { for (let i = 0; i < 700; i++) { const v = Math.floor(rnd(i + Math.floor(t * 30)) * 255); ctx.fillStyle = `rgb(${v},${v},${v})`; ctx.fillRect(cx - w / 2 + rnd(i * 3) * w, cy - h / 2 + rnd(i * 7) * h, 12, 6); } }
  ctx.fillStyle = '#fff'; font(900, 46); ctx.textAlign = 'right'; ctx.textBaseline = 'top'; ctx.fillText('KANAL ' + ch, cx + w / 2 - 30, cy - h / 2 + 24);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; font(800, 40); ctx.fillText('Bu maç bu kanalda', cx, cy - 10); ctx.fillText('yayınlanmıyor.', cx, cy + 44);
  font(700, 28); ctx.fillStyle = '#bde0fe'; ctx.fillText('Yalnızca internet yayınında', cx, cy + 120);
  ctx.restore();
  ctx.fillStyle = '#7b2c3b'; rr(80, 1300, 920, 200, 50); ctx.fill(); ctx.fillStyle = '#922f45'; rr(60, 1240, 960, 110, 50); ctx.fill();
  human(820, 1150, 1.5, { shirt: '#457b9d', pants: '#343a40', hair: '#ccc', hairStyle: 'bald', face: 'angry', pose: 'remote', mustache: true, skin: '#e0a47a', t });
  backHead(300, 1230, 1.1, { shirt: TR_RED, hair: '#2b1d14', t });
  vignette(.5);
}

// ---------- 2. Whole country turns on mobile data ----------
function phoneBig(cx, cy, s, t, fail) {
  ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s); ctx.rotate(-.06);
  softShadow(() => { ctx.fillStyle = '#111'; rr(-150, -280, 300, 560, 40); ctx.fill(); }, 40, 'rgba(0,0,0,.6)', 14);
  ctx.fillStyle = '#f8f9fa'; rr(-132, -250, 264, 500, 26); ctx.fill();
  ctx.fillStyle = '#111'; font(800, 20); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('19:42', -110, -224);
  ctx.textAlign = 'right'; ctx.fillStyle = '#e63946'; ctx.fillText('✕ 4.5G', 112, -224);
  ctx.fillStyle = '#e9ecef'; rr(-112, -196, 224, 40, 20); ctx.fill(); ctx.fillStyle = '#6c757d'; font(700, 18); ctx.textAlign = 'left'; ctx.fillText('🔒 canli-skor…', -96, -176);
  if (!fail) { ctx.save(); ctx.translate(0, -10); ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 0, 44, t * 6, t * 6 + 4.2); ctx.stroke(); ctx.restore(); ctx.fillStyle = '#6c757d'; font(800, 22); ctx.textAlign = 'center'; ctx.fillText('Yükleniyor…', 0, 80); }
  else { ctx.fillStyle = '#495057'; font(900, 70); ctx.textAlign = 'center'; ctx.fillText('😵', 0, -40); font(900, 26); ctx.fillStyle = '#111'; ctx.fillText('Sayfa açılamadı', 0, 40); font(700, 18); ctx.fillStyle = '#6c757d'; ctx.fillText('İnternet bağlantınızı', 0, 80); ctx.fillText('kontrol edin', 0, 104); }
  ctx.restore();
}
function streetBack(t) {
  const sg = ctx.createLinearGradient(0, 0, 0, H); sg.addColorStop(0, '#0b132b'); sg.addColorStop(1, '#1b263b'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 50; i++) { ctx.fillStyle = `rgba(255,255,255,${.3 + rnd(i + 4) * .5})`; ctx.beginPath(); ctx.arc(rnd(i) * W, rnd(i + 3) * 420, 1.5 + rnd(i + 8), 0, 7); ctx.fill(); }
  [[0, 440, 300, '#415a77'], [290, 380, 260, '#4f6d8f'], [540, 460, 280, '#3d5a80'], [810, 400, 300, '#415a77']].forEach(([x, y, w, c], k) => {
    ctx.fillStyle = c; ctx.fillRect(x, y, w, 1300 - y);
    for (let r = 0; r < 6; r++) for (let q = 0; q < 3; q++) { const on = rnd(k * 50 + r * 3 + q) > .35; ctx.fillStyle = on ? '#ffd166' : '#1b263b'; ctx.fillRect(x + 30 + q * 85, y + 40 + r * 135, 50, 70); }
  });
  ctx.fillStyle = '#343a40'; ctx.fillRect(0, 1300, W, H - 1300); ctx.fillStyle = '#495057'; ctx.fillRect(0, 1300, W, 18);
}
function mobilScene(t) {
  streetBack(t);
  [[110, 0], [290, 3], [790, 5], [960, 7]].forEach(([x, id], i) => castMember(id, x, 1210, 1.05, { pose: 'phoneUp', face: i % 2 ? 'angry' : 'shock', t, bob: i, shadow: false }));
  phoneBig(540, 900, 1.05, t, t >= TL.skor);
  if (t >= TL.skor) stampHit(540, 560, 'SKOR SİTESİ: ❌', TR_RED, (t - TL.skor) / .3);
  credit('Yorumlardan: @sabotaj840 · @can_ord01', 1250, vis(t, TL.mobil[0] + .8, TL.mobil[1], .25, .2));
  vignette(.4);
}
function stampHit(x, y, text, col, p) {
  if (p <= 0) return; const k = lerp(2, 1, easeOut(clamp(p)));
  ctx.save(); ctx.globalAlpha *= clamp(p * 3); ctx.translate(x, y); ctx.rotate(-.08); ctx.scale(k, k);
  font(900, 44); const w = ctx.measureText(text).width + 56; rr(-w / 2, -40, w, 80, 16); ctx.fillStyle = col; ctx.fill();
  ctx.lineWidth = 5; ctx.strokeStyle = '#fff'; rr(-w / 2 + 8, -32, w - 16, 64, 10); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 3); ctx.restore();
}

// ---------- 3. Kahve: the fourth player sits down ----------
function okeyScene(t) {
  const wg = ctx.createLinearGradient(0, 0, 0, H); wg.addColorStop(0, '#5e3b2c'); wg.addColorStop(1, '#3b2418'); ctx.fillStyle = wg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#2b1810'; ctx.fillRect(0, 1360, W, H - 1360);
  ctx.save(); ctx.translate(540, 470); rr(-300, -54, 600, 108, 18); ctx.fillStyle = '#1d3557'; ctx.fill(); ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 5; rr(-290, -44, 580, 88, 12); ctx.stroke(); ctx.fillStyle = '#ffd166'; font(900, 60); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('KIRAATHANE', 0, 3); ctx.restore();
  const D = [
    { shirt: '#6f4e37', hair: '#d0d0d0', hairStyle: 'grey', mustache: true, cap: '#4a3b35', skin: '#d9a37a' },
    { shirt: '#495057', hair: '#bbb', hairStyle: 'bald', mustache: true, glasses: true, skin: '#e0a47a' },
    { shirt: '#3d5a80', hair: '#888', hairStyle: 'short', beard: true, cap: '#2b2d42', skin: '#c68642' },
  ];
  tvSet(540, 760, 520, 300, t, true);
  if (t > TL.okey[0] + 1.2) stampHit(800, 860, 'OKEY 4/4 ✅', '#2d6a4f', (t - TL.okey[0] - 1.2) / .3);
  human(300, 1120, 1.2, { ...D[0], face: 'happy', t, bob: 1, shadow: false });
  human(500, 1090, 1.05, { ...D[2], face: 'happy', t, bob: 2, shadow: false });
  human(690, 1120, 1.2, { ...D[1], face: 'happy', t, bob: 3, shadow: false });
  // the young newcomer slides in and sits as the fourth
  const p = easeOut(clamp((t - TL.okey[0] - .3) / .9));
  castMember(0, lerp(1180, 880, p), 1110, 1.15, { face: 'happy', pose: p < 1 ? 'down' : 'shout', t, bob: 4, shadow: false });
  okeyTable(540, 1180, t);
  const cg = ctx.createLinearGradient(0, 1186, 0, 1360); cg.addColorStop(0, '#9c2a2a'); cg.addColorStop(1, '#6b1d1d'); ctx.fillStyle = cg; rr(300, 1186, 480, 174, 10); ctx.fill();
  credit('Yorumlardan: @anil_burakpirim', 1250, vis(t, TL.okey[0] + .8, TL.soru[0], .25, .2));
  vignette(.45);
}

// ---------- 4. The cousin from the stadium runs home ----------
function kuzenScene(t) {
  streetBack(t);
  // stadium glow on the horizon
  glow(140, 520, 360, 'rgba(255,255,220,A)', .45);
  ctx.fillStyle = '#2b2d42'; ctx.beginPath(); ctx.ellipse(140, 560, 220, 70, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-80, 560, 440, 60);
  [20, 260].forEach(x => { ctx.fillStyle = '#495057'; ctx.fillRect(x, 380, 8, 180); ctx.fillStyle = '#fffbe6'; rr(x - 22, 366, 52, 22, 4); ctx.fill(); });
  // neighbours watching from windows
  [[330, 640, 4], [600, 560, 8], [860, 620, 2]].forEach(([x, y, id]) => { ctx.fillStyle = '#ffd166'; ctx.fillRect(x - 70, y - 120, 140, 150); ctx.save(); ctx.beginPath(); ctx.rect(x - 70, y - 120, 140, 150); ctx.clip(); castMember(id, x, y + 60, .7, { face: 'shock', t, bob: id, shadow: false }); ctx.restore(); });
  const p = clamp((t - TL.kuzen[0]) / (TL.kuzen[1] - TL.kuzen[0] + .3));
  const x = lerp(-120, 760, easeOut(p)), bounce = Math.abs(Math.sin(t * 14)) * 22;
  ctx.strokeStyle = '#ffffff66'; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - 110 - i * 20, 1050 + i * 40); ctx.lineTo(x - 260 - i * 30, 1050 + i * 40); ctx.stroke(); }
  human(x, 1120 - bounce, 1.55, { shirt: TR_RED, pants: '#fff', hair: '#111', hairStyle: 'short', face: 'shout', pose: 'shout', skin: '#e9b48a', t, shadow: false });
  trFlag(x + 40, 760 - bounce, 140, 92, t * 8);
  if (t > TL.run) pill('🏟️ STATTAN GELİYOR', 540, 580, { size: 40, bg: TR_RED, fg: '#fff', alpha: clamp((t - TL.run) / .25) });
  credit('Yorumlardan: @hayati_dmr2', 1250, vis(t, TL.kuzen[0] + .5, TL.kuzen[1], .25, .2));
  vignette(.4);
}

// ---------- 5. "Penaltıyı attık, gol bizim!" ----------
function kickerBack(x, y, s, run) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const sw = Math.sin(run * 14) * (run < 1 ? 1 : 0);
  ctx.strokeStyle = '#e9b48a'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-10, 40); ctx.lineTo(-14 - sw * 12, 92); ctx.moveTo(10, 40); ctx.lineTo(14 + sw * 12, 92); ctx.stroke();
  ctx.fillStyle = TR_RED; ctx.fillRect(-20 - sw * 12, 78, 14, 18); ctx.fillRect(8 + sw * 12, 78, 14, 18);
  ctx.fillStyle = '#fff'; rr(-24, 22, 48, 26, 6); ctx.fill();
  ctx.fillStyle = TR_RED; rr(-30, -40, 60, 68, 12); ctx.fill();
  ctx.fillStyle = '#fff'; font(900, 36); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('10', 0, -6);
  ctx.fillStyle = '#e9b48a'; ctx.beginPath(); ctx.arc(0, -58, 18, 0, 7); ctx.fill(); ctx.fillStyle = '#2b1d14'; ctx.beginPath(); ctx.arc(0, -62, 19, 0, 7); ctx.fill();
  ctx.restore();
}
function goalReplay(cx, cy, w, h, u) { // u: seconds since the kick line starts
  ctx.save(); rr(cx - w / 2, cy - h / 2, w, h, 18); ctx.clip();
  const g = ctx.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); g.addColorStop(0, '#2f8f4e'); g.addColorStop(1, '#3aa35b'); ctx.fillStyle = g; ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  ctx.fillStyle = '#0b132b'; ctx.fillRect(cx - w / 2, cy - h / 2, w, h * .28);
  for (let i = 0; i < 220; i++) { ctx.fillStyle = rnd(i + 5) > .45 ? TR_RED : '#fff'; ctx.fillRect(cx - w / 2 + rnd(i) * w, cy - h / 2 + rnd(i + 9) * h * .25, 5, 5); }
  // goal + net
  const gx = cx - w * .22, gy = cy - h * .2, gw = w * .44, gh = h * .3;
  ctx.fillStyle = '#ffffff22'; ctx.fillRect(gx, gy, gw, gh); ctx.strokeStyle = '#ffffff55'; ctx.lineWidth = 1;
  const bulge = u > 1.05 ? Math.sin(clamp((u - 1.05) / .4) * Math.PI) * 14 : 0;
  for (let i = 0; i <= 14; i++) { ctx.beginPath(); ctx.moveTo(gx + i * gw / 14, gy - (i > 8 && i < 13 ? bulge : 0)); ctx.lineTo(gx + i * gw / 14, gy + gh); ctx.stroke(); }
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(gx, gy + gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
  // keeper dives the wrong way
  const dive = clamp((u - .7) / .4);
  ctx.save(); ctx.translate(cx - dive * gw * .32, gy + gh - 34 + dive * 14); ctx.rotate(-dive * 1.2);
  ctx.fillStyle = '#2b2d42'; rr(-16, -30, 32, 44, 8); ctx.fill(); ctx.fillStyle = '#e9b48a'; ctx.beginPath(); ctx.arc(0, -40, 11, 0, 7); ctx.fill(); ctx.restore();
  // ball to the top corner
  const bp = clamp((u - .6) / .45), bx = lerp(cx, gx + gw * .86, bp), by = lerp(cy + h * .28, gy + gh * .25, bp) - Math.sin(bp * Math.PI) * 30;
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(bx, by, lerp(14, 8, bp), 0, 7); ctx.fill(); ctx.strokeStyle = '#111'; ctx.lineWidth = 2; ctx.stroke();
  kickerBack(lerp(cx - 70, cx - 10, clamp(u / .6)), cy + h * .33, 1.2, clamp(u / .6));
  ctx.restore();
  rr(cx - w / 2, cy - h / 2, w, h, 18); ctx.strokeStyle = '#fff'; ctx.lineWidth = 8; ctx.stroke();
  // score bug
  ctx.save(); ctx.translate(cx - w / 2 + 14, cy - h / 2 + 12); rr(0, 0, 400, 46, 8); ctx.fillStyle = '#0d1b2add'; ctx.fill();
  trFlag(10, 11, 34, 24); ctx.fillStyle = '#fff'; font(900, 24); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const scored = u > 1.05; ctx.fillText('TÜR', 78, 24); ctx.fillStyle = scored ? '#ffd166' : '#fff'; ctx.fillText(scored ? '2 - 1' : '1 - 1', 146, 24); ctx.fillStyle = '#fff'; ctx.fillText('BRA', 214, 24);
  brFlag(246, 11, 34, 24); ctx.fillStyle = '#ffd166'; ctx.fillText("90+4'", 336, 24); ctx.restore();
}
function golScene(t) {
  streetBack(t);
  const u = t - TL.kick;
  goalReplay(540, 720, 860, 520, u);
  if (u > 1.05) { const p = clamp((u - 1.05) / .3); ctx.save(); ctx.translate(540, 560); ctx.scale(lerp(.3, 1, backOut(p)) * .8, lerp(.3, 1, backOut(p)) * .8); ctx.rotate(-.08);
    ctx.fillStyle = '#ffd166'; ctx.beginPath(); for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, r = i % 2 ? 150 : 210; ctx.lineTo(Math.cos(a) * r * 1.4, Math.sin(a) * r * .68); } ctx.closePath(); ctx.fill();
    ctx.fillStyle = TR_RED; font(900, 92); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('GOOOL!', 0, 4); ctx.restore(); }
  // the cousin shouting in front
  human(300, 1180, 1.6, { shirt: TR_RED, pants: '#fff', hair: '#111', hairStyle: 'short', face: 'shout', pose: 'shout', skin: '#e9b48a', t, shadow: false });
  // the neighbour who shouted in Bölüm 1 was right
  if (t > TL.hakli) {
    const a = clamp((t - TL.hakli) / .3);
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#ffd166'; rr(620, 1000, 360, 230, 18); ctx.fill();
    ctx.save(); rr(620, 1000, 360, 230, 18); ctx.clip(); castMember(6, 800, 1210, 1.0, { face: 'happy', pose: 'shout', t, shadow: false }); ctx.restore();
    ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 6; ctx.strokeRect(620, 1170, 360, 60); ctx.restore();
    stampHit(800, 980, 'HAKLIYMIŞ ✅', '#2a9d8f', (t - TL.hakli - .1) / .3);
  }
  credit('Yorumlardan: @muratuzmaa', 1250, vis(t, TL.hakli, TL.gol[1] + .2, .25, .2));
  vignette(.4);
}

// ---------- 6. Zoom out: the whole world goes dark ----------
const LAND = [ // rough continents on a unit globe (lon, lat polygons, coarse)
  [[-165, 65], [-140, 70], [-95, 72], [-60, 60], [-55, 48], [-80, 25], [-97, 18], [-105, 22], [-118, 32], [-125, 45], [-150, 58]],
  [[-80, 10], [-60, 8], [-35, -6], [-40, -22], [-58, -38], [-70, -52], [-75, -40], [-70, -15], [-80, -2]],
  [[-10, 36], [10, 37], [30, 32], [42, 12], [51, 11], [40, -15], [32, -28], [20, -35], [12, -18], [8, 5], [-8, 5], [-17, 15]],
  [[-10, 43], [0, 50], [10, 55], [25, 60], [40, 66], [70, 72], [110, 74], [140, 70], [170, 66], [140, 50], [122, 30], [108, 20], [100, 8], [80, 8], [72, 20], [57, 25], [48, 30], [36, 36], [27, 36], [20, 40], [12, 44], [3, 43]],
  [[114, -22], [130, -12], [143, -11], [153, -27], [146, -39], [130, -32], [115, -34]],
];
function proj(lon, lat, rot, R, cx, cy) { const l = (lon - rot) * Math.PI / 180, p = lat * Math.PI / 180; const x = Math.cos(p) * Math.sin(l), y = Math.sin(p), z = Math.cos(p) * Math.cos(l); return [cx + x * R, cy - y * R, z]; }
function dunyaScene(t) {
  ctx.fillStyle = '#030712'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 120; i++) { ctx.fillStyle = `rgba(255,255,255,${.2 + rnd(i + 4) * .6})`; ctx.beginPath(); ctx.arc(rnd(i) * W, rnd(i + 3) * H, 1 + rnd(i + 8) * 1.5, 0, 7); ctx.fill(); }
  const z = easeOut(clamp((t - TL.dunya[0]) / 1.2)), R = lerp(1600, 380, z), cx = 540, cy = 880, rot = lerp(35, 20, z) + (t - TL.dunya[0]) * 4;
  glow(cx, cy, R * 1.25, 'rgba(70,130,255,A)', .25);
  const og = ctx.createRadialGradient(cx - R * .3, cy - R * .3, R * .1, cx, cy, R); og.addColorStop(0, '#1b3b6f'); og.addColorStop(1, '#061226');
  ctx.fillStyle = og; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();
  LAND.forEach(poly => { ctx.beginPath(); let started = false; poly.forEach(([lo, la]) => { const [x, y, d] = proj(lo, la, rot, R, cx, cy); if (d < -0.1) return; started ? ctx.lineTo(x, y) : (ctx.moveTo(x, y), started = true); }); ctx.closePath(); ctx.fillStyle = '#0f2a1d'; ctx.fill(); });
  // city lights that switch off one by one (Türkiye last)
  for (let i = 0; i < 420; i++) {
    const lo = rnd(i * 2) * 360 - 180, la = rnd(i * 2 + 1) * 120 - 55; const [x, y, d] = proj(lo, la, rot, R, cx, cy); if (d < 0.05) continue;
    const offAt = TL.off + rnd(i + 99) * 1.6; if (t > offAt) continue;
    ctx.fillStyle = `rgba(255,209,102,${.5 + rnd(i + 7) * .5})`; ctx.beginPath(); ctx.arc(x, y, 2 + rnd(i + 3) * 3, 0, 7); ctx.fill();
  }
  const [tx, ty, td] = proj(35, 39, rot, R, cx, cy);
  if (td > 0) { const on = t < TL.off + 2.0; ctx.fillStyle = on ? TR_RED : '#3a0d10'; ctx.beginPath(); ctx.arc(tx, ty, 12, 0, 7); ctx.fill(); if (on) glow(tx, ty, 40, 'rgba(227,10,23,A)', .6); }
  ctx.restore();
  // small celebrating street shrinking into the globe at the start
  const s = 1 - z; if (s > .02) { ctx.save(); ctx.globalAlpha = s; ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-cx, -cy); streetBack(t); ctx.restore(); }
  if (t > TL.off) if (t < TL.ask) pill('📵 BÜTÜN DÜNYADA BAĞLANTI YOK', 540, 1250, { size: 38, bg: '#111c', fg: '#fff', alpha: clamp((t - TL.off) / .3) });
}

// ---------- render ----------
function render(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const inR = r => t >= r[0] - .05 && t < r[1] + .3;
  if (t < TL.tv[1] + .3) { tvScene(t); title([["TV'DE", 80, '#fff'], ['İZLERİZ? 📺', 96, '#ffd166']], .1, TL.tv[1], t, 340); }
  if (inR(TL.mobil)) { sceneSlide(t, TL.mobil[0], () => mobilScene(t)); title([['BÜTÜN TÜRKİYE', 76, '#fff'], ['MOBİL VERİDE 📶', 80, '#ffd166']], TL.mobil[0] + .1, TL.mobil[1], t, 340); }
  if (inR(TL.okey)) {
    sceneSlide(t, TL.okey[0], () => okeyScene(t));
    if (t < TL.soru[0]) title([['KAHVEDE', 104, '#fff']], TL.okey[0] + .1, TL.soru[0], t, 300);
  }
  // the question: a small bouncing label over the moving scene (no full-screen card)
  if (t >= TL.soru[0] - .05 && t < TL.soru[1] + .3) {
    const a = vis(t, TL.soru[0], TL.soru[1], .2, .25), k = lerp(.6, 1, backOut(clamp((t - TL.soru[0]) / .35))) * (1 + Math.sin(t * 6) * .02);
    ctx.save(); ctx.globalAlpha = a; ctx.translate(540, 320); ctx.scale(k, k);
    softShadow(() => { rr(-400, -80, 800, 160, 30); ctx.fillStyle = '#ffd166'; ctx.fill(); }, 30, 'rgba(0,0,0,.5)', 10);
    ctx.fillStyle = '#111'; font(900, 54); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('💬 SENCE GOLÜ KİM ATTI?', 0, -16); font(800, 32); ctx.fillText('Yorumlara yaz 👇', 0, 44);
    ctx.restore();
  }
  if (inR(TL.kuzen)) { sceneSlide(t, TL.kuzen[0], () => kuzenScene(t)); title([['GOLÜ BİLEN', 76, '#fff'], ['TEK KİŞİ: KUZEN', 84, '#ffd166']], TL.kuzen[0] + .1, TL.kuzen[1], t, 360); }
  if (inR(TL.gol)) { sceneSlide(t, TL.gol[0], () => golScene(t)); title([['PENALTIYI', 76, '#fff'], ['ATTIK! 🇹🇷', 104, '#ffd166']], TL.gol[0] + .1, TL.gol[1], t, 300); }
  if (t >= TL.dunya[0] - .05) {
    dunyaScene(t);
    if (t < TL.ask) title([['AMA İNTERNET', 76, '#fff'], ['BÜTÜN DÜNYADA', 84, '#ffd166'], ['GİTTİ 🌍', 96, '#ffd166']], TL.dunya[0] + .8, TL.ask, t, 380);
    else { title([['YARIN SABAH', 80, '#fff'], ['NE OLACAK?', 104, '#ffd166']], TL.ask, 99, t, 380); pill("📵 BÖLÜM 3'TE", 540, 1250, { size: 48, bg: '#ffd166', fg: '#111', alpha: clamp((t - TL.b3) / .25) }); }
  }
  subtitles(t);
  badge();
  if (t < .12) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .12})`; ctx.fillRect(0, 0, W, H); }
}
