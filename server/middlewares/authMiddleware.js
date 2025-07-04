/**
 * Authentication middleware to verify JWT token from Authorization header.
 * Adds userId to request body if token is valid.
 */
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const verifiedToken = jwt.verify(token, "scaler_movies");

    req.body.userId = verifiedToken.userId;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: "Token Invalid" });
  }
};
