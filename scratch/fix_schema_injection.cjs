const fs = require('fs');

const mappings = [
  { file: 'src/pages/mascote-petreceri-copii.astro', varName: 'mascoteFaq' },
  { file: 'src/pages/animatori-pe-picioroange.astro', varName: 'picioroangeFaq' },
  { file: 'src/pages/decoratiuni-baloane-bucuresti.astro', varName: 'decorFaq' },
  { file: 'src/pages/magician-petreceri-copii.astro', varName: 'magicianFaq' },
  { file: 'src/pages/vata-de-zahar-popcorn-evenimente.astro', varName: 'vataFaq' }
];

mappings.forEach(m => {
  let content = fs.readFileSync(m.file, 'utf8');
  
  if (!content.includes('const schema = JSON.stringify')) {
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
    // Find the second '---' (the one closing the frontmatter)
    const firstDash = content.indexOf('---');
    const secondDash = content.indexOf('---', firstDash + 3);
    
    if (secondDash !== -1) {
      content = content.slice(0, secondDash) + schemaCode + content.slice(secondDash);
      fs.writeFileSync(m.file, content);
      console.log(`Fixed schema in ${m.file}`);
    }
  }
});
