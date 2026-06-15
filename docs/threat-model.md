# Threat Model

## Assets
- Carbon footprint calculations and history.
- Uploaded receipt/bill images.

## Threat Agents
- Unauthenticated malicious users (scanners, script kiddies).
- Bots attempting API abuse (DDoS, cost injection).

## Attack Vectors & Mitigations

### 1. Insecure Direct Object Reference (IDOR)
* **Risk**: An attacker enumerates `device_id` values to view or modify someone else's footprint history.
* **Mitigation**: `device_id` must be a high-entropy UUID (UUIDv4). It is validated on the edge. Predictable patterns are rejected.

### 2. API Abuse & Resource Exhaustion (Cost Injection)
* **Risk**: Bots repeatedly call the `/api/calculate` or `/api/audit/extract` endpoints to rack up Vertex AI billing costs.
* **Mitigation**: Strict rate limiting (`slowapi`) tracks usage per IP and device. The AI auditor uses cost-effective Gemini Flash models and implements a 10MB payload cap.

### 3. Cross-Site Scripting (XSS)
* **Risk**: Malicious payloads are injected through user inputs and rendered in the React UI.
* **Mitigation**: Strict Pydantic parsing guarantees that only floats/ints are accepted for metrics. The frontend employs React's default output escaping. A strict Content-Security-Policy (CSP) is active.

### 4. Image Upload Exploits
* **Risk**: Malicious files (e.g. polyglot files) are uploaded via the AI Auditor endpoint.
* **Mitigation**: The API enforces MIME-type checking, size limits (10MB maximum), and parses the bytes strictly. Images are processed in memory and never stored on disk or publicly exposed.
