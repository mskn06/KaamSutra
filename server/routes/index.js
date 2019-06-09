var express = require("express");
var router = express.Router();
const { getCategory, postCategory } = require("../controllers/category.js");

/* GET home page. */
router.get("/", getCategory);

router.post("/", postCategory);

module.exports = router;
