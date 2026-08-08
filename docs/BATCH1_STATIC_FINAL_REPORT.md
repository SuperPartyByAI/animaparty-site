# AnimaParty Batch 1 — 10 page predeploy report

## Batch status

- Batch size: **10 pages**
- Contact page: regression control only
- Source page gate: **10/10 PASS**
- High cannibalization pairs: **0**
- Static asset gate: **PASS**
- Predeploy competitive content/intent gate: **10/10 PASS**
- Actual Google Top 3 gate: **FAIL / OPEN** (expected before deployment and recrawl)
- Batch seal: **OPEN**

The batch is deliberately **not marked complete**. User rule is enforced mechanically by `scripts/batch_seal_gate.py`: all 10 primary queries must have independently confirmed Google/GSC positions <= 3 before the batch can be sealed.

## Current GSC baseline captured before this package

Property: `https://animaparty.ro/`

Processed through 2026-08-06:

- clicks: 22
- impressions: 751
- CTR: 2.9%
- average position: 9.7
- homepage: 22 clicks / 728 impressions
- legacy `/blog/`: 0 clicks / 29 impressions
- `animatori petreceri copii bucuresti`: 0 clicks / 10 impressions / average position 20.3
- `animatori petreceri copii ilfov`: 0 clicks / 23 impressions / average position 13.3

These metrics predate this Batch 1 content package and therefore are only a baseline.

## What changed

1. Premium but restrained cream/navy/gold/coral visual system and AnimaParty logo mark.
2. Unique commercial owner for București intent.
3. Unique commercial owner for Ilfov intent.
4. Informational guide separated from commercial local pages.
5. `/servicii/` converted into a true service routing hub.
6. Mascote explicitly separated from animator programs and stripped of unsupported hard price/duration claims.
7. Picioroange stripped of unverified numeric height/safety/equipment claims.
8. Decor page centered on arcade/helium/photo-corner decision and quotation inputs, without hard helium/install guarantees.
9. Magician page separated from animator intent, without fabricated age/duration/price claims.
10. Vată/popcorn page clearly handles machine/operator/consumables/logistics and avoids universal unlimited-serving promises.
11. Site-wide Organization + WebSite entity graph.
12. Stronger related-service linking and crawlable header/footer architecture.
13. Automated semantic cannibalization gate.
14. Automated asset gate.
15. Corrected delivery-proof pipeline: rendered hash uses actual Playwright `document.body.innerText`.
16. Independent proof verifier recalculates hashes independently.
17. Googlebot parity and raw crawl-graph scripts upgraded to the entire batch plus `/contact/`.

## Images

Existing AnimaParty presentation assets are reused. Legacy Kassia-named source references were removed from page code; the mascot asset was copied to `animaparty-mascota-fairy.jpg`. No claim is made that every illustrative asset is a documentary photo from a specific AnimaParty event unless provenance is separately proven.

## Build status in ChatGPT environment

The ChatGPT artifact environment cannot complete `npm ci` because its internal npm proxy returns HTTP 404 for public dependency `zwitch@2.0.4`. This environment limitation is recorded in `BATCH1_LOCAL_BUILD_STATUS.md` and raw log.

Therefore **no production build PASS is claimed locally**. Antigravity/server build is a hard deployment gate.

## Next gate after deploy

ChatGPT re-verifies live in Opera + GSC + internal browser. Any page outside Top 3 remains FAIL and is iterated again. `9/10` is never accepted as batch completion.
