"use strict";

var express = require("express");

var router = express.Router();

var mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "loveisone",
  database: "helloworld",
  multipleStatements: true
});
mysqlConnection.connect(function (err) {
  if (err) {
    console.log("Not seccess", err);
  } else {
    console.log("sucess");
  }
});
router.post("/", function (req, res, next) {
  var data = req.body;
  var arr = [];

  for (key in data) {
    arr.push(data[key]);
  }

  var tablename = arr.shift();
  var huz = "'" + arr.join("','") + "'";
  mysqlConnection.query("insert into ".concat(tablename, " \n    values (").concat(huz, ")"), function (err, rows, fields) {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/tables');
    }
  }); // res.send(data) 
});
module.exports = router;
//# sourceMappingURL=action.dev.js.map
