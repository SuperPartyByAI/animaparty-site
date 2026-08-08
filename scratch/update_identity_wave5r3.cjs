const fs = require('fs');

const releaseId = process.argv[2] || "animaparty-seo-v8-wave-5r3";
const date = new Date().toISOString();

const identity = {
  project: "animaparty",
  release_id: releaseId,
  deployed_at: date,
  public_domain: "https://animaparty.ro/",
  sitemap_url: "https://animaparty.ro/sitemap-index.xml",
  indexable_route_count: 11,
  release_status: "deployed"
};

fs.writeFileSync('public/build-identity.json', JSON.stringify(identity, null, 2));
console.log(`Identity updated: ${identity.release_id}`);
