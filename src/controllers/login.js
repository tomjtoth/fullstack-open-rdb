const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../utils/config");
const User = require("../models/user");

router.post("/", async ({ body: { username, password } }, res) => {
  const user = await User.findOne({
    where: { username },
  });

  const passwordCorrect = password === "salainen";

  if (!user || !passwordCorrect) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
