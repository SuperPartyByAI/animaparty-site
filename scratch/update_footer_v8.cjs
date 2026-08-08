const fs = require('fs');

let footerContent = fs.readFileSync('src/components/SeoFooter.astro', 'utf8');
footerContent = footerContent.replace(
  '<a href="/animatori-pe-picioroange/" style="text-decoration: none; color: #4a5568;">Animatori Picioroange</a>',
  '<a href="/animatori-pe-picioroange/" style="text-decoration: none; color: #4a5568;">Animatori Picioroange</a>\n      <a href="/decoratiuni-baloane-bucuresti/" style="text-decoration: none; color: #4a5568;">Decorațiuni Baloane</a>\n      <a href="/vata-de-zahar-popcorn-evenimente/" style="text-decoration: none; color: #4a5568;">Vată de Zahăr & Popcorn</a>\n      <a href="/magician-petreceri-copii/" style="text-decoration: none; color: #4a5568;">Magician</a>'
);
fs.writeFileSync('src/components/SeoFooter.astro', footerContent);

console.log('Links added to Footer');
