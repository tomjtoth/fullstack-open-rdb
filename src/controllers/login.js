const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../utils/config");
const { AuthErr } = require("../utils/AuthErr");
const User = require("../models/user");
const { Session } = require("../models");

router.post("/", async ({ body: { username, password } }, res) => {
  if (!username) throw new AuthErr("missing username", 400);
  if (!password) throw new AuthErr("missing password", 400);

  const user = await User.findOne({
    where: { username },
  });

  const passwordCorrect = password === "salainen";

  if (!user || !passwordCorrect)
    throw new AuthErr("invalid username or password!");

  if (user.disabled) throw new AuthErr("your account has been disabled", 403);

  const userForToken = {
    username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  await Session.create({ token });

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
