const { Blog, User } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

const router = require("express").Router();

const blogById = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) return res.status(404).end();

  next();
};

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
  if (body.url === undefined) throw new Error("missing url field");
  if (body.title === undefined) throw new Error("missing title field");
  if (body.likes !== undefined && body.likes < 0)
    throw new Error("negative value for likes");

  const user = await User.findByPk(decodedToken.id);

  const blog = await Blog.create({ ...body, userId: user.id });
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
