const { Blog, User } = require("../models");
const { AuthErr } = require("../utils/AuthErr");
const { tokenExtractor } = require("../utils/middleware");
const router = require("express").Router();

const blogById = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) return res.status(404).end();

  next();
};

class BlogError extends Error {
  name = "invalid blog";
}

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async ({ body, decodedToken }, res) => {
  if (body.title === undefined) throw new BlogError("missing title field");
  if (body.url === undefined) throw new BlogError("missing url field");
  if (body.likes !== undefined && body.likes < 0)
    throw new BlogError("negative value for likes");

  const user = await User.findByPk(decodedToken.id);

  const blog = await Blog.create({ ...body, userId: user.id });
  res.json(blog);
});

router.delete(
  "/:id",
  tokenExtractor,
  blogById,
  async ({ blog, decodedToken }, res) => {
    if (decodedToken.id !== blog.userId)
      throw new AuthErr("only allowed to delete own blogs", 403);

    await blog.destroy();
    res.status(204).end();
  }
);

router.put("/:id", blogById, async ({ blog, body: { likes } }, res) => {
  if (likes === undefined) throw new BlogError("missing likes field");
  if (likes < 0) throw new BlogError("negative value for likes");

  blog.likes = likes;
  await blog.save();

  res.json(blog);
});

module.exports = router;
