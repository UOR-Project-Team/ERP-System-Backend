const db = require('../dbConfig');

const addUser = (userData, callback) => {
  const { Fullname,email,username,password,NIC,jobrole,mobileno,mobileno2,address,city,Status } = userData;

  const query = 'INSERT INTO user (Fullname,Email,Username,Password,NIC,JobRole,MobileNo,MobileNo2,Address,City,Status) VALUES (?,?,?,?,?,?,?,?,?,?,1)';
  const values = [
    Fullname,email,username,password,NIC,jobrole,mobileno,mobileno2,address,city,Status
  ]

  db.query(query, values, (err, data) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, data);
  });
};

module.exports = { addUser };
