# Accessibility Standard

The Carbon Platform aims to be inclusive and guarantees a **WCAG AA** compliance standard. Accessibility is considered during implementation rather than as an afterthought.

## 1. Automated Testing
Every UI component test incorporates `jest-axe` assertions to catch standard a11y violations during development.

## 2. Keyboard Navigation
- Every interactable element can be reached via `Tab`.
- A `<a className="skip-link" href="#main">` link is provided to bypass the header.

## 3. Screen Reader Support
- **Forms**: The `NumberField` component ensures inputs are strictly associated with `<label>` tags. `aria-labelledby` binds grouped elements.
- **State Updates**: `aria-live="assertive"` regions handle async errors. `aria-busy` is utilized during load states to inform assistive tech.
- **Semantic HTML**: We use `<main>`, `<header>`, `<fieldset>`, and `<legend>` tags to establish the DOM hierarchy clearly.
