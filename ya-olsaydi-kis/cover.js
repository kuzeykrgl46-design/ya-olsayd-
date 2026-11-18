// Reels cover for Ya Olsaydı #2 · Kış Bölüm 1 (1080x1920)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => {
    cam = { lon: 35.35, lat: 39 + 330 / 66, z: 1.0 };
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawSea(2); drawMapKis(2, 1); mapSnowfall(2, 140);
    calendar(900, 940, .85, 1);
    T = 2; tourist(330, 1360, 1.4, { shirt: '#ff6b6b', holdSled: true, t: 0 });
    snowman(760, 1450, 1.1);
    title([['KIŞ HİÇ', 120, '#fff'], ['BİTMESEYDİ?', 120, '#bde0fe']], 0, 99, 5, 600);
    ctx.save(); font(900, 40);
    const txt = 'YA OLSAYDI? #2', w = ctx.measureText(txt).width + 48, bx = (1080 - w) / 2;
    rr(bx, 300, w, 72, 18); ctx.fillStyle = '#bde0fe'; ctx.fill();
    ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 540, 337);
    ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'kapak-kis-bolum1.png') });
  await b.close();
})();
