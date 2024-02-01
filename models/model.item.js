const db = require('../connection');

  //Add item function when product table and supplier_product table is maintained separatly instead of adding supplier id in the product table
  const addItem = async (itemData) => {
    const { code, itemName, categoryId, unitId, supplierId, reorderLevel, reorderQuantity } = itemData;
    const query = 'INSERT INTO product (Code, Name, Category_ID, Unit_ID, Reorder_Level, Reorder_Quantity) VALUES (?,?,?,?,?,?)';
    const values = [code, itemName, categoryId, unitId, reorderLevel, reorderQuantity];
    
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
      //Rollback the transaction if an error occurs
      await connection.rollback();
      throw err;
    }
    finally{
      //Release the connection back to the pool
      if(connection){
        connection.release();
      }

    }

  };


  

  // const updateItem = async (itemData,itemId) => {

  //   try{
  //     const { code, itemName, categoryId, unitId } = itemData;
  //     const query = 'UPDATE product SET Code=?, Name=?, Category_ID=?,Unit_ID=? WHERE ID = ?';
  //     const values = [ code, itemName, categoryId, unitId, itemId ]
  //     await db.query(query, values)

  //   }
  //   catch(err){
  //     throw err;
  //   }
  // };


  const updateItem = async (itemData,itemId) => {

    const connection = await db.getConnection();
    const query1 = 'UPDATE product SET Code=?, Name=?, Category_ID=?,Unit_ID=?, Reorder_Level=?, Reorder_Quantity=?  WHERE ID = ?';
    const query2 = 'UPDATE supplier_product SET Supplier_ID=? WHERE Product_ID = ?';

    const { code, itemName, categoryId, unitId, supplierId, reorderLevel, reorderQuantity } = itemData;
    const values1 = [ code, itemName, categoryId, unitId, reorderLevel, reorderQuantity, itemId ]
    const values2 = [supplierId,itemId]
    console.log("update request reached model item");
    try{

      // Start a transaction on the acquired connection
      await connection.beginTransaction();
      
      //Update product table
      await connection.query(query1, values1)

      //Update supplier_product table
      await connection.query(query2, values2)


      // Commit the transaction
      await connection.commit();

      return { success: true, itemId };
    }
    catch(err){
      // Rollback the transaction if an error occurs
      await connection.rollback();
      throw err;
    }
    finally{
      // Release the connection back to the pool
      if (connection) {
        connection.release();
      }
    }
  };



const getAllItems =  async () => {
  try {
          const sql= `SELECT
                    product.*,
                    product_category.Description AS CategoryName,
                    product_unit.Description AS UnitName,
                    supplier.Fullname AS SupplierName,
                    supplier.ID AS Supplier_ID
                FROM
                    product
                    JOIN product_category ON product.Category_ID = product_category.ID
                    JOIN product_unit ON product.Unit_ID = product_unit.ID
                    JOIN supplier_product ON product.ID = supplier_product.Product_ID
                    JOIN supplier ON supplier_product. Supplier_ID =  supplier.ID
                ORDER BY
                    product.code;
                `
    const [results] = await db.execute(sql);
    
    return results;
  } catch (err) {
    throw err;
  }
};

const getAllItemsByUnitID =  async (unitId) => {
  try {
    const sql = `
      SELECT
        product.*,
        product_category.Description AS CategoryName,
        product_unit.Description AS UnitName,
        supplier.Fullname AS SupplierName,
        supplier.ID AS Supplier_ID
      FROM
        product
        JOIN product_category ON product.Category_ID = product_category.ID
        JOIN product_unit ON product.Unit_ID = product_unit.ID
        JOIN supplier_product ON product.ID = supplier_product.Product_ID
        JOIN supplier ON supplier_product.Supplier_ID = supplier.ID
      WHERE
        product.Unit_ID = ?
      ORDER BY
        product.code;
    `;
    
    const [results] = await db.execute(sql, [unitId]);
    
    return results;
  } catch (err) {
    throw err;
  }
};


const getAllItemsByCategoryID =  async (categoryId) => {
  try {
          const sql= `SELECT
                    product.*,
                    product_category.Description AS CategoryName,
                    product_unit.Description AS UnitName,
                    supplier.Fullname AS SupplierName,
                    supplier.ID AS Supplier_ID
                FROM
                    product
                    JOIN product_category ON product.Category_ID = product_category.ID
                    JOIN product_unit ON product.Unit_ID = product_unit.ID
                    JOIN supplier_product ON product.ID = supplier_product.Product_ID
                    JOIN supplier ON supplier_product. Supplier_ID =  supplier.ID
                WHERE
                    product.Category_ID = ?
                ORDER BY
                    product.code;
                `
                const [results] = await db.execute(sql, [categoryId]);
    
    return results;
  } catch (err) {
    throw err;
  }
};

const getAllItemsBySupplierID =  async (supplierId) => {
  try {
          const sql= `SELECT
                    product.*,
                    product_category.Description AS CategoryName,
                    product_unit.Description AS UnitName,
                    supplier.Fullname AS SupplierName,
                    supplier.ID AS Supplier_ID
                FROM
                    product
                    JOIN product_category ON product.Category_ID = product_category.ID
                    JOIN product_unit ON product.Unit_ID = product_unit.ID
                    JOIN supplier_product ON product.ID = supplier_product.Product_ID
                    JOIN supplier ON supplier_product.Supplier_ID =  supplier.ID
                WHERE
                    supplier_product. Supplier_ID = ?
                ORDER BY
                    product.code;
                `
                const [results] = await db.execute(sql, [supplierId]);
    
    return results;
  } catch (err) {
    throw err;
  }
};



// Assuming you have set up your MySQL connection

// Function to generate unique product code
const getProductCode = async ()=> {
  try {
      // Query to get the highest existing product code
      const query = "SELECT MAX(Code) AS maxCode FROM product";
      const result = await db.query(query);

      let maxCode = result[0][0].maxCode;
      console.log(result)
      console.log(maxCode);
      let newCode = "P001"; // Default starting code

      if (maxCode) {
          // Extract the numeric part and increment
          const numericPart = parseInt(maxCode.slice(1), 10);
          newCode = "P" + ("000" + (numericPart + 1)).slice(-3); // Increment and format
      }

      // Check if the generated code already exists
      const codeExistsQuery = "SELECT COUNT(*) AS count FROM product WHERE Code = ?";
      const codeExistsResult = await db.query(codeExistsQuery, [newCode]);

      if (codeExistsResult[0].count > 0) {
          // If code already exists, recursively call the function again
          return getProductCode();
      }

      return newCode;
  } catch (error) {
      throw new Error("Error generating product code: " + error.message);
  }
}



module.exports = { addItem, deleteItem, updateItem, getAllItems, getAllItemsByUnitID, getAllItemsByCategoryID, getAllItemsBySupplierID, getProductCode };