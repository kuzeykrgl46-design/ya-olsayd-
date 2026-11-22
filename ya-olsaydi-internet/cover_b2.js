// Reels cover for Ya Olsaydı #3 · İnternet Bölüm 2 (1080x1920)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index_b2.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const t = 3;
    streetBack(t);
    goalReplay(540, 1080, 900, 560, .55);
    human(270, 1640, 1.5, { shirt: TR_RED, pants: '#fff', hair: '#111', hairStyle: 'short', face: 'shout', pose: 'shout', skin: '#e9b48a', t, shadow: false });
    castMember(6, 820, 1650, 1.4, { face: 'shock', pose: 'cupEar', t, shadow: false });
    vignette(.35);
    title([['GOLÜ', 110, '#fff'], ['KİM ATTI? ⚽', 124, '#ffd166']], 0, 99, 5, 560);
    ctx.save(); font(900, 40);
    const txt = 'YA OLSAYDI? #3 · BÖLÜM 2', w = ctx.measureText(txt).width + 48, bx = (1080 - w) / 2;
    rr(bx, 300, w, 72, 18); ctx.fillStyle = '#ffd166'; ctx.fill();
    ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 540, 337);
    ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'kapak-internet-bolum2.png') });
  await b.close();
})();
