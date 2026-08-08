const fs = require('fs');

let content = fs.readFileSync('src/pages/animatori-petreceri-copii.astro', 'utf8');
content = content.replace(/        <h2 class="text-2xl font-bold text-accent mb-4 mt-8"/, '        <GuideChecklist />\n\n        <h2 class="text-2xl font-bold text-accent mb-4 mt-8"');
fs.writeFileSync('src/pages/animatori-petreceri-copii.astro', content);

console.log('Checklist inserted properly');
