const fs = require('fs');

let content = `export const faqIlfov = [
  {
    question: "Veniți în toate localitățile din Ilfov?",
    answer: "Da, echipa noastră se deplasează în orice localitate din județul Ilfov (Otopeni, Voluntari, Popești-Leordeni, Bragadiru, etc.) pentru orice tip de petrecere de copii."
  },
  {
    question: "Există taxă de transport în Ilfov?",
    answer: "Pentru județul Ilfov, costul deplasării se comunică înainte de confirmarea rezervării, în funcție de adresă și program."
  },
  {
    question: "Cât costă un animator pentru petrecere copii în Ilfov?",
    answer: "Prețurile încep de la 280 Lei pentru un personaj animator timp de 1 oră. Pachetele variază în funcție de numărul de animatori și durata rezervată."
  },
  {
    question: "Când este suficient 1 personaj animator?",
    answer: "Numărul recomandat de animatori se stabilește în funcție de numărul și vârsta copiilor, spațiul disponibil, durata programului și activitățile alese."
  },
  {
    question: "Când sunt recomandați 2 animatori?",
    answer: "Pentru grupuri mai mari sau spații extinse, doi animatori pot ajuta la coordonarea activităților pentru a menține ritmul și distracția întregului grup."
  },
  {
    question: "Se poate organiza petrecerea acasă sau în apartament?",
    answer: "Absolut. Ne adaptăm spațiului disponibil, fie că este o sufragerie de apartament sau o casă. Jocurile sunt flexibile și sigure pentru interior."
  },
  {
    question: "Se poate organiza la restaurant sau terasă?",
    answer: "Da, venim frecvent la restaurante și terase din Ilfov. Găsim mereu soluții pentru a organiza copiii fără a deranja ceilalți oaspeți."
  },
  {
    question: "Veniți la grădinițe și școli din Ilfov?",
    answer: "Da, participăm la aniversări și serbări organizate în cadrul unităților de învățământ preșcolar și școlar din județul Ilfov, cu aprobarea instituției."
  },
  {
    question: "Veniți la locuri de joacă din Ilfov?",
    answer: "Desigur. Colaborăm ușor cu spațiile de joacă închiriate. Animatorul aduce un plus de spectacol și coordonează eficient grupul de copii."
  },
  {
    question: "Ce activități sunt incluse în pachete?",
    answer: "Programele includ jocuri interactive adaptate vârstei, personaje tematice la alegere, asistență la momentul tortului și fond muzical adecvat."
  },
  {
    question: "Este inclus Balloon Exploder?",
    answer: "Serviciul Balloon Exploder este opțional și disponibil la cerere. Costul se confirmă la momentul rezervării."
  },
  {
    question: "Este inclusă Piñata?",
    answer: "Piñata este un serviciu opțional. Oferim asistență și coordonare pentru momentul spargerii, iar costul accesoriului se confirmă la cerere."
  },
  {
    question: "Face painting-ul este inclus?",
    answer: "Face painting-ul se confirmă în funcție de pachet, numărul de copii și timpul disponibil, respectând dorințele părinților."
  },
  {
    question: "Baloanele modelabile sunt incluse?",
    answer: "Baloanele modelabile (săbii, floricele, cățeluși) sunt oferite la finalul programului tuturor copiilor prezenți, fiind incluse în toate pachetele."
  },
  {
    question: "Cum aleg personajul potrivit?",
    answer: "Vă punem la dispoziție o varietate de costume, incluzând eroi, prințese și mascote. Vă sfătuim să alegeți personajul preferat de sărbătorit."
  },
  {
    question: "Cu cât timp înainte trebuie să rezerv?",
    answer: "Recomandăm rezervarea cu cel puțin 1-2 săptămâni în avans, în special pentru evenimentele de weekend din Ilfov, care sunt foarte solicitate."
  },
  {
    question: "Ce trebuie să pregătească părinții înainte de eveniment?",
    answer: "Avem nevoie doar de acces la o priză pentru sistemul audio și de un mic spațiu liber unde să se poată desfășura în siguranță jocurile."
  },
  {
    question: "Cum se confirmă ora și adresa?",
    answer: "Toate detaliile logistice, inclusiv localitatea, adresa exactă și ora începerii, sunt discutate și confirmate oficial prin mesaje pe WhatsApp."
  },
  {
    question: "Pot rezerva pentru weekend?",
    answer: "Da, majoritatea evenimentelor noastre au loc sâmbăta și duminica. Recomandăm rezervarea din timp pentru a asigura disponibilitatea personajului dorit."
  },
  {
    question: "Pot combina animatorii cu servicii extra?",
    answer: "Echipa noastră oferă un pachet complet. Pentru servicii suplimentare de divertisment infantil, detaliile se stabilesc personalizat la momentul rezervării."
  }
];
`;

fs.writeFileSync('src/data/faqIlfov.ts', content);
console.log('Done faqIlfov.ts');
