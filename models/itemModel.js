const db2 = require('../connection');
const db = require('../dbConfig.js');

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
  
  const deleteItem = async (itemId, callback) => {
    const sql = 'DELETE FROM product WHERE ID = ?';
    console.log("delete request has reached item model");
    await db.query(sql, [itemId], (err, results) => {
    
      
      if (err) {
        console.error('Error deleting item:', err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  };
  

  const updateItem = (itemData,itemId, callback) => {
    const { code, itemName, categoryId, unitId } = itemData;
  
    const query = 'UPDATE product SET Code=?, Name=?, Category_ID=?,Unit_ID=? WHERE ID = ?';
    const values = [
      code, itemName, categoryId, unitId, itemId 
    ]
  
    db.query(query, values, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  };



const getAllItems =  async () => {
  try {
          const sql= `SELECT
                    product.*,
                    product_category.Description AS CategoryName,
                    product_unit.Description AS UnitName
                FROM
                    product
                    JOIN product_category ON product.Category_ID = product_category.ID
                    JOIN product_unit ON product.Unit_ID = product_unit.ID
                ORDER BY
                    product.code;
                `
    const [results] = await db2.query(sql);
    
    return results;
  } catch (err) {
    throw err;
  }
};

  module.exports = { addItem, deleteItem ,updateItem,getAllItems};