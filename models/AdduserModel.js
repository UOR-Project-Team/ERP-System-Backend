const db = require('../dbConfig');

const addUser = (userData, callback) => {
  const { Fullname,email,username,password,NIC,jobrole,mobileno,address,city,Status } = userData;

  const query = 'INSERT INTO users (Fullname,Email,Username,Password,NIC,JobRole,MobileNo,Address,City,Status) VALUES (?, ?, ?,?,?,?,?,?,?,?)';
  const values = [
    Fullname,email,username,password,NIC,jobrole,mobileno,address,city,Status
  ]

  db.query(query, values, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

module.exports = { addUser };