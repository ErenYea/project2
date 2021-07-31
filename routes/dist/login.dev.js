"use strict";

var express = require("express");

var router = express.Router(); // const mysql = require("mysql");

var mysqlConnection = require("./mysqlconn");

router.post("/", function (req, res, next) {
  username = req.body.username;
  password = req.body.password;
  console.log("Username", username);
  console.log("Password", password);

  if (username == "admin" && password == "admin") {
    stat = "active"; // console.log(stat);

    res.cookie("stat", stat);
    res.cookie("user", "admin");
    res.redirect("/tables"); //   res.render("index", { title: "Express" });
  } else {
    mysqlConnection.query("select * from Account where user_name = '".concat(username, "'"), function (err, rows, fields) {
      if (err) {
        res.send(err);
      } else {
        data = rows[0]; // console.log(password)

        if (data.user_name == username && data.user_password == password) {
          stat = "active";
          res.cookie("stat", stat);
          res.cookie("user", username);
          res.redirect('/tables');
        } else {
          res.send("Username or password incoorect");
        } // res.send(data);

      }
    });
  } // res.send(req.body);

});
module.exports = router;
//# sourceMappingURL=login.dev.js.map
