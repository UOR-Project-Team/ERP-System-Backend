const db = require('../connection');

const getAllCustomers = async () => {
  try {
    const connection = await db.getConnection();
    const query = 'SELECT ID, Title, Fullname, ContactNo FROM Customer';
    const [results] = await connection.execute(query);
    connection.release();
    return results;
  } catch (err) {
    throw err;
  }
};

const getAllItems = async () => {
try {
   const connection = await db.getConnection();
   const query = `SELECT 
                  purchase_product.Product_ID AS ID, 
                  MAX(purchase_product.Unit_Price), 
                  product.Code AS Code,
                  MAX(purchase_product.Barcode) AS Barcode,
                  product.Name AS Name, 
                  SUM(purchase_item.Quantity) AS Total_Quantity
                FROM 
                  purchase_product 
                JOIN 
                  purchase_item ON purchase_product.Purchase_Item_ID = purchase_item.ID 
                JOIN 
                  product ON purchase_product.Product_ID = product.ID 
                WHERE
                  purchase_item.Quantity > 0
                GROUP BY 
                  purchase_product.Product_ID 
                      
                 `;
     //purchase_product.Unit_Price;
    const [results] = await connection.execute( query );
    connection.release();
    return results;
} catch (err) {
    throw err;
}
};

const getItemPriceById = async (barcode) =>{
    try{
        const query = `SELECT
        Purchase_Product.id,
        Purchase_Product.Barcode,
        Purchase_Product.Unit_Price,
        purchase_item.Purchase_Price
    FROM
        Purchase_Product
    JOIN
        purchase_item ON Purchase_Product.purchase_item_ID = purchase_item.ID
    WHERE
        Purchase_Product.Barcode = ?`;
    
        const [results] = await db.execute(query, [barcode]);

        //console.log("Result", results)
        
        
        return results;
    } catch (err){
        throw err;
    }
}

const addinvoice = async(invoiceNo, customerid,userid, items, totalAmount)=>{

  let connection;
  try{
     connection = await db.getConnection();
    await connection.beginTransaction();

    const invoiceQuery = 'INSERT INTO Invoice (NO, Date_Time, Total_Amount, User_ID,Customer_ID) VALUES (?, NOW(), ?, ?, ?)';
    const [invoice] = await connection.execute(invoiceQuery,[invoiceNo,totalAmount,userid,customerid]);
    

    if(invoice.insertId <0){
      throw new Error('Error inserting Invoice data');
    }

    for(const item of items){
      const {quantity, productId , s_price,p_price, barcode} = item;

      const saleQuery = 'INSERT INTO Sale_Item (Invoice_NO, Quantity, Unit_Price,Purchase_Price, Purchase_Product_ID, Barcode_No) VALUES(?, ?, ?, ?, ?, ?)';
      const [saleResult] = await connection.execute(saleQuery, [invoiceNo, quantity, s_price,p_price, productId, barcode])
      //console.log("Sale Result", saleResult)
      
      if(saleResult.insertId<0){
        throw new Error('Error inserting Sale_Item data');
      }

      //reducing Stock Amount

      const stockQuery = 'UPDATE Purchase_Item AS PI JOIN Purchase_Product AS PP ON PI.ID = PP.Purchase_item_ID SET PI.Quantity = PI.Quantity - ? WHERE PP.Barcode = ?';

      const [stockResult] =await connection.execute(stockQuery, [quantity,barcode]);
      
      if(stockResult.affectedRows === 0){
        throw new Error('Error Redusing Stock Item data');
      }

    }

    await connection.commit();
    connection.release();
    return true

  }catch(err) {
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    throw err;
  }

}



const getAllInvoices = async () =>{
  try{
    const connection = await db.getConnection();
      const query= `SELECT
                  invoice.*,
                  user.Fullname AS UserName,
                  customer.Fullname AS CustomerName

                  FROM
                      invoice
                      JOIN user ON invoice.User_ID = user.ID
                      JOIN customer ON invoice.Customer_ID = customer.ID
                  ORDER BY
                    invoice.ID;
                  `
      const [results] = await connection.execute(query);
      connection.release();
      return results;
  } catch (err){
      throw err;
  }
}

const getInvoiceByNo = async (invoiceNo)=>{
  try{
    const connection = await db.getConnection();
    const query = `
    SELECT
      invoice.*,
      user.Fullname AS UserName,
      customer.Fullname AS CustomerName,
      customer.ContactNo AS CustomerContact
    FROM
      invoice
      JOIN user ON invoice.User_ID = user.ID
      JOIN customer ON invoice.Customer_ID = customer.ID
    WHERE
      invoice.No = ?;
  `;
  
    const [results] = await connection.execute(query, [invoiceNo]);
    connection.release();
    return results;
} catch (err){
    throw err;
}
}

const getSalesItemsByNo = async (invoiceNo) =>{
  try{
    const connection = await db.getConnection();
    const query = `
    SELECT
    P.Name AS ProductName,
    P.Code,
    PP.Unit_Price AS UnitPrice,
    S.Quantity
    FROM
    Sale_Item S
    JOIN
    Purchase_Product PP ON S.Purchase_Product_ID = PP.ID
    JOIN
    Product P ON PP.Product_ID = P.ID
    WHERE
    S.Invoice_No = ?;


  `;

      const [results] = await connection.execute(query, [invoiceNo]);  
      connection.release();
      return results;
  } catch (err){
      throw err;
  }
}



module.exports = { getAllCustomers,  getAllItems , getItemPriceById,addinvoice, getAllInvoices ,getInvoiceByNo , getSalesItemsByNo};
