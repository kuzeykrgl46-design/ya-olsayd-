// ===== Episode 3: "Şehirler ne yaptı?" =====
// Voiceover (take A) starts at 0.3 s; times below are video time.

const SUBS = [
  // [show, hide, text, speechStart, speechLength]
  [0.3, 2.2, 'Ada Türkiye... Bölüm üç.', 0.3, 1.4],
  [2.5, 7.2, "Ankaralılar ne mi yaptı? Havluyu aldılar... Eymir Gölü'ne gittiler.", 2.6, 4.3],
  [7.5, 8.8, 'Peki diğer şehirler?', 7.7, 1.0],
  [9.1, 12.2, 'Van kedileri ilk kez denize girdi. Ve çıkmadı.', 9.2, 2.9],
  [12.4, 15.65, 'Karslılar plaja kazakla gitti. Yanında da kaşar.', 12.55, 3.0],
  [15.9, 18.2, "Edirne'de yağlı güreş plaja taşındı.", 16.0, 2.1],
  [18.5, 23.0, "Antep'in bile denizi oldu: Karkamış'ta deniz manzaralı baklavacılar açıldı.", 18.65, 4.2],
  [23.3, 26.65, "İstanbul'da hiçbir şey değişmedi. Trafik yine aynı.", 23.4, 3.2],
  [26.9, 31.0, 'Senin şehrin ne yaptı? Yorumlara yaz.', 27.1, 2.3],
];

function badge() {
  ctx.save(); font(900, 34);
  const txt = 'YA OLSAYDI?', w = ctx.measureText(txt).width;
  rr(56, 150, w + 120, 64, 16); ctx.fillStyle = '#ffd166'; ctx.fill();
  ctx.fillStyle = '#111'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 78, 183);
  rr(78 + w + 14, 162, 54, 40, 10); ctx.fillStyle = '#111'; ctx.fill();
  ctx.fillStyle = '#ffd166'; ctx.textAlign = 'center'; ctx.fillText('#1', 78 + w + 41, 183);
  const bx = 56 + w + 136;
  font(900, 30); const bw = ctx.measureText('BÖLÜM 3').width + 36;
  rr(bx, 156, bw, 52, 14); ctx.fillStyle = '#e63946'; ctx.fill();
  ctx.fillStyle = '#fff'; ctx.fillText('BÖLÜM 3', bx + bw / 2, 183);
  ctx.restore();
}

// paper-plane "send to a friend" prompt
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

// ---------- props for this episode ----------
function vanCat(x, y, sc, ang = 0, swimming = false, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(sc, sc);
  // auburn tail
  ctx.strokeStyle = '#d9822b'; ctx.lineWidth = 16; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(48, 0); ctx.quadraticCurveTo(95, -20 + Math.sin(t * 8) * 10, 90, -60); ctx.stroke();
  // body
  ctx.fillStyle = '#fbfbfb'; ctx.beginPath(); ctx.ellipse(0, 0, 60, 34, 0, 0, 7); ctx.fill();
  if (!swimming) { ctx.fillRect(-44, 18, 14, 30); ctx.fillRect(28, 18, 14, 30); }
  // head
  ctx.beginPath(); ctx.arc(-58, -26, 32, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-84, -44); ctx.lineTo(-80, -76); ctx.lineTo(-62, -54); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-50, -54); ctx.lineTo(-34, -76); ctx.lineTo(-32, -44); ctx.fill();
  ctx.fillStyle = '#d9822b'; ctx.beginPath(); ctx.ellipse(-58, -50, 16, 9, 0, 0, 7); ctx.fill(); // auburn head patch
  // odd eyes: blue + green
  ctx.fillStyle = '#4cc9f0'; ctx.beginPath(); ctx.arc(-70, -28, 7, 0, 7); ctx.fill();
  ctx.fillStyle = '#80ed99'; ctx.beginPath(); ctx.arc(-46, -28, 7, 0, 7); ctx.fill();
  ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(-70, -28, 3, 0, 7); ctx.arc(-46, -28, 3, 0, 7); ctx.fill();
  // happy mouth
  ctx.strokeStyle = '#333'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(-58, -14, 9, .2, Math.PI - .2); ctx.stroke();
  ctx.fillStyle = '#f4a6c4'; ctx.beginPath(); ctx.arc(-58, -18, 3.5, 0, 7); ctx.fill();
  ctx.restore();
}

function ripples(x, y, t, n = 3, size = 90) {
  ctx.save(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 4;
  for (let i = 0; i < n; i++) {
    const p = (t * .7 + i / n) % 1; ctx.globalAlpha = (1 - p) * .8;
    ctx.beginPath(); ctx.ellipse(x, y, size * (.4 + p), size * (.4 + p) * .3, 0, 0, 7); ctx.stroke();
  }
  ctx.restore();
}

function cheeseWheel(x, y, sc) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  ctx.fillStyle = '#e9b949'; ctx.fillRect(-70, -10, 140, 40);
  ctx.beginPath(); ctx.ellipse(0, 30, 70, 22, 0, 0, Math.PI); ctx.fill();
  ctx.fillStyle = '#ffd56b'; ctx.beginPath(); ctx.ellipse(0, -10, 70, 22, 0, 0, 7); ctx.fill();
  // cut wedge
  ctx.fillStyle = '#f7c948'; ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(60, -22); ctx.lineTo(66, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#d4a017'; [[-30, -8], [10, -16], [-10, 2]].forEach(([hx, hy]) => { ctx.beginPath(); ctx.ellipse(hx, hy, 7, 3, 0, 0, 7); ctx.fill(); });
  ctx.restore();
}

function wrestler(x, y, sc, flip, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -sc : sc, sc);
  const lean = Math.sin(t * 6) * .06;
  ctx.rotate(lean + .25);
  // leather kispet (black trousers)
  ctx.fillStyle = '#2b2b2b'; rr(-30, 20, 60, 70, 12); ctx.fill();
  ctx.fillRect(-28, 80, 22, 50); ctx.fillRect(6, 80, 22, 50);
  // oiled torso with shine
  ctx.fillStyle = '#c68642'; rr(-32, -60, 64, 90, 26); ctx.fill();
  ctx.fillStyle = '#ffffff55'; ctx.beginPath(); ctx.ellipse(-10, -30, 8, 24, -.3, 0, 7); ctx.fill();
  // arm reaching forward (grapple)
  ctx.strokeStyle = '#c68642'; ctx.lineWidth = 18; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(24, -40); ctx.lineTo(80, -30); ctx.moveTo(24, -10); ctx.lineTo(78, 0); ctx.stroke();
  // head
  ctx.fillStyle = '#c68642'; ctx.beginPath(); ctx.arc(10, -84, 24, 0, 7); ctx.fill();
  ctx.fillStyle = '#2b1d14'; ctx.beginPath(); ctx.ellipse(16, -76, 10, 4, 0, 0, 7); ctx.fill(); // moustache
  ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(18, -88, 3, 0, 7); ctx.fill();
  ctx.restore();
}

function baklavaShop(x, y, sc) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  ctx.fillStyle = '#f8f1e5'; ctx.fillRect(-170, -90, 340, 190);
  for (let i = 0; i < 10; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#2a9d8f'; ctx.beginPath(); ctx.moveTo(-180 + i * 36, -90); ctx.lineTo(-180 + (i + 1) * 36, -90); ctx.lineTo(-180 + (i + 1) * 36, -55); ctx.arc(-162 + i * 36, -55, 18, 0, Math.PI); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle = '#1d3557'; rr(-200, -190, 400, 84, 14); ctx.fill();
  ctx.fillStyle = '#ffd166'; font(900, 30); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('DENİZ MANZARALI', 0, -166); ctx.fillText('BAKLAVA', 0, -128);
  // tray of baklava
  ctx.fillStyle = '#9e9e9e'; ctx.beginPath(); ctx.ellipse(0, 40, 130, 34, 0, 0, 7); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 36, 118, 28, 0, 0, 7); ctx.clip();
  ctx.fillStyle = '#e0a84a'; ctx.fillRect(-120, 6, 240, 60);
  ctx.strokeStyle = '#a86b1e'; ctx.lineWidth = 3;
  for (let i = -6; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(i * 24 - 30, 6); ctx.lineTo(i * 24 + 30, 66); ctx.moveTo(i * 24 + 30, 6); ctx.lineTo(i * 24 - 30, 66); ctx.stroke(); }
  ctx.fillStyle = '#6a994e'; for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.arc(i * 24, 30 + (i % 2) * 12, 3.5, 0, 7); ctx.fill(); } // pistachio
  ctx.restore();
  ctx.restore();
}

function pinLabel(text, x, y, alpha = 1) {
  if (alpha <= 0) return;
  ctx.save(); ctx.globalAlpha *= alpha;
  ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.arc(x, y - 30, 16, Math.PI, 0); ctx.lineTo(x, y); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y - 30, 6, 0, 7); ctx.fill();
  ctx.restore();
  pill(text, x + 4, y + 36, { size: 30, alpha });
}

function bridgeTraffic(t, alpha) {
  if (alpha <= 0) return;
  ctx.save(); ctx.globalAlpha *= alpha;
  const y = 980;
  // towers + cables
  ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 14;
  [190, 890].forEach(x => { ctx.beginPath(); ctx.moveTo(x, y + 60); ctx.lineTo(x, y - 260); ctx.stroke(); });
  ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-40, y - 40); ctx.quadraticCurveTo(190, y - 270, 190, y - 260); ctx.quadraticCurveTo(540, y - 40, 890, y - 260); ctx.quadraticCurveTo(890, y - 270, 1120, y - 40); ctx.stroke();
  ctx.lineWidth = 2; for (let i = 0; i < 26; i++) { const x = 210 + i * 26.5; const cy = y - 40 - 220 * Math.pow((x - 540) / 350, 2); ctx.beginPath(); ctx.moveTo(x, Math.min(cy, y - 40)); ctx.lineTo(x, y); ctx.stroke(); }
  // deck
  ctx.fillStyle = '#495057'; ctx.fillRect(-40, y, W + 80, 46);
  // jammed cars (two lanes), barely moving
  const creep = (t - 23) * 4;
  const hues = [8, 210, 140, 45, 280, 0, 190, 25, 330, 100];
  for (let i = 0; i < 10; i++) car(-40 + i * 125 + creep, y - 4, .85, hues[i]);
  for (let i = 0; i < 10; i++) car(1100 - i * 125 - creep * .6, y + 66, .85, hues[(i + 4) % 10]);
  // honk bubbles
  const honk = Math.floor(t * 2.5) % 3;
  font(900, 46); ctx.textAlign = 'center'; ctx.lineWidth = 10; ctx.strokeStyle = '#000a'; ctx.fillStyle = '#ffd166';
  [[300, y - 110], [640, y - 130], [860, y - 90]].forEach(([hx, hy], i) => { if (i === honk) { ctx.strokeText('DIIT!', hx, hy); ctx.fillText('DIIT!', hx, hy); } });
  ctx.restore();
}

// ---------- scene ----------
const EYMIR = (() => { const p = []; for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; p.push([32.82 + Math.cos(a) * .075, 39.815 + Math.sin(a) * .028]); } return p; })();

function render(t) {
  cam = camera(t);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawSea(t);
  drawMap(10, { island: true });

  // ---- intro + Ankara (0 - 7.3) ----
  if (t < 7.5) {
    path(EYMIR); ctx.fillStyle = '#1d6fa5'; ctx.fill(); ctx.strokeStyle = '#bfe9ff'; ctx.lineWidth = 3; ctx.stroke();
    const [lx, ly] = P(32.82, 39.815);
    const walk = easeOut(clamp(t / 4.2));
    const k = clamp(cam.z / 7, .2, 1.2);  // shrink the character as the camera pulls back
    const px = lx + lerp(-520, -130, walk) * k, py = ly - 40 * k + (walk < 1 ? Math.abs(Math.sin(t * 8)) * -8 : 0);
    const v = vis(t, 0, 7.3, .01, .3);
    ctx.save(); ctx.globalAlpha = v;
    if (t > 4.3) { // towel spread on the shore
      const tp = clamp((t - 4.3) / .4);
      ctx.save(); ctx.translate(lx - 80 * k, ly + 30 * k); ctx.scale(tp * k, k);
      ctx.fillStyle = '#ff006e'; rr(-70, -18, 140, 36, 6); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.fillRect(-70, -4, 140, 8);
      ctx.restore();
    }
    umbrella(px + 60 * k, py - 20 * k, .7 * k, false);
    person(px, py, 1.15 * k, { shirt: '#264653' });
    if (t < 4.3) { ctx.fillStyle = '#ff006e'; rr(px - 46 * k, py - 5 * k, 30 * k, 70 * k, 6 * k); ctx.fill(); }
    if (t > 5.0) pill('EYMİR GÖLÜ', lx, ly + 80 * k + 30, { size: 32, bg: '#0b3b5ccc', alpha: clamp((t - 5.0) / .3) });
    ctx.restore();
    sendPrompt('Ankaralı arkadaşına gönder', 1210, vis(t, 3.2, 7.2, .3, .3));
  }
  // BÖLÜM 3 stamp
  if (t < 2.5) {
    const sp = clamp((t - .15) / .35), v = vis(t, .15, 2.4, .05, .3);
    ctx.save(); ctx.globalAlpha = v; ctx.translate(W / 2, 520); ctx.rotate(-.08); ctx.scale(lerp(2.2, 1, easeOut(sp)), lerp(2.2, 1, easeOut(sp)));
    rr(-280, -110, 560, 220, 30); ctx.fillStyle = '#e63946'; ctx.fill();
    ctx.lineWidth = 10; ctx.strokeStyle = '#fff'; rr(-262, -92, 524, 184, 22); ctx.stroke();
    ctx.fillStyle = '#fff'; font(900, 44); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ADA TÜRKİYE', 0, -40);
    font(900, 100); ctx.fillText('BÖLÜM 3', 0, 34);
    ctx.restore();
  }
  title([['ANKARALILAR', 76, '#fff'], ['NE YAPTI?', 88, '#ffd166']], 2.5, 7.2, t, 380);

  // ---- other cities blinking (7.3 - 8.9) ----
  if (t > 7.2 && t < 9.2) {
    const v = vis(t, 7.3, 9.0, .25, .25);
    [['Van', 43.38, 38.5], ['Kars', 43.1, 40.6], ['Edirne', 26.56, 41.68], ['Gaziantep', 37.38, 37.07], ['İstanbul', 28.98, 41.01]].forEach(([n, lo, la], i) => {
      const a = v * (.5 + .5 * Math.sin(t * 10 + i * 1.3));
      cityDot(n, [lo, la], a, '#06d6a0');
    });
    title([['PEKİ DİĞER', 80, '#fff'], ['ŞEHİRLER?', 92, '#ffd166']], 7.3, 9.0, t, 380);
  }

  // ---- Van cat (8.9 - 12.3) ----
  if (t > 8.8 && t < 12.5) {
    const v = vis(t, 9.0, 12.3, .3, .2);
    ctx.save(); ctx.globalAlpha = v;
    const [p0x, p0y] = P(44.22, 38.62), [p1x] = P(44.5, 38.62);
    ctx.fillStyle = '#8d6e63'; ctx.fillRect(p0x, p0y - 10, p1x - p0x, 22); // pier
    for (let i = 0; i < 6; i++) ctx.fillRect(p0x + 20 + i * (p1x - p0x - 40) / 5, p0y + 10, 10, 40);
    const jp = clamp((t - 9.6) / .9);
    const sx = p1x - 30, sy = p0y - 50, ex = p1x + 170, ey = p0y + 120;
    if (jp <= 0) vanCat(sx, sy, 1.0, 0, false, t);
    else if (jp < 1) vanCat(lerp(sx, ex, jp), lerp(sy, ey, jp) - Math.sin(jp * Math.PI) * 180, 1.0, -.6 + jp * 1.2, false, t);
    else {
      const bob = Math.sin(t * 4) * 6;
      ripples(ex, ey + 30, t, 3, 110);
      vanCat(ex + Math.sin(t * 1.5) * 20, ey + bob, 1.0, 0, true, t);
      if (t < 10.9) { ctx.fillStyle = '#ffffff'; for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI; const r = (t - 10.5) * 260; ctx.beginPath(); ctx.arc(ex + Math.cos(a) * r, ey + 20 - Math.sin(a) * r * .7, 9, 0, 7); ctx.fill(); } }
      if (t > 11.3) { font(900, 42); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('çıkmıyorum!', ex - 10, ey - 110); }
    }
    ctx.restore();
    title([['VAN', 110, '#7dd3fc']], 9.1, 12.2, t, 380);
  }

  // ---- Kars (12.3 - 15.7) ----
  if (t > 12.2 && t < 15.9) {
    const v = vis(t, 12.4, 15.7, .3, .2);
    ctx.save(); ctx.globalAlpha = v;
    const [bx, by] = P(43.66, 40.42);
    umbrella(bx + 80, by - 10, 1.1, true);
    lounger(bx - 20, by + 50, 1.3, true);
    if (t > 13.9) cheeseWheel(bx - 170, by + 70, 1.1 * backOut(clamp((t - 13.9) / .4)) + .0001);
    ctx.restore();
    ctx.save(); ctx.globalAlpha = v * .9; ctx.fillStyle = '#fff';
    for (let i = 0; i < 120; i++) { const x = (rnd(i) * W + Math.sin(t + i) * 30) % W, y = (rnd(i + 999) * H + t * (80 + rnd(i + 3) * 90)) % H; ctx.beginPath(); ctx.arc(x, y, 2 + rnd(i + 7) * 4, 0, 7); ctx.fill(); }
    ctx.restore();
    title([['KARS', 110, '#bde0fe']], 12.45, 15.65, t, 380);
  }

  // ---- Edirne wrestling (15.7 - 18.3) ----
  if (t > 15.6 && t < 18.5) {
    const v = vis(t, 15.8, 18.3, .25, .2);
    ctx.save(); ctx.globalAlpha = v;
    const [wx, wy] = P(26.42, 41.55);
    ctx.fillStyle = '#f4e1a1'; ctx.beginPath(); ctx.ellipse(wx, wy + 150, 260, 60, 0, 0, 7); ctx.fill(); // sand patch
    wrestler(wx - 70, wy + 30, 1.25, false, t);
    wrestler(wx + 70, wy + 30, 1.25, true, t + 1);
    ctx.restore();
    title([['EDİRNE', 110, '#ffd166']], 15.9, 18.2, t, 380);
  }

  // ---- Gaziantep / Karkamış (18.3 - 22.9) ----
  if (t > 18.2 && t < 23.1) {
    const v = vis(t, 18.4, 22.9, .3, .2);
    ctx.save(); ctx.globalAlpha = v;
    cityDot('Gaziantep', [37.38, 37.07], 1);
    const [kx, ky] = P(38.0, 36.86);
    if (t > 20.0) {
      const s = backOut(clamp((t - 20.0) / .45));
      baklavaShop(kx + 40, ky - 30, .95 * s + .0001);
      pinLabel('Karkamış', kx - 230, ky + 30, clamp((t - 20.3) / .3));
    } else {
      // dashed line from the city down to the new coast
      const [gx, gy] = P(37.38, 37.07);
      ctx.setLineDash([12, 10]); ctx.strokeStyle = '#fff'; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(lerp(gx, kx, clamp((t - 18.6) / 1.2)), lerp(gy, ky, clamp((t - 18.6) / 1.2))); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.restore();
    title([['GAZİANTEP', 100, '#ffb703']], 18.5, 22.9, t, 380);
  }

  // ---- İstanbul traffic (22.9 - 26.6) ----
  if (t > 22.8 && t < 26.8) {
    const v = vis(t, 23.0, 26.6, .3, .2);
    ctx.save(); ctx.globalAlpha = v * .55; ctx.fillStyle = '#0a2a44'; ctx.fillRect(0, 0, W, H); ctx.restore();
    bridgeTraffic(t, v);
    sendPrompt('İstanbullu arkadaşına gönder', 1210, vis(t, 23.8, 26.5, .3, .3));
    title([['İSTANBUL', 104, '#fff']], 23.1, 26.6, t, 380);
  }

  // ---- end question (26.6 - 31) ----
  if (t > 26.5) {
    const v = vis(t, 26.7, 99, .3, .3);
    [['Van', 43.38, 38.5], ['Kars', 43.1, 40.6], ['Edirne', 26.56, 41.68], ['Gaziantep', 37.38, 37.07], ['İstanbul', 28.98, 41.01], ['Ankara', 32.86, 39.93]].forEach(([n, lo, la], i) => {
      const [x, y] = P(lo, la); const pulse = (t * 1.2 + i * .17) % 1;
      ctx.save(); ctx.globalAlpha = v; ctx.beginPath(); ctx.arc(x, y, 10 + pulse * 30, 0, 7); ctx.strokeStyle = `rgba(6,214,160,${1 - pulse})`; ctx.lineWidth = 4; ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y, 10, 0, 7); ctx.fillStyle = '#06d6a0'; ctx.fill(); ctx.restore();
    });
    // Episode 2 callback: Urfa fisherman with a cooked fish
    const [ux, uy] = P(39.0, 36.75);
    ctx.save(); ctx.globalAlpha = v; person(ux - 40, uy - 10, .55, { shirt: '#e76f51', hat: '#264653' }); cookedFish(ux + 30, uy + 20, .35, 0, true); steam(ux + 30, uy, t, 2, 40, .7); ctx.restore();
    title([['SENİN ŞEHRİN', 84, '#fff'], ['NE YAPTI?', 100, '#ffd166']], 26.8, 99, t, 400);
    ctx.save(); ctx.globalAlpha = v; const bob = Math.sin(t * 6) * 12;
    ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.moveTo(W / 2 - 45, 1150 + bob); ctx.lineTo(W / 2 + 45, 1150 + bob); ctx.lineTo(W / 2, 1215 + bob); ctx.closePath(); ctx.fill();
    font(800, 40); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('Yorumlara yaz', W / 2, 1120);
    ctx.restore();
  }

  subtitles(t);
  badge();
  if (t < .15) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .15})`; ctx.fillRect(0, 0, W, H); }
}
