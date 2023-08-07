const jwt = require("jsonwebtoken");

const handleAuthError = (res) => {
  res.status(401).send({ message: "Autorização necessária" });
};

const handleForbiddenError = (res) => {
  res.status(403).send({ message: "Acesso proibido" });
};

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, "super-strong-secret");
  } catch (err) {
    return handleForbiddenError(res);
  }

  req.user = payload;

  next();
};
