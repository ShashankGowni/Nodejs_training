const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, '1234', (err, user) => {
    if (err) return res.sendStatus(403); // Token invalid, forbidden
    req.user = user;
    next(); //  next middleware/route
  });
}

module.exports = { authenticateToken };
