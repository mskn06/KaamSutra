var express = require("express");
var router = express.Router();
const {
    getId,
    getCategory,
    postCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/category.js");

/* GET home page. */
router.get("/", getCategory);

router.post("/", postCategory);

router.post("/:id/update", updateCategory);

router.get("/:id", getId);
router.post("/:id", deleteCategory);

module.exports = router;
