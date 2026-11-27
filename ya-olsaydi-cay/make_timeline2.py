"""Build timeline2.js from audio/take_c2.mp3 word timestamps (voice starts at 0.3 s video time)."""
import json, re
O = 0.3
W = [w for w in json.load(open('audio/take_c2.mp3.words.json'))['words'] if w.get('type', 'word') == 'word' and not w['text'].startswith('[')]
clean = lambda s: re.sub(r'[^\wçğıöşüÇĞİÖŞÜ]', '', s)
def find(txt, after=0):
    for i, w in enumerate(W):
        if i >= after and clean(w['text']) == txt: return i
    raise KeyError(txt)
cv = lambda s: round(s + O, 2)
B = lambda i: round(W[i]['start'] + O - .15, 2)
keys = ['hook', 'rize', 'izmir', 'erzurum', 'babalar', 'anne', 'fin']
starts = ['Çaysız', 'Rizeliler', 'İzmirliler', 'Erzurumda', 'Babalar', 'Ama', 'Senin']
idx = []; a = 0
for s in starts: a = find(s, a); idx.append(a); a += 1
dur = round(W[-1]['end'] + O + 1.5, 2)
TL = {}
for k, i, j in zip(keys, idx, idx[1:] + [None]): TL[k] = [0 if k == 'hook' else B(i), B(j) if j is not None else dur]
TL['izmirMid'] = cv(W[find('ikinci')]['start'])
line = lambda f, l: [[cv(w['start']), cv(w['end']), clean(w['text'])] for w in W[f:l + 1]]
TL['talk'] = {'hook': line(idx[0], idx[1] - 1), 'rize': line(find('Tek'), find('kahramandır')), 'izmir': line(find('Biz'), find('kahveciyiz'))}
TL['dur'] = dur
subs = []
for n, (i, j) in enumerate(zip(idx, idx[1:] + [len(W)])):
    ws = W[i:j]; text = ' '.join(w['text'] for w in ws)
    st = 0.35 if n == 0 else round(B(i) + .05, 2)
    subs.append([st, TL[keys[n]][1], text, cv(ws[0]['start']), round(ws[-1]['end'] - ws[0]['start'], 2)])
out = "// Bölüm 2 timing, from audio/take_c2.mp3 word timestamps (voice starts at 0.3 s video time). Built by make_timeline2.py.\n"
out += "window.TL = " + json.dumps(TL, ensure_ascii=False) + ";\nwindow.SUBS_DATA = [\n" + ",\n".join("  " + json.dumps(s, ensure_ascii=False) for s in subs) + "\n];\n"
open('timeline2.js', 'w').write(out); print(out)
