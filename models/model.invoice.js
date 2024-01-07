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
        const query = 'SELECT id,  Unit_Price FROM Purchase_Product where Product_ID = ?';
        const [results] = await db.execute(query, [ProductId]);
        console.log('product id' ,ProductId);
        return results;
    } catch (err){
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



module.exports = { getAllCustomers,  getAllItems , getItemPriceById, getAllInvoices };
