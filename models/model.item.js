const db = require('../connection');

  // const addItem = async (itemData) => {
  //   try{
  //     const { code, itemName, categoryId, unitId, supplierId} = itemData;
  
  //     const query = 'INSERT INTO product (Code, Name, Category_ID,Unit_ID) VALUES (?,?,?,?)';
  //     const values1 = [ code, itemName, categoryId, unitId]
  //     const values2 = supplierId
  //     const [results]= await db.execute(query,values1);

  //     return results.insertId;
  //   } catch (err){
  //     throw err;
  //   }

  // };

  //Add item function when product table and supplier_product table is maintained separatly instead of adding supplier id in the product table
  const addItem = async (itemData) => {
    const { code, itemName, categoryId, unitId, supplierId } = itemData;
    const query = 'INSERT INTO product (Code, Name, Category_ID, Unit_ID) VALUES (?,?,?,?)';
    const values = [code, itemName, categoryId, unitId];
    
    // Get a connection from the pool
    const connection = await db.getConnection();
  
    try {
  
      // Start a transaction on the acquired connection
      await connection.beginTransaction();
  
      // Insert into the product table
      const productResult = await connection.query(query, values);
  
       const productId = await productResult[0].insertId;
       //console.log(productId)
       //console.log(productResult)
      
  
      // Insert into the supplier_product table
      await connection.query('INSERT INTO supplier_product (Supplier_ID, Product_ID) VALUES (?, ?)', [supplierId, productId]);
  
      // Commit the transaction
      await connection.commit();
  
      return { success: true, productId };
    } catch (error) {
      // Rollback the transaction if an error occurs
      await connection.rollback();
      return { success: false, error: error.message };
    } finally {
      // Release the connection back to the pool
      if (connection) {
        connection.release();
      }
    }
  };



  // const deleteItem = async (itemId) => {
  //   try{
  //     const query = 'DELETE FROM product WHERE ID = ?';
  //     await db.query(query,[itemId]);
  //   }
  //   catch(err)
  //   {
  //     throw err;
  //   }

  // };



  const deleteItem = async (itemId) => {

    const connection = await db.getConnection();
    const query1 = 'DELETE FROM product WHERE ID = ?';
    const query2 = 'DELETE FROM supplier_product WHERE Product_ID = ?';

    try{

      // Start a transaction on the acquired connection
      await connection.beginTransaction();

       // Delete record from the supplier_product table first(Because it's the child table)
      await connection.query(query2, [itemId] );

      // Delete record from the product table next(Since it's the parent table)
      await connection.query(query1, [itemId] );

      await connection.commit();
  
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