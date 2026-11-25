// Reels cover for Ya Olsaydı #4 · Çay Bitseydi · Bölüm 1 (1080x1920; key content inside the centre 1080x1350 grid crop)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index1.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const t = 2;
    kitchenBack(t);
    sunRays(900, 260, t, undefined, .25);
    const hands = person(540, 1560, 3.0, { ...DAD, seated: true, face: 'shock', t: 1.3, shadow: false, look: .8, handsW: [[400, 930], [830, 1180]], handShape: ['spread', 'fist'] }).hands;
    teaGlass(hands[1][0] + 10, hands[1][1] - 40, 1.4, 0, false);
    const tg = ctx.createLinearGradient(0, 1560, 0, 1920); tg.addColorStop(0, '#fff'); tg.addColorStop(1, '#e2e8f0'); ctx.fillStyle = tg; ctx.fillRect(0, 1560, 1080, 360);
    breakfastS(540, 1650, 1.1, t);
    glow(540, 560, 520, 'rgba(255,255,255,A)', .35);
    const big = (txt, y, size, col) => { font(900, size); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      ctx.lineWidth = size * .16; ctx.strokeStyle = '#3b1a0a'; ctx.strokeText(txt, 540, y); ctx.fillStyle = col; ctx.fillText(txt, 540, y); };
    softShadow(() => { big('ÇAY', 490, 180, '#fff'); big('BİTTİ!', 730, 160, GOLD); }, 30, 'rgba(0,0,0,.35)', 12);
    stampHit(540, 870, 'TÜRKİYE ŞOKTA!', TEA, 1);
    ctx.save(); font(900, 40);
    const txt = 'YA OLSAYDI? #4 · BÖLÜM 1', w = ctx.measureText(txt).width + 48, bx = (1080 - w) / 2;
    rr(bx, 300, w, 72, 18); ctx.fillStyle = GOLD; ctx.fill();
    ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 540, 337);
    ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'kapak-cay-bolum1.png') });
  await b.close();
})();
