// src/main.js
// Main application file to set up the Express server, define routes, and handle graceful shutdown.

// Import necessary modules: 
const express = require('express');
const logger = require('./logger');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000; // Define the port to listen on, defaulting to 3000

app.use('/', routes); // Use the defined routes for all incoming requests

const server = app.listen(PORT, () => { // Start the server and log that it has started
    logger.info(`[MAIN] Starting`);
});

process.on('SIGTERM', () => { // Handle graceful shutdown on SIGTERM signal
    logger.info('[MAIN] Stopping');
    server.close(() => process.exit(0));
});

process.on('SIGINT', () => { // Handle graceful shutdown on SIGINT signal (e.g., Ctrl+C)
    logger.info('[MAIN] Stopping');
    server.close(() => process.exit(0));
});

module.exports = { app, server };