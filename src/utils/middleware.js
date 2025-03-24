const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { AuthErr } = require("./AuthErr");

const errorHandler = (error, _req, res, next) => {
  console.error(error.message);

  switch (error.name) {
    case ("invalid blog",
    "invalid user",
    "SequelizeValidationError",
    "reading-list error"):
      return res.status(400).send({ error: error.message });

    case "auth error":
      return res.status(error.returnCode).send({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      throw new AuthErr("invalid token", 401);
    }
  } else throw new AuthErr("missing token", 401);

  next();
};

module.exports = { errorHandler, tokenExtractor };
