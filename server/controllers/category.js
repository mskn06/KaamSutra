const Category = require("../models/category.js");

//(GET) All category
const getAllCategory = async (_, res) => {
    const category = await Category.find();
    if (category) res.send({ category: category });
    return "No categories found";
};

//(GET) Read: category
const getCategory = async (req, res) => {
    res.send({ category: await Category.findById(req.params.categoryId) });
};

//(POST) Create: new Category
const postCategory = async (req, res) => {
    // Asks for category specific details.
    const categoryData = {
        title: req.body.title
    };

    try {
        //checks if info is provided
        if (!categoryData.title) throw Error("No Category found!");
        else {
            //checks if the category already exists
            const category = await Category.findOne({
                title: categoryData.title
            });

            if (!category) {
                //creates new category
                const newCategory = new Category(categoryData);
                const savedCategory = await newCategory.save();
                res.status(201).send({ category: savedCategory });
            } else {
                res.send("Category already exists!");
            }
        }
    } catch (err) {
        res.send({ error: err });
    }
};

//(POST) Update: Category Name
const updateCategory = (req, res) => {
    Category.findOne({ _id: req.params.categoryId }, async (err, doc) => {
        if (err && !doc) {
            return res.send(500, { error: err });
        } else {
            doc.title = req.body.title;
            await doc.save();
            return res.status(302).redirect("/" + doc._id);
        }
    });
};

//(POST) Delete: Category
const deleteCategory = (req, res) => {
    Category.findByIdAndDelete({ _id: req.params.categoryId }, (err, doc) => {
        if (err && !doc) return res.status(500).send(err);
        return res.status(200).redirect("/");
    });
};

exports.getAllCategory = getAllCategory;
exports.getCategory = getCategory;
exports.postCategory = postCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
