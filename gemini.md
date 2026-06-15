# Project Context

This document serves as the primary context file for Gemini CLI and project contributors.

When implementing features, prioritize:

1. Code Quality
2. Security
3. Efficiency
4. Testing
5. Accessibility
6. Meaningful Google Service Integration

These categories are considered first-class requirements.

---

# Development Philosophy

Every implementation should be:

* Modular
* Maintainable
* Testable
* Explainable
* Production-minded

Avoid hacky solutions unless explicitly requested.

Prefer reusable architecture over one-off implementations.

---

# Repository Standards

Expected structure:

src/
docs/
tests/

Documentation is not optional.

Whenever a significant feature is implemented:

* Update README
* Update architecture documentation
* Add tests when applicable

---

# Google-First Development

Prefer Google technologies when they provide meaningful value.

Examples:

* Gemini
* Firebase
* Vertex AI
* Google Cloud
* Google Maps
* Google Authentication

When integrating a Google service:

Always document:

* Why it was selected
* How it contributes to the solution
* Where it is used

---

# Evaluation Awareness

Assume the project may be reviewed by judges, engineers, or automated evaluation systems.

Every major capability should be discoverable.

For every important feature:

* Document it
* Demonstrate it
* Test it

Do not rely on reviewers inferring functionality.

Provide clear evidence.

---

# Code Quality Requirements

Prefer:

* Small focused files
* Strong typing
* Separation of concerns
* Reusable utilities
* Clear naming

Avoid:

* Monolithic files
* Duplicated logic
* Hardcoded configuration

---

# Security Requirements

Always:

* Use environment variables
* Validate inputs
* Handle errors gracefully
* Protect sensitive information

Never:

* Commit secrets
* Trust user input
* Expose internal credentials

---

# Efficiency Requirements

Optimize for:

* Fast response times
* Minimal external requests
* Efficient data handling
* Reasonable resource usage

Use caching where appropriate.

---

# Testing Requirements

Critical functionality must be tested.

Focus on:

* Business logic
* Agent workflows
* API routes
* Validation

---

# Accessibility Requirements

Design for:

* Keyboard navigation
* Screen readers
* Responsive layouts
* Semantic interfaces

Accessibility should be considered during implementation rather than after development.

---

# Before Completing Any Task

Verify:

* Feature works
* Code is maintainable
* Documentation is updated
* Security considerations are addressed
* Accessibility considerations are addressed
* Tests exist where appropriate

---

# Final Rule

Do not optimize only for a working demo.

Optimize for a project that is:

* Easy to understand
* Easy to evaluate
* Easy to maintain
* Easy to extend
