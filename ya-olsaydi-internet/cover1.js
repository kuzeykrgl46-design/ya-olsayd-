// Reels cover for Ya Olsaydı #3 · İnternet Bölüm 1 (1080x1920)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index1.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const t = 6;
    livingRoom(t, 'rgba(120,140,200,A)');
    tvSet(540, 1060, 900, 540, t, true);
    ctx.fillStyle = '#7b2c3b'; rr(80, 1580, 920, 200, 50); ctx.fill(); ctx.fillStyle = '#922f45'; rr(60, 1520, 960, 110, 50); ctx.fill();
    backHead(260, 1500, 1.15, { shirt: TR_RED, hair: '#2b1d14', pose: 'handsHead', t });
    backHead(540, 1520, 1.2, { shirt: '#264653', hair: '#ccc', hairStyle: 'bald', pose: 'handsHead', t });
    backHead(820, 1505, 1.1, { shirt: '#fff', hair: '#4a2c1a', hairStyle: 'long', pose: 'handsHead', t });
    vignette(.45);
    title([['TAM PENALTIDA', 92, '#fff'], ['İNTERNET', 120, '#ffd166'], ['KESİLSE? 📵', 120, '#ffd166']], 0, 99, 5, 560);
    ctx.save(); font(900, 40);
    const txt = 'YA OLSAYDI? #3 · BÖLÜM 1', w = ctx.measureText(txt).width + 48, bx = (1080 - w) / 2;
    rr(bx, 300, w, 72, 18); ctx.fillStyle = '#ffd166'; ctx.fill();
    ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 540, 337);
    ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'kapak-internet-bolum1.png') });
  await b.close();
})();
