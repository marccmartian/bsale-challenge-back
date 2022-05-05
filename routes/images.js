const { Router } = require("express");
const { displayImage } = require("../controller/images");

const router = Router();

router.get("/:img", displayImage);

module.exports = router;
