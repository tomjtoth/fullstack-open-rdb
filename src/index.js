const express = require("express");
require("express-async-errors");
const routes = require("./controllers");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
const { errorHandler } = require("./utils/middleware");

const app = express();

app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
