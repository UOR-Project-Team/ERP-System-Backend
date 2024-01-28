const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection()
  .then(connection => {
    console.log('Connected to the database!');
    connection.release();
  })
  .catch(error => {
    console.error('Error occurred while connecting to the database:', error);
  });

module.exports = db;
