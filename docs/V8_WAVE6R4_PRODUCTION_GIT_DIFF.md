# Wave 6R4 Production vs Git Diff

## Overview
A clean clone was created from `recovery/animaparty-wave6r3-production-20260808` and built cleanly using `npm ci && npm run build`.

## Parity Results
- **Indexable Routes**: 11 (Matches production)
- **Sitemap**: 11 URLs (Matches production)
- **Robots.txt**: Matches production
- **Content**: Exact match with production (with Wave 6R3 business truth corrections preserved)

## Differences
The only differences between the clean clone `dist` output and the live `dist` output are the generated timestamped release IDs and exact `sha256` hashes in the delivery proof files, which are dynamically generated at build time. The HTML structure, DOM text, and semantic links are perfectly identical.
