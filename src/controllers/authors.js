const {
  sequelize: { fn, col },
} = require("../utils/db");
const { Blog } = require("../models");

const router = require("express").Router();

router.get("/", async (_req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [fn("COUNT", col("likes")), "blogs"],
      [fn("SUM", col("likes")), "likes"],
    ],
    group: ["author"],
    order: [["likes", "DESC"]],
  });

  res.json(authors);
});

module.exports = router;
