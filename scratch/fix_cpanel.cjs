const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log("Navigating to Hosterion...");
  await page.goto('https://hosterion.ro/client/clientarea.php');
  
  await page.fill('#inputEmail', 'ursache.andrei1995@gmail.com');
  await page.fill('#inputPassword', 'Andreisuperparty123456789!');
  await page.click('#login');
  
  console.log("Waiting for login to complete (or for user to solve ReCaptcha)...");
  // 5 minute timeout for user to solve ReCaptcha
  await page.waitForSelector('a[href*="logout"]', { timeout: 300000 });
  
  console.log("Logged in!");
  
  await page.goto('https://hosterion.ro/client/clientarea.php?action=services');
  await page.waitForLoadState('networkidle');
  
  const serviceLink = await page.$eval('td.text-center a', el => el.href);
  await page.goto(serviceLink);
  
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByText('Login to cPanel', { exact: false }).click()
  ]);
  
  await newPage.waitForLoadState('networkidle');
  console.log("In cPanel! URL:", newPage.url());
  
  const urlParts = newPage.url().split('/');
  const cpsess = urlParts[3];
  
  console.log("Executing UAPI to fix DNS and delete index.html...");
  
  const result = await newPage.evaluate(async (sessionToken) => {
      const dnsRes = await fetch(`/${sessionToken}/execute/DNS/edit_zone_record?domain=animaparty.ro&name=www.animaparty.ro.&type=A&address=89.167.115.150`);
      const dnsJson = await dnsRes.json();
      
      const paths = ['animaparty.ro', 'public_html/animaparty.ro', 'public_html'];
      let fileRes = null;
      for (let p of paths) {
         const r = await fetch(`/${sessionToken}/execute/Fileman/rename_files?dir=${encodeURIComponent(p)}&from=index.html&to=index_old.html`);
         const j = await r.json();
         if (j.status === 1) fileRes = j;
      }
      
      return { dns: dnsJson, file: fileRes };
  }, cpsess);
  
  console.log("API Result:", result);
  
  await browser.close();
})();
