#!/usr/bin/env python3
from pathlib import Path
import re,json,csv,sys
ROOT=Path(__file__).resolve().parents[1]
known={'/','/animatori-petreceri-copii-bucuresti/','/animatori-petreceri-copii-ilfov/','/animatori-petreceri-copii/','/servicii/','/mascote-petreceri-copii/','/animatori-pe-picioroange/','/decoratiuni-baloane-bucuresti/','/magician-petreceri-copii/','/vata-de-zahar-popcorn-evenimente/','/contact/'}
rows=[];bad=[]
for f in (ROOT/'src').rglob('*.astro'):
 t=f.read_text(encoding='utf-8')
 for href in re.findall(r'href\s*=\s*["\']([^"\']+)["\']',t):
  if not href.startswith('/'): continue
  base=href.split('#',1)[0].split('?',1)[0]
  if base=='': base='/'
  if base!='/' and not base.endswith('/') and '.' not in base.rsplit('/',1)[-1]: base+='/'
  status='PASS' if base in known or base.startswith('/#') or re.search(r'\.(?:png|jpe?g|webp|svg|ico)$',base,re.I) else 'UNKNOWN_ROUTE'
  rows.append([str(f.relative_to(ROOT)),href,base,status])
  if status!='PASS':bad.append((str(f.relative_to(ROOT)),href))
out=ROOT/'docs';out.mkdir(exist_ok=True)
with (out/'BATCH1_INTERNAL_LINK_SOURCE_GATE.csv').open('w',newline='',encoding='utf-8') as fh:
 w=csv.writer(fh);w.writerow(['SOURCE','HREF','NORMALIZED','STATUS']);w.writerows(rows)
res={'checked':len(rows),'unknown_routes':bad,'gate':'PASS' if not bad else 'FAIL'}
(out/'BATCH1_INTERNAL_LINK_SOURCE_GATE.json').write_text(json.dumps(res,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(res,ensure_ascii=False,indent=2))
sys.exit(0 if not bad else 2)
