const fs = require('fs');
let code = fs.readFileSync('src/pages/index.astro', 'utf8');

const seoContent = `
    <section class="py-16 bg-white" style="padding: 60px 0; max-width: 900px; margin: 0 auto; text-align: left;">
      <div class="container mx-auto px-4">
        <h2 style="font-size: 1.5rem; margin-bottom: 24px; color: var(--text-primary); font-weight: bold;">Echipa de Animatori AnimaParty pentru evenimente în București și Ilfov</h2>
        <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.7;">Alegerea echipei potrivite de divertisment poate transforma o petrecere de copii într-un moment de bucurie organizat mai ușor. Fie că plănuiești o onomastică restrânsă acasă în Sectorul 1, 2, 3, 4, 5, 6 sau o petrecere mare la locul de joacă din Ilfov, suntem pregătiți să livrăm zâmbete prin programe complete de animație.</p>
        <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.7;">Echipa noastră aduce magia poveștilor prin personaje tematice pregătite să mențină atenția grupului. Folosim materiale atente selecționate, potrivite pentru sesiunile de <strong>pictură pe față (face painting)</strong>, precum și zeci de baloane modelabile din care creăm floricele, săbii și animăluțe, oferindu-le copiilor amintiri plăcute.</p>
      </div>
    </section>
`;

code = code.replace('<SeoFooter />', `${seoContent}\n    <SeoFooter />`);

fs.writeFileSync('src/pages/index.astro', code);
console.log('Added SEO to home');
