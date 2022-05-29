const logger = require("./logger");

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.info(error);

  if (error.name === "ValidationError") {
    res.status(500).json({ error: error.message });
  } else if (error.name === "MongoServerError") {
    res.status(500).json({ error: error.message });
  } else if (error.name === "CastError") {
    res.status(500).json({ error: error.message });
  } else if (error.name === "SyntaxError") {
    res.status(500).json({ error: error.message });
  } else if (error.name === "ReferenceError") {
    res.status(500).json({ error: error.message });
  }
  next(error);
};

module.exports = { unknownEndpoint, errorHandler };
