const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../passportauth/checkIfAuth");
var dbConn = require("../database");

router.get("/", ensureAuthenticated, (req, res) => {
  return res.render("settings", { user: req.user });
});

router.post("/update/:id", function (req, res, next) {
  // saving current email of user in variable
  let emailCurrentUser = req.user.email;
  // saving id params and req body
  let id = req.params.id;
  let name = req.body.name;
  let email = req.body.email;

  console.log("getting into route");

  if ((name.length === 0) & (email.length === 0)) {
    console.log("error update user settings fill at least one");
    // set flash message
    req.flash(
      "error",
      "You need to fill some information if you want to update your user settings"
    );
    // render to settings.ejs with flash message
    res.render("settings", { user: req.user });
  } else if ((name.length > 0) & (email.length === 0)) {
    //if just update username
    dbConn.query(
      "UPDATE Users SET ? WHERE id = " + id,
      [{ name: name }],
      function (err, result) {
        console.log("updating username settings");
        //if(err) throw err
        if (err) {
          // set flash message
          req.flash("error", err);
          res.render("settings", { user: req.user });
        } else {
          req.flash("success", "Username successfully updated");
          return res.render("settings", {
            user: req.user,
            name: name,
            email: email,
          });
        }
      }
    );
  } else {
    dbConn.query(
      "SELECT email FROM Users WHERE email = ?",
      [email],
      async function (err, results) {
        if (err) {
          throw err;
        }
        console.log(results);
        // email check
        if (results.length > 0) {
          if (results[0].email === emailCurrentUser) {
            //checking that you wrote the same
            req.flash("error", "You wrote the same email!");
            return res.render("settings", { user: req.user });
          } else if (results[0].email !== emailCurrentUser) {
            // checking that you wrote an existing email
            req.flash("error", "An user already exists with that Email");
            return res.render("settings", { user: req.user });
          }
        }

        let emaildb = "";
        let namedb = "";

        if (email.length > 0) {
          emaildb = email;
        } else {
          emaildb = req.user.email;
        }

        if (name.length > 0) {
          namedb = name;
        } else {
          namedb = req.user.name;
        }
        var form_data = {
          name: namedb,
          email: emaildb,
        };

        // update query
        dbConn.query(
          "UPDATE Users SET ? WHERE id = " + id,
          form_data,
          function (err, result) {
            //if(err) throw err
            if (err) {
              // set flash message
              req.flash("error", err);
              res.render("settings", { user: req.user });
            } else {
              req.flash("success", "Settings successfully updated");
              return res.render("settings", {
                user: req.user,
                name: name,
                email: email,
              });
            }
          }
        );
      }
    );
  }
});

module.exports = router;
