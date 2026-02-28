# Task 2 — Tally Counter REST API

A REST API built with Node.js and Express that exposes an in-memory tally counter over HTTP. All endpoint and counter events are logged using Winston.

## Project Structure

```
.
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── rest.http
└── src
    ├── logger.js
    ├── main.js
    ├── counter.js
    └── routes.js
└── test
    └── counter.test.js
```

## Prerequisites

- Node.js 18+

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the server

```bash
npm start
```

The server starts on port `3000` by default. Override with the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## API Endpoints

| Method | Endpoint | Description | Response |
|---|---|---|---|
| GET | `/counter-read` | Returns the current count | `{ "count": 0 }` |
| GET | `/counter-increase` | Increases count by one | `{ "count": 1 }` |
| GET | `/counter-reset` | Resets count to zero | `{ "count": 0 }` |

### Example using curl

```bash
curl http://localhost:3000/counter-read
curl http://localhost:3000/counter-increase
curl http://localhost:3000/counter-reset
```

### Using rest.http (VS Code REST Client)

Install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension in VS Code, open `rest.http`, and click **Send Request** above each endpoint.

## Logging

Logs are written to three destinations:

| Destination | Level | Description |
|---|---|---|
| Console | all | Prints all log levels to stdout |
| `logs/error.log` | error | Error level logs only |
| `logs/combined.log` | all | All log levels |

### Log format

Log entries are JSON with a timestamp:

```json
{"level":"info","message":"[MAIN] Starting","timestamp":"2026-02-28T00:00:00.000Z"}
```

### Log message examples

```
[MAIN] Starting
[MAIN] Stopping
[ENDPOINT] GET '/counter-read'
[ENDPOINT] GET '/counter-increase'
[ENDPOINT] GET '/counter-reset'
[COUNTER] read 0
[COUNTER] increase 1
[COUNTER] zeroed 0
```

## Testing

Run the automated Mocha test suite:

```bash
npm test
```

Tests run on port `3001` to avoid conflicting with the running application. The test suite covers:

- All three endpoints return HTTP 200
- `/counter-read` returns the current count as a number
- `/counter-increase` increments the count correctly across multiple calls
- `/counter-reset` resets the count to zero, verified by a subsequent read
- Counter state is consistent across different endpoints

## Dependencies

| Package | Version |
|---|---|
| express | 4.18.2 |
| winston | 3.11.0 |

### Dev Dependencies

| Package | Version |
|---|---|
| mocha | ^10.3.0 |
