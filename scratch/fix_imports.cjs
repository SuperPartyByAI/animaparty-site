const fs = require('fs');

let mascote = fs.readFileSync('src/pages/mascote-petreceri-copii.astro', 'utf8');
mascote = mascote.replace(
  "import { businessFacts, pricingTiers } from '../data/business-facts';",
  "import { businessFacts } from '../data/business-facts';\nimport { pricingTiers } from '../data/pricing';"
);
mascote = mascote.replace('pricingTiers.find(t =>', 'pricingTiers.find((t: any) =>');
fs.writeFileSync('src/pages/mascote-petreceri-copii.astro', mascote);

let picioroange = fs.readFileSync('src/pages/animatori-pe-picioroange.astro', 'utf8');
picioroange = picioroange.replace(
  "import { businessFacts, pricingGroups } from '../data/business-facts';",
  "import { businessFacts } from '../data/business-facts';\nimport { pricingGroups } from '../data/pricing';"
);
picioroange = picioroange.replace('pricingGroups.find(g =>', 'pricingGroups.find((g: any) =>');
picioroange = picioroange.replace('picioroangeGroup?.tiers.find(t =>', 'picioroangeGroup?.tiers.find((t: any) =>');
picioroange = picioroange.replace('picioroangeGroup?.tiers.find(t =>', 'picioroangeGroup?.tiers.find((t: any) =>');
fs.writeFileSync('src/pages/animatori-pe-picioroange.astro', picioroange);

console.log('Imports and types fixed');
