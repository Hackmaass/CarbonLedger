# ADR 0002: Single Container Deployment for API and Frontend

**Date:** 2026-06-15  
**Status:** Accepted  

## Context
Deploying a modern web application typically involves hosting the frontend SPA on a CDN (e.g., Vercel, Netlify) and the backend API on a serverless container platform (e.g., Cloud Run). This introduces cross-origin (CORS) complexity, potential deployment desynchronization, and higher operational overhead for small teams.

## Decision
We will package and deploy Carbon Ledger as a **Single Container Deployment** via Google Cloud Run. The React SPA will be statically built during the Docker image creation process and served directly by the FastAPI backend using `StaticFiles`.

## Rationale
1. **Zero CORS Overhead:** By serving the SPA from the exact same origin (`/`) as the API (`/api/*`), browser CORS preflight requests (`OPTIONS`) are entirely eliminated, improving perceived latency.
2. **Atomic Deployments:** Frontend UI and backend API schema changes are guaranteed to deploy synchronously, eliminating version mismatch bugs.
3. **Simplicity:** A single `Dockerfile` and a single Cloud Run service reduces infrastructure complexity and cognitive load.
4. **Performance:** Cloud Run is capable of serving static assets efficiently enough for our scale, and it simplifies our CI/CD pipeline.

## Consequences
- **Positive:** Simpler deployment story, faster API requests (no CORS), deterministic versioning.
- **Negative:** We cannot leverage global CDN edge caching for the React assets as easily as we could with Vercel or Cloudflare.

## Mitigation
- We configure strict `Cache-Control` headers for static assets (`/assets/*`) in FastAPI so the user's browser caches the compiled JS/CSS heavily, mitigating the lack of a CDN.
