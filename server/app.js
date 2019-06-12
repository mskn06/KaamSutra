var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const path = require("path");
// const cors = require("cors");

//index is category for this app (for first stage)
var indexRouter = require("./routes/index");
var workRouter = require("./routes/work");

var app = express();

// app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));

app.use("/api/category", indexRouter);
app.use("/api/work", workRouter);
app.get("*", (_, res) => {
    res.sendFile("build/index.html", { root: __dirname });
});

module.exports = app;
