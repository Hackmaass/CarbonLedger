# Evaluation Guide

Welcome to the Carbon Ledger evaluation. This guide provides a direct map to the system's compliance with Code Quality, Security, Efficiency, Testing, and Accessibility standards.

## 1. Code Quality
* **Architecture**: The application follows a strictly layered architecture (Routes -> Domain -> Repository interface). Dependencies point inward, avoiding coupling.
* **Typing & Validation**: The backend uses `Mypy` (strict mode) and `Pydantic` to enforce data bounds at the edge. The frontend uses `TypeScript` (strict).
* **Documentation**: We maintain Architectural Decision Records (`docs/adr`) to document trade-offs and structural choices.

## 2. Security
* **Authentication**: The system utilizes Google Cloud's Application Default Credentials (ADC) to prevent hardcoded secrets.
* **Data Privacy**: Anonymous users generate an unguessable UUID `device_id`. Rate limits (`slowapi`) and IDOR preventions ensure users cannot spam or hijack histories.
* **Threat Model**: A complete assessment is documented in [Threat Model](threat-model.md) and [Security Practices](security.md).

## 3. Testing
* **Test Coverage**: We mandate **>85% coverage for backend** and **>70% for frontend**.
* **Methodology**: Testing spans unit, integration, and UI component tests (via Pytest and Vitest). See [Testing Methodology](testing.md).

## 4. Accessibility (WCAG AA Target)
* **Design Pattern**: Native semantic HTML is prioritized. Complex forms use `aria-labelledby`, `aria-busy`, and `aria-live`.
* **Verification**: `axe-core` assertions are embedded in frontend tests. See [Accessibility Guide](accessibility.md).

## 5. Efficiency & Architecture Decisions
* **AI Auditor**: Automatically extracts insights from receipts/bills using Gemini 2.0 Flash. It is integrated efficiently and fails gracefully.
* **Blockchain Replacement**: Following a cost-benefit analysis (see `docs/adr/0001-reject-web3-blockchain.md`), we use an efficient cryptographic hash strategy ("Carbon Report Verification") to ensure report integrity without the environmental/latency costs of Web3.
