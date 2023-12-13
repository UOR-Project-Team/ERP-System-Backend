const db = require('../dbConfig');

const loginUser = (userData, callback) => {
  const { username, password } = userData;

  const query = 'SELECT * FROM users where Username = ? AND Password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

//multiple value we want to pass throught object
module.exports = { loginUser };