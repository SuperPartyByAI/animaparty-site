const fs = require('fs');
let code = fs.readFileSync('src/pages/magician-petreceri-copii.astro', 'utf8');

code = code.replace(/Recomandat pentru copii de peste 4-5 ani\./g, "Programul se adaptează în funcție de vârsta participanților.");
code = code.replace(/Durata standard a unui spectacol de magie este cuprinsă, de obicei, între 40 și 60 de minute, pentru a menține atenția maximă a celor mici\./g, "Durata spectacolului se confirmă în funcție de programul solicitat.");
code = code.replace(/Magicianul vine cu propriile recuzite și materiale\./g, "Detaliile privind recuzita și formatul exact se confirmă la rezervare.");
code = code.replace(/Poate necesita acces la o priză \(dacă include și sonorizare\)\./g, "Eventualele cerințe logistice se stabilesc în funcție de locație.");

fs.writeFileSync('src/pages/magician-petreceri-copii.astro', code);
console.log('Magician content fixed');
