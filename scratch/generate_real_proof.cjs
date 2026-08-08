const fs = require('fs');
const crypto = require('crypto');
const puppeteer = require('puppeteer');
const { execSync } = require('child_process');

async function main() {
  const date = new Date();
  const releaseId = `animaparty-seo-v8-wave7-p1-${date.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;
  
  // 1. Write initial build-identity and an empty delivery-proof so they exist for the build.
  const buildIdentity = {
    project: "animaparty",
    release_id: releaseId,
    deployed_at: date.toISOString(),
    public_domain: "https://animaparty.ro/",
    sitemap_url: "https://animaparty.ro/sitemap-index.xml",
    indexable_route_count: 11,
    release_status: "deployed"
  };
  fs.writeFileSync('public/build-identity.json', JSON.stringify(buildIdentity, null, 2));
  
  if (!fs.existsSync('public/.well-known')) {
    fs.mkdirSync('public/.well-known', { recursive: true });
  }
  
  // Create a placeholder proof first to be built
  fs.writeFileSync('public/.well-known/animaparty-delivery-proof.json', '{}');
  
  // 2. Build the site so we can hash the output
  console.log("Building site...");
  execSync('npm run build', { stdio: 'inherit' });
  
  // 3. Compute raw hashes from the built dist files
  function getRawHash(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Basic normalization: remove trailing newlines to ensure parity if deployed differently, though file should match exactly.
    const normalized = content.trim();
    return crypto.createHash('sha256').update(normalized).digest('hex');
  }
  
  const homepageRawHash = getRawHash('dist/index.html');
  const servicesRawHash = getRawHash('dist/servicii/index.html');
  const sitemapHash = getRawHash('dist/sitemap-0.xml');
  
  // 4. Compute rendered hash using Puppeteer against a local preview
  console.log("Starting local preview server...");
  const serverProcess = require('child_process').spawn('npx', ['serve', 'dist', '-p', '3000']);
  
  // wait for server to start
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  console.log("Navigating to local homepage...");
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  
  // Extract visible text
  const renderedText = await page.evaluate(() => document.body.innerText);
  const normalizedRenderedText = renderedText.replace(/\s+/g, ' ').trim();
  const homepageRenderedHash = crypto.createHash('sha256').update(normalizedRenderedText).digest('hex');
  
  await browser.close();
  serverProcess.kill();
  
  // 5. Generate final delivery proof
  const deliveryProof = {
    project: "animaparty",
    proof_schema_version: "2",
    hash_algorithm: "sha256",
    normalization_version: "v1",
    release_id: releaseId,
    deployed_at: date.toISOString(),
    proof_generated_at: new Date().toISOString(),
    public_domain: "https://animaparty.ro/",
    canonical_host: "animaparty.ro",
    sitemap_url: "https://animaparty.ro/sitemap-index.xml",
    indexable_route_count: 11,
    homepage_raw_html_hash: homepageRawHash,
    homepage_rendered_text_hash: homepageRenderedHash,
    services_raw_html_hash: servicesRawHash,
    sitemap_hash: sitemapHash,
    release_status: "deployed"
  };
  
  // Write to both public/ (for future builds) and dist/ (for immediate deploy)
  fs.writeFileSync('public/.well-known/animaparty-delivery-proof.json', JSON.stringify(deliveryProof, null, 2));
  
  if (!fs.existsSync('dist/.well-known')) {
    fs.mkdirSync('dist/.well-known', { recursive: true });
  }
  fs.writeFileSync('dist/.well-known/animaparty-delivery-proof.json', JSON.stringify(deliveryProof, null, 2));
  fs.writeFileSync('dist/build-identity.json', JSON.stringify(buildIdentity, null, 2));
  
  console.log("Hashes generated successfully.");
  console.log("RAW HTML HASH:", homepageRawHash);
  console.log("RENDERED TEXT HASH:", homepageRenderedHash);
  console.log("RELEASE ID:", releaseId);
}

main().catch(console.error);
