const router = require("express").Router();
const { Blog, User } = require("../models");

router.get("/", async (_req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
});

router.get("/:id", async ({ params: { id } }, res) => {
  const user = await User.findByPk(id, {
    attributes: {
      include: ["name", "username"],
    },
    include: {
      model: Blog,
    },
  });

  if (!user) return res.status(404).end();

  res.json(user);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.put(
  "/:username",
  async ({ body: { name }, params: { username } }, res) => {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).end();

    if (name === undefined)
      throw new Error("new name must be provided for the user");

    user.name = name;
    await user.save();
    res.json(user);
  }
);

module.exports = router;
