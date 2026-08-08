const fs = require('fs');

let bucContent = fs.readFileSync('src/pages/animatori-petreceri-copii-bucuresti.astro', 'utf8');
bucContent = bucContent.replace(/    <!-- 4\. Pasi de Rezervare -->/, '    <LogisticsBucuresti />\n\n    <!-- 4. Pasi de Rezervare -->');
fs.writeFileSync('src/pages/animatori-petreceri-copii-bucuresti.astro', bucContent);

let ilfContent = fs.readFileSync('src/pages/animatori-petreceri-copii-ilfov.astro', 'utf8');
ilfContent = ilfContent.replace(/import { faqIlfov }/, 'import LogisticsIlfov from "../components/LogisticsIlfov.astro";\nimport { faqIlfov }');
ilfContent = ilfContent.replace(/    <!-- 4\. Pasi de Rezervare -->/, '    <LogisticsIlfov />\n\n    <!-- 4. Pasi de Rezervare -->');
fs.writeFileSync('src/pages/animatori-petreceri-copii-ilfov.astro', ilfContent);

console.log('Logistics inserted');
