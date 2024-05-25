const express = require("express");
require("express-async-errors");
const router = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const readingListsRouter = require("./controllers/readingLists");
const authorsRouter = require("./controllers/authors");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const app = express();

app.use(express.json());
app.use("/api/blogs", router);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readingListsRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
