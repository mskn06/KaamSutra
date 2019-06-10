const Work = require("../models/work.js");
const Category = require("../models/category.js");

//(GET) Read: a work
const getWork = async (req, res) => {
    const work = await Work.findById(req.params.workId);
    if (work) res.status(200).send({ work: work });
    return "Work not found!";
};

//(GET) Read: All work corresponding to a category
const getWorks = async (req, res) => {
    const works = [];

    //finds the reqd category
    try {
        const category = await Category.findById(req.params.categoryId);
        if (category) res.status(200).send({ works: category.works });
    } catch (err) {
        res.send("No work found!" + err);
    }
};

// (POST) Create: work
const postWork = async (req, res) => {
    const work = {
        title: req.body.title,
        description: req.body.description
    };

    try {
        const category = await Category.findById(req.params.categoryId);

        if (category != null) {
            if (work) {
                const newWork = new Work(work);
                const savedWork = await newWork.save();

                // Adding this new work node to the category's work list and saving it.
                category.works.push(savedWork);
                category.save();

                res.status(302).redirect(
                    "/" + req.params.categoryId + "/works/" + savedWork._id
                );
            } else {
                res.send("Work not added!");
            }
        }
        res.send("Invalid Category Id!");
    } catch (err) {
        return err;
    }
};

//(POST) Update: update entries of the work
const updateWork = async (req, res) => {
    const categoryId = req.params.categoryId;
    const workId = req.params.workId;

    const title = req.body.title;
    const description = req.body.description;

    try {
        if (!title && !description) res.send("No New field added!");

        if (title) {
            Work.findOne({ _id: workId }, async (err, doc) => {
                if (!err && doc) {
                    doc.title = title;
                    await doc.save();
                }
            });
        }

        if (description) {
            Work.findOne({ _id: workId }, async (err, doc) => {
                if (!err && doc) {
                    doc.description = description;
                    await doc.save();
                }
            });
        }
        res.status(200).redirect("/" + categoryId + "/works/" + workId);
    } catch (err) {
        res.send("Error in updating data");
    }
};

//(POST) Delete: work
const deleteWork = (req, res) => {
    const categoryId = req.params.categoryId;
    const workId = req.body.workId;

    try {
        Work.findByIdAndDelete(workId, (err, work) => {
            if (!err) res.status(200).redirect("/" + categoryId + "/works");
        });
    } catch (err) {
        res.send("Couldn't delete Work");
    }
};

exports.getWork = getWork;
exports.getWorks = getWorks;
exports.postWork = postWork;
exports.updateWork = updateWork;
exports.deleteWork = deleteWork;
