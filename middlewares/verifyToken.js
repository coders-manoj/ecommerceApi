const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({ message: "Token is not valid" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "you are not authenticated" });
  }
};

module.exports = verifyToken;
