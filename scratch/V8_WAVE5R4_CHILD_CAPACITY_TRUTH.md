# Child Capacity Source of Truth

**Investigation:**
We inspected the Git history of `src/data/pricing.ts`. The explicit "până la 12 copii" and "peste 12 copii" thresholds were introduced during an AI-driven SEO V4 pass (commit message: "SEO V4: Force rigid truth - remove all references to 15 copii across all components and strictly apply 12 copii rule") rather than derived from a verified external commercial document.

**Decision:**
Because no authoritative business evidence exists for the rigid number "12", this threshold has been **removed** from all public surfaces (pricing.ts).

**New Wording:**
The site now uses the approved qualitative recommendation:
"Pentru grupuri mai mari, spații deschise sau programe cu mai multe activități, pot fi recomandați doi animatori."
