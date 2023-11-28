// userModel.js
const db = require('../dbConfig');

const createUser = (userData, callback) => {
  const { username, age, password } = userData;

  const query = 'INSERT INTO user (username, age, password) VALUES (?, ?, ?)';
  db.query(query, [username, age, password], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

module.exports = { createUser };