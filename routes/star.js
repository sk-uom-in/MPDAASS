var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  console.log("This page does not exist");
  res.redirect("/index");
});

module.exports = router;
