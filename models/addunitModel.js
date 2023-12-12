const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8081;

const dbConfig = {
  host: 'root',
  user: 'admin',
  password: '',
  database: 'erp_systemdb'
};

const connection = mysql.createConnection(dbConfig);


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});


app.use(express.json());


app.post('/store', (req, res) => {
  const { Description, SI } = req.body;

  // Insert data into the database
  const sql = 'INSERT INTO product_unit (Description, SI) VALUES (?, ?)';
  connection.query(sql, [Description, SI], (err, result) => {
    if (err) {
      console.error('Error storing data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Data stored successfully');
      res.status(200).json({ message: 'Data stored successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);