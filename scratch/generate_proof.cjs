const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const releaseId = process.env.RELEASE_ID || "unknown-release";
const distDir = path.join(process.cwd(), 'dist');

function normalizeHtml(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // remove scripts
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')   // remove styles
    .replace(/<!--[\s\S]*?-->/g, '')                                   // remove comments
    .replace(/\s+/g, ' ')                                              // collapse whitespace
    .trim();
}

function hashFile(filePath) {
  if (!fs.existsSync(filePath)) return "FILE_NOT_FOUND";
  const html = fs.readFileSync(filePath, 'utf8');
  const normalized = normalizeHtml(html);
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

const homepageHash = hashFile(path.join(distDir, 'index.html'));
const servicesHash = hashFile(path.join(distDir, 'servicii', 'index.html'));

const identity = {
  project: "animaparty",
  release_id: releaseId,
  deployed_at: new Date().toISOString(),
  public_domain: "https://animaparty.ro/",
  canonical_host: "animaparty.ro",
  sitemap_url: "https://animaparty.ro/sitemap-index.xml",
  indexable_route_count: 11,
  homepage_normalized_hash: homepageHash,
  services_page_normalized_hash: servicesHash,
  release_status: "deployed"
};

const outDir = path.join(distDir, '.well-known');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outDir, 'animaparty-delivery-proof.json'), 
  JSON.stringify(identity, null, 2)
);

console.log("Proof generated successfully with hashes:");
console.log("HOME: " + homepageHash);
console.log("SERVICII: " + servicesHash);
