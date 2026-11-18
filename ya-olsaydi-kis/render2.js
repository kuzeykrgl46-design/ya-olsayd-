// Renders index2.html (Kış Bölüm 2) frame-by-frame into a 1080x1920 30fps MP4 with voice (audio/take2.mp3) + music (audio/music2.wav).
// Usage: python3 music_kis2.py audio/music2.wav && node render2.js [out.mp4]
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const FPS = 30, DUR = 40, OUT = process.argv[2] || 'ya-olsaydi-2-kis-bolum2.mp4';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.resolve(__dirname, 'index2.html') + '?render');
  await page.evaluate(() => window.ready);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-i', path.resolve(__dirname, 'audio/take2.mp3'), '-i', path.resolve(__dirname, 'audio/music2.wav'),
    '-filter_complex', '[1:a]adelay=300|300,aformat=channel_layouts=stereo,asplit[v][sc];[2:a]volume=0.30[m];[m][sc]sidechaincompress=threshold=0.05:ratio=4:attack=20:release=300[md];[v][md]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]',
    '-map', '0:v', '-map', '[a]',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '192k', '-t', String(DUR), '-movflags', '+faststart', OUT], { stdio: ['pipe', 'inherit', 'inherit'] });
  const N = FPS * DUR;
  for (let i = 0; i < N; i++) {
    const b64 = await page.evaluate(t => { renderAt(t); return document.getElementById('c').toDataURL('image/jpeg', 0.93).split(',')[1]; }, i / FPS);
    if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 150 === 0) console.log(`frame ${i}/${N}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  console.log('done ->', OUT);
})();
