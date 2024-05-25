const router = require("express").Router();

for (const route of "blogs users login authors readingLists".split(" ")) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
