var express = require("express");
var router = express.Router();
// const mysql = require("mysql");
const mysqlConnection = require('./mysqlconn')



/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express"});
});

module.exports = router;
