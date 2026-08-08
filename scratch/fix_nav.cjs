const fs = require('fs');

// Fix Header
let header = fs.readFileSync('src/components/Header.astro', 'utf8');
header = header.replace(/<a href="\/#servicii"([^>]*)>Servicii<\/a>/, '<a href="/servicii/"$1>Servicii</a>');
fs.writeFileSync('src/components/Header.astro', header);

// Fix Footer
let footer = fs.readFileSync('src/components/Footer.astro', 'utf8');
footer = footer.replace(/<li><a href="\/animatori-petreceri-copii\/"([^>]*)>Ghid util<\/a><\/li>\s*<li><a href="\/#pachete"([^>]*)>Pachete și prețuri<\/a><\/li>/, 
`<li><a href="/animatori-petreceri-copii/"$1>Ghid util</a></li>
        <li><a href="/servicii/"$1>Toate Serviciile</a></li>
        <li><a href="/#pachete"$2>Pachete și prețuri</a></li>`);
fs.writeFileSync('src/components/Footer.astro', footer);

console.log('Nav fixed');
