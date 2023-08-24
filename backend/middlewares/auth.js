require("dotenv").config();

const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res) => res.status(401).send({ message: "Autorização necessária" });

const handleForbiddenError = (res) => res.status(403).send({ message: "Acesso proibido" });

const extractBearerToken = (header) => header.replace("Bearer ", "");

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
    );
  } catch (err) {
    return handleForbiddenError(res);
  }

  req.user = payload;

  return next();
};
