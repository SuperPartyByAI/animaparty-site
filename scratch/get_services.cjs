const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('https://hosterion.ro/client/clientarea.php');
  await page.fill('#inputEmail', 'ursache.andrei1995@gmail.com');
  await page.fill('#inputPassword', 'Andreisuperparty123456789!');
  await page.click('#login');
  await page.waitForLoadState('networkidle');
  
  await page.goto('https://hosterion.ro/client/clientarea.php?action=services');
  await page.waitForLoadState('networkidle');
  
  const html = await page.content();
  fs.writeFileSync('services.html', html);
  
  await browser.close();
})();
