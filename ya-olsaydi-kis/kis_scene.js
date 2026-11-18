// ===== Ya Olsaydı #2 · Bölüm 1: "Kış hiç bitmeseydi?" =====
// Voiceover (single take) starts at 0.3 s; times below are video time.
let T = 0;   // global animation clock used by the Antalya parts

const SUBS = [
  [0.3, 3.3, "Kış hiç bitmeseydi... Temmuz'da bile kar yağardı.", 0.3, 2.6],
  [3.9, 6.75, "Antalya'da turistler şezlong yerine kızak kiralardı.", 3.95, 2.6],
  [7.2, 11.0, 'Anneler "hırkanı giy" demeyi bırakırdı: "Yorganla çık!"', 7.3, 3.5],
  [11.5, 15.65, 'Okullar ise hiç tatil olmazdı. Çünkü kar zaten hep vardı.', 11.6, 3.9],
  [16.0, 18.8, 'Karslılar mı? "Ne değişti ki?" derdi.', 16.05, 2.6],
  [18.95, 22.1, 'Ankaralılar da şişme havuzu buz pistine çevirirdi.', 19.0, 2.8],
  [22.4, 28, 'Kış hiç bitmeseydi senin şehrin ne yapardı? Yorumlara yaz.', 22.5, 3.4],
];

function sendPrompt(text, y, alpha) {
  if (alpha <= 0) return;
  ctx.save(); ctx.globalAlpha *= alpha; font(800, 36);
  const w = ctx.measureText(text).width + 110, x = W / 2 - w / 2;
  rr(x, y - 34, w, 68, 34); ctx.fillStyle = '#ffffff'; ctx.fill();
  ctx.fillStyle = '#e63946';
  ctx.beginPath(); ctx.moveTo(x + 30, y - 4); ctx.lineTo(x + 72, y - 20); ctx.lineTo(x + 58, y + 20); ctx.lineTo(x + 50, y + 4); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#111'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(text, x + 88, y + 2);
  ctx.restore();
}

// ---------- real-world map (neighbours with proper coastlines) ----------
const GREECE_COAST = [[25.87,40.85],[25.3,40.95],[24.4,40.94],[23.9,40.75],[23.7,40.2],[23.3,39.95],[22.94,40.63],[22.6,40.1],[23.0,39.4],[22.8,38.9],[23.7,38.0],[23.0,37.4],[22.5,36.4],[21.7,36.8],[21.1,37.8],[20.2,39.4],[19.5,40.5]];
const BLACKSEA_NORTH = [[41.63,41.65],[41.67,42.15],[41.0,43.0],[39.73,43.58],[39.07,44.1],[37.77,44.72],[37.32,44.9],[36.6,45.3],[35.4,45.03],[34.15,44.5],[33.5,44.6],[32.7,45.4],[33.6,46.1],[31.6,46.6],[30.75,46.48],[29.7,45.2],[28.65,44.17],[27.92,43.2],[27.47,42.5],[27.98,42.05]];
const LEVANT = [[35.78,35.52],[35.88,34.89],[35.83,34.44],[35.5,33.9],[34.98,32.8],[34.77,32.08],[34.25,31.3],[32.3,31.2],[30.0,31.45],[27.0,31.4],[25.0,31.6],[20.0,32.2],[19.0,30.0],[19.0,22.0],[50.0,22.0],[50.0,37.15]];
const NORTH_LAND = [...borderWest, ...BLACKSEA_NORTH.slice().reverse(), [41.55,41.52], [50,41.6], [50,75], [19.0,75], [19.0,40.6], ...GREECE_COAST.slice().reverse()];
const EAST_LAND = [...borderEast, [50,37.15], [50,41.6]];
const SOUTH_LAND = [[44.79,37.15], ...borderSouth, ...LEVANT];
const ISLANDS = [  // [lon, lat, rx(deg lon), ry(deg lat), rot]
  [26.25,39.2,.32,.17,.3], [26.0,38.38,.12,.18,0], [26.75,37.73,.22,.07,0], [27.15,36.86,.17,.05,.4], [28.0,36.2,.14,.26,.6],
  [25.25,39.9,.2,.1,0], [24.9,35.25,1.25,.17,0], [23.9,38.5,.8,.15,-.55], [24.4,40.65,.15,.1,0]];
const TR_ISLANDS = [[25.85,40.18,.16,.06,0], [26.03,39.83,.05,.04,0]];

function ellipsePath(lon, lat, rx, ry, rot) {
  ctx.beginPath();
  for (let i = 0; i <= 28; i++) { const a = i / 28 * Math.PI * 2; const x = Math.cos(a) * rx, y = Math.sin(a) * ry; const [px, py] = P(lon + x * Math.cos(rot) - y * Math.sin(rot), lat + x * Math.sin(rot) + y * Math.cos(rot)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.closePath();
}

// snow = 0..1 (sand -> white)
function drawMapKis(t, snow) {
  const mix = (a, b, p) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * p)).join(',')})`;
  const nb = mix([93, 107, 98], [150, 164, 180], snow);
  const tr = mix([232, 214, 160], [255, 255, 255], snow);
  ctx.lineJoin = 'round';
  [NORTH_LAND, EAST_LAND, SOUTH_LAND].forEach(p => { path(p); ctx.fillStyle = nb; ctx.fill(); });
  ISLANDS.forEach(i => { ellipsePath(...i); ctx.fillStyle = nb; ctx.fill(); });
  path(cyprus); ctx.fillStyle = nb; ctx.fill();
  // Turkey
  [thrace, anatolia].forEach(p => { path(p); ctx.fillStyle = tr; ctx.fill(); ctx.strokeStyle = snow > .5 ? '#9fb3c8' : '#9c7f45'; ctx.lineWidth = Math.max(1.5, 1.2 * cam.z); ctx.stroke(); });
  TR_ISLANDS.forEach(i => { ellipsePath(...i); ctx.fillStyle = tr; ctx.fill(); });
  path(vanLake); ctx.fillStyle = snow > .5 ? '#a9d6f5' : '#1d6fa5'; ctx.fill();
  ctx.save(); borderSegs.forEach(sg => { polyline(sg); ctx.strokeStyle = '#e63946'; ctx.lineWidth = 3; ctx.stroke(); }); ctx.restore();  // Turkey's land border
  drawNeighbourDetails(1);
}
// neighbour labels + their own borders, so the countries read as countries
const NB_BORDERS = [
  [[26.33,41.72],[25.3,41.25],[24.5,41.55],[23.6,41.4],[22.9,41.35],[21.0,41.0]],          // Greece | Bulgaria
  [[43.47,41.12],[44.9,41.25],[46.5,41.0],[46.5,41.9]],                                     // Georgia | Armenia/Azerbaijan
  [[44.78,39.71],[45.6,39.4],[46.5,38.85],[48.0,38.4]],                                     // Armenia/Azerb. | Iran
  [[44.79,37.15],[45.0,36.0],[45.8,35.0],[46.1,33.5],[47.8,32.0]],                          // Iraq | Iran
  [[42.36,37.11],[41.3,36.4],[41.0,34.4],[38.8,33.4]],                                      // Syria | Iraq
];
const NB_LABELS = [['YUNANİSTAN',24.9,41.15],['BULGARİSTAN',26.0,42.45],['GÜRCİSTAN',43.4,41.95],['ERMENİSTAN',45.0,40.55],['İRAN',45.35,38.2],['IRAK',43.6,35.7],['SURİYE',38.6,35.6],['KIBRIS',33.2,35.1]];
function drawNeighbourDetails(alpha) {
  if (alpha <= 0) return;
  ctx.save(); ctx.globalAlpha *= alpha;
  ctx.setLineDash([6, 7]); ctx.strokeStyle = '#6b7c90'; ctx.lineWidth = 2;
  NB_BORDERS.forEach(b => { polyline(b); ctx.stroke(); });
  ctx.setLineDash([]);
  font(800, Math.round(24 * Math.min(1.6, Math.max(1, cam.z * .6)))); ctx.textBaseline = 'middle';
  NB_LABELS.forEach(([n, lo, la]) => {
    let [x, y] = P(lo, la); if (y < 240 || y > 1620) return;
    const w = ctx.measureText(n).width; x = Math.max(16 + w / 2, Math.min(W - 16 - w / 2, x));
    ctx.textAlign = 'center'; ctx.lineWidth = 6; ctx.strokeStyle = '#ffffffcc'; ctx.strokeText(n, x, y); ctx.fillStyle = '#4a5a6c'; ctx.fillText(n, x, y);
  });
  ctx.restore();
}


function calendar(x, y, s, alpha) {
  if (alpha <= 0) return;
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(.06);
  rr(-90, -90, 180, 190, 18); ctx.fillStyle = '#fff'; ctx.fill();
  rr(-90, -90, 180, 54, 18); ctx.fillStyle = '#e63946'; ctx.fill(); ctx.fillRect(-90, -50, 180, 14);
  ctx.fillStyle = '#fff'; font(900, 30); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('TEMMUZ', 0, -62);
  ctx.fillStyle = '#111'; font(900, 80); ctx.fillText('15', 0, 30);
  ctx.restore();
}

function mapSnowfall(t, n = 160) {
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < n; i++) { const x = (rnd(i) * W + Math.sin(t + i) * 30) % W, y = (rnd(i + 999) * H + t * (80 + rnd(i + 3) * 90)) % H; ctx.globalAlpha = .55 + rnd(i + 5) * .45; ctx.beginPath(); ctx.arc(x, y, 2 + rnd(i + 7) * 5, 0, 7); ctx.fill(); }
  ctx.globalAlpha = 1;
}

// circle wipe from a screen point into a full-screen scene
function wipe(cx, cy, p, drawScene) {
  if (p <= 0) return;
  const r = easeOut(clamp(p)) * 2300;
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip(); drawScene(); ctx.restore();
  if (p < 1) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 10; ctx.stroke(); }
}

// ---------- scene: Antalya ----------
function antalyaScene(t) {
  T = t;
  sky(); mountains(); sea(); snowyBeach();
  palm(90, 1060, 1.0); palm(990, 1010, .85);
  kizakKiosk(270, 1225, 1.0);
  tourist(580, 1170, 1.15, { shirt: '#ff6b6b', holdSled: true, t });
  tourist(470, 1205, .85, { shirt: '#4cc9f0', t: t + .3 });
  const p = clamp((t - 4.2) / 2.4);
  slider(lerp(860, 600, p), lerp(1060, 960, p), 1.0, t);
  snowman(930, 1290, .8);
  sled(260, 1560, 1.2, .08); sled(820, 1520, 1.0, -.1);
  snowfall();
}

// ---------- scene: mother at the door ----------
function kid(x, y, s, layer, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (layer >= 3) { // rolled in a duvet, only the face peeks out
    const wob = Math.sin(t * 6) * .04; ctx.rotate(wob);
    rr(-95, -150, 190, 290, 90); ctx.fillStyle = '#f7d6e0'; ctx.fill();
    ctx.fillStyle = '#ff8fab'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(-60 + (i % 3) * 60, -90 + Math.floor(i / 3) * 80, 14, 0, 7); ctx.fill(); }
    ctx.strokeStyle = '#e5989b'; ctx.lineWidth = 6; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-90, -40 + i * 70); ctx.quadraticCurveTo(0, -20 + i * 70, 90, -40 + i * 70); ctx.stroke(); }
    ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -150, 36, 0, 7); ctx.fill();
    ctx.fillStyle = '#f7d6e0'; ctx.beginPath(); ctx.arc(0, -168, 40, Math.PI * 1.05, Math.PI * 1.95); ctx.fill();
    ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(-12, -150, 4, 0, 7); ctx.arc(12, -150, 4, 0, 7); ctx.fill();
    ctx.strokeStyle = '#333'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-8, -134); ctx.lineTo(8, -134); ctx.stroke();
  } else {
    ctx.fillStyle = '#3a3a3a'; ctx.fillRect(-20, 60, 16, 80); ctx.fillRect(4, 60, 16, 80);
    ctx.fillStyle = '#2a9d8f'; rr(-34, -40, 68, 104, 18); ctx.fill();                 // t-shirt
    if (layer >= 1) { ctx.fillStyle = '#e9c46a'; rr(-40, -44, 80, 108, 20); ctx.fill(); ctx.fillStyle = '#d4a017'; for (let i = 0; i < 4; i++) ctx.fillRect(-40, -20 + i * 22, 80, 4); } // cardigan
    if (layer >= 2) { ctx.fillStyle = '#1d3557'; rr(-50, -50, 100, 124, 24); ctx.fill(); ctx.fillStyle = '#fff'; rr(-54, -64, 108, 26, 13); ctx.fill(); }          // puffer coat
    ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -72, 30, 0, 7); ctx.fill();
    ctx.fillStyle = '#4a2c1a'; ctx.beginPath(); ctx.arc(0, -82, 30, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(-10, -72, 4, 0, 7); ctx.arc(10, -72, 4, 0, 7); ctx.fill();
  }
  ctx.restore();
}
function anneScene(t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#f6e7cb'); g.addColorStop(1, '#ead6b2');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#b08968'; ctx.fillRect(0, 1340, W, H - 1340);
  // open front door with snowy street outside
  ctx.fillStyle = '#7f5539'; ctx.fillRect(560, 560, 400, 790);
  ctx.save(); ctx.beginPath(); ctx.rect(580, 580, 360, 770); ctx.clip();
  const sg = ctx.createLinearGradient(0, 580, 0, 1350); sg.addColorStop(0, '#9fb3c8'); sg.addColorStop(1, '#dfe8f1'); ctx.fillStyle = sg; ctx.fillRect(580, 580, 360, 770);
  ctx.fillStyle = '#fff'; ctx.fillRect(580, 1180, 360, 170);
  ctx.fillStyle = '#b8c4cf'; ctx.fillRect(620, 820, 120, 360); ctx.fillRect(780, 900, 120, 280);
  ctx.fillStyle = '#fff'; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(580 + rnd(i) * 360, (rnd(i + 50) * 770 + t * 120) % 770 + 580, 3 + rnd(i + 3) * 4, 0, 7); ctx.fill(); }
  ctx.restore();
  ctx.fillStyle = '#9c6644'; ctx.beginPath(); ctx.moveTo(960, 560); ctx.lineTo(1060, 600); ctx.lineTo(1060, 1330); ctx.lineTo(960, 1350); ctx.closePath(); ctx.fill(); // door leaf
  // coat hooks
  ctx.fillStyle = '#5c4033'; ctx.fillRect(80, 700, 300, 18);
  const layer = t < 8.3 ? 1 : t < 9.75 ? 2 : 3;
  kid(700, 1240, 1.25, layer, t);
  mom(260, 1170, 1.45, true);
  // the item being handed over
  if (layer < 3) {
    const col = layer === 1 ? '#e9c46a' : '#1d3557';
    cardigan(420, 900 + Math.sin(t * 5) * 10, 1.0, -.3, col);
  }
  if (t > 9.7) speech(470, 620, 'Yorganla çık!', vis(t, 9.75, 11.0, .2, .2));
  sendPrompt('Annene gönder', 1560, vis(t, 9.9, 11.0, .25, .2));
}

// ---------- scene: school ----------
function okulScene(t) {
  const g = ctx.createLinearGradient(0, 0, 0, 1000); g.addColorStop(0, '#8fa6bd'); g.addColorStop(1, '#d4dfea');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // building
  ctx.fillStyle = '#c8553d'; ctx.fillRect(90, 560, 900, 620);
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(70, 560); ctx.lineTo(1010, 560); ctx.lineTo(990, 530); ctx.lineTo(90, 530); ctx.closePath(); ctx.fill(); // snow on roof
  ctx.fillStyle = '#f4f1de'; rr(390, 590, 300, 70, 10); ctx.fill();
  ctx.fillStyle = '#1d3557'; font(900, 46); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('OKUL', 540, 627);
  // windows with hopeful kids
  const sad = t > 13.9;
  [[200, 720], [440, 720], [680, 720], [200, 920], [680, 920]].forEach(([wx, wy], i) => {
    ctx.fillStyle = '#e0f0ff'; ctx.fillRect(wx, wy, 200, 150); ctx.strokeStyle = '#f4f1de'; ctx.lineWidth = 10; ctx.strokeRect(wx, wy, 200, 150);
    ctx.beginPath(); ctx.moveTo(wx + 100, wy); ctx.lineTo(wx + 100, wy + 150); ctx.stroke();
    if (i < 4) {
      const fx = wx + 100 + (i % 2 ? 30 : -30), fy = wy + 92;
      ctx.fillStyle = ['#f1c27d', '#e0ac69', '#f1c27d', '#c68642'][i]; ctx.beginPath(); ctx.arc(fx, fy, 34, 0, 7); ctx.fill();
      ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(fx - 11, fy - 6, 4, 0, 7); ctx.arc(fx + 11, fy - 6, 4, 0, 7); ctx.fill();
      ctx.strokeStyle = '#333'; ctx.lineWidth = 3; ctx.beginPath();
      if (sad) ctx.arc(fx, fy + 22, 10, Math.PI * 1.15, Math.PI * 1.85); else ctx.arc(fx, fy + 6, 10, .2, Math.PI - .2);
      ctx.stroke();
      ctx.fillStyle = '#ffffff55'; ctx.fillRect(wx + 6, wy + 6, 60, 20); // frost
    }
  });
  // door
  ctx.fillStyle = '#6d4c41'; ctx.fillRect(470, 960, 140, 220);
  // snowy yard
  ctx.fillStyle = '#f4f7fb'; ctx.fillRect(0, 1170, W, H - 1170);
  ctx.fillStyle = '#dbe6f2'; ctx.beginPath(); ctx.ellipse(300, 1250, 300, 40, 0, 0, 7); ctx.fill();
  mapSnowfall(t, 120);
  // "KAR TATİLİ: YOK" stamp
  if (t > 12.3) {
    const s = backOut(clamp((t - 12.3) / .35));
    ctx.save(); ctx.translate(540, 1260); ctx.rotate(-.06); ctx.scale(s, s);
    rr(-330, -60, 660, 120, 24); ctx.fillStyle = '#e63946'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = '#fff'; rr(-316, -46, 632, 92, 18); ctx.stroke();
    ctx.fillStyle = '#fff'; font(900, 58); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('KAR TATİLİ: YOK', 0, 4);
    ctx.restore();
  }
}

// ---------- scene: Kars ----------
function baltikBuilding(x, y, w, h, col) {
  ctx.fillStyle = col; ctx.fillRect(x, y - h, w, h);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(x - 8, y - h - 14, w + 16, 16);           // snow on cornice
  ctx.fillStyle = '#5b6b7a';
  const cols = Math.floor(w / 70);
  for (let r = 0; r < 2; r++) for (let c = 0; c < cols; c++) {
    const wx = x + 22 + c * (w - 44) / cols, wy = y - h + 40 + r * (h / 2);
    ctx.beginPath(); ctx.moveTo(wx, wy + 90); ctx.lineTo(wx, wy + 20); ctx.arc(wx + 18, wy + 20, 18, Math.PI, 0); ctx.lineTo(wx + 36, wy + 90); ctx.closePath(); ctx.fill(); // tall arched windows
    ctx.fillStyle = '#ffffff'; ctx.fillRect(wx - 4, wy + 88, 44, 6); ctx.fillStyle = '#5b6b7a';
  }
}
function horseSleigh(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const trot = Math.sin(t * 10) * 6;
  // horse
  ctx.fillStyle = '#6f4e37'; rr(-40, -70, 150, 60, 26); ctx.fill();
  ctx.save(); ctx.translate(-30, -70); ctx.rotate(-.5); rr(-20, -70, 34, 80, 14); ctx.fill(); ctx.restore();
  ctx.beginPath(); ctx.ellipse(-80, -128, 34, 20, -.4, 0, 7); ctx.fill();
  ctx.fillStyle = '#2b1d14'; ctx.fillRect(-58, -150, 30, 10);
  ctx.fillStyle = '#6f4e37'; [-20 + trot, 10 - trot, 70 + trot, 95 - trot].forEach(lx => ctx.fillRect(lx, -14, 14, 50));
  ctx.strokeStyle = '#2b1d14'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(110, -60); ctx.quadraticCurveTo(150, -70, 175, -20); ctx.stroke(); // tail
  // harness + bells
  ctx.strokeStyle = '#c1121f'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(100, -40); ctx.lineTo(210, -20); ctx.stroke();
  ctx.fillStyle = '#ffd166'; [0, 30, 60].forEach(bx => { ctx.beginPath(); ctx.arc(bx, -40, 7, 0, 7); ctx.fill(); });
  // sleigh
  ctx.fillStyle = '#9b2226'; ctx.beginPath(); ctx.moveTo(200, -70); ctx.lineTo(330, -70); ctx.quadraticCurveTo(350, -70, 345, -30); ctx.lineTo(200, -10); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#3d3d3d'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(190, 20); ctx.lineTo(340, 20); ctx.quadraticCurveTo(370, 20, 370, -5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(220, 20); ctx.lineTo(220, -10); ctx.moveTo(320, 20); ctx.lineTo(320, -14); ctx.stroke();
  // driver with fur hat
  ctx.fillStyle = '#264653'; rr(250, -150, 56, 80, 14); ctx.fill();
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(278, -172, 22, 0, 7); ctx.fill();
  ctx.fillStyle = '#4a3728'; rr(254, -206, 48, 26, 8); ctx.fill();
  ctx.restore();
}
function karsli(x, y, s, shrug) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#3a3a3a'; ctx.fillRect(-22, 60, 18, 80); ctx.fillRect(4, 60, 18, 80);
  ctx.fillStyle = '#5c4033'; rr(-52, -50, 104, 124, 26); ctx.fill();        // thick coat
  ctx.fillStyle = '#e9e2d0'; rr(-56, -62, 112, 26, 13); ctx.fill();         // fur collar
  ctx.strokeStyle = '#5c4033'; ctx.lineWidth = 18; ctx.lineCap = 'round';
  ctx.beginPath();
  if (shrug) { ctx.moveTo(-44, -30); ctx.lineTo(-90, -10); ctx.lineTo(-100, -50); ctx.moveTo(44, -30); ctx.lineTo(90, -10); ctx.lineTo(100, -50); }
  else { ctx.moveTo(-46, -30); ctx.lineTo(-56, 40); ctx.moveTo(46, -30); ctx.lineTo(56, 40); }
  ctx.stroke();
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -96, 32, 0, 7); ctx.fill();
  ctx.fillStyle = '#4a3728'; rr(-36, -150, 72, 40, 12); ctx.fill();         // fur hat
  ctx.fillStyle = '#2b1d14'; ctx.beginPath(); ctx.ellipse(0, -82, 13, 5, 0, 0, 7); ctx.fill();
  ctx.strokeStyle = '#222'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-16, -100); ctx.lineTo(-5, -100); ctx.moveTo(5, -100); ctx.lineTo(16, -100); ctx.stroke(); // unbothered eyes
  ctx.beginPath(); ctx.moveTo(-18, -110); ctx.lineTo(-4, -112); ctx.moveTo(4, -112); ctx.lineTo(18, -110); ctx.stroke();
  ctx.restore();
}
function karsScene(t) {
  const g = ctx.createLinearGradient(0, 0, 0, 1100); g.addColorStop(0, '#7f93a8'); g.addColorStop(1, '#cdd8e3');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // castle on the hill (Kars Kalesi)
  ctx.fillStyle = '#9aa7b4'; ctx.beginPath(); ctx.moveTo(0, 760); ctx.quadraticCurveTo(360, 520, 760, 620); ctx.lineTo(1080, 700); ctx.lineTo(1080, 900); ctx.lineTo(0, 900); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(0, 760); ctx.quadraticCurveTo(360, 520, 760, 620); ctx.lineTo(1080, 700); ctx.lineTo(1080, 725); ctx.lineTo(760, 648); ctx.quadraticCurveTo(360, 552, 0, 790); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#6b7684';
  ctx.fillRect(300, 520, 300, 80); [300, 360, 420, 480, 540].forEach(bx => ctx.fillRect(bx, 500, 34, 24)); // walls + battlements
  ctx.fillRect(420, 440, 90, 160); [420, 448, 476].forEach(bx => ctx.fillRect(bx, 420, 22, 24));           // keep
  ctx.fillStyle = '#ffffff'; ctx.fillRect(296, 516, 308, 8); ctx.fillRect(416, 436, 98, 8);
  // Baltic-style stone buildings
  baltikBuilding(30, 1180, 330, 330, '#b6a58b');
  baltikBuilding(380, 1180, 300, 380, '#9c8f7a');
  baltikBuilding(700, 1180, 350, 320, '#c2b39a');
  ctx.fillStyle = '#f4f7fb'; ctx.fillRect(0, 1170, W, H - 1170);
  // horse sleigh crossing
  const p = clamp((t - 16.0) / 2.8);
  horseSleigh(lerp(1150, -420, p), 1300, .95, t);
  karsli(780, 1150, 1.15, t > 16.9);
  if (t > 17.0) speech(640, 780, 'Ne değişti ki?', vis(t, 17.05, 18.8, .2, .2));
  mapSnowfall(t, 140);
  sendPrompt('Karslı arkadaşına gönder', 1560, vis(t, 16.6, 18.7, .25, .2));
}

// ---------- scene: Ankara balcony, frozen pool ----------
function atakule(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#c9d2db'; ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(-18, -520); ctx.lineTo(18, -520); ctx.lineTo(26, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#aab6c2'; ctx.beginPath(); ctx.ellipse(0, -560, 90, 30, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#d7dfe7'; rr(-70, -610, 140, 50, 20); ctx.fill();
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(0, -612, 68, 16, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#aab6c2'; ctx.fillRect(-4, -680, 8, 70);
  ctx.restore();
}
function ankaraScene(t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#8ea4b9'); g.addColorStop(.55, '#d3dee8'); g.addColorStop(.55, '#d9cbb3'); g.addColorStop(1, '#c4b49a');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  atakule(820, 1060, 1.0);
  ctx.fillStyle = '#b8c4cf'; [[40, 600, 220, 460], [300, 680, 180, 380]].forEach(([x, y, w, h]) => { ctx.fillRect(x, y, w, h); ctx.fillStyle = '#ffffff'; ctx.fillRect(x - 6, y - 10, w + 12, 12); ctx.fillStyle = '#ffffff55'; for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) ctx.fillRect(x + 16 + c * (w - 32) / 4, y + 20 + r * 70, 26, 34); ctx.fillStyle = '#b8c4cf'; });
  ctx.fillStyle = '#8d99ae'; ctx.fillRect(80, 1300, 920, 40);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(80, 1290, 920, 12);
  ctx.strokeStyle = '#495057'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(80, 1150); ctx.lineTo(1000, 1150); ctx.stroke();
  for (let i = 0; i <= 18; i++) { ctx.beginPath(); ctx.moveTo(80 + i * 51, 1150); ctx.lineTo(80 + i * 51, 1300); ctx.stroke(); }
  ctx.fillStyle = '#ffffff'; ctx.fillRect(76, 1140, 928, 10);
  // frozen inflatable pool
  ctx.save(); ctx.translate(480, 1180);
  ctx.fillStyle = '#4cc9f0'; ctx.beginPath(); ctx.ellipse(0, 0, 300, 90, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#e3f6ff'; ctx.beginPath(); ctx.ellipse(0, -10, 250, 62, 0, 0, 7); ctx.fill();
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; [[-150, -20, -40, 10], [20, -40, 140, -5], [-60, 20, 60, 30]].forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); }); // ice scratches
  ctx.restore();
  // skater gliding side to side
  const sx = 480 + Math.sin(t * 2.4) * 140, lean = Math.cos(t * 2.4) * .18;
  ctx.save(); ctx.translate(sx, 1150); ctx.rotate(lean);
  ctx.fillStyle = '#3a3a3a'; ctx.fillRect(-18, -60, 14, 60); ctx.fillRect(4, -60, 14, 60);
  ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-26, 2); ctx.lineTo(0, 2); ctx.moveTo(2, 2); ctx.lineTo(28, 2); ctx.stroke(); // blades
  ctx.fillStyle = '#264653'; rr(-30, -150, 60, 96, 16); ctx.fill();
  ctx.fillStyle = '#e63946'; ctx.fillRect(-32, -150, 64, 14); // scarf
  ctx.strokeStyle = '#264653'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-26, -130); ctx.lineTo(-70, -110); ctx.moveTo(26, -130); ctx.lineTo(70, -110); ctx.stroke(); // arms out
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -176, 26, 0, 7); ctx.fill();
  ctx.fillStyle = '#111'; rr(-22, -186, 19, 12, 4); ctx.fill(); rr(3, -186, 19, 12, 4); ctx.fill(); ctx.fillRect(-4, -182, 8, 3);
  ctx.strokeStyle = '#333'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, -166, 9, .2, Math.PI - .2); ctx.stroke();
  ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.arc(0, -200, 22, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, -224, 7, 0, 7); ctx.fill(); // beanie
  ctx.restore();
  ctx.save(); ctx.translate(840, 1210); rr(-110, -40, 220, 80, 10); ctx.fillStyle = '#bde0fe'; ctx.fill(); ctx.fillStyle = '#111'; font(900, 26); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ANKARA BUZ', 0, -12); ctx.fillText('PİSTİ', 0, 18); ctx.restore();
  mapSnowfall(t, 120);
}

// ---------- render ----------
const CITY_ANTALYA = [30.7, 36.9], CITY_KARS = [43.1, 40.6], CITY_ANKARA = [32.86, 39.93];
function render(t) {
  cam = camera(t);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const snow = clamp((t - 0.5) / 1.4);
  drawSea(t);
  drawMapKis(t, snow);
  mapSnowfall(t);
  // opening
  if (t < 3.6) {
    calendar(170, 1130, .9, clamp((t - .1) / .3));
    title([["TEMMUZ'DA", 84, '#fff'], ['BİLE KAR', 100, '#bde0fe']], 0.15, 3.3, t, 400);
  }
  // city dives
  const dive = (cityLL, t0, t1, scene, label) => {
    if (t < t0 - .7 || t > t1 + .2) return;
    const [cx, cy] = P(...cityLL);
    if (t < t0) cityDot(label, cityLL, clamp((t - (t0 - .7)) / .2), '#e63946');
    wipe(cx, cy, (t - (t0 - .35)) / .4, () => scene(t));
  };
  dive(CITY_ANTALYA, 3.9, 6.9, antalyaScene, 'Antalya');
  // mother + school are not cities: slide in over the Antalya scene / each other
  if (t > 6.75 && t < 11.3) { const p = easeOut(clamp((t - 6.75) / .35)); ctx.save(); ctx.translate((1 - p) * W, 0); anneScene(t); ctx.restore(); if (p < 1) { ctx.save(); ctx.translate(-p * W, 0); antalyaScene(t); ctx.restore(); } }
  if (t > 11.0 && t < 15.8) { const p = easeOut(clamp((t - 11.0) / .35)); ctx.save(); ctx.translate((1 - p) * W, 0); okulScene(t); ctx.restore(); if (p < 1) { ctx.save(); ctx.translate(-p * W, 0); anneScene(t); ctx.restore(); } }
  dive(CITY_KARS, 16.0, 18.9, karsScene, 'Kars');
  dive(CITY_ANKARA, 18.95, 22.2, ankaraScene, 'Ankara');

  // scene titles
  title([['ANTALYA', 110, '#fff']], 3.95, 6.8, t, 360);
  title([['ANNELER', 100, '#ffd166']], 7.2, 11.0, t, 360);
  title([['OKULLAR', 100, '#fff']], 11.4, 15.7, t, 360);
  title([['KARS', 120, '#bde0fe']], 16.05, 18.85, t, 360);
  title([['ANKARA', 110, '#fff']], 19.0, 22.15, t, 360);

  // ending
  if (t > 22.1) {
    const v = clamp((t - 22.2) / .3);
    [['Antalya', ...CITY_ANTALYA], ['Kars', ...CITY_KARS], ['Ankara', ...CITY_ANKARA], ['İstanbul', 28.98, 41.01], ['İzmir', 27.14, 38.42], ['Erzurum', 41.27, 39.9], ['Trabzon', 39.72, 41.0]].forEach(([n, lo, la], i) => {
      const [x, y] = P(lo, la); const pulse = (t * 1.2 + i * .17) % 1;
      ctx.save(); ctx.globalAlpha = v; ctx.beginPath(); ctx.arc(x, y, 10 + pulse * 30, 0, 7); ctx.strokeStyle = `rgba(76,201,240,${1 - pulse})`; ctx.lineWidth = 4; ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y, 10, 0, 7); ctx.fillStyle = '#4cc9f0'; ctx.fill(); ctx.restore();
    });
    title([['SENİN ŞEHRİN', 84, '#fff'], ['NE YAPARDI?', 100, '#bde0fe']], 22.3, 99, t, 400);
    ctx.save(); ctx.globalAlpha = v; const bob = Math.sin(t * 6) * 12;
    font(800, 40); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.lineWidth = 8; ctx.strokeStyle = '#000a'; ctx.strokeText('Yorumlara yaz', W / 2, 1150); ctx.fillText('Yorumlara yaz', W / 2, 1150);
    ctx.fillStyle = '#bde0fe'; ctx.beginPath(); ctx.moveTo(W / 2 - 45, 1180 + bob); ctx.lineTo(W / 2 + 45, 1180 + bob); ctx.lineTo(W / 2, 1245 + bob); ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  subtitles(t);
  badge();
  if (t < .12) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .12})`; ctx.fillRect(0, 0, W, H); }
}
