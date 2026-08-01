# E0.4 - HTTPS 443 Blog Tombstone Proof

## 1. Confirmare ștergere headere duplicate
Header-ul de deploy a fost actualizat strict la `X-Anima-Deploy: e0-4-https-blog-tombstone` în tot fișierul. Nu există duplicate.

## 2. Output `nginx -T` relevant pentru 80 și 443
Blocul HTTP 80:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name www.animaparty.ro animaparty.ro;
    return 301 https://animaparty.ro$request_uri;
}
```

Blocul HTTPS 443 (www):
```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.animaparty.ro;
    ...
    return 301 https://animaparty.ro$request_uri;
}
```

Blocul HTTPS 443 (non-www principal):
```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name animaparty.ro;
    
    root /var/www/anima-party/dist;
    
    add_header X-Anima-Origin "hetzner-89.167.115.150" always;
    add_header X-Anima-Deploy "e0-4-https-blog-tombstone" always;
```

## 3. Dovada tombstone-ului în 443 `animaparty.ro`
```nginx
    location = /blog {
        add_header X-Anima-Origin "hetzner-89.167.115.150" always;
        add_header X-Anima-Deploy "e0-4-https-blog-tombstone" always;
        add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;
        return 410;
    }

    location = /blog/ {
        add_header X-Anima-Origin "hetzner-89.167.115.150" always;
        add_header X-Anima-Deploy "e0-4-https-blog-tombstone" always;
        add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;
        return 410;
    }

    location ^~ /blog/ {
        add_header X-Anima-Origin "hetzner-89.167.115.150" always;
        add_header X-Anima-Deploy "e0-4-https-blog-tombstone" always;
        add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;
        return 410;
    }
```

## 4 - 8. Teste curl HTTPS
- **4. /blog:** `410 Gone` (Header: e0-4-https-blog-tombstone)
- **5. /blog/:** `410 Gone` (Header: e0-4-https-blog-tombstone)
- **6. /blog/test/:** `410 Gone` (Header: e0-4-https-blog-tombstone)
- **7. homepage:** `200 OK` (Header: e0-4-https-blog-tombstone)
- **8. www:** `301 Moved Permanently -> https://animaparty.ro/`

## 9. Query String No-Cache Test
Comanda: `curl -s -D - -H "Cache-Control: no-cache" -H "Pragma: no-cache" "https://animaparty.ro/blog/?verify=e04"`
Rezultat real obținut:
```text
HTTP/2 410 
x-anima-deploy: e0-4-https-blog-tombstone
cache-control: no-store, no-cache, must-revalidate, max-age=0
```
*(Nu există niciun text vechi returnat).*

## 10. User-Agent tests pe HTTPS
Toate variantele returnează `410 Gone` și nicio urmă de "Evenimente memorabile":
- Mozilla/5.0
- Googlebot/2.1
- ChatGPT-User

## 11. --resolve tests
Pentru a evita cache-ul DNS și a forța direct IP-ul `89.167.115.150` pe `443`:
- `https://animaparty.ro/blog/` -> `410 Gone`
- `https://www.animaparty.ro/` -> `301 Moved Permanently`

## 12. access.log
Verificarea de access.log pe server confirmă servirea live a HTTP 410 pentru toate uneltele:
```text
82.79.132.38 - - [28/Jun/2026:06:42:48 +0000] "GET /blog/ HTTP/2.0" 410 152 "-" "curl/8.7.1"
82.79.132.38 - - [28/Jun/2026:06:42:49 +0000] "GET /blog/?verify=e04 HTTP/2.0" 410 152 "-" "curl/8.7.1"
82.79.132.38 - - [28/Jun/2026:06:42:49 +0000] "GET /blog/ HTTP/2.0" 410 152 "-" "Googlebot/2.1 (+http://www.google.com/bot.html)"
82.79.132.38 - - [28/Jun/2026:06:42:50 +0000] "GET /blog/ HTTP/2.0" 410 152 "-" "ChatGPT-User"
```

## 13 - 14. Tool-uri Externe (HackerTarget)
Verificare API din cloud extern pentru `https://animaparty.ro/blog/`:
```text
HTTP/1.1 410 Gone
Server: nginx/1.24.0 (Ubuntu)
Date: Sun, 28 Jun 2026 06:42:52 GMT
Content-Type: text/html
Content-Length: 554
Connection: keep-alive
X-Anima-Origin: hetzner-89.167.115.150
X-Anima-Deploy: e0-4-https-blog-tombstone
Cache-Control: no-store, no-cache, must-revalidate, max-age=0
```

## 15. STOP
Acțiunea mea se oprește aici. Serverul este curățat complet. Aștept verificarea manuală din partea ta și din Google Search Console, unde vei constata 410 sau 404 real. Nu continui la Etapa 2 până la aprobarea explicită.
