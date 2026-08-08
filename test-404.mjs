import http from 'http';
import https from 'https';

const urls = [
  'https://animaparty.ro/test-nonsense-123',
  'https://animaparty.ro/hidden-admin-panel',
  'https://animaparty.ro/wp-admin.php',
  'https://animaparty.ro/old-version.html',
  'https://animaparty.ro/servicii/fake-service',
  'https://animaparty.ro/pachete-secrete',
  'https://animaparty.ro/1234567890',
  'https://animaparty.ro/.env',
  'https://animaparty.ro/sitemap.xml.gz.bak',
  'https://animaparty.ro/animatori-petreceri-copii-bucuresti/fake-sector'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(`${url},${res.statusCode}`);
    }).on('error', (err) => {
      resolve(`${url},ERROR`);
    });
  });
}

async function main() {
  console.log('URL,StatusCode');
  for (const url of urls) {
    const result = await checkUrl(url);
    console.log(result);
  }
}

main();
