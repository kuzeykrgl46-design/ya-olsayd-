// Reels cover for Ya Olsaydı #2 · Kış Bölüm 3 (1080x1920)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index3.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => {
    cam = { lon: 35.35, lat: 39 + 380 / 66, z: 1.0 };
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawSea(2); drawMapKis(2, 1); mapSnowfall(2, 140);
    [ADA, RIZ, KON, DEN].forEach(ll => {
      const [x, y] = P(...ll); ctx.beginPath(); ctx.arc(x, y, 40, 0, 7); ctx.fillStyle = '#ffd166'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#fff'; ctx.stroke();
      ctx.fillStyle = '#111'; font(900, 52); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', x, y + 3);
    });
    T = 2; snowman(900, 1650, 1.1);
    title([['KIŞ BİTMESE', 104, '#fff'], ['TÜRKİYE\'Yİ', 112, '#fff'], ['KİM KURTARIR?', 112, '#06d6a0']], 0, 99, 5, 600);
    ctx.save(); font(900, 40);
    const txt = 'YA OLSAYDI? #2 · BÖLÜM 3', w = ctx.measureText(txt).width + 48, bx = (1080 - w) / 2;
    rr(bx, 300, w, 72, 18); ctx.fillStyle = '#bde0fe'; ctx.fill();
    ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 540, 337);
    ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'kapak-kis-bolum3.png') });
  await b.close();
})();
