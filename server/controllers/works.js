const Work = require("../models/work.js");

const getWork = async (_, res) => {
    const works = await Work.find();
    if (works) res.send({ works: works });
};

const postWork = async (req, res) => {
    const newWork = {
        title: req.body.title,
        description: req.body.description
    };
    try {
        if (newWork) {
            const work = new Work(newWork);
            const savedWork = await work.save();
            res.redirect("/work/" + savedWork.id);
        } else {
            res.redirect("/");
        }
    } catch (err) {
        console.log(err);
    }
};

exports.getWork = getWork;
exports.postWork = postWork;
