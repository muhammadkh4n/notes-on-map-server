const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (userId) => {
  return jwt.sign(
    userId,
    config.secret,
    {
      expiresIn: "7d"
    }
  );
};