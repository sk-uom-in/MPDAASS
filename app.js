let bcrypt = require("bcryptjs");
const express = require("express");
const path = require("path");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
// aj
var cookieParser = require("cookie-parser");

// express app
const app = express();
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
// basically to make sure to grab data from any forms
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

// template
app.set("view engine", "ejs");

//passport.js
require("./passportauth/passport")(passport);
app.use(flash());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.role = req.flash("role");
  next();
});

//Define routes
app.use("/", require("./routes/auth"));
app.use("/index", require("./routes/index"));
app.use("/whatspopular", require("./routes/whatspopular"));
app.use("/about", require("./routes/about"));
app.use("/adminsongs", require("./routes/adminsongs"));
app.use("/adminusers", require("./routes/adminusers"));
app.use("/quiz", require("./routes/quiz"));
app.use("/yourmusic", require("./routes/yourmusic"));
app.use("/settings", require("./routes/settings"));
app.use("/logout", require("./routes/auth"));
app.use("/*", require("./routes/star"));

app.listen(4001, () => {
  console.log("Server started on Port 4001");
});

module.exports = app;
