"use strict";

var express = require("express");

var router = express.Router(); // const mysql = require("mysql");

var mysqlConnection = require('./mysqlconn');
/* GET home page. */


router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express"
  });
});
module.exports = router;
//# sourceMappingURL=index.dev.js.map
