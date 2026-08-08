#!/usr/bin/env python3
from pathlib import Path
from collections import Counter
import csv, json, math, re, sys

ROOT=Path(__file__).resolve().parents[1]
PAGES={
 '/':('src/pages/index.astro','animatori pentru petreceri copii București și Ilfov','umbrella-commercial'),
 '/animatori-petreceri-copii-bucuresti/':('src/pages/animatori-petreceri-copii-bucuresti.astro','animatori petreceri copii București','local-bucuresti'),
 '/animatori-petreceri-copii-ilfov/':('src/pages/animatori-petreceri-copii-ilfov.astro','animatori petreceri copii Ilfov','local-ilfov'),
 '/animatori-petreceri-copii/':('src/pages/animatori-petreceri-copii.astro','cum alegi animator pentru petrecere copii','informational-guide'),
 '/servicii/':('src/pages/servicii.astro','servicii petreceri copii București Ilfov','service-hub'),
 '/mascote-petreceri-copii/':('src/pages/mascote-petreceri-copii.astro','închiriere mascote petreceri copii București','mascote'),
 '/animatori-pe-picioroange/':('src/pages/animatori-pe-picioroange.astro','animatori pe picioroange București','picioroange'),
 '/decoratiuni-baloane-bucuresti/':('src/pages/decoratiuni-baloane-bucuresti.astro','decorațiuni baloane București','decor'),
 '/magician-petreceri-copii/':('src/pages/magician-petreceri-copii.astro','magician petreceri copii București','magician'),
 '/vata-de-zahar-popcorn-evenimente/':('src/pages/vata-de-zahar-popcorn-evenimente.astro','vată de zahăr popcorn evenimente București','food-stations'),
}
BANNED=[
 '15 ani','80+','570+','2-3 ore','2–3 ore','350 RON','1450 RON','2750 RON',
 '2.5 - 3 metri','2,5 - 3 metri','sesiune foto profesională la minut','sistem audio profesional',
 'Balloon Exploder','12 copii','15 copii','40-60 minute','40–60 minute','4-5 ani','4–5 ani'
]
STOP=set('si sau de din la cu pentru in în pe un o una unui unei este sunt ca care iar prin dupa după mai se sa să acest aceasta aceste acel acea ale lor noi voi ei ele'.split())

def strip_source(s):
    # Evaluate only the template body, not imports/schema/frontmatter code.
    parts=s.split('---',2)
    if len(parts)==3: s=parts[2]
    # Preserve selected content props from reusable components before stripping tags.
    props=[]
    for tag in re.findall(r'<(?:BatchHero|PhotoProof|RelatedServices)[\s\S]*?>',s,re.I):
        props += re.findall(r'(?:title|lead|kicker|note|caption|text)=\"([^\"]+)\"',tag,re.I)
    s=re.sub(r'<script[\s\S]*?</script>',' ',s,flags=re.I)
    s=re.sub(r'<style[\s\S]*?</style>',' ',s,flags=re.I)
    s=re.sub(r'<[^>]+>',' ',s)
    s=re.sub(r'\{[^{}]{0,600}\}',' ',s)
    s=re.sub(r'[^0-9A-Za-zĂÂÎȘȚăâîșț\- ]+',' ',s)
    return ' '.join(props)+' '+' '.join(s.split())

def tokens(s):
    return [x for x in re.findall(r'[a-zăâîșț0-9]+',s.lower()) if len(x)>2 and x not in STOP]

def cosine(a,b):
    ca,cb=Counter(tokens(a)),Counter(tokens(b)); keys=set(ca)|set(cb)
    dot=sum(ca[k]*cb[k] for k in keys); na=math.sqrt(sum(v*v for v in ca.values())); nb=math.sqrt(sum(v*v for v in cb.values()))
    return dot/(na*nb) if na and nb else 0.0

def first(pattern,s):
    m=re.search(pattern,s,re.S|re.I); return re.sub(r'<[^>]+>',' ',m.group(1)).strip() if m else ''

rows=[]; texts={}; titles=[]; canonicals=[]; failures=[]
for url,(rel,query,family) in PAGES.items():
    path=ROOT/rel
    if not path.exists(): failures.append(f'MISSING_FILE {rel}'); continue
    src=path.read_text(encoding='utf-8')
    title=first(r'<Layout[^>]*\btitle="([^"]+)"',src) or first(r'<Layout[^>]*\btitle=\{["\']([^"\']+)',src)
    canonical=first(r'\bcanonical="([^"]+)"',src)
    if not canonical and re.search(r'\bcanonical=\{url\}',src):
        canonical=first(r"const\s+url\s*=\s*['\"]([^'\"]+)",src)
    if not canonical and url=='/': canonical='https://animaparty.ro/'
    h1=first(r'<h1[^>]*>(.*?)</h1>',src) or first(r'<BatchHero[\s\S]*?\btitle="([^"]+)"',src)
    text=strip_source(src); texts[url]=text
    banned=[b for b in BANNED if b.lower() in src.lower()]
    status='PASS'
    notes=[]
    if not title: status='FAIL'; notes.append('missing title')
    if not h1 and url!='/': status='FAIL'; notes.append('missing h1')
    if url!='/' and canonical != 'https://animaparty.ro'+url: status='FAIL'; notes.append('canonical mismatch')
    if banned: status='FAIL'; notes.append('banned:'+','.join(banned))
    if title in titles: status='FAIL'; notes.append('duplicate title')
    if canonical and canonical in canonicals: status='FAIL'; notes.append('duplicate canonical')
    titles.append(title); canonicals.append(canonical)
    rows.append({'url':url,'primary_query':query,'intent_family':family,'title':title,'h1':h1,'canonical':canonical,'status':status,'notes':'; '.join(notes)})
    if status=='FAIL': failures.append(f'{url}: {notes}')

similar=[]
urls=list(texts)
for i in range(len(urls)):
    for j in range(i+1,len(urls)):
        score=cosine(texts[urls[i]],texts[urls[j]])
        if score>=0.35:
            risk='HIGH' if score>=0.62 else ('MEDIUM' if score>=0.48 else 'LOW')
            similar.append({'url_a':urls[i],'url_b':urls[j],'similarity':round(score,3),'risk':risk})
            if risk=='HIGH': failures.append(f'HIGH_CANNIBALIZATION {urls[i]} <> {urls[j]} = {score:.3f}')

out=ROOT/'docs'; out.mkdir(exist_ok=True)
with (out/'BATCH1_PAGE_GATE.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=rows[0].keys()); w.writeheader(); w.writerows(rows)
with (out/'BATCH1_CANNIBALIZATION.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=['url_a','url_b','similarity','risk']); w.writeheader(); w.writerows(similar)
result={'batch_size':len(PAGES),'page_pass':sum(r['status']=='PASS' for r in rows),'high_cannibalization':sum(x['risk']=='HIGH' for x in similar),'failures':failures,'gate':'PASS' if not failures and len(rows)==10 else 'FAIL'}
(out/'BATCH1_GATE_RESULT.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(result,ensure_ascii=False,indent=2))
sys.exit(0 if result['gate']=='PASS' else 1)
