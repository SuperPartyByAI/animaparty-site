const fs = require('fs');
const { execSync } = require('child_process');

function curl(url, extraArgs = "") {
  try {
    return execSync(`curl -s -L ${extraArgs} "${url}"`).toString();
  } catch (e) {
    return "";
  }
}

function check(html) {
  const has490Orar = html.includes('490 RON / oră') || html.includes('490 RON / ora');
  const has490Pachet = html.includes('490 RON</span><span class="text-lg text-secondary font-medium">/ pachet de 2 ore');
  const hasServices = html.includes('href="/servicii/"');
  
  return {
    has490Orar,
    has490Pachet,
    hasServices,
    length: html.length
  };
}

const tests = [
  { name: "RAW_CURL", url: "https://animaparty.ro/", args: "" },
  { name: "CACHE_BUST", url: "https://animaparty.ro/?cb=" + Date.now(), args: "" },
  { name: "NO_CACHE", url: "https://animaparty.ro/", args: "-H 'Cache-Control: no-cache' -H 'Pragma: no-cache'" },
  { name: "GOOGLEBOT", url: "https://animaparty.ro/", args: "-A 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'" },
  { name: "FORCED_ORIGIN", url: "https://animaparty.ro/", args: "--resolve animaparty.ro:443:89.167.115.150" },
  { name: "WWW", url: "https://www.animaparty.ro/", args: "" },
];

console.log("Variant,has490Orar,has490Pachet,hasServices,length");
for (const t of tests) {
  const html = curl(t.url, t.args);
  const res = check(html);
  console.log(`${t.name},${res.has490Orar},${res.has490Pachet},${res.hasServices},${res.length}`);
}
