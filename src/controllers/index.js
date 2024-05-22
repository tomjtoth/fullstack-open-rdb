const router = require("express").Router();

for (const route of "blogs users".split(" ")) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
