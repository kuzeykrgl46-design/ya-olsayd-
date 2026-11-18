// Story frame 2: thank the viewer whose comment became the episode.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(async (files) => {
    const load = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = 'file://' + src; });
    const [com, cover] = await Promise.all([load(files[0]), load(files[1])]);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#16324f'); g.addColorStop(1, '#0a1a2b');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    mapSnowfall(5, 160);
    title([['BU BÖLÜMÜN FİKRİ', 64, '#fff'], ['YORUMLARDAN GELDİ', 64, '#bde0fe']], 0, 99, 5, 340);
    // comment card
    const cw = 980, ch = com.height * cw / com.width, cx = (W - cw) / 2, cy = 470;
    ctx.save(); ctx.shadowColor = '#0008'; ctx.shadowBlur = 30; rr(cx - 10, cy - 18, cw + 20, ch + 36, 28); ctx.fillStyle = '#fff'; ctx.fill(); ctx.restore();
    ctx.save(); rr(cx, cy - 8, cw, ch + 16, 22); ctx.clip(); ctx.drawImage(com, cx, cy, cw, ch); ctx.restore();
    // arrow
    const ay = cy + ch + 60;
    ctx.fillStyle = '#bde0fe'; ctx.beginPath(); ctx.moveTo(W / 2 - 40, ay); ctx.lineTo(W / 2 + 40, ay); ctx.lineTo(W / 2, ay + 55); ctx.closePath(); ctx.fill();
    // video cover thumbnail
    const tw = 330, th = tw * 16 / 9, tx = (W - tw) / 2, ty = ay + 85;
    ctx.save(); ctx.shadowColor = '#0009'; ctx.shadowBlur = 30; rr(tx, ty, tw, th, 24); ctx.fillStyle = '#000'; ctx.fill(); ctx.restore();
    ctx.save(); rr(tx, ty, tw, th, 24); ctx.clip(); ctx.drawImage(cover, tx, ty, tw, th); ctx.restore();
    rr(tx, ty, tw, th, 24); ctx.lineWidth = 6; ctx.strokeStyle = '#bde0fe'; ctx.stroke();
    // play icon
    ctx.beginPath(); ctx.arc(W / 2, ty + th / 2, 48, 0, 7); ctx.fillStyle = '#000a'; ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(W / 2 - 14, ty + th / 2 - 24); ctx.lineTo(W / 2 + 26, ty + th / 2); ctx.lineTo(W / 2 - 14, ty + th / 2 + 24); ctx.closePath(); ctx.fill();
    title([['VİDEO OLDU! TEŞEKKÜRLER', 52, '#ffd166']], 0, 99, 5, ty + th + 70);
  }, [path.resolve(__dirname, 'hikaye', '_yorum.png'), path.resolve(__dirname, 'kapak-kis-bolum1.png')]);
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'hikaye', '2-fikir-tesekkur.png') });
  await b.close();
})();
