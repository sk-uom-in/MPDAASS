var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth");
const passport = require("passport");

//const { ensureAuthenticated } = require("../passportauth/checkIfAuth");

router.get("/", function (req, res, next) {
  res.redirect("/login");
});

router.post("/register", authController.register);

router.get("/login", function (req, res, next) {
  if (req.query.origin) {
    req.session.returnTo = req.query.origin;
  } else {
    req.session.returnTo = req.header("Referer");
  }
  res.render("login.ejs", { dataObj: "Express" });
});

router.post("/login", (req, res, next) => {
  let returnTo = "/";

  if (req.session.returnTo) {
    returnTo = req.session.returnTo;
    delete req.session.returnTo;
  }

  console.log("post login");
  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

//logout
router.post("/logout", (req, res) => {
  console.log("logout ***");
  req.logout();
  if (req.session.returnTo) {
    delete req.session.returnTo;
  }
  //req.flash("success_msg", "Now logged out");
  res.redirect("/login");
});

module.exports = router;
