const { JunkTable } = require("../models");

const router = require("express").Router();

router.post(
  "/",
  async ({ body: { user_id: userId, blog_id: blogId } }, res) => {
    await JunkTable.create({ userId, blogId });

    res.status(204).end();
  }
);

module.exports = router;
