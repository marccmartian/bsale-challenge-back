const { Router } = require("express");
const { getProducts, getProduct } = require("../controller/products");

const router = Router();

router.get("/", getProducts);

module.exports = router;
