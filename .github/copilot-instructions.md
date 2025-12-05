<!-- Copilot instructions for working with the FitnessApplication repo -->
# Copilot / AI Agent Quick Guide

Purpose: give an AI coding agent the precise, actionable context to be productive immediately in this mono-repo containing a simple Express backend and a React frontend.

- **Big picture**: This repo has two primary services:
  - `backend/` — an Express API (node, CommonJS) that serves REST endpoints under `/api/*` and talks to MySQL via a `mysql2` promise pool in `backend/src/config/db.js`.
  - `fitness-frontend/` — a Create React App SPA that calls the backend through `fitness-frontend/src/api/axiosInstance.js` (base URL `http://localhost:5000/api`).

- **Key files to inspect when making changes**:
  - Backend entry: `backend/src/app.js` (routes mounted: `/api/auth`, `/api/plans`, `/api/products`, `/api/orders`, `/api/chat`).
  - DB config: `backend/src/config/db.js` (creates `mysql2` pool and prints env config). Use `db.query(...)` patterns seen in controllers.
  - Auth middleware: `backend/src/middleware/auth.js` (expects `Authorization: Bearer <token>` and uses `JWT_SECRET`).
  - Auth controller: `backend/src/controllers/authController.js` (signup/login flows — demonstrates password hashing + JWT issuance and use of `db.query`).
  - Chat controller: `backend/src/controllers/chatController.js` (calls Google Generative Language API; requires `GOOGLE_API_KEY`).
  - Frontend API: `fitness-frontend/src/api/axiosInstance.js`, plus helpers `fitness-frontend/src/api/auth.js` (stores token in `localStorage`).

- **Architecture & patterns**:
  - Backend uses small controllers + router files (`backend/src/controllers/*` + `backend/src/routes/*`). Controllers directly use `db` (the mysql2 pool) and return JSON responses.
  - Routes are simple Express routers; some routes expect JSON bodies and some expect path params (examples: `GET /api/plans/workout/:userId`, `POST /api/auth/login`).
  - Authentication: JWT signed with `process.env.JWT_SECRET`. Frontend attaches token as `Authorization: Bearer <token>` via axios interceptor (`localStorage.getItem('token')`).
  - DB access is raw SQL through `db.query(...)` (no ORM). Look at `authController.js` for query/insert patterns.

- **Environment variables (from code)**:
  - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` — configured/used in `backend/src/config/db.js`.
  - `JWT_SECRET` — used by `backend/src/middleware/auth.js` and `authController.js`.
  - `GOOGLE_API_KEY` — required by `backend/src/controllers/chatController.js` for the chat endpoint.
  - `PORT` — optional, defaults to `5000` in `backend/src/app.js`.

- **Developer workflows / commands**
  - Start backend (production-like): from `backend/` run: `npm start` (starts `node src/app.js`).
  - Use nodemon for dev: `npx nodemon src/app.js` (nodemon is a devDependency but no script is defined).
  - Start frontend dev server: from `fitness-frontend/` run: `npm start` (CRA dev server).
  - Build frontend: `npm run build` from `fitness-frontend/`.

- **Testing / debugging notes**:
  - Backend prints DB config on load — good to inspect when `.env` issues arise.
  - Controllers have explicit console.log traces (e.g., login/signup). Reuse or extend these for debugging.
  - When touching auth, ensure frontend stores and forwards token (`localStorage`) — see `fitness-frontend/src/api/auth.js` and `axiosInstance.js`.

- **Integration points / external services**:
  - MySQL database — initialization helper: `backend/setupDB.js` and `backend/setup.sql` are the starting points.
  - Google Generative Language API — used by chat controller; calls `https://generativelanguage.googleapis.com/...` and needs `GOOGLE_API_KEY`.
  - No external queue or microservice bus is present.

- **Project-specific conventions** (do not invent new patterns without PR discussion):
  - Keep server code in CommonJS style (require/module.exports). Follow the controller → route pattern.
  - DB access uses `db.query(sql, params)` where results are often destructured like `[rows] = await db.query(...)`.
  - Frontend uses `axiosInstance` for all API calls; attach token via `Authorization` header.

- **Examples to copy/imitate**
  - Auth flow (backend): see `backend/src/controllers/authController.js` for salt rounds, `jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '7d' })`.
  - Frontend login (client): `fitness-frontend/src/api/auth.js` — stores `token` and `user` in `localStorage`.
  - Chat endpoint (server): `POST /api/chat` expects `{ message, context? }` and proxies to Google API.

If anything above is unclear or you want the doc to emphasize other areas (tests, CI, or adding a nodemon script), tell me which sections to expand or correct and I'll iterate. 
