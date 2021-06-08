"use strict";

var express = require("express");

var router = express.Router(); // const mysql = require("mysql");

var mysqlConnection = require('./mysqlconn'); // var mysqlConnection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "loveisone",
//   database: "drstone",
//   multipleStatements: true,
// });
// mysqlConnection.connect((err) => {
//   if (err) {
//     console.log("Not seccess", err);
//   } else {
//     console.log("sucess");
//   }
// });

/* GET home page. */


router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express"
  });
});
module.exports = router;
//# sourceMappingURL=index.dev.js.map
