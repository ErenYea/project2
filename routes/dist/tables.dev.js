"use strict";

var express = require("express");

var router = express.Router();

var mysqlConnection = require("./mysqlconn.js");
/* GET users listing. */


router.get("/", function (req, res, next) {
  var stat = req.cookies.stat; // var stat = require("./login").stat;

  console.log(stat);

  if (stat == "active") {
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
              console.log(array_of_table);

              if (req.cookies.user != 'admin') {
                array_of_table.shift();
              }

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 10;
              _iterator = array_of_table[Symbol.iterator]();

            case 12:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 27;
                break;
              }

              element = _step.value;
              _context.t0 = regeneratorRuntime.keys(element);

            case 15:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 24;
                break;
              }

              key = _context.t1.value;
              // console.log(element[key]);
              tablenames.push(element[key]);
              _context.next = 20;
              return regeneratorRuntime.awrap(getcolumndata(element, key));

            case 20:
              object_of_data = _context.sent;
              data.push(object_of_data);
              _context.next = 15;
              break;

            case 24:
              _iteratorNormalCompletion = true;
              _context.next = 12;
              break;

            case 27:
              _context.next = 33;
              break;

            case 29:
              _context.prev = 29;
              _context.t2 = _context["catch"](10);
              _didIteratorError = true;
              _iteratorError = _context.t2;

            case 33:
              _context.prev = 33;
              _context.prev = 34;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 36:
              _context.prev = 36;

              if (!_didIteratorError) {
                _context.next = 39;
                break;
              }

              throw _iteratorError;

            case 39:
              return _context.finish(36);

            case 40:
              return _context.finish(33);

            case 41:
              newarr = [tablenames, data];
              return _context.abrupt("return", newarr);

            case 43:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[10, 29, 33, 41], [34,, 36, 40]]);
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
              data = newarr[1];
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
  } else {
    res.redirect("/");
  }
});
module.exports = router;
//# sourceMappingURL=tables.dev.js.map
