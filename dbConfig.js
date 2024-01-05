const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysqluserpwd',
  database: 'erp_systemdb',

});

module.exports = connection;