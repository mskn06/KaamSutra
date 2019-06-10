var express = require("express");
var router = express.Router();
const {
    getId,
    getCategory,
    postCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/category.js");

// GET all categories.
router.get("/", getCategory);

// Create Category
router.post("/", postCategory);

// Update Category Name
router.post("/:id/update", updateCategory);

//Opens Category Page.
router.get("/:id", getId);

//Deletes Category
router.post("/:id", deleteCategory);

module.exports = router;
