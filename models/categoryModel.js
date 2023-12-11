// userModel.js
const db = require('../dbConfig');

const createCategory = (categoryData, callback) => {
  //const { description } = categoryData;

  const {category} = categoryData;
   
  const query = "INSERT INTO Product_Category (Description) VALUES (?)";
  db.query(query, category, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

module.exports = { createCategory };