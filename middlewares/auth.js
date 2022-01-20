const jwt = require("jsonwebtoken"),
  { JWT_SECRET_KEY } = process.env;

exports.isAuthenticated = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({ message: "Failed to authenticate token" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({ message: "No token provided. " });
  }
};

exports.isOwner
// search user by id from token (decoded.id)
// search todo from id params
// check if userId in todo equal to user id from token
// if yes, next
// if no, block
