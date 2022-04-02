var express = require("express");
var router = express.Router();
var dbConn = require("../database");
const { ensureAdmin } = require("../passportauth/checkIfAuth");

// display books page
router.get("/", ensureAdmin, function (req, res, next) {
  dbConn.query(
    "SELECT * FROM WhatsPopular ORDER BY id desc",
    function (err, rows) {
      if (err) {
        req.flash("error", err);
        // render to views/admin/index.ejs
        res.render("adminsongs", { data: "", user: req.user });
      } else {
        // render to views/admin/index.ejs
        res.render("adminsongs", { data: rows, user: req.user });
      }
    }
  );
});

// display add book page
router.get("/add", ensureAdmin, function (req, res, next) {
  // render to add.ejs
  res.render("adminsongs/add", {
    song: "",
    name: "",
    genre: "",
    rating: "",
  });
});

// add a new book
router.post("/add", function (req, res, next) {
  let song = req.body.song;
  let name = req.body.name;
  let genre = req.body.genre;
  let rating = req.body.rating;
  let errors = false;

  if (
    song.length === 0 ||
    name.length === 0 ||
    genre.length === 0 ||
    rating.length === 0
  ) {
    errors = true;

    // set flash message
    req.flash("error", "Please fill all the information");
    // render to add.ejs with flash message
    res.render("adminsongs/add", {
      song: song,
      name: name,
      genre: genre,
      rating: rating,
    });
  }

  //if not valid genre and rating
  else if (
    !(
      (genre === "Hip hop" || genre === "Rock" || genre === "Pop") &
      (rating === "1" ||
        rating === "2" ||
        rating === "3" ||
        rating === "4" ||
        rating === "5")
    )
  ) {
    console.log("if not equal genre or rating");
    errors = true;

    // set flash message
    req.flash("error", "Please enter a valid Genre or Rating");
    // render to add.ejs with flash message
    res.render("adminsongs/add", {
      song: song,
      name: name,
      genre: genre,
      rating: rating,
    });
  }

  // if no error
  if (!errors) {
    var form_data = {
      song: song,
      name: name,
      genre: genre,
      rating: rating,
    };

    // insert query
    dbConn.query(
      "INSERT INTO WhatsPopular SET ?",
      form_data,
      function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          // render to add.ejs
          res.render("adminsongs/add", {
            song: form_data.song,
            name: form_data.name,
            genre: form_data.genre,
            rating: form_data.rating,
          });
        } else {
          req.flash("success", "Song successfully added");
          res.redirect("/adminsongs");
        }
      }
    );
  }
});

// display edit book page
router.get("/edit/(:id)", ensureAdmin, function (req, res, next) {
  let id = req.params.id;
  console.log(id);

  dbConn.query(
    "SELECT * FROM WhatsPopular WHERE id = " + id,
    function (err, rows, fields) {
      if (err) throw err;

      // if user not found
      if (rows.length <= 0) {
        req.flash("error", "Book not found with id = " + id);
        res.redirect("/adminsongs");
      }
      // if book found
      else {
        // render to edit.ejs
        res.render("adminsongs/edit", {
          title: "Edit Book",
          id: rows[0].id,
          song: rows[0].song,
          name: rows[0].name,
          genre: rows[0].genre,
          rating: rows[0].rating,
        });
      }
    }
  );
});

// update book data
router.post("/update/:id", function (req, res, next) {
  let id = req.params.id;
  let song = req.body.song;
  let name = req.body.name;
  let genre = req.body.genre;
  let rating = req.body.rating;
  let errors = false;

  if (
    song.length === 0 ||
    name.length === 0 ||
    genre.length === 0 ||
    rating.length === 0
  ) {
    errors = true;
    console.log("enteing nupdate if");
    // set flash message
    req.flash("error", "Please fill all informartion");
    // render to add.ejs with flash message
    res.render("adminsongs/edit", {
      id: req.params.id,
      song: song,
      name: name,
      genre: genre,
      rating: rating,
    });
  }

  //if not valid genre and rating
  else if (
    !(
      (genre === "Hip hop" || genre === "Rock" || genre === "Pop") &
      (rating === "1" ||
        rating === "2" ||
        rating === "3" ||
        rating === "4" ||
        rating === "5")
    )
  ) {
    console.log("if not equal genre or rating");
    errors = true;

    // set flash message
    req.flash("error", "Please enter a valid Genre or Rating");
    // render to add.ejs with flash message
    res.render("adminsongs/edit", {
      id: req.params.id,
      song: song,
      name: name,
      genre: genre,
      rating: rating,
    });
  }

  // if no error
  if (!errors) {
    var form_data = {
      song: song,
      name: name,
      genre: genre,
      rating: rating,
    };
    // update query
    dbConn.query(
      "UPDATE WhatsPopular SET ? WHERE id = " + id,
      form_data,
      function (err, result) {
        //if(err) throw err
        if (err) {
          // set flash message
          req.flash("error", err);
          // render to edit.ejs
          res.render("adminsongs/edit", {
            id: req.params.id,
            song: form_data.song,
            name: form_data.name,
            genre: form_data.genre,
            rating: form_data.rating,
          });
        } else {
          req.flash("success", "Song successfully updated");
          res.redirect("/adminsongs");
        }
      }
    );
  }
});

// delete book
router.get("/delete/(:id)", ensureAdmin, function (req, res, next) {
  let id = req.params.id;

  dbConn.query(
    "DELETE FROM WhatsPopular WHERE id = " + id,
    function (err, result) {
      //if(err) throw err
      if (err) {
        // set flash message
        req.flash("error", err);
        // redirect to admin page
        res.redirect("/adminsongs");
      } else {
        // set flash message
        req.flash("success", "Song successfully deleted! ID = " + id);
        // redirect to admin page
        res.redirect("/adminsongs");
      }
    }
  );
});

module.exports = router;
