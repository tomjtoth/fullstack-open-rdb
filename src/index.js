const express = require("express");
require("express-async-errors");
const router = require("./controllers/blogs");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
const { errorHandler } = require("./utils/middleware");

const app = express();

app.use(express.json());
app.use("/api/blogs", router);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
