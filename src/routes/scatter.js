'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/scatterController');

// POST /scatter
router.post('/', controller.handleScatterGather);

// Also allow GET for quick testing
router.get('/', controller.handleScatterGather);

module.exports = router;
