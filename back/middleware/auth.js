const jwt = require('jsonwebtoken');
const fs = require('fs');

// Get a public key
const publicKey = fs.readFileSync('jwt/jwtRS256Pub.key', 'utf8');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  // If No Token
  if (!token) {
    return res.status(401).json({ message: 'No token authorization denied' });
  }

  // Verify Token
  try {
    jwt.verify(token, publicKey, function (err, decoded) {
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Token Invalid' });
  }
};
