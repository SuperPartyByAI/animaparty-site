const fs = require('fs');
let code = fs.readFileSync('src/pages/vata-de-zahar-popcorn-evenimente.astro', 'utf8');

code = code.replace(/O atracție clasică și iubită de toți copiii\. Vata/g, "O atracție clasică. Vata");
code = code.replace(/Consumabile \(zahăr, bețe\) incluse/g, "Opțiuni pentru consumabile incluse");
code = code.replace(/Operator dedicat pentru preparare/g, "Posibilitate de operator dedicat");
code = code.replace(/Posibilitate de culori diferite/g, "Personalizare în funcție de eveniment");
code = code.replace(/Consumabile \(porumb, pungi\/cutii\) incluse/g, "Pachete flexibile cu sau fără consumabile");
code = code.replace(/Operator dedicat pentru servire/g, "Servicii complete cu operator la cerere");
code = code.replace(/Închirierea se face pe oră\. Tariful variază în funcție de numărul de invitați \(porții\) și durata evenimentului\. Toate pachetele includ operatorul mașinii și consumabilele necesare\./g, "Tariful variază în funcție de prezența operatorului, necesarul de consumabile și durata evenimentului. Detaliile se confirmă personalizat la cerere.");
code = code.replace(/Aparatele necesită o priză standard \(220V\) în apropiere\./g, "De regulă, aparatele necesită o sursă de curent standard (220V).");

fs.writeFileSync('src/pages/vata-de-zahar-popcorn-evenimente.astro', code);
console.log('Food content fixed');
