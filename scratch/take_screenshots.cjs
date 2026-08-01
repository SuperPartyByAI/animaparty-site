const puppeteer = require('puppeteer');

(async () => {
  const dir = '/Users/universparty/.gemini/antigravity/brain/3fd8f327-0474-42c2-a879-02ad875e3370';
  const browser = await puppeteer.launch({ headless: "new" });
  
  // Desktop
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://animaparty.ro/', { waitUntil: 'networkidle2' });
  
  await page.screenshot({ path: `${dir}/live_desktop_full.png`, fullPage: true });
  
  const heroDesktop = await page.$('.hero-section');
  await heroDesktop.screenshot({ path: `${dir}/live_hero_desktop.png` });
  
  const galleryDesktop = await page.$('.gallery-section');
  await galleryDesktop.screenshot({ path: `${dir}/live_gallery_desktop.png` });

  const packagesDesktop = await page.$('.packages-section');
  await packagesDesktop.screenshot({ path: `${dir}/live_packages_desktop.png` });

  // Mobile
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await mobilePage.goto('https://animaparty.ro/', { waitUntil: 'networkidle2' });
  
  await mobilePage.screenshot({ path: `${dir}/live_mobile_full.png`, fullPage: true });
  
  const heroMobile = await mobilePage.$('.hero-section');
  await heroMobile.screenshot({ path: `${dir}/live_hero_mobile.png` });

  await browser.close();
  console.log("Screenshots captured successfully.");
})();
