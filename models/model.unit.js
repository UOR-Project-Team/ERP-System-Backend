const db = require('../connection');

const createUnit = async (unitData) => {
  try {
    const { Description , SI } = unitData;
    const connection = await db.getConnection();
    const query = 'INSERT INTO Product_Unit (Description ,SI) VALUES (? , ?)';
    const [results] = await connection.execute(query, [Description , SI]);
    connection.release();
    return results.insertId;
  } catch (err) {
    throw err;
  }
};

const getAllUnits = async () => {
  try { 
    const connection = await db.getConnection();
    const query = 'SELECT * FROM product_unit';
    const [results] = await connection.execute(query);
    connection.release();
    return results;
  } catch (err) {
    throw err;
  }
};

const deleteUnit = async (unitId) => {
  try {
    const connection = await db.getConnection();
    const query = 'DELETE FROM product_unit WHERE ID = ?';
    await connection.query(query, [unitId]);
    connection.release();
  } catch (err) {
    throw err;
  }
};

const updateUnit = async (unitId, unitData) => {
  try {
    const { Description , SI } = unitData;
    const connection = await db.getConnection();
    const query = 'UPDATE product_unit SET Description = ? , SI = ?  WHERE id = ?';
    await connection.query(query, [Description, SI, unitId]);
    connection.release();
  } catch (err) {
    throw err;
  }
};

const getUnitById = async (categoryId , SI) => {
  try {
    const connection = await db.getConnection();
    const query = 'SELECT * FROM product_unit WHERE id = ?';
    const [results] = await connection.execute(query, [categoryId , SI]);
    connection.release();
    return results[0]; 
  } catch (err) {
    throw err;
  }
};

module.exports = { createUnit, getAllUnits, deleteUnit, updateUnit, getUnitById };
