// Preview render (no voiceover yet): index2.html + music only. Usage: node render_taslak.js [out.mp4]
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const FPS = 30, DUR = 29.5, OUT = process.argv[2] || 'taslak-cay-bolum2.mp4';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.resolve(__dirname, 'index2.html') + '?render');
  await page.evaluate(() => window.ready);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-i', path.resolve(__dirname, 'audio/music2_taslak.wav'), '-filter_complex', '[1:a]volume=0.6,loudnorm=I=-16:TP=-1.5[a]', '-map', '0:v', '-map', '[a]',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-t', String(DUR), '-movflags', '+faststart', OUT], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < FPS * DUR; i++) {
    const b64 = await page.evaluate(t => { renderAt(t); return document.getElementById('c').toDataURL('image/jpeg', 0.92).split(',')[1]; }, i / FPS);
    if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await browser.close(); console.log('done ->', OUT);
})();
