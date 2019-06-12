var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

//index is category for this app (for first stage)
var indexRouter = require("./routes/index");
var workRouter = require("./routes/work");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/category", indexRouter);
app.use("/api/work", workRouter);

module.exports = app;
