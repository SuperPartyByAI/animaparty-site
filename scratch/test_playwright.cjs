const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://animaparty.ro/', { waitUntil: 'networkidle' });
  const html = await page.content();
  
  const has490Orar = html.includes('490 RON / oră') || html.includes('490 RON / ora');
  const has490Pachet = html.includes('490 RON') && html.includes('/ pachet de 2 ore');
  const hasServices = html.includes('href="/servicii/"');
  
  console.log(`PLAYWRIGHT_DOM,${has490Orar},${has490Pachet},${hasServices},${html.length}`);
  
  await browser.close();
})();
