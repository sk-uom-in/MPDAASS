const express = require("express");
const db = require("../database");
const app = require("./auth.js");
const { ensureAuthenticated } = require("../passportauth/checkIfAuth");
const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.redirect("/quiz/form");
});

router.get("/form", ensureAuthenticated, (req, res) => {
  console.log("entering get quiz");
  var sql = 'SELECT * FROM Quiz WHERE Q_id = "Q1" ';
  var sql2 = 'SELECT * FROM Quiz WHERE Q_id = "Q2" ';
  var sql3 = 'SELECT * FROM Quiz WHERE Q_id = "Q3" ';
  // var sql4 =
  // 'SELECT * FROM Quiz WHERE Q_id = "Q4" ';

  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    db.query(sql2, function (err, data2, fields) {
      if (err) throw err;
      db.query(sql3, function (err, data3, fields) {
        if (err) throw err;
        // db.query(sql4,function(err,data4,fields){
        //   if (err) throw err;
        res.render("quizform", {
          options: data,
          options2: data2,
          options3: data3,
          //ptions4:data4,
          // });
        });
      });
    });
  });
});

router.post("/form1", ensureAuthenticated, function (req, res, next) {
  console.log("its working");

  // store all the responces
  const userresponces = req.body;
  let Res1 = userresponces.question1.toString();
  const Res2 = userresponces.question2.toString();
  const Res3 = userresponces.question3.toString();
  if (Res1 == "Hip") {
    Res1 = "Hip Hop";
  }
  console.log(Res1 + Res2 + Res3);
  var sql4 =
    "SELECT id FROM Songs WHERE Genre = ? AND Year = ? AND Country = ? ORDER BY RAND() LIMIT 5 ";
  const sql5 =
    "INSERT INTO HistoryTable (User_ID, Song1_ID, Song2_ID, Song3_ID, Song4_ID, Song5_ID) VALUES (?, ?, ?, ?, ?, ?)";
  var allsongs;
  db.query(sql4, [Res1, Res2, Res3], function (err, data1, fields) {
    if (err) throw err;
    console.log(data1);
    const testData = data1.map(({ id }) => id);
    console.log(`mapped data: ${testData}`);
    //userreponces=testData;
    // req.body = testData;
    console.log("User responses is inserted successfully ");
    allsongs = testData;
    console.log(allsongs);
    //storeData(testData);

    console.log("user ID:");
    console.log(req.user.id);
    const userID = parseInt(req.user.id);
    console.log(parseInt(allsongs));

    db.query(
      sql5,
      [userID, allsongs[0], allsongs[1], allsongs[2], allsongs[3], allsongs[4]],
      function (err, data3, fields) {
        if (err) throw err;
        console.log("allSongs Type: " + typeof allsongs);
        console.log("allSongs: " + allsongs[3]);
        console.log(data3);
        console.log("stored id in history table ");
      }
    );
    res.redirect("/yourmusic");
  });
  //res.redirect(307,"/quiz/store"); // redirect to user form page after inserting the data
});

// const storeData = (data1) => {
//   const sql5 = 'INSERT INTO HistoryTable (User_ID, Song1_ID, Song2_ID, Song3_ID, Song4_ID, Song5_ID) VALUES (?, ?, ?, ?, ?, ?)'
//   console.log((data1));
//   const d1 = parseInt(data1[0]);
//   const d2 = parseInt(data1[1]);
//   const d3 = parseInt(data1[2]);
//   const d4 = parseInt(data1[3]);
//   const d5 = parseInt(data1[4]);
//   // console.log("user ID:");
//   // console.log(req.user.id);
//   // const userID = parseInt(req.user.id);

//  db.query(sql5, [ 38, 12, 123, 24513, 232, 3456],function (err, data3, fields) {
//     if (err) throw err;
//     console.log(data3);
//     console.log("User responses is inserted successfully ");
//     res.render("yourmusic");
//     });
//     res.redirect('/yourmusic');  // redirect to user form page after inserting the data
// }

// router.post('/store', function(req, res, next) {
//     console.log("store working");
//     const data1=req.body;

//   });

module.exports = router;
