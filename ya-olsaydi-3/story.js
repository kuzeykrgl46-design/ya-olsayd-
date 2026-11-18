// Story frames (1080x1920) for Episode 3, reusing the drawing code in index.html.
// Text stays inside the safe zone (y 250-1600).
const { chromium } = require('playwright');
const path = require('path');
const out = f => path.resolve(__dirname, 'hikaye', f);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => document.fonts.load('400 30px "DejaVu Sans Mono"'));

  // ---------- frame 3: behind the scenes (code + result) ----------
  await p.evaluate(async () => {
    render(11.9);                                   // swimming Van cat frame
    const shot = new Image(); shot.src = cv.toDataURL('image/png'); await shot.decode();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#0b1620'; ctx.fillRect(0, 0, W, H);
    pill('🎬 KAMERA ARKASI', W / 2, 300, { size: 40, bg: '#ffd166', fg: '#111' });
    // editor window
    rr(60, 370, 960, 560, 24); ctx.fillStyle = '#1e1e2e'; ctx.fill();
    ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => { ctx.beginPath(); ctx.arc(100 + i * 32, 405, 10, 0, 7); ctx.fillStyle = c; ctx.fill(); });
    ctx.font = '400 22px "DejaVu Sans Mono"'; ctx.fillStyle = '#8b8fa3'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('van-kedisi.js', 210, 406);
    const C = { k: '#c678dd', f: '#61afef', s: '#98c379', n: '#d19a66', c: '#7f848e', t: '#e6e6e6' };
    const lines = [
      [['function ', 'k'], ['vanKedisi', 'f'], ['(x, y) {', 't']],
      [['  // bembeyaz gövde', 'c']],
      [['  ctx.fillStyle = ', 't'], ["'#fbfbfb'", 's'], [';', 't']],
      [['  ctx.', 't'], ['ellipse', 'f'], ['(x, y, ', 't'], ['60', 'n'], [', ', 't'], ['34', 'n'], [');', 't']],
      [['  // bir göz mavi, bir göz yeşil', 'c']],
      [['  ', 't'], ['göz', 'f'], ['(x - ', 't'], ['70', 'n'], [', ', 't'], ["'mavi'", 's'], [');', 't']],
      [['  ', 't'], ['göz', 'f'], ['(x - ', 't'], ['46', 'n'], [', ', 't'], ["'yeşil'", 's'], [');', 't']],
      [['  // turuncu kuyruk', 'c']],
      [['  ', 't'], ['kuyruk', 'f'], ['(x + ', 't'], ['48', 'n'], [', ', 't'], ["'#d9822b'", 's'], [');', 't']],
      [['  // denizden çıkmıyor', 'c']],
      [['  ', 't'], ['yuz', 'f'], ['(x, y, ', 't'], ['sonsuza', 'n'], [');', 't']],
      [['}', 't']],
    ];
    ctx.font = '400 28px "DejaVu Sans Mono"';
    lines.forEach((ln, i) => {
      let x = 100; const y = 470 + i * 38;
      ctx.fillStyle = '#4b5263'; ctx.textAlign = 'right'; ctx.fillText(String(i + 1), 84, y); ctx.textAlign = 'left';
      ln.forEach(([txt, c]) => { ctx.fillStyle = C[c]; ctx.fillText(txt, x, y); x += ctx.measureText(txt).width; });
    });
    // arrow
    ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.moveTo(W / 2 - 40, 950); ctx.lineTo(W / 2 + 40, 950); ctx.lineTo(W / 2, 1000); ctx.closePath(); ctx.fill();
    // result: crop of the rendered frame around the cat
    ctx.save(); rr(160, 1020, 760, 420, 24); ctx.clip();
    ctx.drawImage(shot, 260, 640, 760, 420, 160, 1020, 760, 420);
    ctx.restore();
    rr(160, 1020, 760, 420, 24); ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 6; ctx.stroke();
    ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; font(900, 46);
    ctx.fillText('Bu videodaki her şey', W / 2, 1505); ctx.fillStyle = '#ffd166'; ctx.fillText('kodla çizildi. Van kedisi bile.', W / 2, 1565);
  });
  await p.locator('canvas').screenshot({ path: out('3-kamera-arkasi.png') });

  // ---------- frame 4: background for the question sticker ----------
  await p.evaluate(() => {
    cam = { lon: 35.4, lat: 39 + 380 / (66 * .96), z: .96 };
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawSea(3); drawMap(10, { island: true });
    [[43.38, 38.5], [43.1, 40.6], [26.56, 41.68], [37.38, 37.07], [28.98, 41.01], [32.86, 39.93], [30.7, 36.9], [35.3, 37.0], [39.7, 41.0], [27.14, 38.42]].forEach(([lo, la], i) => {
      const [x, y] = P(lo, la);
      ctx.beginPath(); ctx.arc(x, y, 26, 0, 7); ctx.fillStyle = i < 6 ? '#06d6a0' : '#ffd166'; ctx.fill();
      ctx.fillStyle = '#111'; font(900, 32); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(i < 6 ? '✓' : '?', x, y + 1);
    });
    title([['BÖLÜM 4', 92, '#ffd166'], ['SENİN ŞEHRİN?', 76, '#fff']], 0, 99, 5, 420);
  });
  await p.locator('canvas').screenshot({ path: out('4-soru-arkaplan.png') });

  // ---------- frame 5: close ----------
  await p.evaluate(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawSea(7);
    title([['EN ÇOK YAZILAN', 76, '#fff'], ['ŞEHİR', 76, '#fff'], ['BÖLÜM 4\'E', 104, '#ffd166'], ['GİRECEK', 104, '#ffd166']], 0, 99, 5, 760);
    vanCat(W / 2 + 20, 1180, 1.6, 0, true, 2); ripples(W / 2 + 20, 1220, 2, 3, 150);
    font(800, 44); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('Cevapları yarın paylaşıyorum 👀', W / 2, 1440);
  });
  await p.locator('canvas').screenshot({ path: out('5-kapanis.png') });
  await b.close();
})();
