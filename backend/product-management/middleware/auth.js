const {expressjwt}  = require('express-jwt');

const authenticateJWT = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

module.exports = authenticateJWT;
