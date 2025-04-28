const express = require('express');
const { signUp, login } = require('../controllers/userController');
const router = express.Router();

// POST route for user signup
router.post('/register', signUp);

// POST route for user login
router.post('/login', login);

module.exports = router;
