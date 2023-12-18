const db = require('../connection');

const createCategory = async (categoryData) => {
  try {
    const { Description } = categoryData;

    const query = 'INSERT INTO Product_Category (Description) VALUES (?)';
    const [results] = await db.execute(query, [Description]);

    return results.insertId;
  } catch (err) {
    throw err;
  }
};

const getAllCategories = async () => {
  try {
    const query = 'SELECT * FROM Product_Category';
    const [results] = await db.execute(query);
    return results;
  } catch (err) {
    throw err;
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const query = 'DELETE FROM Product_Category WHERE ID = ?';
    await db.query(query, [categoryId]);
  } catch (err) {
    throw err;
  }
};

const updateCategory = async (categoryId, categoryData) => {
  try {
    const { Description } = categoryData;

    const query = 'UPDATE Product_Category SET Description = ? WHERE id = ?';
    await db.query(query, [Description, categoryId]);
  } catch (err) {
    throw err;
  }
};

const getCategoryById = async (categoryId) => {
  try {
    const query = 'SELECT * FROM Product_Category WHERE id = ?';
    const [results] = await db.execute(query, [categoryId]);
    return results[0];

  
  } catch (err) {
    throw err;
  }
};

module.exports = { createCategory, getAllCategories, deleteCategory, updateCategory, getCategoryById };
