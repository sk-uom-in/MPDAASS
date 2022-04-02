const express = require("express");
const router = express.Router();
const db = require("../database");
const { ensureAuthenticated } = require("../passportauth/checkIfAuth");

// another routes also appear here
// this script to fetch data from MySQL databse table
router.get("/", ensureAuthenticated, function (req, res, next) {
  console.log("entering get whatspopular");
  var sql =
    'SELECT * FROM WhatsPopular WHERE genre = "Rock" ORDER BY rating desc';
  var sql2 =
    'SELECT * FROM WhatsPopular WHERE genre = "Pop" ORDER BY rating desc';
  var sql3 =
    'SELECT * FROM WhatsPopular WHERE genre = "Hip Hop" ORDER BY rating desc';
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    db.query(sql2, function (err, data2, fields) {
      if (err) throw err;
      db.query(sql3, function (err, data3, fields) {
        if (err) throw err;
        res.render("whatspopular", {
          title: "Hot songs",
          songDataRock: data,
          songDataPop: data2,
          songDataHiphop: data3,
          user: req.user,
        });
      });
    });
  });
});

module.exports = router;
