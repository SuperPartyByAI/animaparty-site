const fs = require('fs');

let code = fs.readFileSync('src/pages/servicii.astro', 'utf8');

// We don't necessarily need to import and dynamically render unless we want to, 
// but it's cleaner to just replace the hardcoded text with the verified ones directly,
// or we can import businessServices and render them dynamically. Let's just import them.

// 1. Add import statement
code = code.replace(/---/, `---\nimport { businessServices } from '../data/services';`);

// 2. Replace Magician text
code = code.replace(/Spectacole interactive de magie adaptate pentru copii de peste 4-5 ani, trucuri comice și iluzii captivante\./, 
  `{businessServices.magician.hubDescription}`);

// 3. Replace Food text
code = code.replace(/Închiriere mașină de vată de zahăr sau popcorn, cu operator dedicat și consumabile incluse\./, 
  `{businessServices.food_stations.hubDescription}`);

// 4. Decor text
code = code.replace(/Arcade organice asimetrice pentru intrări sau panouri foto, și buchete de baloane umflate cu heliu\./,
  `{businessServices.decor.hubDescription}`);

// 5. Animatori text
code = code.replace(/Personaje interactive pentru jocuri, concursuri, modelaj de baloane și pictură pe față\./,
  `{businessServices.animatori.hubDescription}`);

// 6. Mascote text
code = code.replace(/Costume voluminoase pentru întâmpinarea invitaților, aducerea tortului și fotografii\./,
  `{businessServices.mascote.hubDescription}`);

// 7. Picioroange text
code = code.replace(/Spectacol și vizibilitate crescută pentru evenimente corporate, lansări și festivaluri\./,
  `{businessServices.picioroange.hubDescription}`);

fs.writeFileSync('src/pages/servicii.astro', code);
console.log('Servicii hub synced to central truth');
