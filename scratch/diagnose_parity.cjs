const http = require('http');
const https = require('https');

const tests = [
  { name: "A. Public normal curl UA", url: "https://animaparty.ro/", headers: {} },
  { name: "B. Cache-busting query", url: "https://animaparty.ro/?cb=" + Date.now(), headers: {} },
  { name: "C. Cache-Control: no-cache", url: "https://animaparty.ro/", headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" } },
  { name: "D. Googlebot Smartphone", url: "https://animaparty.ro/", headers: { "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" } },
  { name: "E. Googlebot Smartphone + CB", url: "https://animaparty.ro/?cb=" + Date.now(), headers: { "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" } },
  { name: "H. www variant", url: "https://www.animaparty.ro/", headers: {} },
  { name: "I. HTTP variant", url: "http://animaparty.ro/", headers: {} }
];

async function runTests() {
  for (const t of tests) {
    const isHttps = t.url.startsWith("https");
    const mod = isHttps ? https : http;
    
    await new Promise((resolve) => {
      mod.get(t.url, { headers: t.headers }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          // Check for "490 RON / pachet de 2 ore" vs "490 RON / ora"
          let hasOldPrice = body.includes("490 RON / ora") || body.includes("490 RON / oră") || body.includes("RON / oră") || body.includes("490 RON</span><span class=\"text-lg text-secondary font-medium\">/ oră");
          let hasNewPrice = body.includes("490 RON</span><span class=\"text-lg text-secondary font-medium\">/ pachet de 2 ore");
          
          let hasNewNav = body.includes('href="/servicii/"');
          let hasOldNav = body.includes('href="/#servicii"');
          
          // HTTP variant might return 301
          console.log(`[${t.name}] Status: ${res.statusCode} | HasOldPrice: ${hasOldPrice} | HasNewPrice: ${hasNewPrice} | HasOldNav: ${hasOldNav} | HasNewNav: ${hasNewNav}`);
          resolve();
        });
      }).on('error', (err) => {
        console.error(`[${t.name}] Error: ${err.message}`);
        resolve();
      });
    });
  }
}

runTests();
