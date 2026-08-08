const fs = require('fs');

let guideContent = fs.readFileSync('src/pages/animatori-petreceri-copii.astro', 'utf8');
guideContent = guideContent.replace(/import SeoFooter from/, 'import GuideChecklist from "../components/GuideChecklist.astro";\nimport SeoFooter from');
guideContent = guideContent.replace(/    <!-- Sectiune: Vârstă -->/, '    <GuideChecklist />\n\n    <!-- Sectiune: Vârstă -->');
fs.writeFileSync('src/pages/animatori-petreceri-copii.astro', guideContent);

console.log('Checklist inserted');
