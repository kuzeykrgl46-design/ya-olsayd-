"""Procedural soundtrack for Ya Olsaydı #2 Kış Bölüm 4 (final, 35.6 s, royalty-free). Timings follow timeline4.js."""
import sys
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR = 44100
DUR = 35.6
N = int(SR * DUR)
rng = np.random.default_rng(7)
L = np.zeros(N)
R = np.zeros(N)

BPM = 90
BEAT = 60 / BPM
BAR = BEAT * 4
START = 0.4


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



# ---------------- Episode 2 arrangement ----------------

MAJOR = [(41, [53, 57, 60, 65]), (36, [48, 52, 55, 60]), (38, [50, 53, 57, 62]), (34, [46, 50, 53, 58])]  # F C Dm Bb
MINOR = [(38, [50, 53, 57, 62]), (34, [46, 50, 53, 58]), (43, [55, 58, 62, 67]), (45, [57, 61, 64, 69])]  # Dm Bb Gm A


def section(t0, t1, chords, pulse_gain, timp_gain, pad_gain, bright):
    bar_t, k = t0, 0
    while bar_t < t1 - 0.05:
        bass, notes = chords[k % 4]
        dur = min(BAR, t1 - bar_t)
        pad = np.zeros(int(dur * SR))
        for m in notes:
            for dt in (-0.004, 0.004):
                pad += saw(mtof(m), dur, harmonics=10, detune=dt)
        pad = lp(pad, 2200 if bright else 1600) * env(len(pad), 0.3, 0.3, 0.85, 0.2, dur)
        add(pad, bar_t, pad_gain, pan=-0.2); add(pad, bar_t + 0.012, pad_gain, pan=0.2)
        b = lp(saw(mtof(bass), dur, harmonics=8), 420) + 0.6 * np.sin(2 * np.pi * mtof(bass - 12) * tt(dur))
        add(b * env(len(b), 0.03, 0.2, 0.8, 0.15, dur), bar_t, 0.1)
        # plucky arpeggio (bright) or staccato strings (tense)
        arp = [notes[1] + 12, notes[2] + 12, notes[3] + 12, notes[2] + 12]
        for j in range(8):
            nt = bar_t + j * BEAT / 2
            if nt >= t1 - 0.02:
                break
            d = BEAT / 2 * (0.6 if bright else 0.8)
            if bright:
                s = saw(mtof(arp[j % 4] + 12 * (j % 2)), d, harmonics=6) * np.exp(-tt(d) * 9)
            else:
                s = lp(saw(mtof(arp[j % 4]), d, harmonics=12), 3200) * env(int(d * SR), 0.005, 0.12, 0.25, 0.05, d)
            add(s, nt, pulse_gain, pan=0.35 if j % 2 else -0.35)
        for beat in (0, 2):
            ht = bar_t + beat * BEAT
            if ht >= t1 - 0.02 or timp_gain <= 0:
                continue
            d = 0.8; t = tt(d)
            f = mtof(bass) * (1 + 0.5 * np.exp(-t * 30))
            tim = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5) + lp(rng.standard_normal(len(t)), 300) * np.exp(-t * 25) * 0.6
            add(tim, ht, timp_gain)
        bar_t += BAR; k += 1


def boom(at, gain):
    t = tt(2.5)
    b = np.sin(2 * np.pi * np.cumsum(55 * np.exp(-t * 1.2) + 28) / SR) * np.exp(-t * 1.6)
    b += lp(rng.standard_normal(len(t)), 180) * np.exp(-t * 3) * 0.8
    add(b, at, gain)


def pluck_run(at, notes, step, gain):
    for i, m in enumerate(notes):
        d = 0.5
        add(lp(saw(mtof(m), d, harmonics=8) * np.exp(-tt(d) * 7), 2800), at + i * step, gain, pan=-0.3 if i % 2 else 0.3)



# ---------------- Bölüm 4 arrangement (video seconds, see timeline4.js) ----------------
SABAH, QUOTE, BABA, AGAIN, KARS, SIVAS, BURSA = 3.21, 5.67, 6.61, 8.49, 10.38, 15.44, 18.83
AKSAM, GECE, FIN, NEXT, CUT, ASK = 21.33, 24.01, 26.7, 29.01, 32.13, 32.8
SCENES = [SABAH, BABA, KARS, 11.69, SIVAS, BURSA, AKSAM, GECE, FIN]


def bells(t0, t1):
    step = BEAT / 2; tb = t0
    while tb < t1:
        d = 0.12
        bell = hp(rng.standard_normal(int(d * SR)), 6000) * np.exp(-tt(d) * 35)
        bell += 0.3 * np.sin(2 * np.pi * 5200 * tt(d)) * np.exp(-tt(d) * 30)
        add(bell, tb, 0.05 if int((tb - t0) / step) % 2 else 0.08, pan=0.25)
        tb += step


pluck_run(0.4, [84, 88, 91, 96, 100], 0.12, 0.06)            # shimmer
section(0.3, AKSAM, MAJOR, 0.05, 0.06, 0.04, True)            # the day: light, playful
bells(0.3, AKSAM)
pluck_run(QUOTE - 0.05, [72, 76, 79, 84], 0.07, 0.07)         # "Okula böyle git!" sting
pluck_run(AGAIN, [96, 91, 88, 84, 79], 0.06, 0.06)            # snow falls again
for at, root in [(12.35, 81), (15.79, 79), (19.18, 83)]:
    pluck_run(at, [root, root + 4, root + 7], 0.09, 0.05)
section(AKSAM, FIN, MAJOR, 0.025, 0.0, 0.045, False)          # cosy evening: soft, no timpani
pluck_run(GECE + 0.1, [77, 81, 84, 89], 0.25, 0.04)           # lullaby
section(FIN, CUT, MAJOR, 0.04, 0.05, 0.04, True)              # final card + teaser
bells(FIN, CUT)
boom(CUT, 0.32)                                               # signal lost
od = DUR - CUT                                                # outro after the cut
pad = sum(saw(mtof(m_), od, harmonics=6) for m_ in (50, 53, 57, 62))
add(lp(pad, 1200) * env(int(od * SR), 0.2, 0.3, 0.8, 1.0, od), CUT + 0.1, 0.03)
pluck_run(ASK + 0.2, [74, 77, 81, 86], 0.3, 0.045)
for st in SCENES:                                             # whooshes on scene changes
    d = 0.8
    nz = rng.standard_normal(int(d * SR)); sweep = np.zeros_like(nz)
    for i, fc in enumerate(np.geomspace(300, 6000, 6)):
        sweep += lp(nz, fc) * np.exp(-((np.linspace(0, 1, len(nz)) - i / 5) ** 2) / 0.04)
    sweep *= np.sin(np.linspace(0, np.pi, len(nz))) ** 2
    add(hp(sweep, 200), st - d * 0.75, 0.1, pan=-0.4); add(hp(sweep, 200), st - d * 0.75 + 0.02, 0.1, pan=0.4)
# TV static hiss when the signal drops
d = 0.6; add(hp(rng.standard_normal(int(d * SR)), 2500) * np.exp(-tt(d) * 4), CUT, 0.08)

# reverb
irn = int(2.0 * SR); tir = np.arange(irn) / SR
irL = lp(rng.standard_normal(irn) * np.exp(-tir * 3), 5000); irR = lp(rng.standard_normal(irn) * np.exp(-tir * 3), 5000)
irL /= np.sqrt((irL ** 2).sum()); irR /= np.sqrt((irR ** 2).sum())
outL = L + 0.3 * fftconvolve(L, irL)[:N]; outR = R + 0.3 * fftconvolve(R, irR)[:N]
fo = int(1.2 * SR)
outL[-fo:] *= np.linspace(1, 0, fo); outR[-fo:] *= np.linspace(1, 0, fo)
st = np.stack([outL, outR], 1); st /= np.max(np.abs(st)) / 0.89
wavfile.write(sys.argv[1] if len(sys.argv) > 1 else 'music.wav', SR, (st * 32767).astype(np.int16))
print('ok')
