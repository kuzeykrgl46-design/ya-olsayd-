// Reels cover for Ya Olsaydı #3 · İnternet Bölüm 4 (final) (1080x1920)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index_b4.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const t = 2;
    spaceBack(t);
    brightGlobe(540, 1900, 820, 30, .6);
    sat(700, 1020, 1.15, t, true);
    astronaut(370, 1260, 1.7, t, { armUp: .9, cableR: '#e63946', face: 'happy' });
    title([['İNTERNET', 124, '#fff'], ['GERİ GELİYOR', 110, '#fde047'], ['MU? 📶', 110, '#fde047']], 0, 99, 5, 620);
    ctx.save(); font(900, 40);
    const txt = 'YA OLSAYDI? #3 · FİNAL', w = ctx.measureText(txt).width + 48, bx = (1080 - w) / 2;
    rr(bx, 300, w, 72, 18); ctx.fillStyle = '#ffd166'; ctx.fill();
    ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 540, 337);
    ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'kapak-internet-bolum4-final.png') });
  await b.close();
})();
