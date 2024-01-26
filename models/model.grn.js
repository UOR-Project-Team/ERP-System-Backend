const db = require('../connection');

const compareGRNID = async (id) => {
  try {
    const connection = await db.getConnection();
    const query = 'SELECT * FROM grn WHERE No = ?';
    const [results] = await connection.execute(query, [id]);
    connection.release();
    return results;
  } catch (err) {
    throw err;
  }
};

const getAllSuppliers = async (searchvalue) => {
  try {
    const connection = await db.getConnection();
    const query = 'SELECT ID, Title, Fullname, ContactNo, Email FROM supplier ';
    const [results] = await connection.execute(query);
    connection.release();
    return results;
  } catch (err) {
    throw err;
  }
};

const getAllItems = async () => {
try {
    // Supplier_Id as input
    //const query = 'SELECT Product.ID, Product.Code, Product.Name FROM Product RIGHT JOIN Supplier_Product ON Product.ID = Supplier_Product.Product_ID WHERE Supplier_Product.Supplier_ID = ?';
    const query = 'SELECT ID, Code, Name FROM product';
    const [results] = await db.execute(query);
    //console.log(results)
    return results;
} catch (err) {
    throw err;
}
};

const addgrn = async(grnNo,supplierid,userid,items,totalAmount)=>{

  let connection;
  try {
    
     connection = await db.getConnection();
    await connection.beginTransaction();

    const Invoicequery = 'INSERT INTO grn (No,Date_Time, Supplier_ID,User_ID, total_amount) VALUES (?, NOW(), ?,?,?)';
    const [results] = await connection.execute(Invoicequery,[grnNo,supplierid,userid,totalAmount]);
    
    const generatedGRNNo = results.insertId;
    if (results.insertId < 0) {
      throw new Error('Error inserting GRN data');
    }
    
    for (const item of items) {
      const { barcode, unitprice, purchase_price,productId, quantity } = item;
      const itemQuery = 'INSERT INTO purchase_item (GRN_NO,Purchase_Price, Quantity) VALUES (?, ?, ?)';
      const [itemResult] = await connection.execute(itemQuery, [grnNo, purchase_price, quantity]);

      if (itemResult.insertId < 0) {
        throw new Error('Error inserting purchase item');
      }

      const purchase_itemID = itemResult.insertId;

      // Insert into `purchase_product` table
      const productQuery ='INSERT INTO purchase_product (Purchase_Item_ID, Product_ID, Barcode, Unit_price) VALUES (?, ?, ?, ?)';
      const purchaseproductQuery = await connection.execute(productQuery, [purchase_itemID,productId, barcode, unitprice]);

      if (purchaseproductQuery.insertId < 0) {
        throw new Error('Error inserting purchase item');
      }
    }

    await connection.commit();
    connection.release();
    return true

  
 } catch (err) {
  if (connection) {
    await connection.rollback();
    connection.release();
  }
  throw err;
}
  }

module.exports = { compareGRNID, getAllSuppliers,  getAllItems, addgrn };
