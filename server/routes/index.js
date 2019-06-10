var express = require("express");
var router = express.Router();
const {
    getAllCategory,
    getCategory,
    postCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/category.js");

// GET all categories.
router.get("/", getAllCategory);

// Create Category
router.post("/", postCategory);

// Update Category Name
router.post("/:categoryId/update", updateCategory);

//Opens Category Page.
router.get("/:categoryId", getCategory);

//Deletes Category
router.post("/:categoryId", deleteCategory);

module.exports = router;
