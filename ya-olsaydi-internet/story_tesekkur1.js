// Story frame: thank the viewer whose comment became the İnternet series.
// Usage: node story_tesekkur1.js <yorum-ekran-goruntusu.png|jpg>
const { chromium } = require('playwright');
const path = require('path');
const shot = path.resolve(process.argv[2] || path.join(__dirname, 'hikaye', '_yorum.png'));
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index1.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(async (files) => {
    const load = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = 'file://' + src; });
    const [com, cover] = await Promise.all([load(files[0]), load(files[1])]);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    livingRoom(4, 'rgba(90,220,140,A)'); ctx.fillStyle = 'rgba(10,15,30,.72)'; ctx.fillRect(0, 0, W, H);
    title([['BU SERİNİN FİKRİ', 64, '#fff'], ['YORUMLARDAN GELDİ 💬', 64, '#ffd166']], 0, 99, 5, 330);
    // comment card (screenshot), height capped
    const cw = 960, chFull = com.height * cw / com.width, ch = Math.min(chFull, 360), cx = (W - cw) / 2, cy = 460;
    softShadow(() => { rr(cx - 10, cy - 18, cw + 20, ch + 36, 28); ctx.fillStyle = '#fff'; ctx.fill(); }, 30, 'rgba(0,0,0,.5)', 10);
    ctx.save(); rr(cx, cy - 8, cw, ch + 16, 22); ctx.clip(); ctx.drawImage(com, 0, 0, com.width, com.width * ch / cw, cx, cy, cw, ch); ctx.restore();
    // arrow
    const ay = cy + ch + 50;
    ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.moveTo(W / 2 - 40, ay); ctx.lineTo(W / 2 + 40, ay); ctx.lineTo(W / 2, ay + 55); ctx.closePath(); ctx.fill();
    // video cover
    const tw = 360, th = tw * 16 / 9, tx = (W - tw) / 2, ty = ay + 80;
    softShadow(() => { rr(tx, ty, tw, th, 24); ctx.fillStyle = '#000'; ctx.fill(); }, 30, 'rgba(0,0,0,.6)', 10);
    ctx.save(); rr(tx, ty, tw, th, 24); ctx.clip(); ctx.drawImage(cover, tx, ty, tw, th); ctx.restore();
    rr(tx, ty, tw, th, 24); ctx.lineWidth = 6; ctx.strokeStyle = '#ffd166'; ctx.stroke();
    ctx.beginPath(); ctx.arc(W / 2, ty + th / 2, 50, 0, 7); ctx.fillStyle = '#000a'; ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(W / 2 - 14, ty + th / 2 - 25); ctx.lineTo(W / 2 + 27, ty + th / 2); ctx.lineTo(W / 2 - 14, ty + th / 2 + 25); ctx.closePath(); ctx.fill();
    title([['YENİ SERİ OLDU! TEŞEKKÜRLER 🙌', 46, '#ffd166']], 0, 99, 5, Math.min(ty + th + 60, 1590));
  }, [shot, path.resolve(__dirname, 'kapak-internet-bolum1.png')]);
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'hikaye', 'tesekkur-bolum1.png') });
  await b.close();
})();
