// src/logger.js
// Logger module using Winston to log messages to the console and files.

// Import the necessary components from the Winston library to create a logger with specific transports and formats
const { createLogger, transports, format } = require('winston');

const logger = createLogger({ // Configure the logger with a default log level, format, and transports
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

module.exports = logger;