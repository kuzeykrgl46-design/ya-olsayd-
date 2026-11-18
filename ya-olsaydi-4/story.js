// Story frames (1080x1920) for the finale. Text stays inside y 250-1600.
const { chromium } = require('playwright');
const path = require('path');
const out = f => path.resolve(__dirname, 'hikaye', f);
const covers = ['/home/user/ya-olsaydi-1/kapak.png', '/home/user/ya-olsaydi-2/kapak-bolum2.png',
                '/home/user/ya-olsaydi-3/kapak-bolum3.png', '/home/user/ya-olsaydi-4/kapak-bolum4-final.png'];
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index.html') + '?render');
  await p.evaluate(() => window.ready);

  // ---------- frame 3: thank-you collage of the four covers ----------
  await p.evaluate(async (covers) => {
    const imgs = await Promise.all(covers.map(src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = 'file://' + src; })));
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawSea(4);
    title([['ADA TÜRKİYE', 70, '#fff'], ['4 BÖLÜM · 1 DENİZ', 58, '#ffd166']], 0, 99, 5, 340);
    const w = 300, h = 533, gx = 40, x0 = (W - (2 * w + gx)) / 2, y0 = 450;
    imgs.forEach((im, i) => {
      const x = x0 + (i % 2) * (w + gx), y = y0 + Math.floor(i / 2) * (h + 30);
      ctx.save(); rr(x, y, w, h, 22); ctx.clip(); ctx.drawImage(im, x, y, w, h); ctx.restore();
      rr(x, y, w, h, 22); ctx.lineWidth = 5; ctx.strokeStyle = i === 3 ? '#e63946' : '#ffffff55'; ctx.stroke();
      ctx.beginPath(); ctx.arc(x + 34, y + 34, 26, 0, 7); ctx.fillStyle = i === 3 ? '#e63946' : '#ffd166'; ctx.fill();
      ctx.fillStyle = i === 3 ? '#fff' : '#111'; font(900, 30); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String(i + 1), x + 34, y + 36);
    });
    font(800, 34); ctx.fillStyle = '#ffffffcc'; ctx.textAlign = 'center'; ctx.fillText('(deniz şişme ama sayılır)', W / 2, 1565);
  }, covers);
  await p.locator('canvas').screenshot({ path: out('3-tesekkur.png') });

  // ---------- frame 4: background for the poll sticker ----------
  await p.evaluate(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawSea(8);
    title([['SIRADAKİ', 76, '#fff'], ['"YA OLSAYDI?"', 92, '#ffd166'], ['NE OLSUN?', 76, '#fff']], 0, 99, 5, 420);
    // decorative icons around the edges, centre left free for the sticker
    font(400, 120); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    [['☕', 150, 760, -.2], ['🌐', 930, 900, .15], ['❄️', 160, 1380, .1], ['❓', 920, 1460, .2]].forEach(([e, x, y, r]) => { ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.globalAlpha = .85; ctx.fillText(e, 0, 0); ctx.restore(); });
  });
  await p.locator('canvas').screenshot({ path: out('4-anket-arkaplan.png') });

  // ---------- frame 5: close ----------
  await p.evaluate(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawSea(12);
    title([['KAZANAN KONU', 80, '#fff'], ['YENİ SERİNİN', 80, '#fff'], ['İLK BÖLÜMÜ', 100, '#ffd166'], ['OLACAK', 100, '#ffd166']], 0, 99, 5, 700);
    ctx.save(); ctx.translate(540, 1240); ctx.scale(.8, .8);
    ctx.fillStyle = '#4cc9f0'; ctx.beginPath(); ctx.ellipse(0, 0, 300, 90, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#90e0ef'; ctx.beginPath(); ctx.ellipse(0, -10, 250, 62, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#264653'; rr(-40, -110, 80, 90, 20); ctx.fill();
    ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -140, 34, 0, 7); ctx.fill();
    ctx.fillStyle = '#111'; rr(-28, -152, 24, 14, 5); ctx.fill(); rr(4, -152, 24, 14, 5); ctx.fill(); ctx.fillRect(-4, -148, 8, 4);
    ctx.strokeStyle = '#333'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, -126, 12, .2, Math.PI - .2); ctx.stroke();
    ctx.restore();
    font(800, 46); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('Sonuç yarın 👀', W / 2, 1450);
  });
  await p.locator('canvas').screenshot({ path: out('5-kapanis.png') });
  await b.close();
})();
