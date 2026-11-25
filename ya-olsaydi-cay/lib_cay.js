// ===== lib_cay.js — more human characters for the Çay series =====
// person(x, y, s, o): (x, y) is the hip point. Standing feet are ~172*s below it, the head centre 190*s above.
// Real arms (two-bone IK) and real hands (palm, four fingers, thumb). Hands go to o.hands = [[lx, ly], [rx, ry]] in local
// units, or o.handsW in world pixels, or a preset o.pose. Returns the hand positions in world pixels so props can be attached.
const ARM_A = 64, ARM_B = 60;
const POSES = {
  down: [[-64, 14], [64, 14]], hips: [[-46, 0], [46, 0]], crossed: [[34, -58], [-34, -48]], clasp: [[-8, -6], [8, -2]],
  handsHead: [[-44, -226], [44, -226]], table: [[-40, -24], [40, -24]], shrug: [[-92, -86], [92, -86]],
};
function drawHand(hx, hy, ang, side, shape, skin) {
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(ang - Math.PI / 2); ctx.scale(side, 1);
  ctx.fillStyle = skin; ctx.strokeStyle = shade(skin, -.28); ctx.lineWidth = 1.6;
  if (shape === 'fist') {
    rr(-13, -4, 26, 26, 10); ctx.fill(); ctx.stroke();
    ctx.beginPath(); for (let i = 1; i < 4; i++) { ctx.moveTo(-13 + i * 6.5, 14); ctx.lineTo(-13 + i * 6.5, 21); } ctx.stroke();
    ctx.beginPath(); ctx.ellipse(-9, 6, 5, 10, .5, 0, 7); ctx.fill(); ctx.stroke();
  } else {
    const spread = shape === 'spread' ? 1 : 0;
    for (let i = 0; i < 4; i++) {
      const len = 15 - Math.abs(i - 1.6) * 2.4, a = (i - 1.5) * .12 * (1 + spread * 1.6);
      ctx.save(); ctx.translate(-8.5 + i * 5.8, 15); ctx.rotate(-a); rr(-2.9, -2, 5.8, len + 2, 2.9); ctx.fill(); ctx.stroke(); ctx.restore();
    }
    rr(-12, -3, 24, 21, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = skin; ctx.fillRect(-10.5, 12, 21, 6); // hide the finger bases
    ctx.save(); ctx.translate(-11, 5); ctx.rotate(.75 + spread * .4); rr(-3, -2, 6.5, 16, 3.2); ctx.fill(); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}
function ik(sx, sy, tx, ty, side) {
  let dx = tx - sx, dy = ty - sy, d = Math.hypot(dx, dy);
  const max = ARM_A + ARM_B - .5, min = Math.abs(ARM_A - ARM_B) + 4;
  if (d > max) { tx = sx + dx / d * max; ty = sy + dy / d * max; d = max; }
  if (d < min) d = min;
  const th = Math.atan2(ty - sy, tx - sx), al = Math.acos(clamp((ARM_A * ARM_A + d * d - ARM_B * ARM_B) / (2 * ARM_A * d), -1, 1));
  const e1 = [sx + Math.cos(th + al) * ARM_A, sy + Math.sin(th + al) * ARM_A], e2 = [sx + Math.cos(th - al) * ARM_A, sy + Math.sin(th - al) * ARM_A];
  const e = side * e1[0] + e1[1] * .3 > side * e2[0] + e2[1] * .3 ? e1 : e2; // elbow out (and a bit down)
  return { e, h: [tx, ty] };
}
function personHead(o) {
  const { skin, hair, hairStyle, face, t, bob, look = 0, mustache, beard, stubble, glasses, sunglasses, hat, scarf, old, female, blink = true } = o;
  const brow = hairStyle === 'bald' || hairStyle === 'grey' ? shade(hair, -.2) : shade(hair, -.05);
  // back hair / scarf
  if (scarf) {
    ctx.fillStyle = scarf; ctx.beginPath(); ctx.ellipse(0, -2, 53, 60, 0, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-50, 10); ctx.quadraticCurveTo(-66, 70, -62, 96); ctx.lineTo(62, 96); ctx.quadraticCurveTo(66, 70, 50, 10); ctx.fill();
    ctx.fillStyle = shade(scarf, -.15); ctx.beginPath(); ctx.moveTo(-30, 50); ctx.quadraticCurveTo(0, 80, 30, 50); ctx.lineTo(36, 92); ctx.lineTo(-36, 92); ctx.fill();
  } else if (hairStyle === 'long' || hairStyle === 'bun') {
    ctx.fillStyle = shade(hair, -.1); rr(-50, -36, 100, hairStyle === 'long' ? 120 : 60, 42); ctx.fill();
  }
  if (!scarf) { ctx.fillStyle = skin; ctx.beginPath(); ctx.ellipse(-40, 2, 8, 13, 0, 0, 7); ctx.ellipse(40, 2, 8, 13, 0, 0, 7); ctx.fill(); ctx.fillStyle = shade(skin, -.15); ctx.beginPath(); ctx.ellipse(-40, 2, 4, 7, 0, 0, 7); ctx.ellipse(40, 2, 4, 7, 0, 0, 7); ctx.fill(); }
  // head with a jaw
  const hg = ctx.createRadialGradient(-12, -16, 8, 0, 0, 56); hg.addColorStop(0, shade(skin, .1)); hg.addColorStop(1, shade(skin, -.1));
  ctx.fillStyle = hg; ctx.beginPath(); ctx.moveTo(0, -48);
  ctx.bezierCurveTo(26, -48, 40, -30, 40, -4); ctx.bezierCurveTo(40, 24, 26, 46, 0, 48); ctx.bezierCurveTo(-26, 46, -40, 24, -40, -4); ctx.bezierCurveTo(-40, -30, -26, -48, 0, -48); ctx.fill();
  if (scarf) { ctx.strokeStyle = scarf; ctx.lineWidth = 12; ctx.beginPath(); ctx.ellipse(0, -2, 45, 53, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); }
  if (stubble || (beard && beard !== true)) { ctx.fillStyle = 'rgba(60,40,30,.22)'; ctx.beginPath(); ctx.moveTo(-36, 10); ctx.bezierCurveTo(-32, 44, 32, 44, 36, 10); ctx.bezierCurveTo(20, 30, -20, 30, -36, 10); ctx.fill(); }
  if (beard === true) { ctx.fillStyle = hair; ctx.beginPath(); ctx.moveTo(-39, 0); ctx.bezierCurveTo(-36, 56, 36, 56, 39, 0); ctx.bezierCurveTo(30, 30, 14, 26, 0, 30); ctx.bezierCurveTo(-14, 26, -30, 30, -39, 0); ctx.fill(); }
  // front hair
  ctx.fillStyle = hair;
  if (!scarf) {
    if (hairStyle === 'short' || hairStyle === 'side') {
      ctx.beginPath(); ctx.moveTo(-41, -2); ctx.bezierCurveTo(-46, -40, -24, -58, 4, -56); ctx.bezierCurveTo(34, -54, 46, -34, 41, -2);
      ctx.lineTo(36, -14); ctx.bezierCurveTo(30, -30, 10, -34, -6, -30); ctx.bezierCurveTo(-20, -32, -32, -26, -36, -12); ctx.closePath(); ctx.fill();
      if (hairStyle === 'side') { ctx.strokeStyle = shade(hair, .25); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-14, -52); ctx.quadraticCurveTo(-12, -40, -16, -31); ctx.stroke(); }
    } else if (hairStyle === 'bald' || hairStyle === 'grey') {
      ctx.beginPath(); ctx.ellipse(-37, -8, 7, 18, .15, 0, 7); ctx.ellipse(37, -8, 7, 18, -.15, 0, 7); ctx.fill();
      if (hairStyle === 'grey') { ctx.beginPath(); ctx.ellipse(0, -44, 26, 7, 0, 0, 7); ctx.fill(); }
      ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.beginPath(); ctx.ellipse(-12, -36, 12, 6, -.4, 0, 7); ctx.fill();
    } else if (hairStyle === 'long' || hairStyle === 'bun') {
      ctx.beginPath(); ctx.moveTo(-43, 20); ctx.bezierCurveTo(-50, -42, -20, -60, 4, -57); ctx.bezierCurveTo(34, -56, 50, -36, 43, 20);
      ctx.bezierCurveTo(38, -10, 30, -28, 6, -32); ctx.bezierCurveTo(-14, -26, -36, -16, -43, 20); ctx.fill();
      if (hairStyle === 'bun') { ctx.beginPath(); ctx.arc(0, -60, 18, 0, 7); ctx.fill(); }
    } else if (hairStyle === 'curly') { for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc(-35 + i * 10, -42 + Math.abs(i - 3.5) * 4, 13, 0, 7); ctx.fill(); } }
  }
  // wrinkles
  if (old) { ctx.strokeStyle = shade(skin, -.22); ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(-16, -28); ctx.quadraticCurveTo(0, -31, 16, -28); ctx.moveTo(-12, -23); ctx.quadraticCurveTo(0, -25, 12, -23);
    ctx.moveTo(-12, 16); ctx.quadraticCurveTo(-16, 24, -14, 30); ctx.moveTo(12, 16); ctx.quadraticCurveTo(16, 24, 14, 30); ctx.stroke(); }
  // eyes
  const k = face === 'shock' ? 1.4 : face === 'stunned' ? 1.2 : face === 'sleepy' ? .25 : face === 'angry' || face === 'stern' ? .8 : face === 'sly' ? .55 : 1;
  const closed = blink && ((t + bob * 1.37) % 3.9) < .11;
  [-16, 16].forEach(ex => {
    if (sunglasses) return;
    if (closed || face === 'cry') { ctx.strokeStyle = '#2b1d14'; ctx.lineWidth = 2.6; ctx.beginPath(); face === 'cry' ? ctx.arc(ex, 0, 8, Math.PI * 1.15, Math.PI * 1.85) : (ctx.moveTo(ex - 9, -2), ctx.quadraticCurveTo(ex, 3, ex + 9, -2)); ctx.stroke(); return; }
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(ex, -3, 9.5, 6.5 * k + .5, 0, 0, 7); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.ellipse(ex, -3, 9.5, 6.5 * k + .5, 0, 0, 7); ctx.clip();
    ctx.fillStyle = '#5b3a24'; ctx.beginPath(); ctx.arc(ex + look * 3.5, -2.5, 5.3, 0, 7); ctx.fill();
    ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(ex + look * 3.5, -2.5, 2.6, 0, 7); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ex + look * 3.5 + 1.8, -4.5, 1.4, 0, 7); ctx.fill(); ctx.restore();
    ctx.strokeStyle = '#2b1d14'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.ellipse(ex, -3, 9.8, 6.5 * k + .8, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
    if (female) { ctx.beginPath(); ctx.moveTo(ex + Math.sign(ex) * 9, -6); ctx.lineTo(ex + Math.sign(ex) * 13, -9); ctx.stroke(); }
  });
  // brows
  ctx.strokeStyle = brow; ctx.lineWidth = female ? 3.4 : 5; ctx.lineCap = 'round'; ctx.beginPath();
  const B = {
    calm: [[-25, -16, -8, -17], [8, -17, 25, -16]], happy: [[-25, -17, -8, -20], [8, -20, 25, -17]], shock: [[-25, -24, -8, -27], [8, -27, 25, -24]],
    angry: [[-25, -20, -7, -12], [7, -12, 25, -20]], stern: [[-25, -15, -7, -13], [7, -13, 25, -15]], cry: [[-25, -12, -8, -20], [8, -20, 25, -12]],
    sad: [[-25, -12, -8, -20], [8, -20, 25, -12]], stunned: [[-25, -21, -8, -24], [8, -24, 25, -21]], sly: [[-25, -16, -8, -15], [8, -22, 25, -25]], sleepy: [[-25, -14, -8, -14], [8, -14, 25, -14]], shout: [[-25, -22, -7, -15], [7, -15, 25, -22]],
  }[face] || [[-25, -16, -8, -17], [8, -17, 25, -16]];
  B.forEach(([a, b, c, d]) => { ctx.moveTo(a, b); ctx.quadraticCurveTo((a + c) / 2, Math.min(b, d) - 2, c, d); }); ctx.stroke();
  if (glasses) { ctx.strokeStyle = '#222'; ctx.lineWidth = 2.6; ctx.beginPath(); rr(-28, -12, 23, 18, 6); rr(5, -12, 23, 18, 6); ctx.moveTo(-5, -4); ctx.lineTo(5, -4); ctx.stroke(); }
  if (sunglasses) { ctx.fillStyle = '#0b0b0b'; rr(-30, -12, 26, 17, 6); ctx.fill(); rr(4, -12, 26, 17, 6); ctx.fill(); ctx.fillRect(-6, -8, 12, 3); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(-25, -9, 8, 3); ctx.fillRect(9, -9, 8, 3); }
  // nose
  ctx.strokeStyle = shade(skin, -.32); ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(-1, -2); ctx.quadraticCurveTo(-7, 12, -4, 15); ctx.quadraticCurveTo(1, 18, 6, 15); ctx.stroke();
  ctx.fillStyle = 'rgba(220,90,80,.2)'; ctx.beginPath(); ctx.arc(-24, 12, 8, 0, 7); ctx.arc(24, 12, 8, 0, 7); ctx.fill();
  if (mustache) { ctx.fillStyle = hair; ctx.beginPath(); ctx.moveTo(-17, 26); ctx.quadraticCurveTo(-10, 17, 0, 20); ctx.quadraticCurveTo(10, 17, 17, 26); ctx.quadraticCurveTo(8, 23, 0, 25); ctx.quadraticCurveTo(-8, 23, -17, 26); ctx.fill(); }
  // mouth
  ctx.fillStyle = '#5c1a1a'; ctx.strokeStyle = '#5c1a1a'; ctx.lineWidth = 2.6; const my = 30 + (mustache ? 1 : 0);
  const talk = o.talk;
  if (talk != null && talk < .12) { ctx.beginPath(); ctx.moveTo(-10, my + 1); ctx.quadraticCurveTo(0, my + 3, 10, my + 1); ctx.stroke(); } // lips closed between syllables
  else if (talk != null) { // speaking: open mouth follows the syllables
    const mw = 9 + talk * 4, mh = 1 + talk * 14;
    ctx.beginPath(); ctx.ellipse(0, my + 2, mw, mh, 0, 0, 7); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, my + 2, mw, mh, 0, 0, 7); ctx.clip();
    ctx.fillStyle = '#fff'; ctx.fillRect(-mw, my + 2 - mh, mw * 2, Math.min(5, mh * .45));
    ctx.fillStyle = '#e76f6f'; ctx.beginPath(); ctx.ellipse(0, my + 2 + mh, mw * .7, mh * .55, 0, 0, 7); ctx.fill(); ctx.restore();
  }
  else if (face === 'shock') { ctx.beginPath(); ctx.ellipse(0, my + 2, 7, 10, 0, 0, 7); ctx.fill(); }
  else if (face === 'shout') { ctx.beginPath(); ctx.ellipse(0, my + 2, 13, 11, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(-9, my - 8, 18, 4); }
  else if (face === 'happy') { ctx.beginPath(); ctx.moveTo(-13, my - 3); ctx.quadraticCurveTo(0, my + 13, 13, my - 3); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(-9, my - 3, 18, 3.5); }
  else if (face === 'stunned') { ctx.beginPath(); ctx.moveTo(-8, my + 3); ctx.quadraticCurveTo(0, my - 1, 8, my + 3); ctx.stroke(); }
  else if (face === 'angry' || face === 'sad' || face === 'cry') { ctx.beginPath(); ctx.moveTo(-11, my + 4); ctx.quadraticCurveTo(0, my - 5, 11, my + 4); ctx.stroke(); if (face === 'cry') { ctx.beginPath(); ctx.ellipse(0, my + 1, 8, 4, 0, 0, 7); ctx.fill(); } }
  else if (face === 'sly') { ctx.beginPath(); ctx.moveTo(-10, my + 1); ctx.quadraticCurveTo(4, my + 4, 13, my - 4); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(-9, my); ctx.quadraticCurveTo(0, my + 2, 9, my); ctx.stroke(); }
  if (female && face !== 'shock') { ctx.fillStyle = 'rgba(200,60,80,.35)'; ctx.beginPath(); ctx.ellipse(0, my + 1, 9, 3.5, 0, 0, 7); ctx.fill(); }
  // hats
  if (hat === 'flatcap') { ctx.fillStyle = o.hatColor || '#4a3b35'; ctx.beginPath(); ctx.ellipse(0, -30, 46, 26, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = shade(o.hatColor || '#4a3b35', -.2); ctx.beginPath(); ctx.ellipse(4, -30, 50, 10, 0, 0, Math.PI); ctx.fill(); }
  if (hat === 'fedora') { const c = o.hatColor || '#292524'; ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(0, -34, 70, 15, 0, 0, 7); ctx.fill(); rr(-38, -84, 76, 52, 14); ctx.fill(); ctx.fillStyle = '#111'; ctx.fillRect(-38, -44, 76, 9); }
  if (hat === 'cap') { const c = o.hatColor || '#111827'; ctx.fillStyle = c; rr(-42, -70, 84, 40, 12); ctx.fill(); ctx.fillStyle = '#0b0b0b'; ctx.beginPath(); ctx.ellipse(0, -30, 46, 9, 0, 0, Math.PI); ctx.fill(); ctx.fillStyle = GOLD; ctx.beginPath(); ctx.arc(0, -52, 7, 0, 7); ctx.fill(); }
}
function person(x, y, s, o = {}) {
  const d = { skin: '#e9b48a', hair: '#2b1d14', hairStyle: 'short', shirt: '#3b82f6', pants: '#2b2d42', shoes: '#1b1b1b', face: 'calm', pose: 'down', t: 0, bob: 0, shadow: true, seated: false, tilt: 0 };
  o = Object.assign(d, o);
  const { skin, shirt, pants, shoes, seated, t, bob } = o;
  const breathe = Math.sin(t * 2.2 + bob) * 1.2;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const footY = seated ? 146 : 172;
  if (o.shadow) { ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.beginPath(); ctx.ellipse(0, footY + 8, 70, 12, 0, 0, 7); ctx.fill(); }
  // ---- legs ----
  const lower = o.dress || pants;
  if (o.dress && !seated) {
    const g = ctx.createLinearGradient(-60, 0, 60, 0); g.addColorStop(0, shade(o.dress, -.12)); g.addColorStop(.5, shade(o.dress, .08)); g.addColorStop(1, shade(o.dress, -.15));
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-48, -6); ctx.lineTo(48, -6); ctx.quadraticCurveTo(66, 90, 70, 162); ctx.lineTo(-70, 162); ctx.quadraticCurveTo(-66, 90, -48, -6); ctx.fill();
    ctx.fillStyle = shoes; ctx.beginPath(); ctx.ellipse(-22, 168, 20, 8, 0, 0, 7); ctx.ellipse(22, 168, 20, 8, 0, 0, 7); ctx.fill();
  } else if (seated) {
    // shins (feet a little apart), then the lap seen slightly from above, then the knees facing the camera
    ctx.fillStyle = shade(lower, -.08); ctx.beginPath(); ctx.moveTo(-50, 56); ctx.lineTo(-12, 56); ctx.lineTo(-16, 142); ctx.lineTo(-48, 142); ctx.fill(); ctx.beginPath(); ctx.moveTo(12, 56); ctx.lineTo(50, 56); ctx.lineTo(48, 142); ctx.lineTo(16, 142); ctx.fill();
    ctx.fillStyle = shoes; ctx.beginPath(); ctx.ellipse(-33, footY, 25, 11, 0, 0, 7); ctx.ellipse(33, footY, 25, 11, 0, 0, 7); ctx.fill();
    const lg = ctx.createLinearGradient(0, -6, 0, 60); lg.addColorStop(0, shade(lower, .02)); lg.addColorStop(1, shade(lower, .2));
    ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(-50, -8); ctx.lineTo(50, -8); ctx.lineTo(56, 52); ctx.quadraticCurveTo(0, 60, -56, 52); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = shade(lower, -.25); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 6); ctx.lineTo(0, 56); ctx.stroke();
    ctx.fillStyle = shade(lower, .1); ctx.beginPath(); ctx.ellipse(-29, 56, 27, 13, 0, 0, 7); ctx.ellipse(29, 56, 27, 13, 0, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(-50, 66, 100, 10); // shadow under the knees
    if (o.dress) { ctx.fillStyle = o.dress; ctx.beginPath(); ctx.moveTo(-52, -8); ctx.lineTo(52, -8); ctx.lineTo(62, 96); ctx.quadraticCurveTo(0, 108, -62, 96); ctx.fill(); ctx.strokeStyle = shade(o.dress, -.2); ctx.beginPath(); ctx.moveTo(-28, 58); ctx.quadraticCurveTo(0, 66, 28, 58); ctx.stroke(); }
  } else {
    ctx.fillStyle = pants; rr(-42, 0, 38, 166, 14); ctx.fill(); rr(4, 0, 38, 166, 14); ctx.fill();
    ctx.fillStyle = shade(pants, -.22); ctx.fillRect(-4, 6, 8, 150);
    ctx.fillStyle = shoes; ctx.beginPath(); ctx.ellipse(-26, footY, 25, 11, 0, 0, 7); ctx.ellipse(26, footY, 25, 11, 0, 0, 7); ctx.fill();
  }
  // ---- torso ----
  const outer = o.coat || o.jacket || o.dressTop || shirt;
  const torso = (w = 0) => { ctx.beginPath(); ctx.moveTo(-56 - w, -116); ctx.quadraticCurveTo(-66 - w, -60, -50 - w, 12); ctx.lineTo(50 + w, 12); ctx.quadraticCurveTo(66 + w, -60, 56 + w, -116); ctx.quadraticCurveTo(0, -134 - breathe, -56 - w, -116); };
  if (o.coat) {
    const open = o.coatOpen || 0, inner = 4 + open * 58;
    ctx.fillStyle = shade(o.coat, -.45); ctx.beginPath(); ctx.moveTo(-58, -118); ctx.lineTo(58, -118); ctx.lineTo(70, 140); ctx.lineTo(-70, 140); ctx.fill(); // lining
    ctx.fillStyle = o.shirt; rr(-24, -118, 48, 60, 10); ctx.fill();
    if (o.lining && open > .05) { ctx.save(); ctx.beginPath(); ctx.rect(-inner, -110, inner * 2, 250); ctx.clip(); o.lining(open); ctx.restore(); }
    const g = ctx.createLinearGradient(-70, 0, 70, 0); g.addColorStop(0, shade(o.coat, -.15)); g.addColorStop(.5, shade(o.coat, .1)); g.addColorStop(1, shade(o.coat, -.18));
    [-1, 1].forEach(sd => {
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(sd * 58, -120); ctx.quadraticCurveTo(sd * (70 + open * 40), -40, sd * (70 + open * 60), 142); ctx.lineTo(sd * (inner + open * 10), 146); ctx.lineTo(sd * inner, -40); ctx.lineTo(sd * 14, -120); ctx.closePath(); ctx.fill();
      ctx.fillStyle = shade(o.coat, -.25); ctx.beginPath(); ctx.moveTo(sd * 14, -124); ctx.lineTo(sd * (inner + 26), -70); ctx.lineTo(sd * inner, -40); ctx.lineTo(sd * 30, -124); ctx.fill(); // lapel
    });
    ctx.fillStyle = shade(o.coat, -.2); ctx.fillRect(-60, -10, 120 * (1 - open), 10); // belt
  } else {
    const g = ctx.createLinearGradient(-60, -120, 60, 20); g.addColorStop(0, shade(outer, .14)); g.addColorStop(1, shade(outer, -.16)); ctx.fillStyle = g; torso(); ctx.fill();
    if (o.jacket) {
      ctx.fillStyle = o.shirt || '#f8fafc'; ctx.beginPath(); ctx.moveTo(-24, -124); ctx.lineTo(0, -40); ctx.lineTo(24, -124); ctx.fill();
      if (o.tie) { ctx.fillStyle = o.tie; ctx.beginPath(); ctx.moveTo(-6, -118); ctx.lineTo(6, -118); ctx.lineTo(9, -60); ctx.lineTo(0, -48); ctx.lineTo(-9, -60); ctx.fill(); }
      ctx.fillStyle = shade(o.jacket, -.22); [-1, 1].forEach(sd => { ctx.beginPath(); ctx.moveTo(sd * 24, -124); ctx.lineTo(sd * 36, -90); ctx.lineTo(sd * 20, -84); ctx.lineTo(0, -40); ctx.closePath(); ctx.fill(); });
      ctx.fillStyle = shade(o.jacket, -.35); ctx.beginPath(); ctx.arc(0, -24, 3.5, 0, 7); ctx.fill();
    } else if (o.vest) {
      ctx.fillStyle = o.vest; [-1, 1].forEach(sd => { ctx.beginPath(); ctx.moveTo(sd * 20, -124); ctx.lineTo(sd * 56, -116); ctx.quadraticCurveTo(sd * 66, -60, sd * 50, 12); ctx.lineTo(sd * 4, 12); ctx.lineTo(sd * 4, -60); ctx.closePath(); ctx.fill(); });
      ctx.fillStyle = shade(shirt, -.3); ctx.beginPath(); ctx.moveTo(-14, -128); ctx.lineTo(0, -112); ctx.lineTo(14, -128); ctx.fill();
    } else if (!o.dressTop) {
      ctx.fillStyle = shade(shirt, -.3); ctx.beginPath(); ctx.moveTo(-22, -126); ctx.lineTo(0, -104); ctx.lineTo(-6, -126); ctx.fill(); ctx.beginPath(); ctx.moveTo(22, -126); ctx.lineTo(0, -104); ctx.lineTo(6, -126); ctx.fill();
      ctx.fillStyle = shade(shirt, -.35); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(0, -92 + i * 26, 2.6, 0, 7); ctx.fill(); }
    } else { ctx.fillStyle = shade(outer, -.2); ctx.beginPath(); ctx.ellipse(0, -122, 22, 8, 0, 0, Math.PI); ctx.fill(); }
    if (!o.dress && !o.dressTop) { ctx.fillStyle = shade(pants, -.35); ctx.fillRect(-50, 4, 100, 9); }
  }
  // ---- neck ----
  ctx.fillStyle = shade(skin, -.12); rr(-14, -152, 28, 34, 8); ctx.fill();
  const drawHead = () => { ctx.save(); ctx.translate(0, -190 - breathe * .5); ctx.rotate(o.tilt); personHead(o); ctx.restore(); };
  if (o.handsOverFace) drawHead();
  // ---- arms + hands ----
  const toL = p => [(p[0] - x) / s, (p[1] - y) / s];
  const preset = POSES[o.pose] || POSES.down;
  const tgt = [0, 1].map(i => (o.handsW && o.handsW[i]) ? toL(o.handsW[i]) : (o.hands && o.hands[i]) ? o.hands[i] : preset[i]);
  const sleeve = o.coat || o.jacket || o.dressTop || shirt, shapes = o.handShape || ['open', 'open'], out = [];
  const order = o.pose === 'crossed' ? [1, 0] : [0, 1];
  order.forEach(i => {
    const sd = i ? 1 : -1, sx = sd * 50, sy = -106 + (o.shoulderUp ? -10 : 0);
    const { e, h } = ik(sx, sy, tgt[i][0], tgt[i][1], sd);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = shade(sleeve, -.3); ctx.lineWidth = 29; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(e[0], e[1]); ctx.lineTo(h[0], h[1]); ctx.stroke();
    ctx.strokeStyle = shade(sleeve, -.04); ctx.lineWidth = 25; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(e[0], e[1]); ctx.stroke();
    const fx = h[0] - (h[0] - e[0]) * .14, fy = h[1] - (h[1] - e[1]) * .14;
    ctx.strokeStyle = o.rolled ? skin : shade(sleeve, -.04); ctx.lineWidth = o.rolled ? 19 : 22; ctx.beginPath(); ctx.moveTo(e[0], e[1]); ctx.lineTo(fx, fy); ctx.stroke();
    if (!o.rolled) { ctx.strokeStyle = shade(sleeve, -.25); ctx.lineWidth = 23; ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx + (h[0] - e[0]) * .01, fy + (h[1] - e[1]) * .01); ctx.stroke(); }
    const ang = Math.atan2(h[1] - e[1], h[0] - e[0]);
    drawHand(fx + Math.cos(ang) * 4, fy + Math.sin(ang) * 4, ang, sd, shapes[i], skin);
    out[i] = [x + (fx + Math.cos(ang) * 16) * s, y + (fy + Math.sin(ang) * 16) * s];
  });
  if (!o.handsOverFace) drawHead();
  ctx.restore();
  return { hands: out, head: [x, y - 190 * s] };
}
// a wooden chair seen from the front (drawn before a seated person)
function chairBack(x, y, s, col = '#7c4a2a') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = shade(col, -.15); rr(-62, -150, 12, 170, 5); ctx.fill(); rr(50, -150, 12, 170, 5); ctx.fill();
  ctx.fillStyle = col; rr(-66, -160, 132, 26, 10); ctx.fill(); rr(-60, -100, 120, 14, 6); ctx.fill();
  ctx.fillStyle = shade(col, .1); rr(-70, 4, 140, 18, 6); ctx.fill();
  ctx.fillStyle = shade(col, -.2); ctx.fillRect(-62, 20, 10, 150); ctx.fillRect(52, 20, 10, 150);
  ctx.restore();
}
// clear zip bag of loose black tea with a hand-written label
function teaBagPack(x, y, w, h, rot = 0, label = 'TAZE RİZE') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.fillStyle = 'rgba(230,240,255,.28)'; rr(-w / 2, -h / 2, w, h, 6); ctx.fill();
  ctx.save(); rr(-w / 2, -h / 2, w, h, 6); ctx.clip();
  ctx.fillStyle = '#3b1f0e'; ctx.beginPath(); ctx.moveTo(-w / 2, -h * .05); ctx.quadraticCurveTo(0, -h * .15, w / 2, -h * .05); ctx.lineTo(w / 2, h / 2); ctx.lineTo(-w / 2, h / 2); ctx.fill();
  for (let i = 0; i < 40; i++) { ctx.fillStyle = i % 3 ? '#5b2d12' : '#1c0d05'; ctx.fillRect(-w / 2 + rnd(i * 3 + w) * w, -h * .05 + rnd(i * 7 + h) * h * .55, 3, 1.6); }
  ctx.restore();
  ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 2; rr(-w / 2, -h / 2, w, h, 6); ctx.stroke();
  ctx.fillStyle = '#ef4444'; ctx.fillRect(-w / 2 + 3, -h / 2 + 7, w - 6, 3.5); // zip
  ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(-w / 2 + 5, -h / 2 + 14, 4, h * .5);
  ctx.save(); ctx.translate(0, h * .22); ctx.rotate(-.06); ctx.fillStyle = '#fefce8'; rr(-w * .38, -9, w * .76, 18, 3); ctx.fill();
  ctx.fillStyle = TEA; ctx.font = `900 ${Math.max(8, w * .13)}px Inter`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, 0, 1); ctx.restore();
  ctx.restore();
}

// mouth openness for a spoken line between a and b (syllable rhythm with short word pauses); replaced by word timings after the voiceover
function talkAt(t, a, b, rate = 6.2) {
  if (t < a || t > b) return null;
  const u = (t - a) * rate, syl = Math.floor(u), ph = u - syl;
  if (rnd(syl * 13 + Math.floor(a * 10)) < .16) return 0.0; // little pause between words
  const fade = clamp((t - a) / .08) * clamp((b - t) / .08);
  return Math.sin(ph * Math.PI) * (.55 + .45 * rnd(syl * 7 + 3)) * fade;
}

// a short open-mouth surprise, then the mouth closes and the eyes stay wide
function surprised(t, at) { return t < at + .7 ? 'shock' : 'stunned'; }
