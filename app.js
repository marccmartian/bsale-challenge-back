require("dotenv").config();
require("./models/associations");

const Server = require("./models/server");

const server = new Server();

server.listen();
