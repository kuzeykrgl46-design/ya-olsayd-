"""Procedurally synthesised soundtrack for "Ya Olsaydı? #1" (45 s, royalty-free).

Structure (seconds):
  0.4        boom as the title lands, rumble while the land cracks
  0.4-33.3   epic D-minor loop (Dm-Bb-F-C): pads, pulsing strings, bass, timpani
  33.3-37.8  build-up (riser + snare roll) over "12 şehir yeni sahil kazandı..."
  37.8       hard cut to silence
  38.3-42    lonely sad violin for "Ankara'ya yine deniz çıkmadı."
  42-45      soft outro under the call-to-action
Usage: python3 music.py out.wav
"""
import sys
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR = 44100
DUR = 45.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
L = np.zeros(N)
R = np.zeros(N)

BPM = 90
BEAT = 60 / BPM
BAR = BEAT * 4
START = 0.4
CUT = 37.8
SCENES = [4.5, 10.2, 16.2, 22.2, 28.2, 33.3]  # scene transitions (whooshes)


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def tt(dur):
    return np.arange(int(dur * SR)) / SR


def lp(x, fc, order=2):
    return sosfilt(butter(order, fc, 'low', fs=SR, output='sos'), x)


def hp(x, fc, order=2):
    return sosfilt(butter(order, fc, 'high', fs=SR, output='sos'), x)


def add(sig, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= N:
        return
    sig = sig[:N - i]
    gl, gr = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    L[i:i + len(sig)] += sig * gain * gl
    R[i:i + len(sig)] += sig * gain * gr


def saw(freq, dur, harmonics=14, detune=0.0, vib=0.0, vib_rate=5.5):
    t = tt(dur)
    f = freq * (1 + detune) * (1 + vib * np.sin(2 * np.pi * vib_rate * t))
    phase = 2 * np.pi * np.cumsum(f) / SR
    out = np.zeros_like(t)
    for k in range(1, harmonics + 1):
        if freq * k > 12000:
            break
        out += np.sin(k * phase) / k
    return out * 0.6


def env(n, a, d, s, r, total):
    """ADSR envelope in seconds, length = total."""
    t = tt(total)
    e = np.ones_like(t) * s
    e[t < a] = t[t < a] / max(a, 1e-4)
    m = (t >= a) & (t < a + d)
    e[m] = 1 - (1 - s) * (t[m] - a) / max(d, 1e-4)
    rel = t > total - r
    e[rel] *= np.clip((total - t[rel]) / max(r, 1e-4), 0, 1)
    return e[:n]


# ---------------- harmony ----------------
CHORDS = [  # (bass root, pad notes)
    (38, [50, 53, 57, 62]),  # Dm
    (34, [46, 50, 53, 58]),  # Bb
    (41, [53, 57, 60, 65]),  # F
    (36, [48, 52, 55, 60]),  # C
]


def intensity(t):
    """Overall arrangement density 0..1 over time."""
    if t < 4.4:
        return 0.35
    if t < 33.3:
        return 1.0
    return 1.0 + 0.4 * (t - 33.3) / (CUT - 33.3)


bar_t = START
k = 0
while bar_t < CUT:
    bass, notes = CHORDS[k % 4]
    dur = min(BAR, CUT - bar_t)
    inten = intensity(bar_t)
    # pads: detuned saws, soft attack, warm low-pass
    pad = np.zeros(int(dur * SR))
    for m in notes:
        for dt in (-0.004, 0.004):
            pad += saw(mtof(m), dur, harmonics=10, detune=dt)
    pad = lp(pad, 1800) * env(len(pad), 0.5, 0.3, 0.85, 0.4, dur)
    add(pad, bar_t, 0.05 * (0.7 + 0.3 * inten), pan=-0.2)
    add(pad, bar_t + 0.012, 0.05 * (0.7 + 0.3 * inten), pan=0.2)
    # bass: sustained saw an octave down + sub sine
    b = lp(saw(mtof(bass), dur, harmonics=8), 400) + 0.6 * np.sin(2 * np.pi * mtof(bass - 12) * tt(dur))
    b *= env(len(b), 0.05, 0.2, 0.8, 0.2, dur)
    add(b, bar_t, 0.11 * min(inten, 1))
    if bar_t >= 4.4:
        # pulsing staccato strings (eighth notes, arpeggiated chord tones)
        arp = [notes[1] + 12, notes[2] + 12, notes[3] + 12, notes[2] + 12]
        for j in range(8):
            nt = bar_t + j * BEAT / 2
            if nt >= CUT:
                break
            d = BEAT / 2 * 0.8
            s = lp(saw(mtof(arp[j % 4]), d, harmonics=12), 3200) * env(int(d * SR), 0.005, 0.12, 0.25, 0.05, d)
            add(s, nt, 0.05 * inten, pan=0.35 if j % 2 else -0.35)
        # timpani on beats 1 and 3
        for beat in (0, 2):
            ht = bar_t + beat * BEAT
            if ht >= CUT:
                break
            d = 0.9
            t = tt(d)
            f = mtof(bass) * (1 + 0.5 * np.exp(-t * 30))
            tim = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5)
            tim += lp(rng.standard_normal(len(t)), 300) * np.exp(-t * 25) * 0.6
            add(tim, ht, 0.22 * min(inten, 1.2))
    bar_t += BAR
    k += 1

# ---------------- intro boom + crack rumble ----------------
t = tt(3.0)
boom = np.sin(2 * np.pi * np.cumsum(55 * np.exp(-t * 1.2) + 28) / SR) * np.exp(-t * 1.4)
boom += lp(rng.standard_normal(len(t)), 180) * np.exp(-t * 3) * 0.8
add(boom, START, 0.55)
rum = lp(rng.standard_normal(int(2.8 * SR)), 120, 4)
rum *= np.sin(np.linspace(0, np.pi, len(rum))) * (1 + 0.5 * np.sin(2 * np.pi * 7 * tt(2.8)))
add(rum, 1.0, 1.6)

# ---------------- whooshes on scene changes ----------------
for st in SCENES:
    d = 0.9
    nz = rng.standard_normal(int(d * SR))
    sweep = np.zeros_like(nz)
    # crude moving band-pass: blend of low-passes rising in cutoff
    for i, fc in enumerate(np.geomspace(300, 6000, 6)):
        seg = lp(nz, fc)
        w = np.exp(-((np.linspace(0, 1, len(nz)) - i / 5) ** 2) / 0.04)
        sweep += seg * w
    sweep *= np.sin(np.linspace(0, np.pi, len(nz))) ** 2
    add(hp(sweep, 200), st - d * 0.75, 0.12, pan=-0.4)
    add(hp(sweep, 200), st - d * 0.75 + 0.02, 0.12, pan=0.4)

# ---------------- build-up: riser + snare roll ----------------
rd = CUT - 33.3
t = tt(rd)
f = np.geomspace(mtof(50), mtof(74), len(t))
riser = np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.5 * np.sin(4 * np.pi * np.cumsum(f) / SR)
riser += hp(rng.standard_normal(len(t)), 2000) * np.linspace(0, 1, len(t)) * 0.8
riser *= np.linspace(0, 1, len(t)) ** 2
add(riser, 33.3, 0.07)
rt = 33.3
while rt < CUT - 0.05:
    prog = (rt - 33.3) / rd
    d = 0.08
    sn = hp(rng.standard_normal(int(d * SR)), 1500) * np.exp(-tt(d) * 40)
    add(sn, rt, 0.05 + 0.12 * prog, pan=0.1)
    rt += BEAT / 2 * (1 - 0.75 * prog)  # accelerating roll

# ---------------- hard cut ----------------
ci = int(CUT * SR)
fade = int(0.015 * SR)
for ch in (L, R):
    ch[ci:ci + fade] *= np.linspace(1, 0, fade)
    ch[ci + fade:] = 0

# ---------------- sad violin (Ankara) ----------------
melody = [(69, 0.9), (67, 0.45), (65, 0.45), (64, 0.7), (62, 1.4)]  # A G F E D
vt = 38.3
for m, d in melody:
    v = saw(mtof(m), d + 0.25, harmonics=16, vib=0.006, vib_rate=5.2)
    v = lp(v, 3500) * env(len(v), 0.14, 0.1, 0.85, 0.3, d + 0.25)
    add(v, vt, 0.11, pan=0.1)
    vt += d
# soft low pad under it
pd = 3.8
pad = sum(saw(mtof(m), pd, harmonics=6) for m in (50, 57, 62))
pad = lp(pad, 900) * env(int(pd * SR), 0.8, 0.2, 0.8, 1.0, pd)
add(pad, 38.4, 0.025)

# ---------------- outro under the CTA ----------------
od = DUR - 42.0
for i, m in enumerate([62, 65, 69, 74, 69, 65, 62, 65]):
    d = 0.6
    pl = saw(mtof(m), d, harmonics=8) * np.exp(-tt(d) * 6)
    add(lp(pl, 2500), 42.1 + i * 0.36, 0.05, pan=-0.3 if i % 2 else 0.3)
pad = sum(saw(mtof(m), od, harmonics=6) for m in (50, 53, 57))
pad = lp(pad, 1200) * env(int(od * SR), 0.6, 0.2, 0.8, 1.2, od)
add(pad, 42.0, 0.03)

# ---------------- reverb ----------------
irn = int(2.4 * SR)
tir = np.arange(irn) / SR
irL = rng.standard_normal(irn) * np.exp(-tir * 2.8)
irR = rng.standard_normal(irn) * np.exp(-tir * 2.8)
irL, irR = lp(irL, 5000), lp(irR, 5000)
irL /= np.sqrt((irL ** 2).sum())
irR /= np.sqrt((irR ** 2).sum())
wetL = fftconvolve(L, irL)[:N]
wetR = fftconvolve(R, irR)[:N]
# the hard cut must stay dry/silent except for the violin that follows it
outL = L + 0.35 * wetL
outR = R + 0.35 * wetR
gap = slice(int((CUT + 0.02) * SR), int(38.25 * SR))
outL[gap] = 0
outR[gap] = 0
# short release over the cut point so the reverb tail doesn't click
outL[ci:ci + fade] *= np.linspace(1, 0, fade)
outR[ci:ci + fade] *= np.linspace(1, 0, fade)

# final fade-out
fo = int(1.2 * SR)
outL[-fo:] *= np.linspace(1, 0, fo)
outR[-fo:] *= np.linspace(1, 0, fo)

st = np.stack([outL, outR], 1)
st /= np.max(np.abs(st)) / 0.89
wavfile.write(sys.argv[1] if len(sys.argv) > 1 else 'music.wav', SR, (st * 32767).astype(np.int16))
print('ok')
