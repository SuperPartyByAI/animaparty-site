const { chromium } = require('playwright');
const path = require('path');
const os = require('os');

(async () => {
  const userDataDir = path.join(os.homedir(), 'Library/Application Support/Google/Chrome');
  console.log("Using profile:", userDataDir);
  
  try {
    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: true, // we still need headless if we just want to run it in background, but let's try false? No, headless true is better so we don't disrupt the user's screen too much, or maybe false if we want them to see it. 
      // Actually, headless true with a persistent context might fail if Chrome is already open. But Chrome is killed.
      channel: 'chrome' // use the installed Chrome
    });
    
    const page = await context.newPage();
    await page.goto('https://hosterion.ro/client/clientarea.php');
    await page.waitForTimeout(3000);
    
    const title = await page.title();
    console.log("Title:", title);
    
    // Check if we are logged in by looking for a logout link or clientarea services link
    const isLoggedIn = await page.evaluate(() => {
        return !!document.querySelector('a[href*="logout"]');
    });
    
    console.log("Is logged in to Hosterion?", isLoggedIn);
    await context.close();
  } catch(e) {
    console.error(e);
  }
})();
