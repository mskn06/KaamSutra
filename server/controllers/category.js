const Category = require("../models/category.js");

const getCategory = async (_, res) => {
    const category = await Category.find();
    if (category) res.send({ category: category });
};

const postCategory = async (req, res) => {
    const category = {
        title: req.body.title,
        works: req.body.works
    };
    try {
        if (category) {
            const newCategory = new Category(category);
            const savedCategory = await newCategory.save();
            res.send(
                "Category added!" + newCategory + savedCategory + req.body
            );
        } else {
            res.send("Category not added!");
        }
    } catch (err) {
        console.log(err);
    }
};

exports.getCategory = getCategory;
exports.postCategory = postCategory;
