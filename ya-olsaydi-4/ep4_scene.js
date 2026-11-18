// ===== Episode 4 (finale): "Denizsizler ve deniz kazananlar" =====
// Voiceover (take B) starts at 0.3 s; times below are video time.

const SUBS = [
  // [show, hide, text, speechStart, speechLength]
  [0.3, 3.3, "Ada Türkiye'de Ankaralılar hâlâ deniz istiyor.", 0.3, 2.5],
  [3.45, 9.1, "Kahramanmaraş'a da deniz çıkmadı. Maraşlılar Ankara'yı dondurmayla teselli etti.", 3.5, 5.4],
  [9.5, 11.4, 'Peki deniz kazananlar ne yaptı?', 9.6, 1.5],
  [11.5, 14.4, "Mardin'in taş evleri artık deniz manzaralı.", 11.55, 2.5],
  [14.55, 17.3, "Iğdır'da Ağrı Dağı manzaralı plaj açıldı.", 14.6, 2.4],
  [17.5, 21.8, 'Karadenizliler yeni denizlere baktı: "Bizimki daha güzel, uşağum!"', 17.55, 4.0],
  [22.0, 26.3, 'Ve Ankaralılar sonunda denize kavuştu: balkonda şişme havuz.', 22.05, 4.0],
  [26.4, 33.5, 'Ada Türkiye burada bitti. Sıradaki "Ya olsaydı" ne olsun? Yorumlara yaz.', 26.45, 5.2],
];

function badge() {
  ctx.save(); font(900, 34);
  const txt = 'YA OLSAYDI?', w = ctx.measureText(txt).width;
  rr(56, 150, w + 120, 64, 16); ctx.fillStyle = '#ffd166'; ctx.fill();
  ctx.fillStyle = '#111'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 78, 183);
  rr(78 + w + 14, 162, 54, 40, 10); ctx.fillStyle = '#111'; ctx.fill();
  ctx.fillStyle = '#ffd166'; ctx.textAlign = 'center'; ctx.fillText('#1', 78 + w + 41, 183);
  const bx = 56 + w + 136;
  font(900, 30); const label = 'BÖLÜM 4 · FİNAL', bw = ctx.measureText(label).width + 36;
  rr(bx, 156, bw, 52, 14); ctx.fillStyle = '#e63946'; ctx.fill();
  ctx.fillStyle = '#fff'; ctx.fillText(label, bx + bw / 2, 183);
  ctx.restore();
}

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
function protester(x, y, sc, t) {
  const bob = Math.abs(Math.sin(t * 5)) * -14;
  ctx.save(); ctx.translate(x, y + bob); ctx.scale(sc, sc);
  // sign on a stick
  ctx.strokeStyle = '#6d4c41'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(40, -40); ctx.lineTo(40, -170); ctx.stroke();
  ctx.save(); ctx.translate(40, -210); ctx.rotate(Math.sin(t * 5) * .06);
  rr(-120, -50, 240, 100, 10); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#e63946'; ctx.lineWidth = 6; ctx.stroke();
  ctx.fillStyle = '#e63946'; font(900, 30); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('DENİZ', 0, -16); ctx.fillText('İSTİYORUZ!', 0, 22);
  ctx.restore();
  ctx.restore();
  person(x, y + bob, sc, { shirt: '#264653', armsUp: true });
}

function dondurmaci(x, y, sc) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  // vest + fez-like hat (traditional Maraş ice-cream seller look)
  ctx.fillStyle = '#3a3a3a'; ctx.fillRect(-18, 40, 14, 60); ctx.fillRect(4, 40, 14, 60);
  ctx.fillStyle = '#fff'; rr(-28, -30, 56, 76, 14); ctx.fill();
  ctx.fillStyle = '#c1121f'; rr(-28, -30, 18, 76, 8); ctx.fill(); rr(10, -30, 18, 76, 8); ctx.fill();
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -52, 22, 0, 7); ctx.fill();
  ctx.fillStyle = '#c1121f'; ctx.beginPath(); ctx.moveTo(-18, -66); ctx.lineTo(18, -66); ctx.lineTo(14, -92); ctx.lineTo(-14, -92); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2b1d14'; ctx.beginPath(); ctx.ellipse(0, -44, 10, 4, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(-8, -56, 3, 0, 7); ctx.arc(8, -56, 3, 0, 7); ctx.fill();
  ctx.restore();
}

// stretchy ice cream ribbon from (x0,y0) toward (x1,y1), p = 0..1
function iceRibbon(x0, y0, x1, y1, p, t) {
  if (p <= 0) return;
  const xe = lerp(x0, x1, p), ye = lerp(y0, y1, p);
  ctx.save(); ctx.lineCap = 'round';
  ctx.strokeStyle = '#6d4c41'; ctx.lineWidth = 8; // long metal paddle handle
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + (x1 - x0) * .08, y0 + (y1 - y0) * .08); ctx.stroke();
  ctx.strokeStyle = '#fff8e7'; ctx.lineWidth = 22;
  ctx.beginPath(); ctx.moveTo(x0 + (x1 - x0) * .08, y0 + (y1 - y0) * .08);
  const mx = (x0 + xe) / 2, my = (y0 + ye) / 2 + 60 + Math.sin(t * 4) * 10; // sagging ribbon
  ctx.quadraticCurveTo(mx, my, xe, ye); ctx.stroke();
  ctx.fillStyle = '#e9c46a'; ctx.beginPath(); ctx.moveTo(xe - 18, ye); ctx.lineTo(xe + 18, ye); ctx.lineTo(xe, ye + 46); ctx.closePath(); ctx.fill(); // cone
  ctx.fillStyle = '#fff8e7'; ctx.beginPath(); ctx.arc(xe, ye - 6, 20, 0, 7); ctx.fill();
  ctx.restore();
}

function stoneHouses(x, y, sc) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  // terraced hillside of honey-coloured stone houses
  ctx.fillStyle = '#b08d57'; ctx.beginPath(); ctx.moveTo(-260, 90); ctx.lineTo(-200, -80); ctx.lineTo(40, -150); ctx.lineTo(260, -60); ctx.lineTo(260, 90); ctx.closePath(); ctx.fill();
  const rows = [[-170, -40, 6], [-200, 20, 7], [-230, 70, 8]];
  rows.forEach(([sx, sy, n], r) => {
    for (let i = 0; i < n; i++) {
      const hx = sx + i * 62, hy = sy - (i % 2) * 12 - r * 2;
      ctx.fillStyle = ['#e2c08d', '#d9b27c', '#ecd2a0'][(i + r) % 3]; ctx.fillRect(hx, hy - 50, 56, 50);
      ctx.fillStyle = '#7a5c3a';
      ctx.beginPath(); ctx.moveTo(hx + 16, hy - 8); ctx.lineTo(hx + 16, hy - 24); ctx.arc(hx + 22, hy - 24, 6, Math.PI, 0); ctx.lineTo(hx + 28, hy - 8); ctx.fill();
      ctx.beginPath(); ctx.moveTo(hx + 34, hy - 8); ctx.lineTo(hx + 34, hy - 24); ctx.arc(hx + 40, hy - 24, 6, Math.PI, 0); ctx.lineTo(hx + 46, hy - 8); ctx.fill();
    }
  });
  // minaret
  ctx.fillStyle = '#e2c08d'; ctx.fillRect(150, -210, 22, 140); ctx.beginPath(); ctx.moveTo(146, -210); ctx.lineTo(176, -210); ctx.lineTo(161, -250); ctx.closePath(); ctx.fill();
  ctx.restore();
}

function sailboat(x, y, sc, t) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 3) * 4); ctx.scale(sc, sc);
  ctx.fillStyle = '#8d5524'; ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(50, 0); ctx.lineTo(36, 18); ctx.lineTo(-36, 18); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(0, -90); ctx.lineTo(44, -8); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.moveTo(-4, -8); ctx.lineTo(-4, -70); ctx.lineTo(-36, -8); ctx.closePath(); ctx.fill();
  ctx.restore();
}

function mountain(x, y, sc) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  ctx.fillStyle = '#6b7f99'; ctx.beginPath(); ctx.moveTo(-320, 120); ctx.lineTo(-40, -230); ctx.lineTo(60, -150); ctx.lineTo(120, -190); ctx.lineTo(340, 120); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(-120, -130); ctx.lineTo(-40, -230); ctx.lineTo(30, -160); ctx.lineTo(0, -140); ctx.lineTo(-30, -160); ctx.lineTo(-70, -120); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(80, -150); ctx.lineTo(120, -190); ctx.lineTo(160, -140); ctx.lineTo(130, -150); ctx.closePath(); ctx.fill();
  ctx.restore();
}

function karadenizli(x, y, sc, crossed, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  ctx.fillStyle = '#3a3a3a'; ctx.fillRect(-18, 40, 14, 60); ctx.fillRect(4, 40, 14, 60);
  ctx.fillStyle = '#1d3557'; rr(-30, -30, 60, 76, 14); ctx.fill();
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -52, 22, 0, 7); ctx.fill();
  ctx.fillStyle = '#111'; ctx.beginPath(); ctx.ellipse(0, -70, 26, 10, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-26, -72, 52, 6); // cap
  ctx.fillStyle = '#2b1d14'; ctx.beginPath(); ctx.ellipse(0, -42, 13, 5, 0, 0, 7); ctx.fill(); // big moustache
  if (crossed) {
    ctx.fillStyle = '#16304d'; rr(-36, -4, 72, 22, 11); ctx.fill();
    ctx.strokeStyle = '#222'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-14, -58); ctx.lineTo(-4, -56); ctx.moveTo(4, -56); ctx.lineTo(14, -58); ctx.stroke(); // unimpressed eyes
  } else {
    ctx.fillStyle = '#111'; rr(-26, -64, 22, 16, 5); ctx.fill(); rr(4, -64, 22, 16, 5); ctx.fill(); rr(-6, -60, 12, 6, 2); ctx.fill(); // binoculars
    ctx.strokeStyle = '#1d3557'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-22, -20); ctx.lineTo(-18, -50); ctx.moveTo(22, -20); ctx.lineTo(18, -50); ctx.stroke();
  }
  ctx.restore();
}

function balconyPool(t, reveal) {
  // building facade
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#9ad1f5'); g.addColorStop(.55, '#cfeaff'); g.addColorStop(.55, '#d9cbb3'); g.addColorStop(1, '#c4b49a');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // other apartment blocks in the back
  ctx.fillStyle = '#b8c4cf'; [[40, 520, 220, 540], [300, 600, 180, 460], [820, 560, 220, 500]].forEach(([x, y, w, h]) => { ctx.fillRect(x, y, w, h); ctx.fillStyle = '#ffffff55'; for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) ctx.fillRect(x + 16 + c * (w - 32) / 4, y + 20 + r * 70, 26, 34); ctx.fillStyle = '#b8c4cf'; });
  // balcony slab + railing
  ctx.fillStyle = '#8d99ae'; ctx.fillRect(80, 1300, 920, 40);
  ctx.strokeStyle = '#495057'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(80, 1150); ctx.lineTo(1000, 1150); ctx.stroke();
  for (let i = 0; i <= 18; i++) { ctx.beginPath(); ctx.moveTo(80 + i * 51, 1150); ctx.lineTo(80 + i * 51, 1300); ctx.stroke(); }
  // sign
  ctx.save(); ctx.translate(840, 980); ctx.rotate(.05);
  rr(-130, -50, 260, 100, 12); ctx.fillStyle = '#ffd166'; ctx.fill();
  ctx.fillStyle = '#111'; font(900, 32); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ANKARA', 0, -16); ctx.fillText('DENİZİ', 0, 22);
  ctx.restore();
  // inflatable pool pops in
  const s = backOut(clamp(reveal));
  if (s > 0) {
    ctx.save(); ctx.translate(480, 1180); ctx.scale(s, s);
    ctx.fillStyle = '#4cc9f0'; ctx.beginPath(); ctx.ellipse(0, 0, 300, 90, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#90e0ef'; ctx.beginPath(); ctx.ellipse(0, -10, 250, 62, 0, 0, 7); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(Math.sin(t * 2 + i) * 40, -10, 60 + i * 50, 14 + i * 10, 0, 0, 7); ctx.globalAlpha = .4; ctx.stroke(); } ctx.globalAlpha = 1;
    // Ankaralı relaxing in it, sunglasses
    ctx.fillStyle = '#264653'; rr(-40, -110, 80, 90, 20); ctx.fill();
    ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -140, 34, 0, 7); ctx.fill();
    ctx.fillStyle = '#111'; rr(-28, -152, 24, 14, 5); ctx.fill(); rr(4, -152, 24, 14, 5); ctx.fill(); ctx.fillRect(-4, -148, 8, 4);
    ctx.strokeStyle = '#333'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, -126, 12, .2, Math.PI - .2); ctx.stroke(); // smile
    ctx.fillStyle = '#ff006e'; ctx.beginPath(); ctx.ellipse(170, -40, 50, 22, .3, 0, 7); ctx.fill(); // float toy
    ctx.restore();
  }
}

function optionCard(x, y, icon, text, alpha, sc) {
  if (alpha <= 0) return;
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.scale(sc, sc);
  rr(-400, -56, 800, 112, 28); ctx.fillStyle = '#ffffff'; ctx.fill();
  font(400, 54); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(icon, -330, 4);
  ctx.fillStyle = '#111'; font(800, 42); ctx.textAlign = 'left'; ctx.fillText(text, -270, 4);
  ctx.restore();
}

// ---------- scene ----------
function render(t) {
  cam = camera(t);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const balcony = t > 21.75 && t < 26.35;
  if (balcony) {
    const v = vis(t, 21.8, 26.3, .25, .25);
    drawSea(t); drawMap(10, { island: true });
    ctx.save(); ctx.globalAlpha = v; balconyPool(t, (t - 24.55) / .45); ctx.restore();
    sendPrompt('Ankaralı arkadaşına gönder', 1555, vis(t, 24.9, 26.2, .25, .2));
    title([['ANKARA SONUNDA', 72, '#fff'], ['DENİZE KAVUŞTU!', 82, '#ffd166']], 22.0, 26.3, t, 400);
  } else {
    drawSea(t);
    drawMap(10, { island: true });
  }

  // ---- 1: Ankara protester on the full island map ----
  if (t < 3.5) {
    const v = vis(t, 0, 3.35, .01, .25);
    const [ax, ay] = P(32.86, 39.93);
    ctx.save(); ctx.globalAlpha = v; protester(ax, ay + 40, .85, t); ctx.restore();
    title([['ANKARA HÂLÂ', 80, '#fff'], ['DENİZ İSTİYOR', 88, '#ffd166']], 0, 3.3, t, 400);
  }

  // ---- 2: Maraş ice cream stretches all the way to Ankara ----
  if (t > 3.2 && t < 9.25) {
    const v = vis(t, 3.4, 9.1, .3, .2);
    const [ax, ay] = P(32.86, 39.93), [mx, my] = P(36.94, 37.58);
    cityDot('Ankara', [32.86, 39.93], v);
    cityDot('Kahramanmaraş', [36.94, 37.58], v, '#e63946');
    ctx.save(); ctx.globalAlpha = v;
    dondurmaci(mx + 60, my + 90, .9);
    const p = easeOut(clamp((t - 5.9) / 1.6));
    iceRibbon(mx + 30, my + 40, ax + 30, ay + 70, p, t);
    person(ax - 10, ay + 110, .85, { shirt: '#264653' });
    if (p >= 1) { font(900, 40); ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.lineWidth = 8; ctx.strokeStyle = '#000a'; ctx.strokeText('teşekkürler!', ax + 50, ay + 150); ctx.fillText('teşekkürler!', ax + 50, ay + 150); }
    ctx.restore();
    sendPrompt('Maraşlı arkadaşına gönder', 1210, vis(t, 4.2, 9.0, .3, .3));
    title([['KAHRAMANMARAŞ', 84, '#ff8fab']], 3.5, 9.05, t, 380);
  }

  // ---- 3: new coasts glow ----
  if (t > 9.3 && t < 11.5) {
    const v = vis(t, 9.4, 11.4, .25, .2);
    ctx.save(); ctx.globalAlpha = v * (.6 + .4 * Math.sin(t * 9)); ctx.lineJoin = 'round';
    borderSegs.forEach(sg => { polyline(sg); ctx.strokeStyle = '#06d6a0'; ctx.lineWidth = 10; ctx.shadowColor = '#06d6a0'; ctx.shadowBlur = 24; ctx.stroke(); });
    ctx.restore();
    title([['PEKİ DENİZ', 80, '#fff'], ['KAZANANLAR?', 90, '#06d6a0']], 9.5, 11.4, t, 380);
  }

  // ---- 4: Mardin ----
  if (t > 11.3 && t < 14.6) {
    const v = vis(t, 11.45, 14.4, .25, .2);
    ctx.save(); ctx.globalAlpha = v;
    const [hx, hy] = P(40.74, 37.31), [sx, sy] = P(40.9, 36.75);
    stoneHouses(hx, hy + 40, 1.15);
    sailboat(lerp(sx - 200, sx + 200, prog(t, 11.5, 14.4)), sy + 60, 1.1, t);
    ctx.restore();
    title([['MARDİN', 110, '#e2c08d']], 11.55, 14.4, t, 380);
  }

  // ---- 5: Iğdır + Mount Ararat ----
  if (t > 14.4 && t < 17.45) {
    const v = vis(t, 14.55, 17.3, .25, .2);
    ctx.save(); ctx.globalAlpha = v;
    const [mx, my] = P(44.3, 39.72), [bx, by] = P(44.55, 39.95);
    mountain(mx - 60, my - 20, 1.25);
    umbrella(bx + 40, by + 40, .9, false);
    lounger(bx - 40, by + 100, 1.0, false);
    ctx.restore();
    title([['IĞDIR', 110, '#bde0fe']], 14.6, 17.3, t, 380);
  }

  // ---- 6: Karadeniz ----
  if (t > 17.4 && t < 21.95) {
    const v = vis(t, 17.55, 21.8, .25, .2);
    ctx.save(); ctx.globalAlpha = v;
    const [kx, ky] = P(39.72, 40.9);
    karadenizli(kx, ky + 40, 1.3, t > 19.9, t);
    if (t > 19.9) speech(kx + 150, ky - 170, 'Bizimki daha güzel, uşağum!', vis(t, 19.95, 21.8, .2, .2));
    ctx.restore();
    title([['KARADENİZ', 104, '#7dd3fc']], 17.6, 21.8, t, 380);
  }

  // ---- 8: finale card + next topic ----
  if (t > 26.3) {
    const v = clamp((t - 26.4) / .4);
    ctx.save(); ctx.globalAlpha = v * .82; ctx.fillStyle = '#06121c'; ctx.fillRect(0, 0, W, H); ctx.restore();
    // "SON" stamp
    const sp = clamp((t - 26.45) / .35);
    if (t < 28.4) {
      ctx.save(); ctx.globalAlpha = vis(t, 26.45, 28.3, .05, .3); ctx.translate(W / 2, 820); ctx.rotate(-.08); ctx.scale(lerp(2, 1, easeOut(sp)), lerp(2, 1, easeOut(sp)));
      rr(-220, -110, 440, 220, 30); ctx.fillStyle = '#e63946'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = '#fff'; rr(-202, -92, 404, 184, 22); ctx.stroke();
      ctx.fillStyle = '#fff'; font(900, 130); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('SON', 0, 8);
      ctx.restore();
    }
    if (t > 28.0) {
      title([['SIRADAKİ "YA OLSAYDI?"', 62, '#fff'], ['NE OLSUN?', 96, '#ffd166']], 28.0, 99, t, 420);
      const opts = [['☕', 'Çay yasaklansaydı?'], ['🌐', 'İnternet 1 hafta kesilseydi?'], ['❄️', 'Kış hiç bitmeseydi?']];
      opts.forEach(([ic, tx], i) => { const a = clamp((t - 28.4 - i * .25) / .3); optionCard(W / 2, 720 + i * 150, ic, tx, a, lerp(.85, 1, backOut(a))); });
      ctx.save(); ctx.globalAlpha = clamp((t - 29.4) / .3); const bob = Math.sin(t * 6) * 12;
      font(800, 42); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('Yorumlara yaz', W / 2, 1200);
      ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.moveTo(W / 2 - 45, 1230 + bob); ctx.lineTo(W / 2 + 45, 1230 + bob); ctx.lineTo(W / 2, 1295 + bob); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
  }

  subtitles(t);
  badge();
  if (t < .12) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .12})`; ctx.fillRect(0, 0, W, H); }
}
