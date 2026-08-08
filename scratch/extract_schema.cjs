const fs = require('fs');
const html = fs.readFileSync('scratch/home.html', 'utf8');

const regex = /<script type="application\/ld\+json">(.*?)<\/script>/gs;
let match;
let i = 1;
while ((match = regex.exec(html)) !== null) {
  console.log(`--- Schema ${i} ---`);
  console.log(JSON.stringify(JSON.parse(match[1]), null, 2));
  i++;
}
