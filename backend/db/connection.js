const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',   // or 127.0.0.1
  user: 'root',         // your MySQL username
  password: '',         // your MySQL password (blank if you didn’t set one)
  database: 'your_db_name'  // your database name
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

module.exports = connection;
