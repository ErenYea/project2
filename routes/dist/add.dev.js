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
  console.log("added");
  var ob = req.body; // var id = req.params;
  // console.log(id)

  console.log(ob);
  var name;
  var value;

  for (key in ob) {
    name = key;
    value = ob[key];
  }

  console.log(name);
  console.log(value);

  if (value == "ADD") {
    mysqlConnection.query("select COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH,  \n       IS_NULLABLE \n    from INFORMATION_SCHEMA.COLUMNS\n    where TABLE_NAME='".concat(name, "'"), function (err, rows, fields) {
      if (err) {
        res.send(err);
      } else {
        console.log(rows);
        res.render("add", {
          data: rows,
          tablename: name,
          cond: 'add'
        }); // res.send(rows)
      }
    });
  } else if (ob[Object.keys(ob)[0]] == 'EDIT') {
    mysqlConnection.query("select COLUMN_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,IS_NULLABLE\n      from INFORMATION_SCHEMA.COLUMNS\n      where TABLE_NAME='".concat(ob.tablename, "'"), function (err, rows, fields) {
      var main = rows;
      console.log(rows);
      mysqlConnection.query("select * from ".concat(ob.tablename, " where ").concat(value[0], "=").concat(Object.keys(ob)[0]), function (err, rows, fields) {
        // console.log(`select * from ${ob.tablename} where ${value[0]}=${Object.keys(ob)[0]}`)
        console.log(rows);
        id = [value[0], Object.keys(ob)[0]];
        res.render("add", {
          data: main,
          rows: rows,
          tablename: ob.tablename,
          cond: 'edit',
          id: id
        }); // res.send(rows);
      });
    });
  } else {
    var tablename = [name];
    mysqlConnection.query("SELECT * from ".concat(name), function (err, rows, fields) {
      if (err) {
        res.send(err);
      } else {
        var data = [rows];
        res.render("tables", {
          title: "Express",
          data: data,
          tablenames: tablename,
          cond: "view"
        });
      }
    });
  }
});
module.exports = router;
//# sourceMappingURL=add.dev.js.map
