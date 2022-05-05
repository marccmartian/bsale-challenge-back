const { request, response } = require("express");
const Category = require("../models/category");

/**
 * It's a function that takes in a request and response object, and returns a JSON object of all the
 * categories in the database.
 * @param [req] - the request object
 * @param [res] - the response object
 */
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
