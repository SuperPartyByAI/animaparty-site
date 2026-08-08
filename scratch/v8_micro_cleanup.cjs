const fs = require('fs');

function fixFile(file, replacements) {
    let content = fs.readFileSync(file, 'utf8');
    for (let {search, replace} of replacements) {
        content = content.replace(search, replace);
    }
    fs.writeFileSync(file, content);
}

// 1. Guide: boxa puternica
fixFile('src/pages/animatori-petreceri-copii.astro', [
    { search: /o boxă puternică este esențială/g, replace: 'un sistem audio potrivit dimensiunii locației poate ajuta la coordonarea jocurilor și muzicii' }
]);

// 2. SeoFooter: secretul
fixFile('src/components/SeoFooter.astro', [
    { search: /Alegerea echipei potrivite de divertisment este secretul oricărei aniversări reușite\./g, replace: 'Alegerea echipei potrivite de divertisment poate transforma o petrecere de copii într-un moment de bucurie organizat mai ușor.' }
]);

// 3. FAQ Bucuresti & Ilfov: weekend claims
const faqReplacements = [
    { search: /în special pentru evenimentele de weekend din .*?, care sunt foarte solicitate\./g, replace: 'Pentru evenimentele de weekend recomandăm verificarea disponibilității din timp.' },
    { search: /Da, majoritatea evenimentelor noastre au loc sâmbăta și duminica\. Recomandăm rezervarea din timp pentru a asigura disponibilitatea personajului dorit\./g, replace: 'Da. Pentru evenimentele de weekend recomandăm verificarea disponibilității din timp.' },
    { search: /data, ora, sectorul/g, replace: 'data, ora, localitatea, adresa exactă' } // Fix for Ilfov grammar and Bucuresti just to be safe if they use sectorul? Wait, Bucuresti can keep sectorul, Ilfov must use localitatea, adresa exactă. I will do this separately.
];

let ilfovContent = fs.readFileSync('src/data/faqIlfov.ts', 'utf8');
ilfovContent = ilfovContent.replace(/în special pentru evenimentele de weekend din Ilfov, care sunt foarte solicitate\./g, 'Pentru evenimentele de weekend recomandăm verificarea disponibilității din timp.');
ilfovContent = ilfovContent.replace(/Da, majoritatea evenimentelor noastre au loc sâmbăta și duminica\. Recomandăm rezervarea din timp pentru a asigura disponibilitatea personajului dorit\./g, 'Da. Pentru evenimentele de weekend recomandăm verificarea disponibilității din timp.');
ilfovContent = ilfovContent.replace(/data, ora, localitatea și adresa exactă și numărul/g, 'data, ora, localitatea, adresa exactă și numărul');
fs.writeFileSync('src/data/faqIlfov.ts', ilfovContent);

let bucContent = fs.readFileSync('src/data/faqBucuresti.ts', 'utf8');
bucContent = bucContent.replace(/în special pentru evenimentele de weekend din București, care sunt foarte solicitate\./g, 'Pentru evenimentele de weekend recomandăm verificarea disponibilității din timp.');
bucContent = bucContent.replace(/Da, majoritatea evenimentelor noastre au loc sâmbăta și duminica\. Recomandăm rezervarea din timp pentru a asigura disponibilitatea personajului dorit\./g, 'Da. Pentru evenimentele de weekend recomandăm verificarea disponibilității din timp.');
fs.writeFileSync('src/data/faqBucuresti.ts', bucContent);

// 4. Ilfov context: mediul rezidențial din oraș
fixFile('src/pages/animatori-petreceri-copii-ilfov.astro', [
    { search: /mediul rezidențial din oraș/g, replace: 'spații rezidențiale' },
    { search: /Ne scrieți pe WhatsApp data, ora, sectorul și numărul/g, replace: 'Ne scrieți pe WhatsApp data, ora, localitatea, adresa exactă și numărul' }
]);

console.log('Micro-cleanup phase 1 complete');
