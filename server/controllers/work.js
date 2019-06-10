const Work = require("../models/work.js");
const Category = require("../models/category.js");

//(GET) ALL WORK CORRESPONDING TO A CATEGORY
const getWork = async (_, res) => {
    const categoryId = req.body.category;
    // const workId = req.body.work;

    const works = await Work.findById(categoryId.workId);
    if (works) res.send({ works: works });
};

// (POST) NEW WORK
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

            res.redirect("/work/" + savedWork.id);
        } else {
            res.send("Work not added!");
        }
    } catch (err) {
        console.log(err);
    }
};

exports.postWork = postWork;
