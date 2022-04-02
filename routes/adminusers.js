var express = require("express");
var router = express.Router();
var db = require("../database");
const { ensureAdmin } = require("../passportauth/checkIfAuth");

router.get("/", ensureAdmin, function (req, res, next) {
  console.log("entering get user maintenance page");
  var sql = 'SELECT * FROM Users WHERE role = "admin" ORDER BY id desc';
  var sql2 = 'SELECT * FROM Users WHERE role = "normal" ORDER BY id desc';
  db.query(sql, function (err, dataAdmin, fields) {
    if (err) throw err;
    db.query(sql2, function (err, dataNormal, fields) {
      if (err) throw err;
      res.render("adminusers/users", {
        title: "User Maintenance",
        adminUserData: dataAdmin,
        normalUserData: dataNormal,
        mode: "users",
        user: req.user,
      });
    });
  });
});

router.get("/admins", ensureAdmin, function (req, res, next) {
  console.log("entering get user maintenance page");
  var sql = 'SELECT * FROM Users WHERE role = "admin" ORDER BY id desc';
  var sql2 = 'SELECT * FROM Users WHERE role = "normal" ORDER BY id desc';
  db.query(sql, function (err, dataAdmin, fields) {
    if (err) throw err;
    db.query(sql2, function (err, dataNormal, fields) {
      if (err) throw err;
      res.render("adminusers/users", {
        title: "User Maintenance",
        adminUserData: dataAdmin,
        normalUserData: dataNormal,
        mode: "admins",
        user: req.user,
      });
    });
  });
});

router.get("/makeadmin/(:id)", ensureAdmin, function (req, res, next) {
  let id = req.params.id;
  db.query(
    "SELECT * FROM Users WHERE id = " + id,
    function (err, rows, fields) {
      if (err) throw err;

      // if user not found
      if (rows.length <= 0) {
        req.flash("error", "User not found with id = " + id);
        res.redirect("/adminusers");
      }
      // if book found
      else {
        // render to edit.ejs
        res.render("adminusers/makeadmin", {
          title: "Upgrading user",
          id: rows[0].id,
          email: rows[0].email,
          name: rows[0].name,
          role: rows[0].role,
        });
      }
    }
  );
});

router.post("/upgrade/:id", function (req, res, next) {
  let id = req.params.id;
  let role = req.body.role;
  console.log(role);
  let errors = false;

  if (role !== "admin") {
    errors = true;
    console.log("enteing upgrade user if");
    // set flash message
    req.flash(
      "error",
      "Please type 'admin' correctly if you want to upgrade the user"
    );
    // render to add.ejs with flash message
    res.render("adminusers/makeadmin", {
      id: req.params.id,
      email: req.body.email,
      name: req.body.name,
    });
  }

  // if no error
  if (!errors) {
    var form_data = {
      id: id,
      role: role,
    };
    // update query
    db.query(
      "UPDATE Users SET ? WHERE id = " + id,
      form_data,
      function (err, result) {
        //if(err) throw err
        if (err) {
          // set flash message
          req.flash("error", err);
          // render to edit.ejs
          res.render("adminusers/makeadmin", {
            id: req.params.id,
            role: form_data.role,
          });
        } else {
          req.flash("success", "User successfully updated");
          res.redirect("/adminusers");
        }
      }
    );
  }
});

module.exports = router;
