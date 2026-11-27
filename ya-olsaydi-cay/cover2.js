// Reels cover for Ya Olsaydı #4 · Çay Bitseydi · Bölüm 2 (1080x1920; key content inside the centre 1080x1350 grid crop)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index2.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    hookScene(1.06);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const big = (txt, y, size, col) => { font(900, size); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      ctx.lineWidth = size * .16; ctx.strokeStyle = '#3b1a0a'; ctx.strokeText(txt, W / 2, y); ctx.fillStyle = col; ctx.fillText(txt, W / 2, y); };
    softShadow(() => { big('ÇAYSIZ', 470, 170, '#fff'); big('3. GÜN 😱', 640, 150, GOLD); }, 30, 'rgba(0,0,0,.4)', 12);
    stampHit(540, 1250, 'TÜRKİYE ÇILDIRDI!', TEA, 1);
    ctx.save(); font(900, 38); const txt = 'YA OLSAYDI? #4 · BÖLÜM 2', w2 = ctx.measureText(txt).width + 48, bx = (W - w2) / 2;
    rr(bx, 280, w2, 70, 18); ctx.fillStyle = GOLD; ctx.fill(); ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, W / 2, 315); ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'kapak-cay-bolum2.png') });
  await b.close();
})();
