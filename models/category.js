const { DataTypes } = require("sequelize");
const db = require("../database/connection");

const Category = db.define(
  "category",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = Category;
