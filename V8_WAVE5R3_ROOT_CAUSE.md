# Root Cause
EXTERNAL_SEARCH_CACHE_STALE_ONLY

The external crawler retrieved an old cached snapshot. We implemented Cache-Control headers in NGINX and an X-Anima-Deploy header to definitively prove edge parity moving forward. No old PM2, old proxies, or Cloudflare existed on the origin.