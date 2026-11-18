// Reels cover for Episode 2 (1080x1920), reusing the drawing code in index.html.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => {
    const z = 0.96;
    cam = { lon: 35.4, lat: 39 + 330 / (66 * z), z };
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawSea(10); drawMap(10, { island: true });
    scale(W / 2, 1020, 1.5, -.32, 1);
    cookedFish(250, 1380, .75, -.2, true);
    cardigan(830, 1380, 1.0, .4, '#e76f51');
    title([['ADA OLDUK...', 110, '#fff'], ['KAZANDIK MI?', 128, '#ffd166']], 0, 99, 5, 600);
    ctx.save(); font(900, 40);
    const txt = 'YA OLSAYDI? #1', w = ctx.measureText(txt).width;
    font(900, 40); const b2 = ctx.measureText('BÖLÜM 2').width + 40;
    const total = w + 48 + 16 + b2, bx = (1080 - total) / 2, by = 300;
    rr(bx, by, w + 48, 72, 18); ctx.fillStyle = '#ffd166'; ctx.fill();
    ctx.fillStyle = '#111'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText(txt, bx + 24, by + 37);
    rr(bx + w + 64, by, b2, 72, 18); ctx.fillStyle = '#e63946'; ctx.fill();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('BÖLÜM 2', bx + w + 64 + b2 / 2, by + 37);
    ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'kapak-bolum2.png') });
  await b.close();
})();
