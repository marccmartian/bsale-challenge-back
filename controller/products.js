const { request, response } = require("express");
const { Op } = require("sequelize");
const Category = require("../models/category");
const Product = require("../models/product");

const getPagination = (page, size) => {
  const limit = size ? +size : 8;
  const offset = page ? page * limit : 0;
  return { offset, limit };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: products } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, totalPages, currentPage, products };
};

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
