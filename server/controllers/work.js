const Work = require("../models/work.js");
const Category = require("../models/category.js");

const postWork = async (req, res) => {
    const work = {
        title: req.body.title
    };

    const categoryId = req.body.category;

    try {
        const category = await Category.findById(categoryId);

        if (!category) throw Error("Invalid Category Id!");

        if (work) {
            const newWork = new Work(work);
            const savedWork = await newWork.save();

            // Adding this new work node to the category's work list and saving it.
            category.works.push(savedWork);
            await category.save();

            res.send("Work added!");
        } else {
            res.send("Work not added!");
        }
    } catch (err) {
        console.log(err);
    }
};

exports.postWork = postWork;
