const express = require("express");
//if need to do something inside homepage here we have to require controller
const router = express.Router();
const { ensureAuthenticated } = require("../passportauth/checkIfAuth");

// router.post("/", (req, res) => {
//   //console.log("Working route post")
// });

router.get("/", ensureAuthenticated, (req, res) => {
  console.log("Working route get index");
  return res.render("index", { user: req.user });
});

module.exports = router;
