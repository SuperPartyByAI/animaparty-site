import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { chromium } from 'playwright';

const BASE = 'https://animaparty.ro';
const OUT_DIR = process.env.ANIMAPARTY_DEPLOY_DIR || '';

function normalizeV1(value) {
  return String(value).replace(/\s+/g, ' ').trim();
}
function sha256(value) {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}
function busted(url, token) {
  const u = new URL(url);
  u.searchParams.set('proof_livecheck', token);
  return u.toString();
}
async function fetchText(url, token) {
  const res = await fetch(busted(url, token), {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/151 Safari/537.36',
      'Cache-Control': 'no-cache, no-store, max-age=0',
      Pragma: 'no-cache'
    },
    redirect: 'follow'
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}
async function fetchJson(url, token) {
  return JSON.parse(await fetchText(url, token));
}
async function renderedText(url, token) {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/151 Safari/537.36'
    });
    const page = await context.newPage();
    await page.goto(busted(url, token), { waitUntil: 'networkidle', timeout: 45000 });
    return await page.evaluate(() => document.body?.innerText || '');
  } finally {
    await browser.close();
  }
}
function writeProof(targetRoot, proof) {
  if (!targetRoot) return;
  const target = path.join(targetRoot, '.well-known');
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(path.join(target, 'animaparty-delivery-proof.json'), JSON.stringify(proof, null, 2) + '\n');
}

async function main() {
  const token = Date.now().toString();
  const identity = await fetchJson(`${BASE}/build-identity.json`, token);
  if (!identity.release_id) throw new Error('Public build identity has no release_id');
  if (Number(identity.indexable_route_count) !== 11) throw new Error(`Expected 11 indexable routes; identity says ${identity.indexable_route_count}`);

  const [homeRaw, servicesRaw, sitemapRaw, homeRendered] = await Promise.all([
    fetchText(`${BASE}/`, token),
    fetchText(`${BASE}/servicii/`, token),
    fetchText(`${BASE}/sitemap-index.xml`, token),
    renderedText(`${BASE}/`, token)
  ]);

  const proof = {
    project: 'animaparty',
    proof_schema_version: '3',
    hash_algorithm: 'sha256',
    normalization_version: 'v1-collapse-whitespace',
    release_id: identity.release_id,
    deployed_at: identity.deployed_at,
    proof_generated_at: new Date().toISOString(),
    public_domain: 'https://animaparty.ro/',
    canonical_host: 'animaparty.ro',
    sitemap_url: 'https://animaparty.ro/sitemap-index.xml',
    sitemap_hash_url: 'https://animaparty.ro/sitemap-index.xml',
    indexable_route_count: 11,
    homepage_raw_html_hash: sha256(normalizeV1(homeRaw)),
    homepage_rendered_text_hash: sha256(normalizeV1(homeRendered)),
    services_raw_html_hash: sha256(normalizeV1(servicesRaw)),
    sitemap_hash: sha256(normalizeV1(sitemapRaw)),
    release_status: 'deployed'
  };

  // Keep source handoff reproducible.
  writeProof('public', proof);
  // Optional: write directly to the already-deployed static root.
  if (OUT_DIR) writeProof(OUT_DIR, proof);
  fs.mkdirSync('docs', { recursive: true });
  fs.writeFileSync('docs/BATCH1_LIVE_PROOF_GENERATED.json', JSON.stringify(proof, null, 2) + '\n');
  console.log(JSON.stringify(proof, null, 2));
}

main().catch(err => { console.error(err); process.exit(1); });
