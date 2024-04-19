// Import necessary modules
const mysql = require('mysql2/promise');
const fs = require('fs');

// Load environment variables from .env file
require('dotenv').config();

// Create a connection pool to MySQL database
const db = mysql.createPool({
  host: process.env.DB_HOST, // MySQL database host
  user: process.env.DB_USER, // MySQL database user
  password: process.env.DB_PASSWORD, // MySQL database password
  database: process.env.DB_DATABASE, // MySQL database name
  waitForConnections: true, // Whether the pool should wait for available connections
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // Maximum number of connection requests the pool should queue
});

// Establish a connection to the database to check if it's successful
const connection = db.getConnection()
  .then(connection => {
    console.log('Connected to the database!'); // Log message indicating successful connection
    connection.release(); // Release the connection back to the pool
  })
  .catch(error => {
    console.error('Error occurred while connecting to the database:', error); // Log error message if connection fails
  });

module.exports = db; // Export the database connection pool for use in other modules

