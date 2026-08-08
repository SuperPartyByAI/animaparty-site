const fs = require('fs');
let content = fs.readFileSync('src/pages/animatori-petreceri-copii-ilfov.astro', 'utf8');

content = content.replace(/Personaje-petreceri-copii-ilfov/g, 'animatori-petreceri-copii-ilfov');
content = content.replace(/Ilfov \| Sectoarele 1-6/g, 'Ilfov');
content = content.replace(/Sectoare Acoperite/g, 'Localități deservite în Ilfov');
content = content.replace(/Ne deplasăm fără costuri suplimentare de transport la orice adresă aflată pe teritoriul administrativ al Ilfovului./g, 'Pentru Ilfov, costul deplasării se comunică înainte de confirmarea rezervării, în funcție de adresă și program.');
content = content.replace(/Deplasarea în Ilfov \(Sectoarele 1-6\) este gratuită./g, 'Costul deplasării în Ilfov se comunică înainte de confirmarea rezervării.');
content = content.replace(/\['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6'\]/g, "['Voluntari', 'Otopeni', 'Popești-Leordeni', 'Bragadiru', 'Pantelimon', 'Chiajna', 'Corbeanca', 'Mogoșoaia', 'Buftea']");
content = content.replace(/direct la adresa ta din capitală/g, 'direct la adresa ta din județul Ilfov');
content = content.replace(/data, ora, sectorul/g, 'data, ora, localitatea și adresa exactă');
content = content.replace(/sutele de opțiuni disponibile/g, 'opțiunile disponibile');
content = content.replace(/Până la 12 copii pot fi coordonați optim de un singur animator\. Dacă aveți peste 15 invitați, recomandăm rezervarea a 2 Personaje pentru a menține ritmul petrecerii\./g, 'Numărul recomandat de animatori se stabilește în funcție de numărul și vârsta copiilor, spațiul disponibil, durata programului și activitățile alese. Pentru grupuri mai mari, recomandăm 2 Personaje.');
content = content.replace(/Incluse în mod specific în pachetele extinse de 3 ore\./g, 'Servicii opționale, disponibile la cerere.');
content = content.replace(/10\+ Personaje instruiți/g, 'Animatori profesioniști');
content = content.replace(/din capitală/g, 'din județul Ilfov');
content = content.replace(/Face painting: Inclus în pachete/g, 'Face painting: Se confirmă în funcție de pachet și timpul disponibil');

fs.writeFileSync('src/pages/animatori-petreceri-copii-ilfov.astro', content);
console.log('Done Ilfov');
