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
router.get("/:workId", getWork);

// (GET) Read: all works
router.get("/", getWorks);

//(POST) Create: work
router.post("/", postWork);

//(POST) Update: work
router.post("/:workId/update", updateWork);

//(POST) Delete: work
router.post("/:workId", deleteWork);

module.exports = router;
