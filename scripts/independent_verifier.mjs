import fs from 'fs';
import crypto from 'crypto';
import { chromium } from 'playwright';

const BASE = 'https://animaparty.ro';
function normalizeV1(value) { return String(value).replace(/\s+/g, ' ').trim(); }
function sha256(value) { return crypto.createHash('sha256').update(value, 'utf8').digest('hex'); }
function busted(url, token) { const u = new URL(url); u.searchParams.set('verify_livecheck', token); return u.toString(); }
async function fetchText(url, token) {
  const res = await fetch(busted(url, token), { headers: { 'User-Agent':'Mozilla/5.0', 'Cache-Control':'no-cache, no-store, max-age=0', Pragma:'no-cache' }, redirect:'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return await res.text();
}
async function render(url, token) {
  const browser = await chromium.launch({ headless:true });
  try {
    const page = await browser.newPage({ userAgent:'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/151 Safari/537.36' });
    await page.goto(busted(url, token), { waitUntil:'networkidle', timeout:45000 });
    return await page.evaluate(() => document.body?.innerText || '');
  } finally { await browser.close(); }
}
async function main() {
  const token = Date.now().toString();
  const proof = JSON.parse(await fetchText(`${BASE}/.well-known/animaparty-delivery-proof.json`, token));
  const sitemapUrl = proof.sitemap_hash_url || proof.sitemap_url || `${BASE}/sitemap-index.xml`;
  const [home, services, sitemap, rendered] = await Promise.all([
    fetchText(`${BASE}/`, token), fetchText(`${BASE}/servicii/`, token), fetchText(sitemapUrl, token), render(`${BASE}/`, token)
  ]);
  const calculated = {
    homepage_raw_html_hash: sha256(normalizeV1(home)),
    homepage_rendered_text_hash: sha256(normalizeV1(rendered)),
    services_raw_html_hash: sha256(normalizeV1(services)),
    sitemap_hash: sha256(normalizeV1(sitemap))
  };
  const fields = Object.keys(calculated);
  const checks = Object.fromEntries(fields.map(k => [k, { proof:proof[k], independent:calculated[k], match:proof[k] === calculated[k] }]));
  const pass = fields.every(k => checks[k].match) && proof.hash_algorithm === 'sha256' && fields.every(k => /^[a-f0-9]{64}$/.test(proof[k] || ''));
  const result = { release_id:proof.release_id, proof_schema_version:proof.proof_schema_version, pass, checks, verified_at:new Date().toISOString() };
  fs.mkdirSync('docs', {recursive:true});
  fs.writeFileSync('docs/BATCH1_INDEPENDENT_PROOF_VERIFY.json', JSON.stringify(result,null,2)+'\n');
  fs.writeFileSync('docs/BATCH1_HASH_REPRODUCTION.md', `# Batch 1 independent delivery-proof verification\n\nRelease: \`${proof.release_id}\`\n\nResult: **${pass?'PASS':'FAIL'}**\n\nRendered hash is computed from a real Playwright browser using \`document.body.innerText\`; it is not derived with Cheerio from server HTML.\n\n${fields.map(k=>`- ${k}: ${checks[k].match?'PASS':'FAIL'} — \`${calculated[k]}\``).join('\n')}\n`);
  console.log(JSON.stringify(result,null,2));
  if (!pass) process.exit(2);
}
main().catch(err=>{console.error(err);process.exit(1)});
