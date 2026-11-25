"""Build timeline1.js from audio/take_c1.mp3 word timestamps (voice starts at 0.3 s video time)."""
import json, re
O = 0.3
W = [w for w in json.load(open('audio/take_c1.mp3.words.json'))['words'] if w.get('type', 'word') == 'word' and not w['text'].startswith('[')]
def find(txt, after=0):
    for i, w in enumerate(W):
        if i >= after and re.sub(r'[^\wçğıöşüÇĞİÖŞÜ]', '', w['text']).lower() == txt.lower(): return i
    raise KeyError(txt)
cv = lambda s: round(s + O, 2)
B = lambda i: round(W[i]['start'] + O - .15, 2)
starts = ['Bir', 'Babalar', 'Haberler', 'Kız', 'Kahvede', 'Karaborsa', 'Rizede', 'Peki', 'Çaysız']
idx = []; a = 0
for s in starts:
    if s == 'Çaysız': a = find('2de', a) + 1  # the closing line, not 'Türkiye çaysız'
    a = find(s, a); idx.append(a); a += 1
dur = round(W[-1]['end'] + O + 1.0, 2)
keys = ['kahvalti', 'baba', 'haber', 'kiz', 'kahve', 'kara', 'kasa', 'harita', 'fin']
TL = {}
for k, (i, j) in zip(keys, zip(idx, idx[1:] + [None])):
    TL[k] = [0 if k == 'kahvalti' else B(i), B(j) if j is not None else dur]
TL['soru'] = [round(TL['kiz'][0] + 1.0, 2), TL['kiz'][1]]
TL['kizZoom'] = cv(W[find('yoksa', idx[3])]['start']) - .2
def line(first, last):
    return [[cv(w['start']), cv(w['end']), re.sub(r'[^\wçğıöşüÇĞİÖŞÜ]', '', w['text'])] for w in W[first:last + 1]]
TL['talk'] = {'baba': line(find('Peynir'), find('ki', find('Peynir'))), 'spiker': line(find('Sevgili'), find('bitti')), 'kara': line(find('Abi'), find('bak', find('Abi')))}
TL['dur'] = dur
subs = []
for n, (i, j) in enumerate(zip(idx, idx[1:] + [len(W)])):
    ws = W[i:j]; text = ' '.join(w['text'] for w in ws)
    st = 0.35 if n == 0 else round(B(i) + .05, 2); en = TL[keys[n]][1]
    subs.append([st, en, text, cv(ws[0]['start']), round(ws[-1]['end'] - ws[0]['start'], 2)])
out = "// Bölüm 1 timing, from audio/take_c1.mp3 word timestamps (voice starts at 0.3 s video time). Built by make_timeline1.py.\n"
out += "window.TL = " + json.dumps(TL, ensure_ascii=False) + ";\nwindow.SUBS_DATA = [\n" + ",\n".join("  " + json.dumps(s, ensure_ascii=False) for s in subs) + "\n];\n"
open('timeline1.js', 'w').write(out); print(out[:1500])
