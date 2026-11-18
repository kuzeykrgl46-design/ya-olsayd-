// Story frames (1080x1920) for Kış Bölüm 2. Text stays inside y 250-1600 (clear of Instagram's UI).
// Usage: node story_bolum2.js   (the clip is cut separately with ffmpeg, see bottom of file)
const { chromium } = require('playwright');
const path = require('path');
const out = f => path.resolve(__dirname, 'hikaye', f);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index2.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => document.fonts.load('400 30px "DejaVu Sans Mono"'));

  // ---------- frame 3: behind the scenes (code excerpt + rendered dad scene) ----------
  await p.evaluate(async () => {
    cam = { lon: 35.35, lat: 39, z: 1 }; ctx.setTransform(1, 0, 0, 1, 0, 0);
    dadScene(16.4, TL.downDad + .9);
    const shot = new Image(); shot.src = cv.toDataURL('image/png'); await shot.decode();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#0b1620'; ctx.fillRect(0, 0, W, H);
    mapSnowfall(3, 90);
    pill('🎬 KAMERA ARKASI', W / 2, 300, { size: 40, bg: '#bde0fe', fg: '#111' });
    rr(60, 370, 960, 520, 24); ctx.fillStyle = '#1e1e2e'; ctx.fill();
    ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => { ctx.beginPath(); ctx.arc(100 + i * 32, 405, 10, 0, 7); ctx.fillStyle = c; ctx.fill(); });
    ctx.font = '400 22px "DejaVu Sans Mono"'; ctx.fillStyle = '#8b8fa3'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('baba-kombi.js', 210, 406);
    const C = { k: '#c678dd', f: '#61afef', s: '#98c379', n: '#d19a66', c: '#7f848e', t: '#e6e6e6' };
    const lines = [
      [['function ', 'k'], ['baba', 'f'], ['() {', 't']],
      [['  // aile battaniyenin altında', 'c']],
      [['  ', 't'], ['battaniye', 'f'], ['(', 't'], ['3', 'n'], [');', 't']],
      [['  ', 't'], ['kombi', 'f'], ['(', 't'], ['18', 'n'], ['); ', 't'], ['kilitle', 'f'], ['();', 't']],
      [['  ', 't'], ['kaslar', 'f'], ['(', 't'], ["'çatık'", 's'], [');', 't']],
      [['  ', 't'], ['bagir', 'f'], ['(', 't'], ["'Kim açtı bunu?!'", 's'], [');', 't']],
      [['}', 't']],
      [['// her evde aynı sahne', 'c']],
      [['for ', 'k'], ['(', 't'], ['ev', 'f'], [' of ', 'k'], ['turkiye', 'f'], [') ', 't'], ['baba', 'f'], ['();', 't']],
    ];
    ctx.font = '400 28px "DejaVu Sans Mono"';
    lines.forEach((ln, i) => {
      let x = 100; const y = 470 + i * 44;
      ctx.fillStyle = '#4b5263'; ctx.textAlign = 'right'; ctx.fillText(String(i + 1), 84, y); ctx.textAlign = 'left';
      ln.forEach(([txt, c]) => { ctx.fillStyle = C[c]; ctx.fillText(txt, x, y); x += ctx.measureText(txt).width; });
    });
    ctx.fillStyle = '#bde0fe'; ctx.beginPath(); ctx.moveTo(W / 2 - 40, 910); ctx.lineTo(W / 2 + 40, 910); ctx.lineTo(W / 2, 960); ctx.closePath(); ctx.fill();
    ctx.save(); rr(160, 985, 760, 500, 24); ctx.clip();
    ctx.drawImage(shot, 20, 660, 1040, 684, 160, 985, 760, 500);
    ctx.restore();
    rr(160, 985, 760, 500, 24); ctx.strokeStyle = '#bde0fe'; ctx.lineWidth = 6; ctx.stroke();
    ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; font(900, 46);
    ctx.fillText('Kombi, kilit, kızgın baba...', W / 2, 1545); ctx.fillStyle = '#bde0fe'; ctx.fillText('hepsi kodla çizildi.', W / 2, 1600);
  });
  await p.locator('canvas').screenshot({ path: out('b2-3-kamera-arkasi.png') });

  // ---------- frame 4: background for the poll sticker (centre y 820-1300 left free) ----------
  await p.evaluate(() => {
    cam = { lon: 35.35, lat: 39 + 160 / 66, z: 1.0 }; ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawSea(6); drawMapKis(6, 1);
    const g = ctx.createLinearGradient(0, 700, 0, 1200);
    g.addColorStop(0, 'rgba(10,42,68,0)'); g.addColorStop(.5, 'rgba(10,42,68,.7)'); g.addColorStop(1, 'rgba(10,42,68,.94)');
    ctx.fillStyle = g; ctx.fillRect(0, 700, W, 500); ctx.fillStyle = 'rgba(10,42,68,.94)'; ctx.fillRect(0, 1199, W, H - 1199);
    mapSnowfall(6, 170);
    title([['KIŞ HİÇ BİTMESE', 70, '#fff'], ['SENİN ŞEHRİN?', 90, '#bde0fe']], 0, 99, 5, 340);
    font(400, 110); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    [['⛷️', 140, 1420, -.15], ['🍉', 940, 1400, .2], ['🔥', 170, 1560, .1], ['🦟', 920, 1560, -.2]].forEach(([e, x, y, r]) => { ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.globalAlpha = .9; ctx.fillText(e, 0, 0); ctx.restore(); });
    ctx.save(); font(900, 34); const txt = 'YA OLSAYDI? #2 · BÖLÜM 2', w = ctx.measureText(txt).width + 44, bx = (W - w) / 2;
    rr(bx, 1500, w, 62, 16); ctx.fillStyle = '#bde0fe'; ctx.fill(); ctx.fillStyle = '#111'; ctx.fillText(txt, W / 2, 1532); ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: out('b2-4-anket-arkaplan.png') });

  // ---------- frame 5: close ----------
  await p.evaluate(() => {
    cam = { lon: 35.35, lat: 39, z: 1 }; ctx.setTransform(1, 0, 0, 1, 0, 0);
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#16324f'); g.addColorStop(1, '#0a1a2b');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    mapSnowfall(9, 160);
    title([['HANGİ ŞEHRİ', 92, '#fff'], ['UNUTTUK?', 112, '#bde0fe']], 0, 99, 5, 520);
    T = 9; snowman(540, 1150, 1.5);
    font(800, 50); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('Reels\'in altına yaz 👇', W / 2, 1480);
  });
  await p.locator('canvas').screenshot({ path: out('b2-5-kapanis.png') });
  await b.close();
})();
// Clip (frame 2): ffmpeg -y -ss 14.3 -t 3.8 -i ya-olsaydi-2-kis-bolum2.mp4 -vf "fade=in:0:6,fade=out:st=3.4:d=0.4" -af "afade=in:d=0.15,afade=out:st=3.4:d=0.4" -c:v libx264 -crf 20 -pix_fmt yuv420p -c:a aac -movflags +faststart hikaye/b2-2-kombi-klip.mp4
