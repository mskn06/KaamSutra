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
router.get("/:categoryId/:workId", getWork);

// (GET) Read: all works

/* NOTE:
   Initial: /:categoryId/works/
   Final: /:categoryId
   Why? : Because the final URL would have become like this:
   http://localhost:3000/api/work/categoryId/works
   which is not very readable because Works is getting used twice
   Now the url will be:
   https://localhost:3000/api/work/categoryId
 * ===================================================== */

router.get("/:categoryId/", getWorks);

//(POST) Create: work
router.post("/:categoryId/", postWork);

//(POST) Update: work
router.post("/:categoryId/:workId/update", updateWork);

//(POST) Delete: work
router.post("/:categoryId/:workId", deleteWork);

module.exports = router;
