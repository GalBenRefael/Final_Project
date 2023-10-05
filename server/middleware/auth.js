const jwt = require('jsonwebtoken');
const config = require('config');

const requireAuth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token)
      return res.status(401).send('Access denied. No token provided.');
    const decoded = jwt.verify(token, config.get('jwtKey'));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

const requireAdmin = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.get('jwtKey'));
    if (!decoded.isAdmin) {
      throw new Error('Not an admin');
    }
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};

module.exports = { requireAuth, requireAdmin };
