# ANIMAPARTY — CHATGPT BATCH 1 / 10 PAGES — DEPLOY INSTRUCTIONS

## Action ID

`ANIMAPARTY_CHATGPT_BATCH1_10PAGES_V1_DEPLOY`

## Authority

The ZIP contents are the **ChatGPT-authored source package** for this release.

Antigravity's role in this execution is limited to:

1. verify server identity and current live baseline;
2. back up current production;
3. run the supplied gates and clean build;
4. deploy this exact source atomically;
5. run the supplied public/live QA scripts;
6. version the exact deployed source safely in GitHub;
7. submit the sitemap through an already-authorized Search Console API if one exists;
8. return evidence.

**Do not rewrite, expand, paraphrase, "improve", regenerate, or replace the page content/design in this ZIP.**

## Expected live baseline before deploy

Before doing anything destructive, fetch without cache:

- `https://animaparty.ro/build-identity.json?predeploy=<UTC>`
- `https://animaparty.ro/.well-known/animaparty-delivery-proof.json?predeploy=<UTC>`
- `https://animaparty.ro/sitemap-0.xml?predeploy=<UTC>`

Expected prior public family at ChatGPT handoff time:

`animaparty-seo-v8-wave6r4-20260808T125308Z`

If production is now newer than this, **STOP and report `LIVE_ADVANCED_AFTER_CHATGPT_HANDOFF`**. Do not overwrite a newer site without ChatGPT re-verification.

## Planned release in this ZIP

Read `public/build-identity.json` and use its exact `release_id`.

Expected:

`animaparty-chatgpt-batch1-v1-20260808T214854Z`

Do not invent a second release ID after build.

---

## 1. Identify the real production workspace

Record before changes:

```text
HOSTNAME
PUBLIC_IPV4
WORKSPACE
PM2_PROCESS
PM2_CWD
NGINX_VHOST
ACTIVE_BUILD_PATH
GIT_REMOTE
GIT_BRANCH
GIT_HEAD
GIT_STATUS
NODE_VERSION
NPM_VERSION
```

Do not assume `/opt/animaparty-site` unless runtime evidence proves it.

---

## 2. Backup — hard requirement

Create a timestamped backup of:

- canonical source;
- current active static build/dist;
- package files / lockfile;
- project-specific PM2 config;
- Nginx vhost only if relevant.

Generate SHA-256 manifest.

Do not delete old backup or unrelated project data.

Required before continuing:

```text
BACKUP_STATUS=PASS
BACKUP_SHA256_MANIFEST=PASS
```

---

## 3. Extract this ZIP into an isolated candidate directory

Do **not** unzip directly over production.

Example conceptual path:

```text
/opt/animaparty-chatgpt-candidates/batch1-v1/
```

The candidate directory must not contain `.env` from the ZIP. Existing runtime secrets, if any are truly needed, remain outside Git/source and must be supplied through the existing server mechanism.

---

## 4. Integrity + secret scan

Before `npm ci`, scan the extracted candidate.

Reject if it contains:

- `.env` or `.env.*` secret files;
- private SSH/private key material;
- access tokens/OAuth cookies;
- database passwords;
- Supabase service role secret;
- customer/private data;
- `node_modules` or prebuilt `dist` supplied as proof.

Do not print secret values.

---

## 5. Pre-build ChatGPT gates — all mandatory

Run from candidate root:

```bash
python3 scripts/seo_batch_gate.py
python3 scripts/static_asset_gate.py
python3 scripts/batch_seal_gate.py
```

Expected predeploy results:

```text
BATCH SIZE = 10
PAGE CONTENT GATE = 10/10 PASS
HIGH CANNIBALIZATION = 0
ASSET GATE = PASS
PREDEPLOY CONTENT/TECHNICAL GATE = PASS
ACTUAL GOOGLE TOP3 GATE = FAIL/OPEN (expected before Google recrawl)
```

Important:

`batch_seal_gate.py` is intentionally allowed to report `batch_seal: OPEN` at this stage because current Google/GSC positions are historical. **Do not change the rank CSV to fake PASS.**

If any source/content/asset/cannibalization gate fails, STOP. Do not deploy.

---

## 6. Clean dependency install + build — hard gate

Use the lockfile exactly:

```bash
rm -rf node_modules
npm ci
npm run build
```

Do not use `npm install --force`, `--legacy-peer-deps`, dependency replacement, or package-version editing just to make the build pass.

If `npm ci` or build fails:

```text
FINAL_STATUS=BLOCKED_BUILD
DEPLOYED=NO
```

and return the exact error.

### Expected build rules

- Astro build completes with exit code 0.
- `dist/` is created by this build, not copied from an old release.
- Exactly the intended 11 indexable routes are represented in sitemap.
- `/contact/` remains the regression/control page and is not removed.

---

## 7. Candidate static QA before deploy

Verify built output for the 10 batch pages + `/contact/`:

```text
unique title
one clear H1
self canonical
index/follow
no stale unsupported claims
real internal links
all local referenced assets exist
JSON-LD parses
```

Specifically fail if built output contains positive claims:

```text
15 ani
80+
570+
2-3 ore
2–3 ore
350 RON
1450 RON
2750 RON
2.5 - 3 metri
2,5 - 3 metri
Sistem audio profesional
sesiune foto profesională la minut
Balloon Exploder
```

Negative explanatory phrases such as "nu publicăm o promisiune ... nelimitată" are allowed.

---

## 8. Final release stamp + final build + atomic deploy

After all candidate QA above passes, stamp the **same planned release ID** as deployed and rebuild once from the unchanged source so `build-identity.json` contains the real final status/time.

```bash
RELEASE_ID="$(node -e "console.log(require('./public/build-identity.json').release_id)")"
ANIMAPARTY_RELEASE_ID="$RELEASE_ID" ANIMAPARTY_RELEASE_STATUS=deployed npm run release:stamp
npm run build
```

Hard requirements:

- the release ID MUST remain identical to the one supplied by ChatGPT;
- `release_status` in the final built `build-identity.json` must be `deployed`;
- `deployed_at` must be populated by this final stamp;
- do not edit content, routes, package versions or source between candidate QA and this final build;
- rerun the fast source gates after stamping if any tracked source other than generated release metadata changed unexpectedly.

Deploy the candidate's freshly generated final `dist` through the same production mechanism that currently serves AnimaParty.

Requirements:

- no partial file copy visible to users;
- no cross-project changes;
- no DNS/Hetzner firewall change;
- no unrelated Nginx change;
- keep rollback path to predeploy backup.

After switch/reload, fetch cache-busted public release identity and verify exact release ID from this ZIP.

---

## 9. Public smoke test

Verify all these public routes return HTTP 200 and expected final URL:

```text
/
/animatori-petreceri-copii-bucuresti/
/animatori-petreceri-copii-ilfov/
/animatori-petreceri-copii/
/servicii/
/mascote-petreceri-copii/
/animatori-pe-picioroange/
/decoratiuni-baloane-bucuresti/
/magician-petreceri-copii/
/vata-de-zahar-popcorn-evenimente/
/contact/
```

Verify:

```text
/sitemap-index.xml
/sitemap-0.xml
/robots.txt
/build-identity.json
```

Sitemap hard gate:

```text
INDEXABLE_ROUTE_COUNT=11
SITEMAP_URL_COUNT=11
NO_REDIRECT_IN_SITEMAP
NO_404_IN_SITEMAP
NO_NOINDEX_IN_SITEMAP
NO_NONCANONICAL_IN_SITEMAP
```

---

## 10. Mobile + visual QA

Use browser/Playwright on all 10 batch pages at minimum:

```text
390x844
430x932
768x1024
desktop
```

Check:

- no horizontal overflow;
- header/mobile details menu works;
- WhatsApp and phone CTAs are visible and usable;
- text does not clip;
- image naturalWidth > 0;
- logo loads;
- no missing asset;
- no fatal console/hydration error;
- premium cream/navy/gold/coral styling remains coherent.

Save screenshots of homepage + București + one specialist service page on desktop/mobile.

---

## 11. Googlebot parity — supplied script

The ZIP includes a new parity script that checks all 10 pages plus `/contact/` using normal and Googlebot UAs and rendered text.

Run:

```bash
npm run qa:googlebot
```

Required:

```text
routes=11
failures=0
gate=PASS
```

Do not substitute an old Wave6R3 parity artifact.

---

## 12. Raw internal graph — supplied script

Run:

```bash
npm run qa:crawl
```

Required:

```text
orphan_count=0
max_depth<=2
gate=PASS
```

This is a hard anti-cannibalization/discovery support check in addition to the source semantic gate.

---

## 13. Generate delivery proof from the real public release

The old proof pipeline was corrected in this ZIP.

The new `generate_proof.mjs`:

- fetches public raw homepage;
- fetches public `/servicii/`;
- fetches public sitemap index;
- gets real **Playwright-rendered `document.body.innerText`** for homepage;
- uses SHA-256 for each independently defined input;
- does not call Cheerio-derived server text "rendered text".

Set the active deployed static root so the new proof becomes public:

```bash
ANIMAPARTY_DEPLOY_DIR="<ACTIVE_STATIC_ROOT>" npm run proof:live
```

Then confirm public:

```text
/.well-known/animaparty-delivery-proof.json
```

Requirements:

```text
proof_schema_version=3
hash_algorithm=sha256
all hashes = 64 lowercase hex
proof.release_id == public build identity release_id
raw hash != rendered text hash (unless independently proven identical inputs, which should not occur here)
```

---

## 14. Independent proof verifier — hard gate

Run:

```bash
npm run proof:verify
```

This verifier independently fetches public content and uses a real Playwright browser for rendered text.

Required:

```text
pass=true
all four hash comparisons=true
```

No copy/paste of generator hash variables is allowed.

---

## 15. Random invalid URLs

Test at least 10 new nonsense URLs.

Required:

```text
HTTP 404 or intentional 410
```

Never `200` soft 404.

---

## 16. GitHub source-of-truth

Only after production QA passes:

1. secret-scan the exact candidate source again;
2. create a **new branch** from the canonical AnimaParty repository, not by merging stale `main` over this source;
3. write the exact deployed source from this ZIP/candidate;
4. commit and push;
5. tag the commit with the exact release ID only after public verification.

Suggested branch:

```text
chatgpt/animaparty-batch1-v1
```

Do NOT force-push unrelated history.
Do NOT merge to `main` in this execution unless the repository history makes that a clean, explicitly verified fast-forward and you can prove no production file is lost. Returning a verified release branch is sufficient for this handoff.

---

## 17. Search Console sitemap

Correct property:

```text
https://animaparty.ro/
```

Submit:

```text
https://animaparty.ro/sitemap-index.xml
```

Use an already-authorized Search Console API only if credentials/scopes already exist.

Do not use Google's Indexing API for ordinary pages.

If no authorized API is available, return exactly:

```text
GSC_SITEMAP_SUBMISSION_REQUIRES_CHATGPT_OPERA
```

Do not claim submission without proof.

---

## 18. Google ranking gate — DO NOT FAKE

The user requires all 10 pages to ultimately reach Top 3 on their primary query before Batch 1 can be sealed.

This package is a **deployment iteration**, not automatic proof of ranking.

Do not edit `docs/BATCH1_RANK_GATE.csv` to PASS based on on-page quality.

After deploy, Google needs to crawl/process the URLs. ChatGPT will independently read fresh GSC/search data on subsequent `verifica` turns and keep iterating all failed pages.

Rules:

```text
9 TOP3 + 1 NOT TOP3 = BATCH OPEN
10 TOP3 = BATCH SEALED
```

The batch remains open until ChatGPT independently confirms all 10.

---

## 19. Final response required from Antigravity

Return exactly enough evidence for independent review:

```text
ACTION_ID:
FINAL_STATUS:

HOSTNAME:
WORKSPACE:
PM2_PROCESS:
NGINX_VHOST:
ACTIVE_STATIC_ROOT:

BACKUP_PATH:
BACKUP_SHA256_MANIFEST:
SECRET_SCAN:

RELEASE_BEFORE:
RELEASE_AFTER:

PREBUILD_PAGE_GATE:
PREBUILD_CANNIBALIZATION_GATE:
PREBUILD_ASSET_GATE:
NPM_CI:
ASTRO_BUILD:

PUBLIC_11_URL_SMOKE:
SITEMAP_URL_COUNT:
ROBOTS_STATUS:
CANONICAL_STATUS:
INVALID_URL_STATUS:
MOBILE_QA:

GOOGLEBOT_PARITY:
ORPHAN_COUNT:
MAX_CRAWL_DEPTH:

DELIVERY_PROOF_STATUS:
INDEPENDENT_PROOF_VERIFY:

GITHUB_REPOSITORY:
GITHUB_BRANCH:
GITHUB_COMMIT:
GITHUB_TAG:

GSC_PROPERTY:
GSC_SITEMAP_SUBMITTED:
GSC_SITEMAP_STATUS:
GSC_DISCOVERED_URLS:

BATCH1_PREDEPLOY_GATE:
BATCH1_ACTUAL_TOP3_GATE: OPEN

FILES_CHANGED:
ARTIFACT_PATHS:
EXACT_BLOCKERS:

STOP.
```

Do not optimize Batch 2.
Do not invent ranking PASS.
