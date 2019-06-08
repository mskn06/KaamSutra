var express = require("express");
var router = express.Router();

const { getWork, postWork } = require("../controllers/works.js");

/* GET users listing. */
router.get("/", getWork);

router.post("/", postWork);

router.get("/:id", (req, res) => {
    res.send({ id: "saved user :@" + req.params.id });
});

module.exports = router;
