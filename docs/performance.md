# Performance Optimization Strategy

Carbon Ledger is built to deliver instant feedback while operating within a minimal infrastructure footprint.

## 1. Zero-Framework CSS
We eschewed heavy utility frameworks (like Tailwind) and component libraries (like Material UI) in favor of a lightweight, token-based Vanilla CSS approach (`index.css`). This keeps the initial CSS bundle size incredibly small and ensures lightning-fast layout parsing.

## 2. Single Origin Delivery
By utilizing FastAPI's `StaticFiles` in production, we serve the compiled React SPA directly from the backend container.
- **CORS Preflight Elimination:** Because the frontend and backend share an origin, the browser never sends `OPTIONS` preflight requests, effectively halving the network latency on API calls.

## 3. State Management
React Context (`FootprintContext`) is used sparingly and efficiently. We avoid global state bloat by managing domain-specific state strictly within parent components and utilizing React Router for discrete views.

## 4. Fast Python Operations
- Use of `@lru_cache` for configuration loading to prevent expensive disk I/O on every request.
- Pydantic v2 core is written in Rust, providing up to a 50x speedup in schema validation compared to Pydantic v1.
- Synchronous routes are preferred where async provides no benefit (e.g., pure CPU-bound mathematical operations).

## 5. AI Call Structure
Prompts are engineered to return strict JSON using `response_mime_type="application/json"`. This prevents token bloat and completely removes the need for expensive post-generation Regex processing to extract metrics.
