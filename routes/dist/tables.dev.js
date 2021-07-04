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
/* GET users listing. */

router.get("/", function (req, res, next) {
  var gettablenames = function gettablenames() {
    return new Promise(function (resolve, reject) {
      mysqlConnection.query("show tables", function (err, rows, fields) {
        if (err) {
          console.log("First Function", err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

  var getcolumndata = function getcolumndata(element, key) {
    return new Promise(function (resolve, reject) {
      mysqlConnection.query("SELECT * from ".concat(element[key]), function (err, rows, fields) {
        if (err) {
          console.log("Second function", err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

  var allfunct = function allfunct() {
    var tablenames, data, array_of_table, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, object_of_data, newarr;

    return regeneratorRuntime.async(function allfunct$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tablenames = [];
            data = [];
            _context.next = 4;
            return regeneratorRuntime.awrap(gettablenames());

          case 4:
            array_of_table = _context.sent;
            // console.log(array_of_table);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 8;
            _iterator = array_of_table[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 25;
              break;
            }

            element = _step.value;
            _context.t0 = regeneratorRuntime.keys(element);

          case 13:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 22;
              break;
            }

            key = _context.t1.value;
            // console.log(element[key]);
            tablenames.push(element[key]);
            _context.next = 18;
            return regeneratorRuntime.awrap(getcolumndata(element, key));

          case 18:
            object_of_data = _context.sent;
            data.push(object_of_data);
            _context.next = 13;
            break;

          case 22:
            _iteratorNormalCompletion = true;
            _context.next = 10;
            break;

          case 25:
            _context.next = 31;
            break;

          case 27:
            _context.prev = 27;
            _context.t2 = _context["catch"](8);
            _didIteratorError = true;
            _iteratorError = _context.t2;

          case 31:
            _context.prev = 31;
            _context.prev = 32;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 34:
            _context.prev = 34;

            if (!_didIteratorError) {
              _context.next = 37;
              break;
            }

            throw _iteratorError;

          case 37:
            return _context.finish(34);

          case 38:
            return _context.finish(31);

          case 39:
            // console.log(data)
            // console.log(tablenames)
            newarr = [tablenames, data];
            return _context.abrupt("return", newarr);

          case 41:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[8, 27, 31, 39], [32,, 34, 38]]);
  };

  var start = function start() {
    var newarr, tablenames, data;
    return regeneratorRuntime.async(function start$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(allfunct());

          case 2:
            newarr = _context2.sent;
            tablenames = newarr[0];
            data = newarr[1]; // console.log(tablenames);

            res.render("tables", {
              title: "Express",
              data: data,
              tablenames: tablenames,
              cond: "table"
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  start();
});
module.exports = router;
//# sourceMappingURL=tables.dev.js.map
