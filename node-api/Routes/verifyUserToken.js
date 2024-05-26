const jwt = require("jsonwebtoken");
const secretKey = 'TestAPIPWG';
// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const jwtToken = token.split(" ")[1]; // Extract token from the "Bearer" format

  jwt.verify(jwtToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    console.log(decoded);
    req.user = decoded;

    next();
  });
};

module.exports = verifyToken;
