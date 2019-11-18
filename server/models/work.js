const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workModel = Schema(
    {
        title: {
            type: String
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Work", workModel);
