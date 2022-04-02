module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      //console.log("ensureAuthenticated before next");
      return next();
    }
    console.log("ensureAuthenticated error");
    //req.flash("error_msg", "please login to view this resource");
    //res.redirect("/login");
    res.redirect(`/login?origin=${req.originalUrl}`);
  },

  ensureAdmin: function (req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.role === "admin") {
        return next();
      } else {
        return res.redirect("/index");
      }
    }
    console.log("ensureAuthenticated error");
    res.redirect(`/login?origin=${req.originalUrl}`);
  },
};
