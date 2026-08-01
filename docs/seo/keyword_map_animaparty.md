# Keyword Map & Cannibalization Analysis - AnimaParty

## Scopul Documentului
Acest document stabilește arhitectura SEO de bază pentru AnimaParty, rezolvând riscul de canibalizare între homepage și o potențială pagină dedicată serviciului principal, și definește oportunitatea paginilor de sector.

---

## 1. Analiza Homepage vs Pagina Pilon

### Varianta A: Homepage = Pagina principală pentru keyword-ul mare
* **Keyword țintă:** "animatori petreceri copii București" / "animatori copii București"
* **Situația curentă:** Homepage-ul a fost deja optimizat pentru această intenție (H1, Meta, Pachete, FAQ, Schema).
* **Pro:**
  - Concentrează toată "puterea" (link equity, autoritate) pe o singură pagină.
  - O afacere de nișă (care oferă exclusiv animatori) performează cel mai bine când homepage-ul este direct pagina de vânzare a serviciului principal.
  - Conversie mai rapidă: utilizatorul intră pe site și vede direct prețurile și personajele, fără extra click-uri.
* **Contra:**
  - Dacă afacerea se extinde masiv (ex: închirieri castele gonflabile, organizare botezuri complete), homepage-ul va fi prea aglomerat.
* **Risc de canibalizare:** Zero, dacă nu creăm o pagină duplicat.

### Varianta B: Crearea `/animatori-petreceri-copii/` ca Pagină Pilon
* **Keyword țintă:** "animatori petreceri copii București"
* **Situația curentă:** Homepage-ul ar trebui retrogradat la un "brand overview", iar traficul redirecționat către noua pagină.
* **Pro:**
  - Arhitectură mai curată dacă site-ul are multe servicii complet distincte.
* **Contra:**
  - **Risc uriaș de canibalizare:** Google va fi confuz dacă și homepage-ul și `/animatori-petreceri-copii/` vorbesc despre același lucru.
  - Pierdem forța homepage-ului în SERP.
  - Utilizatorul are nevoie de un click în plus pentru a ajunge la serviciul dorit.

### RECOMANDARE FINALĂ
**Varianta A.** Homepage-ul trebuie să rămână pagina principală și absolută pentru "animatori petreceri copii București". **NU creăm** `/animatori-petreceri-copii/`, deoarece ar genera o canibalizare masivă și nenecesară.

---

## 2. Arhitectura URL-urilor și Intenția de Căutare

### 2.1. Homepage (`/`)
* **Keyword principal:** animatori petreceri copii București
* **Keyworduri secundare:** animatori copii București, animatori petreceri copii Ilfov, petreceri copii București
* **Intenție:** Tranzacțională & Locală
* **Rol în arhitectură:** Pagina pilon absolută, centrul autorității.
* **Status recomandat:** **Se păstrează și se rafinează.** (Urmează Analiza Top 10).

### 2.2. Pagina `/animatori-petreceri-copii/`
* **Keyword principal:** animatori petreceri copii
* **Ce pagină poate canibaliza:** Homepage-ul.
* **Status recomandat:** **NU SE CREEAZĂ.**

### 2.3. Pagini de Sector (ex: `/animatori-petreceri-copii-sector-1/` până la 6)
* **Keyword principal:** animatori petreceri copii sector [X]
* **Keyworduri secundare:** animatori copii sector [X], petreceri copii sector [X]
* **Intenție:** Locală & Tranzacțională.
* **Public țintă:** Părinți care caută un serviciu strict în proximitatea lor sau se tem de taxe de transport adiționale.
* **Ce pagină poate canibaliza:** Homepage-ul (dacă textul este prea generalist).
* **Cum evităm canibalizarea:** Conținut 100% specific (locații, parcuri, taxe de transport clare pe cartiere, exemple de petreceri în acel sector).
* **Risc doorway pages:** Mare, dacă generăm conținut automat ("Find-Replace" pe numărul sectorului).
* **Status recomandat:** **Se amână.** Până nu batem Top 10 pe București cu homepage-ul și până nu colectăm date hiper-locale pentru fiecare sector (poze, cartiere, testimoniale specifice), nu lansăm aceste pagini.

### 2.4. Pagini Servicii Specifice (ex: `/ursitoare-botez/`, `/mos-craciun-de-inchiriat/`)
* **Keyword principal:** ursitoare botez București / moș crăciun de închiriat
* **Intenție:** Tranzacțională (sezonieră sau de nișă).
* **Ce pagină poate canibaliza:** Niciuna (sunt entități total diferite de "animatori petreceri copii").
* **Status recomandat:** **Se vor crea.** Dar doar cu analiza Top 10 dedicată pe acele cuvinte cheie.

---

## CONCLUZIE PENTRU URMĂTORUL PAS
Nu creăm URL-uri noi redundante. Ne concentrăm pe a face **Homepage-ul (`/`)** să devină ireproșabil și demonstrabil mai bun decât Top 10 competitori pentru cuvântul cheie "animatori petreceri copii București".
