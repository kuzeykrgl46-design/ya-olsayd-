// Behind-the-scenes story frame for the Kış series (code excerpt + rendered Antalya frame).
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => document.fonts.load('400 30px "DejaVu Sans Mono"'));
  await p.evaluate(async () => {
    // render a clean Antalya frame (no overlays) to crop from
    cam = { lon: 35.35, lat: 39, z: 1 }; ctx.setTransform(1, 0, 0, 1, 0, 0);
    antalyaScene(5.6);
    const shot = new Image(); shot.src = cv.toDataURL('image/png'); await shot.decode();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#0b1620'; ctx.fillRect(0, 0, W, H);
    mapSnowfall(3, 90);
    pill('🎬 KAMERA ARKASI', W / 2, 300, { size: 40, bg: '#bde0fe', fg: '#111' });
    // editor window
    rr(60, 370, 960, 560, 24); ctx.fillStyle = '#1e1e2e'; ctx.fill();
    ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => { ctx.beginPath(); ctx.arc(100 + i * 32, 405, 10, 0, 7); ctx.fillStyle = c; ctx.fill(); });
    ctx.font = '400 22px "DejaVu Sans Mono"'; ctx.fillStyle = '#8b8fa3'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('antalya-kis.js', 210, 406);
    const C = { k: '#c678dd', f: '#61afef', s: '#98c379', n: '#d19a66', c: '#7f848e', t: '#e6e6e6' };
    const lines = [
      [['function ', 'k'], ['kizakStandi', 'f'], ['() {', 't']],
      [['  // eski tabelanın üstünü çiz', 'c']],
      [['  ', 't'], ['tabela', 'f'], ['(', 't'], ["'ŞEZLONG + ŞEMSİYE'", 's'], [');', 't']],
      [['  ', 't'], ['carpi', 'f'], ['(', 't'], ["'#e63946'", 's'], [');', 't']],
      [['  ', 't'], ['tabela', 'f'], ['(', 't'], ["'KIZAK KİRALIK'", 's'], [');', 't']],
      [['}', 't']],
      [['function ', 'k'], ['turist', 'f'], ['() {', 't']],
      [['  ', 't'], ['gomlek', 'f'], ['(', 't'], ["'Hawaii'", 's'], [', ', 't'], ["'#ff6b6b'", 's'], [');', 't']],
      [['  ', 't'], ['sort', 'f'], ['(); ', 't'], ['terlik', 'f'], ['(); ', 't'], ['gozluk', 'f'], ['();', 't']],
      [['  ', 't'], ['titre', 'f'], ['(', 't'], ['60', 'n'], [');  ', 't'], ['// soğuktan', 'c']],
      [['}', 't']],
    ];
    ctx.font = '400 28px "DejaVu Sans Mono"';
    lines.forEach((ln, i) => {
      let x = 100; const y = 470 + i * 40;
      ctx.fillStyle = '#4b5263'; ctx.textAlign = 'right'; ctx.fillText(String(i + 1), 84, y); ctx.textAlign = 'left';
      ln.forEach(([txt, c]) => { ctx.fillStyle = C[c]; ctx.fillText(txt, x, y); x += ctx.measureText(txt).width; });
    });
    ctx.fillStyle = '#bde0fe'; ctx.beginPath(); ctx.moveTo(W / 2 - 40, 950); ctx.lineTo(W / 2 + 40, 950); ctx.lineTo(W / 2, 1000); ctx.closePath(); ctx.fill();
    // crop of the Antalya frame around the kiosk and the tourists
    ctx.save(); rr(160, 1020, 760, 420, 24); ctx.clip();
    ctx.drawImage(shot, 40, 880, 960, 530, 160, 1020, 760, 420);
    ctx.restore();
    rr(160, 1020, 760, 420, 24); ctx.strokeStyle = '#bde0fe'; ctx.lineWidth = 6; ctx.stroke();
    ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; font(900, 46);
    ctx.fillText('Kızak, tabela, titreyen turist...', W / 2, 1505); ctx.fillStyle = '#bde0fe'; ctx.fillText('hepsi kodla çizildi.', W / 2, 1565);
  });
  await p.locator('canvas').screenshot({ path: path.resolve(__dirname, 'hikaye', 'kamera-arkasi-kis.png') });
  await b.close();
})();
