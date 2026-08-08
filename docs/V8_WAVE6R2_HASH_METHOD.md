# Hash Normalization and Generation Methodology (v1)

## Proof Schema Version: 2
## Algorithm: SHA-256

To ensure deterministic delivery proofs and Googlebot parity, all hashed entities pass through the following normalization pipeline before SHA-256 hashing.

### 1. Raw HTML Hashing
- **Input:** The uncompressed UTF-8 encoded text of the raw server response body.
- **Normalization Strategy (v1):** The document string is stripped of leading and trailing whitespace using a standard `.trim()` function. Line endings are preserved exactly as served to eliminate deployment OS carriage-return drift.
- **Computation:** The resulting buffer is processed through Node's `crypto.createHash('sha256')`.

### 2. Rendered Text Hashing
- **Input:** The fully hydrated document state captured after script execution and network idleness.
- **Execution Engine:** Playwright/Puppeteer (Headless Chrome) without sandbox constraints.
- **Extraction:** The `document.body.innerText` attribute is extracted to capture only visually rendered and semantically accessible text.
- **Normalization Strategy (v1):** All continuous whitespace blocks (including line breaks, tabs, and spaces) are replaced with a single space `\s+ -> ' '`. The resulting string is then trimmed. This completely decouples the hash from formatting, layout shifts, or whitespace changes, providing a pure cryptographic signature of the visible business truth.
- **Computation:** The resulting normalized string is processed through `crypto.createHash('sha256')`.

### 3. Verification Protocol
The deployment pipeline requires independent verification. The generator creates the `.well-known/animaparty-delivery-proof.json` file. A secondary process must be capable of independently fetching the live URLs, applying the exact same normalization functions, and generating identical 64-character SHA-256 hex strings.
