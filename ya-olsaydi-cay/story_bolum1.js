// Story frames (1080x1920) for Çay Bitseydi Bölüm 1. Text stays inside y 250-1600 (clear of Instagram's UI).
// Usage: node story_bolum1.js   (the clip is cut with ffmpeg, see bottom of file)
const { chromium } = require('playwright');
const path = require('path');
const out = f => path.resolve(__dirname, 'hikaye', f);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'index1.html') + '?render');
  await p.evaluate(() => window.ready);
  await p.evaluate(() => document.fonts.load('400 30px "DejaVu Sans Mono"'));
  await p.evaluate(() => {
    window.bigText = (txt, y, size, col) => { font(900, size); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      ctx.lineWidth = size * .16; ctx.strokeStyle = '#3b1a0a'; ctx.strokeText(txt, W / 2, y); ctx.fillStyle = col; ctx.fillText(txt, W / 2, y); };
    window.chip = (txt, y, bg = GOLD, fg = '#111', size = 38) => { ctx.save(); font(900, size); const w = ctx.measureText(txt).width + 48, bx = (W - w) / 2;
      rr(bx, y - size, w, size * 1.8, 18); ctx.fillStyle = bg; ctx.fill(); ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, W / 2, y - size * .1); ctx.restore(); };
  });

  // ---------- frame 1: new series announcement (space for the link sticker at y ~1450) ----------
  await p.evaluate(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0); const t = 2;
    kitchenBack(t); sunRays(900, 260, t, undefined, .25);
    ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(0, 0, W, H);
    chip('☕ YENİ SERİ BAŞLADI', 330, TEA, '#fff', 42);
    softShadow(() => { bigText('ÇAY', 520, 190, '#fff'); bigText('BİTSEYDİ?', 720, 140, GOLD); }, 30, 'rgba(0,0,0,.35)', 12);
    const hands = person(540, 1500, 2.4, { ...DAD, seated: true, face: 'shock', t: 1.3, shadow: false, look: .8, handsW: [[380, 940], [770, 1120]], handShape: ['spread', 'fist'] }).hands;
    teaGlass(hands[1][0] + 8, hands[1][1] - 34, 1.15, 0, false);
    const tg = ctx.createLinearGradient(0, 1380, 0, H); tg.addColorStop(0, '#fff'); tg.addColorStop(1, '#e2e8f0'); ctx.fillStyle = tg; ctx.fillRect(0, 1380, W, H);
    font(800, 46); ctx.fillStyle = '#3b1a0a'; ctx.textAlign = 'center'; ctx.fillText("Bölüm 1 Reels'te 👇", W / 2, 1470);
  });
  await p.locator('canvas').screenshot({ path: out('c1-1-yeni-seri.png') });

  // ---------- frame 3: behind the scenes (code excerpt + rendered black-market scene) ----------
  await p.evaluate(async () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    karaScene(TL.kara[0] + 2.4);
    const shot = new Image(); shot.src = cv.toDataURL('image/png'); await shot.decode();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3b1a0a'); g.addColorStop(1, '#1c0a05'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    dust(3, 40, '255,200,150');
    chip('🎬 KAMERA ARKASI', 310, GOLD, '#111', 40);
    rr(60, 370, 960, 520, 24); ctx.fillStyle = '#1e1e2e'; ctx.fill();
    ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => { ctx.beginPath(); ctx.arc(100 + i * 32, 405, 10, 0, 7); ctx.fillStyle = c; ctx.fill(); });
    ctx.font = '400 22px "DejaVu Sans Mono"'; ctx.fillStyle = '#8b8fa3'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('karaborsa.js', 210, 406);
    const C = { k: '#c678dd', f: '#61afef', s: '#98c379', n: '#d19a66', c: '#7f848e', t: '#e6e6e6' };
    const lines = [
      [['function ', 'k'], ['karaborsaci', 'f'], ['() {', 't']],
      [['  ', 't'], ['palto', 'f'], ['.', 't'], ['ac', 'f'], ['();  ', 't'], ['// içi poşet dolu', 'c']],
      [['  ', 't'], ['for ', 'k'], ['(', 't'], ['let ', 'k'], ['i', 't'], [' = ', 't'], ['0', 'n'], ['; i < ', 't'], ['6', 'n'], ['; i++)', 't']],
      [['    ', 't'], ['poset', 'f'], ['(', 't'], ["'TAZE RİZE'", 's'], [');', 't']],
      [['  ', 't'], ['gozluk', 'f'], ['.', 't'], ['tak', 'f'], ['(); ', 't'], ['sirit', 'f'], ['();', 't']],
      [['  ', 't'], ['soyle', 'f'], ['(', 't'], ["'Abi gel bak...'", 's'], [');', 't']],
      [['}', 't']],
      [['// ağzı kelimeye göre oynuyor', 'c']],
    ];
    ctx.font = '400 28px "DejaVu Sans Mono"';
    lines.forEach((ln, i) => {
      let x = 100; const y = 470 + i * 44;
      ctx.fillStyle = '#4b5263'; ctx.textAlign = 'right'; ctx.fillText(String(i + 1), 84, y); ctx.textAlign = 'left';
      ln.forEach(([txt, c]) => { ctx.fillStyle = C[c]; ctx.fillText(txt, x, y); x += ctx.measureText(txt).width; });
    });
    ctx.fillStyle = GOLD; ctx.beginPath(); ctx.moveTo(W / 2 - 40, 910); ctx.lineTo(W / 2 + 40, 910); ctx.lineTo(W / 2, 960); ctx.closePath(); ctx.fill();
    ctx.save(); rr(160, 985, 760, 500, 24); ctx.clip(); ctx.drawImage(shot, 80, 520, 960, 632, 160, 985, 760, 500); ctx.restore();
    rr(160, 985, 760, 500, 24); ctx.strokeStyle = GOLD; ctx.lineWidth = 6; ctx.stroke();
    ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; font(900, 46);
    ctx.fillText('Palto, poşetler, gözlük...', W / 2, 1545); ctx.fillStyle = GOLD; ctx.fillText('hepsi kodla çizildi.', W / 2, 1600);
  });
  await p.locator('canvas').screenshot({ path: out('c1-3-kamera-arkasi.png') });

  // ---------- frame 4: background for the poll sticker (centre y 820-1300 left free) ----------
  await p.evaluate(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const g = ctx.createRadialGradient(540, 900, 100, 540, 900, 1100); g.addColorStop(0, '#7c2d12'); g.addColorStop(1, '#1c0a05'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    dust(6, 50, '255,200,150');
    softShadow(() => { bigText('ÇAYSIZ', 400, 120, '#fff'); bigText('KAÇ GÜN', 540, 110, GOLD); bigText('DAYANIRSIN?', 670, 110, GOLD); }, 30, 'rgba(0,0,0,.4)', 12);
    teaGlass(170, 1450, 1.3, 0, true); teaGlass(910, 1450, 1.3, 0, true);
    chip('YA OLSAYDI? #4 · BÖLÜM 1', 1530, GOLD, '#111', 34);
  });
  await p.locator('canvas').screenshot({ path: out('c1-4-anket-arkaplan.png') });

  // ---------- frame 5: close ----------
  await p.evaluate(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0); const t = 2;
    kahvehaneBack(t); ctx.fillStyle = 'rgba(20,10,5,.55)'; ctx.fillRect(0, 0, W, H);
    softShadow(() => { bigText('ÇAYSIZ', 420, 110, '#fff'); bigText('DAYANAMAYACAK', 540, 92, '#fff'); bigText('ARKADAŞINI', 670, 110, GOLD); bigText('ETİKETLE 🏷️', 800, 110, GOLD); }, 30, 'rgba(0,0,0,.4)', 12);
    chairBack(540, 1420, 1.9, '#6b4f3a');
    person(540, 1420, 1.9, { shirt: '#e7e5e4', vest: '#6f4e37', hair: '#d0d0d0', hairStyle: 'grey', mustache: true, hat: 'flatcap', hatColor: '#4a3b35', skin: '#d9a37a', old: true, face: 'sad', t, shadow: false, seated: true, handsW: [[460, 1300], [660, 1150]], handShape: ['open', 'fist'] });
    teaGlass(668, 1110, .7, 0, false);
    chip("⏳ BÖLÜM 2 YAKINDA", 1560, TEA, '#fff', 40);
  });
  await p.locator('canvas').screenshot({ path: out('c1-5-kapanis.png') });
  await b.close();
})();
// frame 2 (clip): ffmpeg -ss 15.4 -t 4.2 -i ya-olsaydi-4-cay-bolum1.mp4 -c:v libx264 -crf 20 -c:a aac hikaye/c1-2-kiz-isteme-klip.mp4
