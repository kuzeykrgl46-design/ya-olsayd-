// Shared drawing helpers for the İnternet series (characters, living room, broadcast, scenes of Bölüm 1).
// Generated from b1_scene.js without its TL/SUBS and render(); episodes define their own.
// ===== Ya Olsaydı? #3 · Maçta İnternet Kesilseydi · Bölüm 1 =====
// Türkiye, Dünya Kupası finalinde. Son dakika penaltı... ve internet bütün dünyada kesiliyor.
// TL holds scene boundaries (video time). Until the voiceover exists these are estimates; timeline.js overrides them.

const TR_RED = '#e30a17';

// ---------- colour + shape helpers ----------
function shade(hex, a) { // a > 0 lightens, a < 0 darkens
  const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const f = v => Math.round(a >= 0 ? v + (255 - v) * a : v * (1 + a));
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}
function softShadow(fn, blur = 30, col = 'rgba(0,0,0,.35)', oy = 12) { ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = blur; ctx.shadowOffsetY = oy; fn(); ctx.restore(); }
function vignette(a = .55) { const g = ctx.createRadialGradient(W / 2, H * .45, H * .25, W / 2, H * .5, H * .8); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function glow(x, y, r, col, a) { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0)); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); }
function trFlag(x, y, w, h, wave = 0) {
  ctx.save(); ctx.translate(x, y);
  ctx.beginPath(); ctx.moveTo(0, 0);
  for (let i = 0; i <= 10; i++) ctx.lineTo(i * w / 10, Math.sin(wave + i * .6) * h * .06);
  for (let i = 10; i >= 0; i--) ctx.lineTo(i * w / 10, h + Math.sin(wave + i * .6) * h * .06);
  ctx.closePath(); ctx.fillStyle = TR_RED; ctx.fill();
  const cx = w * .38, cy = h / 2 + Math.sin(wave + 2.3) * h * .06;
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx, cy, h * .25, 0, 7); ctx.fill();
  ctx.fillStyle = TR_RED; ctx.beginPath(); ctx.arc(cx + h * .06, cy, h * .2, 0, 7); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath();
  for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5 - Math.PI / 2, r = i % 2 ? h * .045 : h * .11; ctx.lineTo(cx + h * .3 + Math.cos(a) * r, cy + Math.sin(a) * r); }
  ctx.fill(); ctx.restore();
}

function brFlag(x, y, w, h) {
  ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#009c3b'; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#ffdf00'; ctx.beginPath(); ctx.moveTo(w / 2, h * .12); ctx.lineTo(w * .92, h / 2); ctx.lineTo(w / 2, h * .88); ctx.lineTo(w * .08, h / 2); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#002776'; ctx.beginPath(); ctx.arc(w / 2, h / 2, h * .22, 0, 7); ctx.fill(); ctx.restore();
}

// ---------- characters ----------
// pose: down | handsHead | cupEar | shout | remote | hipsBack ; face: calm | shock | angry | shout | sleepy | happy
function human(x, y, s, o = {}) {
  const { shirt = '#2a9d8f', pants = '#2b2d42', skin = '#e9b48a', hair = '#2b1d14', hairStyle = 'short', face = 'calm', pose = 'down', beard = false, mustache = false, t = 0, bob = 0, shadow = true, flagShirt = false, glasses = false, cap = null, scarf = null } = o;
  ctx.save(); ctx.translate(x, y + Math.sin(t * 3 + bob) * 2); ctx.scale(s, s);
  if (shadow) { ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.beginPath(); ctx.ellipse(0, 128, 54, 10, 0, 0, 7); ctx.fill(); }
  // legs + shoes
  ctx.fillStyle = pants; rr(-24, 40, 21, 86, 9); ctx.fill(); rr(3, 40, 21, 86, 9); ctx.fill();
  ctx.fillStyle = shade(pants, -.25); ctx.fillRect(-4, 44, 8, 70);
  ctx.fillStyle = '#1b1b1b'; rr(-30, 118, 30, 14, 7); ctx.fill(); rr(0, 118, 30, 14, 7); ctx.fill();
  // torso with soft light
  const tg = ctx.createLinearGradient(-40, -40, 40, 60); tg.addColorStop(0, shade(shirt, .18)); tg.addColorStop(1, shade(shirt, -.18));
  ctx.fillStyle = tg; ctx.beginPath(); ctx.moveTo(-36, -30); ctx.quadraticCurveTo(-40, 20, -30, 52); ctx.lineTo(30, 52); ctx.quadraticCurveTo(40, 20, 36, -30); ctx.quadraticCurveTo(0, -46, -36, -30); ctx.fill();
  if (flagShirt) { ctx.fillStyle = '#fff'; ctx.fillRect(-36, 4, 72, 10); ctx.font = '900 24px Inter'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; }
  ctx.fillStyle = shade(shirt, -.3); ctx.beginPath(); ctx.moveTo(-12, -38); ctx.lineTo(0, -24); ctx.lineTo(12, -38); ctx.fill(); // collar
  // arms (shoulder at ±32,-24)
  const arm = (sx, a1, a2, len1 = 40, len2 = 38) => {
    const ex = sx + Math.sin(a1) * len1, ey = -24 + Math.cos(a1) * len1, hx = ex + Math.sin(a2) * len2, hy = ey + Math.cos(a2) * len2;
    ctx.strokeStyle = shade(shirt, -.08); ctx.lineWidth = 17; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(sx, -24); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke();
    ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(hx, hy, 9.5, 0, 7); ctx.fill();
    return [hx, hy];
  };
  let hands;
  const P = {
    down: [[-.25, -.05], [.25, .05]], handsHead: [[-2.6, -3.6], [2.6, 3.6]], cupEar: [[-.2, -.05], [2.7, 3.7]],
    shout: [[-2.4, -2.9], [2.4, 2.9]], phoneUp: [[-.3, -.1], [3.0 + Math.sin(t * 3 + bob) * .15, 3.1]], remote: [[-.5, 1.4], [1.9, 2.9 - Math.abs(Math.sin(t * 9)) * 1.5]], hipsBack: [[-.6, .7], [.6, -.7]],
  }[pose];
  const L = arm(-32, P[0][0], P[0][1]), R = arm(32, P[1][0], P[1][1]);
  hands = [L, R];
  if (pose === 'phoneUp') {
    const [hx, hy] = R; ctx.save(); ctx.translate(hx, hy - 22);
    ctx.fillStyle = '#111'; rr(-14, -26, 28, 50, 6); ctx.fill(); ctx.fillStyle = '#4cc9f0'; rr(-11, -22, 22, 40, 4); ctx.fill();
    ctx.strokeStyle = '#e63946'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-6, -10); ctx.lineTo(6, 4); ctx.moveTo(6, -10); ctx.lineTo(-6, 4); ctx.stroke();
    ctx.restore();
  }
  if (pose === 'remote') {
    const [hx, hy] = R, hit = Math.abs(Math.sin(t * 9));
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(-.5); ctx.fillStyle = '#212529'; rr(-8, -34, 16, 46, 6); ctx.fill(); ctx.fillStyle = '#e63946'; ctx.beginPath(); ctx.arc(0, -26, 3.5, 0, 7); ctx.fill(); ctx.restore();
    if (hit > .75) { ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 4; [[-1, .2], [-.6, 1], [.4, 1.1]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(L[0] + dx * 18, L[1] + dy * 18); ctx.lineTo(L[0] + dx * 36, L[1] + dy * 36); ctx.stroke(); }); }
  }
  // neck + head
  ctx.fillStyle = shade(skin, -.12); ctx.fillRect(-9, -50, 18, 16);
  const hg = ctx.createRadialGradient(-10, -84, 6, 0, -74, 38); hg.addColorStop(0, shade(skin, .12)); hg.addColorStop(1, shade(skin, -.08));
  ctx.fillStyle = skin; ctx.beginPath(); ctx.ellipse(-31, -72, 6, 9, 0, 0, 7); ctx.ellipse(31, -72, 6, 9, 0, 0, 7); ctx.fill(); // ears
  ctx.fillStyle = hg; ctx.beginPath(); ctx.ellipse(0, -74, 31, 36, 0, 0, 7); ctx.fill();
  // hair
  ctx.fillStyle = hair;
  if (hairStyle === 'short') { ctx.beginPath(); ctx.ellipse(0, -96, 32, 18, 0, Math.PI, 0); ctx.fill(); ctx.beginPath(); ctx.moveTo(-32, -92); ctx.quadraticCurveTo(-34, -78, -28, -70); ctx.lineTo(-26, -92); ctx.fill(); ctx.beginPath(); ctx.moveTo(32, -92); ctx.quadraticCurveTo(34, -78, 28, -70); ctx.lineTo(26, -92); ctx.fill(); }
  else if (hairStyle === 'bald') { ctx.beginPath(); ctx.ellipse(-26, -80, 6, 14, .2, 0, 7); ctx.ellipse(26, -80, 6, 14, -.2, 0, 7); ctx.fill(); }
  else if (hairStyle === 'long') { ctx.beginPath(); ctx.ellipse(0, -92, 34, 24, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-35, -92, 12, 56); ctx.fillRect(23, -92, 12, 56); }
  else if (hairStyle === 'curly') { for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.arc(-27 + i * 9, -100 + Math.abs(i - 3) * 3, 11, 0, 7); ctx.fill(); } }
  else if (hairStyle === 'bob') { ctx.beginPath(); ctx.ellipse(0, -90, 35, 26, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-35, -92, 11, 34); ctx.fillRect(24, -92, 11, 34); ctx.fillRect(-24, -112, 48, 14); }
  else if (hairStyle === 'grey') { ctx.beginPath(); ctx.ellipse(-27, -82, 7, 15, .2, 0, 7); ctx.ellipse(27, -82, 7, 15, -.2, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, -104, 18, 6, 0, 0, 7); ctx.fill(); }
  if (scarf) { ctx.fillStyle = scarf; ctx.beginPath(); ctx.ellipse(0, -80, 40, 46, 0, Math.PI * .92, Math.PI * 2.08); ctx.lineTo(30, -40); ctx.quadraticCurveTo(0, -26, -30, -40); ctx.fill();
    ctx.fillStyle = skin; ctx.beginPath(); ctx.ellipse(0, -70, 25, 30, 0, 0, 7); ctx.fill(); ctx.fillStyle = shade(scarf, -.2); ctx.beginPath(); ctx.ellipse(0, -100, 27, 9, 0, Math.PI, 0); ctx.fill(); }
  if (cap) { ctx.fillStyle = cap; ctx.beginPath(); ctx.ellipse(0, -98, 33, 20, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-33, -100, 66, 6); ctx.fillStyle = shade(cap, -.25); ctx.beginPath(); ctx.ellipse(18, -96, 26, 6, 0, 0, 7); ctx.fill(); }
  // face
  const eye = (ex, open = 1) => { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(ex, -76, 7, 6 * open + .5, 0, 0, 7); ctx.fill(); if (open > .3) { ctx.fillStyle = '#2b1d14'; ctx.beginPath(); ctx.arc(ex + 1, -75, 3.6, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ex + 2.2, -76.4, 1.2, 0, 7); ctx.fill(); } };
  const big = face === 'shock' ? 1.35 : face === 'sleepy' ? .15 : 1;
  eye(-11, big); eye(11, big);
  if (glasses) { ctx.strokeStyle = '#222'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(-11, -76, 10, 0, 7); ctx.moveTo(21, -76); ctx.arc(11, -76, 10, 0, 7); ctx.moveTo(-1, -77); ctx.lineTo(1, -77); ctx.stroke(); }
  ctx.strokeStyle = shade(hair === '#ccc' ? '#888888' : hair, 0); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath();
  if (face === 'angry') { ctx.moveTo(-19, -90); ctx.lineTo(-5, -84); ctx.moveTo(19, -90); ctx.lineTo(5, -84); }
  else if (face === 'shock') { ctx.moveTo(-18, -92); ctx.quadraticCurveTo(-11, -97, -4, -92); ctx.moveTo(18, -92); ctx.quadraticCurveTo(11, -97, 4, -92); }
  else { ctx.moveTo(-18, -88); ctx.lineTo(-5, -88); ctx.moveTo(18, -88); ctx.lineTo(5, -88); }
  ctx.stroke();
  ctx.strokeStyle = shade(skin, -.3); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -72); ctx.quadraticCurveTo(-4, -62, 2, -61); ctx.stroke(); // nose
  ctx.fillStyle = 'rgba(230,90,90,.25)'; ctx.beginPath(); ctx.arc(-18, -62, 6, 0, 7); ctx.arc(18, -62, 6, 0, 7); ctx.fill();
  if (beard) { ctx.fillStyle = shade(hair, .1); ctx.beginPath(); ctx.moveTo(-30, -66); ctx.quadraticCurveTo(-26, -34, 0, -36); ctx.quadraticCurveTo(26, -34, 30, -66); ctx.quadraticCurveTo(0, -48, -30, -66); ctx.fill(); }
  if (mustache) { ctx.fillStyle = hair; rr(-14, -58, 28, 7, 4); ctx.fill(); }
  ctx.fillStyle = '#5c1a1a'; ctx.strokeStyle = '#5c1a1a'; ctx.lineWidth = 3;
  if (face === 'shock') { ctx.beginPath(); ctx.ellipse(0, -48, 7, 10, 0, 0, 7); ctx.fill(); }
  else if (face === 'shout') { ctx.beginPath(); ctx.ellipse(0, -48, 13, 13, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#e76f51'; ctx.beginPath(); ctx.ellipse(0, -42, 8, 5, 0, 0, 7); ctx.fill(); }
  else if (face === 'angry') { ctx.beginPath(); ctx.moveTo(-9, -46); ctx.quadraticCurveTo(0, -52, 9, -46); ctx.stroke(); }
  else if (face === 'happy') { ctx.beginPath(); ctx.arc(0, -54, 9, .2, Math.PI - .2); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(-7, -49); ctx.lineTo(7, -49); ctx.stroke(); }
  ctx.restore();
}
// someone seen from behind (watching the TV)
function backHead(x, y, s, { shirt = '#264653', hair = '#2b1d14', hairStyle = 'short', pose = 'down', t = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = shade(shirt, -.1); ctx.beginPath(); ctx.moveTo(-70, 120); ctx.quadraticCurveTo(-72, 10, 0, 4); ctx.quadraticCurveTo(72, 10, 70, 120); ctx.fill();
  if (pose === 'handsHead') { ctx.strokeStyle = shirt; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-56, 40); ctx.lineTo(-62, -40); ctx.lineTo(-20, -70); ctx.moveTo(56, 40); ctx.lineTo(62, -40); ctx.lineTo(20, -70); ctx.stroke(); }
  ctx.fillStyle = '#d9a37a'; ctx.beginPath(); ctx.ellipse(0, -34, 40, 46, 0, 0, 7); ctx.fill();
  ctx.fillStyle = hair;
  if (hairStyle === 'bald') { ctx.beginPath(); ctx.ellipse(0, -10, 40, 22, 0, 0, Math.PI); ctx.fill(); }
  else if (hairStyle === 'long') { ctx.beginPath(); ctx.ellipse(0, -30, 44, 52, 0, 0, 7); ctx.fill(); ctx.fillRect(-44, -30, 88, 80); }
  else { ctx.beginPath(); ctx.ellipse(0, -40, 42, 42, 0, 0, 7); ctx.fill(); }
  if (pose === 'handsHead') { ctx.fillStyle = '#d9a37a'; ctx.beginPath(); ctx.arc(-22, -72, 14, 0, 7); ctx.arc(22, -72, 14, 0, 7); ctx.fill(); }
  ctx.restore();
}

// twelve different neighbours (used for the windows and the balconies)
const CAST = [
  { shirt: TR_RED, hair: '#111', hairStyle: 'short', skin: '#e9b48a' },                                   // young fan in the jersey
  { shirt: '#8338ec', skin: '#f1c27d', scarf: '#c77dff' },                                                // woman in a headscarf
  { shirt: '#8d6e63', hair: '#d0d0d0', hairStyle: 'grey', mustache: true, glasses: true, skin: '#e0a47a' }, // grandpa
  { shirt: '#2a9d8f', hair: '#5a3825', hairStyle: 'long', skin: '#f3c9a5' },                              // teen girl
  { shirt: '#40916c', hair: '#111', hairStyle: 'curly', beard: true, skin: '#c68642' },                    // bearded man
  { shirt: '#ffb703', hair: '#3b2414', hairStyle: 'short', cap: TR_RED, skin: '#f1c27d', kid: true },       // kid with a cap
  { shirt: '#fb5607', hair: '#8d3b20', hairStyle: 'curly', glasses: true, skin: '#f3c9a5' },               // woman, auburn curls
  { shirt: '#6c757d', hair: '#555', hairStyle: 'short', cap: '#1d3557', beard: true, skin: '#d9a37a' },     // man in a cap
  { shirt: '#9d0208', skin: '#e9b48a', scarf: '#f8f9fa', glasses: true },                                 // grandma, white scarf
  { shirt: '#3a86ff', hair: '#b5833c', hairStyle: 'long', skin: '#f6d2b8' },                              // young man, long hair
  { shirt: '#f8f9fa', hair: '#111', hairStyle: 'bald', beard: true, skin: '#b07a50' },                    // bald, black beard
  { shirt: '#ff6b9a', hair: '#111', hairStyle: 'bob', skin: '#e0ac69' },                                  // girl with a bob
];
function castMember(i, x, y, s, extra) { const c = CAST[i % CAST.length]; human(x, y + (c.kid ? 20 * s : 0), s * (c.kid ? .82 : 1), { ...c, ...extra }); }

// ---------- series badge ----------
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

// ---------- the broadcast: Türkiye in the final, penalty ----------
function player(x, y, s, kit, t, run = 0, keeper = false) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(0, 46, 20, 5, 0, 0, 7); ctx.fill();
  const sw = Math.sin(t * 14) * run;
  ctx.strokeStyle = '#e9b48a'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-5, 18); ctx.lineTo(-6 - sw * 10, 44); ctx.moveTo(5, 18); ctx.lineTo(6 + sw * 10, 44); ctx.stroke();
  ctx.fillStyle = kit.socks; ctx.fillRect(-9 - sw * 10, 34, 7, 10); ctx.fillRect(3 + sw * 10, 34, 7, 10);
  ctx.fillStyle = kit.shorts; rr(-11, 10, 22, 14, 4); ctx.fill();
  ctx.fillStyle = kit.shirt; rr(-13, -16, 26, 30, 7); ctx.fill();
  if (kit.stripe) { ctx.fillStyle = kit.stripe; ctx.fillRect(-13, -6, 26, 5); }
  ctx.strokeStyle = kit.shirt; ctx.lineWidth = 7; ctx.beginPath();
  if (keeper) { ctx.moveTo(-12, -10); ctx.lineTo(-30, -24); ctx.moveTo(12, -10); ctx.lineTo(30, -24); } else { ctx.moveTo(-12, -10); ctx.lineTo(-18 + sw * 8, 8); ctx.moveTo(12, -10); ctx.lineTo(18 - sw * 8, 8); }
  ctx.stroke();
  ctx.fillStyle = '#e9b48a'; ctx.beginPath(); ctx.arc(0, -24, 9, 0, 7); ctx.fill(); ctx.fillStyle = '#2b1d14'; ctx.beginPath(); ctx.arc(0, -28, 9, Math.PI, 0); ctx.fill();
  ctx.restore();
}
function broadcast(x, y, w, h, t, frozen) {
  ctx.save(); ctx.translate(x, y); rr(0, 0, w, h, 8); ctx.clip();
  // stands with red-white crowd + flags
  const sg = ctx.createLinearGradient(0, 0, 0, h * .38); sg.addColorStop(0, '#0b132b'); sg.addColorStop(1, '#1c2541'); ctx.fillStyle = sg; ctx.fillRect(0, 0, w, h * .4);
  for (let i = 0; i < 520; i++) { const cx = rnd(i) * w, cy = rnd(i + 77) * h * .34 + 6; ctx.fillStyle = rnd(i + 5) > .45 ? TR_RED : rnd(i + 9) > .5 ? '#ffffff' : '#ffd6d6'; ctx.globalAlpha = .55 + rnd(i + 2) * .45; ctx.fillRect(cx, cy + (frozen ? 0 : Math.sin(t * 8 + i) * 1.5), 5, 5); }
  ctx.globalAlpha = 1;
  [[.12, .05], [.42, .1], [.72, .04]].forEach(([fx, fy], i) => trFlag(fx * w, fy * h, w * .14, w * .09, frozen ? 0 : t * 5 + i));
  // floodlight haze
  glow(w * .15, 0, w * .35, 'rgba(255,255,230,A)', .25); glow(w * .85, 0, w * .35, 'rgba(255,255,230,A)', .25);
  // pitch in perspective
  const top = h * .38;
  for (let i = 0; i < 10; i++) { ctx.fillStyle = i % 2 ? '#2f8f4e' : '#3aa35b'; ctx.beginPath(); ctx.moveTo(w * (-.2 + i * .14), h); ctx.lineTo(w * (.12 + i * .076), top); ctx.lineTo(w * (.12 + (i + 1) * .076), top); ctx.lineTo(w * (-.2 + (i + 1) * .14), h); ctx.fill(); }
  ctx.strokeStyle = '#ffffffd0'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(w * .26, top); ctx.lineTo(w * .14, h * .78); ctx.lineTo(w * .86, h * .78); ctx.lineTo(w * .74, top); ctx.stroke(); // box
  // goal with net
  ctx.fillStyle = '#ffffff22'; ctx.fillRect(w * .4, top - h * .1, w * .2, h * .1);
  ctx.strokeStyle = '#ffffff55'; ctx.lineWidth = 1; for (let i = 0; i <= 12; i++) { ctx.beginPath(); ctx.moveTo(w * .4 + i * w * .2 / 12, top - h * .1); ctx.lineTo(w * .4 + i * w * .2 / 12, top); ctx.stroke(); }
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(w * .4, top); ctx.lineTo(w * .4, top - h * .1); ctx.lineTo(w * .6, top - h * .1); ctx.lineTo(w * .6, top); ctx.stroke();
  // players
  const TUR = { shirt: TR_RED, shorts: '#fff', socks: TR_RED, stripe: '#fff' }, OPP = { shirt: '#ffdf00', shorts: '#1d4ed8', socks: '#fff', stripe: '#009c3b' }, GK = { shirt: '#2b2d42', shorts: '#2b2d42', socks: '#2b2d42' };
  player(w * .5 + (frozen ? -12 : Math.sin(t * 5) * 18), top - 4, 1.0, GK, t, 0, true);
  [[.2, .66, OPP], [.3, .7, TUR], [.7, .68, OPP], [.82, .72, TUR], [.62, .74, TUR]].forEach(([px, py, k]) => player(w * px, h * py, 1.25, k, t, 0));
  const run = frozen ? 1 : clamp(t / TL.freeze);
  player(lerp(w * .36, w * .47, run), lerp(h * .86, h * .62, run), 1.6, TUR, frozen ? 0 : t, frozen ? 0 : 1);
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(w * .5, h * .6, 7, 0, 7); ctx.fill(); ctx.strokeStyle = '#111'; ctx.lineWidth = 1.5; ctx.stroke();
  // score bug
  ctx.save(); ctx.translate(14, 12); rr(0, 0, 400, 46, 8); ctx.fillStyle = '#0d1b2add'; ctx.fill();
  trFlag(10, 11, 34, 24); ctx.fillStyle = '#fff'; font(900, 24); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('TÜR', 78, 24); ctx.fillText('1 - 1', 146, 24); ctx.fillText('BRA', 214, 24);
  brFlag(246, 11, 34, 24); ctx.fillStyle = '#ffd166'; ctx.fillText("90+3'", 336, 24); ctx.restore();
  if (!frozen) { ctx.fillStyle = '#e63946'; rr(w - 112, 14, 98, 32, 6); ctx.fill(); ctx.fillStyle = '#fff'; font(900, 20); ctx.textAlign = 'center'; ctx.fillText('● CANLI', w - 63, 31); }
  if (frozen) {
    ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(0, 0, w, h);
    spinner(w / 2, h / 2 - 34, 40, t);
    ctx.fillStyle = '#fff'; font(900, 38); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('📵 BAĞLANTI YOK', w / 2, h / 2 + 46);
  }
  ctx.restore();
}
function tvSet(cx, cy, w, h, t, frozen) {
  softShadow(() => { ctx.fillStyle = '#0f0f12'; rr(cx - w / 2 - 18, cy - h / 2 - 18, w + 36, h + 36, 18); ctx.fill(); }, 50, 'rgba(0,0,0,.6)', 20);
  ctx.fillStyle = '#1c1c22'; ctx.fillRect(cx - 30, cy + h / 2 + 18, 60, 36); rr(cx - 150, cy + h / 2 + 50, 300, 16, 8); ctx.fill();
  broadcast(cx - w / 2, cy - h / 2, w, h, t, frozen);
  ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.beginPath(); ctx.moveTo(cx - w / 2, cy - h / 2); ctx.lineTo(cx - w / 2 + w * .35, cy - h / 2); ctx.lineTo(cx - w / 2, cy + h / 2 * .2); ctx.fill(); // screen glare
}
function livingRoom(t, tvLight) {
  const wg = ctx.createLinearGradient(0, 0, 0, 1300); wg.addColorStop(0, '#2a2f45'); wg.addColorStop(1, '#3b4262'); ctx.fillStyle = wg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#ffffff08'; for (let i = 0; i < 9; i++) ctx.fillRect(i * 130, 0, 60, 1300); // wallpaper stripes
  const fg = ctx.createLinearGradient(0, 1300, 0, H); fg.addColorStop(0, '#5a3e36'); fg.addColorStop(1, '#3a2620'); ctx.fillStyle = fg; ctx.fillRect(0, 1300, W, H - 1300);
  ctx.fillStyle = '#6b4a3f'; for (let i = 0; i < 8; i++) ctx.fillRect(0, 1320 + i * 80, W, 3);
  // shelf with a tea glass and a Türkiye scarf
  ctx.fillStyle = '#4a3b35'; ctx.fillRect(60, 1180, 960, 26);
  ctx.save(); ctx.translate(120, 1100); ctx.fillStyle = TR_RED; ctx.fillRect(0, 0, 150, 34); ctx.fillStyle = '#fff'; font(900, 22); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('TÜRKİYE', 75, 18); ctx.restore();
  ctx.fillStyle = '#c96f3b'; rr(880, 1130, 30, 50, 6); ctx.fill();
  glow(540, 760, 760, tvLight, .35 + .08 * Math.sin(t * 7));
}
function hookScene(t) {
  const frozen = t >= TL.freeze;
  const flick = frozen ? 'rgba(120,140,200,A)' : 'rgba(90,220,140,A)';
  livingRoom(t, flick);
  const z = lerp(1, 1.06, clamp(t / TL.freeze));
  ctx.save(); ctx.translate(540, 780); ctx.scale(z, z); ctx.translate(-540, -780);
  tvSet(540, 780, 900, 540, t, frozen);
  ctx.restore();
  // viewers from behind, lit by the TV
  const pose = frozen ? 'handsHead' : 'down';
  ctx.fillStyle = '#7b2c3b'; rr(80, 1300, 920, 200, 50); ctx.fill(); ctx.fillStyle = '#922f45'; rr(60, 1240, 960, 110, 50); ctx.fill();
  backHead(260, 1220, 1.15, { shirt: TR_RED, hair: '#2b1d14', pose, t });
  backHead(540, 1240, 1.2, { shirt: '#264653', hair: '#ccc', hairStyle: 'bald', pose, t });
  backHead(820, 1225, 1.1, { shirt: '#fff', hair: '#4a2c1a', hairStyle: 'long', pose, t });
  vignette(.5);
}

// ---------- everyone restarts the modem ----------
function modem(x, y, s, t, i) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  softShadow(() => { ctx.fillStyle = '#f1f3f5'; rr(-46, -18, 92, 36, 10); ctx.fill(); }, 10, 'rgba(0,0,0,.4)', 4);
  ctx.strokeStyle = '#ced4da'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-30, -18); ctx.lineTo(-38, -52); ctx.moveTo(30, -18); ctx.lineTo(38, -52); ctx.stroke();
  for (let k = 0; k < 4; k++) { const on = Math.floor(t * 6 + i + k) % 3 !== 0, c = k === 3 ? '#ff3b30' : on ? '#2ecc71' : '#495057'; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(-27 + k * 18, 2, 5, 0, 7); ctx.fill(); if (c !== '#495057') glow(-27 + k * 18, 2, 14, c === '#ff3b30' ? 'rgba(255,59,48,A)' : 'rgba(46,204,113,A)', .5); }
  ctx.restore();
}
function modemScene(t) {
  const sg = ctx.createLinearGradient(0, 0, 0, H); sg.addColorStop(0, '#0b132b'); sg.addColorStop(1, '#1c2541'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 60; i++) { ctx.fillStyle = `rgba(255,255,255,${.3 + rnd(i + 4) * .5})`; ctx.beginPath(); ctx.arc(rnd(i) * W, rnd(i + 3) * 460, 1.5 + rnd(i + 8), 0, 7); ctx.fill(); }
  const bg = ctx.createLinearGradient(100, 0, 980, 0); bg.addColorStop(0, '#5c677d'); bg.addColorStop(1, '#33415c');
  softShadow(() => { ctx.fillStyle = bg; ctx.fillRect(110, 470, 860, 940); }, 40, 'rgba(0,0,0,.5)', 10);
  ctx.fillStyle = '#23304a'; ctx.fillRect(90, 450, 900, 30);
  let i = 0;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
    const x = 160 + c * 270, y = 520 + r * 215, w = 220, h = 175;
    const lg = ctx.createLinearGradient(x, y, x, y + h); lg.addColorStop(0, '#ffe8a3'); lg.addColorStop(1, '#f4b860'); ctx.fillStyle = lg; ctx.fillRect(x, y, w, h);
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    castMember(i, x + 70, y + 160, .78, { face: i % 3 ? 'angry' : 'shock', t, bob: i, shadow: false });
    modem(x + 160, y + 120, .9, t, i);
    ctx.restore();
    ctx.strokeStyle = '#2b2d42'; ctx.lineWidth = 8; ctx.strokeRect(x, y, w, h); ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + 40); ctx.stroke();
    i++;
  }
  ctx.fillStyle = '#14213d'; ctx.fillRect(0, 1410, W, H - 1410);
  const p = (t * .55) % 1;
  ctx.save(); ctx.translate(540, 1240); rr(-320, -54, 640, 108, 22); ctx.fillStyle = '#000c'; ctx.fill();
  ctx.fillStyle = '#fff'; font(800, 32); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('🔄 Modem yeniden başlatılıyor...', 0, -16);
  rr(-270, 14, 540, 16, 8); ctx.fillStyle = '#495057'; ctx.fill(); rr(-270, 14, 540 * p, 16, 8); ctx.fillStyle = '#2ecc71'; ctx.fill(); ctx.restore();
  vignette(.45);
}

// ---------- dad hits the remote ----------
function kumandaScene(t) {
  livingRoom(t, 'rgba(120,140,200,A)');
  tvSet(540, 640, 720, 420, t, true);
  ctx.fillStyle = '#7b2c3b'; rr(160, 1250, 760, 140, 40); ctx.fill();
  human(560, 1060, 2.1, { shirt: '#457b9d', pants: '#343a40', hair: '#ccc', hairStyle: 'bald', face: 'angry', pose: 'remote', mustache: true, skin: '#e0a47a', t });
  // remote in the hitting hand + impact lines
  vignette(.5);
}

// ---------- the kahvehane: dayılar play okey, the young look for signal ----------
function okeyTable(x, y, t) {
  softShadow(() => { ctx.fillStyle = '#7f5539'; rr(x - 170, y, 340, 12, 6); ctx.fill(); }, 20, 'rgba(0,0,0,.4)', 8);
  ctx.fillStyle = '#2d6a4f'; rr(x - 160, y - 6, 320, 14, 6); ctx.fill();
  
  const cols = ['#e63946', '#111', '#ffb703', '#3a86ff'];
  for (let r = 0; r < 2; r++) { ctx.fillStyle = '#d4a373'; rr(x - 120 + r * 130, y - 22, 110, 18, 4); ctx.fill();
    for (let i = 0; i < 6; i++) { ctx.fillStyle = '#fffaf0'; rr(x - 116 + r * 130 + i * 17.5, y - 42, 15, 22, 3); ctx.fill(); ctx.fillStyle = cols[(i + r) % 4]; font(900, 12); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String((i * 3 + r * 5) % 13 + 1), x - 108.5 + r * 130 + i * 17.5, y - 30); } }
  ctx.fillStyle = '#c96f3b'; rr(x + 120, y - 34, 16, 28, 4); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(x + 114, y - 8, 28, 4); // tea glass
  steam(x + 128, y - 40, t, 2, 40, .4);
}
function kahveScene(t) {
  const wg = ctx.createLinearGradient(0, 0, 0, H); wg.addColorStop(0, '#5e3b2c'); wg.addColorStop(1, '#3b2418'); ctx.fillStyle = wg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#ffffff0a'; for (let i = 0; i < 12; i++) ctx.fillRect(0, 300 + i * 40, W, 2);
  ctx.fillStyle = '#2b1810'; ctx.fillRect(0, 1360, W, H - 1360);
  // sign + wall TV (frozen)
  ctx.save(); ctx.translate(540, 370); rr(-300, -54, 600, 108, 18); ctx.fillStyle = '#1d3557'; ctx.fill(); ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 5; rr(-290, -44, 580, 88, 12); ctx.stroke(); ctx.fillStyle = '#ffd166'; font(900, 60); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('KIRAATHANE', 0, 3); ctx.restore();
  tvSet(540, 640, 520, 300, t, true);
  // the young: standing, phones up, looking for signal
  castMember(9, 140, 1010, 1.05, { pose: 'phoneUp', face: 'shock', t, bob: 1, shadow: false });
  castMember(0, 940, 1000, 1.05, { pose: 'phoneUp', face: 'angry', t, bob: 2, shadow: false });
  castMember(3, 820, 1030, .95, { pose: 'phoneUp', face: 'shock', t, bob: 3, shadow: false });
  // the dayılar: calmly back to okey
  const D = [
    { shirt: '#6f4e37', hair: '#d0d0d0', hairStyle: 'grey', mustache: true, cap: '#4a3b35', skin: '#d9a37a' },
    { shirt: '#495057', hair: '#bbb', hairStyle: 'bald', mustache: true, glasses: true, skin: '#e0a47a' },
    { shirt: '#3d5a80', hair: '#888', hairStyle: 'short', beard: true, cap: '#2b2d42', skin: '#c68642' },
  ];
  human(400, 1140, 1.15, { ...D[0], face: 'happy', t, bob: 4, shadow: false });
  human(680, 1140, 1.15, { ...D[1], face: 'calm', t, bob: 5, shadow: false });
  human(540, 1100, 1.0, { ...D[2], face: 'happy', t, bob: 6, shadow: false });
  okeyTable(540, 1180, t);
  const cg = ctx.createLinearGradient(0, 1186, 0, 1360); cg.addColorStop(0, '#9c2a2a'); cg.addColorStop(1, '#6b1d1d'); ctx.fillStyle = cg; rr(380, 1186, 320, 174, 10); ctx.fill();
  ctx.strokeStyle = '#ffffff22'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(400 + i * 56, 1190); ctx.lineTo(400 + i * 56, 1356); ctx.stroke(); }
  pill('📶 ÇEKİM YOK', 870, 830, { size: 34, bg: '#e63946', fg: '#fff', alpha: clamp((t - TL.kahve[0] - .5) / .25) });
  pill('🎲 OKEYE DEVAM', 540, 1270, { size: 34, bg: '#2d6a4f', fg: '#fff', alpha: clamp((t - TL.kahve[0] - 1.2) / .25) });
  vignette(.5);
}

// ---------- the comment question ----------
function soruScene(t) {
  livingRoom(t, 'rgba(120,140,200,A)');
  tvSet(540, 780, 900, 540, t, true);
  ctx.fillStyle = 'rgba(0,0,0,.7)'; ctx.fillRect(0, 0, W, H);
  const p = backOut(clamp((t - TL.soru[0] - .15) / .4));
  ctx.save(); ctx.translate(540, 880); ctx.scale(p, p);
  softShadow(() => { rr(-420, -230, 840, 460, 36); ctx.fillStyle = '#fff'; ctx.fill(); }, 50, 'rgba(0,0,0,.6)', 16);
  ctx.fillStyle = '#111'; font(900, 120); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('💬', 0, -110);
  font(900, 66); ctx.fillText('SEN O AN', 0, 10); ctx.fillStyle = TR_RED; ctx.fillText('NE YAPIYORSUN?', 0, 90);
  ctx.fillStyle = '#6c757d'; font(800, 36); ctx.fillText('Yorumlara yaz 👇', 0, 170);
  ctx.restore();
}

// ---------- the whole street on the balconies ----------
function balcony(x, y, w, t, k, people, shoutIdx = -1, shoutOn = false) {
  const lg = ctx.createLinearGradient(x, y - 190, x, y); lg.addColorStop(0, '#ffe8a3'); lg.addColorStop(1, '#e9a23b');
  ctx.fillStyle = lg; ctx.fillRect(x + 20, y - 190, w - 40, 190);
  ctx.fillStyle = '#6d4c41'; ctx.fillRect(x + w / 2 - 50, y - 180, 100, 180);
  people.forEach((px, i) => {
    const id = k * 2 + i, me = shoutOn && id === shoutIdx;
    castMember(id, x + px, y - 40, .95, { face: me ? 'shout' : shoutOn ? 'shock' : 'calm', pose: me ? 'shout' : 'cupEar', t, bob: id, shadow: false });
  });
  ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(x, y - 50, w, 54);
  ctx.strokeStyle = '#ced4da'; ctx.lineWidth = 6; ctx.strokeRect(x, y - 50, w, 54);
  for (let i = 1; i < 10; i++) { ctx.beginPath(); ctx.moveTo(x + i * w / 10, y - 50); ctx.lineTo(x + i * w / 10, y + 4); ctx.stroke(); }
  ctx.fillStyle = '#868e96'; ctx.fillRect(x - 10, y + 4, w + 20, 16);
  if (k % 2 === 0) trFlag(x + w - 70, y - 30, 70, 46, t * 4 + k);
}
function balkonScene(t, shout) {
  const sg = ctx.createLinearGradient(0, 0, 0, H); sg.addColorStop(0, '#0b132b'); sg.addColorStop(1, '#1b263b'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 60; i++) { ctx.fillStyle = `rgba(255,255,255,${.3 + rnd(i + 4) * .5})`; ctx.beginPath(); ctx.arc(rnd(i) * W, rnd(i + 3) * 500, 1.5 + rnd(i + 8), 0, 7); ctx.fill(); }
  glow(900, 520, 160, 'rgba(255,255,220,A)', .35); ctx.fillStyle = '#fffbe6'; ctx.beginPath(); ctx.arc(900, 520, 48, 0, 7); ctx.fill();
  softShadow(() => { ctx.fillStyle = '#415a77'; ctx.fillRect(40, 560, 480, 920); ctx.fillStyle = '#4f6d8f'; ctx.fillRect(560, 620, 480, 860); }, 40, 'rgba(0,0,0,.5)', 10);
  [[60, 800], [60, 1060], [60, 1320]].forEach(([x, y], k) => balcony(x, y, 440, t, k, [120, 320], 6, shout));
  [[580, 860], [580, 1120], [580, 1380]].forEach(([x, y], k) => balcony(x, y, 440, t, k + 3, [120, 320], 6, shout));
  ctx.fillStyle = '#0d1b2a'; ctx.fillRect(0, 1480, W, H - 1480);
  if (shout) {
    const p = clamp((t - TL.gol[0]) / .3);
    ctx.save(); ctx.translate(780, 560); ctx.scale(lerp(.3, 1, backOut(p)) * .9, lerp(.3, 1, backOut(p)) * .9); ctx.rotate(-.08);
    softShadow(() => { ctx.fillStyle = '#ffd166'; ctx.beginPath(); for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, r = i % 2 ? 150 : 210; ctx.lineTo(Math.cos(a) * r * 1.4, Math.sin(a) * r * .68); } ctx.closePath(); ctx.fill(); }, 30, 'rgba(0,0,0,.5)', 8);
    ctx.fillStyle = TR_RED; font(900, 92); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('GOOOL!', 0, 4);
    ctx.restore();
  }
  vignette(.4);
}

