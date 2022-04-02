const dotenv = require("dotenv").config();
const mysql = require("mysql2");

//console.log("DATABSE");
//console.log(process.env.DATABASE_USER);

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MYSQL connected");
  }
});

module.exports = db;
