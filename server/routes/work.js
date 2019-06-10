var express = require("express");
var router = express.Router();

const {
    getWork,
    getWorks,
    postWork,
    updateWork,
    deleteWork
} = require("../controllers/works.js");

//(GET) Read: work
router.get("/:categoryId/works/:workId", getWork);

// (GET) Read: all works
router.get("/:categoryId/works/", getWorks);

//(POST) Create: work
router.post("/:categoryId/works/", postWork);

//(POST) Update: work
router.post("/:categoryId/works/:workId/update", updateWork);

//(POST) Delete: work
router.post("/:categoryId/works/:workId", deleteWork);

module.exports = router;
