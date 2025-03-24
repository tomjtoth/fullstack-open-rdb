const router = require("express").Router();

for (const route of "blogs users authors readingLists login logout".split(
  " "
)) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
