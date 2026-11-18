// ===== Episode 2: "Ada olduk... Şimdi ne olacak?" =====
// Audio (take B) starts at OFF seconds; all times below are video time.

const SUBS = [
  // [show, hide, text, speechStart, speechLength]
  [0.3, 4.4, "Geçen bölümde Türkiye ada oldu. Ankara'ya yine deniz çıkmadı.", 0.3, 3.6],
  [4.7, 7.6, 'Peki ada olmak bize iyi mi geldi, kötü mü?', 4.8, 2.7],
  [7.9, 13.2, "İyi haber: Urfa'nın denizi kaplıca oldu. Balıklar denizden pişmiş çıkıyor.", 8.0, 5.0],
  [13.4, 17.35, 'Kara sınırı kalmadı. Sınır karakolları plaj büfesine döndü.', 13.5, 3.7],
  [17.5, 18.2, 'Ama...', 17.55, 0.3],
  [18.3, 22.3, "Kapıkule'deki tır şoförleri denize baktı... ve yüzmeyi düşündü.", 18.3, 3.8],
  [22.5, 27.75, 'Karadan gelen doğalgaz hatları koptu. Annem kombiyi kapattı: "Hırkanı giy!"', 22.6, 4.9],
  [27.95, 31.5, 'Türkiye artık iki kıta arasında köprü değil... feribot.', 28.0, 3.3],
  [31.7, 35.05, "Sonuç: kaybettik. Ama Urfa'da balık bedava.", 31.8, 3.1],
  [35.2, 38.6, 'Peki bu sırada Ankaralılar ne yapıyordu? Bölüm üçte.', 35.3, 2.8],
];

function badge() {
  ctx.save(); font(900, 34);
  const txt = 'YA OLSAYDI?', w = ctx.measureText(txt).width;
  rr(56, 150, w + 120, 64, 16); ctx.fillStyle = '#ffd166'; ctx.fill();
  ctx.fillStyle = '#111'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 78, 183);
  rr(78 + w + 14, 162, 54, 40, 10); ctx.fillStyle = '#111'; ctx.fill();
  ctx.fillStyle = '#ffd166'; ctx.textAlign = 'center'; ctx.fillText('#1', 78 + w + 41, 183);
  const bx = 56 + w + 136;
  font(900, 30); const bw = ctx.measureText('BÖLÜM 2').width + 36;
  rr(bx, 156, bw, 52, 14); ctx.fillStyle = '#e63946'; ctx.fill();
  ctx.fillStyle = '#fff'; ctx.fillText('BÖLÜM 2', bx + bw / 2, 183);
  ctx.restore();
}

// ---------- new props ----------
function scale(x, y, sc, tilt, alpha = 1) {
  if (alpha <= 0) return;
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.scale(sc, sc);
  // base + pole
  ctx.fillStyle = '#c9a227'; ctx.beginPath(); ctx.moveTo(-50, 150); ctx.lineTo(50, 150); ctx.lineTo(18, 120); ctx.lineTo(-18, 120); ctx.closePath(); ctx.fill();
  ctx.fillRect(-8, -10, 16, 135);
  ctx.beginPath(); ctx.arc(0, -14, 14, 0, 7); ctx.fill();
  // beam
  const a = -tilt; ctx.save(); ctx.rotate(a);
  ctx.fillStyle = '#e0b83a'; rr(-130, -8, 260, 16, 8); ctx.fill();
  ctx.restore();
  const ends = [-1, 1].map(s => [s * 130 * Math.cos(a), s * 130 * Math.sin(a)]);
  ends.forEach(([ex, ey], i) => {
    ctx.strokeStyle = '#e0b83a'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - 40, ey + 70); ctx.moveTo(ex, ey); ctx.lineTo(ex + 40, ey + 70); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(ex, ey + 72, 52, 16, 0, 0, Math.PI); ctx.fillStyle = i ? '#e63946' : '#06d6a0'; ctx.fill();
    ctx.fillStyle = '#fff'; font(900, 30); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(i ? '−' : '+', ex, ey + 80);
  });
  ctx.restore();
}

function steam(x, y, t, n = 3, h = 70, alpha = .7) {
  ctx.save(); ctx.strokeStyle = `rgba(255,255,255,${alpha})`; ctx.lineWidth = 5; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const p = (t * .8 + i / n) % 1; ctx.globalAlpha = 1 - p; ctx.beginPath();
    for (let k = 0; k < 7; k++) { const yy = y - p * h - k * 9; const xx = x + (i - (n - 1) / 2) * 18 + Math.sin(k * .9 + t * 5 + i) * 6; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
    ctx.stroke();
  }
  ctx.restore();
}

function cookedFish(x, y, sc, ang = 0, plate = true) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(sc, sc);
  if (plate) { ctx.beginPath(); ctx.ellipse(0, 18, 120, 36, 0, 0, 7); ctx.fillStyle = '#f4f4f4'; ctx.fill(); ctx.strokeStyle = '#cfd8dc'; ctx.lineWidth = 4; ctx.stroke(); }
  ctx.fillStyle = '#c8742c';
  ctx.beginPath(); ctx.ellipse(0, 0, 85, 32, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(78, 0); ctx.lineTo(120, -30); ctx.lineTo(112, 0); ctx.lineTo(120, 30); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#6d3b12'; ctx.lineWidth = 6; ctx.lineCap = 'round';
  for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 26 - 10, -22); ctx.lineTo(i * 26 + 10, 22); ctx.stroke(); }
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-55, -8, 8, 0, 7); ctx.fill();
  ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(-55, -8, 3.5, 0, 7); ctx.fill();
  if (plate) { // lemon
    ctx.fillStyle = '#ffe066'; ctx.beginPath(); ctx.arc(-95, 22, 20, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fff6'; ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-95, 22); ctx.lineTo(-95 + Math.cos(i) * 18, 22 + Math.sin(i) * 18); ctx.stroke(); }
  }
  ctx.restore();
}

function person(x, y, sc, { shirt = '#2a9d8f', armsUp = false, hat = null, skin = '#f1c27d' } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  ctx.fillStyle = '#3a3a3a'; ctx.fillRect(-18, 40, 14, 60); ctx.fillRect(4, 40, 14, 60);
  ctx.fillStyle = shirt; rr(-28, -30, 56, 76, 14); ctx.fill();
  ctx.strokeStyle = shirt; ctx.lineWidth = 13; ctx.lineCap = 'round';
  ctx.beginPath();
  if (armsUp) { ctx.moveTo(-22, -22); ctx.lineTo(-40, -80); ctx.moveTo(22, -22); ctx.lineTo(40, -80); }
  else { ctx.moveTo(-24, -20); ctx.lineTo(-34, 30); ctx.moveTo(24, -20); ctx.lineTo(34, 30); }
  ctx.stroke();
  ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(0, -52, 22, 0, 7); ctx.fill();
  ctx.fillStyle = '#2b1d14'; ctx.beginPath(); ctx.ellipse(0, -44, 9, 3.5, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(-8, -56, 3, 0, 7); ctx.arc(8, -56, 3, 0, 7); ctx.fill();
  if (hat) { ctx.fillStyle = hat; ctx.beginPath(); ctx.ellipse(0, -68, 25, 10, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-25, -70, 50, 5); }
  ctx.restore();
}

function kiosk(x, y, sc) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  ctx.fillStyle = '#f1f1f1'; ctx.fillRect(-110, -60, 220, 140);
  // striped awning
  for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#e63946'; ctx.beginPath(); ctx.moveTo(-120 + i * 30, -60); ctx.lineTo(-120 + (i + 1) * 30, -60); ctx.lineTo(-120 + (i + 1) * 30, -25); ctx.arc(-105 + i * 30, -25, 15, 0, Math.PI); ctx.closePath(); ctx.fill(); }
  // sign
  ctx.fillStyle = '#ffd166'; rr(-80, -120, 160, 52, 10); ctx.fill();
  ctx.fillStyle = '#111'; font(900, 36); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('BÜFE', 0, -93);
  // counter + menu
  ctx.fillStyle = '#264653'; ctx.fillRect(-110, 20, 220, 60);
  ctx.fillStyle = '#fff'; font(800, 20); ctx.fillText('TOST • AYRAN • MISIR', 0, 50);
  ctx.fillStyle = '#1d3557'; rr(-80, -15, 160, 32, 6); ctx.fill();
  // ice cream
  ctx.fillStyle = '#e9c46a'; ctx.beginPath(); ctx.moveTo(150, 30); ctx.lineTo(132, -20); ctx.lineTo(168, -20); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#f4a6c4'; ctx.beginPath(); ctx.arc(150, -28, 20, 0, 7); ctx.fill();
  // crossed-out old sign
  ctx.fillStyle = '#6c757d'; rr(-210, -40, 90, 40, 6); ctx.fill();
  ctx.fillStyle = '#fff'; font(800, 15); ctx.fillText('SINIR', -165, -27); ctx.fillText('KAPISI', -165, -11);
  ctx.strokeStyle = '#e63946'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-212, -42); ctx.lineTo(-118, 2); ctx.stroke();
  ctx.restore();
}

function truck(x, y, sc, hue) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  ctx.fillStyle = '#eceff1'; rr(-20, -60, 150, 66, 6); ctx.fill();
  ctx.fillStyle = `hsl(${hue},55%,45%)`; ctx.fillRect(-20, -22, 150, 8);
  ctx.fillStyle = `hsl(${hue},60%,40%)`; rr(-80, -46, 58, 52, 8); ctx.fill();
  ctx.fillStyle = '#bfe3f5'; rr(-74, -40, 24, 20, 4); ctx.fill();
  ctx.fillStyle = '#1b1b1b'; [-58, 20, 100].forEach(wx => { ctx.beginPath(); ctx.arc(wx, 8, 12, 0, 7); ctx.fill(); });
  ctx.restore();
}

function kombi(x, y, sc, on) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  rr(-80, -120, 160, 240, 18); ctx.fillStyle = '#f8f9fa'; ctx.fill(); ctx.strokeStyle = '#ced4da'; ctx.lineWidth = 5; ctx.stroke();
  rr(-50, -80, 100, 50, 8); ctx.fillStyle = '#1d3557'; ctx.fill();
  font(800, 26); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = on ? '#4cc9f0' : '#555'; ctx.fillText(on ? '60°' : 'OFF', 0, -55);
  // flame window
  ctx.beginPath(); ctx.arc(0, 30, 34, 0, 7); ctx.fillStyle = '#212529'; ctx.fill();
  if (on) { ctx.fillStyle = '#4cc9f0'; ctx.beginPath(); ctx.moveTo(0, 6); ctx.quadraticCurveTo(22, 34, 0, 52); ctx.quadraticCurveTo(-22, 34, 0, 6); ctx.fill(); ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.moveTo(0, 22); ctx.quadraticCurveTo(10, 38, 0, 48); ctx.quadraticCurveTo(-10, 38, 0, 22); ctx.fill(); }
  // pipes
  ctx.fillStyle = '#adb5bd'; [-40, 0, 40].forEach(px => ctx.fillRect(px - 6, 120, 12, 70));
  ctx.restore();
}

function mom(x, y, sc, throwing) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  // dress
  ctx.fillStyle = '#8e44ad'; ctx.beginPath(); ctx.moveTo(-40, -30); ctx.lineTo(40, -30); ctx.lineTo(60, 110); ctx.lineTo(-60, 110); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#f1faee'; ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.lineTo(36, 100); ctx.lineTo(-36, 100); ctx.closePath(); ctx.fill(); // apron
  ctx.strokeStyle = '#8e44ad'; ctx.lineWidth = 16; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-34, -22); ctx.lineTo(-58, 30);
  if (throwing) { ctx.moveTo(34, -22); ctx.lineTo(80, -70); } else { ctx.moveTo(34, -22); ctx.lineTo(58, 30); }
  ctx.stroke();
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -60, 30, 0, 7); ctx.fill();
  ctx.fillStyle = '#4a2c1a'; ctx.beginPath(); ctx.arc(0, -72, 30, Math.PI, 0); ctx.fill(); ctx.beginPath(); ctx.arc(0, -100, 14, 0, 7); ctx.fill(); // hair bun
  // stern eyebrows + eyes
  ctx.strokeStyle = '#222'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(-18, -70); ctx.lineTo(-5, -65); ctx.moveTo(18, -70); ctx.lineTo(5, -65); ctx.stroke();
  ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(-11, -58, 3.5, 0, 7); ctx.arc(11, -58, 3.5, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-10, -42); ctx.lineTo(10, -42); ctx.stroke();
  ctx.restore();
}

function cardigan(x, y, sc, ang, col) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(sc, sc);
  ctx.fillStyle = col;
  rr(-35, -40, 70, 85, 10); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-35, -36); ctx.lineTo(-70, 30); ctx.lineTo(-55, 38); ctx.lineTo(-30, -5); ctx.fill();
  ctx.beginPath(); ctx.moveTo(35, -36); ctx.lineTo(70, 30); ctx.lineTo(55, 38); ctx.lineTo(30, -5); ctx.fill();
  ctx.strokeStyle = '#0003'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(0, 45); ctx.stroke();
  ctx.fillStyle = '#fff8'; [-20, 0, 20].forEach(by => { ctx.beginPath(); ctx.arc(6, by, 3.5, 0, 7); ctx.fill(); });
  ctx.restore();
}

function landBlock(x, y, w, h, label) {
  ctx.save();
  ctx.fillStyle = '#5d6b62'; rr(x, y, w, h, 40); ctx.fill();
  ctx.fillStyle = '#fff'; font(900, 40); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(label, x + w / 2, y + h / 2);
  ctx.restore();
}

// ---------- scene ----------
function render(t) {
  cam = camera(t);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawSea(t);
  const bridgeScene = t > 27.7 && t < 31.75;
  if (!bridgeScene) drawMap(10, { island: true });

  // ---- 1: recap ----
  if (t < 4.7) {
    const v = vis(t, 0.2, 4.6, .3, .3);
    cityDot('Ankara', CITY.ankara, v);
    if (v > 0) { const [ax, ay] = P(...CITY.ankara); ctx.save(); ctx.globalAlpha = v; binocularMan(ax + 150, ay + 150, .8); sadFace(ax - 120, ay - 30, 34, t); ctx.restore(); }
    title([['GEÇEN BÖLÜMDE...', 70, '#fff'], ['TÜRKİYE ADA OLDU', 62, '#ffd166']], 0.2, 4.5, t, 360);
  }
  // ---- 2: question ----
  title([['İYİ Mİ OLDU,', 84, '#06d6a0'], ['KÖTÜ MÜ?', 96, '#e63946']], 4.8, 7.6, t, 360);

  // ---- 3: Urfa cooked fish ----
  if (t > 7.6 && t < 13.4) {
    const v = vis(t, 7.8, 13.25, .4, .3);
    ctx.save(); ctx.globalAlpha = v;
    ctx.fillStyle = 'rgba(255,120,40,0.14)'; ctx.fillRect(0, 0, W, H);
    cityDot('Şanlıurfa', CITY.urfa, 1);
    for (let i = 0; i < 7; i++) { const [sx, sy] = P(38.3 + i * .3, 36.45); steam(sx, sy, t + i * .3, 2, 90, .55); }
    const [fx, fy] = P(39.35, 36.62);
    person(fx - 120, fy - 60, 1.1, { shirt: '#e76f51', hat: '#264653' });
    // rod + line
    const reel = clamp((t - 10.6) / 1.0);
    const fishY = lerp(fy + 160, fy - 40, easeOut(reel));
    ctx.strokeStyle = '#5d4037'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(fx - 90, fy - 90); ctx.lineTo(fx + 60, fy - 220); ctx.stroke();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(fx + 60, fy - 220); ctx.lineTo(fx + 70, fishY - 30); ctx.stroke();
    if (t > 10.5) { cookedFish(fx + 70, fishY, .7, Math.PI / 2 * .9, false); steam(fx + 70, fishY - 60, t, 3, 60, .8); }
    if (t > 11.8) {
      const pv = backOut(clamp((t - 11.8) / .4));
      cookedFish(W / 2, 1150, 1.1 * pv, 0, true); steam(W / 2, 1110, t, 3, 80, .8);
      pill('PİŞMİŞ!', W / 2, 1240, { size: 34, bg: '#e63946', alpha: clamp((t - 12) / .3) });
    }
    ctx.restore();
    title([['URFA: TERMAL PLAJ', 66, '#ffb703']], 8.0, 13.2, t, 340);
  }

  // ---- 4: border post -> kiosk ----
  if (t > 13.2 && t < 17.5) {
    const v = vis(t, 13.4, 17.4, .4, .2);
    ctx.save(); ctx.globalAlpha = v;
    const [kx, ky] = P(44.35, 39.95);
    kiosk(kx - 60, ky + 40, 1.3 * backOut(clamp((t - 14.6) / .45)) + .0001);
    person(kx - 280, ky + 120, .9, { shirt: '#f4a261' });
    person(kx - 360, ky + 130, .85, { shirt: '#3a86ff' });
    ctx.restore();
    title([['KARA SINIRI: 0 KM', 70, '#06d6a0']], 13.5, 17.35, t, 340);
  }

  // ---- AMA ----
  if (t > 17.4 && t < 18.4) {
    const v = vis(t, 17.45, 18.35, .08, .15);
    ctx.save(); ctx.globalAlpha = v * .7; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore();
    title([['AMA...', 150, '#fff']], 17.45, 18.35, t, 860);
  }

  // ---- 5: Kapıkule trucks ----
  if (t > 18.2 && t < 22.5) {
    const v = vis(t, 18.35, 22.35, .3, .25);
    ctx.save(); ctx.globalAlpha = v;
    const [ex, ey] = P(26.55, 41.67);
    pill('KAPIKULE', ex, ey - 60, { size: 30 });
    for (let i = 0; i < 6; i++) truck(ex + 40 + i * 170, ey + 140 + i * 18, .95, [10, 200, 130, 40, 280, 0][i]);
    // first driver at the shore, about to dive
    const up = t > 20.4;
    person(ex - 70, ey + 120, 1.0, { shirt: '#2a9d8f', armsUp: up });
    if (up) { font(900, 40); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('?!', ex - 70, ey + 10); }
    ctx.restore();
    title([['TIRLAR YOLDA KALDI', 66, '#e63946']], 18.4, 22.3, t, 340);
  }

  // ---- 6: gas pipes / mom & kombi (interior) ----
  if (t > 22.3 && t < 27.95) {
    const v = vis(t, 22.4, 27.85, .3, .25);
    ctx.save(); ctx.globalAlpha = v;
    const wall = ctx.createLinearGradient(0, 0, 0, H); wall.addColorStop(0, '#f6e7cb'); wall.addColorStop(1, '#e9d5b0');
    ctx.fillStyle = wall; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#b08968'; ctx.fillRect(0, 1350, W, H - 1350);
    // broken pipe banner first
    if (t < 24.6) {
      const pv = vis(t, 22.5, 24.6, .25, .2);
      ctx.save(); ctx.globalAlpha *= pv;
      ctx.fillStyle = '#adb5bd'; rr(120, 820, 360, 50, 25); ctx.fill(); rr(600, 840, 360, 50, 25); ctx.fill();
      ctx.strokeStyle = '#e63946'; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(505, 820); ctx.lineTo(575, 890); ctx.moveTo(575, 820); ctx.lineTo(505, 890); ctx.stroke();
      ctx.restore();
    }
    if (t > 24.0) {
      const on = t < 25.4;
      kombi(300, 900, 1.25, on);
      mom(720, 1080, 1.5, t > 26.4);
      // cold tint + shiver text once off
      if (!on) { ctx.save(); ctx.globalAlpha *= clamp((t - 25.4) / .6) * .18; ctx.fillStyle = '#4cc9f0'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
      if (t > 26.4) {
        const cols = ['#e76f51', '#2a9d8f', '#e9c46a', '#8338ec', '#ff006e'];
        for (let i = 0; i < 5; i++) {
          const p = clamp((t - 26.4 - i * .12) / .9); if (p <= 0) continue;
          const x = lerp(800, 120 + i * 190, easeOut(p)), y = lerp(950, 1250 - Math.sin(p * Math.PI) * 300 + i * 10, p);
          cardigan(x, y, .9, p * 4 + i, cols[i]);
        }
        speech(560, 640, 'Hırkanı giy!', vis(t, 26.6, 27.85, .2, .2));
      }
    }
    ctx.restore();
    title([['DOĞALGAZ HATLARI', 60, '#e63946'], ['KOPTU', 72, '#e63946']], 22.5, 25.2, t, 340);
  }

  // ---- 7: bridge -> ferry ----
  if (bridgeScene) {
    const v = vis(t, 27.85, 31.6, .3, .2);
    ctx.save(); ctx.globalAlpha = v;
    const saveCam = cam; cam = { lon: 35.4, lat: 39.0, z: .5 };
    [thrace, anatolia].forEach(p => { path(p); ctx.fillStyle = '#e8d6a0'; ctx.fill(); ctx.strokeStyle = '#e6f7ff'; ctx.lineWidth = 4; ctx.stroke(); });
    cam = saveCam;
    landBlock(-40, 720, 240, 240, 'AVRUPA');
    landBlock(880, 720, 240, 240, 'ASYA');
    // bridge arc crumbling after 29.6
    const fall = clamp((t - 29.6) / .8);
    ctx.save(); ctx.globalAlpha *= 1 - fall;
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 16;
    ctx.beginPath(); ctx.moveTo(200, 800); ctx.quadraticCurveTo(540, 520 + fall * 300, 880, 800); ctx.stroke();
    ctx.lineWidth = 4; for (let i = 1; i < 12; i++) { const x = 200 + i * 56.7; const yTop = 800 - Math.sin(i / 12 * Math.PI) * 140 + fall * 200; ctx.beginPath(); ctx.moveTo(x, yTop); ctx.lineTo(x, 800 + fall * 300); ctx.stroke(); }
    ctx.restore();
    if (t > 30.0) {
      const fp = clamp((t - 30.0) / 1.6);
      ferry(lerp(-80, 1160, fp), 1050, 1.5, t);
      if (t > 30.8) { font(900, 70); ctx.fillStyle = '#ffd166'; ctx.textAlign = 'center'; ctx.lineWidth = 12; ctx.strokeStyle = '#000a'; const tx = lerp(-80, 1160, fp); ctx.strokeText('DAAAT!', tx, 930); ctx.fillText('DAAAT!', tx, 930); }
    }
    ctx.restore();
    title([['KÖPRÜ DEĞİL...', 70, '#fff'], ['FERİBOT', 84, '#ffd166']], 28.0, 31.5, t, 360);
  }

  // ---- scale (persistent HUD) ----
  let tilt = 0;
  const kf = [[5, 0], [10.4, 0], [11.2, .14], [15.0, .14], [15.6, .26], [18.6, .26], [19.4, .08], [23.2, .08], [24.0, -.1], [29.8, -.1], [30.6, -.24], [32.4, -.24], [33.0, -.5]];
  for (let i = 0; i < kf.length - 1; i++) if (t >= kf[i][0] && t <= kf[i + 1][0]) tilt = lerp(kf[i][1], kf[i + 1][1], backOut(prog(t, kf[i][0], kf[i + 1][0])));
  if (t > kf[kf.length - 1][0]) tilt = -.5;
  if (t > 4.9 && t < 31.6) {
    const drop = easeOut(clamp((t - 4.9) / .6));
    scale(880, lerp(380, 600, drop), .7, tilt, vis(t, 4.9, 31.6, .3, .2));
  }

  // ---- 8: verdict ----
  if (t > 31.5 && t < 35.2) {
    const v = vis(t, 31.6, 35.1, .3, .2);
    ctx.save(); ctx.globalAlpha = v * .55; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore();
    scale(W / 2, 760, 1.6, tilt, v);
    title([['SONUÇ:', 70, '#fff'], ['KAYBETTİK', 110, '#e63946']], 32.3, 35.1, t, 380);
    if (t > 33.6) {
      const fv = vis(t, 33.6, 35.1, .25, .2);
      ctx.save(); ctx.globalAlpha = fv;
      cookedFish(W / 2, 1180, 1.0, 0, true); steam(W / 2, 1140, t, 3, 70, .8);
      ctx.restore();
      pill("AMA URFA'DA BALIK BEDAVA", W / 2, 1290, { size: 40, bg: '#06d6a0', fg: '#062', alpha: fv });
    }
  }

  // ---- 9: Ankara + next episode ----
  if (t > 35.0) {
    const v = vis(t, 35.1, 99, .3, .3);
    cityDot('Ankara', CITY.ankara, v);
    const [ax, ay] = P(...CITY.ankara);
    const walk = clamp((t - 35.4) / 3);
    ctx.save(); ctx.globalAlpha = v;
    const px = ax + 60 + walk * 260, py = ay + 170 + Math.abs(Math.sin(t * 8)) * -8;
    umbrella(px + 50, py - 30, .55, false);
    person(px, py, .9, { shirt: '#264653' });
    ctx.fillStyle = '#ff006e'; rr(px - 40, py - 5, 26, 60, 6); ctx.fill(); // towel
    font(800, 30); ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
    ctx.fillText('nereye?', px, py - 110);
    ctx.restore();
    if (t > 37.9) {
      const cv = clamp((t - 38.0) / .4);
      ctx.save(); ctx.globalAlpha = cv * .8; ctx.fillStyle = '#06121c'; ctx.fillRect(0, 0, W, H); ctx.restore();
      title([['BÖLÜM 3', 120, '#ffd166'], ['ŞEHİRLER NE YAPTI?', 62, '#fff']], 38.0, 99, t, 760);
      ctx.save(); ctx.globalAlpha = cv; font(800, 44); ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
      ctx.fillText('Kaçırmamak için takip et', W / 2, 1010);
      const bob = Math.sin(t * 6) * 12;
      ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.moveTo(W / 2 - 45, 1060 + bob); ctx.lineTo(W / 2 + 45, 1060 + bob); ctx.lineTo(W / 2, 1125 + bob); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
  }

  subtitles(t);
  badge();
  if (t < .3) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .3})`; ctx.fillRect(0, 0, W, H); }
}
