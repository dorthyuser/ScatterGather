Scatter-Gather Node.js migration

This project is a migration of a simple MuleSoft application that used the Scatter-Gather pattern. It exposes an HTTP endpoint that performs parallel requests to configured downstream services and aggregates their responses.

Quick start

1. Install dependencies:
   npm install

2. (Optional) Run local mock backend services for testing:
   npm run mock

3. Start the app:
   npm start

Default endpoints

The app reads target endpoints from the environment variable TARGET_ENDPOINTS as a comma-separated list. If not provided, it will call the local mock endpoints started by the mock server.

Example:

TARGET_ENDPOINTS="http://localhost:3001/service1,http://localhost:3001/service2" npm start

Endpoints

POST /scatter - Accepts a JSON payload and forwards it in parallel to each configured target. Returns an aggregated JSON object with per-target results and overall status.

Design notes

- Uses axios with per-request timeout
- Uses Promise.allSettled to collect successes and failures without failing the entire flow
- Includes a lightweight mock server for local testing
