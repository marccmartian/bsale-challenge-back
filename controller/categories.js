const { request, response } = require("express");
const Category = require("../models/category");

const getCategories = async (req = request, res = response) => {
  try {
    const categories = await Category.findAll();

    res.json(categories);
  } catch (error) {
    console.error("some error occurred:", error);
    throw new Error(error);
  }
};

module.exports = {
  getCategories,
};
