import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function normalizeV1(html) {
    return html.replace(/\s+/g, ' ').trim();
}

function hashContent(content) {
    return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

async function main() {
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const releaseId = `animaparty-seo-v8-wave6r4-${timestamp}`;
    const deployedAt = new Date().toISOString();
    
    // Read raw HTMLs
    const homepageHtml = fs.readFileSync('dist/index.html', 'utf8');
    const servicesHtml = fs.readFileSync('dist/servicii/index.html', 'utf8');
    const sitemapXml = fs.readFileSync('dist/sitemap-index.xml', 'utf8');

    // Extract rendered text for homepage
    const $ = cheerio.load(homepageHtml);
    const homepageText = $('body').text();

    const rawHash = hashContent(normalizeV1(homepageHtml));
    const renderHash = hashContent(normalizeV1(homepageText));
    const servicesHash = hashContent(normalizeV1(servicesHtml));
    const sitemapHash = hashContent(normalizeV1(sitemapXml));

    const proof = {
        project: "animaparty",
        proof_schema_version: "2",
        hash_algorithm: "sha256",
        normalization_version: "v1",
        release_id: releaseId,
        deployed_at: deployedAt,
        proof_generated_at: new Date().toISOString(),
        public_domain: "https://animaparty.ro/",
        canonical_host: "animaparty.ro",
        sitemap_url: "https://animaparty.ro/sitemap-index.xml",
        indexable_route_count: 11,
        homepage_raw_html_hash: rawHash,
        homepage_rendered_text_hash: renderHash,
        services_raw_html_hash: servicesHash,
        sitemap_hash: sitemapHash,
        release_status: "deployed"
    };

    const identity = {
        project: "animaparty",
        release_id: releaseId,
        deployed_at: deployedAt,
        public_domain: "https://animaparty.ro/",
        sitemap_url: "https://animaparty.ro/sitemap-index.xml",
        indexable_route_count: 11,
        release_status: "deployed"
    };

    fs.mkdirSync('public/.well-known', { recursive: true });
    fs.writeFileSync('public/.well-known/animaparty-delivery-proof.json', JSON.stringify(proof, null, 2));
    fs.writeFileSync('public/build-identity.json', JSON.stringify(identity, null, 2));
    
    console.log(releaseId);
}
main();
