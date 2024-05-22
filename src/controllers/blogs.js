const { Blog } = require("../models");

const router = require("express").Router();

const blogById = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) return res.status(404).end();

  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async ({ body }, res) => {
  if (body.url === undefined) throw new Error("missing url field");
  if (body.title === undefined) throw new Error("missing title field");
  if (body.likes !== undefined && body.likes < 0)
    throw new Error("negative value for likes");

  const blog = await Blog.create(body);
  res.json(blog);
});

router.delete("/:id", blogById, async ({ blog }, res) => {
  await blog.destroy();
  res.status(204).end();
});

router.put("/:id", blogById, async ({ blog, body: { likes } }, res) => {
  if (likes === undefined) throw new Error("missing likes field");
  if (likes < 0) throw new Error("negative value for likes");

  blog.likes = likes;
  await blog.save();

  res.json(blog);
});

module.exports = router;
