const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../database");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //match user
      console.log("LocalStrategy - email: " + email);
      console.log("LocalStrategy - password: " + password);
      getByEmail(email)
        .then((user) => {
          if (!user) {
            //console.log("running if !user");
            return done(null, false, { message: "Email not registered" });
          }

          //math passwords
          console.log("user.password " + user.password);
          console.log(JSON.stringify(user));
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              //console.log("running !password");
              return done(null, false, { message: "Password is incorrect" });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
  passport.serializeUser(function (user, done) {
    console.log("serializeUser user id " + JSON.stringify(user));
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    console.log("deserializeUser user id " + id);
    getUserByUserId(id)
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Email not registered" });
        }

        console.log("--> after getbyId " + JSON.stringify(user));
        //done(err, user);
        done(null, user);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

async function getByEmail(email) {
  console.log("Running getByEmail: " + JSON.stringify(email));
  const users = await db
    .promise()
    .query(`SELECT * FROM Users WHERE email = '${email}'`);
  return users[0][0];
}

async function getUserByUserId(id) {
  console.log("Running getUserByUserId: " + id);
  const users = await db
    .promise()
    .query(`SELECT * FROM Users WHERE id = '${id}'`);
  return users[0][0];
}
