const db = require('../connection');

  const addItem = async (itemData) => {
    try{
      const { code, itemName, categoryId, unitId } = itemData;
  
      const query = 'INSERT INTO product (Code, Name, Category_ID,Unit_ID) VALUES (?,?,?,?)';
      const values = [ code, itemName, categoryId, unitId]
      const [results]= await db.execute(query,values);

      return results.insertId;
    } catch (err){
      throw err;
    }

  };


  const deleteItem = async (itemId) => {
    try{
      const query = 'DELETE FROM product WHERE ID = ?';
      await db.query(query,[itemId]);
    }
    catch(err)
    {
      throw err;
    }

  };
  

  const updateItem = async (itemData,itemId) => {

    try{
      const { code, itemName, categoryId, unitId } = itemData;
      const query = 'UPDATE product SET Code=?, Name=?, Category_ID=?,Unit_ID=? WHERE ID = ?';
      const values = [ code, itemName, categoryId, unitId, itemId ]
      await db.query(query, values)

    }
    catch(err){
      throw err;
    }
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
    const [results] = await db.execute(sql);
    
    return results;
  } catch (err) {
    throw err;
  }
};

  module.exports = { addItem, deleteItem ,updateItem,getAllItems};