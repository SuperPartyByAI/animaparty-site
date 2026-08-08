const fs = require('fs');
let content = fs.readFileSync('src/pages/animatori-petreceri-copii.astro', 'utf8');

content = content.replace(/Recomandarea standard în domeniu este de un animator la maximum 12 copii\./g, 'Numărul recomandat de animatori se stabilește în funcție de numărul și vârsta copiilor, spațiul disponibil, durata programului și activitățile alese.');
content = content.replace(/Băiețeii și fetițele au preferințe diferite, la fel și copiii de vârste diferite\./g, 'Preferințele copiilor diferă în funcție de vârstă, interese, temperament și tipul de activități cu care sunt obișnuiți.');

fs.writeFileSync('src/pages/animatori-petreceri-copii.astro', content);
console.log('Done Guide');
