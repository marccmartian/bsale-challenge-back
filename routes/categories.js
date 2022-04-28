const { Router } = require("express");
const { getCategories, getCategory } = require("../controller/categories");

const router = new Router();

router.get("/", getCategories);

module.exports = router;
