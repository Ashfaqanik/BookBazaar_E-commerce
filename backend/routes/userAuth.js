const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Token expired. Please sign in again." });
    }
    req.user = user;
    next();
  });
};
module.exports = { authenticateToken };