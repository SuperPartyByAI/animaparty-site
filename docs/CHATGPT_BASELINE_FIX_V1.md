# AnimaParty ChatGPT Baseline Fix V1

Baseline: public Wave6R4 (`animaparty-seo-v8-wave6r4-20260808T125308Z`).

Changes in this package:
- normalized stale handoff metadata to the verified Wave6R4 live baseline;
- fixed 5 missing-asset references using assets already bundled in `public/`;
- fixed București JSON-LD/Offer/Breadcrumb URLs to the canonical lowercase route;
- removed unsupported fixed mascot and stilt prices from visible package cards and Offer schema;
- preserved verified animator prices (280/490/490/830);
- added CSS token compatibility aliases to eliminate undefined legacy variables;
- replaced legacy Kassia-named OG image with an AnimaParty asset;
- removed the broken `/termeni-si-conditii` footer link until a real legal route exists.

Build note: ChatGPT's current sandbox could not complete `npm ci` because the platform npm mirror returned 404 for `zwitch@2.0.4`. The lockfile itself points to the public npm registry and the package/version exists. Antigravity must run `npm ci && npm run build` as a hard deployment gate.

Do not deploy if the build fails. Regenerate `build-identity.json` and delivery-proof hashes only after a successful production build.
