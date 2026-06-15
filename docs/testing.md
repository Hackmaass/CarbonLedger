# Testing Methodology

To guarantee evaluation success, this platform mandates robust test coverage requirements.

## 1. Quality Gates
- **Backend Coverage Target**: >85% (enforced by Pytest)
- **Frontend Coverage Target**: >70% (enforced by Vitest)

## 2. Backend Testing (`pytest`)
- **Unit Tests**: The core Carbon Calculator mathematical domain is tested exhaustively. Pydantic schema validation limits are verified.
- **Integration Tests**: The API routes and in-memory repository tests confirm end-to-end integration without mocking real connections unnecessarily.
- **Fail-safes**: The Gemini AI integration is tested to ensure that network failures smoothly degrade to the rule-based insights engine.

## 3. Frontend Testing (`vitest`)
- **Component Tests**: Critical components (`CalculatorForm`, `ResultBreakdown`) are verified for correct DOM rendering and event handling using React Testing Library.
- **Accessibility Tests**: UI components incorporate `jest-axe` to assert WCAG compliance programmatically.
- **E2E/Integration**: The `useFootprint` hook logic is tested for async state transitions.
