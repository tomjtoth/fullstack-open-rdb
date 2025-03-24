const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { AuthErr } = require("./AuthErr");
const { Session, User } = require("../models");

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

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    const session = await Session.findByPk(token);

    if (!session) throw new AuthErr("unrecognized token", 403);

    let decoded;
    try {
      console.log(token);
      decoded = jwt.verify(token, SECRET);
    } catch (error) {
      console.log(error);
      await session.destroy();
      throw new AuthErr("invalid token", 401);
    }

    const userFromToken = await User.findByPk(decoded.id);
    if (userFromToken.disabled) {
      await session.destroy();
      throw new AuthErr("your account has been disabled", 403);
    }
    req.userSession = session;
    req.decodedToken = decoded;
  } else throw new AuthErr("missing token", 401);

  next();
};

module.exports = { errorHandler, tokenExtractor };
