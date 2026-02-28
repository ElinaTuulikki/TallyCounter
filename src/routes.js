// src/routes.js
// Routes module to define the API endpoints for the counter operations (increase, read, reset).

// Import necessary modules: 
const express = require('express');
const router = express.Router();
const logger = require('./logger');
const counter = require('./counter');

router.get('/counter-increase', (req, res) => { // Log the endpoint call and increase the counter, then return the new count value as JSON
    logger.info("[ENDPOINT] GET '/counter-increase'");
    const value = counter.increase();
    res.json({ count: value });
});

router.get('/counter-read', (req, res) => { // Log the endpoint call and read the current counter value, then return it as JSON
    logger.info("[ENDPOINT] GET '/counter-read'");
    const value = counter.read();
    res.json({ count: value });
});

router.get('/counter-reset', (req, res) => { // Log the endpoint call and reset the counter, then return the reset count value as JSON
    logger.info("[ENDPOINT] GET '/counter-reset'");
    const value = counter.reset();
    res.json({ count: value });
});

module.exports = router;