const fs = require('fs');

let content = fs.readFileSync('src/components/Gallery.astro', 'utf8');

const disclaimer = `<p class="text-secondary text-sm italic mt-4 text-center" style="color: var(--text-secondary); font-size: 0.875rem; font-style: italic; margin-top: 16px; text-align: center;">Imagini cu rol ilustrativ, reprezentând tipul de activități și atmosfera pe care le oferim la petrecerile noastre.</p>`;

content = content.replace(/<\/div>\n    <\/div>\n  <\/div>\n<\/section>/, `</div>\n        ${disclaimer}\n    </div>\n  </div>\n</section>`);

fs.writeFileSync('src/components/Gallery.astro', content);
console.log('Disclaimer added');
