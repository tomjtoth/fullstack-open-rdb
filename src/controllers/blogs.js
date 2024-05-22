const { Blog } = require("../models");

const router = require("express").Router();

const blogById = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
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
  if (blog) {
    await blog.destroy();
    return res.status(204).end();
  }

  res.status(404).end();
});

module.exports = router;
