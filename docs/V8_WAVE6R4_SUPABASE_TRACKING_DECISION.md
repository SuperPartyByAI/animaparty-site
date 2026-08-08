# Supabase Tracking Decision

## Finding
There is a known discrepancy in the tracking implementation (codebase vs production execution).

## Decision
Tracking code remains AS-IS for Wave 6R4.

## Rationale
Wait for GSC indexing resolution before changing client-side analytics loading patterns, to isolate SEO variables and guarantee that any crawl changes are due to the structural/content updates and not client-side script interference.
