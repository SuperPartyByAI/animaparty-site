const fs = require('fs');
const path = require('path');

const faqsToAdd = [
  { q: "Mascota vine singură sau însoțită?", a: "De obicei, mascota are nevoie de un coordonator (sau animator) care să o îndrume, având în vedere vizibilitatea redusă." },
  { q: "Pot face poze cu mascota?", a: "Da, mascota participă cu bucurie la toate sesiunile foto alături de copii și părinți." },
  { q: "Mascota poate sta afară, în aer liber?", a: "Da, dacă vremea permite (fără ploaie sau caniculă extremă), mascota poate participa la evenimente în aer liber." },
  { q: "Copiii foarte mici se pot speria de mascotă?", a: "Uneori copiii sub 3 ani pot fi intimidați. Mascota are o abordare blândă și așteaptă ca cel mic să inițieze interacțiunea." },
  { q: "Mascota vorbește?", a: "Nu, mascotele comunică strict non-verbal prin gesturi, dans și îmbrățișări." },
  { q: "Când este momentul ideal să apară mascota?", a: "Recomandăm apariția mascotei la întâmpinarea invitaților sau exact la aducerea tortului." },
  { q: "Mascota aduce ea însăși tortul?", a: "Da, cu sprijinul personalului locației sau al părinților, mascota poate acompania sau aduce tortul." },
  { q: "Costumul este curat și igienizat?", a: "Absolut, toate costumele noastre sunt igienizate profesional după fiecare eveniment." },
  { q: "Mascota participă la dans?", a: "Da, mascota iubește muzica și va dansa alături de copii pe melodiile preferate." },
  { q: "Se poate prelungi prezența mascotei?", a: "De obicei 1 oră este suficient, deoarece costumul este greu și călduros. Pentru programe lungi, recomandăm alternarea cu animatori." },
  { q: "Pot alege orice personaj ca mascotă?", a: "Avem o selecție specifică de mascote (ex: Mickey, Minnie etc.). Vă rugăm să ne contactați pentru disponibilitate." },
  { q: "Mascota are nevoie de un spațiu pentru schimb?", a: "Da, persoana care îmbracă mascota are nevoie de un spațiu privat și curat pentru a se pregăti." }
];

const picioroangeFaqs = [
  { q: "Pot veni picioroangele la petreceri private?", a: "Da, dacă spațiul este suficient de înalt și suprafața plană." },
  { q: "Se pot face fotografii cu animatorii pe picioroange?", a: "Desigur, prezența lor este foarte vizuală și ideală pentru fotografii de eveniment." },
  { q: "Cât de înalți sunt animatorii pe picioroange?", a: "În funcție de model, pot ajunge la 2.5 - 3 metri înălțime." },
  { q: "Pot împărți flyere sau baloane?", a: "Da, animatorii pot interacționa cu publicul oferind baloane modelate sau materiale promoționale." },
  { q: "Au nevoie de muzică specială?", a: "Nu necesită muzică specială, dar o atmosferă muzicală este recomandată." },
  { q: "Sunt potriviți pentru evenimente corporate?", a: "Da, sunt ideali pentru întâmpinarea invitaților la evenimente corporate sau inaugurări." },
  { q: "Pot urca scări?", a: "Din motive de siguranță, se evită scările abrupte. Suprafețele plane sunt obligatorii." },
  { q: "Costumele pot fi personalizate?", a: "Avem diverse tematici. Pentru cerințe specifice, discutați cu echipa noastră." },
  { q: "Cât durează un program pe picioroange?", a: "Recomandăm reprize de 45-60 minute, cu pauze, din cauza efortului fizic." },
  { q: "Fac activități cu copiii?", a: "Interacțiunea este mai mult vizuală (saluturi, baloane, poze). Nu organizează jocuri statice." },
  { q: "Performanța poate avea loc noaptea?", a: "Da, dacă zona este foarte bine iluminată." },
  { q: "Care sunt cerințele de spațiu pentru pregătire?", a: "Este necesar un spațiu cu o înălțime adecvată și scaun rezistent pentru echipare." }
];

const decorFaqs = [
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
  { q: "Taxa de montaj este inclusă?", a: "Da, prețurile ofertate includ de regulă manopera de montaj." }
];

const magicianFaqs = [
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
  { q: "Când este bine să intre magicianul?", a: "De obicei după ce copiii au mâncat, când sunt așezați și pregătiți să urmărească un show." }
];

const vataFaqs = [
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
  { q: "Este sigur pentru copii?", a: "Aparatele sunt operate exclusiv de personalul nostru, copiii neavând acces direct la zonele fierbinți." }
];

const mappings = [
  { file: 'src/pages/mascote-petreceri-copii.astro', faqs: faqsToAdd, varName: 'mascoteFaq' },
  { file: 'src/pages/animatori-pe-picioroange.astro', faqs: picioroangeFaqs, varName: 'picioroangeFaq' },
  { file: 'src/pages/decoratiuni-baloane-bucuresti.astro', faqs: decorFaqs, varName: 'decorFaq' },
  { file: 'src/pages/magician-petreceri-copii.astro', faqs: magicianFaqs, varName: 'magicianFaq' },
  { file: 'src/pages/vata-de-zahar-popcorn-evenimente.astro', faqs: vataFaqs, varName: 'vataFaq' }
];

mappings.forEach(m => {
  let content = fs.readFileSync(m.file, 'utf8');
  
  // Inject FAQs into array
  const faqArrayPattern = new RegExp(`const ${m.varName} = \\[[\\s\\S]*?\\];`);
  const match = content.match(faqArrayPattern);
  if (match) {
    let currentArray = match[0];
    let newItems = m.faqs.map(f => `  {\n    question: "${f.q}",\n    answer: "${f.a}"\n  }`).join(',\n');
    let updatedArray = currentArray.replace('];', `,\n${newItems}\n];`);
    content = content.replace(currentArray, updatedArray);
  }
  
  // Inject Schema
  if (!content.includes('const schema =')) {
    const schemaCode = `
const schema = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": ${m.varName}.map((f) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    }
  ]
});
`;
    // put schemaCode just before the final ---
    content = content.replace(/---\n$/, `${schemaCode}---\n`);
    
    // add schema to layout
    content = content.replace(/<Layout([^>]*)>/, '<Layout$1 schema={schema}>');
  }

  fs.writeFileSync(m.file, content);
  console.log(`Updated ${m.file}`);
});
