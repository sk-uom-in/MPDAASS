const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

//register controllers

exports.register = (req, res) => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;

  db.query(
    "SELECT email FROM Users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (
        (name.length === 0) |
        (email.length === 0) |
        (password.length === 0) |
        (passwordConfirm.length === 0)
      ) {
        return res.render("login", {
          messageRegisterError: "Please fill credentials",
          mode: "register",
        });
      } else if (results.length > 0) {
        console.log("entering results > 0");
        return res.render("login", {
          messageRegisterError: "That email is already taken",
          mode: "register",
        });
        // req.flash("That email is already taken");
        // res.redirect("/login");
      } else if (password !== passwordConfirm) {
        console.log("entering passwords!=");
        return res.render("login", {
          messageRegisterError: "Passwords do not match",
          mode: "register",
        });
        // req.flash("Passwords do not match");
        // res.redirect("/login");
      } else {
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        // send something to database
        db.query(
          "INSERT INTO Users SET ?",
          {
            name: name,
            email: email,
            password: hashedPassword,
            role: "normal",
          },
          (error, results) => {
            if (error) {
              console.log(error);
            } else {
              console.log("entering database new user");
              console.log(results);
              return res.render("login", {
                messageUserRegistered: "User registered",
              });
              // req.flash("Passwords do not match");
              // res.redirect("login");
            }
          }
        );
      }
    }
  );
};
