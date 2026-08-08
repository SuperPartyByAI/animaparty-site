const fs = require('fs');

function replaceInFile(path, replacements) {
    let content = fs.readFileSync(path, 'utf8');
    for (let r of replacements) {
        content = content.replace(r.search, r.replace);
    }
    fs.writeFileSync(path, content);
}

replaceInFile('src/components/Comparison.astro', [
    { search: /Până la 12 copii/g, replace: 'Grupuri mai mici' },
    { search: /Peste 12 copii/g, replace: 'Grupuri mai mari' }
]);

replaceInFile('src/components/LogisticsInfo.astro', [
    { search: /<li><strong>Până la 12 copii:<\/strong> 1 animator este suficient\.<\/li>/g, replace: '<li><strong>Numărul de copii:</strong> Numărul recomandat de animatori se stabilește în funcție de numărul și vârsta copiilor, spațiul disponibil, durata programului și activitățile alese.</li>' },
    { search: /<li><strong>Peste 12 copii:<\/strong> Recomandăm 2 animatori pentru a menține ritmul activităților și atenția copiilor\.<\/li>/g, replace: '<li><strong>Grupuri mai mari:</strong> Pentru grupuri mai mari sau spații extinse, doi animatori pot ajuta la coordonarea activităților.</li>' }
]);

replaceInFile('src/components/TrustOperational.astro', [
    { search: /Recomandăm 1 animator pentru grupuri de până la 12 copii, pentru ca fiecare copil să poată primi atenție adecvată\./g, replace: 'Numărul recomandat de animatori se stabilește în funcție de numărul și vârsta copiilor, spațiul disponibil, durata programului și activitățile alese.' }
]);

replaceInFile('src/data/pricing.ts', [
    { search: /grupuri restrânse de până la 12 copii/g, replace: 'grupuri' },
    { search: /peste 12 copii, /g, replace: '' },
    { search: /, peste 12 copii/g, replace: '' },
    { search: /grupuri mai mari, /g, replace: 'grupuri mai mari, ' }, // safe
    { search: /Pentru grupuri restrânse de copii/g, replace: 'Pentru petreceri' }
]);

replaceInFile('src/data/faqHome.ts', [
    { search: /Un singur personaj animator este potrivit pentru grupuri restrânse, de obicei până la 12 copii, mai ales dacă spațiul este bine delimitat și programul nu include prea multe activități simultane\./g, replace: 'Numărul recomandat de animatori se stabilește în funcție de numărul și vârsta copiilor, spațiul disponibil, durata programului și activitățile alese.' }
]);

replaceInFile('src/data/business-facts.ts', [
    { search: /Recomandăm un animator la cel mult 12 copii\./g, replace: '' }
]);

replaceInFile('src/pages/animatori-petreceri-copii.astro', [
    { search: /Recomandarea standard în domeniu este de <strong>un animator la cel mult 12 copii<\/strong>\./g, replace: 'Numărul recomandat de animatori se stabilește în funcție de numărul și vârsta copiilor.' },
    { search: /Pentru grupurile mai mari, se recomandă cel puțin doi animatori\./g, replace: 'Pentru grupuri mai mari sau spații extinse, doi animatori pot ajuta la coordonarea activităților.' }
]);

console.log('Done 12 copii replacements');
