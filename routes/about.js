const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../passportauth/checkIfAuth");

router.get("/", ensureAuthenticated, (req, res) => {
  return res.render("about", { user: req.user });
});

module.exports = router;
