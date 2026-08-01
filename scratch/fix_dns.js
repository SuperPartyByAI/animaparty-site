const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log("Navigating to Hosterion...");
  await page.goto('https://hosterion.ro/client/clientarea.php');
  
  await page.type('#inputEmail', 'ursache.andrei1995@gmail.com');
  await page.type('#inputPassword', 'Andreisuperparty123456789!');
  await page.click('#login');
  
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  console.log("Logged in!");
  
  // Try to find the cPanel login button or go directly to the services page
  await page.goto('https://hosterion.ro/client/clientarea.php?action=services');
  await page.waitForSelector('td.text-center a');
  
  // Click on the active service (we assume it's the first active one)
  const serviceLink = await page.$eval('td.text-center a', el => el.href);
  await page.goto(serviceLink);
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
  // Find "Log in to cPanel"
  const cpanelButton = await page.$("text='Login to cPanel'");
  if (cpanelButton) {
    console.log("Clicking Login to cPanel...");
    const [newPage] = await Promise.all([
      new Promise(resolve => browser.once('targetcreated', target => resolve(target.page()))),
      cpanelButton.click()
    ]);
    await newPage.waitForLoadState('networkidle0');
    console.log("In cPanel! URL:", newPage.url());
    
    // Now navigate to Zone Editor
    // Actually, cPanel uses tokens in the URL: /cpsess1234567890/frontend/...
    const urlParts = newPage.url().split('/');
    const cpsess = urlParts[3];
    const zoneEditorUrl = `${urlParts[0]}//${urlParts[2]}/${cpsess}/frontend/jupiter/zone_editor/index.html`;
    
    await newPage.goto(zoneEditorUrl);
    await newPage.waitForLoadState('networkidle0');
    
    console.log("In Zone Editor. Taking a screenshot to see what it looks like.");
    await newPage.screenshot({ path: 'zone_editor.png' });
    
  } else {
    console.log("Could not find cPanel login button.");
    await page.screenshot({ path: 'services.png' });
  }

  await browser.close();
})();
