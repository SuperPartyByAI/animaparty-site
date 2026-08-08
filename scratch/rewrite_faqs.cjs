const fs = require('fs');

const mappings = [
  { file: 'src/pages/decoratiuni-baloane-bucuresti.astro', varName: 'decorFaq' },
  { file: 'src/pages/magician-petreceri-copii.astro', varName: 'magicianFaq' },
  { file: 'src/pages/vata-de-zahar-popcorn-evenimente.astro', varName: 'vataFaq' }
];

const decorFaqs = [
  { q: "Cât durează montajul?", a: "Timpul necesar pentru montajul la locație variază în funcție de complexitatea aranjamentului. Detaliile privind accesul la spațiu se vor stabili înainte de eveniment." },
  { q: "Cât rezistă baloanele cu heliu?", a: "Baloanele din latex tratate corespunzător pot pluti între 12 și 24 de ore, iar cele din folie pot rezista mai multe zile, în funcție de condițiile de temperatură." },
  { q: "Cu cât timp înainte trebuie comandat decorul?", a: "Recomandăm plasarea comenzii cu cel puțin o săptămână înainte, pentru a asigura nuanțele dorite." },
  { q: "Veniti la locație să montați?", a: "Da, asigurăm montajul profesional direct la locația evenimentului." },
  { q: "Cât durează montajul unei arcade?", a: "În funcție de complexitate, montajul poate dura între 1 și 3 ore." },
  { q: "Baloanele cu heliu plutesc toată petrecerea?", a: "Da, baloanele cu heliu sunt tratate pentru a pluti minimum 12-24 de ore." },
  { q: "Ce se întâmplă cu decorul la finalul petrecerii?", a: "Structurile închiriate (panouri, inele) se recuperează. Baloanele vă aparțin." },
  { q: "Folosiți baloane calitative?", a: "Folosim doar baloane din latex profesional, biodegradabile și sigure." },
  { q: "Se pot personaliza culorile arcadei?", a: "Sigur, paleta cromatică se stabilește exact pe tematica petrecerii dumneavoastră." },
  { q: "Puteți adăuga nume sau mesaje pe decor?", a: "Da, panourile sau baloanele mari pot fi personalizate cu mesaje text." },
  { q: "Decorul poate sta afară în soare?", a: "Culorile pot oxida (deveni mate) în soare direct, iar heliul este sensibil la temperaturi extreme. Preferăm spații umbrite." },
  { q: "Dacă se sparge un balon în timpul montajului?", a: "Avem mereu baloane de rezervă, nu va afecta aspectul final al decorului." },
  { q: "Ce formă poate avea arcada?", a: "Realizăm arcade organice semirotunde, pe inel metalic sau ghirlande asimetrice." },
  { q: "Taxa de montaj este inclusă?", a: "Da, prețurile ofertate includ de regulă manopera de montaj." },
  { q: "Oferiți și baloane personalizate?", a: "Da, putem personaliza baloane cu text sau imagini." }
];

const magicianFaqs = [
  { q: "Este potrivit spectacolul pentru copii mici?", a: "Spectacolul este recomandat în general copiilor peste 4 ani, deoarece presupune un anumit nivel de atenție pentru a înțelege și a se bucura de trucurile prezentate." },
  { q: "Ce nevoi tehnice există?", a: "Magicianul vine pregătit cu toată recuzita necesară. Este nevoie doar de un spațiu adecvat în fața publicului și, în funcție de locație, de acces la o priză." },
  { q: "Magicianul vine costumat clasic?", a: "Da, magicianul nostru are o ținută specifică (sacou, joben sau elemente de magie)." },
  { q: "Unde poate avea loc spectacolul?", a: "Oriunde: la restaurant, acasă, în grădiniță sau la un loc de joacă." },
  { q: "Este nevoie de un spațiu special?", a: "Magicianul are nevoie de un mic spațiu în față unde copiii să poată sta pe jos sau pe scaune pentru a privi." },
  { q: "Aduce magicianul iepuraș sau porumbei?", a: "Folosim recuzită sigură. Din motive de etică și siguranță pentru animale și copii, numerele cu animale vii sunt discutate punctual, dacă sunt disponibile." },
  { q: "Copiii sunt implicați în trucuri?", a: "Da, spectacolul este foarte interactiv. Sărbătoritul este adesea invitat ca asistent principal." },
  { q: "Părinții se pot uita?", a: "Absolut! Magia este de tip family-entertainment, amuzantă și pentru adulți." },
  { q: "Aduce recuzită proprie?", a: "Da, magicianul vine cu absolut toată recuzita necesară spectacolului." },
  { q: "Are nevoie de muzică?", a: "Unele numere necesită muzică de fundal. Magicianul poate aduce un mic sistem audio sau se poate conecta la boxa locației." },
  { q: "Poate veni la serbări școlare?", a: "Da, spectacolul se poate adapta pentru grupuri mari de copii la grădinițe sau școli." },
  { q: "Ce fel de magie se prezintă?", a: "Iluzionism de salon adaptat copiilor: dispariții, apariții de obiecte, trucuri cu cărți sau sfori." },
  { q: "Cât durează spectacolul?", a: "În general, spectacolul durează 45-60 de minute, durata ideală pentru atenția copiilor." },
  { q: "Când este bine să intre magicianul?", a: "De obicei după ce copiii au mâncat, când sunt așezați și pregătiți să urmărească un show." },
  { q: "Puteți face magie cu foc?", a: "Pentru siguranța copiilor, evităm magia cu foc deschis, optând pentru iluzii 100% sigure." }
];

const vataFaqs = [
  { q: "Este nevoie de alimentare electrică specială?", a: "Pentru funcționarea optimă a echipamentelor este necesar accesul la o sursă standard de energie electrică (220V)." },
  { q: "Ingredientele sunt sigure pentru copii?", a: "Folosim doar ingrediente și consumabile certificate, potrivite pentru consumul alimentar." },
  { q: "Aparatul de vată de zahăr vine cu operator?", a: "Da, toate mașinile noastre vin cu un operator uman care prepară și împarte vata." },
  { q: "Este limitat numărul de porții?", a: "De obicei, serviciul este nelimitat pe durata orei/orelor contractate." },
  { q: "Aparatul de popcorn necesită priză?", a: "Da, avem nevoie de acces la o priză standard de 220V." },
  { q: "Cât de repede se prepară vata de zahăr?", a: "Operatorul este rapid, o porție durează doar câteva secunde." },
  { q: "Popcornul este sărat sau dulce?", a: "Servim popcorn sărat clasic, pufos și proaspăt preparat la fața locului." },
  { q: "Aparatele pot fi aduse în interior?", a: "Da, dacă spațiul este bine ventilat și locația permite acest lucru." },
  { q: "Vata de zahăr poate fi colorată?", a: "Da, folosim coloranți alimentari siguri pentru a obține vată roz, albastră sau alte culori." },
  { q: "Ce consumabile sunt incluse?", a: "Bețele pentru vată și pungile/cornetele pentru popcorn sunt incluse." },
  { q: "Operatorul vine costumat?", a: "Operatorul are o ținută decentă și curată, sau poate fi tematic la cerere." },
  { q: "Aparatele fac mult zgomot?", a: "Aparatul de vată este silențios. Cel de popcorn face un zgomot specific când floricelele sar, dar nu este deranjant." },
  { q: "Există un număr minim de ore?", a: "Da, închirierea minimă este de obicei de 1 sau 2 ore, în funcție de pachet." },
  { q: "Este sigur pentru copii?", a: "Aparatele sunt operate exclusiv de personalul nostru, copiii neavând acces direct la zonele fierbinți." },
  { q: "Puteți oferi ambele servicii la același eveniment?", a: "Da, oferim pachete combinate cu vată de zahăr și popcorn la prețuri avantajoase." }
];

mappings[0].faqs = decorFaqs;
mappings[1].faqs = magicianFaqs;
mappings[2].faqs = vataFaqs;

mappings.forEach(m => {
  let content = fs.readFileSync(m.file, 'utf8');
  
  // Remove broken schema
  content = content.replace(/const schema = JSON\.stringify\(\{[\s\S]*?\}\);\n/, '');
  
  // Clean up any double --- or trailing schema in layout tag
  content = content.replace(/<Layout([^>]*)schema=\{schema\}([^>]*)>/g, '<Layout$1$2>');
  
  // Insert the array and schema into frontmatter
  const frontmatterEnd = content.indexOf('---', 3);
  
  const arrayCode = `
const ${m.varName} = ${JSON.stringify(m.faqs, null, 2)};
`;
  
  const schemaCode = `
const schema = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": ${m.varName}.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    }
  ]
});
`;

  content = content.slice(0, frontmatterEnd) + arrayCode + schemaCode + content.slice(frontmatterEnd);
  
  // Re-add schema to layout
  content = content.replace(/<Layout/, '<Layout schema={schema}');

  // Replace hardcoded HTML FAQs with dynamic map
  const faqSectionRegex = /<div class="space-y-4" style="display: flex; flex-direction: column; gap: 16px;">[\s\S]*?<\/div>\n      <\/div>\n    <\/section>/;
  
  const newFaqHtml = `<div class="space-y-4" style="display: flex; flex-direction: column; gap: 16px;">
          {${m.varName}.map((item) => (
            <div style="background: var(--bg-tertiary); padding: 24px; border-radius: 8px; border-left: 4px solid var(--accent);">
              <h3 class="font-bold text-lg mb-2" style="color: var(--primary);">{item.q}</h3>
              <p style="color: var(--text-secondary); line-height: 1.6;">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>`;
    
  content = content.replace(faqSectionRegex, newFaqHtml);
  
  fs.writeFileSync(m.file, content);
  console.log(`Rewritten ${m.file}`);
});
