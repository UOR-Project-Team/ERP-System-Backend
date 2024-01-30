const db = require('../connection');

const createCategory = async (categoryData) => {
  try {
    const { Description } = categoryData;
    const connection = await db.getConnection();
    const query = 'INSERT INTO Product_Category (Description) VALUES (?)';
    const [results] = await connection.execute(query, [Description]);
    connection.release();
    return results.insertId;
  } catch (err) {
    throw err;
  }
};

const getAllCategories = async () => {
  try {
    const connection = await db.getConnection();
    const query = 'SELECT * FROM Product_Category';
    const [results] = await connection.execute(query);
    connection.release();
    return results;
  } catch (err) {
    throw err;
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const connection = await db.getConnection();
    const query = 'DELETE FROM Product_Category WHERE ID = ?';
    await connection.query(query, [categoryId]);
    connection.release();
  } catch (err) {
    throw err;
  }
};

const updateCategory = async (categoryId, categoryData) => {
  try {
    const { Description } = categoryData;
    const connection = await db.getConnection();
    const query = 'UPDATE Product_Category SET Description = ? WHERE id = ?';
    await connection.query(query, [Description, categoryId]);
    connection.release();
  } catch (err) {
    throw err;
  }
};

const getCategoryById = async (categoryId) => {
  try {
    const connection = await db.getConnection();
    const query = 'SELECT * FROM Product_Category WHERE id = ?';
    const [results] = await connection.execute(query, [categoryId]);
    connection.release();
    return results[0];
  } catch (err) {
    throw err;
  }
};

module.exports = { createCategory, getAllCategories, deleteCategory, updateCategory, getCategoryById };
