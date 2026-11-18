// Renders the Reels cover (1080x1920) reusing the drawing code in index.html.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => {
    const t = 10;                         // island fully formed
    const z = 0.96;
    cam = { lon: 35.4, lat: 39 + 250 / (66 * z), z };   // map centred around y≈1070
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawSea(t);
    drawMap(t, { island: true });
    // glow behind the island
    // city callouts
    const [kx, ky] = P(43.1, 40.6), [ux, uy] = P(38.79, 37.16), [ax, ay] = P(32.86, 39.93), [ex, ey] = P(26.56, 41.68);
    [[kx, ky, '#4cc9f0'], [ux, uy, '#e63946'], [ax, ay, '#e63946'], [ex, ey, '#e63946']].forEach(([x, y, c]) => {
      ctx.beginPath(); ctx.arc(x, y, 12, 0, 7); ctx.fillStyle = c; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#fff'; ctx.stroke();
    });
    pill('KARS -30°C', kx - 30, ky - 70, { size: 34, bg: '#1f7fbf' });
    pill('URFA +45°C', ux, uy + 80, { size: 34, bg: '#e63946' });
    pill('ANKARA: DENİZ YOK', ax, ay - 70, { size: 32, bg: '#111d' });
    sadFace(ax + 205, ay - 72, 30, 0.2);
    // title
    title([['YA TÜRKİYE', 118, '#fff'], ['BİR ADA', 168, '#ffd166'], ['OLSAYDI?', 118, '#fff']], 0, 99, 5, 610);
    // episode badge (inside the 4:5 grid crop)
    ctx.save(); font(900, 40);
    const txt = 'YA OLSAYDI?', w = ctx.measureText(txt).width;
    const bx = (1080 - (w + 140)) / 2, by = 285;
    rr(bx, by, w + 140, 72, 18); ctx.fillStyle = '#ffd166'; ctx.fill();
    ctx.fillStyle = '#111'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText(txt, bx + 24, by + 37);
    rr(bx + w + 40, by + 12, 76, 48, 12); ctx.fillStyle = '#111'; ctx.fill();
    ctx.fillStyle = '#ffd166'; ctx.textAlign = 'center'; ctx.fillText('#1', bx + w + 78, by + 37);
    ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'kapak.png') });
  await b.close();
})();
