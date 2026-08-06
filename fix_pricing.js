const fs = require('fs');
let content = fs.readFileSync('src/data/pricing.ts', 'utf8');
content = content.replace(/Pictură pe față \(dacă timpul permite\)/g, 'Pictură pe față (inclusă, dar dependentă de durata pachetului și numărul de copii)');
content = content.replace(/Moment special Balloon Exploder \(la pachetele de 2h\/3h\)/g, 'Moment special Balloon Exploder (opțional, la cerere)');
content = content.replace(/Pariul distracției cu Piñata \(la pachetul de 3h\)/g, 'Pariul distracției cu Piñata (opțional, la cerere)');
content = content.replace(/Balloon Exploder și Piñata \(la pachetele extinse\)/g, 'Balloon Exploder și Piñata (opționale, la cerere)');
fs.writeFileSync('src/data/pricing.ts', content);
