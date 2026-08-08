const fs = require('fs');
let code = fs.readFileSync('src/pages/animatori-pe-picioroange.astro', 'utf8');

code = code.replace(/Echipamentele sunt reglabile și pot adăuga între 50 cm și 162 cm înălțime la statura animatorului, oferind un impact vizual de la mare distanță\./g, "Costumele specifice și echipamentul înălțător oferă o prezență impunătoare, asigurând vizibilitate de la mare distanță.");
code = code.replace(/Da, atâta timp cât spațiul \(tavanul\) are înălțimea necesară \(minim 3-4 metri\) și suprafața este dreaptă și nealunecoasă\./g, "Este posibilă și performanța la interior, în condițiile în care înălțimea sălii permite, iar podeaua asigură siguranța (fără trepte, obstacole sau suprafețe alunecoase).");

fs.writeFileSync('src/pages/animatori-pe-picioroange.astro', code);
console.log('Picioroange content fixed');
