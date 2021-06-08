var express = require("express");
var router = express.Router();
const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "loveisone",
  database: "helloworld",
  multipleStatements: true,
});
mysqlConnection.connect((err) => {
  if (err) {
    console.log("Not seccess", err);
  } else {
    console.log("sucess");
  }
});

var tablenames = [];
var data = [];
mysqlConnection.query("show tables", (err, rows, fields) => {
  if (err) {
    console.log(err);
  } else {
    if (data.length != 0) {
      data = [];
      tablenames = [];
    }
    for (element of rows) {
      for (key in element) {
        tablenames.push(element[key]);
        // tcb = element[key];
        // console.log(element[key]);
        mysqlConnection.query(
          `SELECT * from ${element[key]}`,
          (err, rows, fields) => {
            if (err) {
              console.log("pagama", err);
            } else {
              // console.log(tcb);
              // res.send(rows)
              // res.send(rows)
              data.push(rows);
            }
          }
        );
      }
    }
  }

  /* GET users listing. */
  router.get("/", function (req, res, next) {
    res.render("tables", {
      title: "Express",
      data: data,
      tablenames: tablenames,
    });
  });

  // res.send(data)

  // res.render('tables')
  // res.send('respond with a resource');
});

module.exports = router;
