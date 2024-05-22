const express = require("express");
require("express-async-errors");
const router = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const app = express();

app.use(express.json());
app.use("/api/blogs", router);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
