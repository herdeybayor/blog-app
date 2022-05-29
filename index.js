require("dotenv").config();
const http = require("http");
const app = require("./app");
const logger = require("./utils/logger");
const config = require("./utils/config");

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  logger.info(
    `Server running on port ${config.PORT}\nVisit http://localhost:${config.PORT}`
  );
});
