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

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/:id", blogById, async ({ blog }, res) => {
  await blog.destroy();
  res.status(204).end();
});

router.put("/:id", blogById, async ({ blog, body: { likes } }, res) => {
  blog.likes = likes;
  await blog.save();

  res.json(blog);
});

module.exports = router;
