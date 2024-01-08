const db = require('../connection');

const getAllCustomers = async () => {
  try {
    const query = 'SELECT ID, Title, Fullname, ContactNo FROM Customer';
    const [results] = await db.execute(query);
    return results;
  } catch (err) {
    throw err;
  }
};

const getAllItems = async () => {
try {
    const query = 'SELECT ID, Code, Name FROM Product';
    const [results] = await db.execute( query );
    return results;
} catch (err) {
    throw err;
}
};

const getItemPriceById = async (ProductId) =>{
    try{
        const query = 'SELECT id,Barcode,  Unit_Price FROM Purchase_Product where Product_ID = ?';
        const [results] = await db.execute(query, [ProductId]);
        
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
      const {quantity, productId , s_price, barcode} = item;

      const saleQuery = 'INSERT INTO Sale_Item (Invoice_NO, Quantity, Unit_Price, Purchase_Product_ID, Barcode_No) VALUES(?, ?, ?, ?, ?)';
      const [saleResult] = await connection.execute(saleQuery, [invoiceNo, quantity, s_price, productId, barcode])
      
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
      const [results] = await db.execute(query);
      return results;
  } catch (err){
      throw err;
  }
}



module.exports = { getAllCustomers,  getAllItems , getItemPriceById,addinvoice, getAllInvoices };
