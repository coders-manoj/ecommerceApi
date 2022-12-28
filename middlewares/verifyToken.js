const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.Authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("you are not authenticated");
  }
};

module.exports = verifyToken;
