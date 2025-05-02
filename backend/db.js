const mysql = require('mysql2');

// Optional: Use dotenv if you have environment variables
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // your MySQL password
  database: 'your_database_name' // your MySQL database name
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL Database.');
});

module.exports = connection;
