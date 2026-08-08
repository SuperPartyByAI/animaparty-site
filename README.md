# AnimaParty — ChatGPT Batch 1 / 10 pages

This is the ChatGPT-authored Batch 1 source package for AnimaParty.ro.

## Batch

Ten SEO pages are handled together:

1. `/`
2. `/animatori-petreceri-copii-bucuresti/`
3. `/animatori-petreceri-copii-ilfov/`
4. `/animatori-petreceri-copii/`
5. `/servicii/`
6. `/mascote-petreceri-copii/`
7. `/animatori-pe-picioroange/`
8. `/decoratiuni-baloane-bucuresti/`
9. `/magician-petreceri-copii/`
10. `/vata-de-zahar-popcorn-evenimente/`

`/contact/` remains a regression/control route, keeping total intended sitemap inventory at 11.

## Non-negotiable gate

A Batch 1 seal requires all **10/10 primary queries** to be independently verified at Google/GSC position <= 3. Predeploy content quality does not substitute for ranking proof.

Run source gates:

```bash
npm run batch:gate
```

Build gate:

```bash
npm ci
npm run build
```

Post-deploy live gates:

```bash
npm run qa:googlebot
npm run qa:crawl
ANIMAPARTY_DEPLOY_DIR="<active-static-root>" npm run proof:live
npm run proof:verify
```

Read `ANTIGRAVITY_DEPLOY_INSTRUCTIONS.md` before any server action.
