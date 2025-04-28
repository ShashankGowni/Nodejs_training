const express = require('express');
const { performCalculation } = require('../controllers/resultController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();


const { performCalculation, getAllResults } = require('../controllers/resultController');

// Existing line for calc
router.post('/calc', authenticateToken, performCalculation);

// New route to get all results
router.get('/results', authenticateToken, getAllResults);

// POST route for arithmetic operations (protected)
router.post('/calc', authenticateToken, performCalculation);

module.exports = router;
