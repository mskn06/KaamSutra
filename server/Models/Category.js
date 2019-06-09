const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categoryModel = Schema(
    {
        title: {
            type: String
        },
        works: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Category", categoryModel);
