const db = require('../dbConfig');

const addUser = (userData, callback) => {
  const { Fullname,email,username,password,NIC,jobrole,mobileno,address,city,Status } = userData;

  const query = 'INSERT INTO users (Fullname,Email,Username,Password,NIC,JobRole,MobileNo,Address,City,Status) VALUES (?, ?, ?,?,?,?,?,?,?,?)';
  const values = [
    Fullname,email,username,password,NIC,jobrole,mobileno,address,city,Status
  ]

  db.query(query, values, (err, data) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, data);
  });
};



const selectUser = (userID, callback) => {
  const id = userID;

  const query = 'SELECT * FROM users WHERE ID = ?';

  db.query(query, id, (err, data) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, data);
  });
};

module.exports = { addUser,selectUser };