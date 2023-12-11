const db = require('../dbConfig');

const createunit = (categoryData, callback) => {
  //const { description } = categoryData;

  const {description, si} = categoryData;
   
  const query = "INSERT INTO Product_Category (Description,SI) VALUES (?,?)";
  const values = [
    description,si
  ]
  db.query(query, values, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

module.exports = { createunit };