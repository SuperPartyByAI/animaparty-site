# Hash Normalization Methodology (Wave6R3)

Proof Schema Version: 2
Algorithm: SHA-256

- **Raw HTML Hashing:** The document string is stripped of leading and trailing whitespace using `.trim()`. Output fed to `crypto.createHash('sha256')`.
- **Rendered Text Hashing:** Executed via headless Playwright instance. Extracts `document.body.innerText`. Whitespace collapsed (`\s+ -> ' '`) and trimmed.
- **Verification Protocol:** The independent verifier fetches public URLs autonomously and calculates the hash to confirm exact parity with `animaparty-delivery-proof.json`.
