require("dotenv").config();

const router = require("./controllers/blogs.js");
const express = require("express");

const app = express();

app.use(express.json());
app.use("/api/blogs", router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
