const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const auth = req.headers['authorization'];
  // console.log("recieved token => ",token);
  
  if (!auth) {
    return res.status(401).json({ message: 'Access denied, no token provided.' });
  }
  const token = auth.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    req.user = decoded;
    // console.log("id => ", decoded)
    next();
  });
};

module.exports = authenticateToken;
