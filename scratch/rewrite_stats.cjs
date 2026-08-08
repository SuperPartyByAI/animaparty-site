const fs = require('fs');

const replacement = `          <div class="stat-card" style="padding: 24px; border: 1px solid var(--border-subtle); border-radius: 8px;">
            <div class="text-4xl font-bold text-accent mb-2" style="font-size: 2.5rem; color: var(--accent-gold); font-weight: 700;">Experiență</div>
            <div class="text-secondary" style="color: var(--text-secondary);">în interacțiunea cu copiii</div>
          </div>
          <div class="stat-card" style="padding: 24px; border: 1px solid var(--border-subtle); border-radius: 8px;">
            <div class="text-4xl font-bold text-accent mb-2" style="font-size: 2.5rem; color: var(--accent-gold); font-weight: 700;">Costume</div>
            <div class="text-secondary" style="color: var(--text-secondary);">îngrijite</div>
          </div>
          <div class="stat-card" style="padding: 24px; border: 1px solid var(--border-subtle); border-radius: 8px;">
            <div class="text-4xl font-bold text-accent mb-2" style="font-size: 2.5rem; color: var(--accent-gold); font-weight: 700;">Personaje</div>
            <div class="text-secondary" style="color: var(--text-secondary);">atent selectate</div>
          </div>
          <div class="stat-card" style="padding: 24px; border: 1px solid var(--border-subtle); border-radius: 8px;">
            <div class="text-4xl font-bold text-accent mb-2" style="font-size: 2.5rem; color: var(--accent-gold); font-weight: 700;">Punctualitate</div>
            <div class="text-secondary" style="color: var(--text-secondary);">la evenimente</div>
          </div>`;

function fixFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/          <div class="stat-card"[\s\S]*?deplasare în (București|Ilfov).*?<\/div>\n          <\/div>/, replacement);
    fs.writeFileSync(file, content);
}

fixFile('src/pages/animatori-petreceri-copii-bucuresti.astro');
fixFile('src/pages/animatori-petreceri-copii-ilfov.astro');
console.log('Stats rewritten');
