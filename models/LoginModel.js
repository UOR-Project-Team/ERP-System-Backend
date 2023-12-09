const db = require('../dbConfig');

const loginUser = (userData, callback) => {
  const {username} = userData;

  const query = "SELECT * FROM users where Username = ? ";
  db.query(query, username, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    //console.log('Query results:', results);  //to check the result
    return callback(null, results);
  });
};

//multiple value we want to pass throught object
module.exports = { loginUser };