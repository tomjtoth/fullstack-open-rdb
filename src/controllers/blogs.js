const Blog = require("../models/blog.js");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

router.delete("/:id", async ({ params: { id } }, res) => {
  const delBlog = await Blog.findByPk(id);

  if (delBlog) {
    await delBlog.destroy();
    return res.json(delBlog);
  }

  res.status(404).end();
});

module.exports = router;
