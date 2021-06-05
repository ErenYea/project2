"use strict";

var express = require('express');

var router = express.Router();

var mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "loveisone",
  database: "drstone",
  multipleStatements: true
});
mysqlConnection.connect(function (err) {
  if (err) {
    console.log("Not seccess", err);
  } else {
    console.log("sucess");
  }
}); // const mysqlConnection = require('./mysql');

var data;
var second;
/* GET users listing. */

router.get('/', function (req, res, next) {
  mysqlConnection.query("SELECT * from dependent", function (err, rows, fields) {
    if (err) {
      console.log("pagama", err);
    } else {
      // res.send(rows)
      data = rows;
    }
  });
  mysqlConnection.query("SELECT * from employee", function (err, rows, fields) {
    if (err) {
      console.log("Error", err);
    } else {
      second = rows;
    }
  });
  res.render("tables", {
    title: "Express",
    data: data,
    second: second
  }); // res.render('tables')
  // res.send('respond with a resource');
});
module.exports = router;
//# sourceMappingURL=tables.dev.js.map
