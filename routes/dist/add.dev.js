"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var express = require("express");

var router = express.Router(); // const confirm = require('confirm-dialog');

var mysqlConnection = require("./mysqlconn.js");

router.post("/", function (req, res, next) {
  // console.log("added")
  var ob = req.body; // var id = req.params;
  // console.log(id)

  console.log(ob);
  var name;
  var value;

  if (Object.getOwnPropertyNames(ob).length == 1) {
    for (key in ob) {
      name = key;
      value = ob[key];
    }
  } else {
    name = Object.keys(ob)[0];
    value = ob[Object.keys(ob)[0]];
  } // console.log(name)
  // console.log(value)


  if (value == "ADD") {
    console.log('hello');
    mysqlConnection.query("select COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH,  \n       IS_NULLABLE \n    from INFORMATION_SCHEMA.COLUMNS\n    where TABLE_NAME='".concat(name, "'"), function (err, rows, fields) {
      if (err) {
        res.send(err);
      } else {
        if (Object.keys(ob)[0] == "users") {
          var main = rows.slice(0, 2);
        } else {
          var main = rows;
        }

        console.log(main);
        res.render("add", {
          data: main,
          tablename: name,
          cond: 'add'
        }); // res.send(rows)
      }
    });
  } else if (ob[Object.keys(ob)[0]] == 'EDIT') {
    mysqlConnection.query("select COLUMN_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,IS_NULLABLE\n      from INFORMATION_SCHEMA.COLUMNS\n      where TABLE_NAME='".concat(ob.tablename, "'"), function (err, rows, fields) {
      if (err) {
        res.send(err);
      }

      var main = rows;
      console.log(rows);

      if (_typeof(ob.id) == _typeof([])) {
        var condition = ob.id[0];
        id = [ob.id[0], Object.keys(ob)[0]];
      } else {
        var condition = ob.id;
        id = [ob.id, Object.keys(ob)[0]];
      }

      mysqlConnection.query("select * from ".concat(ob.tablename, " where ").concat(condition, "=").concat(Object.keys(ob)[0]), function (err, rows, fields) {
        console.log("select * from ".concat(ob.tablename, " where ").concat(value[0], "=").concat(Object.keys(ob)[0])); // console.log(rows)

        res.render("add", {
          data: main,
          rows: rows,
          tablename: ob.tablename,
          cond: 'edit',
          id: id
        }); // res.send(rows);
      });
    });
  } else if (ob[Object.keys(ob)[0]] == 'DELETE') {
    mysqlConnection.query("delete from ".concat(ob.tablename, " where ").concat(ob.id[0], "=").concat(Object.keys(ob)[0]), function (err, rows, fields) {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/tables');
      }
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
