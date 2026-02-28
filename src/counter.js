// src/counter.js
// Counter module to manage the count state and provide methods to read, increase, and reset the count.

// Import the logger to log actions performed on the counter
const logger = require('./logger');

let count = 0; // Initialize count to 0

const counter = {
    read() { // Log the current count value when read
        logger.info(`[COUNTER] read ${count}`); //
        return count;
    },

    increase() { // Increment the count and log the new value
        count += 1;
        logger.info(`[COUNTER] increase ${count}`);
        return count;
    },

    reset() { // Reset the count to 0 and log the reset action
        count = 0;
        logger.info(`[COUNTER] zeroed ${count}`);
        return count;
    }
};

module.exports = counter;