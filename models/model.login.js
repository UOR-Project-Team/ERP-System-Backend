const db = require('../dbConfig')

const loginUser = (username, callback) => {

  const query = "SELECT * FROM user where Username = ? ";
  db.query(query, username, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

module.exports = { loginUser };