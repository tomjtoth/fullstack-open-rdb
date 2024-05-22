const errorHandler = (error, _req, res, next) => {
  console.error(error.message);

  if (["invalid blog", "invalid user"].includes(error.name)) {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = { errorHandler };
