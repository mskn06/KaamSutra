var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//index is category for this app (for first stage)
var indexRouter = require("./routes/index");
var workRouter = require("./routes/work");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/:categoryId/works", workRouter);

module.exports = app;
