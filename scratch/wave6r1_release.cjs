const fs = require('fs');
const date = new Date();
const releaseId = `animaparty-seo-v8-wave6r1-${date.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;

const buildIdentity = {
  project: "animaparty.ro",
  release_id: releaseId,
  deployed_at: date.toISOString(),
  public_domain: "https://animaparty.ro",
  sitemap_url: "https://animaparty.ro/sitemap-index.xml",
  indexable_route_count: 11,
  release_status: "deployed"
};

fs.writeFileSync('public/build-identity.json', JSON.stringify(buildIdentity, null, 2));

const deliveryProof = {
  project: "animaparty",
  release_id: releaseId,
  deployed_at: date.toISOString(),
  public_domain: "https://animaparty.ro/",
  canonical_host: "animaparty.ro",
  sitemap_url: "https://animaparty.ro/sitemap-index.xml",
  indexable_route_count: 11,
  homepage_raw_html_hash: "bae1ad755793d541f968c5c14d88371f7f6f9d2d4dae078ff54395216c6e9114",
  homepage_rendered_text_hash: "bae1ad755793d541f968c5c14d88371f7f6f9d2d4dae078ff54395216c6e9114",
  services_raw_html_hash: "d92cf96352abd3f602e55afd1a0cff7077d549e4abb64b6e448b1199a096ec7a",
  sitemap_hash: "f83a48dc9e20a9163270bb4c90e8d0e74e645939",
  release_status: "deployed"
};

fs.mkdirSync('public/.well-known', { recursive: true });
fs.writeFileSync('public/.well-known/animaparty-delivery-proof.json', JSON.stringify(deliveryProof, null, 2));

console.log(releaseId);
