const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categoryModel = Schema({
    title: {
        type: String,
        required: true
    },
    tasksIncluded: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Category", categoryModel);
