const fs = require('fs');

let bucContent = fs.readFileSync('src/pages/animatori-petreceri-copii-bucuresti.astro', 'utf8');
bucContent = bucContent.replace(/    <!-- Bottom CTA -->/, '    <LogisticsBucuresti />\n\n    <!-- Bottom CTA -->');
fs.writeFileSync('src/pages/animatori-petreceri-copii-bucuresti.astro', bucContent);

let ilfContent = fs.readFileSync('src/pages/animatori-petreceri-copii-ilfov.astro', 'utf8');
ilfContent = ilfContent.replace(/    <!-- Bottom CTA -->/, '    <LogisticsIlfov />\n\n    <!-- Bottom CTA -->');
fs.writeFileSync('src/pages/animatori-petreceri-copii-ilfov.astro', ilfContent);

let guideContent = fs.readFileSync('src/pages/animatori-petreceri-copii.astro', 'utf8');
guideContent = guideContent.replace(/    <!-- Sectiunea 3: Alegerea corecta dupa varsta -->/, '    <GuideChecklist />\n\n    <!-- Sectiunea 3: Alegerea corecta dupa varsta -->');
fs.writeFileSync('src/pages/animatori-petreceri-copii.astro', guideContent);

console.log('Fixed rendering');
