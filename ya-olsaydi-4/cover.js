// Reels cover for Episode 4 (1080x1920), reusing the drawing code in index.html.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => {
    const z = 0.96;
    cam = { lon: 35.4, lat: 39 + 330 / (66 * z), z };
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawSea(10); drawMap(10, { island: true });
    { const [x, y] = P(32.86, 39.93); protester(x, y + 30, .8, 0.3); }
    ctx.save(); ctx.translate(540, 1420); ctx.scale(.75, .75);
    ctx.fillStyle = '#4cc9f0'; ctx.beginPath(); ctx.ellipse(0, 0, 300, 90, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#90e0ef'; ctx.beginPath(); ctx.ellipse(0, -10, 250, 62, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#264653'; rr(-40, -110, 80, 90, 20); ctx.fill();
    ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -140, 34, 0, 7); ctx.fill();
    ctx.fillStyle = '#111'; rr(-28, -152, 24, 14, 5); ctx.fill(); rr(4, -152, 24, 14, 5); ctx.fill(); ctx.fillRect(-4, -148, 8, 4);
    ctx.strokeStyle = '#333'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, -126, 12, .2, Math.PI - .2); ctx.stroke();
    ctx.restore();
    title([['ANKARA DENİZE', 104, '#fff'], ['KAVUŞTU MU?', 120, '#ffd166']], 0, 99, 5, 600);
    ctx.save(); font(900, 40);
    const txt = 'YA OLSAYDI? #1', w = ctx.measureText(txt).width;
    font(900, 40); const b2 = ctx.measureText('FİNAL').width + 40;
    const total = w + 48 + 16 + b2, bx = (1080 - total) / 2, by = 300;
    rr(bx, by, w + 48, 72, 18); ctx.fillStyle = '#ffd166'; ctx.fill();
    ctx.fillStyle = '#111'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText(txt, bx + 24, by + 37);
    rr(bx + w + 64, by, b2, 72, 18); ctx.fillStyle = '#e63946'; ctx.fill();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('FİNAL', bx + w + 64 + b2 / 2, by + 37);
    ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'kapak-bolum4-final.png') });
  await b.close();
})();
