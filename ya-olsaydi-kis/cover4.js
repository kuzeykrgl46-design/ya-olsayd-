// Reels cover for Ya Olsaydı #2 · Kış Bölüm 4 (final) (1080x1920)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index4.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => {
    cam = { lon: 35.35, lat: 39 + 380 / 66, z: 1.0 };
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawSea(2); drawMapKis(2, 1); mapSnowfall(2, 140);
    [KRS, SIV, BUR].forEach(ll => { const [x, y] = P(...ll); ctx.beginPath(); ctx.arc(x, y, 14, 0, 7); ctx.fillStyle = '#e63946'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = '#fff'; ctx.stroke(); });
    ctx.save(); ctx.translate(200, 1500); ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.arc(0, 0, 90, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 72, 0, 7); ctx.fill();
    ctx.strokeStyle = '#111'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -50); ctx.moveTo(0, 0); ctx.lineTo(34, 12); ctx.stroke();
    ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.arc(-62, -78, 24, 0, 7); ctx.arc(62, -78, 24, 0, 7); ctx.fill(); ctx.restore();
    T = 2; snowman(900, 1650, 1.1);
    title([['KIŞ HİÇ BİTMESE', 96, '#fff'], ['SIRADAN', 112, '#fff'], ['BİR GÜN ⏰', 120, '#bde0fe']], 0, 99, 5, 600);
    ctx.save(); font(900, 40);
    const txt = 'YA OLSAYDI? #2 · FİNAL', w = ctx.measureText(txt).width + 48, bx = (1080 - w) / 2;
    rr(bx, 300, w, 72, 18); ctx.fillStyle = '#bde0fe'; ctx.fill();
    ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 540, 337);
    ctx.restore();
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'kapak-kis-bolum4-final.png') });
  await b.close();
})();
