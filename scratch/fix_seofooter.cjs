const fs = require('fs');

let content = fs.readFileSync('src/components/SeoFooter.astro', 'utf8');

const regex = /<h3>De ce să alegi AnimaParty pentru petreceri de copii în București și Ilfov\?<\/h3>[\s\S]*?<\/p>/;
content = content.replace(regex, '<h3>Servicii AnimaParty</h3>\n        <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">\n          <a href="/servicii/" style="text-decoration: none; color: #4a5568; font-weight: bold;">Toate Serviciile</a>\n        </div>');

fs.writeFileSync('src/components/SeoFooter.astro', content);
console.log('SeoFooter boilerplate removed');
