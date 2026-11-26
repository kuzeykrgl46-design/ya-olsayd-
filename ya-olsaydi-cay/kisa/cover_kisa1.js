// Cover for kısa video 1 (kız isteme) — 1080x1920, key content inside the centre 1080x1350 grid crop.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, '..', 'index1.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    window.sendPrompt = () => {}; window.stampHit = () => {};
    kizScene(TL.kizZoom + .55);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const g = ctx.createLinearGradient(0, 120, 0, 720); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(.45, 'rgba(0,0,0,.4)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 120, W, 600);
    const big = (txt, y, size, col) => { font(900, size); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      ctx.lineWidth = size * .16; ctx.strokeStyle = '#3b1a0a'; ctx.strokeText(txt, W / 2, y); ctx.fillStyle = col; ctx.fillText(txt, W / 2, y); };
    softShadow(() => { big('KIZ İSTEMEYE', 400, 112, '#fff'); big('ÇAYSIZ GİDİLİR Mİ?', 530, 92, GOLD); }, 30, 'rgba(0,0,0,.4)', 12);
    window.stampHit = null;
  });
  await p.evaluate(() => {
    // red stamp, drawn directly so the scene override above stays off
    ctx.save(); ctx.translate(540, 1240); ctx.rotate(-.06); font(900, 64); const w = ctx.measureText('ÇAY YOKSA KIZ DA YOK!').width + 70;
    rr(-w / 2, -58, w, 116, 16); ctx.fillStyle = TEA; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = '#fff'; rr(-w / 2 + 12, -46, w - 24, 92, 10); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ÇAY YOKSA KIZ DA YOK!', 0, 4); ctx.restore();
    ctx.save(); font(900, 36); const txt = 'YA OLSAYDI? #4 · ÇAY BİTSEYDİ ☕', w2 = ctx.measureText(txt).width + 48, bx = (W - w2) / 2;
    rr(bx, 250, w2, 66, 18); ctx.fillStyle = GOLD; ctx.fill(); ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, W / 2, 284); ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'kapak-kisa1-kiz-isteme.png') });
  await b.close();
})();
