"use strict";

var express = require("express");

var router = express.Router();
router.get("/", function (req, res, next) {
  res.cookie("stat", "unactive");
  res.clearCookie("user");
  res.redirect("/");
});
module.exports = router;
//# sourceMappingURL=logout.dev.js.map
