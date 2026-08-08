#!/usr/bin/env python3
from pathlib import Path
import csv,json,sys
ROOT=Path(__file__).resolve().parents[1]; D=ROOT/'docs'
required=['BATCH1_PAGE_GATE.csv','BATCH1_CANNIBALIZATION.csv','BATCH1_ASSET_GATE.json','BATCH1_INTERNAL_LINK_SOURCE_GATE.json','BATCH1_TOP10_COMPETITOR_BENCHMARK.csv','BATCH1_RANK_GATE.csv']
missing=[x for x in required if not (D/x).exists()]
if missing:
    print(json.dumps({'gate':'FAIL','missing_artifacts':missing},indent=2));sys.exit(2)
page=list(csv.DictReader((D/'BATCH1_PAGE_GATE.csv').open(encoding='utf-8')))
page_pass=all(r['status']=='PASS' for r in page) and len(page)==10
cann=list(csv.DictReader((D/'BATCH1_CANNIBALIZATION.csv').open(encoding='utf-8')))
cann_pass=all(r['risk']!='HIGH' for r in cann)
asset=json.loads((D/'BATCH1_ASSET_GATE.json').read_text(encoding='utf-8'))
links=json.loads((D/'BATCH1_INTERNAL_LINK_SOURCE_GATE.json').read_text(encoding='utf-8'))
comp=list(csv.DictReader((D/'BATCH1_TOP10_COMPETITOR_BENCHMARK.csv').open(encoding='utf-8')))
comp_pass=len(comp)==10 and all(r['PREDEPLOY_COMPETITIVE_GATE']=='PASS' for r in comp)
rank=list(csv.DictReader((D/'BATCH1_RANK_GATE.csv').open(encoding='utf-8')))
rank_pass=len(rank)==10
rank_fail=[]
for r in rank:
    try: pos=float(r['AVERAGE_POSITION'])
    except: pos=None
    if r['TOP3_GATE']!='PASS' or pos is None or pos>3:
        rank_pass=False;rank_fail.append({'url':r['URL'],'query':r['PRIMARY_QUERY'],'position':pos,'status':r['STATUS']})
predeploy=page_pass and cann_pass and asset.get('gate')=='PASS' and links.get('gate')=='PASS' and comp_pass
sealed=predeploy and rank_pass
result={'batch_size':10,'predeploy_content_technical_gate':'PASS' if predeploy else 'FAIL','actual_google_top3_gate':'PASS' if rank_pass else 'FAIL','batch_seal':'PASS' if sealed else 'OPEN','rank_blockers':rank_fail}
(D/'BATCH1_SEAL_RESULT.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,ensure_ascii=False,indent=2))
# OPEN because Google has not recrawled is an expected non-zero result only when called with --require-seal.
if '--require-seal' in sys.argv and not sealed: sys.exit(3)
if not predeploy: sys.exit(2)
