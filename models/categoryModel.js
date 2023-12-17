// userModel.js
const db = require('../dbConfig');

const createCategory = ((categoryData, callback) => {

  const {Description}=categoryData;
   
  const query = 'INSERT INTO Product_Category (Description) values (?)';
  db.query(query, Description, (err, results) => {
    if (err) {
      console.error('Error in createCategory:',err);
      return callback(err, null);
    }
    return callback(null, results);
  });
});

const showCategory = (callback) => {
  const sql = 'SELECT * FROM Product_Category';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error selecting categories:', err);
      return callback(err, null);
    }
    return callback(null, results);
  });
};

const deleteCategory = (categoryId, callback) => {
  const sql = 'DELETE FROM Product_Category WHERE ID = ?';
  db.query(sql, [categoryId], (err, results) => {
    if (err) {
      console.error('Error deleting category:', err);
      return callback(err, null);
    }
    return callback(null, results);
  });
};

const updateCategory = (categoryId, categoryData, callback) => {
  const { Description } = categoryData;

  const sql = 'UPDATE Product_Category SET Description = ? WHERE ID = ?';
  db.query(sql, [Description, categoryId], (err, results) => {
    if (err) {
      console.error('Error updating category:', err);
      return callback(err, null);
    }
    return callback(null, results);
  });
};

const getCategoryById = (categoryId, callback) => {
  const sql = 'SELECT * FROM Product_Category WHERE ID = ?';
  db.query(sql, [categoryId], (err, results) => {
    if (err) {
      console.error('Error selecting category by ID:', err);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback({ message: 'Category not found' }, null);
    }
    return callback(null, results[0]);
  });
};


module.exports = { createCategory , showCategory ,deleteCategory, updateCategory ,getCategoryById };