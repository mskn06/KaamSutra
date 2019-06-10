const Work = require("../models/work.js");
const Category = require("../models/category.js");

//(GET) Read: a work
const getWork = async (req, res) => {
    if (work) res.send({ work: await Work.findById(req.body.workId) });
    return "Work not found!";
};

//(GET) Read: All work corresponding to a category
const getWorks = async (_, res) => {
    //finds the reqd category
    const category = await Category.findById(req.params.categoryId);

    const works = [];
    try {
        //locates each work in the given category
        category.works.forEach(workId => {
            Work.findById(workId, (err, work) => {
                if (err || !work) {
                    throw Error("Invalid category!");
                } else {
                    works.push(work);
                }
            });
        });

        //send the works array to display
        res.status(200).send({ works: works });
    } catch (err) {
        return err;
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

        if (!category) throw Error("Invalid Category Id!");

        if (work) {
            const newWork = new Work(work);
            const savedWork = await newWork.save();

            // Adding this new work node to the category's work list and saving it.
            category.works.push(savedWork);
            await Category.save();

            res.redirect("/works/" + savedWork.id);
        } else {
            throw Error("Work not added!");
        }
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
        if (!title && !description) throw Error("No New field added!");

        if (title)
            Work.findOne({ _id: workId }, async (err, doc) => {
                if (!err && doc) {
                    doc.title = title;
                    await doc.save();
                } else throw Error("Title not updated.");
            });

        if (description)
            Work.findOne({ _id: workId }, async (err, doc) => {
                if (!err && doc) {
                    doc.description = description;
                    await doc.save();
                    res.status(200).redirect(
                        "/" + categoryId + "/works/" + workId
                    );
                } else throw Error("Description not updated.");
            });
    } catch (err) {
        return err;
    }
};

//(POST) Delete: work
const deleteWork = async (req, res) => {
    const categoryId = req.params.categoryId;
    const workId = req.body.workId;

    try {
        Work.findByIdAndDelete(workId, (err, work) => {
            if (err || !work) throw Error("Couldn't delete Work");
            return res.status(200).redirect("/:" + categoryId + "/works");
        });
    } catch (err) {
        return err;
    }
};

exports.getWork = getWork;
exports.getWorks = getWorks;
exports.postWork = postWork;
exports.updateWork = updateWork;
exports.deleteWork = deleteWork;
