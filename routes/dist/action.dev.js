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
  var array_of_column_name = [];

  function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!  

    return !isNaN(str);
  }

  var task;

  for (key in data) {
    if (isNumeric(data[key])) {
      var num = parseInt(data[key]);
      arr.push(num);
    } else {
      if (key == 'task') {
        task = data[key];
        continue;
      } else {
        arr.push(data[key]);
      }
    }

    array_of_column_name.push(key);
  }

  var tablename = arr.shift();
  array_of_column_name.shift();
  console.log(arr);
  console.log(array_of_column_name); // arr.reverse();

  var huz = "'" + arr.join("','") + "'";
  var ham = "" + array_of_column_name.join(",") + "";

  if (task == 'add') {
    mysqlConnection.query("insert into ".concat(tablename, " (").concat(ham, ") values (").concat(huz, ")"), function (err, rows, fields) {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/tables');
      }
    });
  } else if (task == 'edit') {
    value = arr.shift();
    arr_value = value.split(",");
    array_of_column_name.shift();
    var update = "";

    for (var i = 0; i < array_of_column_name.length; i++) {
      if (i == array_of_column_name.length - 1) {
        update += "".concat(array_of_column_name[i], "=") + "'" + arr[i] + "'";
        break;
      }

      update += "".concat(array_of_column_name[i], "=") + "'" + arr[i] + "'" + ",";
    } // res.send(update)


    mysqlConnection.query("update ".concat(tablename, " set ").concat(update, " where ").concat(arr_value[0], " = ").concat(arr_value[1]), function (err, rows, fields) {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/tables');
      }
    });
  } // res.send(ham) ;

});
module.exports = router;
//# sourceMappingURL=action.dev.js.map
