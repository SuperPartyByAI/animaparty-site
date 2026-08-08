const fs = require('fs');
let content = fs.readFileSync('src/pages/animatori-petreceri-copii-bucuresti.astro', 'utf8');

content = content.replace(/sutele de opțiuni disponibile/g, 'opțiunile disponibile');
content = content.replace(/Până la 12 copii pot fi coordonați optim de un singur animator\. Dacă aveți peste 15 invitați, recomandăm rezervarea a 2 Personaje pentru a menține ritmul petrecerii\./g, 'Numărul recomandat de animatori se stabilește în funcție de numărul și vârsta copiilor, spațiul disponibil, durata programului și activitățile alese. Pentru grupuri mai mari, recomandăm 2 Personaje.');
content = content.replace(/Incluse în mod specific în pachetele extinse de 3 ore\./g, 'Servicii opționale, disponibile la cerere.');
content = content.replace(/10\+ Personaje instruiți/g, 'Animatori profesioniști');
content = content.replace(/Face painting: Inclus în pachete/g, 'Face painting: Se confirmă în funcție de pachet și timpul disponibil');

fs.writeFileSync('src/pages/animatori-petreceri-copii-bucuresti.astro', content);
console.log('Done Bucuresti');
