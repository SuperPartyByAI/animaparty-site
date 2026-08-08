import fs from 'fs';
import * as cheerio from 'cheerio';

async function main() {
    const res = await fetch('https://animaparty.ro/');
    const rawHtml = await res.text();
    const $ = cheerio.load(rawHtml);

    const requiredLinks = [
        '/servicii/',
        '/mascote-petreceri-copii/',
        '/animatori-pe-picioroange/',
        '/decoratiuni-baloane-bucuresti/',
        '/magician-petreceri-copii/',
        '/vata-de-zahar-popcorn-evenimente/',
        '/animatori-petreceri-copii-bucuresti/',
        '/animatori-petreceri-copii-ilfov/',
        '/animatori-petreceri-copii/',
        '/contact/'
    ];

    let csv = "Link,Found_in_Raw_HTML,Anchor_Text_Found\n";
    for (const link of requiredLinks) {
        const el = $(`a[href="${link}"]`).first();
        if (el.length > 0) {
            csv += `${link},TRUE,"${el.text().trim()}"\n`;
        } else {
            csv += `${link},FALSE,NOT_FOUND\n`;
        }
    }

    fs.writeFileSync('docs/V8_WAVE6R3_RAW_CRAWL_GRAPH.csv', csv);
    console.log('Crawl graph complete.');
}

main().catch(console.error);
