const router = require("express").Router();

const { User } = require("../models");

class UserError extends Error {
  name = "invalid user";
}

router.get("/", async (_req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  const alreadyExists = await User.findOne({
    where: { username: req.body.username },
  });
  if (alreadyExists) throw new UserError("that username is already taken");

  const user = await User.create(req.body);
  res.json(user);
});

router.put(
  "/:username",
  async ({ body: { name }, params: { username } }, res) => {
    if (name === undefined) throw new UserError("missing 'name' field");

    const user = await User.findOne({ where: { username } });
    if (!user)
      return res
        .status(404)
        .json({ error: `username: "${username}" does not exist` });

    user.name = name;
    await user.save();
    res.json(user);
  }
);

module.exports = router;
