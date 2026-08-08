const fs = require('fs');
const html = fs.readFileSync('scratch/home.html', 'utf8');

const regex = /.{0,50}490.{0,50}/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log(match[0]);
}
