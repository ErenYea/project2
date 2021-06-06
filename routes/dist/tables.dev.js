"use strict";

var express = require("express");

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
});
var tablenames = [];
var data = [];
mysqlConnection.query("show tables", function (err, rows, fields) {
  if (err) {
    console.log(err);
  } else {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        element = _step.value;

        for (key in element) {
          tablenames.push(element[key]); // tcb = element[key];
          // console.log(element[key]);

          mysqlConnection.query("SELECT * from ".concat(element[key]), function (err, rows, fields) {
            if (err) {
              console.log("pagama", err);
            } else {
              // console.log(tcb);
              // res.send(rows)
              // res.send(rows)
              data.push(rows);
            }
          });
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  /* GET users listing. */


  router.get("/", function (req, res, next) {
    res.render("tables", {
      title: "Express",
      data: data,
      tablenames: tablenames
    });
  }); // res.send(data)
  // res.render('tables')
  // res.send('respond with a resource');
});
module.exports = router;
//# sourceMappingURL=tables.dev.js.map
