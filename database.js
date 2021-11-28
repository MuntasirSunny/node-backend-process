const mysql = require('mysql');
require('dotenv').config()

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  });

  con.connect((err) => {
    if (err){
        console.log(err);
    }
    console.log("Connected!");
});

module.exports = con;
