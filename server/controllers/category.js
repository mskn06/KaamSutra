const Category = require("../Models/category.js");

const getCategory = async (_, res) => {
    const category = await Category.find();
    if (category) res.send({ category: category });
};

const postCategory = async (req, res) => {
    // Only ask for category specific details.
    const category = {
        title: req.body.title
    };

    try {
        if (category) {
            const newCategory = new Category(category);
            const savedCategory = await newCategory.save();

            /* NOTE:
               Here only the category is saved. The work that is to be
               added in this category is to be saved by the work api.
             * ===================================================== */

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
