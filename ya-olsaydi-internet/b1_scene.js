// ===== Ya Olsaydı? #3 · Maçta İnternet Kesilseydi · Bölüm 1 =====
// Dünya Kupası finali, son dakika penaltı... ve internet bütün dünyada kesiliyor.
// TL holds scene boundaries (video time). Until the voiceover exists these are estimates; timeline.js overrides them.
let T = 0;
const TL = window.TL || {
  hook: [0, 4], freeze: 2.9, modem: [4, 8], kumanda: [8, 12], soru: [12, 16], balkon: [16, 22], kanka: 18.5, gol: [22, 28], kim: 24.5, dur: 28,
};
const SUBS = window.SUBS_DATA || [];

// series badge (overrides the Kış one)
function badge() {
  ctx.save(); font(900, 34); const txt = 'YA OLSAYDI?', w = ctx.measureText(txt).width;
  rr(56, 150, w + 120, 64, 16); ctx.fillStyle = '#ffd166'; ctx.fill();
  ctx.fillStyle = '#111'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText(txt, 78, 183);
  rr(78 + w + 14, 162, 54, 40, 10); ctx.fillStyle = '#111'; ctx.fill(); ctx.fillStyle = '#ffd166'; ctx.textAlign = 'center'; ctx.fillText('#3', 78 + w + 41, 183);
  const bx = 56 + w + 136; font(900, 30); const label = 'İNTERNET KESİLSEYDİ', bw = ctx.measureText(label).width + 36;
  rr(bx, 156, bw, 52, 14); ctx.fillStyle = '#1d3557'; ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillText(label, bx + bw / 2, 183);
  ctx.restore();
}
function sceneSlide(t, t0, fn) { const p = easeOut(clamp((t - t0) / .35)); ctx.save(); ctx.translate((1 - p) * W, 0); fn(); ctx.restore(); }
function spinner(x, y, r, t) {
  ctx.save(); ctx.translate(x, y); ctx.lineCap = 'round';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + Math.floor(t * 12) / 12 * Math.PI * 2; ctx.strokeStyle = `rgba(255,255,255,${(i + 1) / 12})`; ctx.lineWidth = r * .18; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r * .55, Math.sin(a) * r * .55); ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); ctx.stroke(); }
  ctx.restore();
}

// ---------- the broadcast: penalty in the World Cup final ----------
function pitch(x, y, w, h, t, frozen) {
  ctx.save(); ctx.translate(x, y); rr(0, 0, w, h, 10); ctx.clip();
  for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? '#2d6a4f' : '#40916c'; ctx.fillRect(i * w / 8, 0, w / 8, h); }
  ctx.strokeStyle = '#ffffffcc'; ctx.lineWidth = 4;
  ctx.strokeRect(w * .25, -4, w * .5, h * .42); ctx.strokeRect(w * .38, -4, w * .24, h * .16);
  ctx.beginPath(); ctx.arc(w * .5, h * .42, w * .12, .2, Math.PI - .2); ctx.stroke();
  // goal + keeper
  ctx.fillStyle = '#fff'; ctx.fillRect(w * .4, 0, w * .2, 8); ctx.fillRect(w * .4, 0, 6, h * .08); ctx.fillRect(w * .6 - 6, 0, 6, h * .08);
  const kx = w * .5 + (frozen ? 0 : Math.sin(t * 5) * w * .05);
  ctx.fillStyle = '#ffbe0b'; rr(kx - 14, h * .06, 28, 34, 8); ctx.fill(); ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(kx, h * .05, 10, 0, 7); ctx.fill();
  ctx.strokeStyle = '#ffbe0b'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(kx - 12, h * .08); ctx.lineTo(kx - 32, h * .02); ctx.moveTo(kx + 12, h * .08); ctx.lineTo(kx + 32, h * .02); ctx.stroke();
  // kicker and ball on the spot
  const run = frozen ? 1 : clamp(t / 2.6);
  const px = lerp(w * .36, w * .46, run), py = lerp(h * .62, h * .36, run);
  ctx.fillStyle = '#e63946'; rr(px - 16, py - 10, 32, 40, 8); ctx.fill(); ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(px, py - 20, 12, 0, 7); ctx.fill();
  ctx.strokeStyle = '#222'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(px - 6, py + 28); ctx.lineTo(px - 10, py + 50); ctx.moveTo(px + 6, py + 28); ctx.lineTo(px + 22, py + 40); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(w * .5, h * .3, 9, 0, 7); ctx.fill(); ctx.strokeStyle = '#111'; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore();
}
function scoreBug(x, y) {
  ctx.save(); ctx.translate(x, y);
  rr(0, 0, 330, 54, 10); ctx.fillStyle = '#111d'; ctx.fill();
  ctx.fillStyle = '#e63946'; rr(8, 8, 70, 38, 6); ctx.fill(); ctx.fillStyle = '#fff'; font(900, 22); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('FİNAL', 43, 28);
  font(900, 28); ctx.fillText('1 - 1', 150, 28); ctx.fillStyle = '#ffd166'; ctx.fillText("90+3'", 262, 28);
  ctx.restore();
}
function tvSet(cx, cy, w, h, t, frozen) {
  ctx.fillStyle = '#111'; rr(cx - w / 2 - 22, cy - h / 2 - 22, w + 44, h + 44, 24); ctx.fill();
  ctx.fillStyle = '#222'; ctx.fillRect(cx - 40, cy + h / 2 + 22, 80, 40); rr(cx - 140, cy + h / 2 + 58, 280, 18, 8); ctx.fill();
  pitch(cx - w / 2, cy - h / 2, w, h, t, frozen);
  scoreBug(cx - w / 2 + 16, cy - h / 2 + 16);
  if (frozen) {
    ctx.fillStyle = '#000a'; rr(cx - w / 2, cy - h / 2, w, h, 10); ctx.fill();
    spinner(cx, cy - 40, 44, t);
    ctx.fillStyle = '#fff'; font(900, 40); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('📵 BAĞLANTI YOK', cx, cy + 50);
  } else {
    ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.arc(cx + w / 2 - 110, cy - h / 2 + 43, 8, 0, 7); ctx.fill();
    ctx.fillStyle = '#fff'; font(900, 26); ctx.textAlign = 'left'; ctx.fillText('CANLI', cx + w / 2 - 94, cy - h / 2 + 44);
  }
}
function hookScene(t) {
  ctx.fillStyle = '#2b2d42'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#3d405b'; ctx.fillRect(0, 1240, W, H - 1240);
  const frozen = t >= TL.freeze;
  // zoom into the TV as the penalty approaches
  const z = lerp(1, 1.08, clamp(t / TL.freeze));
  ctx.save(); ctx.translate(540, 860); ctx.scale(z, z); ctx.translate(-540, -860);
  tvSet(540, 860, 900, 540, t, frozen);
  ctx.restore();
  // shocked silhouettes on the sofa
  ctx.fillStyle = '#6d597a'; rr(140, 1190, 800, 140, 40); ctx.fill();
  [[300, '#264653'], [540, '#9b2226'], [780, '#ffb703']].forEach(([x, c], i) => {
    ctx.fillStyle = c; rr(x - 50, 1110, 100, 110, 30); ctx.fill();
    ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(x, 1080, 42, 0, 7); ctx.fill();
    if (frozen) { ctx.fillStyle = '#111'; ctx.beginPath(); ctx.ellipse(x, 1098, 10, 14, 0, 0, 7); ctx.fill(); } // open mouth
  });
}

// ---------- everyone restarts the modem ----------
function modemIcon(x, y, s, t, i) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#f8f9fa'; rr(-40, -16, 80, 32, 8); ctx.fill();
  ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-26, -16); ctx.lineTo(-32, -44); ctx.moveTo(26, -16); ctx.lineTo(32, -44); ctx.stroke();
  for (let k = 0; k < 4; k++) { const on = Math.floor(t * 6 + i + k) % 3 !== 0; ctx.fillStyle = k === 3 ? '#e63946' : on ? '#06d6a0' : '#495057'; ctx.beginPath(); ctx.arc(-24 + k * 16, 2, 4.5, 0, 7); ctx.fill(); }
  ctx.restore();
}
function modemScene(t) {
  ctx.fillStyle = '#14213d'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 40; i++) { ctx.fillStyle = '#ffffff66'; ctx.beginPath(); ctx.arc(rnd(i) * W, rnd(i + 3) * 480, 2, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#495057'; ctx.fillRect(120, 470, 840, 900); ctx.fillStyle = '#343a40'; ctx.fillRect(100, 450, 880, 30);
  let i = 0;
  for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) {
    const x = 170 + c * 200, y = 520 + r * 165;
    ctx.fillStyle = '#ffd166'; ctx.fillRect(x, y, 140, 120);
    ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(x + 30, y + 60, 22, 0, 7); ctx.fill(); ctx.fillStyle = '#264653'; rr(x + 10, y + 82, 40, 38, 10); ctx.fill();
    modemIcon(x + 88, y + 78, .95, t, i); i++;
  }
  ctx.fillStyle = '#3d405b'; ctx.fillRect(0, 1370, W, H - 1370);
  const p = (t * .55) % 1;
  ctx.save(); ctx.translate(540, 1230); rr(-300, -50, 600, 100, 22); ctx.fillStyle = '#111d'; ctx.fill();
  ctx.fillStyle = '#fff'; font(800, 32); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('🔄 Modem yeniden başlatılıyor...', 0, -14);
  rr(-250, 14, 500, 16, 8); ctx.fillStyle = '#495057'; ctx.fill(); rr(-250, 14, 500 * p, 16, 8); ctx.fillStyle = '#06d6a0'; ctx.fill(); ctx.restore();
}

// ---------- dad hits the remote ----------
function remoteDad(x, y, s, t) {
  const hit = Math.abs(Math.sin(t * 9));
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#2b2d42'; ctx.fillRect(-20, 40, 16, 70); ctx.fillRect(4, 40, 16, 70);
  ctx.fillStyle = '#457b9d'; rr(-34, -36, 68, 86, 16); ctx.fill();
  ctx.strokeStyle = '#457b9d'; ctx.lineWidth = 15; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-26, -24); ctx.lineTo(-40, 12); ctx.lineTo(4, 14); ctx.stroke(); // palm arm
  ctx.save(); ctx.translate(26, -24); ctx.rotate(-1.9 + hit * 1.1); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 46); ctx.stroke();
  ctx.fillStyle = '#212529'; rr(-9, 40, 18, 52, 6); ctx.fill(); ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.arc(0, 50, 4, 0, 7); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -64, 28, 0, 7); ctx.fill();
  ctx.fillStyle = '#ccc'; ctx.beginPath(); ctx.arc(0, -78, 28, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#555'; rr(-17, -54, 34, 7, 3); ctx.fill();
  ctx.strokeStyle = '#222'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-19, -76); ctx.lineTo(-5, -70); ctx.moveTo(19, -76); ctx.lineTo(5, -70); ctx.stroke();
  ctx.restore();
  ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 6; ctx.lineCap = 'round';
  if (hit > .7) [[-1, -1], [1, -1], [1.3, .2]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(x + 10 * s + dx * 40, y + dy * 40); ctx.lineTo(x + 10 * s + dx * 75, y + dy * 75); ctx.stroke(); });
}
function kumandaScene(t) {
  ctx.fillStyle = '#2b2d42'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#3d405b'; ctx.fillRect(0, 1240, W, H - 1240);
  tvSet(560, 700, 640, 380, t, true);
  remoteDad(540, 1120, 1.7, t);
}

// ---------- the comment question ----------
function soruScene(t) {
  ctx.fillStyle = '#2b2d42'; ctx.fillRect(0, 0, W, H);
  tvSet(540, 860, 900, 540, t, true);
  ctx.fillStyle = '#000b'; ctx.fillRect(0, 0, W, H);
  const p = backOut(clamp((t - TL.soru[0] - .15) / .4));
  ctx.save(); ctx.translate(540, 900); ctx.scale(p, p);
  rr(-420, -230, 840, 460, 36); ctx.fillStyle = '#fff'; ctx.fill();
  ctx.fillStyle = '#111'; font(900, 120); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('💬', 0, -110);
  font(900, 66); ctx.fillText('SEN O AN', 0, 10); ctx.fillStyle = '#e63946'; ctx.fillText('NE YAPIYORSUN?', 0, 90);
  ctx.fillStyle = '#6c757d'; font(800, 36); ctx.fillText('Yorumlara yaz 👇', 0, 170);
  ctx.restore();
}

// ---------- the whole street on the balconies ----------
function listener(x, y, s, col, t, i) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(t * 2 + i) * .05);
  ctx.fillStyle = col; rr(-24, -20, 48, 60, 12); ctx.fill();
  ctx.fillStyle = '#f1c27d'; ctx.beginPath(); ctx.arc(0, -40, 20, 0, 7); ctx.fill();
  ctx.strokeStyle = col; ctx.lineWidth = 11; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(18, -12); ctx.lineTo(30, -40); ctx.lineTo(20, -44); ctx.stroke(); // hand cupped to ear
  ctx.restore();
}
function balcony(x, y, w, t, k, people) {
  ctx.fillStyle = '#ffd166'; ctx.fillRect(x + 20, y - 150, w - 40, 150);
  people.forEach(([px, c], i) => listener(x + px, y - 30, 1.45, c, t, k * 3 + i));
  ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 6; ctx.strokeRect(x, y - 40, w, 44);
  for (let i = 1; i < 8; i++) { ctx.beginPath(); ctx.moveTo(x + i * w / 8, y - 40); ctx.lineTo(x + i * w / 8, y + 4); ctx.stroke(); }
  ctx.fillStyle = '#6c757d'; ctx.fillRect(x - 10, y + 4, w + 20, 14);
}
function balkonScene(t, shout) {
  ctx.fillStyle = '#0d1b2a'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(880, 520, 46, 0, 7); ctx.fill(); ctx.fillStyle = '#0d1b2a'; ctx.beginPath(); ctx.arc(900, 506, 42, 0, 7); ctx.fill(); // moon
  ctx.fillStyle = '#415a77'; ctx.fillRect(60, 560, 440, 900); ctx.fillStyle = '#4f6d8f'; ctx.fillRect(580, 620, 440, 840);
  const cols = ['#e63946', '#2a9d8f', '#ffb703', '#8338ec', '#3a86ff', '#fb5607'];
  [[80, 760], [80, 1000], [80, 1240]].forEach(([x, y], k) => balcony(x, y, 400, t, k, [[120, cols[k]], [270, cols[k + 2]]]));
  [[600, 820], [600, 1060], [600, 1300]].forEach(([x, y], k) => balcony(x, y, 400, t, k + 3, [[110, cols[(k + 3) % 6]], [270, cols[(k + 1) % 6]]]));
  ctx.fillStyle = '#1b263b'; ctx.fillRect(0, 1460, W, H - 1460);
  if (shout) {
    const p = clamp((t - TL.gol[0]) / .3);
    ctx.save(); ctx.translate(780, 640); ctx.scale(lerp(.3, 1, backOut(p)), lerp(.3, 1, backOut(p))); ctx.rotate(-.08);
    ctx.fillStyle = '#ffd166'; ctx.beginPath(); for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, r = i % 2 ? 150 : 210; ctx.lineTo(Math.cos(a) * r * 1.5, Math.sin(a) * r * .7); } ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#e63946'; font(900, 92); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('GOOOL!', 0, 4);
    ctx.restore();
    // everyone else turns with a question mark
    font(900, 60); ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
    [[200, 690], [350, 930], [200, 1170], [710, 990], [870, 1230]].forEach(([x, y], i) => { const a = clamp((t - TL.gol[0] - .4 - i * .1) / .2); ctx.globalAlpha = a; ctx.fillText('?', x, y - Math.sin(t * 6 + i) * 6); });
    ctx.globalAlpha = 1;
  }
}

// ---------- render ----------
function render(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const inR = r => t >= r[0] - .05 && t < r[1] + .3;
  if (t < TL.hook[1] + .3) { hookScene(t); title([['DÜNYA KUPASI', 76, '#fff'], ['FİNALİ ⚽', 96, '#ffd166']], .1, TL.freeze, t, 380); }
  if (inR(TL.modem)) { sceneSlide(t, TL.modem[0], () => modemScene(t)); title([['HERKES', 80, '#fff'], ['AYNI ANDA', 96, '#06d6a0']], TL.modem[0] + .1, TL.modem[1], t, 360); }
  if (inR(TL.kumanda)) { sceneSlide(t, TL.kumanda[0], () => kumandaScene(t)); title([['BABALAR', 104, '#fff']], TL.kumanda[0] + .1, TL.kumanda[1], t, 360); pill('📺 KUMANDA SUÇLU', 540, 1590, { size: 44, bg: '#e63946', fg: '#fff', alpha: clamp((t - TL.kumanda[0] - .8) / .25) }); }
  if (inR(TL.soru)) sceneSlide(t, TL.soru[0], () => soruScene(t));
  if (t >= TL.balkon[0] - .05) {
    sceneSlide(t, TL.balkon[0], () => balkonScene(t, t >= TL.gol[0]));
    if (t < TL.gol[0]) { title([['BÜTÜN MAHALLE', 76, '#fff'], ['BALKONDA 👂', 90, '#ffd166']], TL.balkon[0] + .1, TL.gol[0], t, 360); sendPrompt('Kankana gönder', 1620, vis(t, TL.kanka, TL.gol[0], .25, .2)); }
    else if (t >= TL.kim) { title([['AMA', 70, '#fff'], ['KİM ATTI?', 120, '#ffd166']], TL.kim, 99, t, 380); pill("⚽ BÖLÜM 2'DE", 540, 1600, { size: 48, bg: '#ffd166', fg: '#111', alpha: clamp((t - TL.kim - .3) / .25) }); }
  }
  subtitles(t);
  badge();
  if (t < .12) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .12})`; ctx.fillRect(0, 0, W, H); }
}
