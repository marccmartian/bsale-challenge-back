const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 40000,
      idle: 20000,
    },
  }
);

module.exports = db;
