#!/usr/bin/env python3
from pathlib import Path
import re, json, csv, sys
ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'src'; PUBLIC=ROOT/'public'; DOCS=ROOT/'docs'
exts=r'(?:png|jpe?g|webp|svg|gif|ico|avif)'
patterns=[re.compile(r'''(?:src|image)\s*=\s*["'](/[^"']+\.%s)["']'''%exts,re.I),re.compile(r'''(?:src|image)\s*:\s*["'](/[^"']+\.%s)["']'''%exts,re.I)]
refs=[]
for f in SRC.rglob('*'):
    if not f.is_file(): continue
    try: text=f.read_text(encoding='utf-8')
    except Exception: continue
    for p in patterns:
        for m in p.finditer(text): refs.append((str(f.relative_to(ROOT)),m.group(1)))
rows=[]; missing=[]; legacy=[]
for src,ref in sorted(set(refs)):
    target=PUBLIC/ref.lstrip('/').split('?')[0]
    ok=target.exists()
    if not ok: missing.append(ref)
    if 'kassia' in ref.lower(): legacy.append(ref)
    rows.append([src,ref,'PASS' if ok else 'MISSING'])
DOCS.mkdir(exist_ok=True)
with (DOCS/'BATCH1_ASSET_GATE.csv').open('w',newline='',encoding='utf-8') as fh:
    w=csv.writer(fh); w.writerow(['SOURCE','ASSET','STATUS']); w.writerows(rows)
result={'references':len(rows),'missing_unique':sorted(set(missing)),'legacy_named_references':sorted(set(legacy)),'gate':'PASS' if not missing and not legacy else 'FAIL'}
(DOCS/'BATCH1_ASSET_GATE.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,ensure_ascii=False,indent=2))
sys.exit(0 if result['gate']=='PASS' else 2)
