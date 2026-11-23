// Reels cover for Ya Olsaydı #3 · İnternet Bölüm 3 (1080x1920)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index_b3.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const sk = ctx.createLinearGradient(0, 0, 0, 1200); sk.addColorStop(0, '#ff9e80'); sk.addColorStop(1, '#ffe5b4'); ctx.fillStyle = sk; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.translate(0, 300); ctx.beginPath(); ctx.rect(0, 400, W, H); ctx.clip(); hookScene(TL.frozen + 1); ctx.restore();
    title([['BÜTÜN DÜNYADA', 92, '#fff'], ['İNTERNET', 124, '#ffd166'], ['KESİLSE? 📵', 124, '#ffd166']], 0, 99, 5, 580);
    ctx.save(); font(900, 40);
    const txt = 'YA OLSAYDI? #3 · BÖLÜM 3', w = ctx.measureText(txt).width + 48, bx = (1080 - w) / 2;
    rr(bx, 300, w, 72, 18); ctx.fillStyle = '#ffd166'; ctx.fill();
    ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 540, 337);
    ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'kapak-internet-bolum3.png') });
  await b.close();
})();
