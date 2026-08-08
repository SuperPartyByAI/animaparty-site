const fs = require('fs');
let code = fs.readFileSync('src/pages/decoratiuni-baloane-bucuresti.astro', 'utf8');

code = code.replace(/sunt printre cele mai solicitate pentru aniversări/g, "potrivite pentru aniversări");
code = code.replace(/Pentru arcade și photo corners, montajul la locație durează în medie între 1 și 2 ore\. Vă recomandăm să aveți acces la spațiu în prealabil\./g, "Timpul necesar pentru montajul la locație variază în funcție de complexitatea aranjamentului. Detaliile privind accesul la spațiu se vor stabili înainte de eveniment.");
code = code.replace(/Baloanele din latex umflate cu heliu plutesc în jur de 10-12 ore \(depinde de tratament și temperatură\), iar cele din folie pot pluti câteva zile\./g, "Timpul de plutire depinde de tipul balonului (latex sau folie), condițiile de temperatură și tratamentul aplicat.");

fs.writeFileSync('src/pages/decoratiuni-baloane-bucuresti.astro', code);
console.log('Decor content fixed');
