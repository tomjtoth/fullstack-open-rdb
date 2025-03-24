const router = require("express").Router();

const { tokenExtractor } = require("../utils/middleware");

router.delete("/", tokenExtractor, async ({ userSession }, res) => {
  await userSession.destroy();

  res.status(204).end();
});

module.exports = router;
