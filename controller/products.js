const { request, response } = require("express");
const { Op } = require("sequelize");
const Category = require("../models/category");
const Product = require("../models/product");

/**
 * It takes a page number and a page size and returns an object with the offset and limit for a SQL
 * query
 * @param page - The page number
 * @param size - The number of items to return per page.
 * @returns An object with two properties, offset and limit.
 */
const getPagination = (page, size) => {
  const limit = size ? +size : 8;
  const offset = page ? page * limit : 0;
  return { offset, limit };
};

/**
 * It takes in a data object, a page number, and a limit number, and returns an object with the total
 * number of items, the total number of pages, the current page number, and the products.
 *
 * The data object is the result of a database query. It has a count property and a rows property. The
 * count property is the total number of items in the database. The rows property is an array of
 * objects, each object representing a product.
 *
 * The page number is the page number of the products to be returned. The limit number is the number of
 * products to be returned per page.
 *
 * The function returns an object with the total number of items, the total number of pages, the
 * current page number, and the products.
 *
 * The products are the products to be returned. The products are taken from the rows property of the
 * data object.
 *
 * The products are modified. If a
 * @param data - the data returned from the database
 * @param page - the current page number
 * @param limit - the number of items to be displayed per page
 * @returns An object with the following properties:
 * totalItems: The total number of items in the database.
 * totalPages: The total number of pages based on the limit.
 * currentPage: The current page number.
 * products: The products for the current page.
 */
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: products } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  products.forEach((product) => {
    if (!product.url_image)
      product.url_image = `${process.env.BACKEND_URL}/api/images/no-image.jpg`;
  });

  return { totalItems, totalPages, currentPage, products };
};

/**
 * It gets products from the database, paginates them, and returns them to the client
 * @param [req] - request
 * @param [res] - response
 */
const getProducts = async (req = request, res = response) => {
  try {
    const { page, size, category, search } = req.query;
    const { offset, limit } = getPagination(page, size);
    const condition1 = category ? { category: parseInt(category) } : null;
    const condition2 = search ? { name: { [Op.like]: `%${search}%` } } : null;

    const data = await Product.findAndCountAll({
      where: condition1 || condition2,
      offset,
      limit,
      include: [{ model: Category, as: "categoria" }],
    });

    const response = getPagingData(data, page, limit);

    res.json(response);
  } catch (error) {
    console.error("some error occurred:", error);
    throw new Error(error);
  }
};

module.exports = {
  getProducts,
};
