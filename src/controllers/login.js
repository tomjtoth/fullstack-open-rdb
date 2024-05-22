const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../utils/config");
const { AuthErr } = require("../utils/AuthErr");
const User = require("../models/user");

router.post("/", async ({ body: { username, password } }, res) => {
  if (!username) throw new AuthErr("missing username", 400);
  if (!password) throw new AuthErr("missing password", 400);

  const user = await User.findOne({
    where: { username },
  });

  const passwordCorrect = password === "salainen";

  if (!user || !passwordCorrect)
    throw new AuthErr("invalid username or password!");

  const userForToken = {
    username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
