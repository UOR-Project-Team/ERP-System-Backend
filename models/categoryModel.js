// userModel.js
const db = require('../dbConfig');

const createCategory = (categoryData, callback) => {
  const { description } = categoryData;
   
  const query = "INSERT INTO Product_Category (Description) VALUES (?)";
  db.query(query, [description], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

module.exports = { createCategory };