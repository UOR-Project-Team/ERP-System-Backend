const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
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
    console.error('Error connecting to the database:', error.message);
  });

module.exports = db;
