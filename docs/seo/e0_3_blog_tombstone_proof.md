# E0.3 - Blog Tombstone Proof

> [!IMPORTANT]
> Toate artefactele de securitate au fost șterse și procedura de login GSC automatizat este oprită definitiv. Se așteaptă validarea manuală a clientului din Google Search Console.

## 1. Ce s-a schimbat în NGINX
Au fost adăugate reguli explicite de tip Tombstone (`return 410`) pentru `/blog`, `/blog/` și sub-directoare pentru a elimina definitiv pagina-fantomă. De asemenea, versiunea `X-Anima-Deploy` a fost modificată la `e0-3-blog-tombstone` pe tot site-ul pentru a face trasabilă sursa fișierelor servite.

## 2. Output `nginx -T` relevant
```nginx
    add_header X-Anima-Origin "hetzner-89.167.115.150" always;
    add_header X-Anima-Deploy "e0-3-blog-tombstone" always;

    location = /blog {
        add_header X-Anima-Origin "hetzner-89.167.115.150" always;
        add_header X-Anima-Deploy "e0-3-blog-tombstone" always;
        add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;
        return 410;
    }

    location = /blog/ {
        add_header X-Anima-Origin "hetzner-89.167.115.150" always;
        add_header X-Anima-Deploy "e0-3-blog-tombstone" always;
        add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;
        return 410;
    }

    location ^~ /blog/ {
        add_header X-Anima-Origin "hetzner-89.167.115.150" always;
        add_header X-Anima-Deploy "e0-3-blog-tombstone" always;
        add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;
        return 410;
    }
```

## 3. Root real servit
Directorul real servit de NGINX este `/var/www/anima-party/dist`.
```text
/var/www/anima-party/dist
total 14M
drwxr-xr-x 3 501 staff  4.0K Jun 27 21:29 .
drwxrwxr-x 8 501 staff  4.0K Jun 26 12:07 ..
-rw-r--r-- 1 501 staff  5.3K Jun 27 21:29 404.html
drwxr-xr-x 2 501 staff  4.0K Jun 27 21:29 _astro
-rw-r--r-- 1 501 staff   31K Jun 27 21:29 index.html
```

## 4. Find root
Lista completă a fișierelor demonstrează existența exclusivă a versiunii de Astro. Fără fișiere /blog.
```text
/var/www/anima-party/dist/404.html
/var/www/anima-party/dist/_astro/index.Nb134D00.css
/var/www/anima-party/dist/char-mascot.png
/var/www/anima-party/dist/char-superhero.png
/var/www/anima-party/dist/comp-group.png
/var/www/anima-party/dist/favicon.ico
/var/www/anima-party/dist/favicon.svg
/var/www/anima-party/dist/gallery-cake.png
...
/var/www/anima-party/dist/index.html
/var/www/anima-party/dist/robots.txt
...
```

## 5. Grep root pentru texte vechi
Comanda `grep -RInE "Evenimente memorabile|Personaje Disponibile|Sistem audio portabil dublu|Cum decurge programul" /var/www/anima-party/dist` a returnat **0 rezultate**. Aceste texte nu mai există fizic pe serverul nostru.

## 6 - 10. Curl local brute (Verificare NGINX)
Toate testele brute locale arată aplicarea regulilor 410 Gone:
- `/blog` -> `410 Gone` + `X-Anima-Deploy: e0-3-blog-tombstone`
- `/blog/` -> `410 Gone` + `X-Anima-Deploy: e0-3-blog-tombstone`
- `/blog/test/` -> `410 Gone` + `X-Anima-Deploy: e0-3-blog-tombstone`
- `/` -> `200 OK` (homepage)
- `www` -> `301 Moved Permanently` (redirect spre non-www)
*(Textele vechi căutate prin grep pe output nu apar niciunde).*

## 11. User-Agent tests
Filtrarea nu se bazează pe User Agent; Googlebot este la fel de blocat.
- `Mozilla/5.0` -> `410 Gone`
- `Googlebot/2.1` -> `410 Gone`
- `ChatGPT-User` -> `410 Gone`

## 12. --resolve tests (Bypass DNS cache local pe curl)
- `/blog/` rezolvat manual spre `89.167.115.150` -> `410 Gone`
- `www` rezolvat manual spre `89.167.115.150` -> `301 Moved Permanently`

## 13 - 14. Tool extern (HackerTarget)
Serviciul API extern vede de asemenea un 410 curat:
```text
HTTP/1.1 410 Gone
Server: nginx/1.24.0 (Ubuntu)
Date: Sun, 28 Jun 2026 06:31:50 GMT
Content-Type: text/html
Content-Length: 554
Connection: keep-alive
X-Anima-Origin: hetzner-89.167.115.150
X-Anima-Deploy: e0-3-blog-tombstone
Cache-Control: no-store, no-cache, must-revalidate, max-age=0
```
*(Pentru www redirecționarea returnează 301).*

## 15 - 16. Securitate și Cleanup
- Confirm că **NU am folosit credențiale** în acest test și logarea automată GSC a fost sistată definitiv.
- Confirm că **artefactele de login au fost șterse în totalitate**. Au fost executate comenzi de eliminare definitivă (`rm -rf` și `rm -f`) pentru:
  - `/tmp/puppeteer-test/` (întregul director și dependințele)
  - Extracțiile de tip HTML dump și fișierele cu credențiale temporare (`/tmp/puppeteer-test/run.js`)
  - Toate logurile temporare de execuție HTML.

## 17. STOP
Acțiunea mea se oprește aici. Aștept confirmarea de la ChatGPT și screenshot-ul/rezultatul tău manual din interiorul Google Search Console (Test Live URL pentru `/blog/`). Nu generez nicio altă modificare și nu continui la Etapa 2.
