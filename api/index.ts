import app from '../src/app'

// Vercel expects a serverless function handler as the default export.
// Our Express `app` is itself a valid (req, res) handler, so we can just
// re-export it here. Do NOT call app.listen() in this file — Vercel manages
// the HTTP server itself.
export default app
