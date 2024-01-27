const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mysqluserpwd',
  database: 'erp_systemdb',
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
    console.error('Error ocured while connecting to the database');
  });

module.exports = db;
