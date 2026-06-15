# ADR 0001: Rejection of Web3 Blockchain for Carbon Report Integrity

## Status
Accepted

## Context
The project requires a verifiable way to ensure carbon footprints and reports maintain their integrity over time. A common pattern in climate tech is to publish reports on a Web3 blockchain. We evaluated this pattern.

## Decision
We **reject** a full Web3 smart-contract (e.g., Ethereum/Polygon) implementation.

Instead, we have implemented **Cryptographic Carbon Report Verification**:
1. Generating a deterministic SHA-256 hash of the payload inputs and carbon results.
2. Persisting this hash efficiently on our servers.
3. Permitting clients to mathematically verify the hash without a decentralized ledger.

## Consequences
* **Positive**: 
  - Zero latency added to the user experience.
  - No gas fees or complicated Web3 infrastructure.
  - The ecological footprint of the tracking application itself remains neutral (running a Web3 node would contradict our mission).
* **Negative**:
  - We lack the marketing buzzword "Blockchain."
  - Verification is centralized rather than globally decentralized.
