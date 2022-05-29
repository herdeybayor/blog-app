const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/users");
const blogsRouter = require("./controllers/blogs");
const commentsRouter = require("./controllers/comments");

mongoose
  .connect(config.MONGO_URI)
  .then(() => logger.info("Connection to database successful!"))
  .catch((error) =>
    logger.error("Error connecting to database", error.message)
  );

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to blogApp backend" });
});

app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/comments", commentsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
