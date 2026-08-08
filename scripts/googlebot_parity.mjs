import fs from 'fs';
import { chromium } from 'playwright';

async function fetchPage(userAgent) {
    const browser = await chromium.launch();
    const page = await browser.newPage({ userAgent });
    await page.goto('https://animaparty.ro/');
    const rawHtml = await page.content();
    const renderedText = await page.evaluate(() => document.body.innerText);
    await browser.close();
    return { rawHtml, renderedText };
}

async function main() {
    const normal = await fetchPage('Mozilla/5.0');
    const googlebot = await fetchPage('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');

    const rawMatch = normal.rawHtml === googlebot.rawHtml;
    const renderMatch = normal.renderedText === googlebot.renderedText;

    const csv = `Test_Case,Normal_User_Agent,Googlebot_User_Agent,Parity_Result
Raw_HTML,Extracted,Extracted,${rawMatch ? 'PASS' : 'FAIL'}
Rendered_Text,Extracted,Extracted,${renderMatch ? 'PASS' : 'FAIL'}
`;
    fs.writeFileSync('docs/V8_WAVE6R3_RAW_GOOGLEBOT_RENDER_PARITY.csv', csv);
    console.log('Googlebot parity test complete.');
}

main().catch(console.error);
