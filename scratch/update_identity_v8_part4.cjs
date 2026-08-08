const fs = require('fs');

const date = new Date();
const pad = (n) => n.toString().padStart(2, '0');
const timestamp = `${date.getUTCFullYear()}${pad(date.getUTCMonth()+1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;

const identity = {
  project: "animaparty",
  release_id: `animaparty-seo-v8-wave-4-${timestamp}`,
  deployed_at: date.toISOString(),
  public_domain: "https://animaparty.ro/",
  sitemap_url: "https://animaparty.ro/sitemap-index.xml",
  indexable_route_count: 11,
  release_status: "deployed"
};

fs.writeFileSync('public/build-identity.json', JSON.stringify(identity, null, 2));

console.log(`Identity updated: ${identity.release_id}`);
