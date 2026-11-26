// Short clip #1 from Çay Bölüm 1: the "no tea, no bride" moment with a hook title + an end card pointing to the full episode.
// Usage: node kisa/kisa1.js   -> kisa/kisa1-kiz-isteme.mp4 (voice + music taken from the v2 episode audio)
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const path = require('path');
const D = path.resolve(__dirname, '..'), FPS = 30, A = 15.62, B = 19.5, END = 1.8, OUT = path.resolve(__dirname, 'kisa1-kiz-isteme.mp4');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.join(D, 'index1.html') + '?render');
  await page.evaluate(() => window.ready);
  await page.evaluate(({ A, B }) => {
    const orig = window.title;
    window.title = (lines, a, b, t, y) => (lines[0][0] === 'KIZ İSTEME')
      ? orig([['KIZ İSTEMEYE', 92, '#fff'], ['ÇAYSIZ GİDİLİR Mİ? 😬', 78, GOLD]], A - 1, B + 1, t, 380) : orig(lines, a, b, t, y);
    window.endCard = u => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const g = ctx.createRadialGradient(540, 900, 100, 540, 900, 1100); g.addColorStop(0, '#7c2d12'); g.addColorStop(1, '#1c0a05'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      dust(u, 40, '255,200,150');
      teaGlass(540, 1060, 2.6, 0, true);
      title([['TAM BÖLÜM', 110, '#fff'], ['PROFİLDE 👆', 110, GOLD]], -1, 99, u, 520);
      pill('YA OLSAYDI? #4 · ÇAY BİTSEYDİ ☕', 540, 1450, { size: 40, bg: GOLD, fg: '#111' });
      badge();
    };
  }, { A, B });
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-ss', String(A), '-t', String(B - A), '-i', path.join(D, 'ya-olsaydi-4-cay-bolum1-v2.mp4'),
    '-ss', String(B), '-t', String(END), '-i', path.join(D, 'audio/music1.wav'),
    '-filter_complex', `[1:a]afade=t=out:st=${(B - A - .12).toFixed(2)}:d=0.12[v];[2:a]volume=0.5,afade=t=in:d=0.15,afade=t=out:st=${(END - .6).toFixed(2)}:d=0.6,aformat=sample_rates=48000:channel_layouts=stereo[m];[v]aformat=sample_rates=48000:channel_layouts=stereo[v2];[v2][m]concat=n=2:v=0:a=1,loudnorm=I=-14:TP=-1.5[a]`,
    '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', OUT], { stdio: ['pipe', 'inherit', 'inherit'] });
  const N1 = Math.round((B - A) * FPS), N2 = Math.round(END * FPS);
  for (let i = 0; i < N1 + N2; i++) {
    const b64 = await page.evaluate(([i, N1, A, FPS]) => { if (i < N1) renderAt(A + i / FPS); else endCard((i - N1) / FPS); return document.getElementById('c').toDataURL('image/jpeg', .93).split(',')[1]; }, [i, N1, A, FPS]);
    if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await browser.close(); console.log('done ->', OUT);
})();
