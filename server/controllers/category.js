const Category = require("../Models/category.js");

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
    const category = {
        title: req.body.title
    };

    try {
        //checks if info is provided
        if (!category) throw Error("No Category found!");
        else {
            //checks if the category already exists
            Category.findOne({ title: category.title }, async (err, doc) => {
                if (err || !doc) {
                    //creates new category
                    const newCategory = new Category(category);
                    const savedCategory = await newCategory.save();
                    res.redirect("/" + savedCategory.id);
                } else {
                    throw Error("Category already exists!");
                }
            });
        }
    } catch (err) {
        console.log(err);
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
        return res.status(200).send("Category Deleted Successfully!");
    });
};

exports.getAllCategory = getAllCategory;
exports.getCategory = getCategory;
exports.postCategory = postCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
