const errorHandler = (error, _req, res, next) => {
  console.error(error.message);

  if (error.name === "invalid blog") {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = { errorHandler };
