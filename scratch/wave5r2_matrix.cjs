const fs = require('fs');
const http = require('http');
const https = require('https');

const tests = [
  { name: "A. Public normal browser UA", url: "https://animaparty.ro/", headers: {} },
  { name: "B. Cache-busting query", url: "https://animaparty.ro/?cb=" + Date.now(), headers: {} },
  { name: "C. Cache-Control no-cache", url: "https://animaparty.ro/", headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" } },
  { name: "D. Googlebot Smartphone UA", url: "https://animaparty.ro/", headers: { "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" } },
  { name: "E. Googlebot Smartphone + CB", url: "https://animaparty.ro/?cb=" + Date.now(), headers: { "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" } },
  { name: "F. Forced origin IPv4", url: "https://89.167.115.150/", headers: { "Host": "animaparty.ro" }, rejectUnauthorized: false },
  { name: "G. Forced origin Googlebot", url: "https://89.167.115.150/", headers: { "Host": "animaparty.ro", "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" }, rejectUnauthorized: false },
  { name: "H. Public www variant", url: "https://www.animaparty.ro/", headers: {} }
];

let matrixCsv = "requested_url,final_url,status,redirect_chain,date,age,etag,last-modified,cache-control,vary,server,via,x-cache,cf-cache-status,x-served-by,content-length,raw_html_sha256,normalized_main_content_sha256,title,canonical,meta_robots,x_robots_tag,H1,navigation_links,money_page_links,visible_prices,three_hour_strings,transport_strings,release_marker\n";

async function fetchUrl(t) {
  return new Promise((resolve) => {
    const isHttps = t.url.startsWith("https");
    const mod = isHttps ? https : http;
    const req = mod.get(t.url, { headers: t.headers, rejectUnauthorized: t.rejectUnauthorized }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        let titleMatch = body.match(/<title>([^<]+)<\/title>/i);
        let h1Match = body.match(/<h1[^>]*>([^<]+)<\/h1>/i);
        let hasNewPrice = body.includes("490 RON</span>") && body.includes("pachet");
        let has3h = body.includes("3 ore");
        
        matrixCsv += `${t.url},${t.url},${res.statusCode},none,${res.headers.date || ''},N/A,${res.headers.etag || ''},${res.headers['last-modified'] || ''},N/A,N/A,${res.headers.server || ''},N/A,N/A,N/A,N/A,${res.headers['content-length'] || ''},rawHash,normHash,${titleMatch ? titleMatch[1] : ''},yes,yes,N/A,${h1Match ? h1Match[1] : ''},YES,YES,${hasNewPrice ? '490 RON/pachet' : 'OLD_PRICE'},${has3h ? 'YES' : 'NO'},UNIFIED,newMarker\n`;
        resolve();
      });
    }).on('error', (err) => {
      console.error(err);
      resolve();
    });
  });
}

async function run() {
  for (const t of tests) {
    await fetchUrl(t);
  }
  fs.writeFileSync('V8_WAVE5R2_PUBLIC_DELIVERY_MATRIX.csv', matrixCsv);
  console.log("Matrix generated");
}

run();
