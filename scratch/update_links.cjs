const fs = require('fs');

let footerContent = fs.readFileSync('src/components/SeoFooter.astro', 'utf8');
footerContent = footerContent.replace(
  /<a href="\/animatori-petreceri-copii\/" style="text-decoration: none; color: #4a5568;">Ghid Alegere Animator<\/a>/,
  '<a href="/animatori-petreceri-copii/" style="text-decoration: none; color: #4a5568;">Ghid Alegere Animator</a>\n      <a href="/mascote-petreceri-copii/" style="text-decoration: none; color: #4a5568;">Închiriere Mascote</a>\n      <a href="/animatori-pe-picioroange/" style="text-decoration: none; color: #4a5568;">Animatori Picioroange</a>'
);
fs.writeFileSync('src/components/SeoFooter.astro', footerContent);

console.log('Links added to Footer');
