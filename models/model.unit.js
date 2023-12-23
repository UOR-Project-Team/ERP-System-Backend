const db = require('../connection');

const createUnit = async (unitData) => {
  try {
    const { Description , SI } = unitData;

    const query = 'INSERT INTO Product_Unit (Description ,SI) VALUES (? , ?)';
    const [results] = await db.execute(query, [Description , SI]);

    return results.insertId;
  } catch (err) {
    throw err;
  }
};

const getAllUnits = async () => {
  try {
    const query = 'SELECT * FROM Product_Unit';
    const [results] = await db.execute(query);
    return results;
  } catch (err) {
    throw err;
  }
};

const deleteUnit = async (unitId) => {
  try {
    const query = 'DELETE FROM Product_Unit WHERE ID = ?';
    await db.query(query, [unitId]);
  } catch (err) {
    throw err;
  }
};

const updateUnit = async (unitId, unitData) => {
  try {
    const { Description , SI } = unitData;

    const query = 'UPDATE Product_Unit SET Description = ? , SI = ?  WHERE id = ?';
    await db.query(query, [Description, SI, unitId]);
  } catch (err) {
    throw err;
  }
};

const getUnitById = async (categoryId , SI) => {
  try {
    const query = 'SELECT * FROM Product_Unit WHERE id = ?';
    const [results] = await db.execute(query, [categoryId , SI]);
    return results[0];

  
  } catch (err) {
    throw err;
  }
};

module.exports = { createUnit, getAllUnits, deleteUnit, updateUnit, getUnitById };
