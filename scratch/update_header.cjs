const fs = require('fs');

let headerContent = fs.readFileSync('src/components/Header.astro', 'utf8');
headerContent = headerContent.replace(
  '<a href="/#servicii" class="block lg:inline-block px-4 py-2 font-bold text-gray-700 hover:text-accent hover:bg-gray-50 rounded-lg">Servicii / Pachete</a>',
  '<a href="/servicii/" class="block lg:inline-block px-4 py-2 font-bold text-gray-700 hover:text-accent hover:bg-gray-50 rounded-lg">Toate Serviciile</a>'
);
fs.writeFileSync('src/components/Header.astro', headerContent);

let footerContent = fs.readFileSync('src/components/SeoFooter.astro', 'utf8');
footerContent = footerContent.replace(
  '<a href="/#servicii" style="text-decoration: none; color: #4a5568;">Toate Serviciile / Pachete</a>',
  '<a href="/servicii/" style="text-decoration: none; color: #4a5568;">Toate Serviciile</a>'
);
fs.writeFileSync('src/components/SeoFooter.astro', footerContent);

console.log('Navigation updated');
