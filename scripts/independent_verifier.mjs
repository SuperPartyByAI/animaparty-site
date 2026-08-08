import fs from 'fs';
import crypto from 'crypto';
import * as cheerio from 'cheerio';
import { chromium } from 'playwright';

function normalizeV1(html) {
    return html.replace(/\s+/g, ' ').trim();
}

function hashContent(content) {
    return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

async function fetchRaw(url) {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error(`HTTP error ${res.status} on ${url}`);
    return await res.text();
}

async function main() {
    console.log("Fetching live proof...");
    const proofRes = await fetch('https://animaparty.ro/.well-known/animaparty-delivery-proof.json');
    const proof = await proofRes.json();
    
    console.log("Fetching raw homepage...");
    const rawHome = await fetchRaw('https://animaparty.ro/');
    
    console.log("Fetching raw services...");
    const rawServices = await fetchRaw('https://animaparty.ro/servicii/');
    
    console.log("Fetching sitemap...");
    const rawSitemap = await fetchRaw('https://animaparty.ro/sitemap-index.xml');
    
    console.log("Extracting text via Cheerio (which is how generate_proof generated it)...");
    const $ = cheerio.load(rawHome);
    const renderedText = $('body').text();
    
    const indRawHomeHash = hashContent(normalizeV1(rawHome));
    const indRenderedHash = hashContent(normalizeV1(renderedText));
    const indServicesHash = hashContent(normalizeV1(rawServices));
    const indSitemapHash = hashContent(normalizeV1(rawSitemap));
    
    const result = {
        release_id: proof.release_id,
        public_proof_fetched: true,
        homepage_raw_html_hash: {
            proof: proof.homepage_raw_html_hash,
            independent: indRawHomeHash,
            match: proof.homepage_raw_html_hash === indRawHomeHash
        },
        homepage_rendered_text_hash: {
            proof: proof.homepage_rendered_text_hash,
            independent: indRenderedHash,
            match: proof.homepage_rendered_text_hash === indRenderedHash
        },
        services_raw_html_hash: {
            proof: proof.services_raw_html_hash,
            independent: indServicesHash,
            match: proof.services_raw_html_hash === indServicesHash
        },
        sitemap_hash: {
            proof: proof.sitemap_hash,
            independent: indSitemapHash,
            match: proof.sitemap_hash === indSitemapHash
        }
    };
    
    fs.mkdirSync('docs', { recursive: true });
    fs.writeFileSync('docs/V8_WAVE6R3_INDEPENDENT_PROOF_VERIFY.json', JSON.stringify(result, null, 2));
    
    const md = `# Hash Reproduction Report

## Independent Proof Recomputation (Hard Gate)

**Release ID**: \`${proof.release_id}\`
**Algorithm**: SHA-256
**Normalization**: v1 (collapsing whitespace to single space and trimming)

### Verification Results
- **Homepage Raw HTML**: ${result.homepage_raw_html_hash.match ? 'PASS' : 'FAIL'} (\`${indRawHomeHash}\`)
- **Homepage Rendered Text**: ${result.homepage_rendered_text_hash.match ? 'PASS' : 'FAIL'} (\`${indRenderedHash}\`)
- **Services Raw HTML**: ${result.services_raw_html_hash.match ? 'PASS' : 'FAIL'} (\`${indServicesHash}\`)
- **Sitemap**: ${result.sitemap_hash.match ? 'PASS' : 'FAIL'} (\`${indSitemapHash}\`)

${Object.values(result).every(v => typeof v !== 'object' || v.match === true) ? '✅ All hashes independently reproduced and verified against the public proof.' : '❌ Hash mismatch detected.'}
`;
    
    fs.writeFileSync('docs/V8_WAVE6R3_HASH_REPRODUCTION.md', md);
    console.log("Verification complete. Results saved in docs/");
}

main().catch(console.error);
