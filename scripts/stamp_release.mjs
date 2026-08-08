import fs from 'fs';
import path from 'path';

function utcStamp() {
  return new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

const releaseId = process.env.ANIMAPARTY_RELEASE_ID || `animaparty-chatgpt-batch1-v1-${utcStamp()}`;
const createdAt = new Date().toISOString();
const releaseStatus = process.env.ANIMAPARTY_RELEASE_STATUS || 'build_planned';
const identity = {
  project: 'animaparty',
  release_id: releaseId,
  deployed_at: releaseStatus === 'deployed' ? createdAt : null,
  stamped_at: createdAt,
  public_domain: 'https://animaparty.ro/',
  sitemap_url: 'https://animaparty.ro/sitemap-index.xml',
  indexable_route_count: 11,
  release_status: releaseStatus
};

fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/build-identity.json', JSON.stringify(identity, null, 2) + '\n');
fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/BATCH1_RELEASE_PLAN.json', JSON.stringify({
  ...identity,
  batch_size: 10,
  batch_routes: [
    '/',
    '/animatori-petreceri-copii-bucuresti/',
    '/animatori-petreceri-copii-ilfov/',
    '/animatori-petreceri-copii/',
    '/servicii/',
    '/mascote-petreceri-copii/',
    '/animatori-pe-picioroange/',
    '/decoratiuni-baloane-bucuresti/',
    '/magician-petreceri-copii/',
    '/vata-de-zahar-popcorn-evenimente/'
  ],
  regression_route: '/contact/'
}, null, 2) + '\n');
console.log(releaseId);
