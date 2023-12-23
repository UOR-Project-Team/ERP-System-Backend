const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysqluserpwd',
  database: 'erp_systemdb',

});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

module.exports = connection;







// const mysql = require('mysql2/promise');


// // Create a connection pool using mysql2
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'erp_system',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Test the connection
// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log("Connected to MySQL!");
//   connection.release(); // Release the connection
// });

// module.exports = pool;
