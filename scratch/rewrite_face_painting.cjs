const fs = require('fs');
let content = fs.readFileSync('src/pages/animatori-petreceri-copii-bucuresti.astro', 'utf8');
content = content.replace(/Face painting:<\/strong> Inclus în pachete, folosind produse sigure\./g, 'Face painting:</strong> Se confirmă în funcție de pachet, numărul de copii și timpul disponibil, folosind produse sigure.');
fs.writeFileSync('src/pages/animatori-petreceri-copii-bucuresti.astro', content);

content = fs.readFileSync('src/pages/animatori-petreceri-copii-ilfov.astro', 'utf8');
content = content.replace(/Face painting:<\/strong> Inclus în pachete, folosind produse sigure\./g, 'Face painting:</strong> Se confirmă în funcție de pachet, numărul de copii și timpul disponibil, folosind produse sigure.');
fs.writeFileSync('src/pages/animatori-petreceri-copii-ilfov.astro', content);

console.log('Done Face Painting');
