// Story background (1080x1920) for the "Seninki / Add Yours" sticker. Text stays in y 250-1600.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => {
    cam = { lon: 35.35, lat: 39 + 160 / 66, z: 1.0 };          // map in the upper third
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawSea(3); drawMapKis(3, 1); mapSnowfall(3, 170);
    // soft fade below the map so the sticker sits on a calm area
    const g = ctx.createLinearGradient(0, 860, 0, 1420);
    g.addColorStop(0, 'rgba(10,42,68,0)'); g.addColorStop(.35, 'rgba(10,42,68,.35)'); g.addColorStop(.7, 'rgba(10,42,68,.75)'); g.addColorStop(1, 'rgba(10,42,68,.92)');
    ctx.fillStyle = g; ctx.fillRect(0, 860, W, 560);
    ctx.fillStyle = 'rgba(10,42,68,.92)'; ctx.fillRect(0, 1419, W, H - 1419);
    mapSnowfall(4, 60);
    title([['KIŞ HİÇ', 76, '#fff'], ['BİTMESEYDİ?', 86, '#bde0fe']], 0, 99, 5, 340);
    // badge
    ctx.save(); font(900, 34); const txt = 'YA OLSAYDI? #2', w = ctx.measureText(txt).width + 44, bx = (W - w) / 2;
    rr(bx, 1500, w, 62, 16); ctx.fillStyle = '#bde0fe'; ctx.fill(); ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, W / 2, 1532); ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'hikaye', '3-seninki-arkaplan.png') });
  await b.close();
})();
