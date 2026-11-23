"""Procedural soundtrack for Ya Olsaydı #3 İnternet Bölüm 3 (38.4 s, royalty-free). Timings follow timeline3.js."""
import sys
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR = 44100
DUR = 38.4
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



# ---------------- Bölüm 3 arrangement (video seconds, see timeline3.js) ----------------
import json, re
TLD = json.loads(re.search(r'window.TL = (\{.*?\});', open(__file__.replace('music_internet3.py', 'timeline3.js')).read()).group(1))
FROZEN, JAPAN, USA, INFL, SORU, TAKSI, BEN, ANNE, EVDE, TEYZE, SKOR, UZAY, B4 = (TLD[k] if not isinstance(TLD[k], list) else TLD[k][0] for k in ['frozen', 'japan', 'usa', 'infl', 'soru', 'taksi', 'ben', 'anne', 'evde', 'teyze', 'skor', 'uzay', 'b4'])

# dark globe: ominous pad + power-down
pad = sum(saw(mtof(m_), FROZEN, harmonics=7) for m_ in (38, 45, 50))
add(lp(pad, 900) * env(int(FROZEN * SR), .4, .3, .85, .3, FROZEN), 0.0, 0.045)
d = 1.0; tt_ = tt(d); f = 300 * np.exp(-tt_ * 3) + 40
add(lp(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt_ * 2), 1000), 1.0, 0.16)
# the morning + world tour: light, curious pizzicato (major)
section(FROZEN, TAKSI, MAJOR, 0.05, 0.05, 0.04, True)
pluck_run(JAPAN + .1, [79, 81, 84, 88, 91], 0.1, 0.05)          # pentatonic chime for Japan
pluck_run(USA + .1, [72, 70, 67, 65], 0.08, 0.05)               # lost, falling
pluck_run(INFL + 1.2, [88, 84, 79, 76, 72], 0.07, 0.05)          # follower counter dropping
# Türkiye: warmer, bouncy, bells
section(TAKSI, UZAY, MAJOR, 0.06, 0.06, 0.045, True)
pluck_run(BEN - .05, [72, 76, 79, 84], 0.07, 0.07)               # "Ben yolu bilirim abi"
pluck_run(EVDE - .05, [74, 78, 81, 86], 0.07, 0.07)              # "Evde yemek var!"
for k in range(int((SKOR - TEYZE) / .25)):                       # phone ringing for auntie
    at = TEYZE + .2 + k * .25
    if k % 4 < 2: add(np.sin(2 * np.pi * 1300 * tt(.12)) * np.exp(-tt(.12) * 8) + .5 * np.sin(2 * np.pi * 1600 * tt(.12)) * np.exp(-tt(.12) * 8), at, 0.025)
# space: big, wide, rising
od = DUR - UZAY
pad = sum(saw(mtof(m_), od, harmonics=7) for m_ in (41, 48, 53, 57, 60))
add(lp(pad, 1400) * env(int(od * SR), 1.0, .5, .85, 1.2, od), UZAY, 0.05)
d = 2.5; n = rng.standard_normal(int(d * SR)); add(lp(n, 400) * np.minimum(1, tt(d) / 1.5) * np.exp(-np.maximum(0, tt(d) - 1.8) * 3), UZAY + .2, 0.06)   # rocket rumble
boom(B4, 0.25)
pluck_run(B4 + .1, [77, 81, 84, 89, 93], 0.22, 0.05)
for st in (FROZEN, JAPAN, USA, INFL, TAKSI, ANNE, TEYZE, SKOR, UZAY):   # whooshes on scene changes
    d = 0.8
    nz = rng.standard_normal(int(d * SR)); sweep = np.zeros_like(nz)
    for i, fc in enumerate(np.geomspace(300, 6000, 6)):
        sweep += lp(nz, fc) * np.exp(-((np.linspace(0, 1, len(nz)) - i / 5) ** 2) / 0.04)
    sweep *= np.sin(np.linspace(0, np.pi, len(nz))) ** 2
    add(hp(sweep, 200), st - d * 0.75, 0.09, pan=-0.4); add(hp(sweep, 200), st - d * 0.75 + 0.02, 0.09, pan=0.4)

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
