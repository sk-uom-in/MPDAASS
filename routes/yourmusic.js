const express = require("express");
const router = express.Router();
const db = require("../database");
const { ensureAuthenticated } = require("../passportauth/checkIfAuth");

// router.get("/", ensureAuthenticated, (req, res) => {
//   return res.render("yourmusic", { user: req.user });
// });

// module.exports = router;

// another routes also appear here
// this script to fetch data from MySQL databse table
router.get("/", ensureAuthenticated, function (req, res, next) {
  const allsongs = req.body;
  console.log("****");
  console.log(allsongs);
  const userID = parseInt(req.user.id);
  console.log("entering get your music");
  console.log(userID);

  var sql = "SELECT * FROM HistoryTable WHERE User_ID = ? ORDER BY H_ID desc";
  db.query(sql, [userID], function (err, data, fields) {
    console.log("data: " + JSON.stringify(data));
    if (err) throw err;
    //techincally we need a for loop for all H_IDs in data and then get all the song IDs lik that.
    //everything should techincallye be in a for loop

    //get history ids and arrange in decending order
    //using th efirst 3 history ids get allt he info
    //ie we will only display the most recent 3 quiz stuff

    let table1_song1_ID = 0;
    let table1_song2_ID = 0;
    let table1_song3_ID = 0;
    let table1_song4_ID = 0;
    let table1_song5_ID = 0;

    let table2_song1_ID = 0;
    let table2_song2_ID = 0;
    let table2_song3_ID = 0;
    let table2_song4_ID = 0;
    let table2_song5_ID = 0;

    let table3_song1_ID = 0;
    let table3_song2_ID = 0;
    let table3_song3_ID = 0;
    let table3_song4_ID = 0;
    let table3_song5_ID = 0;

    if (data.length >= 3) {
      table1_song1_ID = parseInt(JSON.stringify(data[0].Song1_ID));
      table1_song2_ID = parseInt(JSON.stringify(data[0].Song2_ID));
      table1_song3_ID = parseInt(JSON.stringify(data[0].Song3_ID));
      table1_song4_ID = parseInt(JSON.stringify(data[0].Song4_ID));
      table1_song5_ID = parseInt(JSON.stringify(data[0].Song5_ID));

      table2_song1_ID = parseInt(JSON.stringify(data[1].Song1_ID));
      table2_song2_ID = parseInt(JSON.stringify(data[1].Song2_ID));
      table2_song3_ID = parseInt(JSON.stringify(data[1].Song3_ID));
      table2_song4_ID = parseInt(JSON.stringify(data[1].Song4_ID));
      table2_song5_ID = parseInt(JSON.stringify(data[1].Song5_ID));

      table3_song1_ID = parseInt(JSON.stringify(data[2].Song1_ID));
      table3_song2_ID = parseInt(JSON.stringify(data[2].Song2_ID));
      table3_song3_ID = parseInt(JSON.stringify(data[2].Song3_ID));
      table3_song4_ID = parseInt(JSON.stringify(data[2].Song4_ID));
      table3_song5_ID = parseInt(JSON.stringify(data[2].Song5_ID));
    } else if (data.length == 2) {
      table1_song1_ID = parseInt(JSON.stringify(data[0].Song1_ID));
      table1_song2_ID = parseInt(JSON.stringify(data[0].Song2_ID));
      table1_song3_ID = parseInt(JSON.stringify(data[0].Song3_ID));
      table1_song4_ID = parseInt(JSON.stringify(data[0].Song4_ID));
      table1_song5_ID = parseInt(JSON.stringify(data[0].Song5_ID));

      table2_song1_ID = parseInt(JSON.stringify(data[1].Song1_ID));
      table2_song2_ID = parseInt(JSON.stringify(data[1].Song2_ID));
      table2_song3_ID = parseInt(JSON.stringify(data[1].Song3_ID));
      table2_song4_ID = parseInt(JSON.stringify(data[1].Song4_ID));
      table2_song5_ID = parseInt(JSON.stringify(data[1].Song5_ID));

      // create null song ids
    } else if (data.length == 1) {
      table1_song1_ID = parseInt(JSON.stringify(data[0].Song1_ID));
      table1_song2_ID = parseInt(JSON.stringify(data[0].Song2_ID));
      table1_song3_ID = parseInt(JSON.stringify(data[0].Song3_ID));
      table1_song4_ID = parseInt(JSON.stringify(data[0].Song4_ID));
      table1_song5_ID = parseInt(JSON.stringify(data[0].Song5_ID));
    } else {
      console.log("no quiz results");
    }

    var sql1 = "SELECT * FROM Songs WHERE id = ? ";
    db.query(sql1, [table1_song1_ID], function (err, data1, fields) {
      if (err) throw err;
      db.query(sql1, [table1_song2_ID], function (err, data2, fields) {
        if (err) throw err;
        db.query(sql1, [table1_song3_ID], function (err, data3, fields) {
          if (err) throw err;
          db.query(sql1, [table1_song4_ID], function (err, data4, fields) {
            if (err) throw err;
            db.query(sql1, [table1_song5_ID], function (err, data5, fields) {
              if (err) throw err;

              db.query(sql1, [table2_song1_ID], function (err, data6, fields) {
                if (err) throw err;
                db.query(
                  sql1,
                  [table2_song2_ID],
                  function (err, data7, fields) {
                    if (err) throw err;
                    db.query(
                      sql1,
                      [table2_song3_ID],
                      function (err, data8, fields) {
                        if (err) throw err;
                        db.query(
                          sql1,
                          [table2_song4_ID],
                          function (err, data9, fields) {
                            if (err) throw err;
                            db.query(
                              sql1,
                              [table2_song5_ID],
                              function (err, data10, fields) {
                                if (err) throw err;

                                db.query(
                                  sql1,
                                  [table3_song1_ID],
                                  function (err, data11, fields) {
                                    if (err) throw err;
                                    db.query(
                                      sql1,
                                      [table3_song2_ID],
                                      function (err, data12, fields) {
                                        if (err) throw err;
                                        db.query(
                                          sql1,
                                          [table3_song3_ID],
                                          function (err, data13, fields) {
                                            if (err) throw err;
                                            db.query(
                                              sql1,
                                              [table3_song4_ID],
                                              function (err, data14, fields) {
                                                if (err) throw err;
                                                db.query(
                                                  sql1,
                                                  [table3_song5_ID],
                                                  function (
                                                    err,
                                                    data15,
                                                    fields
                                                  ) {
                                                    if (err) throw err;

                                                    console.log(
                                                      "\n SONG ID 1: " +
                                                        JSON.stringify(
                                                          data1[0]
                                                        ) +
                                                        "\n"
                                                    );

                                                    const test = data1[0];
                                                    //console.log("test: " + test.Name);

                                                    res.render("yourmusic", {
                                                      title: "Your Music",
                                                      table1_song1_data:
                                                        data1[0], //[0] is for list
                                                      table1_song2_data:
                                                        data2[0], //as you did in the whatspopular.ejs ...
                                                      table1_song3_data:
                                                        data3[0], //use a for loop to get all the data and fill in the tables
                                                      table1_song4_data:
                                                        data4[0],
                                                      table1_song5_data:
                                                        data5[0],

                                                      table2_song1_data:
                                                        data6[0], //[0] is for list
                                                      table2_song2_data:
                                                        data7[0], //as you did in the whatspopular.ejs ...
                                                      table2_song3_data:
                                                        data8[0], //use a for loop to get all the data and fill in the tables
                                                      table2_song4_data:
                                                        data9[0],
                                                      table2_song5_data:
                                                        data10[0],

                                                      table3_song1_data:
                                                        data11[0], //[0] is for list
                                                      table3_song2_data:
                                                        data12[0], //as you did in the whatspopular.ejs ...
                                                      table3_song3_data:
                                                        data13[0], //use a for loop to get all the data and fill in the tables
                                                      table3_song4_data:
                                                        data14[0],
                                                      table3_song5_data:
                                                        data15[0],

                                                      user: req.user,
                                                    });
                                                  }
                                                );
                                              }
                                            );
                                          }
                                        );
                                      }
                                    );
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              });
            });
          });
        });
      });
    });
  });
});

module.exports = router;
