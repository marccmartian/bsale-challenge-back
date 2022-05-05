const express = require("express");
const cors = require("cors");
const db = require("../database/connection");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      products: "/api/products",
      categories: "/api/categories",
      images: "/api/images",
    };
    this.dbConnection();
    this.middleswares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      throw new Error(error);
    }
  }

  middleswares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.categories, require("../routes/categories"));
    this.app.use(this.paths.images, require("../routes/images"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`server running in port ${this.port}`);
    });
  }
}

module.exports = Server;
