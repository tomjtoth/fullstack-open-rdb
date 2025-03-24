const router = require("express").Router();

const { JunkTable } = require("../models");
const { tokenExtractor } = require("../utils/middleware");
const { AuthErr } = require("../utils/AuthErr");

class RLError extends Error {
  name = "reading-list error";
}

router.post(
  "/",
  async ({ body: { user_id: userId, blog_id: blogId } }, res) => {
    await JunkTable.create({ userId, blogId });

    res.status(204).end();
  }
);

router.put(
  "/:id",
  tokenExtractor,
  async (
    { body: { read }, params: { id }, decodedToken: { id: userId } },
    res
  ) => {
    if (typeof read !== "boolean")
      throw new RLError("body.read must be of type boolean");

    if (isNaN(Number(id))) throw new RLError("id must be a number");

    const entry = await JunkTable.findByPk(id);
    if (entry.userId !== userId)
      throw new AuthErr("attempted to change someone else's entry status", 403);

    entry.blogRead = read;

    await entry.save();

    res.json(entry);
  }
);

module.exports = router;
