const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log("Navigating to Hosterion...");
  await page.goto('https://hosterion.ro/client/clientarea.php');
  
  await page.fill('#inputEmail', 'ursache.andrei1995@gmail.com');
  await page.fill('#inputPassword', 'Andreisuperparty123456789!');
  await page.click('#login');
  
  await page.waitForLoadState('networkidle');
  console.log("Logged in!");
  
  await page.goto('https://hosterion.ro/client/clientarea.php?action=services');
  await page.waitForLoadState('networkidle');
  
  // Click on the active service (assume it's wowparty or similar where animaparty is hosted)
  // Let's get the first active service link
  const serviceLink = await page.$eval('td.text-center a', el => el.href);
  await page.goto(serviceLink);
  await page.waitForLoadState('networkidle');
  
  // Find "Login to cPanel"
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByText('Login to cPanel', { exact: false }).click()
  ]);
  
  await newPage.waitForLoadState('networkidle');
  console.log("In cPanel! URL:", newPage.url());
  
  // Navigate to File Manager (to add .htaccess)
  const urlParts = newPage.url().split('/');
  const cpsess = urlParts[3]; // usually /cpsess123456789/frontend/...
  
  // Create / public_html / animaparty.ro / .htaccess
  // Actually, File Manager is tricky to automate. Let's just use Zone Editor.
  const zoneEditorUrl = `${urlParts[0]}//${urlParts[2]}/${cpsess}/frontend/jupiter/zone_editor/index.html`;
  await newPage.goto(zoneEditorUrl);
  await newPage.waitForLoadState('networkidle');
  console.log("In Zone Editor");
  
  await newPage.screenshot({ path: 'zone_editor.png' });
  
  await browser.close();
})();
