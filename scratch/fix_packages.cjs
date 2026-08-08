const fs = require('fs');
let code = fs.readFileSync('src/components/Packages.astro', 'utf8');

const regex = /<a href=\{\`https:\/\/wa.me\/40792864811\?text=Buna\%20ziua!\%20As\%20dori\%20mai\%20multe\%20detalii\%20despre\%20pachetul\%20\$\{group\.title\.replace\(\/\\s\+\/g, '\%20'\)\}\`\}/;

const replacement = `
          {group.id === 'mascote' && (
            <a href="/mascote-petreceri-copii/" class="w-full text-center py-2 mb-2 font-bold transition-all text-primary hover:text-accent" style="display: block; text-decoration: underline;">Vezi detalii pachet Mascote</a>
          )}
          {group.id === 'picioroange' && (
            <a href="/animatori-pe-picioroange/" class="w-full text-center py-2 mb-2 font-bold transition-all text-primary hover:text-accent" style="display: block; text-decoration: underline;">Vezi detalii Picioroange</a>
          )}
          <a href={\`https://wa.me/40792864811?text=Buna%20ziua!%20As%20dori%20mai%20multe%20detalii%20despre%20pachetul%20\$\{group.title.replace(/\\s+/g, '%20')\}\`}`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/Packages.astro', code);
console.log('Packages fixed');
