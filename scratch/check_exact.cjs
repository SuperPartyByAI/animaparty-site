const fs = require('fs');
const html = fs.readFileSync('scratch/home.html', 'utf8');

console.log("has oră?", html.includes('490 RON / oră') || html.includes('490 RON / ora'));
console.log("has pachet de 2 ore?", html.includes('pachet de 2 ore'));
console.log("has servicii link?", html.includes('href="/servicii/"'));
