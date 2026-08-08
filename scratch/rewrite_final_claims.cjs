const fs = require('fs');

function fixFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/O selecție masivă de costume/g, 'O varietate de costume');
    content = content.replace(/Toți copiii primesc/g, 'Copiii participanți se pot bucura de');
    content = content.replace(/Sistem audio profesional:/g, 'Boxă portabilă:');
    content = content.replace(/Sesiune foto profesională la minut/g, 'Asistență la fotografii și momentul tortului');
    fs.writeFileSync(file, content);
}

fixFile('src/pages/animatori-petreceri-copii-bucuresti.astro');
fixFile('src/pages/animatori-petreceri-copii-ilfov.astro');
fixFile('src/data/pricing.ts');
fixFile('src/data/faqHome.ts');

console.log('Final claims fixed');
