# Security Practices

Our approach to security prioritizes defense-in-depth and simplicity.

## Authentication & Authorization
- **No Secrets**: We strictly use Application Default Credentials (ADC) via Google Cloud.
- **Anonymous Sessions**: Users are identified by a client-generated UUID (`device_id`). This value acts as an authorization token.

## API Hardening
- **Rate Limiting**: `slowapi` prevents brute-force abuse and DoS attacks.
- **Data Validation**: `Pydantic` models reject bounds violations (e.g. negative energy usage) immediately.
- **Security Headers**: Content-Security-Policy (CSP) and standard restrictive headers (`X-Frame-Options`, `X-Content-Type-Options`) prevent XSS and Clickjacking.

## Data Storage
- **Firestore Integrity**: The Firestore integration securely stores the footprints.
- **Immutable Verification**: Cryptographic hashing (SHA-256) ensures the footprint data has not been tampered with after generation.
