# Development Standards

Carbon Ledger adheres to rigorous engineering standards. Any PR that fails to meet these standards will be rejected automatically by CI or manually by reviewers.

## 1. Type Safety
- **Backend:** 100% strict typing using `mypy`. No `Any` types are permitted in the domain logic. Pydantic v2 is used at all I/O boundaries.
- **Frontend:** TypeScript must be used strictly. The use of `any` and `unknown` is heavily discouraged. If an API payload is dynamic, use generic types and structural validation before asserting types.

## 2. Naming Conventions
- **Python:** PEP 8 (`snake_case` for variables/functions, `PascalCase` for classes).
- **TypeScript:** `camelCase` for variables/functions, `PascalCase` for React components and interfaces.
- **Directories:** All directories must be lowercase, avoiding spaces. Kebab-case (`-`) is allowed in the frontend (e.g., `test-results`).

## 3. Architecture Boundaries
- **Dependency Inversion:** Routes must not contain business logic. Logic must reside in the domain layer (`carbon/calculator.py`).
- **No External Dependencies in Core:** The calculation engine must never make HTTP calls or database queries. All data required for calculation must be passed explicitly.
- **Graceful AI Degradation:** If Vertex AI or any other AI service fails, the system MUST fallback to a deterministic engine without failing the underlying request.

## 4. Linting and Formatting
- **Backend:** `ruff` is the standard. It replaces `flake8`, `isort`, and `black`. Ensure you run `ruff check` and `ruff format` before committing.
- **Frontend:** `eslint` and `prettier`. Ensure you run `npm run lint` and `npm run format`.

## 5. Security by Default
- No hardcoded secrets. Use Google Cloud ADC.
- Pydantic bounds must exist for all incoming numerical values to prevent integer overflow and denial of service via large computations.
- No PII. System operates entirely on UUIDs generated via `crypto.randomUUID()`.
