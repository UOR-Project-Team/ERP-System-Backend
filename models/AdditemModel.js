const db = require('../dbConfig');

const addItem = (itemData, callback) => {
    const { code, itemName, categoryId, unitId } = itemData;
  
    const query = 'INSERT INTO product (Code, Name, Category_ID,Unit_ID) VALUES (?,?,?,?)';
    const values = [
      code, itemName, categoryId, unitId
    ]
  
    db.query(query, values, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  };
  
  module.exports = { addItem };